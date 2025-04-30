import React, { useState, useEffect } from 'react';
import './styles.scss';

export const GridLayoutField = (props) => {
	const { row, column, value = {} } = props;

	const row_map = row ? parseInt(row, 10) : 8;
	const column_map = column ? parseInt(column, 10) : 8;

	const [hoveredCell, setHoveredCell] = useState({ row: 0, column: 0 });
	const [selectedCells, setSelectedCells] = useState({ row: 0, column: 0 });
	const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, content: '' });

	// Use useEffect to update state based on props.value
	useEffect(() => {
		if (value.row && value.column) {
			setSelectedCells({ row: value.row, column: value.column });
		}
	}, [value]); // Runs when `value` changes

	const mouseEnterHandler = (row, column, event) => {
		if (!event) return;

		const { clientX, clientY } = event;
		setHoveredCell({ row, column });
		setTooltip({
			visible: true,
			x: clientX + 10,
			y: clientY + 10,
			content: `Row: ${row}, Column: ${column}`,
		});
	};

	const mouseLeaveHandler = () => {
		setHoveredCell({ row: 0, column: 0 });
		setTooltip({ visible: false, x: 0, y: 0, content: '' });
	};

	const clickHandler = (row, column, event) => {
		setSelectedCells({ row, column });
		if (typeof props.onChange === 'function') {
			props.onChange({
				event,
				inputValue: { row, column },
			});
		}
	};

	const gridElements = [];
	for (let i = 1; i <= row_map; i++) {
		for (let j = 1; j <= column_map; j++) {
			const isHighlighted = i <= hoveredCell.row && j <= hoveredCell.column;
			const isSelected = i <= selectedCells.row && j <= selectedCells.column;

			gridElements.push(
				<span
					className={`diviflash_grid_layout__fields__field ${
						isHighlighted ? 'highlighted' : ''
					} ${isSelected ? 'selected' : ''}`}
					key={`r${i}c${j}`}
					data-column={j}
					data-row={i}
					onMouseEnter={(e) => mouseEnterHandler(i, j, e)}
					onMouseLeave={mouseLeaveHandler}
					onClick={(e) => clickHandler(i, j, e)}
				></span>
			);
		}
	}

	const myComponentStyle = {
		gridTemplateColumns: `repeat(${column_map}, 1fr)`,
		gridTemplateRows: `repeat(${row_map}, 1fr)`,
	};

	return (
		<div className="diviflash_grid_layout">
			<div className="diviflash_grid_layout__fields" style={myComponentStyle}>
				{gridElements}
			</div>
			{tooltip.visible && (
				<div
					className="diviflash_grid_layout__tooltip"
					style={{
						position: 'fixed',
						top: `${tooltip.y}px`,
						left: `${tooltip.x}px`,
						backgroundColor: '#333',
						color: '#fff',
						padding: '5px 10px',
						borderRadius: '5px',
						pointerEvents: 'none',
						fontSize: '12px',
						zIndex: 1000,
					}}
				>
					{tooltip.content}
				</div>
			)}
		</div>
	);
};