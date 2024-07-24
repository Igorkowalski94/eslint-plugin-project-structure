import { folderStructure } from "./rules/folderStructure/folderStructure";
import { independentModules } from "./rules/independentModules/independentModules";
import { namingRules } from "./rules/namingRules/namingRules";

// ts-prune-ignore-next
export const rules = {
    "folder-structure": folderStructure,
    "naming-rules": namingRules,
    "independent-modules": independentModules,
};
