// External Dependencies.
import React, { Fragment, ReactElement, useState, useEffect, useRef } from 'react';

// Divi Dependencies.
import {
  ModuleContainer,
  ChildModulesContainer,
} from '@divi/module'

const { useFetch } = window?.divi?.rest;

// import '../../../../styles/swiper.min.css';
import Swiper from '../../../scripts/swiper.min';
import { getAttrByMode } from '@divi/module-utils';
import { map } from 'lodash';

const { __ } = window?.vendor?.wp?.i18n;

import { ScriptData } from "./script";
import { Classnames } from "./classnames";
import { Styles } from "./styles";

// import 'swiper/swiper.min.css';

export const Edit = ( props ) => {
	const {
		attrs,
		id,
		name,
		elements,
		childrenIds
	} = props;
  
  const [loading, setLoading] = useState();
  const [swiperInstance, setSwiperInstance] = useState(null);
  const wrapper = useRef(null);

  // custom breakpoints
  const desktopBreakpoint= window.matchMedia('(min-width: 992px)').matches;
  const tabletBreakpoint = window.matchMedia('screen and (min-width: 401px) and (max-width: 768px)').matches;
  const mobileBreakpoint = window.matchMedia('screen and (max-width: 400px)').matches;

  const ccData  = attrs.settingCarousel?.innerContent;

  let next_icon = 5;
  let prev_icon = 4;
  let arrowNav  = attrs.arrowNavigation?.advanced?.show?.desktop?.value === 'on'? 
                <div className="df_cc_arrows">
                  <div className={"swiper-button-prev cc-prev-" + id} data-icon={prev_icon}></div>
                  <div className={"swiper-button-next cc-next-" + id} data-icon={next_icon}></div>
                </div>: '';
  let dotsNav   = attrs.dotNavigation?.advanced?.show?.desktop?.value === 'on'? 
                <div className={"swiper-pagination cc-dots-"+id}></div>: '';


  const swiper_init = () => {
    if ( loading === true ) {
      setLoading(false)
        return;
    };

    let selector = wrapper.current.querySelector('.swiper-container');
    let cc_speed = ccData?.desktop?.value?.speed ?? '500';
    let cc_loop  = ccData?.desktop?.value?.loop === 'on' ? true : false;
    let centerSlides = ccData?.desktop?.value?.centerSlides === 'on' ? true : false;
    let carouselType = ccData?.desktop?.value?.carouselType ? ccData?.desktop?.value?.carouselType : 'slide';

    let slideToShowD = ccData?.desktop?.value?.maxSlide ?? 3;
    let slideToShowT = ccData?.tablet?.value?.maxSlide ?? 2;
    let slideToShowP = ccData?.phone?.value?.maxSlide ?? 1;
    let item_spacing = ccData?.desktop?.value?.spacingPx ?? '30px';
    let item_spacingT= ccData?.tablet?.value?.spacingPx ? ccData?.tablet?.value?.spacingPx : item_spacing;
    let item_spacingP= ccData?.phone?.value?.spacingPx ? ccData?.phone?.value?.spacingPx : item_spacingT;

    let config = {
        init: false,
        speed: parseInt(cc_speed),
        loop: cc_loop,
        effect: carouselType,
        centeredSlides: centerSlides,
        slideClass: 'difl_contentcarouselitem',
        // autoplay: false,
        // threshold: 15,
        // observer: true,
        // observeParents: true,
        // observeSlideChildren: true,
        // watchSlidesVisibility: true,
        // preventClicks : true,
        // preventClicksPropagation: true,
        // slideToClickedSlide: false,
        breakpoints: {
            // desktop
            981: {
                slidesPerView: parseInt(slideToShowD),
                spaceBetween : parseInt(item_spacing)
            },
            // tablet
            768: {
                slidesPerView: parseInt(slideToShowT),
                spaceBetween : parseInt(item_spacingT)
            },
            // mobile
            1: {
                slidesPerView: parseInt(slideToShowP),
                spaceBetween : parseInt(item_spacingP)
            },
        }
    }

    // effect
    if (carouselType === 'coverflow') {
      const ccAdvancedData = attrs.addSettingCarousel?.innerContent;
      const slideShadows   = ccAdvancedData?.desktop?.value?.slideShadows ?? 'off';
      const rotateInDegrees= ccAdvancedData?.desktop?.value?.rotateInDegrees ?? '30';
      const stretchDepth   = ccAdvancedData?.desktop?.value?.stretchDepth ?? '20';
      const spaceBetween   = ccAdvancedData?.desktop?.value?.spaceBetween ?? '16';
      const effectMultipler= ccAdvancedData?.desktop?.value?.effectMultipler ?? '3';

      config['coverflowEffect'] = {
        slideShadows: slideShadows === 'on' ? true : false,
        rotate: parseInt(rotateInDegrees),
        stretch: parseInt(spaceBetween),
        depth: parseInt(stretchDepth),
        modifier: parseInt(effectMultipler)
      };
    }
    

    if (('off' === ccData?.desktop?.value?.autoplay && desktopBreakpoint)
      || ('off' === ccData?.tablet?.value?.autoplay && tabletBreakpoint)
      || ('off' === ccData?.phone?.value?.autoplay && mobileBreakpoint)) {
      config['autoplay'] = false
    }

    if ('on' === ccData?.desktop?.value?.autoplay && desktopBreakpoint) {
      config['autoplay'] = {
        delay : parseInt(ccData?.desktop?.value?.autoplaySpeed),
        disableOnInteraction: false
      }
    }


    if ('on' === ccData?.tablet?.value?.autoplay && tabletBreakpoint) {
      config['autoplay'] = {
        delay: parseInt(ccData?.tablet?.value?.autoplaySpeed),
        disableOnInteraction: false
      }
    }

    if ('on' === ccData?.phone?.value?.autoplay && mobileBreakpoint) {
      config['autoplay'] = {
        delay: parseInt(ccData?.phone?.value?.autoplaySpeed),
        disableOnInteraction: false
      }
    }

    // arrow navigation
    if (attrs.arrowNavigation?.advanced?.show?.desktop?.value === 'on') {
      config['navigation'] = {
        nextEl: '.cc-next-'+id,
        prevEl: '.cc-prev-'+id
      }
    }

    // dot pagination
    if (attrs.dotNavigation?.advanced?.show?.desktop?.value === 'on') {
      config['pagination'] = {
        el: '.cc-dots-'+id,
        type: 'bullets',
        clickable: true
      }
    }

    if (swiperInstance) {
      swiperInstance.destroy(true, true);
    }

    let slider = new Swiper(selector, config);
    slider.init();
    setSwiperInstance(slider);

  };
  
  useEffect(() => {
    swiper_init();
  }, [loading, attrs]);
  
	return (
		<ModuleContainer
      attrs={attrs}
      elements={elements}
      id={id}
      moduleClassName="difl_contentcarousel"
      name={name}
      scriptDataComponent={ScriptData}
      stylesComponent={Styles}
      classnamesFunction={Classnames}
    >
      {elements.styleComponents({ attrName: 'module', })}
      
        <div className="df_cc_container arrow-middle" ref={wrapper}>
          <div className="df_cc_inner_wrapper">
            <div class="swiper-container">
              <div class="swiper-wrapper">
                <ChildModulesContainer ids={childrenIds}/>
              </div>
            </div>
              {arrowNav}
          </div>
          {dotsNav}
        </div> 
        
    </ModuleContainer>
	);
}