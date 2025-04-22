import { useState, useEffect } from '@wordpress/element';
import {
    SelectControl,
    TextControl,
    ColorPicker,
    Dropdown,
    Button
} from '@wordpress/components';

import _ from 'lodash';

import fontData from '../elements/fontData.json';

function IconSelect(props) {
    const [search, setSearch] = useState('');

    const [activeIcon, setActiveIcon] = useState(props.value);

    const searchFilter = (icons) => {
        icons = search !== '' ? _.filter(icons, function(item) {
            return item.search_terms.includes(search);
        }) : icons;
        return icons;
    }

    const renderIconList = () => {
        return _.map(searchFilter(fontData), function(icon, i) {
            var _class = icon.is_divi_icon ? '' : 'et-pb-fa-icon';
            _class += !icon.is_divi_icon && icon.font_weight === 900 ? ' et-pb-black-icon' : ' et-pb-line-icon';
            _class += _.isEqual(icon, activeIcon) ? ' active-icon': '';
            return <li
                key={i}
                className={_class}
                data-icon={icon.unicode} 
                data-icon-font-weigh={icon.font_weight}
                data-icon-font-family={icon.is_divi_icon ? 'ETmodules': 'FontAwesome'}
                data-iconindex={icon.index}
                dangerouslySetInnerHTML={{__html: icon.unicode}}
                onClick={(e) => {
                    props.onClick(e, icon);
                    setActiveIcon(icon)
                }}
            />
        })
    }

    return(<>
        <TextControl 
            value={search}
            onChange={value => setSearch(value)}
            className="dfmd-icon-serachbox"
        />
        <div className='dfmd-icon-select-wrap'>
            <ul id="et-fb-icon_picker" 
            className='et-fb-font-icon-list et-fb-modal-allow-scroll-ext et-fb-allow-mouse-wheel'>
                {renderIconList()}
            </ul>
        </div>
    </>)
}
function IconPicker(props) {

    const handleClick = (icon) => {        
        props.onClick(icon);
    }

    const iconPreview = (icon) => {
        if(!icon) return;
        var _class = icon.is_divi_icon ? '' : 'et-pb-fa-icon';
        _class += !icon.is_divi_icon && icon.font_weight === 900 ? ' et-pb-black-icon' : ' et-pb-line-icon';
        _class += ' dfmd-selected-icon';

        return <span className={_class} dangerouslySetInnerHTML={{__html: icon.unicode}}/>
    }
    return(<>
        <Dropdown
            className="dfmd-blocks-icon-picker-container-class-name"
            contentClassName="dfmd-blocks-icon-picker-popover-content-classname"
            popoverProps={ { placement: 'top-end', inline:true } }
            renderToggle={ ( { isOpen, onToggle } ) => (
                <Button
                    className="dfmd-blocks-icon-picker"
                    onClick={ onToggle }
                    aria-expanded={ isOpen }
                >
                    {iconPreview(props.value)} Select Icon
                </Button>
            ) }
            renderContent={ (isOpen) => (
                <div>
                    <IconSelect 
                        value={props.value}
                        onClick={(e, icon) => {
                            handleClick(icon)
                            if(e.detail === 2) {
                                isOpen.onToggle();
                            }
                        }}
                    />
                </div>
            )}
        />
    </>)
}
export default IconPicker;