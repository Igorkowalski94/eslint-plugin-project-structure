import { getIdRule } from "../../../helpers/getIdRule/getIdRule";
import { isIdRule } from "../../../helpers/getNodeRule/helpers/isIdRule";
import { ProjectStructureConfig, Rule } from "../../../types";

export const convertChildrenRuleIdToRule = (
    children: Rule[],
    config: ProjectStructureConfig,
): Rule[] =>
    children.map((rule) => {
        if (!isIdRule(rule)) return rule;

        const idRule = getIdRule(rule, config);
        if (idRule) return idRule;

        return rule;
    });
