import path from "path";

import { getLvlFromPattern } from "rules/independentModules/helpers/getLvlFromPattern";
import { removeMicromatchSpecialCharacters } from "rules/independentModules/helpers/removeMicromatchSpecialCharacters";

export const getDirnamePath = (fileName: string, pattern: string): string => {
  const lvl = getLvlFromPattern(pattern, 1);

  let dirnamePath = fileName;

  for (let i = 0; i < lvl; i++) {
    dirnamePath = path.dirname(dirnamePath);
  }

  return removeMicromatchSpecialCharacters(dirnamePath);
};
