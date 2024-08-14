import { sep } from "path";

export const getFileNameWithoutExtension = (filenamePath: string): string => {
  const fileNameWithExtension = filenamePath.split(sep).reverse()[0];

  return fileNameWithExtension.substring(
    0,
    fileNameWithExtension.lastIndexOf("."),
  );
};
