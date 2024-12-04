import fs from "fs";
import path, { sep } from "path";

import { FILE_EXTENSIONS } from "rules/independentModules/independentModules.consts";
import { Paths } from "rules/independentModules/independentModules.types";

interface GetImportPathsProps {
  importPath: string;
  paths?: Paths;
  projectRootWithBaseUrl: string;
}

export const getImportPaths = ({
  importPath,
  paths,
  projectRootWithBaseUrl,
}: GetImportPathsProps): { importPath: string; pathAlias: boolean }[] => {
  const pathsKays = Object.keys(paths ?? {});

  if (!paths || !pathsKays.length) return [{ importPath, pathAlias: false }];

  const imports = pathsKays
    .flatMap((key) => {
      const keyCleared = key.replace("*", "");

      if (!importPath.includes(keyCleared)) return;

      const importPaths = paths[key];

      return importPaths
        .map((importPath) => {
          const importPathCleared = importPath.replaceAll("/*", "");

          return path
            .resolve(projectRootWithBaseUrl, importPathCleared)
            .replaceAll(sep, "/");
        })
        .flatMap((importPathReplace) =>
          importPath.replace(keyCleared, `${importPathReplace}/`),
        )
        .map((importPath) => {
          let importPathWithExtension = importPath;

          FILE_EXTENSIONS.forEach((ext) => {
            if (fs.existsSync(importPath + ext))
              return (importPathWithExtension = importPath + ext);

            if (fs.existsSync(importPath + "/index" + ext))
              return (importPathWithExtension = importPath + "/index" + ext);

            return;
          });

          return importPathWithExtension.replaceAll(
            projectRootWithBaseUrl.replaceAll(sep, "/") + "/",
            "",
          );
        });
    })
    .filter((v): v is string => !!v)
    .map((importPath) => ({ importPath, pathAlias: true }));

  if (!imports.length) return [{ importPath, pathAlias: false }];

  return imports;
};
