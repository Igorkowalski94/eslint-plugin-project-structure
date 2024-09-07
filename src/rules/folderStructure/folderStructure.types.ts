import { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";
import { ESLINT_ERRORS } from "consts";
import { RegexParameters } from "types";

export type NodeType = "File" | "Folder";

export interface Rule<T extends string = string> {
  ruleId?: T;
  name?: string;
  enforceExistence?: string[];
  children?: Rule<T>[];
}

export interface LongPathsInfo {
  maxLength?: number;
  mode: "warn" | "error";
}

export interface FolderStructureConfig<T extends string = string> {
  ignorePatterns?: string[];
  longPathsInfo?: LongPathsInfo | false;
  structure: Rule<T> | Rule<T>[];
  rules?: Record<T, Rule<T>>;
  regexParameters?: RegexParameters;
}
export type Context = Readonly<
  RuleContext<keyof typeof ESLINT_ERRORS, [FolderStructureConfig] | []>
>;
