import micromatch from "micromatch";

import { convertReferencesToPath } from "rules/independentModules/helpers/convertReferencesToPath";
import { Pattern } from "rules/independentModules/independentModules.types";

interface ValidateImportPathProps {
    allowImportsFrom: Pattern[];
    importPath: string;
    filename: string;
}

export const validateImportPath = ({
    allowImportsFrom,
    importPath,
    filename,
}: ValidateImportPathProps): boolean =>
    allowImportsFrom.some((pattern) => {
        const newPattern = convertReferencesToPath({
            pattern,
            importPath,
            filename,
        });

        return micromatch.every(importPath, newPattern);
    });
