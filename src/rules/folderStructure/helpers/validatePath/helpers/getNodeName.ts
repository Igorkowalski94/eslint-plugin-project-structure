import { getFileNameWithoutExtension } from "./getFileNameWithoutExtension";
import { isFileFromPathname } from "../../isFileFromPathname";

interface GetNodeNameReturn {
    nodeName: string;
    fileNameWithExtension: string | undefined;
}

export const getNodeName = (pathname: string): GetNodeNameReturn => {
    const isFile = isFileFromPathname(pathname);

    const currentNodeName = pathname.split("/")[0];

    const nodeName = isFile
        ? getFileNameWithoutExtension(pathname)
        : currentNodeName;
    const fileNameWithExtension = isFile ? currentNodeName : undefined;

    return { nodeName, fileNameWithExtension };
};
