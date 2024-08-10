import { RuleError } from "rules/folderStructure/errors/RuleError";

interface GetAllowedNamesErrorProps {
    error: RuleError;
    allowedNamesCount: number;
}

export const getAllowedNamesError = ({
    allowedNamesCount,
    error,
}: GetAllowedNamesErrorProps): string => {
    if (allowedNamesCount === 0) return `Allowed names  = ${error.message}`;

    return `, ${error.message}`;
};
