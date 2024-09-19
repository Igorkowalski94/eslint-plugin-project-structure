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

  let currentNodeType: NodeType = "VariableDeclarator";
  const initType = node.init?.type;

  if (initType === TSESTree.AST_NODE_TYPES.ArrowFunctionExpression)
    currentNodeType = "ArrowFunctionExpression";

  if (initType === TSESTree.AST_NODE_TYPES.CallExpression)
    currentNodeType = "CallExpression";

  if (initType === TSESTree.AST_NODE_TYPES.TaggedTemplateExpression)
    currentNodeType = "TaggedTemplateExpression";

  validateName({
    node,
    context,
    name: node.id.name,
    nodeType: currentNodeType,
  });
};
