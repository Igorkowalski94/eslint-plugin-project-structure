import { getExternalImportError } from "rules/independentModules/errors/getExternalImportError";
import { getImportError } from "rules/independentModules/errors/getImportError";
import { checkImportPath } from "rules/independentModules/helpers/checkImportPath";
import { extractReferencesFromPatterns } from "rules/independentModules/helpers/extractReferencesFromPatterns";
import { findModuleConfig } from "rules/independentModules/helpers/findModuleConfig";
import { isExternalImport } from "rules/independentModules/helpers/isExternalImport";
import { validateImportPath } from "rules/independentModules/helpers/validateImportPath";

jest.mock("rules/independentModules/helpers/findModuleConfig", () => ({
  findModuleConfig: jest.fn(),
}));

jest.mock(
  "rules/independentModules/helpers/extractReferencesFromPatterns",
  () => ({
    extractReferencesFromPatterns: jest.fn(),
  }),
);

jest.mock("rules/independentModules/helpers/isExternalImport", () => ({
  isExternalImport: jest.fn(),
}));

jest.mock("rules/independentModules/helpers/validateImportPath", () => ({
  validateImportPath: jest.fn(),
}));

describe("checkImportPath", () => {
  test("Should not call extractReusableImportPatterns when moduleConfig === undefined", () => {
    const extractReusableImportPatternsMock = jest.fn();

    (findModuleConfig as jest.Mock).mockReturnValue(undefined);
    (extractReferencesFromPatterns as jest.Mock).mockImplementation(
      extractReusableImportPatternsMock,
    );

    checkImportPath({
      config: { modules: [] },
      cwd: "",
      filename: "",
      importPath: "",
    });

    expect(extractReusableImportPatternsMock).not.toHaveBeenCalled();
  });

  test("Should not throw when isExternalImport and allowImportsFromExtracted includes importPath", () => {
    (findModuleConfig as jest.Mock).mockReturnValue({
      name: "module",
      errorMessage: "error",
    });
    (extractReferencesFromPatterns as jest.Mock).mockReturnValue(["react"]);
    (isExternalImport as jest.Mock).mockReturnValue(true);

    expect(() =>
      checkImportPath({
        config: { modules: [] },
        cwd: "",
        filename: "",
        importPath: "react",
      }),
    ).not.toThrow(
      getExternalImportError({
        allowImportsFromExtracted: [],
        filename: "",
        importPath: "",
        moduleName: "",
      }),
    );
  });

  test("Should not throw when isExternalImport and allowExternalImports === true", () => {
    (findModuleConfig as jest.Mock).mockReturnValue({
      name: "module",
      errorMessage: "error",
      allowExternalImports: true,
    });
    (extractReferencesFromPatterns as jest.Mock).mockReturnValue([]);
    (isExternalImport as jest.Mock).mockReturnValue(true);

    expect(() =>
      checkImportPath({
        config: { modules: [] },
        cwd: "",
        filename: "",
        importPath: "react",
      }),
    ).not.toThrow(
      getExternalImportError({
        allowImportsFromExtracted: [],
        filename: "",
        importPath: "",
        moduleName: "",
      }),
    );
  });

  test("Should throw when isExternalImport and allowExternalImports === false and allowImportsFromExtracted do not includes importPath", () => {
    (findModuleConfig as jest.Mock).mockReturnValue({
      name: "module",
      errorMessage: "error",
      allowExternalImports: false,
    });
    (extractReferencesFromPatterns as jest.Mock).mockReturnValue([]);
    (isExternalImport as jest.Mock).mockReturnValue(true);

    expect(() =>
      checkImportPath({
        config: { modules: [] },
        cwd: "",
        filename: "",
        importPath: "react",
      }),
    ).toThrow(
      getExternalImportError({
        moduleName: "module",
        importPath: "react",
        filename: "",
        errorMessage: "error",
        allowImportsFromExtracted: [],
      }),
    );
  });

  test("Should not throw when isValidImportPath", () => {
    (findModuleConfig as jest.Mock).mockReturnValue({
      name: "module",
      errorMessage: "error",
    });
    (extractReferencesFromPatterns as jest.Mock).mockReturnValue([]);
    (isExternalImport as jest.Mock).mockReturnValue(false);
    (validateImportPath as jest.Mock).mockReturnValue(true);

    expect(() =>
      checkImportPath({
        config: { modules: [] },
        cwd: "",
        filename: "",
        importPath: "",
      }),
    ).not.toThrow(
      getImportError({
        allowImportsFromExtracted: [],
        filename: "",
        importPath: "",
        moduleName: "",
      }),
    );
  });

  test("Should throw when !isValidImportPath", () => {
    (findModuleConfig as jest.Mock).mockReturnValue({
      name: "module",
      errorMessage: "error",
    });
    (extractReferencesFromPatterns as jest.Mock).mockReturnValue([]);
    (isExternalImport as jest.Mock).mockReturnValue(false);
    (validateImportPath as jest.Mock).mockReturnValue(false);

    expect(() =>
      checkImportPath({
        config: { modules: [] },
        cwd: "",
        filename: "",
        importPath: "",
      }),
    ).toThrow(
      getImportError({
        allowImportsFromExtracted: [],
        filename: "",
        importPath: "",
        moduleName: "module",
        errorMessage: "error",
      }),
    );
  });
});
