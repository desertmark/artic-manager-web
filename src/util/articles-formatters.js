
export function codeFormatter(cell) {
    return cell.toString().match(/[0-9]./gm).join('.')
}

export function percentageFormatter(cell) {
    return `${(cell*100).toFixed(2)}%`
}

export function currencyFormatter(cell) {
    return `$${cell.toFixed(2)}`;
}