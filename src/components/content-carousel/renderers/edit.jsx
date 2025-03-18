// External Dependencies.
import React, { Fragment, ReactElement, useState, useEffect, useRef } from 'react';

// Divi Dependencies.
import {
  ModuleContainer,
  ChildModulesContainer,
} from '@divi/module'

const { useFetch } = window?.divi?.rest;

import Swiper from '../../../../scripts/swiper.min';
import { getAttrByMode } from '@divi/module-utils';
import { map } from 'lodash';

const { __ } = window?.vendor?.wp?.i18n;

import { ScriptData } from "./script";
import { Classnames } from "./classnames";
import { Styles } from "./styles";



export const Edit = ( props ) => {
	const {
		attrs,
		id,
		name,
		elements,
		childrenIds
	} = props;
  
  const [imageUrls, setImageUrls] = useState([]);
   
  // let parentData = attrs.settingCarousel?.innerContent?.carouselType?.desktop?.value || [];
  let maxSlideToShowD = attrs.settingCarousel?.innerContent?.maxSlide?.desktop?.value || 3;
  let maxSlideToShowT = attrs.settingCarousel?.innerContent?.maxSlide?.tablet?.value || 2;
  let maxSlideToShowP = attrs.settingCarousel?.innerContent?.maxSlide?.phone?.value || 1;
  // settingCarousel.innerContent.carouselType
  // console.log('slid Desktop = ', maxSlideToShowD, 'Slid Tablet = ', maxSlideToShowT, 'Slid Phone = ', maxSlideToShowP);

  // console.log(maxSlideToShowD?.maxSlide);
  
	return (
		<ModuleContainer
      attrs={attrs}
      elements={elements}
      id={id}
      moduleClassName="d5_logo_showcase_module"
      name={name}
      scriptDataComponent={ScriptData}
      stylesComponent={Styles}
      classnamesFunction={Classnames}
    >
      {elements.styleComponents({ attrName: 'module', })}
      <div className="et_pb_module_inner">
        {/* {elements.render({ attrName: 'title', })}
        {elements.render({ attrName: 'content', })} */}

        <div className="difl_contentcarousel">
          <div className="df_cc_inner_wrapper">
            <span>Slide To Show Desktop: {String(maxSlideToShowD?.maxSlide)}</span><br />
            <span>Slide To Show Tablet: {String(maxSlideToShowT?.maxSlide)}</span><br /> 
            <span>Slide To Show Phone: {String(maxSlideToShowP?.maxSlide)}</span><br />
            <ChildModulesContainer ids={childrenIds}/>
          </div>
        </div> 
      </div>
    </ModuleContainer>
	);
}