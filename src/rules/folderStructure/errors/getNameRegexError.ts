import { RuleError } from "rules/folderStructure/errors/RuleError";

export const getNameRegexError = (regex: string): RuleError =>
    new RuleError(regex);
