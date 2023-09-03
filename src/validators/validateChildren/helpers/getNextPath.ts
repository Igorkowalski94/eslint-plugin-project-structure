export const getNextPathname = (pathname: string, nodeName: string): string =>
    pathname.replace(`${nodeName}/`, "");
