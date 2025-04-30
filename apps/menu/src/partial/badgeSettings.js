/**
 * badge_text
 * badge_color
 * badge_background
 * badge_position
 */
import { useState, useEffect } from '@wordpress/element';
import {
    ToggleControl,
    TextControl,
    SelectControl
} from '@wordpress/components';

import ColorControl from '../elements/colorControl';

function BadgeSettings(props) {
    return(<>
        <div className='dfmd-settings-group'>
            <div className='dfdm-settings-group-title'>
                Badge Settings
            </div>
            <div className='dfmd-settings'>
                <div className='label'>Badge Text</div>
                <div className='setting'>
                    <TextControl
                        value={ props.data.badge_text }
                        onChange={ ( value ) => {
                            props.onChange('badge_text', value);
                        }}
                        __nextHasNoMarginBottom
                    />
                </div>
            </div>
            <div className='dfmd-settings'>
                <div className='label'>Enable Arrow</div>
                <div className='setting'>
                    <ToggleControl
                        checked={ props.data.badge_arrow }
                        onChange={ () => {
                            const _v = props.data.badge_arrow ? false : true;
                            props.onChange('badge_arrow', _v);
                        } }
                        __nextHasNoMarginBottom
                    />
                </div>
            </div>
            <div className='dfmd-settings'>
                <div className='label'>Badge Color</div>
                <div className='setting'>
                    <ColorControl
                        value={ props.data.badge_color }
                        onChange={ ( value ) => {
                            props.onChange('badge_color', value);
                        }}
                    />
                </div>
            </div>
            <div className='dfmd-settings'>
                <div className='label'>Badge Background</div>
                <div className='setting'>
                    <ColorControl
                        value={ props.data.badge_background }
                        onChange={ ( value ) => {
                            props.onChange('badge_background', value);
                        }}
                    />
                </div>
            </div>
            <div className='dfmd-settings'>
                <div className='label'>Badge Position</div>
                <div className='setting'>
                    <SelectControl
                        value={ props.data.badge_position }
                        options={ [
                            { label: 'Select badge position', value: '', disabled: true },
                            { label: 'Right', value: 'right' },
                            { label: 'Left', value: 'left' },
                        ] }
                        onChange={ ( pos ) => { 
                            props.onChange('badge_position', pos);
                        }}
                        __nextHasNoMarginBottom
                    />
                </div>
            </div>
        </div>
    </>)
}
export default BadgeSettings;