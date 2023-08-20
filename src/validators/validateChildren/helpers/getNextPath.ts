import { sep } from "path";

export const getNextPathname = (pathname: string, nodeName: string): string =>
    pathname.replace(`${nodeName}${sep}`, "");
