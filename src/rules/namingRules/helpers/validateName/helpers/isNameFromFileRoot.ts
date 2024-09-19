import { TSESTree } from "@typescript-eslint/utils";

import { Node, NodeType } from "rules/namingRules/namingRules.types";

export interface IsNameFromFileRootProps {
  nodeType: NodeType;
  node: Node;
}

export const isNameFromFileRoot = ({
  nodeType,
  node,
}: IsNameFromFileRootProps): boolean => {
  if (
    nodeType === "ArrowFunctionExpression" ||
    nodeType === "VariableDeclarator" ||
    nodeType === "CallExpression" ||
    nodeType === "MemberExpression" ||
    nodeType === "TaggedTemplateExpression"
  )
    return (
      node.parent.parent?.type === TSESTree.AST_NODE_TYPES.Program ||
      node.parent.parent?.type ===
        TSESTree.AST_NODE_TYPES.ExportNamedDeclaration ||
      node.parent.parent?.type ===
        TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration ||
      node.parent.type === TSESTree.AST_NODE_TYPES.Program
    );

  return (
    node.parent.type === TSESTree.AST_NODE_TYPES.Program ||
    node.parent.type === TSESTree.AST_NODE_TYPES.ExportNamedDeclaration ||
    node.parent.type === TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration
  );
};
