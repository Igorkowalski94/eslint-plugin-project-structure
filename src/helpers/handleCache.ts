import { existsSync } from "fs";

import { ErrorCache } from "types";

import { createProjectStructureCacheFile } from "helpers/createProjectStructureCacheFile";
import { readProjectStructureCacheFile } from "helpers/readProjectStructureCacheFile";

interface HandleCacheProps {
  errorCache: ErrorCache;
  cwd: string;
}

export const handleCache = ({ cwd, errorCache }: HandleCacheProps): void => {
  const projectStructureCache = readProjectStructureCacheFile(cwd);

  if (!projectStructureCache)
    return createProjectStructureCacheFile({
      cwd,
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
    cwd,
    projectStructureCache: [errorCache, ...projectStructureCacheClean],
  });
};
