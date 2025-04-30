import { useEffect, useState } from '@wordpress/element';

import Select from 'react-select';

import { TextControl, Button } from '@wordpress/components';

import google_fonts from './google-fonts';

function FontPicker(props) {
    const [font, setFont] = useState(props.value);

    return (<>
        <div style={{width: '100%'}}>
            <Select 
                value={font}
                isClearable={true}
                options={google_fonts}
                onChange={(value) => {
                    setFont(value);
                    props.onChange(value);
                }}
            />
        </div>
    </>)
}
export default FontPicker;