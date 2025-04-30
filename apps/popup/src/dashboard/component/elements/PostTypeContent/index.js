import { withSelect, useSelect } from '@wordpress/data';
import { store as coreDataStore } from '@wordpress/core-data';
import {useState, useEffect} from '@wordpress/element';
import Select from 'react-select';
const useDebounce = ( value, delay = 500 ) => {
	const [ debouncedValue, setDebouncedValue ] = useState( value )

	useEffect( () => {
		const id = setTimeout( () => {
			setDebouncedValue( value )
		}, delay )

		return () => clearTimeout( id )
	}, [ value, delay ] )

	return debouncedValue;
}
function PostTypeContent(props) {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [allPages,setAllPages] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const searchValue = useDebounce(inputValue);
  const loadOptions = () => {
		if ( ! allPages?.length ) {
			setOptions([])
			return;
		}
		const formattedOptions = allPages.map( ( page ) => ({
			value: page.id,
			label: page.title.rendered
		}) );
		const allValueObj = {
			value: 'all',
			label: 'All'
			// other properties
		};
		if ( formattedOptions ) {
			formattedOptions.push( allValueObj );
		}
		setOptions( formattedOptions );
	};

  useSelect( async ( select ) => {
		const options = {
			context: 'view',
			per_page: 10,
			_fields: 'id,title',
			search: searchValue,
			search_columns: 'post_title'
		}
		const pages = select( coreDataStore ).getEntityRecords( 'postType', props.customPostType, options );
		const hasResolved = select( coreDataStore ).hasFinishedResolution( 'getEntityRecords', [ 'postType', props.customPostType, options ] );
		setIsLoading( hasResolved )
		setAllPages( pages )
	}, [ props.customPostType, searchValue ] )

  const selectValueTextChange = (value) => {
    setInputValue(value);
  }

	useEffect( () => {
		loadOptions();
	}, [ allPages, searchValue ] )

	const onChangeSlect = ( val ) => {
		props.onChange( val )
	};
	const noOptionsMessage = () => {
		if ( ! allPages?.length ) {
			return `Search for ${ props.customPostType.charAt( 0 ).toUpperCase() + props.customPostType.slice( 1 ) }`
		}

		if ( isLoading ) {
			return `${ props.customPostType.charAt( 0 ).toUpperCase() + props.customPostType.slice( 1 ) } Items Loading...`
		}

		return `No ${ props.customPostType } found`
	}

      return (
        <Select
          placeholder={`Search for ${props.customPostType}`}
          noOptionsMessage={noOptionsMessage}
					className="df-popup-select" classNamePrefix="df-popup-select"
          value={props.value}
          inputValue={inputValue}
          onInputChange={selectValueTextChange}
          onChange={ (value ) => onChangeSlect( value) }
          isMulti
          //options={dropdown}
          options={options}
        />
    );

}

export default PostTypeContent;
