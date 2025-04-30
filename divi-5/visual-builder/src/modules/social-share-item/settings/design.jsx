// External dependencies.
import React from 'react';

// WordPress dependencies.
const { __ } = window?.vendor?.wp?.i18n;

// Divi dependencies.
import {
	BackgroundGroup,
	BorderGroup,
	BoxShadowGroup,
	FieldContainer,
	FontGroup,
	SpacingGroup,
	TextShadowGroup
} from "@divi/module";

import {
	GroupContainer,
	GroupTabs
} from '@divi/modal';
import {
	ColorPickerContainer,
	RangeContainer,
	TextContainer,
	ToggleContainer,
	UploadContainer
} from '@divi/field-library';

export const Design = ( props ) => {
	const { attrs, defaultSettingsAttrs } = props;
	return (
		<React.Fragment>
			<GroupContainer
				id="icon"
				title={__( 'Icon/Image', 'divi_flash' )}
			>
				{
					"on" !== attrs?.use_custom_image_icon?.innerContent?.desktop?.value &&
					<>
						<FieldContainer
							attrName="icon_color.decoration"
							label={__( 'Icon Color', 'divi_flash' )}
							description={__( 'Here you can define a custom color for the social network icon.', 'divi_flash' )}
							features={{
								sticky: false,
								hover: true,
								responsive: true
							}}
							defaultAttr={defaultSettingsAttrs?.icon_color?.decoration}
						>
							<ColorPickerContainer/>
						</FieldContainer>
						<FieldContainer
							attrName="use_icon_font_size.innerContent"
							label={__( 'Use Custom Icon/Image Size', 'divi_flash' )}
							description={__( 'If you would like to control the size of the icon, you must first enable this option.', 'divi_flash' )}
							features={{
								sticky: false
							}}
							options={
								{
									off: { label: __( 'No', 'divi_flash' ), value: 'off' },
									on: { label: __( 'Yes', 'divi_flash' ), value: 'on' }
								}
							}
							defaultAttr={defaultSettingsAttrs?.use_icon_font_size?.innerContent}
						>
							<ToggleContainer/>
						</FieldContainer>
						{
							"on" === attrs.use_icon_font_size?.innerContent?.desktop?.value &&
							<FieldContainer
								attrName="icon_font_size.decoration"
								label={__( 'Icon/Image Size', 'divi_flash' )}
								description={__( 'Control the size of the icon by increasing or decreasing the font size.', 'divi_flash' )}
								features={{
									sticky: true,
									hover: true,
									responsive: true
								}}
								defaultAttr={defaultSettingsAttrs?.icon_font_size?.decoration}
								max={120}
								min={1}
								step={1}
								defaultUnit={"px"}
								allowedUnits={[ '%', 'em', 'rem', 'px', 'cm', 'mm', 'in', 'pt', 'pc', 'ex', 'vh', 'vw' ]}
								minLimit={1}
							>
								<RangeContainer/>
							</FieldContainer>
						}
						{/*<FontGroup*/}
						{/*	attrName="icon.decoration.font"*/}
						{/*	defaultGroupAttr={defaultSettingsAttrs?.icon?.decoration?.font.asMutable( { deep: true } ) ?? {}}*/}
						{/*	grouped={false}*/}
						{/*	fields={{*/}
						{/*		headingLevel: {*/}
						{/*			render: true,*/}
						{/*		},*/}
						{/*		font: {*/}
						{/*			render: false,*/}
						{/*		},*/}
						{/*	}}*/}
						{/*/>*/}
						<TextShadowGroup
							attrName="icon.decoration.font.textShadow"
							defaultGroupAttr={defaultSettingsAttrs?.icon?.decoration?.font?.textShadow?.asMutable( { deep: true } ) ?? {}}
							grouped={false}
						/>
					</>
				}
				<BackgroundGroup
					attrName="icon.decoration.background"
					defaultGroupAttr={defaultSettingsAttrs?.icon?.decoration?.background?.asMutable( { deep: true } ) ?? {}}
					grouped={false}
				/>
				<BorderGroup
					attrName="icon.decoration.border"
					defaultGroupAttr={defaultSettingsAttrs?.icon?.decoration?.border?.asMutable( { deep: true } ) ?? {}}
					grouped={false}
				/>
				<BoxShadowGroup
					attrName="icon.decoration.boxShadow"
					defaultGroupAttr={defaultSettingsAttrs?.icon?.decoration?.boxShadow?.asMutable( { deep: true } ) ?? {}}
					grouped={false}
				/>
			</GroupContainer>
			<GroupContainer
				id="label"
				title={__( 'Label', 'divi_flash' )}
			>
				<FontGroup
					attrName="label.decoration.font"
					defaultGroupAttr={defaultSettingsAttrs?.label?.decoration?.font?.asMutable( { deep: true } ) ?? {}}
					grouped={false}
				/>
			</GroupContainer>
			<GroupContainer
				id="label_container"
				title={__( 'Label Container', 'divi_flash' )}
			>
				<BackgroundGroup
					attrName="label_container.decoration.background"
					defaultGroupAttr={defaultSettingsAttrs?.label_container?.decoration?.background?.asMutable( { deep: true } ) ?? {}}
					grouped={false}
				/>
				<BorderGroup
					attrName="label_container.decoration.border"
					defaultGroupAttr={defaultSettingsAttrs?.label_container?.decoration?.border?.asMutable( { deep: true } ) ?? {}}
					grouped={false}
				/>
				<BoxShadowGroup
					attrName="label_container.decoration.boxShadow"
					defaultGroupAttr={defaultSettingsAttrs?.label_container?.decoration?.boxShadow?.asMutable( { deep: true } ) ?? {}}
					grouped={false}
				/>
			</GroupContainer>
			<GroupContainer
				id="spacing"
				title={__( 'Spacing', 'divi_flash' )}
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
					fieldLabel={"Label"}
					grouped={false}
				/>
				<SpacingGroup
					defaultGroupAttr={defaultSettingsAttrs?.module?.decoration?.spacing?.asMutable( { deep: true } ) ?? {}}
					grouped={false}
				/>
			</GroupContainer>
			<BorderGroup
				defaultGroupAttr={defaultSettingsAttrs?.module?.decoration?.border?.asMutable( { deep: true } ) ?? {}}
			/>
			<BoxShadowGroup
				defaultGroupAttr={defaultSettingsAttrs?.module?.decoration?.boxShadow?.asMutable( { deep: true } ) ?? {}}
			/>
		</React.Fragment>
	);
}