import { TSESTree } from "@typescript-eslint/utils";

import { validateImport } from "./validateImport";
import { Context } from "../independentModules.types";

export const handleExportNamedDeclaration = (
    node: TSESTree.ExportNamedDeclaration,
    context: Context,
): void => {
    const importPath = node.source?.value;

    if (!importPath) return;

    validateImport({ importPath, context, node });
};
