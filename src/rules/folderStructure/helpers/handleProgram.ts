import { sep } from "path";

import { TSESTree } from "@typescript-eslint/utils";
import {
    ReportDescriptor,
    RuleContext,
} from "@typescript-eslint/utils/dist/ts-eslint/Rule";

import { validateFolderStructure } from "./validateFolderStructure/validateFolderStructure";
import { finalErrorGuard } from "../../../errors/finalErrorGuard";
import { getConfigPath } from "../../../helpers/getConfigPath";

export interface HandleProgramProps {
    context: RuleContext<"error", []>;
    node: TSESTree.Program;
}

export const handleProgram = ({
    context: { cwd, settings, filename, report },
    node,
}: HandleProgramProps): void => {
    const configPath = getConfigPath({
        cwd,
        key: "project-structure/folder-structure-config-path",
        settings,
    });

    const pathnameAbsolutePath = filename;
    const pathname = pathnameAbsolutePath
        ?.replace(`${cwd}${sep}`, `structure${sep}`)
        .split(sep)
        .join("/");

    try {
        validateFolderStructure(configPath, pathname);
    } catch (error) {
        if (!finalErrorGuard(error)) return;

        report({
            node,
            message: error.message,
        } as unknown as ReportDescriptor<"error">);
    }
};
