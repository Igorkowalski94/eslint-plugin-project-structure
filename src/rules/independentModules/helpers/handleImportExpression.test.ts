import { TSESTree } from "@typescript-eslint/utils";

import { handleImportExpression } from "./handleImportExpression";
import { validateImport } from "./validateImport";
import { Context } from "../independentModules.types";

jest.mock("./validateImport", () => ({
    validateImport: jest.fn(),
}));

describe("handleImportExpression", () => {
    test("Should call validateImport when import value exist", () => {
        const validateImportMock = jest.fn();

        (validateImport as jest.Mock).mockImplementation(validateImportMock);

        handleImportExpression(
            {
                source: {
                    value: "import",
                    type: TSESTree.AST_NODE_TYPES.Literal,
                },
            } as TSESTree.ImportExpression,
            { settings: {}, report: jest.fn() } as unknown as Context,
        );

        expect(validateImportMock).toHaveBeenCalled();
    });

    test("Should not call validateImport when typeof import value !== string", () => {
        const validateImportMock = jest.fn();

        (validateImport as jest.Mock).mockImplementation(validateImportMock);

        handleImportExpression(
            {
                source: {
                    value: 2,
                    type: TSESTree.AST_NODE_TYPES.Literal,
                },
            } as unknown as TSESTree.ImportExpression,
            { settings: {}, report: jest.fn() } as unknown as Context,
        );

        expect(validateImportMock).not.toHaveBeenCalled();
    });

    test("Should not call validateImport when type !== Literal", () => {
        const validateImportMock = jest.fn();

        (validateImport as jest.Mock).mockImplementation(validateImportMock);

        handleImportExpression(
            {
                source: {
                    value: ["import"],
                    type: TSESTree.AST_NODE_TYPES.ArrayExpression,
                },
            } as unknown as TSESTree.ImportExpression,
            { settings: {}, report: jest.fn() } as unknown as Context,
        );

        expect(validateImportMock).not.toHaveBeenCalled();
    });
});
