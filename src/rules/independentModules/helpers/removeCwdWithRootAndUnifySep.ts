export const removeCwdWithRootAndUnifySep = (
    path: string,
    cwdWithRoot: string,
): string => path.replace(cwdWithRoot, "").replace(/\\/g, "/");
