import { NodeType } from "rules/folderStructure/folderStructure.types";
import { isFile } from "rules/folderStructure/helpers/isFile";

export const getNodeType = (nodeName: string): NodeType =>
    isFile(nodeName) ? "File" : "Folder";
