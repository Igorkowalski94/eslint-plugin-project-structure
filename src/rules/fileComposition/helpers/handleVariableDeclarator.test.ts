import { TSESTree } from "@typescript-eslint/utils";

import { Context } from "rules/fileComposition/fileComposition.types";
import { getIdentifierFromExpression } from "rules/fileComposition/helpers/getIdentifierFromExpression";
import { handleVariableDeclarator } from "rules/fileComposition/helpers/handleVariableDeclarator";
import { validateFile } from "rules/fileComposition/helpers/validateFile/validateFile";

jest.mock("rules/fileComposition/helpers/validateFile/validateFile", () => ({
  validateFile: jest.fn(),
}));

jest.mock("rules/fileComposition/helpers/getIdentifierFromExpression", () => ({
  getIdentifierFromExpression: jest.fn(),
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
        fileConfig: undefined,
        config: { filesRules: [] },
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
        fileConfig: undefined,
        config: { filesRules: [] },
      },
    },
  ])(
    "Should call validateFile with correct values variableDestructuring && !expressionName for %o",
    ({ node, expected }) => {
      const validateFileMock = jest.fn();

      (validateFile as jest.Mock).mockImplementation(validateFileMock);
      (getIdentifierFromExpression as jest.Mock).mockReturnValue(undefined);

      handleVariableDeclarator({
        node: node as TSESTree.VariableDeclarator,
        context: {} as Context,
        config: { filesRules: [] },
      });

      expect(validateFileMock).toHaveBeenCalledWith(expected);
    },
  );

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
        nodeType: "Expression",
        expressionName: "expressionName",
        fileConfig: undefined,
        config: { filesRules: [] },
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
        nodeType: "Expression",
        expressionName: "expressionName",
        fileConfig: undefined,
        config: { filesRules: [] },
      },
    },
  ])(
    "Should call validateFile with correct values variableDestructuring && expressionName for %o",
    ({ node, expected }) => {
      const validateFileMock = jest.fn();

      (getIdentifierFromExpression as jest.Mock).mockReturnValue(
        "expressionName",
      );

      (validateFile as jest.Mock).mockImplementation(validateFileMock);

      handleVariableDeclarator({
        node: node as TSESTree.VariableDeclarator,
        context: {} as Context,
        config: { filesRules: [] },
      });

      expect(validateFileMock).toHaveBeenCalledWith(expected);
    },
  );

  test("Should call validateFile with expressionName %o", () => {
    const validateFileMock = jest.fn();

    (getIdentifierFromExpression as jest.Mock).mockReturnValue(
      "expressionName",
    );
    (validateFile as jest.Mock).mockImplementation(validateFileMock);

    handleVariableDeclarator({
      node: {
        id: {
          type: TSESTree.AST_NODE_TYPES.Identifier,
          name: "name",
        },
      } as TSESTree.VariableDeclarator,
      context: {} as Context,
      config: { filesRules: [] },
    });

    expect(validateFileMock).toHaveBeenCalledWith({
      node: {
        id: {
          type: TSESTree.AST_NODE_TYPES.Identifier,
          name: "name",
        },
      },
      context: {},
      name: "name",
      nodeType: "Expression",
      expressionName: "expressionName",
      fileConfig: undefined,
      config: { filesRules: [] },
    });
  });

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
        fileConfig: undefined,
        config: { filesRules: [] },
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
        fileConfig: undefined,
        config: { filesRules: [] },
      },
    },
  ])(
    "Should call validateFile with correct values for %o",
    ({ node, expected }) => {
      const validateFileMock = jest.fn();

      (getIdentifierFromExpression as jest.Mock).mockReturnValue(undefined);
      (validateFile as jest.Mock).mockImplementation(validateFileMock);

      handleVariableDeclarator({
        node: node as TSESTree.VariableDeclarator,
        context: {} as Context,
        config: { filesRules: [] },
      });

      expect(validateFileMock).toHaveBeenCalledWith(expected);
    },
  );
});
