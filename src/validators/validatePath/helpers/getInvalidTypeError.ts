import { FinalError } from "../../../errors/FinalError/FinalError";

export const getInvalidTypeError = (): FinalError =>
    new FinalError(
        `\n\n🔥 Cannot use "children" together with "extension". See documentation 'https://github.com/Igorkowalski94/eslint-plugin-project-structure#children'. 🔥\n\n`,
    );
