import { omit } from 'lodash';

const {
	addAction,
} = window?.vendor?.wp?.hooks;

const { registerModule } = window.divi.moduleLibrary;

import { logoShowcas } from './components/logo-showcase';
import { advancedCarousel } from './components/content-carousel';
import { advancedCarouselItem } from './components/content-carousel-item';

import './module-icons';

// Register modules.
addAction('divi.moduleLibrary.registerModuleLibraryStore.after', 'DIVIFLASH', () => {
	registerModule(logoShowcas.metadata, omit(logoShowcas, 'metadata'));
	registerModule(advancedCarousel.metadata, omit(advancedCarousel, 'metadata'));
	registerModule(advancedCarouselItem.metadata, omit(advancedCarouselItem, 'metadata'));
});
