import { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";

export type Pattern = string | string[];

export interface Module {
    name: string;
    pattern: Pattern;
    errorMessage?: string;
    allowImportsFrom: Pattern[];
    allowExternalImports?: boolean;
}

export type Context = Readonly<
    RuleContext<"error", [IndependentModulesConfig] | []>
>;

export type Paths = Record<string, string[]>;

export interface PathAliases {
    baseUrl: string;
    paths: Paths;
}

export interface TsConfigJson {
    compilerOptions: Partial<PathAliases>;
}

export interface IndependentModulesConfig {
    tsconfigPath?: string;
    pathAliases?: PathAliases;
    extensions?: string[];
    reusableImportPatterns?: Record<string, Pattern[]>;
    modules: Module[];
    debugMode?: boolean;
}
