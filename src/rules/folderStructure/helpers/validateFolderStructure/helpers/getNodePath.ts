interface GetNodePathProps {
  filenameWithoutCwd: string;
  nodeName: string;
  pathname: string;
}

export const getNodePath = ({
  filenameWithoutCwd,
  nodeName,
  pathname,
}: GetNodePathProps): string =>
  filenameWithoutCwd.replace(pathname, "") + nodeName;
