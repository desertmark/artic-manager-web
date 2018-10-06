import { set, get } from 'lodash';
/**
 * Transforms the table filter to pass it to the body of the request.
 * @param {*} tableFilter is the react-bootstrap-table2 filter event payload property.
 */
export function toApiFilter(tableFilter) {
    let apiFilter = {};
    Object.keys(tableFilter).forEach(k =>  {
        let value = get(tableFilter[k], 'filterVal', '').replace(/\s/g,'.*');
        set(apiFilter, k, value);
    });
    return apiFilter;
}