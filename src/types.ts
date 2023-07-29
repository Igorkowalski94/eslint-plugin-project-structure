export type Case =
  | "PascalCase"
  | "camelCase"
  | "snake_case"
  | "kebab-case"
  | "dash-case";

export type Type = "file" | "folder";

export type InheritParentName = "firstLetterUppercase" | "firstLetterLowercase";

export type Extension<T> = T extends "folder" ? never : string | string[];

export interface NameCase {
  regex?: string;
  case?: Case;
  inheritParentName?: never;
}

export interface NameRegex {
  regex: string;
  case?: never;
  inheritParentName: InheritParentName;
}

export type Name = NameRegex | NameCase | string;

export interface BaseRule<T extends Type> {
  id?: never;
  name?: Name;
  children?: Rule[];
  extension?: Extension<T>;
  type?: T;
}

export interface Id {
  id: string;
  name?: never;
  children?: never;
  extension?: never;
  type?: never;
}

export interface FolderRule<T extends Type = "folder"> extends BaseRule<T> {
  children: Rule[];
  type?: T;
}

export interface FileRule<T extends Type = "file"> extends BaseRule<T> {
  children?: never;
  type?: T;
}

export type Rule = FolderRule | FileRule | Id;

export interface ProjectStructureConfig {
  ignorePatterns: string[];
  structure: Rule;
  rules: Record<string, Rule>;
}
