import { TSESTree } from "@typescript-eslint/utils";

import { validateRules } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/validateRules";

describe("validateRules", () => {
  test("Should return undefined if !isSelectorAllowed", () => {
    expect(
      validateRules({
        fileRule: {
          allowOnlySpecifiedSelectors: true,
          rules: [{ selector: "arrowFunction" }],
        },
        filenamePath: "C:/somePath/src/features/Feature1/Feature1.tsx",
        report: () => undefined,
        name: "functionName",
        node: {} as TSESTree.VariableDeclarator,
        nodeType: "VariableDeclarator",
        errorMessageId: "prohibitedSelector",
      }),
    ).toEqual(undefined);
  });

  test("Should return undefined if !isCorrectSelector", () => {
    expect(
      validateRules({
        fileRule: [{ selector: "arrowFunction" }],
        filenamePath: "C:/somePath/src/features/Feature1/Feature1.tsx",
        report: () => undefined,
        name: "functionName",
        node: {} as TSESTree.VariableDeclarator,
        nodeType: "VariableDeclarator",
        errorMessageId: "prohibitedSelector",
      }),
    ).toEqual(undefined);
  });

  test("Should return undefined if isValidExport", () => {
    expect(
      validateRules({
        fileRule: [{ selector: "variable" }],
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
        nodeType: "VariableDeclarator",
        errorMessageId: "prohibitedSelector",
      }),
    ).toEqual(undefined);
  });

  test("Should call report if !isValidExport", () => {
    const reportMock = jest.fn();

    validateRules({
      fileRule: [{ selector: "variable" }],
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
      nodeType: "VariableDeclarator",
      errorMessageId: "prohibitedSelector",
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
        selector: "variable",
        formatWithoutReferences: "{camelCase}",
      },
    });
  });
});
