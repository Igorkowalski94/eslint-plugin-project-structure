import { ErrorCache } from "types";

import { handleCache } from "helpers/handleCache";
import { readProjectStructureCacheFile } from "helpers/readProjectStructureCacheFile";

interface IsErrorInCacheProps {
  errorCache: ErrorCache;
  cwd: string;
}

export const isErrorInCache = ({
  cwd,
  errorCache,
}: IsErrorInCacheProps): boolean => {
  handleCache({
    cwd,
    errorCache,
  });

  const projectStructureCache = readProjectStructureCacheFile(cwd);

  const cacheData = projectStructureCache?.find(
    (cache) => cache.errorMessage === errorCache.errorMessage,
  );

  return !!cacheData && errorCache.filename !== cacheData.filename;
};
