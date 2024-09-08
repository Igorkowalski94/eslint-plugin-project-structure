import path from "path";

import { validateConfig } from "helpers/validateConfig";

import { FolderStructureConfig } from "rules/folderStructure/folderStructure.types";
import { checkNodeExistence } from "rules/folderStructure/helpers/validateFolderStructure/helpers/checkNodeExistence";
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
  validateLongPath({ path: filename, longPathsInfo });

  const rootFolderName = path.basename(cwd);
  const rootRule = getRootRule({ structure, rootFolderName, rules });
  const pathname = getPathname({
    cwd,
    filename,
  });

  if (isIgnoredPathname({ pathname, ignorePatterns })) return;

  if (rootRule.enforceExistence) {
    checkNodeExistence({
      enforceExistence: rootRule.enforceExistence,
      filenameWithoutCwd: cwd,
      nodeName: rootFolderName,
      nodeType: "Folder",
      cwd,
    });
  }

  validatePath({
    pathname,
    filenameWithoutCwd: pathname,
    cwd,
    folderName: rootFolderName,
    rule: rootRule,
    config,
  });
};
