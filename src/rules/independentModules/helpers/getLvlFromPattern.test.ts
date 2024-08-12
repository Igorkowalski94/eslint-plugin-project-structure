import { getLvlFromPattern } from "rules/independentModules/helpers/getLvlFromPattern";

describe("getLvlFromPattern", () => {
  test.each([
    {
      pattern: "{family}",
      defaultLvl: 2,
      expected: 2,
    },
    {
      pattern: "{family_3}",
      defaultLvl: 2,
      expected: 3,
    },
    {
      pattern: "{dirname}",
      defaultLvl: 1,
      expected: 1,
    },
    {
      pattern: "{dirname_3}",
      defaultLvl: 1,
      expected: 3,
    },
    {
      pattern: "error",
      defaultLvl: 1,
      expected: 1,
    },
  ])(
    "Should return correct value for %s",
    ({ pattern, defaultLvl, expected }) => {
      expect(getLvlFromPattern(pattern, defaultLvl)).toEqual(expected);
    },
  );
});
