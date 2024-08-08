import { extractReferencesFromPatterns } from "rules/independentModules/helpers/extractReferencesFromPatterns";
import { IndependentModulesConfig } from "rules/independentModules/independentModules.types";

export const extractReferencesFromReusableImportPatterns = (
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
