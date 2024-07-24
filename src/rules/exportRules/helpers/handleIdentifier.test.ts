import { TSESTree } from "@typescript-eslint/utils";
import { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";

import { handleIdentifier } from "./handleIdentifier";
import { validateExport } from "./validateExport";
import { ESLINT_ERRORS } from "../exportRules.consts";
import { ExportRules } from "../exportRules.types";

jest.mock("./validateExport", () => ({
    validateExport: jest.fn(),
}));

describe("handleIdentifier", () => {
    test.each([
        {
            type1: TSESTree.AST_NODE_TYPES.CallExpression,
            type2: TSESTree.AST_NODE_TYPES.CallExpression,
            type3: TSESTree.AST_NODE_TYPES.CallExpression,
        },
        {
            type1: TSESTree.AST_NODE_TYPES.ClassDeclaration,
            type2: TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration,
            type3: TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration,
        },
    ])(
        "Should not call validateExport when values = %o",
        ({ type1, type2, type3 }) => {
            const validateExportMock = jest.fn();

            (validateExport as jest.Mock).mockImplementation(
                validateExportMock,
            );

            handleIdentifier({
                node: {
                    parent: {
                        type: type1,
                        parent: {
                            type: type2,
                            parent: {
                                type: type3,
                            },
                        },
                    },
                } as TSESTree.Identifier,
                context: {} as RuleContext<
                    keyof typeof ESLINT_ERRORS,
                    ExportRules[]
                >,
            }),
                expect(validateExportMock).not.toHaveBeenCalled();
        },
    );

    test.each([
        {
            type1: TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration,
            type2: TSESTree.AST_NODE_TYPES.CallExpression,
            type3: TSESTree.AST_NODE_TYPES.CallExpression,
        },
        {
            type1: TSESTree.AST_NODE_TYPES.CallExpression,
            type2: TSESTree.AST_NODE_TYPES.ExportNamedDeclaration,
            type3: TSESTree.AST_NODE_TYPES.CallExpression,
        },
        {
            type1: TSESTree.AST_NODE_TYPES.CallExpression,
            type2: TSESTree.AST_NODE_TYPES.CallExpression,
            type3: TSESTree.AST_NODE_TYPES.ExportNamedDeclaration,
        },
    ])(
        "Should call validateExport when values = %o",
        ({ type1, type2, type3 }) => {
            const validateExportMock = jest.fn();

            (validateExport as jest.Mock).mockImplementation(
                validateExportMock,
            );

            handleIdentifier({
                node: {
                    parent: {
                        type: type1,
                        parent: {
                            type: type2,
                            parent: {
                                type: type3,
                            },
                        },
                    },
                } as TSESTree.Identifier,
                context: {} as RuleContext<
                    keyof typeof ESLINT_ERRORS,
                    ExportRules[]
                >,
            }),
                expect(validateExportMock).toHaveBeenCalled();
        },
    );
});
