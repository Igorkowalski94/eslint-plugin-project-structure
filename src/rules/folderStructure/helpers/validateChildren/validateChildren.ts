import {
  Rule,
  FolderStructureConfig,
} from "rules/folderStructure/folderStructure.types";
import { getRule } from "rules/folderStructure/helpers/getRule";
import { filterRulesByType } from "rules/folderStructure/helpers/validateChildren/helpers/filterRulesByType";
import { getNextPathname } from "rules/folderStructure/helpers/validateChildren/helpers/getNextPathname";
import { removeRuleReplicatesFromChildren } from "rules/folderStructure/helpers/validateChildren/helpers/removeRuleReplicatesFromChildren";
import { sortChildrenByNameType } from "rules/folderStructure/helpers/validateChildren/helpers/sortChildrenByNameType";
import { validateRulesList } from "rules/folderStructure/helpers/validateChildren/helpers/validateRulesList";

interface ValidateChildrenProps {
  pathname: string;
  filenameWithoutCwd: string;
  nodeName: string;
  children: Rule[];
  config: FolderStructureConfig;
  cwd: string;
}

export const validateChildren = ({
  pathname,
  filenameWithoutCwd,
  nodeName,
  children,
  config,
  cwd,
}: ValidateChildrenProps): void => {
  const childrenWithoutReplicatedRules =
    removeRuleReplicatesFromChildren(children);

  const nextPathname = getNextPathname({ pathname, nodeName });
  const childrenWithRules = childrenWithoutReplicatedRules.map((rule) =>
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
    cwd,
  });
};
