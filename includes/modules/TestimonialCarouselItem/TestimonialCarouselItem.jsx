// External Dependencies
import React, { Component } from 'react';
import utility from '../../../scripts/df_scripts/utilities';
// Internal Dependencies
import './style.css';


class TestimonialCarouselItem extends Component {
    static slug = 'difl_testimonialcarouselitem';
    _isMounted = false;

    constructor(props) {
        super(props);

        this.wrapper = React.createRef();
        this.add_wrapper_class = this.add_wrapper_class.bind(this);
        this.content_output = this.content_output.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.add_wrapper_class();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidUpdate(prevProps, prevState) {
        
    }

    add_wrapper_class() {
        this.wrapper.current.parentElement.parentElement.classList.add('swiper-slide');
    }

    static css(props) {
        const additionalCss = [];

        // icon font family
        utility.process_icon_font_style({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'quote_icon_font_icon',
            'selector'          : '%%order_class%% .et-pb-icon.df_tc_quote_icon'
        })

        return additionalCss;
    }

    render_image(props, key) {
        const utils = window.ET_Builder.API.Utils;
        let icon = '';

        if (props[key + '_use_icon'] && props[key + '_use_icon'] === 'on') {
            if ( !props[key + '_font_icon'] || props[key + '_font_icon'] === '') {
               icon = '{'
            } else {
                icon = utils.processFontIcon(props[key + '_font_icon'])
            }
       }
       if ( props[key + '_use_icon'] === 'on') {
        return (
            <div className="df_tc_quote_image">
                <span className="et-pb-icon df_tc_quote_icon">{icon}</span>
            </div>
        )
       }  else if (props.dynamic[key + '_image'].hasValue) {
            const ImageObject = utility.df_collect_dynamic_content(key + '_image', this.props);
            return utility.df_render_dynamic_image(ImageObject, function (ImageUrl) {
                return (
                    <div className="df_tc_quote_image">
                        <img className="tc_quote_image" src={ImageUrl} alt={''} />
                    </div>
                );
            });
    } else {
            return null
        } 
    }

    content_output() {
        const props = this.props;
        const author_image_object = utility.df_collect_dynamic_content('image', props);
        const author_image = utility.df_render_dynamic_image(author_image_object, function (ImageUrl) {
            return (
                <div className="df_tc_author_image">
                    <img className="tc_author_image" src={ImageUrl} alt={props.author_image_alt_text}/>
                </div>
            );
        });
        
        const content = props.dynamic.content.hasValue ? (
            <div className="df_tc_content">
                {utility._renderDynamicContent(props, 'content')}
            </div>
        ) : '';
        
        const brand_logo_object = utility.df_collect_dynamic_content('company_logo', props);
        const brand_logo = utility.df_render_dynamic_image(brand_logo_object, function (ImageUrl) {
            return (
                <div className="df_tc_company_logo">
                    <img className="tc_company_logo" src={ImageUrl} alt={props.company_logo_alt_text}/>
                </div>
            );
        });
        const author_name = props.dynamic.author.hasValue? (
            <h4 className="author_name">{utility._renderDynamicContent(props, 'author')}</h4>
        ) : '';

        const job_title = props.dynamic.job_title.hasValue ? (
            <span className="tc_job_title">{utility._renderDynamicContent(props, 'job_title')}</span>
        ) : '';

        const company = props.dynamic.company.hasValue ? (
            props.dynamic.company_url.hasValue ? (
                <a href={utility._renderDynamicContent(props, 'company_url', false)} className="tc_company">
                    {utility._renderDynamicContent(props, 'company')}
                </a>
            ) : (
                <span className="tc_company">
                    {utility._renderDynamicContent(props, 'company')}
                </span>
            )
        ) : '';

        const info = author_name !== '' || job_title !== '' || company !== '' ?
                    <div className="df_tc_author_info">
                        {author_name}
                        {job_title} {company}
                    </div> : '';
        const info_box = author_image !== '' || info !== '' ?
                <div className="df_tc_author_box">
                    {author_image}
                    {info}
                </div> : '';

        // Rating scale type
        const rating_scale_type =  props.rating_scale_type !== undefined ? parseInt(props.rating_scale_type) : 5;

        const rating_value = rating_scale_type === 5
        ? props.rating_value_5 <= 5 && props.rating_value_5 >= 0
        ? props.rating_value_5
        : 5
        : props.rating_value_10 <= 10 && props.rating_value_10 >= 0
        ? props.rating_value_10
        : 10;

        
        const icon = "☆";

        // Set Rating Icon
        const rating_icon = [];
        let rating_active_class = "";
        const get_float =
        typeof rating_value === "string" && rating_value.includes(".")
        ? rating_value.split(".")
        : parseInt(rating_value);

        // Display rating Icon
        for (let i = 1; i <= rating_scale_type; i++) {
            if (typeof rating_value === "undefined") {
            rating_active_class = "";
            } else if ([] !== get_float && i <= get_float) {
            rating_active_class = "df_rating_icon_fill";
            } else if (
            i <= parseInt(get_float[0]) ||
            (1 < parseInt(get_float[1]) &&
            parseInt(get_float[0]) + parseInt(1) == i)
            ) {
            if (i <= parseInt(get_float[0])) {
            rating_active_class = "df_rating_icon_fill";
            } else {
            rating_active_class = `df_rating_icon_fill df_rating_icon_empty df_fraction_reverse df_fill_${get_float[1]}`;
            }
            } else {
            rating_active_class = "df_rating_icon_empty";
            }

            // Render rating loop
            rating_icon.push(
                <span className={"et-pb-icon " + rating_active_class} key={i} data-icon={icon}>
                {icon}
                </span>
            );
        }
    
        const ratings = props.rating === 'on' ?
            <div className="df_tc_ratings">
                {rating_icon} 
            </div> : '';
        const quote_icon = props.quote_icon === 'on' ?
            <span className="df_tc_quote_icon"></span> : '';
        
        return (
            <div className="df_tci_inner">
                {this.render_image(props, 'quote_icon')}
                {brand_logo}
                {content}
                {info_box}
                {ratings}
            </div>
        );
    }

    render() {
        const props = this.props;

        return(<>
            <span className="et_pb_background_pattern"></span>
            <span className="et_pb_background_mask"></span>
            <div className="df_tci_container" ref={this.wrapper}>
                <span className="et_pb_background_pattern"></span>
                <span className="et_pb_background_mask"></span>
                {this.content_output()}
            </div>
        </>)
    }
}
export default TestimonialCarouselItem;