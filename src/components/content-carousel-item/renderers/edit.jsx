// External Dependencies.
import React, { Fragment, ReactElement, useState, useEffect, useRef } from 'react';

// Divi Dependencies.
import {
  ModuleContainer,
} from '@divi/module'

const { useFetch } = window?.divi?.rest;

import { generateDefaultAttrs } from '@divi/module-library';

import { getAttrByMode } from '@divi/module-utils';
import { processFontIcon } from '@divi/icon-library';
import { isEmpty, merge, map } from 'lodash';
import parentMetadata from '../../content-carousel/module.json';

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
  
  // const [imageUrls, setImageUrls] = useState([]);
   
	const utils = window.ET_Builder.API.Utils;
	// console.log(utils)
	const parentDefaultAttrs = generateDefaultAttrs ( parentMetadata );
	const parentAttrsWithDefault = merge ( parentDefaultAttrs, parentAttrs );
	const parentIconContent = getAttrByMode ( parentAttrsWithDefault?.icon?.innerContent );
	const iconContent = getAttrByMode ( attrs?.icon?.innerContent );
	const icon = isEmpty ( iconContent ) ? parentIconContent : iconContent;

  // useImage.innerContent.items.src
  const image     = attrs?.useImage?.innerContent?.items?.src?.desktop?.value;
  const imgSetAlt = attrs?.useImage?.innerContent?.items?.alt?.desktop?.value?.alt;
  const imgAltText= imgSetAlt ? imgSetAlt : image?.alt;

  // let title = attrs?.title?.innerContent?.desktop?.value || [];

  // let titleInfo = attrs?.title;

  // console.log('title info. = =', titleInfo);

  
  // imageIcon.innerContent
  // const useIcon = attrs?.imageIcon?.innerContent?.desktop?.value?.useIcon;
  // console.log('Use Icons Yes === ', useIcon);
  // let hookImage = attrs?.useImage?.innerContent?.items?.src?.desktop?.value;
  // let hookImage = attrs?.image?.innerContent?.desktop?.value?.image;
  // console.log('Hook icon = ', attrs?.icon?.innerContent?.desktop);
  let btn = attrs.button?.innerContent?.desktop?.value;
  let linkTarget = 'on' === btn?.linkTarget ? '_blank':'_self';
  // console.log('all attrs = ', attrs);


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
          {image && (
            <div className="df_cci_image_container">
              <img key={ image?.id } src={ image?.src } alt={imgAltText} title={image?.titleText} />
            </div>
          )}
          
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