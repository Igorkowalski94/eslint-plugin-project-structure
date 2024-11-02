import { ErrorCache } from "types";

import { handleCache } from "helpers/handleCache";
import { readProjectStructureCacheFile } from "helpers/readProjectStructureCacheFile";

interface IsErrorInCacheProps {
  errorCache: ErrorCache;
  projectRoot: string;
}

export const isErrorInCache = ({
  projectRoot,
  errorCache,
}: IsErrorInCacheProps): boolean => {
  handleCache({
    projectRoot,
    errorCache,
  });

  const projectStructureCache = readProjectStructureCacheFile(projectRoot);

  const cacheData = projectStructureCache?.find(
    (cache) => cache.errorMessage === errorCache.errorMessage,
  );

  return !!cacheData && errorCache.filename !== cacheData.filename;
};
