import path from "path";

import { SharedConfigurationSettings } from "@typescript-eslint/utils/dist/ts-eslint";

import { getMissingConfigFileError } from "../errors/getMissingConfigFileError";

interface GetConfigPathProps {
    cwd: string;
    settings: SharedConfigurationSettings;
    key: string;
}

export const getConfigPath = ({
    cwd,
    settings,
    key,
}: GetConfigPathProps): string => {
    const configPath = settings[key];

    if (!configPath) throw getMissingConfigFileError(key);

    return path.resolve(cwd, configPath as string);
};
