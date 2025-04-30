
import './modules';
import { omit } from 'lodash';

const {
	addAction,
} = window?.vendor?.wp?.hooks;

const { registerModule } = window.divi.moduleLibrary;

import { logoShowcas } from './modules/logo-showcase';
import { advancedCarousel } from './modules/content-carousel';
import { advancedCarouselItem } from './modules/content-carousel-item';
const { registerModule, registerFolder } = window.divi.moduleLibrary;

import { bentoGridItem } from './modules/bento-grid-item';
import { bentoGrid } from './modules/bento-grid';
import { advncedButton } from './modules/advanced-button';
import { socialShareItem } from './modules/social-share-item';
import { socialShare } from './modules/social-share';
import { imageReveal } from './modules/image-reveal';
import { avatarStackItem } from './modules/avatar-stack-item';
import { avatarStack } from './modules/avatar-stack';
import { inlineContentsItem } from "./modules/inline-contents-item";
import { inlineContents } from "./modules/inline-contents";
import { acfGallery } from "./modules/acf-gallery";

import './module-icons';

// Register modules.
addAction('divi.moduleLibrary.registerModuleLibraryStore.after', 'DIFL', () => {
	registerModule(logoShowcas.metadata, omit(logoShowcas, 'metadata'));
	registerModule(advancedCarousel.metadata, omit(advancedCarousel, 'metadata'));
	registerModule(advancedCarouselItem.metadata, omit(advancedCarouselItem, 'metadata'));
addAction('divi.moduleLibrary.registerModuleLibraryStore.after', 'difl', () => {
	registerFolder({
		name: "diviflash-modules",
		path: "",
		title: "Divi Flash",
		icon: "difl/diviflash",
		category: "module"
	});

	registerModule(bentoGridItem.metadata, omit(bentoGridItem, 'metadata'));
	registerModule(bentoGrid.metadata, omit(bentoGrid, 'metadata'));
	registerModule(advncedButton.metadata, omit(advncedButton, 'metadata'));
	registerModule(socialShareItem.metadata, omit(socialShareItem, 'metadata'));
	registerModule(socialShare.metadata, omit(socialShare, 'metadata'));
	registerModule(imageReveal.metadata, omit(imageReveal, 'metadata'));
	registerModule(avatarStackItem.metadata, omit(avatarStackItem, 'metadata'));
	registerModule(avatarStack.metadata, omit(avatarStack, 'metadata'));
	registerModule(inlineContentsItem.metadata, omit(inlineContentsItem, 'metadata'));
	registerModule(inlineContents.metadata, omit(inlineContents, 'metadata'));
	registerModule(acfGallery.metadata, omit(acfGallery, 'metadata'));
});
