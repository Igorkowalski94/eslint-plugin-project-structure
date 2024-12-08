import { readFileSync } from "fs";
import path from "path";

import { parse } from "comment-json";

import { getProjectRoot } from "helpers/getProjectRoot";

import { DEFAULT_BASE_URL } from "rules/independentModules/independentModules.consts";
import {
  IndependentModulesConfig,
  PathAliases,
  TsConfigJson,
} from "rules/independentModules/independentModules.types";

interface GetPathAliasesProps {
  config: IndependentModulesConfig;
  cwd: string;
}

export const getPathAliases = ({
  config,
  cwd,
}: GetPathAliasesProps): PathAliases | undefined => {
  const { pathAliases } = config;

  if (pathAliases) return pathAliases;

  const projectRoot = getProjectRoot({ cwd });

  const tsconfigPath = config.tsconfigPath
    ? path.resolve(projectRoot, config.tsconfigPath)
    : path.join(projectRoot, "tsconfig.json");

  let tsconfig: TsConfigJson | undefined;

  try {
    tsconfig = parse(
      readFileSync(tsconfigPath, "utf-8"),
    ) as unknown as TsConfigJson;
  } catch (_e) {
    return;
  }

  const { compilerOptions: { baseUrl = DEFAULT_BASE_URL, paths = {} } = {} } =
    tsconfig;

  return {
    baseUrl,
    paths,
  };
};
