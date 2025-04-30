// External Dependencies
import React, { Component } from 'react';
import lodash from 'lodash';

import './style.css';

class SelectElement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value
        }
    }

    handleChange = (event) => {
        this.setState({value: event.target.value})
        this.props.onChange(event.target.value);
    }

    render() {
        const { props } = this;
        const { label, options } = props;
        return(
            <div className='df-custom-select'>
                <label>
                    {label}
                </label>
                <select value={this.state.value} onChange={this.handleChange}>
                    {lodash.map(options, function(option) {
                        return <option key={option.value} value={option.value}>{option.label}</option>
                    })}
                </select>
            </div>
        )
    }
}
export default SelectElement;