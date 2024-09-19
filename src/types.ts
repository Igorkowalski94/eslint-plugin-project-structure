export type RegexParameters = Record<string, string>;

export interface ErrorCache {
  filename: string;
  errorMessage: string;
}

export type ProjectStructureCache = ErrorCache[];

export type Pattern = string | (string | string[])[];
