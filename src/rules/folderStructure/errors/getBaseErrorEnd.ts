import { FinalError } from "../../../errors/FinalError";

interface GetBaseErrorEndProps {
    errorMessage: string;
    nodePath: string;
}

export const getBaseErrorEnd = ({
    errorMessage,
    nodePath,
}: GetBaseErrorEndProps): FinalError =>
    new FinalError(`${errorMessage}].\nLocation      = ${nodePath} \n\n`);
