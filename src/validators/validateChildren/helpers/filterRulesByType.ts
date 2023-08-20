import { getIsFileFromPathname } from "../../../helpers/getIsFileFromPathName";
import { getNodeRule } from "../../../helpers/getNodeRule/getNodeRule";
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

    const isFile = getIsFileFromPathname(pathname);
    const isFolderNode = !!nodeRule.children;
    const isFileNode = !!nodeRule.extension;

    if (!isFileNode && !isFolderNode) return true;
    if (!isFile && isFolderNode) return true;
    if (isFile && isFileNode) return true;
    return false;
};
