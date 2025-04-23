/** @format */

import React, { useState, useEffect } from "react";

// Renderer - HTML
// Divi dependencies.
import {
  ModuleContainer,
} from '@divi/module'

import { moduleClassnames } from "./classnames";
import { ModuleStyles } from "./styles";
import { ModuleScriptData } from "./script";


export const BusinessHoursItemEdit = ({ attrs, id, name, elements }) => {
  //variable declearation
  
  const dayTimeSepOn = attrs.on_separator_day_time?.innerContent?.desktop?.value ?? '';
  const timeStructure = attrs.time_structure_type?.innerContent?.desktop?.value ?? '';
  const off_day_enable = attrs.off_day_enable?.innerContent?.desktop?.value ?? '';
  const dayNameDf = attrs.day_name?.innerContent?.desktop?.value ?? '';
  const timeTextDf = attrs.time?.innerContent?.desktop?.value ?? '';
  const startTimeDf = attrs.start_time?.innerContent?.desktop?.value ?? '';
  const endTimeDf = attrs.end_time?.innerContent?.desktop?.value ?? '';
  const timeSepDf = attrs.time_separetor?.innerContent?.desktop?.value ?? '';
  const offDayText = attrs.off_day_text?.innerContent?.desktop?.value ?? '';

  const dayName = dayNameDf?<div className="df_bh_day">{dayNameDf}</div> : '';
  const timeText = timeTextDf?<span className="df_bh_time_text">{timeTextDf}</span> : '';
  const startTime = startTimeDf?<span className="df_bh_start_time">{startTimeDf}</span> : '';
  const endTime = endTimeDf?<span className="df_bh_end_time">{endTimeDf}</span> : '';
  const separatorTime = timeSepDf?<span className="df_bh_time_separetor">{timeSepDf}</span> : '';
  const offDay = ('on'===off_day_enable && offDayText)?<span className="df_bh_off_day">{offDayText}</span> : '';

  const timeHtml = ('advanced' === timeStructure) ?
    <div className="df_bh_time">
      {startTime}
      {separatorTime}{endTime}
    </div>
    :
    <div className="df_bh_time">
      {timeText}
    </div>

  const timeContainnerHtml = ('on' !== off_day_enable) ?
    timeHtml
    :
    <div className="df_bh_time">
      {offDay}
    </div>

    const day_tiem_separator_on = (dayTimeSepOn === 'on') ? 'day_tiem_separator_on' : '';
    const offDayClass = (off_day_enable === 'on' && offDayText !== '') ? 'off_day_true' : '';
    const dayTimeSeparatorHtml  = ('on' === dayTimeSepOn) ? <div className={"df_bh_day_time_separator "}><hr /></div> : '';

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
      <div className={day_tiem_separator_on + " df_bh_item" + offDayClass}>
        {dayName}
        {dayTimeSeparatorHtml}
        {timeContainnerHtml}
      </div>
    </ModuleContainer>
  );
};
