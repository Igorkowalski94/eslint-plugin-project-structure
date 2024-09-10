import { Rule } from "rules/folderStructure/folderStructure.types";
import { getRule } from "rules/folderStructure/helpers/validateFolderStructure/helpers/getRule";

interface ContainFolderRecursionRuleIdProps {
  ruleId: string;
  rules?: Record<string, Rule>;
  rule: Rule;
  nestingLvlLimit?: number;
}

export const containFolderRecursionRuleId = ({
  rule,
  ruleId,
  rules,
  nestingLvlLimit = 20,
}: ContainFolderRecursionRuleIdProps): boolean => {
  if (ruleId === rule.ruleId) return true;

  const childRule = getRule({ rule, rules });

  if (nestingLvlLimit === 0 || !childRule.children) return false;

  return childRule.children.some((child) =>
    containFolderRecursionRuleId({
      rule: child,
      ruleId,
      rules,
      nestingLvlLimit: nestingLvlLimit - 1,
    }),
  );
};
