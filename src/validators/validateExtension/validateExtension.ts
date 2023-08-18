import { getExtensionError } from "./helpers/getExtensionError";
import { getInvalidExtensionError } from "./helpers/getInvalidExtensionError";
import { ALL_EXTENSIONS } from "./validateExtension.consts";
import { Extension } from "../../types";

export const validateExtension = (
    fileName: string,
    extension: Extension,
): void => {
    if (extension === ALL_EXTENSIONS) return;

    if (
        (typeof extension !== "string" && !Array.isArray(extension)) ||
        (Array.isArray(extension) &&
            extension.some((ext) => !ext || typeof ext !== "string"))
    )
        throw getInvalidExtensionError(extension);

    if (typeof extension === "string") {
        if (!fileName.endsWith(extension))
            throw getExtensionError(fileName, extension);

        return;
    }

    if (
        !extension.includes(ALL_EXTENSIONS) &&
        !extension.some((ext) => fileName.endsWith(ext))
    )
        throw getExtensionError(fileName, extension);
};
