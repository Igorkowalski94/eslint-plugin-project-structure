export type NodeType = "File" | "Folder";
export interface Rule {
    ruleId?: string;
    name?: string;
    children?: Rule[];
}

export type RegexParameters = Record<string, string>;

export interface FolderStructureConfig {
    ignorePatterns?: string[];
    structure: Rule;
    rules?: Record<string, Rule>;
    regexParameters?: RegexParameters;
}
