import { RangeControl } from './range/Control';
import { ResponsiveRangeControl } from './responsive-range/Control';
import {SpacingControl} from "./spacing/Control";
import {ColorControl} from "./color/Control";
import {BackgroundControl} from "./background/Control";
import {ToggleControl} from "./toggle/Control";
import {TypefaceControl} from "./typeface/Control";
import {FontFamilyControl} from "./font-family/Control";
import "../../js/autofocus";

const { controlConstructor } = wp.customize;

controlConstructor.difl_range_control = RangeControl;
controlConstructor.difl_responsive_range_control = ResponsiveRangeControl;
controlConstructor.difl_spacing = SpacingControl;
controlConstructor.difl_color_control = ColorControl;
controlConstructor.difl_background_control = BackgroundControl;
controlConstructor.difl_toggle_control = ToggleControl;
controlConstructor.difl_typeface_control = TypefaceControl;
controlConstructor.difl_font_family_control = FontFamilyControl;

