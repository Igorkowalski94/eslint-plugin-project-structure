import {
  FolderStructureConfig,
  Rule,
} from "rules/folderStructure/folderStructure.types";

export const getRootRule = (
  structure: FolderStructureConfig["structure"],
): Rule => {
  if (Array.isArray(structure))
    return {
      children: structure,
    };

  return structure;
};
