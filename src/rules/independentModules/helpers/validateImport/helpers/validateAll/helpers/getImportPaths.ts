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

  const importsForFixedKeys = pathsKays
    .filter((key) => !key.endsWith("/*"))
    .flatMap((key) => {
      if (importPath !== key) return;

      return paths[key]
        .map((alias) =>
          path.resolve(projectRootWithBaseUrl, alias).replaceAll(sep, "/"),
        )
        .map((aliasWithProjectRoot) =>
          importPath.replace(key, aliasWithProjectRoot),
        );
    });

  const importsForDynamicKeys = pathsKays
    .filter((key) => key.endsWith("/*"))
    .flatMap((key) => {
      const keyCleared = key.replace("*", "");

      if (!importPath.includes(keyCleared)) return;

      return paths[key]
        .map((alias) => {
          const aliasCleared = alias.replace("/*", "");

          return path
            .resolve(projectRootWithBaseUrl, aliasCleared)
            .replaceAll(sep, "/");
        })
        .map((aliasWithProjectRoot) =>
          importPath.replace(keyCleared, `${aliasWithProjectRoot}/`),
        );
    });

  const imports = [...importsForFixedKeys, ...importsForDynamicKeys]
    .filter((v): v is string => !!v)
    .map((fullImportPathWithAlias) => {
      let importPathWithExtension = fullImportPathWithAlias;

      FILE_EXTENSIONS.forEach((ext) => {
        if (fs.existsSync(fullImportPathWithAlias + ext))
          return (importPathWithExtension = fullImportPathWithAlias + ext);

        if (fs.existsSync(fullImportPathWithAlias + "/index" + ext))
          return (importPathWithExtension =
            fullImportPathWithAlias + "/index" + ext);

        return;
      });

      return importPathWithExtension.replaceAll(
        projectRootWithBaseUrl.replaceAll(sep, "/") + "/",
        "",
      );
    })
    .map((importPath) => ({ importPath, pathAlias: true }));

  if (!imports.length) return [{ importPath, pathAlias: false }];

  return imports;
};
