import { Rule } from "../../types";
import { throwExtensionInvalid } from "../../validators/validateExtension/helpers/throwExtensionInvalid";

export const validateExtension = (nodeName: string, { extension }: Rule) => {
  const isFile = nodeName.includes(".");

  if (!isFile || !extension) return;

  if (typeof extension === "string") {
    if (!nodeName.endsWith(extension))
      throwExtensionInvalid(nodeName, extension);

    return;
  }

  if (!extension.some((ext) => nodeName.endsWith(ext)))
    throwExtensionInvalid(nodeName, extension);

  return;
};
