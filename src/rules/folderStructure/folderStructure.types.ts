export type Extension = string | string[];

export type NodeType = "File" | "Folder";
interface BaseRule {
    ruleId?: string;
    name?: string;
    children?: Rule[];
    extension?: Extension;
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

interface RuleIdAlone {
    ruleId: string;
    name?: never;
    children?: never;
    extension?: never;
}

interface RuleIdName extends NameRule {
    ruleId: string;
}

interface RuleIdFile extends FileRule {
    ruleId: string;
}

interface RuleIdFolder extends FolderRule {
    ruleId: string;
}

export type RuleId = RuleIdAlone | RuleIdFolder | RuleIdFile | RuleIdName;
export type Rule = FolderRule | FileRule | NameRule | RuleId;
export type RegexParameters = Record<string, string>;

export interface FolderStructureConfig {
    ignorePatterns?: string[];
    structure: Rule;
    rules?: Record<string, Rule>;
    regexParameters?: RegexParameters;
}
