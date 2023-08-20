import { getDefaultRegexParameters } from "./getDefaultRegexParameters";
import { getInvalidRegexParametersError } from "./getInvalidRegexParametersError";
import { RegexParameters } from "../../../../../types";

interface ApplyRegexParameters {
    regex: string;
    parentName: string;
    regexParameters?: RegexParameters;
}

export const applyRegexParameters = ({
    regex,
    parentName,
    regexParameters,
}: ApplyRegexParameters): string => {
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

    Object.keys(defaultRegexParameters).map(
        (key) =>
            (currentRegex = currentRegex.replace(
                `\${{${key}}}`,
                defaultRegexParameters[key],
            )),
    );

    return currentRegex;
};
