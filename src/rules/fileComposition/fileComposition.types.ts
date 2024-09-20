import { TSESTree } from "@typescript-eslint/utils";
import { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";
import { Pattern, RegexParameters } from "types";

import { ESLINT_ERRORS } from "rules/fileComposition/fileComposition.consts";

export type NodeType =
  | "ClassDeclaration"
  | "VariableDeclarator"
  | "CallExpression"
  | "TaggedTemplateExpression"
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
  | "function"
  | "arrowFunction"
  | "type"
  | "interface"
  | "enum";

export type Node =
  | TSESTree.VariableDeclarator
  | TSESTree.CallExpression
  | TSESTree.TaggedTemplateExpression
  | TSESTree.ClassDeclaration
  | TSESTree.FunctionDeclaration
  | TSESTree.TSTypeAliasDeclaration
  | TSESTree.TSInterfaceDeclaration
  | TSESTree.TSEnumDeclaration
  | TSESTree.Identifier
  | TSESTree.MethodDefinition
  | TSESTree.PropertyDefinition;

export type Selectors = Record<NodeType, Selector>;

export interface FileRule {
  selector: Selector | Selector[];
  filenamePartsToRemove?: string | string[];
  format?: string[] | string;
}

export type CustomErrors = Partial<Record<Selector, string>>;

export interface FileRuleObject {
  allowOnlySpecifiedSelectors?: boolean;
  errors?: CustomErrors;
  rules: FileRule[];
}

interface FilesRules {
  filePattern: Pattern;
  fileRootRules?: FileRule[] | FileRuleObject;
  fileExportRules?: FileRule[] | FileRuleObject;
  fileRules?: FileRule[] | FileRuleObject;
}

export interface FileCompositionConfig {
  regexParameters?: RegexParameters;
  filesRules: FilesRules[];
}

export type Context = Readonly<
  RuleContext<keyof typeof ESLINT_ERRORS, [FileCompositionConfig] | []>
>;
