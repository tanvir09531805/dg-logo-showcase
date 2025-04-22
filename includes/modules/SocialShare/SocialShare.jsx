import React, {Component, Fragment} from 'react';
import   '../../../public/js/lib/popper.min.js';
import  '../../../public/js/lib/tippy-bundle.min.js';
import tippy from 'tippy.js';

// Internal Dependencies
import './style.css';
import utility from "../../../scripts/df_scripts/utilities";

class SocialShare extends Component {
    static slug = 'difl_social_share';
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
            this.setState({loading: false})
        }
	    if (this.wrapper.current.querySelector('.difl_social_share_item')) {
		    this.process_tooltip(true, this.wrapper.current.querySelectorAll('.difl_social_share_item'));
	    }
    }

	componentDidUpdate(prevProps, prevState) {
		const _this = this;

		if (this.state.loading === true) {
			this.setState({ loading: false })
			return;
		}

		if(_this.wrapper.current) {
			if (_this.wrapper.current.querySelector('.difl_social_share_item')) {
				const  moduleClasses =_this.wrapper.current.parentNode.parentNode.classList;
				let singleClass ='';
				if(moduleClasses){
					singleClass =  _this.getModuleClass(moduleClasses);
				}
				_this.process_tooltip(singleClass, _this.wrapper.current.querySelectorAll('.difl_social_share_item'));
			}
		}

		for (const index in prevProps) {
			if (prevProps[index] !== _this.props[index]) {
				if (_this.computed.includes(index)) {
					this.setState({ loading: true });
					if(_this.wrapper.current) {

						if (_this.wrapper.current.querySelector('.difl_social_share_item')) {
							const  moduleClasses =_this.wrapper.current.parentNode.parentNode.classList;
							let singleClass ='';
							if(moduleClasses){
								singleClass =  _this.getModuleClass(moduleClasses);
							}
							_this.process_tooltip(singleClass, _this.wrapper.current.querySelectorAll('.difl_social_share_item'));
						}

					}
				}
			}
		}
	}

    componentWillUnmount() {
        this._isMounted = false;
    }

    static css(props) {
        let additionalCss = [];

        const column_template_ref = {
            'auto'  : 'gap: 10px; display: inline-flex; flex-wrap: wrap;',
            'one'   : 'display: grid; grid-template-columns: repeat(1, 1fr);',
            'two'   : 'display: grid; grid-template-columns: repeat(2, 1fr);',
            'three' : 'display: grid; grid-template-columns: repeat(3, 1fr);',
            'four'  : 'display: grid; grid-template-columns: repeat(4, 1fr);',
            'five'  : 'display: grid; grid-template-columns: repeat(5, 1fr);',
            'six'   : 'display: grid; grid-template-columns: repeat(6, 1fr);',
        };
        const column_view = props.column_view ? props.column_view : 'auto';
        const column_view_tablet = props.column_view_tablet ? props.column_view_tablet : column_view;
        const column_view_phone = props.column_view_phone ? props.column_view_phone : column_view_tablet;
        additionalCss.push([{
            selector:    `%%order_class%% #difl-social-share-container.difl_social_share_container`,
            declaration: column_template_ref[column_view],
        },{
            selector:    `%%order_class%% #difl-social-share-container.difl_social_share_container`,
            declaration: column_template_ref[column_view_tablet],
            'device': 'tablet',
        },{
            selector:    `%%order_class%% #difl-social-share-container.difl_social_share_container`,
            declaration: column_template_ref[column_view_phone],
            'device': 'phone',
        }]);

        utility.process_range_value({
            props           : props,
            key             : "columns_gap",
            additionalCss   : additionalCss,
            selector        : `%%order_class%% #difl-social-share-container.difl_social_share_container`,
            default_value   : '10px',
            type            : "column-gap"
        });

        utility.process_range_value({
            props           : props,
            key             : "rows_gap",
            additionalCss   : additionalCss,
            selector        : `%%order_class%% #difl-social-share-container.difl_social_share_container`,
            default_value   : '10px',
            type            : "row-gap"
        });

        // Button Height
        utility.process_range_value({
            props           : props,
            key             : "button_height",
            additionalCss   : additionalCss,
            selector        : `%%order_class%% #difl-social-share-container.difl_social_share_container .difl_social_share_item_wrapper`,
            type            : "height"
        });
        if([ 'column', 'column-reverse' ].includes(props.icon_position) && '' !== props.button_height){
            additionalCss.push([{
                selector: "%%order_class%% #difl-social-share-container .difl_social_share_item_wrapper",
                declaration: `justify-content: center;`,
            }]);
        }

        utility.process_color({
            props           : props,
            key             : "icon_color",
            additionalCss   : additionalCss,
            selector        : `%%order_class%% #difl-social-share-container a.difl_social_share_item_wrapper .difl_social_share_icon i:before`,
            type            : "color"
        });
        if( props.use_icon_font_size && 'on' === props.use_icon_font_size ){
            utility.process_range_value({
                props           : props,
                key             : "icon_font_size",
                additionalCss   : additionalCss,
                selector        : `%%order_class%% #difl-social-share-container .difl_social_share_item_wrapper`,
                default_value   : '16px',
                type            : "--df-ss-icon-font-size"
            });
        }

        // Content Alignment
        const content_alignment = props.content_alignment ? props.content_alignment : 'left';
        const content_alignment_tablet = props.content_alignment_tablet ? props.content_alignment_tablet : content_alignment;
        const content_alignment_phone = props.content_alignment_phone ? props.content_alignment_phone : content_alignment_tablet;
        additionalCss.push([{
            selector:    `%%order_class%% > div:first-of-type`,
            declaration: `text-align: ${content_alignment};`,
        },{
            selector:    `%%order_class%% > div:first-of-type`,
            declaration: `text-align: ${content_alignment_tablet};`,
            'device': 'tablet',
        },{
            selector:    `%%order_class%% > div:first-of-type`,
            declaration: `text-align: ${content_alignment_phone};`,
            'device': 'phone',
        }]);

        // Column Auto Child Content Alignment
        if('auto' === props.column_view){
            const column_auto_child_item_alignment = props.column_auto_child_item_alignment ? props.column_auto_child_item_alignment : 'center';
            const column_auto_child_item_alignment_tablet = props.column_auto_child_item_alignment_tablet ? props.column_auto_child_item_alignment_tablet : column_auto_child_item_alignment;
            const column_auto_child_item_alignment_phone = props.column_auto_child_item_alignment_phone ? props.column_auto_child_item_alignment_phone : column_auto_child_item_alignment_tablet;
            additionalCss.push([{
                selector:    `%%order_class%% .difl_social_share_container`,
                declaration: `justify-content: ${column_auto_child_item_alignment};`,
            },{
                selector:    `%%order_class%% .difl_social_share_container`,
                declaration: `justify-content: ${column_auto_child_item_alignment_tablet};`,
                'device': 'tablet',
            },{
                selector:    `%%order_class%% .difl_social_share_container`,
                declaration: `justify-content: ${column_auto_child_item_alignment_phone};`,
                'device': 'phone',
            }]);
        }

        // Child Content Alignment
        const child_content_alignment = props.child_content_alignment ? props.child_content_alignment : 'center';
        const child_content_alignment_tablet = props.child_content_alignment_tablet ? props.child_content_alignment_tablet : child_content_alignment;
        const child_content_alignment_phone = props.child_content_alignment_phone ? props.child_content_alignment_phone : child_content_alignment_tablet;
        let css_key = 'justify-content';
        if([ 'column', 'column-reverse' ].includes(props.icon_position)){
            css_key = 'align-items';
        }
        additionalCss.push([{
            selector:    `%%order_class%% #difl-social-share-container .difl_social_share_item_wrapper`,
            declaration: `${css_key}: ${child_content_alignment};`,
        },{
            selector:    `%%order_class%% #difl-social-share-container .difl_social_share_item_wrapper`,
            declaration: `${css_key}: ${child_content_alignment_tablet};`,
            'device': 'tablet',
        },{
            selector:    `%%order_class%% #difl-social-share-container .difl_social_share_item_wrapper`,
            declaration: `${css_key}: ${child_content_alignment_phone};`,
            'device': 'phone',
        }]);

        const icon_position = props.icon_position ? props.icon_position : '';
        additionalCss.push([{
            selector: "%%order_class%% #difl-social-share-container .difl_social_share_item_wrapper",
            declaration: `flex-direction: ${icon_position};`,
        }]);

        const icon_alignment = props.icon_alignment ? props.icon_alignment : '';
        additionalCss.push([{
            selector: "%%order_class%% #difl-social-share-container .difl_social_share_item_wrapper .difl_social_share_icon",
            declaration: `align-self: ${icon_alignment};`,
        }]);

        // Icon Custom Padding
        const icon_container_padding = props.icon_container_padding ? props.icon_container_padding : '';
        const icon_container_padding_tablet = props.icon_container_padding_tablet ? props.icon_container_padding_tablet : icon_container_padding;
        const icon_container_padding_phone = props.icon_container_padding_phone ? props.icon_container_padding_phone : icon_container_padding_tablet;
        if ( '' !== icon_container_padding || '' !== icon_container_padding_tablet || '' !== icon_container_padding_phone ) {
            additionalCss.push([{
                selector: "%%order_class%% #difl-social-share-container.difl_social_share_container a.difl_social_share_item_wrapper .difl_social_share_icon",
                declaration: `width: auto; height: auto;`,
            }]);
        }

        // Icon Background
        utility.df_process_bg({
            props: props,
            additionalCss: additionalCss,
            key: "icon_bg_color",
            selector: "%%order_class%% #difl-social-share-container .difl_social_share_item_wrapper .difl_social_share_icon",
            important: false,
        });

        // Label Container Background
        utility.df_process_bg({
            props: props,
            additionalCss: additionalCss,
            key: "text_container_bg_color",
            selector: "%%order_class%% #difl-social-share-container .difl_social_share_item_wrapper .difl_social_share_content",
            important: false,
        });

        // Header
        const header_icon_position = props.header_icon_position ? props.header_icon_position : 'row';
        additionalCss.push([{
            selector: "%%order_class%% #difl-social-share-header-container.difl_social_share_header_container",
            declaration: `flex-direction: ${header_icon_position};`,
        }]);

        const header_icon_alignment = props.header_icon_alignment ? props.header_icon_alignment : 'center';
        additionalCss.push([{
            selector: "%%order_class%% #difl-social-share-header-container.difl_social_share_header_container .difl_social_share_header_icon",
            declaration: `align-self: ${header_icon_alignment};`,
        }]);

	    utility.process_icon_font_style({
		    props: props,
		    additionalCss: additionalCss,
		    key: "header_icon",
		    selector: "%%order_class%% #difl-social-share-header #difl-social-share-header-container.difl_social_share_header_container .difl_social_share_header_icon",
	    });
        utility.process_color({
            props           : props,
            key             : "header_icon_color",
            additionalCss   : additionalCss,
            selector        : `%%order_class%% #difl-social-share-header #difl-social-share-header-container.difl_social_share_header_container .difl_social_share_header_icon`,
            type            : "color"
        });
        if( props.use_header_icon_font_size && 'on' === props.use_header_icon_font_size ){
            utility.process_range_value({
                props           : props,
                key             : "header_icon_font_size",
                additionalCss   : additionalCss,
                selector        : `%%order_class%% #difl-social-share-header #difl-social-share-header-container.difl_social_share_header_container`,
                default_value   : '16px',
                type            : "--df-header-icon-size"
            });
        }
        utility.df_process_bg({
            props: props,
            additionalCss: additionalCss,
            key: "header_container_bg_color",
            selector: "%%order_class%% #difl-social-share-header #difl-social-share-header-container.difl_social_share_header_container",
            important: false,
        });
        // Header Item Gap
        utility.process_range_value({
            props           : props,
            key             : "header_content_gap",
            additionalCss   : additionalCss,
            selector        : `%%order_class%% #difl-social-share-header-container.difl_social_share_header_container`,
            type            : "gap"
        });
        // Header Alignment
        const header_alignment = props.header_alignment ? props.header_alignment : 'flex-start';
        additionalCss.push([{
            selector: "%%order_class%% .difl_social_share_header",
            declaration: `justify-content: ${header_alignment};`,
        }]);

        /*------ Spacing ------*/
        // Icon
        utility.process_margin_padding({
            props: props,
            key: "icon_container_margin",
            additionalCss: additionalCss,
            selector: "%%order_class%% #difl-social-share-container .difl_social_share_item_wrapper .difl_social_share_icon",
            type: "margin",
            important: false,
        });
        utility.process_margin_padding({
            props: props,
            key: "icon_container_padding",
            additionalCss: additionalCss,
            selector: "%%order_class%% #difl-social-share-container .difl_social_share_item_wrapper .difl_social_share_icon",
            type: "padding",
            important: false,
        });
        // Label
        utility.process_margin_padding({
            props: props,
            key: "label_container_margin",
            additionalCss: additionalCss,
            selector: "%%order_class%% #difl-social-share-container .difl_social_share_item_wrapper .difl_social_share_content_container",
            type: "margin",
            important: false,
        });
        utility.process_margin_padding({
            props: props,
            key: "label_container_padding",
            additionalCss: additionalCss,
            selector: "%%order_class%% #difl-social-share-container .difl_social_share_item_wrapper .difl_social_share_content",
            type: "padding",
            important: false,
        });
        // Header Container
        utility.process_margin_padding({
            props: props,
            key: "header_container_margin",
            additionalCss: additionalCss,
            selector: "%%order_class%% #difl-social-share-header-container.difl_social_share_header_container",
            type: "margin",
            important: false,
        });
        utility.process_margin_padding({
            props: props,
            key: "header_container_padding",
            additionalCss: additionalCss,
            selector: "%%order_class%% #difl-social-share-header-container.difl_social_share_header_container",
            type: "padding",
            important: false,
        });
        // Header Text Container
        utility.process_margin_padding({
            props: props,
            key: "header_text_container_margin",
            additionalCss: additionalCss,
            selector: "%%order_class%% #difl-social-share-header-container.difl_social_share_header_container .difl_social_share_header_content",
            type: "margin",
            important: false,
        });
        utility.process_margin_padding({
            props: props,
            key: "header_text_container_padding",
            additionalCss: additionalCss,
            selector: "%%order_class%% #difl-social-share-header-container.difl_social_share_header_container .difl_social_share_header_content",
            type: "padding",
            important: false,
        });
        // Share Button
        utility.process_margin_padding({
            props: props,
            key: "share_button_margin",
            additionalCss: additionalCss,
            selector: "%%order_class%% #difl-social-share-container .difl_social_share_item_wrapper",
            type: "margin",
            important: false,
        });
        utility.process_margin_padding({
            props: props,
            key: "share_button_padding",
            additionalCss: additionalCss,
            selector: "%%order_class%% #difl-social-share-container .difl_social_share_item_wrapper",
            type: "padding",
            important: false,
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

    process_header(props) {
        let headerOutput = '';

        if ('on' === props.enable_header) {
            const headerTitle = props.header_title ? props.header_title : '';
            const headerSubTitle = props.header_sub_title ? props.header_sub_title : '';

            let headerContent = '';
            if (headerTitle || headerSubTitle) {
                headerContent = (
                    <div className="difl_social_share_header_content">
                        {headerTitle && <span className="difl_social_share_header_title">{headerTitle}</span>}
                        {headerSubTitle && <span className="difl_social_share_header_sub_title">{headerSubTitle}</span>}
                    </div>
                );
            }

            let headerIcon = '';
            if(props.header_icon){
                const utils = window.ET_Builder.API.Utils;
                const DynamicIcon = utility.df_collect_dynamic_content('header_icon', props);
                const ItemIcon = utils.processFontIcon(DynamicIcon);
                headerIcon =  <span className='et-pb-icon difl_social_share_header_icon'>{ItemIcon}</span>;
            }

            headerOutput = (
                <div id="difl-social-share-header" className="difl_social_share_header">
                    <div id="difl-social-share-header-container" className="difl_social_share_header_container">
                        {headerIcon}
                        {headerContent}
                    </div>
                </div>
            );
        }

        return headerOutput;
    }

	getModuleClass(moduleClassList= []){
		return Array.prototype.map.call( moduleClassList, ( classValue ) => {
			if ( classValue.indexOf( 'difl_social_share_' ) !== -1 ) {
				return classValue;
			}
		} ).filter(element => element).join();
	}

	process_tooltip(moduleClass = '' , social_share_items = ''){
		const props = this.props;

		const tooltipStatus  = 'on' === props.field_tooltip_enable;
		const tooltipOffsetStatus  = 'on' === props.field_tooltip_offset_enable;
		const offsetSkidding = tooltipOffsetStatus && props.field_tooltip_offset_skidding ? parseInt(props.field_tooltip_offset_skidding) : 0;
		const offsetDistance = tooltipOffsetStatus && props.field_tooltip_offset_distance ? parseInt(props.field_tooltip_offset_distance) : 10;

		if (social_share_items && tooltipStatus) {
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
			[].forEach.call(social_share_items, function (social_share_item) {
				if(social_share_item){
					const tooltipContent = social_share_item.querySelector('noscript');
					if(undefined !== tooltipContent && null !== tooltipContent){
						options['content'] =  tooltipContent.textContent;
						tippy(social_share_item, options);
					}
				}
			})
		}
	}

    render() {
        const props = this.props;
        window.ETBuilderBackend.i18n.modules.diflSocialShare = {
            url_new_window: props.url_new_window ? props.url_new_window : 'on',
            // show_label: props.show_label ? props.show_label : 'on',
            item_view : props.item_view ? props.item_view : 'iconAndText',
            hover_animation : '',
        };
        return (
            <Fragment>
                {this.state.loading === false ?
                    <>
                        {this.process_header(props)}
                        {<div id="difl-social-share-container" className="difl_social_share_container" ref={this.wrapper}>
                            {props.content.length !== 0 ?
                                props.content
                                :
                                <h4 className="difl_social_share_empty_content"> Add Social Share Item </h4>
                            }
                        </div>}
                    </>:
                    <div className="et-fb-preloader et-fb-preloader__loading">
                        <div className="et-fb-loader"/>
                    </div>
                }
            </Fragment>
        );
    }
}
export default SocialShare;