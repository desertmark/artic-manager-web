export const onlyNumbers = value => (value.match(/[0-9]+/g) || []).join('');
export const percentage = value => {
    const numbers = onlyNumbers(value);
    return numbers ? `${numbers}%` : '';
}
export const currency = value =>  {
    const numbers = onlyNumbers(value);
    return numbers ? `$${numbers}` : '';
}

export const code = value => onlyNumbers(value).split('').map((el,i) => i % 2 === 0 ? el : el + '.' ).join('').slice(0,11);