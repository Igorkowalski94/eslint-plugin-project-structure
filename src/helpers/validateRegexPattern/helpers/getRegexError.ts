import { FinalError } from "../../../errors/FinalError/FinalError";

export const getIncorrectRegexError = (regex: string): FinalError =>
    new FinalError(
        `Incorrect regex '${regex}', correct it in your .projectStructurerc`,
    );
