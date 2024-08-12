import { Paths } from "rules/independentModules/independentModules.types";

interface GetImportPathsProps {
  importPath: string;
  paths?: Paths;
}

export const getImportPaths = ({
  importPath,
  paths,
}: GetImportPathsProps): string[] => {
  const pathsKays = Object.keys(paths ?? {});

  if (!paths || !pathsKays.length) return [importPath];

  return pathsKays
    .map((key) => {
      const keyCleared = key.replace("/*", "");
      const importPaths = paths[key];

      return importPaths.map((importPathReplace) =>
        importPath.replace(keyCleared, importPathReplace.replace("/*", "")),
      );
    })
    .flat();
};
