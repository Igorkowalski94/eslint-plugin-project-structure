import { getDirnamePath } from "./getDirnamePath";
import { getFamilyPath } from "./getFamilyPath";
import { FAMILY_REGEX, DIRNAME_REGEX } from "../independentModules.consts";
import { Pattern } from "../independentModules.types";

interface ConvertReferencesToPathProps {
    pattern: Pattern;
    importPath: string;
    filename: string;
}

export const convertReferencesToPath = ({
    importPath,
    pattern,
    filename,
}: ConvertReferencesToPathProps): Pattern =>
    Array.isArray(pattern)
        ? pattern
              .map((p) => p.replace(DIRNAME_REGEX, getDirnamePath(filename, p)))
              .map((p) =>
                  p.replace(
                      FAMILY_REGEX,
                      getFamilyPath({ importPath, filename, pattern: p }),
                  ),
              )
        : pattern
              .replace(DIRNAME_REGEX, getDirnamePath(filename, pattern))
              .replace(
                  FAMILY_REGEX,
                  getFamilyPath({ importPath, filename, pattern }),
              );
