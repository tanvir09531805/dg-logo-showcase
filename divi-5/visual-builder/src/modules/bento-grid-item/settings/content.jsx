// External dependencies.
import React from 'react';
import { GridLayoutField } from "../../../fields/grid-layout-field";

// WordPress dependencies
const { __ } = window?.vendor?.wp?.i18n;

// Divi dependencies.
const {
	BackgroundGroup,
	FieldContainer,
	LinkGroup,
	ButtonLinkGroup
} = window?.divi?.module;
// import {ButtonLinkGroup} from "@divi/module";

const { GroupContainer } = window?.divi?.modal;
const {
	IconPickerContainer,
	RichTextContainer,
	TextContainer,
	UploadContainer,
	RangeContainer,
	Warning
} = window?.divi?.fieldLibrary;
const { mergeAttrs } = window?.divi?.moduleUtils;


const handleChange = ({ event, inputValue }) => {
	console.log('Event:', event); // The click event
	console.log('Selected Row & Column:', inputValue); // { row: <number>, column: <number> }
};
export const Content = ( {
	                         defaultSettingsAttrs,
	                         parentAttrs,
                         } ) => {
	const defaultIconAttrs = mergeAttrs ( {
		defaultAttrs: defaultSettingsAttrs?.icon,
		attrs: parentAttrs?.asMutable ( { deep: true } )?.icon,
	} );

	return (
		<React.Fragment>
			<GroupContainer
				id="mainContent"
				title={__ ( 'Text', 'divi_flash' )}
			>
				<FieldContainer
					attrName="title.innerContent"
					label={__ ( 'Title', 'divi_flash' )}
					description={__ ( 'Input your value to action title here.', 'divi_flash' )}
					features={{
						sticky: false,
					}}
				>
					<TextContainer/>
				</FieldContainer>
				<FieldContainer
					attrName="content.innerContent"
					label={__ ( 'Content', 'divi_flash' )}
					description={__ ( 'Input the main text content for your module here.', 'divi_flash' )}
					features={{
						sticky: false,
					}}
				>
					<RichTextContainer/>
				</FieldContainer>
			</GroupContainer>
			<GroupContainer
				id="icon"
				title={__ ( 'Icon', 'divi_flash' )}
			>
				<FieldContainer
					attrName="icon.innerContent"
					label={__ ( 'Icon', 'divi_flash' )}
					description={__ ( 'Pick an Icon', 'divi_flash' )}
					features={{
						sticky: false,
					}}
					defaultAttr={defaultIconAttrs}
				>
					<IconPickerContainer/>
				</FieldContainer>
			</GroupContainer>
			<GroupContainer
				id="image"
				title={ __( 'Image', 'divi_flash' ) }
			>
				<FieldContainer
					attrName="image.innerContent"
					subName="src"
					label={ __( 'Profile Image', 'divi_flash' ) }
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
					<UploadContainer/>
				</FieldContainer>
				<FieldContainer
					attrName="image_size.decoration.size"
					// subName="profileSize"
					label={ __( 'Profile Size', 'divi_flash' ) }
					description={ __( 'Set the Profile Size', 'divi_flash' ) }
					features={ {
						sticky: false,
						hover: false,
						responsive: true
					} }
					defaultAttr={defaultSettingsAttrs?.image_size?.decoration?.size}
				>
					<RangeContainer
						max={300}
						min={0}
						step={12}
						defaultUnit={"px"}
						allowedUnits={["px"]}
					/>
				</FieldContainer>
			</GroupContainer>
			<GroupContainer
				id="button"
				title={__( 'Button', 'divi_flash' )}
			>
				<FieldContainer
					attrName="button.innerContent"
					subName="buttonTitle"
					label={ __( 'Text', 'divi_flash' ) }
				>
					<TextContainer/>
				</FieldContainer>
				<ButtonLinkGroup
					// groupLabel={__ ( 'Button', 'divi_flash' )}
					attrName='button.innerContent'
					fieldLabel={""}
					grouped={false}
				/>
			</GroupContainer>

			<GroupContainer
				id="gridLayout"
				title={__( 'Grid Layout', 'divi_flash' )}
			>
				<Warning
					value={__( `Warning: Parent Column Count: 8, Row Count: 8.`, 'divi_flash' ) }
				/>
				<FieldContainer
					attrName="gridLayout.decoration"
					subName="columnSpan"
					label={ __( 'Column Span', 'divi_flash' ) }
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
						allowedUnits={[]}
					/>
				</FieldContainer>
				<FieldContainer
					attrName="gridLayout.decoration"
					subName="rowSpan"
					label={ __( 'Row Span', 'divi_flash' ) }
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
						allowedUnits={[]}
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
					label={ __( 'Item Grid Size', 'divi_flash' ) }
					description={ __( 'Set the Item Grid Size', 'divi_flash' ) }
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
			</GroupContainer>
			<LinkGroup/>
			<BackgroundGroup
				defaultGroupAttr={defaultSettingsAttrs?.module?.decoration?.background?.asMutable ( { deep: true } ) ?? {}}
			/>
		</React.Fragment>
	);
}
