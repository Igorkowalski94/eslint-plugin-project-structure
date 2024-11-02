import path from "path";

import { SharedConfigurationSettings } from "@typescript-eslint/utils/dist/ts-eslint";

import { getMissingConfigFileError } from "errors/getMissingConfigFileError";

import { getProjectRoot } from "helpers/getProjectRoot";

interface GetConfigPathProps {
  settings: SharedConfigurationSettings;
  key: string;
}

export const getConfigPath = ({
  settings,
  key,
}: GetConfigPathProps): string => {
  const configPath = settings[key];

  if (!configPath) throw getMissingConfigFileError(key);

  return path.resolve(getProjectRoot(), configPath as string);
};
