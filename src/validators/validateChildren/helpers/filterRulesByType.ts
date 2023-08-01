import { getIsFileFromPathname } from "../../../helpers/getIsFileFromPathName";
import { getNodeRule } from "../../../helpers/getNodeRule/getNodeRule";
import { ProjectStructureConfig, Rule } from "../../../types";

export const filterRulesByType = (
    pathName: string,
    rule: Rule,
    config: ProjectStructureConfig,
): boolean => {
    const nodeRule = getNodeRule(rule, config);

    const isFile = getIsFileFromPathname(pathName);
    const isFolderNode = nodeRule.type === "folder";
    const isFileNode = nodeRule.extension || nodeRule.type == "file";

    if (!isFileNode && !isFolderNode) return true;
    if (!isFile && isFolderNode) return true;
    if (isFile && isFileNode) return true;
    return false;
};
