import { filterRulesByType } from "./helpers/filterRulesByType";
import { getInvalidChildrenError } from "./helpers/getInvalidChildrenError";
import { getNextPath } from "./helpers/getNextPath";
import { validateRulesList } from "./helpers/validateRulesList";
import { ProjectStructureConfig, Rule } from "../../types";

export const validateChildren = (
    pathname: string,
    nodeName: string,
    children: Rule[],
    config: ProjectStructureConfig,
): void => {
    if (!Array.isArray(children)) throw getInvalidChildrenError(children);

    const nextPath = getNextPath(pathname, nodeName);

    const childrenByFileType = children.filter((node) =>
        filterRulesByType(nextPath, node, config),
    );

    if (children.length)
        validateRulesList(nextPath, nodeName, childrenByFileType, config);
};
