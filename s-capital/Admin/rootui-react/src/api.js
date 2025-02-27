/**
 * External Dependencies
 */
 import React, { Component } from 'react';
 import { withRouter, HashRouter, Route } from 'react-router-dom';
 import { Provider, connect } from 'react-redux';
 import { createStore, applyMiddleware } from 'redux';
 import { CSSTransition, TransitionGroup } from 'react-transition-group';
 
 /**
  * Internal Dependencies
  */
 import './components/animated-route';
 import reducers from './reducers';
 import Routes from './Routes';
 import PageYaybar from './components/page-yaybar';
 import PageNavbar from './components/page-navbar';
 import PageToasts from './components/page-toasts';
 import Cookies from 'js-cookie';
 import { updateAuth as actionUpdateAuth } from './actions';
 
 const createStoreWithMiddleware = applyMiddleware()( createStore );
 const $html = window.jQuery( 'html' );
 const $body = window.jQuery( 'body' );
 
 /**
  * Component PageWrap
  */
 class PageWrap extends Component {
     constructor( props ) {
         super( props );
         if (Cookies.get("usercookies") == undefined) {
             
         }else{
             this.update_online_offline_admin(true)
         }
         this.maybeCheckAuth = this.maybeCheckAuth.bind( this );
         this.maybeUpdateGlobalSettings = this.maybeUpdateGlobalSettings.bind( this );
         this.maybeScrollPageToTop = this.maybeScrollPageToTop.bind( this );
     }
 
     update_online_offline_admin = (is_logged_in)=>  {
 
         var usercookies = Cookies.get("usercookies")
         // console.log("usercookies*************************APIII",usercookies);
         var params = {
           user_id:usercookies,
           is_logged_in:is_logged_in,
         }
 
         console.log("Update_for_online*************************APIII",params);
         const { settings } = this.props;
          const res = fetch(settings.api_url + "update_online_offline_admin", {
              method: 'POST',
              body: JSON.stringify(params),
              headers: {
                  "Content-type": "application/json; charset=UTF-8",
              }
          }).then((response) => response.json())
              .then(json => {
              })
      }
 
     componentDidMount() {
 
         window.addEventListener('beforeunload', this.handleBeforeUnload);
         this.maybeCheckAuth();
         this.maybeUpdateGlobalSettings();
     }
 
     componentDidUpdate( prevProps ) {
         this.maybeCheckAuth( prevProps );
         this.maybeUpdateGlobalSettings( prevProps );
         this.maybeScrollPageToTop( prevProps );
     }
 
     componentWillUnmount(){
         window.removeEventListener('beforeunload', this.handleBeforeUnload)
 
         console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkhushboooooooooooooooooooooooooooooooooooooooooo");
 
         // Cookies.remove("user_management_view");
         // Cookies.remove("admin_management_view");
         // Cookies.remove("agent_management_view");
         // Cookies.remove("support_management_view");
         // Cookies.remove("sales_management_view");
         // Cookies.remove("sales_management_control");
         // Cookies.remove("opeartion_dock_view");
         // Cookies.remove("policy_dock_view");
         // Cookies.remove("accounting_view");
         // Cookies.remove("reporting_view");
         // Cookies.remove("master_view");
         // Cookies.remove("deviation_dock_view");
         // Cookies.remove("pending_payment_view");
         // Cookies.remove("usercookies");
         // Cookies.remove("admin_data");
 
         // Cookies.remove("cheque_report_view");
         // Cookies.remove("cheque_report_control");
         // Cookies.remove("time_tracker_view");
         // Cookies.remove("time_tracker_control");
         // Cookies.remove("customer_cheque_view");
         // Cookies.remove("customer_cheque_control");
         // Cookies.remove("endorsement_view");
         // Cookies.remove("endorsement_control");
 
 
     }
 
 
     handleBeforeUnload = () => {
         console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
         var usercookies = Cookies.get("usercookies")
         if (usercookies == undefined || usercookies == "") {
             console.log("usercookies**********",usercookies);
         }else{
 
             this.update_online_offline_admin(false)
         }
         // event.preventDefault(); // Cancel the default event behavior
         // event.returnValue = ''; // Chrome requires a non-empty string to show the dialog
     
         // // Show the popup or perform any action you want here
         // const message = 'Are you sure you want to leave?';
         // alert(message)
         // return message;
         
       };
 
 
     isSignPage( check ) {
 
         console.log("check*****",check);
         if ( ! check ) {
             check = window.location.hash.replace( /^#/g, '' );
         }
 
         return check === '/sign-in' || check === '/sign-up';
     }
 
     maybeCheckAuth( prevProps ) {
         const {
             auth,
             updateAuth,
             history,
         } = this.props;
 
         let newRedirect = false;
 
         const referrerUrl = auth.referrer && ! this.isSignPage( auth.referrer ) ? auth.referrer : '/';
 
         // Redirect from Auth page.
         if ( this.isSignPage() && auth.token2 && auth.token3) {
             newRedirect = referrerUrl;
 
             // Redirect to Auth page.
         } 
         else if ( ! this.isSignPage() &&  auth.token2 && ! auth.token3 ) {
             newRedirect = '/sign-up';
 
             // Check if use logged out or logged in.
         } 
         else if ( ! this.isSignPage() && ! auth.token2 ) {
             newRedirect = '/sign-in';
 
             // Check if use logged out or logged in.
         } 
         else if ( prevProps && auth.token2 !== prevProps.auth.token2 ) {
             newRedirect = auth.token2 ? referrerUrl : '/sign-in';
         }
 
         // Redirect.
         if ( newRedirect ) {
             updateAuth( {
                 referrer: window.location.hash.replace( /^#/g, '' ),
             } );
             history.push( newRedirect );
         }
     }
 
     maybeUpdateGlobalSettings( prevProps ) {
         const { settings } = this.props;
 
         // night mode.
         // console.log("prevProps",Cookies.get('night_mode_cookie'));
         //  console.log("prevProps",prevProps);
         // night mode.
         if ( Cookies.get('night_mode_cookie') == "true") {
 
                 $html.addClass( 'rui-night-mode' );
 
                 // eslint-disable-next-line no-unused-expressions
                 import( './style-night.scss' );
 
         }
         else{
           $html.removeClass( 'rui-night-mode' );
           import( './style-night.scss' );
         }
         // @@@@@@@@@@@@@@@@@@@@@@@@@@@2
         // if ( prevProps && prevProps.settings.night_mode !== settings.night_mode ) {
         //     if ( settings.night_mode ) {
         //         $html.addClass( 'rui-night-mode' );
 
         //         // eslint-disable-next-line no-unused-expressions
         //         import( './style-night.scss' );
         //     } else {
         //         $html.removeClass( 'rui-night-mode' );
         //     }
         // }
         // if ( ! prevProps && settings.night_mode ) {
         //     $html.addClass( 'rui-night-mode' );
 
         //     // eslint-disable-next-line no-unused-expressions
         //     import( './style-night.scss' );
         // }
 
         // spitlight mode.
         if ( prevProps && prevProps.settings.spotlight_mode !== settings.spotlight_mode ) {
             if ( settings.spotlight_mode ) {
                 $body.addClass( 'rui-spotlightmode' );
             } else {
                 $body.removeClass( 'rui-spotlightmode' );
             }
         }
         if ( ! prevProps && settings.spotlight_mode ) {
             $body.addClass( 'rui-spotlightmode' );
         }
 
         // section lines.
         if ( prevProps && prevProps.settings.show_section_lines !== settings.show_section_lines ) {
             if ( settings.show_section_lines ) {
                 $body.addClass( 'rui-section-lines' );
             } else {
                 $body.removeClass( 'rui-section-lines' );
             }
         }
         if ( ! prevProps && settings.show_section_lines ) {
             $body.addClass( 'rui-section-lines' );
         }
 
         // sidebar small.
         if ( prevProps && prevProps.settings.sidebar_small !== settings.sidebar_small ) {
             if ( settings.sidebar_small ) {
                 $body.addClass( 'yay-hide' );
             } else {
                 $body.removeClass( 'yay-hide' );
             }
         }
         if ( ! prevProps && settings.sidebar_small ) {
             $body.addClass( 'yay-hide' );
         }
     }
 
     maybeScrollPageToTop( prevProps ) {
         if ( this.props.location.pathname !== prevProps.location.pathname ) {
             window.scrollTo( {
                 top: 0,
                 behavior: 'smooth',
             } );
         }
     }
 
     render() {
         const {
             auth,
             location,
         } = this.props;
 
         return (
             <TransitionGroup>
                 <PageToasts />
                 <Route>
                     { auth.token2 && auth.token3 ? (
                         <>
                             <Route component={ PageYaybar } />
                             <Route component={ PageNavbar } />
                         </>
                     ) : '' }
                 </Route>
                 <CSSTransition
                     key={ location.pathname }
                     timeout={ 300 }
                     classNames="rui-router-transition"
                     unmountOnExit
                 >
                     <Routes location={ location } />
                 </CSSTransition>
             </TransitionGroup>
         );
     }
 }
 
 const PageWrapWithState = connect( ( { auth, settings } ) => (
     {
         auth,
         settings,
     }
 ), { updateAuth: actionUpdateAuth } )( withRouter( PageWrap ) );
 
 /**
  * Component App
  */
 class App extends Component {
     constructor( props ) {
         super( props );
 
         // create redux store.
         this.store = createStoreWithMiddleware( reducers );
     }
 
     render() {
         return (
             <Provider store={ this.store }>
                 <HashRouter>
                     <PageWrapWithState />
                 </HashRouter>
             </Provider>
         );
     }
 }
 
 export default App;
 