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
	Range,
  Toggle,
  Select,
  ColorPicker,
	Gradient,
  Spacing
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
    <GroupContainer
      id="mainContent"
      title="General Settings"
    >
      <FieldContainer
        attrName="images.innerContent"
        label="Range"
      >
        <Range />
      </FieldContainer>
      <FieldContainer
        attrName="title.innerContent"
        label="Toggle"
        description="Enter Logo Section Title"
      >
        <Toggle />
      </FieldContainer>
      <FieldContainer
        attrName="content.innerContent"
        label="Logos in a row "
      >
        <Select />
      </FieldContainer>
    </GroupContainer>
    <BackgroundGroup />
    <AdminLabelGroup
      defaultGroupAttr={defaultSettingsAttrs?.adminLabel}
    />
  </React.Fragment>
)