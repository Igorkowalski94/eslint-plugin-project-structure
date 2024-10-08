import { addExtensionToImportPath } from "rules/independentModules/helpers/validateImport/helpers/validateAll/helpers/addExtensionToImportPath/addExtensionToImportPath";
import { checkImportPath } from "rules/independentModules/helpers/validateImport/helpers/validateAll/helpers/checkImportPath/checkImportPath";
import { convertImportPathToNonRelative } from "rules/independentModules/helpers/validateImport/helpers/validateAll/helpers/convertImportPathToNonRelative";
import { getCwdWithBaseUrl } from "rules/independentModules/helpers/validateImport/helpers/validateAll/helpers/getCwdWithBaseUrl";
import { getImportPaths } from "rules/independentModules/helpers/validateImport/helpers/validateAll/helpers/getImportPaths";
import { removeCwdWithRootAndUnifySep } from "rules/independentModules/helpers/validateImport/helpers/validateAll/helpers/removeCwdWithRootAndUnifySep";
import { IndependentModulesConfig } from "rules/independentModules/independentModules.types";

interface ValidateAllProps {
  filename: string;
  importPath: string;
  cwd: string;
  config: IndependentModulesConfig;
}

export const validateAll = ({
  filename,
  importPath,
  cwd,
  config,
}: ValidateAllProps): void => {
  const { extensions, pathAliases } = config;

  const cwdWithRoot = getCwdWithBaseUrl({
    cwd,
    baseUrl: pathAliases?.baseUrl,
  });
  const importPaths = getImportPaths({
    importPath,
    paths: pathAliases?.paths,
  });

  const filenameWithoutCwdWithRoot = removeCwdWithRootAndUnifySep(
    filename,
    cwdWithRoot,
  );

  importPaths.forEach((currentImportPath) => {
    const importPathNonRelative = convertImportPathToNonRelative({
      importPath: currentImportPath,
      filename,
      cwdWithRoot,
    });

    const importPathWithExtension = addExtensionToImportPath({
      importPath: importPathNonRelative,
      cwdWithRoot,
      extensions,
      cwd,
    });

    checkImportPath({
      importPath: importPathWithExtension,
      filename: filenameWithoutCwdWithRoot,
      config,
      cwd,
    });
  });
};
