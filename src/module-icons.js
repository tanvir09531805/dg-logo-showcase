const {
	addFilter,
} = window?.vendor?.wp?.hooks;
import {
	BentoGridIcon,
} from './icons';

// Add module icons to the icon library.
addFilter('divi.iconLibrary.icon.map', 'DIVIFLASH', (icons) => {
	return {
		...icons, // This is important. Without this, all other icons will be overwritten.
		[BentoGridIcon.name]: BentoGridIcon,
	};
});