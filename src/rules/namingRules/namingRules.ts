import { ESLintUtils } from "@typescript-eslint/utils";

import { handleClassDeclaration } from "rules/namingRules/helpers/handleClassDeclaration";
import { handleFunctionDeclaration } from "rules/namingRules/helpers/handleFunctionDeclaration";
import { handleVariableDeclarator } from "rules/namingRules/helpers/handleVariableDeclarator";
import { validateName } from "rules/namingRules/helpers/validateName/validateName";
import { ESLINT_ERRORS } from "rules/namingRules/namingRules.consts";

export const namingRules = ESLintUtils.RuleCreator(
  () =>
    "https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-naming-rules.md#project-structurenaming-rules",
)({
  name: "project-structure-naming-rules",
  meta: {
    docs: {
      url: "https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-naming-rules.md#project-structurenaming-rules",
      description: "Enforce complex naming rules.",
    },
    type: "problem",
    schema: { type: "array" },
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
      FunctionDeclaration(node): void {
        handleFunctionDeclaration({ node, context });
      },
      TSTypeAliasDeclaration(node): void {
        validateName({
          node,
          context,
          name: node.id.name,
          nodeType: "TSTypeAliasDeclaration",
        });
      },
      TSInterfaceDeclaration(node): void {
        validateName({
          node,
          context,
          name: node.id.name,
          nodeType: "TSInterfaceDeclaration",
        });
      },
      TSEnumDeclaration(node): void {
        validateName({
          node,
          context,
          name: node.id.name,
          nodeType: "TSEnumDeclaration",
        });
      },
    };
  },
});
