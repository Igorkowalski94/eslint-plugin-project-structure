import { getInvalidConfigFileError } from "./helpers/getInvalidConfigFileError";
import { getInvalidStructureError } from "./helpers/getInvalidStructureError";
import { isIgnoredPathname } from "./helpers/isIgnoredPathname";
import { readConfigFile } from "./helpers/readConfigFile";
import { validatePath } from "../../validators/validatePath/validatePath";

export const validateFileStructure = (
    configPath: string,
    pathname?: string,
): void => {
    if (!pathname) return;

    const config = readConfigFile(configPath);

    if (!config || typeof config !== "object" || Array.isArray(config))
        throw getInvalidConfigFileError(configPath);

    const { structure, ignorePatterns } = config;

    if (!structure || typeof structure !== "object" || Array.isArray(structure))
        throw getInvalidStructureError();

    if (isIgnoredPathname(pathname, ignorePatterns)) return;

    validatePath({
        pathname,
        parentName: "structure",
        rule: structure,
        config,
    });
};
