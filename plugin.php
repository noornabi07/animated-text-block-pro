<?php

/**
 * Plugin Name: Animated Text Block
 * Description: Apply animation on any text.
 * Version: 1.1.0
 * Author: bPlugins
 * Author URI: https://bplugins.com
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: animated-text
 * @fs_premium_only /freemius
 * @fs_free_only, /bplugins_sdk
 */

// ABS PATH
if (! defined('ABSPATH')) {
	exit;
}

if (function_exists('atb_fs')) {
	atb_fs()->set_basename(true, __FILE__);
} else {
	/**
	 * DO NOT REMOVE THIS IF, IT IS ESSENTIAL FOR THE
	 * `function_exists` CALL ABOVE TO PROPERLY WORK.
	 */
	define('ATB_VERSION', isset($_SERVER['HTTP_HOST']) && 'localhost' === $_SERVER['HTTP_HOST'] ? time() : '1.1.0');
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
					'id'                  => '17879',
					'slug'                => 'animated-text-block',
					'premium_slug'        => 'animated-text-block-pro',
					'type'                => 'plugin',
					'public_key'          => 'pk_64045f2c4e13c86dc40f805c6062b',
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

				// premium checker 
				add_action('wp_ajax_atbPipeChecker', [$this, 'atbPipeChecker']);
				add_action('wp_ajax_nopriv_atbPipeChecker', [$this, 'atbPipeChecker']);
				add_action('admin_init', [$this, 'registerSettings']);
				add_action('rest_api_init', [$this, 'registerSettings']);

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

				$menuIcon = "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 195 195' fill='#fff'><path fill='#fff' d='M40.4 53.2C25.6 64.3 17.9 79.5 17.9 97.5C17.9 104.9 18.4 108.5 20.5 114.5C24.2 125.7 30.6 134.4 40.5 141.9L43.5 144.2L39 143.5C12.7 139.2 -5.1 112.1 1.5 86.5C5.9 69.8 19.7 55.9 35.7 52.1C42.5 50.5 43.6 50.7 40.4 53.2Z' /><path fill='#fff' d='M65.4 53.2C50.6 64.3 42.9 79.5 42.9 97.5C42.9 104.9 43.4 108.5 45.5 114.5C49.2 125.7 55.6 134.4 65.5 141.9L68.5 144.2L64 143.5C37.7 139.2 19.9 112.1 26.5 86.5C30.9 69.8 44.7 55.9 60.7 52.1C67.5 50.5 68.6 50.7 65.4 53.2Z' /><path fill='#fff' d='M91.4 53.2C76.6 64.3 68.9 79.5 68.9 97.5C68.9 104.9 69.4 108.5 71.5 114.5C75.2 125.7 81.6 134.4 91.5 141.9L94.5 144.2L90 143.5C63.7 139.2 45.9 112.1 52.5 86.5C56.9 69.8 70.7 55.9 86.7 52.1C93.5 50.5 94.6 50.7 91.4 53.2Z' /><path fill='#fff' d='M116.4 53.2C101.6 64.3 93.9 79.5 93.9 97.5C93.9 104.9 94.4 108.5 96.5 114.5C100.2 125.7 106.6 134.4 116.5 141.9L119.5 144.2L115 143.5C88.7 139.2 70.9 112.1 77.5 86.5C81.9 69.8 95.7 55.9 111.7 52.1C118.5 50.5 119.6 50.7 116.4 53.2Z' /><path fill='#fff' d='M161.9 52.9C177.8 57.8 190.5 71.8 193.9 87.8C199.9 116.6 177.8 144.1 148.7 144C134.9 143.9 124.9 139.9 115.4 130.5C96.7 111.9 96.7 83 115.4 64.5C121.7 58.3 128.2 54.5 136 52.4C142.9 50.5 154.9 50.7 161.9 52.9Z' /></svg>";

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
						'menu_icon' =>  'data:image/svg+xml;base64,' . base64_encode($menuIcon),
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
					<div class="templates" style="display: none;">
						<div class="theme1" style="width:600px" margin="0 auto">
							<?php echo $this->renderTemplate('<!-- wp:atb/animated-text {"options":{"theme":"type1"},"background":{"color":"#000"},"typography":{"fontSize":{"desktop":120,"tablet":100,"mobile":80},"textTransform":"uppercase","fontWeight":500,"lineHeight":"135%"},"color":"#fff","gsapAnimation":{"animationSpeed":30,"perspectiveDepth":500,"enableOscillation":true,"repeatBehavior":-1,"repeatDelay":0,"animationEffect":"default","autoRepeat":true,"transformOrigin":400,"randomColor":false,"isTextShadow":false,"textShadow":[{"blur":"19px","color":"rgba(39, 195, 130, 1)","hOffset":"4px","isInset":false,"spreed":"0px","vOffset":"1px"}],"fontStretch":"200%","animationDuration":2,"waveEffect":25,"easeType":"elastic(0.3, 0.2)","scaleX":1.5,"scaleY":0.2,"typingSpeed":100,"reStartTime":1000,"animateType":"glitch","customColor":false}} /-->'); ?>
						</div>
						<div class="theme2" style="width:600px" margin="0 auto">
							<?php echo $this->renderTemplate('<!-- wp:atb/animated-text {"options":{"theme":"type2"},"background":{"color":"#000"},"content":"Professionally reintermediate economically sound services after highly efficient ideas. Dynamically integrate reliable benefits without value-added ROI. Collaboratively.","typography":{"fontSize":{"desktop":20,"tablet":18,"mobile":14},"textTransform":"none","lineHeight":"135%","fontWeight":400,"letterSpace":"2px"},"color":"#fff","padding":{"vertical":"40px","horizontal":"15px"},"gsapAnimation":{"animationSpeed":2,"perspectiveDepth":500,"enableOscillation":true,"repeatBehavior":-1,"repeatDelay":2,"animationEffect":"default","autoRepeat":true,"transformOrigin":400,"randomColor":true,"isTextShadow":false,"textShadow":[{"blur":"6px","color":"rgba(39, 195, 130, 1)","hOffset":"4px","isInset":false,"spreed":"0px","vOffset":"1px"}],"fontStretch":"200%","animationDuration":0.8,"waveEffect":25,"easeType":"elastic(0.3, 0.2)","scaleX":1.5,"scaleY":0.2,"typingSpeed":300,"reStartTime":1000,"animateType":"glitch","customColor":false}} /-->'); ?>
						</div>
						<div class="theme3" style="width:600px" margin="0 auto">
							<?php echo $this->renderTemplate('<!-- wp:atb/animated-text {"options":{"theme":"type3"},"background":{"color":"#000"},"typography":{"fontSize":{"desktop":30,"tablet":26,"mobile":20},"textTransform":"capitalize","fontWeight":600,"lineHeight":"0%"},"color":"#fff","padding":{"vertical":"66px","horizontal":"15px"},"gsapAnimation":{"animationSpeed":1,"perspectiveDepth":500,"enableOscillation":true,"repeatBehavior":-1,"repeatDelay":1,"animationEffect":"default","autoRepeat":true,"transformOrigin":400,"randomColor":false,"isTextShadow":true,"textShadow":[{"blur":"7px","color":"rgba(39, 195, 130, 1)","hOffset":"4px","isInset":false,"spreed":"0px","vOffset":"1px"}],"fontStretch":"200%","animationDuration":2,"waveEffect":25,"easeType":"elastic(0.3, 0.2)","scaleX":1.5,"scaleY":0.2,"typingSpeed":100,"reStartTime":1000,"animateType":"glitch","customColor":false}} /-->'); ?>
						</div>
						<div class="theme4" style="width:800px" margin="0 auto">
							<img src="<?php echo esc_url(ATB_DIR_URL . './assets/images/theme4.gif')  ?>" alt="">
						</div>
						<div class="theme5" style="width:600px" margin="0 auto">
							<img src="<?php echo esc_url(ATB_DIR_URL . './assets/images/theme5.gif')  ?>" alt="">
						</div>
						<div class="theme6" style="width:700px" margin="0 auto">
							<img src="<?php echo esc_url(ATB_DIR_URL . './assets/images/theme12.gif')  ?>" alt="">
						</div>
						<div class="theme7" style="width:700px" margin="0 auto">
							<?php echo $this->renderTemplate('<!-- wp:atb/animated-text {"options":{"theme":"type7"},"background":{"color":"#000"},"content":"ETC ETC ETC","typography":{"fontSize":{"desktop":65,"tablet":45,"mobile":35},"textTransform":"uppercase","lineHeight":"0%","fontWeight":900,"letterSpace":"2px"},"color":"#fff","padding":{"vertical":"20px","horizontal":"15px"},"gsapAnimation":{"animationSpeed":1,"perspectiveDepth":500,"enableOscillation":true,"repeatBehavior":-1,"repeatDelay":1,"animationEffect":"default","autoRepeat":true,"transformOrigin":400,"randomColor":false,"isTextShadow":true,"textShadow":[{"blur":"5px","color":"rgba(39, 195, 130, 1)","hOffset":"4px","isInset":false,"spreed":"0px","vOffset":"1px"}],"fontStretch":"200%","animationDuration":0.8,"waveEffect":25,"easeType":"elastic(0.3, 0.2)","scaleX":1.2,"scaleY":0.1,"typingSpeed":300,"reStartTime":1000,"animateType":"glitch","customColor":false}} /-->'); ?>
						</div>
						<div class="theme8" style="width:700px" margin="0 auto">
							<?php echo $this->renderTemplate('<!-- wp:atb/animated-text {"options":{"theme":"type8"},"inEffect":"bounce","outEffect":"flipOutX","background":{"color":"#22292C","type":"solid","gradient":"linear-gradient(135deg, #ff7db8, #ee2a7b)"},"typography":{"fontSize":{"desktop":35,"tablet":25,"mobile":18},"lineHeight":"135%","textTransform":"none","fontWeight":400,"letterSpace":"0px","fontVariant":400,"fontFamily":"Default","fontCategory":"sans-serif"},"color":"#fff","gsapAnimation":{"animationSpeed":1,"perspectiveDepth":500,"enableOscillation":true,"repeatBehavior":-1,"repeatDelay":1,"animationEffect":"default","autoRepeat":true,"transformOrigin":400,"randomColor":true,"isTextShadow":true,"fontStretch":"200%","animationDuration":0.8,"waveEffect":25,"easeType":"elastic(0.3, 0.2)","scaleX":1.5,"scaleY":0.2,"typingSpeed":100,"reStartTime":1000,"animateType":"glitch","customColor":false}} /-->'); ?>
						</div>
						<div class="theme9" style="width:700px;" margin="0 auto">
							<?php echo $this->renderTemplate('<!-- wp:atb/animated-text {"options":{"theme":"type9"},"background":{"color":"#22292C"},"content":"bPlugins","typography":{"fontSize":{"desktop":80,"tablet":60,"mobile":40},"textTransform":"none","lineHeight":"135%","letterSpace":"2px","fontWeight":700},"color":"#FFFFFF","gsapAnimation":{"animationSpeed":1,"perspectiveDepth":500,"enableOscillation":true,"repeatBehavior":-1,"repeatDelay":1,"animationEffect":"default","autoRepeat":false,"transformOrigin":400,"randomColor":true,"isTextShadow":false,"textShadow":[{"blur":"19px","color":"rgba(39, 195, 130, 1)","hOffset":"4px","isInset":false,"spreed":"0px","vOffset":"1px"}],"fontStretch":"200%","animationDuration":0.8,"waveEffect":25,"easeType":"elastic(0.3, 0.2)","scaleX":1.5,"scaleY":0.2,"typingSpeed":305,"reStartTime":1000,"animateType":"glitch","customColor":false}} /-->'); ?>
						</div>
						<div class="theme10" style="width:700px" margin="0 auto">
							<?php echo $this->renderTemplate('<!-- wp:atb/animated-text {"options":{"theme":"type10"},"background":{"color":"#22292C"},"typography":{"fontSize":{"desktop":30,"tablet":25,"mobile":18},"textTransform":"none","lineHeight":"135%","letterSpace":"4px","fontWeight":400},"color":"#FFFFFF","padding":{"vertical":"75px","horizontal":"15px"},"gsapAnimation":{"animationSpeed":1,"perspectiveDepth":500,"enableOscillation":true,"repeatBehavior":-1,"repeatDelay":1,"animationEffect":"default","autoRepeat":false,"transformOrigin":400,"randomColor":true,"isTextShadow":true,"textShadow":[{"blur":"5px","color":"rgba(39, 195, 130, 1)","hOffset":"4px","isInset":false,"spreed":"0px","vOffset":"1px"}],"fontStretch":"200%","animationDuration":0.8,"waveEffect":25,"easeType":"elastic(0.3, 0.2)","scaleX":1.5,"scaleY":0.2,"typingSpeed":300,"reStartTime":1000,"animateType":"wave","customColor":false}} /-->'); ?>
						</div>
					</div>
				</div>
<?php
			}

			function adminEnqueueScripts()
			{
				$screen = get_current_screen();

				if (isset($screen->post_type) && $screen->post_type === 'animated-text-block') {
					// dashboard shortcode copy function
					wp_enqueue_style('admin-post-css', ATB_DIR_URL . 'build/admin-post-css.css', [], ATB_VERSION);
					wp_enqueue_script('admin-post-js', ATB_DIR_URL . 'build/admin-post.js', [], ATB_VERSION, true);
				}

				// live frontend preview in dashboard
				wp_register_script('atb-view', ATB_DIR_URL . 'build/view.js', ['react', 'react-dom'], ATB_VERSION);
				wp_register_style('fontAwesome', ATB_DIR_URL . 'assets/css/font-awesome.min.css', [], ATB_VERSION);
				wp_register_style('atb-view', ATB_DIR_URL . 'build/view.css', ['fontAwesome'], ATB_VERSION);

				if (isset($screen->base) && $screen->base === 'animated-text-block_page_atb_demo_page') {
					wp_enqueue_script('fs', ATB_DIR_URL . 'assets/js/fs.js', [], '1');
					wp_enqueue_style('atb-admin-help', ATB_DIR_URL . 'build/admin-help.css', ['atb-view'], ATB_VERSION);
					wp_enqueue_script('atb-admin-help', ATB_DIR_URL . 'build/admin-help.js', ['react', 'react-dom', 'wp-components', 'fs'], ATB_VERSION);
					wp_set_script_translations('atb-admin-help', 'animated-text', ATB_DIR_URL . 'languages');
				}

				// payment gateway display in dashboard
			}
		}
		new ATBPlugin();
	}
}
