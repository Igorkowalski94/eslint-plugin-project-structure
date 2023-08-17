import { getIdRule } from "../../../helpers/getIdRule/getIdRule";
import { ProjectStructureConfig, Rule } from "../../../types";

export const convertChildrenRuleIdToRule = (
    children: Rule[],
    config: ProjectStructureConfig,
): Rule[] =>
    children.map((rule) => {
        if (!rule.ruleId) return rule;

        const idRule = getIdRule(rule, config);
        if (idRule) return idRule;

        return rule;
    });
