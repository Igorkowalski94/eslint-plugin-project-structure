import { FinalError } from "../../../errors/FinalError";

export const getInvalidRegexParametersError = (): FinalError =>
    new FinalError(
        `\n\n🔥 Property "regexParameters" is invalid. See documentation 'https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-folder-structure.md#regex-parameters'. 🔥\n\n`,
    );
