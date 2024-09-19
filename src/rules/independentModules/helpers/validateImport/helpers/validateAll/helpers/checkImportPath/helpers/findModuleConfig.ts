import { isCorrectPattern } from "helpers/isCorrectPattern";

import {
  IndependentModulesConfig,
  Module,
} from "rules/independentModules/independentModules.types";

export const findModuleConfig = (
  fileName: string,
  modules: IndependentModulesConfig["modules"],
): Module | undefined =>
  modules.find(({ pattern }) => isCorrectPattern({ input: fileName, pattern }));
