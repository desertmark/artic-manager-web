import React, { Component } from 'react'
import { get } from 'lodash';
class CodeFilter extends Component {
    constructor(props) {
      super(props);
      this.onFilter = debounce(this.props.onFilter, get(props, 'column.filter.props.delay', 0), this);
      this.filter = this.filter.bind(this);
      this.getValue = this.getValue.bind(this);
    }
    getValue() {
      return this.input.value;
    }
    filter() {
      let val = this.getValue();
      val = val.match(/[0-9][0-9]?/gm);
      val = val ? val.join('.') : '';
      this.input.value = val;
      this.onFilter(val);
    }
    render() {
      return [
        <label className="filter-label">
          <input
            maxLength="11"
            key="input"
            className="filter text-filter form-control"
            ref={ node => this.input = node }
            type="text"
            placeholder="Enter code..."
            onChange={this.filter}
          />
        </label>
      ];
    }
  }

  export default CodeFilter;

function debounce(fn, delay, thisArg) {
  let id;
  return function(...args) {
    clearTimeout(id);
    id = setTimeout(() => fn.apply(thisArg, args), delay);
  }
}