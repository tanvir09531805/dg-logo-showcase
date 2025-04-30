import { useState, useEffect } from '@wordpress/element';

import SubmenuType from './partial/subMenuType';

import IconSettings from './partial/iconSettings';

import TooltipSettings from './partial/tooltipSettings';

import BadgeSettings from './partial/badgeSettings';

import DefaultMegaMenu from './partial/defaultMegaMenu';

import MegaMenuPosition from './partial/megaMenuPosition';

import Condition from './elements/conditions';

import _default from './default';

function Main(props) {

    const handleChange = (key, value) => {
        let newData = {
            ...props.data,
            [key]: value
        };
        props.onChange(newData.menu_item_id, JSON.stringify(newData), key);
    }

    const checkParentMegaMenu = () => {
        if(!props.menuData[Number(props.data.menu_item_parent_id)]) return false;
        const parentData = JSON.parse(props.menuData[Number(props.data.menu_item_parent_id)]);
        
        if(parentData.mega_menu) {
            return true;
        }
        return false;
    }

    const getColumn = () => {
        if(!props.menuData[Number(props.data.menu_item_parent_id)]) return false;
        const parentData = JSON.parse(props.menuData[Number(props.data.menu_item_parent_id)]);

        return parentData.mega_menu_column;
    }

    if(!props.data) return false;

    return(<>
        <div className='dfmd-settings-wrap'>
            <div className='dfmd-settings-notice'>
                These settings only effect on DiviFlash Advanced Menu Module.
            </div>
            <Condition conditions={{
                    show_if_not: {submenu_type: 'divi_layout'}
                }} data={props.data}>
                {props.depth === '0' ?
                    <DefaultMegaMenu data={props.data} depth={props.depth}
                        onChange={(key, value) => handleChange(key, value)} /> : '' }
            </Condition>
            
            {props.depth === '1' && checkParentMegaMenu() ? 
                <MegaMenuPosition data={props.data} depth={props.depth} column={getColumn()}
                    onChange={(key, value) => handleChange(key, value)} /> : '' }

            <Condition conditions={{
                    show_if_not: {mega_menu: true}
                }} data={props.data}>
                {props.depth === '0' ? 
                    <SubmenuType data={props.data} 
                        onChange={(key, value) => handleChange(key, value)} /> : ''}
            </Condition>
            
            <IconSettings data={props.data}
                onChange={(key, value) => handleChange(key, value)} />
            <TooltipSettings data={props.data}
                onChange={(key, value) => handleChange(key, value)} />
            <BadgeSettings data={props.data}
                onChange={(key, value) => handleChange(key, value)} />
        </div>
    </>)
}
export default Main;