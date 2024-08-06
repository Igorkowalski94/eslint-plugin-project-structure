import { ESLintUtils } from "@typescript-eslint/utils";

import { handleCallExpression } from "./helpers/handleCallExpression";
import { handleExportNamedDeclaration } from "./helpers/handleExportNamedDeclaration";
import { handleImportExpression } from "./helpers/handleImportExpression";
import { validateImport } from "./helpers/validateImport";
import { IndependentModulesConfig } from "./independentModules.types";

export const independentModules = ESLintUtils.RuleCreator(
    () =>
        "https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-independent-modules.md",
)<[IndependentModulesConfig] | [], "error">({
    name: "independent-modules",
    meta: {
        docs: {
            description:
                "Create independent modules to keep your repository scalable and easy to maintain. Get rid of dependencies between modules and create truly independent functionalities.",
        },
        type: "problem",
        schema: [{ type: "object", additionalProperties: true }],
        messages: { error: "" },
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
