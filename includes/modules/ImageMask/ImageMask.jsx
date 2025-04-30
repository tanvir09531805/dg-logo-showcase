// External Dependencies
import React, { Component } from 'react';
import utility from '../../../scripts/df_scripts/utilities';
import df_masks from './masks'
// Internal Dependencies
import './style.css';


class ImageMask extends Component {
    static slug = 'difl_imagemask';
    _isMounted = false;

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidUpdate(prevProps, prevState) {

    }

    static css(props) {
        const additionalCss = [];

        additionalCss.push([{
            selector:    '%%order_class%% .df_im_container',
            declaration: `-webkit-mask-image: url("${df_masks[props.mask_select]}");`,
        }]);
        additionalCss.push([{
            selector:    '%%order_class%% .df_im_container',
            declaration: `mask-image: url("${df_masks[props.mask_select]}");`,
        }]);
        utility.process_range_value({
            'props'             : props,
            'key'               : 'mask_size',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .df_im_container',
            'type'              : '-webkit-mask-size',
            'default_value'     : '80%'
        });
        utility.process_range_value({
            'props'             : props,
            'key'               : 'mask_size',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .df_im_container',
            'type'              : 'mask-size',
            'default_value'     : '80%'
        });
        
        utility.df_process_string_attr({
            'props'             : props,
            'key'               : 'mask_position',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .df_im_container',
            'type'              : '-webkit-mask-position',
            'default_value'     : 'center'
        });
        utility.df_process_string_attr({
            'props'             : props,
            'key'               : 'mask_position',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .df_im_container',
            'type'              : 'mask-position',
            'default_value'     : 'center'
        });

        if(props.image_full_width === 'on') {
            additionalCss.push([{
                selector:    '%%order_class%% .df_im_container img',
                declaration: `width: 100%;`,
            }]);
        }

        utility.process_transform_props({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .df_im_container',
            'transforms'        : [
                {
                    'type' : 'rotate',
                    'key'  : 'mask_rotate',
                    'unit' : 'px'
                }
            ]
        });
        utility.process_transform_props({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'oposite'           : true,
            'selector'          : '%%order_class%% .df_im_container img',
            'transforms'        : [
                {
                    'type' : 'rotate',
                    'key'  : 'mask_rotate',
                    'unit' : 'px'
                }
            ]
        });
        

        return additionalCss;
    }

    render() {
        const props = this.props;
        const ImageObject = utility.df_collect_dynamic_content('image', this.props);

        const image = utility.df_render_dynamic_image(ImageObject, function (ImageUrl) {
            return <img src={ImageUrl} alt={props.alt_text}/>;
        });


        return(<div className="df_im_container">{image}</div>)
    }
}
export default ImageMask;