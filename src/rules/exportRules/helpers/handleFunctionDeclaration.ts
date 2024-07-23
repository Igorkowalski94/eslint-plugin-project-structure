import { TSESTree } from "@typescript-eslint/utils";
import { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";

import { validateExport } from "./validateExport";
import { ESLINT_ERRORS } from "../exportRules.consts";
import { ExportRules } from "../exportRules.types";

interface HandleFunctionDeclarationProps {
    node: TSESTree.FunctionDeclaration;
    context: RuleContext<keyof typeof ESLINT_ERRORS, ExportRules[]>;
}

export const handleFunctionDeclaration = ({
    node,
    context,
}: HandleFunctionDeclarationProps): void => {
    if (
        (node.parent.type !== TSESTree.AST_NODE_TYPES.ExportNamedDeclaration &&
            node.parent.type !==
                TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration) ||
        !node.id?.name
    )
        return;

    validateExport({
        context,
        exportName: node.id.name,
        node,
    });
};
