import { ESLintUtils } from "@typescript-eslint/utils";

import { ESLINT_ERRORS } from "rules/fileComposition/fileComposition.consts";
import { FileCompositionConfig } from "rules/fileComposition/fileComposition.types";
import { handleClassDeclaration } from "rules/fileComposition/helpers/handleClassDeclaration";
import { handleFunctionDeclaration } from "rules/fileComposition/helpers/handleFunctionDeclaration";
import { handleMethodDefinition } from "rules/fileComposition/helpers/handleMethodDefinition";
import { handlePropertyDefinition } from "rules/fileComposition/helpers/handlePropertyDefinition";
import { handleVariableDeclarator } from "rules/fileComposition/helpers/handleVariableDeclarator";
import { validateFile } from "rules/fileComposition/helpers/validateFile/validateFile";

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
    return {
      VariableDeclarator(node): void {
        handleVariableDeclarator({ node, context });
      },
      ClassDeclaration(node): void {
        handleClassDeclaration({ node, context });
      },
      MethodDefinition(node): void {
        handleMethodDefinition({ node, context });
      },
      PropertyDefinition(node): void {
        handlePropertyDefinition({ node, context });
      },
      FunctionDeclaration(node): void {
        handleFunctionDeclaration({ node, context });
      },
      TSTypeAliasDeclaration(node): void {
        validateFile({
          node,
          context,
          name: node.id.name,
          nodeType: "TSTypeAliasDeclaration",
        });
      },
      TSInterfaceDeclaration(node): void {
        validateFile({
          node,
          context,
          name: node.id.name,
          nodeType: "TSInterfaceDeclaration",
        });
      },
      TSEnumDeclaration(node): void {
        validateFile({
          node,
          context,
          name: node.id.name,
          nodeType: "TSEnumDeclaration",
        });
      },
    };
  },
});
