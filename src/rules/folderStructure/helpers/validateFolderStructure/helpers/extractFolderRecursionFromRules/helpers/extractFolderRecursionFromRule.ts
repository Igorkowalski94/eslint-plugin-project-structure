import { Rule } from "rules/folderStructure/folderStructure.types";
import { containFolderRecursionRuleId } from "rules/folderStructure/helpers/validateFolderStructure/helpers/extractFolderRecursionFromRules/helpers/containFolderRecursionRuleId";
import { getRule } from "rules/folderStructure/helpers/validateFolderStructure/helpers/getRule";

interface ExtractFolderRecursionFromRuleProps {
  rule: Rule;
  rules: Record<string, Rule>;
  ruleId: string;
  folderRecursionLimit: number;
}

export const extractFolderRecursionFromRule = ({
  folderRecursionLimit,
  rule,
  ruleId,
  rules,
}: ExtractFolderRecursionFromRuleProps): Rule | undefined => {
  const extractRule = (limit: number): Rule | undefined => {
    const newRule = getRule({ rule, rules });

    if (limit === 0) return undefined;

    return {
      ...newRule,
      children: newRule.children
        ?.map((child) => {
          if (
            containFolderRecursionRuleId({
              rule: child,
              ruleId,
              rules,
            })
          )
            return extractFolderRecursionFromRule({
              rule: child,
              ruleId,
              rules,
              folderRecursionLimit: limit,
            });

          return child;
        })
        .filter((v): v is Rule => v !== undefined),
    };
  };

  if (rule.ruleId === ruleId) return extractRule(folderRecursionLimit - 1);

  return extractRule(folderRecursionLimit);
};
