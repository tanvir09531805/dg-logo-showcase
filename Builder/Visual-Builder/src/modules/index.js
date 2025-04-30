import { bentoGridItem } from "../../../../divi-5/visual-builder/src/modules/bento-grid-item";

const {
	addAction, addFilter,
} = window?.vendor?.wp?.hooks;
const { registerModule,registerFolder } = window?.divi?.moduleLibrary;
import {omit} from "lodash";


import './module-icon';
import '../fields';
import { textReveal, textRevealMetadata } from "./text-reveal";
import { verticalMenu, verticalMenuMetadata } from "./vertical-menu";
import { advancedPerson, advancedPersonMetadata } from "./advanced-person";
import { imageMask, imageMaskMetadata } from "./image-mask";
import { imageHover, imageHoverMetadata } from "./image-hover";
import { bentoGrid } from "./bento-grid";
// import { advncedButton } from "./advanced-button";
import { socialShareItem } from "./social-share-item";
import { socialShare } from "./social-share";
import { imageReveal } from "./image-reveal";
// import { avatarStackItem } from "./avatar-stack-item";
// import { avatarStack } from "./avatar-stack";
import { inlineContentsItem } from "./inline-contents-item";
import { inlineContents } from "./inline-contents";
// import { acfGallery } from "./acf-gallery";
import { advancedCarousel } from "./content-carousel";
import { advancedCarouselItem } from "./content-carousel-item";
import { businessHours } from './business-hours';
import { businessHoursItem } from './business-hours-item';
import { advancedHeading } from './advanced-heading';
import { advancedDivider } from './advanced-divider';

addAction( 'divi.moduleLibrary.registerModuleLibraryStore.after', 'difl', () => {
	registerFolder( {
		name: "diviflash-modules",
		path: "",
		title: "Divi Flash",
		icon: "difl/diviflash",
		category: "module"
	} );

	registerModule( textRevealMetadata, textReveal );
	registerModule( verticalMenuMetadata, verticalMenu );
	registerModule( advancedPersonMetadata, advancedPerson );
	registerModule( imageMaskMetadata, imageMask );
	registerModule( imageHoverMetadata, imageHover );
	registerModule( advancedCarousel.metadata, omit( advancedCarousel, 'metadata' ) );
	registerModule( advancedCarouselItem.metadata, omit( advancedCarouselItem, 'metadata' ) );
	registerModule( businessHours.metadata, omit( businessHours, 'metadata' ) );
	registerModule( businessHoursItem.metadata, omit( businessHoursItem, 'metadata' ) );
	registerModule( advancedHeading.metadata, omit( advancedHeading, 'metadata' ) );
	registerModule( advancedDivider.metadata, omit( advancedDivider, 'metadata' ) );
	registerModule( bentoGridItem.metadata, omit( bentoGridItem, 'metadata' ) );
	registerModule( bentoGrid.metadata, omit( bentoGrid, 'metadata' ) );
	// registerModule( advncedButton.metadata, omit( advncedButton, 'metadata' ) );
	registerModule( socialShareItem.metadata, omit( socialShareItem, 'metadata' ) );
	registerModule( socialShare.metadata, omit( socialShare, 'metadata' ) );
	registerModule( imageReveal.metadata, omit( imageReveal, 'metadata' ) );
	// registerModule( avatarStackItem.metadata, omit( avatarStackItem, 'metadata' ) );
	// registerModule( avatarStack.metadata, omit( avatarStack, 'metadata' ) );
	registerModule( inlineContentsItem.metadata, omit( inlineContentsItem, 'metadata' ) );
	registerModule( inlineContents.metadata, omit( inlineContents, 'metadata' ) );
	// registerModule( acfGallery.metadata, omit( acfGallery, 'metadata' ) );
} );