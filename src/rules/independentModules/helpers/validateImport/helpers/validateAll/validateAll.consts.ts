import { JSONSchema4 } from "@typescript-eslint/utils/dist/json-schema";

export const INDEPENDENT_MODULES_SCHEMA: JSONSchema4 = {
  $schema: "http://json-schema.org/draft-07/schema#",
  type: "object",
  properties: {
    tsconfigPath: {
      type: "string",
    },
    pathAliases: {
      type: "object",
      properties: {
        baseUrl: {
          type: "string",
        },
        paths: {
          type: "object",
          additionalProperties: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
      },
      required: ["baseUrl", "paths"],
    },
    extensions: {
      type: "array",
      items: {
        type: "string",
      },
    },
    reusableImportPatterns: {
      type: "object",
      additionalProperties: {
        type: "array",
        items: {
          anyOf: [
            {
              type: "string",
            },
            {
              type: "array",
              items: {
                type: "string",
              },
            },
          ],
        },
      },
    },
    modules: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: {
            type: "string",
          },
          pattern: {
            anyOf: [
              {
                type: "string",
              },
              {
                type: "array",
                items: {
                  type: "string",
                },
              },
            ],
          },
          errorMessage: {
            type: "string",
          },
          allowImportsFrom: {
            type: "array",
            items: {
              anyOf: [
                {
                  type: "string",
                },
                {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
              ],
            },
          },
          allowExternalImports: {
            type: "boolean",
          },
        },
        required: ["name", "pattern", "allowImportsFrom"],
      },
    },
    debugMode: {
      type: "boolean",
    },
  },
  required: ["modules"],
};
