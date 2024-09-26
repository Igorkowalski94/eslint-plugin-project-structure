import { readFileSync } from "fs";
import path from "path";

import { parse } from "comment-json";

import { DEFAULT_BASE_URL } from "rules/independentModules/independentModules.consts";
import {
  IndependentModulesConfig,
  PathAliases,
  TsConfigJson,
} from "rules/independentModules/independentModules.types";

interface GetPathAliasesProps {
  cwd: string;
  config: IndependentModulesConfig;
}

export const getPathAliases = ({
  cwd,
  config,
}: GetPathAliasesProps): PathAliases | undefined => {
  const { pathAliases } = config;

  if (pathAliases) return pathAliases;

  const tsconfigPath = config.tsconfigPath ?? path.join(cwd, "tsconfig.json");

  let tsconfig: TsConfigJson | undefined;

  try {
    tsconfig = parse(
      readFileSync(tsconfigPath, "utf-8"),
    ) as unknown as TsConfigJson;
  } catch (_e) {
    return;
  }

  const {
    compilerOptions: { baseUrl = DEFAULT_BASE_URL, paths = {} },
  } = tsconfig;

  return {
    baseUrl,
    paths,
  };
};
