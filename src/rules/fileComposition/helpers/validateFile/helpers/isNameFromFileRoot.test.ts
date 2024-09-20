import { TSESTree } from "@typescript-eslint/utils";

import { NodeType } from "rules/fileComposition/fileComposition.types";
import {
  isNameFromFileRoot,
  IsNameFromFileRootProps,
} from "rules/fileComposition/helpers/validateFile/helpers/isNameFromFileRoot";

describe("isNameFromFileRoot", () => {
  test.each<{
    nodeType: NodeType;
    node:
      | TSESTree.VariableDeclarator
      | TSESTree.ClassDeclaration
      | TSESTree.FunctionDeclaration
      | TSESTree.TSTypeAliasDeclaration
      | TSESTree.TSInterfaceDeclaration
      | TSESTree.TSEnumDeclaration
      | TSESTree.BlockStatement;
    expected: boolean;
  }>([
    {
      nodeType: "ClassDeclaration",
      node: {
        parent: { type: TSESTree.AST_NODE_TYPES.Program },
      } as TSESTree.ClassDeclaration,
      expected: true,
    },
    {
      nodeType: "ClassDeclaration",
      node: {
        parent: {
          type: TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration,
        },
      } as TSESTree.ClassDeclaration,
      expected: true,
    },
    {
      nodeType: "ClassDeclaration",
      node: {
        parent: {
          type: TSESTree.AST_NODE_TYPES.ExportNamedDeclaration,
        },
      } as TSESTree.ClassDeclaration,
      expected: true,
    },
    {
      nodeType: "FunctionDeclaration",
      node: {
        parent: { type: TSESTree.AST_NODE_TYPES.Program },
      } as TSESTree.FunctionDeclaration,
      expected: true,
    },
    {
      nodeType: "FunctionDeclaration",
      node: {
        parent: {
          type: TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration,
        },
      } as TSESTree.FunctionDeclaration,
      expected: true,
    },
    {
      nodeType: "FunctionDeclaration",
      node: {
        parent: {
          type: TSESTree.AST_NODE_TYPES.ExportNamedDeclaration,
        },
      } as TSESTree.FunctionDeclaration,
      expected: true,
    },
    {
      nodeType: "TSEnumDeclaration",
      node: {
        parent: { type: TSESTree.AST_NODE_TYPES.Program },
      } as TSESTree.TSEnumDeclaration,
      expected: true,
    },
    {
      nodeType: "TSEnumDeclaration",
      node: {
        parent: {
          type: TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration,
        },
      } as TSESTree.TSEnumDeclaration,
      expected: true,
    },
    {
      nodeType: "TSEnumDeclaration",
      node: {
        parent: {
          type: TSESTree.AST_NODE_TYPES.ExportNamedDeclaration,
        },
      } as TSESTree.TSEnumDeclaration,
      expected: true,
    },

    {
      nodeType: "TSInterfaceDeclaration",
      node: {
        parent: { type: TSESTree.AST_NODE_TYPES.Program },
      } as TSESTree.TSInterfaceDeclaration,
      expected: true,
    },
    {
      nodeType: "TSInterfaceDeclaration",
      node: {
        parent: {
          type: TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration,
        },
      } as TSESTree.TSInterfaceDeclaration,
      expected: true,
    },
    {
      nodeType: "TSInterfaceDeclaration",
      node: {
        parent: {
          type: TSESTree.AST_NODE_TYPES.ExportNamedDeclaration,
        },
      } as TSESTree.TSInterfaceDeclaration,
      expected: true,
    },

    {
      nodeType: "TSTypeAliasDeclaration",
      node: {
        parent: { type: TSESTree.AST_NODE_TYPES.Program },
      } as TSESTree.TSTypeAliasDeclaration,
      expected: true,
    },
    {
      nodeType: "TSTypeAliasDeclaration",
      node: {
        parent: {
          type: TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration,
        },
      } as TSESTree.TSTypeAliasDeclaration,
      expected: true,
    },
    {
      nodeType: "TSTypeAliasDeclaration",
      node: {
        parent: {
          type: TSESTree.AST_NODE_TYPES.ExportNamedDeclaration,
        },
      } as TSESTree.TSTypeAliasDeclaration,
      expected: true,
    },

    {
      nodeType: "ArrowFunctionExpression",
      node: {
        parent: { parent: { type: TSESTree.AST_NODE_TYPES.Program } },
      } as TSESTree.VariableDeclarator,
      expected: true,
    },
    {
      nodeType: "ArrowFunctionExpression",
      node: {
        parent: {
          parent: {
            type: TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration,
          },
        },
      } as TSESTree.VariableDeclarator,
      expected: true,
    },
    {
      nodeType: "ArrowFunctionExpression",
      node: {
        parent: {
          parent: {
            type: TSESTree.AST_NODE_TYPES.ExportNamedDeclaration,
          },
        },
      } as TSESTree.VariableDeclarator,
      expected: true,
    },

    {
      nodeType: "VariableDeclarator",
      node: {
        parent: { parent: { type: TSESTree.AST_NODE_TYPES.Program } },
      } as TSESTree.VariableDeclarator,
      expected: true,
    },
    {
      nodeType: "VariableDeclarator",
      node: {
        parent: {
          parent: {
            type: TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration,
          },
        },
      } as TSESTree.VariableDeclarator,
      expected: true,
    },
    {
      nodeType: "VariableDeclarator",
      node: {
        parent: {
          parent: {
            type: TSESTree.AST_NODE_TYPES.ExportNamedDeclaration,
          },
        },
      } as TSESTree.VariableDeclarator,
      expected: true,
    },

    {
      nodeType: "ClassDeclaration",
      node: {
        parent: { type: TSESTree.AST_NODE_TYPES.BlockStatement },
      } as TSESTree.BlockStatement,
      expected: false,
    },

    {
      nodeType: "FunctionDeclaration",
      node: {
        parent: { type: TSESTree.AST_NODE_TYPES.BlockStatement },
      } as TSESTree.BlockStatement,
      expected: false,
    },

    {
      nodeType: "TSEnumDeclaration",
      node: {
        parent: { type: TSESTree.AST_NODE_TYPES.BlockStatement },
      } as TSESTree.BlockStatement,
      expected: false,
    },

    {
      nodeType: "TSInterfaceDeclaration",
      node: {
        parent: { type: TSESTree.AST_NODE_TYPES.BlockStatement },
      } as TSESTree.BlockStatement,
      expected: false,
    },

    {
      nodeType: "TSTypeAliasDeclaration",
      node: {
        parent: { type: TSESTree.AST_NODE_TYPES.BlockStatement },
      } as TSESTree.BlockStatement,
      expected: false,
    },

    {
      nodeType: "ArrowFunctionExpression",
      node: {
        parent: {
          parent: { type: TSESTree.AST_NODE_TYPES.BlockStatement },
        },
      } as TSESTree.BlockStatement,
      expected: false,
    },

    {
      nodeType: "VariableDeclarator",
      node: {
        parent: {
          parent: { type: TSESTree.AST_NODE_TYPES.BlockStatement },
        },
      } as TSESTree.BlockStatement,
      expected: false,
    },
  ])("Should return correct value for = %o", ({ nodeType, node, expected }) => {
    expect(
      isNameFromFileRoot({
        nodeType,
        node: node as IsNameFromFileRootProps["node"],
      }),
    ).toEqual(expected);
  });
});
