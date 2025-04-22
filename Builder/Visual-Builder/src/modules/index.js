import { ContentToggle, ContentToggleMetadata } from "./ContentToggle";

const {
	addAction, addFilter,
} = window?.vendor?.wp?.hooks;
const { registerModule } = window.divi.moduleLibrary;
const { registerFieldComponent } = window.divi.fieldLibrary;

import { Advanced_Blurb, BlurbMetadata, getPropValue } from "./Blurb";

import { Advanced_Blurb as Advanced_Blurb_Icon } from "../icons"
import { GenerateClassButton } from "../fields/GenerateClassButton";

addFilter("divi.moduleLibrary.conversion.advancedOptionConversionFunctionMap", "difl", ( conversionFunctionMap, moduleName ) => {
	if ( "advanced_blurb" === moduleName ) {
		console.log("advanced_blurb", conversionFunctionMap);
	}
});

registerFieldComponent( { name: "difl/generate_button", component: GenerateClassButton } );

addAction( 'divi.moduleLibrary.registerModuleLibraryStore.after', 'difl', () => {
	registerModule( BlurbMetadata, Advanced_Blurb );
	registerModule( ContentToggleMetadata, ContentToggle );
} );
addFilter( 'divi.iconLibrary.icon.map', 'difl', ( icons ) => {
	return {
		...icons,
		[Advanced_Blurb_Icon.name]: Advanced_Blurb_Icon
	};
} );

