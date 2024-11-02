interface GetNodePathProps {
  filenameWithoutProjectRoot: string;
  nodeName: string;
  pathname: string;
}

export const getNodePath = ({
  filenameWithoutProjectRoot,
  nodeName,
  pathname,
}: GetNodePathProps): string =>
  filenameWithoutProjectRoot.replace(pathname, "") + nodeName;
