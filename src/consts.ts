/* eslint-disable @typescript-eslint/restrict-template-expressions */
const SNAKE_CASE_LOWER_RE = /((([a-z]|\d)+_)*([a-z]|\d)+)/;
const SNAKE_CASE_UPPER_RE = /((([A-Z]|\d)+_)*([A-Z]|\d)+)/;

const KEBAB_CASE_RE = /((([a-z]|\d)+-)*([a-z]|\d)+)/;
const PASCAL_CASE_RE = /[A-Z](([a-z0-9]+[A-Z]?)*)/;
const CAMEL_CASE_RE =
    /[a-z][a-z0-9]*(([A-Z][a-z0-9]+)*[A-Z]?|([a-z0-9]+[A-Z])*|[A-Z])/;

export const SNAKE_CASE_LOWER = `${SNAKE_CASE_LOWER_RE}`.replace(/\//g, "");
export const SNAKE_CASE_UPPER = `${SNAKE_CASE_UPPER_RE}`.replace(/\//g, "");
export const KEBAB_CASE = `${KEBAB_CASE_RE}`.replace(/\//g, "");
export const PASCAL_CASE = `${PASCAL_CASE_RE}`.replace(/\//g, "");
export const CAMEL_CASE = `${CAMEL_CASE_RE}`.replace(/\//g, "");
