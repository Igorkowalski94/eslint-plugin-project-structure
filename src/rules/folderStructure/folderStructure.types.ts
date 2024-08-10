import { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";

export type NodeType = "File" | "Folder";

export interface Rule<T extends string = string> {
    ruleId?: T;
    name?: string;
    enforceExistence?: string[];
    children?: Rule<T>[];
}

export type RegexParameters = Record<string, string>;

export interface FolderStructureConfig<T extends string = string> {
    ignorePatterns?: string[];
    structure: Rule<T>;
    rules?: Record<T, Rule<T>>;
    regexParameters?: RegexParameters;
}
export type Context = Readonly<
    RuleContext<"error", [FolderStructureConfig] | []>
>;
