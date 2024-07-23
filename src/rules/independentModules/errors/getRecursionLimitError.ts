import { FinalError } from "../../../errors/FinalError";
import { Pattern } from "../independentModules.types";

export const getRecursionLimitError = (pattern: Pattern[]): Error =>
    new FinalError(
        `🔥 Recursion limit for pattern: ${JSON.stringify(pattern)} 🔥`,
    );
