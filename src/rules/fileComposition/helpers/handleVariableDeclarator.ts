import { TSESTree } from "@typescript-eslint/utils";

import { Context, NodeType } from "rules/fileComposition/fileComposition.types";
import { getIdentifierFromExpression } from "rules/fileComposition/helpers/getIdentifierFromExpression";
import { validateFile } from "rules/fileComposition/helpers/validateFile/validateFile";

interface HandleVariableDeclaratorProps {
  node: TSESTree.VariableDeclarator;
  context: Context;
}

export const handleVariableDeclarator = ({
  node,
  context,
}: HandleVariableDeclaratorProps): void => {
  const expressionName = getIdentifierFromExpression(node.init);

  // const {} = fn()
  // const [] = fn()
  if (
    node.id.type === TSESTree.AST_NODE_TYPES.ArrayPattern ||
    node.id.type === TSESTree.AST_NODE_TYPES.ObjectPattern
  ) {
    if (expressionName)
      return validateFile({
        node,
        context,
        name: "*",
        nodeType: "Expression",
        expressionName,
      });

    return validateFile({
      node,
      context,
      name: "*",
      nodeType: "VariableDeclarator",
    });
  }

  if (expressionName) {
    return validateFile({
      node,
      context,
      name: node.id.name,
      nodeType: "Expression",
      expressionName,
    });
  }

  const currentNodeType: NodeType =
    node.init?.type === TSESTree.AST_NODE_TYPES.ArrowFunctionExpression
      ? "ArrowFunctionExpression"
      : "VariableDeclarator";

  validateFile({
    node,
    context,
    name: node.id.name,
    nodeType: currentNodeType,
  });
};
