import { TSESTree } from "@typescript-eslint/utils";

import { NameType } from "../namingRules.types";

export interface ShouldIgnoreFilenameReferencesProps {
    nameType: NameType;
    node:
        | TSESTree.VariableDeclarator
        | TSESTree.ClassDeclaration
        | TSESTree.FunctionDeclaration
        | TSESTree.TSTypeAliasDeclaration
        | TSESTree.TSInterfaceDeclaration
        | TSESTree.TSEnumDeclaration;
}

export const shouldIgnoreFilenameReferences = ({
    nameType,
    node,
}: ShouldIgnoreFilenameReferencesProps): boolean => {
    if (
        nameType === "ArrowFunctionExpression" ||
        nameType === "VariableDeclarator"
    )
        return (
            node.parent.parent?.type !== TSESTree.AST_NODE_TYPES.Program &&
            node.parent.parent?.type !==
                TSESTree.AST_NODE_TYPES.ExportNamedDeclaration &&
            node.parent.parent?.type !==
                TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration
        );

    return (
        node.parent.type !== TSESTree.AST_NODE_TYPES.Program &&
        node.parent.type !== TSESTree.AST_NODE_TYPES.ExportNamedDeclaration &&
        node.parent.type !== TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration
    );
};
