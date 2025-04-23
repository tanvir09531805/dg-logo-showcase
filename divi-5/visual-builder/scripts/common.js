export const convertIcon = ( value ) => {
	value = value.split("|");
	value = {
		unicode:value[0],
		type:value[2],
		weight:value[4],
	}
	return value
}
export const convertSpacing = ( value ) => {
	value = value.split("|");
	value = {
		top:value[0],
		right:value[1],
		bottom:value[2],
		left:value[3],
		syncHorizontal:value[4],
		syncVertical:value[5],
	}
	return value
}
export const convertBackground = ( d4Key, d5Key ) => {
	return {
		[`${d4Key}_bgcolor`]:`${d5Key}.decoration.background.*.color`,
		[`${d4Key}_use_gradient`]:`${d5Key}.decoration.background.*.gradient.enabled`,
		[`${d4Key}_color_gradient_1`]:`${d5Key}.decoration.background.*.gradient.stops[0].color`,
		[`${d4Key}_color_gradient_2`]:`${d5Key}.decoration.background.*.gradient.stops[1].color`,
		[`${d4Key}_gradient_type`]:`${d5Key}.decoration.background.*.gradient.type`,
		[`${d4Key}_radial_direction`]:`${d5Key}.decoration.background.*.gradient.directionRadial`,
		[`${d4Key}_gradient_direction`]:`${d5Key}.decoration.background.*.gradient.direction`,
		[`${d4Key}_start_position`]:`${d5Key}.decoration.background.*.gradient.stops[0].position`,
		[`${d4Key}_end_position`]:`${d5Key}.decoration.background.*.gradient.stops[1].position`,
		[`${d4Key}_above_image`]:`${d5Key}.decoration.background.*.gradient.overlaysImage`,
		[`${d4Key}_background_image`]:`${d5Key}.decoration.background.*.image.url`,
		[`${d4Key}_background_image_size`]:`${d5Key}.decoration.background.*.image.size`,
		[`${d4Key}_size_width`]:`${d5Key}.decoration.background.*.image.width`,
		[`${d4Key}_size_height`]:`${d5Key}.decoration.background.*.image.height`,
		[`${d4Key}_background_image_position`]:`${d5Key}.decoration.background.*.image.position`,
		[`${d4Key}_position_horizontal`]:`${d5Key}.decoration.background.*.image.horizontalOffset`,
		[`${d4Key}_position_vertical`]:`${d5Key}.decoration.background.*.image.verticalOffset`,
		[`${d4Key}_background_image_repeat`]:`${d5Key}.decoration.background.*.image.repeat`,
	}
}

export const convertRoundedCorner = ( value ) => {
	value = value.split( "|" );
	value = {
		radius: {
			topLeft: value[ 1 ],
			topRight: value[ 2 ],
			bottomLeft: value[ 3 ],
			bottomRight: value[ 4 ],
			sync: value[ 0 ]
		}
	}
	return value
}

export const convertCustomMargin = ( value ) => {
	value = value.split( "|" );
	value = {
		padding: {
			top: value[ 0 ],
			right: value[ 1 ],
			bottom: value[ 2 ],
			left: value[ 3 ],
			syncVertical: "true" === value[ 4 ] ?  "on" : "off",
			syncHorizontal: "true" === value[ 5 ] ?  "on" : "off"
		}
	}
	return value
}

