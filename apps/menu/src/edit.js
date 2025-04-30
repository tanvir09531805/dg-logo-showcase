import apiFetch from '@wordpress/api-fetch';

import { useState, useEffect } from '@wordpress/element';

import {
    Icon,
    Button,
    Spinner,
    Placeholder,
    Modal
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import Main from './main';
import SideBar from './sidebar';

import _default from './default';

function Edit(props) {

    const [init, setInit] = useState(false);

    const [apiLoaded, setApiLoaded] = useState(false);

    const [menuData, setMenuData] = useState();

    const [selectedData, setSelectedData] = useState();

    const [selectedId, setSelectedId] = useState();

    const [data, setData] = useState(_default);

    const [save, setSave] = useState(false);

    const [sidebarData, setSidebarData] = useState();

    const [activeTitle, setActiveTitle] = useState("");

    const [depth, setDepth] = useState(props.depth);

    const [copiedData, setCopiedData] = useState();

    const [notice, setNotice] = useState('');

    const [initialData, setInitialData] = useState();

    const [isOpen, setOpen] = useState(false);

    const [isCopyNotice, setCopyNotice] = useState(false);

    const [copyPasteNotice, setCopyPasteNotice] = useState('');

    useEffect(() => {
        if(save) {
            setTimeout(() => {
                setSave(false);
                setNotice('');
            }, 2000);
        }
        if(isCopyNotice) {
            setTimeout(() => {
                setCopyNotice(false);
                setCopyPasteNotice('');
            }, 800)
        }
    })

    useEffect(() => {
        if(init) return;
        // get the nav menu items data
        apiFetch({
            path: '/df-menu-settings/v2/get-nav-menu-items',
            method: 'POST',
            data: {
                id: parseInt(props.menu)
            }
        }).then((res) => {
            const _data = JSON.parse(res);
            setInit(true);
            setMenuData(_data);
            setInitialData(_data);
            setApiLoaded(true);
            getMenuItem(parseInt(props.menuId), _data);
        })
        // get the sidebar data
        apiFetch({
            path: '/df-menu-settings/v2/get-nav-menu',
            method: 'POST',
            data: {
                id: parseInt(props.menu)
            }
        }).then((res) => {
            setSidebarData(res);
        });

        return () => {
            setMenuData();
            setSidebarData();
        };
    }, []);

    /**
     * set initial item title.
     * depends on sidebar data.
     * when the data is not empty then set
     * the title.
     * 
     */
    useEffect(() => {
        if(sidebarData) {
            const title = sidebarData.filter(item => {
                return item.ID === parseInt(props.menuId);
            })
            setActiveTitle(title[0].title);  
        }
    }, [sidebarData]);

    /**
     * Set state data by the given menu item id
     * - selectedData
     * - selectedId
     * 
     * @param {*} menuId 
     */
    const getMenuItem = (menuId, menuData) => {
        if(!menuData) return;
        if(menuData[menuId]) {
            const _data = {
                ..._default,
                ...JSON.parse(menuData[menuId])
            }
            setSelectedData(_data);
        } else {
            const _data = {
                ..._default,
                menu_item_id: menuId
            }
            setSelectedData(_data);
        }   
        // may not be necessary
        setSelectedId(menuId);
    }
    /**
     * Hadle the data save.
     * - save
     * 
     */
    const handleSave = () => {
        let newData = menuData;
        setNotice('Saving...');
        apiFetch({
            path: '/df-menu-settings/v2/save-nav-menu-items',
            method: 'POST',
            data: {
                id: props.menu,
                menu: newData
            }
        }).then((res) => {
            setNotice('Save Successfully');
            setSave(true);
            setInitialData(menuData);
        });
    }
    /**
     * Handle save & exit
     * - save
     * - save
     * - init
     * - apiLoaded
     * 
     */
    const handleSaveExit = () => {
        let newData = menuData;
        setNotice('Saving...');
        apiFetch({
            path: '/df-menu-settings/v2/save-nav-menu-items',
            method: 'POST',
            data: {
                id: props.menu,
                menu: newData
            }
        }).then((res) => {
            setNotice('');
            setSave(true);
            setInit(false);
            setApiLoaded(false);
            props.handleClose();
        });
    }
    /**
     * Handle the data change for menu item.
     * - state
     * - menuData
     * - selectedData
     * 
     * @param {*} id 
     * @param {*} data 
     */
    const handleChange = (id, data, key = null) => {
        let newData = {
            ...menuData,
            [id]: data
        }
        setMenuData(newData);
        setSelectedData(JSON.parse(data));
        if(key === 'mega_menu_column') {
            handleColumnChange(newData, id, JSON.parse(data)[key]);
        }
    }
    /**
     * Handle the column change for mega menu.
     * When the column change re-calculate the item_position for
     * child items.
     * 
     * @param {*} newData 
     * @param {*} id 
     * @param {*} value 
     */
    const handleColumnChange = (newData, id, value) => {
        _.map(newData, (item, key) => {
            item = JSON.parse(item);
            if(item.menu_item_parent_id === id) { 
                if(item.item_position) {
                    if(Number(item.item_position) > Number(value)) {
                        item.item_position = Number(value);
                    }
                }
            }
            newData[key] = JSON.stringify(item);
        })
        setMenuData(newData)
    }

    /**
     * Handle reset event for menu item.
     * - state
     * - menuData
     * - selectedData
     * 
     */
    const handleReset = () => {
        const _selectedData = {
            menu_item_id: selectedData.menu_item_id,
            menu_item_parent_id: selectedData.menu_item_parent_id,
            parent_mega_menu: null,
            parent_mega_menu_column: null
        }
        const newData = {
            ...menuData,
            [selectedId]: JSON.stringify(_selectedData)
        }
        setMenuData(newData);
        setSelectedData(_selectedData);
    }
    /**
     * Handle copy
     * - state
     * - cpoiedData
     * 
     */
    const handleCopy = () => {
        setCopiedData(selectedData);
        setCopyPasteNotice('Copied Successfully');
        setCopyNotice(true);
    }
    /**
     * Handle paste
     * - state
     * - nemuData
     * - selectedData
     * 
     */
    const handlePaste = () => {
        const _copiedData = copiedData;
        delete _copiedData.menu_item_id;

        const itemData = {
            ...copiedData,
            ..._copiedData,
            menu_item_id: selectedId
        }
        const newData = {
            ...menuData,
            [selectedId]: JSON.stringify(itemData)
        }
        setMenuData(newData);
        setSelectedData(itemData);
        setCopyPasteNotice('Paste Successfully');
        setCopyNotice(true);
    }
    /**
     * Handle click event for sidebar items.
     * - getMenuItem
     * - activeTitle
     * 
     * @param {*} id 
     */
    const handleLinkClick = (id, depth) => {
        getMenuItem(id, menuData);
        const title = sidebarData.filter(item => {
            return item.ID === id;
        })
        setActiveTitle(title[0].title);
        setDepth(depth);
    }

    if (!apiLoaded) {
        return (
            <Placeholder>
                <Spinner />
            </Placeholder>
        );
    }

    const openModal = () => setOpen( true );
    const closeModal = () => {
        setInit(false);
        setApiLoaded(false);
        setOpen(false);
        props.handleClose();
    };

    const closeModalOnly = () => {
        setOpen(false);
    }

    return(
        <>  { isOpen && (
                <Modal title="Looks like there is some unsaved Data." onRequestClose={closeModalOnly}>
                    <Button variant="secondary" onClick={ closeModal }>
                        Close anyway
                    </Button>
                    <Button variant="secondary" onClick={ () => {
                        handleSaveExit();
                    } }>
                        Save & Close
                    </Button>
                </Modal>
            ) } 
            { isCopyNotice && (
                <Modal className='copy-notice' onRequestClose={closeModalOnly}>
                    {copyPasteNotice}
                </Modal>
            ) } 
            
            <div className='main-area'>
                <div className='header'>
                    <div className='siderbar-header'>
                        <h4 className='menu-name'>Menu: {props.menuTitle}</h4>
                    </div>
                    <div className='main-header'>
                        <div className='df-mod-header'>
                            <h4 className="modal-title">
                                <label>Now Editing:</label> 
                                <span>{activeTitle}</span>
                                <Button 
                                    className='reset-menu-item'
                                    onClick={() => handleReset()}
                                    showTooltip={true}
                                    shortcut="reset"
                                ></Button>
                                <Button 
                                    className='copy-menu-item'
                                    onClick={() => handleCopy()}
                                    showTooltip={true}
                                    shortcut="copy"
                                ></Button>
                                <Button 
                                    className='paste-menu-item'
                                    onClick={() => handlePaste()}
                                    showTooltip={true}
                                    shortcut="paste"
                                    disabled={copiedData ? false : true }
                                ></Button>
                            </h4>
                            <Button
                                className='close-settings-modal'
                                onClick={() => {
                                    if(_.isEqual(menuData, initialData)) {
                                        setInit(false);
                                        setApiLoaded(false);
                                        props.handleClose();
                                    } else {
                                        setOpen(true);
                                    } 
                                }}
                            >M</Button>
                        </div>
                    </div>
                </div>
                <div className='main'>
                    <div className='sidebar'>
                        <ul className='menu-sidebar'>
                            <SideBar data={sidebarData} selected={selectedData} 
                                menuData={menuData}
                                onClick={(id, depth) => handleLinkClick(id, depth)} />
                        </ul>
                    </div>
                    <div className='dfmd-wrap'>
                        <Main depth={depth} data={selectedData} menuData={menuData}
                            onChange={(id, data, key) => handleChange(id, data, key)}/>

                        <div className="df-submit-wrap">
                            <p className='successful-notice show'>{notice}</p>
                            <Button className='df-item-submit df-item-save' 
                                onClick={() => handleSave()}>Save</Button>
                            <Button className='df-item-submit df-item-save-exit' 
                                onClick={() => handleSaveExit()}>Save & Exit</Button>
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default Edit;