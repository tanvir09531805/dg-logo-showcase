/** @format */

import React, {useState, useEffect, Fragment} from "react";

const {isFaIcon,
    escapeFontIcon,
    processFontIcon,findIconInList} = window?.divi?.iconLibrary
// Divi package dependencies.
// Renderer - HTML
const { ModuleContainer } = window?.divi?.module;

import { moduleClassnames } from "./module-classnames";
import { ModuleStyles } from "./module-styles";
import { ModuleScriptData } from "./module-script-data";
import utility from "../../../../../scripts/df_scripts/utilities";
// Internal Dependencies
import "./style.css";

export const AdvancedPersonEdit = (props) => {
    let { defaultPrintedStyleAttrs, attrs, id, name, elements } = props;

    //healper
    const getVal=(key,valueType="innerContent")=> attrs[key]? attrs[key][valueType]?.desktop?.value:null
    function render_socail_icon(key) {

        let icon = '';
        if (key) {
            icon = processFontIcon(key)
            //
            // console.log("=>(edit.jsx:28) key", key);
            // console.log("=>(edit.jsx:28) icon", findIconInList('LinkedIn'));

            return (
                <span className="et-pb-icon socail_icon">{icon}</span>
            )
        } else {
            return null
        }
    }
    function  render_image(key,photo_alt_text='', customClass = '') {
        const image = getVal(key)??''


        const imageHtml = <img className={"person_photo " + customClass} src={getVal(key)} alt={photo_alt_text} />;

        return imageHtml;
    }


    //variable declearation
    const photo_alt_text = getVal('photo_alt_text');
    const alternative_photo_alt_text = getVal('alternative_photo_alt_text');
    const TitleLevel = getVal('ap_name_tag')?? 'h4';
    const SubTitleLevel = getVal('ap_role_tag') ??'h5';
    const NameHtml = elements.render({ attrName: 'name'}) ?
        <TitleLevel className="df_person_name">{ elements.render({ attrName: 'name'})}</TitleLevel> : '';

    const RoleHtml = getVal('ap_role') ?
        <SubTitleLevel className="df_person_role">{ elements.render({ attrName: 'ap_role'})} </SubTitleLevel> : '';

    const parser = new DOMParser();
    const content = getVal("ap_description") ?
        <div className="df_person_description"  >{elements.render({attrName: 'ap_description'})}</div>:''

    const detailHtml = (NameHtml !== '' || RoleHtml !== '' || content !== '') ?
        <div className="df_person_details">
            {NameHtml}
            {RoleHtml}
            {content}
        </div> : '';

    const facebook = getVal('ap_facebook') ?
        <a href={ getVal('ap_facebook')} className="df_person_social_icon facebook " target="_blank" df-tooltip="Facebook" title="" aria-expanded="false"> {render_socail_icon({unicode:'&#xe093;',type: "divi",
            weight: 400})} </a> : '';
    const twitter = getVal('ap_twitter')?
        <a href= { getVal('ap_twitter')} className="df_person_social_icon twitter" target="_blank" df-tooltip="Twitter" title="" aria-expanded="false"> {render_socail_icon({unicode:'&#xe094;',type: "divi",
            weight: 400})} </a> : '';
    const linkedin = getVal('ap_linkedin') ?
        <a href={ getVal('ap_linkedin')} className="df_person_social_icon linkedin" target="_blank" df-tooltip="Linkedin" title="" aria-expanded="false"> {render_socail_icon({unicode:'&#xe09d;',type: "divi",
            weight: 400})}  </a> : '';
    const instagram = getVal('ap_instagram') ?
        <a href={ getVal('ap_instagram')} className="df_person_social_icon instagram" target="_blank" df-tooltip="Instagram" title="" aria-expanded="false">{render_socail_icon({unicode:"&#xe09a;",type: "divi",
            weight: 400})} </a> : '';
    const pinterest = getVal('ap_pinterest') ?
        <a href={ getVal('ap_pinterest')} className="df_person_social_icon pinterest" target="_blank" df-tooltip="Pinterest" title="" aria-expanded="false"> {render_socail_icon({unicode:"&#xe095;",type: "divi",
            weight: 400})} </a> : '';
    const email =getVal('ap_email') ?
        <a href={ getVal('ap_email')} className="df_person_social_icon email" target="_blank" df-tooltip="Email" title="" aria-expanded="false"> {render_socail_icon({unicode:'&#xe076;',type: "divi",
            weight: 400})}  </a> : '';
    const phone = getVal('ap_phone') ?
        <a href={ getVal('ap_phone')} className="df_person_social_icon phone" target="_blank" df-tooltip="Phone" title="" aria-expanded="false">{render_socail_icon({unicode:"&#xe090;",type: "divi",
            weight: 400})} </a> : '';


    const border_anim_class = (getVal('border_anim') === 'on' && getVal('style_type') === 'default_style') ? getVal('border_anm_style') : '';
    const make_vertical_icon_class = ('on' === getVal('make_vertical_icon') && getVal('style_type') === 'default_style') ? 'vertical' : '';

    const socailHtml = ('' !== facebook || '' !== twitter || '' !== linkedin || '' !== instagram || '' !== pinterest || '' !== email || '' !== phone) ?
        <div className={"df_person_socail_wrapper " + make_vertical_icon_class}>
            {facebook}
            {twitter}
            {linkedin}
            {instagram}
            {pinterest}
            {email}
            {phone}
        </div> : '';

    const icon_reveal_class = getVal('always_show_icon') === 'on' ? 'always-show-title' : getVal('icon_reveal_caption');

    const overlay_social = getVal('enable_icon_on_overlay') === 'on' ?
        <div className={icon_reveal_class}>{socailHtml}</div> : '';

    const content_position_class = getVal('content_position') !== '' ?getVal('content_position') : '';

    const overlay_content = (getVal('style_type') === 'default_style' && getVal('enable_icon_on_overlay') === 'on') ?
        <figcaption className={"df_ap_person_content " + content_position_class}>
            {overlay_social ? overlay_social : ''}
        </figcaption> :
        <figcaption className="df_ap_person_content"></figcaption>;
    const c4_izmir_class = (getVal('overlay') === 'on' || getVal('border_anim') === 'on' || getVal('enable_alternative_photo') === 'on' || getVal('enable_icon_on_overlay') === 'on') ? 'c4-izmir' : 'c4-izmir';
    // Photo Element
    const alterImage = (getVal('enable_alternative_photo') === 'on' && getVal('ap_alternative_photo') !== ''  && getVal('style_type') === 'default_style') ?
        <div className="alter_image">
            {render_image( 'ap_photo',photo_alt_text)}
            {render_image( 'ap_alternative_photo', alternative_photo_alt_text,'img-top')}
        </div>
        :
        render_image( 'ap_photo',photo_alt_text);
    const imageHtml = getVal('ap_photo') ?
        <div className={"df_person_photo_wrapper "}>
            <div className={c4_izmir_class + " " + border_anim_class}>
                {(getVal('overlay') === 'on' && getVal('enable_alternative_photo') !== 'on') ? <span className="df-overlay"></span> : ''}
                <div className="df_person_photo">
                    {alterImage}
                </div>
                {overlay_content}
            </div>
        </div> : '';

    let HtmlCode = "";
    if ((getVal('style_type')??'default_style') === 'default_style') {
        HtmlCode = <div className="df_ap_person_container">
            <div className={"df_ap_person_wrapper " + getVal('image_scale_type')}>
                {imageHtml}
                <div className="df_ap_person_desc_wrapper">
                    <div className="df_person_details">
                        {getVal('enable_name_on_overlay') !== 'on' ? NameHtml : ''}
                        {getVal('enable_role_on_overlay') !== 'on' ? RoleHtml : ''}
                        {content}
                    </div>
                    {getVal('enable_icon_on_overlay') !== 'on' || getVal('enable_icon_on_overlay') !== 'on' ? socailHtml : ''}
                </div>
            </div>
        </div>;
    } else if ((getVal('style_type')??'default_style') === 'ekip_style') {
        const overlay_class = 'df_person_overlay';
        HtmlCode = <div className="df_ap_person_container df_ap_ekip_style">
            <div className="df_ap_person_wrapper">

                {imageHtml}
                <div className={"df_ap_person_desc " + overlay_class}>
                    <div className="df_ap_person_desc_wrapper">
                        {detailHtml}
                        {socailHtml}
                    </div>
                </div>

            </div>
        </div>;
    }

    else if ((getVal('style_type')??'default_style') === 'ekip_style_2') {
        HtmlCode = <div className="df_ap_person_container df_ap_ekip_style_2">
            <div className={"df_ap_person_wrapper " + getVal('image_scale_type')}>
                {imageHtml}
                <div className="df_ap_person_desc">
                    <div className="df_ap_person_desc_wrapper">
                        {detailHtml}
                        {socailHtml}
                    </div>
                </div>

            </div>
        </div>;
    }
    return (
        <ModuleContainer
            attrs={attrs}
            elements={elements}
            id={id}
            name={name}
            scriptDataComponent={ModuleScriptData}
            stylesComponent={ModuleStyles}
            defaultPrintedStyleAttrs={defaultPrintedStyleAttrs}
            classnamesFunction={moduleClassnames}
        >
            {elements.styleComponents({
                attrName: "module",
            })}
            <Fragment>
                {HtmlCode}
            </Fragment >

        </ModuleContainer>
    );
};
