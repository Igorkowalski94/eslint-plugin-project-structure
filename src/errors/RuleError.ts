export class RuleError extends Error {
  message: string;
  ruleMessage: string;

  constructor(message: string, ruleMessage: string) {
    super(message);

    this.message = message;
    this.ruleMessage = ruleMessage;
  }
}
