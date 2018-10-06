import { set, get } from 'lodash';
/**
 * Transforms the table filter to pass it to the body of the request.
 * @param {*} tableFilter is the react-bootstrap-table2 filter event payload property.
 */
export function toApiFilter(tableFilter) {
    let apiFilter = {};
    Object.keys(tableFilter).forEach(k =>  {
        let value = get(tableFilter[k], 'filterVal', '');
        if( parseInt(value) !== NaN ) {
            value = parseInt(value);
        } else {
            value = value.replace(/\s/g,'.*');
        }
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