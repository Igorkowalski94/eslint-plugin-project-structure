import { Rule } from "rules/folderStructure/folderStructure.types";
import { getRule } from "rules/folderStructure/helpers/validateFolderStructure/helpers/getRule";
import { removeRuleReplicatesFromChildren } from "rules/folderStructure/helpers/validateFolderStructure/helpers/validatePath/helpers/getChildren/helpers/removeRuleReplicatesFromChildren";
import { sortChildrenByNameType } from "rules/folderStructure/helpers/validateFolderStructure/helpers/validatePath/helpers/getChildren/helpers/sortChildrenByNameType";

interface GetChildrenProps {
  children?: Rule[];
  rules?: Record<string, Rule>;
}

export const getChildren = ({
  children,
  rules,
}: GetChildrenProps): Rule[] | undefined => {
  if (!children) return;

  const childrenWithoutRuleId = children.map((rule) =>
    getRule({ rule, rules }),
  );

  const childrenWithoutReplicatedRules = removeRuleReplicatesFromChildren(
    childrenWithoutRuleId,
  );

  return sortChildrenByNameType(childrenWithoutReplicatedRules);
};
