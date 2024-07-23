import { FinalError } from "../../../errors/FinalError";

export const getInvalidTypeError = (rule: unknown): FinalError =>
    new FinalError(
        `\n\n🔥 Cannot use "children" together with "extension". rule: ${JSON.stringify(
            rule,
        )}. See documentation 'https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-folder-structure.md#children'. 🔥\n\n`,
    );
