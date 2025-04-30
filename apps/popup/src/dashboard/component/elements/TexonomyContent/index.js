import { withSelect, useSelect } from '@wordpress/data';
import {useState, useEffect} from '@wordpress/element';
import { SelectControl } from '@wordpress/components';
import Select from 'react-select';

function TexonomyContent(props) {
  //const [pageValue , setPageValue] = useState({});

  const allpages = props.alltexonomies;

  const onChangeSlect = (val ) => {
		props.onChange(val)
	}

  let dropdown = [];
  if(dropdown){
    if(allpages) {
      const options = allpages &&
          // { value: 'all_pages', label: 'All Pages' },
          allpages.map(page => ({
            value: page,
            label: page
          }))
      dropdown = options;
    }

     return (
      <Select
        // placeholder="Write Here min 2 character"
        noOptionsMessage={() => "No results found"}
				className="df-popup-select" classNamePrefix="df-popup-select"
        value={props.value}
        onChange={ (value ) => onChangeSlect( value) }  isMulti options={dropdown} />
    );
  }

  return false;

}

export default TexonomyContent;
