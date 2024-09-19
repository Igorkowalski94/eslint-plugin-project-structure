import { TSESTree } from "@typescript-eslint/utils";
import { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";
import { Pattern, RegexParameters } from "types";

import { ESLINT_ERRORS } from "rules/namingRules/namingRules.consts";

export type NodeType =
  | "ClassDeclaration"
  | "VariableDeclarator"
  | "CallExpression"
  | "TaggedTemplateExpression"
  | "MemberExpression"
  | "FunctionDeclaration"
  | "ArrowFunctionExpression"
  | "TSTypeAliasDeclaration"
  | "TSInterfaceDeclaration"
  | "TSEnumDeclaration";

export type Selector =
  | "class"
  | "variable"
  | "variableCallExpression"
  | "variableTaggedTemplateExpression"
  | "variableMemberExpression"
  | "function"
  | "arrowFunction"
  | "type"
  | "interface"
  | "enum";

export type Node =
  | TSESTree.VariableDeclarator
  | TSESTree.CallExpression
  | TSESTree.TaggedTemplateExpression
  | TSESTree.MemberExpression
  | TSESTree.ClassDeclaration
  | TSESTree.FunctionDeclaration
  | TSESTree.TSTypeAliasDeclaration
  | TSESTree.TSInterfaceDeclaration
  | TSESTree.TSEnumDeclaration
  | TSESTree.Identifier
  | TSESTree.MethodDefinition
  | TSESTree.PropertyDefinition;

export type Selectors = Record<NodeType, Selector>;

export interface NamingRule {
  selector: Selector | Selector[];
  filenamePartsToRemove?: string | string[];
  format?: string[] | string;
}

export type CustomErrors = Partial<Record<Selector, string>>;

export interface NamingRuleObject {
  allowOnlySpecifiedSelectors?: boolean;
  errors?: CustomErrors;
  rules: NamingRule[];
}

interface FileNamingRules {
  filePattern: Pattern;
  fileRootRules?: NamingRule[] | NamingRuleObject;
  fileExportsRules?: NamingRule[] | NamingRuleObject;
  fileRules?: NamingRule[] | NamingRuleObject;
}

export interface NamingRulesConfig {
  regexParameters?: RegexParameters;
  filesRules: FileNamingRules[];
}

export type Context = Readonly<
  RuleContext<keyof typeof ESLINT_ERRORS, [NamingRulesConfig] | []>
>;
