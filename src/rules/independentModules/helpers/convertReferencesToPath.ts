import { getDirnamePath } from "rules/independentModules/helpers/getDirnamePath";
import { getFamilyPath } from "rules/independentModules/helpers/getFamilyPath";
import {
  DIRNAME_REGEX,
  FAMILY_REGEX,
} from "rules/independentModules/independentModules.consts";
import { ImportPattern } from "rules/independentModules/independentModules.types";

interface ConvertReferencesToPathProps {
  pattern: ImportPattern;
  importPath: string;
  filename: string;
}

export const convertReferencesToPath = ({
  importPath,
  pattern,
  filename,
}: ConvertReferencesToPathProps): ImportPattern =>
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
