// External dependencies.
import React from 'react';

// WordPress dependencies
const { __ } = window?.vendor?.wp?.i18n;

// Divi dependencies.
const {
	AdminLabelGroup,
	BackgroundGroup,
	FieldContainer,
	LinkGroup,
	DraggableChildModuleListContainer
} = window?.divi?.module;
const { GroupContainer } = window?.divi?.modal;
const {
	IconPickerContainer,
	RangeContainer,
	RichTextContainer,
	TextContainer,
	UploadContainer,
	UploadGalleryContainer,
	DraggableListContainer
} = window?.divi?.fieldLibrary;

import { GridLayoutField } from '../../../fields/grid-layout-field';
import { GridLayoutManager } from '../../../fields/grid-layout-manager';

const handleChange = ({ event, inputValue }) => {
	console.log('Event:', event); // The click event
	console.log('Selected Row & Column:', inputValue); // { row: <number>, column: <number> }
};

export const Content = ( {
	defaultSettingsAttrs,
} ) => (
	<React.Fragment>
		<DraggableChildModuleListContainer
			childModuleName="diviflash/bento-grid-item"
			addTitle={__('Add New Child Module', 'divi_flash')}
		>
			<DraggableListContainer />
		</DraggableChildModuleListContainer>
		<GroupContainer
			id="images"
			title={ __( 'Content', 'divi_flash' ) }
		>
			<FieldContainer
				attrName="images.innerContent"
				subName="src"
				label={ __( 'Image', 'divi_flash' ) }
				description={ __( 'Upload an Image', 'divi_flash' ) }
				features={ {
					sticky: false,
					hover: false,
					responsive: false,
					dynamicContent: {
						type: "image"
					}
				} }
			>
				<UploadGalleryContainer/>
			</FieldContainer>
		</GroupContainer>
		<GroupContainer
			id="gridLayout"
			title={__( 'Grid Layout', 'divi_flash' )}
		>
			<FieldContainer
				attrName="gridLayout.decoration"
				subName="columnCount"
				label={ __( 'Column Count', 'divi_flash' ) }
				description={ __( 'Set Number of Column in a Row', 'divi_flash' ) }
				features={ {
					sticky: false,
					hover: false,
					responsive: true
				} }
				defaultAttr={defaultSettingsAttrs?.gridLayout?.decoration}
			>
				<RangeContainer
					max={24}
					min={1}
					step={1}
					defaultUnit={""}
					allowedUnits={[""]}
				/>
			</FieldContainer>
			<FieldContainer
				attrName="gridLayout.decoration"
				subName="rowCount"
				label={ __( 'Row Count', 'divi_flash' ) }
				description={ __( 'Set Number of Row in a Column', 'divi_flash' ) }
				features={ {
					sticky: false,
					hover: false,
					responsive: true
				} }
				defaultAttr={defaultSettingsAttrs?.gridLayout?.decoration}
			>
				<RangeContainer
					max={24}
					min={1}
					step={1}
					defaultUnit={""}
					allowedUnits={[""]}
				/>
			</FieldContainer>
			<FieldContainer
				attrName="gridLayout.decoration"
				subName="gridGap"
				label={ __( 'Gap', 'divi_flash' ) }
				description={ __( 'Set Gap between Row and Column', 'divi_flash' ) }
				features={ {
					sticky: false,
					hover: false,
					responsive: true
				} }
				defaultAttr={defaultSettingsAttrs?.gridLayout?.decoration}
			>
				<RangeContainer
					min={1}
					step={1}
					defaultUnit={"px"}
					allowedUnits={["px"]}
				/>
			</FieldContainer>
		</GroupContainer>
		<GroupContainer
			id="profile"
			title="Profile"
		>
			<FieldContainer
				attrName="profile.decoration.size"
				// subName="profileSize"
				label={ __( 'Profile Size', 'divi_flash' ) }
				description={ __( 'Set the Profile Size', 'divi_flash' ) }
				features={ {
					sticky: false,
					hover: false,
					responsive: true
				} }
				defaultAttr={defaultSettingsAttrs?.profile?.decoration?.size}
			>
				<RangeContainer
					max={300}
					min={0}
					step={1}
					defaultUnit={"px"}
					allowedUnits={["px"]}
				/>
			</FieldContainer>
		</GroupContainer>
		<GroupContainer
			id="gridLayoutField"
			title="Grid Layout"
		>
			<FieldContainer
				attrName="gridLayoutField.decoration"
				// subName="profileSize"
				label={ __( 'Grid Size', 'divi_flash' ) }
				description={ __( 'Set the Grid Size', 'divi_flash' ) }
				features={ {
					sticky: false,
					hover: false,
					responsive: true
				} }
				defaultAttr={defaultSettingsAttrs?.gridLayoutField?.decoration}
			>
				<GridLayoutField
					row="16"
					column="16"
					onChange={handleChange}
				/>
			</FieldContainer>
			<FieldContainer
				attrName="gridLayoutField.decoration"
				subName="gridGap"
				label={ __( 'Gap', 'divi_flash' ) }
				description={ __( 'Set Gap between Row and Column', 'divi_flash' ) }
				features={ {
					sticky: false,
					hover: false,
					responsive: true
				} }
				defaultAttr={defaultSettingsAttrs?.gridLayoutField?.decoration}
			>
				<RangeContainer
					min={1}
					step={1}
					defaultUnit={"px"}
					allowedUnits={["px"]}
				/>
			</FieldContainer>
		</GroupContainer>

		<GroupContainer
			id="gridLayoutManager"
			title="Grid Layout Manager"
		>
			<GridLayoutManager
				row="6"
				column="6"
				child="3"
			/>
		</GroupContainer>
		<LinkGroup/>
		<BackgroundGroup
			defaultGroupAttr={ defaultSettingsAttrs?.module?.decoration?.background?.asMutable( { deep: true } ) ?? {} }
		/>
		<AdminLabelGroup
			defaultGroupAttr={ defaultSettingsAttrs?.module.meta?.adminLabel }
		/>
	</React.Fragment>
)