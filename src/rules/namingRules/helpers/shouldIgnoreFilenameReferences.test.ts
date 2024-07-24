import { TSESTree } from "@typescript-eslint/utils";

import {
    ShouldIgnoreFilenameReferencesProps,
    shouldIgnoreFilenameReferences,
} from "./shouldIgnoreFilenameReferences";
import { NameType } from "../namingRules.types";

describe("shouldIgnoreFilenameReferences", () => {
    test.each<{
        nameType: NameType;
        node:
            | TSESTree.VariableDeclarator
            | TSESTree.ClassDeclaration
            | TSESTree.FunctionDeclaration
            | TSESTree.TSTypeAliasDeclaration
            | TSESTree.TSInterfaceDeclaration
            | TSESTree.TSEnumDeclaration
            | TSESTree.BlockStatement;

        expected: boolean;
    }>([
        {
            nameType: "ClassDeclaration",
            node: {
                parent: { type: TSESTree.AST_NODE_TYPES.Program },
            } as TSESTree.ClassDeclaration,
            expected: false,
        },
        {
            nameType: "ClassDeclaration",
            node: {
                parent: {
                    type: TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration,
                },
            } as TSESTree.ClassDeclaration,
            expected: false,
        },
        {
            nameType: "ClassDeclaration",
            node: {
                parent: {
                    type: TSESTree.AST_NODE_TYPES.ExportNamedDeclaration,
                },
            } as TSESTree.ClassDeclaration,
            expected: false,
        },
        {
            nameType: "FunctionDeclaration",
            node: {
                parent: { type: TSESTree.AST_NODE_TYPES.Program },
            } as TSESTree.FunctionDeclaration,
            expected: false,
        },
        {
            nameType: "FunctionDeclaration",
            node: {
                parent: {
                    type: TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration,
                },
            } as TSESTree.FunctionDeclaration,
            expected: false,
        },
        {
            nameType: "FunctionDeclaration",
            node: {
                parent: {
                    type: TSESTree.AST_NODE_TYPES.ExportNamedDeclaration,
                },
            } as TSESTree.FunctionDeclaration,
            expected: false,
        },
        {
            nameType: "TSEnumDeclaration",
            node: {
                parent: { type: TSESTree.AST_NODE_TYPES.Program },
            } as TSESTree.TSEnumDeclaration,
            expected: false,
        },
        {
            nameType: "TSEnumDeclaration",
            node: {
                parent: {
                    type: TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration,
                },
            } as TSESTree.TSEnumDeclaration,
            expected: false,
        },
        {
            nameType: "TSEnumDeclaration",
            node: {
                parent: {
                    type: TSESTree.AST_NODE_TYPES.ExportNamedDeclaration,
                },
            } as TSESTree.TSEnumDeclaration,
            expected: false,
        },

        {
            nameType: "TSInterfaceDeclaration",
            node: {
                parent: { type: TSESTree.AST_NODE_TYPES.Program },
            } as TSESTree.TSInterfaceDeclaration,
            expected: false,
        },
        {
            nameType: "TSInterfaceDeclaration",
            node: {
                parent: {
                    type: TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration,
                },
            } as TSESTree.TSInterfaceDeclaration,
            expected: false,
        },
        {
            nameType: "TSInterfaceDeclaration",
            node: {
                parent: {
                    type: TSESTree.AST_NODE_TYPES.ExportNamedDeclaration,
                },
            } as TSESTree.TSInterfaceDeclaration,
            expected: false,
        },

        {
            nameType: "TSTypeAliasDeclaration",
            node: {
                parent: { type: TSESTree.AST_NODE_TYPES.Program },
            } as TSESTree.TSTypeAliasDeclaration,
            expected: false,
        },
        {
            nameType: "TSTypeAliasDeclaration",
            node: {
                parent: {
                    type: TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration,
                },
            } as TSESTree.TSTypeAliasDeclaration,
            expected: false,
        },
        {
            nameType: "TSTypeAliasDeclaration",
            node: {
                parent: {
                    type: TSESTree.AST_NODE_TYPES.ExportNamedDeclaration,
                },
            } as TSESTree.TSTypeAliasDeclaration,
            expected: false,
        },

        {
            nameType: "ArrowFunctionExpression",
            node: {
                parent: { parent: { type: TSESTree.AST_NODE_TYPES.Program } },
            } as TSESTree.VariableDeclarator,
            expected: false,
        },
        {
            nameType: "ArrowFunctionExpression",
            node: {
                parent: {
                    parent: {
                        type: TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration,
                    },
                },
            } as TSESTree.VariableDeclarator,
            expected: false,
        },
        {
            nameType: "ArrowFunctionExpression",
            node: {
                parent: {
                    parent: {
                        type: TSESTree.AST_NODE_TYPES.ExportNamedDeclaration,
                    },
                },
            } as TSESTree.VariableDeclarator,
            expected: false,
        },

        {
            nameType: "VariableDeclarator",
            node: {
                parent: { parent: { type: TSESTree.AST_NODE_TYPES.Program } },
            } as TSESTree.VariableDeclarator,
            expected: false,
        },
        {
            nameType: "VariableDeclarator",
            node: {
                parent: {
                    parent: {
                        type: TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration,
                    },
                },
            } as TSESTree.VariableDeclarator,
            expected: false,
        },
        {
            nameType: "VariableDeclarator",
            node: {
                parent: {
                    parent: {
                        type: TSESTree.AST_NODE_TYPES.ExportNamedDeclaration,
                    },
                },
            } as TSESTree.VariableDeclarator,
            expected: false,
        },

        {
            nameType: "ClassDeclaration",
            node: {
                parent: { type: TSESTree.AST_NODE_TYPES.BlockStatement },
            } as TSESTree.BlockStatement,
            expected: true,
        },

        {
            nameType: "FunctionDeclaration",
            node: {
                parent: { type: TSESTree.AST_NODE_TYPES.BlockStatement },
            } as TSESTree.BlockStatement,
            expected: true,
        },

        {
            nameType: "TSEnumDeclaration",
            node: {
                parent: { type: TSESTree.AST_NODE_TYPES.BlockStatement },
            } as TSESTree.BlockStatement,
            expected: true,
        },

        {
            nameType: "TSInterfaceDeclaration",
            node: {
                parent: { type: TSESTree.AST_NODE_TYPES.BlockStatement },
            } as TSESTree.BlockStatement,
            expected: true,
        },

        {
            nameType: "TSTypeAliasDeclaration",
            node: {
                parent: { type: TSESTree.AST_NODE_TYPES.BlockStatement },
            } as TSESTree.BlockStatement,
            expected: true,
        },

        {
            nameType: "ArrowFunctionExpression",
            node: {
                parent: {
                    parent: { type: TSESTree.AST_NODE_TYPES.BlockStatement },
                },
            } as TSESTree.BlockStatement,
            expected: true,
        },

        {
            nameType: "VariableDeclarator",
            node: {
                parent: {
                    parent: { type: TSESTree.AST_NODE_TYPES.BlockStatement },
                },
            } as TSESTree.BlockStatement,
            expected: true,
        },
    ])(
        "Should return correct value for = %o",
        ({ nameType, node, expected }) => {
            expect(
                shouldIgnoreFilenameReferences({
                    nameType,
                    node: node as ShouldIgnoreFilenameReferencesProps["node"],
                }),
            ).toEqual(expected);
        },
    );
});
