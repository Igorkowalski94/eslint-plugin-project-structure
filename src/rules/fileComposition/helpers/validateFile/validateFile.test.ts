import path from "path";

import { TSESTree } from "@typescript-eslint/utils";

import { Context } from "rules/fileComposition/fileComposition.types";
import { isExportedName } from "rules/fileComposition/helpers/validateFile/helpers/isExportedName/isExportedName";
import { isNameFromFileRoot } from "rules/fileComposition/helpers/validateFile/helpers/isNameFromFileRoot";
import { validateRules } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/validateRules";
import { validateFile } from "rules/fileComposition/helpers/validateFile/validateFile";

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
  test("Should return undefined if !fileConfig", () => {
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
        config: {
          filesRules: [
            {
              filePattern: "**/*.ts",
              fileRootRules: [{ selector: "variable" }],
              fileExportRules: [{ selector: "variable" }],
              fileRules: [{ selector: "variable" }],
            },
          ],
        },
        fileConfig: undefined,
      }),
    ).toEqual(undefined);
  });

  test("Should call fileExportRules for fileExportRules", () => {
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
        report: reportMock,
      } as unknown as Context,
      name: "componentName",
      node: {} as TSESTree.VariableDeclarator,
      nodeType: "VariableDeclarator",
      config: {
        filesRules: [
          {
            filePattern: "**/*.ts",
            fileRootRules: [{ selector: "variable" }],
            fileExportRules: [{ selector: "variable" }],
            fileRules: [{ selector: "variable" }],
          },
        ],
      },
      fileConfig: {
        filePattern: "**/*.ts",
        fileRootRules: [{ selector: "variable" }],
        fileExportRules: [{ selector: "variable" }],
        fileRules: [{ selector: "variable" }],
      },
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
        report: reportMock,
      } as unknown as Context,
      name: "componentName",
      node: {} as TSESTree.VariableDeclarator,
      nodeType: "VariableDeclarator",
      config: {
        filesRules: [
          {
            filePattern: "**/*.ts",
            fileRootRules: [{ selector: "variable" }],
            fileExportRules: [{ selector: "variable" }],
            fileRules: [{ selector: "variable" }],
          },
        ],
      },
      fileConfig: {
        filePattern: "**/*.ts",
        fileRootRules: [{ selector: "variable" }],
        fileExportRules: [{ selector: "variable" }],
        fileRules: [{ selector: "variable" }],
      },
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
        report: reportMock,
      } as unknown as Context,
      name: "componentName",
      node: {} as TSESTree.VariableDeclarator,
      nodeType: "VariableDeclarator",
      config: {
        filesRules: [
          {
            filePattern: "**/*.ts",
            fileRootRules: [{ selector: "variable" }],
            fileExportRules: [{ selector: "variable" }],
            fileRules: [{ selector: "variable" }],
          },
        ],
      },
      fileConfig: {
        filePattern: "**/*.ts",
        fileRootRules: [{ selector: "variable" }],
        fileExportRules: [{ selector: "variable" }],
        fileRules: [{ selector: "variable" }],
      },
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
