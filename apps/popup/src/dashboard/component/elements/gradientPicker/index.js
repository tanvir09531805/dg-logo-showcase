import { useState, useEffect } from '@wordpress/element';

import { __ } from '@wordpress/i18n';

import { GradientPicker } from '@wordpress/components';
// import { __experimentalZStack as ZStack } from '@wordpress/components';

import _ from 'lodash';


import './style.scss';


function GradientDropdown( props ) {

	const onChangeGr = ( value ) => {
		value = !value ? '' : value;
		props.onChange( value );
	}

	return(
		<>
		{/* <ZStack offset={20} isLayered> */}
			<GradientPicker
				__nextHasNoMargin
				value={ props.color }
				onChange={ ( currentGradient ) => onChangeGr( currentGradient ) }
				gradients={ [
					{
						name: 'JShine',
						gradient:
							'linear-gradient(135deg,#12c2e9 0%,#c471ed 50%,#f64f59 100%)',
						slug: 'jshine',
					},
					{
						name: 'Moonlit Asteroid',
						gradient:
							'linear-gradient(135deg,#0F2027 0%, #203A43 0%, #2c5364 100%)',
						slug: 'moonlit-asteroid',
					},
					{
						name: 'Rastafarie',
						gradient:
							'linear-gradient(135deg,#1E9600 0%, #FFF200 0%, #FF0000 100%)',
						slug: 'rastafari',
					},
				] }
			/>
			{/* </ZStack> */}
		</>
	)
}
export default GradientDropdown;
