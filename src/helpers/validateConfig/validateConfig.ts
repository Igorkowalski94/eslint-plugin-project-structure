import { JSONSchema4 } from "@typescript-eslint/utils/dist/json-schema";
import { validate } from "jsonschema";

import { getInvalidConfigError } from "errors/getInvalidConfigError";

import { VALID_CONFIGS } from "helpers/validateConfig/validateConfig.consts";

interface ValidateConfigProps<T> {
  config: T;
  schema: JSONSchema4;
}

export const validateConfig = <T>({
  config,
  schema,
}: ValidateConfigProps<T>): void => {
  const isObject = typeof config === "object" && config !== null;

  if (isObject && VALID_CONFIGS.get(schema)?.has(config)) return;

  const errors = validate(config, schema, {
    nestedErrors: true,
  }).errors.filter(({ stack }) => !stack.includes("$schema"));

  if (errors.length)
    throw getInvalidConfigError(errors.map(({ stack }) => stack));

  if (!isObject) return;

  const validSchemaConfigs = VALID_CONFIGS.get(schema) ?? new WeakSet<object>();
  validSchemaConfigs.add(config);
  VALID_CONFIGS.set(schema, validSchemaConfigs);
};
