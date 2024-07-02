/**
 * External Dependencies
 */
 import './style.scss';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalFooter,Label,CustomInput,Table,Spinner ,Input} from 'reactstrap';

/**
 * Internal Dependencies
 */
import Snippet from '../../components/snippet';
import Icon from '../../components/icon';
import PageTitle from '../../components/page-title';
import {
    addToast as actionAddToast,
} from '../../actions';
import Cookies from 'js-cookie';

// var api_url = "http://192.168.29.31:4090/"
// const api_url = "http://173.249.5.10:3005/";
/**
 * Component
 */



 const device_width =   window.innerWidth;
 var height =   window.innerHeight;
//  //console.log("emp_screen.height", height);
 const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
//  //console.log("emp_nav_height",nav_height);
 var my_height = height - nav_height;
 var gk = (my_height/2)-100;
//  //console.log("emp_gk",gk);
 if(device_width < 600){
   var gk = (my_height/2) - 50;
 }

 var master_control_12 = Cookies.get('master_control')
//  //console.log("master_control_12",master_control_12);


class Content extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            modalOpen: false,
            role_name:"",
            error_message:"",
            heading_admin:"Add Admin Role",
            button_admin:"Save",
            user_management_view:false,
            user_management_control:false,
            admin_management_view:false,
            admin_management_control:false,
            agent_management_view:false,
            agent_management_control:false,
            support_management_view:false,
            support_management_control:false,
            sales_management_view:false,
            sales_management_control:false,
            opeartion_dock_view:false,
            opeartion_dock_control:false,
            deviation_dock_view:false,
            deviation_dock_control:false,
            policy_dock_view:false,
            policy_dock_control:false,
            reporting_view:false,
            reporting_control:false,
            accounting_view:false,
            accounting_control:false,
            cheque_report_view:false,
            cheque_report_control:false,
            pending_payment_view:false,
            pending_payment_control:false,
            time_tracker_view:false,
            time_tracker_control:false,
            customer_cheque_view:false,
            customer_cheque_control:false,
            endorsement_view:false,
            endorsement_control:false,

            contacts_view:false,
            contacts_control:false,
            reference_user_view:false,
            reference_user_control:false,
            campaign_view:false,
            campaign_control:false,

            dashboard_app_view:false,
            dashboard_app_control:false,


            payroll_view:false,
            payroll_control:false,

            dashboard_payroll_view:false,
            dashboard_payroll_control:false,

            attendance_view:false,
            attendance_control:false,

            allowance_view:false,
            allowance_control:false,
            genral_report_view:false,
            genral_report_control:false,


            operation_page:false,
            telecaller_app_page:false,
            payments_page:false,
            reports_page:false,
            accounting_page:false,
            time_tracker_page:false,
            employee_page:false,
            master_page:false,
            payroll_page:false,

            role_array:[],
            role_array_1:[],
            AlertDelete:false,
            master_control_12:Cookies.get('master_control'),
            isLoading:"block",
            spinner_1: 'none',
            ipad_width:"none",
            ipad_emp_list:"block",
            borderNew:false,
            loading:false,
        };
        this.fetch_admin_role();
        this.toggle = this.toggle.bind( this );
        this.AlertDelete = this.AlertDelete.bind( this );
    }

    toggle() {
        this.setState( ( prevState ) => ( {
            modalOpen: ! prevState.modalOpen,
            heading_admin:"Add Admin Role",
            button_admin:"Save",
            error_message:"",
            role_name:"",
            user_management_view:false,
            user_management_control:false,
            admin_management_view:false,
            admin_management_control:false,
            agent_management_view:false,
            agent_management_control:false,
            support_management_view:false,
            support_management_control:false,
            sales_management_view:false,
            sales_management_control:false,
            opeartion_dock_view:false,
            opeartion_dock_control:false,
            deviation_dock_view:false,
            deviation_dock_control:false,
            policy_dock_view:false,
            policy_dock_control:false,
            reporting_view:false,
            reporting_control:false,
            accounting_view:false,
            accounting_control:false,
            cheque_report_view:false,
            cheque_report_control:false,
            pending_payment_view:false,
            pending_payment_control:false,
            time_tracker_view:false,
            time_tracker_control:false,
            customer_cheque_view:false,
            customer_cheque_control:false,
            endorsement_view:false,
            endorsement_control:false,
            master_view:false,
            master_control:false,

            contacts_view:false,
            contacts_control:false,
            reference_user_view:false,
            reference_user_control:false,
            campaign_view:false,
            campaign_control:false,
            dashboard_app_view:false,
            dashboard_app_control:false,


            payroll_view:false,
            payroll_control:false,
            dashboard_payroll_view:false,
            dashboard_payroll_control:false,
            attendance_view:false,
            attendance_control:false,
            allowance_view:false,
            allowance_control:false,
            genral_report_view:false,
            genral_report_control:false,
            leave_request_view:false,
            leave_request_control:false,
            loans_view:false,
            loans_control:false,


            operation_page:false,
            telecaller_app_page:false,
            payments_page:false,
            reports_page:false,
            accounting_page:false,
            time_tracker_page:false,
            employee_page:false,
            master_page:false,
            payroll_page:false,
            loading:false,

            recuritement_view : false,
            recuritement_control : false,
        } ) );
    }

    AlertDelete() {
        this.setState((prevState) => ({
          AlertDelete: !prevState.AlertDelete,
        }));
      }

    fetch_admin_role () {
      const { addToast,settings } = this.props;
        const res = fetch(settings.api_url + "fetch_admin_role", {
          method: 'POST',
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          }
        }).then((response) => response.json())
          .then(json => {
            //console.log("fetch_admin_role **************************************", json)
            var data = json;
            if (data.status == true) {
              this.setState({
                role_array: data.data,
                role_id:data.data[0]._id,
                isLoading:"none"
              });

              if (device_width < 769) {
              //  //console.log("display lisit none");
              }
              else{
              this.fetch_single_admin_role(this.state.role_id)
              }

            }
            else {
              this.setState({
                role_array: [],
                isLoading:"none"
              });
              // //console.log("fetch_emp wrong");
            }
          })
      }


      fetch_single_admin_role = (role_id) => {
        const { addToast,settings } = this.props;
        var params = {
            role_id: role_id,
        }
        // //console.log("user_id", params);
       const res = fetch(settings.api_url + "fetch_single_admin_role", {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      }).then((response) => response.json())
        .then(json => {
          console.log("fetch_single_admin_role **************************************", json)
          var data = json;

          if (data.status == true) {
            if (device_width < 769) {
              var ipad_emp_list = "none";
              // //console.log("display lisit none", ipad_emp_list);
             }
             else{
             var ipad_emp_list = "block"
            //  //console.log("display lisit");

             }

             var role_array = this.state.role_array

             for (let i = 0; i < role_array.length; i++) {
              if (data.data[0]._id == role_array[i]._id) {
                role_array[i].role_name = data.data[0].role_name
              }
             }

            this.setState({
              role_array_1: data.data,
              role_array:role_array,
              role_id:data.data[0]._id,
              role_name:data.data[0].role_name,
              spinner_1: 'none',
              ipad_width:"block",
              ipad_emp_list:ipad_emp_list,
              });

              if(Cookies.get('admin_data')==undefined){
                // var admin_data =[]
               }else{
                // const admin_data = JSON.parse(Cookies.get('admin_data'));
                // console.log("admin_data**************",admin_data);

                // if (admin_data[0].role.value == data.data[0]._id) {

                  // var new_admin_data = [{
                  //   _id:admin_data[0]._id,
                  //   name:admin_data[0].name,
                  //   mobile_no:admin_data[0].mobile_no,
                  //   role:admin_data[0].role,
                  //   designation:admin_data[0].designation,
                  //   socket_id:admin_data[0].socket_id,
                  //   for_app:admin_data[0].for_app,
                  //   for_app_type:admin_data[0].for_app_type,
                  //   is_relationship_manager:admin_data[0].is_relationship_manager,
                  //   monthly_salary:admin_data[0].monthly_salary,
                  //   relationship_manager:admin_data[0].relationship_manager,
                  //   telecaller_type:admin_data[0].telecaller_type,
                  //   suspend:admin_data[0].suspend,
                  //   suspend_message:admin_data[0].suspend_message,
                  //   users_array:admin_data[0].users_array,
                  //   access_control:data.data[0].access_control,
                  //  }]
                  //  console.log("new_admin_data*******************",new_admin_data);
                  //  Cookies.set( 'admin_data', new_admin_data);
                  //  const new_cookies_store_admin = JSON.parse(Cookies.get('admin_data'));
                  // Cookies.set( "user_management_view",new_cookies_store_admin[0].access_control.user_management_view),
                  // Cookies.set( "user_management_control",new_cookies_store_admin[0].access_control.user_management_control),
                  // Cookies.set( "admin_management_view",new_cookies_store_admin[0].access_control.admin_management_view),
                  // Cookies.set( "admin_management_control",new_cookies_store_admin[0].access_control.admin_management_control),
                  // Cookies.set( "agent_management_view",new_cookies_store_admin[0].access_control.agent_management_view),
                  // Cookies.set( "agent_management_control",new_cookies_store_admin[0].access_control.agent_management_control),
                  // Cookies.set( "support_management_view",new_cookies_store_admin[0].access_control.support_management_view),
                  // Cookies.set( "support_management_control",new_cookies_store_admin[0].access_control.support_management_control),
                  // Cookies.set( "sales_management_view",new_cookies_store_admin[0].access_control.sales_management_view),
                  // Cookies.set( "sales_management_control",new_cookies_store_admin[0].access_control.sales_management_control),
                  // Cookies.set( "policy_dock_view",new_cookies_store_admin[0].access_control.policy_dock_view),
                  // Cookies.set( "policy_dock_control",new_cookies_store_admin[0].access_control.policy_dock_control),
                  // Cookies.set( "opeartion_dock_view",new_cookies_store_admin[0].access_control.opeartion_dock_view),
                  // Cookies.set( "opeartion_dock_control",new_cookies_store_admin[0].access_control.opeartion_dock_control),
                  // Cookies.set( "deviation_dock_view",new_cookies_store_admin[0].access_control.deviation_dock_view),
                  // Cookies.set( "deviation_dock_control",new_cookies_store_admin[0].access_control.deviation_dock_control),
                  // Cookies.set( "reporting_view",new_cookies_store_admin[0].access_control.reporting_view),
                  // Cookies.set( "reporting_control",new_cookies_store_admin[0].access_control.reporting_control),
                  // Cookies.set( "accounting_view",new_cookies_store_admin[0].access_control.accounting_view),
                  // Cookies.set( "accounting_control",new_cookies_store_admin[0].access_control.accounting_control),
                  // Cookies.set( "cheque_report_view",new_cookies_store_admin[0].access_control.cheque_report_view),
                  // Cookies.set( "cheque_report_control",new_cookies_store_admin[0].access_control.cheque_report_control),
                  // Cookies.set( "pending_payment_view",new_cookies_store_admin[0].access_control.pending_payment_view),
                  // Cookies.set( "pending_payment_control",new_cookies_store_admin[0].access_control.pending_payment_control),
                  // Cookies.set( "time_tracker_view",new_cookies_store_admin[0].access_control.time_tracker_view),
                  // Cookies.set( "time_tracker_control",new_cookies_store_admin[0].access_control.time_tracker_control),
                  // Cookies.set( "customer_cheque_view",new_cookies_store_admin[0].access_control.customer_cheque_view),
                  // Cookies.set( "customer_cheque_control",new_cookies_store_admin[0].access_control.customer_cheque_control),
                  // Cookies.set( "master_view",new_cookies_store_admin[0].access_control.master_view),
                  // Cookies.set( "master_control",new_cookies_store_admin[0].access_control.master_control),
                  // Cookies.set( "endorsement_view",new_cookies_store_admin[0].access_control.endorsement_view),
                  // Cookies.set( "endorsement_control",new_cookies_store_admin[0].access_control.endorsement_control),

                  // Cookies.set( "contacts_view",new_cookies_store_admin[0].access_control.contacts_view),
                  // Cookies.set( "contacts_control",new_cookies_store_admin[0].access_control.contacts_control),
                  // Cookies.set( "campaign_view",new_cookies_store_admin[0].access_control.campaign_view),
                  // Cookies.set( "campaign_control",new_cookies_store_admin[0].access_control.campaign_control),

                  // Cookies.set( "operation_page",new_cookies_store_admin[0].access_control.operation_page)
                  // Cookies.set( "telecaller_app_page",new_cookies_store_admin[0].access_control.telecaller_app_page)
                  // Cookies.set( "payments_page",new_cookies_store_admin[0].access_control.payments_page)
                  // Cookies.set( "reports_page",new_cookies_store_admin[0].access_control.reports_page)
                  // Cookies.set( "accounting_page",new_cookies_store_admin[0].access_control.accounting_page)
                  // Cookies.set( "time_tracker_page",new_cookies_store_admin[0].access_control.time_tracker_page)
                  // Cookies.set( "employee_page",new_cookies_store_admin[0].access_control.employee_page)
                  // Cookies.set( "master_page",new_cookies_store_admin[0].access_control.master_page)
               }



              // }

            }
          else {
            this.setState({
              role_array_1: [],
              spinner_1: 'none'
             });
            // //console.log("fetch_emp wrong");
          }
        })
    }

    add_role = () => {

        const { addToast,settings } = this.props;
        this.setState({
          loading: true
        });


        if (this.state.policy_dock_view == false && this.state.deviation_dock_view == false && this.state.opeartion_dock_view == false  ) {
          var operation_page = false
        }else{
          var operation_page = this.state.operation_page
        }

        if (this.state.accounting_view == false && this.state.cheque_report_view == false && this.state.customer_cheque_view == false  ) {
          var accounting_page = false
        }else{
          var accounting_page = this.state.accounting_page
        }

        if (this.state.admin_management_view == false && this.state.agent_management_view == false) {
          var employee_page = false
        }else{
          var employee_page = this.state.employee_page
        }
        if (this.state.contacts_view == false && this.state.campaign_view == false && this.state.reference_user_view == false ) {
          var telecaller_app_page = false
        }else{
          var telecaller_app_page = this.state.telecaller_app_page
        }
        if (this.state.pending_payment_view == false  ) {
          var payments_page = false
        }else{
          var payments_page = this.state.payments_page
        }

        if (this.state.reporting_view == false  ) {
          var reports_page = false
        }else{
          var reports_page = this.state.reports_page
        }
        if (this.state.time_tracker_view == false  ) {
          var time_tracker_page = false
        }else{
          var time_tracker_page = this.state.time_tracker_page
        }
        if (this.state.master_view == false  ) {
          var master_page = false
        }else{
          var master_page = this.state.master_page
        }


        if (this.state.payroll_view == false && this.state.dashboard_payroll_view == false && this.state.attendance_view == false && this.state.leave_request_view == false && this.state.loans_view == false && this.state.allowance_view ) {
          var payroll_page = false
        }else{
          var payroll_page = this.state.payroll_page
        }

        var params = {
          role_name: this.state.role_name,
          access_control: {
            "user_management_view": this.state.user_management_view,
            "user_management_control": this.state.user_management_control,
            "admin_management_view": this.state.admin_management_view,
            "recuritement_view": this.state.recuritement_view,
            "recuritement_control":this.state.recuritement_control,
            "admin_management_control": this.state.admin_management_control,
            "agent_management_view":this.state.agent_management_view,
            "agent_management_control":this.state.agent_management_control,
            "support_management_view":this.state.support_management_view,
            "support_management_control":this.state.support_management_control,
            "sales_management_view":this.state.sales_management_view,
            "sales_management_control":this.state.sales_management_control,
            "opeartion_dock_view":this.state.opeartion_dock_view,
            "opeartion_dock_control":this.state.opeartion_dock_control,
            "deviation_dock_view":this.state.deviation_dock_view,
            "deviation_dock_control":this.state.deviation_dock_control,
            "policy_dock_view":this.state.policy_dock_view,
            "policy_dock_control":this.state.policy_dock_control,
            "reporting_view":this.state.reporting_view,
            "reporting_control":this.state.reporting_control,
            "accounting_view":this.state.accounting_view,
            "accounting_control":this.state.accounting_control,
            "cheque_report_view":this.state.cheque_report_view,
            "cheque_report_control":this.state.cheque_report_control,
            "pending_payment_view":this.state.pending_payment_view,
            "pending_payment_control":this.state.pending_payment_control,
            "time_tracker_view":this.state.time_tracker_view,
            "time_tracker_control":this.state.time_tracker_control,
            "customer_cheque_view":this.state.customer_cheque_view,
            "customer_cheque_control":this.state.customer_cheque_control,
            "endorsement_view":this.state.endorsement_view,
            "endorsement_control":this.state.endorsement_control,
            "master_view": this.state.master_view,
            "master_control": this.state.master_control,


            "contacts_view": this.state.contacts_view,
            "contacts_control": this.state.contacts_control,
            "reference_user_view" : this.state.reference_user_view,
            "reference_user_control" : this.state.reference_user_control,
            "campaign_view": this.state.campaign_view,
            "campaign_control": this.state.campaign_control,
            "dashboard_app_view": this.state.dashboard_app_view,
            "dashboard_app_control": this.state.dashboard_app_control,


            "payroll_view": this.state.payroll_view,
            "payroll_control": this.state.payroll_control,
            "dashboard_payroll_view": this.state.dashboard_payroll_view,
            "dashboard_payroll_control": this.state.dashboard_payroll_control,
            "attendance_view": this.state.attendance_view,
            "attendance_control": this.state.attendance_control,
            "allowance_view": this.state.allowance_view,
            "allowance_control": this.state.allowance_control,
            "genral_report_view": this.state.genral_report_view,
            "genral_report_control": this.state.genral_report_control,
            "leave_request_view": this.state.leave_request_view,
            "leave_request_control": this.state.leave_request_control,
            "loans_view": this.state.loans_view,
            "loans_control": this.state.loans_control,

            "operation_page": operation_page,
            "telecaller_app_page": telecaller_app_page,
            "payments_page": payments_page,
            "reports_page": reports_page,
            "accounting_page": accounting_page,
            "time_tracker_page": time_tracker_page,
            "employee_page": employee_page,
            "master_page": master_page,
            "payroll_page": payroll_page,
          }
        }
        console.log("eeeeeeeeeeeeeeeeee", params);
        if (params.role_name == "" || params.role_name == undefined ) {
          this.setState({
            error_message: "Please Enter Role Name",
            loading: false,
            borderNew:true
          })
        } else {
          // //console.log("add_admin_role", params);
          const res = fetch(settings.api_url + "add_admin_role", {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            }
          }).then((response) => response.json())
            .then(json => {
              // //console.log("Add Role **************************************", { params: params, response: json })
              var data = json;
              if (data.status == true) {
                this.setState((prevState) => ({
                  modalOpen: false,
                  heading_admin:"Add Admin Role",
                  button_admin:"Save",
                  user_management_view:false,
                  user_management_control:false,
                  admin_management_view:false,
                  admin_management_control:false,
                  recuritement_view:false,
                  recuritement_control:false,
                  agent_management_view:false,
                  agent_management_control:false,
                  support_management_view:false,
                  support_management_control:false,
                  sales_management_view:false,
                  sales_management_control:false,
                  opeartion_dock_view:false,
                  opeartion_dock_control:false,
                  deviation_dock_view:false,
                  deviation_dock_control:false,
                  policy_dock_view:false,
                  policy_dock_control:false,
                  reporting_view:false,
                  reporting_control:false,
                  accounting_view:false,
                  accounting_control:false,
                  cheque_report_view:false,
                  cheque_report_control:false,
                  pending_payment_view:false,
                  pending_payment_control:false,
                  time_tracker_view:false,
                  time_tracker_control:false,
                  customer_cheque_view:false,
                  customer_cheque_control:false,
                  endorsement_view:false,
                  endorsement_control:false,
                  master_view:false,
                  master_control:false,


                  operation_page:false,
                  telecaller_app_page:false,
                  payments_page:false,
                  reports_page:false,
                  accounting_page:false,
                  time_tracker_page:false,
                  employee_page:false,
                  master_page:false,
                  payroll_page:false,


                  loading: false,
                  error_message:"",
                  role_name:"",

                }));
                this.fetch_admin_role();
                addToast({
                  title: 'Ask My Policy',
                  content: data["message"],
                  duration: 1000,
                });
              }
              else {
                this.setState({
                  modalOpen: !this.state.modalOpen,
                  loading: false
                });
                addToast({
                  title: 'Ask My Policy',
                  content: data["message"],
                  duration: 3000,
                });
                // //console.log("something wrong");
              }
            })
        }

      }

      for_edit(x){
          // //console.log("kkkkkk",x);
          this.setState({
            heading_admin:"Update Admin Role",
            button_admin:"Update",
            role_name:x.role_name,
            role_id:x._id,
            user_management_view:x.access_control.user_management_view,
            user_management_control:x.access_control.user_management_control,
            admin_management_view:x.access_control.admin_management_view,
            admin_management_control:x.access_control.admin_management_control,
            recuritement_view:x.access_control.recuritement_view,
            recuritement_control:x.access_control.recuritement_control,
            agent_management_view:x.access_control.agent_management_view,
            agent_management_control:x.access_control.agent_management_control,
            support_management_view:x.access_control.support_management_view,
            support_management_control:x.access_control.support_management_control,
            sales_management_view:x.access_control.sales_management_view,
            sales_management_control:x.access_control.sales_management_control,
            opeartion_dock_view:x.access_control.opeartion_dock_view,
            opeartion_dock_control:x.access_control.opeartion_dock_control,
            deviation_dock_view:x.access_control.deviation_dock_view,
            deviation_dock_control:x.access_control.deviation_dock_control,
            policy_dock_view:x.access_control.policy_dock_view,
            policy_dock_control:x.access_control.policy_dock_control,
            reporting_view:x.access_control.reporting_view,
            reporting_control:x.access_control.reporting_control,
            accounting_view:x.access_control.accounting_view,
            accounting_control:x.access_control.accounting_control,
            cheque_report_view:x.access_control.cheque_report_view,
            cheque_report_control:x.access_control.cheque_report_control,
            pending_payment_view:x.access_control.pending_payment_view,
            pending_payment_control:x.access_control.pending_payment_control,
            time_tracker_view:x.access_control.time_tracker_view,
            time_tracker_control:x.access_control.time_tracker_control,
            customer_cheque_view:x.access_control.customer_cheque_view,
            customer_cheque_control:x.access_control.customer_cheque_control,
            endorsement_view:x.access_control.endorsement_view,
            endorsement_control:x.access_control.endorsement_control,
            master_view: x.access_control.master_view,
            master_control:x.access_control.master_control,

            contacts_view:x.access_control.contacts_view,
            contacts_control:x.access_control.contacts_control,
            reference_user_view:x.access_control.reference_user_view,
            reference_user_control:x.access_control.reference_user_control,
            campaign_view:x.access_control.campaign_view,
            campaign_control:x.access_control.campaign_control,
            dashboard_app_view:x.access_control.dashboard_app_view,
            dashboard_app_control:x.access_control.dashboard_app_control,

            payroll_view:x.access_control.payroll_view,
            payroll_control:x.access_control.payroll_control,
            dashboard_payroll_view:x.access_control.dashboard_payroll_view,
            dashboard_payroll_control:x.access_control.dashboard_payroll_control,
            attendance_view:x.access_control.attendance_view,
            attendance_control:x.access_control.attendance_control,
            allowance_view:x.access_control.allowance_view,
            allowance_control:x.access_control.allowance_control,
            genral_report_view:x.access_control.genral_report_view,
            genral_report_control:x.access_control.genral_report_control,
            leave_request_view:x.access_control.leave_request_view,
            leave_request_control:x.access_control.leave_request_control,
            loans_view:x.access_control.loans_view,
            loans_control:x.access_control.loans_control,

            operation_page:x.access_control.operation_page,
            telecaller_app_page:x.access_control.telecaller_app_page,
            payments_page:x.access_control.payments_page,
            reports_page:x.access_control.reports_page,
            accounting_page:x.access_control.accounting_page,
            time_tracker_page:x.access_control.time_tracker_page,
            employee_page:x.access_control.employee_page,
            master_page:x.access_control.master_page,
            payroll_page:x.access_control.payroll_page,
            loading:false
          })
      }

      switch_function = ()=>{
          if (this.state.button_admin=="Save") {
            this.add_role()
          }
        else{
            this.edit_role()
        }
      }


      edit_role = () => {
        const { addToast,settings } = this.props;
        this.setState({
          loading: true
        });

        if (this.state.policy_dock_view == false && this.state.deviation_dock_view == false && this.state.opeartion_dock_view == false  ) {
          var operation_page = false
        }else{
          var operation_page = this.state.operation_page
        }

        if (this.state.accounting_view == false && this.state.cheque_report_view == false && this.state.customer_cheque_view == false  ) {
          var accounting_page = false
        }else{
          var accounting_page = this.state.accounting_page
        }

        if (this.state.admin_management_view == false && this.state.agent_management_view == false) {
          var employee_page = false
        }else{
          var employee_page = this.state.employee_page
        }
        if (this.state.contacts_view == false && this.state.campaign_view == false && this.state.reference_user_view == false ) {
          var telecaller_app_page = false
        }else{
          var telecaller_app_page = this.state.telecaller_app_page
        }
        if (this.state.pending_payment_view == false  ) {
          var payments_page = false
        }else{
          var payments_page = this.state.payments_page
        }

        if (this.state.reporting_view == false  ) {
          var reports_page = false
        }else{
          var reports_page = this.state.reports_page
        }
        if (this.state.time_tracker_view == false  ) {
          var time_tracker_page = false
        }else{
          var time_tracker_page = this.state.time_tracker_page
        }
        if (this.state.master_view == false  ) {
          var master_page = false
        }else{
          var master_page = this.state.master_page
        }

        if (this.state.payroll_view == false && this.state.dashboard_payroll_view == false && this.state.attendance_view==false && this.state.leave_request_view==false && this.state.loans_view == false && this.state.allowance_view) {
          var payroll_page = false
        }else{
          var payroll_page = this.state.payroll_page
        }

        var params = {
          role_id:this.state.role_id,
          role_name: this.state.role_name,
          access_control: {
            "user_management_view": this.state.user_management_view,
            "user_management_control": this.state.user_management_control,
            "admin_management_view": this.state.admin_management_view,
            "admin_management_control": this.state.admin_management_control,
            "recuritement_view": this.state.recuritement_view,
            "recuritement_control": this.state.recuritement_control,
            "agent_management_view":this.state.agent_management_view,
            "agent_management_control":this.state.agent_management_control,
            "support_management_view":this.state.support_management_view,
            "support_management_control":this.state.support_management_control,
            "sales_management_view":this.state.sales_management_view,
            "sales_management_control":this.state.sales_management_control,
            "opeartion_dock_view":this.state.opeartion_dock_view,
            "opeartion_dock_control":this.state.opeartion_dock_control,
            "deviation_dock_view":this.state.deviation_dock_view,
            "deviation_dock_control":this.state.deviation_dock_control,
            "policy_dock_view":this.state.policy_dock_view,
            "policy_dock_control":this.state.policy_dock_control,
            "reporting_view":this.state.reporting_view,
            "reporting_control":this.state.reporting_control,
            "accounting_view":this.state.accounting_view,
            "accounting_control":this.state.accounting_control,
            "cheque_report_view":this.state.cheque_report_view,
            "cheque_report_control":this.state.cheque_report_control,
            "pending_payment_view":this.state.pending_payment_view,
            "pending_payment_control":this.state.pending_payment_control,
            "time_tracker_view":this.state.time_tracker_view,
            "time_tracker_control":this.state.time_tracker_control,
            "customer_cheque_view":this.state.customer_cheque_view,
            "customer_cheque_control":this.state.customer_cheque_control,
            "endorsement_view":this.state.endorsement_view,
            "endorsement_control":this.state.endorsement_control,
            "master_view": this.state.master_view,
            "master_control": this.state.master_control,

            "contacts_view": this.state.contacts_view,
            "contacts_control": this.state.contacts_control,
            "reference_user_view" : this.state.reference_user_view,
            "reference_user_control" : this.state.reference_user_control,
            "campaign_view": this.state.campaign_view,
            "campaign_control": this.state.campaign_control,
            "dashboard_app_view": this.state.dashboard_app_view,
            "dashboard_app_control": this.state.dashboard_app_control,

            "payroll_view": this.state.payroll_view,
            "payroll_control": this.state.payroll_control,
            "dashboard_payroll_view": this.state.dashboard_payroll_view,
            "dashboard_payroll_control": this.state.dashboard_payroll_control,
            "attendance_view": this.state.attendance_view,
            "attendance_control": this.state.attendance_control,
            "allowance_view": this.state.allowance_view,
            "allowance_control": this.state.allowance_control,
            "genral_report_view": this.state.genral_report_view,
            "genral_report_control": this.state.genral_report_control,
            "leave_request_view": this.state.leave_request_view,
            "leave_request_control": this.state.leave_request_control,
            "loans_view": this.state.loans_view,
            "loans_control": this.state.loans_control,


            "operation_page": operation_page,
            "telecaller_app_page": telecaller_app_page,
            "payments_page": payments_page,
            "reports_page": reports_page,
            "accounting_page": accounting_page,
            "time_tracker_page": time_tracker_page,
            "employee_page": employee_page,
            "master_page": master_page,
            "payroll_page": payroll_page,
          }
        }
        console.log("Edittt", params);
        if (params.role_name == "" || params.role_name == undefined ) {
          this.setState({
            error_message: "Please Enter Role Name",
            loading: false,
            borderNew:true,
          })
        } else {
          const res = fetch(settings.api_url + "edit_admin_role", {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            }
          }).then((response) => response.json())
            .then(json => {
              // //console.log("Edit Role **************************************", { params: params, response: json })
              var data = json;
              if (data.status == true) {
                this.setState((prevState) => ({
                  modalOpen: false,
                  heading_admin:"Add Admin Role",
                  button_admin:"Save",
                  user_management_view:false,
                  user_management_control:false,
                  admin_management_view:false,
                  admin_management_control:false,
                  recuritement_view:false,
                  recuritement_control:false,
                  agent_management_view:false,
                  agent_management_control:false,
                  support_management_view:false,
                  support_management_control:false,
                  sales_management_view:false,
                  sales_management_control:false,
                  opeartion_dock_view:false,
                  opeartion_dock_control:false,
                  deviation_dock_view:false,
                  deviation_dock_control:false,
                  policy_dock_view:false,
                  policy_dock_control:false,
                  reporting_view:false,
                  reporting_control:false,
                  accounting_view:false,
                  accounting_control:false,
                  cheque_report_view:false,
                  cheque_report_control:false,
                  pending_payment_view:false,
                  pending_payment_control:false,
                  time_tracker_view:false,
                  time_tracker_control:false,
                  customer_cheque_view:false,
                  customer_cheque_control:false,
                  endorsement_view:false,
                  endorsement_control:false,
                  master_view:false,
                  master_control:false,

                  contacts_view:false,
                  contacts_control:false,
                  reference_user_view:false,
                  reference_user_control:false,
                  campaign_view:false,
                  campaign_control:false,
                  dashboard_app_view:false,
                  dashboard_app_control:false,

                  payroll_view:false,
                  payroll_control:false,
                  dashboard_payroll_view:false,
                  dashboard_payroll_control:false,
                  attendance_view:false,
                  attendance_control:false,
                  allowance_view:false,
                  allowance_control:false,
                  genral_report_view:false,
                  genral_report_control:false,

                  leave_request_view:false,
                  leave_request_control:false,
                  loans_view:false,
                  loans_control:false,

                  operation_page:false,
                  telecaller_app_page:false,
                  payments_page:false,
                  reports_page:false,
                  accounting_page:false,
                  time_tracker_page:false,
                  employee_page:false,
                  master_page:false,
                  payroll_page:false,

                  loading: false,
                  error_message:"",
                  role_name:"",
                  borderNew:false

                }));
                this.fetch_single_admin_role(this.state.role_id);
                // this.fetch_admin_role();
                addToast({
                  title: 'Ask My Policy',
                  content: data["message"],
                  duration: 1000,
                });
              }
              else {
                this.setState({
                  modalOpen: !this.state.modalOpen,
                  loading: false
                });
                addToast({
                  title: 'Ask My Policy',
                  content: data["message"],
                  duration: 3000,
                });
                // //console.log("something wrong");
              }
            })
        }

      }

      delete_emp = (id) => {
         const { settings, addToast, } = this.props;
         this.setState({
          loading:true
         })
         var params = {
           role_id: id
         }
        //  //console.log("delete_role", params);
         const res = fetch(settings.api_url + "delete_admin_role", {
           method: 'POST',
           body: JSON.stringify(params),
           headers: {
             "Content-type": "application/json; charset=UTF-8",
           }
         }).then((response) => response.json())
           .then(json => {
            //  //console.log("Delete Role Response**************************************", { params: params, response: json })
             var data = json;
             if (data.status == true) {
               this.setState((prevState) => ({
                 AlertDelete: !prevState.AlertDelete,
                 loading:false
               }));
               this.fetch_admin_role();
               addToast({
                 title: 'Dreamland',
                 content: data["message"],
                 // time: new Date(),
                 duration: 1000,
               });
             }
             else {
              this.setState((prevState) => ({
                AlertDelete: !prevState.AlertDelete,
                loading:false
              }));
              //  //console.log("something wrong");
             }
           })
       }


    render() {
      const { settings } = this.props;
        return (
            <Fragment>
              <PageTitle className="admin_title">
                  <div style={{width:"100%",display:"inline-flex"}}>
                    <h1 className="toppp_neeee" style={{marginTop:"0px"}}>Admin Role</h1>
                    <Button id="add_role" className="toppp_neeee" color="warning" disabled={this.state.master_control_12 =="false" ? 'disabled' : ''} style={{backgroundColor:"#007bff" ,borderColor:"#007bff",color:"#fff",textTransform:"capitalize",marginLeft:"auto"}} onClick={ this.toggle }>Add Role</Button>
                    </div>
                </PageTitle>

                <Spinner color="warning" className="spinner_css_12345" style={{marginTop:gk,display: this.state.isLoading}}/>
                <div className="row top_roqwww" style={{display: this.state.isLoading=="none" ? "flex" :"none"}}>
                        <div className="col-lg-3 col-md-12 col-sm-12 top_col_3">
                            <div className="height_13 mycalendar" style={{height:my_height-68,display: this.state.ipad_emp_list}}>
                            <Table striped className="purchase_table">
                            <thead>
                              <tr>
                                <th scope="col" className="purchase_heading" style={{ border: "none", whiteSpace: "nowrap",padding:"10px 25px" }}>Role Name</th>
                               </tr>
                            </thead>
                            <tbody>
                              {
                                this.state.role_array.map((value12, index12) => {
                                  return (
                                    <tr style={{ cursor: 'pointer' }} key={index12} onClick={() => {
                                      this.setState({

                                        spinner_1: 'block'
                                      })
                                      setTimeout(() => {
                                        this.fetch_single_admin_role(value12._id)
                                      }, 0)
                                    }}
                                    >
                                      <td className="strip_paded admin_role_name"  style={{ borderLeft: value12._id == this.state.role_id ? "5px solid  #007bff" : " 0px", verticalAlign: "middle",padding:"10px 25px" }} >{value12.role_name}</td>
                                     </tr>
                                  )
                                })
                              }

                            </tbody>
                          </Table>
                           </div>
                        </div>
                        <div className="col-lg-9 col-md-12 col-sm-12 admin_ledttt" style={{display: device_width < 769 ? this.state.ipad_width : "block"}}>
                        <Spinner color="warning" className="employee_spinner_1" style={{ marginTop: gk, display: this.state.spinner_1 }} />
                        <div className="mycalendar" style={{display:this.state.spinner_1=="none" ? "block":"none",height:my_height-68}}>

                            {this.state.role_array_1.map((value,index12)=>{
                                return(
                             <div key={index12} style={{marginTop: "22px"}}>
                              <div style={{display:"inline-flex",width:"100%"}}>
                                <h2 style={{whiteSpace:"nowrap"}}>{value.role_name}</h2>
                                <div className="side_role">
                                <Button
                                       disabled={this.state.master_control_12 == "false" ? 'disabled' : ''}
                                       id="edit_admin_role"
                                       className="btn-hover-outline"
                                       color="success"
                                       style={{marginRight:'10px',padding: '5px 12px',textTransform:"capitalize",justifyContent:'center',textAlign:'center' }}
                                           onClick={() => {
                                             this.setState((prevState) => ({
                                                   modalOpen: !prevState.modalOpen,
                                                   }))
                                               this.for_edit(value)
                                              //  //console.log("value", value);
                                           }}
                                   >
                                   Update
                                   </Button>
                                   <Button
                                       disabled={this.state.master_control_12 == "false" ? 'disabled' : ''}
                                       className="btn-hover-outline"
                                       color="danger"
                                       id="delete_admin_role"
                                       style={{verticalAlign:"middle",padding: '5px 6px',textTransform:"capitalize",justifyContent:'center',textAlign:'center'}}
                                       onClick={()=>{
                                           this.setState({
                                               AlertDelete:true,
                                               role_id:value._id
                                           })
                                       }}
                                   >
                                   Delete
                                   </Button>

                                   <Button className="my_new_nnnn" style={{ marginLeft: "5px", height: '28px', backgroundColor: '#007bff', borderColor: '#007bff',textTransform:"capitalize", display: device_width < 769 ? "inline-flex" : "none",paddingTop: "5px"}}
                                    onClick={() => {
                                    this.setState({
                                        ipad_emp_list:"block",
                                        ipad_width:"none"
                                    })
                                    }}>Back</Button>
                                    </div>
                                </div>
                             <h3>Access Control</h3>
                            <div className="row" style={{ marginBottom: "15px" }}>
                            {/* <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                              <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>User Management</div>:
                              <span style={{ marginLeft: "23px" }} className="displayIconInline">
                              <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                    <CustomInput
                                     checked={value.access_control.user_management_view}
                                     type="checkbox"
                                     disabled
                                     id={26}
                                     /></div>View</div>
                                   <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}>
                                     <CustomInput
                                      checked={value.access_control.user_management_control}
                                     type="checkbox"
                                     disabled
                                     id={25}
                                     /></div>Operate</div>
                              </span>
                            </div> */}

                            {/* admin_mmmm */}


                              {/* POLICY DOCK */}

                              <div className="col-lg-6 col-md-12 col-sm-12">
                                <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex",marginBottom:"5px" }}>
                                      <div className="mobile desi page_module_new" style={{whiteSpace: "nowrap" ,width: "160px"}}>Operations</div>:
                                      <span style={{ marginLeft: "23px" }} className="displayIconInline">
                                      <div className="forSmallDevices2 new_page_module">
                                        <div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                            checked={value.access_control.operation_page == true ? true : false}
                                            type="checkbox"
                                            disabled
                                            id={"operation122" + index12}/>
                                            </div>
                                        </div>
                                      </span>
                                    </div>



                                <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                                  <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Operation Dock</div>:
                                  <span style={{ marginLeft: "23px" }} className="displayIconInline">
                                  <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                        <CustomInput
                                        checked={value.access_control.policy_dock_view == true ? true : false}
                                        type="checkbox"
                                        disabled
                                        id={96333}
                                        /></div>View</div>
                                      <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}>
                                        <CustomInput
                                          checked={value.access_control.policy_dock_control== true ? true : false }
                                        type="checkbox"
                                        disabled
                                        id={985633}
                                        /></div>Operate</div>
                                  </span>
                                </div>


                                            {/* DEviation DOCK */}

                                            <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                              <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Deviation Dock</div>:
                              <span style={{ marginLeft: "23px" }} className="displayIconInline">
                              <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                    <CustomInput
                                     checked={value.access_control.deviation_dock_view == true ? true : false}
                                     type="checkbox"
                                     disabled
                                     id={9874}
                                     /></div>View</div>
                                   <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}>
                                     <CustomInput
                                      checked={value.access_control.deviation_dock_control == true ? true : false}
                                     type="checkbox"
                                     disabled
                                     id={5632}
                                     /></div>Operate</div>
                              </span>
                            </div>



                             {/* Opration DOCK */}

                             <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                              <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>MIS Dock</div>:
                              {/* <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Operation Dock</div>: */}
                              <span style={{ marginLeft: "23px" }} className="displayIconInline">
                              <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                    <CustomInput
                                     checked={value.access_control.opeartion_dock_view == true ? true : false}
                                     type="checkbox"
                                     disabled
                                     id={316166}
                                     /></div>View</div>
                                   <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}>
                                     <CustomInput
                                      checked={value.access_control.opeartion_dock_control == true ? true : false}
                                     type="checkbox"
                                     disabled
                                     id={3151899}
                                     /></div>Operate</div>
                              </span>
                            </div>
                                </div>
                             </div>


                                  {/* Accounting Page */}
                                  <div className="col-lg-6 col-md-12 col-sm-12">
                                <div className="row mobile_data">
                                <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex",marginBottom:"5px" }}>
                                      <div className="mobile desi page_module_new" style={{whiteSpace: "nowrap" ,width: "160px"}}>Accounts</div>:
                                      <span style={{ marginLeft: "23px" }} className="displayIconInline">
                                      <div className="forSmallDevices2 new_page_module">
                                        <div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                            checked={value.access_control.accounting_page == true ? true : false}
                                            type="checkbox"
                                            disabled
                                            id={"accounting_page122"}/>
                                            </div>
                                        </div>
                                      </span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                                        <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Accounting</div>:
                                        <span style={{ marginLeft: "23px" }} className="displayIconInline">
                                        <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                              <CustomInput
                                              checked={value.access_control.accounting_view == true ? true : false}
                                              type="checkbox"
                                              disabled
                                              id={852}
                                              /></div>View</div>
                                            <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}>
                                              <CustomInput
                                                checked={value.access_control.accounting_control == true ? true : false}
                                              type="checkbox"
                                              disabled
                                              id={9856}
                                              /></div>Operate</div>
                                        </span>
                                      </div>


                                  {/* Cheque Report Page */}

                                        <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                                          <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Cheque Reporting</div>:
                                          <span style={{ marginLeft: "23px" }} className="displayIconInline">
                                          <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                                <CustomInput
                                                checked={value.access_control.cheque_report_view == true ? true : false}
                                                type="checkbox"
                                                disabled
                                                id={9158}
                                                /></div>View</div>
                                              <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}>
                                                <CustomInput
                                                  checked={value.access_control.cheque_report_control == true ? true : false}
                                                type="checkbox"
                                                disabled
                                                id={5287}
                                                /></div>Operate</div>
                                          </span>
                                        </div>


                                      {/* Time Tracker Page */}

                                      <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                                        <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Customer Cheque</div>:
                                        <span style={{ marginLeft: "23px" }} className="displayIconInline">
                                        <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                              <CustomInput
                                              checked={value.access_control.customer_cheque_view == true ? true : false}
                                              type="checkbox"
                                              disabled
                                              id={658987}
                                              /></div>View</div>
                                            <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}>
                                              <CustomInput
                                                checked={value.access_control.customer_cheque_control == true ? true : false}
                                              type="checkbox"
                                              disabled
                                              id={1749956}
                                              /></div>Operate</div>
                                        </span>
                                      </div>
                            </div>
                            </div>

                            {/* Pending Payemnt DOCK */}
                            <div className="col-lg-6 col-md-12 col-sm-12">
                                <div className="row top_neww mobile_data">
                                <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex",marginBottom:"5px" }}>
                                      <div className="mobile desi page_module_new" style={{whiteSpace: "nowrap" ,width: "160px"}}>Payments</div>:
                                      <span style={{ marginLeft: "23px" }} className="displayIconInline">
                                      <div className="forSmallDevices2 new_page_module">
                                        <div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                            checked={value.access_control.payments_page == true ? true : false}
                                            type="checkbox"
                                            disabled
                                            id={"Payments122"}/>
                                            </div>
                                        </div>
                                      </span>
                                    </div>
                            <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                              <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Payments</div>:
                              <span style={{ marginLeft: "23px" }} className="displayIconInline">
                              <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                    <CustomInput
                                     checked={value.access_control.pending_payment_view == true ? true : false}
                                     type="checkbox"
                                     disabled
                                     id={1456}
                                     /></div>View</div>
                                   <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}>
                                     <CustomInput
                                      checked={value.access_control.pending_payment_control == true ? true : false}
                                     type="checkbox"
                                     disabled
                                     id={6541}
                                     /></div>Operate</div>
                              </span>
                            </div>
                            </div>
                            </div>

                             {/* Reporting DOCK */}
                             <div className="col-lg-6 col-md-12 col-sm-12">
                                <div className="row top_neww mobile_data">
                                <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex",marginBottom:"5px" }}>
                                      <div className="mobile desi page_module_new" style={{whiteSpace: "nowrap" ,width: "160px"}}>Reports</div>:
                                      <span style={{ marginLeft: "23px" }} className="displayIconInline">
                                      <div className="forSmallDevices2 new_page_module">
                                        <div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                            checked={value.access_control.reports_page == true ? true : false}
                                            type="checkbox"
                                            disabled
                                            id={"Reportsn122"}/>
                                            </div>
                                        </div>
                                      </span>
                                    </div>
                             <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                              <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Reports</div>:
                              <span style={{ marginLeft: "23px" }} className="displayIconInline">
                              <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                    <CustomInput
                                     checked={value.access_control.reporting_view == true ? true : false}
                                     type="checkbox"
                                     disabled
                                     id={96547}
                                     /></div>View</div>
                                   <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}>
                                     <CustomInput
                                      checked={value.access_control.reporting_control == true ? true : false}
                                     type="checkbox"
                                     disabled
                                     id={9430}
                                     /></div>Operate</div>
                              </span>
                            </div>
                            </div>
                            </div>





                             {/* Time Tracker Page */}
                             <div className="col-lg-6 col-md-12 col-sm-12">
                                <div className="row top_neww mobile_data">
                                <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex",marginBottom:"5px" }}>
                                      <div className="mobile desi page_module_new" style={{whiteSpace: "nowrap" ,width: "160px"}}>Time Tracker</div>:
                                      <span style={{ marginLeft: "23px" }} className="displayIconInline">
                                      <div className="forSmallDevices2 new_page_module">
                                        <div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                            checked={value.access_control.time_tracker_page == true ? true : false}
                                            type="checkbox"
                                            disabled
                                            id={"time_trac122"}/>
                                            </div>
                                        </div>
                                      </span>
                                    </div>
                             <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                              <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Time Tracker</div>:
                              <span style={{ marginLeft: "23px" }} className="displayIconInline" >
                              <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                    <CustomInput
                                     checked={value.access_control.time_tracker_view == true ? true : false}
                                     type="checkbox"
                                     disabled
                                     id={65987}
                                     /></div>View</div>
                                   <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}>
                                     <CustomInput
                                      checked={value.access_control.time_tracker_control == true ? true : false}
                                     type="checkbox"
                                     disabled
                                     id={7456}
                                     /></div>Operate</div>
                              </span>
                            </div>
                           </div>
                          </div>

                            {/* master_access */}

                            <div className="col-lg-6 col-md-12 col-sm-12">
                                <div className="row top_neww mobile_data">
                                <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex",marginBottom:"5px" }}>
                                      <div className="mobile desi page_module_new" style={{whiteSpace: "nowrap" ,width: "160px"}}>Masters</div>:
                                      <span style={{ marginLeft: "23px" }} className="displayIconInline">
                                      <div className="forSmallDevices2 new_page_module">
                                        <div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                            checked={value.access_control.master_page == true ? true : false}
                                            type="checkbox"
                                            disabled
                                            id={"master122"}/>
                                            </div>
                                        </div>
                                      </span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                                      <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Master</div>:
                                      <span style={{ marginLeft: "23px" }} className="displayIconInline">
                                      <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                            checked={value.access_control.master_view == true ? true : false}
                                            type="checkbox"
                                            disabled
                                            id={261}
                                            /></div>View</div>
                                          <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}>
                                            <CustomInput
                                              checked={value.access_control.master_control == true ? true : false}
                                            type="checkbox"
                                            disabled
                                            id={251}
                                            /></div>Operate</div>
                                      </span>
                                    </div>
                                </div>
                            </div>

      {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  Employees  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */}


            <div className="col-lg-6 col-md-12 col-sm-12">
                                <div className="row top_neww mobile_data">
                                <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex",marginBottom:"5px" }}>
                                      <div className="mobile desi page_module_new" style={{whiteSpace: "nowrap" ,width: "160px"}}>HRM</div>:
                                      <span style={{ marginLeft: "23px" }} className="displayIconInline">
                                      <div className="forSmallDevices2 new_page_module">
                                        <div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                            checked={value.access_control.employee_page == true ? true : false}
                                            type="checkbox"
                                            disabled
                                            id={"employeee122"}/>
                                            </div>
                                        </div>
                                      </span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                                      <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Recuritment</div>:
                                      <span style={{ marginLeft: "23px" }} className="displayIconInline">
                                      <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                            checked={value.access_control.recuritement_view == true ? true : false}
                                            type="checkbox"
                                            disabled
                                            id={"recuritement_view26"}
                                            /></div>View</div>
                                          <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}>
                                            <CustomInput
                                              checked={value.access_control.recuritement_control == true ? true : false}
                                            type="checkbox"
                                            disabled
                                            id={"recuritement_operate25"}
                                            /></div>Operate</div>
                                      </span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                                      <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Employee Management</div>:
                                      <span style={{ marginLeft: "23px" }} className="displayIconInline">
                                      <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                            checked={value.access_control.admin_management_view == true ? true : false}
                                            type="checkbox"
                                            disabled
                                            id={26}
                                            /></div>View</div>
                                          <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}>
                                            <CustomInput
                                              checked={value.access_control.admin_management_control == true ? true : false}
                                            type="checkbox"
                                            disabled
                                            id={25}
                                            /></div>Operate</div>
                                      </span>
                                    </div>


                                    {/* agent_management */}

                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                                      <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Agencies/Telesales</div>:
                                      <span style={{ marginLeft: "23px" }} className="displayIconInline">
                                      <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                            checked={value.access_control.agent_management_view == true ? true : false}
                                            type="checkbox"
                                            disabled
                                            id={36}
                                            /></div>View</div>
                                          <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}>
                                            <CustomInput
                                              checked={value.access_control.agent_management_control == true ? true : false}
                                            type="checkbox"
                                            disabled
                                            id={35}
                                            /></div>Operate</div>
                                      </span>
                                    </div>
                                </div>
                            </div>



                            {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  Telecaller App ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */}

                            <div className="col-lg-6 col-md-12 col-sm-12">
                                <div className="row top_neww mobile_data">
                                <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex",marginBottom:"5px" }}>
                                      <div className="mobile desi page_module_new" style={{whiteSpace: "nowrap" ,width: "160px"}}>Telecalling</div>:
                                      <span style={{ marginLeft: "23px" }} className="displayIconInline">
                                      <div className="forSmallDevices2 new_page_module">
                                        <div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                            checked={value.access_control.telecaller_app_page == true ? true : false}
                                            type="checkbox"
                                            disabled
                                            id={"Telecalleree122"}/>
                                            </div>
                                        </div>
                                      </span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                                      <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Dashboard</div>:
                                      <span style={{ marginLeft: "23px" }} className="displayIconInline">
                                      <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                            checked={value.access_control.dashboard_app_view == true ? true : false}
                                            type="checkbox"
                                            disabled
                                            id={"dashboard1233"}
                                            /></div>View</div>
                                          <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}>
                                            <CustomInput
                                              checked={value.access_control.dashboard_app_control == true ? true : false}
                                            type="checkbox"
                                            disabled
                                            id={"dashboard_controllll"}
                                            /></div>Operate</div>
                                      </span>
                                    </div>


                                    {/* agent_management */}

                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                                      <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Campaign</div>:
                                      <span style={{ marginLeft: "23px" }} className="displayIconInline">
                                      <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                            checked={value.access_control.campaign_view == true ? true : false}
                                            type="checkbox"
                                            disabled
                                            id={"Campaign_vieww3344"}
                                            /></div>View</div>
                                          <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}>
                                            <CustomInput
                                              checked={value.access_control.campaign_control == true ? true : false}
                                            type="checkbox"
                                            disabled
                                            id={"Campaign89999"}
                                            /></div>Operate</div>
                                      </span>
                                    </div>


                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                                      <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Contacts</div>:
                                      <span style={{ marginLeft: "23px" }} className="displayIconInline">
                                      <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                            checked={value.access_control.contacts_view == true ? true : false}
                                            type="checkbox"
                                            disabled
                                            id={"Contacts1233"}
                                            /></div>View</div>
                                          <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}>
                                            <CustomInput
                                              checked={value.access_control.contacts_control == true ? true : false}
                                            type="checkbox"
                                            disabled
                                            id={"Contacts_controllll"}
                                            /></div>Operate</div>
                                      </span>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                                      <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Reference User</div>:
                                      <span style={{ marginLeft: "23px" }} className="displayIconInline">
                                      <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                            checked={value.access_control.reference_user_view == true ? true : false}
                                            type="checkbox"
                                            disabled
                                            id={"Reference1233"}
                                            /></div>View</div>
                                          <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}>
                                            <CustomInput
                                              checked={value.access_control.reference_user_control == true ? true : false}
                                            type="checkbox"
                                            disabled
                                            id={"Reference_controllll"}
                                            /></div>Operate</div>
                                      </span>
                                    </div>

                                </div>
                            </div>

    {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  PayRoll  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */}

                             <div className="col-lg-6 col-md-12 col-sm-12">
                                <div className="row top_neww mobile_data">
                                <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex",marginBottom:"5px" }}>
                                      <div className="mobile desi page_module_new" style={{whiteSpace: "nowrap" ,width: "160px"}}>Payroll</div>:
                                      <span style={{ marginLeft: "23px" }} className="displayIconInline">
                                      <div className="forSmallDevices2 new_page_module">
                                        <div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                            checked={value.access_control.payroll_page == true ? true : false}
                                            type="checkbox"
                                            disabled
                                            id={"payroll_page_view"}/>
                                            </div>
                                        </div>
                                      </span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                                      <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Dashboard</div>:
                                      <span style={{ marginLeft: "23px" }} className="displayIconInline">
                                      <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                            checked={value.access_control.dashboard_payroll_view == true ? true : false}
                                            type="checkbox"
                                            disabled
                                            id={"dashboard_payroll_view_12"}
                                            /></div>View</div>
                                          <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}>
                                            <CustomInput
                                              checked={value.access_control.dashboard_payroll_control == true ? true : false}
                                            type="checkbox"
                                            disabled
                                            id={"dashboard_payroll_control_12"}
                                            /></div>Operate</div>
                                      </span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                                      <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Salaries</div>:
                                      <span style={{ marginLeft: "23px" }} className="displayIconInline">
                                      <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                            checked={value.access_control.payroll_view == true ? true : false}
                                            type="checkbox"
                                            disabled
                                            id={"payroll_view_12"}
                                            /></div>View</div>
                                          <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}>
                                            <CustomInput
                                              checked={value.access_control.payroll_control == true ? true : false}
                                            type="checkbox"
                                            disabled
                                            id={"payroll_control_12"}
                                            /></div>Operate</div>
                                      </span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                                      <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Attendance</div>:
                                      <span style={{ marginLeft: "23px" }} className="displayIconInline">
                                      <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                            checked={value.access_control.attendance_view == true ? true : false}
                                            type="checkbox"
                                            disabled
                                            id={"attendance_view_12"}
                                            /></div>View</div>
                                          <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}>
                                            <CustomInput
                                              checked={value.access_control.attendance_control == true ? true : false}
                                            type="checkbox"
                                            disabled
                                            id={"attendance_control_12"}
                                            /></div>Operate</div>
                                      </span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                                      <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Requested Leave </div>:
                                      <span style={{ marginLeft: "23px" }} className="displayIconInline">
                                      <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                            checked={value.access_control.leave_request_view == true ? true : false}
                                            type="checkbox"
                                            disabled
                                            id={"leave_request_view_12"}
                                            /></div>View</div>
                                          <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}>
                                            <CustomInput
                                              checked={value.access_control.leave_request_control == true ? true : false}
                                            type="checkbox"
                                            disabled
                                            id={"leave_request_control_12"}
                                            /></div>Operate</div>
                                      </span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                                      <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Loans</div>:
                                      <span style={{ marginLeft: "23px" }} className="displayIconInline">
                                      <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                            checked={value.access_control.loans_view == true ? true : false}
                                            type="checkbox"
                                            disabled
                                            id={"loans_view_view_12"}
                                            /></div>View</div>
                                          <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}>
                                            <CustomInput
                                              checked={value.access_control.loans_control == true ? true : false}
                                            type="checkbox"
                                            disabled
                                            id={"loans_control_control_12"}
                                            /></div>Operate</div>
                                      </span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                                      <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Allowance</div>:
                                      <span style={{ marginLeft: "23px" }} className="displayIconInline">
                                      <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                            checked={value.access_control.allowance_view == true ? true : false}
                                            type="checkbox"
                                            disabled
                                            id={"allowance_view_view_12"}
                                            /></div>View</div>
                                          <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}>
                                            <CustomInput
                                              checked={value.access_control.allowance_control == true ? true : false}
                                            type="checkbox"
                                            disabled
                                            id={"allowance_control_12"}
                                            /></div>Operate</div>
                                      </span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                                      <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Genral Reports</div>:
                                      <span style={{ marginLeft: "23px" }} className="displayIconInline">
                                      <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                            checked={value.access_control.genral_report_view == true ? true : false}
                                            type="checkbox"
                                            disabled
                                            id={"genral_report_view_view_12"}
                                            /></div>View</div>
                                          <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}>
                                            <CustomInput
                                              checked={value.access_control.genral_report_control == true ? true : false}
                                            type="checkbox"
                                            disabled
                                            id={"genral_report_control_12"}
                                            /></div>Operate</div>
                                      </span>
                                    </div>
                                </div>
                            </div>


                            </div>
                            </div>

                                )
                            })}

                            </div>
                        </div>
                     </div>




                <Modal
                        isOpen={ this.state.modalOpen }
                        toggle={ this.toggle }
                        className={ this.props.className,"aadd_petty" }
                        fade
                    >
                        <div className="modal-header">
                            <h5 className="modal-title h2">{this.state.heading_admin}</h5>
                            <Button className="close" color="" onClick={ this.toggle }>
                                <Icon name="x" />
                            </Button>
                        </div>
                        <ModalBody>
                           <div className="row">
                               <div className="col-lg-6 col-md-6 col-sm-12">
                               <Label style={{ whiteSpace: "nowrap" }}> Role Name</Label>
                                <Input
                                    type="text"
                                    name="role_name"
                                    className="form-control"
                                    aria-describedby="emailHelp"
                                    placeholder="Role Name"
                                    value={this.state.role_name}
                                    onChange={(e) => {
                                        this.setState({
                                            role_name: e.target.value,
                                            error_message:""
                                        })

                                    }}
                                    invalid={this.state.borderNew && this.state.role_name == "" ? true : false}
                                />
                               </div>
                               <div className="col-lg-12 col-md-12 col-sm-12" style={{marginTop:"20px"}}>
                                  <Label style={{ whiteSpace: "nowrap" }}>Access Control</Label>
                                   <div className="row">
                                     {/* <div className="col-lg-10 col-md-10 col-sm-12" style={{ display: "inline-flex" }}>
                                       <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>User Management</div>:
                                       <span style={{ marginLeft: "30px",display: "inline-flex" }}>
                                       <Label>
                                       <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                                defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.user_management_view}
                                                type="checkbox"
                                                className="accc_ssss"
                                                id={1}
                                                onClick={(e) => {
                                                this.setState({
                                                    user_management_view: e.target.checked
                                                })
                                                }
                                                }
                                            /></div>View</div></Label>
                                            <Label>
                                            <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}><CustomInput
                                            defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.user_management_control}
                                            type="checkbox"
                                            className="accc_ssss"
                                            id={2}
                                            onClick={(e) => {
                                                this.setState({
                                                    user_management_control: e.target.checked
                                                })
                                            }
                                            }
                                            /></div>Operate</div></Label>
                                       </span>
                                    </div> */}

                                    {/* POLICY DOCK _managemnt */}
                                    <div className="col-lg-6 col-md-12 col-sm-12">
                                    <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex",marginBottom:"5px" }}>
                                      <div className="mobile desi page_module_new" style={{whiteSpace: "nowrap" ,width: "160px"}}>Operations</div>:
                                      <span style={{ marginLeft: "30px" }}>
                                      <div className="forSmallDevices2 new_page_module">
                                        <div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                            checked={this.state.heading_admin == "Update Admin Role" ? (this.state.policy_dock_view == false && this.state.deviation_dock_view == false
                                               && this.state.opeartion_dock_view == false ? false : this.state.operation_page):this.state.operation_page}
                                            type="checkbox"
                                            id="operation_pages_role"
                                            onClick={(e) => {
                                              this.setState({
                                                operation_page: e.target.checked
                                              })
                                              }
                                              }
                                            />
                                            </div>
                                        </div>
                                      </span>
                                    </div>



                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                                       <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Operation Dock</div>:
                                       {/* <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Policy Dock</div>: */}
                                       <span style={{ marginLeft: "30px",display: "inline-flex" }}>
                                       <Label>
                                       <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                                defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.policy_dock_view}
                                                type="checkbox"
                                                name="operation_dock_view"
                                                disabled = {this.state.operation_page == false ? 'disabled' : ''}
                                                className="accc_ssss"
                                                id={"operation_dock_view"}
                                                onClick={(e) => {
                                                this.setState({
                                                    policy_dock_view: e.target.checked
                                                })
                                                }
                                                }
                                            /></div>View</div></Label>
                                            <Label>
                                            <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}><CustomInput
                                            defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.policy_dock_control}
                                            type="checkbox"
                                            disabled = {this.state.operation_page == false ? 'disabled' : ''}
                                            className="accc_ssss"
                                            name="operation_dock_control"
                                            id={"operation_dock_control"}
                                            onClick={(e) => {
                                                this.setState({
                                                    policy_dock_control: e.target.checked
                                                })
                                            }
                                            }
                                            /></div>Operate</div></Label>
                                       </span>
                                    </div>

                                             {/* Opration_dock_managemnt */}
                                             <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                                       <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Deviation Dock</div>:
                                       <span style={{ marginLeft: "30px",display: "inline-flex" }}>
                                       <Label>
                                       <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                                defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.deviation_dock_view}
                                                type="checkbox"
                                                className="accc_ssss"
                                                disabled = {this.state.operation_page == false ? 'disabled' : ''}
                                                id={"deviation_dock_view"}
                                                name="deviation_dock_view"
                                                onClick={(e) => {
                                                this.setState({
                                                    deviation_dock_view: e.target.checked
                                                })
                                                }
                                                }
                                            /></div>View</div></Label>
                                            <Label>
                                            <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}><CustomInput
                                            defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.deviation_dock_control}
                                            type="checkbox"
                                            disabled = {this.state.operation_page == false ? 'disabled' : ''}
                                            className="accc_ssss"
                                            name="deviation_dock_control"
                                            id={"deviation_dock_control"}
                                            onClick={(e) => {
                                                this.setState({
                                                    deviation_dock_control: e.target.checked
                                                })
                                            }
                                            }
                                            /></div>Operate</div></Label>
                                       </span>
                                    </div>

                                    {/* Opration_dock_managemnt */}
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                                       <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>MIS Dock</div>:
                                       {/* <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Operation Dock</div>: */}
                                       <span style={{ marginLeft: "30px",display: "inline-flex" }}>
                                       <Label>
                                       <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                                defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.opeartion_dock_view}
                                                type="checkbox"
                                                className="accc_ssss"
                                                disabled = {this.state.operation_page == false ? 'disabled' : ''}
                                                id={"mis_dock_view"}
                                                name="mis_dock_view"
                                                onClick={(e) => {
                                                this.setState({
                                                    opeartion_dock_view: e.target.checked
                                                })
                                                }
                                                }
                                            /></div>View</div></Label>
                                            <Label>
                                            <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}><CustomInput
                                            defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.opeartion_dock_control}
                                            type="checkbox"
                                            className="accc_ssss"
                                            disabled = {this.state.operation_page == false ? 'disabled' : ''}
                                            id={"mis_dock_control"}
                                            name="mis_dock_control"
                                            onClick={(e) => {
                                                this.setState({
                                                    opeartion_dock_control: e.target.checked
                                                })
                                            }
                                            }
                                            /></div>Operate</div></Label>
                                       </span>
                                    </div>
                                    </div>
                                   </div>

                                          {/* accounting_managemnt */}
                                          <div className="col-lg-6 col-md-12 col-sm-12">
                                    <div className="row mobile_data">
                                     <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex",marginBottom:"5px" }}>
                                      <div className="mobile desi page_module_new" style={{whiteSpace: "nowrap" ,width: "160px"}}>Accounts</div>:
                                      <span style={{ marginLeft: "30px" }}>
                                      <div className="forSmallDevices2 new_page_module">
                                        <div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                             checked={this.state.heading_admin == "Update Admin Role" ? (this.state.accounting_view == false && this.state.cheque_report_view == false
                                              && this.state.customer_cheque_view == false ? false : this.state.accounting_page):this.state.accounting_page}
                                            // defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.accounting_page}
                                            type="checkbox"
                                            id={"Accounts_page"}
                                            onClick={(e) => {
                                              this.setState({
                                                accounting_page: e.target.checked
                                              })
                                              }
                                              }
                                            />
                                            </div>
                                        </div>
                                      </span>
                                    </div>
                                     <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                                       <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Accounting</div>:
                                       <span style={{ marginLeft: "30px",display: "inline-flex" }}>
                                       <Label>
                                       <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                                defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.accounting_view}
                                                type="checkbox"
                                                className="accc_ssss"
                                                disabled = {this.state.accounting_page == false ? 'disabled' : ''}
                                                id={"accounting_view"}
                                                onClick={(e) => {
                                                this.setState({
                                                    accounting_view: e.target.checked
                                                })
                                                }
                                                }
                                            /></div>View</div></Label>
                                            <Label>
                                            <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}><CustomInput
                                            defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.accounting_control}
                                            type="checkbox"
                                            className="accc_ssss"
                                            disabled = {this.state.accounting_page == false ? 'disabled' : ''}
                                            id={"accounting_control"}
                                            onClick={(e) => {
                                                this.setState({
                                                    accounting_control: e.target.checked
                                                })
                                            }
                                            }
                                            /></div>Operate</div></Label>
                                       </span>
                                    </div>

                                       {/* cheque_report_managemnt */}
                                       <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                                       <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Cheque Reporting</div>:
                                       <span style={{ marginLeft: "30px",display: "inline-flex" }}>
                                       <Label>
                                       <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                                defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.cheque_report_view}
                                                type="checkbox"
                                                className="accc_ssss"
                                                disabled = {this.state.accounting_page == false ? 'disabled' : ''}
                                                id={"cheque_report_view"}
                                                onClick={(e) => {
                                                this.setState({
                                                    cheque_report_view: e.target.checked
                                                })
                                                }
                                                }
                                            /></div>View</div></Label>
                                            <Label>
                                            <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}><CustomInput
                                            defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.cheque_report_control}
                                            type="checkbox"
                                            className="accc_ssss"
                                            disabled = {this.state.accounting_page == false ? 'disabled' : ''}
                                            id={"cheque_report_control"}
                                            onClick={(e) => {
                                                this.setState({
                                                    cheque_report_control: e.target.checked
                                                })
                                            }
                                            }
                                            /></div>Operate</div></Label>
                                       </span>
                                    </div>
                                      {/* time_tracker_managemnt */}
                                      <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                                       <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Customer Cheque</div>:
                                       <span style={{ marginLeft: "30px",display: "inline-flex" }}>
                                       <Label>
                                       <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                                defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.customer_cheque_view}
                                                type="checkbox"
                                                className="accc_ssss"
                                                disabled = {this.state.accounting_page == false ? 'disabled' : ''}
                                                id={"customer_cheque_view"}
                                                onClick={(e) => {
                                                this.setState({
                                                    customer_cheque_view: e.target.checked
                                                })
                                                }
                                                }
                                            /></div>View</div></Label>
                                            <Label>
                                            <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}><CustomInput
                                            defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.customer_cheque_control}
                                            type="checkbox"
                                            className="accc_ssss"
                                            disabled = {this.state.accounting_page == false ? 'disabled' : ''}
                                            id={"customer_cheque_control"}
                                            onClick={(e) => {
                                                this.setState({
                                                    customer_cheque_control: e.target.checked
                                                })
                                            }
                                            }
                                            /></div>Operate</div></Label>
                                       </span>
                                    </div>
                                 </div>
                              </div>



                                   <div className="col-lg-6 col-md-12 col-sm-12">
                                    <div className="row top_neww mobile_data">
                                   <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex",marginBottom:"5px" }}>
                                      <div className="mobile desi page_module_new" style={{whiteSpace: "nowrap" ,width: "160px"}}>Payments</div>:
                                      <span style={{ marginLeft: "30px" }}>
                                      <div className="forSmallDevices2 new_page_module">
                                        <div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                            checked={this.state.heading_admin == "Update Admin Role" ? (this.state.pending_payment_view == false ? false : this.state.payments_page):this.state.payments_page}
                                            // defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.payments_page}
                                            type="checkbox"
                                            id={"paymentsPages"}
                                            onClick={(e) => {
                                              this.setState({
                                                payments_page: e.target.checked
                                              })
                                              }
                                              }
                                            />
                                            </div>
                                        </div>
                                      </span>
                                    </div>
                                     {/* pending_payment */}
                                     <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                                       <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Payments</div>:
                                       <span style={{ marginLeft: "30px",display: "inline-flex" }}>
                                       <Label>
                                       <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                                defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.pending_payment_view}
                                                type="checkbox"
                                                className="accc_ssss"
                                                disabled = {this.state.payments_page == false ? 'disabled' : ''}
                                                id={"pending_payment_view"}
                                                onClick={(e) => {
                                                this.setState({
                                                    pending_payment_view: e.target.checked
                                                })
                                                }
                                                }
                                            /></div>View</div></Label>
                                            <Label>
                                            <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}><CustomInput
                                            defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.pending_payment_control}
                                            type="checkbox"
                                            className="accc_ssss"
                                            disabled = {this.state.payments_page == false ? 'disabled' : ''}
                                            id={"pending_payment_control"}
                                            onClick={(e) => {
                                                this.setState({
                                                    pending_payment_control: e.target.checked
                                                })
                                            }
                                            }
                                            /></div>Operate</div></Label>
                                       </span>
                                    </div>
                                    </div>
                                    </div>


                                     {/* reportingg_managemnt */}
                                     <div className="col-lg-6 col-md-12 col-sm-12">
                                    <div className="row top_neww mobile_data">
                                     <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex",marginBottom:"5px" }}>
                                      <div className="mobile desi page_module_new" style={{whiteSpace: "nowrap" ,width: "160px"}}>Reports</div>:
                                      <span style={{ marginLeft: "30px" }}>
                                      <div className="forSmallDevices2 new_page_module">
                                        <div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                            checked={this.state.heading_admin == "Update Admin Role" ? (this.state.reporting_view == false  ? false : this.state.reports_page):this.state.reports_page}
                                            // defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.reports_page}
                                            type="checkbox"
                                            id={"reportsPages"}
                                            onClick={(e) => {
                                              this.setState({
                                                reports_page: e.target.checked
                                              })
                                              }
                                              }
                                            />
                                            </div>
                                        </div>
                                      </span>
                                    </div>
                                     <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                                       <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Reports</div>:
                                       <span style={{ marginLeft: "30px",display: "inline-flex" }}>
                                       <Label>
                                       <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                                defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.reporting_view}
                                                type="checkbox"
                                                className="accc_ssss"
                                                disabled = {this.state.reports_page == false ? 'disabled' : ''}
                                                id={"reporting_view"}
                                                onClick={(e) => {
                                                this.setState({
                                                    reporting_view: e.target.checked
                                                })
                                                }
                                                }
                                            /></div>View</div></Label>
                                            <Label>
                                            <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}><CustomInput
                                            defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.reporting_control}
                                            type="checkbox"
                                            className="accc_ssss"
                                            disabled = {this.state.reports_page == false ? 'disabled' : ''}
                                            id={"reporting_control"}
                                            onClick={(e) => {
                                                this.setState({
                                                    reporting_control: e.target.checked
                                                })
                                            }
                                            }
                                            /></div>Operate</div></Label>
                                       </span>
                                    </div>
                                  </div>
                                  </div>





                                     {/* time_tracker_managemnt */}
                                     <div className="col-lg-6 col-md-12 col-sm-12">
                                    <div className="row top_neww mobile_data">
                                     <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex",marginBottom:"5px" }}>
                                      <div className="mobile desi page_module_new" style={{whiteSpace: "nowrap" ,width: "160px"}}>Time Tracker</div>:
                                      <span style={{ marginLeft: "30px" }}>
                                      <div className="forSmallDevices2 new_page_module">
                                        <div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                            checked={this.state.heading_admin == "Update Admin Role" ? (this.state.time_tracker_view == false  ? false : this.state.time_tracker_page):this.state.time_tracker_page}
                                            // defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.time_tracker_page}
                                            type="checkbox"
                                            id={"TimeTracker"}
                                            onClick={(e) => {
                                              this.setState({
                                                time_tracker_page: e.target.checked
                                              })
                                              }
                                              }
                                            />
                                            </div>
                                        </div>
                                      </span>
                                    </div>
                                     <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                                       <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Time Tracker</div>:
                                       <span style={{ marginLeft: "30px",display: "inline-flex" }}>
                                       <Label>
                                       <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                                defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.time_tracker_view}
                                                type="checkbox"
                                                className="accc_ssss"
                                                disabled = {this.state.time_tracker_page == false ? 'disabled' : ''}
                                                id={"time_tracker_view"}
                                                onClick={(e) => {
                                                this.setState({
                                                    time_tracker_view: e.target.checked
                                                })
                                                }
                                                }
                                            /></div>View</div></Label>
                                            <Label>
                                            <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}><CustomInput
                                            defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.time_tracker_control}
                                            type="checkbox"
                                            className="accc_ssss"
                                            disabled = {this.state.time_tracker_page == false ? 'disabled' : ''}
                                            id={"time_tracker_control"}
                                            onClick={(e) => {
                                                this.setState({
                                                    time_tracker_control: e.target.checked
                                                })
                                            }
                                            }
                                            /></div>Operate</div></Label>
                                       </span>
                                    </div>
                                    </div>
                                 </div>


                                    {/* master_access */}
                                    <div className="col-lg-6 col-md-12 col-sm-12">
                                    <div className="row top_neww mobile_data">
                                     <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex",marginBottom:"5px" }}>
                                      <div className="mobile desi page_module_new" style={{whiteSpace: "nowrap" ,width: "160px"}}>Masters</div>:
                                      <span style={{ marginLeft: "30px" }}>
                                      <div className="forSmallDevices2 new_page_module">
                                        <div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                            checked={this.state.heading_admin == "Update Admin Role" ? (this.state.master_view == false  ? false : this.state.master_page):this.state.master_page}
                                            // defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.master_page}
                                            type="checkbox"
                                            id={"masters_page"}
                                            onClick={(e) => {
                                              this.setState({
                                                master_page: e.target.checked
                                              })
                                              }
                                              }
                                            />
                                            </div>
                                        </div>
                                      </span>
                                    </div>
                                    <div className="col-lg-12 col-md-10 col-sm-12" style={{ display: "inline-flex" }}>
                                       <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Master</div>:
                                       <span style={{ marginLeft: "30px",display: "inline-flex" }}>
                                       <Label>
                                       <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                                defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.master_view}
                                                type="checkbox"
                                                className="accc_ssss"
                                                id={"master_view"}
                                                disabled = {this.state.master_page == false ? 'disabled' : ''}
                                                onClick={(e) => {
                                                this.setState({
                                                  master_view: e.target.checked
                                                })
                                                }
                                                }
                                            /></div>View</div></Label>
                                            <Label>
                                            <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}><CustomInput
                                            defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.master_control}
                                            type="checkbox"
                                            className="accc_ssss"
                                            id={"master_control"}
                                            disabled = {this.state.master_page == false ? 'disabled' : ''}
                                            onClick={(e) => {
                                                this.setState({
                                                  master_control: e.target.checked
                                                })
                                            }
                                            }
                                            /></div>Operate</div></Label>
                                       </span>
                                    </div>
                                </div>
                                </div>



 {/*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Employess ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  */}
                                     {/* admin_management_access */}
                                     <div className="col-lg-6 col-md-12 col-sm-12">
                                    <div className="row top_neww mobile_data">
                                     <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex",marginBottom:"5px" }}>
                                      <div className="mobile desi page_module_new" style={{whiteSpace: "nowrap" ,width: "160px"}}>HRM</div>:
                                      <span style={{ marginLeft: "30px" }}>
                                      <div className="forSmallDevices2 new_page_module">
                                        <div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                            checked={this.state.heading_admin == "Update Admin Role" ? (this.state.admin_management_view == false && this.state.agent_management_view == false ? false : this.state.employee_page):this.state.employee_page}
                                            // defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.employee_page}
                                            type="checkbox"
                                            id={"Employees_Pages"}
                                            onClick={(e) => {
                                              this.setState({
                                                employee_page: e.target.checked
                                              })
                                              }
                                              }
                                            />
                                            </div>
                                        </div>
                                      </span>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                                       <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Recuritment</div>:
                                       <span style={{ marginLeft: "30px",display: "inline-flex" }}>
                                       <Label>
                                       <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                                defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.recuritement_view}
                                                type="checkbox"
                                                className="accc_ssss"
                                                disabled = {this.state.employee_page == false ? 'disabled' : ''}
                                                id={"recuritement_view"}
                                                onClick={(e) => {
                                                this.setState({
                                                    recuritement_view: e.target.checked
                                                })
                                                }
                                                }
                                            /></div>View</div></Label>
                                            <Label>
                                            <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}><CustomInput
                                            defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.recuritement_control}
                                            type="checkbox"
                                            className="accc_ssss"
                                            disabled = {this.state.employee_page == false ? 'disabled' : ''}
                                            id={"recuritement_control"}
                                            onClick={(e) => {
                                                this.setState({
                                                    recuritement_control: e.target.checked
                                                })
                                            }
                                            }
                                            /></div>Operate</div></Label>
                                       </span>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                                       <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Employee Management</div>:
                                       <span style={{ marginLeft: "30px",display: "inline-flex" }}>
                                       <Label>
                                       <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                                defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.admin_management_view}
                                                type="checkbox"
                                                className="accc_ssss"
                                                disabled = {this.state.employee_page == false ? 'disabled' : ''}
                                                id={"admin_management_view"}
                                                onClick={(e) => {
                                                this.setState({
                                                    admin_management_view: e.target.checked
                                                })
                                                }
                                                }
                                            /></div>View</div></Label>
                                            <Label>
                                            <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}><CustomInput
                                            defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.admin_management_control}
                                            type="checkbox"
                                            className="accc_ssss"
                                            disabled = {this.state.employee_page == false ? 'disabled' : ''}
                                            id={"admin_management_control"}
                                            onClick={(e) => {
                                                this.setState({
                                                    admin_management_control: e.target.checked
                                                })
                                            }
                                            }
                                            /></div>Operate</div></Label>
                                       </span>
                                    </div>

                                     {/* agent_management_access */}
                                     <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                                       <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Agencies/Telesales</div>:
                                       <span style={{ marginLeft: "30px",display: "inline-flex" }}>
                                       <Label>
                                       <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                                defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.agent_management_view}
                                                type="checkbox"
                                                className="accc_ssss"
                                                disabled = {this.state.employee_page == false ? 'disabled' : ''}
                                                id={"agent_management_view"}
                                                onClick={(e) => {
                                                this.setState({
                                                    agent_management_view: e.target.checked
                                                })
                                                }
                                                }
                                            /></div>View</div></Label>
                                            <Label>
                                            <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}><CustomInput
                                            defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.agent_management_control}
                                            type="checkbox"
                                            className="accc_ssss"
                                            disabled = {this.state.employee_page == false ? 'disabled' : ''}
                                            id={"agent_management_control"}
                                            onClick={(e) => {
                                                this.setState({
                                                    agent_management_control: e.target.checked
                                                })
                                            }
                                            }
                                            /></div>Operate</div></Label>
                                       </span>
                                    </div>
                                    </div>
                                 </div>





        {/*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Telecalling APPP ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  */}

                                  <div className="col-lg-6 col-md-12 col-sm-12">
                                    <div className="row top_neww mobile_data">
                                     <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex",marginBottom:"5px" }}>
                                      <div className="mobile desi page_module_new" style={{whiteSpace: "nowrap" ,width: "160px"}}>Telecalling</div>:
                                      <span style={{ marginLeft: "30px" }}>
                                      <div className="forSmallDevices2 new_page_module">
                                        <div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                            checked={this.state.heading_admin == "Update Admin Role" ? (this.state.contacts_view == false && this.state.campaign_view == false  && this.state.dashboard_app_view == false && this.state.reference_user_view == false ? false : this.state.telecaller_app_page):this.state.telecaller_app_page}
                                            // defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.telecaller_app_page}
                                            type="checkbox"
                                            id={"telecallerApp"}
                                            onClick={(e) => {
                                              this.setState({
                                                telecaller_app_page: e.target.checked
                                              })
                                              }
                                              }
                                            />
                                            </div>
                                        </div>
                                      </span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                                       <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Dashboard</div>:
                                       <span style={{ marginLeft: "30px",display: "inline-flex" }}>
                                       <Label>
                                       <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                                defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.dashboard_app_view}
                                                type="checkbox"
                                                className="accc_ssss"
                                                disabled = {this.state.telecaller_app_page == false ? 'disabled' : ''}
                                                id={"dashboard_app_view"}
                                                onClick={(e) => {
                                                this.setState({
                                                    dashboard_app_view: e.target.checked
                                                })
                                                }
                                                }
                                            /></div>View</div></Label>
                                            <Label>
                                            <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}><CustomInput
                                            defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.dashboard_app_control}
                                            type="checkbox"
                                            className="accc_ssss"
                                            disabled = {this.state.telecaller_app_page == false ? 'disabled' : ''}
                                            id={"dashboard_app_control"}
                                            onClick={(e) => {
                                                this.setState({
                                                    dashboard_app_control: e.target.checked
                                                })
                                            }
                                            }
                                            /></div>Operate</div></Label>
                                       </span>
                                    </div>

                                     {/* agent_management_access */}
                                     <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                                       <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Campaign</div>:
                                       <span style={{ marginLeft: "30px",display: "inline-flex" }}>
                                       <Label>
                                       <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                                defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.campaign_view}
                                                type="checkbox"
                                                className="accc_ssss"
                                                disabled = {this.state.telecaller_app_page == false ? 'disabled' : ''}
                                                id={"campaign_view"}
                                                onClick={(e) => {
                                                this.setState({
                                                    campaign_view: e.target.checked
                                                })
                                                }
                                                }
                                            /></div>View</div></Label>
                                            <Label>
                                            <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}><CustomInput
                                            defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.campaign_control}
                                            type="checkbox"
                                            className="accc_ssss"
                                            disabled = {this.state.telecaller_app_page == false ? 'disabled' : ''}
                                            id={"campaign_control"}
                                            onClick={(e) => {
                                                this.setState({
                                                    campaign_control: e.target.checked
                                                })
                                            }
                                            }
                                            /></div>Operate</div></Label>
                                       </span>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                                       <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Contacts</div>:
                                       <span style={{ marginLeft: "30px",display: "inline-flex" }}>
                                       <Label>
                                       <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                                defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.contacts_view}
                                                type="checkbox"
                                                className="accc_ssss"
                                                disabled = {this.state.telecaller_app_page == false ? 'disabled' : ''}
                                                id={"contacts_view"}
                                                onClick={(e) => {
                                                this.setState({
                                                    contacts_view: e.target.checked
                                                })
                                                }
                                                }
                                            /></div>View</div></Label>
                                            <Label>
                                            <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}><CustomInput
                                            defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.contacts_control}
                                            type="checkbox"
                                            className="accc_ssss"
                                            disabled = {this.state.telecaller_app_page == false ? 'disabled' : ''}
                                            id={"contact_control"}
                                            onClick={(e) => {
                                                this.setState({
                                                    contacts_control: e.target.checked
                                                })
                                            }
                                            }
                                            /></div>Operate</div></Label>
                                       </span>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                                       <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Reference Users</div>:
                                       <span style={{ marginLeft: "30px",display: "inline-flex" }}>
                                       <Label>
                                       <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                                defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.reference_user_view}
                                                type="checkbox"
                                                className="accc_ssss"
                                                disabled = {this.state.telecaller_app_page == false ? 'disabled' : ''}
                                                id={"reference_user_view"}
                                                onClick={(e) => {
                                                this.setState({
                                                    reference_user_view: e.target.checked
                                                })
                                                }
                                                }
                                            /></div>View</div></Label>
                                            <Label>
                                            <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}><CustomInput
                                            defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.reference_user_control}
                                            type="checkbox"
                                            className="accc_ssss"
                                            disabled = {this.state.telecaller_app_page == false ? 'disabled' : ''}
                                            id={"Reference_control"}
                                            onClick={(e) => {
                                                this.setState({
                                                    reference_user_control: e.target.checked
                                                })
                                            }
                                            }
                                            /></div>Operate</div></Label>
                                       </span>
                                    </div>
                                    </div>
                                 </div>

     {/*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ PAYROLLS ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  */}

                                      <div className="col-lg-6 col-md-12 col-sm-12">
                                    <div className="row top_neww mobile_data">
                                     <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex",marginBottom:"5px" }}>
                                      <div className="mobile desi page_module_new" style={{whiteSpace: "nowrap" ,width: "160px"}}>Payroll</div>:
                                      <span style={{ marginLeft: "30px" }}>
                                      <div className="forSmallDevices2 new_page_module">
                                        <div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                            checked={this.state.heading_admin == "Update Admin Role" ? (this.state.payroll_view == false  ? false : this.state.payroll_page):this.state.payroll_page}
                                            type="checkbox"
                                            id={"payroll_page"}
                                            onClick={(e) => {
                                              this.setState({
                                                payroll_page: e.target.checked
                                              })
                                              }
                                              }
                                            />
                                            </div>
                                        </div>
                                      </span>
                                    </div>
                                    <div className="col-lg-12 col-md-10 col-sm-12" style={{ display: "inline-flex" }}>
                                       <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Dashboard</div>:
                                       <span style={{ marginLeft: "30px",display: "inline-flex" }}>
                                       <Label>
                                       <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                                defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.dashboard_payroll_view}
                                                type="checkbox"
                                                className="accc_ssss"
                                                id={"dashboard_payroll_view"}
                                                disabled = {this.state.payroll_page == false ? 'disabled' : ''}
                                                onClick={(e) => {
                                                this.setState({
                                                  dashboard_payroll_view: e.target.checked
                                                })
                                                }
                                                }
                                            /></div>View</div></Label>
                                            <Label>
                                            <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}><CustomInput
                                            defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.dashboard_payroll_control}
                                            type="checkbox"
                                            className="accc_ssss"
                                            id={"dashboard_payroll_control"}
                                            disabled = {this.state.payroll_page == false ? 'disabled' : ''}
                                            onClick={(e) => {
                                                this.setState({
                                                  dashboard_payroll_control: e.target.checked
                                                })
                                            }
                                            }
                                            /></div>Operate</div></Label>
                                           </span>
                                            </div>
                                    <div className="col-lg-12 col-md-10 col-sm-12" style={{ display: "inline-flex" }}>
                                       <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Salaries</div>:
                                       <span style={{ marginLeft: "30px",display: "inline-flex" }}>
                                       <Label>
                                       <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                                defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.payroll_view}
                                                type="checkbox"
                                                className="accc_ssss"
                                                id={"payroll_view"}
                                                disabled = {this.state.payroll_page == false ? 'disabled' : ''}
                                                onClick={(e) => {
                                                this.setState({
                                                  payroll_view: e.target.checked
                                                })
                                                }
                                                }
                                            /></div>View</div></Label>
                                            <Label>
                                            <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}><CustomInput
                                            defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.payroll_control}
                                            type="checkbox"
                                            className="accc_ssss"
                                            id={"payroll_control"}
                                            disabled = {this.state.payroll_page == false ? 'disabled' : ''}
                                            onClick={(e) => {
                                                this.setState({
                                                  payroll_control: e.target.checked
                                                })
                                            }
                                            }
                                            /></div>Operate</div></Label>
                                           </span>
                                            </div>
                                    <div className="col-lg-12 col-md-10 col-sm-12" style={{ display: "inline-flex" }}>
                                       <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Attendance</div>:
                                       <span style={{ marginLeft: "30px",display: "inline-flex" }}>
                                       <Label>
                                       <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                                defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.attendance_view}
                                                type="checkbox"
                                                className="accc_ssss"
                                                id={"attendance_view"}
                                                disabled = {this.state.payroll_page == false ? 'disabled' : ''}
                                                onClick={(e) => {
                                                this.setState({
                                                  attendance_view: e.target.checked
                                                })
                                                }
                                                }
                                            /></div>View</div></Label>
                                            <Label>
                                            <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}><CustomInput
                                            defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.attendance_control}
                                            type="checkbox"
                                            className="accc_ssss"
                                            id={"attendance_control"}
                                            disabled = {this.state.payroll_page == false ? 'disabled' : ''}
                                            onClick={(e) => {
                                                this.setState({
                                                  attendance_control: e.target.checked
                                                })
                                            }
                                            }
                                            /></div>Operate</div></Label>
                                           </span>
                                         </div>
                                    <div className="col-lg-12 col-md-10 col-sm-12" style={{ display: "inline-flex" }}>
                                       <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Requested Leave</div>:
                                       <span style={{ marginLeft: "30px",display: "inline-flex" }}>
                                       <Label>
                                       <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                                defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.leave_request_view}
                                                type="checkbox"
                                                className="accc_ssss"
                                                id={"leave_request_view"}
                                                disabled = {this.state.payroll_page == false ? 'disabled' : ''}
                                                onClick={(e) => {
                                                this.setState({
                                                  leave_request_view: e.target.checked
                                                })
                                                }
                                                }
                                            /></div>View</div></Label>
                                            <Label>
                                            <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}><CustomInput
                                            defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.leave_request_control}
                                            type="checkbox"
                                            className="accc_ssss"
                                            id={"leave_request_control"}
                                            disabled = {this.state.payroll_page == false ? 'disabled' : ''}
                                            onClick={(e) => {
                                                this.setState({
                                                  leave_request_control: e.target.checked
                                                })
                                            }
                                            }
                                            /></div>Operate</div></Label>
                                           </span>
                                         </div>

                                    <div className="col-lg-12 col-md-10 col-sm-12" style={{ display: "inline-flex" }}>
                                       <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Loans</div>:
                                       <span style={{ marginLeft: "30px",display: "inline-flex" }}>
                                       <Label>
                                       <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                                defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.loans_view}
                                                type="checkbox"
                                                className="accc_ssss"
                                                id={"loans_view"}
                                                disabled = {this.state.payroll_page == false ? 'disabled' : ''}
                                                onClick={(e) => {
                                                this.setState({
                                                  loans_view: e.target.checked
                                                })
                                                }
                                                }
                                            /></div>View</div></Label>
                                            <Label>
                                            <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}><CustomInput
                                            defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.loans_control}
                                            type="checkbox"
                                            className="accc_ssss"
                                            id={"loans_control"}
                                            disabled = {this.state.payroll_page == false ? 'disabled' : ''}
                                            onClick={(e) => {
                                                this.setState({
                                                  loans_control: e.target.checked
                                                })
                                            }
                                            }
                                            /></div>Operate</div></Label>
                                           </span>
                                         </div>


                                    <div className="col-lg-12 col-md-10 col-sm-12" style={{ display: "inline-flex" }}>
                                       <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Allowance</div>:
                                       <span style={{ marginLeft: "30px",display: "inline-flex" }}>
                                       <Label>
                                       <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                                defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.allowance_view}
                                                type="checkbox"
                                                className="accc_ssss"
                                                id={"allowance_view"}
                                                disabled = {this.state.payroll_page == false ? 'disabled' : ''}
                                                onClick={(e) => {
                                                this.setState({
                                                  allowance_view: e.target.checked
                                                })
                                                }
                                                }
                                            /></div>View</div></Label>
                                            <Label>
                                            <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}><CustomInput
                                            defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.allowance_control}
                                            type="checkbox"
                                            className="accc_ssss"
                                            id={"allowance_control"}
                                            disabled = {this.state.payroll_page == false ? 'disabled' : ''}
                                            onClick={(e) => {
                                                this.setState({
                                                  allowance_control: e.target.checked
                                                })
                                            }
                                            }
                                            /></div>Operate</div></Label>
                                           </span>
                                         </div>
                                       </div>
                                     </div>
                                    <div className="col-lg-12 col-md-10 col-sm-12" style={{ display: "inline-flex" }}>
                                       <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Genral Report</div>:
                                       <span style={{ marginLeft: "30px",display: "inline-flex" }}>
                                       <Label>
                                       <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                                defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.genral_report_view}
                                                type="checkbox"
                                                className="accc_ssss"
                                                id={"genral_report_view"}
                                                disabled = {this.state.payroll_page == false ? 'disabled' : ''}
                                                onClick={(e) => {
                                                this.setState({
                                                  genral_report_view: e.target.checked
                                                })
                                                }
                                                }
                                            /></div>View</div></Label>
                                            <Label>
                                            <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}><CustomInput
                                            defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.genral_report_control}
                                            type="checkbox"
                                            className="accc_ssss"
                                            id={"genral_report_control"}
                                            disabled = {this.state.payroll_page == false ? 'disabled' : ''}
                                            onClick={(e) => {
                                                this.setState({
                                                  genral_report_control: e.target.checked
                                                })
                                            }
                                            }
                                            /></div>Operate</div></Label>
                                           </span>
                                         </div>



                                 </div>



                               </div>
                               <div className="col-lg-12 col-md-12 col-sm-12" style={{ width: '100%', textAlign: 'center', marginTop: '7px', marginBottom: '7px', display: this.state.error_message == "" ? "none" : "block" }}>
                                <h2 className="error_message_admin">{' '}{this.state.error_message}{' '}</h2></div>

                           </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" style={{textTransform:"capitalize"}} onClick={ this.toggle }>Close</Button>
                            { ' ' }
                            <Button color="warning" disabled={this.state.loading} style={{backgroundColor:"#007bff" ,borderColor:"#007bff",color:"#fff",textTransform:"capitalize"}} onClick={ this.switch_function } id="save_role">{this.state.button_admin}{this.state.loading ? (
                                <Spinner />
                            ) : ''}</Button>
                        </ModalFooter>
                    </Modal>

                    <Modal
                style={{ width: '347px', maxHeight: '37%', justifyContent: 'center', textAlign: 'center', alignItem: 'center', marginTop: '200px' }}
                isOpen={this.state.AlertDelete}
                toggle={this.AlertDelete}
                className={this.props.className}
                fade
              >
                <ModalBody>
                  <div style={{ width: '100%', height: '20px' }}>
                    <Button className="close" style={{ float: 'right' }} color="" onClick={this.AlertDelete}>
                      <Icon name="x" />
                    </Button>
                  </div>
                  <div style={{ width: '100%', height: '50px' }}>
                    <h5 >Are you sure you want to Delete ?</h5>
                  </div>
                  <div style={{ height: '50px', width: '100%' }}>
                    <Button color="brand" disabled={this.state.loading}
                    id="delete_role"
                      style={{ marginRight: "20px", background: "#007bff",textTransform:"capitalize", borderColor: "#007bff" }}
                      onClick={() => {
                        this.delete_emp(this.state.role_id)

                      }}
                    >yes{this.state.loading ? (
                      <Spinner />
                  ) : ''}</Button>
                    {'             '}
                    <Button color="secondary" style={{textTransform:"capitalize"}} onClick={this.AlertDelete}>no</Button>
                  </div>

                </ModalBody>
              </Modal>


            </Fragment>
        );
    }
}

export default connect( ( { settings } ) => (
    {
        settings,
    }
) , { addToast: actionAddToast })( Content );
