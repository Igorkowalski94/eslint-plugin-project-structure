import { readFileSync } from "fs";

import { load } from "js-yaml";
import stripJsonComments from "strip-json-comments";

export const readConfigFile = <T>(configPath: string): T | undefined => {
    let config;

    try {
        config = load(readFileSync(configPath, "utf8"));

        if (!config)
            config = JSON.parse(
                stripJsonComments(readFileSync(configPath, "utf-8")),
            );
    } catch (error) {
        return;
    }

    return config;
};
