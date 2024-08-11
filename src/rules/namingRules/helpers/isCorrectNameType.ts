import { NAME_TYPES } from "rules/namingRules/namingRules.consts";
import { NameType, NameTypeRule } from "rules/namingRules/namingRules.types";

interface IsCorrectNameTypeProps {
    ruleNameType: NameTypeRule | NameTypeRule[];
    nameType: NameType;
}

export const isCorrectNameType = ({
    ruleNameType,
    nameType,
}: IsCorrectNameTypeProps): boolean => {
    const nameTypeConverted = NAME_TYPES[nameType];

    return (
        (Array.isArray(ruleNameType) &&
            ruleNameType.includes(nameTypeConverted)) ||
        (typeof ruleNameType === "string" && ruleNameType === nameTypeConverted)
    );
};
