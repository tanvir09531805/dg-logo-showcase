import { omit } from 'lodash';

const {
	addAction,
} = window?.vendor?.wp?.hooks;

const { registerModule } = window.divi.moduleLibrary;

import { bentoGridItem } from './components/bento-grid-item';
import { bentoGrid } from './components/bento-grid';

import { logoShowcas } from './components/logo-showcase';
import { advancedCarousel } from './components/content-carousel';
import { advancedCarouselItem } from './components/content-carousel-item';

import './module-icons';

// Register modules.
addAction('divi.moduleLibrary.registerModuleLibraryStore.after', 'DIVIFLASH', () => {
	registerModule(bentoGridItem.metadata, omit(bentoGridItem, 'metadata'));
	registerModule(bentoGrid.metadata, omit(bentoGrid, 'metadata'));
	registerModule(logoShowcas.metadata, omit(logoShowcas, 'metadata'));
	registerModule(advancedCarousel.metadata, omit(advancedCarousel, 'metadata'));
	registerModule(advancedCarouselItem.metadata, omit(advancedCarouselItem, 'metadata'));
});
