import { writeFileSync } from "fs";
import path from "path";

import { PROJECT_STRUCTURE_CACHE_FILE_NAME } from "consts";
import { ProjectStructureCache } from "types";

interface CreateProjectStructureCacheFileProps {
  projectStructureCache: ProjectStructureCache;
  cwd: string;
}

export const createProjectStructureCacheFile = ({
  cwd,
  projectStructureCache,
}: CreateProjectStructureCacheFileProps): void => {
  const filePath = path.join(cwd, PROJECT_STRUCTURE_CACHE_FILE_NAME);
  const jsonData = JSON.stringify(projectStructureCache, null, 2);

  writeFileSync(filePath, jsonData, "utf8");
};
