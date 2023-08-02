import { sep } from "path";

import { ESLintUtils } from "@typescript-eslint/utils";
import { ReportDescriptor } from "@typescript-eslint/utils/dist/ts-eslint";

import { finalErrorGuard } from "../errors/FinalError/helpers/finalErrorGuard";
import { validateFileStructure } from "../validators/validateFileStructure/validateFileStructure";

type MessageIds = "error";

export const fileStructure = ESLintUtils.RuleCreator(
    () =>
        "https://github.com/Igorkowalski94/eslint-plugin-project-structure#readme",
)({
    name: "project-structure",
    meta: {
        docs: {
            description: "Force project structure",
            recommended: "error",
            suggestion: true,
        },
        type: "suggestion",
        schema: [],
        messages: {
            error: `error`,
        },
    },
    defaultOptions: [],
    create(context) {
        return {
            Program(node): void {
                const configPath = `${context.getCwd?.()}${sep}${
                    context.settings["project-structure/config-path"]
                }`;

                const fileAbsolutePath = context.getPhysicalFilename?.();
                const filePath = fileAbsolutePath?.replace(
                    `${context.getCwd?.()}${sep}`,
                    "",
                );
                const filePathUnifySep = filePath?.includes("\\")
                    ? filePath.replace(/"\\"/g, "/")
                    : filePath;

                try {
                    validateFileStructure(configPath, filePathUnifySep);
                } catch (error) {
                    if (!finalErrorGuard(error)) return;

                    context.report({
                        node,
                        message: error.message,
                    } as unknown as ReportDescriptor<MessageIds>);
                }
            },
        };
    },
});
