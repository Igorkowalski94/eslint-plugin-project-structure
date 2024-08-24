import { Selectors } from "rules/namingRules/namingRules.types";

export const SELECTORS: Selectors = {
  VariableDeclarator: "variable",
  ClassDeclaration: "class",
  FunctionDeclaration: "function",
  ArrowFunctionExpression: "arrowFunction",
  TSEnumDeclaration: "enum",
  TSInterfaceDeclaration: "interface",
  TSTypeAliasDeclaration: "type",
};

export const REFERENCES = {
  filename_PascalCase: "{filename_PascalCase}",
  filename_camelCase: "{filename_camelCase}",
  filename_snake_case: "{filename_snake_case}",
  filename_SNAKE_CASE: "{filename_SNAKE_CASE}",

  PascalCase: "{PascalCase}",
  camelCase: "{camelCase}",
  snake_case: "{snake_case}",
  SNAKE_CASE: "{SNAKE_CASE}",
};
