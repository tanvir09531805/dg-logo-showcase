import { useState, useEffect } from '@wordpress/element';

import _ from 'lodash';

function DFM_Grid(props) {

    const handleClick = (data) => {
        if(_.isEqual(props.value, data)) {
            props.onClick('');
        } else {
            props.onClick(data);
        }
    }
    const renderCell = (row, columns) => {
        let cells = {};
        for(let i = 1; i <= columns; i++) {
            const active = props.value === i ? 'active' : '';
            cells[i] = <div className={`grid-cell ${active}`} data-area={i} onClick={() => handleClick(i)}>+</div>
        }
        return _.map(cells, (val) => val);
    }
    return(<>
        <div className='grid-selector'>
            <div className='grid-row'>
                {renderCell(1, parseInt(Number(props.column)))}
            </div>
        </div>
    </>)
}
export default DFM_Grid;