import { useState, useEffect } from '@wordpress/element';
import {
    SelectControl,
    TextControl,
    ColorPicker,
    Dropdown,
    Button
} from '@wordpress/components';

function ColorControl(props) {

    const [color, setColor] = useState('');

    return(<>
        <div 
            className='df-color-control'    
        >
            <Dropdown
                className="dfmd-blocks-color-control-container-class-name"
                contentClassName="dfmd-blocks-color-control-popover-content-classname"
				popoverProps={ { placement: 'top-start', inline:true } }
                renderToggle={ ( { isOpen, onToggle } ) => (
					<Button
						className="dfmd-blocks-color-picker"
						onClick={ onToggle }
						aria-expanded={ isOpen }
					>
                        <span style={{backgroundColor: props.value}}></span>Select Color
					</Button>
				) }
                renderContent={ () => (
                    <div>
						<ColorPicker
							color={ props.value }
							onChange={ ( color ) => {
                                props.onChange(color);
                            } }
							enableAlpha />
					</div>
                )}
            />
        </div>
    </>)
}

export default ColorControl;