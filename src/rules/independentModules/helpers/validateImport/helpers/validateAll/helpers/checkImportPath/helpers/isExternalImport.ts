import fs from "fs";

import { getFullImportPathVariants } from "rules/independentModules/helpers/validateImport/helpers/validateAll/helpers/getFullImportPathVariants";

export const isExternalImport = (
  importPath: string,
  projectRoot: string,
): boolean => {
  const {
    fullImportPathExternal,
    fullImportPathExternalTypes,
    fullImportPathExternalTypesNode,
    fullImportPathExternalNode,
  } = getFullImportPathVariants({
    importPath,
    projectRoot,
    projectRootWithBaseUrl: "",
  });

  return (
    fs.existsSync(fullImportPathExternal) ||
    fs.existsSync(fullImportPathExternalTypes) ||
    fs.existsSync(fullImportPathExternalNode) ||
    fs.existsSync(fullImportPathExternalTypesNode)
  );
};
