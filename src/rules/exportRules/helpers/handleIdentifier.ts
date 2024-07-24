import { TSESTree } from "@typescript-eslint/utils";
import { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";

import { validateExport } from "./validateExport";
import { ESLINT_ERRORS } from "../exportRules.consts";
import { ExportRules } from "../exportRules.types";

interface HandleIdentifierProps {
    node: TSESTree.Identifier;
    context: RuleContext<keyof typeof ESLINT_ERRORS, ExportRules[]>;
}

export const handleIdentifier = ({
    node,
    context,
}: HandleIdentifierProps): void => {
    if (
        (node.parent.parent?.parent?.type !==
            TSESTree.AST_NODE_TYPES.ExportNamedDeclaration &&
            node.parent?.parent?.type !==
                TSESTree.AST_NODE_TYPES.ExportNamedDeclaration &&
            node.parent.type !==
                TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration) ||
        node.parent.type === TSESTree.AST_NODE_TYPES.ClassDeclaration
    )
        return;

    validateExport({ context, exportName: node.name, node });
};
