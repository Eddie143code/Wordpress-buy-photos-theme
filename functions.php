<?php


function website_files () {
    wp_enqueue_style('website_main_styles', get_theme_file_uri('/build/index.css'));
    wp_enqueue_script('website_main_js', get_theme_file_uri('/build/index.js'), array(), '1.0', true);

    wp_localize_script('website_main_js', 'websiteData', array(
        'root_url' => get_site_url(),
        'nonce' => wp_create_nonce('wp_rest')
      ));
}



add_action('wp_enqueue_scripts', 'website_files');




?>