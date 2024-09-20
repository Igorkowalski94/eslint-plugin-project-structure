import { TSESTree } from "@typescript-eslint/utils";

import { Context } from "rules/fileComposition/fileComposition.types";
import { handleClassDeclaration } from "rules/fileComposition/helpers/handleClassDeclaration";
import { validateFile } from "rules/fileComposition/helpers/validateFile/validateFile";

jest.mock("rules/fileComposition/helpers/validateFile/validateFile", () => ({
  validateFile: jest.fn(),
}));

describe("handleClassDeclaration", () => {
  test("Should call validateFile when !!name", () => {
    const validateFileMock = jest.fn();

    (validateFile as jest.Mock).mockImplementation(validateFileMock);

    handleClassDeclaration({
      node: {
        id: { name: "className" },
      } as TSESTree.ClassDeclaration,
      context: {} as Context,
    });

    expect(validateFileMock).toHaveBeenCalled();
  });

  test("Should not call validateFile when !name", () => {
    const validateFileMock = jest.fn();

    (validateFile as jest.Mock).mockImplementation(validateFileMock);

    handleClassDeclaration({
      node: {} as TSESTree.ClassDeclaration,
      context: {} as Context,
    });

    expect(validateFileMock).not.toHaveBeenCalled();
  });
});
