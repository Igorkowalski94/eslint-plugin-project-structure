import { TSESTree } from "@typescript-eslint/utils";

import { Context } from "rules/fileComposition/fileComposition.types";
import { handleVariableDeclarator } from "rules/fileComposition/helpers/handleVariableDeclarator";
import { validateFile } from "rules/fileComposition/helpers/validateFile/validateFile";

jest.mock("rules/fileComposition/helpers/validateFile/validateFile", () => ({
  validateFile: jest.fn(),
}));

describe("handleVariableDeclarator", () => {
  test.each([
    {
      node: {
        id: {
          type: TSESTree.AST_NODE_TYPES.ObjectPattern,
        },
      },
      expected: {
        node: {
          id: {
            type: TSESTree.AST_NODE_TYPES.ObjectPattern,
          },
        },
        context: {},
        name: "*",
        nodeType: "VariableDeclarator",
      },
    },
    {
      node: {
        id: {
          type: TSESTree.AST_NODE_TYPES.ArrayPattern,
        },
      },
      expected: {
        node: {
          id: {
            type: TSESTree.AST_NODE_TYPES.ArrayPattern,
          },
        },
        context: {},
        name: "*",
        nodeType: "VariableDeclarator",
      },
    },
    {
      node: {
        id: {
          type: TSESTree.AST_NODE_TYPES.ObjectPattern,
        },
        init: {
          type: TSESTree.AST_NODE_TYPES.CallExpression,
          callee: { type: TSESTree.AST_NODE_TYPES.Identifier },
        },
      },
      expected: {
        node: {
          id: {
            type: TSESTree.AST_NODE_TYPES.ObjectPattern,
          },
          init: {
            type: TSESTree.AST_NODE_TYPES.CallExpression,
            callee: { type: TSESTree.AST_NODE_TYPES.Identifier },
          },
        },
        context: {},
        name: "*",
        nodeType: "CallExpression",
      },
    },
    {
      node: {
        id: {
          type: TSESTree.AST_NODE_TYPES.ArrayPattern,
        },
        init: {
          type: TSESTree.AST_NODE_TYPES.MemberExpression,
          object: { type: TSESTree.AST_NODE_TYPES.CallExpression },
        },
      },
      expected: {
        node: {
          id: {
            type: TSESTree.AST_NODE_TYPES.ArrayPattern,
          },
          init: {
            type: TSESTree.AST_NODE_TYPES.MemberExpression,
            object: { type: TSESTree.AST_NODE_TYPES.CallExpression },
          },
        },
        context: {},
        name: "*",
        nodeType: "CallExpression",
      },
    },
  ])(
    "Should call validateFile with correct values variableDestructuring for %o",
    ({ node, expected }) => {
      const validateFileMock = jest.fn();

      (validateFile as jest.Mock).mockImplementation(validateFileMock);

      handleVariableDeclarator({
        node: node as TSESTree.VariableDeclarator,
        context: {} as Context,
      });

      expect(validateFileMock).toHaveBeenCalledWith(expected);
    },
  );
  test.each([
    {
      node: {
        id: {
          type: TSESTree.AST_NODE_TYPES.Identifier,
          name: "name",
        },
        init: {
          type: "ArrowFunctionExpression",
        },
      },
      expected: {
        node: {
          id: {
            type: TSESTree.AST_NODE_TYPES.Identifier,
            name: "name",
          },
          init: {
            type: "ArrowFunctionExpression",
          },
        },
        context: {},
        name: "name",
        nodeType: "ArrowFunctionExpression",
      },
    },
    {
      node: {
        id: {
          type: TSESTree.AST_NODE_TYPES.Identifier,
          name: "name",
        },
        init: {
          type: "CallExpression",
          callee: { type: "Identifier" },
        },
      },
      expected: {
        node: {
          id: {
            type: TSESTree.AST_NODE_TYPES.Identifier,
            name: "name",
          },
          init: {
            type: "CallExpression",
            callee: { type: "Identifier" },
          },
        },
        context: {},
        name: "name",
        nodeType: "CallExpression",
      },
    },
    {
      node: {
        id: {
          type: TSESTree.AST_NODE_TYPES.Identifier,
          name: "name",
        },
        init: {
          type: "TaggedTemplateExpression",
        },
      },
      expected: {
        node: {
          id: {
            type: TSESTree.AST_NODE_TYPES.Identifier,
            name: "name",
          },
          init: {
            type: "TaggedTemplateExpression",
          },
        },
        context: {},
        name: "name",
        nodeType: "TaggedTemplateExpression",
      },
    },
    {
      node: {
        id: {
          type: TSESTree.AST_NODE_TYPES.Identifier,
          name: "name",
        },
        init: {
          type: "Identifier",
        },
      },
      expected: {
        node: {
          id: {
            type: TSESTree.AST_NODE_TYPES.Identifier,
            name: "name",
          },
          init: {
            type: "Identifier",
          },
        },
        context: {},
        name: "name",
        nodeType: "VariableDeclarator",
      },
    },
  ])(
    "Should call validateFile with correct values for %o",
    ({ node, expected }) => {
      const validateFileMock = jest.fn();

      (validateFile as jest.Mock).mockImplementation(validateFileMock);

      handleVariableDeclarator({
        node: node as TSESTree.VariableDeclarator,
        context: {} as Context,
      });

      expect(validateFileMock).toHaveBeenCalledWith(expected);
    },
  );
});
