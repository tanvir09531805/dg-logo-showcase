import { omit } from 'lodash';

const {
	addAction,
} = window?.vendor?.wp?.hooks;

const { registerModule } = window.divi.moduleLibrary;

import { logoShowcas } from './modules/logo-showcase';
import { advancedCarousel } from './modules/content-carousel';
import { advancedCarouselItem } from './modules/content-carousel-item';
import { businessHours } from './modules/business-hours';
import { businessHoursItem } from './modules/business-hours-item';

import './module-icons';

// Register modules.
addAction('divi.moduleLibrary.registerModuleLibraryStore.after', 'DIFL', () => {
	registerModule(logoShowcas.metadata, omit(logoShowcas, 'metadata'));
	registerModule(advancedCarousel.metadata, omit(advancedCarousel, 'metadata'));
	registerModule(advancedCarouselItem.metadata, omit(advancedCarouselItem, 'metadata'));
	registerModule(businessHours.metadata, omit(businessHours, 'metadata'));
	registerModule(businessHoursItem.metadata, omit(businessHoursItem, 'metadata'));
});
