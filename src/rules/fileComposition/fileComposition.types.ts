import { TSESTree } from "@typescript-eslint/utils";
import { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";
import { Pattern, RegexParameters } from "types";

import { ESLINT_ERRORS } from "rules/fileComposition/fileComposition.consts";

export type NodeType =
  | "ClassDeclaration"
  | "VariableDeclarator"
  | "Expression"
  | "FunctionDeclaration"
  | "ArrowFunctionExpression"
  | "TSTypeAliasDeclaration"
  | "TSInterfaceDeclaration"
  | "TSEnumDeclaration";

export type SelectorType =
  | "class"
  | "variable"
  | "variableExpression"
  | "function"
  | "arrowFunction"
  | "type"
  | "interface"
  | "enum";

export type Node =
  | TSESTree.VariableDeclarator
  | TSESTree.Expression
  | TSESTree.ClassDeclaration
  | TSESTree.FunctionDeclaration
  | TSESTree.TSTypeAliasDeclaration
  | TSESTree.TSInterfaceDeclaration
  | TSESTree.TSEnumDeclaration
  | TSESTree.MethodDefinition
  | TSESTree.PropertyDefinition;

export type Selectors = Record<NodeType, SelectorType>;

interface VariableExpression {
  type: "variableExpression";
  limitTo: string | string[];
}

export type Selector = SelectorType | VariableExpression;

export type ScopeAll = "fileExport" | "fileRoot" | "nestedSelectors" | "file";
export type Scope = "fileExport" | "fileRoot" | "nestedSelectors";

export interface Rule {
  selector: Selector | Selector[];
  scope?: ScopeAll | ScopeAll[];
  positionIndex?: number;
  filenamePartsToRemove?: string | string[];
  format?: string[] | string;
}

type CustomErrors = Partial<Record<SelectorType, string>>;

export interface RootSelectorLimit {
  selector: SelectorType | SelectorType[];
  limit: number;
}

export interface AllowOnlySpecifiedSelectors {
  error?: CustomErrors;
  fileRoot?: boolean | CustomErrors;
  fileExport?: boolean | CustomErrors;
  nestedSelectors?: boolean | CustomErrors;
}

export interface FileRules {
  filePattern: Pattern;
  allowOnlySpecifiedSelectors?: AllowOnlySpecifiedSelectors | boolean;
  rootSelectorsLimits?: RootSelectorLimit[];
  rules?: Rule[];
}

export interface FileCompositionConfig {
  regexParameters?: RegexParameters;
  filesRules: FileRules[];
}

export type Context = Readonly<
  RuleContext<keyof typeof ESLINT_ERRORS, [FileCompositionConfig] | []>
>;
