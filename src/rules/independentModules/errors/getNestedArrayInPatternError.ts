import { Pattern } from "rules/independentModules/independentModules.types";

export const getNestedArrayInPatternError = (
    patterns: Pattern[],
    referenceKey: string,
): Error =>
    new Error(
        `🔥 You want to use {${referenceKey}} in the ${JSON.stringify(patterns)} pattern, but {${referenceKey}} has nested arrays within it. 🔥`,
    );
