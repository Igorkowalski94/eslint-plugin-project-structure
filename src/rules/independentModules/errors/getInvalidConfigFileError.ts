import { FinalError } from "../../../errors/FinalError";

export const getInvalidConfigFileError = (configPath: string): Error =>
    new FinalError(`🔥 Invalid configuration file '${configPath}'. 🔥`);
