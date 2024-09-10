import { RECURSION_LIMIT } from "consts";

import { getInvalidFolderRecursionLimitError } from "rules/folderStructure/errors/getInvalidFolderRecursionLimitError";
import {
  FolderRecursionRule,
  Rule,
} from "rules/folderStructure/folderStructure.types";
import { extractFolderRecursionFromRule } from "rules/folderStructure/helpers/validateFolderStructure/helpers/extractFolderRecursionFromRules/helpers/extractFolderRecursionFromRule";
import { getRule } from "rules/folderStructure/helpers/validateFolderStructure/helpers/getRule";

export const extractFolderRecursionFromRules = (
  rules?: Record<string, FolderRecursionRule>,
): Record<string, Rule> | undefined => {
  if (!rules) return;

  const rulesWithoutFolderRecursionLimit = Object.keys(rules).reduce(
    (acc, key) => {
      const { folderRecursionLimit, ...rule } = rules[key];
      return { ...acc, [key]: rule };
    },
    {},
  );

  return Object.keys(rules).reduce((acc, key) => {
    const { folderRecursionLimit, ...rule } = getRule({
      rule: rules[key],
      rules,
    });

    if (!folderRecursionLimit) return { ...acc, [key]: rules[key] };

    if (folderRecursionLimit > RECURSION_LIMIT)
      throw getInvalidFolderRecursionLimitError();

    return {
      ...acc,
      [key]: extractFolderRecursionFromRule({
        rule,
        ruleId: key,
        rules: rulesWithoutFolderRecursionLimit,
        folderRecursionLimit,
      }),
    };
  }, {});
};
