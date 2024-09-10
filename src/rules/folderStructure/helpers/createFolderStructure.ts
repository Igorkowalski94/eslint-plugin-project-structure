import { RegexParameters } from "types";

import {
  Rule,
  FolderStructureConfig,
  LongPathsInfo,
  FolderRecursionRule,
} from "rules/folderStructure/folderStructure.types";

export const createFolderStructure = <
  R extends Record<string, FolderRecursionRule<keyof R & string>>,
>(config: {
  longPathsInfo?: LongPathsInfo | false;
  structure: Rule<keyof R & string> | Rule<keyof R & string>[];
  rules?: R;
  ignorePatterns?: string[];
  regexParameters?: RegexParameters;
}): FolderStructureConfig<keyof R & string> => config;
