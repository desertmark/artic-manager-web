import React, { Component } from 'react';
import { debounce } from 'lodash';
import { SpinnerDots } from '../spinner/spinner';

export default class SelectSearchComponent extends Component {
    constructor() {
        super();
        this.state = {
            showOptions: false,
        }
        this.onClick = this.onClick.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
        this.search = debounce(this.search.bind(this), 1000);
        this.onSelect = this.onSelect.bind(this);
        this.searchBox = React.createRef();
    }

    onClick() {
        this.setState({showOptions: true});
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.showOptions && !prevState.showOptions) {
            this.searchBox.current.focus();
        }
    }

    onBlur() {
        // timeout gives time to click event on options to happens otherwise the click event is not even fired.
        setTimeout(() => this.setState({showOptions: false}), 200);
    }

    search(searchTerm) {
        this.props.onSearch ? this.props.onSearch(searchTerm) : undefined;
    }

    onChange(e) {
        this.search(e.target.value);
    }

    onSelect(item) {
        this.props.onSelect ? this.props.onSelect(item) : undefined;
        this.searchBox.current.value = item.text;
    }

    render() {
        return (
            <div onClick={this.onClick}>
                <div>
                    <div className="">
                        <div className="form-control">
                            <div className="d-flex">
                                <input
                                    className={this.state.showOptions ? 'visible' : 'invisible'} 
                                    type="text" 
                                    style={{border:'none', outline: 'none', width:'100%'}}
                                    onBlur={this.onBlur}
                                    onChange={this.onChange}
                                    ref={this.searchBox}
                                />
                                {!this.state.showOptions && <p className="w-100 position-absolute" >{this.props.selected}</p>}
                                <div><i className="fa fa-search text-secondary"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={this.state.showOptions ? '' : 'd-none'}>
                    <div className="position-absolute" style={{zIndex:1, width:'98%'}}>
                        {this.props.children && 
                        <div className="list-group" >
                            {!this.props.loading &&  
                                this.props.children.map(item => <button type="button" onClick={() => this.onSelect(item)} className="list-group-item list-group-item-action" key={item.value}>{item.text || item.value}</button>)
                            }
                            {
                                this.props.loading && 
                                <button 
                                    type="button" 
                                    className="list-group-item list-group-item-action text-center"
                                >
                                    <SpinnerDots loading color="info" size={10}/>
                                    
                                </button>
                            }
                        </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}