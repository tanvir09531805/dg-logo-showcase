const { StyleDeclarations } = window?.divi?.styleLibrary;

export const animationTransitions = ( props ) => {
	const { attrValue } = props
	const declarations = new StyleDeclarations( {
		returnType: 'string',
		important: false,
	} );

	if ( attrValue?.two_d_transition_duration ) {
		declarations.add('--dfab-two-d-animation-duration', `${attrValue?.two_d_transition_duration}s`);
	}
	if ( attrValue?.two_d_transition_delay ) {
		declarations.add('--dfab-two-d-animation-delay', `${attrValue?.two_d_transition_delay}s`);
	}

	if ( attrValue?.bg_transition_duration ) {
		declarations.add('--dfab-bg-hover-background-transtion-time', `${attrValue?.bg_transition_duration}s`);
	}
	if ( attrValue?.bg_transition_delay ) {
		declarations.add('--dfab-bg-hover-background-transtion-delay', `${attrValue?.bg_transition_delay}s`);
	}
	if ( attrValue?.bg_transition_timing_function ) {
		declarations.add('--dfab-bg-hover-background-transition-timimg-function', `${attrValue?.bg_transition_timing_function}`);
	}

	if ( attrValue?.stroke_transition_duration ) {
		declarations.add('--dfab-border-hover-background-transtion-time', `${attrValue?.stroke_transition_duration}s`);
	}
	if ( attrValue?.stroke_transition_delay ) {
		declarations.add('--dfab-border-hover-background-transtion-delay', `${attrValue?.stroke_transition_delay}s`);
	}
	if ( attrValue?.stroke_transition_timing_function ) {
		declarations.add('--dfab-border-hover-background-transition-timimg-function', `${attrValue?.stroke_transition_timing_function}`);
	}

	if ( attrValue?.media_transition_duration ) {
		declarations.add('--dfab-media-hover-transition-duration', `${attrValue?.media_transition_duration}s`);
	}
	if ( attrValue?.media_transition_delay ) {
		declarations.add('--dfab-media-hover-transition-delay', `${attrValue?.media_transition_delay}s`);
	}
	if ( attrValue?.media_transition_timing_function ) {
		declarations.add('--dfab-media-hover-transition-function', `${attrValue?.media_transition_timing_function}`);
	}

	return declarations.value;
};