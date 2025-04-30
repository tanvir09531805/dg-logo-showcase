const { elementClassnames, textOptionsClassnames } = window?.divi?.module;

export const moduleClassnames = ({ classnamesInstance, attrs }) => {
    // Text Options.
    // classnamesInstance.add(
    //     textOptionsClassnames(attrs?.module?.advanced?.text, {
    //         orientation: false,
    //     }),
    // );
    classnamesInstance.add(
		textOptionsClassnames(attrs?.module?.advanced?.text ?? {})
	);
    
    // Add element classnames.
    classnamesInstance.add(
        elementClassnames({
            attrs: attrs?.module?.decoration ?? {},
        }),
    );
};
