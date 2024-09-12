import path from "path";

import { TSESTree } from "@typescript-eslint/utils";

import { readConfigFile } from "helpers/readConfigFile/readConfigFile";

import { isExportedName } from "rules/namingRules/helpers/validateName/helpers/isExportedName/isExportedName";
import { isNameFromFileRoot } from "rules/namingRules/helpers/validateName/helpers/isNameFromFileRoot";
import { validateRules } from "rules/namingRules/helpers/validateName/helpers/validateRules/validateRules";
import { validateName } from "rules/namingRules/helpers/validateName/validateName";
import {
  Context,
  NamingRulesConfig,
} from "rules/namingRules/namingRules.types";

jest.mock("helpers/readConfigFile/readConfigFile", () => ({
  readConfigFile: jest.fn(),
}));

jest.mock(
  "rules/namingRules/helpers/validateName/helpers/validateRules/validateRules",
  () => ({
    validateRules: jest.fn(),
  }),
);

jest.mock(
  "rules/namingRules/helpers/validateName/helpers/isExportedName/isExportedName",
  () => ({
    isExportedName: jest.fn(),
  }),
);

jest.mock(
  "rules/namingRules/helpers/validateName/helpers/isNameFromFileRoot",
  () => ({
    isNameFromFileRoot: jest.fn(),
  }),
);

describe("validateName", () => {
  const config: NamingRulesConfig = {
    filesRules: [
      {
        filePattern: "**/*.ts",
        fileRootRules: [{ selector: "variable" }],
        fileExportsRules: [{ selector: "variable" }],
        fileRules: [{ selector: "variable" }],
      },
    ],
  };

  test("Should return undefined if !fileRule from config", () => {
    (readConfigFile as jest.Mock).mockReturnValue(config);

    expect(
      validateName({
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
      validateName({
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

  test("Should call fileExportsRules for fileExportsRules", () => {
    (readConfigFile as jest.Mock).mockReturnValue(config);

    const validateRulesMock = jest.fn();
    const reportMock = jest.fn();

    (validateRules as jest.Mock).mockImplementation(validateRulesMock);
    (isExportedName as jest.Mock).mockReturnValue({
      isExportName: true,
      currentName: "componentNameExport",
      currentNode: {},
    });

    validateName({
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
      namingRule: [{ selector: "variable" }],
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

  test("Should call fileExportsRules for fileRootRules", () => {
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

    validateName({
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
      namingRule: [{ selector: "variable" }],
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

  test("Should call fileExportsRules for fileRules", () => {
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

    validateName({
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
      namingRule: [{ selector: "variable" }],
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
