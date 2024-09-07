import { Rule } from "rules/folderStructure/folderStructure.types";
import { isRegex } from "rules/folderStructure/helpers/validateFolderStructure/helpers/validatePath/helpers/getChildren/helpers/isRegex";

/**
 * To avoid fixed name/regex overlap.
 *
 * Sort order:
 * 1. Fixed names
 * 2. Regex
 *
 * {
 *   "children": [
 *       {
 *           "name": "FixedName",
 *           "children": []
 *       },
 *       {
 *           "name": "{PascalCase}",
 *           "children": []
 *       }
 *   ]
 * }
 */
export const sortChildrenByNameType = (children: Rule[]): Rule[] =>
  children.sort(({ name: nameA }, { name: nameB }) => {
    if (isRegex(nameA) && !isRegex(nameB)) return 1;
    if (!nameA && !isRegex(nameB)) return 1;

    return -1;
  });
