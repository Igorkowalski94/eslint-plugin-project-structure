import { FinalError } from "../../../errors/FinalError/FinalError";

export const getInvalidStructureError = (): FinalError =>
    new FinalError(
        `\n\n🔥 Property "structure" is invalid. See documentation 'https://github.com/Igorkowalski94/eslint-plugin-project-structure#structure'. 🔥\n\n`,
    );
