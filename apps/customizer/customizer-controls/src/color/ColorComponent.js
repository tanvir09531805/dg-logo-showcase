/* jshint esversion: 6 */
import PropTypes from 'prop-types';
import { ColorControl } from '@difl-wp/components';

import { useState, useEffect } from '@wordpress/element';

const ColorComponent = ({ control, children }) => {
	const [value, setValue] = useState(control.setting.get());

	const updateValues = (newVal) => {
		setValue(newVal);
		control.setting.set(newVal);
	};

	useEffect(() => {
		document.addEventListener('difl-changed-customizer-value', (e) => {
			if (!e.detail) return false;
			if (e.detail.id !== control.id) return false;
			updateValues(e.detail.value);
		});
	}, []);

	return (
		<div className="difl-white-background-control difl-color-control">
			<ColorControl
				label={control.params.label}
				selectedColor={value}
				defaultValue={control.params.default}
				alphaDisabled={control.params.disableAlpha}
				onChange={updateValues}
				allowGradient={control.params.allowGradient}
			>
				{children}
			</ColorControl>
		</div>
	);
};

ColorComponent.propTypes = {
	control: PropTypes.object.isRequired,
};

export default ColorComponent;
