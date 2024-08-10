import { FinalError } from "errors/FinalError";

import { NodeType } from "rules/folderStructure/folderStructure.types";

interface GetNodeExistenceErrorProps {
    enforcedNodeNames: string[];
    nodeName: string;
    nodeNamePath: string;
}

export const getNodeExistenceError = ({
    enforcedNodeNames,
    nodeName,
    nodeNamePath,
}: GetNodeExistenceErrorProps): FinalError => {
    const nodeType: NodeType = nodeName.includes(".") ? "File" : "Folder";

    return new FinalError(
        `🔥 ${nodeType} '${nodeName}' enforces the existence of other folders/files. 🔥\n\nEnforce existence = ${enforcedNodeNames.join(", ")}\nError location    = ./${nodeNamePath}\n\n`,
    );
};
