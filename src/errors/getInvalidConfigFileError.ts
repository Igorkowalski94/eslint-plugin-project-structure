export const getInvalidConfigFileError = (configPath: string): Error =>
    new Error(
        `🔥 '${configPath}' file cannot be read or has an incorrect extension. 🔥`,
    );
