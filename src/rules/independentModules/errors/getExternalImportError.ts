import { FinalError } from "../../../errors/FinalError";
import { getDebugMessage } from "../helpers/getDebugMessage";
import { Module } from "../independentModules.types";

interface GetExternalImportErrorProps {
    moduleName: string;
    errorMessage?: string;
    debugMode?: boolean;
    importPath: string;
    filename: string;
    allowImportsFromExtracted: Module["allowImportsFrom"];
}

export const getExternalImportError = ({
    debugMode,
    importPath,
    moduleName,
    errorMessage,
    filename,
    allowImportsFromExtracted,
}: GetExternalImportErrorProps): FinalError => {
    const debugModeMessage = debugMode
        ? getDebugMessage({ allowImportsFromExtracted, filename, importPath })
        : "";

    return new FinalError(
        (errorMessage ??
            `🔥 External imports are not allowed in the module '${moduleName}'. 🔥`) +
            debugModeMessage,
    );
};
