import { set, get, sumBy } from 'lodash';
import axios from 'axios';
/**
 * Transforms the table filter to pass it to the body of the request.
 * @param {*} tableFilter is the react-bootstrap-table2 filter event payload property.
 */
export function toApiFilter(tableFilter) {
    let apiFilter = {};
    Object.keys(tableFilter).forEach(k =>  {
        let value = get(tableFilter[k], 'filterVal', '');
        // if (!Number.isNaN(parseInt(value))) {
            // value = parseInt(value);
        // } else {
            value = value.replace(/[\s]+/g,'.*');
        // }
        set(apiFilter, k, value);
    });
    return apiFilter;
}

/**
 * Transforms the table pagination to pass it to the queryString of the request.
 * @param {*} tablePagination is the react-bootstrap-table2 pagination event payload property.
 */
export function toApiParams(tablePagination) {
    return {
        size: get(tablePagination, 'sizePerPage', 20),
        page: (get(tablePagination, 'page', 1) - 1)
    }
}

/**
 * Transforms the server pagination to pass it to the react-bootstrap-table2
 * @param {*} pagination is pagination object handled by the app.
 */
export function toTablePagination(pagination) {
    return {
        sizePerPage: get(pagination,'size', 20),
        page: get(pagination, 'page', 0) + 1,
        totalSize: get(pagination, 'totalSize', 0)
    }
}

export function getBoostrapColor(colorName) {
    let color;
    switch(colorName) {
        case 'success':
            color = '#28a745';
        break;
        case 'info':
            color = '#17a2b8';
        break;
        case 'warning':
            color = '#ffc107';
        break;
        case 'danger':
            color = '#dc3545';
        break;
        default:
            color = '#007bff';
    }
    return color;
}
/**
 * Takes a formatted code and returns it as a number.
 * @param {string} code string with format `05.05.05.05` where x are numbers.
 */
export function parseCode(code) {
    return parseInt(code.replace(/[.]+/gm,''));
}

export function calculateCost(listPrice = 0, vat = 0, discounts = []) {
    listPrice = parseFloat(listPrice);
    vat = parseInt(vat);
    discounts = discounts.forEach(parseInt);
    const totalDiscount = sumBy(discounts, 'amount');
    const cost = listPrice*(1 + vat/100 - totalDiscount/100).toFixed(2);
    return parseFloat(cost);
}

export function calculatePrice(cost = 0, utility = 0, transport = 0, discounts = [])  {
    cost = parseFloat(cost);
    utility = parseInt(utility);
    transport = parseInt(transport);
    const totalDiscount = sumBy(discounts, 'amount');
    return parseFloat(cost*(1 + utility/100 + transport/100 - totalDiscount/100).toFixed(2));
}

export function calculateCardPrice(price = 0, card = 0) {
    price = parseFloat(price);
    card = parseFloat(card);
    return parseFloat(price*(1 + card/100).toFixed(2));
}

/**
 * Takes an article from the article-form-component & maps it into json the api understands.
 * @param {*} article 
 */
export function articleVmToApiArticle(article) {
    return {
        ...article,
        listPrice: parseInt(article.listPrice),
        discounts: article.discounts.map(({ amount, description, ...rest }) => ({ amount: amount/100, description })),
        vat: article.vat/100,
        transport: article.transport/100,
        card: article.card/100,
        utility: article.utility/100,
        categoryId: get(article,'category._id'),
        dolar: 1
    } 
}

export function getExchange(type="USD_ARS") {
    return axios({URL:`http://free.currencyconverterapi.com/api/v5/convert?q=${type}&compact=ultra`, method:'GET'})
    .then(ex => ex[type]);
}