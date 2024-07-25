import { convertChildrenRuleIdToRule } from "./helpers/convertChildrenRuleIdToRule";
import { filterRulesByType } from "./helpers/filterRulesByType";
import { getNextPathname } from "./helpers/getNextPathname";
import { sortChildrenByNameType } from "./helpers/sortChildrenByNameType";
import { validateRulesList } from "./helpers/validateRulesList";
import { getInvalidChildrenError } from "../../errors/getInvalidChildrenError";
import { FolderStructureConfig, Rule } from "../../folderStructure.types";

interface ValidateChildrenProps {
    pathname: string;
    nodeName: string;
    children: Rule[];
    config: FolderStructureConfig;
}

export const validateChildren = ({
    pathname,
    nodeName,
    children,
    config,
}: ValidateChildrenProps): void => {
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
