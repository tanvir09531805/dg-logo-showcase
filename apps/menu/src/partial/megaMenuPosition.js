/**
 * item_position
 * 
 */
import DFM_Grid from '../elements/grid';

function MegaMenuPosition(props) {

    const getColumn = () => {
        return props.data.item_position;
    }
    return(<>
        <div className='dfmd-settings-group'>
            <div className='dfdm-settings-group-title'>
                Item Position
            </div>
            {props.depth === '1' ? 
                <div className='dfmd-settings column-generator'>
                    <DFM_Grid 
                        data={props.data}
                        value={getColumn()}
                        column={props.column}
                        onClick={(value) => {
                            props.onChange('item_position', value)
                        }}
                    />
                </div>
            : ''}
            
        </div>
    </>)
}
export default MegaMenuPosition;