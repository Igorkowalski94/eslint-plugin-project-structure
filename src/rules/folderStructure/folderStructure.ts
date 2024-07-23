import { ESLintUtils } from "@typescript-eslint/utils";

import { handleProgram } from "./helpers/handleProgram";

export const folderStructure = ESLintUtils.RuleCreator(
    () =>
        "https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-folder-structure.md",
)({
    name: "project-structure-folder-structure",
    meta: {
        docs: {
            description: "Force folder structure",
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
