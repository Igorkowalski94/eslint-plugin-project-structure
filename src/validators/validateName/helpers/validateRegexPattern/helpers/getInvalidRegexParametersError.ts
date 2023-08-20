import { FinalError } from "../../../../../errors/FinalError/FinalError";

export const getInvalidRegexParametersError = (): FinalError =>
    new FinalError(
        `\n\n🔥 Property "regexParameters" is invalid. See documentation 'https://github.com/Igorkowalski94/eslint-plugin-project-structure#regex-parameters'. 🔥\n\n`,
    );
