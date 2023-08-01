import { getIsFileFromNodeName } from "./getIsFileFromNodeName";
import { Type } from "../types";

export const getNodeType = (nodeName: string): Type =>
    getIsFileFromNodeName(nodeName) ? "file" : "folder";
