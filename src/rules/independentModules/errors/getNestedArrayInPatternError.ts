import { FinalError } from "../../../errors/FinalError";
import { Pattern } from "../independentModules.types";

export const getNestedArrayInPatternError = (
    patterns: Pattern[],
    referenceKey: string,
): Error =>
    new FinalError(
        `🔥 You want to use {${referenceKey}} in the ${JSON.stringify(patterns)} pattern, but {${referenceKey}} has nested arrays within it. 🔥`,
    );
