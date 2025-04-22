// External Dependencies
import React, { Component } from 'react';
import utility from '../../../scripts/df_scripts/utilities';
// Internal Dependencies
import './style.css';

class FloatImage extends Component {
    static slug = 'difl_floatimage';
    _isMounted = false;

    constructor(props) {
        super(props)

        this.wrapper = React.createRef();
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

        utility.process_range_value({
            'props'             : props,
            'key'               : 'fi_min_height',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .df_fi_container',
            'type'              : 'min-height',
            'unit'              : 'px',
            'default_value'     : '500',
        });

        return additionalCss;
    }

    contentOutput(props){
        return ((props.content.length !== 0) ? props.content : '');
    }

    render() {
        const props = this.props;
        return (<div className="df_fi_container" ref={this.wrapper}>{this.contentOutput(props)}</div>)
    }
}

export default FloatImage;