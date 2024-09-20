import path from "path";

import { TSESTree } from "@typescript-eslint/utils";

import { readConfigFile } from "helpers/readConfigFile/readConfigFile";

import {
  Context,
  FileCompositionConfig,
} from "rules/fileComposition/fileComposition.types";
import { isExportedName } from "rules/fileComposition/helpers/validateFile/helpers/isExportedName/isExportedName";
import { isNameFromFileRoot } from "rules/fileComposition/helpers/validateFile/helpers/isNameFromFileRoot";
import { validateRules } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/validateRules";
import { validateFile } from "rules/fileComposition/helpers/validateFile/validateFile";

jest.mock("helpers/readConfigFile/readConfigFile", () => ({
  readConfigFile: jest.fn(),
}));

jest.mock(
  "rules/fileComposition/helpers/validateFile/helpers/validateRules/validateRules",
  () => ({
    validateRules: jest.fn(),
  }),
);

jest.mock(
  "rules/fileComposition/helpers/validateFile/helpers/isExportedName/isExportedName",
  () => ({
    isExportedName: jest.fn(),
  }),
);

jest.mock(
  "rules/fileComposition/helpers/validateFile/helpers/isNameFromFileRoot",
  () => ({
    isNameFromFileRoot: jest.fn(),
  }),
);

describe("validateFile", () => {
  const config: FileCompositionConfig = {
    filesRules: [
      {
        filePattern: "**/*.ts",
        fileRootRules: [{ selector: "variable" }],
        fileExportRules: [{ selector: "variable" }],
        fileRules: [{ selector: "variable" }],
      },
    ],
  };

  test("Should return undefined if !fileRule from config", () => {
    (readConfigFile as jest.Mock).mockReturnValue(config);

    expect(
      validateFile({
        context: {
          settings: {},
          cwd: "C:/somePath",
          filename: "C:/somePath/src/features/Feature1/Feature1.tsx",
          options: [],
          report: () => undefined,
        } as unknown as Context,
        name: "componentName",
        node: {} as TSESTree.VariableDeclarator,
        nodeType: "VariableDeclarator",
      }),
    ).toEqual(undefined);
  });

  test("Should return undefined if !fileRule from options", () => {
    (readConfigFile as jest.Mock).mockReturnValue(config);

    expect(
      validateFile({
        context: {
          settings: {},
          cwd: "C:/somePath",
          filename: "C:/somePath/src/features/Feature1/Feature1.tsx",
          options: config,
          report: () => undefined,
        } as unknown as Context,
        name: "componentName",
        node: {} as TSESTree.VariableDeclarator,
        nodeType: "VariableDeclarator",
      }),
    ).toEqual(undefined);
  });

  test("Should call fileExportRules for fileExportRules", () => {
    (readConfigFile as jest.Mock).mockReturnValue(config);

    const validateRulesMock = jest.fn();
    const reportMock = jest.fn();

    (validateRules as jest.Mock).mockImplementation(validateRulesMock);
    (isExportedName as jest.Mock).mockReturnValue({
      isExportName: true,
      currentName: "componentNameExport",
      currentNode: {},
    });

    validateFile({
      context: {
        settings: {},
        cwd: "C:/somePath",
        filename: "C:/somePath/src/features/Feature1/Feature1.ts",
        options: config,
        report: reportMock,
      } as unknown as Context,
      name: "componentName",
      node: {} as TSESTree.VariableDeclarator,
      nodeType: "VariableDeclarator",
    });

    expect(validateRulesMock).toHaveBeenCalledWith({
      fileRule: [{ selector: "variable" }],
      name: "componentNameExport",
      nodeType: "VariableDeclarator",
      node: {},
      report: reportMock,
      filenamePath: path.relative(
        "C:/somePath",
        "C:/somePath/src/features/Feature1/Feature1.ts",
      ),
      errorMessageId: "prohibitedSelectorExport",
    });
  });

  test("Should call fileExportRules for fileRootRules", () => {
    (readConfigFile as jest.Mock).mockReturnValue(config);

    const validateRulesMock = jest.fn();
    const reportMock = jest.fn();

    (validateRules as jest.Mock).mockImplementation(validateRulesMock);
    (isExportedName as jest.Mock).mockReturnValue({
      isExportName: false,
      currentName: "",
      currentNode: {},
    });
    (isNameFromFileRoot as jest.Mock).mockReturnValue(true);

    validateFile({
      context: {
        settings: {},
        cwd: "C:/somePath",
        filename: "C:/somePath/src/features/Feature1/Feature1.ts",
        options: config,
        report: reportMock,
      } as unknown as Context,
      name: "componentName",
      node: {} as TSESTree.VariableDeclarator,
      nodeType: "VariableDeclarator",
    });

    expect(validateRulesMock).toHaveBeenCalledWith({
      fileRule: [{ selector: "variable" }],
      name: "componentName",
      nodeType: "VariableDeclarator",
      node: {},
      report: reportMock,
      filenamePath: path.relative(
        "C:/somePath",
        "C:/somePath/src/features/Feature1/Feature1.ts",
      ),
      errorMessageId: "prohibitedSelectorRoot",
    });
  });

  test("Should call fileExportRules for fileRules", () => {
    (readConfigFile as jest.Mock).mockReturnValue(config);

    const validateRulesMock = jest.fn();
    const reportMock = jest.fn();

    (validateRules as jest.Mock).mockImplementation(validateRulesMock);
    (isExportedName as jest.Mock).mockReturnValue({
      isExportName: false,
      currentName: "",
      currentNode: {},
    });
    (isNameFromFileRoot as jest.Mock).mockReturnValue(false);

    validateFile({
      context: {
        settings: {},
        cwd: "C:/somePath",
        filename: "C:/somePath/src/features/Feature1/Feature1.ts",
        options: config,
        report: reportMock,
      } as unknown as Context,
      name: "componentName",
      node: {} as TSESTree.VariableDeclarator,
      nodeType: "VariableDeclarator",
    });

    expect(validateRulesMock).toHaveBeenCalledWith({
      fileRule: [{ selector: "variable" }],
      name: "componentName",
      nodeType: "VariableDeclarator",
      node: {},
      report: reportMock,
      filenamePath: path.relative(
        "C:/somePath",
        "C:/somePath/src/features/Feature1/Feature1.ts",
      ),
      errorMessageId: "prohibitedSelector",
    });
  });
});
