import api from '@wordpress/api';
import apiFetch from '@wordpress/api-fetch';

import {
    Button,
    Panel,
    PanelBody,
    Placeholder,
    SnackbarList,
    Spinner,
    ToggleControl,
} from '@wordpress/components';

import {
    dispatch,
    useDispatch,
    useSelect,
    withSelect,
    withDispatch
} from '@wordpress/data';

import { compose } from "@wordpress/compose";

import {
    Fragment,
    render,
    Component,
} from '@wordpress/element';

import { __ } from '@wordpress/i18n';

import _default from './default';
import Settings from './settings';

// Sidenav Icon
import generalIcon from '../assets/images/general_settings.svg'
import displayIcon from '../assets/images/display_settings.svg'
import designIcon from '../assets/images/design_settings.svg'
import cookieIcon from '../assets/images/cookie_settings.svg'

// Define convert to TitleCase function globally
window.convertTitleCase = function(str) {
    return str.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

class Edit extends Component {
    constructor(props) {
        super(props);

        this.state = {
			isAPILoaded: false,
            active: 'general',
			// sidenavIcons:{},
            popupId:'',
            data: {},
            changedData: {},
            saving: false,
            saveComplete: false,
            submitButtonDisable: true
		};
    }

    componentDidMount() {
        const _this = this;
        const popup_id = document.querySelector("#post_ID").value;
        apiFetch({
            path: '/df-popup-settings/v2/get-popup-item-data',
            method: 'POST',
            data: {
                id: popup_id
            }
        }).then((res) => {
            this.getPopupItem(popup_id, res )

        }).then(() => {
            this.setState({isAPILoaded: true})
            this.setState({popupId: popup_id})
        });

        if(document.getElementById("publish").value =='Publish'){
            this.setState({submitButtonDisable: true})
        }else{
            this.setState({submitButtonDisable: false})
        }

        var updateButton = document.getElementById("publish");
        updateButton.addEventListener("click", function() {
            var saveButton = document.querySelector(".df-button-wrap button");
             saveButton.click();
          });
	}
    componentDidUpdate(){
        
    }

    _onClick = (active) => {
        this.setState({active})
    }

    activeClass = (_class) => {
        return _class === this.state.active ? ' active' : '';
    }

    updateData = (key, value) => {
        const changedData = this.state.changedData;
        const data = this.state.data;

        changedData[key] = value;
        data[key] = value;

        this.setState({changedData: changedData, data: data});
    }
    conditionUpdate=(key, value) => {
        const changedData = this.state.changedData;
        const data = this.state.data;

        changedData[key] = value;
        data[key] = value;

        this.setState({changedData: changedData, data: data});
    }

    getPopupItem = (menuId, popupData) => {
        if(!popupData) return;
        if(popupData === 'default'){
            this.setState({data: _default});
        }else{
            this.setState({data: popupData});
        }
    }

    handleSave = (dataValue) => {
        const _this = this;
        const post_id = this.state.popupId
        _this.setState({saving: true});
        apiFetch( {
            path: '/df-popup-settings/v2/save-popup-item-data',
            method: 'POST',
            data: {
                id: post_id,
                settings: dataValue
            }
        } ).then( ( res ) => {
            _this.setState({saving: false, saveComplete: true});
            if(document.getElementById("publish").value === 'Publish')
            {
                setTimeout(() => {
                    document.getElementById("publish").click();
                }, 1000);

            }
        } ).then(() => {
            setTimeout(() => {
                _this.setState({saveComplete: false});
            }, 1500);
        });
    }


    render() {
        const _this = this;
        const {
			isAPILoaded,
            active,
            data,
            changedData,
            saving,
            saveComplete
		} = this.state;
        if ( ! isAPILoaded ) {
			return (
				<Placeholder>
					<Spinner />
				</Placeholder>
			);
		}

        return(
            <Fragment>
                <div className='tabs'>
                    <div className={'tab' + this.activeClass('general')}
                        onClick={() => this._onClick('general')}
                    > <img src={generalIcon} alt='Nav Icon'/> <span className='df_popup_label'>{__('General', 'divi_flash')}</span> </div>
                    <div className={'tab' + this.activeClass('display')}
                    onClick={() => this._onClick('display')}
                    > <img src={displayIcon} alt='Nav Icon'/> <span className='df_popup_label'>{__('Display', 'divi_flash')}</span> </div>
                    <div className={'tab' + this.activeClass('design')}
                    onClick={() => this._onClick('design')}
                    > <img src={designIcon} alt='Nav Icon'/> <span className='df_popup_label'>{__('Design', 'divi_flash')}</span> </div>

                    <div className={'tab' + this.activeClass('cookie')}
                    onClick={() => this._onClick('cookie')}
                    > <img src={cookieIcon} alt='Nav Icon'/> <span className='df_popup_label'>{__('Cookie', 'divi_flash')}</span> </div>
                </div>
                <div className='content_area'>
                    <Settings
                        settings={this.state.active}
                        data={this.state.data}
                        onChange={(key, value) => this.updateData(key, value)}
                        conditionUpdate= {(key, value) => this.conditionUpdate(key, value)}
                    />
                    <div className='df-button-wrap'>
                        <Button
                            // disabled={this.state.submitButtonDisable ? true: false}
                            // isPrimary={true}
                            onClick={ () => this.handleSave(data) }
                        >
                            { __( 'Save Changes', 'divi_flash' ) }
                        </Button>
                        { saving || saveComplete ?
                        <div className='df-popup-notice'>
                            {saving ? 'Saving...' : ''}
                            {saveComplete ? 'Popup has been saved successfully.' : ''}
                        </div> : '' }
                    </div>

                </div>

            </Fragment>

        )
    }



}
export default Edit;

