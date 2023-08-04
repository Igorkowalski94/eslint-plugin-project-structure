import { getInvalidRuleError } from "./getInvalidRuleError";
import { getIsFileFromPathname } from "../../../helpers/getIsFileFromPathName";
import { getNodeRule } from "../../../helpers/getNodeRule/getNodeRule";
import { ProjectStructureConfig, Rule } from "../../../types";

export const filterRulesByType = (
    pathName: string,
    rule: Rule,
    config: ProjectStructureConfig,
): boolean => {
    if (!rule || typeof rule !== "object" || Array.isArray(rule))
        throw getInvalidRuleError(rule);

    const nodeRule = getNodeRule(rule, config);

    const isFile = getIsFileFromPathname(pathName);
    const isFolderNode = !!nodeRule.children;
    const isFileNode = !!nodeRule.extension;

    if (!isFileNode && !isFolderNode) return true;
    if (!isFile && isFolderNode) return true;
    if (isFile && isFileNode) return true;
    return false;
};
