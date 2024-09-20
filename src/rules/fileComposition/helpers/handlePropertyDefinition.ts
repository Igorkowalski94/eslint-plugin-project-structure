import { TSESTree } from "@typescript-eslint/utils";

import { Context, NodeType } from "rules/fileComposition/fileComposition.types";
import { validateFile } from "rules/fileComposition/helpers/validateFile/validateFile";

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

  validateFile({
    node,
    context,
    name: node.key.name,
    nodeType,
  });
};
