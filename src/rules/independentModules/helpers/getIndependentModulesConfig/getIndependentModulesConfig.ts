import { readConfigFile } from "helpers/readConfigFile/readConfigFile";
import { validateConfig } from "helpers/validateConfig";

import { INDEPENDENT_MODULES_SCHEMA } from "rules/independentModules/helpers/getIndependentModulesConfig/getIndependentModulesConfig.consts";
import { getPathAliases } from "rules/independentModules/helpers/getIndependentModulesConfig/helpers/getPathAliases";
import {
  Context,
  IndependentModulesConfig,
} from "rules/independentModules/independentModules.types";

export const getIndependentModulesConfig = ({
  options,
  settings,
  cwd,
}: Context): IndependentModulesConfig => {
  const config = readConfigFile<IndependentModulesConfig>({
    key: "project-structure/independent-modules-config-path",
    settings,
    options: options[0],
    cwd,
  });

  validateConfig({ config, schema: INDEPENDENT_MODULES_SCHEMA });

  const pathAliases = getPathAliases({ config, cwd });

  return { ...config, pathAliases };
};
