import { JSONSchema4 } from "@typescript-eslint/utils/dist/json-schema";
import * as jsonschema from "jsonschema";

import { getInvalidConfigError } from "errors/getInvalidConfigError";

import { validateConfig } from "helpers/validateConfig/validateConfig";

jest.mock("jsonschema", () => {
  const actual = jest.requireActual<typeof jsonschema>("jsonschema");
  return { ...actual, validate: jest.fn(actual.validate) };
});

describe("validateConfig", () => {
  beforeEach(() => {
    (jsonschema.validate as jest.Mock).mockClear();
  });

  const schema: JSONSchema4 = {
    $schema: "http://json-schema.org/draft-07/schema#",
    type: "object",
    properties: {
      key1: {
        type: "number",
      },
      key2: {
        type: "string",
      },
      key3: {
        type: "object",
        properties: {
          key4: {
            type: "array",
            items: [
              {
                type: "null",
              },
            ],
          },
        },
      },
      key5: {
        type: "array",
        items: [
          {
            type: "boolean",
          },
        ],
      },
    },
    required: ["key1"],
    additionalProperties: false,
  };

  it("should throw error when schema is incorrect", () => {
    expect(() =>
      validateConfig({
        config: {
          key1: [],
          key2: {},
          key3: {
            key4: [true],
          },
          key5: [1],
        },
        schema,
      }),
    ).toThrow(
      getInvalidConfigError([
        "configuration.key1 is not of a type(s) number",
        "configuration.key2 is not of a type(s) string",
        "configuration.key3.key4[0] is not of a type(s) null",
        "configuration.key5[0] is not of a type(s) boolean",
      ]),
    );
  });

  it("should not throw error when schema is correct", () => {
    expect(() =>
      validateConfig({
        config: {
          $schema: "node_modules/eslint-plugin-project-structure/schema.json",
          key1: 1,
          key2: "",
        },
        schema,
      }),
    ).not.toThrow();
  });

  it("should validate the same config only once per schema", () => {
    const config = { key1: 1 };

    validateConfig({ config, schema });
    validateConfig({ config, schema });
    validateConfig({ config, schema: { type: "object" } });

    expect(jsonschema.validate).toHaveBeenCalledTimes(2);
  });

  it("should validate each new config object", () => {
    validateConfig({ config: { key1: 1 }, schema });
    validateConfig({ config: { key1: 2 }, schema });

    expect(jsonschema.validate).toHaveBeenCalledTimes(2);
  });

  it("should throw error every time for the same invalid config", () => {
    const config = { key1: "1" };

    expect(() => validateConfig({ config, schema })).toThrow();
    expect(() => validateConfig({ config, schema })).toThrow();
    expect(jsonschema.validate).toHaveBeenCalledTimes(2);
  });

  it("should validate a config that is not an object every time", () => {
    const stringSchema: JSONSchema4 = { type: "string" };

    validateConfig({ config: "config", schema: stringSchema });
    validateConfig({ config: "config", schema: stringSchema });

    expect(jsonschema.validate).toHaveBeenCalledTimes(2);
  });
});
