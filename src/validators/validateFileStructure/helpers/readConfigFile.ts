import { readFileSync } from "fs";

import { load } from "js-yaml";

import { ProjectStructureConfig } from "../../../types";

export const readConfigFile = (
    configPath: string,
): ProjectStructureConfig | void => {
    let config: ProjectStructureConfig | void;

    try {
        config = load(
            readFileSync(configPath, "utf8"),
        ) as ProjectStructureConfig;
    } catch (error) {
        return;
    }

    try {
        if (config) return config;
        config = JSON.parse(readFileSync(configPath, "utf-8"));
    } catch (error) {
        return;
    }

    return config;
};
