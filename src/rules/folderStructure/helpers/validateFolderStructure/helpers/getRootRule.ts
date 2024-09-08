import {
  FolderStructureConfig,
  Rule,
} from "rules/folderStructure/folderStructure.types";
import { getRule } from "rules/folderStructure/helpers/validateFolderStructure/helpers/getRule";

interface GetRootRuleProps {
  structure: FolderStructureConfig["structure"];
  rootFolderName: string;
  rules: FolderStructureConfig["rules"];
}

export const getRootRule = ({
  structure,
  rules,
  rootFolderName,
}: GetRootRuleProps): Rule => {
  if (Array.isArray(structure))
    return {
      name: rootFolderName,
      children: structure,
    };

  return {
    ...getRule({ rule: structure, rules }),
    name: rootFolderName,
  };
};
