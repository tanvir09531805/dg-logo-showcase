// External Dependencies
import React, { Component } from 'react';
import utility from '../../../scripts/df_scripts/utilities';
// Internal Dependencies
// import './style.css';


class ImageGalleryItem extends Component {
    static slug = 'difl_imagegalleryitem';
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
        return null;
    }
}
export default ImageGalleryItem;