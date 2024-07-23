import { removeFilenameParts } from "./removeFilenameParts";
import { ExportRules } from "../exportRules.types";

describe("removeFilenameParts", () => {
    test.each<{
        filenamePartsToRemove?: ExportRules["filenamePartsToRemove"];
        filenameWithoutExtension: string;
        expected: string;
    }>([
        {
            filenamePartsToRemove: [".const"],
            filenameWithoutExtension: "componentName.const",
            expected: "componentName",
        },
        {
            filenameWithoutExtension: "componentName.const",
            expected: "componentName.const",
        },
    ])(
        "Should return correct values for %o",
        ({ filenamePartsToRemove, filenameWithoutExtension, expected }) => {
            expect(
                removeFilenameParts({
                    filenamePartsToRemove,
                    filenameWithoutExtension,
                }),
            ).toEqual(expected);
        },
    );
});
