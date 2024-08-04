import { readFileSync } from "fs";

import { parse } from "comment-json";
import { load } from "js-yaml";

export const readConfigFile = <T>(configPath: string): T | undefined => {
    if (configPath.endsWith("json"))
        return parse(readFileSync(configPath, "utf-8")) as T;

    return load(readFileSync(configPath, "utf8")) as T;
};
