import {
    DIRNAME_REGEX,
    FAMILY_REGEX,
} from "rules/independentModules/independentModules.consts";

export const extractPathReferencesFromPattern = (
    pattern: string,
): null | string => {
    const matchFamily = pattern.match(FAMILY_REGEX);
    const matchDirname = pattern.match(DIRNAME_REGEX);

    if (!matchFamily && matchDirname) return matchDirname[0];
    if (matchFamily && !matchDirname) return matchFamily[0];

    return null;
};
