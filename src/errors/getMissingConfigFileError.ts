export const getMissingConfigFileError = (key: string): Error =>
    new Error(`🔥 Missing configuration file '${key}'. 🔥`);
