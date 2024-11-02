import path, { sep } from "path";

interface GetProjectRootWithBaseUrlProps {
  projectRoot: string;
  baseUrl?: string;
}

export const getProjectRootWithBaseUrl = ({
  projectRoot,
  baseUrl,
}: GetProjectRootWithBaseUrlProps): string => {
  if (!baseUrl) return projectRoot + sep;

  return path.join(projectRoot, baseUrl) + sep;
};
