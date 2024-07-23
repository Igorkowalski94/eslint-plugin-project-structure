import { ESLintUtils } from "@typescript-eslint/utils";

import { ESLINT_ERRORS, MATCH_RULES_SCHEMA } from "./exportRules.consts";
import { handleClassDeclaration } from "./helpers/handleClassDeclaration";
import { handleFunctionDeclaration } from "./helpers/handleFunctionDeclaration";
import { handleIdentifier } from "./helpers/handleIdentifier";

export const exportRules = ESLintUtils.RuleCreator(
    () =>
        "https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-export-rules.md",
)({
    name: "project-structure-export-rules",
    meta: {
        docs: {
            description: "Export rules",
            recommended: "recommended",
        },
        type: "problem",
        schema: MATCH_RULES_SCHEMA,
        messages: ESLINT_ERRORS,
    },
    defaultOptions: [],
    create(context) {
        return {
            Identifier(node): void {
                handleIdentifier({ node, context });
            },
            ClassDeclaration(node): void {
                handleClassDeclaration({ node, context });
            },
            FunctionDeclaration(node): void {
                handleFunctionDeclaration({ node, context });
            },
        };
    },
});
