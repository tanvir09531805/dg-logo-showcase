import {__} from "@wordpress/i18n";
import {Modal, FormFileUpload, Button} from '@wordpress/components';
import {useState} from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

const download = (content, fileName, contentType) => {
    const a = document.createElement("a");
    const file = new Blob([content], {type: "application/json"});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}
const Menu_Modal = ({setShowModal, children, ...props}) => {
    const closeModal = () => setShowModal(false);

    return (
        <>
            <Modal onRequestClose={closeModal} {...props}>
                {children}
            </Modal>
        </>
    );
};

const TabList = ({tabIds, getData, ...props}) => {
    const [selectedTab, setSelectedTab] = useState(tabIds[0])
    const handleSelectedTab = (tab, e) => {
        setSelectedTab(tab)
    }
    const contentHeader = tabId => getData(tabId, 'label')
    const renderContent = tabId => getData(tabId, 'content')
    const TabItem = (tab) => <div className={'header-item ' + (tab === selectedTab ? 'active' : '')} key={tab}
                                  id={tab}
                                  onClick={(e) => handleSelectedTab(tab, e)}>
        <div className="label">{contentHeader(tab)}</div>
    </div>
    return (
        <div className="tablist" {...props}>
            <header className='tab-header'>
                {tabIds.map(tab => TabItem(tab))}
            </header>

            <div className="tab-content">
                {renderContent(selectedTab)}
            </div>
        </div>
    )
}

const Export = () => {
    const menuName = document.getElementById('menu-name').value;
    const handleExport = () => {
        const menuId = document.getElementById('menu').value;
        apiFetch({
            path: '/df-menu-settings/v2/df-am-export-menu',
            method: 'POST',
            data: {
                id: menuId,
            }
        }).then((res) => {
            download(res, menuName, 'application/json');
        });
        return false;
    }

    return (
        <>
            <div className="content">
                <h4 className='title'>{__('EXPORT FILE NAME', 'divi_flash')}</h4>
                <div className="menu-name">
                    {menuName ? menuName : __('NO MENU SELECTED', 'divi_flash')}
                </div>
            </div>
            <Button disabled={menuName === ''} className='action download' onClick={handleExport}>{__('Download Now', 'divi_flash')}</Button>
        </>
    )
}

const Import = () => {
    const [fileName, setFileName] = useState('');
    const [settings, setSettings] = useState('');
    const handleImport = () => {
        let menuId = document.getElementById('menu').value;
        if (menuId === '0') {
            menuId = fileName.replace('.json', '');
        }
        console.log("settings", settings)
        apiFetch({
            path: '/df-menu-settings/v2/df-am-import-menu',
            method: 'POST',
            data: {
                settings: settings,
                menuId: menuId
            }
        }).then((res) => {
            if (res.success) {
                location.replace(res.redirectURL)
            }
        });
    }
    return (
        <>
            <div className="content">
                <h4 className='title'>{__('CHOOSE FILE', 'divi_flash')}</h4>
                <div className="choose-file">
                    <div className="file-name">
                        {fileName ? fileName : __('NO FILE SELECTED', 'divi_flash')}
                    </div>
                    <FormFileUpload
                        accept="json/*"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            setFileName(file?.name)
                            const reader = new FileReader();
                            reader.onload = (event) => {
                                setSettings(event.target.result)
                            };
                            reader.readAsText(file)
                        }}
                    >
                        {__('CHOOSE FILE', 'divi_flash')}
                    </FormFileUpload>
                </div>
            </div>
            <Button disabled={fileName===''} className='action import' onClick={handleImport}>{__('Import Now', 'divi_flash')}</Button>
        </>
    )
}
const Content = () => {
    const settings = [
        {
            id: 'export',
            label: __('Export', 'divi_flash'),
            content: <Export/>
        },
        {
            id: 'import',
            label: __('Import', 'divi_flash'),
            content: <Import/>,
        }]

    const getTabDetails = (id, key) => {
        const tab = settings.find(tab => tab.id === id)
        return tab[key]
    }

    return (
        <>
            <TabList
                className='settings'
                tabIds={settings.map(tab => tab.id)}
                getData={getTabDetails}
            />
        </>
    )
}

export const ExportImport = ({openModal}) => {
    const [showModal, setShowModal] = useState(openModal);
    const config = {
        shouldCloseOnClickOutside: true,
        title: __('Import Export Menu', 'divi_flash'),
        size: 'medium',
        shouldCloseOnEsc: true,
        shouldCloseOnOverlayClick: true,
        className: 'df-menu-modal'
    }
    return (
        <>
            {
                showModal ?
                    <Menu_Modal setShowModal={setShowModal} {...config}>
                        <Content/>
                    </Menu_Modal> : null
            }
        </>
    )

}
