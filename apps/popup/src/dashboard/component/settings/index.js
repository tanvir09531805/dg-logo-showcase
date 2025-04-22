import { useEffect, useState } from '@wordpress/element';
import { withSelect, useSelect } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
import {
    Panel,
    PanelBody
} from '@wordpress/components';

import General from './general';
import Display from './display';
import Design from './design';
import Cookie from './cookie';

// import ImportExport from './importExport';

function Settings(props) {

    const [popupStatus, setpopupStatus] = useState(false);
    const [activetogle, setActivetogle] = useState('general');
    const [rolesData, setRolesData] = useState([]);
    const [pageData, setPageData] = useState([]);
    const [texonomiesData, setTexonomiesData] = useState([]);

    const popup_id = document.querySelector("#post_ID").value;
    useEffect(() => {
        const fetchData = async () => {
          try {
            const status = await apiFetch({ path: '/df-popup-settings/v2/get-popup-status', method: 'POST',data: { id: popup_id }
            })
            setpopupStatus(status);
          } catch (error) {
            console.error(error);
          }
        };
        fetchData();

    }, []);

    const updatePopupStatus = (value)=>{
        if(value === true){
            setpopupStatus(true);
        }else{
            setpopupStatus(false);
        }
        //setpopupStatus(value);
    }


    useEffect(() => {
        const fetchData = async () => {
          try {
            const pages = await apiFetch({ path: '/df-popup-settings/v2/get-all-page-data' });
            setPageData(pages);
          } catch (error) {
            console.error(error);
          }
        };
        fetchData();

    }, []);

    useEffect(() => {

			setActivetogle(props.settings);

			let mainContainer = document.querySelector(".df-popup-settings-container");
			setTimeout(() => {
				if (mainContainer.classList.contains(props.settings)) {
					mainContainer.classList.add("active");
				}
			}, 100)

    }, [props.settings]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const roles = await apiFetch({ path: '/df-popup-settings/v2/get-all-role-data' });
            setRolesData(roles);
          } catch (error) {
            console.error(error);
          }
        };
        fetchData();

    }, []);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const texonomies = await apiFetch({
                path: '/df-popup-settings/v2/get-all-texonomies',
             });
             setTexonomiesData(texonomies);
          } catch (error) {
            console.error(error);
          }
        };
        fetchData();

    }, []);

    const _onClickPanel = (activevalue) => {
        setActivetogle ( activevalue )
    }

    const postTypes = useSelect( (select) => {
        return select('core').getPostTypes()
    })
	const options = {
		context: 'view',
		per_page: 10,
		_fields: 'id,title',
	}
    const allpages = useSelect( (select) => {
        return select('core').getEntityRecords('postType', 'page', options)
    })

    const allposts = useSelect( (select) => {
        return select('core').getEntityRecords('postType', 'post', options)
    })

   const allRoleData = {'all':'All', 'guest':'Guest', ...rolesData};

   const allDeviceData = {'all':'All','desktop':'Desktop','tablet':'Tablet','mobile':'Mobile' };
   const toTitleCase = (str)=> {
    return str.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  }

    // return(<div className='df-popup-settings-container'>
    return(<div className={`df-popup-settings-container ${props.settings}`}>


        {props.settings === 'general' && (
            <General
            popupStatus={popupStatus}
            updatePopupStatus={(value) => updatePopupStatus(value)}
            className="general"
            toggleactive={activetogle}
            activeChange={_onClickPanel}
            data={props.data}
            updateSetting={(key, value) => props.onChange(key, value)}
        />
        )}


        {props.settings === 'display' && (
            <Display
                className="display"
                toggleactive={activetogle}
                activeChange={_onClickPanel}
                data={props.data}
                postTypes={postTypes}
                allpages={allpages}
                allposts={allposts}
                allroles = {allRoleData}
                alldevices = {allDeviceData}
                updateSetting={(key, value) => props.onChange(key, value)}
                conditionUpdate={(key, value) => props.conditionUpdate(key, value)}
                alltexonomies = {texonomiesData}
            />
        )}

        {props.settings === 'design' && (
            <Design
                className="design"
                toggleactive={activetogle}
                activeChange={_onClickPanel}
                data={props.data}
                updateSetting={(key, value) => props.onChange(key, value)}

            />
        )}

         {props.settings === 'cookie' && (
                <Cookie
                    className="cookie"
                    toggleactive={activetogle}
                    activeChange={_onClickPanel}
                    data={props.data}
                    updateSetting={(key, value) => props.onChange(key, value)}
               />
            )}


    </div>)
}
export default Settings;
