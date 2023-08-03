import { FinalError } from "../../../errors/FinalError/FinalError";

export const getInvalidConfigFileError = (configPath: unknown): Error =>
    new FinalError(`\n🔥 Invalid configuration file '${configPath}' 🔥\n`);
