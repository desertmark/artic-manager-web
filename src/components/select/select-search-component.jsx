import React, { Component } from 'react';
import { debounce } from 'lodash';

export default class SelectSearchComponent extends Component {
    constructor() {
        super();
        this.state = {
            showOptions: false,
        }
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
        this.search = debounce(this.search.bind(this), 1000);
    }

    onFocus() {
        this.setState({showOptions: true})
    }

    onBlur() {
        this.setState({showOptions: false});
    }

    search(searchTerm) {
        this.props.onSearch ? this.props.onSearch(searchTerm) : undefined;
    }

    onChange(e) {
        this.search(e.target.value);
    }

    render() {
        return (
            <div>
                <div >
                    <div className="">
                        <div className="form-control">
                            <div className="d-flex">
                                <input type="text" style={{border:'none', outline: 'none', width:'100%'}} onFocus={this.onFocus} onBlur={this.onBlur} onChange={this.onChange}/>
                                <div><i className="fa fa-search text-secondary"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={this.state.showOptions ? '' : 'd-none'}>
                    <div className="position-absolute"  style={{zIndex:999, width:'98%'}}>
                        {this.props.children && 
                        <div className="list-group">
                            {
                                this.props.children.map(c => <button type="button" className="list-group-item list-group-item-action" key={c.value}>{c.text}</button>)
                            }
                        </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}