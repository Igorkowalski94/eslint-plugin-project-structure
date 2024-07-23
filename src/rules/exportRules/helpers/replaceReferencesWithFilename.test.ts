import { replaceReferenceWithFilename } from "./replaceReferencesWithFilename";
import {
    CAMEL_CASE,
    PASCAL_CASE,
    SNAKE_CASE_LOWER,
    SNAKE_CASE_UPPER,
} from "../../../consts";
import { ExportRules } from "../exportRules.types";

describe("replaceReferenceWithFilename", () => {
    test.each<{
        filenameWithoutParts: string;
        allowExportNames?: ExportRules["allowExportNames"];
        expected: ExportRules["allowExportNames"];
    }>([
        {
            filenameWithoutParts: "component-name",
            expected: ["/^ComponentName$/", "/^componentName$/"],
        },

        {
            filenameWithoutParts: "componentName",
            allowExportNames: [
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
            allowExportNames: [
                "/^{filename_PascalCase}$/",
                "/^{filename_PascalCase}Props$/",
                "/^{filename_PascalCase}Return$/",
            ],
            expected: [
                "/^ComponentName$/",
                "/^ComponentNameProps$/",
                "/^ComponentNameReturn$/",
            ],
        },
        {
            filenameWithoutParts: "helperName1",
            allowExportNames: [
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
        ({ allowExportNames, filenameWithoutParts, expected }) => {
            expect(
                replaceReferenceWithFilename({
                    allowExportNames,
                    filenameWithoutParts,
                }),
            ).toEqual(expected);
        },
    );
});
