import { registerBlockType } from '@wordpress/blocks';

import './store';
import './plugin';
import Edit from './Components/Backend/Edit';
import './editor.scss';
import metadata from './block.json';
import icons from './utils/icons';

registerBlockType(metadata, {
	icon: icons.businessReview,
	// Build in Functions
	edit: Edit,
	save: () => null
});