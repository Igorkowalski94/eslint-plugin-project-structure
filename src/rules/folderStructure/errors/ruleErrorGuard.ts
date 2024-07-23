import { RuleError } from "./RuleError";

export const ruleErrorGuard = (err: unknown): err is RuleError =>
    !!(err as RuleError).message;
