import {SelectPostTypes} from "./select-post-data";
import {SelectPostCategories} from "./select-post-category";
import {CustomSpacing} from "./custom-spacing";


const { registerFieldComponent } = window.divi.fieldLibrary;

registerFieldComponent( { name: "difl/select-post-types", component: SelectPostTypes } );
registerFieldComponent( { name: "difl/select-post-categories", component: SelectPostCategories } );
registerFieldComponent( { name: "difl/custom-spacing", component: CustomSpacing } );
