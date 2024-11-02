import { readFileSync } from "fs";
import path from "path";

import { PROJECT_STRUCTURE_CACHE_FILE_NAME } from "consts";
import { ProjectStructureCache } from "types";

export const readProjectStructureCacheFile = (
  projectRoot: string,
): ProjectStructureCache | undefined => {
  try {
    return JSON.parse(
      readFileSync(
        path.join(projectRoot, PROJECT_STRUCTURE_CACHE_FILE_NAME),
        "utf-8",
      ),
    ) as ProjectStructureCache | undefined;
  } catch (_e) {
    return;
  }
};
