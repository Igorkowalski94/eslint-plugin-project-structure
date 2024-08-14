import { TSESTree } from "@typescript-eslint/utils";
import { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";

import { readConfigFile } from "helpers/readConfigFile";

import { validateFileRules } from "rules/namingRules/helpers/validateName/helpers/validateFileRules/validateFileRules";
import { validateName } from "rules/namingRules/helpers/validateName/validateName";
import { ESLINT_ERRORS } from "rules/namingRules/namingRules.consts";
import { FileNamingRules } from "rules/namingRules/namingRules.types";

jest.mock("helpers/readConfigFile", () => ({
  readConfigFile: jest.fn(),
}));

jest.mock(
  "rules/namingRules/helpers/validateName/helpers/validateFileRules/validateFileRules",
  () => ({
    validateFileRules: jest.fn(),
  }),
);

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

  test("Should call validateFileRules", () => {
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

    const validateFileRulesMock = jest.fn();

    (validateFileRules as jest.Mock).mockImplementation(validateFileRulesMock);

    validateName({
      context: {
        settings: {},
        cwd: "C:/somePath",
        filename: "C:/somePath/src/features/Feature1/Feature1.ts",
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
    });

    expect(validateFileRulesMock).toHaveBeenCalled();
  });
});
