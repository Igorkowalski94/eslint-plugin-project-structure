import {
  NamingRule,
  NamingRuleObject,
} from "rules/namingRules/namingRules.types";

export const getRules = (
  namingRule: NamingRule[] | NamingRuleObject,
): NamingRule[] => (Array.isArray(namingRule) ? namingRule : namingRule.rules);
