import React, { Component } from 'react';
import lodash from 'lodash';

// Internal Dependencies
import './style.css';

class JsonExNotice extends Component {
	static slug = 'df_json_ex_notice';

	constructor( props ) {
		super( props );

		this.state = {
			df_general_json_support: false,
			apiLoaded: false,
			displayNotice: false
		}
	}

	componentDidMount() {
		if ( ! this.state.apiLoaded ) {
			window.wp.apiRequest( {
				path: '/wp/v2/settings'
			} ).then( ( res ) => {
				this.setState( { df_general_json_support: res.df_general_json_support, apiLoaded: true } )
			} )
		}
	}

	checkOptions = () => {
		let options = this.props.fieldDefinition.options;
		const props = this.props.moduleSettings;
		let _check = false;

		options = lodash.map( options, ( value, key ) => {
			if ( props[key] == value ) {
				return true;
			}
			return false;
		} )

		_check = Object.values( options ).every(
			value => value === true
		)

		return _check && ! this.state.df_general_json_support ? true : false;
	}

	render() {
		if ( this.checkOptions() && this.state.apiLoaded ) {
			return <div className='json-notice'>
				{ this.props.fieldDefinition.message ? this.props.fieldDefinition.message : ' Please enable the "JSON file upload" extension from ' }
				<a target="_blank"
				   href={ this.props.fieldDefinition.url ? this.props.fieldDefinition.url :`${window.ETBuilderBackendDynamic.site_url}/wp-admin/admin.php?page=diviflash` }>Dashboard</a>
			</div>;
		} else {
			return false;
		}
	}
}

export default JsonExNotice;