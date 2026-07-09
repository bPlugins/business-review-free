import { __ } from '@wordpress/i18n';

const options = {
	toastSelectAnimation: [
		{ label: __('Slide', 'business-review'), value: 'Slide' },
		{ label: __('Flip', 'business-review'), value: 'Flip' },
		{ label: __('Zoom', 'business-review'), value: 'Zoom' },
		{ label: __('Bounce', 'business-review'), value: 'Bounce' },

	],
	toastOptionSelect: [
		{ label: __('Top Left', 'business-review'), value: 'top-left' },
		{ label: __('Top Right', 'business-review'), value: 'top-right' },
		{ label: __('Top Center', 'business-review'), value: 'top-center' },
		{ label: __('Bottom Left', 'business-review'), value: 'bottom-left' },
		{ label: __('Bottom Right', 'business-review'), value: 'bottom-right' },
		{ label: __('Bottom Center', 'business-review'), value: 'bottom-center' },
	],
	reviewPositionSelect: [
		{ label: __('Google', 'business-review'), value: 'google' },
		{ label: __('Facebook', 'business-review'), value: 'facebook' },
		{ label: __('Yelp', 'business-review'), value: 'yelp' },
	],
	layouts: [
		{ label: __('Default', 'business-review'), value: 'default' },
		{ label: __('Grid 1', 'business-review'), value: 'grid1' },
		{ label: __('Grid 2', 'business-review'), value: 'grid2' },
		{ label: __('Grid 3', 'business-review'), value: 'grid3' }


	],

	generalStyleTabs: [
		{ name: 'general', title: __('General', 'business-review') },
		{ name: 'style', title: __('Style', 'business-review') }
	],

	pxUnit: (def = 0) => ({ value: 'px', label: 'px', default: def }),
	perUnit: (def = 0) => ({ value: '%', label: '%', default: def }),
	emUnit: (def = 0) => ({ value: 'em', label: 'em', default: def }),
	remUnit: (def = 0) => ({ value: 'rem', label: 'rem', default: def }),
	vwUnit: (def = 0) => ({ value: 'vw', label: 'vw', default: def }),
	vhUnit: (def = 0) => ({ value: 'vh', label: 'vh', default: def }),

	dUnit: (def = 0, value = "px", label) => ({ value, label: label || value, default: def }),
}
export default options;