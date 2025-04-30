import React,{Fragment} from 'react';

export const ModuleScriptData = ({
  elements,
}) => (
  <Fragment>
    {elements.scriptData({
      attrName: 'module',
    })}
  </Fragment>
);