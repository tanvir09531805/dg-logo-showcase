import './df_dashboard.scss';

import domReady from '@wordpress/dom-ready'
import {
    Fragment,
	createRoot,
    Component,
} from '@wordpress/element';

import Edit from './component/edit';

class App extends Component {
    constructor() {
		super( ...arguments );

	}

	render() {

		return (
            <Fragment>
            <div className="df-popup-plugin__header">
                <div className="df-popup-plugin__container">
                    <div className="df-popup-plugin__title">
                        <h1>DiviFlash Popup Settings</h1>
                    </div>
                </div>
            </div>
            <div className="df-popup-plugin__main">
                <div className="df-settings-content-area"><Edit /></div>
                {/* <div class="df-settings-sidebar-area">
                    <div class="df-sidebar-box df-doc-bar">
                        <h3 class="sidebar-title">Getting Started? Check help and docs</h3>
                        <p>Need more details? Please check our full documentation for detailed information on how to use Diviflash.</p>
                        <a target="_blank" href="https://www.diviflash.com/docs/">Read the docs</a>
                    </div>
                    <div class="df-sidebar-box df-doc-bar">
                        <h3 class="sidebar-title">Need Help?</h3>
                        <p>Didn't get what you need? Don't worry. Our dedicated support team will help you with anything.</p>
                        <a target="_blank" href="https://diviflash.freshdesk.com/support/home">Contact Support</a>
                    </div>
                </div> */}
            </div>
            </Fragment>
		)
	}
}


domReady( () => {
	const mountElm = document.getElementById( 'difl_popup_settings_container' );
	const root = createRoot(mountElm);
	root.render(<App/>);
} )
