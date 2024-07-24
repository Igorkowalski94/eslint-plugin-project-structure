import { isExportNameValid } from "./isExportNameValid";
import { getInvalidRegexError } from "../../../errors/getInvalidRegexError";

describe("isExportNameValid", () => {
    test("Should throw getInvalidRegexError when pattern is not regex", () => {
        expect(() =>
            isExportNameValid({
                allowExportNamesWithoutReference: ["^[A-Z]"],
                exportName: "exportName",
            }),
        ).toThrow(getInvalidRegexError("^[A-Z]"));
    });

    test("Should throw getInvalidRegexError when regex is invalid", () => {
        expect(() =>
            isExportNameValid({
                allowExportNamesWithoutReference: ["/^?/"],
                exportName: "exportName",
            }),
        ).toThrow(getInvalidRegexError("/^?/"));
    });

    test("Should not throw getInvalidRegexError when regex is valid", () => {
        expect(() =>
            isExportNameValid({
                allowExportNamesWithoutReference: ["/^[A-Z]/"],
                exportName: "exportName",
            }),
        ).not.toThrow(getInvalidRegexError("/^[A-Z]/"));
    });
});
