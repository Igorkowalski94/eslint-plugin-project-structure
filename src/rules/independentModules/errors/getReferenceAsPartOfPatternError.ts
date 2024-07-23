import { FinalError } from "../../../errors/FinalError";

export const getReferenceAsPartOfPatternError = (
    referenceKey: string,
    pattern: string,
): Error =>
    new FinalError(
        `🔥 You want to use {${referenceKey}} as part of '${pattern}' pattern, but {${referenceKey}} contains more than one pattern. 🔥`,
    );
