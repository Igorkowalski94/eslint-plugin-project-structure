import { getNameError } from "rules/folderStructure/errors/getNameError";
import { getNodeTypeError } from "rules/folderStructure/errors/getNodeTypeError";
import {
  Rule,
  FolderStructureConfig,
} from "rules/folderStructure/folderStructure.types";
import { checkNodeExistence } from "rules/folderStructure/helpers/validateFolderStructure/helpers/checkNodeExistence";
import { getNodePath } from "rules/folderStructure/helpers/validateFolderStructure/helpers/getNodePath";
import { getNodePathWithStructureRoot } from "rules/folderStructure/helpers/validateFolderStructure/helpers/getNodePathWithStructureRoot";
import { getRule } from "rules/folderStructure/helpers/validateFolderStructure/helpers/getRule";
import { getChildren } from "rules/folderStructure/helpers/validateFolderStructure/helpers/validatePath/helpers/getChildren/getChildren";
import { getNextPathname } from "rules/folderStructure/helpers/validateFolderStructure/helpers/validatePath/helpers/getNextPathname";
import { getNodeAllowedNames } from "rules/folderStructure/helpers/validateFolderStructure/helpers/validatePath/helpers/getNodeAllowedNames";
import { getNodeName } from "rules/folderStructure/helpers/validateFolderStructure/helpers/validatePath/helpers/getNodeName";
import { getNodeRule } from "rules/folderStructure/helpers/validateFolderStructure/helpers/validatePath/helpers/getNodeRule";
import { getNodeType } from "rules/folderStructure/helpers/validateFolderStructure/helpers/validatePath/helpers/getNodeType";

interface ValidatePathProps {
  pathname: string;
  filenameWithoutProjectRoot: string;
  folderName: string;
  rule: Rule;
  config: FolderStructureConfig;
  structureRoot: string;
  projectRoot: string;
}

export const validatePath = ({
  pathname,
  filenameWithoutProjectRoot,
  folderName,
  rule,
  config,
  structureRoot,
  projectRoot,
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

  const nodePath = getNodePath({
    filenameWithoutProjectRoot,
    nodeName,
    pathname,
  });

  if (!nodeRule) {
    const allowedNames = getNodeAllowedNames({
      nodeType,
      children: nodeChildren,
      folderName,
    });

    const nodePathWithStructureRoot = getNodePathWithStructureRoot({
      nodePath,
      structureRoot: config.structureRoot,
    });

    if (!allowedNames.length)
      throw getNodeTypeError({
        nodePath: nodePathWithStructureRoot,
        nodeType,
        nodeName,
        folderName,
      });

    throw getNameError({
      allowedNames,
      nodeName,
      nodePath: nodePathWithStructureRoot,
      nodeType,
    });
  }

  const { children, enforceExistence, name } = getRule({
    rule: nodeRule,
    rules,
  });

  if (enforceExistence)
    checkNodeExistence({
      enforceExistence,
      nodeName,
      structureRoot,
      nodePath,
      nodeType,
      structureRootConfig: config.structureRoot,
      projectRoot,
    });

  if (children) {
    const nextPathname = getNextPathname({ pathname, nodeName });

    validatePath({
      pathname: nextPathname,
      filenameWithoutProjectRoot,
      folderName: nodeName,
      rule: { name, enforceExistence, children },
      config,
      structureRoot,
      projectRoot,
    });
  }
};
