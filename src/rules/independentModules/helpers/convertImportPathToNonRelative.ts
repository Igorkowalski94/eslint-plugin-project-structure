import path from "path";

import { removeCwdWithRootAndUnifySep } from "rules/independentModules/helpers/removeCwdWithRootAndUnifySep";

interface ConvertImportPathToNonRelativeProps {
    importPath: string;
    filename: string;
    cwdWithRoot: string;
}

export const convertImportPathToNonRelative = ({
    cwdWithRoot,
    filename,
    importPath,
}: ConvertImportPathToNonRelativeProps): string => {
    if (!importPath.startsWith(".")) return importPath;

    const dirname = path.dirname(filename);

    const fullImportPath = path.resolve(dirname, path.join(importPath));

    return removeCwdWithRootAndUnifySep(fullImportPath, cwdWithRoot);
};
