import { getProjectRoot } from "helpers/getProjectRoot";

import { addExtensionToImportPath } from "rules/independentModules/helpers/validateImport/helpers/validateAll/helpers/addExtensionToImportPath";
import { checkImportPath } from "rules/independentModules/helpers/validateImport/helpers/validateAll/helpers/checkImportPath/checkImportPath";
import { convertImportPathToNonRelative } from "rules/independentModules/helpers/validateImport/helpers/validateAll/helpers/convertImportPathToNonRelative";
import { getImportPaths } from "rules/independentModules/helpers/validateImport/helpers/validateAll/helpers/getImportPaths";
import { removeProjectRootFromPath } from "rules/independentModules/helpers/validateImport/helpers/validateAll/helpers/removeProjectRootFromPath";
import { removeQueryParamsFromPath } from "rules/independentModules/helpers/validateImport/helpers/validateAll/helpers/removeQueryParamsFromPath";
import { IndependentModulesConfig } from "rules/independentModules/independentModules.types";

interface ValidateAllProps {
  filename: string;
  importPath: string;
  config: IndependentModulesConfig;
  cwd: string;
}

export const validateAll = ({
  filename,
  importPath,
  config,
  cwd,
}: ValidateAllProps): void => {
  const { extensions, pathAliases } = config;

  const projectRoot = getProjectRoot({ cwd });
  const projectRootWithBaseUrl = getProjectRoot({
    projectRootConfig: pathAliases?.baseUrl,
    cwd,
  });

  const importPaths = getImportPaths({
    importPath,
    paths: pathAliases?.paths,
    projectRootWithBaseUrl,
  });

  const filenameWithoutProjectRootWithBaseUrl = removeProjectRootFromPath(
    filename,
    projectRootWithBaseUrl,
  );

  importPaths.forEach((currentImportPath) => {
    const importPathNonRelative = convertImportPathToNonRelative({
      importPath: currentImportPath.importPath,
      filename,
      projectRootWithBaseUrl,
    });

    const importPathWithoutQueryParams = removeQueryParamsFromPath({
      importPath: importPathNonRelative,
    });

    const importPathWithExtension = addExtensionToImportPath({
      importPath: importPathWithoutQueryParams,
      projectRootWithBaseUrl,
      extensions,
      projectRoot,
    });

    checkImportPath({
      importPath: importPathWithExtension,
      filename: filenameWithoutProjectRootWithBaseUrl,
      config,
      projectRoot,
      pathAlias: currentImportPath.pathAlias,
    });
  });
};
