// External Dependencies
import React, { Component } from 'react';
import Typewriter from 'typewriter-effect';
import lodash from 'lodash';
import utility from '../../../scripts/df_scripts/utilities';

// Internal Dependencies
import './style.css';

// https://github.com/tameemsafi/typewriterjs

class TypewriterText extends Component {
    static slug = 'difl_typewriter_text';
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            loading: false
        }
        this.wrapper = React.createRef();
    }

    componentDidMount() {
        this.typeWriterEffect();
    }

    componentWillUnmount() {}

    componentDidUpdate(prevProps, prevState) {

        const _this = this;
        const props = _this.props

        if( !lodash.isEqual( prevProps.typed_update_button, props.typed_update_button ) ) {
            _this.removeInstance();
        }

        if( !lodash.isEqual( prevProps.typed_update_button_2, props.typed_update_button_2 ) ) {
            _this.removeInstance();
        }

        if( _this.state.loading ) _this.setState( { loading: false } );
        
    }

    removeInstance = () => {
        this.setState( { loading: true } );
    }

    typeWriterEffect = () => {
        const _this = this;
        const props = _this.props;
        const utils = window.ET_Builder.API.Utils;
        const cursorChar = props.cursor_use_icon === 'on' && props.cursor_font_icon ? utils.processFontIcon(props.cursor_font_icon) : props.cursorchar;

        return <span className='df-twt-element'><Typewriter
                    options={{
                        strings: _this.typed_text_list( props ),
                        autoStart: true,
                        loop: props.loop === 'on' ? true : false,
                        delay: parseInt( props.speed ),
                        deleteSpeed: parseInt( props.deleteSpeed ),
                        cursor: props.cursor === 'on' ? cursorChar : null,
                        pauseFor: parseInt( props.next_delay )
                    }}/>
                </span>
    }

    static css( props ) {
        const additionalCss = [];

        const prefix = '%%order_class%% .prefix';
        const suffix = '%%order_class%% .suffix';
        const typed = '%%order_class%% .df-twt-element';

        if ( props.alignment !== '' ) {
            utility.df_process_string_attr({
                'props': props,
                'key': 'alignment',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .df-twt-container',
                'type': 'text-align',
                'default_value': 'left'
            });
        }
        utility.df_process_bg({
            'props'         : props,
            'additionalCss' : additionalCss,
            'key'           : 'prefix_background',
            'selector'      : '%%order_class%% .prefix',
            'important'     : true
        });
        utility.df_process_bg({
            'props'         : props,
            'additionalCss' : additionalCss,
            'key'           : 'typed_background',
            'selector'      : '%%order_class%% .df-twt-element',
            'important'     : true
        });
        utility.df_process_bg({
            'props'         : props,
            'additionalCss' : additionalCss,
            'key'           : 'suffix_background',
            'selector'      : '%%order_class%% .suffix',
            'important'     : true
        });

        utility.process_margin_padding({
            'props'             : props,
            'key'               : 'prefix_margin',
            'additionalCss'     : additionalCss,
            'selector'          : prefix,
            'type'              : 'margin'
        });
        utility.process_margin_padding({
            'props'             : props,
            'key'               : 'prefix_padding',
            'additionalCss'     : additionalCss,
            'selector'          : prefix,
            'type'              : 'padding'
        });
        utility.process_margin_padding({
            'props'             : props,
            'key'               : 'typed_margin',
            'additionalCss'     : additionalCss,
            'selector'          : typed,
            'type'              : 'margin'
        });
        utility.process_margin_padding({
            'props'             : props,
            'key'               : 'typed_padding',
            'additionalCss'     : additionalCss,
            'selector'          : typed,
            'type'              : 'padding'
        });
        utility.process_margin_padding({
            'props'             : props,
            'key'               : 'suffix_margin',
            'additionalCss'     : additionalCss,
            'selector'          : suffix,
            'type'              : 'margin'
        });
        utility.process_margin_padding({
            'props'             : props,
            'key'               : 'suffix_padding',
            'additionalCss'     : additionalCss,
            'selector'          : suffix,
            'type'              : 'padding'
        });


        utility.df_process_text_clip({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'prefix_clip',
            'selector'          : prefix
        });
        utility.df_process_text_clip({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'typed_clip',
            'selector'          : typed
        });
        utility.df_process_text_clip({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'suffix_clip',
            'selector'          : suffix
        });

        if( props.cursor_distance_left && props.cursor_distance_left !== '0' ) {
            utility.process_range_value( {
                'props'             : props,
                'additionalCss'     : additionalCss,
                'key'               : 'cursor_distance_left',
                'type'              : 'margin-left',
                'selector'          : '%%order_class%% .df-twt-element .Typewriter__cursor',
                'fixed_unit'        : 'px'
            } )
        }

        if( props.cursor_font_icon && props.cursor_use_icon === 'on' ) {
            additionalCss.push([{
                selector:    '%%order_class%% .twt-cursor-icon .Typewriter__cursor',
                declaration: `
                    font-family: ETmodules;
                    speak: none;
                    font-weight: 400;
                    -webkit-font-feature-settings: normal;
                    font-feature-settings: normal;
                    font-variant: normal;
                    text-transform: none;
                    line-height: 1;
                    -webkit-font-smoothing: antialiased;
                    font-style: normal;
                    display: inline-block;
                    -webkit-box-sizing: border-box;
                    box-sizing: border-box;
                    direction: ltr; `,
            }]);
            utility.process_icon_font_style({
                'props'             : props,
                'additionalCss'     : additionalCss,
                'key'               : 'cursor_font_icon',
                'selector'          : '%%order_class%% .twt-cursor-icon .Typewriter__cursor'
            });

        }
        
        additionalCss.push([{
            selector:    '%%order_class%% .twt-cursor-icon .Typewriter__cursor',
            declaration: `color: ${props.cursor_icon_color} !important;`,
        }]);

        additionalCss.push([{
            selector:    '%%order_class%% .df-twt-element > .Typewriter',
            declaration: `display: inherit;`,
        }]);

        if( props.cursor_font_size && props.cursor_font_size === '0' ) {
            additionalCss.push([{
                selector:    '%%order_class%% .df-twt-element .Typewriter__cursor',
                declaration: `font-size: inherit !important;`,
            }]);
        } else {
            utility.process_range_value({
                'props'             : props,
                'key'               : 'cursor_font_size',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%% .df-twt-element .Typewriter__cursor',
                'type'              : 'font-size',
                'important'         : true
            });
        }

        utility.df_process_string_attr( {
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'display_props_prefix',
            'type'              : 'display',
            'selector'          : '%%order_class%% .prefix'
        } )
        utility.df_process_string_attr( {
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'display_props_typed',
            'type'              : 'display',
            'selector'          : '%%order_class%% .df-twt-element'
        } )
        utility.df_process_string_attr( {
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'display_props_suffix',
            'type'              : 'display',
            'selector'          : '%%order_class%% .suffix'
        } )

        
        return additionalCss;
    }

    typed_text_list = ( props ) => {
        if( !props.typed_text_list ) return [ 'Please input your text' ];
        const typed_text = JSON.parse( props.typed_text_list );
        var list = [];

        typed_text.forEach( function( text ) {
            if( text['value'] !== '' ) {
                list.push( text['value'] );
            }
        } )

        if ( lodash.isEmpty(list) ) return [ 'Please input your text' ];

        let _text = list;
    
        return _text;

    }
    prefix_html(){
        const DynamicContent = utility.df_collect_dynamic_content('prefix', this.props);

        return utility.df_render_dynamic_content(DynamicContent, DynamicComponent => (
            <span className='prefix'>
                    {DynamicComponent}
                </span>
        ), 'full');
    }

    suffix_html(){
        const DynamicContent = utility.df_collect_dynamic_content('suffix', this.props);

        return utility.df_render_dynamic_content(DynamicContent, DynamicComponent => (
            <span className='suffix'>
                    {DynamicComponent}
                </span>
        ), 'full');
    }

    render() {
        const _this = this;
        const props = _this.props;
        const prefix = this.prefix_html();
        const suffix = this.suffix_html();
        const HTML_TAG = props.main_wrap_tag ? props.main_wrap_tag : 'div';
        let classes = '';
        classes = props.cursor_use_icon === 'on' && props.cursor_font_icon ? classes + ' twt-cursor-icon' : ''; 

        return (<div className='df-twt-container'>
            <div className={ "df-twt-content" + classes } ref={ this.wrapper }>
                <HTML_TAG className='df-twt'>
                    {prefix}
                    { !this.state.loading ? this.typeWriterEffect() : '' }
                    {suffix}
                </HTML_TAG>
            </div>
        </div>)
    }
}
export default TypewriterText;