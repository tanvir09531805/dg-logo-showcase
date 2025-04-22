// External Dependencies
import React, { Component } from 'react';
import utility from '../../../scripts/df_scripts/utilities';
// import '../../../assets/scripts/lib/jquery.bxslider.min.js';
import '../../../public/js/lib/jquery.bxslider.min.js';

// Internal Dependencies
import './style.css';


class LogoCarousel extends Component {
    static slug = 'difl_logocarousel';

    constructor(props) {
        super(props);

        this.state = {
            slider: null,
            module_class: null,
            viewMode : 'desktop'
        }

        this.wrapper = React.createRef();
        this.bxSlider = this.bxSlider.bind(this);
        this.bxOnEdit = this.bxOnEdit.bind(this);
        this.classFilter = this.classFilter.bind(this);
        this.computedType = ['item_spacing', 'item_desktop','item_tablet',
            'item_mobile','speed', 'loop', 'autoplay',
            'autospeed', 'pause_hover', 'arrow',
            'dots', 'ticker', 'ticker_hover', 'item_width', 'ticker_speed']
    }

    componentDidMount() {
        this.classFilter(this.wrapper.current.parentElement.parentElement.classList)
    }

    componentDidUpdate(prevProps, prevState) {
        const _this = this;
        const viewMode = window.ET_Builder.API.State.View_Mode.current;

        if ( _this.state.slider !== null && _this.state.slider.reloadSlider ) {
            if (typeof _this.state.slider.reloadSlider === 'function') {
                _this.state.slider.reloadSlider();
            }
            if(viewMode !== _this.state.viewMode) {
                _this.setState({ viewMode: viewMode});
                _this.bxOnEdit();
            }
        }

        for (const index in prevProps) {
            if (prevProps[index] !== _this.props[index]) {
                if(_this.computedType.includes(index)){
                    _this.bxOnEdit()
                }
            }
        }

    }
    classFilter(list) {
        const pattern = 'difl_logocarousel_';
        var module_class = null;
        Object.values(list).forEach(element => {
            if (element.includes(pattern) === true) {
                module_class = element;
                this.setState({module_class: element});
            }
        });
        if (module_class !== null) {
            this.bxSlider(module_class)
        }
    }
    bxOnEdit() {
        var bxOnEdit = new Promise((resolve, reject) => {
            resolve()
        })
        bxOnEdit.then(() => {
            this.state.slider.destroySlider()
        }).then(() => {
            this.bxSlider(this.state.module_class)
        })
    }

    bxSlider(module_class) {
        const $ = window.jQuery;
        const props = this.props;
        const selector = module_class !== null ? '.' + module_class + ' .df_lc_container' : null;
        const viewMode = window.ET_Builder.API.State.View_Mode;
        let minSlides = props.item_desktop;
        let maxSlides = props.item_desktop;

        if( viewMode.current === 'tablet' ) {
            minSlides = props.item_tablet;
            maxSlides = props.item_tablet;
        }
        if (viewMode.current === 'phone') {
            minSlides = props.item_mobile;
            maxSlides = props.item_mobile;
        }

        var config = {
            minSlides: parseInt(minSlides),
            maxSlides: parseInt(maxSlides),
            speed: parseInt(props.speed),
            slideMargin: parseInt(props.item_spacing),
            slideWidth: parseInt(props.item_width),
            moveSlides: 1,
            shrinkItems: true,
            responsive: true,
            adaptiveHeight: true
        }
        if (props.ticker !== 'on') {
            config['infiniteLoop'] = props.loop === 'on' ? true : false;
            config['pager'] = props.dots === 'on' ? true : false;
            config['controls'] = props.arrow === 'on' ? true : false;
            // config['auto'] = props.autoplay === 'on' ? true : false;
            config['pause'] = parseInt(props.autospeed);
            config['autoHover'] = props.pause_hover === 'on' ? true : false;
            config['prevText'] = '4';
            config['nextText'] = '5';
            config['hideControlOnEnd'] = 'on' !== props.loop;
        } else {
            config['ticker'] = true;
            config['ticker_hover'] = props.ticker_hover === 'on' ? true : false;
            config['speed'] = parseInt(props.ticker_speed);
        }

        var _slider = $(`${selector}`).bxSlider(config);

        if(this.state.slider === null || this.state.slider !== _slider) {
            this.setState({slider: _slider})
        }

    }

    static css(props) {
        const additionalCss = [];

        utility.process_range_value({
            'props'             : props,
            'key'               : 'lc_max_width',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .df_lci_container img',
            'type'              : 'max-width',
            'unit'              : '%'
        });
        if ( props.lc_vertical && props.equal_height !== 'on') {
            additionalCss.push([{
                selector:    '%%order_class%% .df_lc_container',
                declaration: `align-items: ${props.lc_vertical};`,
            }]);
        }
        if ( props.equal_height === 'on') {
            additionalCss.push([{
                selector:    '%%order_class%% .difl_logocarouselitem',
                declaration: `height:auto; align-items: center;`,
            }]);
        }

        utility.process_margin_padding({
            'props' : props,
            'key':'wrapper_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .bx-viewport',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'wrapper_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .bx-viewport',
            'type'  : 'padding'
        });
        // arrow margin
        utility.process_margin_padding({
            'props' : props,
            'key':'arrow_prev_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .bx-prev',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'arrow_next_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .bx-next',
            'type'  : 'margin'
        });

        utility.process_color({
            'props'             : props,
            'key'               : 'arrow_icon_color',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .bx-controls-direction .bx-prev, %%order_class%% .bx-controls-direction .bx-next',
            'type'              : 'color'
        });
        utility.process_color({
            'props'             : props,
            'key'               : 'arrow_bg_color',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .bx-controls-direction .bx-prev, %%order_class%% .bx-controls-direction .bx-next',
            'type'              : 'background-color'
        });
        if( 'on' !== props.loop){
            utility.process_range_value({
                'props'             : props,
                'key'               : 'arrow_opacity_disable',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%% .bx-controls-direction a.disabled',
                'type'              : 'opacity',
                'important'         : true,
            });
        }
        utility.process_color({
            'props'             : props,
            'key'               : 'dots_color',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .bx-pager .bx-pager-item a',
            'type'              : 'background'
        });
        utility.process_color({
            'props'             : props,
            'key'               : 'active_dot_color',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .bx-pager .bx-pager-item a.active',
            'type'              : 'background'
        });

        return additionalCss;
    }

    contentOutput(props){
        if (props['content'] === '' || props['content'].length === 0) {
            const notice_style = {
                backgroundColor: "#eeeeee",
                padding: "10px 20px"
            };
            return <h2 style={notice_style} >Please <strong>Add New Logo Item.</strong></h2>;
        }
        return props.content
    }

    render() {
        const props = this.props;
        return(<div className="df_lc_outer" ref={this.wrapper}>
                <div className="df_lc_container">
                    {this.contentOutput(props)}
                </div>
            </div>)
    }
}
export default LogoCarousel;
