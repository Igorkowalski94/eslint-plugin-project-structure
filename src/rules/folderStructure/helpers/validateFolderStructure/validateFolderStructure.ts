import { sep } from "path";

import { validateConfig } from "helpers/validateConfig";

import { FolderStructureConfig } from "rules/folderStructure/folderStructure.types";
import { getPaths } from "rules/folderStructure/helpers/validateFolderStructure/helpers/getPaths";
import { getRootRule } from "rules/folderStructure/helpers/validateFolderStructure/helpers/getRootRule";
import { isIgnoredPathname } from "rules/folderStructure/helpers/validateFolderStructure/helpers/isIgnoredPathname";
import { FOLDER_STRUCTURE_SCHEMA } from "rules/folderStructure/helpers/validateFolderStructure/validateFolderStructure.consts";
import { validatePath } from "rules/folderStructure/helpers/validatePath/validatePath";

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
  validateConfig({ config, schema: FOLDER_STRUCTURE_SCHEMA });

  const { structure, ignorePatterns } = config;

  const rootRule = getRootRule(structure);
  const rootFolderName = cwd.split(sep).reverse()[0];

  const { filenameWithoutCwd, pathname } = getPaths({
    cwd,
    filename,
    rootFolderName,
  });

  if (isIgnoredPathname({ pathname: filenameWithoutCwd, ignorePatterns }))
    return;

  validatePath({
    pathname,
    filenameWithoutCwd,
    cwd,
    folderName: rootFolderName,
    rule: rootRule,
    config,
  });
};
