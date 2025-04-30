// External Dependencies
import React, { Component } from 'react';
import utility from '../../../scripts/df_scripts/utilities';
// Internal Dependencies
import './style.css';


class LogoCarouselItem extends Component {
    static slug = 'difl_logocarouselitem';
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

        return additionalCss;
    }

    render() {
        const utils = window.ET_Builder.API.Utils;
        const props = this.props;
        const ImageObject = utility.df_collect_dynamic_content('image', props);

        const image = utility.df_render_dynamic_image(ImageObject, function (ImageUrl) {
            return (
                <img className="df-lc-image" src={ImageUrl} alt={props.alt_text} />
            );
        });

        return(
            <div className="df_lci_container">
                {image}
            </div>
        )
    }
}
export default LogoCarouselItem;