import fs from "fs";
import path, { sep } from "path";

import { getRegexWithoutReferences } from "helpers/getRegexWithoutReferences/getRegexWithoutReferences";
import { transformStringToCase } from "helpers/transformStringToCase";

import { getNodeExistenceError } from "rules/folderStructure/errors/getNodeExistenceError";
import { NodeType } from "rules/folderStructure/folderStructure.types";

interface CheckNodeExistenceProps {
  cwd: string;
  nodeName: string;
  enforceExistence: string[];
  filenameWithoutCwd: string;
}

export const checkNodeExistence = ({
  enforceExistence,
  filenameWithoutCwd,
  nodeName,
  cwd,
}: CheckNodeExistenceProps): void => {
  const nodeNameType: NodeType = nodeName.includes(".") ? "File" : "Folder";
  const nodeNamePathIndex = filenameWithoutCwd.split("/").indexOf(nodeName);
  const nodeNamePath = filenameWithoutCwd
    .split("/")
    .slice(0, nodeNamePathIndex + 1)
    .join("/");
  const nodeNameDirname = path.dirname(nodeNamePath);
  const nodeNameWithoutExtension = nodeName.substring(
    0,
    nodeName.lastIndexOf("."),
  );
  const currentDirname =
    nodeNameType === "File" ? nodeNameDirname : nodeNamePath;

  const enforcedNodeNames = enforceExistence
    .map((enforcedNodeName) => {
      const enforcedNodeNameWithoutRef = getRegexWithoutReferences({
        regexParameters: {
          nodeName: transformStringToCase({
            str: nodeNameWithoutExtension,
            transformTo: "camelCase",
          }),
          NodeName: transformStringToCase({
            str: nodeNameWithoutExtension,
            transformTo: "PascalCase",
          }),
          "node-name": transformStringToCase({
            str: nodeNameWithoutExtension,
            transformTo: "kebab-case",
          }),
          node_name: transformStringToCase({
            str: nodeNameWithoutExtension,
            transformTo: "snake_case",
          }),
          NODE_NAME: transformStringToCase({
            str: nodeNameWithoutExtension,
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
    nodeNamePath,
  });
};
