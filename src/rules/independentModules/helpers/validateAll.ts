import { validateConfig } from "helpers/validateConfig";

import { addExtensionToImportPath } from "rules/independentModules/helpers/addExtensionToImportPath";
import { checkImportPath } from "rules/independentModules/helpers/checkImportPath";
import { convertImportPathToNonRelative } from "rules/independentModules/helpers/convertImportPathToNonRelative";
import { getCwdWithBaseUrl } from "rules/independentModules/helpers/getCwdWithBaseUrl";
import { getImportPaths } from "rules/independentModules/helpers/getImportPaths";
import { removeCwdWithRootAndUnifySep } from "rules/independentModules/helpers/removeCwdWithRootAndUnifySep";
import { INDEPENDENT_MODULES_SCHEMA } from "rules/independentModules/independentModules.consts";
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
    validateConfig({ config, schema: INDEPENDENT_MODULES_SCHEMA });

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
