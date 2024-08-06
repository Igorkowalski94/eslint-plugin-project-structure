import { getPaths } from "./helpers/getPaths";
import { isIgnoredPathname } from "./helpers/isIgnoredPathname";
import { validateConfig } from "../../../../helpers/validateConfig";
import { FOLDER_STRUCTURE_SCHEMA } from "../../folderStructure.consts";
import { FolderStructureConfig } from "../../folderStructure.types";
import { validatePath } from "../validatePath/validatePath";

interface ValidateFolderStructureProps {
    filename: string;
    cwd: string;
    config: FolderStructureConfig;
}

export const validateFolderStructure = ({
    filename,
    cwd,
    config,
}: ValidateFolderStructureProps): void => {
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
