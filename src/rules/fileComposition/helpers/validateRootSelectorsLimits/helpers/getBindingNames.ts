import { TSESTree } from "@typescript-eslint/utils";

export const getBindingNames = (node: TSESTree.Node | null): string[] => {
  if (!node) return [];

  if (node.type === TSESTree.AST_NODE_TYPES.Identifier) return [node.name];

  if (node.type === TSESTree.AST_NODE_TYPES.AssignmentPattern)
    return getBindingNames(node.left);

  if (node.type === TSESTree.AST_NODE_TYPES.RestElement)
    return getBindingNames(node.argument);

  if (node.type === TSESTree.AST_NODE_TYPES.Property)
    return getBindingNames(node.value);

  if (node.type === TSESTree.AST_NODE_TYPES.ObjectPattern)
    return node.properties.flatMap(getBindingNames);

  if (node.type === TSESTree.AST_NODE_TYPES.ArrayPattern)
    return node.elements.flatMap(getBindingNames);

  return [];
};
