import { __ } from '@wordpress/i18n'
import { useEffect, useState, useRef, Fragment } from '@wordpress/element'
import { SettingsHeader } from '../../pages/settings'
import { ButtonIcon, SelectField, ToggleField } from '../common/Fields'
import { useIsMount } from '../../hooks/useIsMount'
import { storeSettings } from '../../utils/utils'
import { SettingsIcon } from '../../icons/icons'
import { CheckboxControl, FormFileUpload, TextControl, Button } from '@wordpress/components'

const AllRoles = () => {
	const isMount = useIsMount()
	const [ roles, setRoles ] = useState( diflSettings?.settings?.df_hide_admin_bar_roles ?? {} )
	const handleCheckBox = ( value, role ) => {
		setRoles( prevRoles => (
			{ ...prevRoles, [role]: value }
		) )
	}

	useEffect( () => {
		if ( isMount ) {
			return
		}
		storeSettings( [ { id: 'df_hide_admin_bar_roles', value: roles } ] )
	}, [ roles ] )

	const allRoles = diflSettings?.roles

	return (
		<div className="roles">
			{ Object.keys( allRoles ).map( role => (
				<CheckboxControl
					checked={ roles[role] ?? false }
					onChange={ ( val ) => handleCheckBox( val, role ) }
					label={ allRoles[role] }
					key={ role }
				/>
			) ) }
		</div>
	)
}

const ProjectCPTFields = () => {
	const isMount = useIsMount()
	const [ cptSettings, setCptSettings ] = useState( diflSettings?.settings?.df_project_cpt_rename_option ?? {} )
	const [ fileName, setFileName ] = useState( cptSettings?.icon ?? '' )
	const fields = [
		{
			id: 'singular_name',
			label: __( 'Singular Name', 'divi_flash' ),
			type: 'text',
			placeholder: 'Project',
		},
		{
			id: 'plural_name',
			label: __( 'Plural Name', 'divi_flash' ),
			type: 'text',
			placeholder: 'Projects',
		},
		{
			id: 'slug',
			label: __( 'Slug', 'divi_flash' ),
			type: 'text',
			placeholder: 'project',
		},
		{
			id: 'category_slug',
			label: __( 'Category Slug Name', 'divi_flash' ),
			type: 'text',
			placeholder: 'project_category',
		}, {
			id: 'tag_archive',
			label: __( 'Tag Archive Name', 'divi_flash' ),
			type: 'text',
			placeholder: 'project_tag',
		},
		{
			id: 'icon',
			label: __( 'Select Post Type Icon', 'divi_flash' ),
			type: 'upload',
			help_text: __(
				'Use Only svg as other file doesn\'t support',
				'divi_flash',
			),
		},
	]

	const handleOnChange = ( value, key ) => {
		setCptSettings( prevSettings => (
			{ ...prevSettings, [key]: value }
		) )
	}
	useEffect( () => {
		if ( isMount ) {
			return
		}
		storeSettings( [ { id: 'df_project_cpt_rename_option', value: cptSettings } ] )
	}, [ cptSettings ] )

	return (
		<div className="project-cpt">
			{ fields.map( ( setting ) => (
				<Fragment key={ setting.id }>
					<div className="label">{ setting.label }</div>
					<div className="control">
						{ 'text' === setting.type && (
							<TextControl onChange={ val => handleOnChange( val, setting.id ) }
										 value={ cptSettings[setting.id] }
										 placeholder={ setting.placeholder }/>
						) }
						{
							'upload' === setting.type && (
								<FormFileUpload
									accept="image/svg+xml"
									onChange={ ( e ) => {
										const file = e.target.files[0]
										setFileName( file?.name )
										const reader = new FileReader()
										reader.onload = ( event ) => {
											handleOnChange( event.target.result, 'icon' )
										}
										reader.readAsDataURL( file )
									} }
								>
									{ fileName
										? <span className="icon"><img
											src={ cptSettings.icon }/> { __( 'Change', 'divi_flash' ) }</span>
										: __( 'Choose File', 'divi_flash' ) }
								</FormFileUpload>
							)
						}
						<p className="help-text">{ setting.help_text }</p>
					</div>
				</Fragment>
			) ) }
		</div>
	)
}

export const General = () => {
	const generalSettings = [
		{
			id: 'df_general_svg_support',
			label: __( 'SVG file upload', 'divi_flash' ),
			type: 'toggle',
			help_text: __(
				'Turn on/off to allow/disallow SVG file upload.',
				'divi_flash',
			),
		},
		{
			id: 'df_general_json_support',
			label: __( 'JSON file upload', 'divi_flash' ),
			type: 'toggle',
			help_text: __(
				'Turn on/off to allow/disallow JSON file upload.',
				'divi_flash',
			),
		},
		{
			id: 'df_general_ttf_woff_support',
			label: __( 'Custom Font Upload', 'divi_flash' ),
			type: 'toggle',
			help_text: __(
				'Enable to allow TTF, OTF, and WOFF font uploads.',
				'divi_flash',
			),
		},
		{
			id: 'df_general_library_shortcode',
			label: __( 'Divi Library shortcode', 'divi_flash' ),
			type: 'toggle',
			help_text: __(
				'Turn on/off to enable/disabled divi-library shortcode.',
				'divi_flash',
			),
		},
		{
			id: 'df_general_acf_field_support',
			label: __( 'ACF Support', 'divi_flash' ),
			type: 'toggle',
			help_text: __(
				'This setting will allow some modules to pull data from ACF fields to create Grid/Carousel view. Currently supported ACF field types are: \'text\', \'number\', \'textarea\', \'range\', \'email\', \'url\', \'image\', \'select\', \'date_picker\', \'wysiwyg\'.',
				'divi_flash',
			),
		},
        {
            id: 'df_general_pod_field_support',
            label: __('Pods Support', 'divi_flash'),
            type: 'toggle',
            help_text: __("This setting will allow some modules to pull data from Pods field to create Grid/Carousel view. Currently supported Pods field types are: file/image('jpg', 'jpeg', 'png', 'gif', 'webp'), 'text', 'number', 'paragraph', 'email', 'website', 'date', 'time', 'datetime', 'wysiwyg'.", 'divi_flash'),
        },
		{
			id: 'df_general_metabox_field_support',
			label: __( 'Meta Box Support', 'divi_flash' ),
			type: 'toggle',
			help_text: __(
				'This setting will allow some modules to pull data from Meta Box fields to create Grid/Carousel view. Currently supported Meta Box field types are: \'text\', \'number\', \'textarea\', \'range\', \'email\', \'url\', \'image\', \'select\', \'date_picker\'.',
				'divi_flash',
			),
		},
		{
			id: 'df_general_popup_enable',
			label: __( 'Popup Enable', 'divi_flash' ),
			type: 'toggle',
			help_text: __(
				'Turn on/off to enable/disable Popup.',
				'divi_flash',
			),
		},
		{
			id: 'df_general_customize_preloader',
			label: __( 'Preloader', 'divi_flash' ),
			button_label: __( 'Customize', 'divi_flash' ),
			type: 'button_icon',
			url: 'customize.php?autofocus[section]=difl_preloader_',
			icon: SettingsIcon,
			help_text: __(
				'Add a stylish Preloader animation from 33 presets, or create a custom one.',
				'divi_flash',
			),
		},
		{
			id: 'df_general_customize_btt',
			label: __( 'Back To Top Button', 'divi_flash' ),
			button_label: __( 'Customize', 'divi_flash' ),
			type: 'button_icon',
			url: 'customize.php?autofocus[section]=difl_back_to_top_',
			icon: SettingsIcon,
			help_text: __(
				'Style the default Divi \'Back to Top\' button with customizable colors, size, positioning, and more.',
				'divi_flash',
			),
		},
		{
			id: 'df_hide_admin_bar',
			label: __( 'Hide Admin Bar', 'divi_flash' ),
			type: 'toggle',
			help_text: __(
				'Hide admin bar based on the user role',
				'divi_flash',
			),
		},
		{
			id: 'df_hide_media_category',
			label: __( 'Disable DF Media Category', 'divi_flash' ),
			type: 'toggle',
			help_text: __(
				'Turn on/off your DF media category.',
				'divi_flash',
			),
		},
		{
			id: 'df_hide_page_category',
			label: __( 'Disable DF Page Category', 'divi_flash' ),
			type: 'toggle',
			help_text: __( 'Turn on/off your DF page category.', 'divi_flash' ),
		},
		{
			id: 'df_disable_wpforms_pro_style',
			label: __( 'Disable WPForms Pro Styles', 'divi_flash' ),
			type: 'toggle',
			render: diflSettings?.wpforms_pro ?? false,
			help_text: __(
				'Disabling this will provide desired style with WPFormStyles module',
				'divi_flash',
			),
		},
		{
			id: 'df_hide_project_cpt',
			label: __( 'Hide Projects Custom Post Type', 'divi_flash' ),
			type: 'toggle',
			help_text: __(
				'Turn on/off your project custom post type.',
				'divi_flash',
			),
		},
		{
			id: 'df_project_cpt_rename',
			label: __( 'Rename Projects Custom Post Type', 'divi_flash' ),
			type: 'toggle',
			help_text: __( 'Enable this option to rename Projects CPT. \n Re-saving permalink might be needed.', 'divi_flash' ),
		},
		{
			id: 'df_general_enable_cache_menu',
			label: __( 'Cache Clear Option', 'divi_flash' ),
			type: 'toggle',
			help_text: __(
				'Enable to show the cache clear option in the WP Admin bar.',
				'divi_flash',
			),
		},
		{
			id: 'df_general_hide_footer_bar',
			label: __( 'Hide Footer Bottom Bar', 'divi_flash' ),
			type: 'toggle',
			help_text: __(
				'Enable this to hide default footer bottom bar from the bottom.',
				'divi_flash',
			),
		},
		{
			id: 'df_general_stick_footer_bottom',
			label: __( 'Stick Footer Nav at Bottom', 'divi_flash' ),
			type: 'toggle',
			help_text: __(
				'Enable this to keep the footer fixed at the bottom of the page on all pages and posts.',
				'divi_flash',
			),

		},
		{
			id: 'df_maintenance_mode_enabled',
			label: __( 'Maintenance Mode', 'divi_flash' ),
			type: 'toggle',
			help_text: __(
				'Turn on this option to activate and display the maintenance mode page.',
				'divi_flash',
			),
		},
		{
			id: 'df_maintenance_mode_page',
			label: __( 'Choose Maintenance Mode Page', 'divi_flash' ),
			type: 'select',
			options: diflSettings?.df_maintenance_mode_page,
			show_if: 'df_maintenance_mode_enabled',
			help_text: __(
				'Select the page to display when your site is in maintenance mode.',
				'divi_flash',
			),
		},
		{
			id: 'df_maintenance_mode_disable_header',
			label: __( 'Hide Header in Maintenance Mode', 'divi_flash' ),
			show_if: 'df_maintenance_mode_enabled',
			type: 'toggle',
			help_text: __(
				'Enable this option to hide the header while the site is in maintenance mode.',
				'divi_flash',
			),
		},
		{
			id: 'df_maintenance_mode_disable_footer',
			label: __( 'Hide Footer in Maintenance Mode', 'divi_flash' ),
			show_if: 'df_maintenance_mode_enabled',
			type: 'toggle',
			help_text: __(
				'Enable this option to hide the footer while the site is in maintenance mode.',
				'divi_flash',
			),
		},
		{
			id: 'df_maintenance_mode_enable_full_height',
			label: __( 'Enable Full-Height Maintenance Page', 'divi_flash' ),
			show_if: 'df_maintenance_mode_enabled',
			type: 'toggle',
			help_text: __(
				'Enable a full-height layout for the maintenance mode page.',
				'divi_flash',
			),
		},
		{
			id: 'df_custom_login_enabled',
			label: __( 'Login Customizer', 'divi_flash' ),
			type: 'toggle',
			help_text: __(
				'Customize the default login page to a unique look.',
				'divi_flash',
			),
		},
		{
			id: 'df_custom_login_url',
			label: __( 'Change Login URL Slug (ex: mylogin)', 'divi_flash' ),
			type: 'text',
			show_if: 'df_custom_login_enabled',
			value: '',
			help_text: __(
				'Enter the URL of the custom login page.',
				'divi_flash',
			),
		},
		{
			id: 'df_general_customize_login',
			label: __( 'Customize the Default Login Page', 'divi_flash' ),
			button_label: __( 'Customize', 'divi_flash' ),
			type: 'button_icon',
			show_if: 'df_custom_login_enabled',
			url: `customize.php?url=${ diflSettings.login_url }&autofocus=difl_advanced_genaral`,
			icon: SettingsIcon,
			help_text: __(
				'Rebrand the default WP login page and give a brand look.',
				'divi_flash',
			),
		},
		{
			id: 'df_general_cf_support',
			label: __( 'Divi Contact Form DB Save', 'divi_flash' ),
			type: 'toggle',
			help_text: __(
				'Enable this to save contact form submission on database',
				'divi_flash',
			),
		},
	]
	generalSettings.map( ( setting ) => {
		setting['value'] = diflSettings.settings[setting.id]
	} )

	const [ settings, setSettings ] = useState( generalSettings );
	const popupLi = `<li class="wp-has-submenu wp-not-current-submenu menu-top menu-icon-difl_popup" id="menu-posts-difl_popup">
<a href="edit.php?post_type=difl_popup" class="wp-has-submenu wp-not-current-submenu menu-top menu-icon-difl_popup" aria-haspopup="true"><div class="wp-menu-arrow"><div></div></div><div class="wp-menu-image dashicons-before" aria-hidden="true"><img src="${ window.location.origin }/wp-content/plugins/diviflash/admin/popup/img/popup.svg" alt=""></div><div class="wp-menu-name">DF Popups</div></a>
<ul class="wp-submenu wp-submenu-wrap" style=""><li class="wp-submenu-head" aria-hidden="true">DF Popups</li><li class="wp-first-item"><a href="edit.php?post_type=difl_popup" class="wp-first-item">All Popups</a></li><li><a href="post-new.php?post_type=difl_popup">Add New</a></li><li><a href="edit.php?post_type=difl_popup&amp;page=popup_import_export">Import &amp; Export</a></li></ul></li>`;
	const projectLi = `<li class="wp-has-submenu wp-not-current-submenu menu-top menu-icon-project menu-top-last" id="menu-posts-project">
\t<a href="edit.php?post_type=project" class="wp-has-submenu wp-not-current-submenu menu-top menu-icon-project menu-top-last" data-ariahaspopup=""><div class="wp-menu-arrow"><div></div></div><div class="wp-menu-image dashicons-before dashicons-admin-post" aria-hidden="true"><br></div><div class="wp-menu-name">Projects</div></a>
\t<ul class="wp-submenu wp-submenu-wrap"><li class="wp-submenu-head" aria-hidden="true">Projects</li><li class="wp-first-item"><a href="edit.php?post_type=project" class="wp-first-item">All Projects</a></li><li><a href="post-new.php?post_type=project">Add New</a></li><li><a href="edit-tags.php?taxonomy=project_category&amp;post_type=project">Categories</a></li><li><a href="edit-tags.php?taxonomy=project_tag&amp;post_type=project">Tags</a></li></ul></li>`;
	const subMenu = `<ul class="wp-submenu wp-submenu-wrap"><li class="wp-submenu-head" aria-hidden="true">DiviFlash</li><li class="wp-first-item current"><a href="admin.php?page=diviflash" class="wp-first-item current" aria-current="page">DiviFlash</a></li><li><a href="edit.php?post_type=difl_contact_form">Form Submissions</a></li></ul>`;
	const updateSettings = ( item, value ) => {
		const newSettings = settings.map( ( setting ) => {
			if ( setting.id === item.id ) {
				setting.value = value
			}
			return setting
		} )
		setSettings( newSettings )
		if ( 'df_general_popup_enable' === item.id ) {
			if ( value ) {
				document.getElementById( 'menu-comments' ).insertAdjacentHTML( 'afterend', popupLi )
			} else {
				document.getElementById( 'menu-posts-difl_popup' ).remove()
			}
		}
		if ( 'df_hide_project_cpt' === item.id ) {
			if ( ! value ) {
				document.getElementById( 'menu-comments' ).insertAdjacentHTML( 'afterend', projectLi )
			} else {
				document.getElementById( 'menu-posts-project' ).remove()
			}
		}

		if ( 'df_general_cf_support' === item.id ) {
			if ( value ) {
				document.querySelector( 'li.toplevel_page_diviflash' ).classList = 'wp-has-submenu wp-has-current-submenu wp-menu-open menu-top toplevel_page_diviflash menu-top-first';
				document.querySelector( 'li.toplevel_page_diviflash div.wp-menu-name' ).style.backgroundColor = '#2271b1';
				document.querySelector( 'li.toplevel_page_diviflash a.toplevel_page_diviflash' ).insertAdjacentHTML( 'afterend', subMenu )
			} else {
				document.querySelector( 'li.toplevel_page_diviflash ul.wp-submenu' ).remove()
			}
		}

		if ( 'df_hide_media_category' === item.id ) {
			const li = `<li><a href="edit-tags.php?taxonomy=difl_media_category&amp;post_type=attachment">DF Media Categories</a></li>`;
			const menu = document.querySelector( '#menu-media ul.wp-submenu-wrap' );
			if ( ! value ) {
				menu.querySelectorAll( 'li' )[menu.querySelectorAll( 'li' ).length - 1].insertAdjacentHTML( 'afterend', li )
			} else {
				menu.querySelector( 'li a[href*="difl_"]' ).remove()
			}
		}
		if ( 'df_hide_page_category' === item.id ) {
			const li = `<li><a href="edit-tags.php?taxonomy=difl_page_category&amp;post_type=page">DF Page Categories</a></li>`;
			const menu = document.querySelector( '#menu-pages ul.wp-submenu-wrap' );
			if ( ! value ) {
				menu.querySelectorAll( 'li' )[menu.querySelectorAll( 'li' ).length - 1].insertAdjacentHTML( 'afterend', li )
			} else {
				menu.querySelector( 'li a[href*="difl_"]' ).remove()
			}
		}

		if ( 'df_general_enable_cache_menu' === item.id ) {
			const li = `<li role="group" id="wp-admin-bar-difl_clear_divi_cache"><a class="ab-item" role="menuitem" href=""><span data-wpnonce="c9d851fd81">Clear Divi Cache</span></a></li>`;
			const menu = document.querySelector( '#wpadminbar ul#wp-admin-bar-root-default' );
			if ( value ) {
				menu.querySelectorAll( ':scope > li' )[menu.querySelectorAll( ':scope > li' ).length - 1].insertAdjacentHTML( 'afterend', li );
			} else {
				menu.querySelector( 'li#wp-admin-bar-difl_clear_divi_cache' ).remove()
			}
		}

	}
	const isMount = useIsMount()

	useEffect( () => {
		if ( isMount ) {
			return
		}
		storeSettings( settings )
	}, [ settings ] )

	return (
		<>
			<SettingsHeader title={ __( 'General Settings', 'divi_flash' ) }/>
			{ settings.map( ( setting ) => setting.hasOwnProperty( 'render' ) && ! setting.render || ('df_project_cpt_rename' === setting.id && settings.find( set => set.id === 'df_hide_project_cpt' ).value) || (setting.hasOwnProperty( 'show_if' ) &&
				! settings.find( ( s ) => s.id === setting.show_if ).value) ? null : (
				<div className="settings-content general" key={ setting.id }>
					<div className="label">{ setting.label }</div>
					<div className="control">
						{ 'toggle' === setting.type && (
							<ToggleField
								item={ setting }
								isActive={ setting.value }
								toggleHandler={ updateSettings }
							/>
						) }
						{ 'text' === setting.type && (
							<TextControl
								onChange={ val => updateSettings( setting, val ) }
								value={ setting.value }
							/>
						) }

						{ 'button_icon' === setting.type && (
							<ButtonIcon
								{ ...setting }
								className="button-icon"
							/>
						) }
						<p className="help-text">{ setting.help_text }</p>
						{ 'df_hide_admin_bar' === setting.id && setting.value ? (
							<AllRoles/>
						) : null }

						{ 'df_project_cpt_rename' === setting.id && setting.value ? (
							<ProjectCPTFields/>
						) : null }

						{ 'select' === setting.type && (
							<SelectField
								item={ setting }
								handleOnChange={ updateSettings }
							/>
						) }

					</div>
				</div>
			) ) }
		</>
	)
}
