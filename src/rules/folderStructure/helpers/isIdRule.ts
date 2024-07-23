import { Rule, RuleId } from "../folderStructure.types";

export const isIdRule = (rule: Rule): rule is RuleId =>
    "ruleId" in rule && !!rule.ruleId;
