import { isNameFromFileRoot } from "./isNameFromFileRoot";
import { ValidateNameProps } from "./validateName";
import { NameType, NamingRule } from "../namingRules.types";

interface GetCurrentAllowNamesProps {
    nameType: NameType;
    node: ValidateNameProps["node"];
    allowNames: NamingRule["allowNames"];
    allowNamesFileRoot: NamingRule["allowNamesFileRoot"];
}

export const getCurrentAllowNames = ({
    node,
    nameType,
    allowNames,
    allowNamesFileRoot,
}: GetCurrentAllowNamesProps): string[] | undefined => {
    if (
        isNameFromFileRoot({
            nameType,
            node,
        }) &&
        allowNamesFileRoot
    )
        return allowNamesFileRoot;

    return allowNames;
};
