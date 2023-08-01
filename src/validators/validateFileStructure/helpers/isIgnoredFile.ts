import { ProjectStructureConfig } from "../../../types";

export const isIgnoredFile = (
    filePath: string,
    config: ProjectStructureConfig,
): boolean => {
    if (!config.ignorePatterns) return false;

    return config.ignorePatterns.some((pattern) =>
        new RegExp(pattern).test(filePath),
    );
};
