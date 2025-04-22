import _ from 'lodash';

import { useState, useEffect } from '@wordpress/element';

import _default from './default';

function SideBar(props) {
    const reArrangeData = (data) => {
        let newData = data.filter(item => {
            if(item.menu_item_parent && item.menu_item_parent !== '0') {
                const parent = props.data.filter(_i => {
                    return _i.ID == item.menu_item_parent;
                })
                item['depth'] = String(parseInt(parent[0].depth) + 1);
            } else {
                item['depth'] = '0';
            }
            
            return item;
        });
        return newData;
    }

    if(!props.data) return false;

    return _.map(reArrangeData(props.data), (item) => {
        const _id = 'menu-item-' + item.ID;
        const itemData = JSON.parse(props.menuData[item.ID]);
        let identifier = '';

        // adding a identifier if the item is edited
        if(Object.keys(itemData).length > 4) {
            identifier = <span className='edited'></span>;
        }

        let _classes = `menu-item menu-item-depth-` + item.depth;
        _classes = props.selected && String(props.selected.menu_item_id) === String(item.ID) ?
        _classes + ' active' : _classes;
        return <li id={_id} className={_classes} key={_id}
            onClick={() => props.onClick(item.ID, item.depth)}
        >{item.title} {identifier}</li>
    })
}
export default SideBar;