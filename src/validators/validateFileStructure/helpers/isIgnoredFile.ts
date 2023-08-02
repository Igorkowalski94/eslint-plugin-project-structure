import { ProjectStructureConfig } from "../../../types";

export const isIgnoredFile = (
    filePath: string,
    config: ProjectStructureConfig,
): boolean => {
    if (!config.ignorePatterns) return false;

    const filePathUnifySep = filePath.includes("\\")
        ? filePath.replace(/\\/g, "/")
        : filePath;

    return config.ignorePatterns.some((pattern) =>
        new RegExp(pattern).test(filePathUnifySep),
    );
};
