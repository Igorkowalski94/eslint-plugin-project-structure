import { ProjectStructureConfig } from "../types";

export const isIgnoredFile = (
  filePath: string,
  config: ProjectStructureConfig
) => {
  if (!config.ignorePatterns) return;

  return config.ignorePatterns.some((pattern) =>
    new RegExp(pattern).test(filePath)
  );
};
