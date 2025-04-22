// External Dependencies
import React, { Component } from 'react';
import utility from '../../../scripts/df_scripts/utilities';
// Internal Dependencies
import './style.css';


class ContentCarouselItem extends Component {
    static slug = 'difl_contentcarouselitem';
    _isMounted = false;

    constructor(props) {
        super(props);

        this.wrapper = React.createRef();
        this.add_wrapper_class = this.add_wrapper_class.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.add_wrapper_class();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    add_wrapper_class() {
        this.wrapper.current.parentElement.parentElement.classList.add('swiper-slide');
    }

    static css(props) {
        const additionalCss = [];

        // orders
        utility.process_range_value({
            'props'             : props,
            'key'               : 'image_order',
            'additionalCss'     : additionalCss,
            'selector'          : '.difl_contentcarousel %%order_class%% .df_cci_image_container',
            'type'              : 'order'
        });
        utility.process_range_value({
            'props'             : props,
            'key'               : 'title_order',
            'additionalCss'     : additionalCss,
            'selector'          : '.difl_contentcarousel %%order_class%% .df_cc_title',
            'type'              : 'order'
        });
        utility.process_range_value({
            'props'             : props,
            'key'               : 'subtitle_order',
            'additionalCss'     : additionalCss,
            'selector'          : '.difl_contentcarousel %%order_class%% .df_cc_subtitle',
            'type'              : 'order'
        });
        utility.process_range_value({
            'props'             : props,
            'key'               : 'content_order',
            'additionalCss'     : additionalCss,
            'selector'          : '.difl_contentcarousel %%order_class%% .df_cc_content',
            'type'              : 'order'
        });
        utility.process_range_value({
            'props'             : props,
            'key'               : 'button_order',
            'additionalCss'     : additionalCss,
            'selector'          : '.difl_contentcarousel %%order_class%% .df_cci_button_wrapper',
            'type'              : 'order'
        });
        // icons
        utility.process_icon_styles({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'df_cci',
            'selector'          : '%%order_class%% .df_cci_container .et-pb-icon',
            'align_container'   : '%%order_class%% .df_cci_image_container',
            'image_selector'    : '%%order_class%% .df_cci_image_container img'
        });

        if( props.df_cci_circle_icon && 'on' === props.df_cci_circle_icon ){
            additionalCss.push([{
                selector:    '%%order_class%% .df_cci_container .et-pb-icon',
                declaration: `border-width: 0px !important; border-radius:50% !important; box-shadow: none !important;`,
            }]);
        }

        // button
        utility.df_process_bg({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'df_button_bg',
            'selector'          : '.difl_contentcarousel %%order_class%% .df_cci_button'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'button_wrapper_margin',
            'additionalCss' : additionalCss,
            'selector' : '.difl_contentcarousel %%order_class%% .df_cci_button_wrapper',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'button_wrapper_padding',
            'additionalCss' : additionalCss,
            'selector' : '.difl_contentcarousel %%order_class%% .df_cci_button_wrapper',
            'type'  : 'padding'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'button_margin',
            'additionalCss' : additionalCss,
            'selector' : '.difl_contentcarousel %%order_class%% .df_cci_button',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'button_padding',
            'additionalCss' : additionalCss,
            'selector' : '.difl_contentcarousel %%order_class%% .df_cci_button',
            'type'  : 'padding'
        });
        // button styles
        utility.df_process_btn_styles({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'cc_button',
            'selector'          : ".difl_contentcarousel %%order_class%% .df_cci_button",
            'align_container'   : ".difl_contentcarousel %%order_class%% .df_cci_button_wrapper"
        });

        utility.process_margin_padding({
            'props' : props,
            'key' : 'btn_icon_margin',
            'additionalCss' : additionalCss,
            'selector' : '.difl_contentcarousel %%order_class%% .df_cci_button .df_cci_btn_icon.df_cci_btn_hover_off, .difl_contentcarousel %%order_class%% .df_cci_button:hover .df_cci_btn_icon.df_cci_btn_hover_on',
            'type' : 'margin'
        });
        utility.process_range_value({
            'props' : props,
            'key' : 'btn_icon_font_size',
            'additionalCss' : additionalCss,
            'selector' : '.difl_contentcarousel %%order_class%% .df_cci_button .df_cci_btn_icon.df_cci_btn_hover_off, .difl_contentcarousel %%order_class%% .df_cci_button:hover .df_cci_btn_icon.df_cci_btn_hover_on',
            'type' : 'font-size'
        });
        utility.process_color({
            'props': props,
            'key': 'btn_icon_color',
            'additionalCss': additionalCss,
            'selector': '.difl_contentcarousel %%order_class%% .df_cci_button .df_cci_btn_icon',
            'type': 'color',
        });

        // content area background
        utility.df_process_bg({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'df_title_bg',
            'selector'          : '.difl_contentcarousel %%order_class%% .df_cc_title'
        });
        utility.df_process_bg({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'df_subtitle_bg',
            'selector'          : '.difl_contentcarousel %%order_class%% .df_cc_subtitle'
        });
        utility.df_process_bg({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'df_content_bg',
            'selector'          : '.difl_contentcarousel %%order_class%% .df_cc_content'
        });
        // spacing
        utility.process_margin_padding({
            'props' : props,
            'key':'item_wrapper_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% > div:first-child',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'item_wrapper_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% > div:first-child',
            'type'  : 'padding'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'image_wrapper_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_cci_image_container',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'image_wrapper_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_cci_image_container',
            'type'  : 'padding'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'icon_wrapper_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_cci_image_container .et-pb-icon',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'icon_wrapper_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_cci_image_container .et-pb-icon',
            'type'  : 'padding'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'image_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_cci_image_container img',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'title_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_cc_title',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'title_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_cc_title',
            'type'  : 'padding'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'subtitle_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_cc_subtitle',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'subtitle_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_cc_subtitle',
            'type'  : 'padding'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'content_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_cc_content',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'content_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_cc_content',
            'type'  : 'padding'
        });

        const { df_btn_full_width } = window.ETBuilderBackend.i18n.modules.dfBtnIcon;
        // Button Full Width
        if (df_btn_full_width === 'on' && props.btn_use_icon === 'on') {

            let btnTextAlign = props.button_text_align?props.button_text_align:'center';
            let textIconP = btnTextAlign;
            if(btnTextAlign==='right'){
                textIconP = 'flex-end';
            } else if (btnTextAlign === 'left'){
                textIconP = 'flex-start';
            }
            additionalCss.push([{
                selector:    '%%order_class%% span.df_cci_btn_text_icon_wrap',
                declaration: `justify-content: ${textIconP};`,
            }]);
        }

        // icon font family
        utility.process_icon_font_style({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'df_cci_font_icon',
            'selector'          : '%%order_class%% .et-pb-icon'
        });

        // button icon font family
        if (props.btn_use_icon && props.btn_use_icon === 'on') {

            let child_item_btn_icon = props.btn_font_icon ? props.btn_font_icon:'&#x35;||divi||400';
            const btnUtils = window.ET_Builder.API.Utils;
            if (!btnUtils.processIconFontData) return;
            const iconData = btnUtils.processIconFontData(child_item_btn_icon);

            if (!iconData) return;
            
            additionalCss.push([{
                selector: '.difl_contentcarouselitem%%order_class%% .df_cci_button_wrapper .df_cci_btn_icon',
                declaration: `font-family: ${iconData.iconFontFamily} !important;`,
            }]);
            additionalCss.push([{
                selector: '.difl_contentcarouselitem%%order_class%% .df_cci_button_wrapper .df_cci_btn_icon',
                declaration: `font-weight: ${iconData.iconFontWeight} !important;`,
            }]);
        }
        
        return additionalCss;
    }

    render_image(props, key) {
        const utils = window.ET_Builder.API.Utils;
        let icon = '';

        if (props[key + '_use_icon'] && props[key + '_use_icon'] === 'on') {
             if ( !props[key + '_font_icon'] || props[key + '_font_icon'] === '') {
                icon = '5'
             } else {
                 icon = utils.processFontIcon(props[key + '_font_icon'])
             }
        }
        if ( props[key + '_use_icon'] === 'on') {
            return (
                <div className="df_cci_image_container">
                    <span className="et-pb-icon">{icon}</span>
                </div>
            )
        } else if (props.dynamic[key + '_image'].hasValue) {
            const ImageObject = utility.df_collect_dynamic_content(key + '_image', this.props);
            return utility.df_render_dynamic_image(ImageObject, function (ImageUrl) {
                return (
                    <div className="df_cci_image_container">
                        <img className="df_cci_image" src={ImageUrl} alt={''} />
                    </div>
                );
            });
    } else {return null} 
    }

    render_button(props, key) {
        
        const { df_btn_icon_yes, df_btn_icon, df_btn_place, df_btn_show } = window.ETBuilderBackend.i18n.modules.dfBtnIcon;
        const utils = window.ET_Builder.API.Utils;

        const button_text = key + '_button_text';
        const button_url = key + '_button_url';

        let btn_place     = 'df_cci_btn_place_right';
        let btn_show      = 'df_cci_btn_hover_off';
        let btn_icon      = '';

        if(props.btn_use_icon === 'on'){
            let child_item_btn_icon = props.btn_font_icon ? props.btn_font_icon:'&#x35;||divi||400';
            btn_icon  = utils.processFontIcon(child_item_btn_icon);
            btn_place = props.btn_icon_placement === 'left' ? 'df_cci_btn_place_left' : 'df_cci_btn_place_right';
            btn_show  = props.btn_icon_show_hover === 'on' ? 'df_cci_btn_hover_on' : 'df_cci_btn_hover_off';
        }else if(df_btn_icon_yes === 'on'){
            btn_icon  = utils.processFontIcon(df_btn_icon);
            btn_place = df_btn_place === 'left' ? 'df_cci_btn_place_left' : 'df_cci_btn_place_right';
            btn_show  = df_btn_show === 'on' ? 'df_cci_btn_hover_on' : 'df_cci_btn_hover_off';
        }else{
            btn_icon  = '';
            btn_place = 'df_cci_btn_place_right';
            btn_show  = 'df_cci_btn_hover_off';
        }

        const btnIconHas = btn_icon ? (
            <span className={`df_cci_btn_text_icon_wrap ${btn_place}`}>
                <span className={`df_cci_btn_icon ${btn_show}`}>{btn_icon}</span>
                <span className="df_cci_btn_text">{utility._renderDynamicContent(props, button_text)}</span>
            </span>
        ) : (
            utility._renderDynamicContent(props, button_text)
        );
        if (props.dynamic[button_text].hasValue || props.dynamic[button_url].hasValue ) {
            return (
                <div className="df_cci_button_wrapper">
                    <a className="df_cci_button" href={utility._renderDynamicContent( props, button_url ,false)}>{btnIconHas}</a>
                </div>
            )
        } else return '';
    }

    render() {
        const props = this.props;
        const TitleTag = props.title_tag ? props.title_tag : 'h4';
        const SubTitleTag = props.subtitle_tag ? props.subtitle_tag : 'h5';

        const title = props.dynamic.title.hasValue ? (
            <TitleTag className="df_cc_title">
                {utility._renderDynamicContent(props, 'title')}
            </TitleTag>
        ) : '';

        const sub_title = props.dynamic.sub_title.hasValue ? (
            <SubTitleTag className="df_cc_subtitle">
                {utility._renderDynamicContent(props, 'sub_title')}
            </SubTitleTag>
        ) : '';

        const content = props.dynamic.content.hasValue ? (
            <div className="df_cc_content">
                {utility._renderDynamicContent(props, 'content')}
            </div>
        ) : '';

        return(<>
                <span className="et_pb_background_pattern"></span>
                <span className="et_pb_background_mask"></span>
                <div className="df_cci_container" ref={this.wrapper}>
                    <span className="et_pb_background_pattern"></span>
                    <span className="et_pb_background_mask"></span>
                    {this.render_image(props, 'df_cci')}
                    {title}
                    {sub_title}
                    {content}
                    {this.render_button(props, 'cc_button')}
                </div>
            </>
        )
    }
}
export default ContentCarouselItem;
