import { useEffect, useState } from '@wordpress/element';

import Select from 'react-select';
import { __ } from '@wordpress/i18n';
import {Button, ButtonGroup, PanelBody, ToggleControl , SelectControl ,TextControl , __experimentalBorderBoxControl  as BorderControl, __experimentalBoxControl  as BoxControl} from '@wordpress/components';

import {
    ColorDropdown,
    SettingsWrap,
    GradientDropdown,
    SettingsGroup,
    MediaUpload,
    FontPicker,
    SideBar,
    Divider
} from '../elements';


import $ from 'jquery';

function Design(props) {
    const { data } = props;
    const [positionType, setPositionType] = useState([]);
    // const [customPosition, setCustomPosition] = useState([]);
    const [animationType, setAnimationType] = useState([]);
    const [animationTimeFunction, setAnimationTimeFunction] = useState([]);

    const [closeAnimationType, setCloseAnimationType] = useState([]);
    const [closeAnimationTimeFunction, setCloseAnimationTimeFunction] = useState([]);

    const [closePositionType, setClosePositionType] = useState([]);
    const [closePositionTypeForInside, setClosePositionTypeForInside] = useState([]);
	const [closefontWeight, setCloseFontWeight] = useState(data.df_popup_close_btn_font_weight);

    const onChangeSlect = ( newvalue , key, setStateValue ) => {
        updateSetting(key, newvalue.value); // Database value save using key value
        setStateValue(newvalue)
	}

    const[sections, setSections] = useState({});

    const[loadClass, setLoadClass] = useState(false);

    const [activeDevice, setActiveDevice] = useState('desktop'); // Track active device

    // React Select Data structure
	useEffect( () => {
        const close_btn_font_weight =  data.df_popup_close_btn_font_weight ?  data.df_popup_close_btn_font_weight : '300';
        setCloseFontWeight( { value: close_btn_font_weight, label: close_btn_font_weight } )
    }, [] )

    useEffect( () => {
        setPositionType( { value: data.df_popup_content_position, label: convertTitleCase(data.df_popup_content_position) } )
    }, [] )

    // useEffect( () => {
    //     setCustomPosition( { value: data.df_popup_custom_position, label: convertTitleCase(data.df_popup_custom_position) } )
    // }, [] )

    //Normal Animation
    useEffect( () => {
        setAnimationType( { value: data.df_popup_animation_type, label: convertTitleCase(data.df_popup_animation_type)  } )
    }, [] )

    useEffect( () => {
        setAnimationTimeFunction( { value: data.df_popup_animation_time_function, label: convertTitleCase(data.df_popup_animation_time_function) } )
    }, [] )

    // Close Animation
    useEffect( () => {
        setCloseAnimationType( { value: data.df_popup_close_animation_type, label: convertTitleCase(data.df_popup_close_animation_type ? data.df_popup_close_animation_type : 'fade_in' )  } )
    }, [] )

    useEffect( () => {
        setCloseAnimationTimeFunction( { value: data.df_popup_close_animation_time_function, label: convertTitleCase(data.df_popup_close_animation_time_function ? data.df_popup_close_animation_time_function: 'linear') } )
    }, [] )

    useEffect( () => {
        setClosePositionType( { value: data.df_popup_close_position_type, label: convertTitleCase(data.df_popup_close_position_type) } )
    }, [] )

    useEffect( () => {
        setClosePositionTypeForInside( { value: data.df_popup_close_position_type_for_inside ? data.df_popup_close_position_type_for_inside : 'top_right' , label: convertTitleCase(data.df_popup_close_position_type_for_inside ? data.df_popup_close_position_type_for_inside : 'top_right') } )
    }, [] )


    const updateSetting = (key, value) => {
        props.updateSetting(key, value);
    }

    const condition = (obj = {}, operator='and') => {
        let _check = false;
        obj = lodash.map(obj, (value, key) => {
            if(data[key] == value) {
                return true;
            } return false;
        })
        if (operator === 'and') {
            _check = Object.values(obj).every(
                value => value === true
            );
        } else if( operator === 'or' ) {
            _check = Object.values(obj).some(
                value => value === true
            );
        }
        return _check;
    }

    const buildSections = (object) => {
        const _sections = {
            ...sections,
            ...object
        };
        if(!_.isEqual(_sections, sections)) {
            setSections(_sections);
        }
    }

    const onPageLoad = () => {
        setLoadClass(true);
        document.querySelector('.side-bar').addEventListener('click', function(event){
            event.preventDefault();
            if(event.target.nodeName === 'A') {
                const sPosition = document.getElementById(event.target.hash).offsetTop - 85;
                $('html,body').animate({scrollTop:  sPosition}, 700);
            }
        })
    }

    // on page load
    useEffect(() => {
        if (document.readyState === 'complete') {
            onPageLoad();
          } else {
            window.addEventListener('load', onPageLoad);
            // Remove the event listener when component unmounts
            return () => window.removeEventListener('load', onPageLoad);
          }
    }, []);

    return(<>
        {/* <PanelBody
                title = { __( 'Design', 'divi_flash' ) }
                opened = { props.toggleactive === 'design' ? true : false }
                onToggle = {() => props.activeChange('design')}
            > */}
        <div className='main-content'>

                <SettingsWrap label={__('Popup Position', 'divi_flash')}>
                    <div style={{width: '50%'}}>
                        <Select
                            help={__('Choose where the popup will be displayed on your browser window.', 'divi_flash')}
                            value={positionType }
							className="df-popup-select" classNamePrefix="df-popup-select"
                            onChange={ ( newvalue ) => onChangeSlect( newvalue , 'df_popup_content_position' , setPositionType ) }
                            options={ [
                                { value: 'top_left', label: __('Top Left', 'divi_flash') },
                                { value: 'top_center', label: __('Top Center', 'divi_flash') },
                                { value: 'top_right', label: __('Top Right', 'divi_flash') },
                                { value: 'center_left', label: __('Center Left', 'divi_flash') },
                                { value: 'center', label: __('Center', 'divi_flash') },
                                { value: 'center_right', label: __('Center Right', 'divi_flash') },
                                { value: 'bottom_left', label: __('Bottom left', 'divi_flash') },
                                { value: 'bottom_center', label: __('Bottom Center', 'divi_flash') },
                                { value: 'bottom_right', label: __('Bottom Right', 'divi_flash') },
                            ] }

                        />
                        <p className="select-help-text">{__('Control the popup display position.', 'divi_flash')}</p>

                    </div>
                </SettingsWrap>

                <SettingsWrap label={__('Animation Style', 'divi_flash')}>
                    <div style={{width: '50%'}}>
                        <Select
                        help={__('Pick an animation style to enable animations for the popup reveal.', 'divi_flash')}
                            value={ animationType }

							className="df-popup-select" classNamePrefix="df-popup-select"
                            onChange={ ( newvalue ) => onChangeSlect( newvalue , 'df_popup_animation_type' , setAnimationType ) }
                            options={ [
                                { value: 'slide_left', label: __('Slide Left', 'divi_flash') },
                                { value: 'slide_right', label: __('Slide Right', 'divi_flash') },
                                { value: 'slide_up', label: __('Slide Up', 'divi_flash') },
                                { value: 'slide_down', label: __('Slide Down', 'divi_flash') },
                                { value: 'fade_in', label: __('Fade In', 'divi_flash') },
                                { value: 'zoom_left', label: __('Zoom Left', 'divi_flash') },
                                { value: 'zoom_center', label: __('Zoom Center', 'divi_flash') },
                                { value: 'zoom_right', label: __('Zoom Right', 'divi_flash') },
                            ] }
                        />
                        <p className="select-help-text">{__('Pick an animation style to enable animations for the popup reveal.', 'divi_flash')}</p>
                    </div>
                </SettingsWrap>

                <SettingsWrap label={__('Animation Duration', 'divi_flash')} >
                            <div style={{width: '50%'}}>
                                <TextControl
                                    help={__('Speed up or slow down your animation by adjusting the animation duration. Units are in milliseconds.', 'divi_flash')}
                                    value={ data.df_popup_animation_duration }
                                    onChange={ ( value ) => {
                                        updateSetting('df_popup_animation_duration', value);
                                    } }
                                />
                            </div>
                </SettingsWrap>

                <SettingsWrap label={__('Animation Delay', 'divi_flash')} >
                            <div style={{width: '50%'}}>
                                <TextControl
                                    help={__('If you would like to add a delay before your animation runs you can designate that delay here in milliseconds.', 'divi_flash')}
                                    value={ data.df_popup_animation_delay }
                                    onChange={ ( value ) => {
                                        updateSetting('df_popup_animation_delay', value);
                                    } }
                                />
                            </div>
                </SettingsWrap>

                <SettingsWrap label={__('Animation Timing Function', 'divi_flash')}>
                    <div style={{width: '50%'}}>
                        <Select
                         styles={{
                            // Fixes the overlapping problem of the component
                            menu: provided => ({ ...provided, zIndex: 999 })
                          }}
                            help={__('Here you can control the Animation timing function styles.', 'divi_flash')}
                            value={ animationTimeFunction }
							className="df-popup-select" classNamePrefix="df-popup-select"
                            onChange={ ( newvalue ) => onChangeSlect( newvalue , 'df_popup_animation_time_function' , setAnimationTimeFunction ) }
                            options={ [
                                { value: 'linear', label: __('linear', 'divi_flash') },
                                { value: 'ease', label: __('Ease', 'divi_flash') },
                                { value: 'ease-in', label: __('EaseIn', 'divi_flash') },
                                { value: 'ease-out', label: __('EaseOut', 'divi_flash') },
                                { value: 'ease-in-out', label: __('EaseInOut', 'divi_flash') },
                                { value: 'easeInQuad', label: __('EaseInQuad', 'divi_flash') },
                                { value: 'easeInCubic', label: __('EaseInCubic', 'divi_flash') },
                                { value: 'easeInQuart', label: __('EaseInQuart', 'divi_flash') },
                                { value: 'easeInQuint', label: __('EaseInQuint', 'divi_flash') },
                                { value: 'easeInSine', label: __('EaseInSine', 'divi_flash') },
                                { value: 'easeInExpo', label: __('EaseInExpo', 'divi_flash') },
                                { value: 'easeInCirc', label: __('EaseInCirc', 'divi_flash') },
                                { value: 'easeInBack', label: __('EaseInBack', 'divi_flash') },
                                { value: 'easeInBounce', label: __('EaseInBounce', 'divi_flash') },
                                { value: 'easeInOutQuad', label: __('EaseInOutQuad', 'divi_flash') },
                                { value: 'easeInOutCubic', label: __('EaseInOutCubic', 'divi_flash') },
                                { value: 'easeInOutQuart', label: __('EaseInOutQuart', 'divi_flash') },
                                { value: 'easeInOutSine', label: __('EaseInOutSine', 'divi_flash') },
                                { value: 'easeInOutExpo', label: __('EaseInOutExpo', 'divi_flash') },
                                { value: 'easeInOutCirc', label: __('EaseInOutCirc', 'divi_flash') },
                                { value: 'easeInOutBounce', label: __('EaseInOutBounce', 'divi_flash')},
                                { value: 'easeInOutBack', label: __('EaseInOutBack', 'divi_flash') },
                                { value: 'easeOutQuad', label: __('EaseOutQuad', 'divi_flash') },
                                { value: 'easeOutCubic', label: __('EaseOutCubic', 'divi_flash') },
                                { value: 'easeOutQuart', label: __('EaseOutQuart', 'divi_flash') },
                                { value: 'easeOutExpo', label: __('EaseOutExpo', 'divi_flash') },
                                { value: 'easeOutCirc', label: __('EaseOutCirc', 'divi_flash') },
                                { value: 'easeOutBack', label: __('EaseOutBack', 'divi_flash') },
                                { value: 'easeOutQuint', label: __('EaseOutQuint', 'divi_flash') },
                                { value: 'easeOutBounce', label: __('EaseOutBounce', 'divi_flash') },

                            ] }

                        />
                        <p className="select-help-text">{__('Here you can control the Animation timing function styles.', 'divi_flash')}</p>
                    </div>
                </SettingsWrap>

                <SettingsWrap label={__('Close Animation', 'divi_flash')}>
                    <ToggleControl
                        help={__('Enable popup close animation.', 'divi_flash')}
                        checked={ data.df_popup_close_animation_enable }
                        onChange={ (value) => {
                            updateSetting('df_popup_close_animation_enable', value);
                        } }
                    />
                </SettingsWrap>

                <SettingsWrap label={__('Close Animation Style', 'divi_flash')} show_if={condition({df_popup_close_animation_enable:true}, 'or')}>
                    <div style={{width: '50%'}}>
                        <Select
                        help={__('Pick an animation style to enable close animations for the popup reveal.', 'divi_flash')}
                            value={ closeAnimationType }

							className="df-popup-select" classNamePrefix="df-popup-select"
                            onChange={ ( newvalue ) => onChangeSlect( newvalue , 'df_popup_close_animation_type' , setCloseAnimationType ) }
                            options={ [
                                { value: 'slide_left', label: __('Slide Left', 'divi_flash') },
                                { value: 'slide_right', label: __('Slide Right', 'divi_flash') },
                                { value: 'slide_up', label: __('Slide Up', 'divi_flash') },
                                { value: 'slide_down', label: __('Slide Down', 'divi_flash') },
                                { value: 'fade_in', label: __('Fade In', 'divi_flash') },
                                { value: 'zoom_left', label: __('Zoom Left', 'divi_flash') },
                                { value: 'zoom_center', label: __('Zoom Center', 'divi_flash') },
                                { value: 'zoom_right', label: __('Zoom Right', 'divi_flash') },
                            ] }
                        />
                        <p className="select-help-text">{__('Pick an animation style to enable close animations for the popup reveal.', 'divi_flash')}</p>
                    </div>
                </SettingsWrap>

                <SettingsWrap label={__('Close Animation Duration', 'divi_flash')} show_if={condition({df_popup_close_animation_enable:true}, 'or')}>
                            <div style={{width: '50%'}}>
                                <TextControl
                                    help={__('Speed up or slow down your animation by adjusting the close animation duration. Units are in milliseconds.', 'divi_flash')}
                                    value={ data.df_popup_close_animation_duration }
                                    onChange={ ( value ) => {
                                        updateSetting('df_popup_close_animation_duration', value);
                                    } }
                                />
                            </div>
                </SettingsWrap>

                <SettingsWrap label={__('Close Animation Timing Function', 'divi_flash')} show_if={condition({df_popup_close_animation_enable:true}, 'or')}>
                    <div style={{width: '50%'}}>
                        <Select
                         styles={{
                            // Fixes the overlapping problem of the component
                            menu: provided => ({ ...provided, zIndex: 999 })
                          }}
                            help={__('Here you can control the close Animation timing function styles.', 'divi_flash')}
                            value={ closeAnimationTimeFunction }
							className="df-popup-select" classNamePrefix="df-popup-select"
                            onChange={ ( newvalue ) => onChangeSlect( newvalue , 'df_popup_close_animation_time_function' , setCloseAnimationTimeFunction ) }
                            options={ [
                                { value: 'linear', label: __('linear', 'divi_flash') },
                                { value: 'ease', label: __('Ease', 'divi_flash') },
                                { value: 'ease-in', label: __('EaseIn', 'divi_flash') },
                                { value: 'ease-out', label: __('EaseOut', 'divi_flash') },
                                { value: 'ease-in-out', label: __('EaseInOut', 'divi_flash') },
                                { value: 'easeInQuad', label: __('EaseInQuad', 'divi_flash') },
                                { value: 'easeInCubic', label: __('EaseInCubic', 'divi_flash') },
                                { value: 'easeInQuart', label: __('EaseInQuart', 'divi_flash') },
                                { value: 'easeInQuint', label: __('EaseInQuint', 'divi_flash') },
                                { value: 'easeInSine', label: __('EaseInSine', 'divi_flash') },
                                { value: 'easeInExpo', label: __('EaseInExpo', 'divi_flash') },
                                { value: 'easeInCirc', label: __('EaseInCirc', 'divi_flash') },
                                { value: 'easeInBack', label: __('EaseInBack', 'divi_flash') },
                                { value: 'easeInBounce', label: __('EaseInBounce', 'divi_flash') },
                                { value: 'easeInOutQuad', label: __('EaseInOutQuad', 'divi_flash') },
                                { value: 'easeInOutCubic', label: __('EaseInOutCubic', 'divi_flash') },
                                { value: 'easeInOutQuart', label: __('EaseInOutQuart', 'divi_flash') },
                                { value: 'easeInOutSine', label: __('EaseInOutSine', 'divi_flash') },
                                { value: 'easeInOutExpo', label: __('EaseInOutExpo', 'divi_flash') },
                                { value: 'easeInOutCirc', label: __('EaseInOutCirc', 'divi_flash') },
                                { value: 'easeInOutBounce', label: __('EaseInOutBounce', 'divi_flash')},
                                { value: 'easeInOutBack', label: __('EaseInOutBack', 'divi_flash') },
                                { value: 'easeOutQuad', label: __('EaseOutQuad', 'divi_flash') },
                                { value: 'easeOutCubic', label: __('EaseOutCubic', 'divi_flash') },
                                { value: 'easeOutQuart', label: __('EaseOutQuart', 'divi_flash') },
                                { value: 'easeOutExpo', label: __('EaseOutExpo', 'divi_flash') },
                                { value: 'easeOutCirc', label: __('EaseOutCirc', 'divi_flash') },
                                { value: 'easeOutBack', label: __('EaseOutBack', 'divi_flash') },
                                { value: 'easeOutQuint', label: __('EaseOutQuint', 'divi_flash') },
                                { value: 'easeOutBounce', label: __('EaseOutBounce', 'divi_flash') },

                            ] }

                        />
                        <p className="select-help-text">{__('Here you can control the close Animation timing function styles.', 'divi_flash')}</p>
                    </div>
                </SettingsWrap>

                <SettingsWrap label={__('Overlay Background Color', 'divi_flash')}>
                    <ColorDropdown
                        color={data.df_popup_overlay_bg_color}
                        onChange={(value) => {
                            updateSetting('df_popup_overlay_bg_color', value);
                        }}
                        enableAlpha
                    />
                </SettingsWrap>

                <SettingsWrap label={__('Overlay Background Gradient', 'divi_flash')}>
                    <GradientDropdown
                        color={data.df_popup_overlay_bg_gradient ? data.df_popup_overlay_bg_gradient : null}
                        onChange={(value) => {
                            updateSetting('df_popup_overlay_bg_gradient', value);
                        }}
                        enableAlpha
                    />
                </SettingsWrap>


                <SettingsWrap label={__('Hide Close Button', 'divi_flash')} >
                    <ToggleControl
                        help={__('Define whether to show close button or not.', 'divi_flash')}
                        checked={ data.df_popup_remove_link }
                        onChange={ (value) => {
                            updateSetting('df_popup_remove_link', value);
                        } }
                    />
                </SettingsWrap>

                <SettingsWrap label={__('Clickable Outside Popup Area', 'divi_flash')} >
                    <ToggleControl
                        help={__('This option enables direct interaction with the content displayed outside of the popup container.', 'divi_flash')}
                        checked={ data.df_popup_clickable_outside_popup_area }
                        onChange={ (value) => {
                            updateSetting('df_popup_clickable_outside_popup_area', value);
                        } }
                    />
                </SettingsWrap>

                <SettingsWrap label={__('Close On Overlay Click', 'divi_flash')}  show_if={condition({df_popup_clickable_outside_popup_area:false}, 'or')}>
                    <ToggleControl
                        help={__('Close the popup when user click on overlay or outside the popup content area.', 'divi_flash')}
                        checked={ data.df_popup_close_on_overlay_click }
                        onChange={ (value) => {
                            updateSetting('df_popup_close_on_overlay_click', value);
                        } }
                    />
                </SettingsWrap>


                <SettingsWrap label={__('Close Button Position', 'divi_flash')} show_if={condition({df_popup_remove_link:false , df_popup_close_btn_move_inner_content: false}, 'and')}>
                    <div style={{width: '50%'}}>
                        <Select
                            help={__('Control the popup close button display position.', 'divi_flash')}
                            value={closePositionType }
							className="df-popup-select" classNamePrefix="df-popup-select"
                            onChange={ ( newvalue ) => onChangeSlect( newvalue , 'df_popup_close_position_type' , setClosePositionType ) }
                            options={ [
                                { value: 'top_left', label: __('Top Left', 'divi_flash') },
                                { value: 'top_center', label: __('Top Center', 'divi_flash') },
                                { value: 'top_right', label: __('Top Right', 'divi_flash')},
                                { value: 'center_left', label: __('Center Left', 'divi_flash') },
                                { value: 'center_right', label: __('Center Right', 'divi_flash') },
                                { value: 'bottom_left', label: __('Bottom left', 'divi_flash') },
                                { value: 'bottom_center', label: __('Bottom Center', 'divi_flash') },
                                { value: 'bottom_right', label: __('Bottom Right', 'divi_flash') },
                            ] }

                        />
                        <p className="select-help-text">{__('Control the popup Close Button display position.', 'divi_flash')}</p>

                    </div>
                </SettingsWrap>

                <SettingsWrap label={__('Move Close Button Inside Popup area', 'divi_flash')} show_if={condition({df_popup_remove_link:false}, 'or')}>
                    <ToggleControl
                        help={__('Enable for close button placement at popup content area.', 'divi_flash')}
                        checked={ data.df_popup_close_btn_move_inner_content }
                        onChange={ (value) => {
                            updateSetting('df_popup_close_btn_move_inner_content', value);
                        } }
                    />
                </SettingsWrap>

                <SettingsWrap label={__('Close Button Position in Inside Popup', 'divi_flash')} show_if={condition({df_popup_remove_link:false , df_popup_close_btn_move_inner_content: true}, 'and')}>
                    <div style={{width: '50%'}}>
                        <Select
                            help={__('Control the popup close button display position.', 'divi_flash')}
                            value={closePositionTypeForInside }
							className="df-popup-select" classNamePrefix="df-popup-select"
                            onChange={ ( newvalue ) => onChangeSlect( newvalue , 'df_popup_close_position_type_for_inside' , setClosePositionTypeForInside ) }
                            options={ [
                                { value: 'top_left', label: __('Top Left', 'divi_flash') },
                                { value: 'top_left_cornar', label: __('Top Left End', 'divi_flash') },
                                { value: 'top_center', label: __('Top Center', 'divi_flash') },
                                { value: 'top_right', label: __('Top Right', 'divi_flash')},
                                { value: 'top_right_cornar', label: __('Top Right End', 'divi_flash')},
                                { value: 'center_left', label: __('Center Left', 'divi_flash') },
                                { value: 'center_right', label: __('Center Right', 'divi_flash') },
                                { value: 'bottom_left', label: __('Bottom left', 'divi_flash') },
                                { value: 'bottom_center', label: __('Bottom Center', 'divi_flash') },
                                { value: 'bottom_right', label: __('Bottom Right', 'divi_flash') },
                            ] }

                        />
                        <p className="select-help-text">{__('Control the popup Close Button display position.', 'divi_flash')}</p>

                    </div>
                </SettingsWrap>

                <SettingsWrap label={__('Close Button Design', 'divi_flash')} show_if={condition({df_popup_remove_link:false}, 'or')}>
                    <ToggleControl
                        help={__('Enable close stylings.', 'divi_flash')}
                        checked={ data.df_popup_close_btn_design_on }
                        onChange={ (value) => {
                            updateSetting('df_popup_close_btn_design_on', value);
                        } }
                    />
                </SettingsWrap>


                <SettingsWrap customClass="close_btn_block" label={__('Button Color', 'divi_flash')} show_if={condition({df_popup_close_btn_design_on: true, df_popup_remove_link: false}, 'and')}>
                    <ColorDropdown
                        color={data.df_popup_close_btn_color}
                        onChange={(value) => {
                            updateSetting('df_popup_close_btn_color', value);
                        }}
                        enableAlpha
                    />
                </SettingsWrap>

                <SettingsWrap customClass="close_btn_block" label={__('Button Font Size', 'divi_flash')} show_if={condition({df_popup_close_btn_design_on: true, df_popup_remove_link: false}, 'and')} >
                    <div style={{width: '50%'}}>
                        <TextControl
                            help={__('Font Size (px)', 'divi_flash')}
                            value={ data.df_popup_close_btn_font_size }
                            onChange={ ( value ) => {
                                updateSetting('df_popup_close_btn_font_size', value);
                            } }
                        />
                    </div>
                </SettingsWrap>

				<SettingsWrap customClass="close_btn_block" label={__('Button Font Weight', 'divi_flash')} show_if={condition({df_popup_close_btn_design_on: true, df_popup_remove_link: false}, 'and')}>
                    <div style={{width: '50%'}}>
                        <Select
                            help={__('Close button font weight.', 'divi_flash')}
                            value={closefontWeight }
							className="df-popup-select" classNamePrefix="df-popup-select"
                            onChange={ ( newvalue ) => onChangeSlect( newvalue , 'df_popup_close_btn_font_weight' , setCloseFontWeight ) }
                            options={ [
                                { value: '100', label: __('100', 'divi_flash') },
                                { value: '200', label: __('200', 'divi_flash') },
                                { value: '300', label: __('300', 'divi_flash') },
                                { value: '400', label: __('400', 'divi_flash') },
                                { value: '500', label: __('500', 'divi_flash') },
                                { value: '600', label: __('600', 'divi_flash') },
                                { value: '700', label: __('700', 'divi_flash') },
                                { value: '800', label: __('800', 'divi_flash') },
                                { value: '900', label: __('900', 'divi_flash') },
                            ] }

                        />
                        <p className="select-help-text">{__('Font weight.', 'divi_flash')}</p>

                    </div>
                </SettingsWrap>

                <SettingsWrap customClass="close_btn_block" label={__('Button Line Height', 'divi_flash')} show_if={condition({df_popup_close_btn_design_on: true, df_popup_remove_link: false}, 'and')} >
                    <div style={{width: '50%'}}>
                        <TextControl
                            help={__('Line Height (px)', 'divi_flash')}
                            value={ data.df_popup_close_btn_line_height }
                            onChange={ ( value ) => {
                                updateSetting('df_popup_close_btn_line_height', value);
                            } }
                        />
                    </div>
                </SettingsWrap>

                 <SettingsWrap  customClass="close_btn_block" label={__('Button Background Color', 'divi_flash')} show_if={condition({df_popup_close_btn_design_on: true, df_popup_remove_link: false}, 'and')}>

                    <ColorDropdown
                        color={data.df_popup_close_btn_background}
                        onChange={(value) => {
                            updateSetting('df_popup_close_btn_background', value);
                        }}
                        enableAlpha
                    />
                </SettingsWrap>

                <SettingsWrap customClass="close_btn_block"  label={__('Button Padding', 'divi_flash')} show_if={condition({df_popup_close_btn_design_on: true, df_popup_remove_link: false}, 'and')}>
                    
                    <ButtonGroup 
                        className="btn-group-d-block"
                        style={{
                            width: '100%', 
                            marginBottom: '12px'
                        }}
                    >
                        <Button
                            isPrimary={activeDevice === 'desktop'}
                            onClick={() => setActiveDevice('desktop')}
                            label={__('Desktop', 'divi_flash')}
                        >
                            <span className="dashicons dashicons-desktop" aria-hidden="true"></span>
                        </Button>
                        <Button
                            isPrimary={activeDevice === 'tablet'}
                            onClick={() => setActiveDevice('tablet')}
                            label={__('Tablet', 'divi_flash')}
                        >
                            <span className="dashicons dashicons-tablet" aria-hidden="true"></span>
                        </Button>
                        <Button
                            isPrimary={activeDevice === 'mobile'}
                            onClick={() => setActiveDevice('mobile')}
                            label={__('Mobile', 'divi_flash')}
                        >
                            <span className="dashicons dashicons-smartphone" aria-hidden="true"></span>
                        </Button>
                    </ButtonGroup>
                    {activeDevice === 'desktop' && (<BoxControl
                        onChange={(value) => {
                            updateSetting('df_popup_close_btn_padding', value);
                        }}
                        values={ data.df_popup_close_btn_padding }
                    />)}
                    {activeDevice === 'tablet' && (<BoxControl
                        label={__('Tablet Box Control', 'divi_flash')}
                        onChange={(value) => {
                            updateSetting('df_popup_close_btn_padding_tab', value);
                        }}
                        values={ data.df_popup_close_btn_padding_tab }
                    />)}
                    {activeDevice === 'mobile' && (<BoxControl
                        label={__('Mobile Box Control', 'divi_flash')}
                        onChange={(value) => {
                            updateSetting('df_popup_close_btn_padding_mob', value);
                        }}
                        values={ data.df_popup_close_btn_padding_mob }
                    />)}
                </SettingsWrap>

                <SettingsWrap  customClass="close_btn_block" label={__('Button Margin', 'divi_flash')} show_if={condition({df_popup_close_btn_design_on: true, df_popup_remove_link: false}, 'and')}>
                    
                    <ButtonGroup 
                        className="btn-group-d-block"
                        style={{
                            width: '100%', 
                            marginBottom: '12px'
                        }}>
                        <Button
                            isPrimary={activeDevice === 'desktop'}
                            onClick={() => setActiveDevice('desktop')}
                            label={__('Desktop', 'divi_flash')}
                        >
                            <span className="dashicons dashicons-desktop" aria-hidden="true"></span>
                        </Button>
                        <Button
                            isPrimary={activeDevice === 'tablet'}
                            onClick={() => setActiveDevice('tablet')}
                            label={__('Tablet', 'divi_flash')}
                        >
                            <span className="dashicons dashicons-tablet" aria-hidden="true"></span>
                        </Button>
                        <Button
                            isPrimary={activeDevice === 'mobile'}
                            onClick={() => setActiveDevice('mobile')}
                            label={__('Mobile', 'divi_flash')}
                        >
                            <span className="dashicons dashicons-smartphone" aria-hidden="true"></span>
                        </Button>
                    </ButtonGroup>
                    
                    {activeDevice === 'desktop' && (
                        <BoxControl
                            inputProps={{ min: -300 }}
                            onChange={(value) => {
                                updateSetting('df_popup_close_btn_margin', value);
                            }}
                            values={data.df_popup_close_btn_margin}
                        />
                    )}
                    {activeDevice === 'tablet' && (
                        <BoxControl
                            label={__('Tablet Box Control', 'divi_flash')}
                            inputProps={{ min: -300 }}
                            onChange={(value) => {
                                updateSetting('df_popup_close_btn_margin_tab', value);
                            }}
                            values={data.df_popup_close_btn_margin_tab}
                        />
                    )}
                    {activeDevice === 'mobile' && (
                        <BoxControl
                            label={__('Mobile Box Control', 'divi_flash')}
                            inputProps={{ min: -300 }}
                            onChange={(value) => {
                                updateSetting('df_popup_close_btn_margin_mob', value);
                            }}
                            values={data.df_popup_close_btn_margin_mob}
                        />
                    )}

                </SettingsWrap>


                <SettingsWrap customClass="close_btn_block" label={__('Button Border Width', 'divi_flash')} show_if={condition({df_popup_close_btn_design_on: true, df_popup_remove_link: false}, 'and')}>
                    <BoxControl
                        onChange={(value) => {
                            updateSetting('df_popup_close_btn_border', value);
                        }}
                        values={ data.df_popup_close_btn_border }
                    />
                </SettingsWrap>

                <SettingsWrap customClass="close_btn_block" label={__('Button Border Radius', 'divi_flash')} show_if={condition({df_popup_close_btn_design_on: true, df_popup_remove_link: false}, 'and')}>
                    <BoxControl
                        onChange={(value) => {
                            updateSetting('df_popup_close_btn_border_radius', value);
                        }}
                        values={ data.df_popup_close_btn_border_radius }
                    />
                </SettingsWrap>

                <SettingsWrap customClass="close_btn_block" label={__('Button Border Color', 'divi_flash')} show_if={condition({df_popup_close_btn_design_on: true, df_popup_remove_link: false}, 'and')}>
                    <ColorDropdown
                        color={data.df_popup_close_btn_border_color}
                        onChange={(value) => {
                            updateSetting('df_popup_close_btn_border_color', value);
                        }}
                        enableAlpha
                    />
                </SettingsWrap>

        </div>
        {/* </PanelBody> */}
        <SideBar loadClass={loadClass} nav_item={sections} />
    </>)
}
export default Design;
