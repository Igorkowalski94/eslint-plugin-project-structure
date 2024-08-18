import path, { sep } from "path";

interface GetCwdWithBaseUrlProps {
  cwd: string;
  baseUrl?: string;
}

export const getCwdWithBaseUrl = ({
  cwd,
  baseUrl,
}: GetCwdWithBaseUrlProps): string => {
  if (!baseUrl) return cwd + sep;

  return path.join(cwd, baseUrl) + sep;
};
