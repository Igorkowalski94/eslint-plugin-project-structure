import { convertChildrenRuleIdToRule } from "./helpers/convertChildrenRuleIdToRule";
import { filterRulesByType } from "./helpers/filterRulesByType";
import { getInvalidChildrenError } from "./helpers/getInvalidChildrenError";
import { getNextPathname } from "./helpers/getNextPath";
import { sortChildrenByNameType } from "./helpers/sortChildrenByNameType";
import { validateRulesList } from "./helpers/validateRulesList";
import { ProjectStructureConfig, Rule } from "../../types";

interface ValidateChildren {
    pathname: string;
    nodeName: string;
    children: Rule[];
    config: ProjectStructureConfig;
}

export const validateChildren = ({
    pathname,
    nodeName,
    children,
    config,
}: ValidateChildren): void => {
    if (
        !Array.isArray(children) ||
        children.some(
            (child) =>
                !child || typeof child !== "object" || Array.isArray(child),
        )
    )
        throw getInvalidChildrenError(children);

    const nextPathname = getNextPathname(pathname, nodeName);
    const convertedChildren = convertChildrenRuleIdToRule(children, config);
    const sortedChildren = sortChildrenByNameType(convertedChildren);

    const childrenByFileType = sortedChildren.filter((node) =>
        filterRulesByType({ pathname: nextPathname, rule: node, config }),
    );

    if (sortedChildren.length)
        validateRulesList({
            pathname: nextPathname,
            parentName: nodeName,
            nodesList: childrenByFileType,
            config,
        });
};
