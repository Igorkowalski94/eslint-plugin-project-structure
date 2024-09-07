import { NodeType } from "rules/folderStructure/folderStructure.types";

interface GetBaseErrorProps {
  nodeType: NodeType;
  nodeName: string;
}

export const getBaseError = ({
  nodeName,
  nodeType,
}: GetBaseErrorProps): string =>
  `🔥 ${nodeType} '${nodeName}' is invalid. 🔥\n\n`;
