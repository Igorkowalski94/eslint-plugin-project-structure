import { getPaths } from "./helpers/getPaths";
import { isIgnoredPathname } from "./helpers/isIgnoredPathname";
import { getInvalidConfigFileError } from "../../../../errors/getInvalidConfigFileError";
import { readConfigFile } from "../../../../helpers/readConfigFile";
import { validateConfig } from "../../../../helpers/validateConfig";
import { FOLDER_STRUCTURE_SCHEMA } from "../../folderStructure.consts";
import { FolderStructureConfig } from "../../folderStructure.types";
import { validatePath } from "../validatePath/validatePath";

interface ValidateFolderStructureProps {
    configPath: string;
    filename: string;
    cwd: string;
}

export const validateFolderStructure = ({
    configPath,
    filename,
    cwd,
}: ValidateFolderStructureProps): void => {
    const config = readConfigFile<FolderStructureConfig>(configPath);

    if (!config) throw getInvalidConfigFileError(configPath);

    validateConfig({ config, schema: FOLDER_STRUCTURE_SCHEMA });

    const { structure, ignorePatterns } = config;

    const { filenameWithoutCwd, pathname } = getPaths({ cwd, filename });

    if (isIgnoredPathname({ pathname: filenameWithoutCwd, ignorePatterns }))
        return;

    validatePath({
        pathname,
        filenameWithoutCwd,
        parentName: "structure",
        rule: structure,
        config,
    });
};
