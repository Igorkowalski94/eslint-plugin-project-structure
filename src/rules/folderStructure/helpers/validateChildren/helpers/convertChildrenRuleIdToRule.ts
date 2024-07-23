import { FolderStructureConfig, Rule } from "../../../folderStructure.types";
import { getIdRule } from "../../getIdRule";
import { isIdRule } from "../../isIdRule";

export const convertChildrenRuleIdToRule = (
    children: Rule[],
    config: FolderStructureConfig,
): Rule[] =>
    children.map((rule) => {
        if (!isIdRule(rule)) return rule;

        const idRule = getIdRule(rule, config);
        if (idRule) return idRule;

        return rule;
    });
