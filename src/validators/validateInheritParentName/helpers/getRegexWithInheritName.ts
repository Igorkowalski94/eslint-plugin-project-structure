export const getRegexWithInheritName = (
    regex: string,
    inheritName: string,
): string => regex.replace(/\^/, `^${inheritName}`);
