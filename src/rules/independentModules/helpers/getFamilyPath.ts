import { getLvlFromPattern } from "rules/independentModules/helpers/getLvlFromPattern";
import { removeMicromatchSpecialCharacters } from "rules/independentModules/helpers/removeMicromatchSpecialCharacters";
import { NO_FAMILY } from "rules/independentModules/independentModules.consts";

interface GetFamilyPathProps {
  importPath: string;
  filename: string;
  pattern: string;
}

export const getFamilyPath = ({
  filename,
  importPath,
  pattern,
}: GetFamilyPathProps): string => {
  const lvl = getLvlFromPattern(pattern, 2);

  const importPathParts = importPath.split("/");
  const filenameParts = filename.split("/");
  const familyParts = [];

  for (
    let i = 0;
    i < Math.min(importPathParts.length, filenameParts.length);
    i++
  ) {
    if (importPathParts[i] !== filenameParts[i]) break;

    familyParts.push(importPathParts[i]);
  }

  if (familyParts.length < lvl) return NO_FAMILY;

  return removeMicromatchSpecialCharacters(familyParts.join("/"));
};
