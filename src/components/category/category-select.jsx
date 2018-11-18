import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getCategories } from '../../redux/categories/categories-actions';
import SelectSearchComponent from '../select/select-search-component';
class CategorySelect extends React.Component {
    constructor() {
        super();
        this.onSelect = this.onSelect.bind(this);
    }

    componentWillMount() {
        this.props.getCategories({size:10});
    }

    onSelect(item) {
        this.props.onSelect ? this.props.onSelect({_id: item.value, description: item.text}) : undefined;
    }

    render() {
        return <SelectSearchComponent 
        loading={this.props.loadingCategories} 
        onSearch={q => this.props.getCategories({size: 10, q})}
        selected={this.props.selected}
        placeholder="Select category"
        onSelect={this.onSelect}
      >
        {this.props.categories.map(c => ({value: c._id, text: c.description}))}
      </SelectSearchComponent>
    }
}

export default connect(
    state => ({
        categories: state.categoriesReducer.categories,
        loadingCategories: state.categoriesReducer.loading,
    }),
    dispatch => bindActionCreators({ getCategories }, dispatch)
)(CategorySelect)