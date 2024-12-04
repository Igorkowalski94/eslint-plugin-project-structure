import { getExternalImportError } from "rules/independentModules/errors/getExternalImportError";
import { getImportError } from "rules/independentModules/errors/getImportError";
import { getImportPathNotExistsError } from "rules/independentModules/errors/getImportPathNotExistsError";
import { checkImportPath } from "rules/independentModules/helpers/validateImport/helpers/validateAll/helpers/checkImportPath/checkImportPath";
import { extractReferencesFromPatterns } from "rules/independentModules/helpers/validateImport/helpers/validateAll/helpers/checkImportPath/helpers/extractReferencesFromPatterns/extractReferencesFromPatterns";
import { findModuleConfig } from "rules/independentModules/helpers/validateImport/helpers/validateAll/helpers/checkImportPath/helpers/findModuleConfig";
import { isExternalImport } from "rules/independentModules/helpers/validateImport/helpers/validateAll/helpers/checkImportPath/helpers/isExternalImport";
import { isImportPathExists } from "rules/independentModules/helpers/validateImport/helpers/validateAll/helpers/checkImportPath/helpers/isImportPathExists";
import { validateImportPath } from "rules/independentModules/helpers/validateImport/helpers/validateAll/helpers/checkImportPath/helpers/validateImportPath";

jest.mock(
  "rules/independentModules/helpers/validateImport/helpers/validateAll/helpers/checkImportPath/helpers/findModuleConfig",
  () => ({
    findModuleConfig: jest.fn(),
  }),
);

jest.mock(
  "rules/independentModules/helpers/validateImport/helpers/validateAll/helpers/checkImportPath/helpers/extractReferencesFromPatterns/extractReferencesFromPatterns",
  () => ({
    extractReferencesFromPatterns: jest.fn(),
  }),
);

jest.mock(
  "rules/independentModules/helpers/validateImport/helpers/validateAll/helpers/checkImportPath/helpers/isExternalImport",
  () => ({
    isExternalImport: jest.fn(),
  }),
);

jest.mock(
  "rules/independentModules/helpers/validateImport/helpers/validateAll/helpers/checkImportPath/helpers/isImportPathExists",
  () => ({
    isImportPathExists: jest.fn(),
  }),
);

jest.mock(
  "rules/independentModules/helpers/validateImport/helpers/validateAll/helpers/checkImportPath/helpers/validateImportPath",
  () => ({
    validateImportPath: jest.fn(),
  }),
);

describe("checkImportPath", () => {
  test("Should not call extractReusableImportPatterns when moduleConfig === undefined", () => {
    const extractReusableImportPatternsMock = jest.fn();

    (findModuleConfig as jest.Mock).mockReturnValue(undefined);
    (extractReferencesFromPatterns as jest.Mock).mockImplementation(
      extractReusableImportPatternsMock,
    );

    checkImportPath({
      config: { modules: [] },
      projectRoot: "",
      filename: "",
      importPath: "",
      pathAlias: false,
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
        projectRoot: "",
        filename: "",
        importPath: "react",
        pathAlias: false,
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
        projectRoot: "",
        filename: "",
        importPath: "react",
        pathAlias: false,
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
        projectRoot: "",
        filename: "",
        importPath: "react",
        pathAlias: false,
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

  test("Should throw when !importPathExists", () => {
    (findModuleConfig as jest.Mock).mockReturnValue({
      name: "module",
      errorMessage: "error",
    });
    (extractReferencesFromPatterns as jest.Mock).mockReturnValue([]);
    (isExternalImport as jest.Mock).mockReturnValue(false);
    (validateImportPath as jest.Mock).mockReturnValue(true);
    (isImportPathExists as jest.Mock).mockReturnValue(false);

    expect(() =>
      checkImportPath({
        config: { modules: [] },
        projectRoot: "",
        filename: "",
        importPath: "",
        pathAlias: false,
      }),
    ).toThrow(getImportPathNotExistsError());
  });

  test("Should not throw when isValidImportPath", () => {
    (findModuleConfig as jest.Mock).mockReturnValue({
      name: "module",
      errorMessage: "error",
    });
    (extractReferencesFromPatterns as jest.Mock).mockReturnValue([]);
    (isExternalImport as jest.Mock).mockReturnValue(false);
    (validateImportPath as jest.Mock).mockReturnValue(true);
    (isImportPathExists as jest.Mock).mockReturnValue(true);

    expect(() =>
      checkImportPath({
        config: { modules: [] },
        projectRoot: "",
        filename: "",
        importPath: "",
        pathAlias: false,
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
    (isImportPathExists as jest.Mock).mockReturnValue(true);

    expect(() =>
      checkImportPath({
        config: { modules: [] },
        projectRoot: "",
        filename: "",
        importPath: "",
        pathAlias: false,
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
