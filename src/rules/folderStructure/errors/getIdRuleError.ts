export const getIdRuleError = (ruleId: string): Error =>
  new Error(`🔥 ruleId: '${ruleId}' does not exist in object 'rules'. 🔥`);
