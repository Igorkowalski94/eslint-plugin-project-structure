import { getExtensionInvalidError } from "./helpers/getExtensionInvalidError";
import { Rule } from "../../types";

export const validateExtension = (
    fileName: string,
    { extension }: Rule,
): void => {
    if (!extension) return;

    if (typeof extension === "string") {
        if (!fileName.endsWith(extension))
            throw getExtensionInvalidError(fileName, extension);

        return;
    }

    if (!extension.some((ext) => fileName.endsWith(ext)))
        throw getExtensionInvalidError(fileName, extension);
};
