import { TSESTree } from "@typescript-eslint/utils";
import { ReportDescriptor } from "@typescript-eslint/utils/dist/ts-eslint/Rule";

import { validateAll } from "./validateAll";
import { finalErrorGuard } from "../../../errors/finalErrorGuard";
import { getConfigPath } from "../../../helpers/getConfigPath";
import { Context } from "../independentModules.types";

export interface ValidateImportProps {
    importPath: string;
    context: Context;
    node:
        | TSESTree.ImportDeclaration
        | TSESTree.ExportNamedDeclaration
        | TSESTree.ExportAllDeclaration
        | TSESTree.CallExpression
        | TSESTree.ImportExpression;
}

export const validateImport = ({
    importPath,
    context: { cwd, filename, report, settings },
    node,
}: ValidateImportProps): void => {
    const configPath = getConfigPath({
        cwd,
        key: "project-structure/independent-modules-config-path",
        settings,
    });

    try {
        validateAll({
            filename,
            importPath,
            cwd,
            configPath,
        });
    } catch (error) {
        if (!finalErrorGuard(error)) throw error;

        report({
            node,
            message: error.message,
        } as unknown as ReportDescriptor<"error">);
    }
};
