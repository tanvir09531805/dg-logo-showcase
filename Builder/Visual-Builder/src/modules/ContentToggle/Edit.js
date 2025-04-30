import { ModuleContainer } from "@divi/module";

const { useEffect, useState } = window?.vendor?.React;

const { useFetch } = window?.divi?.rest;
const { getAttrByMode } = window?.divi?.moduleUtils;

export const Edit = ( { attrs, id, name, elements } ) => {
	const [ responses, setResponses ] = useState( {
		libPrimary: null,
		libSecondary: null,
	} );
	const lib_primary = getAttrByMode( attrs?.library_id_primary?.innerContent );
	const lib_secondary = getAttrByMode( attrs?.library_id_secondary?.innerContent );
	const {
		fetch,
		response,
		isLoading,
	} = useFetch( '' );


	useEffect( () => {
		const ids = [ lib_primary, lib_secondary ];

		ids.forEach( ( id ) => {
			fetch( {
				method: 'GET',
				restRoute: '/difl/v5/get-lib-item',
				data: {
					id: id,
				},
			} )
				.then( ( res ) => {
					if ( id === lib_primary ) {
						setResponses( ( prevState ) => ({
							...prevState,
							libPrimary: res,
						}) );
					} else {
						setResponses( ( prevState ) => ({
							...prevState,
							libSecondary: res,
						}) );
					}
				} )
				.catch( ( error ) => {
					console.log( error );
				} );
		} );
	}, [ lib_primary, lib_secondary ] );

	useEffect( () => {
		if ( response ) {
			console.log( "response", response )
		}
	} )

	return (
		<ModuleContainer
			attrs={ attrs }
			elements={ elements }
			id={ id }
			moduleClassName="df-cs-content-section"
			name={ name }
		>
			{ isLoading && <div>Loading...</div> }
			{ ! isLoading && (
				<div
					className="dtmc_dynamic_module_content"
					dangerouslySetInnerHTML={ { __html: responses?.libPrimary?.data ?? '' } }
				/>
			) }
			{ isLoading && <div>Loading...</div> }
			{ ! isLoading && (
				<div
					className="dtmc_dynamic_module_content"
					dangerouslySetInnerHTML={ { __html: responses?.libSecondary?.data ?? '' } }
				/>
			) }
			<h1>Content Toggle</h1>
		</ModuleContainer>
	)
}