import path from "path";

import { SharedConfigurationSettings } from "@typescript-eslint/utils/dist/ts-eslint";

import { getMissingConfigFileError } from "errors/getMissingConfigFileError";

import { getProjectRoot } from "helpers/getProjectRoot";

interface GetConfigPathProps {
  settings: SharedConfigurationSettings;
  key: string;
  cwd: string;
}

export const getConfigPath = ({
  settings,
  key,
  cwd,
}: GetConfigPathProps): string => {
  const configPath = settings[key];

  if (!configPath) throw getMissingConfigFileError(key);

  return path.resolve(getProjectRoot({ cwd }), configPath as string);
};
