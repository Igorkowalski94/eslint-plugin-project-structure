import { sep } from "path";

import { getFileNameWithoutExtension } from "./getFileNameWithoutExtension";
import { getIsFileFromPathname } from "../../../helpers/getIsFileFromPathName";

interface GetNodeNameReturn {
    nodeName: string;
    fileNameWithExtension: string | undefined;
}

export const getNodeName = (pathname: string): GetNodeNameReturn => {
    const isFile = getIsFileFromPathname(pathname);

    const currentNodeName = pathname.split(sep)[0];

    const nodeName = isFile
        ? getFileNameWithoutExtension(pathname)
        : currentNodeName;
    const fileNameWithExtension = isFile ? currentNodeName : undefined;

    return { nodeName, fileNameWithExtension };
};
