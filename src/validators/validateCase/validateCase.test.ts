import { getCaseInvalidError } from "./helpers/getCaseInvalidError";
import { validateCase } from "./validateCase";
import { CaseType } from "../../types";

describe("validateCase", () => {
    it.each<[CaseType, string]>([
        ["PascalCase", "ComponentName"],
        ["camelCase", "componentName"],
        ["snake_case", "component_name"],
        ["kebab-case", "component-name"],
        ["dash-case", "component-name"],
    ])(
        "should not throw error when case is %s and folder name is %s",
        (ruleCase, moduleName) => {
            expect(() => validateCase(moduleName, ruleCase)).not.toThrow();
        },
    );
    it.each<[CaseType, string]>([
        ["PascalCase", "xComponentName"],
        ["camelCase", "XcomponentName"],
        ["snake_case", "Xcomponent_name"],
        ["kebab-case", "Xcomponent-name"],
        ["dash-case", "Xcomponent-name"],
    ])(
        "should throw error when case is %s and folder name is: %s",
        (caseType, moduleName) => {
            expect(() => validateCase(moduleName, caseType)).toThrow(
                getCaseInvalidError(moduleName, caseType).message,
            );
        },
    );
});
