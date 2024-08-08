import { validateConfig } from "helpers/validateConfig";

import { addExtensionToImportPath } from "rules/independentModules/helpers/addExtensionToImportPath";
import { checkImportPath } from "rules/independentModules/helpers/checkImportPath";
import { convertImportPathToNonRelative } from "rules/independentModules/helpers/convertImportPathToNonRelative";
import { getCwdWithRoot } from "rules/independentModules/helpers/getCwdWithRoot";
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

    const { extensions, root } = config;

    const cwdWithRoot = getCwdWithRoot(cwd, root);

    const filenameWithoutCwdWithRoot = removeCwdWithRootAndUnifySep(
        filename,
        cwdWithRoot,
    );

    const importPathNonRelative = convertImportPathToNonRelative({
        importPath,
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
};
