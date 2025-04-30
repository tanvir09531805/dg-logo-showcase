// External dependencies.
import React from 'react';

// WordPress dependencies
const { __ } = window?.vendor?.wp?.i18n;

// Divi dependencies.
import {
	AdminLabelGroup,
	BackgroundGroup,
	FieldContainer,
	LinkGroup,
	DraggableChildModuleListContainer
} from '@divi/module';
import {
	GroupContainer
} from "@divi/modal";
import {
	DraggableListContainer, IconPickerContainer, RangeContainer, SelectContainer, TextContainer, ToggleContainer
} from '@divi/field-library';


export const Content = ( props ) => {
	const { attrs, defaultSettingsAttrs } = props;

	return (
		<React.Fragment>
			<DraggableChildModuleListContainer
				childModuleName="difl/social-share-item"
				addTitle={__('Add New Share Button', 'divi_flash')}
			>
				<DraggableListContainer />
			</DraggableChildModuleListContainer>
			<GroupContainer
				id="settings"
				title={__( 'General', 'divi_flash' )}
			>
				<FieldContainer
					attrName="settings.innerContent.item_view"
					label={__( 'View', 'divi_flash' )}
					description={__( 'Here you can choose the view of your Social Share Item.', 'divi_flash' )}
					features={{
						sticky: false
					}}
					options={ {
						iconAndText: { label: __('Icon & Text', 'divi_flash'), value: 'iconAndText' },
						icon: { label: __('Icon', 'divi_flash'), value: 'icon' },
						text: { label: __('Text', 'divi_flash'), value: 'text' }
					} }
					defaultAttr={defaultSettingsAttrs?.settings?.innerContent?.item_view}
				>
					<SelectContainer/>
				</FieldContainer>
				<FieldContainer
					attrName="settings.innerContent.column_view"
					label={__( 'Columns', 'divi_flash' )}
					description={__( '', 'divi_flash' )}
					features={{
						sticky: false,
					}}
					options={ {
						auto: { label: __('Auto', 'divi_flash'), value: 'auti' },
						one: { label: __('1', 'divi_flash'), value: 'one' },
						two: { label: __('2', 'divi_flash'), value: 'two' },
						three: { label: __('3', 'divi_flash'), value: 'three' },
						four: { label: __('4', 'divi_flash'), value: 'four' },
						five: { label: __('5', 'divi_flash'), value: 'five' },
						six: { label: __('6', 'divi_flash'), value: 'six' }
					} }
					defaultAttr={defaultSettingsAttrs?.settings?.innerContent?.column_view}
				>
					<SelectContainer/>
				</FieldContainer>
				<FieldContainer
					attrName='settings.innerContent.url_new_window'
					label={__( 'Link Target', 'divi_flash' )}
					description={__( 'Here you can choose whether or not your link opens in a new window.', 'divi_flash' )}
					features={{
						sticky: false,
						hover: false,
						responsive: false
					}}
					options={
						{
							'off': { label: __( 'In The Same Window', 'divi_flash' ), value: 'off' },
							'on': { label: __( 'In The New Tab', 'divi_flash' ), value: 'on' },
						}
					}
					defaultAttr={defaultSettingsAttrs?.settings?.innerContent?.url_new_window}
				>
					<SelectContainer/>
				</FieldContainer>
				<FieldContainer
					attrName="settings.innerContent.enable_header"
					label={__( 'Add Header', 'divi_flash' )}
					description={__( 'Here you can choose the view of your Social Share Item.', 'divi_flash' )}
					features={{
						sticky: false
					}}
					options={ {
						off: { label: __('No', 'divi_flash'), value: 'off' },
						on: { label: __('Yes', 'divi_flash'), value: 'on' }
					} }
					defaultAttr={defaultSettingsAttrs?.settings?.innerContent?.enable_header}
				>
					<ToggleContainer/>
				</FieldContainer>
			</GroupContainer>
			{
				"on" === attrs?.settings?.innerContent?.enable_header?.desktop?.value &&
				<GroupContainer
					id="header"
					title={__('Header', 'divi_flash')}
				>
					<FieldContainer
						attrName="header_title.innerContent"
						label={__( 'Title Text', 'divi_flash' )}
						description={__( 'This defines the Header Title text.', 'divi_flash' )}
						features={{
							sticky: false,
							responsive: false,
							hover: false,
						}}
						defaultAttr={defaultSettingsAttrs?.header_title?.innerContent}
					>
						<TextContainer/>
					</FieldContainer>
					<FieldContainer
						attrName="header_sub_title.innerContent"
						label={__( 'Sub Title Text', 'divi_flash' )}
						description={__( 'This defines the Header Sub Title text.', 'divi_flash' )}
						features={{
							sticky: false,
							responsive: false,
							hover: false,
						}}
						defaultAttr={defaultSettingsAttrs?.header_sub_title?.innerContent}
					>
						<TextContainer/>
					</FieldContainer>
					<FieldContainer
						attrName="header.innerContent"
						subName="header_icon"
						label={__( 'Icon', 'divi_flash' )}
						description={__( 'Choose an icon to display with your Social Share Header.', 'divi_flash' )}
						features={{
							sticky: false,
							responsive: false,
							hover: false,
						}}
						defaultAttr={defaultSettingsAttrs?.header?.innerContent}
					>
						<IconPickerContainer/>
					</FieldContainer>
				</GroupContainer>
			}
			<BackgroundGroup
				defaultGroupAttr={ defaultSettingsAttrs?.module?.decoration?.background?.asMutable( { deep: true } ) ?? {} }
			/>
			<AdminLabelGroup
				defaultGroupAttr={ defaultSettingsAttrs?.module.meta?.adminLabel }
			/>
		</React.Fragment>
	);
}