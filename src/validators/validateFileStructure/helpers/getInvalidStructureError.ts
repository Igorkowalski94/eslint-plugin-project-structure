import { FinalError } from "../../../errors/FinalError/FinalError";

export const getInvalidStructureError = (structure: unknown): FinalError =>
    new FinalError(
        `\n\n🔥 Property "structure": '${structure}' is invalid. See documentation 'https://github.com/Igorkowalski94/eslint-plugin-project-structure#structure'. 🔥\n\n`,
    );
