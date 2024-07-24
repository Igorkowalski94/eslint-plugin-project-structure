import { replaceReferencesWithData } from "./replaceReferencesWithData";
import {
    CAMEL_CASE,
    PASCAL_CASE,
    SNAKE_CASE_LOWER,
    SNAKE_CASE_UPPER,
} from "../../../consts";
import { NamingRule } from "../namingRules.types";

describe("replaceReferencesWithData", () => {
    test.each<{
        filenameWithoutParts: string;
        allowNames?: NamingRule["allowNames"];
        expected: NamingRule["allowNames"];
        ignoreFilenameReferences: boolean;
    }>([
        {
            filenameWithoutParts: "component-name",
            ignoreFilenameReferences: false,
            expected: [`/^${CAMEL_CASE}$/`, `/^${PASCAL_CASE}$/`],
        },

        {
            filenameWithoutParts: "componentName",
            ignoreFilenameReferences: false,
            allowNames: [
                "/^{PascalCase}$/",
                "/^{camelCase}$/",
                "/^{snake_case}$/",
                "/^{SNAKE_CASE}$/",
            ],
            expected: [
                `/^${PASCAL_CASE}$/`,
                `/^${CAMEL_CASE}$/`,
                `/^${SNAKE_CASE_LOWER}$/`,
                `/^${SNAKE_CASE_UPPER}$/`,
            ],
        },

        {
            filenameWithoutParts: "componentName",
            ignoreFilenameReferences: true,
            allowNames: [
                "/^{filename_PascalCase}$/",
                "/^{filename_PascalCase}Props$/",
                "/^{filename_PascalCase}Return$/",
            ],
            expected: [],
        },
        {
            filenameWithoutParts: "helperName1",
            ignoreFilenameReferences: false,
            allowNames: [
                "/^{filename_camelCase}$/",
                "/^{filename_snake_case}$/",
                "/^{filename_SNAKE_CASE}$/",
                "/^{filename_PascalCase}Props$/",
                "/^{filename_PascalCase}Return$/",
            ],
            expected: [
                "/^helperName1$/",
                "/^helper_name_1$/",
                "/^HELPER_NAME_1$/",
                "/^HelperName1Props$/",
                "/^HelperName1Return$/",
            ],
        },
    ])(
        "Should return correct values for %o",
        ({
            allowNames,
            filenameWithoutParts,
            ignoreFilenameReferences,
            expected,
        }) => {
            expect(
                replaceReferencesWithData({
                    allowNames,
                    filenameWithoutParts,
                    ignoreFilenameReferences,
                }),
            ).toEqual(expected);
        },
    );
});
