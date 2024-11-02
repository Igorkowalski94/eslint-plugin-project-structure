import { existsSync } from "fs";

import { ErrorCache } from "types";

import { createProjectStructureCacheFile } from "helpers/createProjectStructureCacheFile";
import { readProjectStructureCacheFile } from "helpers/readProjectStructureCacheFile";

interface HandleCacheProps {
  errorCache: ErrorCache;
  projectRoot: string;
}

export const handleCache = ({
  projectRoot,
  errorCache,
}: HandleCacheProps): void => {
  const projectStructureCache = readProjectStructureCacheFile(projectRoot);

  if (!projectStructureCache)
    return createProjectStructureCacheFile({
      projectRoot,
      projectStructureCache: [errorCache],
    });

  const projectStructureCacheClean = projectStructureCache.filter(
    ({ filename }) => existsSync(filename),
  );

  const isErrorInCache = projectStructureCacheClean.some(
    (cache) => cache.errorMessage === errorCache.errorMessage,
  );

  if (isErrorInCache) return;

  createProjectStructureCacheFile({
    projectRoot,
    projectStructureCache: [errorCache, ...projectStructureCacheClean],
  });
};
