const SNAKE_CASE_RE = /((([a-z]|\d)+_)*([a-z]|\d)+)/;
const KEBAB_CASE_RE = /((([a-z]|\d)+-)*([a-z]|\d)+)/;
const PASCAL_CASE_RE = /((([A-Z]|\d){1}([a-z]|\d)*)*([A-Z]|\d){1}([a-z]|\d)*)/;
const CAMEL_CASE_RE = /(([a-z]|\d)+(([A-Z]|\d){1}([a-z]|\d)*)*)/;

export const SNAKE_CASE = `${SNAKE_CASE_RE}`.replace(/\//g, "");
export const KEBAB_CASE = `${KEBAB_CASE_RE}`.replace(/\//g, "");
export const PASCAL_CASE = `${PASCAL_CASE_RE}`.replace(/\//g, "");
export const CAMEL_CASE = `${CAMEL_CASE_RE}`.replace(/\//g, "");
