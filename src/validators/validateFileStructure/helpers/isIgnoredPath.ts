import { getInvalidIgnorePatternsError } from "./getInvalidIgnorePatternsError";

export const isIgnoredPath = (
    filePath: string,
    ignorePatterns?: string[],
): boolean => {
    if (!ignorePatterns) return false;

    if (!Array.isArray(ignorePatterns))
        throw getInvalidIgnorePatternsError(ignorePatterns);

    const filePathUnifySep = filePath.includes("\\")
        ? filePath.replace(/\\/g, "/")
        : filePath;

    return ignorePatterns.some((pattern) =>
        new RegExp(pattern).test(filePathUnifySep),
    );
};
