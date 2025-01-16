<?php
/**
 * Plugin Name: Animated Text Block
 * Description: Apply animation on any text.
 * Version: 1.0.7
 * Author: bPlugins
 * Author URI: https://bplugins.com
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: animated-text
 */

// ABS PATH
if ( !defined( 'ABSPATH' ) ) { exit; }

define( 'ATB_VERSION', isset( $_SERVER['HTTP_HOST'] ) && 'localhost' === $_SERVER['HTTP_HOST'] ? time() : '1.0.7' );
define( 'ATB_DIR_URL', plugin_dir_url( __FILE__ ) );
define( 'ATB_DIR_PATH', plugin_dir_path( __FILE__ ) );

if( !class_exists( 'ATBPlugin' ) ){
	class ATBPlugin{
		public function __construct(){
			add_action( 'enqueue_block_assets', [$this, 'enqueueBlockAssets'] );
			add_action( 'init', [$this, 'onInit'] );
		}
	
		function enqueueBlockAssets(){
			wp_register_style( 'animate', ATB_DIR_URL . 'public/css/animate.min.css', [], '4.1.1' );
			wp_register_script( 'textillate', ATB_DIR_URL . 'public/js/jquery.textillate.min.js', [ 'jquery' ], ATB_VERSION, true );
		}
	
		function onInit(){
			register_block_type( __DIR__ . '/build' );
		}
	}
	new ATBPlugin();
}