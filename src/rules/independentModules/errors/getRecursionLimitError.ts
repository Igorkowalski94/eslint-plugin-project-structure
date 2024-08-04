import { Pattern } from "../independentModules.types";

export const getRecursionLimitError = (pattern: Pattern[]): Error =>
    new Error(`🔥 Recursion limit for pattern: ${JSON.stringify(pattern)} 🔥`);
