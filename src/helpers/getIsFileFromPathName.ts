export const getIsFileFromPathname = (pathname: string): boolean =>
    !(pathname.includes("/") || pathname.includes("\\"));
