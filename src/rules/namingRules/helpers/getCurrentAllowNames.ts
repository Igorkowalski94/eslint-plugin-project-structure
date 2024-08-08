import { isNameFromFileRoot } from "rules/namingRules/helpers/isNameFromFileRoot";
import { ValidateNameProps } from "rules/namingRules/helpers/validateName";
import { NameType, NamingRule } from "rules/namingRules/namingRules.types";

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
