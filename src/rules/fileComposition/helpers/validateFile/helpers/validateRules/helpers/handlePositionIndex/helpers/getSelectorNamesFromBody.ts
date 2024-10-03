/* eslint-disable complexity */
import { TSESTree } from "@typescript-eslint/utils";

export const getSelectorNamesFromBody = (
  body: TSESTree.ProgramStatement[],
): string[] =>
  body
    .map((node) => {
      const currentNode =
        node.type === TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration ||
        node.type === TSESTree.AST_NODE_TYPES.ExportNamedDeclaration
          ? node.declaration
          : node;

      if (
        currentNode?.type === TSESTree.AST_NODE_TYPES.VariableDeclaration &&
        currentNode.declarations[0].id.type ===
          TSESTree.AST_NODE_TYPES.Identifier
      ) {
        return currentNode.declarations[0].id.name;
      }

      if (
        currentNode?.type === TSESTree.AST_NODE_TYPES.FunctionDeclaration ||
        currentNode?.type === TSESTree.AST_NODE_TYPES.ClassDeclaration ||
        currentNode?.type === TSESTree.AST_NODE_TYPES.TSInterfaceDeclaration ||
        currentNode?.type === TSESTree.AST_NODE_TYPES.TSTypeAliasDeclaration ||
        currentNode?.type === TSESTree.AST_NODE_TYPES.TSEnumDeclaration
      ) {
        return currentNode.id?.name;
      }

      return undefined;
    })
    .filter((v): v is string => v !== undefined);
