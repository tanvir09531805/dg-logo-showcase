import { useEffect, useState } from '@wordpress/element';
import { useEntityRecords } from '@wordpress/core-data';
import { withSelect, useSelect } from '@wordpress/data';
import {PanelBody, TextControl, Button, CheckboxControl, SelectControl, select } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import {SettingsWrap, SettingsGroup, Divider , CustomPostType, AllPages , AllRoles , AllDevices} from '../elements';

import Conditions from './conditions';


import $ from 'jquery';

function Display(props) {
    const { data } = props;
    const [selectedRoles, setSelectedRoles] = useState(data.df_popup_display_user_roles);
    const [selectedDevices, setselectedDevices] = useState( data.df_popup_display_user_devices);
    useEffect( () => {
        const values = Object.values(data.df_popup_display_user_roles);
        const default_roles = values.includes("all")  ?  Object.keys(props.allroles) : data.df_popup_display_user_roles;
        setSelectedRoles(default_roles);
        updateSetting('df_popup_display_user_roles', default_roles );
    }, [] )

    const onChangeCheckbox = (role) => {

        if (selectedRoles.includes(role)) {
            const selectRoleArray = selectedRoles.filter(item => item !== 'all');
            if(role !=='all'){
                const updatedArray = selectedRoles.filter((item) => item !== role );
                const removeAll = updatedArray.filter(item => item !== 'all');
                setSelectedRoles(removeAll);
                updateSetting('df_popup_display_user_roles', removeAll );
            }else{
                setSelectedRoles(selectRoleArray);
                updateSetting('df_popup_display_user_roles', selectRoleArray );
            }

            if(role === 'all'){
                setSelectedRoles([]);
                updateSetting('df_popup_display_user_roles', [] );
            }

        } else {
            const selectRoleArray = [...selectedRoles, role];
            setSelectedRoles(selectRoleArray);
            updateSetting('df_popup_display_user_roles', selectRoleArray );
            // When click public, state value replace by ["public"]
            if(role === 'all'){
                const roleArray = Object.keys(props.allroles);
                setSelectedRoles(roleArray);
                updateSetting('df_popup_display_user_roles', roleArray );

            }
        }

    };

    const onChangeDevice = (device) => {

        if (selectedDevices.includes(device)) {
            const selectDeviceArray = selectedDevices.filter(selectedDevice => selectedDevice !== device);
            if(device !=='all'){
                const updatedArray = selectDeviceArray.filter((item) => item !== 'all');
                setselectedDevices(updatedArray);
                updateSetting('df_popup_display_user_devices', updatedArray );
            }else{
                setselectedDevices(selectDeviceArray);
                updateSetting('df_popup_display_user_devices', selectDeviceArray );
            }

            if(device === 'all'){
                setselectedDevices([]);
                updateSetting('df_popup_display_user_devices', [] );
            }
        } else {
            const selectDeviceArray = [...selectedDevices, device];
            setselectedDevices(selectDeviceArray);
            updateSetting('df_popup_display_user_devices', selectDeviceArray );

            // When click All , state value replace by ["all"]
            if(device === 'all'){
                setselectedDevices(['all', 'desktop','tablet', 'mobile']);
                updateSetting('df_popup_display_user_devices', ['all', 'desktop','tablet', 'mobile'] );
            }
        }

    };


    const updateSetting = (key, value) => {
        props.updateSetting(key, value);
    }


    // const condition = (obj = {}, operator='and') => {
    //     let _check = false;
    //     obj = lodash.map(obj, (value, key) => {
    //         if(data[key] == value) {
    //             return true;
    //         } return false;
    //     })
    //     if (operator === 'and') {
    //         _check = Object.values(obj).every(
    //             value => value === true
    //         );
    //     } else if( operator === 'or' ) {
    //         _check = Object.values(obj).some(
    //             value => value === true
    //         );
    //     }
    //     return _check;
    // }

    const { records, isResolving } = useEntityRecords( 'postType', 'postType' );

    return (<>
    {/* <PanelBody
                title = { __( 'Display', 'divi_flash' ) }
                opened = { props.toggleactive === 'display' ? true : false }
                onToggle = {() => props.activeChange('display')}
            > */}
        <div className='main-content'>
                <SettingsWrap
                    label={__('Specify User Role', 'divi_flash')}
                    description={__('Show the popup exclusively to specific user roles.', 'divi_flash')}>
                        {/* <AllRoles allroles={props.allroles}/> */}

                    <AllRoles
                        allroles = {props.allroles}
                        onChange={ onChangeCheckbox }
                        selectedRoles = {selectedRoles}
                    />
                </SettingsWrap>

                <SettingsWrap
                    label={__('Specify User Device', 'divi_flash')}
                    description={__("Show the popup exclusively on the chosen user device.", 'divi_flash')}>
                        {/* <AllRoles allroles={props.allroles}/> */}

                        <AllDevices
                            alldevices = {props.alldevices}
                            onChange={ onChangeDevice }
                            selectedDevices = {selectedDevices}
                        />
                </SettingsWrap>
                {/* disableLabel ={ true } customClass="disable_label" */}
                <SettingsWrap disableLabel ={ true } customClass="disable_label">
                    <Conditions
                        postTypes={props.postTypes}
                        value={data.df_popup_display_condition}
                        conditionUpdate={(key, value) => updateSetting(key, value)}
                        data={props.data}
                        alltexonomies ={props.alltexonomies}
                    />
                </SettingsWrap>

        </div>
        {/* </PanelBody> */}
    </>)
}


export default Display;
