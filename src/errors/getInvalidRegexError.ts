export const getInvalidRegexError = (regex: string): Error =>
    new Error(`🔥 Regex: ${regex} is invalid. 🔥`);
