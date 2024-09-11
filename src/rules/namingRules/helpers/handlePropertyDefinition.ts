import { TSESTree } from "@typescript-eslint/utils";

import { validateName } from "rules/namingRules/helpers/validateName/validateName";
import { Context, NodeType } from "rules/namingRules/namingRules.types";

interface HandlePropertyDefinitionProps {
  node: TSESTree.PropertyDefinition;
  context: Context;
}

export const handlePropertyDefinition = ({
  context,
  node,
}: HandlePropertyDefinitionProps): void => {
  if (node.key.type !== TSESTree.AST_NODE_TYPES.Identifier) return;

  const nodeType: NodeType =
    node.value?.type === TSESTree.AST_NODE_TYPES.ArrowFunctionExpression
      ? "ArrowFunctionExpression"
      : "VariableDeclarator";

  validateName({
    node,
    context,
    name: node.key.name,
    nodeType,
  });
};
