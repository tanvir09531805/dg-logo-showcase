// common.js
import { convertBackground, convertSpacing } from '../../../../Assets/js/common.js';

const conversionOutlineProcess = () => {
  
  const processModuleData = () => {
    const general_field = {
      title_on_off: "title_on_off.innerContent.*",
      heading_title_text: "heading_title_text.innerContent.*",
      df_title_bg: "df_title_bg.decoration.*",
      df_items_bg: "df_items_bg.decoration.*",
      day_background_color: "day_background_color.decoration.*",
      time_background_color: "time_background_color.decoration.*",
      day_width: "day_width.innerContent.*",
      start_time_background_color: "start_time_background_color.innerContent.*",
      end_time_background_color: "end_time_background_color.innerContent.*",
      time_separetor_background_color: "time_separetor_background_color.innerContent.*",
      title_margin: "title_margin.decoration.spacing.*.margin",
      title_padding: "title_padding.decoration.spacing.*.padding",
      day_margin: "day_margin.decoration.spacing.*.margin",
      day_padding: "day_padding.decoration.spacing.*.padding",
      time_margin: "time_margin.decoration.spacing.*.margin",
      time_padding: "time_padding.decoration.spacing.*.padding",
      start_time_margin: "start_time_margin.decoration.spacing.*.margin",
      start_time_padding: "start_time_padding.decoration.spacing.*.padding",
      end_time_margin: "end_time_margin.decoration.spacing.*.margin",
      end_time_padding: "end_time_padding.decoration.spacing.*.padding",
      time_separetor_margin: "time_separetor_margin.decoration.spacing.*.margin",
      time_separetor_padding: "time_separetor_padding.decoration.spacing.*.padding",
      main_wrapper_margin: "main_wrapper_margin.decoration.spacing.*.margin",
      main_wrapper_padding: "main_wrapper_padding.decoration.spacing.*.padding",
      item_wrapper_margin: "item_wrapper_margin.decoration.spacing.*.margin",
      item_wrapper_padding: "item_wrapper_padding.decoration.spacing.*.padding",
      title_wrapper_margin: "title_wrapper_margin.decoration.spacing.*.margin",
      title_wrapper_padding: "title_wrapper_padding.decoration.spacing.*.padding",
      day_time_separator_color: "day_time_separator_color.innerContent.*",
      day_time_separator_style: "day_time_separator_style.innerContent.*",
      day_time_separator_hight: "day_time_separator_hight.innerContent.*",
      day_time_separetor_margin: "day_time_separetor_margin.decoration.spacing.*.margin"
    }
    const day_bg = convertBackground( 'day_background_color', 'day_background_color' );
		const time_bg = convertBackground( 'time_background_color', 'time_background_color' );
		const title_bg = convertBackground( 'df_title_bg', 'df_title_bg' );
		const items_bg = convertBackground( 'df_items_bg', 'df_items_bg' );
		return { 
      ...general_field, 
      ...day_bg,
      ...title_bg,
      ...items_bg,
      ...time_bg 
    };
  }

  return {
    advanced: {
      admin_label: "module.meta.adminLabel",
      background: "module.decoration.background",
      fonts: {
          day_name: "day_name.decoration.font",
          time_div: "time_div.decoration.font",
          start_time: "start_time.decoration.font",
          end_time: "end_time.decoration.font",
          time_separetor: "time_separetor.decoration.font",
          title_text: "title_text.decoration.font"
      },
      borders: {
          default: "module.decoration.border",
          item_border: "item_border.decoration.border",
          title_border: "title_border.decoration.border",
          day_border: "day_border.decoration.border",
          time_border: "time_border.decoration.border",
          start_time_border: "start_time_border.decoration.border",
          end_time_border: "end_time_border.decoration.border",
          time_separetor_border: "time_separetor_border.decoration.border"
      },
      box_shadow: {
          default: "module.decoration.boxShadow"
      },
      filters: {
          default: "module.decoration.filters"
      }
    },
    module: processModuleData(),
    
    valueExpansionFunctionMap: {
      title_margin: convertSpacing,
      title_padding: convertSpacing,
      day_margin: convertSpacing,
      day_padding: convertSpacing,
      time_margin: convertSpacing,
      time_padding: convertSpacing,
      start_time_margin: convertSpacing,
      start_time_padding: convertSpacing,
      end_time_margin: convertSpacing,
      end_time_padding: convertSpacing,
      time_separetor_margin: convertSpacing,
      time_separetor_padding: convertSpacing,
      main_wrapper_margin: convertSpacing,
      main_wrapper_padding: convertSpacing,
      item_wrapper_margin: convertSpacing,
      item_wrapper_padding: convertSpacing,
      title_wrapper_margin: convertSpacing,
      title_wrapper_padding: convertSpacing,
      day_time_separetor_margin: convertSpacing
    }
  }
}

export const conversionOutline = conversionOutlineProcess();

