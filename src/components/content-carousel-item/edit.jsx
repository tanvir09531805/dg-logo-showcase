// External Dependencies.
import React, { Fragment, ReactElement, useState, useEffect, useRef } from 'react';

// Divi Dependencies.
import {
  ModuleContainer,
} from '@divi/module'

const { useFetch } = window?.divi?.rest;

import { generateDefaultAttrs } from '@divi/module-library';

// import { getAttrByMode } from '@divi/module-utils';
const { getAttrByMode } = window?.divi?.moduleUtils;

import { processFontIcon } from '@divi/icon-library';
import { isEmpty, merge, map } from 'lodash';
import parentMetadata from '../content-carousel/module.json';

const { __ } = window?.vendor?.wp?.i18n;

import { ScriptData } from "./script";
import { Classnames } from "./classnames";
import { Styles } from "./styles";


export const Edit = ( props ) => {
	const {
		attrs,
		elements,
		id,
		name,
		parentAttrs
	} = props;
  
	const utils = window.ET_Builder.API.Utils;
	const parentDefaultAttrs = generateDefaultAttrs ( parentMetadata );
	const parentAttrsWithDefault = merge ( parentDefaultAttrs, parentAttrs );
	const parentIconContent = getAttrByMode ( parentAttrsWithDefault?.icon?.innerContent );
	const iconContent = getAttrByMode ( attrs?.icon?.innerContent );
	const icon = isEmpty ( iconContent ) ? parentIconContent : iconContent;

  const image     = attrs?.useImage?.innerContent?.desktop?.value;
  const imgSetAlt = attrs?.useImage?.innerContent?.desktop?.value?.alt;
  const imgAltText= imgSetAlt ? imgSetAlt : image?.alt;
  const btn       = attrs.button?.innerContent?.desktop?.value;
  const linkTarget= 'on' === btn?.linkTarget ? '_blank':'_self';
  const iconValue = attrs?.useIcon?.decoration?.icon?.desktop?.value;
  const iconHas   = attrs?.imageIcon?.innerContent?.desktop?.value?.useIcon ?? 'off';
  let iconMarkup = null;
  
 
  if (!isEmpty(iconValue) && iconHas === 'on') {
    iconMarkup = (
      <div className="df_cci_image_container">
        <span className="et-pb-icon">
          { processFontIcon (iconValue) }
        </span>
      </div>
    );
  }else{
    if (!isEmpty(image)) {
      iconMarkup = (
        <div className="df_cci_image_container">
          <img key={ image?.id } src={ image?.src } alt={imgAltText} title={image?.titleText} />
        </div>
      );
    }
    
  }

	return (
		<ModuleContainer
      attrs={attrs}
			parentAttrs={parentAttrs}
      elements={elements}
      id={id}
      moduleClassName="difl_contentcarouselitem"
      name={name}
      scriptDataComponent={ScriptData}
      stylesComponent={Styles}
      classnamesFunction={Classnames}
    >
      {elements.styleComponents({ attrName: 'module', })}
      
        <div class="df_cci_container">
          
          {iconMarkup}
          
          {elements.render ( {
            attrName: 'title',
          } )}
          {elements.render ( {
            attrName: 'subTitle',
          } )}
          {elements.render ( {
						attrName: 'content',
					} )}

          {btn?.text && (
            <div class="df_cci_button_wrapper">
              <a href={btn?.linkUrl} class="df_cci_button" target={linkTarget}>{btn.text}</a>
            </div>
          )}

        </div>

      
    </ModuleContainer>
	);
}