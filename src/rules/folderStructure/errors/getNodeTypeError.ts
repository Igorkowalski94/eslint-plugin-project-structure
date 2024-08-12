import { FinalError } from "errors/FinalError";

import { NodeType } from "rules/folderStructure/folderStructure.types";

interface GetNodeTypeErrorProps {
  nodeType: NodeType;
  errorMessage: string;
  nodePath: string;
}

export const getNodeTypeError = ({
  errorMessage,
  nodePath,
  nodeType,
}: GetNodeTypeErrorProps): FinalError =>
  new FinalError(
    `${errorMessage}According to the structure it should be a ${nodeType === "File" ? "folder" : "file"}.\nError location = ./${nodePath}\n\n`,
  );
