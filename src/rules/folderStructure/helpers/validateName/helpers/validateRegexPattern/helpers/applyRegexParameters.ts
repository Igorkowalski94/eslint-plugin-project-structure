import { getDefaultRegexParameters } from "./getDefaultRegexParameters";
import { getInvalidRegexParametersError } from "../../../../../errors/getInvalidRegexParametersError";
import { RegexParameters } from "../../../../../folderStructure.types";

interface ApplyRegexParametersProps {
    regex: string;
    parentName: string;
    regexParameters?: RegexParameters;
}

export const applyRegexParameters = ({
    regex,
    parentName,
    regexParameters,
}: ApplyRegexParametersProps): string => {
    if (
        regexParameters !== undefined &&
        (typeof regexParameters !== "object" || Array.isArray(regexParameters))
    )
        throw getInvalidRegexParametersError();

    let currentRegex = regex;

    const defaultRegexParameters = getDefaultRegexParameters(
        parentName,
        regexParameters,
    );

    Object.keys(defaultRegexParameters).forEach(
        (key) =>
            (currentRegex = currentRegex.replace(
                `{${key}}`,
                defaultRegexParameters[key],
            )),
    );

    return currentRegex;
};
