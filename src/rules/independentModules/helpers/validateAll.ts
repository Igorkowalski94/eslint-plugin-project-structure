import { addExtensionToImportPath } from "./addExtensionToImportPath";
import { checkImportPath } from "./checkImportPath";
import { convertImportPathToNonRelative } from "./convertImportPathToNonRelative";
import { getCwdWithRoot } from "./getCwdWithRoot";
import { removeCwdWithRootAndUnifySep } from "./removeCwdWithRootAndUnifySep";
import { validateConfig } from "../../../helpers/validateConfig";
import { INDEPENDENT_MODULES_SCHEMA } from "../independentModules.consts";
import { IndependentModulesConfig } from "../independentModules.types";

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
