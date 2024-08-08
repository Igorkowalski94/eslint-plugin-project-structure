import { RuleError } from "rules/folderStructure/errors/RuleError";

export const ruleErrorGuard = (err: unknown): err is RuleError =>
    !!((err as RuleError).type === "rule");
