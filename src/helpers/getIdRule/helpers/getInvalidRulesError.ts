import { FinalError } from "../../../errors/FinalError/FinalError";

export const getInvalidRulesError = (rules: unknown): FinalError =>
    new FinalError(
        `\n\n🔥 Property "rules": '${rules}' is invalid. See documentation 'https://github.com/Igorkowalski94/eslint-plugin-project-structure#rules'. 🔥\n\n`,
    );
