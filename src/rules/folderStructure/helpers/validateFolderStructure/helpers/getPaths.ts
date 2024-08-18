import path, { sep } from "path";

interface GetPathsProps {
  cwd: string;
  filename: string;
  rootFolderName: string;
}

interface GetPathsReturn {
  pathname: string;
  filenameWithoutCwd: string;
}

export const getPaths = ({
  cwd,
  filename,
  rootFolderName,
}: GetPathsProps): GetPathsReturn => {
  const filenameWithoutCwd = path.relative(cwd, filename).replaceAll(sep, "/");

  const pathname = path
    .join(rootFolderName, filenameWithoutCwd)
    .replaceAll(sep, "/");

  return {
    pathname,
    filenameWithoutCwd,
  };
};
