import './index.scss';
import domReady from '@wordpress/dom-ready'
import {createRoot,} from '@wordpress/element';
import {useState, useEffect} from '@wordpress/element';
import {ExportImport} from './ExportImport';
import $ from 'jquery';

import Edit from './edit';

const App = (props) => {
    const [init, setInit] = useState(true);

    const [copy, setCopy] = useState();

    useEffect(() => {
        if ($('#df-menu-dashboard').hasClass('show')) {
            setInit(true);
        }
    });

    const handleClose = () => {
        setInit(false);
        $('#df-menu-dashboard').removeClass('show');
        $('body').css('overflow', 'visible');
    }

    return init ? <Edit
            menu={props.menu}
            menuTitle={props.menuTitle}
            menuItemTitle={props.menuItemTitle}
            handleClose={handleClose}
            depth={props.depth.replace('menu-item-depth-', '')}
            hasSubmenu={props.hasSubmenu}
            submenu={props.submenu}
            copy={copy}
            setCopy={setCopy}
            menuId={props.menuId}/>
        : null;
}

domReady(() => {
    const mountElm = document.getElementById('df-menu-dashboard');
    let root = createRoot(mountElm);
    $('.df-menu-edit').on('click', function (ev) {
        root.unmount()
        root = createRoot(mountElm)
        const menu = document.querySelector('#update-nav-menu [name="menu"]').value;
        const hasSubmenu = ev.target.dataset.submenu;
        const menuId = ev.target.dataset.menuItemId;
        const menuItemTitle = ev.target.dataset.menuItemTitle;
        const submenu = ev.target.dataset.submenu;
        const depth = ev.target.dataset.depth;
        const menuTitle = ev.target.dataset.menuTitle;

        if (mountElm) {
            root.render(<App hasSubmenu={hasSubmenu}
                             menuTitle={menuTitle}
                             menu={menu}
                             depth={depth}
                             submenu={submenu}
                             menuId={menuId}
                             menuItemTitle={menuItemTitle}/>);
        }
    })
})

domReady(() => {
    const mountElm = document.getElementById('df-menu-export-import-modal');
    let root = createRoot(mountElm);
    $('#df-menu-export-import .icon').on('click', ev => {
        root.unmount()
        root = createRoot(mountElm)
        root.render(<ExportImport openModal={true}/>)
    })
})
