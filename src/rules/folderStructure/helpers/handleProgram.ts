import { sep } from "path";

import { TSESTree } from "@typescript-eslint/utils";
import {
    ReportDescriptor,
    RuleContext,
} from "@typescript-eslint/utils/dist/ts-eslint/Rule";

import { validateFolderStructure } from "./validateFolderStructure/validateFolderStructure";
import { finalErrorGuard } from "../../../errors/finalErrorGuard";

export interface HandleProgramProps {
    context: RuleContext<"error", []>;
    node: TSESTree.Program;
}

type MessageIds = "error";

export const handleProgram = ({
    context: { cwd, settings, filename, report },
    node,
}: HandleProgramProps): void => {
    const configPath = `${cwd}${sep}${
        settings["project-structure/folder-structure-config-path"]
    }`;

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
        } as unknown as ReportDescriptor<MessageIds>);
    }
};
