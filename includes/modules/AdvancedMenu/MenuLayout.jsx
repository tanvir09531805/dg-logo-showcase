import React, { Component, Fragment, cloneElement } from 'react';
import lodash from 'lodash';

import $ from 'jquery';

import DynamicField from './DynamicField';

import DynamicLogo from './DynamicLogo';

import utility from '../../../scripts/df_scripts/utilities';

class Layout extends Component {
    render() {
        return lodash.map(this.props.elements, (elem, key) => {
            return <Fragment key={key}>{elem}</Fragment>
        })
    }
}

class MenuLayout extends Component {

    constructor(props) {
        super(props);
       
        this.state = {
            layout: {
                top_left: [],
                top_center: [],
                top_right: [],
                center_left: [],
                center_center: [],
                center_right: [],
                bottom_left: [],
                bottom_center: [],
                bottom_right: [],
                mobile_slide: []
            },
            layoutSmall: {
                top_left: [],
                top_center: [],
                top_right: [],
                center_left: [],
                center_center: [],
                center_right: [],
                bottom_left: [],
                bottom_center: [],
                bottom_right: [],
            },
            _request: false,
            dynamicFields: {}
        }

        this.content_wrapper = React.createRef();
    }

    componentDidUpdate(prevProps, prevState) {
        const { props } = this;
        const _this = this;
        const _d = window.DF_Dynamics;

        if(!lodash.isEqual(this.state.dynamicFields, _d)) {
            this.setState({dynamicFields: _d});
        }
        
        if(!lodash.isEqual(props.menuData, prevProps.menuData)) {
            this.processLayout(props.menuData);
        } else if(this.state._request) {
            this.processLayout(props.menuData);
        }
        if(!lodash.isEqual(props.menuDataSmall, prevProps.menuDataSmall)) {
            this.processLayoutSmall(props.menuDataSmall);
        } else if(this.state._request) {
            this.processLayoutSmall(props.menuDataSmall);
        }
        if(!lodash.isEqual(this.state._request, this.props._request)) {
            this.setState({_request: this.props._request});
        }
        
        // increase the z-index of the section when the mobile slide is on
        if (document.body.querySelector(`.${this.props.menuIndex}_mobile_menu`)) {
            if(this.props.showMobileSlide === 'on') {
                document.body.querySelector(`.${this.props.menuIndex}_mobile_menu`)
                .closest('.et_pb_section').style.zIndex = '9999';
            } else {
                document.body.querySelector(`.${this.props.menuIndex}_mobile_menu`)
                .closest('.et_pb_section').style.zIndex = null;
            }
        }

        // hover
        $('.df-normal-menu-wrap li').hover(function(){
            if(!$(this).hasClass('hover')) {
                _this.megaMenu($(this));
                $(this).addClass('df-hover').addClass('df-show-dropdown');
                $(this).find(">ul.sub-menu").css('pointer-events','all');
            }
            if($(this).hasClass('df-mega-menu')) {
                const megaMenuItem = $(this).find('>.sub-menu .sub-menu');
                if(!megaMenuItem.hasClass('df-inside-mega-menu')) {
                    megaMenuItem.addClass('df-inside-mega-menu');
                }
            }
        }, function(){
            $(this).removeClass('df-hover').removeClass('df-show-dropdown');
            $(this).find(">ul.sub-menu").css('pointer-events','none');
        })

        _this.generate_button_icon_on_hover();
    }
    /**
     * Process and add column for the megamenu
     * @param {*} doc 
     * @returns 
     */
    megaMenuColumn = (doc) => {
        $(doc).find('.df-mega-menu').each(function(i, ele) {
            const _col_number = Number(ele.dataset.column);
            let _c = 1;
            $(this).find(">ul>li").each(function(index, element){
                if(!$(this).attr("data-column")) {
                    $(this).attr("data-column", _c);
                    if(_c === _col_number) {
                        _c = 1;
                    } else {
                        _c++;
                    }
                }
            });
            if(!$(this).find('>ul').hasClass('col-added')) {
                $(this).find('[data-column="1"]').wrapAll('<div class="col col-1"></div>');
                $(this).find('[data-column="2"]').wrapAll('<div class="col col-2"></div>');
                $(this).find('[data-column="3"]').wrapAll('<div class="col col-3"></div>');
                $(this).find('[data-column="4"]').wrapAll('<div class="col col-4"></div>');
                $(this).find('[data-column="5"]').wrapAll('<div class="col col-5"></div>');
                $(this).find('[data-column="6"]').wrapAll('<div class="col col-6"></div>');
                $(this).find('[data-column="7"]').wrapAll('<div class="col col-7"></div>');
                $(this).find('>ul').addClass('col-added');
            }
        })
        return doc.body.innerHTML;
    }
    /**
     * Process width for the megamenu
     * @param {*} $obj 
     */
    megaMenu = ($obj) => {
        if($obj.hasClass('df-mega-menu')) {
            var _dataSet = $obj[0].dataset;
            var offsetLeft = $obj.offset().left;
            var containerOffsetLeft = $obj.closest('.row-inner').offset().left;
              
            if( _dataSet.width === 'full_width' ) {
                $obj.find(">.sub-menu")
                .css('width', $(window).width())
                .css('left', `-${$obj.offset().left}px`);
            } else if ( _dataSet.width === 'custom_width' ) {
                var _width = _dataSet.widthValue ? _dataSet.widthValue : '270';
                var _left = '0';
                if( _dataSet.alignment === 'bottom_center' ) {
                    _left = `-${Number(_width)/2 - ($obj.width() /2)}`;
                } else if ( _dataSet.alignment === 'bottom_right' ) {
                    _left = `-${Number(_width) - $obj.width()}`;
                }
                $obj.find(">.sub-menu")
                .css('width', _width)
                .css('left', `${_left}px`);
            } else {
                $obj.find(">.sub-menu")
                .css('width', $obj.closest('.row-inner').width())
                .css('left', -`${offsetLeft - containerOffsetLeft}`);
            }
        }
    }
    /**
     * Process item data and create html markup
     * 
     * @param Object | data
     */
    processLayout = (data) => {
        let layoutData = this.state.layout;
        lodash.map(data, (pData, key) => {
            if( !lodash.isEmpty(pData) ) {
                layoutData[key] = lodash.map(pData, (item) => {
                    if(key === 'mobile_slide' && item.type === 'menu') {
                        return this.mobile_menu(item);
                    } return item.type && this[item.type](item);
                })
            } else {
                return layoutData[key] = [];
            }
        })
        this.setState({layout: layoutData});
    }
    /**
     * Process item data and create html markup
     * 
     * @param Object | data
     */
    processLayoutSmall = (data) => {
        let layoutData = this.state.layoutSmall;
        lodash.map(data, (pData, key) => {
            if( !lodash.isEmpty(pData) ) {
                layoutData[key] = lodash.map(pData, (item) => {
                    // if(key !== 'mobile_slide' && item.type !== 'menu') {
                    //     return item.type && this[item.type](item);
                    // } return item.type && this[item.type](item);
                    return item.type && this[item.type](item);
                })
            } else {
                return layoutData[key] = [];
            }
        })
        this.setState({layoutSmall: layoutData});
    }

    /**
     * Render logo
     * 
     * @param Object | $item
     * @return String | html
     */
    logo = (props) => {
        const { logo_upload, sticky_logo, _class } = props;
        const { dynamicData } = this.props;

        const sticky_class = sticky_logo && sticky_logo !== '' ? ' df-has-sticky' : '';

        return (<div className={`${_class} df-am-item${sticky_class}`}>
            <DynamicLogo 
                type="image"
                content={logo_upload} 
                indexClass={_class} 
                _key="logo_upload" 
                data={dynamicData} />
            <DynamicLogo 
                type="image"
                content={sticky_logo} 
                indexClass={_class} 
                logoclass={'sticky-logo'}
                _key="sticky_logo" 
                data={dynamicData} />
        </div>);
    }

    /**
     * Render mobile menu
     * 
     * @param Object | $item
     * @return String | HTML
     */
    mobile_menu = (props) => {
        let { _class, menu_id } = props;
        menu_id = parseInt(menu_id); 

        if(window.DiviFlash.menus[menu_id]) {
            return (<><div className={`${_class} df-am-item`} 
                dangerouslySetInnerHTML={{__html: window.DiviFlash.menus[menu_id]}}
            />{this.mSlide_button(props)}</>)
        }
         
        return (<div className={`${_class} df-am-item`}>
            <h5>Loading Menu...</h5>
        </div>) 
    }

    /**
     * Render Menu
     * 
     * @param Object | $item
     * @return String | html
     */
    menu = (props) => { 
        let { _class, menu_id,
            desktop_menu, mobile_menu, 
            mm_trigger_icon, item_hover, use_item_hover } = props;
        menu_id = parseInt(menu_id); 
        const _this = this;

        const hover_animation = use_item_hover === 'on' ? 'has-item-animation ' + item_hover : '';
        
        if(window.DiviFlash.menus[menu_id]) {
            const desktopMenu = window.DiviFlash.menus[menu_id];
            const parser = new DOMParser();
            const parsedDocument = parser.parseFromString(desktopMenu, "text/html");
            return (<div className={`${_class} df-am-item ${hover_animation}`}>
                {desktop_menu !== 'hidden' ?
                    <div className='df-normal-menu-wrap' 
                    dangerouslySetInnerHTML={{__html: _this.megaMenuColumn(parsedDocument)}} /> : ''
                }

                {mobile_menu !== 'hidden' ?
                    <div className='df-mobile-menu-wrap'>
                        <button className="df-mobile-menu-button">
                            {mm_trigger_icon ? mm_trigger_icon : 'a'}
                        </button>
                    </div> : ''
                }
            </div>)
        }
        return (<div className={`${_class} df-am-item`}>
            {!menu_id ? <h5>Please select a menu</h5> : <h5>Loading Menu...</h5>}
        </div>) 
    }

    /**
     * Render button
     * 
     * @param Object | $item
     * @return String | html
     */
    button = (props) => { 
        const { 
            _class,
            // button_text,
            button_url,
            use_button_icon,
            button_font_icon,
            button_icon_on_left 
        } = props;

        const { dynamicData } = this.props;

        const button_icon = use_button_icon === 'on' ? <span className="df-am-button-icon">{button_font_icon}</span> : '';

        const button_text = props.button_text === undefined ? 'Button Text' : props.button_text;
        const show_icon_on_hover = props.button_show_icon_on_hover === 'on' ? 'show_icon_on_hover ' : '';
        return <a className={'df-menu-button df-am-item '+ show_icon_on_hover + _class} href={button_url}>
            {button_icon_on_left === 'on' ? button_icon : ''}
            <DynamicField 
                content={button_text} 
                indexClass={_class} 
                _key="button_text" 
                data={dynamicData} />
            {button_icon_on_left != 'on' ? button_icon : '' }
        </a>;

    }

    /**
     * Render search
     * 
     * @param Object | $item
     * @return String | html
     */
    search = (props) => { 
        const { _class, search_style, placeholder, search_icon, search_tr_icon } = props;
        const search_style_class = search_style ? search_style : 'df-searchbox-style-1';
        const placeholderText = placeholder !== '' ? placeholder : '';

        if(search_style === 'df-searchbox-style-5') {
            return(
                <button className={`${_class} df-am-item  df-am-search-button ${search_style_class}`}>
                        {search_tr_icon}
                </button>
            )
        }
        return (<div className={`${_class} df-am-item df-am-search ${search_style_class}`}>
            <form className="" action="%2$s" role="search" method="get">
                <input name="s" className="df_am_s" type="text" placeholder={placeholderText} />
                <button type="submit" className="df_am_searchsubmit with-icon">
                    {search_icon}
                </button>
            </form>
        </div>) 
    }

    /**
     * Render custom text
     * 
     * @param Object | $item
     * @return String | html
     */
    text = (props) => { 
        const { dynamicData } = this.props;
        const { _class, content } = props;   
      
        if(dynamicData[_class].content.dynamic === false){
            return (<div className={`${_class} df-am-item`} 
                    dangerouslySetInnerHTML={{__html: content}}
                />)
        }else{
            return (<div className={`${_class} df-am-item`}> 
                            <DynamicField 
                        content={content} 
                        indexClass={_class} 
                        _key="content" 
                        data={dynamicData} />
                </div>)
        }

    }

    /**
     * Render woocommerce cart
     * 
     * @param Object | $item
     * @return String | html
     */
    cart = (props) => { 
        const { _class, cart_icon, use_cart_count, use_cart_total } = props;
        return (<div className={`${_class} df-am-item`}>
            <a href="#" className="df-cart-info" target="_top">
                <span className='cart-icon-wrap'>
                    <span className='cart-icon'>{cart_icon}</span>
                    {use_cart_count === 'on' ?
                    <span className="cart-item-count">0</span> : '' } 
                </span>
                {use_cart_total === 'on' ? 
                <span className='cart-total'>$0.00</span> : ''}
			</a>
        </div>) 
    }

    /**
     * Render icon button
     * 
     * @param Object
     * @return String
     */
    icon_box = (props) => {
        const { _class, icon_btn_font_icon, icon_box_url } = props;
        return (
            <a href={icon_box_url} className={`${_class} df-icon-button`} target="">
                <span>{icon_btn_font_icon}</span>
            </a>
        )
    }
    /**
     * Render divider
     * 
     * @param {*} layout 
     * @returns 
     */
    divider = (props) => {
        const { _class } = props;
        return (
            <span className={`${_class} df-am-item df-vr-divider`}>
            </span>
        )
    }
    /**
     * Render default
     * 
     * @param {*} layout 
     * @returns 
     */
    select = (props) => {
        return <h5>Please select a type</h5>;
    }

    /**
     * Process the top row layout
     * @param {*} layout 
     * @returns 
     */
    renderTopRow = (layout) => {
        const { top_left, top_center, top_right } = layout;
        const getColumn = (elements, columnClass) => (
          elements && <div className={`df-am-col ${columnClass}`}><Layout elements={elements} /></div>
        );
      
        const left = getColumn(top_left, 'left');
        const center = getColumn(top_center, 'center');
        const right = getColumn(top_right, 'right');
      
        const shouldRender = [top_left, top_center, top_right].some((element) => !lodash.isEmpty(element));
      
        return shouldRender ? (
          <div className="df-am-row top-row">
            <div className="row-inner">
              {left}
              {center}
              {right}
            </div>
          </div>
        ) : null;
    }
      
    /**
     * Process the middle row layout
     * @param {*} layout 
     * @returns 
     */
    renderMiddleRow = (layout) => {
        const { center_left, center_center, center_right } = layout;
      
        const getColumn = (elements, columnClass) => (
          elements && <div className={`df-am-col ${columnClass}`}><Layout elements={elements} /></div>
        );
      
        const left = getColumn(center_left, 'left');
        const center = getColumn(center_center, 'center');
        const right = getColumn(center_right, 'right');
      
        const shouldRender = [center_left, center_center, center_right].some((element) => !lodash.isEmpty(element));
      
        return shouldRender ? (
          <div className="df-am-row center-row">
            <div className="row-inner">
              {left}
              {center}
              {right}
            </div>
          </div>
        ) : null;
    }
      
    /**
     * Process the button row layout
     * @param {*} layout 
     * @returns 
     */
    renderBottomRow = (layout) => {
        const { bottom_left, bottom_center, bottom_right } = layout;
      
        const getColumn = (elements, columnClass) => (
          elements && <div className={`df-am-col ${columnClass}`}><Layout elements={elements} /></div>
        );
      
        const left = getColumn(bottom_left, 'left');
        const center = getColumn(bottom_center, 'center');
        const right = getColumn(bottom_right, 'right');
      
        const shouldRender = [bottom_left, bottom_center, bottom_right].some((element) => !lodash.isEmpty(element));
      
        return shouldRender ? (
          <div className="df-am-row bottom-row">
            <div className="row-inner">
              {left}
              {center}
              {right}
            </div>
          </div>
        ) : null;
    }
      
    mSlide_button = (props) => {
        const {
          _class,
          use_mslide_btn,
          mslide_button_text = 'Button Text',
          mslide_button_url,
          mslide_button_url_new_window,
          mslide_use_button_icon,
          mslide_button_font_icon,
          mslide_button_icon_on_left
        } = props;
      
        if (use_mslide_btn !== 'on') {
          return null;
        }
      
        const buttonIcon = mslide_use_button_icon === 'on' && <span className="df-mslide-button-icon">{mslide_button_font_icon}</span>;
      
        return (
          <a className={`df-mobile-button ${_class}_mslide_btn`} href={mslide_button_url}>
            {mslide_button_icon_on_left === 'on' && buttonIcon}
            <DynamicField content={mslide_button_text} indexClass={_class} _key="button_text" data={this.props.dynamicData} />
            {mslide_button_icon_on_left !== 'on' && buttonIcon}
          </a>
        );
    }
      
    /**
     * Render the mobile slide layout
     * @returns 
     */
    renderMobileSlide = () => {
        const { mobile_slide } = this.state.layout;
        
        if( this.props.showMobileSlide !== 'on' ) return;
        return(
            <div className='df-mobile-menu-wrap df-builder' style={{display: 'block'}}>
                <div className={`df-mobile-menu df-menu-show ${this.props.menuIndex}_mobile_menu`}>
                    <div className='mobile-slide-inner-wrap'>
                        <Layout elements={mobile_slide} />
                    </div>
                </div>
            </div>
        );
    }
    /**
     * Render the view for desktop menu
     * @returns 
     */
    renderView = () => {
        if(window.ET_Builder.API.State.View_Mode.isDesktop()) {
            const tRow = this.renderTopRow(this.state.layout);
            const mRow = this.renderMiddleRow(this.state.layout);
            const bRow = this.renderBottomRow(this.state.layout);
            if(tRow || mRow || bRow) {
                return <>{tRow}{mRow}{bRow}</>
            } else return <h2>Please add items</h2>;
        } else {
            return<>
                {this.renderTopRow(this.state.layoutSmall)}
                {this.renderMiddleRow(this.state.layoutSmall)}
                {this.renderBottomRow(this.state.layoutSmall)}
            </>
        }
    }

    /**
     * add class if menu button show icon on hover option enable
     *  
     */
  
    generate_button_icon_on_hover= () => {
        
        if($(this.content_wrapper.current).find('.df-am-col.right .df-menu-button.show_icon_on_hover')){
            $(this.content_wrapper.current).find('.df-am-col.right').addClass('show_icon_on_hover');
        }
    }

    render() {
        return(
            <div className='df-am-container' ref={this.content_wrapper}>
                {this.renderView()}
                {this.renderMobileSlide()}
            </div>
        )
    }
}
export default MenuLayout;
