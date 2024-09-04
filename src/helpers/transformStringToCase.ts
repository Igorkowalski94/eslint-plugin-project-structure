import { getUpperCaseFirstLetter } from "helpers/getUpperCaseFirstLetter";

/* eslint-disable max-params */
interface TransformStringToCaseProps {
  str: string;
  transformTo:
    | "camelCase"
    | "PascalCase"
    | "snake_case"
    | "SNAKE_CASE"
    | "kebab-case";
}

export const transformStringToCase = ({
  str,
  transformTo,
}: TransformStringToCaseProps): string => {
  const toCamelCase = (input: string): string => {
    if (input === input.toUpperCase()) {
      return input
        .toLowerCase()
        .replace(/(_[a-z])/g, (_, char: string) => char.toUpperCase())
        .replace(/^[A-Z]/, (char) => char.toLowerCase())
        .replace(/_/g, "");
    }

    return input
      .replace(/([-_][a-z])/gi, (match) =>
        match.toUpperCase().replace(/[-_]/g, ""),
      )
      .replace(/^([A-Z])/, (char) => char.toLowerCase())
      .replace(/_/g, "");
  };

  const toSnakeCaseLower = (input: string): string =>
    input
      .replace(/([a-z])([A-Z])/g, "$1_$2")
      .replace(/([A-Za-z])(\d)/g, "$1_$2")
      .replace(/(\d)([A-Za-z])/g, "$1_$2")
      .replace(/[-\s]/g, "_")
      .replace(/_+/g, "_")
      .toLowerCase();

  const toKebabCase = (input: string): string =>
    input
      .replace(
        /([a-z\d])([A-Z]+)/g,
        (_match, p1: string, p2: string): string => p1 + "-" + p2.toLowerCase(),
      )
      .replace(
        /([A-Z]+)([A-Z][a-z])/g,
        (_match, p1: string, p2: string): string => `${p1.toLowerCase()}-${p2}`,
      )
      .replace(
        /(\d)([a-zA-Z])/g,
        (_match, p1: string, p2: string): string => `${p1}-${p2.toLowerCase()}`,
      )
      .replace(
        /([a-zA-Z])(\d)/g,
        (_match, p1: string, p2: string): string => `${p1}-${p2}`,
      )
      .replace(/[_\s]+/g, "-")
      .toLowerCase();

  let result;

  switch (transformTo) {
    case "PascalCase":
      result = getUpperCaseFirstLetter(toCamelCase(str));
      break;
    case "kebab-case":
      result = toKebabCase(str);
      break;
    case "snake_case":
      result = toSnakeCaseLower(str);
      break;
    case "SNAKE_CASE":
      result = toSnakeCaseLower(str).toUpperCase();
      break;
    default:
      result = toCamelCase(str);
      break;
  }
  return result;
};
