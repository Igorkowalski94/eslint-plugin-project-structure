import { TSESTree } from "@typescript-eslint/utils";

import { Context } from "rules/fileComposition/fileComposition.types";
import { handlePropertyDefinition } from "rules/fileComposition/helpers/handlePropertyDefinition";
import { validateFile } from "rules/fileComposition/helpers/validateFile/validateFile";

jest.mock("rules/fileComposition/helpers/validateFile/validateFile", () => ({
  validateFile: jest.fn(),
}));

describe("handlePropertyDefinition", () => {
  test("Should call validateFile when node.key.type === TSESTree.AST_NODE_TYPES.Identifier", () => {
    const validateFileMock = jest.fn();

    (validateFile as jest.Mock).mockImplementation(validateFileMock);

    handlePropertyDefinition({
      node: {
        key: { type: TSESTree.AST_NODE_TYPES.Identifier, name: "methodName" },
      } as TSESTree.PropertyDefinition,
      context: {} as Context,
      config: { filesRules: [] },
    });

    expect(validateFileMock).toHaveBeenCalled();
  });

  test("Should not call validateFile when node.key.type !== TSESTree.AST_NODE_TYPES.Identifier", () => {
    const validateFileMock = jest.fn();

    (validateFile as jest.Mock).mockImplementation(validateFileMock);

    handlePropertyDefinition({
      node: {
        key: {
          type: TSESTree.AST_NODE_TYPES.ConditionalExpression,
        },
      } as TSESTree.PropertyDefinition,
      context: {} as Context,
      config: { filesRules: [] },
    });

    expect(validateFileMock).not.toHaveBeenCalled();
  });

  test("Should call validateFile with ArrowFunctionExpression", () => {
    const validateFileMock = jest.fn();

    (validateFile as jest.Mock).mockImplementation(validateFileMock);

    handlePropertyDefinition({
      node: {
        key: { type: TSESTree.AST_NODE_TYPES.Identifier, name: "methodName1" },
        value: { type: TSESTree.AST_NODE_TYPES.ArrowFunctionExpression },
      } as TSESTree.PropertyDefinition,
      context: {} as Context,
      config: { filesRules: [] },
    });

    expect(validateFileMock).toHaveBeenCalledWith({
      node: {
        key: { type: TSESTree.AST_NODE_TYPES.Identifier, name: "methodName1" },
        value: { type: TSESTree.AST_NODE_TYPES.ArrowFunctionExpression },
      },
      context: {},
      name: "methodName1",
      nodeType: "ArrowFunctionExpression",
      fileConfig: undefined,
      config: { filesRules: [] },
    });
  });

  test("Should call validateFile with VariableDeclarator", () => {
    const validateFileMock = jest.fn();

    (validateFile as jest.Mock).mockImplementation(validateFileMock);

    handlePropertyDefinition({
      node: {
        key: { type: TSESTree.AST_NODE_TYPES.Identifier, name: "methodName2" },
      } as TSESTree.PropertyDefinition,
      context: {} as Context,
      config: { filesRules: [] },
    });

    expect(validateFileMock).toHaveBeenCalledWith({
      node: {
        key: { type: TSESTree.AST_NODE_TYPES.Identifier, name: "methodName2" },
      },
      context: {},
      name: "methodName2",
      nodeType: "VariableDeclarator",
      fileConfig: undefined,
      config: { filesRules: [] },
    });
  });
});
