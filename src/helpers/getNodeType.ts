import { isFileFromNodeName } from "./isFileFromNodeName";
import { NodeType } from "../types";

export const getNodeType = (nodeName: string): NodeType =>
    isFileFromNodeName(nodeName) ? "File" : "Folder";
