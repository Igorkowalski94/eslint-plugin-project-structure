import path from "path";

import { SharedConfigurationSettings } from "@typescript-eslint/utils/dist/ts-eslint";

import { getMissingConfigError } from "../errors/getMissingConfigError";

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

    if (!configPath) throw getMissingConfigError(key);

    return path.resolve(cwd, configPath as string);
};
