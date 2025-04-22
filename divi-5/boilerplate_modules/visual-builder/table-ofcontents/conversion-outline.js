const convertInlineValue = (value) => {
  return _.isString(value) ? value.split(',') : [];
};

const convertIcon = (value) => {
  value = value.split('|');
  value = {
    unicode: value[0],
    type: value[2],
    weight: value[4],
  };
  return value;
};

const convertSpacing = (value) => {
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
            heading_1: "heading_1.decoration.font"
        },
        borders: {
            default: "module.decoration.border",
            title_border: "title_border.decoration.border",
            content_border: "content_border.decoration.border",
            active_style: "active_style.decoration.border",
            heading_border_h1: "heading_border_h1.decoration.border",
            heading_border_h2: "heading_border_h2.decoration.border",
            heading_border_h3: "heading_border_h3.decoration.border",
            heading_border_h4: "heading_border_h4.decoration.border",
            heading_border_h5: "heading_border_h5.decoration.border",
            heading_border_h6: "heading_border_h6.decoration.border"
        },
        filters: {
            default: "module.decoration.filters"
        }
    },
    module: {
        admin_label: "admin_label.innerContent.*",
        title: "title.innerContent.*",
        title_tag: "title_tag.innerContent.*",
        heading_tags: "heading_tags.innerContent.*",
        headings_exclude_by_class: "headings_exclude_by_class.innerContent.*",
        container_exclude_by_class: "container_exclude_by_class.innerContent.*",
        minimum_number_of_headings: "minimum_number_of_headings.innerContent.*",
        hierarchical_view: "hierarchical_view.innerContent.*",
        offset: "offset.innerContent.*",
        highlight_active_link: "highlight_active_link.innerContent.*",
        marker_type: "marker_type.innerContent.*",
        marker_icon_h1: "marker_icon_h1.innerContent.*",
        marker_icon_size_h1: "marker_icon_size_h1.innerContent.*",
        marker_icon_color_h1: "marker_icon_color_h1.innerContent.*",
        marker_icon_space_heading_h1: "marker_icon_space_heading_h1.innerContent.*",
        heading_spacing_h1_margin: "heading_spacing_h1_margin.decoration.spacing.*.margin",
        heading_spacing_h1_padding: "heading_spacing_h1_padding.decoration.spacing.*.padding",
        heading_bg_h1: "heading_bg_h1.innerContent.*",
        marker_icon_h2: "marker_icon_h2.innerContent.*",
        marker_icon_size_h2: "marker_icon_size_h2.innerContent.*",
        marker_icon_color_h2: "marker_icon_color_h2.innerContent.*",
        marker_icon_space_heading_h2: "marker_icon_space_heading_h2.innerContent.*",
        heading_spacing_h2_margin: "heading_spacing_h2_margin.decoration.spacing.*.margin",
        heading_spacing_h2_padding: "heading_spacing_h2_padding.decoration.spacing.*.padding",
        heading_bg_h2: "heading_bg_h2.innerContent.*",
        marker_icon_h3: "marker_icon_h3.innerContent.*",
        marker_icon_size_h3: "marker_icon_size_h3.innerContent.*",
        marker_icon_color_h3: "marker_icon_color_h3.innerContent.*",
        marker_icon_space_heading_h3: "marker_icon_space_heading_h3.innerContent.*",
        heading_spacing_h3_margin: "heading_spacing_h3_margin.decoration.spacing.*.margin",
        heading_spacing_h3_padding: "heading_spacing_h3_padding.decoration.spacing.*.padding",
        heading_bg_h3: "heading_bg_h3.innerContent.*",
        marker_icon_h4: "marker_icon_h4.innerContent.*",
        marker_icon_size_h4: "marker_icon_size_h4.innerContent.*",
        marker_icon_color_h4: "marker_icon_color_h4.innerContent.*",
        marker_icon_space_heading_h4: "marker_icon_space_heading_h4.innerContent.*",
        heading_spacing_h4_margin: "heading_spacing_h4_margin.decoration.spacing.*.margin",
        heading_spacing_h4_padding: "heading_spacing_h4_padding.decoration.spacing.*.padding",
        heading_bg_h4: "heading_bg_h4.innerContent.*",
        marker_icon_h5: "marker_icon_h5.innerContent.*",
        marker_icon_size_h5: "marker_icon_size_h5.innerContent.*",
        marker_icon_color_h5: "marker_icon_color_h5.innerContent.*",
        marker_icon_space_heading_h5: "marker_icon_space_heading_h5.innerContent.*",
        heading_spacing_h5_margin: "heading_spacing_h5_margin.decoration.spacing.*.margin",
        heading_spacing_h5_padding: "heading_spacing_h5_padding.decoration.spacing.*.padding",
        heading_bg_h5: "heading_bg_h5.innerContent.*",
        marker_icon_h6: "marker_icon_h6.innerContent.*",
        marker_icon_size_h6: "marker_icon_size_h6.innerContent.*",
        marker_icon_color_h6: "marker_icon_color_h6.innerContent.*",
        marker_icon_space_heading_h6: "marker_icon_space_heading_h6.innerContent.*",
        heading_spacing_h6_margin: "heading_spacing_h6_margin.decoration.spacing.*.margin",
        heading_spacing_h6_padding: "heading_spacing_h6_padding.decoration.spacing.*.padding",
        heading_bg_h6: "heading_bg_h6.innerContent.*",
        full_width_header: "full_width_header.innerContent.*",
        title_icon_gap: "title_icon_gap.innerContent.*",
        collapsible_toc: "collapsible_toc.innerContent.*",
        scrolling_speed: "scrolling_speed.innerContent.*",
        default_collapse_state: "default_collapse_state.innerContent.*",
        collapsible_with_sticky: "collapsible_with_sticky.innerContent.*",
        title_icon: "title_icon.innerContent.*",
        expand_icon: "expand_icon.innerContent.*",
        expand_icon_color: "expand_icon_color.innerContent.*",
        expand_icon_size: "expand_icon_size.innerContent.*",
        collapse_icon: "collapse_icon.innerContent.*",
        collapse_icon_color: "collapse_icon_color.innerContent.*",
        collapse_icon_size: "collapse_icon_size.innerContent.*",
        collapse_icon_only: "collapse_icon_only.innerContent.*",
        header_bg_color: "header_bg_color.innerContent.*",
        header_spacing_margin: "header_spacing_margin.decoration.spacing.*.margin",
        header_spacing_padding: "header_spacing_padding.decoration.spacing.*.padding",
        use_content_height: "use_content_height.innerContent.*",
        content_height: "content_height.innerContent.*",
        body_bg_color: "body_bg_color.innerContent.*",
        content_spacing_margin: "content_spacing_margin.decoration.spacing.*.margin",
        content_spacing_padding: "content_spacing_padding.decoration.spacing.*.padding",
        active_background_color: "active_background_color.innerContent.*",
        active_link_color: "active_link_color.innerContent.*",
        active_icon_marker_color: "active_icon_marker_color.innerContent.*",
        active_spacing_padding: "active_spacing_padding.decoration.spacing.*.padding",
        active_link_border_on_parent: "active_link_border_on_parent.innerContent.*"
    },
    valueExpansionFunctionMap: {
        heading_spacing_h1_margin: convertSpacing,
        heading_spacing_h1_padding: convertSpacing,
        heading_spacing_h2_margin: convertSpacing,
        heading_spacing_h2_padding: convertSpacing,
        heading_spacing_h3_margin: convertSpacing,
        heading_spacing_h3_padding: convertSpacing,
        heading_spacing_h4_margin: convertSpacing,
        heading_spacing_h4_padding: convertSpacing,
        heading_spacing_h5_margin: convertSpacing,
        heading_spacing_h5_padding: convertSpacing,
        heading_spacing_h6_margin: convertSpacing,
        heading_spacing_h6_padding: convertSpacing,
        header_spacing_margin: convertSpacing,
        header_spacing_padding: convertSpacing,
        content_spacing_margin: convertSpacing,
        content_spacing_padding: convertSpacing,
        active_spacing_padding: convertSpacing
    }
}
};
