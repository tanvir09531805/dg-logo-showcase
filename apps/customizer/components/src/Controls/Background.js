import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import {
	Button,
	ButtonGroup,
	Dashicon,
	FocalPointPicker,
	Placeholder,
	RangeControl,
	ToggleControl,
} from '@wordpress/components';
import { MediaUpload } from '@wordpress/media-utils';

import ColorControl from './ColorControl';

const Background = ({ onChange, value, label, description }) => {
	const {
		type,
		colorValue,
		useFeatured,
		imageUrl,
		focusPoint,
		fixed,
		overlayColorValue,
		overlayOpacity,
	} = value;

	const getButtons = () => {
		const types = ['color', 'image'];
		const labels = {
			color: __('Color', 'divi_flash'),
			image: __('Image', 'divi_flash'),
		};

		const buttons = [];
		types.forEach((buttonType, index) => {
			buttons.push(
				<Button
					key={index}
					isPrimary={value.type === buttonType}
					isSecondary={value.type !== buttonType}
					onClick={() => {
						onChange({ type: buttonType });
					}}
				>
					{labels[buttonType]}
				</Button>
			);
		});

		return (
			<ButtonGroup className="difl-background-type-control">
				{buttons}
			</ButtonGroup>
		);
	};

	return (
		<div className="difl-background-control">
			{label && <span className="customize-control-title">{label}</span>}
			{description && <p>{description}</p>}
			<div className="control--top-toolbar">{getButtons()}</div>
			<div className="control--body">
				{type === 'color' && (
					<>
						<ColorControl
							onChange={(val) => {
								onChange({ colorValue: val });
							}}
							selectedColor={colorValue}
							label={__('Color', 'divi_flash')}
							allowGradient={true}
						/>
						<div
							className="difl-color-preview"
							style={{
								backgroundColor: colorValue,
							}}
						/>
					</>
				)}
				{type === 'image' && (
					<>
						<ToggleControl
							label={__('Use Featured Image', 'divi_flash')}
							checked={useFeatured}
							onChange={(val) => {
								onChange({ useFeatured: val });
							}}
						/>
						{!imageUrl ? (
							<Placeholder
								icon="format-image"
								label={
									useFeatured
										? __('Fallback Image', 'divi_flash')
										: __('Image', 'divi_flash')
								}
							>
								<p>
									{__(
										'Select from the Media Library or upload a new image',
										'divi_flash'
									)}
								</p>
								<MediaUpload
									onSelect={(imageData) => {
										onChange({
											imageUrl: imageData.url,
										});
									}}
									allowedTypes={['image']}
									render={({ open }) => (
										<Button isSecondary onClick={open}>
											{__('Add Image', 'divi_flash')}
										</Button>
									)}
								/>
							</Placeholder>
						) : (
							<>
								<Button
									disabled={!wp.media}
									className="remove-image"
									isDestructive
									isLink
									onClick={() => {
										onChange({
											imageUrl: '',
										});
									}}
								>
									<Dashicon icon="no" />
									{useFeatured
										? __('Remove Fallback Image', 'divi_flash')
										: __('Remove Image', 'divi_flash')}
								</Button>
								<FocalPointPicker
									url={imageUrl}
									value={focusPoint}
									onChange={(val) => {
										const newPoint = {
											x: parseFloat(val.x).toFixed(2),
											y: parseFloat(val.y).toFixed(2),
										};
										onChange({
											focusPoint: newPoint,
										});
									}}
								/>
							</>
						)}
						<ToggleControl
							label={__('Fixed Background', 'divi_flash')}
							checked={fixed}
							onChange={(val) => {
								onChange({ fixed: val });
							}}
						/>
						<ColorControl
							selectedColor={overlayColorValue}
							onChange={(val) => {
								onChange({
									overlayColorValue: val,
								});
							}}
							label={__('Overlay Color', 'divi_flash')}
						/>
						<div
							className="difl-color-preview"
							style={{
								backgroundColor: overlayColorValue,
							}}
						/>
						<RangeControl
							label={__('Overlay Opacity', 'divi_flash')}
							value={overlayOpacity}
							onChange={(val) => {
								onChange({
									overlayOpacity: val,
								});
							}}
							min="0"
							max="100"
						/>
					</>
				)}
			</div>
		</div>
	);
};

Background.propTypes = {
	value: PropTypes.shape({
		type: PropTypes.string,
		imageUrl: PropTypes.string,
		focusPoint: PropTypes.shape({
			x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
			y: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		}),
		colorValue: PropTypes.string,
		overlayColorValue: PropTypes.string,
		overlayOpacity: PropTypes.number,
		fixed: PropTypes.bool,
		useFeatured: PropTypes.bool,
	}).isRequired,
	onChange: PropTypes.func.isRequired,
	label: PropTypes.string,
};

export default Background;
