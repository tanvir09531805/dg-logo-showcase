import React, { Component, Fragment, useState, useEffect } from 'react';

import lodash from 'lodash';

const DynamicLogo = (props) => {
    const {
        data,
        indexClass,
        _key,
        content,
        logoclass
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

    const renderImage = () => {
        const _class = logoclass ? logoclass : '';
        return data[indexClass] && data[indexClass][_key] && data[indexClass][_key].dynamic ? 
            <img src={data[indexClass][_key].value} className={`df-site-logo ${_class}`} /> : 
            <img src={content} className={`df-site-logo ${_class}`} />;
    }

    return <>{!loading ? renderImage() : data[indexClass][_key].render()}</>;
}

export default DynamicLogo;