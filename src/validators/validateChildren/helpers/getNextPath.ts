import { sep } from "path";

export const getNextPath = (pathname: string, nodeName: string): string =>
    pathname.replace(`${nodeName}${sep}`, "");
