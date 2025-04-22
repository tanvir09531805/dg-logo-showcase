import React, {Component, Fragment} from 'react';
import $ from 'jquery';
import   '../../../public/js/lib/popper.min.js';
import  '../../../public/js/lib/tippy-bundle.min.js';
import tippy from 'tippy.js';

// Internal Dependencies
import './style.css';
import utility from "../../../scripts/df_scripts/utilities";

class AdvancedButton extends Component {
    static slug = 'difl_advanced_button';
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
        this.wrapper = React.createRef();
        this.computed = ['field_tooltip_enable', 'field_tooltip_arrow' , 'field_tooltip_placement', 'field_tooltip_animation', 'field_tooltip_custom_maxwidth', 'field_tooltip_interactive', 'field_tooltip_offset_enable']
        this.process_tooltip = this.process_tooltip.bind(this);
        this.getModuleClass = this.getModuleClass.bind(this);
        this.tippy_instance = null;
    }

    componentDidMount() {
        this._isMounted = true;
        if (this.state.loading === true) {
            this.setState({ loading: false })
        }
        const wrapperElement = this.wrapper.current;
        if (wrapperElement) {
            this.process_tooltip(true, wrapperElement);
        }

        // Check if class exists using jQuery `.hasClass()` instead of classList
        if ($(wrapperElement).hasClass('dfab_ripple_position_aware')) {
            const listPositionAwareBg = $(wrapperElement).find('.dfab_position_aware_bg');

            $(wrapperElement).on('mouseenter mouseleave', (event) => {
                const ripplePositionAwareContainer = $(event.currentTarget).offset();
                const left = event.pageX - ripplePositionAwareContainer.left;
                const top = event.pageY - ripplePositionAwareContainer.top;

                listPositionAwareBg.css({
                    top: top,
                    left: left,
                });
            });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
        const wrapperElement = this.wrapper.current;
        $(wrapperElement).off('mouseenter mouseleave');
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.loading === true) {
            this.setState({ loading: false })
            return;
        }

        if(this.wrapper.current) {
            const  moduleClasses =this.wrapper.current.parentNode.parentNode.classList;
            let singleClass ='';
            if(moduleClasses){
                singleClass =  this.getModuleClass(moduleClasses);
            }
            this.process_tooltip(singleClass, this.wrapper.current);
        }
        for (const index in prevProps) {
            if (prevProps[index] !== this.props[index]) {
                if (this.computed.includes(index)) {
                    if(null !== this.tippy_instance) {
                        this.tippy_instance.destroy();
                        this.tippy_instance = null;
                    }
                    this.setState({ loading: true });
                }
            }
        }
    }

    getModuleClass(moduleClassList= []){
        return Array.prototype.map.call( moduleClassList, ( classValue ) => {
            if ( classValue.indexOf( 'difl_advanced_button_' ) !== -1 ) {
                return classValue;
            }
        } ).filter(element => element).join();
    }

    process_tooltip(moduleClass = '' , advanced_button_container = ''){
        const props = this.props;

        const tooltipStatus  = 'on' === props.field_tooltip_enable;
        const tooltipOffsetStatus  = 'on' === props.field_tooltip_offset_enable;
        const offsetSkidding = tooltipOffsetStatus && props.field_tooltip_offset_skidding ? parseInt(props.field_tooltip_offset_skidding) : 0;
        const offsetDistance = tooltipOffsetStatus && props.field_tooltip_offset_distance ? parseInt(props.field_tooltip_offset_distance) : 10;
		const showDelay = props.field_tooltip_content_delay && "" !== props.field_tooltip_content_delay ? parseInt(props.field_tooltip_content_delay) : 300;
		const hideDelay = props.field_tooltip_interactive_debounce && "" !== props.field_tooltip_interactive_debounce ? parseInt(props.field_tooltip_interactive_debounce) : 0;

        if (advanced_button_container && tooltipStatus) {
            const options = {
                arrow    : 'on' === props.field_tooltip_arrow,
                animation: props.field_tooltip_animation ? props.field_tooltip_animation : 'fade',
                placement: props.field_tooltip_placement ? props.field_tooltip_placement : 'top',
                trigger  : 'mouseenter focus',
                followCursor: false,
                allowHTML: true,
                interactive: 'on' === props.field_tooltip_interactive,
                interactiveBorder: props.field_tooltip_interactive_border ? parseInt(props.field_tooltip_interactive_border) : 2,
                maxWidth: props.field_tooltip_custom_maxwidth ? parseInt(props.field_tooltip_custom_maxwidth) : 370,
                offset:[offsetSkidding , offsetDistance],
                delay: [showDelay, hideDelay],
                theme: `.${moduleClass}`
            };
            const tooltipContent = advanced_button_container.dataset.options;
            if(undefined !== tooltipContent){
                options['content'] =  tooltipContent;
                if(null !== this.tippy_instance) {
                    this.tippy_instance.destroy();
                    this.tippy_instance = null;
                }
                this.tippy_instance = tippy(advanced_button_container, options);
            }
        }
    }

    static css(props) {
        let additionalCss = [];
        const main_css_element = "%%order_class%% .difl_advanced_button_container";

        if(props.button_alignment){
            const button_alignment = props.button_alignment ? props.button_alignment : 'left';
            const button_alignment_tablet = props.button_alignment_tablet ? props.button_alignment_tablet : button_alignment;
            const button_alignment_phone = props.button_alignment_phone ? props.button_alignment_phone : button_alignment_tablet;
            additionalCss.push([{
                selector:    `%%order_class%%`,
                declaration: `text-align: ${button_alignment};`,
            },{
                selector:    `%%order_class%%`,
                declaration: `text-align: ${button_alignment_tablet};`,
                'device': 'tablet',
            },{
                selector:    `%%order_class%%`,
                declaration: `text-align: ${button_alignment_phone};`,
                'device': 'phone',
            }]);
        }
        if(props.button_content_alignment){
            let button_content_alignment = props.button_content_alignment ? props.button_content_alignment : 'center';
            let button_content_alignment_tablet = props.button_content_alignment_tablet ? props.button_content_alignment_tablet : button_content_alignment;
            let button_content_alignment_phone = props.button_content_alignment_phone ? props.button_content_alignment_phone : button_content_alignment_tablet;
            if('justified' === button_content_alignment) button_content_alignment = 'space-between';
            if('justified' === button_content_alignment_tablet) button_content_alignment_tablet = 'space-between';
            if('justified' === button_content_alignment_phone) button_content_alignment_phone = 'space-between';
            additionalCss.push([{
                selector:    `${main_css_element} .difl_adv_btn_wrapper`,
                declaration: `justify-content: ${button_content_alignment};`,
            },{
                selector:    `%%order_class%%`,
                declaration: `justify-content: ${button_content_alignment_tablet};`,
                'device': 'tablet',
            },{
                selector:    `%%order_class%%`,
                declaration: `justify-content: ${button_content_alignment_phone};`,
                'device': 'phone',
            }]);
        }

        if( props.use_button_icon && "on" === props.use_button_icon ) {
            utility.process_icon_font_style({
                'props': props,
                'additionalCss': additionalCss,
                'key': 'button_icon',
                'selector': `${main_css_element} .difl_adv_btn_wrapper .difl_adv_btn_icon`,
                'important': true
            });

            utility.process_color({
                props           : props,
                additionalCss   : additionalCss,
                key             : 'icon_color',
                selector        : `${main_css_element} .difl_adv_btn_wrapper .difl_adv_btn_icon, ${main_css_element} .difl_adv_btn_wrapper .difl_adv_btn_icon_hover`,
                type            : "color"
            });
            if(props.button_icon__hover && "" !== props.button_icon__hover) {
                utility.process_icon_font_style({
                    'props': props,
                    'additionalCss': additionalCss,
                    'key': 'button_icon__hover',
                    'selector': `${main_css_element} .difl_adv_btn_wrapper .difl_adv_btn_icon_hover`,
                    'important': true
                });
            }
            utility.process_range_value({
                props           : props,
                key             : "button_icon_size",
                additionalCss   : additionalCss,
                selector        : `${main_css_element} .difl_adv_btn_wrapper .difl_adv_btn_icon, ${main_css_element} .difl_adv_btn_wrapper .difl_adv_btn_icon_hover`,
                default_value   : '20px',
                type            : "font-size"
            });
        }
        utility.process_color({
            props           : props,
            additionalCss   : additionalCss,
            key             : 'media_background_color',
            selector        : `${main_css_element} .difl_adv_btn_wrapper .difl_adv_btn_media_wrapper`,
            type            : "background-color"
        });

        if( props.media_placement && 'media_right' === props.media_placement ){
            additionalCss.push([{
                selector:    `${main_css_element} .difl_adv_btn_wrapper .difl_adv_btn_media_wrapper`,
                declaration: `order: 2;`,
            }]);
            additionalCss.push([{
                selector:    `${main_css_element} .difl_adv_btn_wrapper .difl_adv_btn_text_wrapper`,
                declaration: `order: 1;`,
            }]);
        }
        // Hover Icon placement
        if(props.media_placement__hover){
            if('media_right' === props.media_placement__hover){
                additionalCss.push([{
                    selector:    `${main_css_element}.hover_state_enabled .difl_adv_btn_wrapper .difl_adv_btn_media_wrapper`,
                    declaration: `order: 2;`,
                }]);
                additionalCss.push([{
                    selector:    `${main_css_element}.hover_state_enabled .difl_adv_btn_wrapper .difl_adv_btn_text_wrapper`,
                    declaration: `order: 1;`,
                }]);
            }else{
                additionalCss.push([{
                    selector:    `${main_css_element}.hover_state_enabled .difl_adv_btn_wrapper .difl_adv_btn_media_wrapper`,
                    declaration: `order: 1;`,
                }]);
                additionalCss.push([{
                    selector:    `${main_css_element}.hover_state_enabled .difl_adv_btn_wrapper .difl_adv_btn_text_wrapper`,
                    declaration: `order: 2;`,
                }]);
            }
        }

        /* Effects */
        // Background
        if(props.bg_hover_background_color && '' !== props.bg_hover_background_color){
            utility.process_color({
                props           : props,
                additionalCss   : additionalCss,
                key             : 'bg_hover_background_color',
                selector        : `${main_css_element}`,
                type            : "--dfab-bg-hover-background-color"
            });
        }
        // Hypen
        if('on' === props.bg_hover_effect_hyper && ['dfab_reveal', 'dfab_ripple'].includes(props.bg_hover_effects)){
            const bg_hover_hypen_color = props.bg_hover_hypen_color ? props.bg_hover_hypen_color : "#333";
            additionalCss.push([{
                selector:    `${main_css_element}`,
                declaration: `--dfab-bg-hover-hypen-color: ${bg_hover_hypen_color};`,
            }]);
        }
        // Bounce
        if( props.bg_hover_effects && ['dfab_reveal', 'dfab_door_open', 'dfab_skew', 'dfab_two_shade'].includes(props.bg_hover_effects) && 'on' === props.bg_hover_effect_bounce ){
            additionalCss.push([{
                selector:    `${main_css_element}`,
                declaration: `--dfab-bg-hover-background-transition-timimg-function: cubic-bezier(.52,1.64,.37,.66) !important;`,
            }]);
        }
        // Two Shade Secondary
        if( props.bg_hover_effects && 'dfab_two_shade' === props.bg_hover_effects ){
            utility.process_color({
                props           : props,
                additionalCss   : additionalCss,
                key             : 'bg_hover_background_secondary_color',
                selector        : `${main_css_element}`,
                type            : "--dfab-bg-hover-background-secondary-color"
            });
        }

        // Border Effect
        if ( props.border_hover_color  && 'dfab_none' !== props.border_hover_effects )
        {
            utility.process_color({
                props: props,
                additionalCss: additionalCss,
                key: 'border_hover_color',
                selector: `${main_css_element}`,
                type: "--dfab-border-hover-background-color"
            });
        }
        /* Effects */

        // Media Container Width & Height
        utility.process_range_value({
            props           : props,
            key             : "media_wrapper_width",
            additionalCss   : additionalCss,
            selector        : `${main_css_element}`,
            default_value   : '30px',
            type            : "--dfab-media-wrapper-width"
        });
        utility.process_range_value({
            props           : props,
            key             : "media_wrapper_height",
            additionalCss   : additionalCss,
            selector        : `${main_css_element}`,
            default_value   : '30px',
            type            : "--dfab-media-wrapper-height"
        });

        // Content Container Margin & Padding
        utility.process_margin_padding({
            props: props,
            key: "content_container_margin",
            additionalCss: additionalCss,
            selector: `${main_css_element} .difl_adv_btn_wrapper .difl_adv_btn_text_wrapper`,
            type: "margin",
        });
        utility.process_margin_padding({
            props: props,
            key: "content_container_padding",
            additionalCss: additionalCss,
            selector: `${main_css_element} .difl_adv_btn_wrapper .difl_adv_btn_text_wrapper`,
            type: "padding",
        });

        // Text Margin & Padding
        utility.process_margin_padding({
            props: props,
            key: "text_margin",
            additionalCss: additionalCss,
            selector: `${main_css_element} .difl_adv_btn_wrapper .difl_adv_btn_text_wrapper .difl_adv_btn_text, ${main_css_element} .difl_adv_btn_wrapper .difl_adv_btn_text_wrapper .difl_adv_btn_text_hover`,
            type: "margin",
        });
        utility.process_margin_padding({
            props: props,
            key: "text_padding",
            additionalCss: additionalCss,
            selector: `${main_css_element} .difl_adv_btn_wrapper .difl_adv_btn_text_wrapper .difl_adv_btn_text, ${main_css_element} .difl_adv_btn_wrapper .difl_adv_btn_text_wrapper .difl_adv_btn_text_hover`,
            type: "padding",
        });

        // Sub Text Margin & Padding
        utility.process_margin_padding({
            props: props,
            key: "sub_text_margin",
            additionalCss: additionalCss,
            selector: `${main_css_element} .difl_adv_btn_sub_text, ${main_css_element} .difl_adv_btn_sub_text_hover`,
            type: "margin",
        });
        utility.process_margin_padding({
            props: props,
            key: "sub_text_padding",
            additionalCss: additionalCss,
            selector: `${main_css_element} .difl_adv_btn_sub_text, ${main_css_element} .difl_adv_btn_sub_text_hover`,
            type: "padding",
        });

        /* Transition Data */
        if(props.bg_hover_effects && 'dfab_none' !== props.bg_hover_effects){
            const bg_transition_duration = props.bg_transition_duration ? props.bg_transition_duration : 0.5;
            const bg_transition_delay = props.bg_transition_delay ? props.bg_transition_delay : 0.0;
            const bg_transition_timing_function = props.bg_transition_timing_function ? props.bg_transition_timing_function : 'ease-out';
            additionalCss.push([{
                selector: `${main_css_element}`,
                declaration: `--dfab-bg-hover-background-transtion-time: ${bg_transition_duration}s;--dfab-bg-hover-background-transition-timimg-function: ${bg_transition_timing_function};--dfab-bg-hover-background-transtion-delay: ${bg_transition_delay}s;`,
            }]);
        }
        if(props.border_hover_effects && 'dfab_none' !== props.border_hover_effects){
            const stroke_transition_duration = props.stroke_transition_duration ? props.stroke_transition_duration : 0.5;
            const stroke_transition_delay = props.stroke_transition_delay ? props.stroke_transition_delay : 0.0;
            const stroke_transition_timing_function = props.stroke_transition_timing_function ? props.stroke_transition_timing_function : 'ease-out';
            additionalCss.push([{
                selector: `${main_css_element}`,
                declaration: `--dfab-border-hover-background-transtion-time: ${stroke_transition_duration}s;--dfab-border-hover-background-transition-timimg-function: ${stroke_transition_timing_function};--dfab-border-hover-background-transtion-delay: ${stroke_transition_delay}s;`,
            }]);
        }
        if(props.media_hover_effects && 'dfab_none' !== props.media_hover_effects){
            const media_transition_duration = props.media_transition_duration ? props.media_transition_duration : 0.5;
            const media_transition_delay = props.media_transition_delay ? props.media_transition_delay : 0.0;
            const media_transition_timing_function = props.media_transition_timing_function ? props.media_transition_timing_function : 'ease-out';
            additionalCss.push([{
                selector: `${main_css_element}`,
                declaration: `--dfab-media-hover-transition-duration: ${media_transition_duration}s;--dfab-media-hover-transition-function: ${media_transition_timing_function};--dfab-media-hover-transition-delay: ${media_transition_delay}s;`,
            }]);
        }
        if(props.two_d_hover_effects && 'dfab_none' !== props.two_d_hover_effects){
            const two_d_transition_duration = props.two_d_transition_duration ? props.two_d_transition_duration : 0.5;
            const two_d_transition_delay = props.two_d_transition_delay ? props.two_d_transition_delay : 0.0;
            additionalCss.push([{
                selector: `${main_css_element}`,
                declaration: `--dfab-two-d-animation-duration: ${two_d_transition_duration}s;--dfab-two-d-animation-delay: ${two_d_transition_delay}s;`,
            }]);
        }
        /* Transition Data */

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

    process_button_markup(props){
        const utils = window.ET_Builder.API.Utils;

        /* Effects */
        let classes = '';
        // Media Placement
        const media_placement = props.media_placement ?  props.media_placement : 'media_left';
        if("" !== media_placement){
            classes += " " + media_placement;
        }
        // Background
        const background_hover_effect = props.bg_hover_effects ? props.bg_hover_effects : "";
        let background_hover_effect_markup = '';
        if("" !== background_hover_effect) {
            classes += " " + background_hover_effect;
            background_hover_effect_markup = <span className="difl_adv_btn_bg_anim"></span>;
        }
        if ("" !== background_hover_effect && ['dfab_reveal', 'dfab_reveal_with_hypen', 'dfab_two_shade'].includes(background_hover_effect)){
            const background_hover_effect_direction = props.bg_hover_effect_directions ? props.bg_hover_effect_directions : "dfab_left";
            classes += " "+background_hover_effect_direction;
        }
        // Hypen
        if('on' === props.bg_hover_effect_hyper && ['dfab_reveal', 'dfab_ripple'].includes(background_hover_effect)){
            classes += " dfab_hypen"
        }
        let ripple_position_aware = "";
        if('dfab_ripple_position_aware' === props.bg_hover_effects){
            ripple_position_aware = <span className='dfab_position_aware_bg'></span>;

        }
        if('dfab_skew' === props.bg_hover_effects){
            const bg_hover_skew_effect_directions = props.bg_hover_skew_effect_directions ? props.bg_hover_skew_effect_directions : "dfab_top_left";
            classes += " "+bg_hover_skew_effect_directions

        }
        // Border
        const border_hover_effect = props.border_hover_effects && 'dfab_none' !== props.border_hover_effects ? props.border_hover_effects : "";
        let border_hover_effect_markup = "";
        if ( "" !== border_hover_effect ) {
            classes += " " + border_hover_effect;
            border_hover_effect_markup = <><span className="difl_adv_btn_border_anim"></span>
            <span className="difl_adv_btn_border_anim_2"></span></>;
        }

        // 2D Effects
        const two_d_hover_effect = props.two_d_hover_effects && 'dfab_none' !== props.two_d_hover_effects ? props.two_d_hover_effects : "";
        if ( "" !== two_d_hover_effect ) {
            classes += " " + two_d_hover_effect + " dfab__animate";
        }
        /* Effects */

        /* Media Effects */
        // Media show on hover
        const media_hover_effects = props.media_hover_effects && 'dfab_none' !== props.media_hover_effects ? props.media_hover_effects : "";
        if ( "" !== media_hover_effects ) {
            classes += " " + media_hover_effects;
        }
        if(['dfab_media_reveal', 'dfab_media_slide'].includes(props.media_hover_effects)){
            const media_hover_effect_directions = props.media_hover_effect_directions ? props.media_hover_effect_directions : "dfab_mr_left";
            classes += " " + media_hover_effect_directions;
        }

        let btn_sub_text_hover = '';
        if (props.button_sub_text__hover && "" !== props.button_sub_text__hover) {
            btn_sub_text_hover = <span className="difl_adv_btn_sub_text_hover">{props.button_sub_text__hover}</span>;
        }

        let sub_text_markup = "";
        let sub_text_markup_outside = "";
        if( 'on' === props.sub_text_placement && props.button_sub_text && props.button_sub_text.length > 0 ){
            sub_text_markup_outside = <><span className="difl_adv_btn_sub_text">{props.button_sub_text}</span>{btn_sub_text_hover}</>;
        } else {
            sub_text_markup = <><span className="difl_adv_btn_sub_text">{props.button_sub_text}</span>{btn_sub_text_hover}</>;
        }

        const btn_text = props.button_text && props.button_text.length > 0 ? props.button_text : "Click Here";
        let btn_text_hover = '';
        if (props.button_text__hover && "" !== props.button_text__hover) {
            btn_text_hover =<span className="difl_adv_btn_text_hover">{props.button_text__hover}</span>;
        }

        let btn_media_markup = '';
        if( props.use_button_icon && "on" === props.use_button_icon ) {
            if (!props.button_icon && "" === props.button_icon) return "";
            const DynamicIcon = utility.df_collect_dynamic_content('button_icon', props);
            const button_icon = utils.processFontIcon(!!DynamicIcon ? DynamicIcon : '&#xe08a;||divi||400');
            let font_icon_hover = '';
            if(props.button_icon__hover && "" !== props.button_icon__hover) {
                const DynamicIconHover = utility.df_collect_dynamic_content('button_icon__hover', props);
                const button_icon_hover = utils.processFontIcon(!!DynamicIconHover ? DynamicIconHover : '&#xe08a;||divi||400');
                font_icon_hover = <span className="et-pb-icon difl_adv_btn_media difl_adv_btn_icon_hover">{button_icon_hover}</span>;
            }
            btn_media_markup = <><span className="et-pb-icon difl_adv_btn_media difl_adv_btn_icon">{button_icon}</span>{font_icon_hover}</>;
        }
        if( "on" !== props.use_button_icon && "" !== props.button_image ){
            let button_image_hover = '';
            if(props.button_image__hover && "" !== props.button_image__hover) {
                button_image_hover = <img className="difl_adv_btn_media difl_adv_btn_img_hover" src={props.button_image__hover} alt="Advanced Button" title="" />;
            }
            btn_media_markup = <><img className="difl_adv_btn_media difl_adv_btn_img" src={props.button_image} alt="Advanced Button" />{button_image_hover}</>;
        }
        const tooltip_content = props.field_tooltip_content && props.field_tooltip_content !== '' ? props.field_tooltip_content.replace(/<p[^>]*>(?:\s|&nbsp;)*<\/p>/g, '') : null;

        let hover_state = '';
        if(props.hover_enabled && props.hover_enabled === 1){
            hover_state = ' hover_state_enabled';
        }

        return (
            <a className={`difl_advanced_button_container${classes}${hover_state} builder_view`} href="#" ref={this.wrapper} data-options={tooltip_content}>
					<span className="difl_adv_btn_wrapper">
                        {"" !== btn_media_markup ? <span className="difl_adv_btn_media_wrapper">{btn_media_markup}</span> : ''}
                        <span className="difl_adv_btn_text_wrapper">
							<span className="difl_adv_btn_text">{btn_text}</span>
                            {btn_text_hover}
                            {sub_text_markup}
					    </span>
					</span>
                {sub_text_markup_outside}
                {ripple_position_aware}
                {background_hover_effect_markup}
                {border_hover_effect_markup}
            </a>
        );
    }

    render() {
        const props = this.props;
        return (
            <Fragment>
                {this.state.loading === false ?
                    <>{this.process_button_markup(props)}</> :
                    <div className="et-fb-preloader et-fb-preloader__loading">
                        <div className="et-fb-loader"/>
                    </div>
                }
            </Fragment>
        );
    }
}

export default AdvancedButton;