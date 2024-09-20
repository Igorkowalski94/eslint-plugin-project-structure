import parser from "parser";

import { fileComposition } from "rules/fileComposition/fileComposition";
import { createFileComposition } from "rules/fileComposition/helpers/createFileComposition";
import { folderStructure } from "rules/folderStructure/folderStructure";
import { createFolderStructure } from "rules/folderStructure/helpers/createFolderStructure";
import { createIndependentModules } from "rules/independentModules/helpers/createIndependentModules";
import { independentModules } from "rules/independentModules/independentModules";

// ts-prune-ignore-next
export const projectStructurePlugin = {
  rules: {
    "folder-structure": folderStructure,
    "file-composition": fileComposition,
    "independent-modules": independentModules,
  },
};
// ts-prune-ignore-next
export { parser as projectStructureParser } from "parser";
// ts-prune-ignore-next
export { createIndependentModules } from "rules/independentModules/helpers/createIndependentModules";
// ts-prune-ignore-next
export { createFolderStructure } from "rules/folderStructure/helpers/createFolderStructure";
// ts-prune-ignore-next
export { createFileComposition } from "rules/fileComposition/helpers/createFileComposition";

module.exports = {
  projectStructurePlugin,
  projectStructureParser: parser,
  createIndependentModules,
  createFolderStructure,
  createFileComposition,
  // For old eslint config
  rules: {
    "folder-structure": folderStructure,
    "file-composition": fileComposition,
    "independent-modules": independentModules,
  },
};
