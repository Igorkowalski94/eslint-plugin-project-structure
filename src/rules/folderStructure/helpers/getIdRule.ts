import { getIdRuleError } from "../errors/getIdRuleError";
import { getInvalidRuleIdError } from "../errors/getInvalidRuleIdError";
import { getInvalidRulesError } from "../errors/getInvalidRulesError";
import { FolderStructureConfig, Rule, RuleId } from "../folderStructure.types";

export const getIdRule = (
    rule: RuleId,
    { rules }: FolderStructureConfig,
): Rule | void => {
    const { ruleId, ...ruleWithoutRuleId } = rule;

    if (ruleId !== undefined && typeof ruleId !== "string")
        throw getInvalidRuleIdError(ruleId);

    if (!rules || typeof rules !== "object" || Array.isArray(rules))
        throw getInvalidRulesError();

    const idRule = rules[ruleId];

    if (idRule) return { ...idRule, ...ruleWithoutRuleId } as Rule;

    throw getIdRuleError(ruleId);
};
