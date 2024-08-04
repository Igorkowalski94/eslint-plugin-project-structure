import { getIdRuleError } from "../errors/getIdRuleError";
import { FolderStructureConfig, Rule } from "../folderStructure.types";

interface GetRuleProps {
    rule: Rule;
    rules: FolderStructureConfig["rules"];
}

export const getRule = ({ rule, rules = {} }: GetRuleProps): Rule => {
    const { ruleId, ...ruleWithoutRuleId } = rule;

    if (!ruleId) return rule;

    const ruleIdData = rules[ruleId];

    if (ruleIdData) return { ...ruleIdData, ...ruleWithoutRuleId };

    throw getIdRuleError(ruleId);
};
