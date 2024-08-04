import { ESLintUtils } from "@typescript-eslint/utils";

import { handleClassDeclaration } from "./helpers/handleClassDeclaration";
import { handleFunctionDeclaration } from "./helpers/handleFunctionDeclaration";
import { handleVariableDeclarator } from "./helpers/handleVariableDeclarator";
import { validateName } from "./helpers/validateName";
import { ESLINT_ERRORS, NAMING_RULES_SCHEMA } from "./namingRules.consts";

export const namingRules = ESLintUtils.RuleCreator(
    () =>
        "https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-naming-rules.md",
)({
    name: "project-structure-naming-rules",
    meta: {
        docs: {
            description: "Enforce complex naming rules.",
            recommended: "recommended",
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
