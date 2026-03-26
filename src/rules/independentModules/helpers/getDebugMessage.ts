import { convertReferencesToPath } from "rules/independentModules/helpers/convertReferencesToPath";
import { getDirnamePath } from "rules/independentModules/helpers/getDirnamePath";
import { getFamilyPath } from "rules/independentModules/helpers/getFamilyPath";
import { Module } from "rules/independentModules/independentModules.types";

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
    return (acc = `${JSON.stringify(acc)}${JSON.stringify(newPattern)}\n`);
  }, "allowImportsFrom:\n");

  return `\n\nFile path   = "${filename}"\nImport path = "${importPath}"\n{family}    = "${getFamilyPath({ filename, importPath, pattern: "{family}" })}"\n{dirname}   = "${getDirnamePath(filename, "{dirname}")}"\n\n${JSON.stringify(referencesMode)}\n`;
};
