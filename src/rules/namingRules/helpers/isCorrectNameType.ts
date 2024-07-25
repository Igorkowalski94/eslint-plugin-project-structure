import { NameType } from "../namingRules.types";

interface IsCorrectNameTypeProps {
    ruleNameType: NameType | NameType[];
    nameType: NameType;
}

export const isCorrectNameType = ({
    ruleNameType,
    nameType,
}: IsCorrectNameTypeProps): boolean =>
    (Array.isArray(ruleNameType) && ruleNameType.includes(nameType)) ||
    (typeof ruleNameType === "string" && ruleNameType === nameType);
