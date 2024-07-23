import { RuleError } from "./RuleError";
import { Extension } from "../folderStructure.types";

export const getExtensionError = (
    fileName: string,
    extension: Extension,
): RuleError =>
    new RuleError(
        `File name '${fileName}' should end with '${extension}'`,
        `end with '${extension}'`,
    );
