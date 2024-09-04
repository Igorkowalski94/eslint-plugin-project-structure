import { ESLintUtils } from "@typescript-eslint/utils";
import { ESLINT_ERRORS } from "consts";

import { handleCallExpression } from "rules/independentModules/helpers/handleCallExpression";
import { handleExportNamedDeclaration } from "rules/independentModules/helpers/handleExportNamedDeclaration";
import { handleImportExpression } from "rules/independentModules/helpers/handleImportExpression";
import { validateImport } from "rules/independentModules/helpers/validateImport/validateImport";
import { IndependentModulesConfig } from "rules/independentModules/independentModules.types";

export const independentModules = ESLintUtils.RuleCreator(
  () =>
    "https://github.com/Igorkowalski94/eslint-plugin-project-structure/wiki/project%E2%80%91structure-%E2%80%8Bindependent%E2%80%91modules#root",
)<[IndependentModulesConfig] | [], keyof typeof ESLINT_ERRORS>({
  name: "independent-modules",
  meta: {
    docs: {
      url: "https://github.com/Igorkowalski94/eslint-plugin-project-structure/wiki/project%E2%80%91structure-%E2%80%8Bindependent%E2%80%91modules#root",
      description:
        "A key principle of a healthy project is to prevent the creation of a massive dependency tree, where removing or editing one feature triggers a chain reaction that impacts the entire project. Create independent modules to keep your project scalable and easy to maintain. Get rid of dependencies between modules and create truly independent functionalities.",
    },
    type: "problem",
    schema: [{ type: "object", additionalProperties: true }],
    messages: ESLINT_ERRORS,
  },
  defaultOptions: [],
  create(context) {
    return {
      ImportExpression(node): void {
        handleImportExpression(node, context);
      },
      ImportDeclaration(node): void {
        validateImport({
          importPath: node.source.value,
          context,
          node,
        });
      },
      ExportNamedDeclaration(node): void {
        handleExportNamedDeclaration(node, context);
      },
      CallExpression(node): void {
        handleCallExpression(node, context);
      },
      ExportAllDeclaration(node): void {
        validateImport({
          importPath: node.source.value,
          context,
          node,
        });
      },
    };
  },
});
