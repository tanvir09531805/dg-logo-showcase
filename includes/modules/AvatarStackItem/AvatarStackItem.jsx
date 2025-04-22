import React, { Component } from 'react';

// Internal Dependencies
import './style.css';
import utility from "../../../scripts/df_scripts/utilities";
class AvatarStackItem extends Component {
    static slug = 'difl_avatar_stack_item';

    constructor(props) {
        super(props);
        this.state = {
            order_class : this.props.moduleInfo.orderClassName,
            order_number : this.props.moduleInfo.order
        }
    }

    componentDidMount() {
        const props = this.props
        const orderClass = props.moduleInfo.orderClassName;
    }

    static css(props) {
        const additionalCss = [];
        const main_css_element = ".difl_avatar_stack #difl-avatar-stack-container %%order_class%%.difl_avatar_stack_item";

        /*----- Icon -----*/
        const field_content_type = props.field_content_type ? props.field_content_type : "icon";
        if( 'icon' === field_content_type ) {
            // list icon size with default, responsive, hover
            utility.process_icon_font_style({
                'props': props,
                'additionalCss': additionalCss,
                'key': 'field_font_icon',
                'selector': `${main_css_element} .difl_avatar_stack_item_wrapper.has_icon .difl_avatar_stack_icon`,
                'important': true
            });

            if(props.field_icon_size && '30px' !== props.field_icon_size){
                utility.process_range_value({
                    props: props,
                    key: "field_icon_size",
                    additionalCss: additionalCss,
                    selector: `${main_css_element} .difl_avatar_stack_item_wrapper.has_icon .difl_avatar_stack_icon`,
                    default_value: '30px',
                    type: "font-size"
                });
            }

            utility.process_color({
                props: props,
                key: "field_icon_color",
                additionalCss: additionalCss,
                selector: `${main_css_element} .difl_avatar_stack_item_wrapper.has_icon .difl_avatar_stack_icon`,
                type: "color"
            });
        }

        /*----- Rating -----*/
        if( 'rating' === field_content_type ){
            if(props.field_rating_position){
                additionalCss.push([{
                    selector:    `${main_css_element} .difl_avatar_stack_item_wrapper.has_rating .difl_avatar_stack_rating_container`,
                    declaration: `justify-content: ${props.field_rating_position};`,
                }]);
            }

            // alignment
            if(props.field_rating_alignment){
                additionalCss.push([{
                    selector: `${main_css_element} .difl_avatar_stack_item_wrapper.has_rating .difl_avatar_stack_rating_container .difl_avatar_stack_rating`,
                    declaration: `text-align: ${props.field_rating_alignment};`,
                }]);
            }

            // icon size
            utility.process_range_value({
                props: props,
                key: "field_rating_icon_size",
                additionalCss: additionalCss,
                selector: `${main_css_element} .difl_avatar_stack_item_wrapper.has_rating .difl_avatar_stack_rating_container .difl_avatar_stack_rating`,
                type: "font-size"
            });
            // rating color
            utility.process_color({
                props: props,
                key: "field_rating_color",
                additionalCss: additionalCss,
                selector: `${main_css_element} .difl_avatar_stack_item_wrapper.has_rating .difl_avatar_stack_rating_container .difl_avatar_stack_rating span.rate:before`,
                type: "color"
            });
            // blank color
            utility.process_color({
                props: props,
                key: "field_blank_color",
                additionalCss: additionalCss,
                selector: `${main_css_element} .difl_avatar_stack_item_wrapper.has_rating .difl_avatar_stack_rating_container .difl_avatar_stack_rating span.blank:before`,
                type: "color"
            });
        }

        /*----- Text -----*/
        if('text' === field_content_type) {
            const text_position = props.field_text_position ? props.field_text_position : "center";
            additionalCss.push([{
                selector:    `${main_css_element} .difl_avatar_stack_item_wrapper.has_text .difl_avatar_stack_text_container`,
                declaration: `justify-content: ${text_position};`,
            }]);
        }

        /*----- Height -----*/
        if(props.field_item_height) {
            additionalCss.push([{
                selector:    `${main_css_element} .difl_avatar_stack_item_wrapper`,
                declaration: `height: ${props.field_item_height};`,
            }]);
        }

        return additionalCss;
    }

    process_icon(props, utils){
        if( ! props.field_font_icon && "" === props.field_font_icon ) return "";
        const DynamicIcon = utility.df_collect_dynamic_content('field_font_icon', props);
        const ItemIcon = utils.processFontIcon(!!DynamicIcon ? DynamicIcon : '&#xe08a;||divi||400');
        return <span className='et-pb-icon difl_avatar_stack_icon'>{ItemIcon}</span>;
    }
    process_media(props){
        if( ! props.field_image_src && "" === props.field_image_src ) return "";
        return  <img src={props.field_image_src} alt={props.field_image_alt} className="difl_avatar_stack_media"/>;
    }
    process_rating(props){
        const rating_number = undefined === props.field_rating_number || '' === props.field_rating_number ? '5' : props.field_rating_number;
        let star = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating_number) {
                star = star + '<span class="rate"></span>';
            } else {
                star = star + '<span class="blank"></span>';
            }
        }

        let rating_label = ''
        if(undefined !== props.field_rating_label || '' !== props.field_rating_label){
            rating_label = <span className="difl_avatar_stack_rating_label">{props.field_rating_label}</span>;
        }

        return (
            <div className="difl_avatar_stack_rating_container">
                <div className="difl_avatar_stack_rating" dangerouslySetInnerHTML={{__html: star}}/>
                {rating_label}
            </div>
        );
    }
    process_text(props){
        let title = '';
        if(undefined !== props.field_title_text || '' !== props.field_title_text){
            title = <h4 className="difl_avatar_stack_text_title">{props.field_title_text}</h4>;
        }

        let subtitle = ''
        if(undefined !== props.field_subtitle_text || '' !== props.field_subtitle_text){
            subtitle = <h6 className="difl_avatar_stack_text_subtitle">{props.field_subtitle_text}</h6>;
        }

        return (
            <div className="difl_avatar_stack_text_container">
                {title}
                {subtitle}
            </div>
        );
    }

    render() {
        const utils = window.ET_Builder.API.Utils;
        const props = this.props;
        let output = '';
        let output_class = 'has_icon';
        if('image' === props.field_content_type) {
            output = this.process_media(props);
            output_class = 'has_media';
        }else if('rating' === props.field_content_type) {
            output = this.process_rating(props);
            output_class = 'has_rating';
        }else if('text' === props.field_content_type) {
            output = this.process_text(props);
            output_class = 'has_text';
        }else{
            output = this.process_icon(props, utils);
            output_class = 'has_icon';
        }

        /*------- Tooltip ------*/
        const tooltip_content = props.field_tooltip_content && props.field_tooltip_content !== '' ? props.field_tooltip_content.replace(/<p[^>]*>(?:\s|&nbsp;)*<\/p>/g, '') : null;

        return(<React.Fragment>
                <div className={`difl_avatar_stack_item_wrapper ${output_class}`} data-options={tooltip_content}>{output}</div>
            </React.Fragment>
        )
    }
}
export default AvatarStackItem;
