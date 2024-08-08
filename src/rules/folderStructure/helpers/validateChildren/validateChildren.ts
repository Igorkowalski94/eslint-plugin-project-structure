import {
    Rule,
    FolderStructureConfig,
} from "rules/folderStructure/folderStructure.types";
import { getRule } from "rules/folderStructure/helpers/getRule";
import { filterRulesByType } from "rules/folderStructure/helpers/validateChildren/helpers/filterRulesByType";
import { getNextPathname } from "rules/folderStructure/helpers/validateChildren/helpers/getNextPathname";
import { sortChildrenByNameType } from "rules/folderStructure/helpers/validateChildren/helpers/sortChildrenByNameType";
import { validateRulesList } from "rules/folderStructure/helpers/validateChildren/helpers/validateRulesList";

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
