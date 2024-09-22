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

// ts-prune-ignore-next
export const KEYWORDS = `
  conventions,
  architecture,
  file,
  folder,
  project,
  structure,
  filename,
  file,
  validation,
  rules,
  clean,
  frontend,
  backend

  naming-conventions,
  file-composition,
  independent-modules,

  project architecture,
  project structure,
  folder structure,
  file structure,

  react,
  react folder structure,
  react file structure,
  react project structure,
  react architecture,
  react conventions,

  react native,
  react native folder structure,
  react native file structure,
  react native project structure,
  react native architecture,
  react native conventions,

  nextjs
  nextjs folder structure,
  nextjs file structure,
  nextjs project structure,
  nextjs architecture,
  nextjs conventions,

  remix,
  remix folder structure,
  remix file structure,
  remix project structure,
  remix architecture,
  remix conventions,

  angular,
  angular folder structure,
  angular file structure,
  angular project structure,
  angular architecture,
  angular conventions,

  vue,
  vue folder structure,
  vue file structure,
  vue project structure,
  vue architecture,
  vue conventions,

  node,
  node folder structure,
  node file structure,
  node project structure,
  node architecture,
  node conventions,

  express,
  express folder structure,
  express file structure,
  express project structure,
  express architecture,
  express conventions,

  nestjs,
  nestjs folder structure,
  nestjs file structure,
  nestjs project structure,
  nestjs architecture,
  nestjs conventions,

  solid,
  solid folder structure,
  solid file structure,
  solid project structure,
  solid architecture,
  solid conventions,

  svelte,
  svelte folder structure,
  svelte file structure,
  svelte project structure,
  svelte architecture,
  svelte conventions
`;
