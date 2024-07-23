import { FinalError } from "../../../errors/FinalError";

export const getInvalidConfigFileError = (configPath: string): Error =>
    new FinalError(`\n🔥 Invalid configuration file '${configPath}' 🔥\n`);
