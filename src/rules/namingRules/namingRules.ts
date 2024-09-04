import { ESLintUtils } from "@typescript-eslint/utils";

import { handleClassDeclaration } from "rules/namingRules/helpers/handleClassDeclaration";
import { handleFunctionDeclaration } from "rules/namingRules/helpers/handleFunctionDeclaration";
import { handleVariableDeclarator } from "rules/namingRules/helpers/handleVariableDeclarator";
import { validateName } from "rules/namingRules/helpers/validateName/validateName";
import { ESLINT_ERRORS } from "rules/namingRules/namingRules.consts";
import { NamingRulesConfig } from "rules/namingRules/namingRules.types";

export const namingRules = ESLintUtils.RuleCreator(
  () =>
    "https://github.com/Igorkowalski94/eslint-plugin-project-structure/wiki/project%E2%80%91structure-%E2%80%8Bnaming%E2%80%91rules#root",
)<[NamingRulesConfig] | [], keyof typeof ESLINT_ERRORS>({
  name: "naming-rules",
  meta: {
    docs: {
      url: "https://github.com/Igorkowalski94/eslint-plugin-project-structure/wiki/project%E2%80%91structure-%E2%80%8Bnaming%E2%80%91rules#root",
      description: "Enforce advanced naming rules.",
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
