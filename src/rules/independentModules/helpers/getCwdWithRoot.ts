import { sep } from "path";

import { DEFAULT_ROOT } from "../independentModules.consts";
import { IndependentModulesConfig } from "../independentModules.types";

export const getCwdWithRoot = (
    cwd: string,
    root: IndependentModulesConfig["root"],
): string => {
    if (root === null) return `${cwd}${sep}`;

    return `${cwd}${sep}${root ?? DEFAULT_ROOT}${sep}`;
};
