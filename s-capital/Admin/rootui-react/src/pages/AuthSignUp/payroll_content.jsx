/**
 * External Dependencies
 */
 import classnames from 'classnames/dedupe';
 import React, { Component, Fragment } from 'react';
 import { connect } from 'react-redux';
 import { Link } from 'react-router-dom';
 // import { Spinner } from 'reactstrap';
 
 // import Cookies from 'js-cookie';
 
 import {
     Spinner, Card, CardImg, CardHeader, CardBody, CardText,
     CardTitle, CardSubtitle, CardLink, CardFooter
 } from 'reactstrap';
 import Cookies from 'js-cookie';
 
 import Dropdown from '../../components/bs-dropdown';
 import time_tracker_image from '../../images/time_tracker_image.png'
 import policies_img from '../../images/policies_img.png'
 import report_image from '../../images/report_image.png'
 import employee_img from '../../images/employee.png'
 import telecaller_app from '../../images/tele_image.png'
 import payments_image from '../../images/payments_image.png'
 import accounts_img from '../../images/accounts_img.png'
 import master_img from '../../images/master_img.png'
 import salary from '../../images/salary.png'
 import login_img from '../../images/hom_wall.jpg'
 
 
 
 
 /**
  * Internal Dependencies
  */
 import Icon from '../../components/icon';
 import { isValidEmail } from '../../utils';
 
 // import { updateAuth as actionUpdateAuth } from '../../actions';
 
 import {
     updateAuth as actionUpdateAuth,
     updateSettings as actionUpdateSettings,
 } from '../../actions';
 
 
 const admin_data = Cookies.get('admin_data');
 const user_management_view = Cookies.get('user_management_view');
 const admin_management_view = Cookies.get('admin_management_view');
 const agent_management_view = Cookies.get('agent_management_view');
 const support_management_view = Cookies.get('support_management_view');
 const sales_management_view = Cookies.get('sales_management_view');
 const sales_management_control = Cookies.get('sales_management_control');
 const opeartion_dock_view = Cookies.get('opeartion_dock_view');
 const policy_dock_view = Cookies.get('policy_dock_view');
 const accounting_view = Cookies.get('accounting_view');
 const cheque_report_view = Cookies.get('cheque_report_view');
 const reporting_view = Cookies.get('reporting_view');
 const master_view = Cookies.get('master_view');
 const deviation_dock_view = Cookies.get('deviation_dock_view');
 const pending_payment_view = Cookies.get('pending_payment_view');
 const time_tracker_view = Cookies.get('time_tracker_view');
 const customer_cheque_view = Cookies.get('customer_cheque_view');
 const endorsement_view = Cookies.get('endorsement_view');
 
 
 const operation_page = Cookies.get('operation_page');
 const telecaller_app_page = Cookies.get('telecaller_app_page');
 const payments_page = Cookies.get('payments_page');
 const reports_page = Cookies.get('reports_page');
 const accounting_page = Cookies.get('accounting_page');
 const time_tracker_page = Cookies.get('time_tracker_page');
 const employee_page = Cookies.get('employee_page');
 const master_page = Cookies.get('master_page');
 const payroll_page = Cookies.get('payroll_page');
 const contacts_view = Cookies.get('contacts_view');
 const reference_user_view = Cookies.get('reference_user_view');
 const campaign_view = Cookies.get('campaign_view');
 const dashboard_app_view = Cookies.get('dashboard_app_view');
 const payroll_view = Cookies.get('payroll_view');
 
 //console.log(user_management_view, "user_management_view");
 ////console.log(admin_management_view, "admin_management_view");
 ////console.log(agent_management_view, "agent_management_view");
 ////console.log(support_management_view, "support_management_view");
 ////console.log(sales_management_view, "sales_management_view");
 console.log(admin_data, "admin_data********************************");
 console.log(master_view, "master_view***************************************************");
 console.log(typeof operation_page, "operation_page***************************************************");
 
 /**
  * Component
  */
 class Content extends Component {
     constructor( props ) {
         super( props );
 
         this.state = {
             email: '',
             emailError: '',
             name: '',
             nameError: '',
             password: '',
             passwordError: '',
             terms: false,
             termsError: '',
             loading: false,
         };
 
 
     }
 
 
 
 
     logout = () => {
         console.log("hdgfhdhgfhdgfhjdg logout ");
         const {
             updateAuth,
         } = this.props;
 
         updateAuth({
             token2: '',
             token3: '',
         })
         Cookies.remove("book_your_home_page");
 
         this.setState(() => {
             // setTimeout(() => {
             //     this.setState({
             //         loading: false,
             //     })
             // });
             setTimeout(() => {
               location.hash = "/sign-in"
                 window.location.reload();
             });
         });
 
     }
 
     select_project = (id) => {
         const {
             updateAuth,
             addToast,
         } = this.props;
         console.log("iddddddddddddddd", id);
         this.setState(() => {
             setTimeout(() => {
                 updateAuth({
                     token3: id,
                 }),
                 Cookies.set('book_your_home_page', id);
 
 
             });
 
             var book_your_home_page = Cookies.get('book_your_home_page');
             console.log("book_your_home_page*****************",book_your_home_page);
             setTimeout(() => {
 
                     if (id == "operation_page"){
 
                         if(policy_dock_view == "true"){
                             location.hash = "/operation-dock"
                         }else if(deviation_dock_view == "true"){
                             location.hash = "/deviation-dock"
                         }else if(opeartion_dock_view == "true"){
                             location.hash = "/mis-dock"
                         }
                     }else if(id == "telecaller_app_page"){
 
                         if(dashboard_app_view == "true"){
                             location.hash = "/dashborad"
                         }else if(campaign_view == "true"){
                             location.hash = "/campaign"
                         }else if(contacts_view == "true"){
                             location.hash = "/contacts"
                         }else if(reference_user_view == "true"){
                             location.hash = "/reference-user"
                         }
                     }else if(id == "payments_page"){
 
                         if(pending_payment_view == "true"){
                             location.hash = "/pending-payment"
                         }
                     }
                     else if(id == "reports_page"){
 
                         if(reporting_view == "true"){
                             location.hash = "/daily-sales-report"
                         }
                     }
                     else if(id == "time_tracker_page"){
 
                         if(time_tracker_view == "true"){
                             location.hash = "/time-tracker"
                         }
                     }
                     else if(id == "accounting_page"){
 
                         if(accounting_view == "true"){
                             location.hash = "/cheque"
                         }else if(cheque_report_view == "true"){
                             location.hash = "/cheque-report"
                         }else if(customer_cheque_view == "true"){
                             location.hash = "/customer-cheque"
                         }
                     }
                     else if(id == "employee_page"){
 
                         if(admin_management_view == "true"){
                             location.hash = "/employee-management"
                         }else if(agent_management_view == "true"){
                             location.hash = "/agencies-telesales"
                         }
                     }
                     else if(id == "master_page"){
 
                         if(master_view == "true"){
                             location.hash = "/admin-role"
                         }
                     }
 
 
                     else if(id == "payroll_page"){
 
                         if(payroll_view == "true"){
                             location.hash = "/salaries"
                         }
                     }
 
 
                     // // if (id == "operation_page") {
                     //     // if (policy_dock_view === "false" && operation_page == "true" && deviation_dock_view == "true") {
                     //     if (policy_dock_view === "true" && operation_page == "true" && id == "operation_page") {
                     //         location.hash = "/operation-dock"
                     //         // location.hash = "/deviation-dock"
 
                     //     }
                     //     else if (policy_dock_view === "false" && operation_page == "true" && deviation_dock_view == "true" && id == "operation_page") {
                     //     // else if (policy_dock_view === "true" && operation_page == "true") {
                     //         // location.hash = "/operation-dock"
                     //         location.hash = "/deviation-dock"
                     //     }
                     //     else if (policy_dock_view === "false" && operation_page == "true" && opeartion_dock_view == "true" && id == "operation_page") {
                     //         location.hash = "/mis-dock"
                     //     }
                     // // }
                     // //  if (id == "telecaller_app_page") {
                     //     else if (policy_dock_view === "false" && telecaller_app_page == "true" && contacts_view == "true" && id == "telecaller_app_page") {
                     //         location.hash = "/contacts"
                     //     }
                     //     else if (policy_dock_view === "false" && telecaller_app_page == "true" && campaign_view == "true" && id == "telecaller_app_page") {
                     //         location.hash = "/campaign"
                     //     }
                     // // }
                     // //  if (id == "payments_page") {
                     //     else if (policy_dock_view === "false" && payments_page == "true" && pending_payment_view == "true" && id == "payments_page") {
                     //         location.hash = "/pending-payment"
                     //     }
                     // // }
                     // //  if (id == "reports_page") {
                     //     else if (policy_dock_view === "false" && reports_page == "true" && reporting_view == "true" && id == "reports_page") {
                     //         location.hash = "/daily-sales-report"
                     //     }
                     // // }
                     // //  if (id == "time_tracker_page") {
                     //     else if (policy_dock_view === "false" && time_tracker_page == "true" && time_tracker_view == "true" && id == "time_tracker_page") {
                     //         location.hash = "/time-tracker"
                     //     }
                     // // }
                     // //  if (id == "accounting_page") {
                     //     else if (policy_dock_view === "false" && accounting_page == "true" && accounting_view == "true" && id == "accounting_page") {
                     //         location.hash = "/cheque"
                     //     }
                     //     else if (policy_dock_view === "false" && accounting_page == "true" && cheque_report_view == "true" && id == "accounting_page") {
                     //         location.hash = "/cheque-report"
                     //     }
                     //     else if (policy_dock_view === "false" && accounting_page == "true" && customer_cheque_view == "true" && id == "accounting_page") {
                     //         location.hash = "/customer-cheque"
                     //     }
                     // // }
                     // //  if (id == "employee_page") {
                     //     else if (policy_dock_view === "false" && employee_page == "true" && admin_management_view == "true" && id == "employee_page") {
                     //         location.hash = "/employee-management"
                     //     }
                     //     else if (policy_dock_view === "false" && employee_page == "true" && agent_management_view == "true" && id == "employee_page") {
                     //         location.hash = "/agencies-telesales"
                     //     }
                     // // }
                     // //  if (id == "master_page") {
                     //     else if (policy_dock_view === "false" && master_page == "true" && master_view == "true" && id == "master_page") {
                     //         location.hash = "/admin-role"
                     //     }
                     // // }
 
                     // else if (policy_dock_view == "false" && inventory_view == "true") {
 
                     //     location.hash = "/purchase-order"
 
                     // } else if (policy_dock_view == "false" && opertion_and_distribution_view == "true") {
 
                     //     location.hash = "/material-distribution"
 
                     // }
                     // else if (policy_dock_view == "false" && sales_view == "true") {
 
                     //     location.hash = "/lead-management"
 
                     // }
                     // else if (policy_dock_view == "false" && accounting_view == "true") {
 
                     //     location.hash = "/customer-ledger"
 
                     // }
 
                     // else if (policy_dock_view == "false" && contractor_task_view == "true") {
 
                     //     location.hash = "/work-progress"
 
                     // }
                     // else if (policy_dock_view == "false" && location_mapping_view == "true") {
 
                     //     location.hash = "/location-mapping"
                     //     // location.hash = "/forms-dropzone"
 
                     // }
                     // else if (policy_dock_view == "false" && non_conformance_view == "true") {
 
                     //     location.hash = "/non-conformance"
 
                     // }
                     // else {
                     //     location.hash = "/operation-dock"
                     //     this.setState({
                     //         please_show_data:"Please show"
                     //     })
 
                     // }
 
                 window.location.reload();
 
             });
 
         })
 
 
 
 
 
 
 
         // select_homies = (id) => {
         //   const {
         //       updateAuth,
         //       addToast,
         //   } = this.props;
         //   console.log("iddddddddddddddd",id);
         //   Cookies.set( 'Dreamland_selected_project_cookie2', id );
         //   this.setState(() => {
         //       setTimeout(() => {
         //               updateAuth({
         //                   dreamland_token2: id
         //               })
         //               // window.location.reload();
         //
         //       }, 600);
         //
         // })
         //     setTimeout(() => {
         //             const supervisor_view = Cookies.get('supervisor_view');
         //             if(supervisor_view == "supervisor"){
         //                 location.hash = "/colors"
         //             }
         //             else{
         //                 location.hash = "/"
         //             }
         //             window.location.reload();
         //
         //         },600);
         // });
 
     }
 
 
 
 
 
 
 
 
     render() {
         const {
             email,
             emailError,
             name,
             nameError,
             password,
             passwordError,
             terms,
             termsError,
         } = this.state;
 
         const {
             settings,
             updateSettings,
         } = this.props;
 
         return (
             <Fragment>
 
                 {/* <div className="container"> */}
                 {/* <div className="bg-image great">
                     <div className="bbg-grey" />
                 </div> */}
                 {/* <div className="bg-image great">
                     <img src={ login_img } alt="" className="my_image_bac" />
                 </div> */}
                 <div style={{ position: 'absolute', top: '0', right: '0', marginTop: '7px', marginRight: '17px', display: 'inline-flex' }}>
                     <button style={{ backgroundColor: 'transparent', outline: 'none', border: 'none', display: 'flex',marginTop:"6px" }} onClick={() => { this.logout() }}> <h3 style={{ marginBottom: '0px', marginRight: '15px', marginTop: "auto", cursor: "pointer" }} >Log Out </h3><Icon name="log-out" onClick={() => { this.logout() }} style={{ marginTop: '5px', minWidth: '10px', height: '16px', marginRight: '15px', cursor: "pointer" }} /></button>
                     <Dropdown
                         tag="div"
                         className="btn-group"
                         openOnHover
                         showTriangle
                     >
                         <Dropdown.Toggle tag="a" className="dropdown-item">
                             <span className="btn btn-custom-round" style={{ marginTop: '5px' }}>
                                 <Icon name="more-vertical" />
                             </span>
                         </Dropdown.Toggle>
                         <Dropdown.Menu tag="ul" className="nav drop_new_data" modifiers={{ offset: { offset: '0,12' } }}>
                             <li>
                                 <div className="custom-control custom-switch dropdown-item-switch">
                                     <input
                                         type="checkbox"
                                         className="custom-control-input"
                                         id="toggleNightMode"
                                         checked={settings.night_mode}
                                         onChange={() => {
                                             updateSettings({
                                                 night_mode: !settings.night_mode,
                                             });
                                             Cookies.set('night_mode_cookie', !settings.night_mode);
                                         }}
                                     />
                                     { /* eslint-disable-next-line */}
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
                                         checked={settings.spotlight_mode}
                                         onChange={() => {
                                             updateSettings({
                                                 spotlight_mode: !settings.spotlight_mode,
                                             });
                                         }}
                                     />
 
                                     <label className="dropdown-item custom-control-label mylab" htmlFor="toggleSpotlightMode">
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
                                         checked={settings.show_section_lines}
                                         onChange={() => {
                                             updateSettings({
                                                 show_section_lines: !settings.show_section_lines,
                                             });
                                         }}
                                     />
 
                                     <label className="dropdown-item custom-control-label mylab" htmlFor="toggleSectionLines">
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
                                         checked={settings.sidebar_dark}
                                         onChange={() => {
                                             updateSettings({
                                                 sidebar_dark: !settings.sidebar_dark,
                                             });
                                         }}
                                     />
 
                                     <label className="dropdown-item custom-control-label mylab" htmlFor="toggleDarkSidebar">
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
                                         checked={settings.sidebar_static}
                                         onChange={() => {
                                             updateSettings({
                                                 sidebar_static: !settings.sidebar_static,
                                             });
                                         }}
                                     />
 
                                     <label className="dropdown-item custom-control-label mylab" htmlFor="toggleStaticSidebar">
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
                                         checked={settings.nav_dark}
                                         onChange={() => {
                                             updateSettings({
                                                 nav_dark: !settings.nav_dark,
                                             });
                                         }}
                                     />
 
                                     <label className="dropdown-item custom-control-label mylab" htmlFor="toggleDarkNavbar">
                                         <Icon name="menu" />
                                         <span>Dark</span>
                                         <span className="rui-dropdown-circle" />
                                     </label>
                                 </div>
                             </li>
                         </Dropdown.Menu>
                     </Dropdown>
                 </div>
 
                 <div className="container margin_down mycalendar">
                 <div className="heading_titleee">
                     <div className="sigh_uppppp_data">
                     <img src={settings.night_mode || settings.nav_dark ? settings.nav_logo_white_path : settings.nav_logo_path } alt="LOGO" className="sign_up_img" />
                     {/* <h1 className="display-4 mb-10 text-center projects great">Welcome to Dreamland</h1> */}
                     </div>
                     <p className="statement great">You are visiting the private panel owened and secured by Book Your Insurance.</p>
                 </div>
 
                 <div className="row ttt great" id="home_page">
                 <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 ss" style={{ marginBottom: "10px", display: operation_page == "true" ? "block" : "none" }}>
                             <Card onClick={() => { this.select_project("operation_page") }} id="operation_page" className="card_ratio animate fadeInRight four " style={{ background: "#1450A3" }}>
                                 <h3 className="heading_title_new">Operations</h3>
                                 <div className="image_center">
                                 <img src={policies_img} alt ="PoliciesImg" />
                                 </div>
                                 <p className="simple_text_new">Here are the policies for your better future</p>
                             </Card>
                  </div>
                 <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 ss" style={{ marginBottom: "10px", display: telecaller_app_page == "true" ? "block" : "none" }}>
                             <Card onClick={() => { this.select_project("telecaller_app_page") }} id="telecaller_app_page" className="card_ratio animate fadeInRight four " style={{ background: "#279EFF" }}>
                               <h3 className="heading_title_new">Telecalling</h3>
                                 <div className="image_center">
                                   <img src={telecaller_app} alt ="telecaller_app" />
                                 </div>
                                 <p className="simple_text_new">Make calling easier Add contacts and start campaigns.</p>
                                 {/*<p className="simple_text_new">Create campaigns & contacts with ease using our Telecaller app.</p>*/}
                             </Card>
                  </div>
                 <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 ss" style={{ marginBottom: "10px", display: payments_page == "true" ? "block" : "none" }}>
                             <Card onClick={() => { this.select_project("payments_page") }} id="payments_page" className="card_ratio animate fadeInRight four " style={{ background: "#4c5a81" }}>
                                 <h3 className="heading_title_new">Payments</h3>
                                 <div className="image_center">
                                   <img src={payments_image} alt ="payments_image" />
                                 </div>
                               <p className="simple_text_new">Effortlessly Settle Pending & Payout Payments</p>
                             </Card>
                  </div>
                 <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 ss" style={{ marginBottom: "10px", display: accounting_page == "true" ? "block" : "none" }}>
                             <Card onClick={() => { this.select_project("accounting_page") }} id="accounting_page" className="card_ratio animate fadeInRight four " style={{ background: "#6693f5" }}>
                                   <h3 className="heading_title_new">Accounts</h3>
                                   <div className="image_center">
                                     <img className="emp_images_new" src={accounts_img} alt ="payments_image" />
                                   </div>
                                   <p className="simple_text_new">Simplify Payments by Adding Checks to your Accounts.</p>
                             </Card>
                  </div>
                 <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 ss" style={{ marginBottom: "10px", display: time_tracker_page == "true" ? "block" : "none" }}>
                             <Card onClick={() => { this.select_project("time_tracker_page") }} id="time_tracker_page" className="card_ratio animate fadeInRight four " style={{ background: "#213363" }}>
                                 <h3 className="heading_title_new">Time Tracker</h3>
                                 <div className="image_center">
                                   <img className="time_hours" src={time_tracker_image} alt ="time_tracker_image" />
                                 </div>
                               <p className="simple_text_new">Track Employee performance with our efficient time tracker.</p>
                             </Card>
                  </div>
                 <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 ss" style={{ marginBottom: "10px", display: employee_page == "true" ? "block" : "none" }}>
                             <Card onClick={() => { this.select_project("employee_page") }} id="employee_page" className="card_ratio animate fadeInRight four " style={{ background: "#6F61C0" }}>
                               <h3 className="heading_title_new">Employees</h3>
                                 <div className="image_center">
                                   <img className="emp_images_new"  src={employee_img} alt ="employee_img" />
                                 </div>
                                 <p className="simple_text_new">Effortlessly Add Employees and Agencies.</p>
                             </Card>
                  </div>
                 <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 ss" style={{ marginBottom: "10px", display: reports_page == "true" ? "block" : "none" }}>
                             <Card onClick={() => { this.select_project("reports_page") }} id="reports_page" className="card_ratio animate fadeInRight four " style={{ background: "#4E4FEB" }}>
                             <h3 className="heading_title_new">Reports</h3>
                                 <div className="image_center">
                                   <img src={report_image} alt ="report_image" />
                                 </div>
                                 <p className="simple_text_new">View and download concise MIS reports</p>
                             </Card>
                  </div>
                 <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 ss" style={{ marginBottom: "10px", display: master_page == "true" ? "block" : "none" }}>
                             <Card onClick={() => { this.select_project("master_page") }} id="master_page" className="card_ratio animate fadeInRight four " style={{ background: "#1D5D9B" }}>
                             <h3 className="heading_title_new">Master</h3>
                                 <div className="image_center">
                                   <img src={master_img} alt ="master_img" />
                                 </div>
                                 <p className="simple_text_new">Simplify management: Add, edit, and delete easily.</p>
                             </Card>
                  </div>
                 {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 ss" style={{ marginBottom: "10px", display: payroll_page == "true" ? "block" : "none" }}>
                             <Card onClick={() => { this.select_project("payroll_page") }} id="payroll_page" className="card_ratio animate fadeInRight four " style={{ background: "#164B60" }}>
                             <h3 className="heading_title_new">Payroll &amp; Attendance </h3>
                                 <div className="image_center">
                                   <img src={salary} alt ="salary" />
                                 </div>
                                 <p className="simple_text_new">Effortlessly Add Payments and Show Attendance.</p>
                             </Card>
                  </div> */}
 
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 ">
                      <p>{this.state.please_show_data}</p>
                  </div>
                 </div>
 
                 </div>
 
                 {/* </div> */}
                 {/* <button onClick={()=>this.logout()}>log out</button>
                 <button onClick={()=>this.select_project("book_you_insurance")}>direct_next_page</button>
               <h1>khushboooo</h1> */}
             </Fragment>
         );
     }
 }
 
 export default connect( ( { auth, settings } ) => (
     {
         auth,
         settings,
     }
 ), { updateAuth: actionUpdateAuth,
      updateSettings: actionUpdateSettings } )( Content );
 