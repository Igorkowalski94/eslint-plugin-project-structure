export type Extension = string | string[];

export type NodeType = "File" | "Folder";
interface BaseRule {
    ruleId?: never;
    name?: string;
    children?: Rule[];
    extension?: Extension;
}

export interface RuleId {
    ruleId: string;
    name?: never;
    children?: never;
    extension?: never;
}

interface NameRule extends BaseRule {
    name: string;
}

interface FolderRule extends BaseRule {
    extension?: never;
    children: Rule[];
}

interface FileRule extends BaseRule {
    children?: never;
    extension: Extension;
}

export type Rule = FolderRule | FileRule | NameRule | RuleId;

export interface ProjectStructureConfig {
    ignorePatterns?: string[];
    structure: Rule;
    rules?: Record<string, Rule>;
}
