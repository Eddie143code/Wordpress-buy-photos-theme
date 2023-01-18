<?php


function website_style_files () {
    wp_enqueue_style('website_main_styles', get_theme_file_uri('/build/index.css'));
    wp_enqueue_script('website_main_styles', get_theme_file_uri('/build/index.js'), array(), '1.0', true);
}



add_action('wp_enqueue_scripts', 'website_style_files');