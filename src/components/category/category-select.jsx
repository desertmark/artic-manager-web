import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getCategories } from '../../redux/categories/categories-actions';
import SelectSearchComponent from '../select/select-search-component';
import { required } from '../inputs/validators';
import {Field} from 'redux-form'
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
        const { loadingCategories, getCategories, selected, name, validate } = this.props;
        return <Field
        component={SelectSearchComponent}
        loading={loadingCategories} 
        onSearch={q => getCategories({size: 10, q})}
        selected={selected}
        placeholder="Select category"
        onSelect={this.onSelect}
        name={name}
        validate={validate}
      >
        {this.props.categories.map(c => ({value: c._id, text: c.description}))}
      </Field>
    }
}

export default connect(
    state => ({
        categories: state.categoriesReducer.categories,
        loadingCategories: state.categoriesReducer.loading,
    }),
    dispatch => bindActionCreators({ getCategories }, dispatch)
)(CategorySelect)