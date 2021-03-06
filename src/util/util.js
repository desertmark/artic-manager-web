import { set, get, sum, mapValues } from 'lodash';
import axios from 'axios';
import $ from 'jquery';

/**
 * Transforms the table filter to pass it to the body of the request.
 * @param {*} tableFilter is the react-bootstrap-table2 filter event payload property.
 */
export function toApiFilter(tableFilter) {
    let apiFilter = {};
    Object.keys(tableFilter).forEach(k =>  {
        let value = get(tableFilter[k], 'filterVal', '');
        value = value.replace(/[\s]+/g,'.*');
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
    const amounts = discounts.map(discount => parseInt(discount.amount));
    const totalDiscount = sum(amounts) || 0;
    const cost = listPrice*(1 + vat/100 - totalDiscount/100).toFixed(2);
    return parseFloat(cost);
}

export function calculatePrice(cost = 0, utility = 0, transport = 0) {
    cost = parseFloat(cost);
    utility = parseInt(utility);
    transport = parseInt(transport);
    return parseFloat(cost*(1 + utility/100 + transport/100).toFixed(2));
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
        discounts: get(article,'discounts',[]).map(({ amount, description, ...rest }) => ({ amount: amount/100, description })),
        vat: get(article,'vat', 0)/100 || 0,
        transport: get(article,'transport', 0)/100 || 0,
        card: get(article,'card', 0)/100 || 0,
        utility: get(article,'utility', 0)/100 || 0,
        categoryId: get(article,'category._id'),
        dolar: 1
    } 
}

export function apiArticleToVmArticle(article) {
    return {
        ...article,
        // listPrice: parseInt(article.listPrice),
        discounts: get(article,'discounts',[]).map(({ amount, description, ...rest }) => ({ amount: amount*100, description })),
        vat: get(article, 'vat', 0) * 100,
        transport: get(article, 'transport', 0) * 100,
        card: get(article, 'card', 0) * 100,
        utility: get(article, 'utility', 0) * 100,
        dolar: 1
    }
}

export function getExchange(type="USD_ARS") {
    return axios({URL:`http://free.currencyconverterapi.com/api/v5/convert?q=${type}&compact=ultra`, method:'GET'})
    .then(ex => ex[type]);
}

export function bulkEditVmToApiBulkEdit(bulkEditVm) {
    const apiBulkEdit = {
        ...bulkEditVm,
        fields: mapValues(bulkEditVm.fields, value => value/100)
    };
    const percentage = get(bulkEditVm, 'fields.price.percentage');
    const absolute = get(bulkEditVm, 'fields.price.absolute');
    if (percentage) set(apiBulkEdit, 'fields.price.percentage', percentage/100);
    if (absolute) set(apiBulkEdit, 'fields.price.absolute', absolute);
    return apiBulkEdit;
}