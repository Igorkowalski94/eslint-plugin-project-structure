export type RegexParameters = Record<string, string>;

export interface ErrorCache {
  filename: string;
  errorMessage: string;
}

export type ProjectStructureCache = ErrorCache[];
