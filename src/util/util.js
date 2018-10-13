import { set, get } from 'lodash';
/**
 * Transforms the table filter to pass it to the body of the request.
 * @param {*} tableFilter is the react-bootstrap-table2 filter event payload property.
 */
export function toApiFilter(tableFilter) {
    let apiFilter = {};
    Object.keys(tableFilter).forEach(k =>  {
        let value = get(tableFilter[k], 'filterVal', '');
        if (!Number.isNaN(parseInt(value))) {
            value = parseInt(value);
        } else {
            value = value.replace(/[\s]+/g,'.*');
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

/**
 * Transforms the server pagination to pass it to the react-bootstrap-table2
 * @param {*} pagination is pagination object handled by the app.
 */
export function toTablePagination(pagination) {
    return {
        sizePerPage: get(pagination,'sizePerPage', 20),
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


