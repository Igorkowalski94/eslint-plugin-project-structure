import { getNameError } from "rules/folderStructure/errors/getNameError";
import { getNodeTypeError } from "rules/folderStructure/errors/getNodeTypeError";
import {
  Rule,
  FolderStructureConfig,
} from "rules/folderStructure/folderStructure.types";
import { checkNodeExistence } from "rules/folderStructure/helpers/validateFolderStructure/helpers/checkNodeExistence";
import { getNodePath } from "rules/folderStructure/helpers/validateFolderStructure/helpers/getNodePath";
import { getRule } from "rules/folderStructure/helpers/validateFolderStructure/helpers/getRule";
import { getChildren } from "rules/folderStructure/helpers/validateFolderStructure/helpers/validatePath/helpers/getChildren/getChildren";
import { getNextPathname } from "rules/folderStructure/helpers/validateFolderStructure/helpers/validatePath/helpers/getNextPathname";
import { getNodeAllowedNames } from "rules/folderStructure/helpers/validateFolderStructure/helpers/validatePath/helpers/getNodeAllowedNames";
import { getNodeName } from "rules/folderStructure/helpers/validateFolderStructure/helpers/validatePath/helpers/getNodeName";
import { getNodeRule } from "rules/folderStructure/helpers/validateFolderStructure/helpers/validatePath/helpers/getNodeRule";
import { getNodeType } from "rules/folderStructure/helpers/validateFolderStructure/helpers/validatePath/helpers/getNodeType";

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
  const { rules, regexParameters } = config;

  const nodeName = getNodeName(pathname);
  const nodeType = getNodeType(pathname);
  const nodeChildren = getChildren({
    children: rule.children,
    rules,
  });

  if (!nodeChildren?.length) return;

  const nodeRule = getNodeRule({
    nodeName,
    nodeType,
    children: nodeChildren,
    folderName,
    regexParameters,
  });

  const nodePath = getNodePath({ filenameWithoutCwd, nodeName, pathname });

  if (!nodeRule) {
    const allowedNames = getNodeAllowedNames({
      nodeType,
      children: nodeChildren,
      folderName,
    });

    if (!allowedNames.length)
      throw getNodeTypeError({ nodePath, nodeType, nodeName });

    throw getNameError({ allowedNames, nodeName, nodePath, nodeType });
  }

  const { children, enforceExistence, name } = getRule({
    rule: nodeRule,
    rules,
  });

  if (enforceExistence)
    checkNodeExistence({
      enforceExistence,
      nodeName,
      cwd,
      nodePath,
      nodeType,
    });

  if (children) {
    const nextPathname = getNextPathname({ pathname, nodeName });

    validatePath({
      pathname: nextPathname,
      filenameWithoutCwd,
      folderName: nodeName,
      rule: { name, enforceExistence, children },
      config,
      cwd,
    });
  }
};
