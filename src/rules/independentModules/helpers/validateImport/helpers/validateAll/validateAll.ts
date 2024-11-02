import { getProjectRoot } from "helpers/getProjectRoot";

import { addExtensionToImportPath } from "rules/independentModules/helpers/validateImport/helpers/validateAll/helpers/addExtensionToImportPath/addExtensionToImportPath";
import { checkImportPath } from "rules/independentModules/helpers/validateImport/helpers/validateAll/helpers/checkImportPath/checkImportPath";
import { convertImportPathToNonRelative } from "rules/independentModules/helpers/validateImport/helpers/validateAll/helpers/convertImportPathToNonRelative";
import { getImportPaths } from "rules/independentModules/helpers/validateImport/helpers/validateAll/helpers/getImportPaths";
import { removeProjectRootFromPath } from "rules/independentModules/helpers/validateImport/helpers/validateAll/helpers/removeProjectRootFromPath";
import { IndependentModulesConfig } from "rules/independentModules/independentModules.types";

interface ValidateAllProps {
  filename: string;
  importPath: string;
  config: IndependentModulesConfig;
}

export const validateAll = ({
  filename,
  importPath,
  config,
}: ValidateAllProps): void => {
  const { extensions, pathAliases } = config;

  const projectRoot = getProjectRoot();
  const projectRootWithBaseUrl = getProjectRoot(pathAliases?.baseUrl);

  const importPaths = getImportPaths({
    importPath,
    paths: pathAliases?.paths,
  });

  const filenameWithoutProjectRootWithBaseUrl = removeProjectRootFromPath(
    filename,
    projectRootWithBaseUrl,
  );

  importPaths.forEach((currentImportPath) => {
    const importPathNonRelative = convertImportPathToNonRelative({
      importPath: currentImportPath,
      filename,
      projectRootWithBaseUrl,
    });

    const importPathWithExtension = addExtensionToImportPath({
      importPath: importPathNonRelative,
      projectRootWithBaseUrl,
      extensions,
      projectRoot,
    });

    checkImportPath({
      importPath: importPathWithExtension,
      filename: filenameWithoutProjectRootWithBaseUrl,
      config,
      projectRoot,
    });
  });
};
