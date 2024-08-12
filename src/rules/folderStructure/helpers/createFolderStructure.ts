import {
  Rule,
  RegexParameters,
  FolderStructureConfig,
} from "rules/folderStructure/folderStructure.types";

export const createFolderStructure = <
  R extends Record<string, Rule<keyof R & string>>,
>(config: {
  structure: Rule<keyof R & string>;
  rules?: R;
  ignorePatterns?: string[];
  regexParameters?: RegexParameters;
}): FolderStructureConfig<keyof R & string> => config;
