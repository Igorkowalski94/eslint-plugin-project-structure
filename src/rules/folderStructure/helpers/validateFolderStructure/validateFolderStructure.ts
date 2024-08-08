import { validateConfig } from "helpers/validateConfig";

import { FOLDER_STRUCTURE_SCHEMA } from "rules/folderStructure/folderStructure.consts";
import { FolderStructureConfig } from "rules/folderStructure/folderStructure.types";
import { getPaths } from "rules/folderStructure/helpers/validateFolderStructure/helpers/getPaths";
import { isIgnoredPathname } from "rules/folderStructure/helpers/validateFolderStructure/helpers/isIgnoredPathname";
import { validatePath } from "rules/folderStructure/helpers/validatePath/validatePath";

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
