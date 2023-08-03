import { FinalError } from "../../../errors/FinalError/FinalError";
import { Extension } from "../../../types";

export const getFolderTypeWithExtensionError = (
    extension: Extension,
): FinalError =>
    new FinalError(
        `\n\n🔥 Property "extension": '${extension}' is only available in "folder" type. See documentation 'https://github.com/Igorkowalski94/eslint-plugin-project-structure#extension'. 🔥\n\n`,
    );
