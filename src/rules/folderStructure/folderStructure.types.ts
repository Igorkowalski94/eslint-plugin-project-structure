import { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";
import { ESLINT_ERRORS } from "consts";
import { Pattern, RegexParameters } from "types";

export type NodeType = "File" | "Folder";

export interface Rule<T extends string = string> {
  ruleId?: T;
  name?: string;
  enforceExistence?: string[] | string;
  children?: Rule<T>[];
}

export interface FolderRecursionRule<T extends string = string>
  extends Rule<T> {
  folderRecursionLimit?: number;
}

export interface LongPathsInfo {
  maxLength?: number;
  root?: string;
  countFromSystemRoot?: boolean;
  mode: "warn" | "error";
}

export interface FolderStructureConfig<T extends string = string> {
  ignorePatterns?: Pattern;
  longPathsInfo?: LongPathsInfo | false;
  structureRoot?: string;
  projectRoot?: string;
  structure: Rule<T> | Rule<T>[];
  rules?: Record<T, FolderRecursionRule<T>>;
  regexParameters?: RegexParameters;
}
export type Context = Readonly<
  RuleContext<keyof typeof ESLINT_ERRORS, [FolderStructureConfig] | []>
>;
