import { exportRules } from "./rules/exportRules/exportRules";
import { folderStructure } from "./rules/folderStructure/folderStructure";
import { independentModules } from "./rules/independentModules/independentModules";

// ts-prune-ignore-next
export const rules = {
    "folder-structure": folderStructure,
    "export-rules": exportRules,
    "independent-modules": independentModules,
};
