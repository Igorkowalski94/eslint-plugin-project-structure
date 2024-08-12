import { JSONSchema4 } from "@typescript-eslint/utils/dist/json-schema";
import { validate } from "jsonschema";

import { getInvalidConfigError } from "errors/getInvalidConfigError";

interface ValidateConfigProps<T> {
  config: T;
  schema: JSONSchema4;
}

export const validateConfig = <T>({
  config,
  schema,
}: ValidateConfigProps<T>): void => {
  const errors = validate(config, schema, {
    nestedErrors: true,
  }).errors.filter(({ stack }) => !stack.includes("$schema"));

  if (!errors.length) return;

  throw getInvalidConfigError(errors.map(({ stack }) => stack));
};
