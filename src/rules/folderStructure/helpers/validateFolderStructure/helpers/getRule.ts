import { RECURSION_LIMIT } from "consts";

import { getRecursionLimitError } from "errors/getRecursionLimitError";

import { getIdRuleError } from "rules/folderStructure/errors/getIdRuleError";
import { Rule } from "rules/folderStructure/folderStructure.types";

interface GetRuleProps<T> {
  rule: T;
  rules?: Record<string, T>;
  recursionLimit?: number;
}

export const getRule = <T extends Rule = Rule>({
  rule,
  rules = {},
  recursionLimit = RECURSION_LIMIT,
}: GetRuleProps<T>): T => {
  if (recursionLimit === 0) throw getRecursionLimitError(rule);

  const { ruleId, ...ruleWithoutRuleId } = rule;

  if (!ruleId) return rule;

  const ruleIdData = rules[ruleId];

  /**
   * User can provide random ruleId.
   */
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (ruleIdData?.ruleId)
    return getRule({
      rule: { ...ruleIdData, ...ruleWithoutRuleId, ruleId: ruleIdData.ruleId },
      rules,
      recursionLimit: recursionLimit - 1,
    });

  /**
   * User can provide random ruleId.
   */
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (ruleIdData) return { ...ruleIdData, ...ruleWithoutRuleId };

  throw getIdRuleError(ruleId);
};
