interface GetNodePathProps {
  filenameWithoutCwd: string;
  nodeName: string;
}

export const getNodePath = ({
  filenameWithoutCwd,
  nodeName,
}: GetNodePathProps): string => {
  const nodeNameIndex = filenameWithoutCwd.split("/").lastIndexOf(nodeName);

  return filenameWithoutCwd
    .split("/")
    .slice(0, nodeNameIndex + 1)
    .join("/");
};
