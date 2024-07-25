import { TSESTree } from "@typescript-eslint/utils";
import { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";

import { handleVariableDeclarator } from "./handleVariableDeclarator";
import { validateName } from "./validateName";
import { ESLINT_ERRORS } from "../namingRules.consts";
import { FileNamingRules } from "../namingRules.types";

jest.mock("./validateName", () => ({
    validateName: jest.fn(),
}));

describe("handleVariableDeclarator", () => {
    test("Should not call validateName when type !== Identifier", () => {
        const validateNameMock = jest.fn();

        (validateName as jest.Mock).mockImplementation(validateNameMock);

        handleVariableDeclarator({
            node: {
                id: { type: TSESTree.AST_NODE_TYPES.ArrayPattern },
            } as TSESTree.VariableDeclarator,
            context: {} as RuleContext<
                keyof typeof ESLINT_ERRORS,
                FileNamingRules[]
            >,
        }),
            expect(validateNameMock).not.toHaveBeenCalled();
    });

    test.each([
        {
            type: TSESTree.AST_NODE_TYPES.ArrowFunctionExpression,
            expected: {
                node: {
                    id: {
                        type: TSESTree.AST_NODE_TYPES.Identifier,
                        name: "name",
                    },
                    init: {
                        type: "ArrowFunctionExpression",
                    },
                },
                context: {},
                name: "name",
                nameType: "ArrowFunctionExpression",
            },
        },
        {
            type: TSESTree.AST_NODE_TYPES.Identifier,
            expected: {
                node: {
                    id: {
                        type: TSESTree.AST_NODE_TYPES.Identifier,
                        name: "name",
                    },
                    init: {
                        type: "Identifier",
                    },
                },
                context: {},
                name: "name",
                nameType: "VariableDeclarator",
            },
        },
    ])(
        "Should call validateName with correct values for %o",
        ({ type, expected }) => {
            const validateNameMock = jest.fn();

            (validateName as jest.Mock).mockImplementation(validateNameMock);

            handleVariableDeclarator({
                node: {
                    id: {
                        type: TSESTree.AST_NODE_TYPES.Identifier,
                        name: "name",
                    },
                    init: {
                        type,
                    },
                } as TSESTree.VariableDeclarator,
                context: {} as RuleContext<
                    keyof typeof ESLINT_ERRORS,
                    FileNamingRules[]
                >,
            }),
                expect(validateNameMock).toHaveBeenCalledWith(expected);
        },
    );
});
