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
  UploadGallery,
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
    <GroupContainer
      id="mainContent"
      title="Logo Title Text"
    >
      <FieldContainer
        attrName="images.innerContent"
        label="Logos"
      >
        <UploadGallery />
      </FieldContainer>
      <FieldContainer
        attrName="title.innerContent"
        label="Logo Title"
        description="Enter Logo Section Title"
      >
        <TextContainer />
      </FieldContainer>
      <FieldContainer
        attrName="content.innerContent"
        label="Logo Sub Title"
      >
        <RichTextContainer />
      </FieldContainer>
    </GroupContainer>
    <BackgroundGroup />
    <AdminLabelGroup
      defaultGroupAttr={defaultSettingsAttrs?.adminLabel}
    />
  </React.Fragment>
)