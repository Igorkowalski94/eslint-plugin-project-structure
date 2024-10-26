import path from "path";

import { PROJECT_STRUCTURE_CACHE_FILE_NAME } from "consts";

import { FinalError } from "errors/FinalError";

import { isErrorInCache } from "helpers/isErrorInCache";
import { readConfigFile } from "helpers/readConfigFile/readConfigFile";

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

jest.mock("helpers/readConfigFile/readConfigFile", () => ({
  readConfigFile: jest.fn(),
}));

jest.mock("helpers/isErrorInCache", () => ({
  isErrorInCache: jest.fn(),
}));

describe("validateImport", () => {
  test("Should call report when error === FinalError ", () => {
    const reportMock = jest.fn();

    (readConfigFile as jest.Mock).mockReturnValue({});

    (validateFolderStructure as jest.Mock).mockImplementation(() => {
      throw new FinalError("error");
    });

    handleProgram({
      context: {
        report: reportMock,
        settings: {},
        options: [],
        cwd: path.resolve("C:/Users/eslint-plugin-project-structure"),
        filename: path.resolve(
          "C:/Users/eslint-plugin-project-structure/file.ts",
        ),
      },
      importPath: "",
      node: {},
    } as unknown as HandleProgramProps);

    expect(reportMock).toHaveBeenCalled();
  });

  test("Should not call report when isErrorInCache", () => {
    const reportMock = jest.fn();

    (readConfigFile as jest.Mock).mockReturnValue({});

    (validateFolderStructure as jest.Mock).mockImplementation(() => {
      throw new FinalError("error");
    });

    (isErrorInCache as jest.Mock).mockReturnValue(true);

    handleProgram({
      context: {
        report: reportMock,
        settings: {},
        options: [],
        cwd: path.resolve("C:/Users/eslint-plugin-project-structure"),
        filename: path.resolve(
          "C:/Users/eslint-plugin-project-structure/file.ts",
        ),
      },
      importPath: "",
      node: {},
    } as unknown as HandleProgramProps);

    expect(reportMock).not.toHaveBeenCalled();
  });

  test("Should not call validateFolderStructure when !filename.includes(structureRoot)", () => {
    const reportMock = jest.fn();
    const validateFolderStructureMock = jest.fn();

    (readConfigFile as jest.Mock).mockReturnValue({});

    (validateFolderStructure as jest.Mock).mockImplementation(
      validateFolderStructureMock,
    );

    handleProgram({
      context: {
        report: reportMock,
        settings: {},
        options: [],
        cwd: path.resolve("C:/Users/eslint-plugin-project-structure/src"),
        filename: path.resolve(
          "C:/Users/eslint-plugin-project-structure/file.ts",
        ),
      },
      importPath: "",
      node: {},
    } as unknown as HandleProgramProps);

    expect(validateFolderStructureMock).not.toHaveBeenCalled();
  });

  test("Should not call validateFolderStructure when filename.includes(PROJECT_STRUCTURE_CACHE_FILE_NAME)", () => {
    const reportMock = jest.fn();
    const validateFolderStructureMock = jest.fn();

    (readConfigFile as jest.Mock).mockReturnValue({});

    (validateFolderStructure as jest.Mock).mockImplementation(
      validateFolderStructureMock,
    );

    handleProgram({
      context: {
        report: reportMock,
        settings: {},
        options: [],
        cwd: path.resolve("C:/Users/eslint-plugin-project-structure"),
        filename: path.resolve(
          `C:/Users/eslint-plugin-project-structure/${PROJECT_STRUCTURE_CACHE_FILE_NAME}`,
        ),
      },
      importPath: "",
      node: {},
    } as unknown as HandleProgramProps);

    expect(validateFolderStructureMock).not.toHaveBeenCalled();
  });

  test("Should throw random error when error !== FinalError ", () => {
    const reportMock = jest.fn();

    (readConfigFile as jest.Mock).mockReturnValue({});

    (validateFolderStructure as jest.Mock).mockImplementation(() => {
      throw new Error("random error");
    });

    expect(() =>
      handleProgram({
        context: {
          report: reportMock,
          settings: {},
          options: [],
          cwd: path.resolve("C:/Users/eslint-plugin-project-structure"),
          filename: path.resolve(
            "C:/Users/eslint-plugin-project-structure/file.ts",
          ),
        },
        importPath: "",
        node: {},
      } as unknown as HandleProgramProps),
    ).toThrow(new Error("random error"));
  });
});
