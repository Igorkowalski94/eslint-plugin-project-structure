export const ESLINT_ERRORS = {
  invalidName: `🔥 Invalid {{selectorKey}} name, allowed formats = {{formatWithoutReferences}} 🔥`,
  prohibitedSelector: `🔥 The use of '{{selectorKey}}' is prohibited in this file. 🔥{{error}}`,
  prohibitedSelectorRoot: `🔥 The use of '{{selectorKey}}' is prohibited in the root of the file. 🔥{{error}}`,
  prohibitedSelectorExport: `🔥 Exporting '{{selectorKey}}' is prohibited in this file. 🔥{{error}}`,
  rootSelectorsLimits:
    "🔥 The limit for the given selectors in the root of the file has been exceeded. 🔥\n{{error}}\n\n",
};
