import { getExtensionError } from "./helpers/getExtensionError";
import { getInvalidExtensionError } from "./helpers/getInvalidExtensionError";
import { Extension } from "../../types";

export const validateExtension = (
    fileName: string,
    extension: Extension,
): void => {
    if (typeof extension !== "string" && !Array.isArray(extension))
        throw getInvalidExtensionError(extension);

    if (typeof extension === "string") {
        if (!fileName.endsWith(extension))
            throw getExtensionError(fileName, extension);

        return;
    }

    if (!extension.some((ext) => fileName.endsWith(ext)))
        throw getExtensionError(fileName, extension);
};
