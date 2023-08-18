import { FinalError } from "../../../errors/FinalError/FinalError";

export const getInvalidRulesError = (): FinalError =>
    new FinalError(
        `\n\n🔥 Property "rules" is invalid. See documentation 'https://github.com/Igorkowalski94/eslint-plugin-project-structure#rules'. 🔥\n\n`,
    );
