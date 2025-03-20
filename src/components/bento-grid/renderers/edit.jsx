// External Dependencies.
import React, { Fragment, ReactElement, useEffect, useRef } from 'react';

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

export const Edit = ( props ) => {
	const {
		attrs,
		id,
		name,
		elements,
		childrenIds
	} = props;
	console.log( props );

	// const {
	// 	fetch,
	// 	response,
	// 	isLoading,
	// } = useFetch( [] );
	//
	// const image_ids = attrs?.images?.innerContent?.desktop?.value?.src;
	// console.log( attrs )
	//
	// const fetchAbortRef = useRef();
	//
	// /**
	//  * Fetches new Portfolio Posts on parameter changes.
	//  */
	// useEffect( () => {
	// 	if ( fetchAbortRef.current ) {
	// 		fetchAbortRef.current.abort();
	// 	}
	//
	// 	fetchAbortRef.current = new AbortController();
	//
	// 	fetch( {
	// 		restRoute: `/diviflash/v2/bento-grid-gallery/builder/get-image-data?image_ids=${ image_ids }`,
	// 		method: 'GET',
	// 		signal: fetchAbortRef.current.signal,
	// 	} ).catch( ( error ) => {
	// 		console.error( error );
	// 	} );
	// 	console.log( response )
	// 	return () => {
	// 		if ( fetchAbortRef.current ) {
	// 			fetchAbortRef.current.abort();
	// 		}
	// 	};
	// }, [ image_ids ] );

	// console.log ( window?.divi?.module )

	return (
		<ModuleContainer
			attrs={attrs}
			elements={elements}
			id={id}
			name={name}
			stylesComponent={Styles}
			classnamesFunction={Classnames}
			scriptDataComponent={ScriptData}
			tag="div"
		>
			{elements.styleComponents ( {
				attrName: 'module',
			} )}

			{/* <ElementComponents
				attrs={attrs?.module?.decoration ?? {}}
				id={id}
			/> */}
			<div className="difl_bento_grid__inner">
				<ChildModulesContainer ids={childrenIds}/>
			</div>

			{/*{*/}
			{/*	!isLoading && (*/}
			{/*		<>*/}
			{/*			<ElementComponents*/}
			{/*				attrs={ attrs?.module?.decoration ?? {} }*/}
			{/*				id={ id }*/}
			{/*			/>*/}
			{/*			<div className="difl_bento_grid__inner">*/}
			{/*				{ elements.render( {*/}
			{/*					attrName: 'images',*/}
			{/*				} ) }*/}
			{/*				{*/}
			{/*					map( response?.data, ( image ) => (*/}
			{/*							<div className="difl_bento_grid__inner__image"*/}
			{/*							     style={ { backgroundImage: `url(${ image.guid })` } }>*/}
			{/*								<img className="__image" key={ image?.id } src={ image.guid } alt={ name }/>*/}
			{/*								<h4 className="__title">This is Title</h4>*/}
			{/*								<h6 className="__sub_title">This is Sub Title</h6>*/}
			{/*								<p className="__content">Lorem ipsum dolor sit amet consectetur adipiscing elit*/}
			{/*									dignissim aliquet nulla laoreet, nascetur dictumst placerat fames eu cursus*/}
			{/*									velit mauris posuere tincidunt vehicula tristique, pellentesque curabitur vel*/}
			{/*									porttitor leo aptent ad gravida proin nec. Mus integer neque hac ullamcorper*/}
			{/*									nisl metus odio sed, volutpat convallis donec torquent habitant venenatis*/}
			{/*									morbi.</p>*/}
			{/*							</div>*/}
			{/*						)*/}
			{/*					)*/}
			{/*				}*/}
			{/*			</div>*/}
			{/*		</>*/}
			{/*	)*/}
			{/*}*/}
			{/*{*/}
			{/*	!isLoading && response.length < 1 && (*/}
			{/*		<div>{ __( 'No post found.', 'divi_flash' ) }</div>*/}
			{/*	)*/}
			{/*}*/}
			{/*{*/}
			{/*	isLoading && (*/}
			{/*		<div>{ __( 'Loading...', 'divi_flash' ) }</div>*/}
			{/*	)*/}
			{/*}*/}
		</ModuleContainer>
	);
}