import path, { sep } from "path";

interface GetPathsProps {
    cwd: string;
    filename: string;
}

interface GetPathsReturn {
    pathname: string;
    filenameWithoutCwd: string;
}

export const getPaths = ({ cwd, filename }: GetPathsProps): GetPathsReturn => {
    const filenameWithoutCwd = path
        .relative(cwd, filename)
        .replaceAll(sep, "/");

    const pathname = path
        .join("structure", filenameWithoutCwd)
        .replaceAll(sep, "/");

    return {
        pathname,
        filenameWithoutCwd,
    };
};
