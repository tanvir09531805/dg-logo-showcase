import React, { Component } from 'react';
import utility from '../../../scripts/df_scripts/utilities';
import svgData from '../../../admin/assets/svg/textHighlighter.json';
// Internal Dependencies
import './style.css';

class TextHighlighter extends Component {
    static slug = 'difl_text_highlighter';

    constructor(props) {
        super(props)

        this.svgWrapper = React.createRef();
        this.computedType = ['use_divider', 'title_tag', 'highlighter_type', 'enable_gradient_color', 'highlighter_color', 'gradient_color_start', 'gradient_color_end', 'gradient_type', 'gradient_direction', 'gradient_direction_radial', 'gradient_start_position', 'gradient_end_position'];
    }

    componentDidMount() {
        const props = this.props

        if (!this.svgWrapper.current) return;

        const svg = this.svgWrapper.current.querySelector('svg');
        const orderClass = props.moduleInfo.orderClassName;

        if (svg) svg.setAttribute('id', svg.attributes.id.value + '_' + orderClass);

        if ('on' === props.enable_gradient_color) {
            if (svg) this.setGradientColor(svg.attributes.id.value);
        }

    }

    componentDidUpdate(prevProps) {
        const props = this.props

        if (!this.svgWrapper.current) return;

        for (const index in prevProps) {
            if (prevProps[index] !== props[index]
                && this.computedType.includes(index)) {

                const svg = this.svgWrapper.current.querySelector('svg');
                const orderClass = props.moduleInfo.orderClassName;

                svg.setAttribute('id', svg.attributes.id.value + '_' + orderClass);

                if ( null !== svg.attributes.id.value )
                    this.setGradientColor(svg.attributes.id.value);
            }
        }
    }

    setGradientColor(id) {
        const props = this.props;

        const svgDefs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
        const gradient = document.createElementNS('http://www.w3.org/2000/svg', props.gradient_type)
        gradient.setAttribute('id', 'gradient_' + id);
        const gradientDirection = parseInt(props.gradient_direction);

        if ( 'radialGradient' === props.gradient_type ) {
            let coordinates = this.angleToRadialGradient(props.gradient_direction_radial);

            gradient.setAttribute("cx", coordinates.cx);
            gradient.setAttribute("cy", coordinates.cy);
            gradient.setAttribute("r", coordinates.r);
            gradient.setAttribute("fx", coordinates.fx);
            gradient.setAttribute("fy", coordinates.fy);
        } else {

            let coordinates = this.angleToLinearGradientCoordinates(gradientDirection);

            gradient.setAttribute('x1', coordinates.x1);
            gradient.setAttribute('y1', coordinates.y1);
            gradient.setAttribute('x2', coordinates.x2);
            gradient.setAttribute('y2', coordinates.y2);
        }

        const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop1.setAttribute('offset', props.gradient_start_position);
        stop1.setAttribute('stop-color', props.gradient_color_start);

        const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop2.setAttribute('offset', props.gradient_end_position);
        stop2.setAttribute('stop-color', props.gradient_color_end);

        gradient.appendChild(stop1);
        gradient.appendChild(stop2);
        svgDefs.appendChild(gradient);

        const svgContainer = document.getElementById(id);
        if (!svgContainer) return;

        const checkDefs = svgContainer.querySelector('defs');
        if (checkDefs) checkDefs.remove();
        const paths = svgContainer.querySelectorAll('path');

        paths.forEach(function (path) {
            if ( 'on' === props.enable_gradient_color ) {
                path.style.stroke = `url(#gradient_${id})`;
            } else {
                if ( null !== path.attributes.style )
                    path.removeAttribute('style')
            }
        })

        svgContainer.insertBefore(svgDefs, svgContainer.firstChild)
    }

    angleToLinearGradientCoordinates(angleInDegrees) {
        // Convert degrees to radians
        var angleInRadians = angleInDegrees * Math.PI / 180;

        // Calculate coordinates for linear gradient in percentage
        var x1Percent = Math.round(50 + 50 * Math.cos(angleInRadians));
        var y1Percent = Math.round(50 + 50 * Math.sin(angleInRadians));
        var x2Percent = Math.round(50 - 50 * Math.cos(angleInRadians));
        var y2Percent = Math.round(50 - 50 * Math.sin(angleInRadians));

        return { x1: x1Percent + '%', y1: y1Percent + '%', x2: x2Percent + '%', y2: y2Percent + '%' };
    }

    angleToRadialGradient(position = 'top') {

        const angleObj = { top: 0, bottom: 180, left: 270, right: 90 }
        const angleInRadians = angleObj[position] * Math.PI / 180;
        let fxPercent = Math.round(Math.abs(Math.cos(angleInRadians) * 50));
        let fyPercent = Math.round(Math.abs(Math.sin(angleInRadians) * 50));

        if ( 'right' === position ) { fxPercent = 100 }
        if ( 'bottom' === position ) { fyPercent = 100 }

        const positionObj = {
            top: {
                cx: '50%',
                cy: '0%'
            },
            bottom: {
                cx: '50%',
                cy: '100%'
            },
            left: {
                cx: '0%',
                cy: '50%'
            },
            right: {
                cx: '100%',
                cy: '50%'
            },
            center: {
                cx: '50%',
                cy: '50%'
            },
        };

        // Create and return a radial gradient object
        const defaultRadial = {
            r: '70%',          // Assuming the radius is 50%
            fx: fxPercent + '%',  // Calculated focal point x-coordinate in percentage
            fy: fyPercent + '%'   // Calculated focal point y-coordinate in percentage
        };

        const cordinate = {
            ...defaultRadial,
            ...positionObj[position]
        }

        return cordinate;
    }


    static css(props) {
        var additionalCss = [];
        utility.df_process_bg({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'divider_background',
            'selector': '%%order_class%% .df-heading-divider .df-divider-line',
            'important': true
        });
        utility.df_process_bg({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'prefix_background',
            'selector': '%%order_class%% .df-heading .prefix',
            'important': true
        });
        utility.df_process_bg({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'infix_background',
            'selector': '%%order_class%% .df-heading .infix',
            'important': true
        });
        utility.df_process_bg({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'suffix_background',
            'selector': '%%order_class%% .df-heading .suffix',
            'important': true
        });
        // heading spacing
        utility.process_margin_padding({
            'props': props,
            'key': 'heading_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-heading',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'heading_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-heading',
            'type': 'padding'
        });
        // prefix spacing
        utility.process_margin_padding({
            'props': props,
            'key': 'prefix_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-heading .prefix',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'prefix_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-heading .prefix',
            'type': 'padding'
        });
        // infix spacing
        utility.process_margin_padding({
            'props': props,
            'key': 'infix_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-heading .infix',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'infix_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-heading .infix',
            'type': 'padding'
        });
        // suffix spacing
        utility.process_margin_padding({
            'props': props,
            'key': 'suffix_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-heading .suffix',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'suffix_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-heading .suffix',
            'type': 'padding'
        });
        // divider spacing
        utility.process_margin_padding({
            'props': props,
            'key': 'divider_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-heading-divider .df-divider-line',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'divider_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-heading-divider .df-divider-line',
            'type': 'padding'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'divider_container_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-heading-divider',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'divider_container_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-heading-divider',
            'type': 'padding'
        });
        // divider image and icon spacing
        utility.process_margin_padding({
            'props': props,
            'key': 'divider_icon_image_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-heading-divider span, %%order_class%% .df-heading-divider img',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'divider_icon_image_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-heading-divider span, %%order_class%% .df-heading-divider img',
            'type': 'padding'
        });
        // dual_text text spacing
        utility.process_margin_padding({
            'props': props,
            'key': 'dual_text_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-heading-dual_text',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'dual_text_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-heading-dual_text',
            'type': 'padding'
        });

        // highlighter styles
        if ( 'on' !== props.enable_gradient_color ) {
            utility.process_color({
                'props': props,
                'key': 'highlighter_color',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .df-text-highlight svg path',
                'type': 'stroke',
                'important': false,
            });
        }

        utility.process_range_value({
            'props': props,
            'key': 'highlighter_stroke_width',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-text-highlight svg path',
            'type': 'stroke-width',
            'default_value': '8px',
        });

        // svg scale and transform
        let infixTextPaddingRightDesktop = '0px';
        let infixTextPaddingRightTablet = infixTextPaddingRightDesktop;
        let infixTextPaddingRightPhone = infixTextPaddingRightTablet;

        if ( undefined !== props.infix_padding ) {
            infixTextPaddingRightDesktop = props['infix_padding'] && props['infix_padding'] !== '' ? props['infix_padding'].split('|')[1] : '0px';
            infixTextPaddingRightTablet = props['infix_padding' + '_tablet'] && props['infix_padding' + '_tablet'] !== '' ? props['infix_padding' + '_tablet'].split('|')[1] : infixTextPaddingRightDesktop;
            infixTextPaddingRightPhone = props['infix_padding' + '_phone'] && props['infix_padding' + '_phone'] !== '' ? props['infix_padding' + '_phone'].split('|')[1] : infixTextPaddingRightTablet;
        }

        let highlighterSizeDesktop = props['highlighter_size'] && '' !== props['highlighter_size'] ? props['highlighter_size'] : 1;
        let highlighterSizeTablet = props['highlighter_size' + '_tablet'] && '' !== props['highlighter_size' + '_tablet'] ? props['highlighter_size' + '_tablet'] : highlighterSizeDesktop;
        let highlighterSizePhone = props['highlighter_size' + '_phone'] && '' !== props['highlighter_size' + '_phone'] ? props['highlighter_size' + '_phone'] : highlighterSizeTablet;

        if ( "" === infixTextPaddingRightDesktop ) {
            infixTextPaddingRightDesktop = '0px';
        }

        if ( ( highlighterSizeDesktop && '' !== highlighterSizeDesktop ) || ( infixTextPaddingRightDesktop && '' !== infixTextPaddingRightDesktop ) ) {
            additionalCss.push([{
                selector: '%%order_class%% .df-text-highlight svg',
                declaration: `transform: translateX(calc(-100% + 10px + ${infixTextPaddingRightDesktop})) scale(${highlighterSizeDesktop});`,
            }]);
        }


        if ( "" === infixTextPaddingRightTablet ) {
            infixTextPaddingRightTablet = '0px';
        }

        if ( ( highlighterSizeTablet && '' !== highlighterSizeTablet ) || ( infixTextPaddingRightTablet && '' !== infixTextPaddingRightTablet ) ) {
            additionalCss.push([{
                selector: '%%order_class%% .df-text-highlight svg',
                declaration: `transform: translateX(calc(-100% + 10px + ${infixTextPaddingRightTablet})) scale(${highlighterSizeTablet});`,
                'device': 'tablet',
            }]);
        }

        if ( "" === infixTextPaddingRightPhone ) {
            infixTextPaddingRightPhone = '0px';
        }

        if ( ( highlighterSizePhone && '' !== highlighterSizePhone ) || ( infixTextPaddingRightPhone && '' !== infixTextPaddingRightPhone ) ) {
            additionalCss.push([{
                selector: '%%order_class%% .df-text-highlight svg',
                declaration: `transform: translateX(calc(-100% + 10px + ${infixTextPaddingRightPhone})) scale(${highlighterSizePhone});`,
                'device': 'phone'
            }]);
        }

        if ( props['highlighter_size' + '__hover_enabled'] ) {
            if (props['hover_enabled'] && props['hover_enabled'] === 1) {
                if (props['highlighter_size' + '__hover']) {
                    const highlighterSizeHover = props['highlighter_size' + '__hover'];

                    additionalCss.push([{
                        selector: '%%order_class%% .df-text-highlight svg',
                        declaration: `transform: translateX(calc(-100% + 10px + ${infixTextPaddingRightDesktop})) scale(${highlighterSizeHover}) !important;`,
                    }]);
                }
            }
        }

        utility.process_range_value({
            'props': props,
            'key': 'highlighter_opacity',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-text-highlight svg',
            'type': 'opacity',
            'default_value': '1.2',
        });

        if ( 'above' === props.highlighter_position ) {
            additionalCss.push([{
                selector: `%%order_class%% .df-text-highlight svg`,
                declaration: 'z-index: 1 !important;',
            }]);

            additionalCss.push([{
                selector: `%%order_class%% .df-texthighlighter-container .df-heading > span`,
                declaration: 'z-index: 0 !important;',
            }]);
        }

        utility.process_range_value({
            'props': props,
            'key': 'highlighter_vertical_position',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-text-highlight svg',
            'type': 'top',
            'default_value': '0px',
        });

        utility.process_range_value({
            'props': props,
            'key': 'highlighter_horizontal_position',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-text-highlight svg',
            'type': 'margin-left',
            'default_value': '0px',
        });

        // divider styles
        if ( props.divider_style ) {
            additionalCss.push([{
                selector: `%%order_class%% .df-heading-divider .df-divider-line::before`,
                declaration: `border-top-style: ${props.divider_style};`,
            }]);
        }
        if ( props.divider_color ) {
            additionalCss.push([{
                selector: `%%order_class%% .df-heading-divider .df-divider-line::before`,
                declaration: `border-top-color: ${props.divider_color};`,
            }]);
        }

        const divider_height = props.divider_height ? props.divider_height : '5px';
        additionalCss.push([{
            selector: `%%order_class%% .df-heading-divider .df-divider-line`,
            declaration: `top:calc(50% - ${utility.df_get_div_value(divider_height)});`,
        }]);
        if (props.divider_height_tablet) {
            additionalCss.push([{
                selector: `%%order_class%% .df-heading-divider .df-divider-line`,
                declaration: `top:calc(50% - ${utility.df_get_div_value(props.divider_height_tablet)});`,
                'device': 'tablet'
            }]);
        }
        if (props.divider_height_phone) {
            additionalCss.push([{
                selector: `%%order_class%% .df-heading-divider .df-divider-line`,
                declaration: `top:calc(50% - ${utility.df_get_div_value(props.divider_height_phone)});`,
                'device': 'phone'
            }]);
        }
        utility.apply_single_value({
            'props': props,
            'key': 'divider_height',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-heading-divider .df-divider-line::before',
            'type': 'border-top-width',
            'unit': 'px',
            'default_value': '5'
        });
        utility.apply_single_value({
            'props': props,
            'key': 'divider_height',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-heading-divider .df-divider-line',
            'type': 'height',
            'unit': 'px',
            'default_value': '5'
        });

        utility.apply_single_value({
            'props': props,
            'key': 'divider_width',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-heading-divider',
            'type': 'max-width',
            'unit': '%',
            'default_value': '100'
        });
        if ( props.divider_alignment ) {
            if (props.divider_alignment === 'center') {
                additionalCss.push([{
                    selector: `%%order_class%% .df-heading-divider`,
                    declaration: `margin: 0 auto;`,
                }]);
            }
            if (props.divider_alignment === 'right') {
                additionalCss.push([{
                    selector: `%%order_class%% .df-heading-divider`,
                    declaration: `margin: 0 0 0 auto;`,
                }]);
            }
        }
        if ( 'on' !== props.use_divider_icon && 'on' !== props.use_divider_image ) {
            additionalCss.push([{
                selector: `%%order_class%% .df-heading-divider::before`,
                declaration: `position: relative;`,
            }]);
        }
        if ( 'on' === props.use_divider_icon_circle ) {
            additionalCss.push([{
                selector: `%%order_class%% .df-heading-divider .et-pb-icon`,
                declaration: `border-radius: 50%;`,
            }]);
        }
        if ( 'on' === props.use_divider_image_circle ) {
            additionalCss.push([{
                selector: `%%order_class%% .df-heading-divider img`,
                declaration: `border-radius: 50%;`,
            }]);
        }
        utility.apply_single_value({
            'props': props,
            'key': 'divider_border_radius',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-heading-divider .df-divider-line:before',
            'type': 'border-radius',
            'unit': 'px',
            'default_value': '0'
        });
        utility.apply_single_value({
            'props': props,
            'key': 'divider_border_radius',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-heading-divider .df-divider-line',
            'type': 'border-radius',
            'unit': 'px',
            'default_value': '0'
        });
        utility.apply_single_value({
            'props': props,
            'key': 'dvr_icon_font_size',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-heading-divider .et-pb-icon',
            'type': 'font-size',
            'unit': 'px',
            'default_value': '18'
        });
        utility.process_color({
            'props': props,
            'key': 'divider_icon_color',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-heading-divider .et-pb-icon',
            'type': 'color',
            'important': false,
        });
        utility.process_color({
            'props': props,
            'key': 'divider_icon_bgcolor',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-heading-divider .et-pb-icon',
            'type': 'background-color',
            'important': false,
        });
        utility.process_color({
            'props': props,
            'key': 'divider_image_bgcolor',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-heading-divider img.divider-image',
            'type': 'background-color',
            'important': false,
        });
        if ( props.divider_icon_alignment && 'on' === props.use_divider_icon ) {
            additionalCss.push([{
                selector: `%%order_class%% .df-heading-divider`,
                declaration: `text-align: ${props.divider_icon_alignment};`,
            }]);
        }
        utility.apply_single_value({
            'props': props,
            'key': 'divider_image_width',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-heading-divider img',
            'type': 'max-width',
            'unit': 'px',
            'default_value': '100'
        });
        if ( props.divider_image_alignment && 'on' === props.use_divider_image ) {
            additionalCss.push([{
                selector: `%%order_class%% .df-heading-divider`,
                declaration: `text-align: ${props.divider_image_alignment};`,
            }]);
        }
        // dual_text default color
        if ( props.t_dual_text_color ) {
            additionalCss.push([{
                selector: `%%order_class%% .df-heading-dual_text`,
                declaration: `color: ${props.t_dual_text_color};`,
            }]);
        }
        // Display element
        utility.df_process_string_attr({
            'props': props,
            'key': 'title_prefix_block',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-heading .prefix',
            'type': 'display',
            'default_value': 'inline-block'
        });
        utility.df_process_string_attr({
            'props': props,
            'key': 'title_infix_block',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-heading .infix',
            'type': 'display',
            'default_value': 'inline-block'
        });
        utility.df_process_string_attr({
            'props': props,
            'key': 'title_suffix_block',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-heading .suffix',
            'type': 'display',
            'default_value': 'inline-block'
        });

        // process max-width and alignemnt
        utility.df_process_maxwidth({
            'props': props,
            'key': 'prefix',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-heading .prefix',
            'alignment': true
        });
        utility.df_process_maxwidth({
            'props': props,
            'key': 'infix',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-heading .infix',
            'alignment': true
        });
        utility.df_process_maxwidth({
            'props': props,
            'key': 'suffix',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-heading .suffix',
            'alignment': true
        });
        //clip
        utility.df_process_text_clip({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'df_prefix',
            'selector': '%%order_class%% .df-heading .prefix'
        });
        utility.df_process_text_clip({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'df_infix',
            'selector': '%%order_class%% .df-heading .infix'
        });
        utility.df_process_text_clip({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'df_suffix',
            'selector': '%%order_class%% .df-heading .suffix'
        });

        // icon font family
        utility.process_icon_font_style({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'divider_icon',
            'selector': '%%order_class%% .et-pb-icon'
        })

        return additionalCss;
    }

    render_heading_text() {
        const props = this.props;
        const HeadingTag = '' !== props.title_tag ? props.title_tag : 'h3';
        const RenderedHeadingPrefix = props.dynamic.title_prefix.hasValue ?
            <span className={'prefix'}>{utility._renderDynamicContent(props, 'title_prefix')}</span> : '';

        const RenderedHeadingInfix = props.dynamic.title_infix.hasValue ?
            <span className={'infix df-text-highlight'} ref={this.svgWrapper} >
                {utility._renderDynamicContent(props, 'title_infix')}
                <span className="df-svg-wrapper" dangerouslySetInnerHTML={{__html:svgData.TextHighlighterSVG[props.highlighter_type]}}/>
            </span>: '';

        const RenderedHeadingSuffix = props.dynamic.title_suffix.hasValue ?
            <span className={'suffix'}>{utility._renderDynamicContent(props, 'title_suffix')}</span> : '';
        return (
            <HeadingTag className={'df-heading'}>
                {RenderedHeadingPrefix} {RenderedHeadingInfix} {RenderedHeadingSuffix}
            </HeadingTag>
        );
    }

    get_string_value(content) {
        if ( content !== undefined ) {
            let string_value = '';

            if (typeof content === 'string') {
                string_value = content;
            }

            if (typeof content === 'object' && content.hasValue) {
                string_value = content.value;
            }

            return string_value.replace(/(<([^>]+)>)/ig, '');
        }

        return '';
    }

    render_heading_dual_text() {
        const props = this.props;
        const HeadingTitles = [];

        if ( 'on' === props.use_dual_text ) {
            const HeadingPrefix = utility.df_collect_dynamic_content('title_prefix', props);
            const HeadingInfix = utility.df_collect_dynamic_content('title_infix', props);
            const HeadingSuffix = utility.df_collect_dynamic_content('title_suffix', props);
            const DualText = utility.df_collect_dynamic_content('custom_text_input', props);

            if (props.use_dual_text_custom !== 'on') {
                HeadingTitles.push(
                    this.get_string_value(HeadingPrefix),
                    this.get_string_value(HeadingInfix),
                    this.get_string_value(HeadingSuffix)
                );
            } else {
                HeadingTitles.push(this.get_string_value(DualText));
            }

            return (
                <div className="df-heading-dual_text" data-title={HeadingTitles.join(' ')}></div>
            );
        }

        return null;
    }

    render_heading_divider() {
        const utils = window.ET_Builder.API.Utils;
        const props = this.props;
        let divider_icon = '';

        if ( 'on' === props.use_divider ) {
            if ( 'on' === props.use_divider_icon ) {
                let processed_icon = utils.processFontIcon(props.divider_icon) ? utils.processFontIcon(props.divider_icon) : '1';
                divider_icon = <span className="et-pb-icon">{processed_icon}</span>;
            }

            if ( 'on' === props.use_divider_image && '' !== props.divider_image ) {
                divider_icon = <img src={props.divider_image} className="divider-image" alt={props.divider_image_alt_text} />;
            }

            return (
                <div className={'df-heading-divider'}>
                    <div className={'df-divider-line'}></div>
                    {divider_icon}
                </div>
            );
        }

        return null;
    }

    render() {
        const props = this.props;
        let heading_classes = ['df-texthighlighter-container'];
        let heading_text = this.render_heading_text();
        let heading_dual_text = this.render_heading_dual_text();
        let heading_divider = this.render_heading_divider();

        if ( 'on' === props.use_dual_text ) {
            heading_classes.push('has-dual-text');
        }

        return (
            <div className={heading_classes.join(' ')}>
                {heading_dual_text}
                {'on' === props.use_divider ? (
                    'top' !== props.divider_position ? (
                        <>{heading_text} {heading_divider}</>
                    ) : (
                        <>{heading_divider} {heading_text}</>
                    )
                ) : heading_text}
            </div>
        )
    }
}

export default TextHighlighter;
