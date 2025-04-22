/**
 * tooltip_text
 * tooltip_color
 * tooltip_background
 * tooltip_position
 */
import { useState, useEffect } from '@wordpress/element';
import {
    SelectControl,
    TextControl
} from '@wordpress/components';

import ColorControl from '../elements/colorControl';

function TooltipSettings(props) {
    return(<>
        <div className='dfmd-settings-group'>
            <div className='dfdm-settings-group-title'>
                Tooltip Settings
            </div>
            <div className='dfmd-settings'>
                <div className='label'>Tooltip Text</div>
                <div className='setting'>
                    <TextControl
                        value={ props.data.tooltip_text }
                        onChange={ ( value ) => {
                            props.onChange('tooltip_text', value);
                        }}
                        __nextHasNoMarginBottom
                    />
                </div>
            </div>
            <div className='dfmd-settings'>
                <div className='label'>Tooltip Color</div>
                <div className='setting'>
                    <ColorControl
                        value={ props.data.tooltip_color }
                        onChange={ ( value ) => {
                            props.onChange('tooltip_color', value);
                        }}
                    />
                </div>
            </div>
            <div className='dfmd-settings'>
                <div className='label'>Tooltip Background</div>
                <div className='setting'>
                    <ColorControl
                        value={ props.data.tooltip_background }
                        onChange={ ( value ) => {
                            props.onChange('tooltip_background', value);
                        }}
                    />
                </div>
            </div>
            <div className='dfmd-settings'>
                <div className='label'>Tooltip Position</div>
                <div className='setting'>
                    <SelectControl
                        value={ props.data.tooltip_position }
                        options={ [
                            { label: 'Left', value: 'left' },
                            { label: 'Bottom', value: 'bottom' },
                            { label: 'Right', value: 'right' },
                            { label: 'Top', value: 'top' },
                        ] }
                        onChange={ ( type ) => { 
                            props.onChange('tooltip_position', type);
                        }}
                        __nextHasNoMarginBottom
                    />
                </div>
            </div>
        </div>
    </>)
}
export default TooltipSettings;