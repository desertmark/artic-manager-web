export const onlyNumbers = value => (value.match(/[0-9]+/g) || []).join('');
export const percentage = value => {
    const numbers = onlyNumbers(value);
    return numbers ? `${numbers}%` : '';
}
export const currency = value =>  {
    const numbers = onlyNumbers(value);
    return numbers ? `$${numbers}` : '';
}