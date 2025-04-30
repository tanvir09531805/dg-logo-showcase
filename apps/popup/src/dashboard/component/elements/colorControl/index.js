import { useState, useEffect } from '@wordpress/element';

import { __ } from '@wordpress/i18n';

import { Dropdown, Button, ColorPicker, ColorPalette } from '@wordpress/components';

import _ from 'lodash';


import './style.scss';


function ColorDropdown( props ) {

	const colorPalette = [
        { name: '1', color: '#0D1B2A' },
        { name: '2', color: '#1B263B' },
        { name: '3', color: '#415A77' },
        { name: '5', color: '#F72585' },
        { name: '6', color: '#B5179E' },
        { name: '7', color: '#7209B7' },
        { name: '8', color: '#480CA8' },
        { name: '10', color: '#3F37C9' },
        { name: '11', color: '#4361EE' },
        { name: '12', color: '#4CC9F0' },
    ];
	const [ color, setColor ] = useState(props.value);

	const onChangeColor = ( value ) => {
		props.onChange( value );
		setColor(value);
	}

	return(
		<>
			<Dropdown
				className="df-popup-blocks-color-control-container-class-name"
				contentClassName="df-popup-blocks-color-control-popover-content-classname"
				popoverProps={ { placement: 'top-end', inline:true } }
				renderToggle={ ( { isOpen, onToggle } ) => (
					<Button
						className="df-popup-blocks-color-picker"
						onClick={ onToggle }
						aria-expanded={ isOpen }
					>
                        <span style={{ background: props.color }}></span>Select Color
					</Button>
				) }
				renderContent={ () =>
					<div>
						<ColorPicker
							color={ props.color }
							onChange={ ( color ) => onChangeColor( color ) }
							enableAlpha
							/>
						<ColorPalette
							colors={ colorPalette }
							// value={ colorPalette }
							disableCustomColors={ true }
							clearable= { false }
							onChange={ ( color ) => onChangeColor( color ) } />
						<Button
							onClick={() => onChangeColor('')}
						>Clear</Button>
					</div> }
			/>
		</>
	)
}
export default ColorDropdown;
