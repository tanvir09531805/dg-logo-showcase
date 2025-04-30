const {
	isFaIcon,
	escapeFontIcon,
	processFontIcon,
} = window?.divi?.iconLibrary;
const { DeclarationFunctionProps } = window?.divi?.module;
import { StyleDeclarations } from '@divi/style-library';

/**
 * Style declaration for icon.
 *
 * @since ??
 *
 * @param {DeclarationFunctionProps<Icon.Font.AttributeValue>} param0 Style declaration params.
 *
 * @returns {string}
 */
export const iconFontDeclaration = ({
	attrValue,
}) => {

	const declarations = new StyleDeclarations({
		returnType: 'string',
		important: {
			'font-family': true,
			content: true,
		},
	});

	const fontIcon = processFontIcon(attrValue);

	if (fontIcon) {
		const fontFamily = isFaIcon(attrValue) ? 'FontAwesome' : 'ETmodules';
		declarations.add('content', `'${escapeFontIcon(fontIcon)}'`);
		declarations.add('font-family', `"${fontFamily}"`);
	}
	return declarations.value;
};
