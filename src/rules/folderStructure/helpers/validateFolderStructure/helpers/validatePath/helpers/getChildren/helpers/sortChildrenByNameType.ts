/* eslint-disable complexity */
import { Rule } from "rules/folderStructure/folderStructure.types";
import { isRegex } from "rules/folderStructure/helpers/validateFolderStructure/helpers/validatePath/helpers/getChildren/helpers/isRegex";

/**
 * To avoid fixed name/regex overlap.
 *
 * Sort order:
 * 1. File fixed names
 * 2. File regex
 * 3. File use*
 * 4. File *
 * 5. Folder fixed names
 * 6. Folder regex
 * 7. Folder use*
 * 8. Folder *
 * 8. ruleId
 */
export const sortChildrenByNameType = (children: Rule[]): Rule[] =>
  children.sort(
    (
      { name: nameA, children: childrenA },
      { name: nameB, children: childrenB },
    ) => {
      if (nameA && !nameB) return -1;
      if (!nameA && nameB) return 1;

      if (!childrenA && childrenB) return -1;
      if (childrenA && !childrenB) return 1;

      if (nameA === "*" && nameB !== "*") return 1;
      if (nameA !== "*" && nameB === "*") return -1;

      if (nameA?.includes("*") && !nameB?.includes("*")) return 1;
      if (!nameA?.includes("*") && nameB?.includes("*")) return -1;

      if (isRegex(nameA) && !isRegex(nameB)) return 1;
      if (!isRegex(nameA) && isRegex(nameB)) return -1;

      return -1;
    },
  );
