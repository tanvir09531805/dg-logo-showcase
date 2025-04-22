import { Notice } from '@wordpress/components';
import { useContext, useEffect, useState } from '@wordpress/element';

export const Toaster = ( props ) => {
	const statuses = [ 'success', 'warning', 'error', 'info' ];
	const [ status, setStatus ] = useState( statuses[ 0 ] );
	const [ show, setShow ] = useState( true );
	const onRemove = () => {
		setShow( false );
		props?.messageHandler( '' );
	};

	useEffect( () => {
		const id = setTimeout( () => {
			setShow( false );
			props?.messageHandler( '' );
		}, 2000 );

		return () => {
			clearTimeout( id );
		};
	}, [ show ] );
	useEffect( () => {
		setStatus( props.status );
	}, [ props.status ] );
	return (
		<>
			{ show && (
				<Notice
					onRemove={ onRemove }
					className="difl-notice"
					status={ status }
				>
					{ props?.message ?? '' }
				</Notice>
			) }
		</>
	);
};
