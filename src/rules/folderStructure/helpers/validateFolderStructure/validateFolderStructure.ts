import path, { sep } from "path";

import { validateConfig } from "helpers/validateConfig";

import { FolderStructureConfig } from "rules/folderStructure/folderStructure.types";
import { checkNodeExistence } from "rules/folderStructure/helpers/validateFolderStructure/helpers/checkNodeExistence";
import { extractFolderRecursionFromRules } from "rules/folderStructure/helpers/validateFolderStructure/helpers/extractFolderRecursionFromRules/extractFolderRecursionFromRules";
import { getPathname } from "rules/folderStructure/helpers/validateFolderStructure/helpers/getPathname";
import { getRootRule } from "rules/folderStructure/helpers/validateFolderStructure/helpers/getRootRule";
import { isIgnoredPathname } from "rules/folderStructure/helpers/validateFolderStructure/helpers/isIgnoredPathname";
import { validateLongPath } from "rules/folderStructure/helpers/validateFolderStructure/helpers/validateLongPath";
import { validatePath } from "rules/folderStructure/helpers/validateFolderStructure/helpers/validatePath/validatePath";
import { FOLDER_STRUCTURE_SCHEMA } from "rules/folderStructure/helpers/validateFolderStructure/validateFolderStructure.consts";

interface ValidateFolderStructureProps {
  filename: string;
  cwd: string;
  config: FolderStructureConfig;
}

export const validateFolderStructure = ({
  filename,
  cwd,
  config,
}: ValidateFolderStructureProps): void => {
  const { structure, ignorePatterns, longPathsInfo, rules } = config;

  validateConfig({ config, schema: FOLDER_STRUCTURE_SCHEMA });

  const rulesWithFolderRecursion = extractFolderRecursionFromRules(rules);
  const rootFolderName = path.basename(cwd);
  const rootRule = getRootRule({
    structure,
    rootFolderName,
    rules: rulesWithFolderRecursion,
  });
  const pathname = getPathname({
    cwd,
    filename,
  });

  if (isIgnoredPathname({ pathname, ignorePatterns })) return;

  validateLongPath({ filename, cwd, longPathsInfo });

  if (rootRule.enforceExistence) {
    checkNodeExistence({
      enforceExistence: rootRule.enforceExistence,
      nodeName: rootFolderName,
      nodeType: "Folder",
      cwd,
      nodePath: cwd.replaceAll(sep, "/"),
    });
  }

  validatePath({
    pathname,
    filenameWithoutCwd: pathname,
    cwd,
    folderName: rootFolderName,
    rule: rootRule,
    config: { ...config, rules: rulesWithFolderRecursion },
  });
};
