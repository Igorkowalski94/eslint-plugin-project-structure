import { TSESTree } from "@typescript-eslint/utils";
import { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";

import { handleClassDeclaration } from "./handleClassDeclaration";
import { validateName } from "./validateName";
import { ESLINT_ERRORS } from "../namingRules.consts";
import { NamingRule } from "../namingRules.types";

jest.mock("./validateName", () => ({
    validateName: jest.fn(),
}));

describe("handleClassDeclaration", () => {
    test("Should call validateName when !!name", () => {
        const validateNameMock = jest.fn();

        (validateName as jest.Mock).mockImplementation(validateNameMock);

        handleClassDeclaration({
            node: {
                id: { name: "className" },
            } as TSESTree.ClassDeclaration,
            context: {} as RuleContext<
                keyof typeof ESLINT_ERRORS,
                NamingRule[]
            >,
        }),
            expect(validateNameMock).toHaveBeenCalled();
    });

    test("Should not call validateName when !name", () => {
        const validateNameMock = jest.fn();

        (validateName as jest.Mock).mockImplementation(validateNameMock);

        handleClassDeclaration({
            node: {} as TSESTree.ClassDeclaration,
            context: {} as RuleContext<
                keyof typeof ESLINT_ERRORS,
                NamingRule[]
            >,
        }),
            expect(validateNameMock).not.toHaveBeenCalled();
    });
});
