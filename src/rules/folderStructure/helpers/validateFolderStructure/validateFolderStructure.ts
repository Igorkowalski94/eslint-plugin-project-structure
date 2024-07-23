import { isIgnoredPathname } from "./helpers/isIgnoredPathname";
import { readConfigFile } from "../../../../helpers/readConfigFile";
import { getInvalidConfigFileError } from "../../errors/getInvalidConfigFileError";
import { getInvalidStructureError } from "../../errors/getInvalidStructureError";
import { FolderStructureConfig } from "../../folderStructure.types";
import { validatePath } from "../validatePath/validatePath";

export const validateFolderStructure = (
    configPath: string,
    pathname?: string,
): void => {
    if (!pathname) return;

    const config = readConfigFile<FolderStructureConfig>(configPath);

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
