import { extractReferencesFromReusableImportPatterns } from "./extractReferencesFromReusableImportPatterns";
import { getNestedArrayInPatternError } from "../errors/getNestedArrayInPatternError";
import { getRecursionLimitError } from "../errors/getRecursionLimitError";
import { IndependentModulesConfig } from "../independentModules.types";

describe("extractReferencesFromReusableImportPatterns", () => {
    const reusableImportPatterns: IndependentModulesConfig["reusableImportPatterns"] =
        {
            pattern0: ["pattern0"],
            pattern1: ["pattern1"],
            pattern2: ["pattern2_a", "pattern2_b"],
            pattern3: [
                "pattern3_a",
                "pattern3_b",
                ["pattern3_c", "pattern3_d"],
            ],

            pattern4: ["pattern4", "{pattern1}"],
            pattern5: ["pattern5", "root/{pattern1}/**"],
            pattern6: ["pattern6_a", ["pattern6_b", "{pattern1}"]],
            pattern7: ["pattern7_a", ["pattern7_b", "root/{pattern1}/**"]],

            pattern8: [
                "pattern8",
                "{pattern2}",
                "**/{pattern0}/{pattern1}/**",
                "**/{family}/**/{pattern0}/{pattern1}/**",
                "**/{dirname}/**/{pattern0}/{pattern1}/**",
                "**/{family_3}/**/{pattern0}/{pattern1}/**",
                "**/{dirname_3}/**/{pattern0}/{pattern1}/**",
            ],
            pattern9: [
                "pattern9_a",
                "{pattern5}",
                ["pattern9_b", "{pattern2}", "{pattern5}"],
            ],

            pattern10: ["pattern10", "{pattern2}"],
            pattern11: ["pattern11_a", ["pattern11_b", "{pattern2}"]],
        };

    const reusableImportPatternsExtracted = {
        pattern0: ["pattern0"],
        pattern1: ["pattern1"],
        pattern2: ["pattern2_a", "pattern2_b"],
        pattern3: ["pattern3_a", "pattern3_b", ["pattern3_c", "pattern3_d"]],
        pattern4: ["pattern4", "pattern1"],
        pattern5: ["pattern5", "root/pattern1/**"],
        pattern6: ["pattern6_a", ["pattern6_b", "pattern1"]],
        pattern7: ["pattern7_a", ["pattern7_b", "root/pattern1/**"]],
        pattern8: [
            "pattern8",
            "pattern2_a",
            "pattern2_b",
            "**/pattern0/pattern1/**",
            "**/{family}/**/pattern0/pattern1/**",
            "**/{dirname}/**/pattern0/pattern1/**",
            "**/{family_3}/**/pattern0/pattern1/**",
            "**/{dirname_3}/**/pattern0/pattern1/**",
        ],
        pattern9: [
            "pattern9_a",
            "pattern5",
            "root/pattern1/**",
            [
                "pattern9_b",
                "pattern2_a",
                "pattern2_b",
                "pattern5",
                "root/pattern1/**",
            ],
        ],
        pattern10: ["pattern10", "pattern2_a", "pattern2_b"],
        pattern11: ["pattern11_a", ["pattern11_b", "pattern2_a", "pattern2_b"]],
    };

    test("Should return extracted reusableImportPatterns", () => {
        expect(
            extractReferencesFromReusableImportPatterns(reusableImportPatterns),
        ).toEqual(reusableImportPatternsExtracted);
    });

    test("Should throw getNestedArrayInPatternError", () => {
        expect(() =>
            extractReferencesFromReusableImportPatterns({
                pattern1: ["pattern1_a", ["pattern1_b", "{pattern2}"]],
                pattern2: ["pattern2_a", ["pattern2_b", "pattern2_c"]],
            }),
        ).toThrow(
            getNestedArrayInPatternError(
                ["pattern1_b", "{pattern2}"],
                "pattern2",
            ),
        );
    });

    test("Should throw recursion error", () => {
        expect(() =>
            extractReferencesFromReusableImportPatterns({
                pattern1: ["{pattern2}"],
                pattern2: ["{pattern1}"],
            }),
        ).toThrow(getRecursionLimitError(["{pattern2}"]));
    });

    test("Should return undefined when reusableImportPatterns === undefined", () => {
        expect(extractReferencesFromReusableImportPatterns(undefined)).toEqual(
            undefined,
        );
    });
});
