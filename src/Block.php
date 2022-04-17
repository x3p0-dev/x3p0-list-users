<?php
/**
 * Block class.
 *
 * Registers and renders the block type on the front end.
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2022, Justin Tadlock
 * @link      https://github.com/x3p0-dev/x3p0-list-users
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

namespace X3P0\ListUsers;

use WP_Block;
use WP_User_Query;

class Block
{
        /**
         * Sets up object state.
         *
         * @since 1.0.0
         */
        public function __construct( protected string $path ) {}

        /**
         * Boots the component, running its actions/filters.
         *
         * @since 1.0.0
         */
        public function boot(): void
        {
                add_action( 'init', [ $this, 'register' ] );
        }

	/**
	 * Registers the block with WordPress.
	 *
	 * @since 1.0.0
	 */
        public function register(): void
        {
                register_block_type( $this->path . '/public', [
                        'render_callback' => [ $this, 'render' ]
                ] );
        }

	/**
	 * Renders the block on the front end.
	 *
	 * @since 1.0.0
	 */
        public function render( array $attr, string $content, WP_Block $block ): string
        {
        	$attr = wp_parse_args( $attr, [
			'link'      => true,
			'number'    => 10,
			'order'     => 'asc',
			'orderby'   => 'name'
        	] );

		// `wp_list_users()` does not support linking to the author
		// archive page, so we need to roll out our own query and loop.
		$users = new WP_User_Query( [
			'number'  => $attr['number'],
			'order'   => $attr['order'],
			'orderby' => $attr['orderby']
		] );

		// Bail early if there are no results.
		if ( ! $users->results ) {
			return '';
		}

		$html = '';

		foreach ( $users->results as $user ) {
			$name = esc_html( $user->display_name );

			if ( $attr['link'] ) {
				$name = sprintf(
					'<a href="%s" class="wp-block-x3p0-list-users">%s</a>',
					get_author_posts_url( $user->ID ),
					$name
				);
			}

			$html .= sprintf(
				'<li class="wp-block-x3p0-list-users__item">%s</li>',
				$name
			);
		}

		// Return the formatted block output.
                return sprintf(
                        '<div %s><ul class="wp-block-x3p0-list-users__list">%s</ul></div>',
                        get_block_wrapper_attributes(),
			$html
                );
        }
}
