import {
	ModuleClassnamesParams,
	textOptionsClassnames,
	elementClassnames
} from '@divi/module';
export const Classnames = ( props ) => {
  const {
	  classnamesInstance,
	  attrs
  } = props;

	// Add element classnames.
	classnamesInstance.add(
		elementClassnames({
			attrs: attrs?.module?.decoration ?? {},
		}),
	);
	classnamesInstance.add("difl_temp_1");
	classnamesInstance.add("difl_temp_2");
	classnamesInstance.add("difl_social_share_item_wrapper");
}