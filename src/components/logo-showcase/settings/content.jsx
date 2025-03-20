// External dependencies.
import React from 'react';

// WordPress dependencies
const { __ } = window?.vendor?.wp?.i18n;

// Divi dependencies.
import {
  AdminLabelGroup,
  BackgroundGroup,
  FieldContainer,
} from '@divi/module';

import { 
  GroupContainer
} from '@divi/modal';

import { 
  RichTextContainer,
  TextContainer,
  UploadGallery,
  Range,
  Toggle,
  Select,
} from '@divi/field-library';

import { GridLayoutField } from '../../../fields/grid-layout-field';
import { GridLayoutManager } from '../../../fields/grid-layout-manager';

const handleChange = ({ event, inputValue }) => {
  console.log('Event:', event); // The click event
  console.log('Selected Row & Column:', inputValue); // { row: <number>, column: <number> }
};

export const Content = ({
  defaultSettingsAttrs,
}) => { 
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ];

  return (
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
      id="generalSettings"
      title="General Settings"
    >
      <FieldContainer
        attrName="generalSettings.innerContent.range"
        label="Range"
      >
        <Range 
          max={120}
          min={0}
          step={1}
          defaultUnit={"px"}
          allowedUnits={["px"]}
        />
      </FieldContainer>
      <FieldContainer
        attrName="generalSettings.innerContent.toggle"
        label="Toggle"
        description="Enter Logo Section Title"
      >
        <Toggle 
          value="off"
        />
      </FieldContainer>
      <FieldContainer
        attrName="generalSettings.innerContent.select"
        label="Logos in a row "
        options={ {
          1: { label: __('Logo 1', 'divi_flash'), value: '1' },
          2: { label: __('Logo 2', 'divi_flash'), value: '2' },
          3: { label: __('Logo 3', 'divi_flash'), value: '3' },
          4: { label: __('Logo 4', 'divi_flash'), value: '4' },
          5: { label: __('Logo 5', 'divi_flash'), value: '5' },
          6: { label: __('Logo 6', 'divi_flash'), value: '6' },
          7: { label: __('Logo 7', 'divi_flash'), value: '7' },
          8: { label: __('Logo 8', 'divi_flash'), value: '8' },
          9: { label: __('Logo 9', 'divi_flash'), value: '9' },
          10: { label: __('Logo 10', 'divi_flash'), value: '10' },
          12: { label: __('Logo 12', 'divi_flash'), value: '12' }
        } }
      >
        <Select
          name="select-"
          options={options}
        />
      </FieldContainer>
    </GroupContainer>
    <BackgroundGroup />
    <AdminLabelGroup
      defaultGroupAttr={defaultSettingsAttrs?.adminLabel}
    />
  </React.Fragment>
)};