import { sep } from "path";

export const removeProjectRootFromPath = (
  path: string,
  projectRootWithBaseUrl: string,
): string => path.replace(projectRootWithBaseUrl + sep, "").replace(/\\/g, "/");
