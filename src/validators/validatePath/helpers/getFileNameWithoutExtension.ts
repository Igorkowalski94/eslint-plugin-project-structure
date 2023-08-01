export const getFileNameWithoutExtension = (fileName: string): string =>
    fileName.replace(/\.[a-z]+$/, "");
