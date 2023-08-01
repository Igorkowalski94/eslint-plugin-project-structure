import { getIncorrectIdRuleError } from "./helpers/getIncorrectIdRuleError";
import { RuleId, ProjectStructureConfig, Rule } from "../../types";

export const getIdRule = (
    { ruleId }: RuleId,
    config: ProjectStructureConfig,
): Rule | void => {
    const rules = config.rules || {};
    const idRule = rules[ruleId];

    if (idRule) return idRule;

    throw getIncorrectIdRuleError(ruleId);
};
