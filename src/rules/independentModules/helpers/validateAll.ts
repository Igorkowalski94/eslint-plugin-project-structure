import { addExtensionToImportPath } from "./addExtensionToImportPath";
import { checkImportPath } from "./checkImportPath";
import { convertImportPathToNonRelative } from "./convertImportPathToNonRelative";
import { getCwdWithRoot } from "./getCwdWithRoot";
import { removeCwdWithRootAndUnifySep } from "./removeCwdWithRootAndUnifySep";
import { readConfigFile } from "../../../helpers/readConfigFile";
import { getInvalidConfigFileError } from "../errors/getInvalidConfigFileError";
import { IndependentModulesConfig } from "../independentModules.types";

interface ValidateAllProps {
    filename: string;
    importPath: string;
    cwd: string;
    configPath: string;
}

export const validateAll = ({
    filename,
    importPath,
    cwd,
    configPath,
}: ValidateAllProps): void => {
    const config = readConfigFile<IndependentModulesConfig>(configPath);

    if (!config || typeof config !== "object" || Array.isArray(config))
        throw getInvalidConfigFileError(configPath);

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
