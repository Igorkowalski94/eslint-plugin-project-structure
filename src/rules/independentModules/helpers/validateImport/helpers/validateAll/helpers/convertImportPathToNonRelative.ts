import path from "path";

import { removeProjectRootFromPath } from "rules/independentModules/helpers/validateImport/helpers/validateAll/helpers/removeProjectRootFromPath";

interface ConvertImportPathToNonRelativeProps {
  importPath: string;
  filename: string;
  projectRootWithBaseUrl: string;
}

export const convertImportPathToNonRelative = ({
  projectRootWithBaseUrl,
  filename,
  importPath,
}: ConvertImportPathToNonRelativeProps): string => {
  if (!importPath.startsWith(".")) return importPath;

  const dirname = path.dirname(filename);

  const fullImportPath = path.resolve(dirname, path.join(importPath));

  return removeProjectRootFromPath(fullImportPath, projectRootWithBaseUrl);
};
