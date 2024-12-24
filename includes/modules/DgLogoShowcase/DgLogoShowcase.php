<?php
// 
class DGLS_LogoShowcase extends ET_Builder_Module {
    use LogoShowcaseFun;
    use DGLS_BG;

	public $slug       = 'dgls_logo_showcase';
	public $vb_support = 'on';

	protected $module_credits = array(
		'module_uri' => 'https://www.divigear.com/',
		'author'     => 'Tanvir',
		'author_uri' => 'mailto:tanvir@echoasoft.com',
	);

	public function init() {
		$this->name 	 = esc_html__( 'Divi Gear Logo Showcase', 'dgls-dg-logo-showcase' );
		$this->icon_path = plugin_dir_path( __FILE__ ). 'icon.svg';
		$this->main_css_element = '%%order_class%%';
	}
	public function get_settings_modal_toggles(){
		return array(
			// general = Content
			'general'  => array(
				'toggles' => array(
					'logos' 	       => esc_html__('Logos', 'et_builder'),
					'general_settings' => esc_html__('General Settings', 'et_builder'),
                    'hover_settings'   => esc_html__('Hover Settings', 'et_builder')
				),
			),

			// advanced = Design
            'advanced'   => array(
                'toggles'=> array(
                    'font_styles' => array (
                        'title'             => esc_html__('Font Styles', 'et_builder'),
                        'tabbed_subtoggles' => true,
                        'sub_toggles' => array(
                            'caption' => array(
                                'name' => 'Caption',
                            ),
                            'description' => array(
                                'name' => 'Description',
                            )
                        ),
                    ),
                    'dgls_adv_logo'  => esc_html__('Logos', 'et_builder'),  // this setting show in get_fields();
                    'dgls_logo_filter'=> esc_html__('Logo Filter', 'et_builder'),
                    'dgls_box_shadow'=> esc_html__('Logo Box Shadow', 'et_builder'),
                    'dgls_borders'   => esc_html__('Logo Borders', 'et_builder'),
                    'dgls_spacing'   => esc_html__('Logo Spacing', 'et_builder'),
                ),
            ),
			// custom_css = Advanced
			/*'custom_css'  => array(
				'toggles' => array(
					'limitation' => esc_html__( 'Limitation', 'et_builder' ), // totally made up
				),
			),*/
		);
	}

	public function get_fields() {
        // general > Logos
        $logos = array(
            'logos' => array(
				'label'            => esc_html__( 'Logos Images', 'et_builder' ),
				'description'      => esc_html__( 'Choose images that you would like to appear in the logo showcase.', 'et_builder' ),
				'type'             => 'upload-gallery',
				'toggle_slug'      => 'logos',
            )
        );

		// general > General Settings
        $general_settings = array (
            'logos_in_a_row'    => array(
                'label'    => esc_html__('Logos in a row', 'et_builder'),
                'type'          => 'select',
                'options'       => array (
                    'logo_1'    => esc_html__('Logo 1', 'et_builder'),
                    'logo_2'    => esc_html__('Logo 2', 'et_builder'),
                    'logo_3'    => esc_html__('Logo 3', 'et_builder'),
                    'logo_4'    => esc_html__('Logo 4', 'et_builder'),
                    'logo_5'    => esc_html__('Logo 5', 'et_builder'),
                    'logo_6'    => esc_html__('Logo 6', 'et_builder'),
                    'logo_7'    => esc_html__('Logo 7', 'et_builder'),
                    'logo_8'    => esc_html__('Logo 8', 'et_builder'),
                    'logo_9'    => esc_html__('Logo 9', 'et_builder'),
                    'logo_10'    => esc_html__('Logo 10', 'et_builder'),
                    'logo_11'    => esc_html__('Logo 11', 'et_builder'),
                    'logo_12'    => esc_html__('Logo 12', 'et_builder'),
                ),
                'default'       => 'logo_5',
                'toggle_slug'   => 'general_settings',
            ),
            'use_logo_orientation' => array(
                'label'       => esc_html__('Use Logo Orientation', 'et_builder'),
                'type'        => 'yes_no_button',
                'options'     => array (
                    'off' => esc_html__( 'Off', 'et_builder' ),
					'on'  => esc_html__( 'On', 'et_builder' ),
                ),
                'default'     => 'off',
                'toggle_slug' => 'general_settings',
            ),
            'logo_orientation'    => array(
                'label'    => esc_html__('Logo Orientation', 'et_builder'),
                'type'          => 'select',
                'options'       => array (
                    'landscape' => esc_html__('Landscape', 'et_builder'),
                    'portrait'  => esc_html__('Portrait', 'et_builder'),
                    'square'  => esc_html__('Square', 'et_builder'),
                ),
                'default'       => 'landscape',
                'toggle_slug'   => 'general_settings',
                'show_if'     => array(
                    'use_logo_orientation' => 'on'
                )
            ),
            'logo_size'    => array(
                'label'    => esc_html__('Logo Size', 'et_builder'),
                'type'          => 'select',
                'options'       => array (
                    'medium'    => esc_html__('Medium', 'et_builder'),
                    'large'     => esc_html__('Large', 'et_builder'),
                    'original'  => esc_html__('Original', 'et_builder')
                ),
                'default'       => 'medium',
                'toggle_slug'   => 'general_settings',
            ),
            'horizontal_alignment' => array(
                'label'      => esc_html__('Horizontal Alignment', 'et_builder'),
                'type'       => 'select',
                'options'    => array (
                    'h_flex-start'   => esc_html__('Left', 'et_builder'),
                    'h_center' => esc_html__('Centre', 'et_builder'),
                    'h_flex-end'  => esc_html__('Right', 'et_builder')
                ),
                'default'    => 'h_center',
                'toggle_slug'=> 'general_settings',
            ),
            'horizontal_gap'    => array (
                'label'         => esc_html__( 'Horizontal Gap', 'et_builder' ),
                'type'          => 'range',
                'toggle_slug'   => 'general_settings',
                'default'       => '10',
                'default_unit'  => '',
                'allowed_units' => array (''),
                'description'   => esc_html__('Horizontal space for each logo. To remove horizontal space each logo set the value 0.', 'et_builder'),
                'range_settings'=> array(
                    'min'  => '0',
                    'max'  => '100',
                    'step' => '1',
                ),
                'validate_unit'  => false
            ),
            'vertical_alignment' => array(
                'label'      => esc_html__('Vertical Alignment', 'et_builder'),
                'type'       => 'select',
                'options'    => array (
                    'v_flex-start'    => esc_html__('Top', 'et_builder'),
                    'v_center' => esc_html__('Middle', 'et_builder'),
                    'v_flex-end' => esc_html__('Bottom', 'et_builder')
                ),
                'default'    => 'v_center',
                'toggle_slug'=> 'general_settings',
            ),
            'vertical_gap'   => array (
                'label'         => esc_html__( 'Vertical Gap', 'et_builder' ),
                'type'          => 'range',
                'toggle_slug'   => 'general_settings',
                'default'       => '10',
                'default_unit'  => '',
                'allowed_units' => array (''),
                'description'   => esc_html__('Vertical space for each logo. To remove vertical space each logo set the value 0.', 'et_builder'),
                'range_settings'=> array(
                    'min'  => '0',
                    'max'  => '100',
                    'step' => '1',
                ),
                'validate_unit' => false
            ),
            'use_custom_link' => array(
                'label'       => esc_html__('Use Custom Link', 'et_builder'),
                'type'        => 'yes_no_button',
                'options'     => array (
                    'off' => esc_html__( 'Off', 'et_builder' ),
					'on'  => esc_html__( 'On', 'et_builder' ),
                ),
                'default'     => 'off',
                'toggle_slug' => 'general_settings',
            ),
            'url_target' => array(
                'label'       => esc_html__('Link Target', 'et_builder'),
                'type'        => 'select',
                'options'     => array (
                    '_self' => esc_html__('In The Same Window', 'et_builder'),
                    '_blank'  => esc_html__('In The New Tab', 'et_builder')
                ),
                'default'     => '_self',
                'toggle_slug' => 'general_settings',
                'show_if'     => array(
                    'use_custom_link' => 'on'
                )
            ),

            'logo_info' => array(
                'label'       => esc_html__('Logo info', 'et_builder'),
                'type'        => 'yes_no_button',
                'options'     => array (
                    'off' => esc_html__( 'Off', 'et_builder' ),
					'on'  => esc_html__( 'On', 'et_builder' ),
                ),
                'default'     => 'off',
                'toggle_slug' => 'general_settings',
            ),
            'content_position'    => array(
                'label'         => esc_html__('Content Position', 'et_builder'),
                'type'          => 'select',
                'options'       => array (
                    'top-left'        => esc_html__('Top Left', 'et_builder'),
                    'top-center'      => esc_html__('Top Center', 'et_builder'),
                    'top-right'       => esc_html__('Top Right', 'et_builder'),
                    'bottom-left'     => esc_html__('Bottom Left', 'et_builder'),
                    'bottom-center'   => esc_html__('Bottom Center', 'et_builder'),
                    'bottom-right'    => esc_html__('Bottom Right', 'et_builder')
                ),
                'default'       => 'bottom-center',
                'toggle_slug'   => 'general_settings',
                'show_if' => array(
                    'logo_info' => 'on'
                )
            ),
            'show_caption'    => array(
                'label'         => esc_html__('Show Caption', 'et_builder'),
                'type'          => 'yes_no_button',
                'options'       => array (
                    'off' => esc_html__( 'Off', 'et_builder' ),
					'on'  => esc_html__( 'On', 'et_builder' ),
                ),
                'default'       => 'off',
                'toggle_slug'   => 'general_settings',
                'show_if' => array(
                    'logo_info' => 'on'
                )
            ),
            /*
            'content_reveal_caption' => array(
                'label'   => esc_html__('Caption Reveal', 'et_builder'),
                'type'    => 'select',
                'options' => array (
                    'dgls-reveal-up'            => esc_html__('Reveal Top', 'et_builder'),
                    'dgls-reveal-down'          => esc_html__('Reveal Down', 'et_builder'),
                    'dgls-reveal-left'          => esc_html__('Reveal Left', 'et_builder'),
                    'dgls-reveal-right'         => esc_html__('Reveal Right', 'et_builder'),
                    'dgls-fade-up'              => esc_html__('Fade Up', 'et_builder'),
                    'dgls-fade-down'            => esc_html__('Fade Down', 'et_builder'),
                    'dgls-fade-left'            => esc_html__('Fade Left', 'et_builder'),
                    'dgls-fade-right'           => esc_html__('Fade Right', 'et_builder'),
                    'dgls-rotate-up-right'      => esc_html__('Rotate Up Right', 'et_builder'),
                    'dgls-rotate-up-left'       => esc_html__('Rotate Up Left', 'et_builder'),
                    'dgls-rotate-down-right'    => esc_html__('Rotate Down Right', 'et_builder'),
                    'dgls-rotate-down-left'     => esc_html__('Rotate Down Left', 'et_builder')
                ),
                'default'       => 'dgls-fade-up',
                'toggle_slug'   => 'general_settings',
                'show_if'       => array(
                    'show_caption' => 'on',
                    'logo_info'    => 'on'
                )
            ),
            */
            'show_description'    => array(
                'label'         => esc_html__('Show Description', 'et_builder'),
                'type'          => 'yes_no_button',
                'options'       => array (
                    'off' => esc_html__( 'Off', 'et_builder' ),
					'on'  => esc_html__( 'On', 'et_builder' ),
                ),
                'default'       => 'off',
                'toggle_slug'   => 'general_settings',
                'show_if' => array(
                    'logo_info' => 'on'
                )
            ),
            /*
            'content_reveal_description' => array(
                'label'   => esc_html__('Description Reveal', 'et_builder'),
                'type'    => 'select',
                'options' => array (
                    'dgls-reveal-up'         => esc_html__('Reveal Top', 'et_builder'),
                    'dgls-reveal-down'       => esc_html__('Reveal Down', 'et_builder'),
                    'dgls-reveal-left'       => esc_html__('Reveal Left', 'et_builder'),
                    'dgls-reveal-right'      => esc_html__('Reveal Right', 'et_builder'),
                    'dgls-fade-up'           => esc_html__('Fade Up', 'et_builder'),
                    'dgls-fade-down'         => esc_html__('Fade Down', 'et_builder'),
                    'dgls-fade-left'         => esc_html__('Fade Left', 'et_builder'),
                    'dgls-fade-right'        => esc_html__('Fade Right', 'et_builder'),
                    'dgls-rotate-up-right'   => esc_html__('Rotate Up Right', 'et_builder'),
                    'dgls-rotate-up-left'    => esc_html__('Rotate Up Left', 'et_builder'),
                    'dgls-rotate-down-right' => esc_html__('Rotate Down Right', 'et_builder'),
                    'dgls-rotate-down-left'  => esc_html__('Rotate Down Left', 'et_builder'),
                ),
                'default'     => 'dgls-fade-up',
                'toggle_slug' => 'general_settings',
                'show_if'     => array(
                    'show_description' => 'on',
                    'logo_info'        => 'on'
                )
            )
            */
            
        );

		// general > Hover Settings
        $hover_settings = array(
            'hover_effects' => array(
                'label'   => esc_html__('Hover Effects', 'et_builder'),
                'type'    => 'select',
                'options' => array (
                    'no-image-scale'          => esc_html__('None', 'et_builder'),
                    // Advanced Button on
                    'dgls_bounce_h'           => esc_html__( 'Bounce', 'divi_flash' ),
                    'dgls_flash_h'            => esc_html__( 'Flash', 'divi_flash' ),
                    'dgls_pulse_h'            => esc_html__( 'Pulse', 'divi_flash' ),
                    'dgls_rubberBand_h'       => esc_html__( 'Rubber Band', 'divi_flash' ),
                    'dgls_headShake_h'        => esc_html__( 'Head Shake', 'divi_flash' ),
                    // Advanced Button off
                    'dgls-image-zoom-in'      => esc_html__('Zoom In', 'et_builder'),
                    'dgls-image-zoom-out'     => esc_html__('Zoom Out', 'et_builder'),
                    'dgls-image-pan-up'       => esc_html__('Pan Up', 'et_builder'),
                    'dgls-image-pan-down'     => esc_html__('Pan Down', 'et_builder'),
                    'dgls-image-pan-left'     => esc_html__('Pan Left', 'et_builder'),
                    'dgls-image-pan-right'    => esc_html__('Pan Right', 'et_builder'),
                    'dgls-image-rotate-left'  => esc_html__('Rotate Left', 'et_builder'),
                    'dgls-image-rotate-right' => esc_html__('Rotate Right', 'et_builder'),
                    'dgls-image-blur'         => esc_html__('Blur', 'et_builder')
                ),
                'default'     => 'no-image-scale',
                'toggle_slug' => 'hover_settings'
            ),
            /*
            'reveal_animation_setting' => array(
                'label'   => esc_html__('Reveal Animation Settings', 'et_builder'),
                'type'    => 'select',
                'options' => array (
                    'dgls-reveal-up'         => esc_html__('Reveal Top', 'et_builder'),
                    'dgls-reveal-down'       => esc_html__('Reveal Down', 'et_builder'),
                    'dgls-reveal-left'       => esc_html__('Reveal Left', 'et_builder'),
                    'dgls-reveal-right'      => esc_html__('Reveal Right', 'et_builder'),
                    'dgls-fade-up'           => esc_html__('Fade Up', 'et_builder'),
                    'dgls-fade-down'         => esc_html__('Fade Down', 'et_builder'),
                    'dgls-fade-left'         => esc_html__('Fade Left', 'et_builder'),
                    'dgls-fade-right'        => esc_html__('Fade Right', 'et_builder'),
                    'dgls-rotate-up-right'   => esc_html__('Rotate Up Right', 'et_builder'),
                    'dgls-rotate-up-left'    => esc_html__('Rotate Up Left', 'et_builder'),
                    'dgls-rotate-down-right' => esc_html__('Rotate Down Right', 'et_builder'),
                    'dgls-rotate-down-left'  => esc_html__('Rotate Down Left', 'et_builder'),
                ),
                'default'     => 'dgls-fade-up',
                'toggle_slug' => 'hover_settings'
            ),
            */
            'enable_stagger_animation'    => array(
                'label'         => esc_html__('Enable Stagger Animation', 'et_builder'),
                'type'          => 'yes_no_button',
                'options'       => array (
                    'off' => esc_html__( 'Off', 'et_builder' ),
					'on'  => esc_html__( 'On', 'et_builder' ),
                ),
                'default'       => 'off',
                'toggle_slug'   => 'hover_settings'
            ),
            // Advanced Pricing Table on
            'enable_stagger_animation_types' => array(
                'label'   => esc_html__('Type', 'et_builder'),
                'type'    => 'select',
                'options' => array (
					'fadeIn'                 => esc_html__( 'Fade In', 'et_builder' ),
					'fadeInLeftShort'        => esc_html__( 'Fade In Left', 'et_builder' ),
					'fadeInRightShort'       => esc_html__( 'Fade In Right', 'et_builder' ),
					'fadeInUpShort'          => esc_html__( 'Fade In Up', 'et_builder' ),
					'fadeInDownShort'        => esc_html__( 'Fade In Down', 'et_builder' ),
					'zoomInShort'            => esc_html__( 'Grow', 'et_builder' ),
					'bounceInShort'          => esc_html__( 'Bounce In', 'et_builder' ),
					'bounceInLeftShort'      => esc_html__( 'Bounce In Left', 'et_builder' ),
					'bounceInRightShort'     => esc_html__( 'Bounce In Right', 'et_builder' ),
					'bounceInUpShort'        => esc_html__( 'Bounce In Up', 'et_builder' ),
					'bounceInDownShort'      => esc_html__( 'Bounce In Down', 'et_builder' ),
					'flipInXShort'           => esc_html__( 'Flip InX', 'et_builder' ),
					'flipInYShort'           => esc_html__( 'Flip InY', 'et_builder' ),
					'jackInTheBoxShort'      => esc_html__( 'Jack In The Box', 'et_builder' ),
					'rotateInShort'          => esc_html__( 'Rotate In', 'et_builder' ),
					'rotateInDownLeftShort'  => esc_html__( 'Rotate In Down Left', 'et_builder' ),
					'rotateInUpLeftShort'    => esc_html__( 'Rotate In Up Left', 'et_builder' ),
					'rotateInDownRightShort' => esc_html__( 'Rotate In Down Right', 'et_builder' ),
					'rotateInUpRightShort'   => esc_html__( 'Rotate In Up Right', 'et_builder' ),
                ),
                'default'     => 'fadeInUpShort',
                'toggle_slug' => 'hover_settings',
                'show_if'     => array(
                    'enable_stagger_animation' => 'on'
                )
            ),
            // Advanced Pricing Table on
            
        );


        // advanced = Design
        // advanced > Logos
        $dgls_adv_logo = array(
            
            'logo_force_full_width' => array(
                'label'       => esc_html__('Force Image Full Width', 'et_builder'),
                'type'        => 'yes_no_button',
                'options'     => array (
                    'off' => esc_html__( 'Off', 'et_builder' ),
					'on'  => esc_html__( 'On', 'et_builder' ),
                ),
                'default'     => 'off',
                'tab_slug'	  => 'advanced',
                'toggle_slug' => 'dgls_adv_logo',
            ),
            'logo_size_percentage' => array(
                'label'         => esc_html__('Logo Size %', 'et_builder'),
                'type'          => 'range',
                'tab_slug'	    => 'advanced',
                'toggle_slug'   => 'dgls_adv_logo',
                'default'       => '100',
                'default_unit'  => '',
                'allowed_units' => array (''),
                'description'   => esc_html__('A range slider to make logo images smaller. Its control percentage value.', 'et_builder'),
                'range_settings'=> array(
                    'min'  => '0',
                    'max'  => '100',
                    'step' => '1',
                ),
                'validate_unit'  => false,
                'show_if' => array(
                    'logo_force_full_width' => 'off'
                )
            ),
            'logo_bg_color' => array(
                'label'       => esc_html__('Logo Background from Media', 'et_builder'),
                'type'        => 'yes_no_button',
                'options'     => array (
                    'off' => esc_html__( 'Off', 'et_builder' ),
					'on'  => esc_html__( 'On', 'et_builder' ),
                ),
                'default'     => 'off',
                'tab_slug'	  => 'advanced',
                'toggle_slug' => 'dgls_adv_logo',
            ),
        );

        // advanced > Logos Margin / Padding
        $marginPadding = $this->dgls_add_margin_padding(array(
            'title'       => 'Each Logo',
            'key'         => 'logo_spacing',
            'toggle_slug' => 'dgls_spacing',
            // 'tab_slug'	  => 'advanced',
            // 'show_if' => array(
            //     'logo_spacing' => 'on'
            // )
        ));

        // advanced > Logos Background
        $dgl_bg_gradient = $this->dgls_add_bg_field(array(
            'label'				=> 'Logos Background',
            'key'               => 'dgl_bg_gradient',
            'toggle_slug'       => 'dgls_adv_logo',
            'tab_slug'			=> 'advanced',
            'hover'				=> 'tabs',
            'image'             => false,
            'show_if' => array(
                'logo_bg_color' => 'off'
            )
        ));

		return array_merge(
            $logos,
            $general_settings,
            $hover_settings,
            $dgls_adv_logo, // this show in Design tab
            $marginPadding,
            $dgl_bg_gradient
        );
		

	}
   
    public function get_advanced_fields_config() {
        $advanced_fields = [];

        // filters
        $advanced_fields["filters"] = array(
			'child_filters_target' => array(
				'tab_slug' => 'advanced',
				'toggle_slug' => 'dgls_logo_filter',
				'css' => array(
					'main' => '%%order_class%% .dgl-showcase' // dgl-showcase = img
				),
			),
        );
        
        // Box Shadow
        $advanced_fields['box_shadow'] = array(
            'default'   => true,
            'logo_shadow' => array(
                'css' => array(
                    'main' => "%%order_class%% .dgl-showcase", // dgl-showcase = img
                    'hover' => "%%order_class%% .dgl-showcase:hover", // dgl-showcase = img
                ),
                'tab_slug'    => 'advanced',
                'toggle_slug' => 'dgls_box_shadow'
            ),
        );

        // Borders
        $advanced_fields['borders'] = array(
            'default'    => true,
            'image_logo' => array (
                'css' => array(
                    'main' => array(
                        'border_radii' => '%%order_class%% .dgl-showcase', // dgl-showcase = img
                        'border_styles' => '%%order_class%% .dgl-showcase', // dgl-showcase = img
                        'border_styles_hover' => '%%order_class%% .dgl-showcase:hover', // dgl-showcase = img
                    )
                ),
                'tab_slug'     => 'advanced',
                'toggle_slug'  => 'dgls_borders',
                'label_prefix' => 'Logo'
            ),
        );

        /*
        // Spacing
        $advanced_fields['margin_padding'] = array(
            'default' => true,
            'css' => array(
                'main' => '%%order_class%% img', // Custom CSS target
            ),
            'tab_slug' => 'advanced',
            'toggle_slug' => 'dgls_spacing',
            'label_prefix' => esc_html__('Logo', 'et_builder'),
        );
        */
        
        return $advanced_fields;
        
    }
 

 
	public function return_data_value($value) {
		return (!empty($value)) ? $value : '';
	}

	public function before_render() {
		global $dgls_logo_showcase;

		$logos  = $this->return_data_value($this->props['logos']);
		$logo_size = $this->return_data_value($this->props['logo_size']);

		$dgls_logo_showcase = array(
			'logos' => $logos,
			'logo_size'=> $logo_size,
		);

	}

    public function additional_css_styles($render_slug) {
        
        // ET_Builder_Element::set_style($render_slug, array(
        //     'selector' => '%%order_class%% .c4-izmir',
        //     'declaration' => '--border-radius: 0px;'
        // ));
        
        // background: Logo Color
        $this->dgls_process_bg(array(
            'render_slug'       => $render_slug,
            'slug'              => 'dgl_bg_gradient',
            'selector'          => '%%order_class%% .dgl-showcase',
            'hover'             => '%%order_class%% .dgl-showcase:hover'
        ));

    }

	public function render( $attrs, $content, $render_slug ) {

		$this->additional_css_styles($render_slug);
		// $sImgUrl = plugin_dir_path( __FILE__ );
    
        $logo_image_ids = $this->props['logos'];
        $logo_size = $this->props['logo_size'];
        $logo_size = $logo_size?$logo_size:'medium'; // 'medium'
        $logo_count = $this->props['logos_in_a_row'];
        $h_alignment = $this->props['horizontal_alignment'];
        $h_alignment = $h_alignment?$h_alignment:"h_center";
        $h_gap = $this->props['horizontal_gap'];
        $h_gap = $h_gap?$h_gap:0;
        $v_alignment = $this->props['vertical_alignment'];
        $v_alignment = $v_alignment?$v_alignment:"v_center";
        $v_gap = $this->props['vertical_gap'];
        $v_gap = $v_gap?$v_gap:0;
        $custom_link = $this->props['use_custom_link'];
        $target_link = $this->props['url_target'];
        $logo_info = $this->props['logo_info'];
        $show_caption = $this->props['show_caption'];
        $show_description = $this->props['show_description'];
        $use_logo_orientation = $this->props['use_logo_orientation'];
        $logo_orientation = $this->props['logo_orientation'];
        $logo_orientation = $use_logo_orientation==='on'?($logo_orientation?$logo_orientation:'landscape'):"";

        $logo_info_position = $this->props['content_position'];
        $logo_bg_color = $this->props['logo_bg_color'];
        
        /*
            $dgl_bg_gradient = $this->props['dgl_bg_gradient'];
            $dgl_bg_gradient = $this->props;
            echo '<pre>';
            var_dump($dgl_bg_gradient);
            echo '</pre>';
        */

        $logo_margin  = $this->props['logo_spacing_margin']; // 11px|17px|13px|15px|false|false
        $logo_padding = $this->props['logo_spacing_padding']; // 10px|16px|12px|14px|false|false

        $marginLogo = '';
        if($logo_margin){
            $logo_margins = explode('|', $logo_margin);
            $marginLogo .= $logo_margins[0].' '.$logo_margins[1].' '.$logo_margins[2].' '.$logo_margins[3];
        }

        $paddingLogo = '';
        if($logo_margin){
            $paddingLogos = explode('|', $logo_padding);
            $paddingLogo .= $paddingLogos[0].' '.$paddingLogos[1].' '.$paddingLogos[2].' '.$paddingLogos[3];
        }
        // var_dump($this->props); padding: %5$spx %6$spx;

        $hover_effects = $this->props['hover_effects'];
        $enable_stagger_animation = $this->props['enable_stagger_animation'];
        $enable_stagger_animation_types = $enable_stagger_animation==='on'?$this->props['enable_stagger_animation_types']:"";
        
        $logoWidth = '';
        $logoHeight = '';

        $logo_force_full_width = $this->props['logo_force_full_width'];
        $logo_full_width = ($logo_force_full_width==='on') ? 'logo-full-width' :'';
        if($logo_force_full_width==="off"){
            $logo_size_percentage = $this->props['logo_size_percentage'];
            if($use_logo_orientation==='on'){
                if($logo_orientation==='portrait'){
                    $logoWidth = $logo_size_percentage?$logo_size_percentage.'%':'';
                }else{
                    $logoHeight = $logo_size_percentage?$logo_size_percentage.'%':'';
                }
            }else{
                $logoWidth = $logo_size_percentage?$logo_size_percentage.'%':'';
            }
        }
        
        // var_dump($logo_full_width);

        $logoImages = dgls_logo_processing($logo_image_ids, $logo_info, $logo_info_position, $show_description, $show_caption, $custom_link, $logo_bg_color, $logo_size,  $logoWidth, $logoHeight, $paddingLogo, $marginLogo, $target_link, $h_alignment, $v_alignment, $hover_effects, $enable_stagger_animation_types);

		$data_attr = array(
			'logos' 	          => $this->return_data_value($logo_image_ids),
			'logo_size'           => $this->return_data_value($logo_size), 
			'logos_in_a_row'      => $this->return_data_value($logo_count),
			'logo_info'           => $this->return_data_value($logo_info),
			'logo_info_position'  => $this->return_data_value($logo_info_position),
			'show_caption'        => $this->return_data_value($show_caption),
			'show_description'    => $this->return_data_value($show_description),
			'logo_orientation'    => $this->return_data_value($logo_orientation),
			'logo_full_width'     => $this->return_data_value($logo_full_width),
			'h_gap'               => $this->return_data_value($h_gap),
			'v_gap'               => $this->return_data_value($v_gap),
			'logo_width'          => $this->return_data_value($logoWidth),
			'logo_height'         => $this->return_data_value($logoHeight),
			'logo_margin'         => $this->return_data_value($marginLogo),
			'logo_padding'        => $this->return_data_value($paddingLogo),
			'logo_bg_color'       => $this->return_data_value($logo_bg_color),
			// 'logo_color'          => $this->return_data_value($logoColor),
			'horizontal_alignment'=> $this->return_data_value($h_alignment), 
			'vertical_alignment'  => $this->return_data_value($v_alignment), 
			'hover_effects'       => $this->return_data_value($hover_effects),
			'stagger_animation'   => $this->return_data_value($enable_stagger_animation_types),
			'custom_link'         => $this->return_data_value($custom_link),
			'target_link'         => $this->return_data_value($target_link),
		);

		return sprintf( '
            <div class="dg-logo-showcase-wrap">
                <div class="dg-logo-showcase-container">
                    <div class="dg-logos %3$s %6$s %4$s %5$s %7$s" style="column-gap: %8$spx; row-gap: %9$spx;" data-props=\'%2$s\'>
                        %1$s
                    </div>
                </div>
            </div>', 
            $logoImages, 
            wp_json_encode($data_attr),
            $logo_count, 
            $h_alignment, 
            $v_alignment,
            $logo_orientation, // 6
            $logo_full_width,
            esc_attr( $h_gap ),
            esc_attr( $v_gap ) // 9
        );
		//   et_core_sanitized_previously( $this->content ) | $this->props['content']
	}

	// Add module Classes
	public function add_class($classes, $class = '') {
		return $classes .= ' ' . $class;
	}
}

new DGLS_LogoShowcase;
