import React, { useState, useEffect, useCallback } from "react";

export const DragHandler = ({ onAction }) => {
	const [isDragging, setIsDragging] = useState(false);
	const [actionType, setActionType] = useState(null);

	// Called during the drag
	const handleMouseMove = useCallback(
		(event) => {
			if (isDragging && actionType) {
				console.log("mousemove");
				if (onAction) onAction(event, actionType); // Notify parent of the action
			}
		},
		[isDragging, actionType, onAction]
	);

	// Called when the drag ends
	const handleMouseUp = useCallback(() => {
		setIsDragging(false);
		setActionType(null);

		// Remove event listeners
		document.removeEventListener("mousemove", handleMouseMove);
		document.removeEventListener("mouseup", handleMouseUp);
	}, [handleMouseMove]);

	// Called when the drag starts
	const handleMouseDown = (event, action) => {
		event.preventDefault();
		setIsDragging(true);
		setActionType(action);
		console.log(action);

		// Add listeners for move and up events
		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleMouseUp);
	};

	// Cleanup listeners if component unmounts during a drag
	useEffect(() => {
		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};
	}, [handleMouseMove, handleMouseUp]);

	return (
		<div className="diviflash_grid_layout_manager__actions">
			<span
				className={`diviflash_grid_layout_manager__actions__left ${
					isDragging && actionType === "left" ? "active" : ""
				}`}
				onMouseDown={(e) => handleMouseDown(e, "left")}
			></span>
			<span
				className={`diviflash_grid_layout_manager__actions__right ${
					isDragging && actionType === "right" ? "active" : ""
				}`}
				onMouseDown={(e) => handleMouseDown(e, "right")}
			></span>
			<span
				className={`diviflash_grid_layout_manager__actions__top ${
					isDragging && actionType === "top" ? "active" : ""
				}`}
				onMouseDown={(e) => handleMouseDown(e, "top")}
			></span>
			<span
				className={`diviflash_grid_layout_manager__actions__bottom ${
					isDragging && actionType === "bottom" ? "active" : ""
				}`}
				onMouseDown={(e) => handleMouseDown(e, "bottom")}
			></span>
			<span
				className={`diviflash_grid_layout_manager__actions__top_left ${
					isDragging && actionType === "top_left" ? "active" : ""
				}`}
				onMouseDown={(e) => handleMouseDown(e, "top_left")}
			></span>
			<span
				className={`diviflash_grid_layout_manager__actions__top_right ${
					isDragging && actionType === "top_right" ? "active" : ""
				}`}
				onMouseDown={(e) => handleMouseDown(e, "top_right")}
			></span>
			<span
				className={`diviflash_grid_layout_manager__actions__bottom_left ${
					isDragging && actionType === "bottom_left" ? "active" : ""
				}`}
				onMouseDown={(e) => handleMouseDown(e, "bottom_left")}
			></span>
			<span
				className={`diviflash_grid_layout_manager__actions__bottom_right ${
					isDragging && actionType === "bottom_right" ? "active" : ""
				}`}
				onMouseDown={(e) => handleMouseDown(e, "bottom_right")}
			></span>
		</div>
	);
};