import { RuleId, Rule } from "../../../types";

export const isIdRule = (rule: Rule): rule is RuleId => "ruleId" in rule;
