import path, { sep } from "path";

interface GetNodePathWithStructureRootProps {
  structureRoot?: string;
  nodePath: string;
}

export const getNodePathWithStructureRoot = ({
  nodePath,
  structureRoot,
}: GetNodePathWithStructureRootProps): string =>
  path.join(structureRoot ?? "", nodePath).replaceAll(sep, "/");
