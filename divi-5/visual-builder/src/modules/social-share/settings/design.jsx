// External dependencies.
import React, { ReactElement, useState } from 'react';

// WordPress dependencies.
const { __ } = window?.vendor?.wp?.i18n;

// Divi dependencies.
import {
	AnimationGroup,
	BorderGroup,
	BoxShadowGroup,
	FieldContainer,
	FiltersGroup,
	FontGroup,
	FontBodyGroup,
	SizingGroup,
	SpacingGroup,
	TextGroup,
	TransformGroup, BackgroundGroup, TextShadowGroup
} from '@divi/module';
import { GroupContainer, GroupTabs } from '@divi/modal';
import {
	ButtonOptionsContainer,
	ColorPickerContainer,
	RangeContainer, SelectContainer, ToggleContainer,
} from '@divi/field-library';
import { mergeAttrs } from '@divi/module-utils';

export const Design = ( props ) => {
	const { attrs, defaultSettingsAttrs } = props
	const [ activeTab, setActiveTab ] = useState()

	const TabList = ( { tabs } ) => {
		if ( undefined === activeTab ) { setActiveTab( Object.keys( tabs )[ 0 ] ) }
		return (
			<>
				<GroupTabs
					tabs={tabs}
					showLabel={true}
					showIcon={true}
					activeTab={activeTab}
					onClick={( tab ) => {
						const tab_value = tab.target.value || tab.target.parentElement?.value
						// console.log( tab_value );
						setActiveTab( tab_value )
					}}
					onContextMenu={( menu ) => {
						// console.log( "menu", menu )
					}}
				/>
				{
					tabs[ activeTab ]?.component
				}
			</>
		)
	}

	return (
		<React.Fragment>
			<GroupContainer
				id="settings"
				title={__( 'Settings', 'divi_flash' )}
			>
				<FieldContainer
					attrName="settings.decoration.columns_gap"
					label={__( 'Columns Gap', 'divi_flash' )}
					description={__( 'Control the gap of the Social Share column by increasing or decreasing the gap size.', 'divi_flash' )}
					features={{
						sticky: false,
						responsive: false,
						hover: false,
					}}
					max={120}
					min={1}
					step={1}
					defaultUnit={"px"}
					allowedUnits={[ '%', 'em', 'rem', 'px', 'cm', 'mm', 'in', 'pt', 'pc', 'ex', 'vh', 'vw' ]}
					minLimit={1}
					defaultAttr={defaultSettingsAttrs?.settings?.decoration?.columns_gap}
				>
					<RangeContainer/>
				</FieldContainer>
				<FieldContainer
					attrName="settings.decoration.rows_gap"
					label={__( 'Rows Gap', 'divi_flash' )}
					description={__( 'Control the gap of the Social Share row by increasing or decreasing the gap size.', 'divi_flash' )}
					features={{
						sticky: false,
						responsive: false,
						hover: false,
					}}
					max={120}
					min={1}
					step={1}
					defaultUnit={"px"}
					allowedUnits={[ '%', 'em', 'rem', 'px', 'cm', 'mm', 'in', 'pt', 'pc', 'ex', 'vh', 'vw' ]}
					minLimit={1}
					defaultAttr={defaultSettingsAttrs?.settings?.decoration?.rows_gap}
				>
					<RangeContainer/>
				</FieldContainer>
				<FieldContainer
					attrName="settings.decoration.button_height"
					label={__( 'Button Height', 'divi_flash' )}
					description={__( 'Control the Button Height of the Social Share Button.', 'divi_flash' )}
					features={{
						sticky: true,
					}}
					max={120}
					min={1}
					step={1}
					allowedUnits={[ '%', 'em', 'rem', 'px', 'cm', 'mm', 'in', 'pt', 'pc', 'ex', 'vh', 'vw' ]}
					defaultAttr={defaultSettingsAttrs?.settings?.decoration?.button_height}
				>
					<RangeContainer/>
				</FieldContainer>
			</GroupContainer>
			<GroupContainer
				id="alignment"
				title={__('Alignment', 'divi_flash')}
			>
				{
					!['one', 'two', 'three', 'four', 'five', 'six'].includes(attrs?.settings?.innerContent?.desktop?.value?.column_view) &&
					<>
						<FieldContainer
							attrName='alignment.decoration.content_alignment'
							label={__( 'Item Alignment (Single Row)', 'divi_flash' )}
							description={__( 'In Auto Column view, when you have single rows, you can align your items to the left, right, or center inside the container.', 'divi_flash' )}
							features={{
								sticky: false,
								responsive: true,
								hover: false,
							}}
							options={{
								"left": {
									"icon": "divi/text-align-left"
								},
								"center": {
									"icon": "divi/text-align-center"
								},
								"right": {
									"icon": "divi/text-align-right"
								}
							}
							}
							defaultAttr={defaultSettingsAttrs?.alignment?.decoration?.content_alignment}
						>
							<ButtonOptionsContainer
								showLabel={false}
							/>
						</FieldContainer>
						<FieldContainer
							attrName='alignment.decoration.column_auto_child_item_alignment'
							label={__( 'Item Alignment (Multiple Row)', 'divi_flash' )}
							description={__( 'In Auto Column view, when you have multiple rows, you can align your items to the left, right, or center.', 'divi_flash' )}
							features={{
								sticky: false,
							}}
							options={{
								"start": {
									"icon": "divi/text-align-left"
								},
								"center": {
									"icon": "divi/text-align-center"
								},
								"end": {
									"icon": "divi/text-align-right"
								}
							}
							}
							defaultAttr={defaultSettingsAttrs?.alignment?.decoration?.column_auto_child_item_alignment}
						>
							<ButtonOptionsContainer
								showLabel={false}
							/>
						</FieldContainer>
					</>
				}
				{
					['one', 'two', 'three', 'four', 'five', 'six'].includes(attrs?.settings?.innerContent?.desktop?.value?.column_view) &&
					<>
						<FieldContainer
							attrName='alignment.decoration'
							subName="child_content_alignment"
							label={__( 'Item Content Alignment', 'divi_flash' )}
							description={__( 'Align the contents of each item to the left, right, or center.', 'divi_flash' )}
							features={{
								sticky: false,
							}}
							options={{
								"start": {
									"icon": "divi/text-align-left"
								},
								"center": {
									"icon": "divi/text-align-center"
								},
								"end": {
									"icon": "divi/text-align-right"
								}
							}
							}
							defaultAttr={defaultSettingsAttrs?.alignment?.decoration}
						>
							<ButtonOptionsContainer
								showLabel={false}
							/>
						</FieldContainer>
					</>
				}

			</GroupContainer>
			<GroupContainer
				id="icon"
				title={__('Icon/Image', 'divi_flash')}
			>
				<FieldContainer
					attrName="icon.decoration.font.font"
					subName="color"
					label={__( 'Icon Color', 'divi_flash' )}
					description={__( 'Here you can define a custom color for the social network icon.', 'divi_flash' )}
					features={{
						sticky: true,
						responsive: true,
						hover: true,
					}}
					defaultAttr={defaultSettingsAttrs?.icon?.decoration?.font?.font}
				>
					<ColorPickerContainer/>
				</FieldContainer>
				<FieldContainer
					attrName='icon.innerContent'
					subName="use_icon_font_size"
					label={__( 'Use Custom Icon Size', 'divi_flash' )}
					description={__( 'If you would like to control the size of the icon, you must first enable this option.', 'divi_flash' )}
					features={{
						sticky: false,
						hover: false,
						responsive: false
					}}
					options={
						{
							'off': { label: __( 'No', 'divi_flash' ), value: 'off' },
							'on': { label: __( 'Yes', 'divi_flash' ), value: 'on' },
						}
					}
					defaultAttr={defaultSettingsAttrs?.icon?.innerContent}
				>
					<ToggleContainer/>
				</FieldContainer>
				{
					"on" === attrs?.icon?.innerContent?.desktop?.value?.use_icon_font_size &&
					<FieldContainer
						attrName="icon.decoration.font.font"
						subName="size"
						label={__( 'Icon Font Size', 'divi_flash' )}
						description={__( 'Control the size of the icon by increasing or decreasing the font size.', 'divi_flash' )}
						features={{
							sticky: true,
							responsive: true,
							hover: true,
						}}
						max={120}
						min={1}
						step={1}
						defaultUnit={"px"}
						allowedUnits={[ '%', 'em', 'rem', 'px', 'cm', 'mm', 'in', 'pt', 'pc', 'ex', 'vh', 'vw' ]}
						minLimit={1}
						defaultAttr={defaultSettingsAttrs?.icon?.decoration?.font?.font}
					>
						<RangeContainer/>
					</FieldContainer>
				}
				<FieldContainer
					attrName='icon.decoration.icon_position'
					label={__( 'Icon Position', 'divi_flash' )}
					description={__( 'Here you can choose Social Share Item content direction.', 'divi_flash' )}
					features={{
						sticky: false,
						hover: false,
						responsive: false
					}}
					options={
						{
							'row': { label: __( 'Left', 'divi_flash' ), value: 'row' },
							'row-reverse': { label: __( 'Right', 'divi_flash' ), value: 'row-reverse' },
							'column': { label: __( 'Top', 'divi_flash' ), value: 'column' },
							'column-reverse': { label: __( 'Bottom', 'divi_flash' ), value: 'column-reverse' },
						}
					}
					defaultAttr={defaultSettingsAttrs?.icon?.decoration?.icon_position}
				>
					<SelectContainer/>
				</FieldContainer>
				<FieldContainer
					attrName='icon.decoration.icon_alignment'
					label={__( 'Icon Alignment', 'divi_flash' )}
					description={__( 'Here you can choose Social Share Item content direction.', 'divi_flash' )}
					features={{
						sticky: false,
						hover: false,
						responsive: false
					}}
					options={
						{
							'flex-start': { label: __( 'Top / Left', 'divi_flash' ), value: 'flex-start' },
							'center': { label: __( 'Center', 'divi_flash' ), value: 'center' },
							'flex-end': { label: __( 'Bottom / Right', 'divi_flash' ), value: 'flex-end' },
						}
					}
					defaultAttr={defaultSettingsAttrs?.icon?.decoration?.icon_alignment}
				>
					<SelectContainer/>
				</FieldContainer>
				<BackgroundGroup
					groupLabel={__ ( '', 'divi_flash' )}
					attrName="icon.decoration.background"
					fieldLabel={__ ( '', 'divi_flash' )}
					defaultGroupAttr={defaultSettingsAttrs?.icon?.decoration?.background?.asMutable ( { deep: true } ) ?? {}}
					grouped={false}
				/>
				<TextShadowGroup
					attrName="icon.decoration.font.textShadow"
					defaultGroupAttr={defaultSettingsAttrs?.icon?.decoration?.font?.textShadow?.asMutable ( { deep: true } ) ?? {}}
					grouped={false}
				/>
				<BorderGroup
					attrName="icon.decoration.border"
					defaultGroupAttr={defaultSettingsAttrs?.icon?.decoration?.border?.asMutable ( { deep: true } ) ?? {}}
					grouped={false}
				/>
				<BoxShadowGroup
					attrName="icon.decoration.boxShadow"
					defaultGroupAttr={defaultSettingsAttrs?.icon?.decoration?.boxShadow?.asMutable ( { deep: true } ) ?? {}}
					grouped={false}
				/>
			</GroupContainer>
			<GroupContainer
				id="label"
				title={__('Label', 'divi_flash')}
			>
				<FontGroup
					attrName="label.decoration.font"
					defaultGroupAttr={defaultSettingsAttrs?.label?.decoration?.font?.asMutable( { deep: true } ) ?? {}}
					fieldLabel={""}
					grouped={false}
				/>
			</GroupContainer>
			<GroupContainer
				id="label_container"
				title={__('Label Container', 'divi_flash')}
			>
				<BackgroundGroup
					attrName="label_container.decoration.background"
					defaultGroupAttr={defaultSettingsAttrs?.label_container?.decoration?.background?.asMutable( { deep: true } ) ?? {}}
					fieldLabel={""}
					grouped={false}
				/>
				<BorderGroup
					attrName="label_container.decoration.border"
					defaultGroupAttr={defaultSettingsAttrs?.label_container?.decoration?.border?.asMutable( { deep: true } ) ?? {}}
					fieldLabel={""}
					grouped={false}
				/>
				<BoxShadowGroup
					attrName="label_container.decoration.boxShadow"
					defaultGroupAttr={defaultSettingsAttrs?.label_container?.decoration?.boxShadow?.asMutable( { deep: true } ) ?? {}}
					fieldLabel={""}
					grouped={false}
				/>
			</GroupContainer>
			{
				"on" === attrs?.settings?.innerContent?.enable_header?.desktop?.value &&
				<>
					<GroupContainer
						id="header"
						title={__('Header', 'divi_flash')}
					>
						<TabList
							tabs={{
								icon: {
									label: __( 'Icon', 'divi_flash' ),
									component: <>
										<FieldContainer
											attrName="header.decoration.font.font"
											subName="color"
											label={__( 'Icon Color', 'divi_flash' )}
											description={__( 'Here you can define a custom color for the social network icon.', 'divi_flash' )}
											features={{
												sticky: false,
											}}
											defaultAttr={defaultSettingsAttrs?.header?.decoration?.font?.font}
										>
											<ColorPickerContainer/>
										</FieldContainer>
										<FieldContainer
											attrName="header.innerContent"
											subName="use_header_icon_font_size"
											label={__( 'Use Custom Icon Size', 'divi_flash' )}
											description={__( 'If you would like to control the size of the icon, you must first enable this option.', 'divi_flash' )}
											features={{
												sticky: false
											}}
											options={ {
												off: { label: __('No', 'divi_flash'), value: 'off' },
												on: { label: __('Yes', 'divi_flash'), value: 'on' }
											} }
											defaultAttr={defaultSettingsAttrs?.header?.innerContent}
										>
											<ToggleContainer/>
										</FieldContainer>
										{
											"on" === attrs?.header?.innerContent?.desktop?.value?.use_header_icon_font_size &&
											<FieldContainer
												attrName="header.decoration.header_icon_font_size"
												label={__( 'Icon Font Size', 'divi_flash' )}
												description={__( 'Control the size of the icon by increasing or decreasing the font size.', 'divi_flash' )}
												features={{
													sticky: false,
													responsive: true,
													hover: false,
												}}
												max={120}
												min={1}
												step={1}
												defaultUnit={"px"}
												allowedUnits={[ '%', 'em', 'rem', 'px', 'cm', 'mm', 'in', 'pt', 'pc', 'ex', 'vh', 'vw' ]}
												minLimit={1}
												defaultAttr={defaultSettingsAttrs?.header?.decoration?.header_icon_font_size}
											>
												<RangeContainer/>
											</FieldContainer>
										}
										<FieldContainer
											attrName='header.decoration.header_icon_position'
											label={__( 'Icon Position', 'divi_flash' )}
											description={__( 'Here you can choose Social Share Item content direction.', 'divi_flash' )}
											features={{
												sticky: false
											}}
											options={
												{
													'row': { label: __( 'Left', 'divi_flash' ), value: 'row' },
													'row-reverse': { label: __( 'Right', 'divi_flash' ), value: 'row-reverse' },
													'column': { label: __( 'Top', 'divi_flash' ), value: 'column' },
													'column-reverse': { label: __( 'Bottom', 'divi_flash' ), value: 'column-reverse' },
												}
											}
											defaultAttr={defaultSettingsAttrs?.header?.decoration?.header_icon_position}
										>
											<SelectContainer/>
										</FieldContainer>
										<FieldContainer
											attrName='header.decoration.header_icon_alignment'
											label={__( 'Icon Alignment', 'divi_flash' )}
											description={__( 'Here you can choose Social Share Item content direction.', 'divi_flash' )}
											features={{
												sticky: false
											}}
											options={
												{
													'flex-start': { label: __( 'Top / Left', 'divi_flash' ), value: 'flex-start' },
													'center': { label: __( 'Center', 'divi_flash' ), value: 'center' },
													'flex-end': { label: __( 'Bottom / Right', 'divi_flash' ), value: 'flex-end' },
												}
											}
											defaultAttr={defaultSettingsAttrs?.header?.decoration?.header_icon_alignment}
										>
											<SelectContainer/>
										</FieldContainer>
									</>
								},
								title: {
									label: __( 'Title', 'divi_flash' ),
									component: <>
										<FontGroup
											attrName="header_title.decoration.font"
											defaultGroupAttr={defaultSettingsAttrs?.header_title?.decoration?.font?.asMutable( { deep: true } ) ?? {}}
											fieldLabel={""}
											grouped={false}
										/>
									</>
								},
								sub_title: {
									label: __( 'Sub Title', 'divi_flash' ),
									component: <>
										<FontGroup
											attrName="header_sub_title.decoration.font"
											defaultGroupAttr={defaultSettingsAttrs?.header_sub_title?.decoration?.font?.asMutable( { deep: true } ) ?? {}}
											fieldLabel={""}
											grouped={false}
										/>
									</>
								}
							}}
						></TabList>
					</GroupContainer>
					<GroupContainer
						id="header_container"
						title={__('Header Container', 'divi_flash')}
					>
						<FieldContainer
							attrName="header_container.decoration.header_content_gap"
							label={__( 'Item Gap', 'divi_flash' )}
							description={__( 'Control the gap of the Social Share header item by increasing or decreasing the gap size.', 'divi_flash' )}
							features={{
								sticky: false,
								responsive: false,
								hover: false,
							}}
							max={120}
							min={1}
							step={1}
							defaultUnit={"px"}
							allowedUnits={[ '%', 'em', 'rem', 'px', 'cm', 'mm', 'in', 'pt', 'pc', 'ex', 'vh', 'vw' ]}
							minLimit={1}
							defaultAttr={defaultSettingsAttrs?.header_container?.decoration?.header_content_gap}
						>
							<RangeContainer/>
						</FieldContainer>
						<FieldContainer
							attrName='header_container.decoration.header_alignment'
							label={__( 'Alignment', 'divi_flash' )}
							description={__( 'Align your Header to the left, right or center of the module.', 'divi_flash' )}
							features={{
								sticky: false,
							}}
							options={{
								"flex-start": {
									"icon": "divi/text-align-left"
								},
								"center": {
									"icon": "divi/text-align-center"
								},
								"flex-end": {
									"icon": "divi/text-align-right"
								}
							}
							}
							defaultAttr={defaultSettingsAttrs?.header_container?.decoration?.header_alignment}
						>
							<ButtonOptionsContainer
								showLabel={false}
							/>
						</FieldContainer>
						<BackgroundGroup
							attrName="header_container.decoration.background"
							defaultGroupAttr={defaultSettingsAttrs?.header_container?.decoration?.background?.asMutable( { deep: true } ) ?? {}}
							fieldLabel={""}
							grouped={false}
						/>
						<BorderGroup
							attrName="header_container.decoration.border"
							defaultGroupAttr={defaultSettingsAttrs?.header_container?.decoration?.border?.asMutable( { deep: true } ) ?? {}}
							fieldLabel={""}
							grouped={false}
						/>
						<BoxShadowGroup
							attrName="header_container.decoration.boxShadow"
							defaultGroupAttr={defaultSettingsAttrs?.header_container?.decoration?.boxShadow?.asMutable( { deep: true } ) ?? {}}
							fieldLabel={""}
							grouped={false}
						/>
					</GroupContainer>
				</>
			}

			<GroupContainer
				id="share_button"
				title={__('Share Button', 'divi_flash')}
			>
				<BorderGroup
					attrName="settings.decoration.border"
					defaultGroupAttr={defaultSettingsAttrs?.settings?.decoration?.border?.asMutable( { deep: true } ) ?? {}}
					fieldLabel={""}
					grouped={false}
				/>
				<BoxShadowGroup
					attrName="settings.decoration.boxShadow"
					defaultGroupAttr={defaultSettingsAttrs?.settings?.decoration?.boxShadow?.asMutable( { deep: true } ) ?? {}}
					fieldLabel={""}
					grouped={false}
				/>
			</GroupContainer>
			<SizingGroup/>
			<GroupContainer
				id="spacing"
				title={__("Spacing", "divi_flash")}
			>
				<SpacingGroup
					attrName="icon.decoration.spacing"
					defaultGroupAttr={defaultSettingsAttrs?.icon?.decoration?.spacing?.asMutable( { deep: true } ) ?? {}}
					fieldLabel={"Icon/Image Container"}
					grouped={false}
				/>
				<SpacingGroup
					attrName="label_container.decoration.spacing"
					defaultGroupAttr={defaultSettingsAttrs?.label_container?.decoration?.spacing?.asMutable( { deep: true } ) ?? {}}
					fieldLabel={"Label Container"}
					grouped={false}
				/>
				<SpacingGroup
					attrName="header_container.decoration.spacing"
					defaultGroupAttr={defaultSettingsAttrs?.header_container?.decoration?.spacing?.asMutable( { deep: true } ) ?? {}}
					fieldLabel={"Header Container"}
					grouped={false}
				/>
				<SpacingGroup
					attrName="header.decoration.spacing"
					defaultGroupAttr={defaultSettingsAttrs?.header?.decoration?.spacing?.asMutable( { deep: true } ) ?? {}}
					fieldLabel={"Header Text Container"}
					grouped={false}
				/>
				<SpacingGroup
					attrName="settings.decoration.spacing"
					defaultGroupAttr={defaultSettingsAttrs?.settings?.decoration?.spacing?.asMutable( { deep: true } ) ?? {}}
					fieldLabel={"Share Button"}
					grouped={false}
				/>
				<SpacingGroup
					attrName="module.decoration.spacing"
					defaultGroupAttr={defaultSettingsAttrs?.module?.decoration?.spacing?.asMutable( { deep: true } ) ?? {}}
					grouped={false}
				/>
			</GroupContainer>
			<BorderGroup/>
			<BoxShadowGroup/>
			<AnimationGroup/>
		</React.Fragment>
	);
}