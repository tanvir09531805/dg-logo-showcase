import React, {Component, Fragment} from 'react';
import $ from 'jquery';
import   '../../../public/js/lib/popper.min.js';
import  '../../../public/js/lib/tippy-bundle.min.js';
import tippy from 'tippy.js';

// Internal Dependencies
import './style.css';
import utility from "../../../scripts/df_scripts/utilities";

class AvatarStack extends Component {
    static slug = 'difl_avatar_stack';
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
        this.wrapper = React.createRef();
        this.computed = ['field_tooltip_enable', 'field_tooltip_arrow' , 'field_tooltip_placement', 'field_tooltip_animation', 'field_tooltip_trigger', 'field_tooltip_custom_maxwidth', 'field_tooltip_follow_cursor', 'field_tooltip_interactive', 'field_tooltip_offset_enable']
        this.process_tooltip = this.process_tooltip.bind(this);
        this.getModuleClass = this.getModuleClass.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        if (this.state.loading === true) {
            this.setState({ loading: false })
        }

        if (this.wrapper.current.querySelector('.difl_avatar_stack_item')) {
            this.process_tooltip(true, this.wrapper.current.querySelectorAll('.difl_avatar_stack_item'));
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidUpdate(prevProps, prevState) {
        const _this = this;
        _this.process_text_heading_level(_this.props);

        if (this.state.loading === true) {
            this.setState({ loading: false })
            return;
        }

        if(_this.wrapper.current) {
            if (_this.wrapper.current.querySelector('.difl_avatar_stack_item')) {
                const  moduleClasses =_this.wrapper.current.parentNode.parentNode.classList;
                let singleClass ='';
                if(moduleClasses){
                    singleClass =  _this.getModuleClass(moduleClasses);
                }
                _this.process_tooltip(singleClass, _this.wrapper.current.querySelectorAll('.difl_avatar_stack_item'));
            }
        }

        for (const index in prevProps) {
            if (prevProps[index] !== _this.props[index]) {
                if (_this.computed.includes(index)) {
                    this.setState({ loading: true });
                    if(_this.wrapper.current) {

                        if (_this.wrapper.current.querySelector('.difl_avatar_stack_item')) {
                            const  moduleClasses =_this.wrapper.current.parentNode.parentNode.classList;
                            let singleClass ='';
                            if(moduleClasses){
                                singleClass =  _this.getModuleClass(moduleClasses);
                            }
                            _this.process_tooltip(singleClass, _this.wrapper.current.querySelectorAll('.difl_avatar_stack_item'));
                        }

                    }
                }
            }
        }
    }

    static css(props) {
        const animationData = (props) => {
            const default_data = {
                'field_item_translate_x'    : '0px',
                'field_item_translate_y'    : '0px',
                'field_item_rotate_x'       : '0deg',
                'field_item_rotate_y'       : '0deg',
                'field_item_rotate_z'       : '0deg',
                'field_item_scale_x'        : '1',
                'field_item_scale_y'        : '1',
                'field_item_skew_x'         : '0deg',
                'field_item_skew_y'         : '0deg',
                'field_item_trans_duration' : '300ms',
                'field_item_trans_delay'    : '0ms',
                'field_item_trans_easing'   : 'ease-out',
                'field_stack_translate_x'   : '0px',
                'field_stack_translate_y'   : '0px',
                'field_stack_rotate_x'      : '0deg',
                'field_stack_rotate_y'      : '0deg',
                'field_stack_rotate_z'      : '0deg',
        };
            const fieldRootTransition = {};
            if('on' === props.field_item_translate_enable){
                fieldRootTransition.field_item_translate_x = '--df-avatarStack-item-trans-x-hover';
                fieldRootTransition.field_item_translate_y = '--df-avatarStack-item-trans-y-hover';
            }
            if('on' === props.field_item_rotate_enable){
                fieldRootTransition.field_item_rotate_x = '--df-avatarStack-item-rotate-x-hover';
                fieldRootTransition.field_item_rotate_y = '--df-avatarStack-item-rotate-y-hover';
                fieldRootTransition.field_item_rotate_z = '--df-avatarStack-item-rotate-z-hover';
            }
            if('on' === props.field_item_scale_enable){
                fieldRootTransition.field_item_scale_x = '--df-avatarStack-item-scale-x-hover';
                fieldRootTransition.field_item_scale_y = '--df-avatarStack-item-scale-y-hover';
            }
            if('on' === props.field_item_skew_enable){
                fieldRootTransition.field_item_skew_x = '--df-avatarStack-item-skew-x-hover';
                fieldRootTransition.field_item_skew_y = '--df-avatarStack-item-skew-y-hover';
            }
            if('on' === props.field_item_transition_enable){
                fieldRootTransition.field_item_trans_duration = '--df-avatarStack-item-transition-duration';
                fieldRootTransition.field_item_trans_delay = '--df-avatarStack-item-transition-delay';
                fieldRootTransition.field_item_trans_easing = '--df-avatarStack-item-transition-easing';
            }
            if('on' === props.field_stack_translate_enable){
                fieldRootTransition.field_stack_translate_x = '--df-avatarStack-trans-x-normal';
                fieldRootTransition.field_stack_translate_y = '--df-avatarStack-trans-y-normal';
            }
            if('on' === props.field_stack_rotate_enable){
                fieldRootTransition.field_stack_rotate_x = '--df-avatarStack-rotate-x-normal';
                fieldRootTransition.field_stack_rotate_y = '--df-avatarStack-rotate-y-normal';
                fieldRootTransition.field_stack_rotate_z = '--df-avatarStack-rotate-z-normal';
            }

            let result = '';
            for (let key in fieldRootTransition) {
                let value = props[key] ? props[key] : default_data[key];
                if (key === 'field_item_trans_duration' || key === 'field_item_trans_delay') {
                    value += props[key] ? 'ms' : '';
                }
                result += `${fieldRootTransition[key]}:${value};`;
            }

            return result;
        }
        let additionalCss = [];

        /****** Module Alignment ******/
        const module_alignment = props.module_alignment ? props.module_alignment : 'left';
        const module_alignment_tablet = props.module_alignment_tablet ? props.module_alignment_tablet : module_alignment;
        const module_alignment_phone = props.module_alignment_phone ? props.module_alignment_phone : module_alignment_tablet;
        additionalCss.push([{
            selector:    "%%order_class%%.difl_avatar_stack .difl_avatar_stack_container",
            declaration: `justify-content: ${module_alignment};`,
        }]);
        additionalCss.push([{
            selector: "%%order_class%%.difl_avatar_stack .difl_avatar_stack_container",
            declaration: `justify-content: ${module_alignment_tablet};`,
            'device': 'tablet',
        }]);
        additionalCss.push([{
            selector: "%%order_class%%.difl_avatar_stack .difl_avatar_stack_container",
            declaration: `justify-content: ${module_alignment_phone};`,
            'device': 'phone'
        }]);

        /*----- Stack Spacing -----*/
        const field_stack_spacing = props.field_stack_spacing ? props.field_stack_spacing : '0px';
        additionalCss.push([{
            selector:    "%%order_class%%.difl_avatar_stack #difl-avatar-stack-container .difl_avatar_stack_item:not(:first-child)",
            declaration: `margin-left:${field_stack_spacing};`,
        }]);

        if( props.field_stack_spacing__hover && props.field_stack_spacing__hover !==  field_stack_spacing ){
            additionalCss.push([{
                selector: "%%order_class%%.difl_avatar_stack #difl-avatar-stack-container:hover .difl_avatar_stack_item:not(:last-child)",
                declaration: `margin-right: ${props.field_stack_spacing__hover};`,
            }],[{
                selector: "%%order_class%%.difl_avatar_stack #difl-avatar-stack-container:hover .difl_avatar_stack_item",
                declaration: `margin-left:0 !important;`,
            }]);
        }else{
            additionalCss.push([{
                selector: "%%order_class%%.difl_avatar_stack #difl-avatar-stack-container:hover .difl_avatar_stack_item:not(:first-child)",
                declaration: `margin-left: ${field_stack_spacing};`,
            }]);
        }
        // Update builder view when on hover state
        if(props.field_stack_spacing__hover_enabled && props.hover_enabled && props.hover_enabled === 1 && props.field_stack_spacing__hover && props.field_stack_spacing__hover !==  field_stack_spacing){
            additionalCss.push([{
                selector: "%%order_class%%.difl_avatar_stack #difl-avatar-stack-container .difl_avatar_stack_item:not(:last-child), %%order_class%%.difl_avatar_stack.et_hover_enabled_preview #difl-avatar-stack-container .difl_avatar_stack_item:not(:first-child)",
                declaration: `margin-right: ${props.field_stack_spacing__hover};`,
            }],[{
                selector: "%%order_class%%.difl_avatar_stack #difl-avatar-stack-container .difl_avatar_stack_item, %%order_class%%.difl_avatar_stack.et_hover_enabled_preview #difl-avatar-stack-container .difl_avatar_stack_item",
                declaration: `margin-left:0 !important;`,
            }]);
        }

        /*--------   Stack Animation --------*/
        additionalCss.push([{
            selector:    "%%order_class%%.difl_avatar_stack",
            declaration: animationData(props),
        }]);


        /*----- Icon -----*/
        utility.process_range_value({
            props           : props,
            key             : "field_icon_size",
            additionalCss   : additionalCss,
            selector        : `%%order_class%% .difl_avatar_stack_item .difl_avatar_stack_item_wrapper.has_icon .difl_avatar_stack_icon`,
            default_value   : '30px',
            type            : "font-size"
        });
        utility.process_color({
            props           : props,
            key             : "field_icon_color",
            additionalCss   : additionalCss,
            selector        : `%%order_class%% .difl_avatar_stack_item .difl_avatar_stack_item_wrapper.has_icon .difl_avatar_stack_icon`,
            type            : "color"
        });
        utility.process_color({
            props           : props,
            additionalCss   : additionalCss,
            key             : 'field_icon_background',
            selector        : '%%order_class%% .difl_avatar_stack_item .difl_avatar_stack_item_wrapper.has_icon',
            type            : "background-color"
        });

        /*----- Text -----*/
        utility.process_color({
            props           : props,
            additionalCss   : additionalCss,
            key             : 'field_text_background',
            selector        : '%%order_class%% .difl_avatar_stack_item .difl_avatar_stack_item_wrapper.has_text',
            type            : "background-color"
        });

        /*----- Rating -----*/
        const rating_position = props.field_rating_position ? props.field_rating_position : "center";
        additionalCss.push([{
            selector:    '%%order_class%% .difl_avatar_stack_item .difl_avatar_stack_item_wrapper.has_rating .difl_avatar_stack_rating_container',
            declaration: `justify-content: ${rating_position};`,
        }]);
        // alignment
        const rating_alignment = props.field_rating_alignment ? props.field_rating_alignment : 'left';
        additionalCss.push([{
            selector: `%%order_class%% .difl_avatar_stack_item .difl_avatar_stack_item_wrapper.has_rating .difl_avatar_stack_rating_container .difl_avatar_stack_rating`,
            declaration: `text-align: ${rating_alignment};`,
        }]);
        // icon size
        utility.process_range_value({
            props: props,
            key: "field_rating_icon_size",
            additionalCss: additionalCss,
            selector: `%%order_class%% .difl_avatar_stack_item .difl_avatar_stack_item_wrapper.has_rating .difl_avatar_stack_rating_container .difl_avatar_stack_rating`,
            default_value: '14px',
            type: "font-size"
        });
        // rating color
        utility.process_color({
            props: props,
            key: "field_rating_color",
            additionalCss: additionalCss,
            selector: `%%order_class%% .difl_avatar_stack_item .difl_avatar_stack_item_wrapper.has_rating .difl_avatar_stack_rating_container .difl_avatar_stack_rating span.rate:before`,
            type: "color"
        });
        // blank color
        utility.process_color({
            props: props,
            key: "field_blank_color",
            additionalCss: additionalCss,
            selector: `%%order_class%% .difl_avatar_stack_item .difl_avatar_stack_item_wrapper.has_rating .difl_avatar_stack_rating_container .difl_avatar_stack_rating span.blank:before`,
            type: "color"
        });
        // background
        utility.process_color({
            props           : props,
            additionalCss   : additionalCss,
            key             : 'field_rating_background',
            selector        : '%%order_class%% .difl_avatar_stack_item .difl_avatar_stack_item_wrapper.has_rating',
            type            : "background-color"
        });

        /*------ Spacing ------*/
        // Icon
        utility.process_margin_padding({
            props: props,
            key: "icon_container_margin",
            additionalCss: additionalCss,
            selector: "%%order_class%% #difl-avatar-stack-container .difl_avatar_stack_item:has(.difl_avatar_stack_item_wrapper.has_icon) .difl_avatar_stack_item_wrapper",
            type: "margin",
        });
        utility.process_margin_padding({
            props: props,
            key: "icon_container_padding",
            additionalCss: additionalCss,
            selector: "%%order_class%% .difl_avatar_stack_item:has(.difl_avatar_stack_item_wrapper.has_icon) .difl_avatar_stack_item_wrapper",
            type: "padding",
        });
        // Media
        utility.process_margin_padding({
            props: props,
            key: "media_container_margin",
            additionalCss: additionalCss,
            selector: "%%order_class%% #difl-avatar-stack-container .difl_avatar_stack_item:has(.difl_avatar_stack_item_wrapper.has_media) .difl_avatar_stack_item_wrapper",
            type: "margin",
        });
        utility.process_margin_padding({
            props: props,
            key: "media_container_padding",
            additionalCss: additionalCss,
            selector: "%%order_class%% .difl_avatar_stack_item:has(.difl_avatar_stack_item_wrapper.has_media) .difl_avatar_stack_item_wrapper",
            type: "padding",
        });
        // Rating
        utility.process_margin_padding({
            props: props,
            key: "rating_container_margin",
            additionalCss: additionalCss,
            selector: "%%order_class%% #difl-avatar-stack-container .difl_avatar_stack_item:has(.difl_avatar_stack_item_wrapper.has_rating) .difl_avatar_stack_item_wrapper",
            type: "margin",
        });
        utility.process_margin_padding({
            props: props,
            key: "rating_container_padding",
            additionalCss: additionalCss,
            selector: "%%order_class%% .difl_avatar_stack_item:has(.difl_avatar_stack_item_wrapper.has_rating) .difl_avatar_stack_item_wrapper",
            type: "padding",
        });
        // Text
        utility.process_margin_padding({
            props: props,
            key: "text_container_margin",
            additionalCss: additionalCss,
            selector: "%%order_class%% #difl-avatar-stack-container .difl_avatar_stack_item:has(.difl_avatar_stack_item_wrapper.has_text) .difl_avatar_stack_item_wrapper",
            type: "margin",
        });
        utility.process_margin_padding({
            props: props,
            key: "text_container_padding",
            additionalCss: additionalCss,
            selector: "%%order_class%% .difl_avatar_stack_item:has(.difl_avatar_stack_item_wrapper.has_text) .difl_avatar_stack_item_wrapper",
            type: "padding",
        });

        /****** Tooltip *******/
        utility.process_margin_padding({
            'props': props,
            'key': 'tooltips_padding',
            'additionalCss': additionalCss,
            'selector': '.tippy-box[data-theme~="%%order_class%%"]',
            'type': 'padding'
        });
        utility.df_process_bg({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'field_tooltip_background',
            'selector'          : '.tippy-box[data-theme~="%%order_class%%"]'
        });

        utility.process_color({
            'props'             : props,
            'key'               : 'field_tooltip_arrow_color',
            'additionalCss'     : additionalCss,
            'selector'          : ".tippy-box[data-theme~='%%order_class%%'][data-placement^='top'] > .tippy-arrow::before",
            'type'              : 'border-top-color'
        });
        utility.process_color({
            'props'             : props,
            'key'               : 'field_tooltip_arrow_color',
            'additionalCss'     : additionalCss,
            'selector'          : ".tippy-box[data-theme~='%%order_class%%'][data-placement^='bottom'] > .tippy-arrow::before",
            'type'              : 'border-bottom-color'
        });
        utility.process_color({
            'props'             : props,
            'key'               : 'field_tooltip_arrow_color',
            'additionalCss'     : additionalCss,
            'selector'          : ".tippy-box[data-theme~='%%order_class%%'][data-placement^='right'] > .tippy-arrow::before",
            'type'              : 'border-right-color'
        });
        utility.process_color({
            'props'             : props,
            'key'               : 'field_tooltip_arrow_color',
            'additionalCss'     : additionalCss,
            'selector'          : ".tippy-box[data-theme~='%%order_class%%'][data-placement^='left'] > .tippy-arrow::before",
            'type'              : 'border-left-color'
        });

        additionalCss.push([{
            selector: ".tippy-box[data-theme~='%%order_class%%'] .tippy-content p",
            declaration: `padding-bottom: 0px;`
        }]);

        return additionalCss;
    }

    getModuleClass(moduleClassList= []){
        return Array.prototype.map.call( moduleClassList, ( classValue ) => {
            if ( classValue.indexOf( 'difl_avatar_stack_' ) !== -1 ) {
                return classValue;
            }
        } ).filter(element => element).join();
    }

    process_tooltip(moduleClass = '' , avatar_stack_items = ''){
        const props = this.props;

        const tooltipStatus  = 'on' === props.field_tooltip_enable;
        const tooltipOffsetStatus  = 'on' === props.field_tooltip_offset_enable;
        const offsetSkidding = tooltipOffsetStatus && props.field_tooltip_offset_skidding ? parseInt(props.field_tooltip_offset_skidding) : 0;
        const offsetDistance = tooltipOffsetStatus && props.field_tooltip_offset_distance ? parseInt(props.field_tooltip_offset_distance) : 10;

        if (avatar_stack_items && tooltipStatus) {
            const options = {
                arrow    : 'on' === props.field_tooltip_arrow,
                animation: props.field_tooltip_animation ? props.field_tooltip_animation : 'fade',
                placement: props.field_tooltip_placement ? props.field_tooltip_placement : 'top',
                trigger  : props.tooltip_trigger ? props.tooltip_trigger : 'mouseenter focus',
                followCursor: 'on' === props.field_tooltip_follow_cursor && 'mouseenter focus' === props.field_tooltip_trigger,
                allowHTML: true,
                interactive: 'on' === props.field_tooltip_interactive,
                interactiveBorder: props.field_tooltip_interactive_border ? parseInt(props.field_tooltip_interactive_border) : 2,
                interactiveDebounce: props.field_tooltip_interactive_debounce ? parseInt(props.field_tooltip_interactive_debounce) : 0,
                maxWidth: props.field_tooltip_custom_maxwidth ? parseInt(props.field_tooltip_custom_maxwidth) : 370,
                offset:[offsetSkidding , offsetDistance],
                delay: props.field_item_trans_duration ? parseInt(props.field_item_trans_duration) : 300,
                theme: `.${moduleClass}`
            };
            [].forEach.call(avatar_stack_items, function (avatar_stack_item) {
                if(avatar_stack_item){
                    const tooltipContent = avatar_stack_item.querySelector('.difl_avatar_stack_item_wrapper').dataset.options;
                    if(undefined !== tooltipContent){
                        options['content'] =  tooltipContent;
                        tippy(avatar_stack_item, options);
                    }
                }
            })
        }
    }

    process_text_heading_level(props){
        $(document).ready(() => {
            const text_info = $(this.wrapper.current).find('.difl_avatar_stack_item .difl_avatar_stack_text_container');
            if (text_info.length > 0) {
                text_info.each((index, text_container) => {
                    const title_field = $(text_container).find('.difl_avatar_stack_text_title').get(0);
                    if (title_field) {
                        const title_value = $(title_field).text();
                        const new_title_field = $('<' + props.text_title_level + '>', {
                            class: 'difl_avatar_stack_text_title',
                            text: title_value
                        });
                        $(title_field).remove();
                        $(text_container).append(new_title_field);
                    }

                    const subtitle_field = $(text_container).find('.difl_avatar_stack_text_subtitle').get(0);
                    if (subtitle_field) {
                        const subtitle_value = $(subtitle_field).text();
                        const new_subtitle_field = $('<' + props.text_subtitle_level + '>', {
                            class: 'difl_avatar_stack_text_subtitle',
                            text: subtitle_value
                        });
                        $(subtitle_field).remove();
                        $(text_container).append(new_subtitle_field);
                    }
                });
            }
        });

    }

    render() {
        const props = this.props;
        return (
            <Fragment>
                {this.state.loading === false ?
                    <div id="difl-avatar-stack-container" className="difl_avatar_stack_container" ref={this.wrapper}>
                        {props.content.length !== 0 ?
                            props.content
                            :
                            <h4 className="difl_avatar_stack_empty_content"> Add Stack Item </h4>
                        }
                    </div>:
                    <div className="et-fb-preloader et-fb-preloader__loading">
                        <div className="et-fb-loader"/>
                    </div>
                }
            </Fragment>
        );
    }
}

export default AvatarStack;