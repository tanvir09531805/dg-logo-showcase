/**
 * menu_icon
 * menu_icon_font_family
 * menu_icon_font_weight
 * icon_color
 * use_image
 * icon_image_position
 * image_url
 * image_icon_width
 * menu_only_icon
 */

import { useState, useEffect } from '@wordpress/element';

import {
    ToggleControl,
    SelectControl,
    TextControl,
    Button
} from '@wordpress/components';

import IconPicker from '../elements/iconPicker';

import ColorControl from '../elements/colorControl';

import Condition from '../elements/conditions';

import MediaUpload from '../elements/mediaUpload';

function IconSettings(props) {
    const [data, setData] = useState();

    return(<>
        <div className='dfmd-settings-group'>
            <div className='dfdm-settings-group-title'>
                Icon & Image Settings
            </div>
            <div className='dfmd-settings'>
                <div className='label'>Use Only Icon/Image</div>
                <div className='setting'>
                    <ToggleControl
                        checked={ props.data.menu_only_icon }
                        onChange={ () => {
                            const _v = props.data.menu_only_icon ? false : true;
                            props.onChange('menu_only_icon', _v);
                        } }
                        __nextHasNoMarginBottom
                    />
                </div>
            </div>
            <Condition conditions={{
                    show_if_not: {use_image: true}
            }} data={props.data}>
                <div className='dfmd-settings'>
                    <div className='label'>Menu Icon</div>
                    <div className='setting'>
                        <IconPicker 
                            value={props.data.menu_icon}
                            onClick={(value) => {
                                props.onChange('menu_icon', value)
                            }}
                        />
                    </div>
                </div>
                <div className='dfmd-settings'>
                    <div className='label'>Menu Icon Color</div>
                    <div className='setting'>
                        <ColorControl
                            value={ props.data.icon_color }
                            onChange={ ( value ) => {
                                props.onChange('icon_color', value);
                            }}
                        />
                    </div>
                </div>
            </Condition>
            
            <div className='dfmd-settings'>
                <div className='label'>Icon/Image Position</div>
                <div className='setting'>
                    <SelectControl
                        value={ props.data.icon_image_position }
                        options={ [
                            { label: 'Select icon/image position', value: '', disabled: true },
                            { label: 'Left', value: 'left' },
                            { label: 'Right', value: 'right' },
                        ] }
                        onChange={ ( pos ) => { 
                            props.onChange('icon_image_position', pos);
                        }}
                        __nextHasNoMarginBottom
                    />
                </div>
            </div>
            <div className='dfmd-settings'>
                <div className='label'>Use Image</div>
                <div className='setting'>
                    <ToggleControl
                        checked={ props.data.use_image }
                        onChange={ () => {
                            const _v = props.data.use_image ? false : true;
                            props.onChange('use_image', _v);
                        } }
                        __nextHasNoMarginBottom
                    />
                </div>
            </div>
            

            <Condition conditions={{
                    show_if: {use_image: true}
            }} data={props.data}>
                <div className='dfmd-settings'>
                    <div className='label'>Image icon</div>
                    <div className='setting'>
                        <MediaUpload
                            value={ props.data.image_object?.url ? props.data.image_object : {url:props.data.image_url,id:''} }
                            onChange={ (object) => {
                                props.onChange('image_object', object);
                            } }
                        />
                    </div>
                </div>
                <div className='dfmd-settings'>
                    <div className='label'>Image width (px)</div>
                    <div className='setting'>
                        <TextControl
                            value={ props.data.image_icon_width }
                            onChange={ ( value ) => {
                                props.onChange('image_icon_width', value);
                            }}
                            __nextHasNoMarginBottom
                        />
                    </div>
                </div>
            </Condition>
        </div>
    </>)
}
export default IconSettings;