import { addAction } from '@wordpress/hooks';

const { registerModule } = window?.divi?.moduleLibrary;
import './module-icon';


import {cPTGrid, cPTGridMetadata} from "./cpt-grid";
import {cPTItem, cPTItemMetadata} from "./cpt-item";
import {verticalMenu, verticalMenuMetadata} from "./vertical-menu";
import {cPTCarousel, cPTCarouselMetadata} from "./cpt-carousel";
import {advancedBlurb, advancedBlurbMetadata} from "./advanced-blurb";
import {contentToggle, contentToggleMetadata} from "./content-toggle";
import {scrollTextReveal, scrollTextRevealMetadata} from "./scroll-text-reveal";
import {stackItem, stackItemMetadata} from "./stack-item";
import {advancedPerson, advancedPersonMetadata} from "./advanced-person";
import {justifiedGallery, justifiedGalleryMetadata} from "./justified-gallery";


addAction('divi.moduleLibrary.registerModuleLibraryStore.after', 'difl', () => {
    registerModule(verticalMenuMetadata,verticalMenu);
    registerModule(cPTItemMetadata,cPTItem);
    registerModule(cPTGridMetadata,cPTGrid);
    registerModule(cPTCarouselMetadata,cPTCarousel);
    registerModule(advancedBlurbMetadata,advancedBlurb);
    registerModule(contentToggleMetadata,contentToggle);
    registerModule(scrollTextRevealMetadata,scrollTextReveal);
    registerModule(stackItemMetadata,stackItem);
    registerModule(advancedPersonMetadata,advancedPerson);
    registerModule(justifiedGalleryMetadata,justifiedGallery)

});