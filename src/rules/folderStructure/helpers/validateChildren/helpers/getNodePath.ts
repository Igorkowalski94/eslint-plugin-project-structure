interface GetNodePathProps {
  filenameWithoutCwd: string;
  nodeName: string;
}

export const getNodePath = ({
  filenameWithoutCwd,
  nodeName,
}: GetNodePathProps): string => {
  const nodeNameIndex = filenameWithoutCwd.split("/").indexOf(nodeName);

  return `${filenameWithoutCwd.split("/").slice(0, nodeNameIndex).join("/")}/${nodeName}`;
};
