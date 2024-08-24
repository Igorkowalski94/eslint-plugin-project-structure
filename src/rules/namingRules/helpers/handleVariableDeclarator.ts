import { TSESTree } from "@typescript-eslint/utils";

import { validateName } from "rules/namingRules/helpers/validateName/validateName";
import { Context, NodeType } from "rules/namingRules/namingRules.types";

interface HandleVariableDeclaratorProps {
  node: TSESTree.VariableDeclarator;
  context: Context;
}

export const handleVariableDeclarator = ({
  node,
  context,
}: HandleVariableDeclaratorProps): void => {
  if (node.id.type !== TSESTree.AST_NODE_TYPES.Identifier) return;

  const nodeType: NodeType =
    node.init?.type === TSESTree.AST_NODE_TYPES.ArrowFunctionExpression
      ? "ArrowFunctionExpression"
      : "VariableDeclarator";

  validateName({
    node,
    context,
    name: node.id.name,
    nodeType,
  });
};
