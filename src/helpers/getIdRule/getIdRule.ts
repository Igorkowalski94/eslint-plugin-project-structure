import { getIdRuleError } from "./helpers/getIdRuleError";
import { getInvalidRuleIdError } from "./helpers/getInvalidRuleIdError";
import { getInvalidRulesError } from "./helpers/getInvalidRulesError";
import { ProjectStructureConfig, Rule, RuleId } from "../../types";

export const getIdRule = (
    rule: RuleId,
    { rules }: ProjectStructureConfig,
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
