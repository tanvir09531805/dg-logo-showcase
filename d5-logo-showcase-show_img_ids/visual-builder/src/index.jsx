import React, { useState, useEffect } from 'react';
// import { useRef, useState, useEffect, Fragment } from '@wordpress/element';

// Module stylesheet (if applicable)
import './style.css';

// import ImageUrl from './imageUrl';

// WordPress package dependencies.
const { addAction, } = window?.vendor?.wp?.hooks;
  
// Divi package dependencies.
const {
  RichTextContainer,
  TextContainer,
  UploadGallery,
} = window?.divi?.fieldLibrary;
const {
  GroupContainer
} = window?.divi?.modal;
const {
  // Renderer - HTML
  ModuleContainer,

  // Renderer - Styles
  StyleContainer,

  // Renderer - Classnames
  elementClassnames,

  // Settings - Content
  AdminLabelGroup,
  BackgroundGroup,
  FieldContainer,

  // Settings - Design
  AnimationGroup,
  BorderGroup,
  BoxShadowGroup,
  FiltersGroup,
  FontGroup,
  FontBodyGroup,
  SizingGroup,
  SpacingGroup,
  TransformGroup,

  // Settings - Advanced
  PositionSettingsGroup,
  ScrollSettingsGroup,
  TransitionGroup,
  VisibilitySettingsGroup,
} = window?.divi?.module;
const {
  registerModule
} = window?.divi?.moduleLibrary;

// Module metadata that is used in both Frontend and Visual Builder.
import metadata from './module.json'; 

/**
 * React function component for rendering module style.
 */
const ModuleStyles = ({
  attrs,
  elements,
  settings,
  orderClass,
  mode,
  state,
  noStyleTag
}) => (
  <StyleContainer mode={mode} state={state} noStyleTag={noStyleTag}>
    {/* Element: Module */}
    {elements.style({
      attrName: 'module',
      styleProps: {
        disabledOn: {
          disabledModuleVisibility: settings?.disabledModuleVisibility
        }
      }
    })}

    {/* Element: Title */}
    {elements.style({
      attrName: 'title',
    })}

    {/* Element: Content */}
    {elements.style({
      attrName: 'content',
    })}
  </StyleContainer>
);

/**
 * React function component for registering module script data.
 */
const ModuleScriptData = ({
  elements,
}) => (
  <React.Fragment>
    {elements.scriptData({
      attrName: 'module',
    })}
  </React.Fragment>
);

/**
 * Function for registering module classnames.
 */
const moduleClassnames = ({
  classnamesInstance,
  attrs,
}) => {
  // Add element classnames.
  classnamesInstance.add(
    elementClassnames({
      attrs: attrs?.module?.decoration ?? {},
    }),
  );
}

// get image url by image ids
const fetchImageUrls = async (imageIds) => {
  const idsArray = Array.isArray(imageIds) ? imageIds : imageIds.split(",");
  try {
    const imageUrls = await Promise.all(
      idsArray.map(async (id) => {
        const response = await fetch(`/wp-json/wp/v2/media/${id}`);
        if (!response.ok) throw new Error(`Error fetching image with ID: ${id}`);
        const imageData = await response.json();
        return imageData.source_url;
      })
    );
    return imageUrls;
  } catch (error) {
    console.error("Error fetching image URLs:", error);
    return [];
  }
};

/**
 * Simple Quick Module.
 */
const logoShowcaseModule = {
  
  // Metadata that is used on Visual Builder and Frontend
  metadata,

  // Layout renderer components.
  renderers: {
    // React Function Component for rendering module's output on layout area.
    edit: ({
      attrs,
      id,
      name,
      elements,
    }) => { 
      const [imageUrls, setImageUrls] = useState([]);
      const imageIds = attrs?.images?.innerContent?.desktop?.value || [];
      // let urls = fetchImageUrls(imageIds);

      /*
      urls.then(imageUrls => {
        console.log(imageUrls); 
      });
      */
      useEffect(() => {
        const loadImageUrls = async () => {
          if (imageIds.length) {
            const urls = await fetchImageUrls(imageIds);
            setImageUrls(urls);
          }
        };
        loadImageUrls();
      }, [imageIds]);

      console.log(imageUrls); 
      
      let idsArray = imageIds.length?imageIds.split(","):[];

      return (
        <ModuleContainer
          attrs={attrs}
          elements={elements}
          id={id}
          moduleClassName="d5_logo_showcase_module"
          name={name}
          scriptDataComponent={ModuleScriptData}
          stylesComponent={ModuleStyles}
          classnamesFunction={moduleClassnames}
        >
          {elements.styleComponents({ attrName: 'module', })}
          <div className="et_pb_module_inner">
            {elements.render({ attrName: 'title', })}
            {elements.render({ attrName: 'content', })}

            <div className="d5_ls_module_images">
              {/* {idsArray?.map((id, index) => (
                <div key={index} className="d5_ls_module_image">
                  <span>Logo ID: {id} | Logo Index: {index + 1}</span>
                </div>
              ))} */}

              {imageUrls.length > 0 ? (
                imageUrls.map((url, index) => (
                  <div key={index} className="d5_ls_module_image">
                    <img src={url} alt={`Logo ${index + 1}`} />
                    <span>Logo Index: {index + 1}</span>
                  </div>
                ))
              ) : (
                <span>No images available.</span>
              )}

            </div> 

          </div>
          
        </ModuleContainer>
      )
    },
  },

  // Settings component.
  settings: {
    // React function component that renders module settings' content panel.
    content: ({ defaultSettingsAttrs }) => (
      <React.Fragment>
        <GroupContainer
          id="mainContent"
          title="Logo Title Text"
        >
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
          <FieldContainer
            attrName="images.innerContent"
            label="Logos"
          >
            <UploadGallery />
          </FieldContainer>
        </GroupContainer>
        <BackgroundGroup />
        <AdminLabelGroup
          defaultGroupAttr={defaultSettingsAttrs?.adminLabel}
        />
      </React.Fragment>
    ),

    // React function component that renders module settings' design panel.
    design: () => (
      <React.Fragment>
        <FontGroup
          attrName="title.decoration.font"
          groupLabel="Title Font"
        />
        <FontBodyGroup
          attrName="content.decoration.bodyFont"
          groupLabel="Content Font"
        />
        <SizingGroup />
        <SpacingGroup />
        <BorderGroup />
        <BoxShadowGroup />
        <FiltersGroup />
        <TransformGroup />
        <AnimationGroup />
      </React.Fragment>
    ),

    // React function component that renders module settings' advanced panel.
    advanced: () => (
      <React.Fragment>
        <CssGroup
            mainSelector=".d5_logo_showcase_module"
            cssFields={groupConfiguration?.css?.component?.props?.cssFields || []}
        />
        <VisibilitySettingsGroup />
        <TransitionGroup />
        <PositionSettingsGroup />
        <ScrollSettingsGroup />
      </React.Fragment>
    ),
  },

  // Attribute that is automatically added into the module when the module is inserted
  // into the layout so that the newly inserted module has some placeholder content
  placeholderContent: {
    module: {
      decoration: {
        background: {
          desktop: {
            value: {
              color: '#DFDFDF',
            }
          }
        },
      }
    },
    title: {
      innerContent: {
        desktop: {
          value: 'Module Title'
        }
      }
    },
    content: {
      innerContent: {
        desktop: {
            value: '<p>Default content for the logo showcase module.</p>',
        }
      }
    }
  },
};

// Register module.
addAction('divi.moduleLibrary.registerModuleLibraryStore.after', 'd5Ls.logoShowcaseModule', () => {
  registerModule(logoShowcaseModule.metadata, logoShowcaseModule);
});

