import { isNameValid } from "./isNameValid";
import { getInvalidRegexError } from "../../../errors/getInvalidRegexError";

describe("isNameValid", () => {
    test("Should throw getInvalidRegexError when pattern is not regex", () => {
        expect(() =>
            isNameValid({
                allowNamesWithoutReferences: ["^[A-Z]"],
                name: "name",
            }),
        ).toThrow(getInvalidRegexError("^[A-Z]"));
    });

    test("Should throw getInvalidRegexError when regex is invalid", () => {
        expect(() =>
            isNameValid({
                allowNamesWithoutReferences: ["/^?/"],
                name: "name",
            }),
        ).toThrow(getInvalidRegexError("/^?/"));
    });

    test("Should not throw getInvalidRegexError when regex is valid", () => {
        expect(() =>
            isNameValid({
                allowNamesWithoutReferences: ["/^[A-Z]/"],
                name: "name",
            }),
        ).not.toThrow(getInvalidRegexError("/^[A-Z]/"));
    });
});
