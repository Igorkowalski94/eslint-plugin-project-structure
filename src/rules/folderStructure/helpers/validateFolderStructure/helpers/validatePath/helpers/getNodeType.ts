import { NodeType } from "rules/folderStructure/folderStructure.types";

export const getNodeType = (nodeName: string): NodeType =>
  !nodeName.includes("/") ? "File" : "Folder";
