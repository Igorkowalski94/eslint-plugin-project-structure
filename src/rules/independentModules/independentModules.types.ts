import { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";
import { ESLINT_ERRORS } from "consts";
import { Pattern } from "types";

export type ImportPattern = string | string[];

export interface Module {
  name: string;
  pattern: Pattern;
  errorMessage?: string;
  allowImportsFrom: ImportPattern[];
  allowExternalImports?: boolean;
}

export type Context = Readonly<
  RuleContext<keyof typeof ESLINT_ERRORS, [IndependentModulesConfig] | []>
>;

export type Paths = Record<string, string[]>;

export interface PathAliases {
  baseUrl: string;
  paths: Paths;
}

export interface TsConfigJson {
  compilerOptions?: Partial<PathAliases>;
}

export interface IndependentModulesConfig {
  tsconfigPath?: string;
  pathAliases?: PathAliases;
  extensions?: string[];
  reusableImportPatterns?: Record<string, ImportPattern[]>;
  modules: Module[];
  debugMode?: boolean;
  packageRoot?: string;
}
