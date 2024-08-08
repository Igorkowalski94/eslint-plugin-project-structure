import { sep } from "path";

import { DEFAULT_IMPORT_ROOT } from "rules/independentModules/independentModules.consts";
import { IndependentModulesConfig } from "rules/independentModules/independentModules.types";

export const getCwdWithRoot = (
    cwd: string,
    root: IndependentModulesConfig["root"],
): string => {
    if (root === null) return `${cwd}${sep}`;

    return `${cwd}${sep}${root ?? DEFAULT_IMPORT_ROOT}${sep}`;
};
