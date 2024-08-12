import { TSESTree } from "@typescript-eslint/utils";
import { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";

import { handleFunctionDeclaration } from "rules/namingRules/helpers/handleFunctionDeclaration";
import { validateName } from "rules/namingRules/helpers/validateName";
import { ESLINT_ERRORS } from "rules/namingRules/namingRules.consts";
import { FileNamingRules } from "rules/namingRules/namingRules.types";

jest.mock("rules/namingRules/helpers/validateName", () => ({
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
      context: {} as RuleContext<keyof typeof ESLINT_ERRORS, FileNamingRules[]>,
    });

    expect(validateNameMock).toHaveBeenCalled();
  });

  test("Should not call validateName when !name", () => {
    const validateNameMock = jest.fn();

    (validateName as jest.Mock).mockImplementation(validateNameMock);

    handleFunctionDeclaration({
      node: {} as TSESTree.FunctionDeclaration,
      context: {} as RuleContext<keyof typeof ESLINT_ERRORS, FileNamingRules[]>,
    });

    expect(validateNameMock).not.toHaveBeenCalled();
  });
});
