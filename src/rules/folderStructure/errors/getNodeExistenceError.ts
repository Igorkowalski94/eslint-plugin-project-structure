import { FinalError } from "errors/FinalError";

import { getLocationError } from "rules/folderStructure/errors/getLocationError";
import { NodeType } from "rules/folderStructure/folderStructure.types";

interface GetNodeExistenceErrorProps {
  enforcedNodeNames: string[];
  nodeName: string;
  nodePath: string;
  nodeType: NodeType;
  message?: string;
}

export const getNodeExistenceError = ({
  enforcedNodeNames,
  nodeName,
  nodePath,
  nodeType,
  message,
}: GetNodeExistenceErrorProps): FinalError =>
  new FinalError(
    `🔥 ${nodeType} '${nodeName}' enforces the existence of other folders/files. 🔥\n\nEnforce existence = ${enforcedNodeNames.join(", ")}${getLocationError({ nodePath })}${message ?? ""}`,
  );
