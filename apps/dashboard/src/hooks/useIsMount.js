import { useEffect, useRef } from '@wordpress/element';
export const useIsMount = () => {
	const isMountRef = useRef( true );
	useEffect( () => {
		isMountRef.current = false;
	}, [] );
	return isMountRef.current;
};
