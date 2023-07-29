import { isIgnoredFile } from "../helpers/isIgnoredFile";
import { ProjectStructureConfig } from "../types";
import { validatePath } from "../validators/validatePath/validatePath";

export const fileStructureNode = (
  filePath: string,
  config: ProjectStructureConfig
) => {
  if (isIgnoredFile(filePath, config)) return;

  validatePath(filePath, "structure", config["structure"], config);
};
