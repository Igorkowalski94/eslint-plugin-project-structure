import { extractReferencesFromPatterns } from "rules/independentModules/helpers/validateImport/helpers/validateAll/helpers/checkImportPath/helpers/extractReferencesFromPatterns/extractReferencesFromPatterns";
import { IndependentModulesConfig } from "rules/independentModules/independentModules.types";

export const getReusableImportPatternsWithoutRef = (
  reusableImportPatterns: IndependentModulesConfig["reusableImportPatterns"],
): IndependentModulesConfig["reusableImportPatterns"] => {
  if (!reusableImportPatterns) return;

  return Object.keys(reusableImportPatterns).reduce(
    (acc, key) => ({
      ...acc,
      [key]: extractReferencesFromPatterns({
        patterns: reusableImportPatterns[key],
        reusableImportPatterns,
        checkNestedArrays: true,
      }),
    }),
    {},
  );
};
