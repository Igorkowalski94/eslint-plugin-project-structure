import { convertChildrenRuleIdToRule } from "./helpers/convertChildrenRuleIdToRule";
import { filterRulesByType } from "./helpers/filterRulesByType";
import { getInvalidChildrenError } from "./helpers/getInvalidChildrenError";
import { getNextPath } from "./helpers/getNextPath";
import { sortChildrenByNameType } from "./helpers/sortChildrenByNameType";
import { validateRulesList } from "./helpers/validateRulesList";
import { ProjectStructureConfig, Rule } from "../../types";

export const validateChildren = (
    pathname: string,
    nodeName: string,
    children: Rule[],
    config: ProjectStructureConfig,
): void => {
    if (
        !Array.isArray(children) ||
        children.some(
            (child) =>
                !child || typeof child !== "object" || Array.isArray(child),
        )
    )
        throw getInvalidChildrenError(children);

    const nextPath = getNextPath(pathname, nodeName);

    const convertedChildren = convertChildrenRuleIdToRule(children, config);
    const sortedChildren = sortChildrenByNameType(convertedChildren);

    const childrenByFileType = sortedChildren.filter((node) =>
        filterRulesByType(nextPath, node, config),
    );

    if (sortedChildren.length)
        validateRulesList(nextPath, nodeName, childrenByFileType, config);
};
