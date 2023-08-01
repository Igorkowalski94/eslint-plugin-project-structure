import { getInvalidConfigError } from "./helpers/getInvalidConfigError";
import { isIgnoredFile } from "./helpers/isIgnoredFile";
import { readConfigFile } from "./helpers/readConfigFile";
import { validatePath } from "../../validators/validatePath/validatePath";

export const validateFileStructure = (
    configPath: string,
    filePath?: string,
): void => {
    if (!filePath) return;

    const config = readConfigFile(configPath);

    if (!config || !config.structure) throw getInvalidConfigError(configPath);

    if (isIgnoredFile(filePath, config)) return;

    validatePath(filePath, "structure", config.structure, config);
};
