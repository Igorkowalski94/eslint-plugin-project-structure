import micromatch from "micromatch";

import {
    IndependentModulesConfig,
    Module,
} from "rules/independentModules/independentModules.types";

export const findModuleConfig = (
    fileName: string,
    modules: IndependentModulesConfig["modules"],
): Module | undefined =>
    modules.find(({ pattern }) => micromatch.every(fileName, pattern));
