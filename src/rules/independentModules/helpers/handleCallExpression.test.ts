import { TSESTree } from "@typescript-eslint/utils";

import { handleCallExpression } from "rules/independentModules/helpers/handleCallExpression";
import { validateImport } from "rules/independentModules/helpers/validateImport";
import { Context } from "rules/independentModules/independentModules.types";

jest.mock("rules/independentModules/helpers/validateImport", () => ({
  validateImport: jest.fn(),
}));

describe("handleCallExpression", () => {
  test.each<TSESTree.CallExpression>([
    {
      type: TSESTree.AST_NODE_TYPES.CallExpression,
      callee: {
        name: "wrong",
      },
    } as TSESTree.CallExpression,
  ])("Should not call validateImport when node = %s", (node) => {
    const validateImportMock = jest.fn();

    (validateImport as jest.Mock).mockImplementation(validateImportMock);

    handleCallExpression(node, {
      settings: {},
      report: jest.fn(),
    } as unknown as Context);

    expect(validateImportMock).not.toHaveBeenCalled();
  });

  test.each<TSESTree.CallExpression>([
    {
      callee: {
        type: TSESTree.AST_NODE_TYPES.Identifier,
        name: "require",
      },
      arguments: [{ type: TSESTree.AST_NODE_TYPES.Literal, value: "import" }],
    } as TSESTree.CallExpression,
  ])("Should call validateImport when node = %s", (node) => {
    const validateImportMock = jest.fn();

    (validateImport as jest.Mock).mockImplementation(validateImportMock);

    handleCallExpression(node, {
      settings: {},
      report: jest.fn(),
    } as unknown as Context);

    expect(validateImportMock).toHaveBeenCalled();
  });
});
