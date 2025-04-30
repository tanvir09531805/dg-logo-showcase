import React from 'react';
import './styles.scss';

export const Empty = ( props ) => {
	const { message } = props;

	return (
		<div className="difl__empty">
			<div className="difl__empty__message">
				<span className="difl__empty__message__text">{message}</span>
			</div>
		</div>
	);
}