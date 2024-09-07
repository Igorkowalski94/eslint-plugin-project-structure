import {
  FolderStructureConfig,
  Rule,
} from "rules/folderStructure/folderStructure.types";

interface GetRootRuleProps {
  structure: FolderStructureConfig["structure"];
  rootFolderName: string;
}

export const getRootRule = ({ structure }: GetRootRuleProps): Rule => {
  if (Array.isArray(structure))
    return {
      name: "*",
      children: structure,
    };

  return {
    ...structure,
    name: "*",
  };
};
