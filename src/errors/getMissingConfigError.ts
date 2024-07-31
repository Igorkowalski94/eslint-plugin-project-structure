export const getMissingConfigError = (key: string): Error =>
    new Error(`🔥 "${key}" not provided 🔥`);
