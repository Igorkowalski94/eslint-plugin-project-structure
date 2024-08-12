import { ValidationError } from "jsonschema";

export const getInvalidConfigError = (
  errors: ValidationError["stack"][],
): Error =>
  new Error(
    errors.reduce(
      (acc, stack) =>
        acc + `🔥 ${stack.replace("instance", "configuration")}.\n`,
      "🔥 Invalid configuration file:\n",
    ),
  );
