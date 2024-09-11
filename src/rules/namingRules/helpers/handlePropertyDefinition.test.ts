import { TSESTree } from "@typescript-eslint/utils";

import { handlePropertyDefinition } from "rules/namingRules/helpers/handlePropertyDefinition";
import { validateName } from "rules/namingRules/helpers/validateName/validateName";
import { Context } from "rules/namingRules/namingRules.types";

jest.mock("rules/namingRules/helpers/validateName/validateName", () => ({
  validateName: jest.fn(),
}));

describe("handlePropertyDefinition", () => {
  test("Should call validateName when node.key.type === TSESTree.AST_NODE_TYPES.Identifier", () => {
    const validateNameMock = jest.fn();

    (validateName as jest.Mock).mockImplementation(validateNameMock);

    handlePropertyDefinition({
      node: {
        key: { type: TSESTree.AST_NODE_TYPES.Identifier, name: "methodName" },
      } as TSESTree.PropertyDefinition,
      context: {} as Context,
    });

    expect(validateNameMock).toHaveBeenCalled();
  });

  test("Should not call validateName when node.key.type !== TSESTree.AST_NODE_TYPES.Identifier", () => {
    const validateNameMock = jest.fn();

    (validateName as jest.Mock).mockImplementation(validateNameMock);

    handlePropertyDefinition({
      node: {
        key: {
          type: TSESTree.AST_NODE_TYPES.ConditionalExpression,
        },
      } as TSESTree.PropertyDefinition,
      context: {} as Context,
    });

    expect(validateNameMock).not.toHaveBeenCalled();
  });

  test("Should call validateName with ArrowFunctionExpression", () => {
    const validateNameMock = jest.fn();

    (validateName as jest.Mock).mockImplementation(validateNameMock);

    handlePropertyDefinition({
      node: {
        key: { type: TSESTree.AST_NODE_TYPES.Identifier, name: "methodName1" },
        value: { type: TSESTree.AST_NODE_TYPES.ArrowFunctionExpression },
      } as TSESTree.PropertyDefinition,
      context: {} as Context,
    });

    expect(validateNameMock).toHaveBeenCalledWith({
      node: {
        key: { type: TSESTree.AST_NODE_TYPES.Identifier, name: "methodName1" },
        value: { type: TSESTree.AST_NODE_TYPES.ArrowFunctionExpression },
      },
      context: {},
      name: "methodName1",
      nodeType: "ArrowFunctionExpression",
    });
  });

  test("Should call validateName with VariableDeclarator", () => {
    const validateNameMock = jest.fn();

    (validateName as jest.Mock).mockImplementation(validateNameMock);

    handlePropertyDefinition({
      node: {
        key: { type: TSESTree.AST_NODE_TYPES.Identifier, name: "methodName2" },
      } as TSESTree.PropertyDefinition,
      context: {} as Context,
    });

    expect(validateNameMock).toHaveBeenCalledWith({
      node: {
        key: { type: TSESTree.AST_NODE_TYPES.Identifier, name: "methodName2" },
      },
      context: {},
      name: "methodName2",
      nodeType: "VariableDeclarator",
    });
  });
});
