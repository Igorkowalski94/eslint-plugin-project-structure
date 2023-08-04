import { getIsFileFromNodeName } from "./getIsFileFromNodeName";
import { NodeType } from "../types";

export const getNodeType = (nodeName: string): NodeType =>
    getIsFileFromNodeName(nodeName) ? "File" : "Folder";
