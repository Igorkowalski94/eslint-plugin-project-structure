import fs from "fs";
import { resolve } from "path";

import { getFullImportPathVariants } from "rules/independentModules/helpers/validateImport/helpers/validateAll/helpers/getFullImportPathVariants";

interface IsExternalImportProps {
  importPath: string;
  projectRoot: string;
  packageRoot?: string;
}

export const isExternalImport = ({
  importPath,
  packageRoot,
  projectRoot,
}: IsExternalImportProps): boolean => {
  if (importPath.startsWith(".")) return false;
  if (importPath.startsWith("https://")) return true;

  const importPathFirstElement = importPath.split(/[.:/]/)[0];

  const importPaths = [importPath, importPathFirstElement];

  const packageRootResolved = resolve(projectRoot, packageRoot ?? ".");

  const monorepoRoots = [projectRoot, packageRootResolved];

  return importPaths.some((iPath) =>
    monorepoRoots.some((root) => {
      const {
        fullImportPathExternal,
        fullImportPathExternalTypes,
        fullImportPathExternalTypesNode,
        fullImportPathExternalNode,
      } = getFullImportPathVariants({
        importPath: iPath,
        projectRoot: root,
        projectRootWithBaseUrl: "",
      });

      return (
        fs.existsSync(fullImportPathExternal) ||
        fs.existsSync(fullImportPathExternalTypes) ||
        fs.existsSync(fullImportPathExternalNode) ||
        fs.existsSync(fullImportPathExternalTypesNode)
      );
    }),
  );
};
