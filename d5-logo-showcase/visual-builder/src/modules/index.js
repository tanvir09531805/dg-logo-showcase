import { addAction } from '@wordpress/hooks';

import { staticModule, staticModuleMetadata } from "./logo-showcase";

const { registerModule } = window?.divi?.moduleLibrary;

addAction('divi.moduleLibrary.registerModuleLibraryStore.after', 'dtmc', () => {
  registerModule(staticModuleMetadata, staticModule);
});