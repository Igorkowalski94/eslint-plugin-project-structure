import { FinalError } from "../../../errors/FinalError/FinalError";

export const getInvalidConfigError = (configPath: string): Error =>
    new FinalError(
        `Invalid configuration file '${configPath}'. Check the 'project-structure/config-path' in your .eslintrc settings 
    or check if your config contains 'structure' object.`,
    );
