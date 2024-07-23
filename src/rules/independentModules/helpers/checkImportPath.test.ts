import { checkImportPath } from "./checkImportPath";
import { extractReferencesFromPatterns } from "./extractReferencesFromPatterns";
import { findModuleConfig } from "./findModuleConfig";
import { isExternalImport } from "./isExternalImport";
import { validateImportPath } from "./validateImportPath";
import { getExternalImportError } from "../errors/getExternalImportError";
import { getImportError } from "../errors/getImportError";

jest.mock("./findModuleConfig", () => ({
    findModuleConfig: jest.fn(),
}));

jest.mock("./extractReferencesFromPatterns", () => ({
    extractReferencesFromPatterns: jest.fn(),
}));

jest.mock("./isExternalImport", () => ({
    isExternalImport: jest.fn(),
}));

jest.mock("./validateImportPath", () => ({
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
