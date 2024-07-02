/**
 * External Dependencies
 */
import '../../api.js';
import React, { Component, Fragment } from 'react';
import classnames from 'classnames/dedupe';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import Cookies from 'js-cookie';
// import login_img from '../../images/login_back_img.png'
import login_img from '../../images/hom_wall.jpg'
import book_my_insurance_img from '../../images/new_logo_sign_new.png'
// import book_my_insurance_img from '../../images/new_logo.svg'
// import url_pharma from '../..api.js'
/**
 * Internal Dependencies
 */
import Icon from '../../components/icon';
import { isValidEmail } from '../../utils';

import { isValidmobile_number } from '../../utils';
import {
    addToast as actionAddToast,
} from '../../actions';
import { updateAuth as actionUpdateAuth } from '../../actions';
import { event } from 'jquery';
import Label from 'reactstrap/lib/Label';
var url_Pharma = import('../../api.js');

/**
 * Component
 */
 // const api_url = "http://192.168.29.31:4090/";
//  const api_url = "http://173.249.5.10:3005/";

// console.log("kkkkk_llll",Cookies.get( 'pharma_cookie' ));
class Content extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            email: '',
            emailError: '',
            password: '',
            passwordError: '',
            data3:[],
            loading: false,
            mobile_number: '',
            mobile_number_error: '',
            // password: '',
            // passwordError: '',
            // loading: false,
            // stay_login: false,
            message_login:"none",

        };

        this.checkNumber = this.checkNumber.bind(this);
        this.checkEmail = this.checkEmail.bind( this );
        this.checkPassword = this.checkPassword.bind( this );
        this.maybeLogin = this.maybeLogin.bind( this );
        this.onFormSubmit = this.onFormSubmit.bind( this );
    }

    checkNumber() {
        const {
            mobile_number,
        } = this.state;

        const isValid = mobile_number && isValidmobile_number(mobile_number);

        this.setState({
            mobile_number_error: isValid ? '' : 'Invalid mobile number',
        });

        return isValid;
    }

    checkEmail() {
        const {
            email,
        } = this.state;

        const isValid = email && isValidEmail( email );

        this.setState( {
            emailError: isValid ? '' : 'Invalid email format',
        } );

        return isValid;
    }


    checkPassword() {
        const {
            password,
        } = this.state;

        const isValid = password && password.length >= 1;

        this.setState( {
            passwordError: isValid ? '' : 'Password must be at least 1 characters long',
        } );

        return isValid;
    }
    // onFormSubmit = e => {
    //     e.preventDefault();


    //   }

 onFormSubmit = e => {
     e.preventDefault();
        //it triggers by pressing the enter key

        this.maybeLogin();

    };
    maybeLogin=(e)=> {




        // this.setState( {
        //     loading: true,
        // })
        e.preventDefault();
        const {settings } = this.props;
        const {
            updateAuth,
        } = this.props;
        const {
            addToast,
        } = this.props;
        const {
            mobile_number,
            email,
            password
        } = this.state;
        const params={
            email:email,
            mobile_number:mobile_number,
            password:password
        }

        // console.log("paramssssssssssss",settings.api_url)

        if(mobile_number==""||mobile_number==undefined || password==""||password==undefined)
        { alert("please enter all fields")}
        else{
            this.setState( {
                loading: true,
            })
            var register;
            // const res = fetch("https://demo.esenseit.in:6066/api/app/admin_login", {
            const res = fetch(settings.api_url +  "admin_login", {
            method: 'POST',
            body:JSON.stringify(params),
            // referrerPolicy: "unsafe-url",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
            }).then((response)=>response.json()).then(json=>{
            register=json;}).then(()=>{

                this.setState({data3:register["data"]});
                console.log("UserData",register);

                // if(register["status"]==true){
                //     Cookies.set( 'usercookies', register["data"][0]._id);
                //     Cookies.set( "user_management_view",register["data"]["0"]["access_control"]["user_management_view"]),
                //     Cookies.set( "user_management_control",register["data"]["0"]["access_control"]["user_management_control"]),
                //     Cookies.set( "admin_management_view",register["data"]["0"]["access_control"]["admin_management_view"]),
                //     Cookies.set( "admin_management_control",register["data"]["0"]["access_control"]["admin_management_control"]),
                //     Cookies.set( "agent_management_view",register["data"]["0"]["access_control"]["agent_management_view"]),
                //     Cookies.set( "agent_management_control",register["data"]["0"]["access_control"]["agent_management_control"]),
                //     Cookies.set( "master_view",register["data"]["0"]["access_control"]["master_view"]),
                //     Cookies.set( "master_control",register["data"]["0"]["access_control"]["master_control"]),




                //    console.log("login_view",register["data"]["0"]["access_control"]["user_management_view"]);
                //    console.log("login_view",typeof register["data"]["0"]["access_control"]["user_management_view"]);
                //    console.log("agent_management_view",register["data"]["0"]["access_control"]["agent_management_view"]);
                //    console.log("agent_management_view________",typeof register["data"]["0"]["access_control"]["agent_management_view"]);

                //     this.setState({
                //         email:'',
                //         password:'',
                //     });
                //     var redirect_to_page = ""
                //     if(register["data"]["0"]["access_control"]["user_management_view"] === true){
                //        redirect_to_page = "/user-management"
                //     }else if(register["data"]["0"]["access_control"]["admin_management_view"] === true){
                //          redirect_to_page = "/admin-management"
                //     }
                //     // else if(register["data"]["0"]["access_control"]["admin_management_view"] === true){
                //     //      redirect_to_page = "/admin-management"
                //     // }
                //     else if(register["data"]["0"]["access_control"]["agent_management_view"] === true){
                //          redirect_to_page = "/agent-management"
                //     }
                //     else if(register["data"]["0"]["access_control"]["master_view"] === true){
                //         redirect_to_page = "/admin-role"
                //    }
                //     else{
                //          redirect_to_page = ""
                //     }


                //     this.setState( () => {
                //         setTimeout( () => {
                //             this.setState( {
                //                 loading: false,
                //             }),
                //             updateAuth( {
                //                 token2: register["data"],
                //             } ),
                //             console.log("loginnnnnnnnnnnnn",register["data"]["0"]);
                //             addToast( {
                //                 title: 'RootUI React',
                //                 content: register["message"],
                //                 time: new Date(),
                //                 duration: 8000,
                //             } );
                //             location.hash = "/user-management"
                //         }, 600 );
                //     } );


                // }

                var redirect_to_page = ""
                if (register["status"] == true) {
                    var new_admin_data = [{
                        "_id":register["data"][0]._id,
                        "name":register["data"][0].name,
                        "mobile_no":register["data"][0].mobile_no,
                        "role":register["data"][0].role,
                        "designation":register["data"][0].designation,
                        "profile_picture":register["data"][0].profile_picture,
                        "for_admin_panel":register["data"][0].for_admin_panel,
                        "show_home_module":register["data"][0].show_home_module,
                        "show_home_module_msg":register["data"][0].show_home_module_msg,
                       }]
                    Cookies.set('Ask_my_policy_cookies',new_admin_data);
                      this.setState(() => {
                          setTimeout(() => {
                              this.setState({
                                  loading: false,
                              }),
                                  updateAuth({
                                    token2: new_admin_data,

                                  }),
                                //   console.log("gggggggggggsss",register["data"]["0"]);
                                  Cookies.set( 'usercookies', register["data"][0]._id);
                                  Cookies.set( 'admin_data', new_admin_data);
                                  Cookies.remove("book_your_home_page");
                                //   console.log("admin_data",Cookies.get('admin_data'));
                                      Cookies.set( "user_management_view",register["data"]["0"]["access_control"]["user_management_view"]),
                                      Cookies.set( "user_management_control",register["data"]["0"]["access_control"]["user_management_control"]),
                                      Cookies.set( "admin_management_view",register["data"]["0"]["access_control"]["admin_management_view"]),
                                      Cookies.set( "admin_management_control",register["data"]["0"]["access_control"]["admin_management_control"]),
                                      Cookies.set( "recuritement_view",register["data"]["0"]["access_control"]["recuritement_view"]),
                                      Cookies.set( "recuritement_control",register["data"]["0"]["access_control"]["recuritement_control"]),
                                      Cookies.set( "agent_management_view",register["data"]["0"]["access_control"]["agent_management_view"]),
                                      Cookies.set( "agent_management_control",register["data"]["0"]["access_control"]["agent_management_control"]),
                                      Cookies.set( "support_management_view",register["data"]["0"]["access_control"]["support_management_view"]),
                                      Cookies.set( "support_management_control",register["data"]["0"]["access_control"]["support_management_control"]),
                                      Cookies.set( "sales_management_view",register["data"]["0"]["access_control"]["sales_management_view"]),
                                      Cookies.set( "sales_management_control",register["data"]["0"]["access_control"]["sales_management_control"]),
                                      Cookies.set( "policy_dock_view",register["data"]["0"]["access_control"]["policy_dock_view"]),
                                      Cookies.set( "policy_dock_control",register["data"]["0"]["access_control"]["policy_dock_control"]),
                                      Cookies.set( "opeartion_dock_view",register["data"]["0"]["access_control"]["opeartion_dock_view"]),
                                      Cookies.set( "opeartion_dock_control",register["data"]["0"]["access_control"]["opeartion_dock_control"]),
                                      Cookies.set( "deviation_dock_view",register["data"]["0"]["access_control"]["deviation_dock_view"]),
                                      Cookies.set( "deviation_dock_control",register["data"]["0"]["access_control"]["deviation_dock_control"]),
                                      Cookies.set( "reporting_view",register["data"]["0"]["access_control"]["reporting_view"]),
                                      Cookies.set( "reporting_control",register["data"]["0"]["access_control"]["reporting_control"]),
                                      Cookies.set( "accounting_view",register["data"]["0"]["access_control"]["accounting_view"]),
                                      Cookies.set( "accounting_control",register["data"]["0"]["access_control"]["accounting_control"]),
                                      Cookies.set( "cheque_report_view",register["data"]["0"]["access_control"]["cheque_report_view"]),
                                      Cookies.set( "cheque_report_control",register["data"]["0"]["access_control"]["cheque_report_control"]),
                                      Cookies.set( "pending_payment_view",register["data"]["0"]["access_control"]["pending_payment_view"]),
                                      Cookies.set( "pending_payment_control",register["data"]["0"]["access_control"]["pending_payment_control"]),
                                      Cookies.set( "time_tracker_view",register["data"]["0"]["access_control"]["time_tracker_view"]),
                                      Cookies.set( "time_tracker_control",register["data"]["0"]["access_control"]["time_tracker_control"]),
                                      Cookies.set( "customer_cheque_view",register["data"]["0"]["access_control"]["customer_cheque_view"]),
                                      Cookies.set( "customer_cheque_control",register["data"]["0"]["access_control"]["customer_cheque_control"]),
                                      Cookies.set( "master_view",register["data"]["0"]["access_control"]["master_view"]),
                                      Cookies.set( "master_control",register["data"]["0"]["access_control"]["master_control"])
                                      Cookies.set( "endorsement_view",register["data"]["0"]["access_control"]["endorsement_view"]),
                                      Cookies.set( "endorsement_control",register["data"]["0"]["access_control"]["endorsement_control"]),

                                      Cookies.set( "contacts_view",register["data"]["0"]["access_control"]["contacts_view"]),
                                      Cookies.set( "contacts_control",register["data"]["0"]["access_control"]["contacts_control"]),
                                      Cookies.set( "reference_user_view",register["data"]["0"]["access_control"]["reference_user_view"]),
                                      Cookies.set( "reference_user_control",register["data"]["0"]["access_control"]["reference_user_control"]),
                                      Cookies.set( "campaign_view",register["data"]["0"]["access_control"]["campaign_view"]),
                                      Cookies.set( "campaign_control",register["data"]["0"]["access_control"]["campaign_control"]),

                                      Cookies.set( "dashboard_app_view",register["data"]["0"]["access_control"]["dashboard_app_view"]),
                                      Cookies.set( "dashboard_app_control",register["data"]["0"]["access_control"]["dashboard_app_control"]),


                                      Cookies.set( "payroll_view",register["data"]["0"]["access_control"]["payroll_view"]),
                                      Cookies.set( "payroll_control",register["data"]["0"]["access_control"]["payroll_control"]),

                                      Cookies.set( "dashboard_payroll_view",register["data"]["0"]["access_control"]["dashboard_payroll_view"]),
                                      Cookies.set( "dashboard_payroll_control",register["data"]["0"]["access_control"]["dashboard_payroll_control"]),
                                      Cookies.set( "attendance_view",register["data"]["0"]["access_control"]["attendance_view"]),
                                      Cookies.set( "attendance_control",register["data"]["0"]["access_control"]["attendance_control"]),
                                      Cookies.set( "leave_request_view",register["data"]["0"]["access_control"]["leave_request_view"]),
                                      Cookies.set( "leave_request_control",register["data"]["0"]["access_control"]["leave_request_control"]),
                                      Cookies.set( "loans_view",register["data"]["0"]["access_control"]["loans_view"]),
                                      Cookies.set( "loans_control",register["data"]["0"]["access_control"]["loans_control"]),
                                      Cookies.set( "allowance_view",register["data"]["0"]["access_control"]["allowance_view"]),
                                      Cookies.set( "allowance_control",register["data"]["0"]["access_control"]["allowance_control"]),
                                      Cookies.set( "genral_report_view",register["data"]["0"]["access_control"]["genral_report_view"]),
                                      Cookies.set( "genral_report_control",register["data"]["0"]["access_control"]["genral_report_control"]),

                                      Cookies.set( "operation_page",register["data"]["0"]["access_control"]["operation_page"]),
                                      Cookies.set( "telecaller_app_page",register["data"]["0"]["access_control"]["telecaller_app_page"]),
                                      Cookies.set( "payments_page",register["data"]["0"]["access_control"]["payments_page"]),
                                      Cookies.set( "reports_page",register["data"]["0"]["access_control"]["reports_page"]),
                                      Cookies.set( "accounting_page",register["data"]["0"]["access_control"]["accounting_page"]),
                                      Cookies.set( "time_tracker_page",register["data"]["0"]["access_control"]["time_tracker_page"]),
                                      Cookies.set( "employee_page",register["data"]["0"]["access_control"]["employee_page"]),
                                      Cookies.set( "master_page",register["data"]["0"]["access_control"]["master_page"])
                                      Cookies.set( "payroll_page",register["data"]["0"]["access_control"]["payroll_page"])





                                        // if( register["data"]["0"]["access_control"]["policy_dock_view"] === false && register["data"]["0"]["access_control"]["user_management_view"] === true){
                                        // redirect_to_page = "/sales"
                                        // }
                                        // else if( register["data"]["0"]["access_control"]["policy_dock_view"] === false && register["data"]["0"]["access_control"]["admin_management_view"] === true){
                                        //     redirect_to_page = "/admin-management"
                                        // }
                                        // else if( register["data"]["0"]["access_control"]["policy_dock_view"] === false && register["data"]["0"]["access_control"]["agent_management_view"] === true){
                                        //     redirect_to_page = "/agencies-telesales"
                                        // }
                                        // else if(register["data"]["0"]["access_control"]["policy_dock_view"] === true){
                                        //     redirect_to_page = "/operation-dock"
                                        //     // redirect_to_page = "/sales"
                                        // }
                                        // else if(register["data"]["0"]["access_control"]["policy_dock_view"] === false && register["data"]["0"]["access_control"]["support_management_view"] === true ){
                                        //     redirect_to_page = "/support"
                                        // }

                                        // else if(register["data"]["0"]["access_control"]["policy_dock_view"] === false && register["data"]["0"]["access_control"]["sales_management_view"] === true ){
                                        //     redirect_to_page = "/sales"
                                        // }
                                        // else if(register["data"]["0"]["access_control"]["policy_dock_view"] === false && register["data"]["0"]["access_control"]["opeartion_dock_view"] === true ){
                                        //     redirect_to_page = "/mis-dock"
                                        // }
                                        // else if(register["data"]["0"]["access_control"]["policy_dock_view"] === false && register["data"]["0"]["access_control"]["deviation_dock_view"] === true ){
                                        //     redirect_to_page = "/deviation-dock"
                                        // }
                                        // else if(register["data"]["0"]["access_control"]["policy_dock_view"] === false && register["data"]["0"]["access_control"]["reporting_view"] === true ){
                                        //     redirect_to_page = "/daily-sales-report"
                                        // }
                                        // else if(register["data"]["0"]["access_control"]["policy_dock_view"] === false && register["data"]["0"]["access_control"]["pending_payment_view"] === true ){
                                        //     redirect_to_page = "/pending-payment"
                                        // }

                                        // else if(register["data"]["0"]["access_control"]["policy_dock_view"] === false && register["data"]["0"]["access_control"]["accounting_view"] === true ){
                                        //     redirect_to_page = "/cheque"
                                        // }

                                        // else if(register["data"]["0"]["access_control"]["policy_dock_view"] === false && register["data"]["0"]["access_control"]["cheque_report_view"] === true ){
                                        //     redirect_to_page = "/cheque-report"
                                        // }

                                        // else if(register["data"]["0"]["access_control"]["policy_dock_view"] === false && register["data"]["0"]["access_control"]["customer_cheque_view"] === true ){
                                        //     redirect_to_page = "/customer-cheque"
                                        // }

                                        // else if(register["data"]["0"]["access_control"]["policy_dock_view"] === false && register["data"]["0"]["access_control"]["endorsement_view"] === true ){
                                        //     redirect_to_page = "/endorsement"
                                        // }

                                        // else if(register["data"]["0"]["access_control"]["policy_dock_view"] === false && register["data"]["0"]["access_control"]["time_tracker_view"] === true ){
                                        //     redirect_to_page = "/time-tracker"
                                        // }
                                        // else if(register["data"]["0"]["access_control"]["policy_dock_view"] === false && register["data"]["0"]["access_control"]["master_view"] === true ){
                                        //     redirect_to_page = "/admin-role"
                                        //  }
                                        // else{
                                        //     redirect_to_page = "/operation-dock"
                                        //   }


                                  addToast({
                                    title: 'Book Your Insurance',
                                                    content: register["message"],
                                                    time: new Date(),
                                                    duration: 8000,
                                  });
                          });

                        //   setTimeout(() => {
                        //     this.fetch_single_admin_role(value12._id)
                        //   }, 600)


                          setTimeout(() => {
                                location.hash = "/home"
                                // location.hash = redirect_to_page
                                  window.location.reload();
                              });
                      });
                      this.setState({
                          mobile_number: '',
                          password: '',
                          message_login:"none",

                      });

                    //   this.update_online_offline_admin(true)

                  }



                else {
                    this.setState(
                         () => {
                        setTimeout( () => {
                            this.setState( {
                                loading: false,
                                message_login:register["message"],

                            }),
                            addToast( {
                                title: 'Book Your Insurance',
                                content: register["message"],
                                time: new Date(),
                                duration: 8000,
                            } );
                        }, 600 );
                    } );
                }
            });

        }
        if ( this.state.loading ) {
            return;
        }

        let isValid = true;
        isValid = this.checkEmail() && isValid;
        isValid = this.checkPassword() && isValid;

        // Form is not valid.
        if ( ! isValid ) {
            return;
        }
    }


    // update_online_offline_admin = (is_logged_in)=>  {

    //     var usercookies = Cookies.get("usercookies")
    //     console.log("usercookies*************************APIII",usercookies);
    //     var params = {
    //       user_id:usercookies,
    //       is_logged_in:is_logged_in,
    //     }

    //     console.log("Update_for_online*************************APIII",params);
    //     const { settings } = this.props;
    //      const res = fetch(settings.api_url + "update_online_offline_admin", {
    //          method: 'POST',
    //          body: JSON.stringify(params),
    //          headers: {
    //              "Content-type": "application/json; charset=UTF-8",
    //          }
    //      }).then((response) => response.json())
    //          .then(json => {
    //          })
    //  }

    render() {
        const {
          mobile_number,
          mobile_number_error,
            email,
            emailError,
            password,
            passwordError,
        } = this.state;
        const { settings } = this.props;

        // console.log("settings.night_mode");

//         Document.getElementById("pw","pw2")
//     .addEventListener("keyup", function (event) {
//     event.preventDefault();
//     if (event.keyCode === 13) {
//         Document.getElementById("myButton").click();
//     }
// });

// function buttonCode()
// {
//   alert("Button code executed.");
// }

        return (
            <Fragment>
                {/* <div className="hole_contemnttt"> */}
                <div className="bg-image">
                    {/* <div className="bg-grey-1" /> */}
                    <img src={ login_img } alt="" className="my_image my_image_bac" />
                </div>
                <div className="row myrow" id="sign_in_page">
                          <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 mysub_col" >
                            <div className="form rui-sign-form " style={{margin:"auto"}}>
                              <div className="row vertical-gap sm-gap justify-content-center  new_image_data">
                                {/* <img src={ book_my_insurance_img } alt="" className="my_image my_image_12 " /> */}
                                <img src={ settings.night_mode || settings.nav_dark ? settings.nav_logo_white_path : book_my_insurance_img } alt="" className="my_image my_image_12 " />
                              </div>
                            </div>
                          </div>
             <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 mysub_col side_now_data">
                 <div className="welcome_to_book">
                     <h1 className="welcomm_headinggg">Welcome Back</h1>
                     <p className="para_text">Greeting for the day!</p>
                     <p className="para_text">You are visiting the private panel owened and secured</p>
                     <p className="para_text">by Book Your Insurance.</p>
                     <p className="para_text">Kindly login into the system to get started</p>
                 </div>
                 <div className="mar_gin_boo">
                <form className="form rui-sign-form rui-sign-form-cloud newww_backkk" onSubmit={this.maybeLogin} >
                    <div className="row vertical-gap sm-gap justify-content-center">
                        <div className="col-12">
                            <h1 className="display-4 mb-10 colo_looo">Login</h1>
                        </div>
                        <div className="col-12 pass_col">
                        <Label className="labelll">Mobile No</Label>
                        <input
                            type="text"

                            className={classnames(' form-control my_mrewwww', { 'is-invalid': mobile_number_error })}
                            aria-describedby="mobilenumberHelp"
                            placeholder="Mobile Number"
                            value={mobile_number.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')}
                            onChange={(e) => {
                                this.setState({
                                    mobile_number: e.target.value,
                                }, mobile_number_error ? this.checkNumber : () => { });
                            }}
                            onBlur={this.checkNumber}
                            disabled={this.state.loading}
                            id="mob"
                            name="mobile_no"
                        />
                        {mobile_number_error ? (
                            <div id="mobile_number_error" className="invalid-feedback">{mobile_number_error}</div>
                        ) : ''}
                        </div>
                        <div className="col-12 pass_col">
                            <Label className="labelll">Password</Label>
                            <input
                                type="password"
                                id="pass"
                                className={ classnames( 'form-control my_mrewwww', { 'is-invalid': passwordError } ) }
                                placeholder="Password"
                                value={ password }
                                onChange={ ( e ) => {
                                    this.setState( {
                                        password: e.target.value,
                                    }, passwordError ? this.checkPassword : () => {} );
                                } }
                                onBlur={ this.checkPassword }
                                disabled={ this.state.loading }
                                name="password"
                            />
                            { passwordError ? (
                                <div id="passwordErrorNew" className="invalid-feedback">{ passwordError }</div>
                            ) : '' }
                        </div>

                        <div className="col-sm-12" style={{display:this.state.message_login=="none" ? "none" :"block"}}>
                           <p id="false_message">{this.state.message_login}</p>
                        </div>
                        <div className="col-12 submit_btn_new" style={{textAlign:"center"}}>
                            <button
                                id="submit"
                                type="submit"
                                className="btn btn-warning btn-block text-center submitt_ppp"
                                onClick={ this.maybeLogin }
                                disabled={ this.state.loading }
                                style={{color:"#fff",textTransform:"capitalize"}}
                            >
                                Login
                                { this.state.loading ? (
                                    <Spinner />
                                ) : '' }
                            </button>
                        </div>


                    </div>
                </form>

                </div>
                </div>
                    </div>
                <div className="mt-20 text-grey-5 d-none">
                    Don&apos;t you have an account? <Link to="/sign-up" className="text-2">Sign Up</Link>
                </div>
                {/* </div> */}
            </Fragment>
        );
    }
}

export default connect( ( { auth, settings } ) => (
    {
        auth,
        settings,
    }
), { updateAuth: actionUpdateAuth, addToast:actionAddToast  } )( Content );
