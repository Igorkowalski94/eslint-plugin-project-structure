import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/utils";

import { validateImport } from "rules/independentModules/helpers/validateImport/validateImport";
import {
  Context,
  IndependentModulesConfig,
} from "rules/independentModules/independentModules.types";

interface HandleCallExpressionProps {
  node: TSESTree.CallExpression;
  context: Context;
  config: IndependentModulesConfig;
}

export const handleCallExpression = ({
  config,
  context,
  node,
}: HandleCallExpressionProps): void => {
  if (
    (node.callee.type === AST_NODE_TYPES.Identifier &&
      node.callee.name === "require" &&
      node.arguments[0].type === AST_NODE_TYPES.Literal &&
      typeof node.arguments[0].value === "string") ||
    (node.callee.type === AST_NODE_TYPES.MemberExpression &&
      node.callee.object.type === AST_NODE_TYPES.Identifier &&
      node.callee.object.name === "jest" &&
      node.callee.property.type === AST_NODE_TYPES.Identifier &&
      (node.callee.property.name === "mock" ||
        node.callee.property.name === "requireActual") &&
      node.arguments[0].type === AST_NODE_TYPES.Literal &&
      typeof node.arguments[0].value === "string")
  ) {
    const importPath = node.arguments[0].value;

    validateImport({ importPath, context, node, config });
  }
};
