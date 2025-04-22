// External Dependencies
import React, { Component } from 'react';
import lodash from 'lodash';

import './style.css';

class InputElement extends Component {
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
        const { label } = props;
        return(
            <div className='df-custom-input'>
                <label>{label}</label>
                <input type="text" value={this.state.value} onChange={this.handleChange} />
            </div>
        )
    }
}
export default InputElement;