import { TSESTree } from "@typescript-eslint/utils";

import { handleVariableDeclarator } from "rules/namingRules/helpers/handleVariableDeclarator";
import { validateName } from "rules/namingRules/helpers/validateName/validateName";
import { Context } from "rules/namingRules/namingRules.types";

jest.mock("rules/namingRules/helpers/validateName/validateName", () => ({
  validateName: jest.fn(),
}));

describe("handleVariableDeclarator", () => {
  test("Should not call validateName when type !== Identifier", () => {
    const validateNameMock = jest.fn();

    (validateName as jest.Mock).mockImplementation(validateNameMock);

    handleVariableDeclarator({
      node: {
        id: { type: TSESTree.AST_NODE_TYPES.ArrayPattern },
      } as TSESTree.VariableDeclarator,
      context: {} as Context,
    });

    expect(validateNameMock).not.toHaveBeenCalled();
  });

  test.each([
    {
      type: TSESTree.AST_NODE_TYPES.ArrowFunctionExpression,
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
        nameType: "ArrowFunctionExpression",
      },
    },
    {
      type: TSESTree.AST_NODE_TYPES.Identifier,
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
        nameType: "VariableDeclarator",
      },
    },
  ])(
    "Should call validateName with correct values for %o",
    ({ type, expected }) => {
      const validateNameMock = jest.fn();

      (validateName as jest.Mock).mockImplementation(validateNameMock);

      handleVariableDeclarator({
        node: {
          id: {
            type: TSESTree.AST_NODE_TYPES.Identifier,
            name: "name",
          },
          init: {
            type,
          },
        } as TSESTree.VariableDeclarator,
        context: {} as Context,
      });

      expect(validateNameMock).toHaveBeenCalledWith(expected);
    },
  );
});
