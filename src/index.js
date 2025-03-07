import { omit } from 'lodash';

const {
	addAction,
} = window?.vendor?.wp?.hooks;

const { registerModule } = window.divi.moduleLibrary;

import { bentoGridItem } from './components/bento-grid-item';
import { bentoGrid } from './components/bento-grid';

import './module-icons';

// Register modules.
addAction('divi.moduleLibrary.registerModuleLibraryStore.after', 'DIVIFLASH', () => {
	registerModule(bentoGridItem.metadata, omit(bentoGridItem, 'metadata'));
	registerModule(bentoGrid.metadata, omit(bentoGrid, 'metadata'));
});
