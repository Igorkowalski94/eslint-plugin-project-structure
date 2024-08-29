import { RECURSION_LIMIT } from "consts";

import { getRecursionLimitError } from "errors/getRecursionLimitError";

import { getIdRuleError } from "rules/folderStructure/errors/getIdRuleError";
import {
  Rule,
  FolderStructureConfig,
} from "rules/folderStructure/folderStructure.types";

interface GetRuleProps {
  rule: Rule;
  rules: FolderStructureConfig["rules"];
  recursionLimit?: number;
}

export const getRule = ({
  rule,
  rules = {},
  recursionLimit = RECURSION_LIMIT,
}: GetRuleProps): Rule => {
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
