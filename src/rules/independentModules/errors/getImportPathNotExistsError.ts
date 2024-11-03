import { FinalError } from "errors/FinalError";

export const getImportPathNotExistsError = (): FinalError =>
  new FinalError(
    `🔥 Cannot find module. If the import includes a path alias, make sure that you have added the alias to the configuration. 🔥`,
  );
