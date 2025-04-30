import { useEffect, useState } from '@wordpress/element';

import {PanelBody, TextControl, Button, CheckboxControl, SelectControl, select } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import {SettingsWrap, SettingsGroup, Condition} from '../elements';
import Select from 'react-select';
import _ from 'lodash';
import $ from 'jquery';

function Cookie(props) {
    const { data } = props;
    const [activityType, setActvityType] = useState([]);
    const [periodType, setPeriodType] = useState([]);

    const onChangeSlect = ( newvalue , key, setStateValue ) => {
        updateSetting(key, newvalue.value); // Database value save using key value
        setStateValue(newvalue)
	}

    // React Select Data structure
    useEffect( () => {
        setActvityType( { value: data.df_popup_activity_type, label: convertTitleCase(data.df_popup_activity_type) } )
    }, [] )

    useEffect( () => {
        setPeriodType( { value: data.df_popup_activity_period_type, label: convertTitleCase(data.df_popup_activity_period_type) } )
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


    return (<>
            {/* <PanelBody
                title = { __( 'Cookie', 'divi_flash' ) }
                opened = { props.toggleactive === 'cookie' ? true : false }
                onToggle = {() => props.activeChange('cookie')}
            > */}
            <div className='main-content'>
                    <SettingsWrap label={__('Cookie Activity', 'divi_flash')}>
                        <div style={{width: '50%'}}>
                            <Select
                                help={__('Control Popup Activity', 'divi_flash')}
                                value={ activityType }
								className="df-popup-select" classNamePrefix="df-popup-select"
                                onChange={ ( newvalue ) => onChangeSlect( newvalue , 'df_popup_activity_type' , setActvityType ) }
                                options={ [
                                    { value: 'never', label: __('Never', 'divi_flash')},
                                    { value: 'per_period', label: __('Per Period', 'divi_flash')},
                                    { value: 'once_only', label: __('Once Only', 'divi_flash')},
                                ] }
                            />
                             <p className="select-help-text">{__('Control Popup Activity.', 'divi_flash')}</p>
                        </div>
                    </SettingsWrap>


                    <SettingsWrap label={__('Period Type', 'divi_flash')} show_if={condition({df_popup_activity_type: 'per_period'} , 'or')}>
                        <div style={{width: '50%'}}>
                            <Select
                                help={__('Control the contents display position', 'divi_flash')}
                                value={ periodType }
                                // onChange={ ( value ) => {
                                //     updateSetting('df_popup_activity_period_type', value);
                                // } }
								className="df-popup-select" classNamePrefix="df-popup-select"
                                onChange={ ( newvalue ) => onChangeSlect( newvalue , 'df_popup_activity_period_type' , setPeriodType ) }
                                options={ [
                                    { value: 'hour', label: __('Hour', 'divi_flash')},
                                    { value: 'day', label: __('Day', 'divi_flash')},
                                    { value: 'month', label: __('Month', 'divi_flash')},
                                ] }

                            />
                            <p className="select-help-text">{__('Display the popup after the Period Type (Hour/Day/Month)', 'divi_flash')}</p>
                        </div>
                    </SettingsWrap>

                    <SettingsWrap label={__('Period Value', 'divi_flash')} show_if={condition({df_popup_activity_type: 'per_period'} , 'or')}>
                        <div style={{width: '50%'}}>
                            <TextControl
                                help={__('Period Value.', 'divi_flash')}
                                value={ data.df_popup_activity_period_value }
                                onChange={ ( value ) => {
                                    updateSetting('df_popup_activity_period_value', value);
                                } }
                            />
                        </div>
                    </SettingsWrap>


           </div>
        {/* </PanelBody> */}
    </>)
}

export default Cookie;
