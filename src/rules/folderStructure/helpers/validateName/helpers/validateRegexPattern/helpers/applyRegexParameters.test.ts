import { applyRegexParameters } from "./applyRegexParameters";
import { getInvalidRegexParametersError } from "../../../../../errors/getInvalidRegexParametersError";
import { RegexParameters } from "../../../../../folderStructure.types";

describe("applyRegexParameters", () => {
    it.each([0, 1, "", "1", []])(
        "should throw error when regexParameters are invalid, regexParameters =  %s",
        (regexParameters) => {
            expect(() =>
                applyRegexParameters({
                    parentName: "parentName",
                    regex: "",
                    regexParameters:
                        regexParameters as unknown as RegexParameters,
                }),
            ).toThrow(getInvalidRegexParametersError());
        },
    );
});
