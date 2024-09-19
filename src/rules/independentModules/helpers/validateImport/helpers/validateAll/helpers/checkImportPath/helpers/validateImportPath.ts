import micromatch from "micromatch";

import { convertReferencesToPath } from "rules/independentModules/helpers/convertReferencesToPath";
import { ImportPattern } from "rules/independentModules/independentModules.types";

interface ValidateImportPathProps {
  allowImportsFrom: ImportPattern[];
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
