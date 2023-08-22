import { readFileSync } from "fs";

import { load } from "js-yaml";

import { ProjectStructureConfig } from "../../../types";

export const readConfigFile = (
    configPath: string,
): ProjectStructureConfig | void => {
    let config = null;

    try {
        config = load(readFileSync(configPath, "utf8"));
    } catch (error) {
        return;
    }

    try {
        config = JSON.parse(readFileSync(configPath, "utf-8"));
    } catch (error) {
        return config;
    }

    return config;
};
