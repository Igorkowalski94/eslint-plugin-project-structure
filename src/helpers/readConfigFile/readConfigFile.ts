import { readFileSync } from "fs";

import { SharedConfigurationSettings } from "@typescript-eslint/utils/dist/ts-eslint";
import { parse } from "comment-json";
import { load } from "js-yaml";

import { getInvalidConfigFileError } from "errors/getInvalidConfigFileError";

import { getConfigPath } from "helpers/readConfigFile/helpers/getConfigPath";

interface ReadConfigFileProps<T> {
  key: string;
  settings: SharedConfigurationSettings;
  options: T | undefined;
  cwd: string;
}

export const readConfigFile = <T>({
  key,
  settings,
  options,
  cwd,
}: ReadConfigFileProps<T>): T => {
  if (options) return options;

  const configPath = getConfigPath({
    key,
    settings,
    cwd,
  });

  let config = undefined;

  if (configPath.endsWith("json") || configPath.endsWith("jsonc")) {
    config = parse(readFileSync(configPath, "utf-8")) as T;
  } else {
    config = load(readFileSync(configPath, "utf8")) as T;
  }

  if (!config) throw getInvalidConfigFileError(configPath);

  return config;
};
