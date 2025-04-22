import React, { Component } from "react";
import './style.css';

class DFABPreviewSupport extends Component {
    static slug = 'df_ab_preview_support';

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <span className="df_ab_preview_support_wrapper">These effects work on frontend hover. To see them in the builder, activate the hover state.</span>
        );
    }
}

export default DFABPreviewSupport;