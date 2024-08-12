import {
  Rule,
  FolderStructureConfig,
} from "rules/folderStructure/folderStructure.types";
import { checkNodeExistence } from "rules/folderStructure/helpers/checkNodeExistence";
import { getNodeName } from "rules/folderStructure/helpers/getNodeName";
import { getRule } from "rules/folderStructure/helpers/getRule";
import { validateChildren } from "rules/folderStructure/helpers/validateChildren/validateChildren";
import { validateName } from "rules/folderStructure/helpers/validateName/validateName";

interface ValidatePathProps {
  pathname: string;
  filenameWithoutCwd: string;
  parentName: string;
  rule: Rule;
  config: FolderStructureConfig;
  cwd: string;
}

export const validatePath = ({
  pathname,
  filenameWithoutCwd,
  parentName,
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
      parentName,
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
