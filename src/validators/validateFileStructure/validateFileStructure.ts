import { getInvalidConfigFileError } from "./helpers/getInvalidConfigFileError";
import { getInvalidStructureError } from "./helpers/getInvalidStructureError";
import { isIgnoredPath } from "./helpers/isIgnoredPath";
import { readConfigFile } from "./helpers/readConfigFile";
import { validatePath } from "../../validators/validatePath/validatePath";

export const validateFileStructure = (
    configPath: string,
    pathName?: string,
): void => {
    if (!pathName) return;

    const config = readConfigFile(configPath);

    if (!config || typeof config !== "object" || Array.isArray(config))
        throw getInvalidConfigFileError(configPath);

    const { structure, ignorePatterns } = config;

    if (typeof structure !== "object" || !structure || Array.isArray(structure))
        throw getInvalidStructureError();

    if (isIgnoredPath(pathName, ignorePatterns)) return;

    validatePath(pathName, "structure", structure, config);
};
