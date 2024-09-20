import { TSESTree } from "@typescript-eslint/utils";

export const getProgramFromNode = (node: TSESTree.Node): TSESTree.Program => {
  if (node.type !== TSESTree.AST_NODE_TYPES.Program)
    return getProgramFromNode(node.parent);

  return node as unknown as TSESTree.Program;
};
