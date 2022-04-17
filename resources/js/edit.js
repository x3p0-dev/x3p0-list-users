/**
 * Block edit.
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2022, Justin Tadlock
 * @link      https://github.com/x3p0-dev/x3p0-list-users
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

// WordPress dependencies.
import {
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';

import {
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl
} from '@wordpress/components';

import { store }     from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { __ }        from '@wordpress/i18n';

/**
 * Exports the block edit function.
 *
 * @since 1.0.0
 */
export default function Edit( {
	attributes: {
		link,
		number,
		order,
		orderby
	},
	setAttributes
} ) {
	// Get used based on the attributes.
	const users = useSelect( ( select ) => {
		const { getUsers } = select( store );

		const users = getUsers( {
			per_page: number,
			context:  'view',
			order:    order,
			orderby:  orderby
		} );

		return users ?? [];
	}, [
		// Attributes that update the query when changed.
		number,
		order,
		orderby
	] );

	const blockProps = useBlockProps();

	const inspectorControls = (
		<InspectorControls>
			<PanelBody title={ __( 'List settings', 'x3p0-list-users' ) }>
				<ToggleControl
					label={ __( 'Link', 'x3po-list-users' ) }
					help={ __( 'Whether to link to the author archive.', 'x3p0-list-users' ) }
					checked={ link }
					onChange={ ( value ) => setAttributes( {
						link: value
					} ) }
				/>
				<RangeControl
					label={ __( 'Number', 'x3p0-list-users' ) }
					value={ number }
					onChange={ ( value ) => setAttributes( {
						number: value
					} ) }
					min="1"
					max="100"
					allowReset={ true }
					initialPosition={ 10 }
					resetFallbackValue={ 10 }
				/>
				<SelectControl
					label={ __( 'Order By', 'x3p0-list-users' ) }
					selected={ orderby }
					onChange={ ( value ) => setAttributes( {
						orderby: value
					} ) }
					options={ [
						{ value: "name",            label: __( 'Name', 'x3p0-list-users' ) },
						{ value: "slug",            label: __( 'Slug', 'x3p0-list-users' ) },
						{ value: "email",           label: __( 'Email', 'x3p0-list-users' ) },
						{ value: "id",              label: __( 'ID', 'x3p0-list-users' ) },
						{ value: "registered_date", label: __( 'Registered Date', 'x3p0-list-users' ) }
					] }
				/>
				<SelectControl
					label={ __( 'Order', 'x3p0-list-users' ) }
					selected={ order }
					onChange={ ( value ) =>
						setAttributes( { order: value } )
					}
					options={ [
						{ value: "asc",  label: __( 'Ascending', 'x3p0-list-users' ) },
						{ value: "desc", label: __( 'Descending', 'x3p0-list-users' ) }
					] }
				/>
			</PanelBody>
		</InspectorControls>
	);

	return (
		<>
			{ inspectorControls }
			<div { ...blockProps }>
				<ul className="wp-block-x3p0-list-users__list">
					{ users.map( ( user ) => (
						<li
							className="wp-block-x3p0-list-users__item"
						>
						{ link
							? <a
								className="wp-block-x3p0-list-users__link"
								href={ user.link }
								onClick={ ( event ) => event.preventDefault() }
							>{ user.name }</a>
							: user.name
						}
						</li>
					) ) }
				</ul>
			</div>
		</>
	);
}
