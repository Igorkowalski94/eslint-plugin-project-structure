import { FinalError } from "../../../errors/FinalError/FinalError";

export const getInvalidRuleError = (rule: unknown): FinalError =>
    new FinalError(
        `\n\n🔥 Property "rule": '${rule}' in "children" is invalid. See documentation 'https://github.com/Igorkowalski94/eslint-plugin-project-structure#children'. 🔥\n\n`,
    );
