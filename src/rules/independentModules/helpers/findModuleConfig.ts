import micromatch from "micromatch";

import { IndependentModulesConfig, Module } from "../independentModules.types";

export const findModuleConfig = (
    fileName: string,
    modules: IndependentModulesConfig["modules"],
): Module | undefined =>
    modules.find(({ pattern }) => micromatch.isMatch(fileName, pattern));
