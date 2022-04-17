/**
 * Block index file.
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2022, Justin Tadlock
 * @link      https://github.com/x3p0-dev/x3p0-list-users
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

// Internal dependencies.
import edit from './edit';
import icon from './icon';
import save from './save';

// Export the block type metadata.
export { default as metadata } from '../block.json';

// Export the block type settings.
export const settings = {
        icon: icon,
	edit,
	save
};
