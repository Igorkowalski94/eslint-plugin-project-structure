import fs from "fs";
import path, { sep } from "path";

import { getRegexWithoutReferences } from "helpers/getRegexWithoutReferences/getRegexWithoutReferences";
import { transformStringToCase } from "helpers/transformStringToCase";

import { getNodeExistenceError } from "rules/folderStructure/errors/getNodeExistenceError";
import { NodeType } from "rules/folderStructure/folderStructure.types";
import { getNodePath } from "rules/folderStructure/helpers/validateFolderStructure/helpers/getNodePath";

interface CheckNodeExistenceProps {
  cwd: string;
  nodeName: string;
  enforceExistence: string[];
  filenameWithoutCwd: string;
  nodeType: NodeType;
  pathname: string;
}

export const checkNodeExistence = ({
  enforceExistence,
  filenameWithoutCwd,
  nodeName,
  nodeType,
  cwd,
  pathname,
}: CheckNodeExistenceProps): void => {
  const nodePath = getNodePath({ filenameWithoutCwd, nodeName, pathname });
  const nodeDirname = path.dirname(nodePath);
  const currentNodeName =
    nodeName.substring(0, nodeName.lastIndexOf(".")) || nodeName;
  const currentDirname = nodeType === "File" ? nodeDirname : nodePath;

  const enforcedNodeNames = enforceExistence
    .map((enforcedNodeName) => {
      const enforcedNodeNameWithoutRef = getRegexWithoutReferences({
        regexParameters: {
          nodeName: transformStringToCase({
            str: currentNodeName,
            transformTo: "camelCase",
          }),
          NodeName: transformStringToCase({
            str: currentNodeName,
            transformTo: "PascalCase",
          }),
          "node-name": transformStringToCase({
            str: currentNodeName,
            transformTo: "kebab-case",
          }),
          node_name: transformStringToCase({
            str: currentNodeName,
            transformTo: "snake_case",
          }),
          NODE_NAME: transformStringToCase({
            str: currentNodeName,
            transformTo: "SNAKE_CASE",
          }),
        },
        regex: enforcedNodeName,
        key: "enforceExistence",
      });

      const enforcedNodeFullPath = path.join(
        cwd,
        currentDirname,
        enforcedNodeNameWithoutRef,
      );

      if (fs.existsSync(enforcedNodeFullPath)) return;

      return (
        "./" +
        path
          .join(currentDirname, enforcedNodeNameWithoutRef)
          .replaceAll(sep, "/")
      );
    })
    .filter((v): v is string => v !== undefined);

  if (!enforcedNodeNames.length) return;

  throw getNodeExistenceError({
    enforcedNodeNames,
    nodeName,
    nodeType,
    nodePath,
  });
};
