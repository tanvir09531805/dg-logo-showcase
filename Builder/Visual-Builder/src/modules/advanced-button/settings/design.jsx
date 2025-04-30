// External dependencies.
import React from 'react';

// WordPress dependencies.
const { __ } = window?.vendor?.wp?.i18n;

import { TooltipDesign, TooltipText, TooltipHeadingText } from "../../../components/tooltip";


// Divi dependencies.
import {
	AnimationGroup,
	BorderGroup,
	BoxShadowGroup,
	FieldContainer,
	FiltersGroup,
	FontGroup,
	SizingGroup,
	SpacingGroup,
	TransformGroup
} from "@divi/module";

import { GroupContainer, GroupTabs } from '@divi/modal';
import {
	ColorPickerContainer,
	RangeContainer,
	ButtonOptionsContainer
} from '@divi/field-library';
import { mergeAttrs } from '@divi/module-utils';

export const Design = ( props ) => {
	const { defaultSettingsAttrs } = props

	return (
		<React.Fragment>
			<GroupContainer
				id="alignment"
				title={__( 'Alignment', 'divi_flash' )}
			>
				<FieldContainer
					attrName='alignment.decoration.button_alignment'
					label={__( 'Button Alignment', 'divi_flash' )}
					description={__( 'Align your button to the left, right or center of the module.', 'divi_flash' )}
					features={{
						sticky: false,
					}}
					options={{
						"left": {
							"icon": "divi/align-left"
						},
						"center": {
							"icon": "divi/align-center"
						},
						"right": {
							"icon": "divi/align-right"
						}
					}
					}
					defaultAttr={defaultSettingsAttrs?.alignment?.decoration?.button_alignment}
				>
					<ButtonOptionsContainer
						showLabel={false}
					/>
				</FieldContainer>
				<FieldContainer
					attrName='alignment.decoration.button_content_alignment'
					label={__( 'Button Content Alignment', 'divi_flash' )}
					description={__( 'Align your content to the left, right or center of the Button.', 'divi_flash' )}
					features={{
						sticky: false,
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
						},
						"justified": {
							"icon": "divi/text-align-justify"
						}
					}
					}
					defaultAttr={defaultSettingsAttrs?.alignment?.decoration?.button_content_alignment}
				>
					<ButtonOptionsContainer
						showLabel={false}
					/>
				</FieldContainer>
			</GroupContainer>
			<GroupContainer id="design_text" title={__( 'Text', 'divi_flash' )}>
				<FontGroup
					groupLabel={__ ( '', 'divi_flash' )}
					attrName="text.decoration.font"
					fieldLabel={__ ( '', 'divi_flash' )}
					defaultGroupAttr={defaultSettingsAttrs?.text?.decoration?.font?.asMutable ( { deep: true } ) ?? {}}
					grouped={false}
				/>
			</GroupContainer>
			<GroupContainer id="design_sub_text" title={__( 'Sub Text', 'divi_flash' )}>
				<FontGroup
					groupLabel={__ ( '', 'divi_flash' )}
					attrName="sub_text.decoration.font"
					fieldLabel={__ ( '', 'divi_flash' )}
					defaultGroupAttr={defaultSettingsAttrs?.sub_text?.decoration?.font?.asMutable ( { deep: true } ) ?? {}}
					grouped={false}
				/>
			</GroupContainer>
			<GroupContainer id="design_media" title={__( 'Media', 'divi_flash' )}>
				{
					props?.attrs?.use_button_icon?.innerContent?.desktop?.value === 'on' &&
					<>
						<FieldContainer
							attrName='design_media.decoration.icon_color'
							label={__( 'Icon Color', 'divi_flash' )}
							description={__( 'Here you can define a custom color for your icon.', 'divi_flash' )}
							features={{
								sticky: false,
							}}
							defaultAttr={defaultSettingsAttrs?.design_media?.decoration?.icon_color}
						>
							<ColorPickerContainer/>
						</FieldContainer>
						<FieldContainer
							attrName='design_media.decoration.button_icon_size'
							label={__( 'Icon Size', 'divi_flash' )}
							description={__( 'Here you can choose Icon width.', 'divi_flash' )}
							features={{
								sticky: false,
							}}
							defaultAttr={defaultSettingsAttrs?.design_media?.decoration?.button_icon_size}
						>
							<RangeContainer
								max={200}
								min={1}
								step={1}
								defaultUnit={"px"}
								allowedUnits={[ '%', 'em', 'rem', 'px', 'cm', 'mm', 'in', 'pt', 'pc', 'ex', 'vh', 'vw' ]}
								minLimit={1}
							/>
						</FieldContainer>
					</>
				}

				<FieldContainer
					attrName='design_media.decoration.media_background_color'
					label={__( 'Background Color', 'divi_flash' )}
					description={__( 'Here you can define a custom background color for your icon.', 'divi_flash' )}
					features={{
						sticky: false,
					}}
					defaultAttr={defaultSettingsAttrs?.design_media?.decoration?.media_background_color}
				>
					<ColorPickerContainer/>
				</FieldContainer>
				<FieldContainer
					attrName='design_media.decoration.media_wrapper_width'
					label={__( 'Wrapper Width', 'divi_flash' )}
					description={__( 'Here you can choose Media Wrapper width.', 'divi_flash' )}
					features={{
						sticky: false,
					}}
					defaultAttr={defaultSettingsAttrs?.design_media?.decoration?.media_wrapper_width}
				>
					<RangeContainer
						max={200}
						min={1}
						step={1}
						defaultUnit={"px"}
						allowedUnits={[ '%', 'em', 'rem', 'px', 'cm', 'mm', 'in', 'pt', 'pc', 'ex', 'vh', 'vw' ]}
						minLimit={1}
					/>
				</FieldContainer>
				<FieldContainer
					attrName='design_media.decoration.media_wrapper_height'
					label={__( 'Wrapper Height', 'divi_flash' )}
					description={__( 'Here you can choose Media Wrapper height.', 'divi_flash' )}
					features={{
						sticky: false,
					}}
					defaultAttr={defaultSettingsAttrs?.design_media?.decoration?.media_wrapper_height}
				>
					<RangeContainer
						max={200}
						min={1}
						step={1}
						defaultUnit={"px"}
						allowedUnits={[ '%', 'em', 'rem', 'px', 'cm', 'mm', 'in', 'pt', 'pc', 'ex', 'vh', 'vw' ]}
						minLimit={1}
					/>
				</FieldContainer>
				<BorderGroup
					attrName="design_media.decoration.border"
					defaultGroupAttr={defaultSettingsAttrs?.design_media?.decoration?.border?.asMutable( { deep: true } ) ?? {}}
					grouped={false}
				/>
				<SpacingGroup
					attrName="design_media.decoration.spacing"
					defaultGroupAttr={defaultSettingsAttrs?.design_media?.decoration?.spacing?.asMutable( { deep: true } ) ?? {}}
					grouped={false}
				/>
				<BoxShadowGroup
					attrName="design_media.decoration.boxShadow"
					defaultGroupAttr={defaultSettingsAttrs?.design_media?.decoration?.boxShadow?.asMutable( { deep: true } ) ?? {}}
					grouped={false}
				/>
			</GroupContainer>
			<TooltipDesign
				props={props}
				defaultSettingsAttrs={defaultSettingsAttrs}
			/>
			<TooltipText
				props={props}
				defaultSettingsAttrs={defaultSettingsAttrs}
			/>
			<TooltipHeadingText
				props={props}
				defaultSettingsAttrs={defaultSettingsAttrs}
			/>
			<SizingGroup
				defaultGroupAttr={defaultSettingsAttrs?.module?.decoration?.sizing?.asMutable( { deep: true } ) ?? {}}
				fields={{
					alignment: {
						render: false,
					},
				}}
			/>
			<GroupContainer id="spacing" title={__( 'Spacing', 'divi_flash' )}>
				<SpacingGroup
					attrName="content_container_spacing.decoration.spacing"
					defaultGroupAttr={defaultSettingsAttrs?.content_container_spacing?.decoration?.spacing?.asMutable( { deep: true } ) ?? {}}
					fieldLabel={"Content Container"}
					grouped={false}
				/>
				<SpacingGroup
					attrName="text.decoration.spacing"
					defaultGroupAttr={defaultSettingsAttrs?.text?.decoration?.spacing?.asMutable( { deep: true } ) ?? {}}
					fieldLabel={"Text"}
					grouped={false}
				/>
				<SpacingGroup
					attrName="sub_text.decoration.spacing"
					defaultGroupAttr={defaultSettingsAttrs?.sub_text?.decoration?.spacing?.asMutable( { deep: true } ) ?? {}}
					fieldLabel={"Sub Text"}
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
			<FiltersGroup
				defaultGroupAttr={defaultSettingsAttrs?.module?.decoration?.filters?.asMutable( { deep: true } ) ?? {}}
			/>
			<TransformGroup
				defaultGroupAttr={defaultSettingsAttrs?.module?.decoration?.transform?.asMutable( { deep: true } ) ?? {}}
			/>
			<AnimationGroup
				defaultGroupAttr={defaultSettingsAttrs?.module?.decoration?.animation?.asMutable( { deep: true } ) ?? {}}
			/>
		</React.Fragment>
	)
}