/* eslint-disable complexity */
import { TSESTree } from "@typescript-eslint/utils";

import { Context, NodeType } from "rules/fileComposition/fileComposition.types";
import { validateFile } from "rules/fileComposition/helpers/validateFile/validateFile";

interface HandleVariableDeclaratorProps {
  node: TSESTree.VariableDeclarator;
  context: Context;
}

export const handleVariableDeclarator = ({
  node,
  context,
}: HandleVariableDeclaratorProps): void => {
  const isVariableCallExpression =
    (node.init?.type === TSESTree.AST_NODE_TYPES.CallExpression &&
      node.init.callee.type === TSESTree.AST_NODE_TYPES.Identifier) ||
    (node.init?.type === TSESTree.AST_NODE_TYPES.CallExpression &&
      node.init.callee.type === TSESTree.AST_NODE_TYPES.MemberExpression) ||
    (node.init?.type === TSESTree.AST_NODE_TYPES.MemberExpression &&
      node.init.object.type === TSESTree.AST_NODE_TYPES.CallExpression);

  if (
    node.id.type === TSESTree.AST_NODE_TYPES.ArrayPattern ||
    node.id.type === TSESTree.AST_NODE_TYPES.ObjectPattern
  ) {
    if (isVariableCallExpression)
      return validateFile({
        node,
        context,
        name: "*",
        nodeType: "CallExpression",
      });

    return validateFile({
      node,
      context,
      name: "*",
      nodeType: "VariableDeclarator",
    });
  }

  let currentNodeType: NodeType = "VariableDeclarator";
  const initType = node.init?.type;

  if (initType === TSESTree.AST_NODE_TYPES.ArrowFunctionExpression)
    currentNodeType = "ArrowFunctionExpression";

  if (isVariableCallExpression) currentNodeType = "CallExpression";

  if (initType === TSESTree.AST_NODE_TYPES.TaggedTemplateExpression)
    currentNodeType = "TaggedTemplateExpression";

  validateFile({
    node,
    context,
    name: node.id.name,
    nodeType: currentNodeType,
  });
};
