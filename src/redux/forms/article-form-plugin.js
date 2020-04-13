
import { calculateCost, calculatePrice, calculateCardPrice } from '../../util/util';
export default function articleFormReducer(state, action) {
    switch(action.type) {
      case '@@redux-form/CHANGE': 
        return Object.assign({}, state, {
            values: newValues(state.values, action.meta.field)
        })
      default:
        return state;
    }
}

function newValues(values, field) {
    if (isUpdateCalculatedValuesNeeded(field)) {
        return Object.assign({}, values, updateCalculatedValues(values));
    }
    return values;
}

function updateCalculatedValues({ listPrice, vat, discounts, utility, transport, card }) {
    const cost = calculateCost(listPrice, vat, discounts);
    const price = calculatePrice(cost, utility, transport);
    const cardPrice = calculateCardPrice(price, card);
    return { cost, price, cardPrice };
}

function isUpdateCalculatedValuesNeeded(field) {
    const trigerCalculationFields = ['listPrice', 'vat', 'discounts', 'cost', 'utility', 'price', 'card'];
    return trigerCalculationFields.includes(field);
}