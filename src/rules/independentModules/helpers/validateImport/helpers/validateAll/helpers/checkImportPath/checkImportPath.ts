import micromatch from "micromatch";

import { getExternalImportError } from "rules/independentModules/errors/getExternalImportError";
import { getImportError } from "rules/independentModules/errors/getImportError";
import { extractReferencesFromPatterns } from "rules/independentModules/helpers/validateImport/helpers/validateAll/helpers/checkImportPath/helpers/extractReferencesFromPatterns/extractReferencesFromPatterns";
import { findModuleConfig } from "rules/independentModules/helpers/validateImport/helpers/validateAll/helpers/checkImportPath/helpers/findModuleConfig";
import { getReusableImportPatternsWithoutRef } from "rules/independentModules/helpers/validateImport/helpers/validateAll/helpers/checkImportPath/helpers/getReusableImportPatternsWithoutRef";
import { isExternalImport } from "rules/independentModules/helpers/validateImport/helpers/validateAll/helpers/checkImportPath/helpers/isExternalImport";
import { validateImportPath } from "rules/independentModules/helpers/validateImport/helpers/validateAll/helpers/checkImportPath/helpers/validateImportPath";
import { IndependentModulesConfig } from "rules/independentModules/independentModules.types";

interface CheckImportPathProps {
  importPath: string;
  filename: string;
  config: IndependentModulesConfig;
  cwd: string;
}

export const checkImportPath = ({
  importPath,
  filename,
  config: { reusableImportPatterns, modules, debugMode },
  cwd,
}: CheckImportPathProps): void => {
  const moduleConfig = findModuleConfig(filename, modules);

  if (!moduleConfig) return;

  const {
    allowExternalImports,
    allowImportsFrom,
    name: moduleName,
    errorMessage,
  } = moduleConfig;

  const reusableImportPatternsExtracted = getReusableImportPatternsWithoutRef(
    reusableImportPatterns,
  );

  const allowImportsFromExtracted = extractReferencesFromPatterns({
    patterns: allowImportsFrom,
    reusableImportPatterns: reusableImportPatternsExtracted,
  });

  const isExternal = isExternalImport(importPath, cwd);

  if (isExternal) {
    const isValidExternalImportPattern = allowImportsFromExtracted.some((p) =>
      micromatch.every(importPath, p),
    );

    if (isValidExternalImportPattern || allowExternalImports !== false) return;

    throw getExternalImportError({
      moduleName,
      errorMessage,
      debugMode,
      filename,
      importPath,
      allowImportsFromExtracted,
    });
  }

  const isValidImportPath = validateImportPath({
    allowImportsFrom: allowImportsFromExtracted,
    importPath,
    filename,
  });

  if (isValidImportPath) return;

  throw getImportError({
    moduleName,
    errorMessage,
    debugMode,
    filename,
    importPath,
    allowImportsFromExtracted,
  });
};
