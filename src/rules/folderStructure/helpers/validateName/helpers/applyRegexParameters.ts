import { getDefaultRegexParameters } from "./getDefaultRegexParameters";
import { RegexParameters } from "../../../folderStructure.types";

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
    let currentRegex = regex;

    const defaultRegexParameters = getDefaultRegexParameters({
        parentName,
        regexParameters,
    });

    Object.keys(defaultRegexParameters).forEach(
        (key) =>
            (currentRegex = currentRegex.replaceAll(
                `{${key}}`,
                defaultRegexParameters[key],
            )),
    );

    return currentRegex;
};
