import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/utils";

import { validateImport } from "./validateImport";
import { Context } from "../independentModules.types";

export const handleImportExpression = (
    node: TSESTree.ImportExpression,
    context: Context,
): void => {
    if (
        node.source.type !== AST_NODE_TYPES.Literal ||
        typeof node.source.value !== "string"
    )
        return;

    const importPath = node.source.value;

    validateImport({ importPath, context, node });
};
