/* eslint-disable complexity */
import { TSESTree } from "@typescript-eslint/utils";

export const getIdentifierFromExpression = (
  expression: TSESTree.Expression | null,
): string | undefined => {
  if (!expression) return;

  if (
    expression.type === TSESTree.AST_NODE_TYPES.CallExpression &&
    expression.callee.type === TSESTree.AST_NODE_TYPES.Identifier
  )
    return expression.callee.name;

  if (
    expression.type === TSESTree.AST_NODE_TYPES.MemberExpression &&
    expression.object.type === TSESTree.AST_NODE_TYPES.Identifier
  )
    return expression.object.name;

  // const variable = fn``
  if (
    expression.type === TSESTree.AST_NODE_TYPES.TaggedTemplateExpression &&
    expression.tag.type === TSESTree.AST_NODE_TYPES.Identifier
  )
    return expression.tag.name;

  // const variable = fn()``
  // const variable = obj.key``
  if (
    expression.type === TSESTree.AST_NODE_TYPES.TaggedTemplateExpression &&
    (expression.tag.type === TSESTree.AST_NODE_TYPES.MemberExpression ||
      expression.tag.type === TSESTree.AST_NODE_TYPES.CallExpression)
  )
    return getIdentifierFromExpression(expression.tag);

  // const variable = fn()``    as Type
  // const variable = obj.key`` as Type
  // const variable = fn()      as Type
  if (
    expression.type === TSESTree.AST_NODE_TYPES.TSAsExpression &&
    (expression.expression.type === TSESTree.AST_NODE_TYPES.CallExpression ||
      expression.expression.type ===
        TSESTree.AST_NODE_TYPES.TaggedTemplateExpression)
  )
    return getIdentifierFromExpression(expression.expression);

  // const variable = fn()()
  // const variable = fn().key
  if (
    expression.type === TSESTree.AST_NODE_TYPES.CallExpression &&
    (expression.callee.type === TSESTree.AST_NODE_TYPES.CallExpression ||
      expression.callee.type === TSESTree.AST_NODE_TYPES.MemberExpression)
  )
    return getIdentifierFromExpression(expression.callee);

  // const variable = obj.key
  if (
    expression.type === TSESTree.AST_NODE_TYPES.MemberExpression &&
    expression.object.type === TSESTree.AST_NODE_TYPES.MemberExpression
  )
    return getIdentifierFromExpression(expression.object);

  return;
};
