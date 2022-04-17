/**
 * Entry point.
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2022, Justin Tadlock
 * @link      https://github.com/x3p0-dev/x3p0-list-users
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

// Let webpack process stylesheets.
import './css/style.scss';

// WordPress dependencies.
import { registerBlockType } from '@wordpress/blocks';

// Import block metadata and settings.
import * as block from './js/index';

// Register block type.
registerBlockType( block.metadata, block.settings );
