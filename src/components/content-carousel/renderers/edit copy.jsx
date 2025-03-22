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
  
  const [loading, setLoading] = useState();
  const wrapper = useRef(null);
  let ccData = attrs.settingCarousel?.innerContent;
  // let parentData = attrs.settingCarousel?.innerContent?.carouselType?.desktop?.value || [];
  let maxSlideToShowD = ccData?.maxSlide?.desktop?.value?.maxSlide ?? 3;
  let maxSlideToShowT = ccData?.maxSlide?.tablet?.value?.maxSlide ?? 2;
  let maxSlideToShowP = ccData?.maxSlide?.phone?.value?.maxSlide ?? 1;

  let next_icon = 4;
  let prev_icon = 5;
  let arrowNav  = attrs.arrowNavigation?.advanced?.show?.desktop?.value === 'on'? 
                <div className="df_cc_arrows">
                  <div className={"swiper-button-next cc-next-" + id} data-icon={next_icon}></div>
                  <div className={"swiper-button-prev cc-prev-" + id} data-icon={prev_icon}></div>
                </div>: '';
  let dotsNav   = attrs.dotNavigation?.advanced?.show?.desktop?.value === 'on'? 
                <div className={"swiper-pagination cc-dots-"+id}></div>: '';

  console.log("Setting Carousel ", attrs);


  const swiper_init = () => {
    if ( loading === true ) {
      setLoading(false)
        return;
    };

    // const _this = this;
     // this.ccData;
    const selector = wrapper.current.querySelector('.swiper-container');
    if (!selector) {
      console.error('Swiper container not found');
      return;
    }

    // const order_number = Number(ccData.moduleInfo.address.replace(/\D/g,''));

    let cc_speed = ccData?.speed?.desktop?.value?.speed ?? '500';
    let cc_loop  = ccData?.loop?.desktop?.value?.loop === 'on' ? true : false;
    let centerSlides = ccData?.centerSlides?.desktop?.value?.centerSlides === 'on' ? true : false;
    let carouselType = ccData?.carouselType?.desktop?.value?.carouselType ? ccData?.carouselType?.desktop?.value?.carouselType : 'slide';
    let item_spacing = ccData?.spacingPx?.desktop?.value?.spacingPx ?? '30px';
    let item_spacing_tablet = ccData?.spacingPx?.tablet?.value?.spacingPx ? ccData?.spacingPx?.tablet?.value?.spacingPx : item_spacing;
    let item_spacing_phone = ccData?.spacingPx?.phone?.value?.spacingPx ? ccData?.spacingPx?.phone?.value?.spacingPx : item_spacing_tablet;

    let config = {
        init: false,
        speed: parseInt(cc_speed),
        loop: cc_loop,
        effect: carouselType,
        centeredSlides: centerSlides,
        breakpoints: {
            // desktop
            981: {
                slidesPerView: parseInt(maxSlideToShowD),
                spaceBetween : parseInt(item_spacing)
            },
            // tablet
            768: {
                slidesPerView: parseInt(maxSlideToShowT),
                spaceBetween : parseInt(item_spacing_tablet)
            },
            // mobile
            1: {
                slidesPerView: parseInt(maxSlideToShowP),
                spaceBetween : parseInt(item_spacing_phone)
            },
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
            el: '.cc-dots-'+id
        }
    }

    /*
    // effect
    if (props.carousel_type === 'coverflow') {
        config['coverflowEffect'] = {
            slideShadows: props.coverflow_shadow === 'on' ? true : false,
            rotate: parseInt(props.coverflow_rotate),
            stretch: parseInt(props.coverflow_stretch),
            depth: parseInt(props.coverflow_depth),
            modifier: parseInt(props.coverflow_modifier)
        };
    }
    */

    let slider = new Swiper (selector, config);
    slider.init();

    /*
    for (const index in _this.state.props) {
        if (_this.state.props[index] !== _this.props[index]) {
            if(_this.computedType.includes(index)){
                slider.destroy();
                _this.setState({props: _this.props, loading: true})
            }
        }
    }*/

  };
  
  useEffect(() => {
    swiper_init();
  }, [loading]);

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
              {/* <span>Slide To Show Desktop: {String(maxSlideToShowD)}</span><br />
              <span>Slide To Show Tablet: {String(maxSlideToShowT)}</span><br /> 
              <span>Slide To Show Phone: {String(maxSlideToShowP)}</span><br /> */}
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