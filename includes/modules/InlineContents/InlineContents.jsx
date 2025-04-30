import React, {Component, Fragment} from 'react';

// Internal Dependencies
import './style.css';
import utility from "../../../scripts/df_scripts/utilities";

class InlineContents extends Component {
    static slug = 'difl_inline_contents';
    _isMounted = false;

    static css(props) {
        let additionalCss = [];

        const main_css_element = "%%order_class%% .difl_inline_contents_container";

        // Text
        utility.process_color({
            props           : props,
            additionalCss   : additionalCss,
            key             : 'text_bg_color',
            selector        : `${main_css_element} .difl_inline_contents_item:has( div > .difl_inline_content_text )`,
            type            : "background-color"
        });

        // Icon
        utility.process_color({
            props           : props,
            additionalCss   : additionalCss,
            key             : 'icon_color',
            selector        : `${main_css_element} .difl_inline_contents_item .difl_inline_content_icon`,
            type            : "color"
        });
        utility.process_range_value({
            props           : props,
            key             : "icon_size",
            additionalCss   : additionalCss,
            selector        : `${main_css_element} .difl_inline_contents_item .difl_inline_content_icon`,
            default_value   : '24px',
            type            : "font-size"
        });
        utility.process_color({
            props           : props,
            additionalCss   : additionalCss,
            key             : 'icon_bg_color',
            selector        : `${main_css_element} .difl_inline_contents_item:has( div > .difl_inline_content_icon )`,
            type            : "background-color"
        });

        // Media
        utility.process_range_value({
            props           : props,
            key             : "media_size",
            additionalCss   : additionalCss,
            selector        : `${main_css_element} .difl_inline_contents_item .difl_inline_content_image`,
            default_value   : '40px',
            type            : "width"
        });
        utility.process_color({
            props           : props,
            additionalCss   : additionalCss,
            key             : 'media_bg_color',
            selector        : `${main_css_element} .difl_inline_contents_item:has( div > .difl_inline_content_image )`,
            type            : "background-color"
        });

        /*------ Spacing ------*/
        // Text
        utility.process_margin_padding({
            props: props,
            key: "text_container_margin",
            additionalCss: additionalCss,
            selector: `${main_css_element} .difl_inline_contents_item:has( div > .difl_inline_content_text )`,
            type: "margin",
        });
        utility.process_margin_padding({
            props: props,
            key: "text_container_padding",
            additionalCss: additionalCss,
            selector: `${main_css_element} .difl_inline_contents_item:has( div > .difl_inline_content_text )`,
            type: "padding",
        });
        // Icon
        utility.process_margin_padding({
            props: props,
            key: "icon_container_margin",
            additionalCss: additionalCss,
            selector: `${main_css_element} .difl_inline_contents_item:has( div > .difl_inline_content_icon )`,
            type: "margin",
        });
        utility.process_margin_padding({
            props: props,
            key: "icon_container_padding",
            additionalCss: additionalCss,
            selector: `${main_css_element} .difl_inline_contents_item:has( div > .difl_inline_content_icon )`,
            type: "padding",
        });
        // Media
        utility.process_margin_padding({
            props: props,
            key: "media_container_margin",
            additionalCss: additionalCss,
            selector: `${main_css_element} .difl_inline_contents_item:has( div > .difl_inline_content_image )`,
            type: "margin",
        });
        utility.process_margin_padding({
            props: props,
            key: "media_container_padding",
            additionalCss: additionalCss,
            selector: `${main_css_element} .difl_inline_contents_item:has( div > .difl_inline_content_image )`,
            type: "padding",
        });

        if(props.content_alignment){
            const content_alignment = props.content_alignment ? props.content_alignment : 'flex-start';
            const content_alignment_tablet = props.content_alignment_tablet ? props.content_alignment_tablet : content_alignment;
            const content_alignment_phone = props.content_alignment_phone ? props.content_alignment_phone : content_alignment_tablet;
            additionalCss.push([{
                selector:    `${main_css_element}`,
                declaration: `justify-content: ${content_alignment};`,
            },{
                selector:    `${main_css_element}`,
                declaration: `justify-content: ${content_alignment_tablet};`,
                'device': 'tablet',
            },{
                selector:    `${main_css_element}`,
                declaration: `justify-content: ${content_alignment_phone};`,
                'device': 'phone',
            }]);
        }

        // Items Alignment
        const items_position = props.items_position ? props.items_position : 'flex-start';
        additionalCss.push([{
            selector:    `${main_css_element}`,
            declaration: `align-items: ${items_position};`,
        }]);

        // Gap
        utility.process_range_value({
            props           : props,
            key             : "column_gap",
            additionalCss   : additionalCss,
            selector        : `${main_css_element}`,
            default_value   : '5px',
            type            : "column-gap"
        });
        utility.process_range_value({
            props           : props,
            key             : "row_gap",
            additionalCss   : additionalCss,
            selector        : `${main_css_element}`,
            default_value   : '5px',
            type            : "row-gap"
        });


        return additionalCss;
    }

    render() {
        const props = this.props;

        const HeadingTag = props.main_wrapper_tag ? props.main_wrapper_tag : 'div'
        return (
            <Fragment>
                <HeadingTag className="difl_inline_contents_container" id="difl-inline-contents-container">
                    {props.content.length !== 0 ? props.content : "Add Item"}
                </HeadingTag>
            </Fragment>
        );
    }

}
export default InlineContents;