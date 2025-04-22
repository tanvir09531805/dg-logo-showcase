import React, {Component, Fragment} from 'react';

// Internal Dependencies
import './style.css';
import utility from "../../../scripts/df_scripts/utilities";

class InlineContentsItem extends Component {
    static slug = 'difl_inline_contents_item';
    // _isMounted = false;

    static css(props) {
        let additionalCss = [];
        const main_css_element = "#difl-inline-contents-container %%order_class%%.difl_inline_contents_item";

        if('Icon' === props.content_type){
            utility.process_icon_font_style({
                'props': props,
                'additionalCss': additionalCss,
                'key': 'content_icon',
                'selector': `${main_css_element} .difl_inline_content_icon`,
                'important': true
            });
            utility.process_color({
                props           : props,
                additionalCss   : additionalCss,
                key             : 'icon_color',
                selector        : `${main_css_element} .difl_inline_content_icon`,
                type            : "color"
            });
            utility.process_range_value({
                props           : props,
                key             : "icon_size",
                additionalCss   : additionalCss,
                selector        : `${main_css_element} .difl_inline_content_icon`,
                default_value   : '',
                type            : "font-size"
            });
        }
        if('Image' === props.content_type){
            if(props.media_size && '40px' !== props.media_size){
                utility.process_range_value({
                    props           : props,
                    key             : "media_size",
                    additionalCss   : additionalCss,
                    selector        : `${main_css_element} .difl_inline_content_image`,
                    default_value   : '',
                    type            : "width"
                });
            }
        }

        return additionalCss;
    }

    process_text(props, content_new_line){
        if('Icon' === props.content_type || 'Image' === props.content_type || 'Line_Break' === props.content_type) return "";
        return <p className={`difl_inline_content_text${content_new_line}`}>{props.content_text}</p>;
    }
    process_icon(props, content_new_line){
        if('Icon' !== props.content_type) return "";
        if( ! props.content_icon && "" === props.content_icon ) return "";
        const utils = window.ET_Builder.API.Utils;
        const DynamicIcon = utility.df_collect_dynamic_content('content_icon', props);
        const ItemIcon = utils.processFontIcon(!!DynamicIcon ? DynamicIcon : '&#xe08a;||divi||400');
        return <span className={`et-pb-icon difl_inline_content_icon${content_new_line}`}>{ItemIcon}</span>;
    }
    process_image(props, content_new_line){
        if('Image' !== props.content_type) return "";
        if( ! props.content_image && "" === props.content_image ) return "";
        return  <img src={props.content_image} alt="" className={`difl_inline_content_image${content_new_line}`}/>;
    }
    process_line_break(props) {
        if('Line_Break' !== props.content_type) return "";
        return <span className="df_break_line"></span>
    }

    render() {
        const props = this.props;
        let content_new_line = '';
        if('on' === props.content_new_line){
            content_new_line = ' line_break'
        }

        return (
            <Fragment>
                {this.process_text(props, content_new_line)}
                {this.process_icon(props, content_new_line)}
                {this.process_image(props, content_new_line)}
                {this.process_line_break(props)}
            </Fragment>
        );
    }

}
export default InlineContentsItem;