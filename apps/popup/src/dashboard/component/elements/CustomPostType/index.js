import { withSelect, useSelect } from '@wordpress/data';
import { SelectControl } from '@wordpress/components';
import {useState, useEffect} from '@wordpress/element';

import Select from 'react-select';

function CustomPostType(props) {
  const [optionValue, setOptionValue] = useState([]);

  const onChangeSlect = ( newvalue ) => {
    setOptionValue(newvalue)
		props.onChange(newvalue.value)
	}

  useEffect( () => {
    setOptionValue( { value: props.value, label: convertTitleCase (props.value) } )
  }, [props.value] )

  if(props.postTypes) {
    let options = props.postTypes && [
      { value: 'entire_site', label: 'Entire Site' },
        ...props.postTypes.filter(

            postType => !['wp_block', 'attachment', 'revision', 'wp_navigation', 'nav_menu_item', 'wp_template', 'wp_template_part'].includes(postType.slug)
            ).map(postType => ({
          value: postType.slug,
          label: postType.labels.name
        })),
        { value: 'taxonomy', label: 'Taxonomy' }
    ];
    if(props.conditionType.condition_type ==='exclude'){
      for (let key in options) {
        if (options[key].value === 'entire_site') {
          //delete options[key];
          options.shift()
        }
      }

      if(optionValue.value === 'entire_site'){
        setOptionValue( [])
      }

    }

    return (
      <Select
      placeholder="Select Content Type"
      value={optionValue}
			className="df-popup-select" classNamePrefix="df-popup-select"
			styles={{
				menu: (baseStyles, state) => ({
					...baseStyles,
					zIndex: 2,
				}),
			}}
      onChange= { ( newvalue ) => onChangeSlect( newvalue ) }options={options} />
    );
  }
  return false;

}

export default CustomPostType;
