<?php
/**
 * Plugin Name:       X3P0 - List Users
 * Plugin URI:        https://github.com/x3p0-dev/x3p0-list-users
 * Description:       Adds a block for listing users.
 * Version:           1.0.0-alpha
 * Requires at least: 5.9
 * Requires PHP:      8.0
 * Author:            Justin Tadlock
 * Author URI:        https://x3p0.com
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       x3p0-list-users
 */

namespace X3P0\ListUsers;

// Autoload classes and files.
require_once 'src/Block.php';
require_once 'src/functions-helpers.php';

// Bootstrap the plugin.
plugin();
