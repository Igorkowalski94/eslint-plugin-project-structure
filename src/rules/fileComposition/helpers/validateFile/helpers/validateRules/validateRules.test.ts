import { TSESTree } from "@typescript-eslint/utils";

import { Context } from "rules/fileComposition/fileComposition.types";
import { handlePositionIndex } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/handlePositionIndex/handlePositionIndex";
import { validateRules } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/validateRules";

jest.mock(
  "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/handlePositionIndex/handlePositionIndex",
  () => ({
    handlePositionIndex: jest.fn(),
  }),
);

describe("validateRules", () => {
  test("Should return undefined if !isSelectorAllowed", () => {
    expect(
      validateRules({
        rules: [{ selector: "arrowFunction" }],
        filenamePath: "C:/somePath/src/features/Feature1/Feature1.tsx",
        context: { report: jest.fn() } as unknown as Context,
        name: "functionName",
        node: {} as TSESTree.VariableDeclarator,
        nodeType: "VariableDeclarator",
        errorMessageId: "prohibitedSelector",
        scope: "file",
        allRules: [],
      }),
    ).toEqual(undefined);
  });

  test("Should return undefined if !isSelectorAllowed && !expressionName", () => {
    expect(
      validateRules({
        allowOnlySpecifiedSelectors: true,
        rules: [
          { selector: { type: "variableExpression", limitTo: "styled" } },
        ],
        filenamePath: "C:/somePath/src/features/Feature1/Feature1.tsx",
        context: { report: jest.fn() } as unknown as Context,
        name: "functionName",
        node: {} as TSESTree.VariableDeclarator,
        nodeType: "Expression",
        errorMessageId: "prohibitedSelector",
        expressionName: "expressionName",
        scope: "file",
        allRules: [],
      }),
    ).toEqual(undefined);
  });

  test("Should return undefined if !isCorrectSelector", () => {
    expect(
      validateRules({
        rules: [{ selector: "arrowFunction" }],
        filenamePath: "C:/somePath/src/features/Feature1/Feature1.tsx",
        context: { report: jest.fn() } as unknown as Context,
        name: "functionName",
        node: {} as TSESTree.VariableDeclarator,
        nodeType: "VariableDeclarator",
        errorMessageId: "prohibitedSelector",
        scope: "file",
        allowOnlySpecifiedSelectors: true,
        allRules: [],
      }),
    ).toEqual(undefined);
  });

  test("Should return undefined if isValid && positionIndex === undefined", () => {
    expect(
      validateRules({
        rules: [{ selector: "variable" }],
        filenamePath: "C:/somePath/src/features/Feature1/Feature1.tsx",
        context: { report: jest.fn() } as unknown as Context,
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
        scope: "file",
        allRules: [],
      }),
    ).toEqual(undefined);
  });

  test("Should call handlePositionIndex if isValid && positionIndex !== undefined", () => {
    const handlePositionIndexMock = jest.fn();

    (handlePositionIndex as jest.Mock).mockImplementation(
      handlePositionIndexMock,
    );

    validateRules({
      rules: [{ selector: "variable", positionIndex: 0 }],
      filenamePath: "C:/somePath/src/features/Feature1/Feature1.tsx",
      context: { report: jest.fn() } as unknown as Context,
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
      scope: "file",
      allRules: [],
    });

    expect(handlePositionIndex).toHaveBeenCalled();
  });

  test("Should call report if !isValid", () => {
    const reportMock = jest.fn();

    validateRules({
      rules: [{ selector: "variable" }],
      filenamePath: "C:/somePath/src/features/Feature1/Feature1.tsx",
      context: { report: reportMock } as unknown as Context,
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
      scope: "file",
      allRules: [],
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
        selectorType: "variable",
        formatWithoutReferences: "{camelCase}",
      },
    });
  });
});
