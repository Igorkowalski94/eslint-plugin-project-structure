import path from "path";

export const getFileNameWithoutExtension = (filenamePath: string): string => {
  const fileNameWithExtension = path.basename(filenamePath);

  return fileNameWithExtension.substring(
    0,
    fileNameWithExtension.lastIndexOf("."),
  );
};
