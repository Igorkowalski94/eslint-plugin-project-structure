import { ESLintUtils } from "@typescript-eslint/utils";

import { handleClassDeclaration } from "rules/namingRules/helpers/handleClassDeclaration";
import { handleFunctionDeclaration } from "rules/namingRules/helpers/handleFunctionDeclaration";
import { handleVariableDeclarator } from "rules/namingRules/helpers/handleVariableDeclarator";
import { validateName } from "rules/namingRules/helpers/validateName";
import {
  NAMING_RULES_SCHEMA,
  ESLINT_ERRORS,
} from "rules/namingRules/namingRules.consts";

export const namingRules = ESLintUtils.RuleCreator(
  () =>
    "https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-naming-rules.md",
)({
  name: "project-structure-naming-rules",
  meta: {
    docs: {
      url: "https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-naming-rules.md",
      description: "Enforce complex naming rules.",
    },
    type: "problem",
    schema: NAMING_RULES_SCHEMA,
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
          nameType: "TSTypeAliasDeclaration",
        });
      },
      TSInterfaceDeclaration(node): void {
        validateName({
          node,
          context,
          name: node.id.name,
          nameType: "TSInterfaceDeclaration",
        });
      },
      TSEnumDeclaration(node): void {
        validateName({
          node,
          context,
          name: node.id.name,
          nameType: "TSEnumDeclaration",
        });
      },
    };
  },
});
