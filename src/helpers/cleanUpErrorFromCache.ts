import { existsSync, unlinkSync } from "fs";
import path from "path";

import { PROJECT_STRUCTURE_CACHE_FILE_NAME } from "consts";

import { createProjectStructureCacheFile } from "helpers/createProjectStructureCacheFile";
import { readProjectStructureCacheFile } from "helpers/readProjectStructureCacheFile";

interface CleanUpErrorFromCacheProps {
  filename: string;
  projectRoot: string;
}

export const cleanUpErrorFromCache = ({
  projectRoot,
  filename,
}: CleanUpErrorFromCacheProps): void => {
  const projectStructureCache = readProjectStructureCacheFile(projectRoot);

  if (!projectStructureCache) return;

  const projectStructureCacheClean = projectStructureCache.filter(
    (cache) => filename !== cache.filename && existsSync(cache.filename),
  );

  if (!projectStructureCacheClean.length)
    return unlinkSync(
      path.join(projectRoot, PROJECT_STRUCTURE_CACHE_FILE_NAME),
    );

  createProjectStructureCacheFile({
    projectRoot,
    projectStructureCache: projectStructureCacheClean,
  });
};
