import React, { Component, Fragment, useState, useEffect } from 'react';

import lodash from 'lodash';

const DynamicField = (props) => {
    const {
        data,
        indexClass,
        _key,
        content
    } = props;

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(data[indexClass] && data[indexClass][_key]) {
            if(loading) {
                setTimeout(() => { setLoading(false) }, 5000);
            } else {
                setLoading(data[indexClass][_key].loading && true);
            }
        }
    });

    const processContent = () => {
        if(content.includes('@ET-DC@')) {
            return '';
        } else {
            
            return <div dangerouslySetInnerHTML={{__html: content}}></div>;
        }
    }

    const renderContent = () => {
        return data[indexClass] && data[indexClass][_key] && data[indexClass][_key].dynamic ? 
            data[indexClass][_key].render() : processContent();
    }

    return (!loading ? renderContent() : data[indexClass][_key].render());
}

export default DynamicField;