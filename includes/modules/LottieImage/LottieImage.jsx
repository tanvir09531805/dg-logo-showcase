// External Dependencies
import React, { Component } from 'react';
import utility from '../../../scripts/df_scripts/utilities';

import lottie from '../../../public/js/lib/lottie.js';
// Internal Dependencies
import './style.css';

class LottieImage extends Component {
    static slug = 'difl_lottieimage';
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            lottie: null
        }
        this.wrapper = React.createRef();
        this.computed = [ 'autoplay', 'loop', 'renderer' ];
    }
    componentDidUpdate(prevProps, prevState) {
        const _this = this;
        const props = _this.props;

        if( this.wrapper.current ) {
            this.lottieInit( this.wrapper.current.querySelector( '.df-lottie-image' ) );
        }
        if( 
            ( prevProps.lottie_file_options !== props.lottie_file_options ) || 
            ( prevProps.external_file !== props.external_file) ||
            ( prevProps.upload !== props.upload )
        ) {
            _this.reInitLottie();
        }

        if( _this.state.lottie ) {
            for (const index in prevProps) {
                if (prevProps[index] !== props[index]) {
                    if (_this.computed.includes(index)) {
                        _this.reInitLottie();
                    }
                }
            }
            
            this.state.lottie.setSpeed( parseInt( props.speed ) )
            
            if( props.direction_reverse === 'on' ) {
                this.state.lottie.setDirection( -1 )
            } else {
                this.state.lottie.setDirection( 1 )
            }
        }
    }

    lottieInit = ( selector ) => {
        const props = this.props;
        let path = '';

        if( this.state.lottie ) return;

        if( props.lottie_file_options !== 'media') {
            path = props.external_file;
        } else if ( props.upload !== '' ) {
            path = props.upload;
        }
        const _lottie = lottie.loadAnimation({
            container: selector, // the dom element that will contain the animation
            renderer: props.renderer ? props.renderer : 'svg',
            loop: props.loop === 'on' ? true : false,
            autoplay: true,
            path: path // the path to the animation json
        });

        this.setState( { lottie: _lottie } )
    }

    reInitLottie = () => {
        this.state.lottie.destroy();
        this.setState( { lottie: null } )
    }

    static css(props) {
        const additionalCss = [];

        return additionalCss;
    }

    render() {
       
        return (<div className='df-lottie-image-container' ref={this.wrapper}>
            <div className="df-lottie-image"></div>
        </div>)
    }
}
export default LottieImage;