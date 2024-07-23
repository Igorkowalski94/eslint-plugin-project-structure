import { readFileSync } from "fs";

import { load } from "js-yaml";

export const readConfigFile = <T>(configPath: string): T | undefined => {
    let config;

    try {
        config = load(readFileSync(configPath, "utf8"));

        if (!config) config = JSON.parse(readFileSync(configPath, "utf-8"));
    } catch (error) {
        return;
    }

    return config;
};
