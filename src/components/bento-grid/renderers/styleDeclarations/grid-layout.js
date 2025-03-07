const { StyleDeclarations } = window?.divi?.styleLibrary;

export const gridLayoutStyleDeclaration = ({
	                                         attrValue,
                                         }) => {
	// console.log("attrValue", attrValue);
	const declarations = new StyleDeclarations({
		returnType: 'string',
		important:  false,
	});


	// if (attrValue?.columnCount) {
	// 	declarations.add('grid-template-columns', `repeat(${attrValue?.columnCount}, 1fr)`);
	// }
	//
	// if (attrValue?.rowCount) {
	// 	declarations.add('grid-template-rows', `repeat(${attrValue?.rowCount}, 1fr)`);
	// }
	//
	if (attrValue?.gridGap) {
		declarations.add('gap', attrValue?.gridGap);
	}
	if (attrValue?.column) {
		declarations.add('grid-template-columns', `repeat(${attrValue?.column}, 1fr)`);
	}

	if (attrValue?.row) {
		declarations.add('grid-template-rows', `repeat(${attrValue?.row}, 1fr)`);
	}


	return declarations.value;
};