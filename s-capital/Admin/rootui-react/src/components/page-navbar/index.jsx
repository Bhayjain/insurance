/**
 * External Dependencies
 */
import React, { Component } from 'react';
import classnames from 'classnames/dedupe';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Collapse,Button } from 'reactstrap';
import Cookies from 'js-cookie';
import './style.scss';

/**
 * Internal Dependencies
 */
import {
    updateAuth as actionUpdateAuth,
    updateSettings as actionUpdateSettings,
} from '../../actions';
import Dropdown from '../bs-dropdown';
import Icon from '../icon';
import FancyBox from '../fancybox';
import PagePopupSearch from '../page-popup-search';
import Messenger from '../messenger';
import { initNavbar } from '../../../../common-assets/js/rootui-parts/initNavbar';

import animationData from '../../lottiesFiles/green_dot_notification.json'
import animationHome from '../../lottiesFiles/home_animation.json'
import Lottie from 'react-lottie';
import home_icon from '../../images/326656_home_icon (4).svg'
import night_home from '../../images/night_home.svg'
import user_img from '../../images/usernight.png'




const $ = window.jQuery;

window.RootUI.initNavbar = initNavbar;


var device_width = window.innerWidth;

/**
 * Component
 */

 const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
 const defaultOptionsHome = {
    loop: true,
    autoplay: true,
    animationData: animationHome,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };


class PageNavbar extends Component {
    constructor( props ) {
        super( props );

        window.RootUI.initNavbar();

        this.state = {
            mobileMenuShow: false,
            logged_in: false,
            profile_picture:""
            // login_name : login_data[0].name
        };

        this.logOut = this.logOut.bind( this );
        this.renderSubmenus = this.renderSubmenus.bind( this );
        this.renderRightMenuItems = this.renderRightMenuItems.bind( this );
    }

    componentDidMount() {
        if(Cookies.get('admin_data')==undefined){
            var login_data =[]
        }
        else{
             console.log("login_data" ,JSON.parse(Cookies.get('admin_data')));
             var login_data = JSON.parse(Cookies.get('admin_data'))
             this.setState({
                login_name : login_data[0].name,
                user_id : login_data[0]._id,
                profile_picture:login_data[0].profile_picture
             })

             this.is_user_logged_in(login_data[0]._id)

            }

        $( document ).on( 'keydown.rui-navbar', ( e ) => {
            const {
                mobileMenuShow,
            } = this.state;

            if ( mobileMenuShow && e.keyCode === 27 ) {
                this.setState( {
                    mobileMenuShow: ! mobileMenuShow,
                } );
            }
        } );
    }


    is_user_logged_in(user_id) {
        console.log("All Goood");
        const {
            addToast,settings
        } = this.props;
    
        var params = {
            user_id:user_id,
        }
        console.log("Is User Login params************",params);
          const res = fetch(settings.api_url + "is_user_logged_in", {
              method: 'POST',
              body: JSON.stringify(params),
              headers: {
                  "Content-type": "application/json; charset=UTF-8",
              }
          }).then((response) => response.json())
              .then(json => {
                  console.log("Is User Login Or Not **************************************", { params: params, response: json })
                  var data = json;
                  if (data.status == true) {
                    this.setState({
                        logged_in:data.logged_in,
                    })
                  }
                  else {
                    this.setState({
                        logged_in:false
                    })
                  }
              })
    
         }



    componentWillUnmount() {
        $( document ).off( 'keydown.rui-navbar' );
    }

    logOut() {
        const {
            updateAuth,
        } = this.props;

        updateAuth( {
            token3: '',
        } );
        Cookies.remove("book_your_home_page");
    }

    back_home = () => {
        console.log("back jome+++++++");
        const {
            updateAuth,
        } = this.props;

        // updateAuth({
        //     // token3: '',
        //     // crm_token: '',
        // });
        Cookies.remove("book_your_home_page");
        this.setState(() => {
            setTimeout(() => {
                this.setState({
                    loading: false,
                })
            });
            setTimeout(() => {
              location.hash = "/home"
                window.location.reload();
            });
        });

    }

    renderSubmenus( nav, isMobile, level = 1 ) {
        return Object.keys( nav ).map( ( url ) => {
            const data = nav[ url ];

            const isActive = window.location.hash === `#${ url }`;

            const LinkContent = data.name ? (
                <>
                    { data.icon ? (
                        <>
                            <Icon name={ data.icon } />
                            <span>{ data.name }</span>
                            <span className={ data.sub ? 'rui-dropdown-circle' : 'rui-nav-circle' } />
                        </>
                    ) : (
                        data.name
                    ) }
                </>
            ) : '';

            return (
                <React.Fragment key={ `${ url }-${ data.name }` }>
                    { data.sub ? (
                        <Dropdown tag="li" className={ classnames( isActive ? 'active' : '' ) } direction={ level === 1 ? 'up' : 'right' } openOnHover={ ! isMobile } showTriangle>
                            <Dropdown.Toggle tag="a" href="#" className="dropdown-item">
                                { LinkContent }
                            </Dropdown.Toggle>
                            <Dropdown.Menu tag="ul" className="nav dropdown-menu">
                                { this.renderSubmenus( data.sub, isMobile, level + 1 ) }
                            </Dropdown.Menu>
                        </Dropdown>
                    ) : (
                        <li className={ classnames( 'nav-item', isActive ? 'active' : '' ) }>
                            <Link
                                to={ data.sub ? '#' : url }
                                className="nav-link"
                            >
                                { LinkContent }
                            </Link>
                        </li>
                    ) }
                </React.Fragment>
            );
        } );
    }

    renderRightMenuItems( isMobile ) {
        const {
            settings,
            updateSettings,
        } = this.props;

        const countriesDropdown = [
            {
                name: 'USA',
                img: settings.img_country.usa,
            },
            {
                name: 'China',
                img: settings.img_country.china,
            },
            {
                name: 'Germany',
                img: settings.img_country.germany,
            },
            {
                name: 'Japan',
                img: settings.img_country.japan,
            },
            {
                name: 'Spain',
                img: settings.img_country.spain,
            },
        ];

      

        return (
            <>
                {/* <li className="nav-item">
                   <FancyBox
                        tagName="a"
                        className={
                            classnames(
                                'd-flex',
                                isMobile ? 'nav-link' : ''
                            )
                        }
                        touch={ false }
                        closeExisting
                        autoFocus
                        parentEl={ null }
                        popupClassName="rui-popup rui-popup-search container"
                        popupRender={ () => (
                            <PagePopupSearch settings={ settings } />
                        ) }
                    >
                        { isMobile ? (
                            <>
                                <Icon name="search" />
                                <span>Search</span>
                            </>
                        ) : (
                            <span className="btn btn-custom-round">
                                <Icon name="search" />
                            </span>
                        ) }
                    </FancyBox>
                </li> */}
                {/* <Dropdown tag="li" direction="up" openOnHover={ ! isMobile } showTriangle>
                   <Dropdown.Toggle
                        tag="a"
                        href="#"
                        className={
                            classnames(
                                'dropdown-item',
                                isMobile ? 'nav-link' : ''
                            )
                        }
                    >
                        { isMobile ? (
                            <>
                                <Icon name="flag" />
                                <span>Language</span>
                            </>
                        ) : (
                            <span className="btn btn-custom-round">
                                <Icon name="flag" />
                            </span>
                        ) }
                    </Dropdown.Toggle>
                    <Dropdown.Menu tag="ul" className="nav dropdown-menu rui-navbar-dropdown-language" modifiers={ { offset: { offset: '0,12' } } }>
                        { countriesDropdown.map( ( data ) => (
                            <li key={ data.name }>
                                <Link to="#" className="rui-navbar-language">
                                    <span className="rui-navbar-language-img">
                                        <img src={ data.img } alt={ data.name } />
                                    </span>
                                    { data.name }
                                </Link>
                            </li>
                        ) ) }
                    </Dropdown.Menu>
                </Dropdown> */}
                {/* <Dropdown tag="li" direction="up" openOnHover={ ! isMobile } showTriangle>
                  <Dropdown.Toggle
                        tag="a"
                        href="#"
                        className={
                            classnames(
                                'dropdown-item',
                                isMobile ? 'nav-link' : ''
                            )
                        }
                    >
                        { isMobile ? (
                            <>
                                <Icon name="bell" />
                                <span>Notifications</span>
                                <span className="badge badge-circle badge-brand">3</span>
                            </>
                        ) : (
                            <span className="btn btn-custom-round">
                                <Icon name="bell" className="mr-0" />
                                <span className="badge badge-circle badge-brand">3</span>
                            </span>
                        ) }
                    </Dropdown.Toggle>
                    <Dropdown.Menu tag="ul" className="nav dropdown-menu rui-navbar-dropdown-notice" modifiers={ { offset: { offset: '0,12' } } }>
                        <li className="rui-navbar-dropdown-title mb-10">
                            <div className="d-flex align-items-center">
                                <h2 className="h4 mb-0 mr-auto">Notifications</h2>
                                <Link to="/profile" className="btn btn-custom-round">
                                    <Icon name="link2" />
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div className="media media-success media-filled mnl-30 mnr-30">
                                <Link to="/profile" className="media-link">
                                    <span className="media-img"><img src={ settings.users[ 4 ].img } alt="" /></span>
                                    <span className="media-body">
                                        <span className="media-title">{ settings.users[ 4 ].name }</span>
                                        <small className="media-subtitle">Bring abundantly creature great...</small>
                                    </span>
                                </Link>
                                <Link to="#" className="media-icon">
                                    <Icon name="x" />
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div className="media media-filled mnl-30 mnr-30">
                                <Link to="/profile" className="media-link">
                                    <span className="media-img">C</span>
                                    <span className="media-body">
                                        <span className="media-title">Change Design</span>
                                        <small className="media-subtitle">Design</small>
                                    </span>
                                </Link>
                                <Link to="#" className="media-icon">
                                    <Icon name="x" />
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div className="media media-filled mnl-30 mnr-30">
                                <Link to="/profile" className="media-link">
                                    <span className="media-img bg-transparent"><img src={ settings.img_file.zip } className="icon-file" alt="" /></span>
                                    <span className="media-body">
                                        <span className="media-title">Added banner archive</span>
                                        <small className="media-subtitle">Commerce</small>
                                    </span>
                                </Link>
                                <Link to="#" className="media-icon">
                                    <Icon name="x" />
                                </Link>
                            </div>
                        </li>
                    </Dropdown.Menu>
                </Dropdown> */}
                {/* <li className="nav-item">
                    <FancyBox
                        tagName="a"
                        className={
                            classnames(
                                'd-flex',
                                isMobile ? 'nav-link' : ''
                            )
                        }
                        keyboard={ false }
                        touch={ false }
                        closeExisting
                        autoFocus
                        popupClassName="rui-popup rui-popup-messenger"
                        popupRender={ () => (
                            <Messenger settings={ settings } />
                        ) }
                    >
                        { isMobile ? (
                            <>
                                <Icon name="message-circle" />
                                <span>Messenger</span>
                            </>
                        ) : (
                            <span className="btn btn-custom-round">
                                <Icon name="message-circle" />
                            </span>
                        ) }
                    </FancyBox>
                </li> */}
                {/* { ! isMobile ? (
                    <Dropdown tag="li" direction="up" openOnHover showTriangle>
                        <Dropdown.Toggle tag="a" href="#" className="dropdown-item rui-navbar-avatar mnr-6 d-none">
                            <img src={ settings.users[ 0 ].img } alt="" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu tag="ul" className="nav dropdown-menu d-none">
                            <li>
                                <Link to="/profile" className="nav-link">
                                    <Icon name="plus-circle" />
                                    <span>Create new Post</span>
                                    <span className="rui-nav-circle" />
                                </Link>
                            </li>
                            <li>
                                <Link to="/profile" className="nav-link">
                                    <Icon name="users" />
                                    <span>Manage Users</span>
                                    <span className="rui-nav-circle" />
                                </Link>
                            </li>
                            <li>
                                <Link to="/profile" className="nav-link">
                                    <Icon name="check-circle" />
                                    <span>Check Updates</span>
                                    <span className="rui-nav-circle" />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#"
                                    className="nav-link"
                                    onClick={ this.logOut }
                                >
                                    <Icon name="log-out" />
                                    <span>Log Out</span>
                                    <span className="rui-nav-circle" />
                                </Link>
                            </li>
                        </Dropdown.Menu>
                    </Dropdown>
                ) : '' } */}
                
                <h1 style={{ marginTop:"-8px",marginRight: "5px", marginBottom: "-7px", PaddingT0p: "5px",display: device_width < 1025 && device_width > 700 ? 'none' : "inline-flex" }}>
                <span style={{marginTop:"0px",display:this.state.logged_in == true ? "block" : "none"}}>
               
                <Lottie 
                    options={defaultOptions}
                    height={38}
                    width={34}
                />
              
                    </span>

                    <div className="my_profile_nav_bar">
                      <img src={this.state.profile_picture == "" || this.state.profile_picture == undefined ? user_img : this.state.profile_picture} alt="Profile" />
                  </div>
                {this.state.login_name}
                  </h1>
                  
                 
                  {/* <Button style={{ display: device_width < 1025 && device_width > 700? 'none' : "block" }} color="info" onClick={this.back_home} >Home</Button> */}
                <Dropdown tag="li" direction="up" openOnHover={ ! isMobile } showTriangle>
                    <Dropdown.Toggle
                        tag="a"
                        // href="#"
                        className={
                            classnames(
                                'dropdown-item mnr-5',
                                isMobile ? 'nav-link' : ''
                            )
                        }
                        nav-link
                    >
                        { isMobile ? (
                            <>
                                <Icon name="more-vertical" />
                                <span>More</span>
                                <span className="rui-dropdown-circle" />
                            </>
                        ) : (
                            <span className="btn btn-custom-round">
                                <Icon name="more-vertical" />
                            </span>
                        ) }
                    </Dropdown.Toggle>
                    <Dropdown.Menu tag="ul" className="nav dropdown-menu" modifiers={ { offset: { offset: '0,12' } } }>
                        <li>
                            <div className="custom-control custom-switch dropdown-item-switch">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="toggleNightMode"
                                    checked={ settings.night_mode }
                                    onChange={ () => {
                                        updateSettings( {
                                            night_mode: ! settings.night_mode,
                                        } )
                                        Cookies.set( 'night_mode_cookie', ! settings.night_mode );
                                        console.log("! settings.night_mode_cookie",! settings.night_mode);
                                    } }
                                />
                                { /* eslint-disable-next-line */ }
                                <label className="dropdown-item custom-control-label" htmlFor="toggleNightMode">
                                    <Icon name="moon" />
                                    <span>Night Mode</span>
                                    <span className="rui-dropdown-circle" />
                                </label>
                            </div>
                        </li>
                        <li>
                            <div className="custom-control custom-switch dropdown-item-switch">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="toggleSpotlightMode"
                                    checked={ settings.spotlight_mode }
                                    onChange={ () => {
                                        updateSettings( {
                                            spotlight_mode: ! settings.spotlight_mode,
                                        } );
                                    } }
                                />
                                { /* eslint-disable-next-line */ }
                                <label className="dropdown-item custom-control-label" htmlFor="toggleSpotlightMode">
                                    <Icon name="square" />
                                    <span>Spotlight Mode</span>
                                    <span className="rui-dropdown-circle" />
                                </label>
                            </div>
                        </li>
                        <li>
                            <div className="custom-control custom-switch dropdown-item-switch">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="toggleSectionLines"
                                    checked={ settings.show_section_lines }
                                    onChange={ () => {
                                        updateSettings( {
                                            show_section_lines: ! settings.show_section_lines,
                                        } );
                                    } }
                                />
                                { /* eslint-disable-next-line */ }
                                <label className="dropdown-item custom-control-label" htmlFor="toggleSectionLines">
                                    <Icon name="layout" />
                                    <span>Show section lines</span>
                                    <span className="rui-dropdown-circle" />
                                </label>
                            </div>
                        </li>
                        <li className="dropdown-menu-label">Sidebar</li>
                        <li>
                            <div className="custom-control custom-switch dropdown-item-switch">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="toggleDarkSidebar"
                                    checked={ settings.sidebar_dark }
                                    onChange={ () => {
                                        updateSettings( {
                                            sidebar_dark: ! settings.sidebar_dark,
                                        } );
                                    } }
                                />
                                { /* eslint-disable-next-line */ }
                                <label className="dropdown-item custom-control-label" htmlFor="toggleDarkSidebar">
                                    <Icon name="sidebar" />
                                    <span>Dark</span>
                                    <span className="rui-dropdown-circle" />
                                </label>
                            </div>
                        </li>
                        <li>
                            <div className="custom-control custom-switch dropdown-item-switch">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="toggleStaticSidebar"
                                    checked={ settings.sidebar_static }
                                    onChange={ () => {
                                        updateSettings( {
                                            sidebar_static: ! settings.sidebar_static,
                                        } );
                                    } }
                                />
                                { /* eslint-disable-next-line */ }
                                <label className="dropdown-item custom-control-label" htmlFor="toggleStaticSidebar">
                                    <Icon name="sidebar" />
                                    <span>Static</span>
                                    <span className="rui-dropdown-circle" />
                                </label>
                            </div>
                        </li>
                        <li className="dropdown-menu-label">Navbar</li>
                        <li>
                            <div className="custom-control custom-switch dropdown-item-switch">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="toggleDarkNavbar"
                                    checked={ settings.nav_dark }
                                    onChange={ () => {
                                        updateSettings( {
                                            nav_dark: ! settings.nav_dark,
                                        } );
                                    } }
                                />
                                { /* eslint-disable-next-line */ }
                                <label className="dropdown-item custom-control-label" htmlFor="toggleDarkNavbar">
                                    <Icon name="menu" />
                                    <span>Dark</span>
                                    <span className="rui-dropdown-circle" />
                                </label>
                            </div>
                        </li>
                    </Dropdown.Menu>
                </Dropdown>
            </>
        );
    }

    render() {
        
        const {
            settings,
        } = this.props;

        const {
            mobileMenuShow,
        } = this.state;

        return (
            <>
                { /* Nav Menu */ }
                <nav className={
                    classnames(
                        'rui-navbar rui-navbar-top',
                        settings.nav_dark ? 'rui-navbar-dark' : '',
                        settings.nav_sticky ? 'rui-navbar-sticky' : '',
                        settings.nav_fixed ? 'rui-navbar-fixed' : '',
                        settings.nav_expand ? `rui-navbar-expand-${ settings.nav_expand }` : '',
                    )
                }
                >
                    <div className="rui-navbar-brand">
                        { settings.nav_logo_path ? (
                            // <Link to={ settings.nav_logo_url } className="rui-navbar-logo">
                            <Link className="rui-navbar-logo">
                                <img style={{  height: '45px', width: 'auto' }} src={ settings.night_mode || settings.nav_dark ? settings.nav_logo_white_path : settings.nav_logo_path } alt="" width={ settings.nav_logo_width } />
                            </Link>
                        ) : '' }

                        <button className="yay-toggle rui-yaybar-toggle" type="button">
                            <span />
                        </button>
                    </div>
                    <div className={ `container${ settings.nav_container_fluid ? '-fluid' : '' }` }>
                        <div className="rui-navbar-content pooop">
                            <ul className="nav">
                                <div aria-hidden="true" className="nav_home_icon" style={{cursor:"pointer"}} onClick={this.back_home}>
                                <div className="lottie-container">
                                    <Lottie 
                                        options={defaultOptionsHome}
                                        height={38}
                                        width={34}
                                    />
                                    </div>
                                   {/* <img className={settings.night_mode || settings.nav_dark ? "home_nigt":"home_nigt"} src={settings.night_mode || settings.nav_dark ? night_home : home_icon} alt="home_icon" /> */}
                                <span className="icon_text_home"> Home </span>
                                </div>
                                { this.renderSubmenus( settings.navigation ) }
                            </ul>
                            <ul className="nav rui-navbar-right">
                                { this.renderRightMenuItems() }
                            </ul>
                        </div>
                    </div>
                </nav>

                { /* Mobile Menu */ }
                <nav className={
                    classnames(
                        'rui-navbar rui-navbar-mobile',
                        settings.nav_dark ? 'rui-navbar-dark' : '',
                        settings.nav_expand ? `rui-navbar-expand-${ settings.nav_expand }` : '',
                        mobileMenuShow ? 'rui-navbar-show' : '',
                    )
                }
                >
                    <div className="rui-navbar-head">
                        { ! mobileMenuShow ? (
                            <button className="rui-yaybar-toggle rui-yaybar-toggle-inverse yay-toggle" type="button" aria-label="Toggle side navigation">
                                <span />
                            </button>
                        ) : '' }
                        { settings.nav_logo_path ? (
                            <Link to={ settings.nav_logo_url } className="rui-navbar-logo mr-auto">
                                <img style={{ height: '45px', width: 'auto' }} src={ settings.night_mode || settings.nav_dark ? settings.nav_logo_white_path : settings.nav_logo_path } alt="" width={ settings.nav_logo_width } />
                            </Link>
                        ) : '' }
                        {/* <Dropdown tag="div" direction="up" showTriangle>
                            <Dropdown.Toggle tag="a" href="#" className="dropdown-item rui-navbar-avatar d-none">
                                <img src={ settings.users[ 0 ].img } alt="" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu tag="ul" className="nav dropdown-menu d-none">
                                <li>
                                    <Link to="/profile" className="nav-link">
                                        <Icon name="plus-circle" />
                                        <span>Create new Post</span>
                                        <span className="rui-nav-circle" />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/profile" className="nav-link">
                                        <Icon name="users" />
                                        <span>Manage Users</span>
                                        <span className="rui-nav-circle" />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/profile" className="nav-link">
                                        <Icon name="check-circle" />
                                        <span>Check Updates</span>
                                        <span className="rui-nav-circle" />
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="#"
                                        className="nav-link"
                                        onClick={ this.logOut }
                                    >
                                        <Icon name="log-out" />
                                        <span>Log Out</span>
                                        <span className="rui-nav-circle" />
                                    </Link>
                                </li>
                            </Dropdown.Menu>
                        </Dropdown> */}
                        <li style={{  display: device_width < 1025 && device_width > 700 ? 'inline-flex' : "none" }}> <h1 style={{marginBottom:'0px',marginTop:'3px',marginRight:'10px'}}>{this.state.project_name}</h1>
                        </li>
                        <button
                            className="navbar-toggler rui-navbar-toggle ml-5"
                            onClick={ () => {
                                this.setState( {
                                    mobileMenuShow: ! mobileMenuShow,
                                } );
                            } }
                        >
                            <span />
                        </button>
                    </div>
                    <Collapse isOpen={ mobileMenuShow } className="navbar-collapse rui-navbar-collapse">
                        <div className="rui-navbar-content">
                            <ul className="nav">
                                { this.renderSubmenus( settings.navigation, true ) }
                                { this.renderRightMenuItems( true ) }
                            </ul>
                        </div>
                    </Collapse>
                </nav>
                <div
                    className="rui-navbar-bg"
                    onClick={ () => {
                        this.setState( {
                            mobileMenuShow: ! mobileMenuShow,
                        } );
                    } }
                    onKeyUp={ () => {} }
                    role="button"
                    tabIndex={ 0 }
                />
            </>
        );
    }
}

export default connect( ( { settings } ) => (
    {
        settings,
    }
), {
    updateAuth: actionUpdateAuth,
    updateSettings: actionUpdateSettings,
} )( PageNavbar );
