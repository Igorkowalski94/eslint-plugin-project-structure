import { FinalError } from "../../../errors/FinalError";

export const getInvalidStructureError = (): FinalError =>
    new FinalError(
        `\n\n🔥 Property "structure" is invalid. See documentation 'https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-folder-structure.md#structure'. 🔥\n\n`,
    );
