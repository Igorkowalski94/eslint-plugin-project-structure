import micromatch from "micromatch";

import { extractReferencesFromPatterns } from "./extractReferencesFromPatterns";
import { extractReferencesFromReusableImportPatterns } from "./extractReferencesFromReusableImportPatterns";
import { findModuleConfig } from "./findModuleConfig";
import { isExternalImport } from "./isExternalImport";
import { validateImportPath } from "./validateImportPath";
import { getExternalImportError } from "../errors/getExternalImportError";
import { getImportError } from "../errors/getImportError";
import { IndependentModulesConfig } from "../independentModules.types";

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

    const reusableImportPatternsExtracted =
        extractReferencesFromReusableImportPatterns(reusableImportPatterns);

    const allowImportsFromExtracted = extractReferencesFromPatterns({
        patterns: allowImportsFrom,
        reusableImportPatterns: reusableImportPatternsExtracted,
    });

    const isExternal = isExternalImport(importPath, cwd);

    if (isExternal) {
        const isValidExternalImportPattern = allowImportsFromExtracted.some(
            (p) => micromatch.isMatch(importPath, p),
        );

        if (isValidExternalImportPattern || allowExternalImports !== false)
            return;

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
