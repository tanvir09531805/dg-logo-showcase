import { elementClassnames, textOptionsClassnames } from "@divi/module"

export const moduleClassnames = ( props ) => {
	const { classnamesInstance, attrs, } = props
	// console.log("class", classnamesInstance)
	// Text Options.
	classnamesInstance.add( textOptionsClassnames( attrs?.module?.advanced?.text, { orientation: false } ) );

	// Add element classnames.
	classnamesInstance.add(
		elementClassnames( {
			attrs: attrs?.module?.decoration ?? {},
		} ),
	);
}