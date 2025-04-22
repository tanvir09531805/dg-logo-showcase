const { ModuleClassnamesParams, textOptionsClassnames, elementClassnames } = window?.divi?.module;


/**
 * Module classnames function for Parent Module.
 *
 * @since ??
 *
 * @param {ModuleClassnamesParams<ParentModuleAttrs>} param0 Function parameters.
 */
export const Classnames = ({
	classnamesInstance,
	attrs,
}) => {
	// Text Options.
	classnamesInstance.add(textOptionsClassnames(attrs?.module?.advanced?.text ?? {}));
	// Add element classnames.
	classnamesInstance.add(
		elementClassnames({
			attrs: attrs?.module?.decoration ?? {},
		}),
	);
};
