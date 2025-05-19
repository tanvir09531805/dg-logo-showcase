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
            name: "name.decoration.font",
            title: "title.decoration.font",
            company: "company.decoration.font",
            body: "body.decoration.font"
        },
        borders: {
            default: "module.decoration.border"
        }
    },
    module: {
        admin_label: "admin_label.innerContent.*",
        author: "author.innerContent.*",
        job_title: "job_title.innerContent.*",
        company: "company.innerContent.*",
        company_url: "company_url.innerContent.*",
        content: "content.innerContent.*",
        image: "image.innerContent.*",
        author_image_alt_text: "author_image_alt_text.innerContent.*",
        company_logo: "company_logo.innerContent.*",
        company_logo_alt_text: "company_logo_alt_text.innerContent.*",
        rating: "rating.innerContent.*",
        rating_scale_type: "rating_scale_type.innerContent.*",
        rating_value_5: "rating_value_5.innerContent.*",
        rating_value_10: "rating_value_10.innerContent.*",
        quote_icon_image: "quote_icon_image.innerContent.*",
        quote_icon_alt_text: "quote_icon_alt_text.innerContent.*",
        quote_icon_use_icon: "quote_icon_use_icon.innerContent.*",
        quote_icon_font_icon: "quote_icon_font_icon.innerContent.*"
    }
}
};
