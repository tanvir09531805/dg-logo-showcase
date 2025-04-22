// External Dependencies
import React, { Component, Fragment } from 'react';
import utility from '../../../scripts/df_scripts/utilities';
// Internal Dependencies
import './style.css';
import df_frames from './frame'


class ScrollImage extends Component {
    static slug = 'difl_scrollimage';
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            viewMode : 'desktop'
        }
        this.wrapper = React.createRef();
        this.computed = [ 'enable_frame', 'frame_type' ];

    }

    componentDidMount() {
        this._isMounted = true;
        if( this.wrapper.current ) {
            if(this.wrapper.current.querySelector( '.frame_image' )){
                this.frame_function( this.wrapper.current , this.wrapper.current.querySelector( '.frame_image' ) );
            }
           
        }

    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidUpdate(prevProps, prevState) { 
        const _this = this;
        const viewMode = window.ET_Builder.API.State.View_Mode.current;
        if( this.wrapper.current ) {
            if(this.wrapper.current.querySelector( '.frame_image' )){
               
                _this.frame_function( this.wrapper.current , this.wrapper.current.querySelector( '.frame_image' ) );

                if(viewMode !== _this.state.viewMode) {
                    _this.setState({ viewMode: viewMode});   
                    this.setState({loading: true});
                            
                    _this.frame_function( this.wrapper.current , this.wrapper.current.querySelector( '.frame_image' ) );
                    setTimeout(() =>{
                    this.setState({loading: false});
                    }, 500)
                }
            }
           
        }

        for (const index of _this.computed) {
            if (prevProps[index] !== _this.props[index]) {
                if(_this.computed.includes(index)){
                    if( this.wrapper.current ) {
                        if(this.wrapper.current.querySelector( '.frame_image' )){
                            this.setState({loading: true});
                            
                            _this.frame_function( this.wrapper.current , this.wrapper.current.querySelector( '.frame_image' ) );
                             setTimeout(() =>{
                                this.setState({loading: false});
                             }, 500)
    
                        }
                       
                    }
                            
                }
            }
        } 

    }


    static css(props) {
        const additionalCss = [];
   
        // custom transition
        utility.df_process_transition({
            'props'             : props,
            'key'               : 'scroll',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .df_scroll_image_container .df_scroll_image_holder .df_scroll_image',
            'properties'        : ['background-position']
        });

        if(props['enable_frame'] !== 'on'){
            utility.process_range_value({
                'props'             : props,
                'key'               : 'image_min_height',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%% .df_scroll_image_container .df_scroll_image_holder .df_scroll_image',
                'type'              : 'min-height'
            });
        }

        if ('on' === props['use_image_as_icon']) {
            utility.process_range_value({
              'props': props,
              'key': 'image_container_width',
              'additionalCss': additionalCss,
              'selector': '%%order_class%% .df_link_area',
              'type': 'width',
              'default_value': '50px',
            });
        }
          // Badge icon style 
        utility.process_color({
            'props': props,
            'key': 'badge_icon_color',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_scroll_image_badge .et-pb-icon',
            'type': 'color'
        });
  
        utility.process_range_value({
            'props': props,
            'key': 'badge_icon_size',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_scroll_image_badge .badge_icon.et-pb-icon',
            'type': 'font-size',
            'important': true

        });
        
        // Background
        utility.df_process_bg({
            'props': props,
            'key': 'badge_background',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_scroll_image_badge'
        });
        utility.df_process_bg({
            'props': props,
            'key': 'caption_background',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_scroll_image_container .df_scroll_image_caption'
        });
         // Icon style

         utility.df_process_bg({
            'props': props,
            'key': 'link_icon_background',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_link_icon'
        });

        utility.process_color({
            'props': props,
            'key': 'link_icon_color',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .et-pb-icon.df-sl-link-icon',
            'type': 'color',
        })
    
        utility.process_range_value({
            'props': props,
            'key': 'icon_size',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .et-pb-icon.df-sl-link-icon',
            'type': 'font-size',
        });

           // icon font family
        utility.process_icon_font_style({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'link_icon',
            'selector'          : '%%order_class%% .et-pb-icon.df-sl-link-icon'
        });

        utility.process_icon_font_style({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'badge_icon',
            'selector'          : '%%order_class%% .et-pb-icon.badge_icon'
        });
        
        //Spacing
        utility.process_margin_padding({
            'props': props,
            'key': 'badge_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_scroll_image_badge',
            'type': 'margin',
            'important': false
        });

        utility.process_margin_padding({
            'props': props,
            'key': 'badge_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_scroll_image_badge',
            'type': 'padding',
            'important': false
        });

        utility.process_margin_padding({
            'props': props,
            'key': 'badge_icon_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_scroll_image_badge .badge_icon',
            'type': 'margin',
            'important': false
        });

        utility.process_margin_padding({
            'props': props,
            'key': 'caption_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_scroll_image_container .df_scroll_image_caption',
            'type': 'margin',
            'important': false
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'caption_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_scroll_image_container .df_scroll_image_caption',
            'type': 'padding',
            'important': false
        });

        utility.process_margin_padding({
            'props': props,
            'key': 'link_icon_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_scroll_image_container .df_link_icon',
            'type': 'padding',
            'important': false
        });

        utility.process_margin_padding({
            'props': props,
            'key': 'link_icon_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_scroll_image_container .df_link_area',
            'type': 'margin',
            'important': false
        });
        // Element (Badge, Link) Position
        var translate_values = {
            'top_left' :  'top: 0px !important; left: 0 !important; transform: none !important;',
            'top_center' :  'top: 0px !important; left: 50% !important; transform: translateX(-50%) !important;',
            'top_right' :  'top:0px !important; right: 0 !important; transform: translate(0%) !important;',   
            'center_left' :  'left: 0px !important; top: 50% !important; transform: translateY(-50%) !important;',
            'center_center' :  'left: 50% !important; top:50% !important; transform: translate(-50%, -50%) !important;',
            'center_right' :  'right: 0 !important; top: 50% !important; transform: translate(0%, -50%) !important;',
            'bottom_left' :  'left:0px !important; top: 100% !important; transform: translateY(-100%) !important;',
            'bottom_center' :  'left: 50% !important; top:100% !important; transform: translate(-50% ,-100%) !important;',
            'bottom_right' :  'right: 0 !important; top: 100% !important; transform: translate(0% ,-100%) !important;',
        };
        const link_position = props.link_position ? props.link_position : 'center_center';

        additionalCss.push([{
            selector:    '%%order_class%% .df_link_area',
            declaration: translate_values[link_position],
        }]);

        const badge_position = props.badge_position ? props.badge_position : 'top_center';
        const badge_center_list = ["top_center", "center_center", "bottom_center"];
        
        if ('on' === props['enable_badge'] && badge_center_list.includes(badge_position)) {
            utility.process_range_value({
              'props': props,
              'key': 'badge_container_width',
              'additionalCss': additionalCss,
              'selector': '%%order_class%% .df_scroll_image_badge',
              'type': 'width',
              'default_value': '25%',
            });
        }
        additionalCss.push([{
            selector:    '%%order_class%% .df_scroll_image_badge',
            declaration: translate_values[badge_position],
        }]);

        if(props.overlay && props.overlay === 'on') {
            additionalCss.push([{
                selector:    '%%order_class%% .df-overlay',
                declaration: `background-image: linear-gradient(${props.overlay_direction},  
                    ${props.overlay_primary} 0, 
                    ${props.overlay_secondary} 100%);`,
            }]);

            additionalCss.push([{
                selector:    '%%order_class%% .df-overlay',
                declaration: `background-image: linear-gradient(${props.overlay_direction_phone},  
                    ${props.overlay_primary} 0, 
                    ${props.overlay_secondary} 100%);`,
                    'device':'phone'
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .df-overlay',
                declaration: `background-image: linear-gradient(${props.overlay_direction_tablet},  
                    ${props.overlay_primary} 0, 
                    ${props.overlay_secondary} 100%);`,
                    'device':'tablet'
            }]);  
            if(props.overlay === 'on'){
                additionalCss.push([{
                    selector:    '%%order_class%% .df-overlay:hover',
                    declaration: `background-image: linear-gradient(${props.overlay_direction},  
                        ${props.overlay_primary} 0, 
                        ${props.overlay_secondary} 100%);`,
                }]);
    
                additionalCss.push([{
                    selector:    '%%order_class%% .df-overlay:hover',
                    declaration: `background-image: linear-gradient(${props.overlay_direction_phone},  
                        ${props.overlay_primary} 0, 
                        ${props.overlay_secondary} 100%);`,
                        'device':'phone'
                }]);
                additionalCss.push([{
                    selector:    '%%order_class%% .df-overlay:over',
                    declaration: `background-image: linear-gradient(${props.overlay_direction_tablet},  
                        ${props.overlay_primary} 0, 
                        ${props.overlay_secondary} 100%);`,
                        'device':'tablet'
                }]); 
            }  
        }
      

        return additionalCss;
    }

    // get transform values
    static df_transform_values(key = 'bottom') {
        const transfor_values = {
            'top'           : {
                'default'   : 'translateY(0px)',
                'hover'     : 'translateY(-60px)'
            },
            'bottom'        : {
                'default'   : 'translateY(0px)',
                'hover'     : 'translateY(60px)'
            },
            'left'          : {
                'default'   : 'translateX(0px)',
                'hover'     : 'translateX(-60px)'
            },
            'right'         : {
                'default'   : 'translateX(0px)',
                'hover'     : 'translateX(60px)'
            },
            'center'        : {
                'default'   : 'scale(1)',
                'hover'     : 'scale(0)'
            },
            'top_right'     : {
                'default'   : 'translateX(0px) translateY(0px)',
                'hover'     : 'translateX(50px) translateY(-50px)'
            },
            'top_left'      : {
                'default'   : 'translateX(0px) translateY(0px)',
                'hover'     : 'translateX(-50px) translateY(-50px)'
            },
            'bottom_right'  : {
                'default'   : 'translateX(0px) translateY(0px)',
                'hover'     : 'translateX(50px) translateY(50px)'
            },
            'bottom_left'   : {
                'default'   : 'translateX(0px) translateY(0px)',
                'hover'     : 'translateX(-50px) translateY(50px)'
            },
        };
        return transfor_values[key];
    }


    render_image_and_icon(props) {
        const utils = window.ET_Builder.API.Utils;
        let icon = '';
    
        if (props['enable_icon'] && props['enable_icon'] === 'on') {
          if (!props['link_icon'] || props['link_icon'] === '') {
            icon = '4'
          } else {
            icon = utils.processFontIcon(props['link_icon'])
          }
        }
        if (props['enable_icon'] === 'on' && 'off' === props['use_image_as_icon']) {
          return (
            <span className="et-pb-icon df-sl-link-icon">{icon}</span>
          )
        } else if (props['enable_icon'] === 'on' && props['use_image_as_icon'] === 'on') {
            const image = props.dynamic.image;
            if (image.loading) {
              // Let Divi render the loading placeholder.
              return image.render();
            }
    
          return (
            <img className="df_sm_image_icon " src={ utility._renderDynamicContent(props , 'image' , false) } atl={props.alt_text} />
          )
   
        } else { return null }
    }
    render_caption(props) {
        if ( props['caption_text'] && props['caption_text'] !=='') {
            return { __html: props['caption_text'] }
        }
    }
    render_badge_icon(props) {
        const utils = window.ET_Builder.API.Utils;
        let icon = '';
    
        if (props['badge_icon_enable'] && props['badge_icon_enable'] === 'on') {
          if (!props['badge_icon'] || props['badge_icon'] === '') {
            icon = '5'
          } else {
            icon = utils.processFontIcon(props['badge_icon'])
          }
        }
        if (props['badge_icon_enable'] === 'on') {
          return (
            <span className="et-pb-icon badge_icon">{icon}</span>
          )
        }
    
        else {
          return null
        }
    }
    frame_function = ( frame_element , frame_image) => {
        if(this.props.enable_frame === 'on'){
            const browser = ["chrome_dark", "chrome", "edge", "edge_dark", "firefox", "firefox_dark", "opera" , "opera_dark"];
       
            //var frame_container =  frame_image; 
            let height = frame_image.clientHeight;
            const frame_type = this.props.frame_type;

            if(frame_type === 'desktop'){
                height = Math.ceil(height * .6031);
            }else if(frame_type === 'laptop'){
                height = Math.ceil(height * .762);
            }else if(frame_type === 'tablet'){
                height = Math.ceil(height * .8144);
            }
            else if(frame_type === 'phone'){
                height = Math.ceil(height * .9299);
            }
            else if(frame_type === 'ipad'){
                height = Math.ceil(height * .8254);
            }
            else if(frame_type === 'macbook'){
                height = Math.ceil(height * .873);
            }
            else if(frame_type === 'macbookpro'){
                height = Math.ceil(height * .824);
            }
            else if(frame_type === 'safari'){
                height = Math.ceil(height * .922);
            }
            else{
                //height = Math.ceil(height * .908);
            }
            const dynamic_height = frame_element.querySelector('.df_device_slider_device .scroll_image_section');

            var caption_height_container = frame_element.querySelector('.df_scroll_image_caption');
            const caption_height = caption_height_container ? caption_height_container.clientHeight: null;
            
            dynamic_height.style.height  = browser.includes(frame_type) ? ( Math.ceil(height * .910) - caption_height) + "px" : (height - caption_height) + "px";
                            
        }
    }

    render_image(props,key){
        const image = props.dynamic[key];
        if (image.loading) {
          // Let Divi render the loading placeholder.
          return image.render();
        }
    
        return utility._renderDynamicContent(props , key , false)
    }
    render() {
        const props = this.props;
        const scroll_image =   props.dynamic.scroll_image.hasValue ? this.render_image(props,'scroll_image') : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTA4MCIgaGVpZ2h0PSI1NDAiIHZpZXdCb3g9IjAgMCAxMDgwIDU0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZmlsbD0iI0VCRUJFQiIgZD0iTTAgMGgxMDgwdjU0MEgweiIvPgogICAgICAgIDxwYXRoIGQ9Ik00NDUuNjQ5IDU0MGgtOTguOTk1TDE0NC42NDkgMzM3Ljk5NSAwIDQ4Mi42NDR2LTk4Ljk5NWwxMTYuMzY1LTExNi4zNjVjMTUuNjItMTUuNjIgNDAuOTQ3LTE1LjYyIDU2LjU2OCAwTDQ0NS42NSA1NDB6IiBmaWxsLW9wYWNpdHk9Ii4xIiBmaWxsPSIjMDAwIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz4KICAgICAgICA8Y2lyY2xlIGZpbGwtb3BhY2l0eT0iLjA1IiBmaWxsPSIjMDAwIiBjeD0iMzMxIiBjeT0iMTQ4IiByPSI3MCIvPgogICAgICAgIDxwYXRoIGQ9Ik0xMDgwIDM3OXYxMTMuMTM3TDcyOC4xNjIgMTQwLjMgMzI4LjQ2MiA1NDBIMjE1LjMyNEw2OTkuODc4IDU1LjQ0NmMxNS42Mi0xNS42MiA0MC45NDgtMTUuNjIgNTYuNTY4IDBMMTA4MCAzNzl6IiBmaWxsLW9wYWNpdHk9Ii4yIiBmaWxsPSIjMDAwIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz4KICAgIDwvZz4KPC9zdmc+Cg==';
        const image_scroll_type = props['image_scroll_type'] ? props['image_scroll_type'] : "top_bottom"; 

        const caption_html = 'on' === props['enable_caption']  && props.dynamic.caption_text.hasValue ?
        <figcaption className="df_scroll_image_caption df_caption_text">{utility._renderDynamicContent(props, 'caption_text')}</figcaption> : '';

        const badge_position = undefined !== props['badge_position']  ? props['badge_position'] : 'top-center';
        const show_badge_on_hover_class = 'on'=== props['show_badge_on_hover']  ? ' show_badge_on_hover' : '';
        const hide_badge_on_hover_class = 'on'=== props['hide_badge_on_hover']  ? ' hide_badge_on_hover' : '';
       
        const badge_html = 'on' === props['enable_badge']  && props.dynamic.badge_text.hasValue ?
                <div className={"df_scroll_image_badge df_position_" + badge_position  + show_badge_on_hover_class + hide_badge_on_hover_class}>
                    {props.badge_icon_placement === 'left' ? this.render_badge_icon(props) : ''}
                    <span className="df_badge">{utility._renderDynamicContent(props, 'badge_text')}</span>
                    {props.badge_icon_placement !== 'left' ? this.render_badge_icon(props) : ''} 
                </div>
                :
                ''

        const link_position = undefined !== props['link_position']  ? props['link_position'] : 'top-left';
    
        const show_on_hover_class = 'on'=== props['show_on_hover']  ? ' show_on_hover' : '';
        const hide_on_hover_class = 'on'=== props['hide_on_hover']  ? ' hide_on_hover' : '';
        const icon_motion_class = 'on' ===  props['icon_motion'] ? ( image_scroll_type === 'top_bottom' || image_scroll_type === 'bottom_top' || image_scroll_type === 'off') ? ' vertical_motion' : ' horizontal_motion' : ''
    
        const link_main = 'on' === props['use_image_as_icon'] && ( props['image'] === undefined  || props['image'] === '' ) 
                ? '' 
                :
                <div className={"df_link_area df_position_small df_position_" + link_position + show_on_hover_class + hide_on_hover_class + icon_motion_class}>
                    <span className="df_link_icon  df_scroll_image_lightbox_item">
                        { this.render_image_and_icon(props) }
                    </span>
                </div>;
        const link_html = 'on' == props['enable_icon'] ? 
                link_main
                :
                ''
               
        const overlay_html = props['overlay'] === 'on' ?
                                <span className="df-overlay"></span>
                            : '';
        const main_image = <>
                                {overlay_html}
                                {link_html}
                                <div className={"df_scroll_image df_scroll_image_" + image_scroll_type }style={{ 
                                backgroundImage: `url(${scroll_image})` 
                                }}></div>
                            </>;
        const frame_type = props['frame_type'] ? props['frame_type'] : 'desktop';
     
        const frame_html =  df_frames[props.frame_type] ? <img className ="frame_image" src={df_frames[props.frame_type]} /> : '';
    
        const image_html = props['enable_frame'] === 'on' ? 
                    <div className="df_device_slider_device">
                        {frame_html}
                        <div className="df_responsive_width scroll_image_section">
                            {main_image}
                        </div>
                    </div>
                : 
                main_image

        const frame_class = props['enable_frame'] === 'on' ? 
                 'df_device_slider df_device_slider_' + frame_type : '';
        
        return(
            <Fragment>
                {
                    this.state.loading === false ? 
                        <div className="df_scroll_image_container" ref={this.wrapper}>
                           <div className="df_scroll_image_wrapper">
                                <div className={"df_scroll_image_holder "+ frame_class}>
                                        {image_html}
                                    
                                        {props['enable_frame'] === 'on' ? caption_html : ''}
                                </div>
                                {badge_html}
                                { 'on' !== props['enable_frame']  ? caption_html : ''}
                            </div>
                        </div>
                    :
                    <div className="et-fb-preloader et-fb-preloader__loading">
                        <div className="et-fb-loader"/>
                    </div>          
                }   
            </Fragment>
        )
    }
}
export default ScrollImage;