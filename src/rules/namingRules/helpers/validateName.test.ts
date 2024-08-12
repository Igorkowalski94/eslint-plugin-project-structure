import { TSESTree } from "@typescript-eslint/utils";
import { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";

import { readConfigFile } from "helpers/readConfigFile";

import { getCurrentAllowNames } from "rules/namingRules/helpers/getCurrentAllowNames";
import { isCorrectNameType } from "rules/namingRules/helpers/isCorrectNameType";
import { validateName } from "rules/namingRules/helpers/validateName";
import { ESLINT_ERRORS } from "rules/namingRules/namingRules.consts";
import { FileNamingRules } from "rules/namingRules/namingRules.types";

jest.mock("rules/namingRules/helpers/isCorrectNameType", () => ({
  isCorrectNameType: jest.fn(),
}));

jest.mock("helpers/readConfigFile", () => ({
  readConfigFile: jest.fn(),
}));

jest.mock("rules/namingRules/helpers/getCurrentAllowNames", () => ({
  getCurrentAllowNames: jest.fn(),
}));

jest.mock("path", (): typeof import("path") => ({
  ...jest.requireActual("path"),
  sep: "/",
}));

describe("validateName", () => {
  test("Should return undefined if !fileRule from config", () => {
    (readConfigFile as jest.Mock).mockReturnValue([
      {
        filePattern: "**/*.ts",
        rules: [
          {
            nameType: "variable",
          },
        ],
      },
    ]);

    expect(
      validateName({
        context: {
          settings: {},
          cwd: "C:/somePath",
          filename: "C:/somePath/src/features/Feature1/Feature1.tsx",
          options: [],
          report: () => undefined,
        } as unknown as RuleContext<
          keyof typeof ESLINT_ERRORS,
          FileNamingRules[]
        >,
        name: "componentName",
        node: {} as TSESTree.VariableDeclarator,
        nameType: "VariableDeclarator",
      }),
    ).toEqual(undefined);
  });

  test("Should return undefined if !fileRule from options", () => {
    (readConfigFile as jest.Mock).mockReturnValue([
      {
        filePattern: "**/*.ts",
        rules: [
          {
            nameType: "variable",
          },
        ],
      },
    ]);

    expect(
      validateName({
        context: {
          settings: {},
          cwd: "C:/somePath",
          filename: "C:/somePath/src/features/Feature1/Feature1.tsx",
          options: [
            {
              rules: [
                {
                  nameType: "variable",
                },
              ],
              filePattern: "**/*.ts",
            },
          ],
          report: () => undefined,
        } as unknown as RuleContext<
          keyof typeof ESLINT_ERRORS,
          FileNamingRules[]
        >,
        name: "componentName",
        node: {} as TSESTree.VariableDeclarator,
        nameType: "VariableDeclarator",
      }),
    ).toEqual(undefined);
  });

  test("Should return undefined if !isCorrectNameType", () => {
    const isCorrectNameTypeMock = jest.fn().mockReturnValue(false);

    (isCorrectNameType as jest.Mock).mockImplementation(isCorrectNameTypeMock);

    (readConfigFile as jest.Mock).mockReturnValue([
      {
        filePattern: "**/*.tsx",
        rules: [
          {
            nameType: "variable",
            allowNames: ["{camelCase}"],
          },
        ],
      },
    ]);

    expect(
      validateName({
        context: {
          settings: {},
          cwd: "C:/somePath",
          filename: "C:/somePath/src/features/Feature1/Feature1.tsx",
          options: [],
          report: () => undefined,
        } as unknown as RuleContext<
          keyof typeof ESLINT_ERRORS,
          FileNamingRules[]
        >,
        name: "componentName",
        node: {} as TSESTree.VariableDeclarator,
        nameType: "VariableDeclarator",
      }),
    ).toEqual(undefined);

    expect(isCorrectNameTypeMock).toHaveBeenCalled();
  });

  test("Should return undefined if !currentAllowNames", () => {
    const isCorrectNameTypeMock = jest.fn().mockReturnValue(true);
    const getCurrentAllowNamesMock = jest.fn().mockReturnValue(undefined);

    (isCorrectNameType as jest.Mock).mockImplementation(isCorrectNameTypeMock);

    (getCurrentAllowNames as jest.Mock).mockImplementation(
      getCurrentAllowNamesMock,
    );
    (readConfigFile as jest.Mock).mockReturnValue([
      {
        filePattern: "**/*.tsx",
        rules: [
          {
            nameType: "variable",
            allowNames: ["{camelCase}"],
          },
        ],
      },
    ]);

    expect(
      validateName({
        context: {
          settings: {},
          cwd: "C:/somePath",
          filename: "C:/somePath/src/features/Feature1/Feature1.tsx",
          options: [],
          report: () => undefined,
        } as unknown as RuleContext<
          keyof typeof ESLINT_ERRORS,
          FileNamingRules[]
        >,
        name: "componentName",
        node: {} as TSESTree.VariableDeclarator,
        nameType: "VariableDeclarator",
      }),
    ).toEqual(undefined);

    expect(isCorrectNameTypeMock).toHaveBeenCalled();
    expect(getCurrentAllowNamesMock).toHaveBeenCalled();
  });

  test("Should call report if !isValidExport", () => {
    const isCorrectNameTypeMock = jest.fn().mockReturnValue(true);
    const getCurrentAllowNamesMock = jest.fn().mockReturnValue(["{camelCase}"]);
    const reportMock = jest.fn();

    (isCorrectNameType as jest.Mock).mockImplementation(isCorrectNameTypeMock);

    (getCurrentAllowNames as jest.Mock).mockImplementation(
      getCurrentAllowNamesMock,
    );

    (readConfigFile as jest.Mock).mockReturnValue([
      {
        filePattern: "**/*.tsx",
        rules: [
          {
            nameType: "variable",
            allowNames: ["{camelCase}"],
          },
        ],
      },
    ]);

    validateName({
      context: {
        settings: {},
        cwd: "C:/somePath",
        filename: "C:/somePath/src/features/Feature1/Feature1.tsx",
        options: [],
        report: reportMock,
      } as unknown as RuleContext<
        keyof typeof ESLINT_ERRORS,
        FileNamingRules[]
      >,
      name: "VariableName",
      node: {} as TSESTree.VariableDeclarator,
      nameType: "VariableDeclarator",
    });

    expect(isCorrectNameTypeMock).toHaveBeenCalled();
    expect(getCurrentAllowNamesMock).toHaveBeenCalled();
    expect(reportMock).toHaveBeenCalledWith({
      node: {},
      messageId: "invalidName",
      data: {
        nameType: "variable",
        allowNamesWithoutReferences: "{camelCase}",
      },
    });
  });

  test("Should not call report if isValidExport", () => {
    const isCorrectNameTypeMock = jest.fn().mockReturnValue(true);
    const getCurrentAllowNamesMock = jest.fn().mockReturnValue(["{camelCase}"]);
    const reportMock = jest.fn();

    (isCorrectNameType as jest.Mock).mockImplementation(isCorrectNameTypeMock);

    (getCurrentAllowNames as jest.Mock).mockImplementation(
      getCurrentAllowNamesMock,
    );

    (readConfigFile as jest.Mock).mockReturnValue([
      {
        filePattern: "**/*.tsx",
        rules: [
          {
            nameType: "variable",
            allowNames: ["{camelCase}"],
          },
        ],
      },
    ]);

    validateName({
      context: {
        settings: {},
        cwd: "C:/somePath",
        filename: "C:/somePath/src/features/Feature1/Feature1.tsx",
        options: [],
        report: reportMock,
      } as unknown as RuleContext<
        keyof typeof ESLINT_ERRORS,
        FileNamingRules[]
      >,
      name: "variableName",
      node: {} as TSESTree.VariableDeclarator,
      nameType: "VariableDeclarator",
    });

    expect(isCorrectNameTypeMock).toHaveBeenCalled();
    expect(getCurrentAllowNamesMock).toHaveBeenCalled();
    expect(reportMock).not.toHaveBeenCalled();
  });
});
