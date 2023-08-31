export const isFileFromPathname = (pathname: string): boolean =>
    !(pathname.includes("/") || pathname.includes("\\"));
