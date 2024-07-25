export type Cases = "camelCase" | "PascalCase" | "snake_case" | "SNAKE_CASE";

export type NameType =
    | "ClassDeclaration"
    | "VariableDeclarator"
    | "FunctionDeclaration"
    | "ArrowFunctionExpression"
    | "TSTypeAliasDeclaration"
    | "TSInterfaceDeclaration"
    | "TSEnumDeclaration";

export interface NamingRule {
    nameType: NameType | NameType[];
    filenamePartsToRemove?: string[];
    allowNamesFileRoot?: string[];
    allowNames?: string[];
}

export interface FileNamingRules {
    filePattern: string | string[];
    rules: NamingRule[];
}
