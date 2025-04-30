import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import { SettingsHeader } from '../../pages/settings';
import {
	ToggleField,
	ColorField,
	RangeField,
	SelectField,
} from '../common/Fields';
import { useIsMount } from '../../hooks/useIsMount';
import { storeSettings } from '../../utils/utils';

export const MenuCustomization = () => {
	const menuSettings = [
		{
			id: 'df_menu_bottom_line',
			label: __( 'Menu bottom line', 'divi_flash' ),
			type: 'toggle',
			help_text: __(
				'Turn on/off divi menu bottom line effect.',
				'divi_flash'
			),
		},
		{
			id: 'df_menu_bottom_line_color',
			label: __( 'Bottom line color', 'divi_flash' ),
			show_if: 'df_menu_bottom_line',
			type: 'color_palate',
		},
		{
			id: 'df_menu_bottom_line_height',
			label: __( 'Bottom line weight', 'divi_flash' ),
			show_if: 'df_menu_bottom_line',
			type: 'range',
			range_label: __( 'LINE WEIGHT', 'divi_flash' ),
			help_text: __( 'Bottom line height', 'divi_flash' ),
		},
		{
			id: 'df_menu_bottom_line_distance',
			label: __( 'Bottom line distance', 'divi_flash' ),
			show_if: 'df_menu_bottom_line',
			type: 'range',
			range_label: __( 'LINE DISTANCE', 'divi_flash' ),
			help_text: __( 'Change the bottom line distance', 'divi_flash' ),
		},
		{
			id: 'df_menu_bottom_line_distance_fixed',
			label: __( 'Bottom line distance for fixed nav', 'divi_flash' ),
			show_if: 'df_menu_bottom_line',
			type: 'range',
			range_label: __( 'LINE DISTANCE', 'divi_flash' ),
			help_text: __(
				'Change the bottom line distance for the fixed nav',
				'divi_flash'
			),
		},
		{
			id: 'df_menu_line_width',
			label: __( 'Line width', 'divi_flash' ),
			show_if: 'df_menu_bottom_line',
			type: 'select',
			options: [
				{
					value: '',
					label: __( 'Select Line width', 'divi_flash' ),
					disabled: true,
				},
				{ value: 'full', label: __( 'Full', 'divi_flash' ) },
				{ value: 'half_left', label: __( 'Half left', 'divi_flash' ) },
				{
					value: 'half_right',
					label: __( 'Half right', 'divi_flash' ),
				},
			],
			range_label: __( 'SELECT LINE WIDTH', 'divi_flash' ),
			help_text: __( 'Select line width from the options', 'divi_flash' ),
		},
		{
			id: 'df_menu_line_animation',
			label: __( 'Line hover animation', 'divi_flash' ),
			show_if: 'df_menu_bottom_line',
			type: 'select',
			options: [
				{
					value: '',
					label: __( 'Select Animation type', 'divi_flash' ),
					disabled: true,
				},
				{ value: 'left', label: __( 'From Left', 'divi_flash' ) },
				{ value: 'right', label: __( 'From Right', 'divi_flash' ) },
				{ value: 'center', label: __( 'From Center', 'divi_flash' ) },
			],
			range_label: __( 'SELECT ANIMATION', 'divi_flash' ),
			help_text: __(
				'Select from the animation from the options',
				'divi_flash'
			),
		},
		{
			id: 'df_menu_hide_bottom_border',
			label: __( 'Hide menu bottom border', 'divi_flash' ),
			type: 'toggle',
			help_text: __(
				'Hide the bottom border from navigation bar by turning on the setting.',
				'divi_flash'
			),
		},
		{
			id: 'df_menu_item_distance',
			label: __( 'Menu item space between (px)', 'divi_flash' ),
			type: 'range',
			min: 0,
			max: 100,
			range_label: __( 'SPACE BETWEEN', 'divi_flash' ),
			help_text: __(
				'Increase/decrease space between each menu item.',
				'divi_flash'
			),
		},
	];
	menuSettings.map( ( setting ) => {
		setting[ 'value' ] = diflSettings.settings[ setting.id ];
	} );

	const [ settings, setSettings ] = useState( menuSettings );
	const updateSettings = ( item, value ) => {
		const newSettings = settings.map( ( setting ) => {
			if ( setting.id === item.id ) {
				setting.value = value;
			}
			return setting;
		} );
		setSettings( newSettings );
	};

	const isMount = useIsMount();

	useEffect( () => {
		if ( isMount ) return;
		storeSettings( settings );
	}, [ settings ] );

	return (
		<>
			<SettingsHeader
				title={ __( 'Menu Extension Settings', 'divi_flash' ) }
			/>
			{ settings.map( ( setting ) => {
				if (
					setting.hasOwnProperty( 'show_if' ) &&
					! settings.find( ( s ) => s.id === setting.show_if ).value
				)
					return null;
				return (
					<div className="settings-content" key={ setting.id }>
						<div className="label">{ setting.label }</div>
						<div className="control">
							{ 'toggle' === setting.type && (
								<ToggleField
									item={ setting }
									isActive={ setting.value }
									toggleHandler={ updateSettings }
								/>
							) }
							{ 'range' === setting.type && (
								<RangeField
									item={ setting }
									handleOnChange={ updateSettings }
								/>
							) }
							{ 'color_palate' === setting.type && (
								<ColorField
									item={ setting }
									handleOnChange={ updateSettings }
									className="difl-colorfield"
								/>
							) }
							{ 'select' === setting.type && (
								<SelectField
									item={ setting }
									handleOnChange={ updateSettings }
								/>
							) }
							<p className="help-text">{ setting.help_text }</p>
						</div>
					</div>
				);
			} ) }
		</>
	);
};
