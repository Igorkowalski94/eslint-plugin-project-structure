import parser from "parser";

import { folderStructure } from "rules/folderStructure/folderStructure";
import { createFolderStructure } from "rules/folderStructure/helpers/createFolderStructure";
import { createIndependentModules } from "rules/independentModules/helpers/createIndependentModules";
import { independentModules } from "rules/independentModules/independentModules";
import { createNamingRules } from "rules/namingRules/helpers/createNamingRules";
import { namingRules } from "rules/namingRules/namingRules";

// ts-prune-ignore-next
export const projectStructurePlugin = {
  rules: {
    "folder-structure": folderStructure,
    "naming-rules": namingRules,
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
export { createNamingRules } from "rules/namingRules/helpers/createNamingRules";

module.exports = {
  projectStructurePlugin,
  projectStructureParser: parser,
  createIndependentModules,
  createFolderStructure,
  createNamingRules,
  // For old eslint config
  rules: {
    "folder-structure": folderStructure,
    "naming-rules": namingRules,
    "independent-modules": independentModules,
  },
};
