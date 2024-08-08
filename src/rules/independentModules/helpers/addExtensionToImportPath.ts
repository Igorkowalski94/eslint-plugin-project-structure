import fs from "fs";

import { getFullImportPathVariants } from "rules/independentModules/helpers/getFullImportPathVariants";
import { FILE_EXTENSIONS } from "rules/independentModules/independentModules.consts";
import { IndependentModulesConfig } from "rules/independentModules/independentModules.types";

interface AddExtensionToImportPathProps {
    importPath: string;
    cwdWithRoot: string;
    extensions: IndependentModulesConfig["extensions"];
    cwd: string;
}

export const addExtensionToImportPath = ({
    importPath,
    cwdWithRoot,
    extensions = [],
    cwd,
}: AddExtensionToImportPathProps): string => {
    const allExtensions = [...FILE_EXTENSIONS, ...extensions];

    const isImportPathWithExtension = allExtensions.some((extension) =>
        importPath.endsWith(extension),
    );

    if (isImportPathWithExtension) return importPath;

    const {
        fullImportPath,
        fullImportPathExternal,
        fullImportPathExternalIndex,
        fullImportPathExternalTypes,
        fullImportPathExternalTypesIndex,
        fullImportPathIndex,
        fullImportPathExternalTypesNode,
        fullImportPathExternalTypesNodeIndex,
        fullImportPathExternalNode,
        fullImportPathExternalNodeIndex,
    } = getFullImportPathVariants({ importPath, cwdWithRoot, cwd });

    const fullImportPathsWithIndex = [
        fullImportPathIndex,
        fullImportPathExternalIndex,
        fullImportPathExternalTypesIndex,
        fullImportPathExternalTypesNodeIndex,
        fullImportPathExternalNodeIndex,
    ];

    const fullImportPathsWithoutIndex = [
        fullImportPath,
        fullImportPathExternal,
        fullImportPathExternalTypes,
        fullImportPathExternalTypesNode,
        fullImportPathExternalNode,
    ];

    const importPathWithExtension = allExtensions.reduce<string | undefined>(
        (acc, ext) => {
            const isImportPathWithoutIndex = fullImportPathsWithoutIndex.some(
                (fullImportPathWithoutIndex) =>
                    fs.existsSync(fullImportPathWithoutIndex + ext),
            );
            if (isImportPathWithoutIndex) return (acc = importPath + ext);

            const isImportPathWithIndex = fullImportPathsWithIndex.some(
                (fullImportPathWithIndex) =>
                    fs.existsSync(fullImportPathWithIndex + ext),
            );
            if (isImportPathWithIndex)
                return (acc = `${importPath}/index${ext}`);

            return acc;
        },
        undefined,
    );

    return importPathWithExtension ?? importPath;
};
