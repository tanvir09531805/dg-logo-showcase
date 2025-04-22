// External Dependencies
import React, { Component } from 'react';
import lodash from 'lodash';

import './style.css';

const style = {
    root: {
        background: '#f1f5f9',
        padding: '10px'
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '5px',
        marginBottom: '10px',
        border: '1px dashed #c9cacb'
    },
    cell: {
        flexBasis: 'calc(33.33% - 5px)',
        height: '30px',
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all .2s ease'
    }
}

class MenuRowSelector extends Component {
    static slug = 'menu_row_selector';

    constructor(props) {
        super(props);

        this.state = {
            active: this.props.value ? this.props.value : 'center_left'
        }
    }

    componentDidUpdate() {
        if(lodash.isEmpty(this.props.value) ) {
            this.props._onChange(this.props.name, 'center_left');
        }
    }

    handlePosition = ( position ) => {
        this.setState({active: position})
        this.props._onChange(this.props.name, position);
    }

    activeStyle = (style, pos='center_left') => {
        const _style = {...style};
        if(this.state.active === pos) {
            _style.background = '#2b87da';
            _style.color = '#fff';
        }
        return _style;
    }

    render() {
        return(
            <div className='df-menu-item-position-selector' style={style.root}>
                <div className='df-row' style={style.row}>
                    <div style={this.activeStyle(style.cell, 'top_left')} className='df-item-cell' onClick={() => this.handlePosition("top_left")}>+</div>
                    <div style={this.activeStyle(style.cell, 'top_center')} className='df-item-cell' onClick={() => this.handlePosition("top_center")}>+</div>
                    <div style={this.activeStyle(style.cell, 'top_right')} className='df-item-cell' onClick={() => this.handlePosition("top_right")}>+</div>
                </div>
                <div className='df-row' style={style.row}>
                    <div style={this.activeStyle(style.cell, 'center_left')} className='df-item-cell' onClick={() => this.handlePosition("center_left")}>+</div>
                    <div style={this.activeStyle(style.cell, 'center_center')} className='df-item-cell' onClick={() => this.handlePosition("center_center")}>+</div>
                    <div style={this.activeStyle(style.cell, 'center_right')} className='df-item-cell' onClick={() => this.handlePosition("center_right")}>+</div>
                </div>
                <div className='df-row' style={style.row}>
                    <div style={this.activeStyle(style.cell, 'bottom_left')} className='df-item-cell' onClick={() => this.handlePosition("bottom_left")}>+</div>
                    <div style={this.activeStyle(style.cell, 'bottom_center')} className='df-item-cell' onClick={() => this.handlePosition("bottom_center")}>+</div>
                    <div style={this.activeStyle(style.cell, 'bottom_right')} className='df-item-cell' onClick={() => this.handlePosition("bottom_right")}>+</div>
                </div>
            </div>
        )
    }
}
export default MenuRowSelector;

