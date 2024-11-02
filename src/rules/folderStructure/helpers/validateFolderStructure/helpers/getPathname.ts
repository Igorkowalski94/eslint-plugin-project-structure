import path, { sep } from "path";

interface GetPathnameProps {
  root: string;
  filename: string;
}

export const getPathname = ({ root, filename }: GetPathnameProps): string =>
  path.relative(root, filename).replaceAll(sep, "/");
