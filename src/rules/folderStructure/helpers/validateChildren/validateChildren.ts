import { filterRulesByType } from "./helpers/filterRulesByType";
import { getNextPathname } from "./helpers/getNextPathname";
import { sortChildrenByNameType } from "./helpers/sortChildrenByNameType";
import { validateRulesList } from "./helpers/validateRulesList";
import { FolderStructureConfig, Rule } from "../../folderStructure.types";
import { getRule } from "../getRule";

interface ValidateChildrenProps {
    pathname: string;
    filenameWithoutCwd: string;
    nodeName: string;
    children: Rule[];
    config: FolderStructureConfig;
}

export const validateChildren = ({
    pathname,
    filenameWithoutCwd,
    nodeName,
    children,
    config,
}: ValidateChildrenProps): void => {
    const nextPathname = getNextPathname({ pathname, nodeName });
    const childrenWithRules = children.map((rule) =>
        getRule({ rule, rules: config.rules }),
    );
    const sortedChildren = sortChildrenByNameType(childrenWithRules);

    const childrenByFileType = sortedChildren.filter((node) =>
        filterRulesByType({
            pathname: nextPathname,
            rule: node,
            rules: config.rules,
        }),
    );

    if (!sortedChildren.length) return;

    validateRulesList({
        pathname: nextPathname,
        filenameWithoutCwd,
        parentName: nodeName,
        nodesList: childrenByFileType,
        config,
    });
};
