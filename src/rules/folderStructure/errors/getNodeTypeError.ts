import { FinalError } from "errors/FinalError";

import { getBaseError } from "rules/folderStructure/errors/getBaseError";
import { getLocationError } from "rules/folderStructure/errors/getLocationError";
import { NodeType } from "rules/folderStructure/folderStructure.types";

interface GetNodeTypeErrorProps {
  nodeType: NodeType;
  nodeName: string;
  nodePath: string;
}

export const getNodeTypeError = ({
  nodeName,
  nodePath,
  nodeType,
}: GetNodeTypeErrorProps): FinalError =>
  new FinalError(
    `${getBaseError({ nodeName, nodeType })}According to the structure it should be a ${nodeType === "File" ? "folder" : "file"}.${getLocationError({ nodePath })}`,
  );
