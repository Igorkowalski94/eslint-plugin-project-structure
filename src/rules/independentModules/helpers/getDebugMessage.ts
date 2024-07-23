import { convertReferencesToPath } from "./convertReferencesToPath";
import { getDirnamePath } from "./getDirnamePath";
import { getFamilyPath } from "./getFamilyPath";
import { Module } from "../independentModules.types";

interface GetDebugMessageProps {
    allowImportsFromExtracted: Module["allowImportsFrom"];
    filename: string;
    importPath: string;
}

export const getDebugMessage = ({
    allowImportsFromExtracted,
    filename,
    importPath,
}: GetDebugMessageProps): string => {
    const referencesMode = allowImportsFromExtracted.reduce((acc, pattern) => {
        const newPattern = convertReferencesToPath({
            pattern,
            importPath,
            filename,
        });
        return (acc = `${acc}${JSON.stringify(newPattern)}\n`);
    }, "\nallowImportsFrom:\n");

    return `\n\nFile path   = "${filename}"\nImport path = "${importPath}"\n{family}    = "${getFamilyPath({ filename, importPath, pattern: "{family}" })}"\n{dirname}   = "${getDirnamePath(filename, "{dirname}")}"\n${referencesMode}`;
};
