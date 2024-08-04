import { NodeType } from "../folderStructure.types";

interface GetBaseErrorStartProps {
    nodeType: NodeType;
    nodeName: string;
}

export const getBaseErrorStart = ({
    nodeName,
    nodeType,
}: GetBaseErrorStartProps): string =>
    `🔥 ${nodeType} '${nodeName}' is invalid. 🔥\n\n`;
