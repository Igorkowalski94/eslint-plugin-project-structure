import { getIdRuleError } from "rules/folderStructure/errors/getIdRuleError";
import {
  Rule,
  FolderStructureConfig,
} from "rules/folderStructure/folderStructure.types";

interface GetRuleProps {
  rule: Rule;
  rules: FolderStructureConfig["rules"];
}

export const getRule = ({ rule, rules = {} }: GetRuleProps): Rule => {
  const { ruleId, ...ruleWithoutRuleId } = rule;

  if (!ruleId) return rule;

  const ruleIdData = rules[ruleId];

  /**
   * User can provide random ruleId.
   */
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (ruleIdData) return { ...ruleIdData, ...ruleWithoutRuleId };

  throw getIdRuleError(ruleId);
};
