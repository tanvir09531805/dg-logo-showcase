import React, { Component } from 'react';
import utility from '../../../scripts/df_scripts/utilities';
// Internal Dependencies
import './style.css';
import { map, isNull } from 'lodash';

class GravityForm extends Component {
    static slug = 'df_gravity_form';

    

    static css (props) {
        var additionalCss = [];
        const inputSelector = "%%order_class%% .gfield:not(.gfield--type-time) input[type='text'], %%order_class%% input[type='password'], %%order_class%% input[type='url'], %%order_class%% input[type='phone'], %%order_class%% input[type='number']";
        const inputSelectorFocus = "%%order_class%% .gfield:not(.gfield--type-time) input[type='text']:focus, %%order_class%% input[type='password']:focus, %%order_class%% input[type='url']:focus, %%order_class%% input[type='phone']:focus, %%order_class%% input[type='number']:focus";
        const selectSelector = "%%order_class%% .gfield:not(.gfield--type-time) select";
        const selectSelectorFocus = "%%order_class%% .gfield:not(.gfield--type-time) select:focus";
        const textareaSelector = "%%order_class%% textarea";
        const textareaSelectorFocus = "%%order_class%% textarea:focus";
        const checkboxSelector = "%%order_class%% .ginput_container:not(.ginput_container_consent) input[type='checkbox']";
        const radioSelector = "%%order_class%% input[type='radio']";
        const buttonSelector = "%%order_class%% .button";
        // const buttonSelector = "%%order_class%% input[type='button']";
        const confirmSelector = "%%order_class%% .gform_confirmation_message";
        const sectionSelector = "%%order_class%% .gsection";
        const progressSelector = '%%order_class%% .gf_progressbar_percentage';
        const progressWrapper = '%%order_class%% .gf_progressbar_wrapper';
        const gformHeading = '%%order_class%% .gform_heading';
        const consent = '%%order_class%% .gfield--type-consent';
        const error_box_global = "%%order_class%% .gform_validation_errors";
        const error_box = "%%order_class%% .validation_message";
        const progress_steps = "%%order_class%% .gf_page_steps";
        const time_selector = "%%order_class%% .gfield.gfield--type-time input[type='text'], %%order_class%% .gfield.gfield--type-time select";
        const time_input = "%%order_class%% .gfield.gfield--type-time input[type='text']";
        const time_select = "%%order_class%% .gfield.gfield--type-time select";
        const alignmentValues = {
            'left': 'flex-start',
            'right': 'flex-end',
            'center': 'center'
        };

        additionalCss.push([{
            selector:    '%%order_class%% .gform_wrapper',
            declaration: `display: block !important;`,
        }]);
        
        // heading
        utility.df_process_bg({
            'props'         : props,
            'additionalCss' : additionalCss,
            'key'           : 'heading_background',
            'selector'      : gformHeading,
            'important'     : true
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'heading_margin',
            'additionalCss' : additionalCss,
            'selector' : gformHeading,
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'heading_padding',
            'additionalCss' : additionalCss,
            'selector' : gformHeading,
            'type'  : 'padding'
        });
        // progress
        // bar
        utility.df_process_bg({
            'props'         : props,
            'additionalCss' : additionalCss,
            'key'           : 'progress_background',
            'selector'      : progressSelector,
            'important'     : true
        });
        utility.process_color({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'progress_color',
            'type'              : 'color',
            'selector'          : progressSelector,
            'important'         : true
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'progress_margin',
            'additionalCss' : additionalCss,
            'selector' : progressWrapper,
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'progress_padding',
            'additionalCss' : additionalCss,
            'selector' : progressWrapper,
            'type'  : 'padding'
        });
        // steps 
        if(props.steps_align) {
            additionalCss.push([{
                selector:    progress_steps,
                declaration: `text-align: ${props.steps_align} !important;`,
            }]);
        }
        utility.process_color({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'step_background',
            'type'              : 'background-color',
            'selector'          : `${progress_steps} .gf_step .gf_step_number`,
            'important'         : true
        });
        utility.process_color({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'step_color',
            'type'              : 'color',
            'selector'          : `${progress_steps} .gf_step .gf_step_number`,
            'important'         : true
        });
        utility.process_color({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'step_bordercolor',
            'type'              : 'border-color',
            'selector'          : `${progress_steps} .gf_step .gf_step_number`,
            'important'         : true
        });
        utility.process_color({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'active_step_background',
            'type'              : 'background-color',
            'selector'          : `${progress_steps} .gf_step_active .gf_step_number`,
            'important'         : true
        });
        utility.process_color({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'active_step_color',
            'type'              : 'color',
            'selector'          : `${progress_steps} .gf_step_active .gf_step_number`,
            'important'         : true
        });
        utility.process_color({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'active_step_bordercolor',
            'type'              : 'border-color',
            'selector'          : `${progress_steps} .gf_step_active .gf_step_number`,
            'important'         : true
        });
        utility.process_color({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'complete_step_background',
            'type'              : 'background-color',
            'selector'          : `${progress_steps} .gf_step.gf_step_completed .gf_step_number:before`,
            'important'         : true
        });
        utility.process_color({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'complete_step_background',
            'type'              : 'border-color',
            'selector'          : `${progress_steps} .gf_step.gf_step_completed .gf_step_number:before`,
            'important'         : true
        });
        utility.process_color({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'complete_step_color',
            'type'              : 'color',
            'selector'          : `${progress_steps} .gf_step.gf_step_completed .gf_step_number:after`,
            'important'         : true
        });
        utility.process_color({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'complete_step_bordercolor',
            'type'              : 'border-color',
            'selector'          : `${progress_steps} .gf_step.gf_step_completed .gf_step_number`,
            'important'         : true
        });
        utility.process_color({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'step_bottom_bordercolor',
            'type'              : 'border-bottom-color',
            'selector'          : progress_steps,
            'important'         : true
        });
        // input
        utility.process_color({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'input_background',
            'type'              : 'background-color',
            'selector'          : inputSelector
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'input_margin',
            'additionalCss' : additionalCss,
            'selector' : inputSelector,
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'input_padding',
            'additionalCss' : additionalCss,
            'selector' : inputSelector,
            'type'  : 'padding'
        });
        if(props.input_placeholder_color) {
            additionalCss.push([{
                selector:    "%%order_class%% input::placeholder",
                declaration: `color: ${props.input_placeholder_color} !important;`,
            }]);
        }
        // select
        utility.process_color({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'select_background',
            'type'              : 'background',
            'selector'          : selectSelector,
            'important'         : true
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'select_margin',
            'additionalCss' : additionalCss,
            'selector' : selectSelector,
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'select_padding',
            'additionalCss' : additionalCss,
            'selector' : selectSelector,
            'type'  : 'padding'
        });
        // textarea
        utility.process_color({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'textarea_background',
            'type'              : 'background-color',
            'selector'          : textareaSelector
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'textarea_margin',
            'additionalCss' : additionalCss,
            'selector' : textareaSelector,
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'textarea_padding',
            'additionalCss' : additionalCss,
            'selector' : textareaSelector,
            'type'  : 'padding'
        });
        if(props.textarea_placeholder_color) {
            additionalCss.push([{
                selector:    "%%order_class%% textarea::placeholder",
                declaration: `color: ${props.textarea_placeholder_color} !important;`,
            }]);
        }
        // checkbox & radio
        additionalCss.push([{
            selector: '%%order_class%%',
            declaration: `
            --checkbox-size: ${props.checkbox_size};
            --checkbox-border-color: ${props.checkbox_bordercolor};
            --checkbox-tick-color: ${props.checkbox_tickcolor};
            --checkbox-border-width: ${props.checkbox_bordersize};
            --checkbox-background: ${props.checkbox_background};
            --checkbox-gap: ${props.checkbox_gap};
            --radio-size: ${props.radio_size};
            --radio-dot-color: ${props.radio_dotcolor};
            --radio-border-color: ${props.radio_bordercolor};
            --radio-border-width: ${props.radio_bordersize};
            --radio-background: ${props.radio_background};
            --radio-gap: ${props.radio_gap};
            --radio-border-radius: ${props.radio_box === 'on' ? '0' : '50%'}`,
        }]);
        // consent
        additionalCss.push([{
            selector: '%%order_class%%',
            declaration: `
            --consent-checkbox-size: ${props.consent_checkbox_size};
            --consent-checkbox-border-color: ${props.consent_checkbox_bordercolor};
            --consent-checkbox-tick-color: ${props.consent_checkbox_tickcolor};
            --consent-checkbox-border-width: ${props.consent_checkbox_bordersize};
            --consent-checkbox-background: ${props.consent_checkbox_background};
            --consent-description-background: ${props.consent_description_background};
            --consent-description-bordercolor: ${props.consent_description_bordercolor};`,
        }]);
        // error box
        // global error box
        utility.process_color({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'error_box_global_background',
            'type'              : 'background-color',
            'selector'          : error_box_global
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'error_box_global_margin',
            'additionalCss' : additionalCss,
            'selector' : error_box_global,
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'error_box_global_padding',
            'additionalCss' : additionalCss,
            'selector' : error_box_global,
            'type'  : 'padding'
        });
        // field errors
        utility.process_color({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'error_box_background',
            'type'              : 'background-color',
            'selector'          : error_box
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'error_box_margin',
            'additionalCss' : additionalCss,
            'selector' : error_box,
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'error_box_padding',
            'additionalCss' : additionalCss,
            'selector' : error_box,
            'type'  : 'padding'
        });
        // button
        utility.df_process_bg({
            'props'         : props,
            'additionalCss' : additionalCss,
            'key'           : 'button_background',
            'selector'      : buttonSelector,
            'important'     : true
        });
        utility.process_color({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'btn_icon_color',
            'type'              : 'fill',
            'selector'          : `${buttonSelector} svg path`
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'button_margin',
            'additionalCss' : additionalCss,
            'selector' : buttonSelector,
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'button_padding',
            'additionalCss' : additionalCss,
            'selector' : buttonSelector,
            'type'  : 'padding'
        });
        if(props.button_align !== '') {
            additionalCss.push([{
                selector:    '%%order_class%% .gform_footer, %%order_class%% .gform_page_footer',
                declaration: `justify-content: ${alignmentValues[props.button_align]};`,
            }]);
        }
        if(props.button_full_width !== '' && props.button_full_width === 'on') {
            additionalCss.push([{
                selector:    '%%order_class%% .button',
                declaration: `width: 100%;`,
            }]);
        }
        // section
        utility.df_process_bg({
            'props'         : props,
            'additionalCss' : additionalCss,
            'key'           : 'section_background',
            'selector'      : sectionSelector,
            'important'     : true
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'section_margin',
            'additionalCss' : additionalCss,
            'selector' : sectionSelector,
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'section_padding',
            'additionalCss' : additionalCss,
            'selector' : sectionSelector,
            'type'  : 'padding'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'section_title_padding',
            'additionalCss' : additionalCss,
            'selector' : `${sectionSelector} .gsection_title`,
            'type'  : 'padding'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'section_description_padding',
            'additionalCss' : additionalCss,
            'selector' : `${sectionSelector} .gsection_description`,
            'type'  : 'padding'
        });
        // confirm
        utility.df_process_bg({
            'props'         : props,
            'additionalCss' : additionalCss,
            'key'           : 'confirm_background',
            'selector'      : confirmSelector,
            'important'     : true
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'confirm_margin',
            'additionalCss' : additionalCss,
            'selector' : confirmSelector,
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'confirm_padding',
            'additionalCss' : additionalCss,
            'selector' : confirmSelector,
            'type'  : 'padding'
        });
        // focus settings
        utility.process_color({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'input_focus_background',
            'type'              : 'background-color',
            'selector'          : inputSelectorFocus
        });
        utility.process_color({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'input_focus_border_color',
            'type'              : 'border-color',
            'selector'          : inputSelectorFocus
        });
        utility.process_color({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'input_focus_text_color',
            'type'              : 'color',
            'selector'          : inputSelectorFocus
        });
        utility.process_color({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'select_focus_background',
            'type'              : 'background-color',
            'selector'          : selectSelectorFocus
        });
        utility.process_color({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'select_focus_border_color',
            'type'              : 'border-color',
            'selector'          : selectSelectorFocus
        });
        utility.process_color({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'select_focus_text_color',
            'type'              : 'color',
            'selector'          : selectSelectorFocus
        });
        utility.process_color({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'textarea_focus_background',
            'type'              : 'background-color',
            'selector'          : textareaSelectorFocus
        });
        utility.process_color({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'textarea_focus_border_color',
            'type'              : 'border-color',
            'selector'          : textareaSelectorFocus
        });
        utility.process_color({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'textarea_focus_text_color',
            'type'              : 'color',
            'selector'          : textareaSelectorFocus
        });
        // time
        utility.process_color({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'time_background',
            'type'              : 'background-color',
            'selector'          : time_selector
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'time_input_margin',
            'additionalCss' : additionalCss,
            'selector' : time_input,
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'time_input_padding',
            'additionalCss' : additionalCss,
            'selector' : time_input,
            'type'  : 'padding'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'time_select_margin',
            'additionalCss' : additionalCss,
            'selector' : time_select,
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'time_select_padding',
            'additionalCss' : additionalCss,
            'selector' : time_select,
            'type'  : 'padding'
        });
        if(props.time_input_placeholder) {
            additionalCss.push([{
                selector:    `${time_input}::placeholder`,
                declaration: `color: ${props.time_input_placeholder} !important;`,
            }]);
        }
        if(props.time_colon) {
            additionalCss.push([{
                selector:    '%%order_class%% .hour_minute_colon',
                declaration: `color: ${props.time_colon} !important;`,
            }]);
        }

        return additionalCss;
    }

    render_gavity_form(props) {
        if(isNull(props.__gravityFormShortcode)) return <></>;

        const form = props.__gravityFormShortcode;
        const content = props.gravity_forms !== 'none' ? 
            <div className="df-gravity-form-container" dangerouslySetInnerHTML={{__html: form.content}} /> : <h2>Please select a form</h2>;

        if(form && form.styles) {
            map(form.styles, style => {
                this.registerStyle(style);
            })
        }
        
        return content;
    }
    registerStyle(styleUrl) {
        let link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = styleUrl;
        document.head.appendChild(link);
    }
    registerScript(scriptUrl) {
        let script = document.createElement('script');
        script.src = scriptUrl;
        document.body.appendChild(script);
    }
    render() {
        const props = this.props;
        return this.render_gavity_form(props);
    }
}

export default GravityForm;
