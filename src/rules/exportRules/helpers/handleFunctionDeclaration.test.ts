import { TSESTree } from "@typescript-eslint/utils";
import { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";

import { handleFunctionDeclaration } from "./handleFunctionDeclaration";
import { validateExport } from "./validateExport";
import { ESLINT_ERRORS } from "../exportRules.consts";
import { ExportRules } from "../exportRules.types";

jest.mock("./validateExport", () => ({
    validateExport: jest.fn(),
}));

describe("handleFunctionDeclaration", () => {
    test.each([
        {
            type: TSESTree.AST_NODE_TYPES.CallExpression,
            name: "componentName.const",
        },
        {
            type: TSESTree.AST_NODE_TYPES.ExportNamedDeclaration,
            name: undefined,
        },
        {
            type: TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration,
            name: undefined,
        },
    ])("Should not call validateExport when values = %o", ({ type, name }) => {
        const validateExportMock = jest.fn();

        (validateExport as jest.Mock).mockImplementation(validateExportMock);

        handleFunctionDeclaration({
            node: {
                parent: {
                    type,
                },
                id: { name },
            } as TSESTree.FunctionDeclaration,
            context: {} as RuleContext<
                keyof typeof ESLINT_ERRORS,
                ExportRules[]
            >,
        }),
            expect(validateExportMock).not.toHaveBeenCalled();
    });

    test.each([
        {
            type: TSESTree.AST_NODE_TYPES.ExportNamedDeclaration,
            name: "exportName",
        },
        {
            type: TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration,
            name: "exportName",
        },
    ])("Should call validateExport when values = %o", ({ type, name }) => {
        const validateExportMock = jest.fn();

        (validateExport as jest.Mock).mockImplementation(validateExportMock);

        handleFunctionDeclaration({
            node: {
                parent: {
                    type,
                },
                id: { name },
            } as TSESTree.FunctionDeclaration,
            context: {} as RuleContext<
                keyof typeof ESLINT_ERRORS,
                ExportRules[]
            >,
        }),
            expect(validateExportMock).toHaveBeenCalled();
    });
});
