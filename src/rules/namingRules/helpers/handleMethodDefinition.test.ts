import { TSESTree } from "@typescript-eslint/utils";

import { handleMethodDefinition } from "rules/namingRules/helpers/handleMethodDefinition";
import { validateName } from "rules/namingRules/helpers/validateName/validateName";
import { Context } from "rules/namingRules/namingRules.types";

jest.mock("rules/namingRules/helpers/validateName/validateName", () => ({
  validateName: jest.fn(),
}));

describe("handleMethodDefinition", () => {
  test("Should call validateName when node.key.type === TSESTree.AST_NODE_TYPES.Identifier", () => {
    const validateNameMock = jest.fn();

    (validateName as jest.Mock).mockImplementation(validateNameMock);

    handleMethodDefinition({
      node: {
        key: { type: TSESTree.AST_NODE_TYPES.Identifier, name: "methodName" },
      } as TSESTree.MethodDefinition,
      context: {} as Context,
    });

    expect(validateNameMock).toHaveBeenCalled();
  });

  test("Should not call validateName when node.key.type !== TSESTree.AST_NODE_TYPES.Identifier", () => {
    const validateNameMock = jest.fn();

    (validateName as jest.Mock).mockImplementation(validateNameMock);

    handleMethodDefinition({
      node: {
        key: {
          type: TSESTree.AST_NODE_TYPES.ConditionalExpression,
        },
      } as TSESTree.MethodDefinition,
      context: {} as Context,
    });

    expect(validateNameMock).not.toHaveBeenCalled();
  });
});
