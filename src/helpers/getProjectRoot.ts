import path, { dirname, sep } from "path";

interface GetProjectRootProps {
  cwd: string;
  projectRootConfig?: string;
}

export const getProjectRoot = ({
  cwd,
  projectRootConfig,
}: GetProjectRootProps): string => {
  const dirnameSplit = dirname(__filename).split(sep);

  const indexOfNodeModules = dirnameSplit.indexOf("node_modules");

  if (indexOfNodeModules === -1) return cwd;

  const rootPath = dirnameSplit.slice(0, indexOfNodeModules).join(sep);

  if (!projectRootConfig) return rootPath;

  return path.resolve(rootPath, projectRootConfig);
};
