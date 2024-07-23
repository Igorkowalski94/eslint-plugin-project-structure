import { FinalError } from "../../../errors/FinalError";

export const getInvalidRegexError = (regex: string): FinalError =>
    new FinalError(`\n\n🔥 Regex: ${regex} is invalid. 🔥\n\n`);
