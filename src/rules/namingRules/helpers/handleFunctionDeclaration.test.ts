import { TSESTree } from "@typescript-eslint/utils";

import { handleFunctionDeclaration } from "rules/namingRules/helpers/handleFunctionDeclaration";
import { validateName } from "rules/namingRules/helpers/validateName/validateName";
import { Context } from "rules/namingRules/namingRules.types";

jest.mock("rules/namingRules/helpers/validateName/validateName", () => ({
  validateName: jest.fn(),
}));

describe("handleFunctionDeclaration", () => {
  test("Should call validateName when !!name", () => {
    const validateNameMock = jest.fn();

    (validateName as jest.Mock).mockImplementation(validateNameMock);

    handleFunctionDeclaration({
      node: {
        id: { name: "className" },
      } as TSESTree.FunctionDeclaration,
      context: {} as Context,
    });

    expect(validateNameMock).toHaveBeenCalled();
  });

  test("Should not call validateName when !name", () => {
    const validateNameMock = jest.fn();

    (validateName as jest.Mock).mockImplementation(validateNameMock);

    handleFunctionDeclaration({
      node: {} as TSESTree.FunctionDeclaration,
      context: {} as Context,
    });

    expect(validateNameMock).not.toHaveBeenCalled();
  });
});
