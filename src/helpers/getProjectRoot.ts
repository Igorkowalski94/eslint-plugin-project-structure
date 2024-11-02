import path, { dirname, sep } from "path";

export const getProjectRoot = (projectRootConfig?: string): string => {
  const dirnameSplit = dirname(__filename).split(sep);

  const indexOfNodeModules = dirnameSplit.indexOf("node_modules");
  const rootPath = dirnameSplit.slice(0, indexOfNodeModules).join(sep);

  if (!projectRootConfig) return rootPath;

  return path.resolve(rootPath, projectRootConfig);
};
