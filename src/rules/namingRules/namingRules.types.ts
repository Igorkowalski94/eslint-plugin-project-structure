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
    filePattern: string | string[];
    nameType: NameType | NameType[];
    filenamePartsToRemove?: string[];
    allowNames?: string[];
}
