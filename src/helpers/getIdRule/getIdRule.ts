import { getIdRuleError } from "./helpers/getIdRuleError";
import { getInvalidRuleIdError } from "./helpers/getInvalidRuleIdError";
import { getInvalidRulesError } from "./helpers/getInvalidRulesError";
import { RuleId, ProjectStructureConfig, Rule } from "../../types";

export const getIdRule = (
    { ruleId }: RuleId,
    { rules }: ProjectStructureConfig,
): Rule | void => {
    if (ruleId !== undefined && typeof ruleId !== "string")
        throw getInvalidRuleIdError(ruleId);

    if (!rules || typeof rules !== "object" || Array.isArray(rules))
        throw getInvalidRulesError(rules);

    const idRule = rules[ruleId];

    if (idRule) return idRule;

    throw getIdRuleError(ruleId);
};
