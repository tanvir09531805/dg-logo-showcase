/** @format */

import React, { useState, useEffect } from "react";

// Renderer - HTML
// Divi dependencies.
import {
  ModuleContainer,
  ChildModulesContainer,
} from '@divi/module'

import { moduleClassnames } from "./classnames";
import { ModuleStyles } from "./styles";
import { ModuleScriptData } from "./script";


export const BusinessHoursEdit = ({ attrs, id, name, elements, childrenIds }) => {
    //variable declearation

    const title_on_off = attrs.title_on_off?.innerContent?.desktop?.value;
    const title_show = attrs.heading_title_text?.innerContent?.desktop?.value; // heading_title_text.innerContent

    // console.log('title_on_off', title_on_off);
    // console.log('title_show', title_show);
    
    // let dotsNav   = attrs.dotNavigation?.advanced?.show?.desktop?.value === 'on'? 
    // <div className={"swiper-pagination cc-dots-"+id}></div>: '';


    const TitleTag = 'h2';
    // const heading_title_text = ('on' !== title_on_off && title_show) ?
    //     <div className="df_bh_header"> <TitleTag className="df_bh_title"> {utility._renderDynamicContent(props , 'heading_title_text')}  </TitleTag></div> : '';

    const heading_title_text = ('on' === title_on_off && title_show) ? <div className="df_bh_header"><h2 className="df_bh_title"> { title_show }</h2></div> : '';

  return (
    <ModuleContainer
      attrs={attrs}
      elements={elements}
      id={id}
      name={name}
      scriptDataComponent={ModuleScriptData}
      stylesComponent={ModuleStyles}
      classnamesFunction={moduleClassnames}
    >
      {elements.styleComponents({
        attrName: "module",
      })}

      <div className="df_bh_container">
        <div className="df_bh_wrapper">
          {heading_title_text}
          <ChildModulesContainer ids={childrenIds} />
        </div>
      </div>

    </ModuleContainer>
  );
};
