import { FinalError } from "errors/FinalError";

import { readConfigFile } from "helpers/readConfigFile";

import {
  handleProgram,
  HandleProgramProps,
} from "rules/folderStructure/helpers/handleProgram";
import { validateFolderStructure } from "rules/folderStructure/helpers/validateFolderStructure/validateFolderStructure";

jest.mock(
  "rules/folderStructure/helpers/validateFolderStructure/validateFolderStructure",
  () => ({
    validateFolderStructure: jest.fn(),
  }),
);

jest.mock("helpers/readConfigFile", () => ({
  readConfigFile: jest.fn(),
}));

describe("validateImport", () => {
  test("Should call report when error === FinalError ", () => {
    const reportMock = jest.fn();

    (readConfigFile as jest.Mock).mockReturnValue({});

    (validateFolderStructure as jest.Mock).mockImplementation(() => {
      throw new FinalError("error");
    });

    handleProgram({
      context: { report: reportMock, settings: {}, options: [] },
      importPath: "",
      node: {},
    } as unknown as HandleProgramProps);

    expect(reportMock).toHaveBeenCalled();
  });

  test("Should throw random error when error !== FinalError ", () => {
    const reportMock = jest.fn();

    (readConfigFile as jest.Mock).mockReturnValue({});

    (validateFolderStructure as jest.Mock).mockImplementation(() => {
      throw new Error("random error");
    });

    expect(() =>
      handleProgram({
        context: { report: reportMock, settings: {}, options: [] },
        importPath: "",
        node: {},
      } as unknown as HandleProgramProps),
    ).toThrow(new Error("random error"));
  });
});
