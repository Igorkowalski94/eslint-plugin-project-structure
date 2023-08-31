import { getNodeRule } from "../../../helpers/getNodeRule/getNodeRule";
import { isFileFromPathname } from "../../../helpers/isFileFromPathname";
import { ProjectStructureConfig, Rule } from "../../../types";

export interface FilterRulesByType {
    pathname: string;
    rule: Rule;
    config: ProjectStructureConfig;
}

export const filterRulesByType = ({
    pathname,
    rule,
    config,
}: FilterRulesByType): boolean => {
    const nodeRule = getNodeRule(rule, config);

    const isFile = isFileFromPathname(pathname);
    const isFolderNode = !!nodeRule.children;
    const isFileNode = !!nodeRule.extension;

    if (!isFileNode && !isFolderNode) return true;
    if (!isFile && isFolderNode) return true;
    if (isFile && isFileNode) return true;
    return false;
};
