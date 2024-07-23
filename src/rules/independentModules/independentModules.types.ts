import { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";

export type Pattern = string | string[];

export interface Module {
    name: string;
    pattern: Pattern;
    errorMessage?: string;
    allowImportsFrom: Pattern[];
    allowExternalImports?: boolean;
}

export type Context = Readonly<RuleContext<"error", []>>;

export interface IndependentModulesConfig {
    root?: string | null;
    extensions?: string[];
    reusableImportPatterns?: Record<string, Pattern[]>;
    modules: Module[];
    debugMode?: boolean;
}
