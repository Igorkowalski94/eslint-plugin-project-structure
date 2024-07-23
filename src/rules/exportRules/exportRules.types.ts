export type Cases = "camelCase" | "PascalCase" | "snake_case" | "SNAKE_CASE";

export interface ExportRules {
    filePattern: string | string[];
    filenamePartsToRemove?: string[];
    allowExportNames?: string[];
}
