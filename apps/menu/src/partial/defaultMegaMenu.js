/**
 * mega_menu
 * 
 */

import {
    ToggleControl,
    SelectControl,
    TextControl
} from '@wordpress/components';

import { useState, useEffect } from '@wordpress/element';

// https://cssgrid-generator.netlify.app/

import Condition from '../elements/conditions';

function DefaultMegaMenu(props) {

    const handleOnChange = (type) => {
        props.onChange('mega_menu_column', type);
    }
    
    return(<>
        <div className='dfmd-settings-group'>
            <div className='dfdm-settings-group-title'>
                Mega Menu
            </div>
            <div className='dfmd-settings'>
                <div className='label'>Enable mega menu</div>
                <div className='setting'>
                    <ToggleControl
                        checked={ props.data.mega_menu }
                        onChange={ () => {
                            const _v = props.data.mega_menu ? false : true;
                            props.onChange('mega_menu', _v);
                        } }
                        __nextHasNoMarginBottom
                    />
                </div>
            </div>
            <Condition conditions={{
                    show_if: {mega_menu: true}
                }} data={props.data}>
                <div className='dfmd-settings'>
                    <div className='label'>Select Column</div>
                    <div className='setting'>
                        <SelectControl
                            value={ props.data.mega_menu_column }
                            options={ [
                                { label: 'Column 2', value: '2' },
                                { label: 'Column 3', value: '3' },
                                { label: 'Column 4', value: '4' },
                                { label: 'Column 5', value: '5' },
                                { label: 'Column 6', value: '6' },
                            ] }
                            onChange={ ( type ) => { 
                                handleOnChange(type);
                            }}
                            __nextHasNoMarginBottom
                        />
                    </div>
                </div> 
            </Condition>
            <Condition conditions={{
                    show_if: {
                        mega_menu: true
                    }
                }} data={props.data}>
                <div className='dfmd-settings'>
                    <div className='label'>Content Width Type</div>
                    <div className='setting'>
                        <SelectControl
                            value={ props.data.mega_menu_width }
                            options={ [
                                { label: 'Normal width', value: 'normal_width' },
                                { label: 'Full width', value: 'full_width' },
                                { label: 'Custom width', value: 'custom_width' },
                            ] }
                            onChange={ ( type ) => { 
                                props.onChange('mega_menu_width', type);
                            }}
                            __nextHasNoMarginBottom
                        />
                    </div>
                </div>
            </Condition>
            <Condition conditions={{
                show_if: {
                    mega_menu: true,
                    mega_menu_width: 'custom_width'
                }
            }} data={props.data}>
                <div className='dfmd-settings'>
                    <div className='label'>Custom Width (px)</div>
                    <div className='setting'>
                        <TextControl
                            value={ props.data.mega_menu_custom_width }
                            onChange={ ( value ) => {
                                props.onChange('mega_menu_custom_width', value);
                            }}
                            __nextHasNoMarginBottom
                        />
                    </div>
                </div>
            </Condition>
            
            <Condition conditions={{
                show_if: {
                    mega_menu: true,
                    mega_menu_width: 'custom_width'
                }
            }} data={props.data}>
                <div className='dfmd-settings'>
                    <div className='label'>Menu Position</div>
                    <div className='setting'>
                        <SelectControl
                            value={ props.data.mega_menu_alignment }
                            options={ [
                                { label: 'Bottom Left', value: 'bottom_left' },
                                { label: 'Bottom Center', value: 'bottom_center' },
                                { label: 'Bottom Right', value: 'bottom_right' },
                            ] }
                            onChange={ ( type ) => { 
                                props.onChange('mega_menu_alignment', type);
                            }}
                            __nextHasNoMarginBottom
                        />
                    </div>
                </div>
            </Condition>
            
        </div>
    </>)
}
export default DefaultMegaMenu;