import React, { Component } from 'react'
class CodeFilter extends Component {
    constructor(props) {
      super(props);
      this.filter = this.filter.bind(this);
      this.getValue = this.getValue.bind(this);
    }
    getValue() {
      return this.input.value;
    }
    filter() {
      let val = this.getValue();
      val = val.match(/[0-9][0-9]?/gm).join('.');
      this.input.value = val;
      this.props.onFilter(val)
    }
    render() {
      return [
        <input
          maxLength="11"
          key="input"
          className="form-control"
          ref={ node => this.input = node }
          type="text"
          placeholder="Enter Code..."
          onChange={this.filter}
        />
      ];
    }
  }

  export default CodeFilter;