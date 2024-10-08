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
          filesRules: [{ filePattern: "**/*.ts" }],
        },
        fileConfig: undefined,
      }),
    ).toEqual(undefined);
  });

  test("Should return undefined if !rules", () => {
    const reportMock = jest.fn();

    (isExportedName as jest.Mock).mockReturnValue({
      isExportName: true,
      currentName: "componentNameExport",
      currentNode: {},
    });

    expect(
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
          filesRules: [{ filePattern: "**/*.ts" }],
        },
        fileConfig: { filePattern: "**/*.ts" },
      }),
    ).toEqual(undefined);
  });

  test("Should call fileExportRules", () => {
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
            rules: [
              { selector: "variable", scope: "fileExport" },
              { selector: "class", scope: "file" },
              { selector: "arrowFunction" },
              { selector: "enum", scope: "fileRoot" },
              { selector: "interface", scope: "nestedSelectors" },
              { selector: "type", scope: ["file", "nestedSelectors"] },
            ],
          },
        ],
      },
      fileConfig: {
        filePattern: "**/*.ts",
        rules: [
          { selector: "variable", scope: "fileExport" },
          { selector: "class", scope: "file" },
          { selector: "arrowFunction" },
          { selector: "enum", scope: "fileRoot" },
          { selector: "interface", scope: "nestedSelectors" },
          { selector: "type", scope: ["file", "nestedSelectors"] },
        ],
      },
    });

    expect(validateRulesMock).toHaveBeenCalledWith({
      rules: [
        { selector: "variable", scope: "fileExport" },
        { selector: "class", scope: "file" },
        { selector: "arrowFunction" },
        { selector: "type", scope: ["file", "nestedSelectors"] },
      ],
      name: "componentNameExport",
      selectorType: "variable",
      node: {},
      nodeNotExported: {},
      filenamePath: path.relative(
        "C:/somePath",
        "C:/somePath/src/features/Feature1/Feature1.ts",
      ),
      errorMessageId: "prohibitedSelectorExport",
      scope: "fileExport",
      context: {
        report: reportMock,
        settings: {},
        cwd: "C:/somePath",
        filename: "C:/somePath/src/features/Feature1/Feature1.ts",
      },
      expressionName: undefined,
      allowOnlySpecifiedSelectors: undefined,
      regexParameters: undefined,
      allRules: [
        { selector: "variable", scope: "fileExport" },
        { selector: "class", scope: "file" },
        { selector: "arrowFunction" },
        { selector: "enum", scope: "fileRoot" },
        { selector: "interface", scope: "nestedSelectors" },
        { selector: "type", scope: ["file", "nestedSelectors"] },
      ],
    });
  });

  test("Should call fileRootRules", () => {
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
            rules: [
              { selector: "variable", scope: "fileExport" },
              { selector: "class", scope: "file" },
              { selector: "arrowFunction" },
              { selector: "enum", scope: "fileRoot" },
              { selector: "interface", scope: "nestedSelectors" },
              { selector: "type", scope: ["file", "nestedSelectors"] },
            ],
          },
        ],
      },
      fileConfig: {
        filePattern: "**/*.ts",
        rules: [
          { selector: "variable", scope: "fileExport" },
          { selector: "class", scope: "file" },
          { selector: "arrowFunction" },
          { selector: "enum", scope: "fileRoot" },
          { selector: "interface", scope: "nestedSelectors" },
          { selector: "type", scope: ["file", "nestedSelectors"] },
        ],
      },
    });

    expect(validateRulesMock).toHaveBeenCalledWith({
      rules: [
        { selector: "class", scope: "file" },
        { selector: "arrowFunction" },
        { selector: "enum", scope: "fileRoot" },
        { selector: "type", scope: ["file", "nestedSelectors"] },
      ],
      name: "componentName",
      selectorType: "variable",
      node: {},
      filenamePath: path.relative(
        "C:/somePath",
        "C:/somePath/src/features/Feature1/Feature1.ts",
      ),
      errorMessageId: "prohibitedSelectorRoot",
      scope: "fileRoot",
      context: {
        report: reportMock,
        settings: {},
        cwd: "C:/somePath",
        filename: "C:/somePath/src/features/Feature1/Feature1.ts",
      },
      expressionName: undefined,
      allowOnlySpecifiedSelectors: undefined,
      regexParameters: undefined,
      allRules: [
        { selector: "variable", scope: "fileExport" },
        { selector: "class", scope: "file" },
        { selector: "arrowFunction" },
        { selector: "enum", scope: "fileRoot" },
        { selector: "interface", scope: "nestedSelectors" },
        { selector: "type", scope: ["file", "nestedSelectors"] },
      ],
    });
  });

  test("Should call nestedSelectors", () => {
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
            rules: [
              { selector: "variable", scope: "fileExport" },
              { selector: "class", scope: "file" },
              { selector: "arrowFunction" },
              { selector: "enum", scope: "fileRoot" },
              { selector: "interface", scope: "nestedSelectors" },
              { selector: "type", scope: ["file", "nestedSelectors"] },
            ],
          },
        ],
      },
      fileConfig: {
        filePattern: "**/*.ts",
        rules: [
          { selector: "variable", scope: "fileExport" },
          { selector: "class", scope: "file" },
          { selector: "arrowFunction" },
          { selector: "enum", scope: "fileRoot" },
          { selector: "interface", scope: "nestedSelectors" },
          { selector: "type", scope: ["file", "nestedSelectors"] },
        ],
      },
    });

    expect(validateRulesMock).toHaveBeenCalledWith({
      rules: [
        { selector: "class", scope: "file" },
        { selector: "arrowFunction" },
        { selector: "interface", scope: "nestedSelectors" },
        { selector: "type", scope: ["file", "nestedSelectors"] },
      ],
      name: "componentName",
      selectorType: "variable",
      node: {},
      filenamePath: path.relative(
        "C:/somePath",
        "C:/somePath/src/features/Feature1/Feature1.ts",
      ),
      errorMessageId: "prohibitedSelectorNested",
      scope: "nestedSelectors",
      context: {
        report: reportMock,
        settings: {},
        cwd: "C:/somePath",
        filename: "C:/somePath/src/features/Feature1/Feature1.ts",
      },
      expressionName: undefined,
      allowOnlySpecifiedSelectors: undefined,
      regexParameters: undefined,
      allRules: [
        { selector: "variable", scope: "fileExport" },
        { selector: "class", scope: "file" },
        { selector: "arrowFunction" },
        { selector: "enum", scope: "fileRoot" },
        { selector: "interface", scope: "nestedSelectors" },
        { selector: "type", scope: ["file", "nestedSelectors"] },
      ],
    });
  });
});
