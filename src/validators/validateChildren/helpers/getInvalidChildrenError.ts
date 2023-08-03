import { FinalError } from "../../../errors/FinalError/FinalError";

export const getInvalidChildrenError = (children: unknown): FinalError =>
    new FinalError(
        `\n\n🔥 Property "children": '${children}' is invalid. See documentation 'https://github.com/Igorkowalski94/eslint-plugin-project-structure#children'. 🔥\n\n`,
    );
