import {
	ToggleControl,
	SelectControl,
	RangeControl,
	ColorPicker,
	Button,
} from '@wordpress/components';

import { useEffect } from '@wordpress/element';
import classNames from 'classnames';
import { useState } from '@wordpress/element';

export const ToggleField = ( { item, isActive, toggleHandler, ...props } ) => {
	const handleOnChange = ( value ) => {
		toggleHandler( item, value );
	};
	const classes = classNames( props.className, 'difl-toggle' );
	delete props.className;
	return (
		<ToggleControl
			className={ classes }
			checked={ isActive }
			onChange={ ( value ) => handleOnChange( value ) }
			{ ...props }
		/>
	);
};

export const RangeField = ( { item, handleOnChange } ) => {
	const [ space, setSpace ] = useState( parseInt( item.value ) );
	const { range_label, min, max } = item;
	const onRangeUpdate = ( value ) => {
		setSpace( value );
		handleOnChange( item, value );
	};
	const dsize = item?.default ?? 0;
	const handleReset = () => {
		onRangeUpdate( dsize );
	};
	return (
		<>
			<RangeControl
				label={ range_label }
				value={ space ?? dsize }
				onChange={ ( value ) => onRangeUpdate( value ) }
				min={ min }
				max={ max }
			/>
			{ space !== dsize && (
				<span
					className="difl-reset dashicon dashicons dashicons-image-rotate"
					onClick={ handleReset }
				></span>
			) }
		</>
	);
};

export const SelectField = ( { item, handleOnChange } ) => {
	const [ value, setValue ] = useState( item.value );
	const onOptionChange = ( value ) => {
		setValue( value );
		handleOnChange( item, value );
	};
	return (
		<SelectControl
			label={ item.label }
			value={ value }
			options={ item.options }
			onChange={ ( value ) => onOptionChange( value ) }
			__nextHasNoMarginBottom
		/>
	);
};

export const ColorField = ( { item, handleOnChange, ...props } ) => {
	const [ color, setColor ] = useState( item.value );

	const onColorUpdate = ( value ) => {
		setColor( value );
		handleOnChange( item, value );
	};
	// make it visual to user
	useEffect( () => {
		const element = document.querySelector( '.difl-colorfield' );
		const prefix = element.querySelector(
			'.components-input-control__prefix span'
		);
		const input = element.querySelector(
			'input.components-input-control__input'
		);
		input.style.zIndex = 20;
		prefix.style.color = '#fff';
		input.style.color = '#fff';
		const container = element
			.querySelector( 'input.components-input-control__input' )
			.closest( '.components-input-control__container' );
		container.style.backgroundColor = color;
	}, [ color ] );
	const dcolor = item?.default ?? '#000';
	const handleReset = () => {
		onColorUpdate( dcolor );
	};
	return (
		<>
			<ColorPicker
				color={ color }
				onChange={ onColorUpdate }
				enableAlpha
				defaultValue={ dcolor }
				copyFormat="hex"
				{ ...props }
			/>
			{ color !== dcolor && (
				<span
					className="difl-reset dashicon dashicons dashicons-image-rotate"
					onClick={ handleReset }
				></span>
			) }
		</>
	);
};

export const ButtonIcon = ( props ) => {
	const { button_label, icon, url, help_text, className } = props;
	const handleClick = () => window.open( encodeURI( url ), '_blank' );
	return (
		<Button icon={ icon } className={ className } onClick={ handleClick }>
			{ button_label }
		</Button>
	);
};
