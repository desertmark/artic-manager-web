
export const max = max => value => value > max ? `Must be lower than or equals to ${max}` : undefined;
export const min = min => value => value < min ? `Must be grater than or equals to ${min}` : undefined;

