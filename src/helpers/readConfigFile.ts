import { readFileSync } from "fs";

import { SharedConfigurationSettings } from "@typescript-eslint/utils/dist/ts-eslint";
import { parse } from "comment-json";
import { load } from "js-yaml";

import { getInvalidConfigFileError } from "errors/getInvalidConfigFileError";

import { getConfigPath } from "helpers/getConfigPath";

interface ReadConfigFileProps<T> {
  key: string;
  cwd: string;
  settings: SharedConfigurationSettings;
  options: T | undefined;
}

export const readConfigFile = <T>({
  cwd,
  key,
  settings,
  options,
}: ReadConfigFileProps<T>): T => {
  if (options) return options;

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
