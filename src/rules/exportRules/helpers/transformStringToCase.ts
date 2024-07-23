import { Cases } from "../exportRules.types";

export const transformStringToCase = (
    str: string,
    transformTo: Cases,
): string => {
    const toCamelCase = (input: string): string =>
        input
            .replace(/[-_](.)/g, (_, char) => char.toUpperCase())
            .replace(/^[A-Z]/, (char) => char.toLowerCase());

    const toPascalCase = (input: string): string => {
        const camel = toCamelCase(input);
        return camel.charAt(0).toUpperCase() + camel.slice(1);
    };

    const toSnakeCaseLower = (input: string): string =>
        input
            .replace(/([a-z])([A-Z])/g, "$1_$2")
            .replace(/([A-Za-z])(\d)/g, "$1_$2")
            .replace(/(\d)([A-Za-z])/g, "$1_$2")
            .replace(/[-\s]/g, "_")
            .replace(/_+/g, "_")
            .toLowerCase();

    const toSnakeCaseUpper = (input: string): string =>
        input
            .replace(/([a-z])([A-Z])/g, "$1_$2")
            .replace(/([a-zA-Z])(\d)/g, "$1_$2")
            .replace(/(\d)([A-Z])/g, "$1_$2")
            .replace(/[^a-zA-Z0-9]+/g, "_")
            .toUpperCase()
            .replace(/^_+|_+$/g, "");

    let result;
    switch (transformTo) {
        case "PascalCase":
            result = toPascalCase(str);
            break;
        case "snake_case":
            result = toSnakeCaseLower(str);
            break;
        case "SNAKE_CASE":
            result = toSnakeCaseUpper(str);
            break;
        default:
            result = toCamelCase(str);
            break;
    }
    return result;
};
