import { filterRulesByType } from "./helpers/filterRulesByType";
import { getNextPath } from "./helpers/getNextPath";
import { validateRulesList } from "./helpers/validateRulesList";
import { FolderRule, ProjectStructureConfig } from "../../types";

export const validateChildren = (
    pathname: string,
    nodeName: string,
    rule: FolderRule,
    config: ProjectStructureConfig,
): void => {
    const nextPath = getNextPath(pathname, nodeName);

    const childrenByFileType = rule.children.filter((node) =>
        filterRulesByType(nextPath, node, config),
    );

    if (childrenByFileType.length)
        validateRulesList(nextPath, nodeName, childrenByFileType, config);
};
