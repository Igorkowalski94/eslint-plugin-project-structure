import { getAllowNamesWithoutFileRef } from "./getAllowNamesWithoutFileRef";
import { NamingRule } from "../namingRules.types";

describe("getAllowNamesWithoutFileRef", () => {
    test.each<{
        allowNames: NamingRule["allowNames"];
        ignoreFilenameReferences: boolean;
        expected: NamingRule["allowNames"];
    }>([
        {
            allowNames: [],
            ignoreFilenameReferences: false,
            expected: [],
        },
        {
            allowNames: undefined,
            ignoreFilenameReferences: false,
            expected: undefined,
        },

        {
            allowNames: undefined,
            ignoreFilenameReferences: true,
            expected: undefined,
        },

        {
            allowNames: [
                "/^{camelCase}$/",
                "/^{filename_camelCase}$/",
                "/^{filename_snake_case}$/",
                "/^{filename_SNAKE_CASE}$/",
                "/^{filename_PascalCase}Props$/",
                "/^{filename_PascalCase}Return$/",
            ],
            ignoreFilenameReferences: true,
            expected: ["/^{camelCase}$/"],
        },
    ])(
        "Should return correct value for = %o",
        ({ allowNames, ignoreFilenameReferences, expected }) => {
            expect(
                getAllowNamesWithoutFileRef({
                    allowNames,
                    ignoreFilenameReferences,
                }),
            ).toEqual(expected);
        },
    );
});
