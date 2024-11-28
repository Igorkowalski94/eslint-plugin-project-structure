import fs from "fs";

import { getFullImportPathVariants } from "rules/independentModules/helpers/validateImport/helpers/validateAll/helpers/getFullImportPathVariants";

export const isExternalImport = (
  importPath: string,
  projectRoot: string,
): boolean => {
  if (importPath.startsWith(".")) return false;

  const importPathFirstElement = importPath.split(/[.:/]/)[0];

  const {
    fullImportPathExternal,
    fullImportPathExternalTypes,
    fullImportPathExternalTypesNode,
    fullImportPathExternalNode,
  } = getFullImportPathVariants({
    importPath: importPathFirstElement,
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
