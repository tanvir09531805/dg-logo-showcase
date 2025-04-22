// External Dependencies
import React, { Component } from 'react';
// import { Panel, PanelBody } from '@wordpress/components';
import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import InputElement from '../elements/input';
import SelectElement from '../elements/select';
import IconElement from '../elements/icons';

import './style.css';

class DF_Social_Fields extends Component {
    static slug = 'df_social_fields';

    constructor(props) {
        super(props)
        this.state = {
            repeater : this.props.value !== '' ? JSON.parse(this.props.value) :  [{
                'id': uuidv4(),
                'social': 'Label',
                'icon': '',
                'link': '#',
            }],
            active_id: ''
        }
    }

    handleClick = (event) => {
        event.preventDefault();
        let value = this.state.repeater;

        value.push({
            'id': uuidv4(),
            'social': 'Label',
            'icon': '',
            'link': '#',
        });

        this.props._onChange(this.props.name, JSON.stringify(value));
        this.setState({repeater: value});  
    }

    handleOpen = (event, id) => {
        event.preventDefault();
        this.setState({active_id: id})
    }

    handleDelete = (event, id) => {
        event.preventDefault();
        let _state = this.state.repeater
        _state = _state.filter(function( obj ) {
            return obj.id !== id;
        });
        this.setState({repeater: _state});
    }

    handleClose = (event, id) => {
        event.preventDefault();
        this.setState({active_id: ''})
    }

    handleChange = (id, attr, value) => {
        let _state = this.state.repeater;
        lodash.map(_state, function(rep) {
            if( rep.id === id) {
                rep[attr] = value
            }
        })
        this.setState({repeater: _state})
        this.props._onChange(this.props.name, JSON.stringify(_state));
    }

    layout = () => {
        const _options = this.props.fieldDefinition.options;
        const optionArray = [];

        lodash.map(_options, function(value, key){
            optionArray.push({label: value, value: key})
        })
        return optionArray
    }

    renderRepeater = () => {
        const _this = this;
        let value = this.state.repeater;
        if( typeof value === 'string' ) return

        const layout = _this.layout();
        
        return lodash.map(value, function(_rep) {
            
            return(
                <div className={"repeater-item " + (_rep.id === _this.state.active_id ? 'active': '')} key={_rep.id}>
                    {_rep.id === _this.state.active_id ? 
                        <div className='repeater-item-content'>
                            <div className='content-heading'>
                                <button className='close' onClick={(event)=> _this.handleClose(event, _rep.id)}></button>
                            </div> 
                            <div className='repeater-settings'>
                                <InputElement 
                                    label="Title" 
                                    value={_rep.social} onChange={(value) => _this.handleChange(_rep.id, 'social', value)}
                                />

                                <InputElement 
                                    label="Link" 
                                    value={_rep.link} onChange={(value) => _this.handleChange(_rep.id, 'link', value)}
                                />
            
                                <IconElement
                                    value={_rep.icon}
                                    onChange={(value) => _this.handleChange(_rep.id, 'icon', value)}
                                />

                            </div>
                        </div>
                    : 
                        <div className='repeater-item-heading'>
                            <div className='left'>
                                <label className='setting-label' onClick={(event) => _this.handleOpen(event, _rep.id)}>
                                    {lodash.truncate(_rep.social, { length: 24 })}
                                </label>
                            </div> 
                            <div className='right'>
                                <button onClick={(event) => _this.handleDelete(event, _rep.id)} className="delete-button"></button>
                                <button onClick={(event) => _this.handleOpen(event, _rep.id)} className="expend-button"></button>
                            </div>
                        </div>
                    }
                </div>
            )
        })

    }

    render() {
        return(
            <>
                {this.renderRepeater()}
                <button onClick={this.handleClick} className='btn btn-repeater-add'>Add Social Icon</button>
            </>
        )
    }
}

export default DF_Social_Fields;