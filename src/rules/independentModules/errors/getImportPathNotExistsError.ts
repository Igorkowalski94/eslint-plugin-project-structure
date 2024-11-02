import { FinalError } from "errors/FinalError";

export const getImportPathNotExistsError = (): FinalError =>
  new FinalError(
    `🔥 This import does not exist. If the import includes a path alias, make sure that you have added the alias to the configuration. 🔥`,
  );
