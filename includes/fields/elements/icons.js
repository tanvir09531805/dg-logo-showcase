// External Dependencies
import React, { Component } from 'react';
import lodash from 'lodash';

import InputElement from './input';

import './style.css';

class IconElement extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            activeIcon: this.props.value,
            search: ''
        }
    }


    handleOpen = (event) => {
        event.preventDefault();
        this.setState({open: true})
    }

    handleIconClick = (icon) => {
        this.setState({activeIcon: icon});
        this.props.onChange(icon);
    }
    handleInputChange = (event) => {
        this.setState({search: event.target.value})
    }
    searchFilter = (icons) => {
        const { search } = this.state;
        icons = search !== '' ? lodash.filter(icons, function(item) {
            return item.search_terms.includes(search);
        }) : icons;
        return icons;
    }

    renderIconList = () => {
        const _this = this;
        const { activeIcon } = this.state;

        return(
            <>
                <div className='df-custom-input icon-search'>
                    <label>Icon</label>
                    <input type="text" value={this.state.search} onChange={this.handleInputChange} placeholder="Search Icon..." />
                </div>
                <ul id="et-fb-icon_picker" className="et-fb-font-icon-list et-fb-modal-allow-scroll-ext et-fb-allow-mouse-wheel" 
                    style={{height: "100%", overflowY: "scroll"}}>
                    {lodash.map(this.searchFilter(window.ETBuilderBackend.fontIconsExtended), function(icon, key){
                        let _class = icon.is_divi_icon ? '' : 'et-pb-fa-icon';
                        _class += !icon.is_divi_icon && icon.font_weight === 900 ? ' et-pb-black-icon' : ' et-pb-line-icon';

                        _class += activeIcon && lodash.isEqual(icon.decoded_unicode, activeIcon.decoded_unicode) ? ' active' : '';

                        return <li key={key} 
                            className={_class} 
                            data-icon={icon.decoded_unicode} 
                            data-icon-utf={icon.unicode} 
                            data-icon-font-weigh={icon.font_weight}
                            onClick={() => _this.handleIconClick(icon)}
                            ></li>
                    })}
            </ul>
            </>
        )
    }

    renderSelectedIcon = () => {
        if(!this.state.activeIcon) return;

        const icon = this.state.activeIcon;

        let _class = icon.is_divi_icon ? '' : 'et-pb-fa-icon';
        _class += !icon.is_divi_icon && icon.font_weight === 900 ? ' et-pb-black-icon' : ' et-pb-line-icon';

        return (
            <>
                <div className='df-custom-selected-icon'>
                    <label>Selected Icon</label>
                    <span 
                        className={_class}
                        data-icon={icon.decoded_unicode} 
                        data-icon-utf={icon.unicode} 
                        data-icon-font-weigh={icon.font_weight}
                    ></span>
                </div>
            </>
        )
    }


    render() {
        return(
            <div>
                {this.renderSelectedIcon()}
                {!this.state.open ? <button className='icon-popup-button' onClick={this.handleOpen}>Select Icon</button> : '' }
                {this.state.open ? this.renderIconList() : ''}
            </div>
        )
    }
}
export default IconElement;