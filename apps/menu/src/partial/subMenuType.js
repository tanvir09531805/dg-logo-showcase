/**
 * submenu_type
 * submenu_position
 * library_items
 * content_width_type
 * custom_width_value
 * menu_position
 */
import {
    SelectControl,
    TextControl,
    ExternalLink
} from '@wordpress/components';

import { useState, useEffect } from '@wordpress/element';

import Condition from '../elements/conditions';

function SubmenuType(props) {    
    const diviLibs = df_menu.layouts ? JSON.parse(df_menu.layouts) : {}; 

    return(
        <>
            <div className='dfmd-settings-group'>
                <div className='dfdm-settings-group-title'>
                    Layout Settings
                </div>
                <div className='dfmd-settings'>
                    <div className='label'>Submenu Type</div>
                    <div className='setting'>
                        <SelectControl
                            value={ props.data.submenu_type }
                            options={ [
                                { label: 'Normal', value: 'normal' },
                                { label: 'Divi Layout', value: 'divi_layout' },
                            ] }
                            onChange={ ( type ) => {
                                props.onChange('submenu_type', type);
                            } }
                            __nextHasNoMarginBottom
                        />
                    </div>
                </div>

                <Condition conditions={{
                    show_if: {submenu_type: 'divi_layout'}
                }} data={props.data}>
                    <div className='dfmd-settings'>
                        <div className='label'>Library Item</div>
                        <div className='setting'>
                            <SelectControl
                                value={ props.data.library_items }
                                options={ diviLibs }
                                onChange={ ( type ) => { 
                                    props.onChange('library_items', type);
                                } }
                                __nextHasNoMarginBottom
                            />
                        </div>
                    </div>
                </Condition>

                <Condition conditions={{
                    show_if: {submenu_type: 'divi_layout'},
                    show_if_not: {library_items: ''}
                }} data={props.data}>
                    <div className='dfmd-settings' style={{justifyContent: 'end'}}>
                        <ExternalLink 
                            href={`${df_menu.site_url}/wp-admin/post.php?post=${props.data.library_items}&action=edit`}
                        >Edit the Layout</ExternalLink>
                    </div>
                </Condition>
                
                <Condition conditions={{
                    show_if: {submenu_type: 'divi_layout'},
                    show_if_not: {library_items: ''}
                }} data={props.data}>
                    <div className='dfmd-settings'>
                        <div className='label'>Content Width Type</div>
                        <div className='setting'>
                            <SelectControl
                                value={ props.data.content_width_type }
                                options={ [
                                    { label: 'Normal width', value: 'normal_width' },
                                    { label: 'Full width', value: 'full_width' },
                                    { label: 'Custom width', value: 'custom_width' },
                                ] }
                                onChange={ ( type ) => { 
                                    props.onChange('content_width_type', type);
                                }}
                                __nextHasNoMarginBottom
                            />
                        </div>
                    </div>
                </Condition>

                <Condition conditions={{
                    show_if: {
                        submenu_type: 'divi_layout',
                        content_width_type: 'custom_width'
                    },
                    show_if_not: {library_items: ''}
                }} data={props.data}>
                    <div className='dfmd-settings'>
                        <div className='label'>Custom Width (px)</div>
                        <div className='setting'>
                            <TextControl
                                value={ props.data.custom_width_value }
                                onChange={ ( value ) => {
                                    props.onChange('custom_width_value', value);
                                }}
                                __nextHasNoMarginBottom
                            />
                        </div>
                    </div>
                </Condition>
                
                <Condition conditions={{
                    show_if: {
                        submenu_type: 'divi_layout',
                        content_width_type: 'custom_width'
                    },
                    show_if_not: {library_items: ''}
                }} data={props.data}>
                    <div className='dfmd-settings'>
                        <div className='label'>Menu Position</div>
                        <div className='setting'>
                            <SelectControl
                                value={ props.data.submenu_position }
                                options={ [
                                    { label: 'Bottom Left', value: 'bottom_left' },
                                    { label: 'Bottom Center', value: 'bottom_center' },
                                    { label: 'Bottom Right', value: 'bottom_right' },
                                ] }
                                onChange={ ( type ) => { 
                                    props.onChange('submenu_position', type);
                                }}
                                __nextHasNoMarginBottom
                            />
                        </div>
                    </div>
                </Condition>
                
            </div>
        </>
    )
}
export default SubmenuType;