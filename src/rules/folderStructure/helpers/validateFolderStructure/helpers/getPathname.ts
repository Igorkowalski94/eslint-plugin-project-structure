import path, { sep } from "path";

interface GetPathnameProps {
  cwd: string;
  filename: string;
}

export const getPathname = ({ cwd, filename }: GetPathnameProps): string =>
  path.relative(cwd, filename).replaceAll(sep, "/");
