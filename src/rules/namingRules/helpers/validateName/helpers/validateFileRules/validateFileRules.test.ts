import { TSESTree } from "@typescript-eslint/utils";

import { validateFileRules } from "rules/namingRules/helpers/validateName/helpers/validateFileRules/validateFileRules";

describe("validateFileRules", () => {
  test("Should return undefined if !isCorrectNameType", () => {
    expect(
      validateFileRules({
        fileRules: {
          filePattern: "**/*.tsx",
          rules: [{ nameType: "arrowFunction" }],
        },
        filenamePath: "C:/somePath/src/features/Feature1/Feature1.tsx",
        report: () => undefined,
        name: "functionName",
        node: {} as TSESTree.VariableDeclarator,
        nameType: "VariableDeclarator",
      }),
    ).toEqual(undefined);
  });

  test("Should return undefined if isValidExport", () => {
    expect(
      validateFileRules({
        fileRules: {
          filePattern: "**/*.tsx",
          rules: [{ nameType: "variable" }],
        },
        filenamePath: "C:/somePath/src/features/Feature1/Feature1.tsx",
        report: () => undefined,
        name: "functionName",
        node: {
          parent: {
            type: TSESTree.AST_NODE_TYPES.Program,
            body: [],
          },
          type: TSESTree.AST_NODE_TYPES.VariableDeclarator,
        } as unknown as TSESTree.VariableDeclarator,
        nameType: "VariableDeclarator",
      }),
    ).toEqual(undefined);
  });

  test("Should call report if !isValidExport", () => {
    const reportMock = jest.fn();

    validateFileRules({
      fileRules: {
        filePattern: "**/*.tsx",
        rules: [{ nameType: "variable" }],
      },
      filenamePath: "C:/somePath/src/features/Feature1/Feature1.tsx",
      report: reportMock,
      name: "SOME_NAME",
      node: {
        parent: {
          type: TSESTree.AST_NODE_TYPES.Program,
          body: [],
        },
        type: TSESTree.AST_NODE_TYPES.VariableDeclarator,
      } as unknown as TSESTree.VariableDeclarator,
      nameType: "VariableDeclarator",
    });

    expect(reportMock).toHaveBeenCalledWith({
      node: {
        parent: {
          type: TSESTree.AST_NODE_TYPES.Program,
          body: [],
        },
        type: TSESTree.AST_NODE_TYPES.VariableDeclarator,
      },
      messageId: "invalidName",
      data: {
        nameType: "variable",
        allowNamesWithoutReferences: "{camelCase}, {PascalCase}",
      },
    });
  });
});
