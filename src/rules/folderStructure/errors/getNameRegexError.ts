import { RuleError } from "./RuleError";

export const getNameRegexError = (regex: string): RuleError =>
    new RuleError(`"${regex}"`);
