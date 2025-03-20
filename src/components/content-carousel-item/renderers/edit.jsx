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
  const image = attrs?.useImage?.innerContent?.items?.src?.desktop?.value;
  // imageIcon.innerContent
  // const useIcon = attrs?.imageIcon?.innerContent?.desktop?.value?.useIcon;
  // console.log('Use Icons Yes === ', useIcon);

  // let title = attrs?.title?.innerContent?.desktop?.value || [];

  // let hookImage = attrs?.useImage?.innerContent?.items?.src?.desktop?.value;
  let hookImage = attrs?.image?.innerContent?.desktop?.value?.image;
  // console.log('Hook icon = ', attrs?.icon?.innerContent?.desktop);


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
          {hookImage && (
            <div className="df_cci_image_container">
              <img key={ hookImage?.id } src={ hookImage?.src } alt={hookImage?.titleText} width={110} />
            </div>
          )}
          <h4 class="df_cc_title">{elements.render ( {
            attrName: 'title',
          } )}</h4>
          {elements.render ( {
            attrName: 'subTitle',
          } )}
          <div class="df_cc_content">{elements.render ( {
						attrName: 'content',
					} )}</div>
          <div class="df_cci_button_wrapper">
            <a href="#" class="df_cci_button">Read</a>
          </div>
        </div>

      
    </ModuleContainer>
	);
}