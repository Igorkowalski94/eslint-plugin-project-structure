import {
  Rule,
  FolderStructureConfig,
} from "rules/folderStructure/folderStructure.types";
import { getNodeName } from "rules/folderStructure/helpers/getNodeName";
import { getRule } from "rules/folderStructure/helpers/getRule";
import { validateChildren } from "rules/folderStructure/helpers/validateChildren/validateChildren";
import { validateName } from "rules/folderStructure/helpers/validateName/validateName";
import { checkNodeExistence } from "rules/folderStructure/helpers/validatePath/helpers/checkNodeExistence";

interface ValidatePathProps {
  pathname: string;
  filenameWithoutCwd: string;
  folderName: string;
  rule: Rule;
  config: FolderStructureConfig;
  cwd: string;
}

export const validatePath = ({
  pathname,
  filenameWithoutCwd,
  folderName,
  rule,
  config,
  cwd,
}: ValidatePathProps): void => {
  const nodeName = getNodeName(pathname);
  const nodeRule = getRule({ rule, rules: config.rules });

  const { name, children, enforceExistence } = nodeRule;

  if (name)
    validateName({
      nodeName,
      ruleName: name,
      folderName,
      regexParameters: config.regexParameters,
    });

  if (enforceExistence)
    checkNodeExistence({
      enforceExistence,
      nodeName,
      cwd,
      filenameWithoutCwd,
    });

  if (children)
    validateChildren({
      pathname,
      filenameWithoutCwd,
      nodeName,
      children,
      config,
      cwd,
    });
};
