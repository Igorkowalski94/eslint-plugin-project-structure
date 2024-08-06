import { readFileSync } from "fs";

import { SharedConfigurationSettings } from "@typescript-eslint/utils/dist/ts-eslint";
import { parse } from "comment-json";
import { load } from "js-yaml";

import { getConfigPath } from "./getConfigPath";
import { getInvalidConfigFileError } from "../errors/getInvalidConfigFileError";

interface ReadConfigFileProps<T> {
    key: string;
    cwd: string;
    settings: SharedConfigurationSettings;
    options: [T] | [];
}

export const readConfigFile = <T>({
    cwd,
    key,
    settings,
    options,
}: ReadConfigFileProps<T>): T => {
    if (options.length) return options[0];

    const configPath = getConfigPath({
        cwd,
        key,
        settings,
    });

    let config = undefined;

    if (configPath.endsWith("json")) {
        config = parse(readFileSync(configPath, "utf-8")) as T;
    } else {
        config = load(readFileSync(configPath, "utf8")) as T;
    }

    if (!config) throw getInvalidConfigFileError(configPath);

    return config;
};
