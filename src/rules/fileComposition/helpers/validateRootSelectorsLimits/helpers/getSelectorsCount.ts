/* eslint-disable complexity */
import { TSESTree } from "@typescript-eslint/utils";

import { SelectorType } from "rules/fileComposition/fileComposition.types";
import { getIdentifierFromExpression } from "rules/fileComposition/helpers/getIdentifierFromExpression";

// eslint-disable-next-line project-structure/file-composition
type GetSelectorsCountReturn = Partial<Record<SelectorType, number>>;

export const getSelectorsCount = (
  bodyNode: TSESTree.ProgramStatement[],
): GetSelectorsCountReturn => {
  const selectorsCount: GetSelectorsCountReturn = {};

  const incrementSelectorCount = (nodeType: SelectorType): void => {
    if (selectorsCount[nodeType]) {
      selectorsCount[nodeType] = selectorsCount[nodeType] + 1;
      return;
    }

    selectorsCount[nodeType] = 1;
  };

  const checkNode = (node: TSESTree.ProgramStatement): void => {
    if (node.type === TSESTree.AST_NODE_TYPES.ClassDeclaration)
      incrementSelectorCount("class");

    if (node.type === TSESTree.AST_NODE_TYPES.FunctionDeclaration)
      incrementSelectorCount("function");

    if (node.type === TSESTree.AST_NODE_TYPES.TSTypeAliasDeclaration)
      incrementSelectorCount("type");

    if (node.type === TSESTree.AST_NODE_TYPES.TSInterfaceDeclaration)
      incrementSelectorCount("interface");

    if (node.type === TSESTree.AST_NODE_TYPES.TSEnumDeclaration)
      incrementSelectorCount("enum");

    if (node.type === TSESTree.AST_NODE_TYPES.VariableDeclaration)
      node.declarations.forEach((variableNode) => {
        if (
          variableNode.init?.type ===
          TSESTree.AST_NODE_TYPES.ArrowFunctionExpression
        )
          return incrementSelectorCount("arrowFunction");

        const isVariableExpression = getIdentifierFromExpression(
          variableNode.init,
        );

        if (isVariableExpression)
          return incrementSelectorCount("variableExpression");

        incrementSelectorCount("variable");
      });
  };

  bodyNode.forEach((node) => {
    if (
      node.type === TSESTree.AST_NODE_TYPES.ClassDeclaration ||
      node.type === TSESTree.AST_NODE_TYPES.FunctionDeclaration ||
      node.type === TSESTree.AST_NODE_TYPES.TSTypeAliasDeclaration ||
      node.type === TSESTree.AST_NODE_TYPES.TSInterfaceDeclaration ||
      node.type === TSESTree.AST_NODE_TYPES.TSEnumDeclaration ||
      node.type === TSESTree.AST_NODE_TYPES.VariableDeclaration
    )
      checkNode(node);

    if (
      (node.type === TSESTree.AST_NODE_TYPES.ExportNamedDeclaration ||
        node.type === TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration) &&
      (node.declaration?.type === TSESTree.AST_NODE_TYPES.ClassDeclaration ||
        node.declaration?.type ===
          TSESTree.AST_NODE_TYPES.FunctionDeclaration ||
        node.declaration?.type ===
          TSESTree.AST_NODE_TYPES.TSTypeAliasDeclaration ||
        node.declaration?.type ===
          TSESTree.AST_NODE_TYPES.TSInterfaceDeclaration ||
        node.declaration?.type === TSESTree.AST_NODE_TYPES.TSEnumDeclaration ||
        node.declaration?.type === TSESTree.AST_NODE_TYPES.VariableDeclaration)
    )
      checkNode(node.declaration as TSESTree.ProgramStatement);
  });

  return selectorsCount;
};
