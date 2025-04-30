// External Dependencies
import React, { Component, createRef } from 'react';
import utility from '../../../scripts/df_scripts/utilities';
// import anime from '../../../assets/scripts/lib/anime.js';
import anime from '../../../public/js/lib/anime.js';
// Internal Dependencies
import './style.css';

class FloatImageItem extends Component {
    static slug = 'difl_floatimageitem';
    _isMounted = false;

    constructor(props) {
        super(props);

        this.wrapper = React.createRef();
        this.image_animation = this.image_animation.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.image_animation();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    componentDidUpdate(prevProps, prevState) {
        this.image_animation();
    }

    image_animation() {
        const props = this.props;
        const animation_type = props.animation_type ? props.animation_type : 'fi-up-down';
        const duration = props.duration ? props.duration : 4000;
        const delay = props.delay ? parseInt(props.delay) : 0;
        const v_distance = props.vertical_anime_distance ? props.vertical_anime_distance : '20px';
        const h_distance = props.horizontal_anime_distance ? props.horizontal_anime_distance : '20px';
        const easing = props.animation_function ? props.animation_function : 'linear';
        var object = {
            targets: this.wrapper.current,
            loop: true,
            direction: 'alternate',
            // easing: 'linear',
        };
        if (animation_type === "fi-up-down") {
            object.translateY = v_distance;
        } else if (animation_type === "fi-left-right") {
            object.translateX = h_distance;
        }
        object.easing = easing;
        object.duration = duration;
        object.delay = 0;

        setTimeout(function () {
            anime(object)
        }, parseInt(delay));
    }

    static css(props) {
        const additionalCss = [];

        utility.process_range_value({
            'props'             : props,
            'key'               : 'horizontal_position',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%%',
            'type'              : 'left',
            'default_value'     : '0%'
        });
        utility.process_range_value({
            'props'             : props,
            'key'               : 'vertical_position',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%%',
            'type'              : 'top',
            'default_value'     : '0%'
        });
        // image sizing
        utility.process_range_value({
            'props'             : props,
            'key'               : 'fii_max_width',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .df_fii_container img',
            'type'              : 'max-width',
            'unit'              : 'px'
        });
        utility.process_range_value({
            'props'             : props,
            'key'               : 'fii_max_height',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .df_fii_container img',
            'type'              : 'max-height',
            'unit'              : 'px'
        });

        return additionalCss;
    }

    render() {
        const props = this.props;
        const ImageObject = utility.df_collect_dynamic_content('image', props);

        const image = utility.df_render_dynamic_image(ImageObject, function (ImageUrl) {
            return <img src={ImageUrl} alt={props.alt_text}/>;
        });

        const data = {
            animation_type : props.animation_type,
            duration : props.duration,
            delay : props.delay,
            animation_function: props.animation_function
        }
        return (
            <div className="df_fii_container" data-animation={JSON.stringify(data)} ref={this.wrapper}>
                {image}
            </div>
        )
    }
}

export default FloatImageItem;