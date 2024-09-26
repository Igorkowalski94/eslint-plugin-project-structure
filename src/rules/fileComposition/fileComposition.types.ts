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

export interface FileRule {
  selector: Selector | Selector[];
  filenamePartsToRemove?: string | string[];
  format?: string[] | string;
}

export type CustomErrors = Partial<Record<SelectorType, string>>;

export interface FileRuleObject {
  allowOnlySpecifiedSelectors?: boolean;
  errors?: CustomErrors;
  rules: FileRule[];
}

export interface RootSelectorLimit {
  selector: SelectorType | SelectorType[];
  limit: number;
}

export interface FileRules {
  filePattern: Pattern;
  rootSelectorsLimits?: RootSelectorLimit[];
  selectorsOrder?: number;
  fileRootRules?: FileRule[] | FileRuleObject;
  fileExportRules?: FileRule[] | FileRuleObject;
  fileRules?: FileRule[] | FileRuleObject;
}

export interface FileCompositionConfig {
  regexParameters?: RegexParameters;
  filesRules: FileRules[];
}

export type Context = Readonly<
  RuleContext<keyof typeof ESLINT_ERRORS, [FileCompositionConfig] | []>
>;
