import { existsSync, unlinkSync } from "fs";
import path from "path";

import { PROJECT_STRUCTURE_CACHE_FILE_NAME } from "consts";

import { createProjectStructureCacheFile } from "helpers/createProjectStructureCacheFile";
import { readProjectStructureCacheFile } from "helpers/readProjectStructureCacheFile";

interface CleanUpErrorFromCacheProps {
  filename: string;
  cwd: string;
}

export const cleanUpErrorFromCache = ({
  cwd,
  filename,
}: CleanUpErrorFromCacheProps): void => {
  const projectStructureCache = readProjectStructureCacheFile(cwd);

  if (!projectStructureCache) return;

  const projectStructureCacheClean = projectStructureCache.filter(
    (cache) => filename !== cache.filename && existsSync(cache.filename),
  );

  if (!projectStructureCacheClean.length)
    return unlinkSync(path.join(cwd, PROJECT_STRUCTURE_CACHE_FILE_NAME));

  createProjectStructureCacheFile({
    cwd,
    projectStructureCache: projectStructureCacheClean,
  });
};
