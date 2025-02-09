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
 * @fs_premium_only /freemius
 * @fs_free_only, /bplugins_sdk
 */

// ABS PATH
if (!defined('ABSPATH')) {
	exit;
}

if (function_exists('atb-fs')) {
	// This for .. if free plugin is installed, and when we will install pro plugin then uninstall free plugin
	register_activation_hook(__FILE__, function () {
		if (is_plugin_active('animated-text-block/plugin.php')) {
			deactivate_plugins('animated-text-block/plugin.php');
		}
		if (is_plugin_active('animated-text-block-pro/plugin.php')) {
			deactivate_plugins('animated-text-block-pro/plugin.php');
		}
	});
} else {
	define('ATB_VERSION', isset($_SERVER['HTTP_HOST']) && 'localhost' === $_SERVER['HTTP_HOST'] ? time() : '1.0.7');
	define('ATB_DIR_URL', plugin_dir_url(__FILE__));
	define('ATB_DIR_PATH', plugin_dir_path(__FILE__));
	define('ATB_HAS_FREE', 'animated-text-block/plugin.php' === plugin_basename(__FILE__));
	define('ATB_HAS_PRO', 'animated-text-block-pro/plugin.php' === plugin_basename(__FILE__));

	if (! function_exists('atb_fs')) {
		// Create a helper function for easy SDK access.
		function atb_fs()
		{
			global $atb_fs;

			if (! isset($atb_fs)) {
				$fsStartPath = dirname(__FILE__) . '/freemius/start.php';
				$bSDKInitPath = dirname(__FILE__) . '/bplugins_sdk/init.php';

				if (ATB_HAS_PRO && file_exists($fsStartPath)) {
					require_once $fsStartPath;
				} else if (ATB_HAS_FREE && file_exists($bSDKInitPath)) {
					require_once $bSDKInitPath;
				}

				$atbConfig = array(
					'id'                  => '17174',
					'slug'                => 'animated-text-block',
					'premium_slug'        => 'animated-text-block-pro',
					'type'                => 'plugin',
					'public_key'          => 'pk_51f816736288458da2dd37c719fd3',
					'is_premium'          => true,
					'premium_suffix'      => 'Pro',
					// If your plugin is a serviceware, set this option to false.
					'has_premium_version' => true,
					'has_addons'          => false,
					'has_paid_plans'      => true,
					'trial'               => array(
						'days'               => 7,
						'is_require_payment' => false,
					),
					'menu'                => array(
						'slug'           => 'edit.php?post_type=animated-text-block',
						'first-path'           => 'edit.php?post_type=animated-text-block&page=atb_demo_page',
						'support'        => false,
					),
				);

				$atb_fs = (ATB_HAS_PRO && file_exists($fsStartPath)) ? fs_dynamic_init($atbConfig) : fs_lite_dynamic_init($atbConfig);
			}

			return $atb_fs;
		}

		// Init Freemius.
		atb_fs();
		// Signal that SDK was initiated.
		do_action('atb_fs_loaded');
	}

	// ... Your plugin's main file logic ...

	function atbIsPremium()
	{
		return ATB_HAS_PRO ? atb_fs()->can_use_premium_code() : false;
	}

	if (!class_exists('ATBPlugin')) {
		class ATBPlugin
		{
			public function __construct()
			{
				add_action('enqueue_block_assets', [$this, 'enqueueBlockAssets']);
				add_action('init', [$this, 'onInit']);

				// sub menu function hooks
				add_action('admin_menu', [$this, 'addSubmenu']);
				add_action('admin_enqueue_scripts', [$this, 'adminEnqueueScripts']);

				// Post Type function hooks 
				add_action('init', array($this, 'atb_animated_text_block_post_type'));

				// shortcode type function hooks 
				add_shortcode('animated-text', [$this, 'atb_shortcode_handler']);

				//manage column 
				add_filter('manage_animated-text-block_posts_columns', [$this, 'animatedTextManageColumns'], 10);

				// Custom manage column 
				add_action('manage_animated-text-block_posts_custom_column', [$this, 'animatedTextManageCustomColumns'], 10, 2);
			}

			//manage column
			function animatedTextManageColumns($defaults)
			{
				unset($defaults['date']);
				$defaults['shortcode'] = 'ShortCode';
				$defaults['date'] = 'Date';
				return $defaults;
			}

			// custom manage column
			function animatedTextManageCustomColumns($column_name, $post_ID)
			{
				if ($column_name == 'shortcode') {
					echo '<div class="bPlAdminShortcode" id="bPlAdminShortcode-' . esc_attr($post_ID) . '">
				 <input value="[animated-text id=' . esc_attr($post_ID) . ']" onclick="copyBPlAdminShortcode(\'' . esc_attr($post_ID) . '\')" readonly>
				 <span class="tooltip">Copy To Clipboard</span>
			 </div>';
				}
			}


			// shortcode function calls 
			function atb_shortcode_handler($attributes)
			{
				$postID = $attributes['id'];
				$post = get_post($postID);
				$blocks = parse_blocks($post->post_content);
				ob_start();
				echo render_block($blocks[0]);
				return ob_get_clean();
			}


			// Custom Post Type function calls
			function atb_animated_text_block_post_type()
			{
				register_post_type(
					'animated-text-block',
					array(
						'label' => 'Animated Text',
						'labels' => [
							'add_new' => 'Add New',
							'add_new_item' => 'Add New',
							'edit_item' => 'Edit Animated',
							'not_found' => 'There is no please add one',
							'item_published' => 'Animated Text Published',
							'item_updated' => 'Animated Text Updated'
						],
						'public' => false,
						'show_ui' => true,
						'show_in_rest' => true,
						'menu_icon' =>  'dashicons-editor-ul',
						'template' => [['atb/animated-text']],
						'template_lock' => 'all',
					)
				);
			}


			function atbPipeChecker()
			{
				$nonce = $_POST['_wpnonce'] ?? null;

				if (!wp_verify_nonce($nonce, 'wp_ajax')) {
					wp_send_json_error('Invalid Request');
				}

				wp_send_json_success([
					'isPipe' => atbIsPremium()
				]);
			}

			function registerSettings()
			{
				register_setting('atbUtils', 'atbUtils', [
					'show_in_rest' => [
						'name' => 'atbUtils',
						'schema' => ['type' => 'string']
					],
					'type' => 'string',
					'default' => wp_json_encode(['nonce' => wp_create_nonce('wp_ajax')]),
					'sanitize_callback' => 'sanitize_text_field'
				]);
			}



			function enqueueBlockAssets()
			{
				wp_register_style('animate', ATB_DIR_URL . 'public/css/animate.min.css', [], '4.1.1');
				wp_register_script('textillate', ATB_DIR_URL . 'public/js/jquery.textillate.min.js', ['jquery'], ATB_VERSION, true);
			}

			function onInit()
			{
				register_block_type(__DIR__ . '/build');
			}

			function addSubmenu()
			{
				add_submenu_page(
					'edit.php?post_type=animated-text-block',
					'Demo Page',
					'Demo & Help',
					'manage_options',
					'atb_demo_page',
					[$this, 'atb_render_demo_page']
				);
			}

			function renderTemplate($content)
			{
				$parseBlocks = parse_blocks($content);
				return render_block($parseBlocks[0]);
			}

			function atb_render_demo_page()
			{ ?>
				<div id="bplAdminHelpPage" data-version='<?php echo esc_attr(ATB_VERSION) ?>' data-is-premium='<?php echo esc_attr(atbIsPremium()); ?>'>
					<div class='renderHere'>

					</div>
					<div class="templates">
						<div class="default">
							<?php echo $this->renderTemplate('<!-- wp:atb/animated-text {"inEffect":"bounce","outEffect":"flipOutX","background":{"color":"#111111","type":"solid","gradient":"linear-gradient(135deg, #ff7db8, #ee2a7b)"},"typography":{"fontSize":{"desktop":32,"tablet":20,"mobile":18},"lineHeight":"135%","textTransform":"none","fontWeight":400,"letterSpace":"0px","fontVariant":"400"},"color":"rgba(39, 171, 191, 1)","animatedSize":{"width":{"desktop":"100%","tablet":"","mobile":""},"height":{"desktop":"","tablet":"","mobile":""}},"gsapAnimation":{"animationSpeed":0,"perspectiveDepth":500,"enableOscillation":true,"repeatBehavior":-1,"repeatDelay":0,"animationEffect":"default","autoRepeat":true,"transformOrigin":400,"randomColor":true,"isTextShadow":false,"textShadow":[{"blur":"5px","color":"#A4A4A4","hOffset":"2px","isInset":false,"spreed":"0px","vOffset":"-1px"}],"fontStretch":"200%","animationDuration":0.8,"waveEffect":25,"easeType":"elastic(0.3, 0.2)","scaleX":1.5,"scaleY":0.2,"typingSpeed":300,"reStartTime":1000,"animateType":"glitch","customColor":false}} /-->'); ?>
						</div>
						<div class="theme1" style="width:600px">
							<?php echo $this->renderTemplate('<!-- wp:atb/animated-text {"options":{"theme":"type1"},"background":{"color":"#000"},"typography":{"fontSize":{"desktop":120,"tablet":100,"mobile":80},"textTransform":"uppercase","fontWeight":500,"lineHeight":"135%"},"color":"#fff","gsapAnimation":{"animationSpeed":30,"perspectiveDepth":500,"enableOscillation":true,"repeatBehavior":-1,"repeatDelay":0,"animationEffect":"default","autoRepeat":true,"transformOrigin":400,"randomColor":false,"isTextShadow":false,"textShadow":[{"blur":"19px","color":"rgba(39, 195, 130, 1)","hOffset":"4px","isInset":false,"spreed":"0px","vOffset":"1px"}],"fontStretch":"200%","animationDuration":2,"waveEffect":25,"easeType":"elastic(0.3, 0.2)","scaleX":1.5,"scaleY":0.2,"typingSpeed":100,"reStartTime":1000,"animateType":"glitch","customColor":false}} /-->'); ?>
						</div>
						<div class="theme2" style="width:600px">
							<?php echo $this->renderTemplate('<!-- wp:atb/animated-text {"options":{"theme":"type2"},"inEffect":"bounce","outEffect":"flipOutX","background":{"color":"#000","type":"solid","gradient":"linear-gradient(135deg, #ff7db8, #ee2a7b)"},"typography":{"fontSize":{"desktop":25,"tablet":18,"mobile":14},"lineHeight":"135%","textTransform":"none","fontWeight":400,"letterSpace":"0px","fontVariant":400,"fontFamily":"Default","fontCategory":"sans-serif"},"color":"#fff","padding":{"vertical":"30px","horizontal":"15px"},"gsapAnimation":{"animationSpeed":2.8,"perspectiveDepth":500,"enableOscillation":true,"repeatBehavior":-1,"repeatDelay":2,"animationEffect":"default","autoRepeat":true,"transformOrigin":400,"randomColor":true,"isTextShadow":true,"textShadow":[{"blur":"4px","color":"rgba(39, 195, 130, 1)","hOffset":"4px","isInset":false,"spreed":"0px","vOffset":"1px"}],"fontStretch":"200%","animationDuration":0.8,"waveEffect":25,"easeType":"elastic(0.3, 0.2)","scaleX":1.5,"scaleY":0.2,"typingSpeed":300,"reStartTime":1000,"animateType":"wave","customColor":false}} /-->'); ?>
						</div>
						<div class="theme3" style="width:600px">
							<?php echo $this->renderTemplate('<!-- wp:atb/animated-text {"options":{"theme":"type3"},"background":{"color":"#000"},"typography":{"fontSize":{"desktop":30,"tablet":26,"mobile":20},"textTransform":"capitalize","fontWeight":600,"lineHeight":"0%"},"color":"#fff","padding":{"vertical":"66px","horizontal":"15px"},"gsapAnimation":{"animationSpeed":1,"perspectiveDepth":500,"enableOscillation":true,"repeatBehavior":-1,"repeatDelay":1,"animationEffect":"default","autoRepeat":true,"transformOrigin":400,"randomColor":false,"isTextShadow":true,"textShadow":[{"blur":"7px","color":"rgba(39, 195, 130, 1)","hOffset":"4px","isInset":false,"spreed":"0px","vOffset":"1px"}],"fontStretch":"200%","animationDuration":2,"waveEffect":25,"easeType":"elastic(0.3, 0.2)","scaleX":1.5,"scaleY":0.2,"typingSpeed":100,"reStartTime":1000,"animateType":"glitch","customColor":false}} /-->'); ?>
						</div>
						<div class="theme4" style="width:800px">
							<?php echo $this->renderTemplate('<!-- wp:atb/animated-text {"options":{"theme":"type4"},"background":{"color":"#000"},"content":"Animation","typography":{"fontSize":{"desktop":65,"tablet":55,"mobile":45},"textTransform":"uppercase","fontWeight":700,"lineHeight":"135%","letterSpace":"2px"},"color":"#fff","gsapAnimation":{"animationSpeed":1,"perspectiveDepth":500,"enableOscillation":true,"repeatBehavior":-1,"repeatDelay":1,"animationEffect":"default","autoRepeat":true,"transformOrigin":400,"randomColor":true,"isTextShadow":true,"textShadow":[{"blur":"19px","color":"rgba(39, 195, 130, 1)","hOffset":"4px","isInset":false,"spreed":"0px","vOffset":"1px"}],"fontStretch":"200%","animationDuration":1,"waveEffect":25,"easeType":"elastic(0.3, 0.2)","scaleX":1.5,"scaleY":0.2,"typingSpeed":100,"reStartTime":1000,"animateType":"glitch","customColor":false}} /-->'); ?>
						</div>
						<div class="theme5" style="width:600px">
							<?php echo $this->renderTemplate('<!-- wp:atb/animated-text {"options":{"theme":"type5"},"background":{"color":"#000"},"content":"Animated text","typography":{"fontSize":{"desktop":45,"tablet":35,"mobile":25},"textTransform":"uppercase","fontWeight":700,"lineHeight":"135%"},"color":"#fff","padding":{"vertical":"49px","horizontal":"15px"},"gsapAnimation":{"animationSpeed":1,"perspectiveDepth":500,"enableOscillation":true,"repeatBehavior":-1,"repeatDelay":1,"animationEffect":"default","autoRepeat":true,"transformOrigin":400,"randomColor":false,"isTextShadow":true,"textShadow":[{"blur":"4px","color":"rgba(39, 195, 130, 1)","hOffset":"4px","isInset":false,"spreed":"0px","vOffset":"1px"}],"fontStretch":"200%","animationDuration":1.2,"waveEffect":25,"easeType":"elastic(0.3, 0.2)","scaleX":1.5,"scaleY":0.2,"typingSpeed":100,"reStartTime":1000,"animateType":"glitch","customColor":false}} /-->'); ?>
						</div>
						<div class="theme6" style="width:700px">
							<?php echo $this->renderTemplate('<!-- wp:atb/animated-text {"options":{"theme":"type6"},"inEffect":"bounce","outEffect":"flipOutX","background":{"color":"#FF7F99","type":"solid","gradient":"linear-gradient(135deg, #ff7db8, #ee2a7b)"},"content":"Jello","typography":{"fontSize":{"desktop":160,"tablet":100,"mobile":80},"lineHeight":0,"textTransform":"none","fontWeight":700,"letterSpace":"0px","fontVariant":"400"},"color":"#fff","gsapAnimation":{"animationSpeed":1,"perspectiveDepth":500,"enableOscillation":true,"repeatBehavior":-1,"repeatDelay":1,"animationEffect":"default","autoRepeat":true,"transformOrigin":400,"randomColor":true,"isTextShadow":true,"textShadow":[{"blur":"0px","color":"rgba(224, 107, 134, 1)","hOffset":"3px","isInset":false,"spreed":"0px","vOffset":"3px"},{"hOffset":"6px","vOffset":"6px","blur":"0px","spreed":"0px","color":"rgba(212, 91, 118, 1)","isInset":false},{"hOffset":"9px","vOffset":"9px","blur":"0px","spreed":"0px","color":"rgba(197, 75, 102, 1)","isInset":false}],"fontStretch":"200%","animationDuration":2,"waveEffect":25,"easeType":"elastic(0.3, 0.2)","scaleX":1.5,"scaleY":0.2,"typingSpeed":300,"reStartTime":1000,"animateType":"glitch","customColor":false}} /-->'); ?>
						</div>
						<div class="theme7" style="width:700px">
							<?php echo $this->renderTemplate('<!-- wp:atb/animated-text {"options":{"theme":"type7"},"inEffect":"bounce","outEffect":"flipOutX","background":{"color":"#000","type":"solid","gradient":"linear-gradient(135deg, #ff7db8, #ee2a7b)"},"content":"ETC ETC ETC","typography":{"fontSize":{"desktop":65,"tablet":45,"mobile":35},"lineHeight":"0%","textTransform":"uppercase","fontWeight":900,"letterSpace":"0px","fontVariant":"400"},"color":"#fff","gsapAnimation":{"animationSpeed":1,"perspectiveDepth":500,"enableOscillation":true,"repeatBehavior":-1,"repeatDelay":1,"animationEffect":"default","autoRepeat":true,"transformOrigin":400,"randomColor":true,"isTextShadow":true,"textShadow":[{"blur":"19px","color":"rgba(39, 195, 130, 1)","hOffset":"4px","isInset":false,"spreed":"0px","vOffset":"1px"}],"fontStretch":"200%","animationDuration":0.8,"waveEffect":25,"easeType":"elastic(0.3, 0.2)","scaleX":1.5,"scaleY":0.2,"typingSpeed":300,"reStartTime":1000,"animateType":"glitch","customColor":false}} /-->'); ?>
						</div>
						<div class="theme8" style="width:700px">
							<?php echo $this->renderTemplate('<!-- wp:atb/animated-text {"options":{"theme":"type8"},"inEffect":"bounce","outEffect":"flipOutX","background":{"color":"#22292C","type":"solid","gradient":"linear-gradient(135deg, #ff7db8, #ee2a7b)"},"typography":{"fontSize":{"desktop":35,"tablet":25,"mobile":18},"lineHeight":"135%","textTransform":"none","fontWeight":400,"letterSpace":"0px","fontVariant":400,"fontFamily":"Default","fontCategory":"sans-serif"},"color":"#fff","gsapAnimation":{"animationSpeed":1,"perspectiveDepth":500,"enableOscillation":true,"repeatBehavior":-1,"repeatDelay":1,"animationEffect":"default","autoRepeat":true,"transformOrigin":400,"randomColor":true,"isTextShadow":true,"fontStretch":"200%","animationDuration":0.8,"waveEffect":25,"easeType":"elastic(0.3, 0.2)","scaleX":1.5,"scaleY":0.2,"typingSpeed":100,"reStartTime":1000,"animateType":"glitch","customColor":false}} /-->'); ?>
						</div>
						<div class="theme9" style="width:700px">
							<?php echo $this->renderTemplate('<!-- wp:atb/animated-text {"options":{"theme":"type9"},"inEffect":"bounce","outEffect":"flipOutX","background":{"color":"#22292C","type":"solid","gradient":"linear-gradient(135deg, #ff7db8, #ee2a7b)"},"content":"bPlugins","typography":{"fontSize":{"desktop":80,"tablet":60,"mobile":40},"lineHeight":"135%","textTransform":"none","fontWeight":700,"letterSpace":"2px","fontVariant":400,"fontFamily":"Default","fontCategory":"sans-serif"},"color":"#FFFFFF","gsapAnimation":{"animationSpeed":1,"perspectiveDepth":500,"enableOscillation":true,"repeatBehavior":-1,"repeatDelay":1,"animationEffect":"default","autoRepeat":false,"transformOrigin":400,"randomColor":true,"isTextShadow":false,"textShadow":[{"blur":"19px","color":"rgba(39, 195, 130, 1)","hOffset":"4px","isInset":false,"spreed":"0px","vOffset":"1px"}],"fontStretch":"200%","animationDuration":0.8,"waveEffect":25,"easeType":"elastic(0.3, 0.2)","scaleX":1.5,"scaleY":0.2,"typingSpeed":300,"reStartTime":1000,"animateType":"glitch","customColor":false}} /-->'); ?>
						</div>
						<div class="theme10" style="width:700px">
							<?php echo $this->renderTemplate('<!-- wp:atb/animated-text {"options":{"theme":"type10"},"inEffect":"bounce","outEffect":"flipOutX","background":{"color":"#22292C","type":"solid","gradient":"linear-gradient(135deg, #ff7db8, #ee2a7b)"},"typography":{"fontSize":{"desktop":30,"tablet":25,"mobile":18},"lineHeight":"135%","textTransform":"none","fontWeight":400,"letterSpace":"0px","fontVariant":400,"fontFamily":"Default","fontCategory":"sans-serif"},"color":"#FFFFFF","padding":{"vertical":"45px","horizontal":"15px"},"gsapAnimation":{"animationSpeed":1,"perspectiveDepth":500,"enableOscillation":true,"repeatBehavior":-1,"repeatDelay":1,"animationEffect":"default","autoRepeat":false,"transformOrigin":400,"randomColor":true,"isTextShadow":true,"textShadow":[{"blur":"3px","color":"rgba(39, 195, 130, 1)","hOffset":"4px","isInset":false,"spreed":"0px","vOffset":"1px"}],"fontStretch":"200%","animationDuration":0.8,"waveEffect":25,"easeType":"elastic(0.3, 0.2)","scaleX":1.5,"scaleY":0.2,"typingSpeed":300,"reStartTime":1000,"animateType":"wave","customColor":false}} /-->'); ?>
						</div>
					</div>
				</div>
<?php }

			function adminEnqueueScripts()
			{

				// dashboard shortcode copy function
				wp_enqueue_style('admin-post-css', ATB_DIR_URL . 'build/admin-post-css.css', [], ATB_VERSION);
				wp_enqueue_script('admin-post-js', ATB_DIR_URL . 'build/admin-post.js', [], ATB_VERSION, true);

				// live frontend preview in dashboard
				wp_register_script('atb-view', ATB_DIR_URL . 'build/view.js', ['react', 'react-dom'], ATB_VERSION);
				wp_register_style('fontAwesome', ATB_DIR_URL . 'assets/css/font-awesome.min.css', [], ATB_VERSION);
				wp_register_style('atb-view', ATB_DIR_URL . 'build/view.css', ['fontAwesome'], ATB_VERSION);

				// payment gateway display in dashboard
				wp_enqueue_script('fs', ATB_DIR_URL . 'assets/js/fs.js', [], '1');
				wp_enqueue_style('atb-admin-help', ATB_DIR_URL . 'build/admin-help.css', ['atb-view'], ATB_VERSION);
				wp_enqueue_script('atb-admin-help', ATB_DIR_URL . 'build/admin-help.js', ['react', 'react-dom', 'wp-components', 'fs'], ATB_VERSION);
				wp_set_script_translations('atb-admin-help', 'animated-text', ATB_DIR_URL . 'languages');
			}
		}
		new ATBPlugin();
	}
}
