/* eslint-disable complexity */
import { TSESTree } from "@typescript-eslint/utils";

import { SelectorType } from "rules/fileComposition/fileComposition.types";
import { getIdentifierFromExpression } from "rules/fileComposition/helpers/getIdentifierFromExpression";
import { getBindingNames } from "rules/fileComposition/helpers/validateRootSelectorsLimits/helpers/getBindingNames";

type GetSelectorsCountReturn = Partial<Record<SelectorType, number>>;

/**
 * Without `isNameIncluded` every root selector is counted once.
 * With it only selectors whose name passes are counted, and each name bound by
 * a destructuring pattern is counted separately.
 */
export const getSelectorsCount = (
  bodyNode: TSESTree.ProgramStatement[],
  isNameIncluded?: (name: string) => boolean,
): GetSelectorsCountReturn => {
  const selectorsCount: GetSelectorsCountReturn = {};

  const incrementSelectorCount = (
    nodeType: SelectorType,
    names: string[],
  ): void => {
    const occurrences = isNameIncluded
      ? names.filter(isNameIncluded).length
      : 1;

    if (!occurrences) return;

    selectorsCount[nodeType] = (selectorsCount[nodeType] ?? 0) + occurrences;
  };

  const checkNode = (node: TSESTree.ProgramStatement): void => {
    const names =
      "id" in node && node.id?.type === TSESTree.AST_NODE_TYPES.Identifier
        ? [node.id.name]
        : [];

    if (node.type === TSESTree.AST_NODE_TYPES.ClassDeclaration)
      incrementSelectorCount("class", names);

    if (node.type === TSESTree.AST_NODE_TYPES.FunctionDeclaration)
      incrementSelectorCount("function", names);

    if (node.type === TSESTree.AST_NODE_TYPES.TSTypeAliasDeclaration)
      incrementSelectorCount("type", names);

    if (node.type === TSESTree.AST_NODE_TYPES.TSInterfaceDeclaration)
      incrementSelectorCount("interface", names);

    if (node.type === TSESTree.AST_NODE_TYPES.TSEnumDeclaration)
      incrementSelectorCount("enum", names);

    if (node.type === TSESTree.AST_NODE_TYPES.VariableDeclaration)
      node.declarations.forEach((variableNode) => {
        const variableNames = getBindingNames(variableNode.id);

        if (
          variableNode.init?.type ===
          TSESTree.AST_NODE_TYPES.ArrowFunctionExpression
        )
          return incrementSelectorCount("arrowFunction", variableNames);

        const isVariableExpression = getIdentifierFromExpression(
          variableNode.init,
        );

        if (isVariableExpression)
          return incrementSelectorCount("variableExpression", variableNames);

        incrementSelectorCount("variable", variableNames);
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
