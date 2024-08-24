import { TSESTree } from "@typescript-eslint/utils";

import { validateRules } from "rules/namingRules/helpers/validateName/helpers/validateRules/validateRules";

describe("validateRules", () => {
  test("Should return undefined if !isSelectorAllowed", () => {
    expect(
      validateRules({
        namingRule: {
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
        namingRule: [{ selector: "arrowFunction" }],
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
        namingRule: [{ selector: "variable" }],
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
      namingRule: [{ selector: "variable" }],
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
