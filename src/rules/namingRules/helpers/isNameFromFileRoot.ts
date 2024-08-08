import { TSESTree } from "@typescript-eslint/utils";

import { ValidateNameProps } from "rules/namingRules/helpers/validateName";
import { NameType } from "rules/namingRules/namingRules.types";

export interface IsNameFromFileRootProps {
    nameType: NameType;
    node: ValidateNameProps["node"];
}

export const isNameFromFileRoot = ({
    nameType,
    node,
}: IsNameFromFileRootProps): boolean => {
    if (
        nameType === "ArrowFunctionExpression" ||
        nameType === "VariableDeclarator"
    )
        return (
            node.parent.parent?.type === TSESTree.AST_NODE_TYPES.Program ||
            node.parent.parent?.type ===
                TSESTree.AST_NODE_TYPES.ExportNamedDeclaration ||
            node.parent.parent?.type ===
                TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration
        );

    return (
        node.parent.type === TSESTree.AST_NODE_TYPES.Program ||
        node.parent.type === TSESTree.AST_NODE_TYPES.ExportNamedDeclaration ||
        node.parent.type === TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration
    );
};
