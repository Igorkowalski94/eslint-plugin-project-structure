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

  const imports = pathsKays
    .map((key) => {
      const keyCleared = key.replace("*", "");

      if (!importPath.includes(keyCleared)) return;

      const importPaths = paths[key];

      return importPaths
        .map((importPath) =>
          importPath.replaceAll("../", "").replaceAll("./", ""),
        )
        .map((importPathReplace) =>
          importPath.replace(keyCleared, importPathReplace.replace("*", "")),
        );
    })
    .flat()
    .filter((v): v is string => !!v);

  if (!imports.length) return [importPath];

  return imports;
};
