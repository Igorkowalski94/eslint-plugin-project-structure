import { Selectors } from "rules/fileComposition/fileComposition.types";

export const SELECTORS: Selectors = {
  VariableDeclarator: "variable",
  Expression: "variableExpression",
  ClassDeclaration: "class",
  FunctionDeclaration: "function",
  ArrowFunctionExpression: "arrowFunction",
  TSEnumDeclaration: "enum",
  TSInterfaceDeclaration: "interface",
  TSTypeAliasDeclaration: "type",
};
