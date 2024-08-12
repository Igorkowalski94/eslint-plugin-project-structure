import { JSONSchema4 } from "@typescript-eslint/utils/dist/json-schema";

export const DIRNAME_REGEX = /{dirname(_\d+)?}/g;
export const FAMILY_REGEX = /{family(_\d+)?}/g;

export const DEFAULT_BASE_URL = ".";
export const NO_FAMILY = "NO_FAMILY";

export const FILE_EXTENSIONS = [
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",

  ".d.ts",
  ".ts",
  ".tsx",

  ".vue",
  ".svelte",

  ".json",
  ".jsonc",
  ".yml",
  ".yaml",

  ".svg",
  ".png",
  ".jpg",
  ".ico",

  ".css",
  ".scss",
  ".sass",
  ".less",

  ".html",
];

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
