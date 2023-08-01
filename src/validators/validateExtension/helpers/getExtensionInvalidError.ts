import { RuleError } from "../../../errors/RuleError/RuleError";
import { Extension } from "../../../types";

export const getExtensionInvalidError = (
    fileName: string,
    extension: Extension,
): RuleError =>
    new RuleError(
        `File name '${fileName}' should end with '${extension}'`,
        `end with '${extension}'`,
    );
