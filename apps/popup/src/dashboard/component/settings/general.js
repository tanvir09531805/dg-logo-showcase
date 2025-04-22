import { useEffect, useState, useRef } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

import Select from 'react-select';
import { __ } from '@wordpress/i18n';

import _ from 'lodash';
import { CodeEditor } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, TextareaControl , DatePicker, TimePicker, DateTimePicker, TextControl ,SelectControl, CheckboxControl , __experimentalNumberControl as NumberControl } from '@wordpress/components';

import {SettingsWrap, SettingsGroup, Divider , AllDays} from '../elements';

import $ from 'jquery';

function General(props) {
    const { data } = props;
	const [popupId, setPopupId] = useState("")
    const [trigerType, setTrigerType] = useState([]);
    const [viewPort, setViewPort] = useState([]);
    const [scheduleType, setScheduleType] = useState([]);
	const [showToolTip, setShowToolTip] = useState(false);
	const [toolTipTxt, setToolTipTxt] = useState("Click to copy!");
	const inputRef = useRef(null);

    const onChangeSlect = ( newvalue , key, setStateValue ) => {
        updateSetting(key, newvalue.value); // Database value save using key value
        setStateValue(newvalue)
	}
    // React Select Data structure
    useEffect( () => {
        setTrigerType( { value: data.df_popup_trigger_type, label: convertTitleCase (data.df_popup_trigger_type) } )
    }, [] )
    useEffect( () => {
        setViewPort( { value: data.df_popup_scroll_element_viewport, label: convertTitleCase (data.df_popup_scroll_element_viewport) } )
    }, [] )
    useEffect( () => {
        setScheduleType( { value: data.df_popup_schedule_type, label: convertTitleCase(data.df_popup_schedule_type) } )
    }, [] )

	useEffect(()=>{
		const popupId = getPopupId(window.location.href);
		setPopupId(popupId)
	}, [])

	const getPopupId = (wpLink) => {
		const regexPattern = /[?&]post=(\d+)/;
		const matches = regexPattern.exec(wpLink);

		if (matches && matches.length >= 2) {
		  return matches[1];
		}

		return null;
	  }

    const [selectedDays, setSelectedDays] = useState( data.df_popup_recuring_schedule_day);

    const onChangeDay = (day) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter(selectedDays => selectedDays !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
        updateSetting('df_popup_recuring_schedule_day', [...new Set([...selectedDays, day])] );
    };

	const [ startDate, setStartDate ] = useState( !data.df_popup_schedule_start_date ? new Date() : data.df_popup_schedule_start_date );
    const [ endDate, setEndDate ] = useState( !data.df_popup_schedule_end_date ? new Date() : data.df_popup_schedule_end_date );

    const alldays = {'sunday': 'Sunday', 'monday': 'Monday', 'tuesday': 'Tuesday', 'wednesday': 'Wednesday', 'thursday': 'Thursday', 'friday': 'Friday', 'saturday': 'Saturdays'}
    const[layouts, setLayouts] = useState({});

    const[sections, setSections] = useState({});

    const[loadClass, setLoadClass] = useState(false);

    const updateSetting = (key, value) => {
        props.updateSetting(key, value);
    }

    const updatePopupStatus = (value) => {
        props.updatePopupStatus( value);

    }

	const handleCopyClick = () => {
		if (inputRef.current) {
		  inputRef.current.select();
		  document.execCommand('copy');
		//   inputRef.current.blur();
		  setToolTipTxt("Copied to Clipboard!");
		  const toolTipTxt = document.querySelector(".df-tooltip");
		  toolTipTxt.setAttribute("style", "margin-left: -155px;")
		}
	  };

	const showToolTipText= () => {
		setShowToolTip(true)
	}

	const hideToolTipText = () => {
		setShowToolTip(false)
		setToolTipTxt("Click to copy!")
	}

	const disableStartDate = (date) => {
		const currentDate = new Date();
		const previousDate = new Date(currentDate.setDate(currentDate.getDate() - 1));
    	return date < previousDate;
	}

	const handleEndDate = (newDate) => {
		setEndDate( newDate );
		updateSetting('df_popup_schedule_end_date', newDate);
	}

	const disableEndDate = (date) => {
		const currentDate = new Date(startDate);
		const previousDate = new Date(currentDate.setDate(currentDate.getDate() - 1));
    	return date < previousDate;
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

    return (
        <>
            {/* <PanelBody
                title = { __( 'General', 'divi_flash' ) }
                opened = { props.toggleactive === 'general' ? true : false }
                onToggle = {() => props.activeChange('general')}
            > */}
                <div className='main-content'>

                        <SettingsWrap label={__('Popup Status', 'divi_flash')} >
                            <ToggleControl
                                help={__('Turn ON to activate this popup to your website.', 'divi_flash')}
                                checked ={props.popupStatus}
                                onChange={ (value) => {
                                    updatePopupStatus(value);
                                    updateSetting('df_popup_enable', value);
                                } }
                            />
                        </SettingsWrap>

						<SettingsWrap label="Popup Target ID">
						{showToolTip && <div className="df-tooltip">{toolTipTxt}</div>}
							<div style={{ width: '50%' }}>
								<TextControl
									ref={inputRef}
									help={__('Use this ID for show Popup.', 'divi_flash')}
									value={`#popup_${popupId}`}
									onMouseEnter={showToolTipText}
									onMouseLeave={hideToolTipText}
									onClick={handleCopyClick}
									style={{ cursor: 'pointer' }}
									readOnly
								/>
								{/* <div ref={copyText} className="df_popup_tooltip" id="copyTooltip">
									Copied!
								</div> */}
							</div>
						</SettingsWrap>

                        <SettingsWrap label={__('Trigger Type', 'divi_flash')}>
                            <div style={{width: '50%'}}>
                                <Select
                                        value={ trigerType }
                                        defaultValue={[{value: 'on_load', label: __('On Load', 'divi_flash') }]}
										className="df-popup-select" classNamePrefix="df-popup-select"
                                        onChange={ ( newvalue ) => onChangeSlect( newvalue , 'df_popup_trigger_type' , setTrigerType ) }
                                        options={ [
                                            { value: 'click', label: __('Click', 'divi_flash') },
                                            { value: 'on_load', label: __('On Load', 'divi_flash') },
                                            { value: 'on_scroll', label: __('On Scroll', 'divi_flash') },
                                            { value: 'scroll_to_element', label: __('Scroll to Element', 'divi_flash') },
                                            { value: 'on_exit', label: __('On Exit', 'divi_flash') },
                                            { value: 'on_inactivity', label: __('On Inactivity', 'divi_flash') },
                                        ] }
                                />
                                <p className="select-help-text">{__('Define the action type to reveal the popup.', 'divi_flash')}</p>
                            </div>

                        </SettingsWrap>

                        {/*
                        <SettingsWrap label="Manual Trigger" >
                                <div style={{width: '50%'}}>
                                    <TextControl
                                        value={ data.df_popup_manual_trigger }
                                        onChange={ ( value ) => {
                                            updateSetting('df_popup_manual_trigger', value);
                                        } }
                                    />
                                </div>
                        </SettingsWrap> */}

                        <SettingsWrap label={__('CSS Selector', 'divi_flash')} show_if={condition({df_popup_trigger_type:'click'}, 'or')} >
                                <div style={{width: '50%'}}>
                                    <TextControl
                                        help={__('Define the CSS selector for the popup, eg: .class-here, #button-id', 'divi_flash')}
                                        value={ data.df_popup_custom_selector }
                                        onChange={ ( value ) => {
                                            updateSetting('df_popup_custom_selector', value);
                                        } }
                                    />
                                </div>
                        </SettingsWrap>

                        <SettingsWrap label={__('Delay', 'divi_flash')} show_if={condition({df_popup_trigger_type:'on_load'}, 'or')} >
                                <div style={{width: '50%'}}>
                                    <TextControl
                                        help={__('Define the delay time for popup once page loaded completely. Give the value only. The measurement unit is second.', 'divi_flash')}
                                        value={ data.df_popup_time_delay }
                                        onChange={ ( value ) => {
                                            updateSetting('df_popup_time_delay', value);
                                        } }
                                    />
                                </div>
                        </SettingsWrap>

                        <SettingsWrap label={__('Scrolling Trigger Offset', 'divi_flash')} show_if={condition({df_popup_trigger_type:'on_scroll'}, 'or')} >
                                <div style={{width: '50%'}}>
                                    <TextControl
                                        help={__('Define the offset distance from the top edge of the browser window. Offset value can be in pixel or percentage. By default is pixel.', 'divi_flash')}
                                        value={ data.df_popup_scrolling_offset }
                                        onChange={ ( value ) => {
                                            updateSetting('df_popup_scrolling_offset', value);
                                        } }
                                    />
                                </div>
                        </SettingsWrap>

                        <SettingsWrap label={__('Inactivity Duration', 'divi_flash')} show_if={condition({df_popup_trigger_type:'on_inactivity'}, 'or')} >
                                <div style={{width: '50%'}}>
                                    <TextControl
                                        help={__('Define the Inactivity Duration of a user to trigger the popup. The measurement unit is second.', 'divi_flash')}
                                        value={ data.df_popup_inactivity_time_delay }
                                        onChange={ ( value ) => {
                                            updateSetting('df_popup_inactivity_time_delay', value);
                                        } }
                                    />
                                </div>
                        </SettingsWrap>

                        <SettingsWrap label={__('Scroll to element trigger position', 'divi_flash')} show_if={condition({df_popup_trigger_type:'scroll_to_element'}, 'or')} >
                            <div style={{width: '50%'}}>
                                <Select
                                    value={ viewPort }
                                    defaultValue={[{value: 'on_bottom', label: __('On Bottom', 'divi_flash') }]}
                                    className="df-popup-select" classNamePrefix="df-popup-select"
                                    onChange={ ( newvalue ) => onChangeSlect( newvalue , 'df_popup_scroll_element_viewport' , setViewPort ) }
                                    options={ [
                                        { value: 'on_bottom', label: __('On Bottom', 'divi_flash') },
                                        { value: 'on_center', label: __('Center', 'divi_flash') },
                                        { value: 'on_top', label: __('On Top', 'divi_flash') },
                                    ] }
                                />
                                <p className="select-help-text">{__('Define the position to trigger the popup.', 'divi_flash')}</p>
                            </div>
                        </SettingsWrap>

                        <SettingsWrap label={__('Scroll to element trigger selector', 'divi_flash')} show_if={condition({df_popup_trigger_type:'scroll_to_element'}, 'or')} >
                                <div style={{width: '50%'}}>
                                    <TextControl
                                        help={__('Define the CSS selector of the element where the popup will trigger. This can be on a section, row or module. eg: .css-class, #css-id', 'divi_flash')}
                                        value={ data.df_popup_scroll_element_selector }
                                        onChange={ ( value ) => {
                                            updateSetting('df_popup_scroll_element_selector', value);
                                        } }
                                    />
                                </div>
                        </SettingsWrap>

                        <SettingsWrap label={__('Display Schedule', 'divi_flash')}>
                            <div style={{width: '50%'}}>
                                <Select
                                        value={scheduleType }
										className="df-popup-select" classNamePrefix="df-popup-select"
                                        onChange={ ( newvalue ) => onChangeSlect( newvalue , 'df_popup_schedule_type' , setScheduleType ) }
                                        options={ [
                                            { value: 'always', label: __('Always', 'divi_flash')} ,
                                            { value: 'date_and_time', label: __('Date And Time', 'divi_flash')},
                                            { value: 'recurring', label: __('Recurring', 'divi_flash')}
                                        ] }
                                />
                                <p className="select-help-text">{__('Schedule the time to display the popup on specific days, dates and time.', 'divi_flash')}</p>
                            </div>

                        </SettingsWrap>

                        <SettingsWrap label={__('Start from', 'divi_flash')} show_if={condition({df_popup_schedule_type:'date_and_time'}, 'or')} >
                                <div style={{width: '100%%'}}>

                                    <DateTimePicker
                                        currentDate={ startDate }
                                        onChange={ ( newDate ) => {
                                            setStartDate( newDate );
                                            updateSetting('df_popup_schedule_start_date', newDate);
                                        } }
                                        is12Hour={ true }
										isInvalidDate = {disableStartDate}
                                        __nextRemoveHelpButton
                                        __nextRemoveResetButton
                                    />
                                </div>


                        </SettingsWrap>

                        <SettingsWrap label={__('Ends at', 'divi_flash')} show_if={condition({df_popup_schedule_type:'date_and_time'}, 'or')} >
                                <div style={{width: '100%%'}}>

                                    <DateTimePicker
                                        currentDate={ endDate }
                                        onChange={handleEndDate}
                                        is12Hour={ true }
										isInvalidDate = {disableEndDate}
                                        __nextRemoveHelpButton
                                        __nextRemoveResetButton
                                    />
                                </div>


                        </SettingsWrap>

                        <SettingsWrap label={__('Recurs On', 'divi_flash')} show_if={condition({df_popup_schedule_type:'recurring'}, 'or')} description="">
                                <AllDays
                                    alldays = {alldays}
                                    onChangeDay={ onChangeDay }
                                    selectedDays = {selectedDays}
                                />

                        </SettingsWrap>


                        <SettingsWrap label={__('Closing CSS Selector', 'divi_flash')} >
                                <div style={{width: '50%'}}>
                                    <TextControl
                                        help={__('Define a css selector that will trigger to close the popup. You can use CSS ID or Class. eg: .css-class, #css-id', 'divi_flash')}
                                        value={ data.df_popup_close_link_selector }
                                        onChange={ ( value ) => {
                                            updateSetting('df_popup_close_link_selector', value);
                                        } }
                                    />
                                </div>
                        </SettingsWrap>


                        <SettingsWrap label={__('Prevent Page Scroll', 'divi_flash')} >
                            <ToggleControl
                                help={__('Disable page scrolling option when popup in viewport.', 'divi_flash')}
                                checked={ data.df_popup_prevent_scroll }
                                onChange={ (value) => {
                                    updateSetting('df_popup_prevent_scroll', value);
                                } }
                            />
                        </SettingsWrap>

                        <SettingsWrap label={__('Popup Content Scroll', 'divi_flash')} >
                            <ToggleControl
                                help={__('Popup Content scrolling Enable when popup content larger then window height', 'divi_flash')}
                                checked={ data.df_popup_content_scroll }
                                onChange={ (value) => {
                                    updateSetting('df_popup_content_scroll', value);
                                } }
                            />
                        </SettingsWrap>

                </div>
            {/* </PanelBody> */}

        </>
    )
}
export default General;
