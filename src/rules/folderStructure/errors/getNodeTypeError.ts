import { FinalError } from "errors/FinalError";

import { getBaseError } from "rules/folderStructure/errors/getBaseError";
import { getLocationError } from "rules/folderStructure/errors/getLocationError";
import { NodeType } from "rules/folderStructure/folderStructure.types";

interface GetNodeTypeErrorProps {
  nodeType: NodeType;
  nodeName: string;
  nodePath: string;
  folderName: string;
}

export const getNodeTypeError = ({
  nodeName,
  nodePath,
  nodeType,
  folderName,
}: GetNodeTypeErrorProps): FinalError =>
  new FinalError(
    `${getBaseError({ nodeName, nodeType })}According to the structure, the '${folderName}' folder can only contain ${nodeType === "File" ? "folders" : "files"}.${getLocationError({ nodePath })}`,
  );
