import { ESLintUtils } from "@typescript-eslint/utils";

import { ESLINT_ERRORS } from "rules/fileComposition/fileComposition.consts";
import { FileCompositionConfig } from "rules/fileComposition/fileComposition.types";
import { getFileCompositionConfig } from "rules/fileComposition/helpers/getFileCompositionConfig/getFileCompositionConfig";
import { handleClassDeclaration } from "rules/fileComposition/helpers/handleClassDeclaration";
import { handleFunctionDeclaration } from "rules/fileComposition/helpers/handleFunctionDeclaration";
import { handleMethodDefinition } from "rules/fileComposition/helpers/handleMethodDefinition";
import { handlePropertyDefinition } from "rules/fileComposition/helpers/handlePropertyDefinition";
import { handleVariableDeclarator } from "rules/fileComposition/helpers/handleVariableDeclarator";
import { validateFile } from "rules/fileComposition/helpers/validateFile/validateFile";
import { validateRootSelectorsLimits } from "rules/fileComposition/helpers/validateRootSelectorsLimits/validateRootSelectorsLimits";

export const fileComposition = ESLintUtils.RuleCreator(
  () =>
    "https://github.com/Igorkowalski94/eslint-plugin-project-structure/wiki/project%E2%80%91structure-%E2%80%8Bfile%E2%80%91composition#root",
)<[FileCompositionConfig] | [], keyof typeof ESLINT_ERRORS>({
  name: "file-composition",
  meta: {
    docs: {
      url: "https://github.com/Igorkowalski94/eslint-plugin-project-structure/wiki/project%E2%80%91structure-%E2%80%8Bfile%E2%80%91composition#root",
      description:
        "Enforce advanced naming rules and prohibit the use of given selectors in a given file. Have full control over what your file can contain and the naming conventions it must follow.",
    },
    type: "problem",
    schema: [{ type: "object", additionalProperties: true }],
    messages: ESLINT_ERRORS,
  },
  defaultOptions: [],
  create(context) {
    const { config, fileConfig } = getFileCompositionConfig(context);

    return {
      Program(node): void {
        validateRootSelectorsLimits({
          node,
          report: context.report,
          rootSelectorsLimits: fileConfig?.rootSelectorsLimits,
        });
      },
      VariableDeclarator(node): void {
        handleVariableDeclarator({ node, context, config, fileConfig });
      },
      ClassDeclaration(node): void {
        handleClassDeclaration({ node, context, config, fileConfig });
      },
      MethodDefinition(node): void {
        handleMethodDefinition({ node, context, config, fileConfig });
      },
      PropertyDefinition(node): void {
        handlePropertyDefinition({ node, context, config, fileConfig });
      },
      FunctionDeclaration(node): void {
        handleFunctionDeclaration({ node, context, config, fileConfig });
      },
      TSTypeAliasDeclaration(node): void {
        validateFile({
          node,
          context,
          name: node.id.name,
          nodeType: "TSTypeAliasDeclaration",
          config,
          fileConfig,
        });
      },
      TSInterfaceDeclaration(node): void {
        validateFile({
          node,
          context,
          name: node.id.name,
          nodeType: "TSInterfaceDeclaration",
          config,
          fileConfig,
        });
      },
      TSEnumDeclaration(node): void {
        validateFile({
          node,
          context,
          name: node.id.name,
          nodeType: "TSEnumDeclaration",
          config,
          fileConfig,
        });
      },
    };
  },
});
