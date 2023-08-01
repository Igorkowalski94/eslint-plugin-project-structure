export const getIsRegexCorrect = (regex: string): boolean =>
    /^\/(.+)\/$/.test(regex);
