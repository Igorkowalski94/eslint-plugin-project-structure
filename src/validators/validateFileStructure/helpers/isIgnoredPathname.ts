import { getInvalidIgnorePatternsError } from "./getInvalidIgnorePatternsError";

export const isIgnoredPathname = (
    pathname: string,
    ignorePatterns?: string[],
): boolean => {
    if (!ignorePatterns) return false;

    if (
        !Array.isArray(ignorePatterns) ||
        (Array.isArray(ignorePatterns) &&
            ignorePatterns.some(
                (pattern) => !pattern || typeof pattern !== "string",
            ))
    )
        throw getInvalidIgnorePatternsError(ignorePatterns);

    const pathnameUnifySep = pathname.includes("\\")
        ? pathname.replace(/\\/g, "/")
        : pathname;

    return ignorePatterns.some((pattern) =>
        new RegExp(pattern).test(pathnameUnifySep),
    );
};
