import React, { useState, useEffect } from 'react';
import './styles.scss';
import { DragHandler } from './action-handler'

export const GridLayoutManager = ( props ) => {
	const { row, column, child } = props;

	const row_map = row ? parseInt( row, 10 ) : 8;
	const column_map = column ? parseInt( column, 10 ) : 8;
	const child_map = child ? parseInt( child, 10 ) : 0;

	const [ isPopupVisible, setPopupVisible ] = useState( false );

	const togglePopup = () => setPopupVisible( !isPopupVisible );


	let isDragging = false; // Track whether the user is dragging

	const contentSizeController = ( event, action_type ) => {
		console.log( `Dragging with action: ${action_type}` );
	};

	const mouseEnterHandler = ( event ) => {
		if ( !event ) return;

		// const html = `
		// <div class="diviflash_grid_layout_manager__actions">
		//     <span class="diviflash_grid_layout_manager__actions__left" data-action="left"></span>
		//     <span class="diviflash_grid_layout_manager__actions__right" data-action="right"></span>
		//     <span class="diviflash_grid_layout_manager__actions__top" data-action="top"></span>
		//     <span class="diviflash_grid_layout_manager__actions__bottom" data-action="bottom"></span>
		//     <span class="diviflash_grid_layout_manager__actions__top_left" data-action="top_left"></span>
		//     <span class="diviflash_grid_layout_manager__actions__top_right" data-action="top_right"></span>
		//     <span class="diviflash_grid_layout_manager__actions__bottom_left" data-action="bottom_left"></span>
		//     <span class="diviflash_grid_layout_manager__actions__bottom_right" data-action="bottom_right"></span>
		// </div>
		// `;

		// const target = jQuery(event.target);
		// target.append(html);

		jQuery( event.target ).find( '.diviflash_grid_layout_manager__actions' ).css( 'display', 'block' );
	};

	const mouseLeaveHandler = ( event ) => {
		if ( !event ) return;
		jQuery( event.target ).find( '.diviflash_grid_layout_manager__actions' ).css( 'display', 'none' );
	};

	const clickHandler = ( row, column, event ) => {

	};

	const showPopup = ( event ) => {
		jQuery( event.target ).siblings().css( 'display', 'flex' );
	};
	const closePopup = ( event ) => {
		jQuery( event.target ).parent().parent().css( 'display', 'none' );
	};

	// const gridElements = [];
	// if(child_map > 0) {
	// 	for (let i = 1; i <= child_map; i++) {
	// 		gridElements.push(
	// 			<span
	// 				className={`diviflash_grid_layout_manager__popup__wrapper__container__content`}
	// 				onMouseEnter={(e) => mouseEnterHandler(e)}
	// 				onMouseLeave={(e) => mouseLeaveHandler(e)}
	// 			><DragHandler/></span>
	// 		);
	// 	}
	// }
	//
	// const gridHelperElements = [];
	// for (let i = 1; i <= row_map; i++) {
	// 	for (let j = 1; j <= column_map; j++) {
	// 		gridHelperElements.push(
	// 			<span
	// 				className={`diviflash_grid_layout_manager__popup__wrapper__helper_container__content`}
	// 			></span>
	// 		);
	// 	}
	// }

	const handleAction = (event, actionType) => {
		console.log(`Action: ${actionType}, X: ${event.clientX}, Y: ${event.clientY}`);
		// Implement resizing or movement logic here
	};

	const gridElements = Array.from( { length: child } ).map( ( _, i ) => (
		<span
			key={`child-${i}`}
			className="diviflash_grid_layout_manager__popup__wrapper__container__content"
		>
            <DragHandler onAction={handleAction} />
        </span>
	) );

	const gridHelperElements = Array.from( { length: row * column } ).map( ( _, i ) => (
		<span
			key={`helper-${i}`}
			className="diviflash_grid_layout_manager__popup__wrapper__helper_container__content"
		></span>
	) );
	const myComponentStyle = {
		gridTemplateColumns: `repeat(${column_map}, 1fr)`,
		gridTemplateRows: `repeat(${row_map}, 1fr)`,
	};

	return (
		<div className="diviflash_grid_layout_manager">
			<button onClick={togglePopup}>Preview</button>
			{isPopupVisible && (
				<div className="diviflash_grid_layout_manager__popup">
					<div className="diviflash_grid_layout_manager__popup__wrapper">
						<div className="diviflash_grid_layout_manager__popup__wrapper__close"
						     onClick={togglePopup}>
						</div>
						<div className="diviflash_grid_layout_manager__popup__wrapper__container"
						     style={myComponentStyle}>
							{gridElements}
						</div>
						<div className="diviflash_grid_layout_manager__popup__wrapper__helper_container"
						     style={myComponentStyle}>
							{gridHelperElements}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};