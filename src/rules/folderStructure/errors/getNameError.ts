import { FinalError } from "errors/FinalError";

import { getBaseError } from "rules/folderStructure/errors/getBaseError";
import { getLocationError } from "rules/folderStructure/errors/getLocationError";
import { NodeType } from "rules/folderStructure/folderStructure.types";

interface GetNameErrorProps {
  nodeType: NodeType;
  nodeName: string;
  nodePath: string;
  allowedNames: string[];
}

export const getNameError = ({
  nodeName,
  nodePath,
  nodeType,
  allowedNames,
}: GetNameErrorProps): FinalError =>
  new FinalError(
    `${getBaseError({ nodeName, nodeType })}Allowed names  = ${allowedNames.join(", ")}${getLocationError({ nodePath })}`,
  );
