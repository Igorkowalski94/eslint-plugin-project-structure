export const ESLINT_ERRORS = {
  invalidName: `🔥 Invalid {{selectorType}} name, allowed formats = {{formatWithoutReferences}} 🔥`,
  invalidPosition: `🔥 Invalid {{selectorType}} position. The current 'positionIndex' is {{currentPosition}}, but {{positionIndex}} is required. 🔥`,
  prohibitedSelector: `🔥 The use of '{{selectorType}}' is prohibited in this file. 🔥{{error}}`,
  prohibitedSelectorRoot: `🔥 The use of '{{selectorType}}' is prohibited in the root of the file. 🔥{{error}}`,
  prohibitedSelectorExport: `🔥 Exporting '{{selectorType}}' is prohibited in this file. 🔥{{error}}`,
  rootSelectorsLimits:
    "🔥 The limit for the given selectors in the root of the file has been exceeded. 🔥\n{{error}}\n\n",
};
