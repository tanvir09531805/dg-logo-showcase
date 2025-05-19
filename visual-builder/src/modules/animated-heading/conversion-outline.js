const convertInlineValue = (value) => {
  return _.isString(value) ? value.split(',') : [];
};

const D4ToD5Icon = (value) => {
  value = value.split('|');
  value = {
    unicode: value[0],
    type: value[2],
    weight: value[4],
  };
  return value;
};

const D4ToD5Spacing = (value) => {
  value = value.split('|');
  value = {
    top: value[0],
    right: value[1],
    bottom: value[2],
    left: value[3],
    syncHorizontal: value[4],
    syncVertical: value[5],
  };
  return value;
};

export const conversionOutline = {
    module: {
    advanced: {
        admin_label: "module.meta.adminLabel",
        background: "module.decoration.background",
        fonts: {
            title: "title.decoration.font",
            t_prefix: "t_prefix.decoration.font",
            t_infix: "t_infix.decoration.font",
            t_suffix: "t_suffix.decoration.font"
        },
        borders: {
            default: "module.decoration.border",
            prefix_border: "prefix_border.decoration.border",
            infix_border: "infix_border.decoration.border",
            suffix_border: "suffix_border.decoration.border"
        },
        box_shadow: {
            default: "module.decoration.boxShadow"
        },
        margin_padding: "module.decoration.spacing"
    },
    module: {
        fancy_text_anim: "fancy_text_anim.innerContent.*",
        title_prefix: "title_prefix.innerContent.*",
        fency_text_list: "fency_text_list.innerContent.*",
        title_suffix: "title_suffix.innerContent.*",
        fancy_text_overflow: "fancy_text_overflow.innerContent.*",
        easing: "easing.innerContent.*",
        anim_duration: "anim_duration.innerContent.*",
        anim_delay: "anim_delay.innerContent.*",
        anim_easing: "anim_easing.innerContent.*",
        spring_anim_mass: "spring_anim_mass.innerContent.*",
        spring_anim_stiffness: "spring_anim_stiffness.innerContent.*",
        spring_anim_damping: "spring_anim_damping.innerContent.*",
        spring_anim_velocity: "spring_anim_velocity.innerContent.*",
        title_prefix_block: "title_prefix_block.innerContent.*",
        title_infix_block: "title_infix_block.innerContent.*",
        title_suffix_block: "title_suffix_block.innerContent.*",
        prefix_maxwidth: "prefix_maxwidth.innerContent.*",
        prefix_alignment: "prefix_alignment.innerContent.*",
        infix_maxwidth: "infix_maxwidth.innerContent.*",
        infix_alignment: "infix_alignment.innerContent.*",
        suffix_maxwidth: "suffix_maxwidth.innerContent.*",
        suffix_alignment: "suffix_alignment.innerContent.*",
        heading_margin: "heading_margin.decoration.spacing.*.margin",
        heading_padding: "heading_padding.decoration.spacing.*.padding",
        prefix_margin: "prefix_margin.decoration.spacing.*.margin",
        prefix_padding: "prefix_padding.decoration.spacing.*.padding",
        infix_margin: "infix_margin.decoration.spacing.*.margin",
        infix_padding: "infix_padding.decoration.spacing.*.padding",
        suffix_margin: "suffix_margin.decoration.spacing.*.margin",
        suffix_padding: "suffix_padding.decoration.spacing.*.padding",
        prefix_background: "prefix_background.innerContent.*",
        infix_background: "infix_background.innerContent.*",
        suffix_background: "suffix_background.innerContent.*"
    },
    valueExpansionFunctionMap: {
        heading_margin: D4ToD5Spacing,
        heading_padding: D4ToD5Spacing,
        prefix_margin: D4ToD5Spacing,
        prefix_padding: D4ToD5Spacing,
        infix_margin: D4ToD5Spacing,
        infix_padding: D4ToD5Spacing,
        suffix_margin: D4ToD5Spacing,
        suffix_padding: D4ToD5Spacing
    }
}
};
