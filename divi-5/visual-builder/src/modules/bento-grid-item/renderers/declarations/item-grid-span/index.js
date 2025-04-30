const { StyleDeclarations } = window?.divi?.styleLibrary;

export const gridSpanStyleDeclaration = ({
	attrValue,
}) => {
	const declarations = new StyleDeclarations({
		returnType: 'string',
		important:  false,
	});


	// if (attrValue?.columnSpan) {
	// 	declarations.add('grid-column', `span ${attrValue?.columnSpan}`);
	// }
	//
	// if (attrValue?.rowSpan) {
	// 	declarations.add('grid-row', `span ${attrValue?.rowSpan}`);
	// }

	if (attrValue?.column) {
		declarations.add('grid-column', `span ${attrValue?.column}`);
	}

	if (attrValue?.row) {
		declarations.add('grid-row', `span ${attrValue?.row}`);
	}

	return declarations.value;
};