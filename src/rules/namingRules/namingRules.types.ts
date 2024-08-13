export type Cases = "camelCase" | "PascalCase" | "snake_case" | "SNAKE_CASE";

export type NameType =
  | "ClassDeclaration"
  | "VariableDeclarator"
  | "FunctionDeclaration"
  | "ArrowFunctionExpression"
  | "TSTypeAliasDeclaration"
  | "TSInterfaceDeclaration"
  | "TSEnumDeclaration";

export type NameTypeRule =
  | "class"
  | "variable"
  | "function"
  | "arrowFunction"
  | "type"
  | "interface"
  | "enum";

export type NameTypes = Record<NameType, NameTypeRule>;

export interface NamingRule {
  nameType: NameTypeRule | NameTypeRule[];
  filenamePartsToRemove?: string[];
  allowNamesFileRoot?: string[];
  allowNamesExport?: string[];
  allowNames?: string[];
}

export interface FileNamingRules {
  filePattern: string | string[];
  rules: NamingRule[];
}
