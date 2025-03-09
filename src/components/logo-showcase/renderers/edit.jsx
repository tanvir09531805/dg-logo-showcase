// External Dependencies.
import React, { Fragment, ReactElement, useState, useEffect, useRef } from 'react';

// Divi Dependencies.
const {
	ModuleContainer,
	ElementComponents,
	DynamicData,
	ModuleClassnamesParams,
	textOptionsClassnames,
	ModuleScriptDataProps,
	StylesProps,
	StyleContainer,
	CommonStyle,
	elementClassnames,
	ChildModulesContainer
} = window?.divi?.module;
const { useFetch } = window?.divi?.rest;
const {
	getAttrByMode,
} = window?.divi?.moduleUtils;
import { map } from 'lodash';

const { __ } = window?.vendor?.wp?.i18n;

import { ScriptData } from "./script";
import { Classnames } from "./classnames";
import { Styles } from "./styles";

// get image url by image ids
const fetchImageUrls = async (imageIds) => {
  const idsArray = Array.isArray(imageIds) ? imageIds : imageIds.split(",");
  try {
    const imageUrls = await Promise.all(
      idsArray.map(async (id) => {
        let imgId = parseInt(id);
        const response = await fetch(`/wp-json/wp/v2/media/${imgId}`, {
          headers: {
            'X-WP-Nonce': DiviFlash.nonce
          }
        });
        if (!response.ok) throw new Error(`Error fetching image with ID: ${id}`);
        const imageData = await response.json();
        return imageData.source_url;
      })
    );
    return imageUrls;
  } catch (error) {
    console.error("Error fetching image URLs:", error);
    return [];
  }
};


export const Edit = ( props ) => {
	const {
		attrs,
		id,
		name,
		elements,
		childrenIds
	} = props;
  
  const [imageUrls, setImageUrls] = useState([]);
   
  const imageIds = attrs?.images?.innerContent?.desktop?.value || [];
  let idsArray = imageIds.length?imageIds.split(","):[];
  
  // console.log('imageIds === ', idsArray); // imageIds = [101,102,92,92]

  // let oneImg = fetchImageUrls([101]);
  // console.log('oneImg === ', oneImg);
  
  useEffect(() => {
    const loadImageUrls = async () => {
      if (imageIds.length) {
        const urls = await fetchImageUrls(imageIds);
        setImageUrls(urls);
      }
    };
    loadImageUrls();
  }, [imageIds]);

  console.log('img urls === ', imageUrls);

  // let nam = parseInt("10");
  // let ber = Number('564');
  // console.log( typeof nam);
  // console.log(typeof ber);
     
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
            {elements.render({ attrName: 'title', })}
            {elements.render({ attrName: 'content', })}

            <div className="dg-logos logo_5">
              {/* {idsArray?.map((id, index) => (
                <div key={index} className="d5_ls_module_image" width={100}>
                  <span>Logo ID: {id} | Logo Index: {index + 1}</span>
                </div>
              ))}  */}

              {imageUrls.length > 0 ? (
                imageUrls.map((url, index) => (
                  <span key={index} className="dgl-showcase dgl-orientation ">
                    <img src={url} alt={`Logo ${index + 1}`} className="dgls-image" />
                    <span className="logo_info bottom-center">Logo Index: {index + 1}</span>
                  </span>
                ))
              ) : (
                <span>No images available.</span>
              )}

            </div> 

          </div>
          
        </ModuleContainer>
	);
}