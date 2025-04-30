import { withSelect, useSelect } from '@wordpress/data';
import { SelectControl } from '@wordpress/components';
import Select from 'react-select';

function AllPages(props) {

  const onChangeSlect = ( value ) => {
		value = !value ? '' : value;
		props.onChange( value );
	}

  let dropdown = [];
  if(dropdown){
    if(props.allpages) {
      const options = props.allpages && [
          // { value: 'all_pages', label: 'All Pages' },
          ...props.allpages.map(page => ({
            value: page.id,
            label: page.title.rendered
          }))
      ];
      dropdown = options;
    }
    if(props.allposts) {
      const options = props.allposts && [
          // { value: 'all_posts', label: 'All Posts' },
          ...props.allposts.map(page => ({
            value: page.id,
            label: page.title.rendered
          }))
      ];
      dropdown = options;
    }

     return (
      <Select value={props.value}
        onChange={ ( newvalue ) => onChangeSlect( newvalue ) } isMulti options={dropdown} />

    );
  }
  
  return false;
  
}

export default AllPages;
