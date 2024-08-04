import { ESLintUtils } from "@typescript-eslint/utils";

import { handleProgram } from "./helpers/handleProgram";

export const folderStructure = ESLintUtils.RuleCreator(
    () =>
        "https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-folder-structure.md",
)({
    name: "project-structure-folder-structure",
    meta: {
        docs: {
            description:
                "Enforce rules on folder structure to keep your repository consistent, orderly and well thought out.",
            recommended: "recommended",
        },
        type: "problem",
        schema: [],
        messages: {
            error: `error`,
        },
    },
    defaultOptions: [],
    create(context) {
        return {
            Program(node): void {
                handleProgram({ context, node });
            },
        };
    },
});
