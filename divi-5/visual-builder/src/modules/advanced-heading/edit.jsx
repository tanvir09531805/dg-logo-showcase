import React, { useState, useEffect } from "react";

// Divi package.
import {
  ModuleContainer,
} from '@divi/module';

import { moduleClassnames } from "./classnames";
import { ModuleStyles } from "./styles";
import { ModuleScriptData } from "./script";
import { processFontIcon } from '@divi/icon-library';


const get_string_value = (content) => {
  if (content !== undefined) {
    if (typeof content === 'string') return content.replace(/(<([^>]+)>)/ig, '');
    if (typeof content === 'object' && content.hasValue) return content.value.replace(/(<([^>]+)>)/ig, '');
  }
  return '';
};

// Renderer - HTML
export const AdvancedHeadingEdit = ({ attrs, id, name, elements }) => {

  
  //variable declearation
  // const TitleTag     = attrs.title?.decoration?.font?.font?.desktop?.value?.headingLevel ?? 'h3';
  // const title_infix_df = attrs.title_infix?.innerContent?.desktop?.value ?? '';
  // const title_infix = title_infix_df?<span className="infix">{title_infix_df}</span> : '';
  
  const HeadingTag = attrs.title?.decoration?.font?.font?.desktop?.value?.headingLevel ?? "h3";
  const title_prefix_df = attrs.title_prefix?.innerContent?.desktop?.value ?? "";
  const title_infix_df = attrs.title_infix?.innerContent?.desktop?.value ?? "";
  const title_suffix_df = attrs.title_suffix?.innerContent?.desktop?.value ?? "";
  const custom_text_df = attrs.custom_text_input?.innerContent?.desktop?.value ?? "";

  const RenderedHeadingPrefix = title_prefix_df ? <span className="prefix">{title_prefix_df}</span> : null;
  const RenderedHeadingInfix = title_infix_df ? <span className="infix">{title_infix_df}</span> : null;
  const RenderedHeadingSuffix = title_suffix_df ? <span className="suffix">{title_suffix_df}</span> : null;

  const heading_text = (
    <HeadingTag className="df-heading">
      {RenderedHeadingPrefix} {RenderedHeadingInfix} {RenderedHeadingSuffix}
    </HeadingTag>
  );

  const useDualTextCustom = attrs.use_dual_text_custom?.innerContent?.desktop?.value ?? '';
  const useDualText = attrs.use_dual_text?.innerContent?.desktop?.value ?? '';
  const hasDualText = (useDualText === 'on') ? 'has-dual-text' : '';

  // console.log('icon decorate', attrs.divider_icon);
  // Define render_heading_dual_text as a function 
  const render_heading_dual_text = () => {
    const HeadingTitles = [];

    if (useDualText === 'on') {
      if (useDualTextCustom !== 'on') {
        HeadingTitles.push(
          get_string_value(title_prefix_df),
          get_string_value(title_infix_df),
          get_string_value(title_suffix_df)
        );
      } else {
        HeadingTitles.push(get_string_value(custom_text_df));
      }

      return (
        <div className="df-heading-dual_text" data-title={HeadingTitles.join(' ')}></div>
      );
    }

    return null;
  };

  const heading_dual_text = render_heading_dual_text();


  const imageValue = attrs.divider_image?.innerContent?.desktop?.value;
  const imageAlt = attrs.divider_image_alt_text?.innerContent?.desktop?.value;
  const imgAltText = imageAlt ? imageAlt : imageValue?.titleText;


  const iconValue = attrs.divider_icon?.decoration?.icon?.desktop?.value;
  const useDividerImg = attrs.use_divider_image?.innerContent?.desktop?.value ?? '';
  const useDivider = attrs.use_divider?.innerContent?.desktop?.value ?? '';
  const useDividerIcon = attrs.use_divider_icon?.innerContent?.desktop?.value ?? '';

  const render_heading_divider = () => {

    let divider_icon = '';

    if (useDivider === 'on') {
      if (useDividerIcon === 'on') {
        let processed_icon = processFontIcon(iconValue) ? processFontIcon(iconValue) : '1';
        divider_icon = <span className="et-pb-icon">{processed_icon}</span>;
      }

      if (useDividerImg === 'on' && imageValue?.src) {
        divider_icon = <img src={imageValue.src} className="divider-image" alt={imgAltText} />;
      }

      return (
        <div className={'df-heading-divider'}>
          <div className={'df-divider-line'}></div>
          {divider_icon}
        </div>
      );
    }

    return null;
  };

    const heading_divider = render_heading_divider();
    const dividerPosition = attrs.divider_position?.innerContent?.desktop?.value ?? '';

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
      <div className={"df-heading-container" + " " + hasDualText}>
        {heading_dual_text}
        {useDivider === 'on' ? (
          dividerPosition !== 'top' ? (
            <>{heading_text} {heading_divider}</>
          ) : (
            <>{heading_divider} {heading_text}</>
          )
        ) : heading_text}
      </div>
    </ModuleContainer>
  );
};
