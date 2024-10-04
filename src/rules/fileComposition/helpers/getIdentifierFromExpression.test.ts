import { TSESTree } from "@typescript-eslint/utils";

import { getIdentifierFromExpression } from "rules/fileComposition/helpers/getIdentifierFromExpression";

describe("getIdentifierFromExpression", () => {
  test.each<{
    expression: TSESTree.Expression | null;
    expected: string | undefined;
  }>([
    {
      expression: null,
      expected: undefined,
    },

    {
      expression: {
        type: TSESTree.AST_NODE_TYPES.CallExpression,
        callee: { type: TSESTree.AST_NODE_TYPES.Identifier, name: "name" },
      } as TSESTree.Expression,
      expected: "name",
    },

    {
      expression: {
        type: TSESTree.AST_NODE_TYPES.MemberExpression,
        object: { type: TSESTree.AST_NODE_TYPES.Identifier, name: "name" },
      } as TSESTree.Expression,
      expected: "name",
    },

    {
      expression: {
        type: TSESTree.AST_NODE_TYPES.TaggedTemplateExpression,
        tag: {
          type: TSESTree.AST_NODE_TYPES.CallExpression,
          callee: { type: TSESTree.AST_NODE_TYPES.Identifier, name: "name" },
        },
      } as TSESTree.Expression,
      expected: "name",
    },

    {
      expression: {
        type: TSESTree.AST_NODE_TYPES.TaggedTemplateExpression,
        tag: {
          type: TSESTree.AST_NODE_TYPES.Identifier,
          name: "name",
        },
      } as TSESTree.Expression,
      expected: "name",
    },

    {
      expression: {
        type: TSESTree.AST_NODE_TYPES.TaggedTemplateExpression,
        tag: {
          type: TSESTree.AST_NODE_TYPES.MemberExpression,
          object: { type: TSESTree.AST_NODE_TYPES.Identifier, name: "name" },
        },
      } as TSESTree.Expression,
      expected: "name",
    },

    {
      expression: {
        type: TSESTree.AST_NODE_TYPES.TSAsExpression,
        expression: {
          type: TSESTree.AST_NODE_TYPES.CallExpression,
          callee: { type: TSESTree.AST_NODE_TYPES.Identifier, name: "name" },
        },
      } as TSESTree.Expression,
      expected: "name",
    },

    {
      expression: {
        type: TSESTree.AST_NODE_TYPES.TSAsExpression,
        expression: {
          type: TSESTree.AST_NODE_TYPES.TaggedTemplateExpression,
          tag: {
            type: TSESTree.AST_NODE_TYPES.MemberExpression,
            object: { type: TSESTree.AST_NODE_TYPES.Identifier, name: "name" },
          },
        },
      } as TSESTree.Expression,
      expected: "name",
    },

    {
      expression: {
        type: TSESTree.AST_NODE_TYPES.CallExpression,
        callee: {
          type: TSESTree.AST_NODE_TYPES.CallExpression,
          callee: { type: TSESTree.AST_NODE_TYPES.Identifier, name: "name" },
        },
      } as TSESTree.Expression,
      expected: "name",
    },

    {
      expression: {
        type: TSESTree.AST_NODE_TYPES.CallExpression,
        callee: {
          type: TSESTree.AST_NODE_TYPES.MemberExpression,
          object: { type: TSESTree.AST_NODE_TYPES.Identifier, name: "name" },
        },
      } as TSESTree.Expression,
      expected: "name",
    },

    {
      expression: {
        type: TSESTree.AST_NODE_TYPES.MemberExpression,
        object: {
          type: TSESTree.AST_NODE_TYPES.MemberExpression,
          object: { type: TSESTree.AST_NODE_TYPES.Identifier, name: "name" },
        },
      } as TSESTree.Expression,
      expected: "name",
    },
  ])("Should return correct value for %o", ({ expression, expected }) => {
    expect(getIdentifierFromExpression(expression)).toEqual(expected);
  });
});
