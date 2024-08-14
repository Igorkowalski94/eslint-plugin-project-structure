import { TSESTree } from "@typescript-eslint/utils";

import { handleClassDeclaration } from "rules/namingRules/helpers/handleClassDeclaration";
import { validateName } from "rules/namingRules/helpers/validateName/validateName";
import { Context } from "rules/namingRules/namingRules.types";

jest.mock("rules/namingRules/helpers/validateName/validateName", () => ({
  validateName: jest.fn(),
}));

describe("handleClassDeclaration", () => {
  test("Should call validateName when !!name", () => {
    const validateNameMock = jest.fn();

    (validateName as jest.Mock).mockImplementation(validateNameMock);

    handleClassDeclaration({
      node: {
        id: { name: "className" },
      } as TSESTree.ClassDeclaration,
      context: {} as Context,
    });

    expect(validateNameMock).toHaveBeenCalled();
  });

  test("Should not call validateName when !name", () => {
    const validateNameMock = jest.fn();

    (validateName as jest.Mock).mockImplementation(validateNameMock);

    handleClassDeclaration({
      node: {} as TSESTree.ClassDeclaration,
      context: {} as Context,
    });

    expect(validateNameMock).not.toHaveBeenCalled();
  });
});
