import {
  FileRule,
  FileRuleObject,
} from "rules/fileComposition/fileComposition.types";

export const getRules = (fileRule: FileRule[] | FileRuleObject): FileRule[] =>
  Array.isArray(fileRule) ? fileRule : fileRule.rules;
