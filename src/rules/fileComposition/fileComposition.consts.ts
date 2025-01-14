export const ESLINT_ERRORS = {
  invalidName: `🔥 Invalid '{{selectorType}}' name, allowed formats = {{formatWithoutReferences}} 🔥`,
  invalidPosition: `🔥 Invalid '{{selectorType}}' position. It is located in line {{currentLine}} but should be in line {{correctLine}}. 🔥`,
  prohibitedSelectorRoot: `🔥 The use of '{{selectorType}}' is prohibited in the root of the file. 🔥{{error}}`,
  prohibitedSelectorNested: `🔥 The use of nested '{{selectorType}}' is prohibited in this file. 🔥{{error}}`,
  prohibitedSelectorExport: `🔥 Exporting '{{selectorType}}' is prohibited in this file. 🔥{{error}}`,
  rootSelectorsLimits:
    "🔥 The limit for the given selectors in the root of the file has been exceeded. 🔥\n{{error}}\n\n",
};
