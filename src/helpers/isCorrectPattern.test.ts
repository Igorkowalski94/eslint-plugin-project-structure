import { Pattern } from "types";

import { isCorrectPattern } from "helpers/isCorrectPattern";

describe("isCorrectPattern", () => {
  it.each<{ expected: boolean; input: string; pattern: Pattern }>([
    { input: "features/Feature1.tsx", pattern: "features/**", expected: true },
    {
      input: "features2/Feature1.tsx",
      pattern: "features/**",
      expected: false,
    },
    {
      input: "features/Feature1.tsx",
      pattern: ["features/**"],
      expected: true,
    },
    {
      input: "features2/Feature1.tsx",
      pattern: ["features/**"],
      expected: false,
    },
    {
      input: "features/Feature1.js",
      pattern: [["features/**", "!features/**/*.tsx"], "helpers/**"],
      expected: true,
    },
    {
      input: "features/Feature1.tsx",
      pattern: [["features/**", "!features/**/*.tsx"], "helpers/**"],
      expected: false,
    },
    {
      input: "helpers/helper.tsx",
      pattern: [["features/**", "!features/**/*.tsx"], "helpers/**"],
      expected: true,
    },
    {
      input: "helpers2/helper.tsx",
      pattern: [["features/**", "!features/**/*.tsx"], "helpers/**"],
      expected: false,
    },
  ])("Should return correct value for %o", ({ expected, pattern, input }) => {
    expect(
      isCorrectPattern({
        input,
        pattern,
      }),
    ).toEqual(expected);
  });
});
