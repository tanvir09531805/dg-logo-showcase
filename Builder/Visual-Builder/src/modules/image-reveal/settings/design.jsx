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
import { TabList } from "../../../components/tab-list";

export const Design = ( props ) => {
	const { attrs, defaultSettingsAttrs } = props;

	const attrsWithDefault = mergeAttrs({
		defaultAttrs: defaultSettingsAttrs?.asMutable({deep: true}) ?? {},
		attrs:        attrs.asMutable({deep: true}) ?? {},
	});

	return (
		<React.Fragment>
			<GroupContainer
				id="design_hover_overlay"
				title={__("Hover Overlay Content Styles",'divi_flash')}
			>
				<TabList
					tabs={{
						title: {
							label:__("Title",'divi_flash'),
							component: <>
								<FontGroup
									attrName="design_hover_overlay_title.decoration.font"
									fieldLabel={__("Title",'divi_flash')}
									defaultGroupAttr={defaultSettingsAttrs?.design_hover_overlay_title?.decoration?.font?.asMutable( { deep: true } ) ?? {}}
									grouped={false}
								/>
							</>
						},
						description: {
							label:__("Description",'divi_flash'),
							component: <>
								<FontGroup
									attrName="design_hover_overlay_description.decoration.font"
									fieldLabel={__("Description",'divi_flash')}
									defaultGroupAttr={defaultSettingsAttrs?.design_hover_overlay_description?.decoration?.font?.asMutable( { deep: true } ) ?? {}}
									grouped={false}
								/>
							</>
						}
					}}
				></TabList>
			</GroupContainer>
			{
				"on" === attrsWithDefault?.content_caption?.innerContent?.field_caption_enable?.desktop?.value &&
				<GroupContainer
					id="design_caption"
					title={__("Caption Styles",'divi_flash')}
				>
					<FontGroup
						attrName="design_caption.decoration.font"
						fieldLabel={__("Caption",'divi_flash')}
						defaultGroupAttr={defaultSettingsAttrs?.design_caption?.decoration?.font?.asMutable( { deep: true } ) ?? {}}
						grouped={false}
					/>
				</GroupContainer>
			}

			<GroupContainer
				id="alignment"
				title={__("Alignment",'divi_flash')}
			>
				<FieldContainer
					attrName='alignment.decoration.align'
					label={__( 'Image Alignment', 'divi_flash' )}
					description={__( 'Here you can choose the image alignment.', 'divi_flash' )}
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
					defaultAttr={defaultSettingsAttrs?.alignment?.decoration?.align}
				>
					<ButtonOptionsContainer
						showLabel={false}
					/>
				</FieldContainer>
			</GroupContainer>
			<GroupContainer
				id="width"
				title={__("Sizing",'divi_flash')}
			>
				<FieldContainer
					attrName="width.decoration.force_fullwidth"
					label={__( 'Force Fullwidth', 'divi_flash' )}
					description={__( 'When enabled, this will force your image to extend 100% of the width of the column it\'s in.', 'divi_flash' )}
					features={{
						sticky: false
					}}
					options={ {
						off: { label: __('No', 'divi_flash'), value: 'off' },
						on: { label: __('Yes', 'divi_flash'), value: 'on' }
					} }
					defaultAttr={defaultSettingsAttrs?.width?.decoration?.force_fullwidth}
				>
					<ToggleContainer/>
				</FieldContainer>
				<SizingGroup
					attrName="module.decoration.sizing"
					defaultGroupAttr={defaultSettingsAttrs?.width?.decoration?.sizing?.asMutable( { deep: true } ) ?? {}}
					grouped={false}
				/>
			</GroupContainer>
			<SpacingGroup
				attrName="module.decoration.spacing"
				defaultGroupAttr={defaultSettingsAttrs?.module?.decoration?.spacing?.asMutable( { deep: true } ) ?? {}}
			/>
			<BorderGroup
				attrName="module.decoration.border"
				defaultGroupAttr={defaultSettingsAttrs?.module?.decoration?.border?.asMutable( { deep: true } ) ?? {}}
			/>
			<BoxShadowGroup
				attrName="module.decoration.boxShadow"
				defaultGroupAttr={defaultSettingsAttrs?.module?.decoration?.boxShadow?.asMutable( { deep: true } ) ?? {}}
			/>
			<FiltersGroup />
			<TransformGroup />
			<AnimationGroup />
		</React.Fragment>
	);
}