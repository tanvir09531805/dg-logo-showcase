<?php
/*
Plugin Name: DG Logo Showcase 4-5
Plugin URI:  https://www.divigear.com/
Description: The DG Logo Showcase Module for Divi is a specialized module designed to help users display logos on their websites in an attractive and organized way.
Version:     1.0.0
Author:      http://tanvir.instawp.xyz/
Author URI:  mailto:tanvir@echoasoft.com
License:     GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: dgls-dg-logo-showcase
Domain Path: /languages

Dg Logo Showcase is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 2 of the License, or
any later version.

Dg Logo Showcase is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Dg Logo Showcase. If not, see https://www.gnu.org/licenses/gpl-2.0.html.
*/

if ( ! function_exists( 'dgls_initialize_extension' ) ):
/**
 * Creates the extension's main class instance.
 *
 * @since 1.0.0
 */
function dgls_initialize_extension() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/DgLogoShowcase.php';
}
add_action( 'divi_extensions_init', 'dgls_initialize_extension' );
endif;

include_once 'dgls-background.php';



// logo processing handle
function dgls_logo_processing($logo_image_ids, $logo_info, $logo_info_position, $show_description, $show_caption, $custom_link, $logo_bg_color, $logo_size='medium',  $logoWidth='', $logoHeight='', $paddingLogo='', $marginLogo='', $target_link='', $h_alignment='', $v_alignment='', $hover_effects='', $enable_stagger_animation_types='') {
    // code here
    
    $default_image = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTA4MCIgaGVpZ2h0PSI1NDAiIHZpZXdCb3g9IjAgMCAxMDgwIDU0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZmlsbD0iI0VCRUJFQiIgZD0iTTAgMGgxMDgwdjU0MEgweiIvPgogICAgICAgIDxwYXRoIGQ9Ik00NDUuNjQ5IDU0MGgtOTguOTk1TDE0NC42NDkgMzM3Ljk5NSAwIDQ4Mi42NDR2LTk4Ljk5NWwxMTYuMzY1LTExNi4zNjVjMTUuNjItMTUuNjIgNDAuOTQ3LTE1LjYyIDU2LjU2OCAwTDQ0NS42NSA1NDB6IiBmaWxsLW9wYWNpdHk9Ii4xIiBmaWxsPSIjMDAwIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz4KICAgICAgICA8Y2lyY2xlIGZpbGwtb3BhY2l0eT0iLjA1IiBmaWxsPSIjMDAwIiBjeD0iMzMxIiBjeT0iMTQ4IiByPSI3MCIvPgogICAgICAgIDxwYXRoIGQ9Ik0xMDgwIDM3OXYxMTMuMTM3TDcyOC4xNjIgMTQwLjMgMzI4LjQ2MiA1NDBIMjE1LjMyNEw2OTkuODc4IDU1LjQ0NmMxNS42Mi0xNS42MiA0MC45NDgtMTUuNjIgNTYuNTY4IDBMMTA4MCAzNzl6IiBmaWxsLW9wYWNpdHk9Ii4yIiBmaWxsPSIjMDAwIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz4KICAgIDwvZz4KPC9zdmc+Cg==';
    $infoTopBottom = explode('-', $logo_info_position);
    $image_ids = explode(',', $logo_image_ids);

    $logoImages = '';
    foreach( $image_ids as $id ){
        $logoInfo = get_post($id);
        $logoDescription = $show_description==='on'? '<p>'.$logoInfo->post_content.'</p>' :"";
        $logoTitle = $logoInfo->post_title;
        $logoCaption = $show_caption==='on' ? "<h4>".$logoInfo->post_excerpt."</h4>" : "";
        $logoAlt = get_post_meta($id, '_wp_attachment_image_alt', true);
        $logoUrlExtra = get_post_meta($id, 'df_ig_url', true); // this is out site url add by divi flash 
        $logoOutLink = get_post_meta($id, 'dgls_outside_url', true); // this is out site url add by DGLS 
        $logoOutLink = $logoOutLink ? $logoOutLink : "#"; // this is out site url add by DGLS 
        $logoColor = get_post_meta($id, 'dgls_color', true); // this is background color code add by DGLS 
        $logoColor = $logo_bg_color==='on'?$logoColor:'';  // transparent

        $image_url = wp_get_attachment_image_src($id, $logo_size);
        $logoUrl = !empty($image_url) && !is_bool($image_url[0]) ? $image_url[0] : $default_image;

        $logoInfoTop ='';
        $logoInfoBottom ='';
        if($logo_info==='on'){
            $logoInfo = sprintf('<span class="logo_info %3$s">
                %1$s
                %2$s
                </span>',
                $logoCaption,
                $logoDescription,
                esc_attr($logo_info_position)
            );
            if($infoTopBottom[0]==='top'){
                $logoInfoTop .=$logoInfo;
            }else{
                $logoInfoBottom .=$logoInfo;
            }
        }
        
        if($custom_link==="on"){
            //
            $logoImages .= sprintf(
                '<a href="%15$s" target="%14$s" class="dgl-showcase dgl-orientation %10$s %11$s %12$s %13$s" style="padding: %5$s; margin: %6$s; background: %7$s;">
                    %9$s
                    <img class="dgls-image" src="%1$s" alt="%2$s" class="" style="width: %3$s; height: %4$s;"/>
                     %8$s
                </a>',
                esc_attr( $logoUrl ),
                esc_attr( $logoAlt ),
                esc_attr( $logoWidth ),
                esc_attr( $logoHeight ),
                esc_attr( $paddingLogo ), // 5
                esc_attr( $marginLogo ),
                esc_attr( $logoColor ),
                $logoInfoBottom, // wait due to the transfer
                $logoInfoTop,   // wait due to the transfer
                esc_attr( $h_alignment ), 
                esc_attr( $v_alignment ),
                esc_attr( $hover_effects ),
                esc_attr( $enable_stagger_animation_types ),
                esc_attr( $target_link ),// 14
                esc_attr( $logoOutLink ) // 15

            );
        }else{
            $logoImages .= sprintf(
                '<span class="dgl-showcase dgl-orientation %10$s %11$s %12$s %13$s" style="padding: %5$s; margin: %6$s; background: %7$s;">
                    %9$s
                    <img class="dgls-image" src="%1$s" alt="%2$s" class="" style="width: %3$s; height: %4$s;"/>
                     %8$s
                </span>',
                esc_attr( $logoUrl ),
                esc_attr( $logoAlt ),
                esc_attr( $logoWidth ),
                esc_attr( $logoHeight ),
                esc_attr( $paddingLogo ), // 5
                esc_attr( $marginLogo ),
                esc_attr( $logoColor ),
                $logoInfoBottom, // wait due to the transfer
                $logoInfoTop,   // wait due to the transfer
                esc_attr( $h_alignment ), 
                esc_attr( $v_alignment ),
                esc_attr( $hover_effects ),
                esc_attr( $enable_stagger_animation_types ) // 13
            );
        }

    }

    return $logoImages;
}

/**
 * Handle the AJAX request for fetching image data.
 */
function dgls_render_image() {
    // Check nonce for security
    
    // $logo_size = isset($_POST['logo_size']) ? sanitize_text_field($_POST['logo_size']) : 'medium'; // 'medium';
    $logo_image_ids= sanitize_text_field($_POST['image_ids']);
    $logo_size     = sanitize_text_field($_POST['logo_size']); // 'medium';
    $logo_info     = sanitize_text_field($_POST['logo_info']);
    $show_caption  = sanitize_text_field($_POST['show_caption']);
    $custom_link   = sanitize_text_field($_POST['custom_link']);
    $logo_bg_color = sanitize_text_field($_POST['logo_bg_color']);
    $logo_width    = sanitize_text_field($_POST['logo_width']);
    $logo_height   = sanitize_text_field($_POST['logo_height']);
    $logo_padding  = sanitize_text_field($_POST['logo_padding']);
    $logo_margin   = sanitize_text_field($_POST['logo_margin']);
    $target_link   = sanitize_text_field($_POST['target_link']);
    $h_alignment   = sanitize_text_field($_POST['h_alignment']);
    $v_alignment   = sanitize_text_field($_POST['v_alignment']);
    $hover_effects = sanitize_text_field($_POST['hover_effects']);
    $logo_info_position= sanitize_text_field($_POST['logo_info_position']);
    $show_description  = sanitize_text_field($_POST['show_description']);
    $stagger_animation = sanitize_text_field($_POST['stagger_animation']);

    $logoImages = dgls_logo_processing($logo_image_ids, $logo_info, $logo_info_position, $show_description, $show_caption, $custom_link, $logo_bg_color, $logo_size,  $logo_width, $logo_height, $logo_padding, $logo_margin, $target_link, $h_alignment, $v_alignment, $hover_effects, $stagger_animation);

    // Send the image data as JSON response
    wp_send_json_success($logoImages);
    wp_die();
}
add_action('wp_ajax_dgls_render_image', 'dgls_render_image');
add_action('wp_ajax_nopriv_dgls_render_image', 'dgls_render_image');

// Add custom fields to the media attachment edit screen
function dgls_custom_attachment_fields_to_edit($form_fields, $post) {
    // Add Color Field
    $form_fields['dgls_color'] = [
        'label' => 'DGLS Color',
        'input' => 'html', // Use custom HTML for input
        'html'  => '<input type="color" name="attachments[' . $post->ID . '][dgls_color]" value="' . esc_attr(get_post_meta($post->ID, 'dgls_color', true)) . '">',
        'helps' => 'Choose a color for this attachment.',
    ];

    // Add Outside URL Field
    $form_fields['dgls_outside_url'] = [
        'label' => 'DGLS Outside URL',
        'input' => 'url', // URL input field
        'value' => get_post_meta($post->ID, 'dgls_outside_url', true),
        'helps' => 'Enter an external URL related to this attachment.',
    ];

    return $form_fields;
}
add_filter('attachment_fields_to_edit', 'dgls_custom_attachment_fields_to_edit', 10, 2);

// Save custom fields when the attachment is saved
function dgls_custom_attachment_fields_to_save($post, $attachment) {
    if (isset($attachment['dgls_color'])) {
        update_post_meta($post['ID'], 'dgls_color', sanitize_text_field($attachment['dgls_color']));
    }

    if (isset($attachment['dgls_outside_url'])) {
        update_post_meta($post['ID'], 'dgls_outside_url', esc_url_raw($attachment['dgls_outside_url']));
    }

    return $post;
}
add_filter('attachment_fields_to_save', 'dgls_custom_attachment_fields_to_save', 10, 2);

trait LogoShowcaseFun {
    
    /**
     * Add margin and padding fields
     * 
     */
    function dgls_margin_padding(&$fields, $options, $type ) {
        
        $key = $options['key'] . '_' . $type;
 
        $fields[$key] = array(
            'label'				=> sprintf(esc_html__('%1$s %2$s', 'et_builder'), $options['title'], ucwords($type)),
            'type'				=> 'custom_margin',
            'toggle_slug'       => $options['toggle_slug'],
            'sub_toggle'		=> $options['sub_toggle'],
            'default'           => $options['default_'.$type], // default value set using margin/padding type 
            'tab_slug'			=> $options['tab_slug'],
            'mobile_options'    => true,
            'hover'				=> 'tabs',
            'priority' 			=> $options['priority'],
        );
        $fields[$key . '_tablet'] = array(
            'type'            	=> 'skip',
            'tab_slug'        	=> $options['tab_slug'],
            'toggle_slug'		=> $options['toggle_slug'],
            'sub_toggle'		=> $options['sub_toggle']
        );
        $fields[$key.'_phone'] = array(
            'type'            	=> 'skip',
            'tab_slug'        	=> $options['tab_slug'],
            'toggle_slug'		=> $options['toggle_slug'],
            'sub_toggle'		=> $options['sub_toggle']
        );
        $fields[$key.'_last_edited'] = array(
            'type'            	=> 'skip',
            'tab_slug'        	=> $options['tab_slug'],
            'toggle_slug'		=> $options['toggle_slug'],
            'sub_toggle'		=> $options['sub_toggle']
        );
        // added in version 1.0.5
        if(isset($options['show_if'])) {
            $fields[$key]['show_if'] = $options['show_if'];
        }
	    if(isset($options['show_if_not'])) {
		    $fields[$key]['show_if_not'] = $options['show_if_not'];
	    }
    }

    function dgls_add_margin_padding( $options = array() ) {
        $margin_padding = array();
        $default = array(
            'title'         => '',
            'key'           => '',
            'toggle_slug'   => '',
            'sub_toggle'    => null,
            'tab_slug'      => 'advanced',
            'default_padding' => '',
            'default_margin'  => '',
            'option'        => 'both',
            'priority'      => 30
        );
        $args = wp_parse_args( $options, $default );

        if ( $args['option'] === 'both' || $args['option'] === 'margin' ) {
            $this->dgls_margin_padding($margin_padding, $args, 'margin');
        }
        if ( $args['option'] === 'both' || $args['option'] === 'padding' ) {
            $this->dgls_margin_padding($margin_padding, $args, 'padding');
        }
        return $margin_padding;
    }
}


