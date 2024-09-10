import { RECURSION_LIMIT } from "consts";

export const getInvalidFolderRecursionLimitError = (): Error =>
  new Error(
    `🔥 'folderRecursionLimit' cannot exceed ${String(RECURSION_LIMIT)}. 🔥`,
  );
