export const isRegexInvalid = (regex: string): boolean => {
    try {
        new RegExp(regex);
    } catch (e) {
        return true;
    }

    return false;
};
