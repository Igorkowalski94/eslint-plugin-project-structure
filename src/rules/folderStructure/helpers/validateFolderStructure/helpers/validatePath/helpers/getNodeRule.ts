import { RegexParameters } from "types";

import { NodeType, Rule } from "rules/folderStructure/folderStructure.types";
import { validateName } from "rules/folderStructure/helpers/validateFolderStructure/helpers/validatePath/helpers/validateName/validateName";

interface GetNodeRuleProps {
  children?: Rule[];
  nodeName: string;
  nodeType: NodeType;
  folderName: string;
  regexParameters?: RegexParameters;
}

export const getNodeRule = ({
  children,
  nodeName,
  nodeType,
  folderName,
  regexParameters,
}: GetNodeRuleProps): Rule | undefined =>
  children?.find(({ name, children }) => {
    if (!name) return false;
    if (nodeType === "File" && children) return false;
    if (nodeType === "Folder" && !children) return false;

    return validateName({
      folderName,
      nodeName,
      ruleName: name,
      regexParameters,
    });
  });
