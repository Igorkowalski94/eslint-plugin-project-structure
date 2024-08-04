import { isFile } from "./isFile";
import { NodeType } from "../folderStructure.types";

export const getNodeType = (nodeName: string): NodeType =>
    isFile(nodeName) ? "File" : "Folder";
