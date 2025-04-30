import { CommonStyle, CssGroup, CssStyle, StyleContainer } from "@divi/module";

export const Styles = ( props ) => {
	const { attrs, elements, settings, orderClass, mode, state, noStyleTag, } = props
	console.log("attrs", attrs)
	// debugger
	let { moduleMetadata: { attributes } = {} } = elements || {};

		// attributes = {title:attributes.title};
		console.log("attributes", attrs?.blurb_img_background_color?.innerContent)
	return (
		<StyleContainer mode={ mode } state={ state } noStyleTag={ noStyleTag }>
			{/*{elements.style({ attrName: 'title' })}*/}
			{/*{Object.keys(attributes).map(key => {*/}
			{/*	return elements.style({*/}
			{/*		...attributes[key],*/}
			{/*		attrName: key*/}
			{/*	})*/}
			{/*})}*/}

			{elements.style({ attrName: 'title' })}

			{elements.style({ attrName: 'button' })}
			<CommonStyle
				selector={ `${ orderClass } .df_ab_blurb_image_img` }
				attr={attrs?.blurb_img_background_color?.innerContent ?? {}}
				property="background-color"
			/>
			<CommonStyle
				selector={ `${ orderClass } .df_ab_blurb_content_container` }
				attr={attrs?.content_area_alignment?.innerContent ?? {}}
				property="text-align"
			/>
		</StyleContainer>
	)
	return (
		<StyleContainer mode={ mode } state={ state } noStyleTag={ noStyleTag }>
			{/* Module */ }
			{ elements.style( {
				attrName: 'module',
				styleProps: {
					disabledOn: {
						disabledModuleVisibility: settings?.disabledModuleVisibility,
					},
				},
			} ) }
			<CommonStyle
				selector={ `${ orderClass } .df-blurb-icon` }
				attr={ attrs?.blurb_icon_color?.advanced?.color ?? {} }
				property="color"
			/>
			<CommonStyle
				selector={ `${ orderClass } .df-blurb-icon` }
				attr={ attrs?.icon_size?.advanced?.size ?? {} }
				property="font-size"
			/>
			<CommonStyle
				selector={ `${ orderClass } .df-blurb-icon` }
				attr={ attrs?.blurb_icon_background_color?.advanced?.color ?? {} }
				property="background-color"
			/>
			{
				elements.style( {
					attrName: 'icon_border'
				} )
			}
			{ elements.style( {
				attrName: 'image',
			} ) }
			{ elements.style( {
				attrName: 'blurb_icon_color',
			} ) }
			{ elements.style( {
				attrName: 'blurb_icon_size',
			} ) }
			{
				elements.style( {
					attrName: 'image_width',
				} )
			}
			{
				elements.style( {
					attrName: 'title',
				} )
			}
			{
				elements.style( {
					attrName: 'sub_title',
				} )
			}
			{ elements.style( {
				attrName: 'content',
			} ) }
			{
				elements.style( {
					attrName: 'button_background',
				} )
			}
			<CommonStyle
				selector={ `${ orderClass } .df-blurb-button-icon` }
				attr={ attrs?.button_icon_color?.advanced?.color ?? {} }
				property="color"
			/>
			<CommonStyle
				selector={ `${ orderClass } .df-blurb-button-icon` }
				attr={ attrs?.button_icon_size?.advanced?.size ?? {} }
				property="font-size"
			/>
			<CommonStyle
				selector={ `${ orderClass } .df-blurb-button-icon` }
				attr={ attrs?.button_icon_size?.advanced?.size ?? {} }
				property="font-size"
			/>
			{
				elements.style( {
					attrName: 'title'
				} )
			}
			{
				elements.style( {
					attrName: 'button'
				} )
			}
			<CommonStyle
				selector={ `${ orderClass } .df_ab_blurb_image` }
				attr={ attrs?.image_order?.advanced?.order ?? {} }
				property="order"
			/>
			<CommonStyle
				selector={ `${ orderClass } .df_ab_blurb_title` }
				attr={ attrs?.title_order?.advanced?.order ?? {} }
				property="order"
			/>
			<CommonStyle
				selector={ `${ orderClass } .df_ab_blurb_sub_title` }
				attr={ attrs?.sub_title_order?.advanced?.order ?? {} }
				property="order"
			/>
			<CommonStyle
				selector={ `${ orderClass } .df_ab_blurb_description` }
				attr={ attrs?.content_order?.advanced?.order ?? {} }
				property="order"
			/>
			<CommonStyle
				selector={ `${ orderClass } .df_ab_blurb_badge_wrapper` }
				attr={ attrs?.badge_order?.advanced?.order ?? {} }
				property="order"
			/>
			<CommonStyle
				selector={ `${ orderClass } .df_ab_blurb_button_wrapper` }
				attr={ attrs?.button_order?.advanced?.order ?? {} }
				property="order"
			/>

		</StyleContainer>
	)
}