import { TSESTree } from "@typescript-eslint/utils";

import { Context } from "rules/fileComposition/fileComposition.types";
import { handleFunctionDeclaration } from "rules/fileComposition/helpers/handleFunctionDeclaration";
import { validateFile } from "rules/fileComposition/helpers/validateFile/validateFile";

jest.mock("rules/fileComposition/helpers/validateFile/validateFile", () => ({
  validateFile: jest.fn(),
}));

describe("handleFunctionDeclaration", () => {
  test("Should call validateFile when !!name", () => {
    const validateFileMock = jest.fn();

    (validateFile as jest.Mock).mockImplementation(validateFileMock);

    handleFunctionDeclaration({
      node: {
        id: { name: "className" },
      } as TSESTree.FunctionDeclaration,
      context: {} as Context,
      config: { filesRules: [] },
    });

    expect(validateFileMock).toHaveBeenCalled();
  });

  test("Should not call validateFile when !name", () => {
    const validateFileMock = jest.fn();

    (validateFile as jest.Mock).mockImplementation(validateFileMock);

    handleFunctionDeclaration({
      node: {} as TSESTree.FunctionDeclaration,
      context: {} as Context,
      config: { filesRules: [] },
    });

    expect(validateFileMock).not.toHaveBeenCalled();
  });
});
