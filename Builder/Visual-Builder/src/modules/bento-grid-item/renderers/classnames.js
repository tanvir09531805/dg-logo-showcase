const { ModuleClassnamesParams, textOptionsClassnames, elementClassnames } = window?.divi?.module;


/**
 * Module classnames function for Divi 4 Module.
 *
 * @since ??
 *
 * @param {ModuleClassnamesParams<ChildModuleAttrs>} param0 Function parameters.
 */
export const Classnames = ({
	classnamesInstance,
	attrs,
}) => {
	// Text Options.
	classnamesInstance.add(textOptionsClassnames(attrs?.module?.advanced?.text ?? {}, {color: false}));
	// Add element classnames.
	classnamesInstance.add(
		elementClassnames({
			attrs: attrs?.module?.decoration ?? {},
		}),
	);
};
