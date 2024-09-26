import { TSESTree } from "@typescript-eslint/utils";

import { handleExportNamedDeclaration } from "rules/independentModules/helpers/handleExportNamedDeclaration";
import { validateImport } from "rules/independentModules/helpers/validateImport/validateImport";
import { Context } from "rules/independentModules/independentModules.types";

jest.mock(
  "rules/independentModules/helpers/validateImport/validateImport",
  () => ({
    validateImport: jest.fn(),
  }),
);

describe("handleExportNamedDeclaration", () => {
  test("Should call validateImport when import value exist", () => {
    const validateImportMock = jest.fn();

    (validateImport as jest.Mock).mockImplementation(validateImportMock);

    handleExportNamedDeclaration({
      node: { source: { value: "import" } } as TSESTree.ExportNamedDeclaration,
      context: { settings: {}, report: jest.fn() } as unknown as Context,
      config: { modules: [] },
    });

    expect(validateImportMock).toHaveBeenCalled();
  });

  test("Should not call validateImport when import value do not exist", () => {
    const validateImportMock = jest.fn();

    (validateImport as jest.Mock).mockImplementation(validateImportMock);

    handleExportNamedDeclaration({
      node: {} as TSESTree.ExportNamedDeclaration,
      context: { settings: {}, report: jest.fn() } as unknown as Context,
      config: { modules: [] },
    });

    expect(validateImportMock).not.toHaveBeenCalled();
  });
});
