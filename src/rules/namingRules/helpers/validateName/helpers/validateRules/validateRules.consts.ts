import { Selectors } from "rules/namingRules/namingRules.types";

export const SELECTORS: Selectors = {
  VariableDeclarator: "variable",
  CallExpression: "variableCallExpression",
  TaggedTemplateExpression: "variableTaggedTemplateExpression",
  ClassDeclaration: "class",
  FunctionDeclaration: "function",
  ArrowFunctionExpression: "arrowFunction",
  TSEnumDeclaration: "enum",
  TSInterfaceDeclaration: "interface",
  TSTypeAliasDeclaration: "type",
};

export const REFERENCES = {
  FileName: "{FileName}",
  fileName: "{fileName}",
  file_name: "{file_name}",
  FILE_NAME: "{FILE_NAME}",

  camelCase: "{camelCase}",
  PascalCase: "{PascalCase}",
  strictCamelCase: "{strictCamelCase}",
  StrictPascalCase: "{StrictPascalCase}",
  snake_case: "{snake_case}",
  SNAKE_CASE: "{SNAKE_CASE}",
};
