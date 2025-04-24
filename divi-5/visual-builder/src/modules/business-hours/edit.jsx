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
  const title_show   = attrs.heading_title_text?.innerContent?.desktop?.value; // heading_title_text.innerContent
  const TitleTag     = attrs.heading_title_text?.decoration?.font?.font?.desktop?.value?.headingLevel ?? 'h2';

  const heading_title_text = ('on' === title_on_off && title_show) ? <div className="df_bh_header"><TitleTag className="df_bh_title"> { title_show }</TitleTag></div> : '';

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
