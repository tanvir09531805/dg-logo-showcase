// External Dependencies
import React, { Component } from 'react';
import utility from '../../../scripts/df_scripts/utilities';
// Internal Dependencies
import './style.css';


class AdvancedTabItem extends Component {
    static slug = 'difl_advancedtabitem';
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            library_items : null
        }
        this.wrapper = React.createRef();
    }

    componentDidMount() {
        this._isMounted = true;
        const _this = this;
        const module_address = _this.props.moduleInfo.address;
        const data_active = _this.wrapper.current.parentNode.parentNode.parentNode.dataset.active;

        if(this.wrapper) {
            if(data_active === module_address) { 
                this.wrapper.current.parentNode.parentNode.style.display = 'block';
            } else {
                this.wrapper.current.parentNode.parentNode.style.display = 'none';
            }
        }
        
    }


    static css(props) {
        const additionalCss = [];

        const img_placement = props.img_placement ? props.img_placement : 'flex_top';
        const img_placement_tablet = props.img_placement_tablet ? props.img_placement_tablet : 'flex_top';
        const img_placement_phone = props.img_placement_phone ? props.img_placement_phone : 'flex_top';
        var view_mode = window.ET_Builder.API.State.View_Mode.current;

        // image placements
        if('' !== props.image) {
            additionalCss.push([{
                selector:    '%%order_class%% .df_ati_container',
                declaration: `flex-direction: ${utility.process_values(img_placement)}`,
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .df_ati_container',
                declaration: `flex-direction: ${utility.process_values(img_placement_tablet)}`,
                'device':'tablet'
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .df_ati_container',
                declaration: `flex-direction: ${utility.process_values(img_placement_phone)}`,
                'device':'phone'
            }]);
            
        }

        if(view_mode === 'desktop') {
            if ((img_placement === 'flex_left' || img_placement === 'flex_right') && '' !== props.image) {
                const img_container_width = props.img_container_width && props.img_container_width !== '' ?
                    props.img_container_width : '50%';
    
                additionalCss.push([{
                    selector:    '%%order_class%% .df_at_image_wrapper',
                    declaration: `width: ${img_container_width}`,
                }]);
                additionalCss.push([{
                    selector:    '%%order_class%% .df_at_content_wrapper',
                    declaration: `width: calc(100% - ${img_container_width})`,
                }]);
            }
        }
        
        if ((img_placement_tablet === 'flex_left' || img_placement_tablet === 'flex_right') && '' !== props.image) {
            const img_container_width_tablet = props.img_container_width_tablet && props.img_container_width_tablet !== '' ?
                props.img_container_width_tablet : '50%';

            additionalCss.push([{
                selector:    '%%order_class%% .df_at_image_wrapper',
                declaration: `width: ${img_container_width_tablet}`,
                'device':'tablet'
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .df_at_content_wrapper',
                declaration: `width: calc(100% - ${img_container_width_tablet})`,
                'device':'tablet'
            }]);
        }
        if ((img_placement_phone === 'flex_left' || img_placement_phone === 'flex_right') && '' !== props.image) {
            const img_container_width_phone = props.img_container_width_tablet && props.img_container_width_phone !== '' ?
                props.img_container_width_phone : '50%';

            additionalCss.push([{
                selector:    '%%order_class%% .df_at_image_wrapper',
                declaration: `width: ${img_container_width_phone}`,
                'device':'phone'
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .df_at_content_wrapper',
                declaration: `width: calc(100% - ${img_container_width_phone})`,
                'device':'phone'
            }]);
        }
        
        
        if(props.icon_color && props.icon_color !== '') {
            utility.process_color({
                'props'             : props,
                'key'               : 'icon_color',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%%.df_at_nav .et-pb-icon',
                'type'              : 'color',
                'important'         : true
            });
        }
        if(props.icon_size && props.icon_size !== '') {
            utility.process_range_value({
                'props'             : props,
                'key'               : 'icon_size',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%%.df_at_nav .et-pb-icon',
                'type'              : 'font-size',
                'unit'              : 'px',
                'important'         : true
            });
        }
        // process background
        utility.df_process_bg({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'button',
            'selector'          : '.difl_advancedtab %%order_class%% .df_at_button'
        });
        utility.df_process_bg({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'text_area',
            'selector'          : '.difl_advancedtab %%order_class%% .df_at_content_wrapper'
        });

        additionalCss.push([{
            selector:    '.difl_advancedtab %%order_class%% .df_at_button_wrapper',
            declaration: `text-align: ${props.button_align};`,
        }]);
        additionalCss.push([{
            selector:    '%%order_class%% .df_at_image_wrapper',
            declaration: `z-index: ${props.image_z_index};`,
        }]);

        // spacing
        utility.process_margin_padding({
            'props' : props,
            'key':'image_wrapper_margin',
            'additionalCss' : additionalCss,
            'selector' : '.difl_advancedtab %%order_class%% .df_at_image_wrapper',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'image_wrapper_padding',
            'additionalCss' : additionalCss,
            'selector' : '.difl_advancedtab %%order_class%% .df_at_image_wrapper',
            'type'  : 'padding'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'content_margin',
            'additionalCss' : additionalCss,
            'selector' : '.difl_advancedtab %%order_class%% .df_at_content_wrapper',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'content_padding',
            'additionalCss' : additionalCss,
            'selector' : '.difl_advancedtab %%order_class%% .df_at_content_wrapper',
            'type'  : 'padding'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'button_margin',
            'additionalCss' : additionalCss,
            'selector' : '.difl_advancedtab %%order_class%% .df_at_button',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'button_padding',
            'additionalCss' : additionalCss,
            'selector' : '.difl_advancedtab %%order_class%% .df_at_button',
            'type'  : 'padding'
        });

        utility.df_process_maxwidth({
            'props'             : props,
            'key'               : 'image_size',
            'additionalCss'     : additionalCss,
            'alignment'         : true,
            'selector'          : '%%order_class%% .df_at_image',
        });
        // icon font family
        utility.process_icon_font_style({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'font_icon',
            'selector'          : '%%order_class%% .et-pb-icon.df-tab-nav-icon'
        })
        
        return additionalCss;
    }

    /**
     * Render button
     * 
     * @param {object} props
     * @param {string} key
     */
    render_button(props, key) {
       
        if( props.dynamic.at_button_button_text.hasValue  || props.dynamic.at_button_button_url.hasValue ) {
            return (
                <div className="df_at_button_wrapper">
                    <a className="df_at_button" href= {utility._renderDynamicContent(props , 'at_button_button_url', false)} > {utility._renderDynamicContent(props , 'at_button_button_text')} </a>
                </div>
            )
        } else return '';
    }

    render_library_item(props) {
        const content = props.content_type === 'library' && props.library_item && props.library_item !== 'none' && props.__libraryShortcode ? 
            <div className="df_at_content_wrapper" dangerouslySetInnerHTML={{__html: props.__libraryShortcode}} /> : '';

        return content;
    }

    render() {
        const _this = this;
        const props = _this.props;
        const imageObj = utility.df_collect_dynamic_content('image', props);

        const image =  utility.df_render_dynamic_image(imageObj, imageUrl => (
            <div className="df_at_image_wrapper"><img className="df_at_image" src={imageUrl} alt={props.alt} /></div>

        ));
        // const image = '' !== props.image ?
        //     <div className="df_at_image_wrapper"><img className="df_at_image" src={utility._renderDynamicContent(props , 'image' , false)} alt={props.alt} /></div> : '';
        
        const content = props.dynamic.content.hasValue  ? 
            <div className="df_at_content">{utility._renderDynamicContent(props , 'content')}</div> : '';

        const library = props.content_type !== 'library' ?
            <div className='df_at_content' dangerouslySetInnerHTML={{ html: props.__libraryShortcode}} /> : '';

        const content_container = content !== '' || _this.render_button(props, 'at_button') !== ''? 
            <div className="df_at_content_wrapper">{content} {_this.render_button(props, 'at_button')}</div> : '';


        return(
            <>
                
                <div className="df_ati_container" ref={this.wrapper}>
                    {props.content_type === 'library' && props.library_item ? '' : image}
                    {props.content_type === 'library' && props.library_item ? _this.render_library_item(props) : content_container} 
                </div>
            </>
        )
        
    }
}
export default AdvancedTabItem;