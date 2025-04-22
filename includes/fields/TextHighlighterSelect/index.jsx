// External Dependencies
import React, { Component } from "react";
import svgData from "../../../admin/assets/svg/textHighlighter.json";

import lodash from 'lodash';

import './style.css';


const style = {
    cell: {
        border: 'none'
    }
}

class DF_TextHighlighterSelect extends Component {
    static slug = 'df_text_highlighter_select';

    constructor(props) {
        super(props);
        this.state = {
            active: this.props.value ? this.props.value : 'line'
        }
    }

    handleSVGChange = (name) => {
        this.setState({ active: name })
        this.props._onChange(this.props.name, name);
    }

    activeStyle = (style, name = 'line') => {
        const _style = { ...style };
        if (this.state.active === name) {
            _style.border = '1px solid rgba(43, 135, 218, 0.3)';
        }
        return _style;
    }

    render() {
        return (
            <div className='df_text_highlighter_selector_wrapper'>
                <div className='df_highlighter_row'>
                    { Object.entries(svgData.TextHighlighterSVG).map(([name, svgMarkup]) => (
                        <div
                            key={name}
                            style={this.activeStyle(style.cell, name)}
                            className={`df_highlighter_cell ${this.state.active === name ? "df_hlc_active" : ""}`}
                            onClick={() => this.handleSVGChange(name)}
                            dangerouslySetInnerHTML={{__html: svgData.TextHighlighterSVG[name]}}/>
                    ))
                    }
                </div>
            </div>
        )
    }

}

export default DF_TextHighlighterSelect;
