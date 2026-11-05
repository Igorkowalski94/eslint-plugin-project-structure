import { JSONSchema4 } from "@typescript-eslint/utils/dist/json-schema";

/**
 * Configs that passed validation, per schema. ESLint passes the same options object to a
 * rule for every file it lints, so a config that passed once does not need to be validated
 * again for each file. A config read from a file is a new object every time, so it is still
 * validated every time.
 */
export const VALID_CONFIGS = new WeakMap<JSONSchema4, WeakSet<object>>();
