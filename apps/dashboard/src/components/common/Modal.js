import { Modal } from '@wordpress/components';

export const DIFL_Modal = ( { setShowModal, children, ...props } ) => {
	const closeModal = () => setShowModal( false );

	return (
		<>
			<Modal onRequestClose={ closeModal } { ...props }>
				{ children }
			</Modal>
		</>
	);
};
