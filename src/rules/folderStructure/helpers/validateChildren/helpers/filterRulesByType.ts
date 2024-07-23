import { FolderStructureConfig, Rule } from "../../../folderStructure.types";
import { getNodeRule } from "../../getNodeRule";
import { isFileFromPathname } from "../../isFileFromPathname";

export interface FilterRulesByType {
    pathname: string;
    rule: Rule;
    config: FolderStructureConfig;
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
