
export const max = max => value => (parseInt(value) > max ? `Must be lower than or equals to ${max}` : undefined);
export const min = min => value => (parseInt(value) < min ? `Must be grater than or equals to ${min}` : undefined);
export const required = value => (value || typeof value === 'number' ? undefined : 'Required');