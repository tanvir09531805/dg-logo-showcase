import { withSelect, useSelect } from '@wordpress/data';
import { SelectControl } from '@wordpress/components';
import {useState, useEffect} from '@wordpress/element';
import Select from 'react-select';
import {css} from '@emotion/css'

function SelectInclude(props) {
    const [optionValue, setOptionValue] = useState([]);
	const onChangeSlect = ( newvalue ) => {
        setOptionValue(newvalue)
		props.onChange( newvalue.value );
	}

    const options = [
        { value: 'include', label: 'Include' },
        { value: 'exclude', label: 'Exclude' },
    ];

    useEffect( () => {
        setOptionValue( { value: props.value, label: convertTitleCase(props.value) } )
    }, [] )

    return (
      <Select value={optionValue} className="df-popup-select" classNamePrefix="df-popup-select"
        onChange={ ( newvalue ) => onChangeSlect( newvalue ) } options={options} />
    );

}

export default SelectInclude;
