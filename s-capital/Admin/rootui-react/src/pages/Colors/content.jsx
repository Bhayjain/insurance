/**
 * External Dependencies
 */
 import './style.scss';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import PageTitle from '../../components/page-title';
import Icon from '../../components/icon';
import { RangeDatePicker } from 'react-google-flight-datepicker';
import 'react-google-flight-datepicker/dist/main.css';
// import { io } from "socket.io-client";
import Cookies from 'js-cookie';
import { isEmpty } from 'lodash';
import {
    Button, Collapse, ListGroup, ListGroupItem,Spinner,Table,ButtonGroup,Input, Modal, ModalBody, ModalFooter,Label,CustomInput
} from 'reactstrap';
import { UncontrolledCollapse, Card, CardBody, CardText,Badge } from 'reactstrap';
import { format } from 'date-fns';
// import pdf_img from '../../images/pdf.png'
// import excel_img from '../../images/txt-file.png'

import pdf_img from '../../images/pdf.png'
import excel_img from '../../images/txt-file.png'
import other_img from '../../images/google-docs.png'



import Dropzone from '../../components/dropzone';
import dateFormat from 'dateformat';
import {
  addToast as actionAddToast,
} from '../../actions';
import Select from 'react-select';
import DatePicker from '../../components/date-time-picker';

/**
 * Internal Dependencies
 */
import Snippet from '../../components/snippet';
import { el } from 'date-fns/locale';
import socket from '../Socket';

/**
 * Component
 */

 const device_width =   window.innerWidth;
 var height =   window.innerHeight;
//  ////////console.log("admin_screen.height", height);
 const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
//  ////////console.log("admin_nav_height",nav_height);
 var my_height = height - nav_height;
 var gk = (my_height/2)-100;
//  ////////console.log("admin_gk",gk);
 if(device_width < 600){
   var gk = (my_height/2) - 50;
 }



// // var api_url = "http://192.168.29.31:4090/"
// // var api_url = "http://173.249.5.10:3005/"
// var api_url = "https://api.bookyourinsurance.com:4092/"
// // var api_url = "https://demoapi.bookyourinsurance.com:4050/"


//  var socket = io(api_url, {transport : ['WebSocket']});
//  ////////console.log("socket*************",socket);
 const admin_data = JSON.parse(Cookies.get('admin_data'));
 //////console.log("admin_data**************",admin_data);


 function toMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString('en-US', {
    month: 'long',
  });
}




 let file = '';

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: "",
            endDate: "",
            user_role:admin_data[0].role.label,
            added_by:admin_data[0]._id,
            operation_dock_data_array:[],
            no_data_message:"none",
            isLoading:"block",
            spinner_1:"none",
            opration_single_data_array:[],
            files:[],
            building_map_array: [],
            file_array:[],
            uploaded_operation:[],
            sm_id:"",
            conversation_array:[],
            color_code:"",
            ipad_width:"none",
            ipad_emp_list:"block",
            activeAccordion: 0,
            start_date:"",
            new_start_date:"",
            end_date:"",
            new_end_date:"",
            issue_date:"",
            cheque_date:"",
            new_cheque_date:"",
            class_of_vehicle_new : [
              { value: '1', label: 'Private car',section:'#next_section' },
              { value: '2', label: 'GCV' ,section:'#next_section'},
              { value: '3', label: 'Two Wheeler',section:'#next_section' },
              { value: '4', label: 'MIS-D',section:'#next_section' },
              { value: '5', label: 'PCV',section:'#next_section' },
              { value: '6', label: 'Non Motor',section:'#next_section' },
          ],
          modalOpen: false,
          is_edit_logs: false,
          section_details_new:[],
          update_section_details_array:[],
          error_message_forms:"none",
          show_edit_logs:"none",
          edit_logs_btn:"Updated Logs",
          opeartion_dock_control:Cookies.get('opeartion_dock_control'),
             current_page:1,
            total_pages:"",
            total:"",
            insurer_array:[],
            cheque_array: [],
            policy_array: [],
            policy_array_new: [],
            agent_array: [],
            tellicar_name: [],
            document_data_data: [],
            AlertDeleteSingle: false,
            remaining_message:"",
            insurer_array_typeee:"",
            mode_of_premium_label:"",
            chart_box_open:"none",
            chat_button:"Open Form",
            mode_of_premium_received:"",
            disabled_true:false,
            customer_policy_amount:0,
            setError:"none",
            setdisss:false,
            change_check:"none",
            enable_formsss:"no",
            minute: 0,
            second: 0,
            od_amount: 0,
            addon_amount: 0,
            show_timer: null,
            insurer_paid_type: "",
            motor_type_data: "",
            image_preview:"",
            net_premium_new:"",
            od_premium_new:"",
            addon_premium:0,
            po_dis_true:false,
            borderNew:false,
            form_filling_time:"",
            document_data:[],
            visitor_type: 'pending',
            policy_added_by_new: '',
            customer_payment_array:[],

            rto_cluster:"",
            gvw_category:"",
            liabilty_or_comprehensive:""
        }
        this.fetch_all_insurer()
        this.fetch_agent()
        this.AlertDeleteSingle = this.AlertDeleteSingle.bind( this );
    }

    AlertDeleteSingle() {
      this.setState( ( prevState ) => ( {
          AlertDeleteSingle: ! prevState.AlertDeleteSingle,
      } ) );
  }

    componentDidMount(){

        socket.on("connect", () => {
              if (socket.connected==true) {
                  this.update_socket_id_admin(socket.id)
              }
              else{
                  // ////////console.log("wronggg");
              }
             })

            // socket.on('add_online_visitor_response', (data) => {

            ////////console.log("inside sooooooccccccckkkkkket");
            //   this.get_operation_dock();
            //     })
            setTimeout(() => {
              this.get_operation_dock();
              }, 100)
            }

            toggle=()=> {
              this.setState( ( prevState ) => ( {
                  modalOpen: ! prevState.modalOpen,
              } ) );
          }


    get_operation_dock(startDate,endDate,search_sm,pageNumber){
        //////console.log("startDate",startDate);
        //////console.log("endDate",endDate);
        //////console.log("search_sm",search_sm);





        if (pageNumber == '' || pageNumber == undefined) {
          this.setState({
              current_page: 1
          })
          var page_no = 1
      } else {
          this.setState({
              current_page: pageNumber
          })
          var page_no = pageNumber
      }

      if (search_sm=="" || search_sm == undefined ) {
        var my_sm_search= undefined
      }
      else{
        var my_sm_search= search_sm
      }
      if (startDate==undefined ||startDate=="" || endDate==undefined || endDate=="" ) {
        var my_date = undefined
      }
      else{
        const today = new Date(startDate);
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        const formattedToday_start = yyyy + '-' + mm + '-' + dd;
        //////console.log("formattedToday",formattedToday_start);


        const today_end = new Date(endDate);
        const yyyy_end = today_end.getFullYear();
        let mm_end = today_end.getMonth() + 1; // Months start at 0!
        let dd_end = today_end.getDate();
            //////console.log("datttttttttttttttt",dd_end);
            //////console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",new Date(endDate).getDate());
            if (dd_end < 10) {
              var my_date ='0' + dd_end
            }
            else{
              var my_date = dd_end
            }
            //////console.log("my_date",my_date);
        if (dd_end < 10) dd_end = '0' + dd_end;
        if (mm_end < 10) mm_end = '0' + mm_end;

        const formattedToday_end = yyyy_end + '-' + mm_end + '-' + my_date;
        //////console.log("formattedToday**************",formattedToday_end);
        var my_date = [formattedToday_start,formattedToday_end]
      }

        // if (startDate==undefined ||startDate==null || endDate==undefined || endDate==null || search_sm==undefined || search_sm=="") {
        //   // ////////console.log("kkkk");
        //   const usercookies = Cookies.get('usercookies');
        //   var conv_param = {
        //     page_no:page_no,
        //     oe_id:usercookies,
        //     user_role:this.state.user_role,
        //  }
        // }

        //////console.log("my_date",my_date);
        const usercookies = Cookies.get('usercookies');
        var conv_param = {
          page_no:page_no,
          oe_id:usercookies,
          user_role:this.state.user_role,
          sm_name:my_sm_search,
          sort_by_date:my_date,
          status:this.state.visitor_type
       }

        // else{

        //     const today = new Date(startDate);
        //     const yyyy = today.getFullYear();
        //     let mm = today.getMonth() + 1; // Months start at 0!
        //     let dd = today.getDate();
        //     if (dd < 10) dd = '0' + dd;
        //     if (mm < 10) mm = '0' + mm;
        //     const formattedToday_start = yyyy + '-' + mm + '-' + dd;
        //     //////console.log("formattedToday",formattedToday_start);


        //     const today_end = new Date(endDate);
        //     const yyyy_end = today_end.getFullYear();
        //     let mm_end = today_end.getMonth() + 1; // Months start at 0!
        //     let dd_end = today_end.getDate();
        //         //////console.log("datttttttttttttttt",dd_end);
        //         //////console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",new Date(endDate).getDate());
        //         if (dd_end < 10) {
        //           var my_date ='0' + dd_end
        //         }
        //         else{
        //           var my_date = dd_end
        //         }
        //         //////console.log("my_date",my_date);
        //     if (dd_end < 10) dd_end = '0' + dd_end;
        //     if (mm_end < 10) mm_end = '0' + mm_end;

        //     const formattedToday_end = yyyy_end + '-' + mm_end + '-' + my_date;
        //     //////console.log("formattedToday**************",formattedToday_end);

        //     // var start_date= startDate.toISOString().split("T")[0]
        //     // var end_date= endDate.toISOString().split("T")[0]


        //     const usercookies = Cookies.get('usercookies');
        //     var conv_param = {
        //         page_no:page_no,
        //         oe_id:usercookies,
        //         user_role:this.state.user_role,
        //         sort_by_date:[formattedToday_start,formattedToday_end],
        //         search:search_sm
        //      }
        // }



        //console.log("conv_param",conv_param);

            socket.emit('get_operation_dock', conv_param);
            socket.on('get_operation_dock_response', (data)=>{


                //console.log('inside get_operation_dock_response =============',data);



                  if(data.data.status==true){
                      this.setState({
                          operation_dock_data_array : data.data.data,
                          no_data_message:"none",
                          isLoading:"none",
                          spinner_1:"none",
                          total_pages: data.data.total_pages,
                          total:data.data.total,
                          borderNew:false,
                      })
                      if (device_width < 820) {
                        // ////////console.log("display lisit none");

                       }
                       else{
                        this.get_single_operation_dock(data.data.data[0]._id)
                       }

                  }
                  else{
                      this.setState({
                        operation_dock_data_array:[],
                        no_data_message:"block",
                        isLoading:"none",
                        spinner_1:"none",
                        for_show_btn:"",
                        total_pages: 1,
                        total:"",
                        borderNew:false,

                      })
                  }

            })
      }

      get_single_operation_dock(operation_dock_id){
        var conv_param = {
            operation_dock_id:operation_dock_id,
            added_from:"admin_panel"
           }
        //  ////////console.log("conv_param_single_visitor",conv_param);

            socket.emit('get_single_operation_dock', conv_param);
            socket.on('get_single_operation_dock_response', (data)=>{


                  console.log('inside get_single_operation_dock_response =============',data);

                  if(data.data.status==true){


                    if (data.data.data[0].payout_type == "" || data.data.data[0].payout_type == undefined) {
                      var type_of_payout_label =""
                    }else{
                      var type_of_payout_label = data.data.data[0].payout_type.label
                    }


                    var opration_single_data_array = data.data.data;
                    for (let i = 0; i < opration_single_data_array.length; i++) {


                      if (opration_single_data_array[i].quotation_pdf == undefined || opration_single_data_array[i].quotation_pdf == ""
                         ) {
                           var quotation_data = ""
                      }else{
                       var quotation_data = opration_single_data_array[i].quotation_pdf

                      }
                      if (
                          opration_single_data_array[i].proposal_pdf == undefined || opration_single_data_array[i].proposal_pdf == "") {

                           var proposal_data = ""
                      }else{
                       var proposal_data = opration_single_data_array[i].proposal_pdf

                      }
                      if (
                          opration_single_data_array[i].policy_pdf == undefined || opration_single_data_array[i].policy_pdf == "") {

                           var policy_data = ""
                           //console.log("falllllllllllllll");
                      }else{

                       var policy_data = opration_single_data_array[i].policy_pdf
                       //console.log("eeeeeeeeeeeeeee");

                      }

                    for (let j = 0; j < quotation_data.length; j++) {
                         var date = quotation_data[j].date_time;
                         var new_date = this.formatDate(date);
                         //console.log("new_date=======================",new_date);
                         quotation_data[j].date_time_new = new_date
                      }
                    for (let j = 0; j < proposal_data.length; j++) {
                         var date = proposal_data[j].date_time;
                         var new_date = this.formatDate(date);
                         //console.log("new_date=======================",new_date);
                         proposal_data[j].date_time_new = new_date
                      }
                    for (let j = 0; j < policy_data.length; j++) {
                         var date = policy_data[j].date_time;
                         var new_date = this.formatDate(date);
                         //console.log("new_date=======================",new_date);
                         policy_data[j].date_time_new = new_date
                      }
               }





                    if (device_width < 820) {
                        var ipad_emp_list = "none";
                        // //////////console.log("display lisit none", ipad_emp_list);
                       }
                       else{
                       var ipad_emp_list = "block"
                      //  //////////console.log("display lisit");

                       }

                      //  if (data.data.data[0].policy_added_by=="Direct") {
                      //   var policy_added_by =  {
                      //     value: '1', label: 'Direct',section:'6_section'
                      //    }
                      //   var agent_dealer_name = ""
                      //   var tele_caller_name = ""
                      //   var direct_name = data.data.data[0].sourced_by_detail
                      //   }
                      //   else
                        if (data.data.data[0].policy_added_by=="SM" || data.data.data[0].policy_added_by=="Direct") {
                          var policy_added_by =  {
                            value: '1', label: 'Agent/Dealer',section:'5_section'
                           }

                           //console.log("agent_dealer_name$$$$$$$$$$$$$$$$$$$$$$$$$",data.data.data[0].sourced_by_detail);
                           var agent_dealer_name = data.data.data[0].sourced_by_detail
                           var tele_caller_name = ""
                           var direct_name = ""
                        }
                        else{
                          var policy_added_by =  {
                            value: '1', label: 'Telecalling',section:'4_section'
                           }
                           var agent_dealer_name =""
                           var tele_caller_name = data.data.data[0].sourced_by_detail
                           var direct_name = ""
                        }
                        ////////console.log("policy_added_by************************",policy_added_by);

////////console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjj");

                        if (data.data.data[0].sourced_by_detail=="") {
                          var tellicar_name = []
                        }
                        else{
                          var tellicar_name = [data.data.data[0].sourced_by_detail]
                        }




                        var operation_dock_data_array = this.state.operation_dock_data_array

                        for (let pk = 0; pk < operation_dock_data_array.length; pk++) {
                         if(operation_dock_data_array[pk]._id == data.data.data[0]._id){
                          operation_dock_data_array[pk].section_details = data.data.data[0].section_details
                         }

                        }
                        //////console.log("tellicar_name",tellicar_name);

                       //////console.log("data.data.data[0].sm_id*************************",data.data.data[0].name.length);
                       if (data.data.data[0].section_details ==null || data.data.data[0].section_details==undefined || data.data.data[0].section_details=="") {
                          var section_details =""

                          if (data.data.data[0].payment_mode.label=="Link Payment To Insurer" || data.data.data[0].payment_mode.label == "Customer Cheque to Insurer") {
                            var mode_of_premium_payment =data.data.data[0].payment_mode
                            var disabled_true=true
                          }
                          else{
                            var mode_of_premium_payment =""
                            var disabled_true=false
                          }

                          if (data.data.data[0].last_year_ncb == "") {
                            var last_year_ncb = ""
                          }else{
                            var last_year_ncb = {
                              value:data.data.data[0].last_year_ncb.value,
                              label:data.data.data[0].last_year_ncb.label+"%"
                            }
                          }


                          //console.log("data.data.data[0].policy_added_by*************",data.data.data[0].policy_added_by);

                          if (data.data.data[0].gvw == ""|| data.data.data[0].gvw == undefined) {
                            var cc_gvw_pcc = data.data.data[0].pvc_capacity
                          }else{
                            console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$4444GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGg");
                            var cc_gvw_pcc = data.data.data[0].gvw
                            console.log("$$$$$$$$$$GGGGGGGGGGGGGGGGGGGGGGGGGg",cc_gvw_pcc);
                          }

                          if (data.data.data[0].selected_insurer == "" || data.data.data[0].selected_insurer == undefined) {
                            // console.log("Not Show Insurerrr");
                          }else{
                            this.fetch_cheque_for_policy(data.data.data[0].selected_insurer.value)
                          }


                          if (data.data.data[0].motor_type.label=="MISC D" ) {
                            var new_for_liabilty_or_comprehensive = "Miscd"
                          }else if (data.data.data[0].motor_type.label == "Commercial") {
                            var new_for_liabilty_or_comprehensive = "Commercial"
                          }else {
                            var new_for_liabilty_or_comprehensive = ""
                          }


                          this.setState({
                            opration_single_data_array :opration_single_data_array,
                            operation_dock_data_array :operation_dock_data_array,
                            policy_added_by_new :data.data.data[0].policy_added_by,
                            disabled_true : disabled_true,
                            document_data:[],
                            type_of_payout_label : type_of_payout_label,
                            operation_dock_id :data.data.data[0]._id,
                            payment_from_customer :data.data.data[0].payment_from_customer,
                            policy_amount :Number(data.data.data[0].gross_premium),
                            // policy_amount :data.data.data[0].policy_amount,
                            policy_added_by :data.data.data[0].policy_added_by,
                            sm_id :data.data.data[0].sm_id,
                            file_array :data.data.data[0].quotation_pdf,
                            form_filling_time :data.data.data[0].calculated_form_filling_time,
                            agent_or_tellcalling :policy_added_by,
                            agent_or_tellcalling_label :policy_added_by.label,
                            tele_caller_name :tele_caller_name,
                            tellicar_name :tellicar_name,
                            agent_dealer_name :agent_dealer_name,
                            direct_name :direct_name,
                            // agent_or_tellcalling :data.data.data[0].sourced_by,
                            agent_delete_section :policy_added_by.section,
                            // agent_delete_section :data.data.data[0].sourced_by.section,
                            uploaded_operation :data.data.data[0].operation_pdf,
                            conversation_array :data.data.data[0].conversation,
                            color_code :data.data.data[0].color_code,
                            spinner_1:"none",
                            ipad_width:"block",
                            ipad_emp_list:ipad_emp_list,

                            // Formss response
                            policy_number: data.data.data[0].policy_no ? data.data.data[0].policy_no : "",
                            vehicle_number:data.data.data[0].vehicle_no,
                            rto_location: data.data.data[0].rto_location,
                            owner_driver: data.data.data[0].owner_driver,
                            make: data.data.data[0].make,
                            model: data.data.data[0].model,
                            cc_gvw_pcc: cc_gvw_pcc,
                            // cc_gvw_pcc: data.data.data[0].cc,
                            ncb_type:last_year_ncb,
                            add_on_type: "",
                            fuel_type:data.data.data[0].fuel_type,
                            insurer_array_new:data.data.data[0].selected_insurer,
                            physical_cheque_received:data.data.data[0].physical_cheque_received,
                            customer_payment_array:data.data.data[0].customer_payment_array,
                            // insurer_array_new :insurer_array_new,
                            insurer_array_typeee :data.data.data[0].selected_insurer ? data.data.data[0].selected_insurer.insurer_type : '',
                            insurer_paid_type :data.data.data[0].insurer_paid_type,
                            mode_of_premium_label :data.data.data[0].payment_mode.label,
                            mode_of_premium_payment :mode_of_premium_payment,
                            mode_of_premium_received :data.data.data[0].payment_mode,
                            mode_of_premium_payment :data.data.data[0].mode_of_premium_payment,
                            mode_of_premium_label :data.data.data[0].mode_of_premium_payment ? data.data.data[0].mode_of_premium_payment.label :"",
                            section_type_new :data.data.data[0].mode_of_premium_payment ? data.data.data[0].mode_of_premium_payment.section :"",
                            cheque_to_sc :data.data.data[0].payment_mode ? data.data.data[0].payment_mode.label:"",
                            // policy_array :data.data.data[0].dummy_cheque_array,
                            addon_premium: 0,
                            net_premium: 0,
                            gross_premium: Number(data.data.data[0].gross_premium),
                            amount_receivable: 0,
                            po_on_type: "",
                            agent_or_telecalling_type: "",
                            type_of_payout: data.data.data[0].payout_type,
                            type_of_payout_label: data.data.data[0].payout_type.label,
                            // type_of_payout: data.data.data[0].payment_type,
                            po_discount_in_percent: data.data.data[0].assist_percent,
                            po_discount_amount: data.data.data[0].po_amount,
                            // po_discount_amount: data.data.data[0].policy_amount,
                            po_discount_status: "",
                            cheque_no: "",
                            cheque_date: "",
                            bank_name: "",
                            cheque_no_1:"",
                            cheque_no_1_amount: "",
                            cheque_no_2: "",
                            cheque_no_2_amount: "",
                            cheque_no_3:"",
                            cheque_no_3_amount:"",
                            policy_remarks:"",
                            for_show_btn:section_details,
                            sm_name :data.data.data[0].sm_name,
                            policy_issued_by :data.data.data[0].policy_issued_by.label,
                            contact_no :data.data.data[0].phone_no,
                            customer_name :data.data.data[0].name,
                            is_edit_logs :data.data.data[0].is_edit_logs,
                            policy_amount :Number(data.data.data[0].gross_premium),
                            show_edit_logs:"none",
                            policy_blanace_amount :Number(data.data.data[0].gross_premium),
                            delete_button_show:false,
                            change_check:"none",
                            cheque_id_new:"",
                            enable_formsss:"no",
                            minute: 0,
                            second: 0,
                            motor_type:data.data.data[0].motor_non_motor,
                            motor_section_show:data.data.data[0].motor_non_motor.section,
                            section_agent_telli_type:data.data.data[0].motor_non_motor.section,
                            section_type:data.data.data[0].motor_non_motor.section,
                            section_type:data.data.data[0].motor_non_motor? data.data.data[0].motor_non_motor.section:undefined,
                            section_type:data.data.data[0].motor_type? data.data.data[0].motor_type.section:undefined,
                            type_of_motor:data.data.data[0].motor_type,
                            private_car_data:data.data.data[0].motor_type ? (data.data.data[0].motor_type.label=="Private car" ?  data.data.data[0].sub_motor_type:undefined):undefined,
                            miscd_data:data.data.data[0].motor_type ? (data.data.data[0].motor_type.label=="MISC D" ?  data.data.data[0].sub_motor_type:undefined):undefined,
                            pvc_type:data.data.data[0].pvc_type,
                            pvc_capacity:data.data.data[0].pvc_type ? data.data.data[0].pvc_type.capacity :undefined,
                            gcv_data:data.data.data[0].gvw,
                            comercial_data:data.data.data[0].motor_type ? (data.data.data[0].motor_type.label=="Commercial" ?  data.data.data[0].sub_motor_type:undefined):undefined,
                            comercial_label:data.data.data[0].sub_motor_type ? data.data.data[0].sub_motor_type.label:undefined,
                            two_wheeler:data.data.data[0].motor_type ? (data.data.data[0].motor_type.label=="Two Wheeler" ?  data.data.data[0].sub_motor_type:undefined):undefined,
                            motor_type_data:data.data.data[0].motor_non_motor ? data.data.data[0].motor_non_motor.label :undefined,
                            type_of_motor_data:data.data.data[0].motor_type ? data.data.data[0].motor_type.label :undefined,
                            // form_complete_data:"Incomplete"
                            borderNew:false,

                            liabilty_or_comprehensive:data.data.data[0].commerial_miscd_type,
                            new_for_liabilty_or_comprehensive:new_for_liabilty_or_comprehensive
                        })


                        this.fetch_agent()

                       }
                       else{
                        var section_details =data.data.data[0].section_details[0]
                        var section_details_new =data.data.data[0].section_details


                        if (section_details.new_cheque_date == "" || section_details.new_cheque_date == undefined) {
                          var new_che_date = ""
                        }
                        else{
                          var new_che_date = new Date(section_details.new_cheque_date)
                        }

                        // if (data.data.data[0].policy_added_by=="Direct") {
                        // var policy_added_by =  {
                        //   value: '1', label: 'Direct',section:'6_section'
                        //  }
                        // var agent_dealer_name = ""
                        // var tele_caller_name = ""
                        // var direct_name = data.data.data[0].sourced_by_detail
                        // }
                        // else

                        if (data.data.data[0].policy_added_by=="SM" || data.data.data[0].policy_added_by=="Direct") {
                          var policy_added_by =  {
                            value: '1', label: 'Agent/Dealer',section:'5_section'
                           }
                           var agent_dealer_name = data.data.data[0].sourced_by_detail
                           var tele_caller_name = ""
                           var direct_name = ""
                        }
                        else{
                          var policy_added_by =  {
                            value: '1', label: 'Telecalling',section:'4_section'
                           }
                           var agent_dealer_name =""
                           var tele_caller_name = data.data.data[0].sourced_by_detail
                           var direct_name = ""
                        }

                        if (section_details.fleet_type=="Fleet") {
                          var fleet_type =  {
                            value: '1', label: 'Fleet'
                           }
                        }
                        else{
                          var fleet_type =  {
                            value: '2', label: 'Non Fleet'
                           }
                        }


                        if (section_details.add_on_type=="Yes") {
                          var add_on_type =  {
                            value: '1', label: 'Yes'
                           }
                        }
                        else{
                          var add_on_type =  {
                            value: '2', label: 'No'
                           }
                        }


                        if (section_details.physical_cheque_received=="Yes") {
                          var physical_cheque_received =  {
                            value: '1', label: 'Yes'
                           }
                        }
                        else{
                          var physical_cheque_received =  {
                            value: '2', label: 'No'
                           }
                        }


                        // if (section_details.po_on_type=="OD Premium") {
                        //   var po_on_type =  {
                        //     value: '1', label: 'OD Premium'
                        //    }
                        // }
                        // else{
                        //   var po_on_type =  {
                        //     value: '2', label: 'Net Premium'
                        //    }
                        // }


                        if (section_details.po_discount_status=="Paid") {
                          var po_discount_status =  {
                            value: '1', label: 'Paid'
                           }
                        }
                        else if (section_details.po_discount_status=="Pending") {
                          var po_discount_status =  {
                            value: '2', label: 'Pending'
                           }
                        }
                        else{
                          var po_discount_status =  {
                            value: '3', label: 'Nil'
                           }
                        }


                        if (section_details.comercial_data == undefined && section_details.miscd_data !=undefined) {
                          var new_for_liabilty_or_comprehensive = "Miscd"
                        }else{
                          var new_for_liabilty_or_comprehensive = "Commercial"
                        }


                        this.setState({
                          opration_single_data_array :opration_single_data_array,
                          operation_dock_data_array :operation_dock_data_array,
                          operation_dock_id :data.data.data[0]._id,
                          sm_name :data.data.data[0].sm_name,
                          policy_issued_by :data.data.data[0].policy_issued_by.label,
                          tellicar_name :tellicar_name,
                          sm_id :data.data.data[0].sm_id,
                          file_array :data.data.data[0].quotation_pdf,
                          form_filling_time :data.data.data[0].calculated_form_filling_time,
                          // insurer_array_typeee :data.data.data[0].selected_insurer.insurer_type,
                          policy_added_by :policy_added_by,
                          policy_added_by_new :data.data.data[0].policy_added_by,
                          tele_caller_name :tele_caller_name,
                          agent_dealer_name :section_details.agent_dealer_name,
                          direct_name :direct_name,
                          uploaded_operation :data.data.data[0].operation_pdf,
                          conversation_array :data.data.data[0].conversation,
                          color_code :data.data.data[0].color_code,
                          spinner_1:"none",
                          ipad_width:"block",
                          ipad_emp_list:ipad_emp_list,

                          // Formss response
                          policy_number: section_details.policy_number,
                          vehicle_number: section_details.vehicle_number,
                          rto_location: section_details.rto_location,
                          contact_no: section_details.contact_no,
                          // start_date: start_date,
                          new_start_date: new Date(section_details.new_start_date),
                          // end_date: end_date,
                          new_end_date: new Date(section_details.new_end_date),
                          issue_date: new Date(section_details.issue_date),
                          new_cheque_date: new_che_date,
                          customer_name: section_details.customer_name,
                          fleet_type: fleet_type,


                          motor_type: section_details.motor_non_motor,
                          type_of_motor: section_details.type_of_motor,
                          private_car_data: section_details.private_car_data,
                          two_wheeler: section_details.two_wheeler,
                          comercial_data: section_details.comercial_data,
                          miscd_data: section_details.miscd_data,
                          pvc_type: section_details.pvc_type,
                          gcv_data: section_details.gcv_data,
                          pvc_capacity_new: section_details.pvc_capacity,
                          // sub_class_of_vehicle: section_details.sub_class_of_vehicle,



                          section_type_for_edit:section_details.type_of_motor ? section_details.type_of_motor.section :"",
                          motor_type_data_edit:section_details.motor_non_motor ? section_details.motor_non_motor.label :"",
                          type_of_motor_data_edit:section_details.type_of_motor ?  section_details.type_of_motor.label :"",
                          comercial_label_edit: section_details.comercial_data ? section_details.comercial_data.label:"",
                          pvc_capacity_edit: section_details.pvc_type ? section_details.pvc_type.capacity:"",



                          type_of_mis_d: section_details.type_of_mis_d,
                          type_of_policy: section_details.type_of_policy,
                          // type_of_payout_label: section_details.type_of_policy.label,
                          insurer_paid_type: section_details.insurer_paid_type,
                          insurer_array_typeee: section_details.insurer_array_new.insurer_type,
                          payment_from_customer: section_details.payment_from_customer,

                          make: section_details.make,
                          model: section_details.model,
                          cc_gvw_pcc: section_details.cc_gvw_pcc,
                          ncb_type: section_details.ncb_type,
                          add_on_type:add_on_type,
                          fuel_type: section_details.fuel_type,
                          insurer_array_new: section_details.insurer_array_new,
                          addon_premium: section_details.addon_premium,
                          od_amount: section_details.od_amount,
                          addon_amount: section_details.addon_amount,
                          net_premium: section_details.net_premium,
                          gross_premium: section_details.gross_premium,
                          amount_receivable: section_details.amount_receivable,
                          po_on_type: section_details.po_on_type,
                          po_on_type_new: section_details.po_on_type,
                          agent_or_telecalling_type: section_details.agent_or_telecalling_type,
                          type_of_payout: section_details.type_of_payout,
                          mode_of_premium_received: section_details.mode_of_premium_received,
                          cheque_to_sc: section_details.mode_of_premium_received.label,
                          payment_from_customer:section_details.payment_from_customer,
                          document_data_data:section_details.customer_payment_attachment,
                          // tele_caller_name: section_details.tele_caller_name,
                          // agent_dealer_name: section_details.agent_dealer_name,
                          po_discount_in_percent: section_details.po_discount_in_percent,
                          po_discount_amount: section_details.po_discount_amount,
                          po_discount_status: po_discount_status,
                          mode_of_premium_payment: section_details.mode_of_premium_payment,
                          section_type_new_new: section_details.mode_of_premium_payment.section,
                          physical_cheque_received: physical_cheque_received,
                          cheque_no: section_details.cheque_no,
                          cheque_amount_received: section_details.cheque_amount_received,
                          // cheque_date: cheque_date,
                          bank_name: section_details.bank_name,
                          cheque_no_1: section_details.cheque_no_1,
                          cheque_no_1_amount: section_details.cheque_no_1_amount,
                          cheque_no_2: section_details.cheque_no_2,
                          cheque_no_2_amount: section_details.cheque_no_2_amount,
                          cheque_no_3: section_details.cheque_no_3,
                          cheque_no_3_amount: section_details.cheque_no_3_amount,
                          policy_remarks: section_details.policy_remarks,
                          policy_array_new: section_details.cheque_array,
                          for_show_btn:section_details,
                          section_details_new:section_details_new,
                          agent_or_tellcalling :policy_added_by,
                          // agent_or_tellcalling :data.data.data[0].sourced_by,
                          agent_delete_section :policy_added_by.section,
                          // agent_delete_section :data.data.data[0].sourced_by.section,
                          is_edit_logs :data.data.data[0].is_edit_logs,
                          policy_amount :section_details.gross_premium,
                          // policy_amount :data.data.data[0].policy_amount,
                          policy_blanace_amount :section_details.gross_premium,
                          // policy_blanace_amount :data.data.data[0].policy_amount,
                          // po_discount_amount :data.data.data[0].policy_amount,

                          show_edit_logs:"none",
                          delete_button_show:false,
                          change_check:"none",
                          cheque_id_new:"",
                          minute:0,
                          second:0,
                          enable_formsss:"no",
                          borderNew:false,
                          pending_payout_details:section_details.pending_payout_details,
                          pending_payment_details:section_details.pending_payment_details,
                          customer_cheque_status:section_details.customer_cheque_status,
                          customer_payment_array:section_details.customer_payment_attachment,
                          agent_name_section : section_details.agent_or_tellcalling  ?  section_details.agent_or_tellcalling.section :"",

                          rto_cluster:section_details.rto_cluster,
                          gvw_category:section_details.gvw_category,
                          liabilty_or_comprehensive:section_details.liabilty_or_comprehensive,
                          new_for_liabilty_or_comprehensive:new_for_liabilty_or_comprehensive
                            // form_complete_data:"Finished"
                      })



                      //console.log("po_on_type===========================",this.state.po_on_type);
                       }

                     this.please_stopTimer()
                    socket.off("get_single_operation_dock_response")

                  }
                  else{
                      this.setState({
                        visitor_single_data_array:[],
                        spinner_1:"none",
                        show_edit_logs:"none"
                      })
                  }

            })
      }

      formatDate(date) {
        // //console.log("date",new Date(date));
                var date = new Date(date);
                var year = date.getFullYear();
               var  month = date.getMonth()+1;
               var dt = date.getDate();

                 if (dt < 10) {
                 dt = '0' + dt;
                 }
                 if (month < 10) {
                 month = '0' + month;
                 }

                //  //console.log(dt+'-' + month + '-'+year);
                 var new_date_1 = dt+'-' + month + '-'+year

                 var today = date;
                 let options_1 = {
                     hour: "2-digit", minute: "2-digit"
                 };

                //  //console.log("lllllllllllllllllllllllllllll",today.toLocaleTimeString("en-us", options_1));
                                    var time_new =today.toLocaleTimeString("en-us", options_1)
                                    // //console.log("mt______________________________________________*********************",time_new);
                                    // //console.log("mt______________________________________________",new_date_1);

                                    var nre_time = time_new


                return nre_time;
              }


      update_socket_id_admin = (socket_id) => {
        const { settings, addToast } = this.props;
        const usercookies = Cookies.get('usercookies');
        var params = {
            user_id:usercookies,
            socket_id:socket_id
        }
        // ////////console.log("update_socket_id_admin_params", params);
        const res = fetch(settings.api_url + "update_socket_id_admin", {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      }).then((response) => response.json())
        .then(json => {
          // ////////console.log('inside update_socket_id_admin_response =============',json)
        })
    }

    fileToDataUri = (image) => {
        return new Promise((res) => {
          const reader = new FileReader();
          const { type, name, size } = image;
          reader.addEventListener('load', () => {
            res({
              // base64: reader.result,
              // type: reader.result.split(';')[0].split('/')[1],
              image_name: reader.result,
              image_type: reader.result.split(';')[0].split('/')[1],
              // type:file_type,
              // name: name,

              // size: size,
            })
          });
          reader.readAsDataURL(image);
        })
      }

      uploadImage = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
          const newImagesPromises = []
          for (let i = 0; i < e.target.files.length; i++) {
            newImagesPromises.push(this.fileToDataUri(e.target.files[i]))
          }
          const newImages = await Promise.all(newImagesPromises)
          // setImages([...images, ...newImages])

          if (this.state.button == "Save") {
            this.setState({
              building_map_array: newImages
            })
          }
          else {
            this.setState({
              building_map_array: newImages,
              show_new_added_images: newImages,
            })
          }


          // setTimeout(() => {//////console.log("this is the first message", this.state.building_map_array) }, 1000);
          // this.upload_quotation_dock()
        }
      }




    delete_building_map_image = (value2) => {
        // ////////console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh", value2);
        var kkk = this.state.file_array.filter(n => n !== value2);
        this.setState({
            file_array: kkk,
        })
        // //////console.log(kkk,"kkkkkkkkkkkkkkkkkkkkkk");

        for (let index = 0; index < kkk.length; index++) {
         var image_type= kkk[index].image_name.split('pdf/');
          kkk[index].image_name=image_type[1]
          //////console.log("element",element);
        }
        // //////console.log("element",kkk);
        const { settings, addToast, } = this.props;
        var params = {
          operation_dock_id: this.state.operation_dock_id,
          quotation_pdf: kkk
        }

        // //////console.log("delete_Quotation", params);
        const res = fetch(settings.api_url + "delete_quotation_dock", {
          method: 'POST',
          body: JSON.stringify(params),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          }
        }).then((response) => response.json())
          .then(json => {
            // //////console.log("Delete Qutation Response**************************************", { params: params, response: json })
            var data = json;
            if (data.status == true) {
              addToast({
                title: 'Ask my operation',
                content: data["message"],
                duration: 1000,
              });
              this.get_single_operation_dock(this.state.operation_dock_id)
            }
            else {
              // //////console.log("something wrong");
            }
          })

      }


      handleChangeFile_Quotationn = (event) => {

        ////console.log("##################################");
        // //////console.log(event.target.files)
        var my_operation =event.target.files
        this.setState({
          file_array :my_operation
        })

        // setTimeout(() => { //////console.log("this is the first message", this.state.file_array) }, 1000);
        // //////console.log("uploaded_operation",my_operation);
        // let duplicateFile = {};
        // if (file.files.length > 0) {
        //   duplicateFile = this.state.files.find((doc) => doc.fileName === file.files[0].name);
        //   if (isEmpty(duplicateFile)) {
        //     const currentFiles = this.state.files;
        //     currentFiles.push({
        //       fileInput: file.files[0],
        //       fileName: file.files[0].name,
        //     });
        //     this.setState({
        //       files: currentFiles,
            // }, () => //////console.log(this.state.files));
        //   }
        // }

        this.upload_quotation_dock(my_operation)
      }


      upload_quotation_dock = (files) => {
        const { settings, addToast } = this.props;
        var fd = new FormData();
        var data = this.state.file_array;
        // //////console.log("files************************", files);
        // //////console.log("data************************", data);
        // //////console.log("data((((((((((((((((((************************", data[0]);
        // //////console.log("JSON.stringify(data)************************", JSON.stringify(data));

      //   if (files.length == 0) {
            //////console.log("undefined");
      //   } else {

            //////console.log("nameArr",nameArr);
      //   }

      for (let i = 0; i < files.length; i++) {


          // formData.append(`files`, files[i])
          // fd.append(`files`,files[i]);
          fd.append('file',files[i]);
      }



          //   fd.append('file', JSON.stringify(files));

            fd.append('operation_dock_id', this.state.operation_dock_id);


        // headers: {'Content-Type': undefined}
        ////console.log(...fd, "uplarde_quotation")
        const res = fetch(settings.api_url + "upload_quotation_dock", {
            method: 'POST',
            body: fd
        })
            .then((response) => response.json())
            .then(json => {
              // //////console.log("Upload Quotationn Response**************************************", {response: json })
              var data = json;
              if (data.status == true) {
                addToast({
                  title: 'Ask my operation',
                  content: data["message"],
                  duration: 1000,
                });
                this.get_single_operation_dock(this.state.operation_dock_id)
              }
              else {
                // //////console.log("something wrong");
                addToast({
                  title: 'Ask my operation',
                  content: data["message"],
                  duration: 1000,
                });
              }


            })
    }



      handleChangeFile = (event) => {

        ////console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        ////console.log(event.target.files)
        var my_operation =event.target.files
        this.setState({
            uploaded_operation :my_operation
        })

        this.upload_operation_dock(my_operation)
      }


      upload_operation_dock = (files) => {
        const { settings, addToast } = this.props;
        var fd = new FormData();
        // //////console.log("files************************", files);

         for (let i = 0; i < files.length; i++) {
          fd.append('file',files[i]);
           }
         fd.append('operation_dock_id', this.state.operation_dock_id);
        // //////console.log(...fd, "uplarde_operationyy")
        const res = fetch(settings.api_url + "upload_operation_dock", {
            method: 'POST',
            body: fd
        })
            .then((response) => response.json())
            .then(json => {
              // //////console.log("Upload operation Response**************************************", {response: json })
              var data = json;
              if (data.status == true) {
                addToast({
                  title: 'Ask my operation',
                  content: data["message"],
                  duration: 1000,
                });
                this.get_single_operation_dock(this.state.operation_dock_id)
              }
              else {
                // //////console.log("something wrong");
                addToast({
                  title: 'Ask my operation',
                  content: data["message"],
                  duration: 1000,
                });
              }


            })
    }



    delete_operation_dock = (value2) => {
      // //////console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh", value2);
      // //////console.log("(((((((((((((((((((((((((", this.state.uploaded_operation);
      var kkk = this.state.uploaded_operation.filter(n => n !== value2);
      this.setState({
        uploaded_operation: kkk,
      })
      // //////console.log(kkk,"kkkkkkkkkkkkkkkkkkkkkk");

      for (let index = 0; index < kkk.length; index++) {
       var image_type= kkk[index].image_name.split('pdf/');
        kkk[index].image_name=image_type[1]
      }
      // //////console.log("element",kkk);
      const { settings, addToast, } = this.props;
      var params = {
        operation_dock_id: this.state.operation_dock_id,
        operation_pdf: kkk
      }

      // //////console.log("delete_operation", params);
      const res = fetch(settings.api_url + "delete_operation_dock", {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      }).then((response) => response.json())
        .then(json => {
          // //////console.log("Delete operation Response**************************************", { params: params, response: json })
          var data = json;
          if (data.status == true) {
            addToast({
              title: 'Ask my operation',
              content: data["message"],
              duration: 1000,
            });
            this.get_single_operation_dock(this.state.operation_dock_id)
          }
          else {
            // //////console.log("something wrong");
            addToast({
              title: 'Ask my operation',
              content: data["message"],
              duration: 1000,
            });
          }
        })

    }


    add_operation_dock_conversation=()=>{
      const {
          addToast
      } = this.props;
         const usercookies = Cookies.get('usercookies');
         var date = new Date();
          // //////console.log("date",date);
          var dd = String(date.getDate()).padStart(2, '0');
          var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
          var months=toMonthName(mm)
          // //////console.log("my_date",months);
          var yyyy = date.getFullYear();
          var hours = date.getHours();
          const time = new Date().toLocaleString([], { hour: 'numeric', minute: 'numeric' });
          // //////console.log("timetime",time);
          var am_pm = (hours >= 12) ? "PM" : "AM";
          if(hours >= 12){
              hours -=12;
          }
          var my_new_date = dd + ' ' + months + ' ' + yyyy + ' ' + time +" "+ am_pm;
          // //////console.log("my_new_date",my_new_date);

         var conversation_array =this.state.conversation_array
        //  //////console.log("conversation_array",conversation_array);
      var conv_param = {
          operation_dock_id:this.state.operation_dock_id,
          message:this.state.message_data,
          from_id:usercookies,
          to_id:this.state.sm_id,
          date_time:my_new_date,
          message_id:conversation_array.length + 1,
          message_from:"oe_to_sm",
          // message_from:"sm_to_oe",
       }
      //  //////console.log("add_conv_param",conv_param);

       if (conv_param.message=="" || conv_param.message==undefined ) {
           this.setState({
               message_error : "block"
           })
          //  //////console.log("blank input");

       }
       else{
          socket.emit('add_operation_dock_conversation', conv_param);
          socket.on('add_operation_dock_conversation_response', (data)=>{
                // //////console.log('inside add_operation_dock_conversation_response =============',data);

                if(data.data.status==true){
                    this.setState({
                        message_data : "",
                        message_error : "none"
                    })
                    this.get_single_operation_dock(this.state.operation_dock_id)
                }
                else{
                    // //////console.log("nooooooo");
                }

          })
       }


    }

    multiple_files_uploaded=(event)=>{
      // //////console.log("llllllllllll");
      // //////console.log(event.target.files)
      this.upload_document_conv_dock(event.target.files)
    }

    upload_document_conv_dock = (files) => {
      const { settings, addToast } = this.props;

      const usercookies = Cookies.get('usercookies');
         var date = new Date();
          // //////console.log("date",date);
          var dd = String(date.getDate()).padStart(2, '0');
          var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
          var months=toMonthName(mm)
          // //////console.log("my_date",months);
          var yyyy = date.getFullYear();
          var hours = date.getHours();
          const time = new Date().toLocaleString([], { hour: 'numeric', minute: 'numeric' });
          // //////console.log("timetime",time);
          var am_pm = (hours >= 12) ? "PM" : "AM";
          if(hours >= 12){
              hours -=12;
          }
          var my_new_date = dd + ' ' + months + ' ' + yyyy + ' ' + time +" "+ am_pm;
          // //////console.log("my_new_date",my_new_date);

         var conversation_array =this.state.conversation_array
        //  //////console.log("conversation_array",conversation_array);




      var fd = new FormData();
      // //////console.log("files************************", files);

       for (let i = 0; i < files.length; i++) {
        fd.append('file',files[i]);
         }


       fd.append('operation_dock_id', this.state.operation_dock_id);
       fd.append('message', "");
       fd.append('from_id', usercookies);
       fd.append('to_id', this.state.sm_id);
       fd.append('date_time', my_new_date);
       fd.append('message_id',conversation_array.length + 1);
       fd.append('message_from',"oe_to_sm");
      // //////console.log(...fd, "uplarde_filesss")
      const res = fetch(settings.api_url + "upload_document_conv_dock", {
          method: 'POST',
          body: fd
      })
          .then((response) => response.json())
          .then(json => {
            // //////console.log("Upload Message Files Response**************************************", {response: json })
            var data = json;
            if (data.status == true) {
              addToast({
                title: 'Ask my operation',
                content: data["message"],
                duration: 1000,
              });
              this.get_single_operation_dock(this.state.operation_dock_id)
            }
            else {
              // //////console.log("something wrong");
              addToast({
                title: 'Ask my operation',
                content: data["message"],
                duration: 1000,
              });
            }


          })
  }

validation_forms=()=>{



  ////console.log("Validationn");
  if (
    // Section 1
  this.state.policy_number=="" || this.state.policy_number ==undefined||
  this.state.rto_cluster=="" || this.state.rto_cluster ==undefined||
  this.state.vehicle_number=="" || this.state.vehicle_number ==undefined||
  this.state.rto_location=="" || this.state.rto_location ==undefined||
  this.state.new_start_date=="" || this.state.new_start_date ==undefined||
  this.state.new_end_date=="" || this.state.new_end_date ==undefined||
  this.state.issue_date=="" || this.state.issue_date ==undefined||
  this.state.customer_name=="" || this.state.customer_name ==undefined||
  this.state.fleet_type=="" || this.state.fleet_type ==undefined||
  this.state.motor_type=="" || this.state.motor_type ==undefined||

  // Section 3
  // this.state.type_of_policy=="" || this.state.type_of_policy ==undefined||
  this.state.make=="" || this.state.make ==undefined||
  this.state.model=="" || this.state.model ==undefined||
  this.state.cc_gvw_pcc=="" || this.state.cc_gvw_pcc ==undefined||
  this.state.gvw_category=="" || this.state.gvw_category ==undefined||
  this.state.ncb_type=="" || this.state.ncb_type ==undefined||
  this.state.insurer_array_new=="" || this.state.insurer_array_new ==undefined||
  this.state.add_on_type=="" || this.state.add_on_type ==undefined||
  this.state.fuel_type=="" || this.state.fuel_type ==undefined||
  this.state.insurer_array_new=="" || this.state.insurer_array_new ==undefined ||
  this.state.net_premium=="" || this.state.net_premium ==undefined||
  this.state.amount_receivable=="" || this.state.amount_receivable ==undefined||
  this.state.po_on_type=="" || this.state.po_on_type ==undefined||
  this.state.type_of_payout=="" || this.state.type_of_payout ==undefined||
  this.state.agent_or_tellcalling=="" || this.state.agent_or_tellcalling ==undefined||
  this.state.mode_of_premium_received=="" || this.state.mode_of_premium_received ==undefined||

  // Section 6
  this.state.po_discount_in_percent=="" || this.state.po_discount_in_percent ==undefined||
  this.state.po_discount_amount=="" || this.state.po_discount_amount ==undefined||
  this.state.po_discount_status=="" || this.state.po_discount_status ==undefined

  // Section 7
  // this.state.mode_of_premium_payment=="" || this.state.mode_of_premium_payment ==undefined
   ) {
  this.setState({
    error_message_forms:"block",
    borderNew:true
  })
}

else if (this.state.insurer_paid_type=="Pre-Paid") {
  if (this.state.policy_array=="" || this.state.policy_array== undefined) {
    this.setState({
      error_message_forms:"block",
      borderNew:true
    })
  }
  else{
    this.setState({
      error_message_forms:"none",
      borderNew:false
    })
    this.save_forms()
  }
}
else if (this.state.motor_type_data=="Motor") {
  ////console.log("yessssss");
  if (this.state.type_of_motor=="" || this.state.type_of_motor== undefined) {
    ////console.log("Wrong Data&&&&&&&&&&&&&&&&&&&&&&&&&&");
    this.setState({
      error_message_forms:"block",
      borderNew:true
    })
  }
  else{
    ////console.log("Good Data &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
    this.setState({
      error_message_forms:"none",
      borderNew:false
    })
    this.save_forms()
  }
}
else{
  ////console.log("Nooooooo******************************");
  this.save_forms()
}

}


fetch_single_cheque = () => {
  const {settings } = this.props;

  for (let i = 0; i < this.state.policy_array.length; i++) {
    const element = this.state.policy_array[i];
    var cheque_id = this.state.policy_array[i].cheque_id



    const params = {
      cheque_id: cheque_id
    }
  ////console.log("cheque_id*******************",params);
    const res = fetch(settings.api_url +"fetch_single_cheque", {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    })
        .then((response) => response.json())
        .then(json => {
            var data = json;
          ////console.log("fetch Single Cheque ****&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&", json)
            if (data.status == true) {
              var balance_amount = data.data[0].balance_amount
              ////console.log("balance_amount*************",balance_amount);
              ////console.log("policy_array*************",this.state.policy_array);

              if (balance_amount <= 0) {
                ////console.log("balance_amount***************************",balance_amount >= 0);

                this.setState({
                  delete_button_show:true,
                  change_check:"block",
                  cheque_id_new:data.data[0]._id
                })
              }
              else{
                ////console.log("@@@@@@@@@@@@@@@@@@@@@@@***************************",balance_amount >= 0);
                this.setState({
                  delete_button_show:false,
                  change_check:"none",
                  cheque_id_new:""
                })
              }

              // this.fetch_cheque_for_policy(data.data[0].insurer_details[0]._id)


            }
            else {

            }
        });



  }


}




save_forms =()=>{
  ////console.log("Save Forms");
  const {
      addToast,settings
  } = this.props;



  if (this.state.po_discount_amount=="") {
    var po_discount_amount = 0
  }
  else{
    var po_discount_amount = this.state.po_discount_amount
  }

  if (this.state.insurer_paid_type== "Pre-Paid") {
    var cheque_array = this.state.policy_array
  }else{
    var cheque_array = []
  }

  if (this.state.document_data.length == 0) {
    var document=[]
  }else{
    var document=this.state.document_data
    let res = document.forEach(
      ({document_image,document_type,file_name}, idx, arr) => arr[idx] = ({document_image,document_type,file_name})
  );
  //console.log(document);
  }


  if (this.state.new_cheque_date == "" || this.state.new_cheque_date == undefined) {
    var new_cheque_date_new = ""
  }
  else{
    var  new_cheque_date_new = new Date(this.state.new_cheque_date)
    new_cheque_date_new.setDate(new_cheque_date_new.getDate() + 1)

    var cheque_date_new = new_cheque_date_new.toISOString()
  }
  console.log("this.state.customer_payment_array",this.state.customer_payment_array);

  if (this.state.customer_payment_array == undefined) {
    console.log("customer_payment_array",this.state.customer_payment_array);
  }else{
    if (this.state.customer_payment_array.length == 0) {
      console.log("lllllllllllllllllll");
      var customer_payment_attachment = []
    }else{

      var customer_payment_attachment = this.state.customer_payment_array

      for (let i = 0; i < customer_payment_attachment.length; i++) {
        var image_type= customer_payment_attachment[i].file_name.split('pdf/');
         customer_payment_attachment[i].file_name=image_type[1]
         ////////console.log("element",element);
       }
    }
  }





    // var issed_date = this.state.isue_date
    var  issed_date_new = new Date(this.state.issue_date)
    issed_date_new.setDate(issed_date_new.getDate() + 1)

    var  new_start_date = new Date(this.state.new_start_date)
    new_start_date.setDate(new_start_date.getDate() + 1)

    var  new_end_date = new Date(this.state.new_end_date)
    new_end_date.setDate(new_end_date.getDate() + 1)

    var section_details = [{

      // ********* section 1
    policy_number:this.state.policy_number,
    rto_cluster:this.state.rto_cluster,
    vehicle_number:this.state.vehicle_number,
    rto_location:this.state.rto_location,
    contact_no:this.state.contact_no,
    new_start_date:new_start_date.toISOString(),
    new_end_date:new_end_date.toISOString(),
    issue_date:issed_date_new.toISOString(),
    customer_name:this.state.customer_name,
    fleet_type:this.state.fleet_type.label,
    motor_non_motor:this.state.motor_type,
    type_of_motor:this.state.type_of_motor,
    private_car_data:this.state.private_car_data,
    two_wheeler:this.state.two_wheeler,
    comercial_data:this.state.comercial_data,
    miscd_data:this.state.miscd_data,
    pvc_type:this.state.pvc_type,
    gcv_data:this.state.gcv_data,
    pvc_capacity:this.state.pvc_capacity_new,
    liabilty_or_comprehensive:this.state.liabilty_or_comprehensive,
    // class_of_vehicle:this.state.class_of_vehicle,
    // sub_class_of_vehicle:this.state.sub_class_of_vehicle,

    // *********** section 2
    type_of_mis_d:this.state.type_of_mis_d,

    // *********** section 3
    type_of_policy:this.state.type_of_policy,
    make:this.state.make,
    model:this.state.model,
    cc_gvw_pcc:this.state.cc_gvw_pcc,
    gvw_category:this.state.gvw_category,
    ncb_type:this.state.ncb_type,
    add_on_type:this.state.add_on_type.label,
    fuel_type:this.state.fuel_type,
    insurer_array_new:this.state.insurer_array_new,
    od_amount:this.state.od_amount,
    addon_amount:this.state.addon_amount,
    addon_premium:this.state.addon_premium,
    net_premium:this.state.net_premium,
    gross_premium:this.state.gross_premium,
    amount_receivable:this.state.amount_receivable,
    mode_of_premium_received:this.state.mode_of_premium_received,
    po_on_type:this.state.po_on_type,
    agent_or_tellcalling:this.state.agent_or_tellcalling,
    type_of_payout:this.state.type_of_payout,
    payment_from_customer:this.state.payment_from_customer,
    customer_payment_attachment : customer_payment_attachment,

    // *********** section 4
    tele_caller_name:this.state.tele_caller_name,

    // *********** section 5
    agent_dealer_name:this.state.agent_dealer_name,
    direct_name:this.state.direct_name,

    // *********** section 6

    po_discount_in_percent:this.state.po_discount_in_percent,
    po_discount_amount:po_discount_amount,
    po_discount_status:this.state.po_discount_status.label,

    // *********** section 7
    mode_of_premium_payment:this.state.mode_of_premium_payment,

    // *********** section 8
    physical_cheque_received:this.state.physical_cheque_received.label,
    cheque_no:this.state.cheque_no,
    cheque_amount_received:this.state.cheque_amount_received,
    new_cheque_date:cheque_date_new,
    bank_name:this.state.bank_name,
    customer_cheque_status:"",

    // *********** section 9
    insurer_paid_type:this.state.insurer_paid_type,
    cheque_array:cheque_array,

    // *********** section 10
    policy_remarks:this.state.policy_remarks,
}]
//console.log("section_details************================",section_details);
//console.log("minute************================",this.state.minute);
//console.log("second************================",this.state.second);

if (this.state.minute < 10) {
  var min = "0"+this.state.minute
}else{
  var min = this.state.minute
}

if (this.state.second < 10) {
  var sec = "0"+this.state.second
}else{
  var sec = this.state.second
}

var total_forms_cal = min+ ":" + sec


if (this.state.agent_or_tellcalling_label == "Agent/Dealer") {
  var sourced_by_detail = this.state.agent_dealer_name
}else{
  var sourced_by_detail = this.state.tele_caller_name
}

// this.state.minute < 10 ? "0"+this.state.minute : this.state.minute} : {this.state.second < 10 ? "0"+this.state.second : this.state.second
  var params = {
    operation_dock_id: this.state.operation_dock_id,
    section_details:section_details,
    policy_paid_type:this.state.insurer_paid_type,
    cheque_array:cheque_array,
    form_filling_start_time:this.state.form_start_time.toISOString(),
    calculated_form_filling_time:total_forms_cal,
    mis_user_id:this.state.added_by,
    sourced_by_detail:sourced_by_detail
  }
   console.log("params*************",params);
      const res = fetch(settings.api_url + "add_section_details", {
          method: 'POST',
          body: JSON.stringify(params),
          headers: {
              "Content-type": "application/json; charset=UTF-8",
          }
      }).then((response) => response.json())
          .then(json => {
              ////console.log("Add Formss **************************************", { params: params, response: json })
              var data = json;
              if (data.status == true) {
                this.setState({
                  modalOpen:false,
                  minute: 0,
                  second: 0,
                  form_filling_time:"",
                })
                  addToast({
                      title: 'Book my Insurance',
                      content: data["message"],
                      time: new Date(),
                      duration: 1000,
                  });
                  this.get_operation_dock()
                  // this.get_single_operation_dock(this.state.operation_dock_id)
              }
              else {
                this.setState({
                  modalOpen:false
                })
                this.please_stopTimer()
                  addToast({
                      title: 'Book my Insurance',
                      content: data["message"],
                      time: new Date(),
                      duration: 1000,
                  });
              }
          })
}




      update_section_details =()=>{
        ////console.log("Save Forms");
        ////console.log("section_data",this.state.section_type_for_edit);
        ////console.log("section_data",this.state.agent_delete_section);
        ////console.log("section_type_new",this.state.section_type_new_new);
        const {
            addToast,settings
        } = this.props;
        if (this.state.po_discount_amount=="") {
          var po_discount_amount = 0
        }
        else{
          var po_discount_amount = this.state.po_discount_amount
        }

        if (this.state.section_type_for_edit=="2_section") {
          var type_of_mis_d = this.state.type_of_mis_d
        }
        else{
          var type_of_mis_d = ""
        }
        // if (this.state.section_type_for_edit=="3_section" || this.state.section_type_for_edit=="2_section") {
           var type_of_policy = this.state.type_of_policy
           var make = this.state.make
           var model = this.state.model
           var cc_gvw_pcc = this.state.cc_gvw_pcc
           var ncb_type = this.state.ncb_type
           var add_on_type = this.state.add_on_type
           var fuel_type = this.state.fuel_type
           var insurer_array_new = this.state.insurer_array_new
           var addon_premium = this.state.addon_premium
           var net_premium = this.state.net_premium
           var gross_premium = this.state.gross_premium
           var amount_receivable = this.state.amount_receivable
           var po_on_type = this.state.po_on_type
           var agent_or_tellcalling = this.state.agent_or_tellcalling
           var type_of_payout  = this.state.type_of_payout
        // }
            // else{
            // var type_of_policy =""
            // var make =""
            // var model =""
            // var cc_gvw_pcc =""
            // var ncb_type =""
            // var add_on_type =""
            // var fuel_type =""
            // var insurer_array_new =""
            // var addon_premium =""
            // var net_premium =""
            // var gross_premium =""
            // var amount_receivable =""
            // var po_on_type =""
            // var agent_or_tellcalling =""
            // var type_of_payout =""
            // }

            if (this.state.agent_delete_section=="4_section") {
              var tele_caller_name=this.state.tele_caller_name
            }
            else{
              var tele_caller_name=""
            }

            if (this.state.agent_delete_section=="5_section") {
              var agent_dealer_name=this.state.agent_dealer_name
            }
            else{
              var agent_dealer_name=""
            }


            if (this.state.section_type_new_new=="8_section"  || this.state.cheque_to_sc == "Cheque to SC") {
              if (this.state.new_cheque_date=="") {
                var che_date = ""
              }
              else{
                var che_date = this.state.new_cheque_date.toISOString()
              }
              var physical_cheque_received=this.state.physical_cheque_received
              var cheque_no=this.state.cheque_no
              var cheque_amount_received=this.state.cheque_amount_received
              var new_cheque_date=che_date
              var bank_name=this.state.bank_name
            }
            else{
              var physical_cheque_received=""
              var cheque_no=""
              var cheque_amount_received=""
              var new_cheque_date=""
              var bank_name=""
            }

            if (this.state.section_type_new_new=="9_section") {
              var cheque_no_1=this.state.cheque_no_1
              var cheque_no_1_amount=this.state.cheque_no_1_amount
              var cheque_no_2=this.state.cheque_no_2
              var cheque_no_2_amount=this.state.cheque_no_2_amount
              var cheque_no_3=this.state.cheque_no_3
              var cheque_no_3_amount=this.state.cheque_no_3_amount
            }
            else{
              var cheque_no_1=""
              var cheque_no_1_amount=""
              var cheque_no_2=""
              var cheque_no_2_amount=""
              var cheque_no_3=""
              var cheque_no_3_amount=""
            }

            if (this.state.motor_type_data_edit == "Non Motor") {
              var type_of_motor = undefined
              var private_car_data = undefined
              var two_wheeler = undefined
              var comercial_data = undefined
              var pvc_type = undefined
              var gcv_data = undefined
              var pvc_capacity = undefined
              var miscd_data = undefined
            }
            else{
              if ( this.state.type_of_motor_data_edit=="MISC D") {
                var private_car_data = undefined
                var two_wheeler = undefined
                var comercial_data = undefined
                var pvc_type = undefined
                var gcv_data = undefined
                var pvc_capacity = undefined
                var miscd_data = this.state.miscd_data
                var type_of_motor = this.state.type_of_motor
              }
              else if (this.state.type_of_motor_data_edit=="Private car") {
                var private_car_data = this.state.private_car_data
                var two_wheeler = undefined
                var comercial_data = undefined
                var pvc_type = undefined
                var gcv_data = undefined
                var pvc_capacity = undefined
                var miscd_data = undefined
                var type_of_motor = this.state.type_of_motor
              }
              else if (this.state.type_of_motor_data_edit=="Two Wheeler") {
                var private_car_data = undefined
                var two_wheeler = this.state.two_wheeler
                var comercial_data = undefined
                var pvc_type = undefined
                var gcv_data = undefined
                var pvc_capacity = undefined
                var miscd_data = undefined
                var type_of_motor = this.state.type_of_motor
              }
              else if (this.state.type_of_motor_data_edit=="Commercial") {
                if (this.state.comercial_label_edit == "GCV") {
                  var private_car_data = undefined
                  var two_wheeler = undefined
                  var comercial_data = this.state.comercial_data
                  var pvc_type = undefined
                  var gcv_data =this.state.gcv_data
                  var pvc_capacity = undefined
                  var miscd_data = undefined
                  var type_of_motor = this.state.type_of_motor
                }
                else{
                  var private_car_data = undefined
                  var two_wheeler = undefined
                  var comercial_data = this.state.comercial_data
                  var pvc_type = this.state.pvc_type
                  var gcv_data =undefined
                  var pvc_capacity = this.state.pvc_capacity_new
                  var miscd_data = undefined
                  var type_of_motor = this.state.type_of_motor
                }

              }
            }


            if (this.state.pending_payout_details == undefined) {
              var pending_payout_details = undefined
            }
            else{
              var pending_payout_details = this.state.pending_payout_details
            }
            if (this.state.pending_payment_details == undefined) {
              var pending_payment_details = undefined
            }
            else{
              var pending_payment_details = this.state.pending_payment_details
            }

            if (this.state.customer_payment_array == undefined) {

            }else{
              if (this.state.customer_payment_array.length == 0) {
                console.log("lllllllllllllllllll");
                var customer_payment_attachment = []
              }else{
                console.log("customer_payment_array$$$$$$$$$$$$",this.state.customer_payment_array);
                var customer_payment_attachment = this.state.customer_payment_array

                for (let i = 0; i < customer_payment_attachment.length; i++) {
                  var image_type= customer_payment_attachment[i].file_name.split('pdf/');
                   customer_payment_attachment[i].file_name=image_type[1]
                   ////////console.log("element",element);
                 }
              }
            }



          var section_details = [{
// ******************   1st Section    ******************************************************************
          policy_number:this.state.policy_number,
          rto_cluster:this.state.rto_cluster,
          vehicle_number:this.state.vehicle_number,
          rto_location:this.state.rto_location,
          contact_no:this.state.contact_no,
          new_start_date:this.state.new_start_date.toISOString(),
          new_end_date:this.state.new_end_date.toISOString(),
          issue_date:this.state.issue_date.toISOString(),
          customer_name:this.state.customer_name,
          fleet_type:this.state.fleet_type.label,

          motor_non_motor:this.state.motor_type,
          type_of_motor:type_of_motor,
          private_car_data:private_car_data,
          two_wheeler:two_wheeler,
          comercial_data:comercial_data,
          miscd_data:miscd_data,
          pvc_type:pvc_type,
          gcv_data:gcv_data,
          pvc_capacity:pvc_capacity,
          liabilty_or_comprehensive:this.state.liabilty_or_comprehensive,



          // class_of_vehicle:this.state.class_of_vehicle,
          // sub_class_of_vehicle:this.state.sub_class_of_vehicle,

// ******************   2nd Section    ******************************************************************
          type_of_mis_d:type_of_mis_d,
// ******************   3rd Section    ******************************************************************
          type_of_policy:type_of_policy,
          make:make,
          model:model,
          cc_gvw_pcc:cc_gvw_pcc,
          gvw_category:this.state.gvw_category,
          ncb_type:ncb_type,
          add_on_type:add_on_type.label,
          fuel_type:fuel_type,
          insurer_array_new:insurer_array_new,
          od_amount:this.state.od_amount,
          addon_amount:this.state.addon_amount,
          addon_premium:addon_premium,
          net_premium:net_premium,
          gross_premium:gross_premium,
          amount_receivable:amount_receivable,
          po_on_type:po_on_type,
          // po_on_type:po_on_type.label,
          agent_or_tellcalling:agent_or_tellcalling,
          type_of_payout:type_of_payout,
          mode_of_premium_received:this.state.mode_of_premium_received,
          payment_from_customer:this.state.payment_from_customer,
          attachment : this.state.document_data_data,
          customer_payment_attachment:customer_payment_attachment,
// ******************   4th Section    ******************************************************************
          tele_caller_name:tele_caller_name,
// ******************   5th Section    ******************************************************************
          agent_dealer_name:agent_dealer_name,

// ******************   6th Section    ******************************************************************
          po_discount_in_percent:this.state.po_discount_in_percent,
          po_discount_amount:po_discount_amount,
          po_discount_status:this.state.po_discount_status.label,

// ******************   7th Section    ******************************************************************
          mode_of_premium_payment:this.state.mode_of_premium_payment,

// ******************   8th Section    ******************************************************************
          physical_cheque_received:physical_cheque_received.label,
          cheque_no:cheque_no,
          cheque_amount_received:cheque_amount_received,
          new_cheque_date: new_cheque_date,
          bank_name:bank_name,



// ******************   9th Section    ******************************************************************
          insurer_paid_type:this.state.insurer_paid_type,
          cheque_array:this.state.policy_array_new,

// ******************   10th Section    ******************************************************************
          policy_remarks:this.state.policy_remarks,

// ******************   11th Section    ******************************************************************
      pending_payout_details:pending_payout_details,
      pending_payment_details:pending_payment_details,
      customer_cheque_status:this.state.customer_cheque_status,
      }]
      ////console.log("section_details************===============",section_details);
        var params = {
          added_by:this.state.added_by,
          operation_dock_id: this.state.operation_dock_id,
          section_details:section_details
        }
        console.log("params*************",params);
            const res = fetch(settings.api_url + "update_section_details", {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }).then((response) => response.json())
                .then(json => {
                    ////console.log("Edit Formss **************************************", { params: params, response: json })
                    var data = json;
                    if (data.status == true) {
                      this.setState({
                        modalOpen:false
                      })
                        addToast({
                            title: 'Book my Insurance',
                            content: data["message"],
                            time: new Date(),
                            duration: 1000,
                        });
                        this.get_single_operation_dock(this.state.operation_dock_id)
                    }
                    else {
                      this.setState({
                        modalOpen:false
                      })
                        addToast({
                            title: 'Book my Insurance',
                            content: data["message"],
                            time: new Date(),
                            duration: 1000,
                        });
                    }
                })
      }


      fetch_update_section_details=()=>{
        const {
          addToast,settings
      } = this.props;
        var params = {
          operation_dock_id: this.state.operation_dock_id,
        }
      ////console.log("params*************",params);
            const res = fetch(settings.api_url + "fetch_update_section_details", {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }).then((response) => response.json())
                .then(json => {
                    ////console.log("Fetch Edit Logs Of Forms **************************************", { params: params, response: json })
                    var data = json;
                    if (data.status == true) {
                      this.setState({
                        update_section_details_array:data.data,
                        show_edit_logs:"block"
                      })
                    }
                    else {
                      this.setState({
                        update_section_details_array:[],
                        show_edit_logs:"none"
                      })

                    }
                })
      }
      switch_edit_log_btn=()=>{
        if (this.state.show_edit_logs=="none") {
          this.fetch_update_section_details()
        }
        else{
          this.current_logs()
        }
      }

      close_chat_data=()=>{
        if (this.state.chart_box_open=="none") {
          this.setState({
            chart_box_open:"block",
            chat_button:"Close Form"
          })
        }else{
          this.setState({
            chart_box_open:"none",
            chat_button:"Open Form"
          })
        }
      }

      current_logs=()=>{
        this.setState({
          show_edit_logs:"none",
        })
      }

      fetch_all_insurer = ()=>  {
        const { settings } = this.props;
         const res = fetch(settings.api_url + "fetch_all_insurer", {
             method: 'POST',
             headers: {
                 "Content-type": "application/json; charset=UTF-8",
             }
         }).then((response) => response.json())
             .then(json => {
                //  ////console.log("fetch Inurer ****", json)
                 var data = json;
                 if (data.status == true) {
                     this.setState({
                         insurer_array: data.data,
                     });
                 }
                 else {
                     this.setState({
                         insurer_array: [],

                     });
                 }
             })
     }
      fetch_agent = ()=>  {
        const { settings } = this.props;
        //console.log("policy_added_by_new***************",this.state.policy_added_by_new);
        if (this.state.policy_added_by_new=="Direct" || this.state.policy_added_by_new=="SM") {
          var type = "agent"
        }else{
          var type = "telecaller"
        }

        var params={
          type:type
        }
        console.log("params******************************************5%%%%%%%%%%%%%",params);
         const res = fetch(settings.api_url + "fetch_agent_dropdown", {
             method: 'POST',
             body: JSON.stringify(params),
             headers: {
                 "Content-type": "application/json; charset=UTF-8",
             }
         }).then((response) => response.json())
             .then(json => {
                //  ////console.log("fetch Agent ****", json)
                 var data = json;
                 if (data.status == true) {
                     this.setState({
                         agent_array: data.data,
                     });
                 }
                 else {
                     this.setState({
                         agent_array: [],

                     });
                 }
             })
     }

     fetch_cheque_for_policy = (company_id)=>  {
      const { settings } = this.props;
      var params = {
        company_id:company_id,
      }
      // console.log("check_data INSURUEEEEEEEE***************************************************",params);
       const res = fetch(settings.api_url + "fetch_cheque_for_policy", {
           method: 'POST',
           body: JSON.stringify(params),
           headers: {
               "Content-type": "application/json; charset=UTF-8",
           }
       }).then((response) => response.json())
           .then(json => {
            //console.log("fetch Cheque************* ****============", json)
               var data = json;
               if (data.status == true) {
                   this.setState({
                       cheque_array: data.data,
                   });
               }
               else {
                   this.setState({
                       cheque_array: [],
                   });
               }
           })
   }

   delete_cheque_array=(value)=>{


    var policy_array = this.state.policy_array.filter(n => n !== value);
    // var policy_array = this.state.file_array.filter(n => n !== value2);
    this.setState({
      policy_array: policy_array,
    })
    //////console.log("policy_array",policy_array);
    ////console.log("policy_array******",this.state.policy_array);
   }

   cheque_switch_function=()=>{
     if (this.state.mode_of_premium_label=="Customer Cheque + Float") {
       this.new_show_function()
     }
     else{
      this.show_amount_function()
     }
   }
   new_cheque_data=(cheque_amount_received)=>{
     //////console.log("cheque_amount_received",cheque_amount_received);
     //////console.log("policy_amount",this.state.policy_amount);
     //////console.log("policy_blanace_amount",this.state.policy_blanace_amount);
     var policy_amount = Number(this.state.policy_amount)
     var cheque_amount_received = Number(cheque_amount_received)
     //////console.log("new_amount",new_policy_amount);
        if (policy_amount < cheque_amount_received) {
          //////console.log("GRETERRR");
          var erroe_data = "block"
        }
        else{
          //////console.log("NOTTT   GRETERRR");
          var erroe_data = "none"
        }
     this.setState({
      setError:erroe_data
     })
   }
   cheque_amount_received_data=(cheque_amount_received)=>{
     //////console.log("cheque_amount_received",cheque_amount_received);
     //////console.log("policy_amount",this.state.policy_amount);
     //////console.log("policy_blanace_amount",this.state.policy_blanace_amount);
     var policy_amount = Number(this.state.policy_amount)
     var cheque_amount_received = Number(cheque_amount_received)
     var new_policy_amount = policy_amount - cheque_amount_received
     //////console.log("new_amount",new_policy_amount);
        if (policy_amount < cheque_amount_received) {
          //////console.log("GRETERRR");
          var erroe_data = "block"
        }
        else{
          //////console.log("NOTTT   GRETERRR");
          var erroe_data = "none"
        }
     this.setState({
      policy_blanace_amount:new_policy_amount,
      customer_policy_amount:new_policy_amount,
      setError:erroe_data
     })
   }
   new_show_function=()=>{
     //////console.log("cheque_amount_received",this.state.cheque_amount_received);
     //////console.log("balance_amount",this.state.balance_amount);
     //////console.log("policy_amount",this.state.policy_amount);
     //////console.log("policy_blanace_amount",this.state.policy_blanace_amount);
     //////console.log("cheque_no_1",this.state.cheque_no_1);
     //////console.log("policy_array",this.state.policy_array.length);

    //  var policy_amount = Number(this.state.policy_amount)
    //  var cheque_amount_received = Number(this.state.cheque_amount_received)
    //  var new_policy_amount = policy_amount - cheque_amount_received
    //  //////console.log("new_amount",new_policy_amount);

     this.setState({
      setdisss:true
     })
          //  this.calculation_policy_amount()
           setTimeout(() => {
             //////console.log("policy_amount",this.state.policy_amount);
            this.calculation_policy_amount()
            }, 600)
   }



    calculation_policy_amount=()=>{

      //////console.log("NEW Calculation********");


      if (this.state.balance_amount > this.state.policy_amount && this.state.policy_amount==this.state.policy_blanace_amount) {
        var new_balance_amount = 0
        var balance_amount=this.state.policy_amount
        var my_new_array={cheque_id:this.state.cheque_id,policy_amount:balance_amount,cheque_object:this.state.cheque_no_1}
          //////console.log("my_new_array*************",my_new_array);
          var cheque_array = this.state.policy_array
          cheque_array.push(my_new_array)
          //////console.log("my_arrayyyyyyyyyyyy",cheque_array);

             if (new_balance_amount==0) {
                  var message=""
                }
                else{
                  var message="Please select another cheque for remaining amount Rs." + balance_amount
                }


        this.setState({
          cheque_no_1_amount:"",
          cheque_no_1:"",
          policy_blanace_amount:new_balance_amount,
          AlertDeleteSingle:false,
          policy_array:cheque_array,
          remaining_message:message,

         })
        //////console.log("khu**********************************");
       }else if (this.state.balance_amount < this.state.policy_amount) {

        if(this.state.customer_policy_amount == 0){
          var new_balance_amount = Number(this.state.policy_blanace_amount)-Number(this.state.balance_amount)
         //////console.log("new_balance_amount*************",new_balance_amount);

         var my_new_array={cheque_id:this.state.cheque_id,policy_amount:this.state.balance_amount,cheque_object:this.state.cheque_no_1}
         //////console.log("my_new_array*************",my_new_array);
         var cheque_array = this.state.policy_array
         cheque_array.push(my_new_array)
         //////console.log("cheque_array************************",cheque_array);

         if (new_balance_amount==0) {
          var message=""
          }
          else{
            var message="Please select another cheque for remaining amount Rs. " + new_balance_amount
          }


         this.setState({
          policy_blanace_amount:new_balance_amount,
          AlertDeleteSingle:false,
          policy_array:cheque_array,
          cheque_no_1_amount:"",
          cheque_no_1:"",
          remaining_message:message,

         })
         //////console.log("CBA < PA ******************");
        }else{

          //////console.log("policy_blanace_amount =============",this.state.policy_blanace_amount);
          //////console.log("balance_amount =============",this.state.balance_amount);
          //////console.log("customer_policy_amount =============",this.state.customer_policy_amount);
          var new_balance_amount = Number(this.state.customer_policy_amount)-Number(this.state.balance_amount)

         //////console.log("new_balance_amount*************",new_balance_amount);

         var my_new_array={cheque_id:this.state.cheque_id,policy_amount:this.state.balance_amount,cheque_object:this.state.cheque_no_1}
         //////console.log("my_new_array*************",my_new_array);
         var cheque_array = this.state.policy_array
         cheque_array.push(my_new_array)
         //////console.log("cheque_array************************",cheque_array);

         if (new_balance_amount==0) {
          var message=""
          }
          else{
            var message="Please select another cheque for remaining amount Rs. " + new_balance_amount
          }


         this.setState({
          customer_policy_amount:new_balance_amount,
          policy_blanace_amount:new_balance_amount,
          AlertDeleteSingle:false,
          policy_array:cheque_array,
          cheque_no_1_amount:"",
          cheque_no_1:"",
          remaining_message:message,

         })
         //////console.log("CBA < PA ******************");
        }

       }else if (this.state.balance_amount > this.state.policy_amount && this.state.policy_amount !==this.state.policy_blanace_amount) {
        var new_balance_amount = 0
        var balance_amount = 0

        var my_new_array={cheque_id:this.state.cheque_id,policy_amount:this.state.policy_blanace_amount,cheque_object:this.state.cheque_no_1}
        //////console.log("my_new_array*************",my_new_array);
        var cheque_array = this.state.policy_array
        cheque_array.push(my_new_array)
        //////console.log("cheque_array************************",cheque_array);


        if (new_balance_amount==0) {
          var message=""
          }
          else{
            var message="Please select another cheque for remaining amount Rs. " + new_balance_amount
          }


        this.setState({
          policy_blanace_amount:new_balance_amount,
          AlertDeleteSingle:false,
          policy_array:cheque_array,
          cheque_no_1_amount:"",
          cheque_no_1:"",
          remaining_message:message,
         })
         //////console.log("PA !===BA");
       }
    }


   show_amount_function=()=>{
     //////console.log("balance_amount",this.state.balance_amount);
     //////console.log("policy_amount",this.state.policy_amount);
     //////console.log("policy_blanace_amount",this.state.policy_blanace_amount);
     //////console.log("cheque_no_1",this.state.cheque_no_1);

     if (this.state.balance_amount > this.state.policy_amount && this.state.policy_amount==this.state.policy_blanace_amount) {
      var new_balance_amount = 0
      var balance_amount=this.state.policy_amount
      var my_new_array={cheque_id:this.state.cheque_id,policy_amount:balance_amount,cheque_object:this.state.cheque_no_1}
        //////console.log("my_new_array*************",my_new_array);
        var cheque_array = this.state.policy_array
        cheque_array.push(my_new_array)
        //////console.log("cheque_array************************",cheque_array);

           if (new_balance_amount==0) {
                var message=""
              }
              else{
                var message="Please select another cheque for remaining amount Rs." + balance_amount
              }


      this.setState({
        cheque_no_1_amount:"",
        cheque_no_1:"",
        policy_blanace_amount:new_balance_amount,
        AlertDeleteSingle:false,
        policy_array:cheque_array,
        remaining_message:message,

       })
      //////console.log("khu**********************************");
     }else if (this.state.balance_amount < this.state.policy_amount) {
       var new_balance_amount = Number(this.state.policy_blanace_amount)-Number(this.state.balance_amount)
       //////console.log("new_balance_amount*************",new_balance_amount);

       var my_new_array={cheque_id:this.state.cheque_id,policy_amount:this.state.balance_amount,cheque_object:this.state.cheque_no_1}
       //////console.log("my_new_array*************",my_new_array);
       var cheque_array = this.state.policy_array
       cheque_array.push(my_new_array)
       //////console.log("cheque_array************************",cheque_array);

       if (new_balance_amount==0) {
        var message=""
        }
        else{
          var message="Please select another cheque for remaining amount Rs. " + new_balance_amount
        }


       this.setState({
        policy_blanace_amount:new_balance_amount,
        AlertDeleteSingle:false,
        policy_array:cheque_array,
        cheque_no_1_amount:"",
        cheque_no_1:"",
        remaining_message:message,

       })
       //////console.log("CBA < PA ******************");
     }else if (this.state.balance_amount > this.state.policy_amount && this.state.policy_amount !==this.state.policy_blanace_amount) {
      var new_balance_amount = 0
      var balance_amount = 0

      var my_new_array={cheque_id:this.state.cheque_id,policy_amount:this.state.policy_blanace_amount,cheque_object:this.state.cheque_no_1}
      //////console.log("my_new_array*************",my_new_array);
      var cheque_array = this.state.policy_array
      cheque_array.push(my_new_array)
      //////console.log("cheque_array************************",cheque_array);


      if (new_balance_amount==0) {
        var message=""
        }
        else{
          var message="Please select another cheque for remaining amount Rs. " + new_balance_amount
        }


      this.setState({
        policy_blanace_amount:new_balance_amount,
        AlertDeleteSingle:false,
        policy_array:cheque_array,
        cheque_no_1_amount:"",
        cheque_no_1:"",
        remaining_message:message,
       })
       //////console.log("PA !===BA");
     }



        // if (this.state.balance_amount>=this.state.policy_amount && this.state.policy_amount==this.state.policy_blanace_amount) {
        //   var balance_amount=this.state.policy_amount
        //   var my_new_array={cheque_id:this.state.cheque_id,policy_amount:balance_amount}
        //   //////console.log("my_new_array*************",my_new_array);
        //   var tttt = this.state.policy_array
        //   tttt.push(my_new_array)
        //   //////console.log("jjjjjjjjjjjjjjjjjjjjj",tttt);
        //   //////console.log("77777777777777777777777777",tttt.length);
        //   this.setState({
        //     cheque_no_1_amount:balance_amount,
        //     added_count:0,
        //     policy_array:my_new_array,
        //     AlertDeleteSingle:false,
        //     remaining_message:"",
        //     added_count:0,
        //     policy_blanace_amount:0
        //   })
        // }
        // else if (this.state.balance_amount<this.state.policy_amount) {

        //     var balance_amount = Number(this.state.policy_amount)-Number(this.state.balance_amount)
        //     //////console.log("balance_amount***************",balance_amount);
        //     if (balance_amount==0) {
        //       var message=""
        //     }
        //     else{
        //       var message="Please select another cheque for remaining amount " + balance_amount
        //     }
        //     var my_new_array={cheque_id:this.state.cheque_id,policy_amount:this.state.balance_amount}
        //     //////console.log("my_new_array*************",my_new_array);
        //     var tttt = this.state.policy_array
        //     tttt.push(my_new_array)
        //     var added_count =tttt.length+1
        //     //////console.log("added_count***********",added_count);
        //     this.setState({
        //       cheque_no_1_amount:this.state.balance_amount ,
        //       added_count:1,
        //       AlertDeleteSingle:false,
        //       remaining_message:message,
        //       policy_array:tttt,
        //       added_count:added_count,
        //       policy_blanace_amount:balance_amount
        //     })
        //     //////console.log("fgggggfffffffffffffffffffffffffffff",this.state.policy_array);
        //   }

        //   else if (this.state.balance_amount>this.state.policy_amount && this.state.policy_amount!=this.state.policy_blanace_amount ) {
        //     //////console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
        //     var balance_amount = Number(this.state.policy_blanace_amount)
        //     //////console.log("balance_amount***************",balance_amount);
        //     if (balance_amount==0) {
        //       var message=""
        //     }
        //     else{
        //       var message="Please select another cheque for remaining amount " + balance_amount
        //     }
        //     var my_new_array={cheque_id:this.state.cheque_id,policy_amount:balance_amount}
        //     //////console.log("my_new_array*************",my_new_array);
        //     var tttt = this.state.policy_array
        //     tttt.push(my_new_array)
        //     this.setState({
        //       cheque_no_2_amount:balance_amount,
        //       added_count_new:1,
        //       AlertDeleteSingle:false,
        //       remaining_message:message,
        //       policy_array:tttt,
        //       policy_blanace_amount:0
        //     })


        //     //////console.log("fgggggfffffffffffffffffffffffffffff",this.state.policy_array);
        //   }



   }



     adds_on_type = (adds_on_type)=>  {

       //console.log("adds_on_type",adds_on_type);

       if (adds_on_type.label == "Yes") {
         var po_on_type = "OD Premium"
         var net_premium_new = "disable"

         this.setState({
          net_premium:0,
          po_on_type:po_on_type
         })
       }
       else{
        var po_on_type ="Net Premium"
        var od_premium_new = "disable"
        this.setState({
          od_amount:0,
          addon_amount:0,
          addon_premium:0,
          po_on_type:po_on_type
         })
       }

       //console.log("",po_on_type);

       this.setState({
        po_on_type:po_on_type,
        net_premium_new:net_premium_new,
        od_premium_new:od_premium_new,
        po_dis_true:true
       })
     }


     od_plus_addons = (od_amount,addon_amount)=>  {
       var od_amount_new = Number(od_amount)
       var addon_amount_new = Number(addon_amount)
       var odd_plus = od_amount_new +  addon_amount_new
       //console.log("odd_plus======",odd_plus);
       this.setState({
        addon_premium:odd_plus
       })
     }

     new_total_amount_cal=(net_premium)=>{
      var net_premium = Number(net_premium)
      console.log("net_premium**************",net_premium);
      var po_discount_amount = Number(this.state.po_discount_amount)
      console.log("po_discount_amount**************",po_discount_amount);
      var po_on_type = this.state.po_on_type
      console.log("po_on_type**************",po_on_type);
      var addon_premium = Number(this.state.addon_premium)

      if (po_on_type.label == "Net Premium") {
        var po_dis_in_percent = (po_discount_amount*100)/net_premium
      }else{
        var po_dis_in_percent = (po_discount_amount*100)/addon_premium
      }

      console.log("po_dis_in_percent%%%%%%%%%%%%%%%%%%%",po_dis_in_percent);

      this.setState({
        po_discount_in_percent:po_dis_in_percent
      })
     }


     amount_calculation = (po_dis_in_percent)=>  {

      console.log("po_dis_in_percent*((((((((((((((",po_dis_in_percent);

      // if (po_dis_in_percent == "") {
      //   console.log("po_dis_in_percent blank");




      //   //console.log("po_amount=========",this.state.po_discount_amount);
      //  //////console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
      //  //////console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiiiiii",net_premium);
      //  //////console.log("addon_premium============",this.state.addon_premium);
      //  //////console.log("net_premium============",this.state.net_premium);
      //  //////console.log("gross_premium============",gross_premium);
      //  //////console.log("po_on_type============",po_on_type);
      //  //////console.log("type_of_payout============",type_of_payout);
      //  //////console.log("po_discount_in_percent============",po_dis_in_percent);
      // //  ////console.log("po_discount_amount============",this.state.po_discount_amount);

      //  var addon_premium = Number(this.state.addon_premium)
      //  //console.log("llllllllll",addon_premium);
      // //  var net_premium = Number(net_premium)
      //  var net_premium = Number(this.state.net_premium)
      //  var gross_premium = Number(this.state.gross_premium)
      //  var po_discount_amount = Number(this.state.po_discount_amount)
      // //  var gross_premium = Number(gross_premium)
      // //  var po_on_type = po_on_type
      //  var po_on_type = this.state.po_on_type
      // //  var type_of_payout = type_of_payout
      //  var type_of_payout = this.state.type_of_payout
      // //  var po_dis_in_percent = Number(po_dis_in_percent)

      //   console.log("po_discount_amount*************",po_discount_amount);

      //  if(po_on_type.label == "Net Premium"){
      //   //  if(po_on_type == "net_premium"){

      //     //  var po_discount_amount = (net_premium*po_dis_in_percent)/100
      //      var po_dis_in_percent = (po_discount_amount*100)/net_premium
      //    }else{

      //     //  var po_discount_amount = (addon_premium*po_dis_in_percent)/100
      //      var po_dis_in_percent = (po_discount_amount*100)/addon_premium
      //    }



      //  if (gross_premium=="") {

      //  }
      //  else{
      //   if(type_of_payout.label == "Cut Pay"){
      //     //////console.log("type_of_payout.label");
      //     var amount_receivable = gross_premium-po_discount_amount
      //     var po_discount_status = {
      //      value: "1",
      //      label: "Paid"
      //     }
      //    //  var po_discount_status = "paid"
      //   }else{
      //      var amount_receivable = gross_premium
      //      var po_discount_status = {
      //        value: "1",
      //        label: "Pending"
      //      }
      //      // var po_discount_status = "pending"
      //   }
      //  }


      //  this.setState({
      //   // amount_receivable:amount_receivable,
      //   po_discount_in_percent:po_dis_in_percent,
      //   // po_discount_status:po_discount_status,


      //   // po_discount_in_percent:new_po_dis_in_percent
      //   // po_discount_in_percent:po_dis_in_percent
      //  })








      // }else{



        console.log("po_dis_in_percent NOT blank");


        //console.log("po_amount=========",this.state.po_discount_amount);
       //////console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
       //////console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiiiiii",net_premium);
       //////console.log("addon_premium============",this.state.addon_premium);
       //////console.log("net_premium============",this.state.net_premium);
       //////console.log("gross_premium============",gross_premium);
       //////console.log("po_on_type============",po_on_type);
       //////console.log("type_of_payout============",type_of_payout);
       //////console.log("po_discount_in_percent============",po_dis_in_percent);
      //  ////console.log("po_discount_amount============",this.state.po_discount_amount);

       var addon_premium = Number(this.state.addon_premium)
       //console.log("llllllllll",addon_premium);
      //  var net_premium = Number(net_premium)
       var net_premium = Number(this.state.net_premium)
       var gross_premium = Number(this.state.gross_premium)
      //  var gross_premium = Number(gross_premium)
      //  var po_on_type = po_on_type
       var po_on_type = this.state.po_on_type
      //  var type_of_payout = type_of_payout
       var type_of_payout = this.state.type_of_payout
       var po_dis_in_percent = Number(po_dis_in_percent)



       if(po_on_type.label == "Net Premium"){
        //  if(po_on_type == "net_premium"){

           var po_discount_amount = (net_premium*po_dis_in_percent)/100
         }else{

           var po_discount_amount = (addon_premium*po_dis_in_percent)/100
         }



       if (gross_premium=="") {

       }
       else{
        if(type_of_payout.label == "Cut Pay"){
          //////console.log("type_of_payout.label");
          var amount_receivable = gross_premium-po_discount_amount
          var po_discount_status = {
           value: "1",
           label: "Paid"
          }
         //  var po_discount_status = "paid"
        }else{
           var amount_receivable = gross_premium
           var po_discount_status = {
             value: "1",
             label: "Pending"
           }
           // var po_discount_status = "pending"
        }
       }


       this.setState({
        amount_receivable:amount_receivable,
        po_discount_amount:po_discount_amount,
        po_discount_status:po_discount_status,


        // po_discount_in_percent:new_po_dis_in_percent
        // po_discount_in_percent:po_dis_in_percent
       })

      // }






     }


     select_cheque_for_policy = (cheque_id)=>  {
      const { settings } = this.props;
      var params = {
        cheque_id:cheque_id,
        amount:this.state.policy_amount,
        policy_id:this.state.operation_dock_id,
      }
      //////console.log("Params Dtaa",params);
      //  const res = fetch(settings.api_url + "select_cheque_for_policy", {
      //      method: 'POST',
      //      body: JSON.stringify(params),
      //      headers: {
      //          "Content-type": "application/json; charset=UTF-8",
      //      }
      //  }).then((response) => response.json())
      //      .then(json => {
      //          //////console.log("Select Cheque ****", json)
      //          var data = json;
      //          if (data.status == true) {
      //              this.setState({
      //                added_count: data.data.added_count,
      //              });
      //          }
      //          else {
      //              this.setState({
      //                 //  cheque_array: [],
      //              });
      //          }
      //      })
   }

      select_sec_seven=(value)=>{
        if (value.label=="Link Payment To Insurer" || value.label=="Customer Cheque to Insurer") {
          this.setState({
            mode_of_premium_payment:value,
            section_type_new:value.section,
            section_type_new_new:value.section,
            disabled_true:true,
          })
        }
        else{
          this.setState({
            // mode_of_premium_payment:this.state.mode_of_premium_payment,
            mode_of_premium_payment:"",
            section_type_new:"",
            section_type_new_new:"",
            disabled_true:false
          })
        }
      }

      please_startTimer() {
        var start_date = new Date()
        //console.log("start_date",start_date);
        var fgfgf = setInterval(() => {

          var sec = this.state.second+1

          if(sec >= 60){
            var min = this.state.minute+1
            this.setState({minute:min,second:0,form_start_time: start_date})
          }else{
            this.setState({second:sec,form_start_time: start_date})

          }

        },1000)
        return ()=> clearInterval(this.state.show_timer);
      }

      please_stopTimer(){
        //console.log("timerrrr_stop");
        clearInterval(this.state.show_timer)
        this.setState({minute:0,second:0, show_timer:null})

      }

      pdf_preview=(image_view)=>{
        console.log("image_view========",image_view);
        this.setState({
          image_preview:image_view
        })
      }
      remove_preview=()=>{
        this.setState({
          image_preview:""
        })
        console.log("cancallll_image_========",this.state.image_preview);
      }

      openNav(image_view) {
        //console.log("kkkkkkkkkkkk", device_width);
            // document.getElementById("mySidenav").style.height = "375px";
            document.getElementById("mySidenav").style.display = "block";
            // document.getElementById("showww_non").style.display = "none";
            // document.getElementById("showww_non_2").style.display = "none";

        this.pdf_preview(image_view)
      }

      closeNav() {
        document.getElementById("mySidenav").style.display = "none";
        this.remove_preview()
    }



    fileToDataUri_flat = (image) => {
      //console.log("imageeeeeeeeee",image);
      return new Promise((res) => {
        const reader = new FileReader();
        const { type, name, size } = image;
        reader.addEventListener('load', () => {
          res({
            document_image_new: reader.result,
            document_image: reader.result.split('base64,')[1],
            document_type: reader.result.split(';')[0].split('/')[1],
            file_name:image.name
          })
        });
        reader.readAsDataURL(image);
      })
    }



    delete_building_map_image_temp(t) {
      var document_data = this.state.document_data.filter(n => n !== t);
      this.setState({
          document_data: document_data,
      })

    }


    handleChangeFile_new = async (event) => {
      var my_file =event.target.files

      if (event.target.files && event.target.files.length > 0) {
          const newImagesPromises = []
          for (let i = 0; i < event.target.files.length; i++) {
            newImagesPromises.push(this.fileToDataUri_flat(event.target.files[i]))
          }
          const newImages = await Promise.all(newImagesPromises)
          this.setState({
            document_data: newImages,
          })
        }
    }


    componentWillUnmount(){
      socket.off('get_operation_dock_response');
      socket.off('get_single_operation_dock_response');
      socket.off('add_operation_dock_conversation_response');
  }


    render() {
      var customer_recevied_payemnt = [
        {value:"1" ,label:"Paid"},
        {value:"2" ,label:"Pending"},
      ]
      const pageNumbers = [];
      if (this.state.total !== null) {
          for (let i = 1; i <= Math.ceil(this.state.total_pages / 1); i++) {
              pageNumbers.push(i);
          }


          var renderPageNumbers = pageNumbers.map(number => {
              let classes = this.state.current_page === number ? '' : '';

              return (
                  <div key={number} style={{
                      display: 'inline-flex'
                  }}>
                      {/* <span style={{display:this.state.current_page === 1 ? 'none' : 'block'}}> */}

                      <Button color="warning" outline
                      style={{
                          backgroundColor: this.state.current_page === number ? '#8bc240' : 'white', color: this.state.current_page === number ? 'white' : '#8bc240',marginRight:"5px",
                          display: this.state.current_page === number ? "block" : 'none'}}
                          className={classes,"pagination_222"}
                          onClick={() => {
                              this.get_operation_dock(this.state.startDate,this.state.endDate,this.state.search_user,number)
                                  , this.setState({
                                      current_page: number,
                                      spinner_1: 'block'
                                  })
                          }}

                      >{number}</Button>
                      <Button color="warning" outline
                      style={{
                          display: this.state.current_page === number ? this.state.current_page === this.state.total_pages ? "none" : "block" : 'none',
                          backgroundColor: this.state.current_page === number ? '' : '#8bc240', color: this.state.current_page === number ? '#8bc240' : 'white' }}
                          className={classes,"pagination_222"}
                          onClick={() => {
                              this.get_operation_dock(this.state.startDate,this.state.endDate,this.state.search_user,number + 1)
                              if (this.state.current_page === this.state.total_pages) {
                                  this.setState({
                                      current_page: number
                                  })
                              } else {
                                  this.setState({
                                      current_page: number + 1,
                                      spinner_1: 'block'
                                  })
                              }

                          }}

                      >{number + 1}</Button>

                  </div>
              );
          });
      }
      const {
          activeAccordion,
      } = this.state;

      const class_of_vehicle = [
          { value: '1', label: 'Private car' },
          { value: '2', label: 'GCV' },
          { value: '3', label: 'Two Wheeler' },
          { value: '4', label: 'MIS-D' },
          { value: '5', label: 'PCV' },
          { value: '6', label: 'Non Motor' },
      ];


      const fuel_type = [
          { value: '1', label: 'Petrol' },
          { value: '2', label: 'Diesel' },
          { value: '3', label: 'CNG' },
          { value: '4', label: 'Electric' },
          { value: '5', label: 'LPG' },
      ];

      const sub_class_of_vehicle = [
          { value: '1', label: 'Private car',section:'3_section' },
          { value: '2', label: 'GCV',section:'3_section' },
          { value: '3', label: 'Marin' ,section:'3_section'},
          { value: '4', label: 'Two Wheeler',section:'3_section' },
          { value: '5', label: 'Tractor',section:'3_section' },
          { value: '6', label: 'Taxi',section:'3_section' },
          { value: '7', label: '3 Wheeler',section:'3_section' },
          { value: '8', label: 'School Bus' ,section:'3_section'},
          { value: '9', label: 'Fire',section:'3_section' },
          { value: '10', label: 'MIS-D Public',section:'2_section' },
          { value: '11', label: 'MIS-D Private',section:'2_section' },
          { value: '12', label: 'Trailer',section:'3_section' },
          { value: '13', label: 'Fire & Burglary',section:'3_section' },
          { value: '14', label: 'Route Bus',section:'3_section' },
          { value: '15', label: 'CPM',section:'3_section' },
          { value: '16', label: 'Scooty' ,section:'2_section'},
          { value: '17', label: 'Bike',section:'3_section' },
          { value: '18', label: 'Staff Bus',section:'3_section' },
          { value: '19', label: 'Health',section:'3_section' },
      ];


      // const insurer_array = [
      //     { value: '1', label: 'TATA AIG' },
      //     { value: '2', label: 'IFFCO-TOKIO' },
      //     { value: '3', label: 'RELIANCE' },
      //     { value: '4', label: 'ICICI LOMBARD' },
      //     { value: '5', label: 'MAGMA-HDI' },
      //     { value: '6', label: 'ROYAL' },
      //     { value: '7', label: 'SHRIRAM' },
      //     { value: '8', label: 'DIGIT' },
      //     { value: '9', label: 'National Insurance ' },
      //     { value: '10', label: 'SBI' },
      //     { value: '11', label: 'HDFC Ergo' },
      //     { value: '12', label: 'Kotak' },
      //     { value: '13', label: 'Bajaj Alliance' },
      //     { value: '14', label: 'New India Assurance Co. Ltd.' },
      // ];
      const type_of_payout = [
          { value: '1', label: 'Cut Pay' },
          { value: '2', label: 'Payout' },
          { value: '4', label: 'Nil' }
      ];

      const ncb_type = [
          { value: '1', label: '0%' },
          { value: '2', label: '20%' },
          { value: '3', label: '25%' },
          { value: '4', label: '35%' },
          { value: '5', label: '45%' },
          { value: '6', label: '50%' },
      ];

      const agent_or_tellcalling = [
          { value: '1', label: 'Agent/Dealer',section:'5_section' },
          { value: '2', label: 'Telecalling',section:'4_section' },
      ];


      // const tellicar_name = [
      //     { value: '1', label: 'Kalyani Ukande' },
      //     { value: '2', label: 'Kajal Gupta' }
      // ];

      const mode_of_premium_payment = [
          { value: '1', label: 'SC Cheque',section:'9_section' },
          // { value: '2', label: 'Link Payment By Customer',section:'10_section' },
          // { value: '3', label: 'Customer Cheque to Insurer',section:'8_section' },
          { value: '4', label: 'Link Payment By SC',section:'10_section' },
          { value: '5', label: 'Customer Cheque + Float',section:'8_section' },
      ];
      const mode_of_premium_received = [
          { value: '1', label: 'Cash',section:'' },
          // { value: '2', label: 'Link Payment By Customer',section:'10_section' },
          // { value: '3', label: 'Customer Cheque to Insurer',section:'8_section' },
          { value: '4', label: 'Online to SC',section:'' },
          { value: '5', label: 'Cheque to SC',section:'' },
          { value: '6', label: 'Pending',section:'_section' },
      ];

      const for_payout_mode_of_premium_received = [
          { value: '2', label: 'Link Payment To Insurer',section:'10_section' },
          { value: '3', label: 'Customer Cheque to Insurer',section:'8_section' },
      ];


      const rto_cluster_array = [
          { value: '1', label: 'Mumbai'},
          { value: '2', label: 'Nagpur'},
          { value: '3', label: 'Pune'},
          { value: '4', label: 'ROM-1'},
          { value: '5', label: 'ROM-2'},
          { value: '6', label: 'ROM-3'},
          { value: '7', label: 'ROM-4'},
          { value: '8', label: 'Other State'},
      ];
      const fleet_array = [
          { value: '1', label: 'Fleet'},
          { value: '2', label: 'Non Fleet'},
      ];


      const array_liabilty_or_comprehensive = [
          { value: '1', label: 'Liability',section: ""},
          { value: '2', label: 'Comprehensive',section: ""},
      ];


      const motor_type_array = [
          { value: '1', label: 'Motor',section:'' },
          { value: '2', label: 'Non Motor',section:'3_section' },
      ];


      const motor_array = [
          { value: '1', label: 'Private car',section:'3_section'},
          { value: '2', label: 'Two Wheeler',section:'3_section'},
          { value: '3', label: 'Commercial',section:'3_section'},
          { value: '4', label: 'MISC D',section:'2_section'},
      ];


      const private_car = [
          { value: '1', label: 'SAOD',section:'3_section'},
          { value: '2', label: '1+1',section:'3_section'},
          { value: '3', label: '1+3	',section:'3_section'},
          { value: '4', label: 'TP',section:'3_section'},
      ];

      const commercial_data = [
          { value: '1', label: 'GCV',section:'3_section'},
          { value: '2', label: 'PCV',section:'3_section'},
      ];

      const misd_data = [
          { value: '1', label: 'Tractor',section:'3_section'},
          { value: '2', label: 'Other than tractor',section:'3_section'},
      ];
      const two_wheeler = [
          { value: '1', label: '1+5',section:'3_section'},
          { value: '2', label: '1+1',section:'3_section'},
          { value: '3', label: 'SAOD',section:'3_section'},
          { value: '4', label: 'TP',section:'3_section'},
      ];
      const pvc_type = [
          { value: '1', label: 'School Bus',section:'3_section',capacity:"1"},
          { value: '2', label: 'Staff bus',section:'3_section',capacity:"1"},
          { value: '3', label: 'Route bus',section:'3_section',capacity:"1"},
          { value: '4', label: '3WH',section:'3_section',capacity:""},
          { value: '5', label: '2WH PCV',section:'3_section',capacity:""},
          { value: '6', label: 'Taxi',section:'3_section',capacity:"1"},
      ];


      const non_motor_array = [
          { value: '1', label: 'Marin'},
          { value: '2', label: 'Fire & Burglary'},
          { value: '3', label: 'Health'},
          { value: '4', label: 'Other'},
      ];

      const type_of_policy = [
        { value: '1', label: 'Liability' },
        { value: '2', label: 'Comprehensive' },
        { value: '3', label: 'Soad' },
        { value: '4', label: 'Marin' },
        { value: '5', label: 'Fire & Burglary' },
        { value: '6', label: 'NA' },
    ];
      const add_on_array = [
          { value: '1', label: 'Yes'},
          { value: '2', label: 'No'},
      ];


      const physical_array_cheque = [
          { value: '1', label: 'Yes'},
          { value: '2', label: 'No'},
      ];


      const po_on_array = [
          { value: '1', label: 'OD Premium'},
          { value: '2', label: 'Net Premium'},
      ];


      const policy_discount_status_array = [
          { value: '1', label: 'Paid'},
          { value: '2', label: 'Pending'},
          { value: '3', label: 'Nil'},
      ];

      var tellicar_name = this.state.tellicar_name.map(item => {
        return {
            value: item.value,
            label: item.label,
        }
    });
      var insurer_array = this.state.insurer_array.map(item => {
        return {
            value: item._id,
            label: item.insurer_name,
            insurer_type: item.insurer_type
        }
    });

      var cheque_array_new = this.state.cheque_array.map(item => {
        return {
            value: item._id,
            label: item.cheque_no,
            balance_amount:item.balance_amount
        }
    });



      var agent_array = this.state.agent_array.map(item => {
        return {
            value: item._id,
            label: item.agent_name,
        }
    });

      const customStyles = {
          control: ( css, state ) => {
              return {
                  ...css,
                  borderColor: state.isFocused ? 'rgba(114, 94, 195, 0.6)' : '#8bc240',
                  '&:hover': {
                      borderColor: state.isFocused ? 'rgba(114, 94, 195, 0.6)' : '#8bc240',
                  },
                  boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(114, 94, 195, 0.2)' : '',
              };
          },
          option: ( css, state ) => {
              let bgc = '';

              if ( state.isSelected ) {
                  bgc = '#8bc240';
              } else if ( state.isFocused ) {
                  bgc = 'rgba(114, 94, 195, 0.2)';
              }

              return {
                  ...css,
                  backgroundColor: bgc,
              };
          },
          multiValueLabel: ( css ) => {
              return {
                  ...css,
                  color: '#545b61',
                  backgroundColor: '#8bc240',
              };
          },
      };



        return (
            <Fragment>
                <PageTitle className="page_opeartion">
                <div className="row my_row_hh">
                 <div className="col-lg-3 col-md-4">
                     <h1>MIS Dock</h1>
                     {/* <h1>Operation Dock</h1> */}
                </div>
                 <div className={this.state.image_preview == "" ? "inlr_data col-lg-5 col-md-8 test_collapse" :"inlr_data_kkk col-lg-5 col-md-8 test_collapse" } >
                   <div style={{display: this.state.ipad_emp_list}}><input
                       type="text"
                       className="form-control serach_smmm"
                       aria-describedby="emailHelp"
                       placeholder="Search SM"
                       value={this.state.search_user}
                       onChange={(e) => {
                        this.setState({
                          search_user:e.target.value
                        })
                        this.get_operation_dock(this.state.startDate,this.state.endDate,e.target.value ,this.state.current_page)
                       }}
                  /></div>
                 <div className="date_rangeee_pii" style={{width:"47%",display: this.state.ipad_emp_list}}>
                     <RangeDatePicker
                            name="daterange"
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            onChange={(startDate, endDate) => {
                                this.setState({
                                startDate: startDate,
                                endDate: endDate,
                                daterang: [new Date(startDate).toISOString(), new Date(endDate).toISOString()]
                                })
                                this.get_operation_dock(startDate,endDate,this.state.search_user,this.state.current_page)
                            }
                            }
                            minDate={new Date(1900, 0, 1)}
                            maxDate={new Date(2100, 0, 1)}
                            dateFormat="DD-MM-YYYY  "
                            monthFormat="MM YYYY"
                            startDatePlaceholder="Start Date"
                            endDatePlaceholder="End Date"
                            disabled={false}
                            className="my-own-class-name nightclass a1"
                            startWeekDay="monday"
                            />





                     </div>

                </div>
                <div className="col-lg-4 col-md-12 for_mobile_ipad for_mobile_ipa_111" style={{display:this.state.isLoading=="none" ?  "inline-flex" : "none",width:"100%",justifyContent: "flex-end"}}>
                  <div style={{display: device_width < 769 ? this.state.ipad_width : "block"}}>
                    <div style={{display: "inline-flex"}}>
                <Button disabled={this.state.opeartion_dock_control == "false" ? 'disabled' : ''} color="primary" style={{textTransform: "capitalize" ,color:"#fff",display:this.state.is_edit_logs==true ? "block" : "none"}}
                 onClick={this.switch_edit_log_btn}>{this.state.show_edit_logs=="none" ? "Updated logs" :"Latest Logs"}</Button>
                <Button disabled={this.state.opeartion_dock_control == "false" ? 'disabled' : ''} color="success" style={{textTransform: "capitalize" ,color:"#fff",display:this.state.for_show_btn!="" && this.state.visitor_type == "completed" && this.state.user_role=="SUPER ADMIN"   ? "block" : "none",marginLeft: "10px"}}
                  onClick={ this.toggle }>Update Forms</Button>
                     <div className="" style={{display: device_width < 769 ? this.state.ipad_width : "block"}}>
                                  <Button color="info" className="" style={{marginLeft: "10px",textTransform:"capitalize", display: device_width < 769 ? "inline-flex" : "none",color:"#fff"}}
                                    onClick={() => {
                                    this.setState({
                                        ipad_emp_list:"block",
                                        ipad_width:"none"
                                    })
                                    }}>Back</Button>

                                     <Button className="open_formssss" color="warning" style={{color:"#fff",textTransform:"capti"}}  onClick={() => {

                                      this.close_chat_data()
                                      }}>{this.state.chat_button}</Button>


                                    </div>
                                    </div>
                                    </div>


                </div>
                </div>
                </PageTitle>
{/* ******************************************** UI PART ******************************************* */}

                {/* <div id="mySidenav">
                  </div> */}

              <Spinner color="warning" className="spinner_css_12345666" style={{marginTop:gk,display: this.state.isLoading}}/>
                <div className="row marrginnn_new" style={{display: this.state.isLoading=="none" ? "flex" :"none"}}>
                  <div id="mySidenav" className="col-lg-6 col-md-12 col-sm-12 task_list2 slide-in" style={{height:height + 22,width: "57%",paddingLeft:"0px"}}>
                    <div style={{textAlign:"end"}}>
                    <Icon name="x" style={{  strokeWidth: "3.5" }} className="closebtn" onClick={()=>this.closeNav()} />
                      </div>
                  <div className="test_collapse" style={{display:this.state.image_preview =="" ? "none" : "block"}}>
                              {/* <a target="" rel="noreferrer" href={this.state.image_preview} /> */}
                              <object width="100%" style={{height:height-8}}  data={this.state.image_preview} type="application/pdf">   </object>
                              {/* <iframe
                              src={this.state.image_preview}
                              frameBorder="0"
                              scrolling="auto"
                              height="100%"
                              width="100%"
                          ></iframe> */}
                              </div>
                  </div>
                    <div className="col-lg-3 col-md-12 col-sm-12 heading_opeartion height_sales" id="showww_non" style={{paddingRight:"0px",display: this.state.ipad_emp_list}}>

                    <div className="grup_btn">
                                <ButtonGroup>
                                    <Button
                                    style={{backgroundColor:this.state.visitor_type=="pending" ? "#4B8178" : "", color:this.state.visitor_type=="pending" ? "#fff" : "",borderColor:this.state.visitor_type=="pending" ? "#4B8178" : ""}}
                                    onClick={() => {
                                                    this.setState({
                                                    visitor_type: 'pending',
                                                    spinner_1: 'block'
                                                    })
                                                    setTimeout(() => {
                                                        this.get_operation_dock(this.state.startDate,this.state.endDate,this.state.search_user ,this.state.current_page)
                                                        }, 0)
                                                }}>Pending<span style={{display:this.state.total=="" || this.state.visitor_type == "completed" ?"none" :"block",marginLeft:"5px"}}>({this.state.total})</span></Button>
                                    <Button
                                    style={{backgroundColor:this.state.visitor_type=="completed" ? "#4B8178" : "", color:this.state.visitor_type=="completed" ? "#fff" : "",borderColor:this.state.visitor_type=="completed" ? "#4B8178" : ""}}
                                    onClick={() => {
                                                    this.setState({
                                                    visitor_type: 'completed',
                                                    spinner_1: 'block'
                                                    })
                                                    setTimeout(() => {
                                                        this.get_operation_dock(this.state.startDate,this.state.endDate,this.state.search_user ,this.state.current_page)
                                                        }, 0)
                                                }}>Completed</Button>
                                </ButtonGroup>
                                </div>


                        <div className="heading_opeartion mycalendar" style={{height:this.state.total_pages==1 ? my_height-109 : my_height -152}}>
                        <div className="new_border_box_opearrrr">
                                    {this.state.operation_dock_data_array.map((value,index)=>{
                                        return(
                                            <div aria-hidden="true" className="row test_collapse"  key={index}
                                            style={{border:value._id == this.state.operation_dock_id ? " 2px solid #8bc240" : "",cursor:"pointer"}}
                                            onClick={() => {
                                               this.setState({
                                               spinner_1: 'block',
                                               minute: 0,
                                               second: 0,
                                               })
                                               setTimeout(() => {
                                               this.get_single_operation_dock(value._id)
                                               }, 0)
                                           }}
                                       >
                                        <div className="col-lg-6 col-md-6 sm_namee">
                                            <div className="name_type">
                                            <span>{value.sm_name}</span>
                                          </div>
                                            <div className="time_new">{value.added_date.split("-")[2] + "-" + value.added_date.split("-")[1] + "-" +value.added_date.split("-")[0]}</div>

                                       </div>
                                        <div className="col-lg-6 col-md-6 text_align sm_namee">
                                        {/* <span className="mobile_no_type_oppp marquee"><span>{value.name}</span></span> */}
                                        <p className= {value.name ? (value.name.length >=15 ? "mobile_no_type_oppp marquee" :"mobile_no_type_oppp"):"no_providedd"}  style={{color:value.name ? (value.name == " " ? "#d5d5d5" :""):""}}><span>{value.name ?(value.name != " " ? value.name :"Not Provided"):"Not Provided"}</span></p>
                                        {/* <p className="badge_data">
                                        <Badge color="success" pill style={{display:value.section_details != undefined ?"inline-block":"none" ,padding: "5px 6px"}}>Finished</Badge>
                                        <Badge color="danger" pill style={{display:value.section_details == undefined ?"inline-block":"none" ,padding: "5px 6px"}}>Pending</Badge>
                                        </p> */}
                                        {/* <p className="mobile_no_type_oppp marquee"  style={{color:value.name == " " ? "#d5d5d5" :""}}><span>{value.name}</span></p> */}

                                            {/* <div className="phone_new"><Icon name="phone-call" className="phone_call"/>
                                            <div></div> */}
                                       </div>

                                       {/* <div className="col-lg-6 col-md-6  sm_namee">
                                        <p className="badge_data">
                                        <Badge color="success" pill style={{display:value.section_details != undefined ?"inline-block":"none" ,padding: "5px 6px"}}>Finished</Badge>
                                        <Badge color="danger" pill style={{display:value.section_details == undefined ?"inline-block":"none" ,padding: "5px 6px"}}>Pending</Badge>
                                        </p>

                                       </div> */}

                                    </div>
                                        )
                                    })}


                                    </div>
                        </div>


                         {/* ********************************* Pagination ***************************************** */}

                         <div style={{display:this.state.total_pages==1?"none":'flex',flexWrap: "wrap",width:"100%",marginTop:"10px",padding: "1px 8px",justifyContent:"flex-end"}}>
                              <Button color="warning" className="pagination_222"
                              style={{ marginLeft:"auto",marginRight:"5px"}}
                              outline onClick={() => this.get_operation_dock(this.state.startDate,this.state.endDate,this.state.search_user,1)}>first</Button>


                              <Button color="warning" className="pagination_222"
                              style={{marginLeft:"5px",marginRight:"5px",backgroundColor: this.state.current_page == 1 ? '#8bc240' : '',
                              color: this.state.current_page == 1 ? 'white' : '#8bc240',display: this.state.current_page == 1 ? "none" : "block"}} outline
                              onClick={() => {
                                  if (this.state.current_page > 1) {
                                    this.get_operation_dock(this.state.startDate,this.state.endDate,this.state.search_user,this.state.current_page - 1)
                                  } else {
                                    this.get_operation_dock(this.state.startDate,this.state.endDate,this.state.search_user,this.state.current_page)
                                  }
                              }}
                              >Previous</Button>
                                {/*{renderPageNumbers}*/}
                                {renderPageNumbers}

                              <Button color="warning" className="pagination_222"
                              style={{marginLeft:"5px",backgroundColor: this.state.current_page == this.state.total_pages ? '#8bc240' : '',
                              display: this.state.current_page == this.state.total_pages ? "none" : "block",
                              color: this.state.current_page == this.state.total_pages ? 'white' : '#8bc240'}} outline
                              onClick={() => {
                                  if (this.state.current_page < this.state.total_pages) {
                                      this.get_operation_dock(this.state.startDate,this.state.endDate,this.state.search_user,this.state.current_page + 1)
                                  } else {
                                      this.get_operation_dock(this.state.startDate,this.state.endDate,this.state.search_user,this.state.current_page)
                                  }
                              }}
                              >next</Button>
                              <Button color="warning" className="pagination_222"
                              style={{marginLeft:"5px",marginRight:"3px"}}
                              outline onClick={() => this.get_operation_dock(this.state.startDate,this.state.endDate,this.state.search_user,this.state.total_pages)}>last</Button>
                            </div>
                    </div>
                    <div className="col-lg-9 col-md-12 col-sm-12  test_collapse ttt_1" style={{display: device_width < 769 ? this.state.ipad_width : "block"}}>
                    <Spinner color="warning" className="employee_spinner_1" style={{ marginTop: gk, display: this.state.spinner_1 }} />
                    <div style={{display: this.state.spinner_1=="none" ? "block":"none"}}>
                    <h3 style={{ display: this.state.no_data_message, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:gk}}>No Data Found</h3>
                        <div style={{display: this.state.no_data_message=="none" ? "block" :"none"}}>

                        <div className="row test_collapse inside_rowww">
                           <div className="col-lg-3 col-md-5 test_collapse  mycalendar height_sales" id="showww_non_2" style={{height:my_height-57}}>
                           {/* <input  type="file" name="file" accept=".pdf" onChange={this.handleChangeFile} ref={(input) => { file = input; }} multiple /> */}
                           <div >
                            {this.state.opration_single_data_array.map((value,index)=>{
                                return(
                                    <div className="show_deatilsss" key={index}>

                                    <div className="row " style={{paddingTop:"11px",display:device_width <=600 ? (this.state.chart_box_open=="block" ? "none" :"block"):"" }}>
 {/* *************************************************** UPoaddeeee QUOATATIPN  *********************************************************************************************** */}
                                      <div className="col-lg-12 col-md-12 col-sm-12" style={{paddingRight: "15px"}}>
                                        <div className="upladedddd">
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}>Uploaded Policy</div>



                                      </div>
                                      <hr className="hr_newww" style={{marginTop:" 0px",marginBottom: "25px"}}/>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12 test_collapse">
                                      <div className="row test_collapse">
                                        {
                                           value.policy_pdf ? value.policy_pdf.map((value1,index1)=>{
                                                return(
                                            <div className="col-lg-4 col-md-4 col-sm-4 small_devicess" style={{textAlign:"center",paddingLeft:"5px"}} key={index1}>
                                        <div>


                                       {/* <button type="button" className="btn btn-danger btn-uniform btn-sm mnt-10 mnb-10 p-0 delte_image"
                                            onClick={() => this.delete_operation_dock(value1)}
                                            style={{ display: this.state.uploaded_operation == [] ? "none" : "grid" }}
                                        >
                                               <Icon name="x" />
                                        </button> */}

                                            {/* <a rel="noreferrer" href={value1.image_name} target="_blank">
                                            <img src={pdf_img} aria-hidden="true" alt="pdf image" className="image_pdf"/></a> */}


                                            <span style={{display:value1.file_type=="image" ? "block" :"none"}}>

                                            <img onClick={()=>{
                                              this.pdf_preview(value1.image_name)
                                              this.openNav(value1.image_name)
                                              }} src={value1.image_name} aria-hidden="true" alt="pdf image" className="image_pdf"/>
{/*
                                            <a rel="noreferrer" href={value1.image_name} target="_blank">
                                            <img src={value1.image_name} aria-hidden="true" alt="pdf image" className="image_pdf"/></a> */}
                                            </span>
                                            <span style={{display:value1.file_type=="pdf" ? "block" :"none"}}>
                                            {/* <a rel="noreferrer" href={value1.image_name} target="_blank"> */}
                                            <img onClick={()=>{
                                              this.pdf_preview(value1.image_name)
                                              this.openNav(value1.image_name)
                                              }} src={pdf_img} aria-hidden="true" alt="pdf image" className="image_pdf"/>
                                            {/* </a> */}
                                            </span>
                                            <span style={{display:value1.file_type=="text" ? "block" :"none"}}>
                                            {/* <a rel="noreferrer" href={value1.image_name} target="_blank"> */}
                                            <img onClick={()=>{
                                              this.pdf_preview(value1.image_name)
                                              this.openNav(value1.image_name)
                                              }} src={excel_img} aria-hidden="true" alt="pdf image" className="image_pdf"/>
                                            {/* </a> */}
                                            </span>
                                            <span style={{display:value1.file_type != "text" && value1.file_type != "pdf" && value1.file_type != "image" ? "block" :"none"}}>
                                            {/* <a rel="noreferrer" href={value1.image_name} target="_blank"> */}
                                            <img onClick={()=>{
                                              this.pdf_preview(value1.image_name)
                                              this.openNav(value1.image_name)
                                              }} src={other_img} aria-hidden="true" alt="pdf image" className="image_pdf"/>
                                            {/* </a> */}
                                            </span>






                                            <p className="img_name marquee"><span>{value1.show_name}</span></p>
                                            <div className="pdf_timee">{dateFormat(new Date(value1.date_time.replace("Z", "")), "dd-mm-yyyy")}</div>
                                            <div className="pdf_timee_timeeee">{value1.date_time_new}</div>
                                            </div>
                                            </div>
                                                )
                                            }):null
                                        }
                                    </div>
                                    </div>


{/* *************************************************** PERSOANL DETAILS *********************************************************************************************** */}
                                    {/* <div className="col-lg-12 col-md-12 col-sm-12" style={{marginTop:"-13px"}}>
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}>Details</div>
                                      <hr className="hr_newww" style={{marginTop:" 0px"}}/>
                                    </div>


                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">Policy type</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.policy_type == "roll_over" ? "Roll over" :value.policy_type}</span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">Moter/Non motor</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.motor_non_motor ? value.motor_non_motor.label :""}</span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display:value.motor_non_motor.label=="Motor" ? "inline-flex" :"none"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">Motor type</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.motor_type ? value.motor_type.label:""}</span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display:value.motor_non_motor.label=="Motor" ? "inline-flex" :"none"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">Sub Motor type</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.sub_motor_type ? value.sub_motor_type.label :""}</span>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display:value.sub_motor_type ? (value.sub_motor_type.label=="GCV" ? "inline-flex" :"none"):"none"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">GVW</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.gvw }</span>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display:value.sub_motor_type ? (value.sub_motor_type.label=="PCV" ? "inline-flex" :"none"):"none"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">PCV Type</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.pvc_type ? value.pvc_type.label : ""}</span>
                                    </div>


                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display:value.pvc_capacity == "" ? "none" :"inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">PCV Capacity</div>:
                                      <span style={{ marginLeft: "10px" }}><span style={{display:value.pvc_capacity=="" ? "none" :"block"}}>{value.pvc_capacity}</span></span>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">Claim Status</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.claim}</span>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">Addons</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.addons ? value.addons.label : ""}</span>
                                    </div>


                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">Preferred Company</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.preferred_company }</span>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display:value.claim=="No" ?"inline-flex" :"none"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">Last Year NCB</div>:
                                      <span style={{ marginLeft: "10px", display:value.last_year_ncb == "" ? "none" : "block" }}>{value.last_year_ncb ? value.last_year_ncb.label:""}%</span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">Comprehensive/Tp</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.comprehensive_or_tp}</span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">Vehicle Number</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.vehicle_no}</span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">Make</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.make}</span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">Model</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.model}</span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">CC</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.cc}</span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">Reg Date</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.reg_date ? dateFormat(new Date(value.reg_date.replace("Z", "")), "dd-mm-yyyy") :""}</span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">Fuel type</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.fuel_type ? value.fuel_type.label :""}</span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">Assit percent</div>:
                                      <span style={{ marginLeft: "10px",display:value.assist_percent=="" ?"none" :"block" }}>{value.assist_percent}%</span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">PO Amount</div>:
                                      <span style={{ marginLeft: "10px", display:value.po_amount == "" ? "none" : "block" }}>&#x20b9;{value.po_amount}</span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">Payout type</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.payout_type ? value.payout_type.label :""}</span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">Payment Mode</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.payment_mode ? value.payment_mode.label :""}</span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">Invoice Number</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.invoice_number}</span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">NCB Reserving Letter</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.ncb_reserving_letter}</span>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">Agent/Dealer</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.agent_name ? value.agent_name :""}</span>
                                    </div>


                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">Email ID </div>:
                                      <span style={{ marginLeft: "10px" }}>{value.email_id}</span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">Mobile Number</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.phone_no}</span>
                                    </div> */}



                                    {/* <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd" style={{ width: "156px" }}>Customer Name</div>:
                                      <span className={value.name ==" " ? "":"reamr_remark_new_nameee"} style={{ marginLeft: "10px" }}>{value.name}</span>
                                    </div>


                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd" style={{ width: "156px" }}>Mobile No</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.phone_no}</span>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd" style={{ width: "156px" }}>Email</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.email_id}</span>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd" style={{ width: "156px" }}>RTO No</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.rto_no}</span>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd" style={{ width: "156px" }}>Invoice (New vehicle) </div>:
                                      <span style={{ marginLeft: "10px" }}>{value.invoice}</span>
                                    </div> */}




{/* *************************************************** Payment DETAILS *********************************************************************************************** */}


                                    {/* <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd" style={{ width: "156px" }}>Policy Amount</div>:
                                      <span style={{ marginLeft: "10px", display:value.policy_amount == "" ? "none" : "block" }}>&#x20b9;{value.policy_amount}</span>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd" style={{ width: "156px" }}>Policy Percentage</div>:
                                      <span className="" style={{ marginLeft: "6px", display:value.policy_percent == "" ? "none" : "block" }}>{value.policy_percent} %</span>
                                    </div>


                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd" style={{ width: "156px" }}>Payment Type</div>:
                                      <span style={{ marginLeft: "10px" ,textTransform: "capitalize" }}>{value.payment_type.label}</span>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd" style={{ width: "156px" }}>Payment Mode</div>:
                                      <span className="" style={{ marginLeft: "10px",textTransform: "capitalize" }}>{value.payment_mode.label}</span>
                                    </div>



                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd" style={{ width: "156px" }}>Claim</div>:
                                      <span className="" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.claim}</span>
                                    </div>


                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd" style={{ width: "156px" }}>Requested IDV</div>:
                                      <span className="" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.req_idv}</span>
                                    </div>


                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd" style={{ width: "156px" }}>Tax Permit</div>:
                                      <span className="" style={{ marginLeft: "10px",textTransform: "capitalize" }}>{value.taxi_permit}</span>
                                    </div>


                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd" style={{ width: "156px" }}>Bus Type</div>:
                                      <span className="" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.type_of_bus != "" ? (value.type_of_bus == "route_bus" ? "Route Bus" : "School Bus"):""}</span>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd" style={{ width: "156px" }}>Requested NCB</div>:
                                      <span className="" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.rq_ncb}</span>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd" style={{ width: "156px" }}>Suggested Insurer Comp </div>:
                                      <span className="" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.suggest_insurer_comp}</span>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd" style={{ width: "156px" }}>Policy Type</div>:
                                      <span className="" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.policy_type}</span>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd" style={{ width: "156px" }}>Req. Addon Cover </div>:
                                      <span className="" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.req_addon_cover}</span>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd" style={{ width: "156px" }}>Suggested Premium</div>:
                                      <span className="" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.suggested_premium}</span>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd" style={{ width: "156px" }}>Sourced by</div>:
                                      <span className="" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.sourced_by_detail.label}</span>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd" style={{ width: "156px" }}>Remark</div>:
                                      <span className={value.remark ==" " ? "":"reamr_remark_new"} style={{ marginLeft: "10px" }}>{value.remark}</span>
                                    </div> */}

{/* ***************************************************  Attachment ****************************************************************************************** */}

{/*
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{marginTop:"23px",display:value.rc_image =="" || value.rc_image == undefined ? "none" :"block"}}>
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}>RC</div>
                                      <hr className="hr_newww" style={{marginTop:" 0px"}}/>

                                      <div style={{display:value.rc_image !="" ? "block" :"none"}}>
                                      <div className="row">
                                        {value.rc_image ?   value.rc_image.map((v1,i1)=>{
                                          return(
                                            <div className="col-lg-3 col-md-4 col-sm-4 small_devicess" style={{textAlign:"center"}} key={i1}>
                                              <span style={{display:v1.file_type=="image" ? "block" :"none"}}>
                                              <a rel="noreferrer" href={v1.file_name} target="_blank">
                                                <img src={v1.file_name} alt="img" className="image_pdf" style={{borderRadius:"5px",height:"60px"}}/></a>
                                              </span>

                                              <span style={{display:v1.file_type=="application" ? "block" :"none"}}>
                                              <a rel="noreferrer" href={v1.file_name} target="_blank">
                                               <img src={pdf_img} aria-hidden="true" alt="pdf image" className="image_pdf" style={{height:"60px"}}/></a>
                                                </span>

                                              <span style={{display:v1.file_type=="text" ? "block" :"none"}}>
                                              <a rel="noreferrer" href={v1.file_name} target="_blank">
                                               <img src={excel_img} aria-hidden="true" alt="pdf image" className="image_pdf" style={{height:"60px"}}/></a>
                                                </span>
                                              </div>
                                          )
                                        }):""}
                                            </div>
                                       </div>
                                    </div> */}


 {/* ***************************************************  Previous Year operation Atteachment ****************************************************************************************** */}


                                    {/* <div className="col-lg-12 col-md-12 col-sm-12" style={{marginTop:"23px",display:value.pyp_image =="" || value.pyp_image == undefined ? "none" :"block"}}>
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}>Previous Year operation</div>
                                      <hr className="hr_newww" style={{marginTop:" 0px"}}/>

                                      <div style={{display:value.pyp_image !="" ? "block" :"none"}}>
                                      <div className="row">
                                        {value.pyp_image ?   value.pyp_image.map((v1,i1)=>{
                                          return(
                                            <div className="col-lg-3 col-md-4 col-sm-4 small_devicess" style={{textAlign:"center"}} key={i1}>
                                              <span style={{display:v1.file_type=="image" ? "block" :"none"}}>
                                              <a rel="noreferrer" href={v1.file_name} target="_blank">
                                                <img src={v1.file_name} alt="img" className="image_pdf" style={{borderRadius:"5px",height:"60px"}}/></a>
                                              </span>

                                              <span style={{display:v1.file_type=="application" ? "block" :"none"}}>
                                              <a rel="noreferrer" href={v1.file_name} target="_blank">
                                               <img src={pdf_img} aria-hidden="true" alt="pdf image" className="image_pdf" style={{height:"60px"}}/></a>
                                                </span>

                                              <span style={{display:v1.file_type=="text" ? "block" :"none"}}>
                                              <a rel="noreferrer" href={v1.file_name} target="_blank">
                                               <img src={excel_img} aria-hidden="true" alt="pdf image" className="image_pdf" style={{height:"60px"}}/></a>
                                                </span>
                                              </div>
                                          )
                                        }):""}
                                            </div>
                                       </div>
                                    </div> */}



 {/* ***************************************************  PAN CARD Atteachment ****************************************************************************************** */}


                                    {/* <div className="col-lg-12 col-md-12 col-sm-12" style={{marginTop:"23px",display:value.pan_card_image =="" || value.pan_card_image == undefined ? "none" :"block"}}>
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}>Pan Card</div>
                                      <hr className="hr_newww" style={{marginTop:" 0px"}}/>

                                      <div style={{display:value.pan_card_image !="" ? "block" :"none"}}>
                                      <div className="row">
                                        {value.pan_card_image ?   value.pan_card_image.map((v1,i1)=>{
                                          return(
                                            <div className="col-lg-3 col-md-4 col-sm-4 small_devicess" style={{textAlign:"center"}} key={i1}>
                                              <span style={{display:v1.file_type=="image" ? "block" :"none"}}>
                                              <a rel="noreferrer" href={v1.file_name} target="_blank">
                                                <img src={v1.file_name} alt="img" className="image_pdf" style={{borderRadius:"5px",height:"60px"}}/></a>
                                              </span>

                                              <span style={{display:v1.file_type=="application" ? "block" :"none"}}>
                                              <a rel="noreferrer" href={v1.file_name} target="_blank">
                                               <img src={pdf_img} aria-hidden="true" alt="pdf image" className="image_pdf" style={{height:"60px"}}/></a>
                                                </span>

                                              <span style={{display:v1.file_type=="text" ? "block" :"none"}}>
                                              <a rel="noreferrer" href={v1.file_name} target="_blank">
                                               <img src={excel_img} aria-hidden="true" alt="pdf image" className="image_pdf" style={{height:"60px"}}/></a>
                                                </span>
                                              </div>
                                          )
                                        }):""}
                                            </div>
                                       </div>
                                    </div> */}



 {/* ***************************************************  Addhar Crad Atteachment ****************************************************************************************** */}


                                    {/* <div className="col-lg-12 col-md-12 col-sm-12" style={{marginTop:"23px",display:value.aadhar_card_image =="" || value.aadhar_card_image == undefined ? "none" :"block"}}>
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}>Aadhar Card</div>
                                      <hr className="hr_newww" style={{marginTop:" 0px"}}/>

                                      <div style={{display:value.aadhar_card_image !="" ? "block" :"none"}}>
                                      <div className="row">
                                        {value.aadhar_card_image ?   value.aadhar_card_image.map((v1,i1)=>{
                                          return(
                                            <div className="col-lg-3 col-md-4 col-sm-4 small_devicess" style={{textAlign:"center"}} key={i1}>
                                              <span style={{display:v1.file_type=="image" ? "block" :"none"}}>
                                              <a rel="noreferrer" href={v1.file_name} target="_blank">
                                                <img src={v1.file_name} alt="img" className="image_pdf" style={{borderRadius:"5px",height:"60px"}}/></a>
                                              </span>

                                              <span style={{display:v1.file_type=="application" ? "block" :"none"}}>
                                              <a rel="noreferrer" href={v1.file_name} target="_blank">
                                               <img src={pdf_img} aria-hidden="true" alt="pdf image" className="image_pdf"  style={{height:"60px"}}/></a>
                                                </span>

                                              <span style={{display:v1.file_type=="text" ? "block" :"none"}}>
                                              <a rel="noreferrer" href={v1.file_name} target="_blank">
                                               <img src={excel_img} aria-hidden="true" alt="pdf image" className="image_pdf"  style={{height:"60px"}}/></a>
                                                </span>
                                              </div>
                                          )
                                        }):""}
                                            </div>
                                       </div>
                                    </div> */}

















                                    </div>


                                   </div>
                                )
                            })}

                              {/* <div className="test_collapse" style={{display:this.state.image_preview =="" ? "none" : "block",marginTop: "-22px"}}>
                                <div style={{textAlign:"end"}}>
                                   <button type="button" className="btn btn-danger btn-uniform btn-sm delte_image_new"
                                            onClick={() => this.remove_preview()}>
                                               <Icon name="x" />
                                        </button>
                                  </div>
                              <object width="100%" height={my_height-57} data={this.state.image_preview} type="application/pdf">   </object>
                              </div> */}
                          </div>
                           </div>




                           <div  className={this.state.show_edit_logs!="none" ? "col-lg-9 col-md-7 test_collapse heading_opeartion" : "col-lg-9 col-md-7 test_collapse"} style={{display:device_width <=600 ? (this.state.chart_box_open=="block" ? "block" :"none"):""}}>
                           <div className="mycalendar padd_right_noe" style={{height:this.state.for_show_btn!="" ? my_height-61  :  my_height-113,paddingRight: "25px",paddingBottom: "20px"}}>
{/* ******************************************  EDIT LOGS Deatils *************************************************************************************************************************** */}
                              <div className="edit_logs_detils test_collapse" style={{display:this.state.show_edit_logs=="block" ? "block" : "none",marginTop:"16px"}}>

                                {this.state.update_section_details_array.map((value1,index1)=>{
                                  return(
                                    <div className="accordion-group" key={index1}>
                                    { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
                                    <a
                                        href="#"
                                        className="collapse-link edit_log_classs"
                                        onClick={ ( e ) => {
                                            e.preventDefault();
                                            this.setState( {
                                                activeAccordion: activeAccordion === index1+1 ? 0 : index1+1,
                                            } );
                                        } }
                                    >
                                        <div className="accordian_dtaa"><div style={{display:"inline-flex"}}><div className={activeAccordion == index1+1 ? 'is_active test_collapse' : 'is_active_not test_collapse'}>{activeAccordion == index1+1 ? '-' : '+'}</div><span style={{display:"grid"}}><span className="editeeddd">Edited by</span><span className="added_name">{value1.added_name}</span></span></div><div className="date_formmmm" style={{display:"grid"}}><span>{dateFormat(value1.added_date.replace('Z', ""), "dd-mm-yyyy")}</span><span className="only_timeeee">{dateFormat(value1.added_date.replace('Z', ""), "hh:MM TT")}</span></div></div>
                                    </a>
                                    <Collapse isOpen={ index1+1 === activeAccordion }>
                                        <div className="collapse-content test_collapse" style={{padding: "10px 5px 10px"}}>

                                          <div className="section_details_in_acc test_collapse">


                                          {value1.section_details.map((value,index)=>{
                              return(
                                <div key={index}>

                                  <div className="row test_collapse">
                                  <div className="col-lg-12 col-md-12 col-sm-12" style={{paddingRight: "15px",marginBottom:"-15px"}}>
                                      <div className="upladedddd">
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}> Daily Sales Report </div>

                                      </div>
                                       <hr className="hr_newww" style={{marginTop:" 0px",marginBottom: "25px"}}/>
                                      </div>



                                      <div className="col-lg-6 col-md-12" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Policy Number</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "uppercase"}}>{value.policy_number}</span>
                                      </div>

                                      <div className="col-lg-6 col-md-12" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">RTO Cluster</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "uppercase"}}>{value.rto_cluster ? value.rto_cluster.label : value.rto_cluster }</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Vehicle Number</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "uppercase"}}>{value.vehicle_number}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">RTO Location</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.rto_location}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Policy Start Date</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{dateFormat(value.new_start_date.replace('Z', ""), "dd-mm-yyyy")}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Policy End Date</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{dateFormat(value.new_end_date.replace('Z', ""), "dd-mm-yyyy")}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Issue Date</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{dateFormat(value.new_end_date.replace('Z', ""), "dd-mm-yyyy")}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Customer Name</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.customer_name}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Fleet or Non Fleet</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.fleet_type}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Contact Number</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.contact_no}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Motor/Non Motor</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.motor_non_motor ? value.motor_non_motor.label:""}</span>
                                      </div>

                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display:value.motor_non_motor ? (value.motor_non_motor.label == "Motor" ? "inline-flex" :"none"): "none"}}>
                                      <div className="width_of_data">Motor Type</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.type_of_motor ? value.type_of_motor.label:""}</span>
                                      </div>

                                      {/* PPrivate */}
                                      <div className="col-lg-6 col-md-12 top_new_top" style={{display:value.type_of_motor ? (value.type_of_motor.label == "Private car" ? "inline-flex" :"none"): "none"}}>
                                      <div className="width_of_data">Type Of Policy</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.private_car_data ? value.private_car_data.label:""}</span>
                                      </div>


                                      {/* Two Wheleer */}
                                      <div className="col-lg-6 col-md-12 top_new_top" style={{display:value.type_of_motor ? (value.type_of_motor.label == "Two Wheeler" ? "inline-flex" :"none"): "none"}}>
                                      <div className="width_of_data">Type Of Policy</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.two_wheeler ? value.two_wheeler.label:""}</span>
                                      </div>


                                      {/* Mis D */}
                                      <div className="col-lg-6 col-md-12 top_new_top" style={{display:value.type_of_motor ? (value.type_of_motor.label == "MISC D" ? "inline-flex" :"none"): "none"}}>
                                      <div className="width_of_data">MISC D</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.miscd_data ? value.miscd_data.label:""}</span>
                                      </div>




                                      {/* Commericalll */}
                                      <div className="col-lg-6 col-md-12 top_new_top" style={{display:value.type_of_motor ? (value.type_of_motor.label == "Commercial" ? "inline-flex" :"none"): "none"}}>
                                      <div className="width_of_data">Commercial</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.comercial_data ? value.comercial_data.label:""}</span>
                                      </div>

                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display:value.comercial_data ? (value.comercial_data.label == "PCV" ? "inline-flex" :"none"): "none"}}>
                                      <div className="width_of_data">PCV Type</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.pvc_type ? value.pvc_type.label:""}</span>
                                      </div>

                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display:value.type_of_motor ? (value.type_of_motor.label == "Commercial" || value.type_of_motor.label == "MISC D" ? "inline-flex" :"none"): "none"}}>
                                      <div className="width_of_data">Type Of Policy</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.liabilty_or_comprehensive ? value.liabilty_or_comprehensive.label:""}</span>
                                      </div>

                                      {/* <div className="col-lg-6 col-md-12 top_new_top" style={{ display:value.pvc_type ? (value.pvc_type.label == "School Bus" || value.pvc_type.label == "Staff bus" || value.pvc_type.label == "Route bus" || value.pvc_type.label == "Taxi" ? "inline-flex" :"none"): "none"}}>
                                      <div className="width_of_data">Seat Capacity</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.pvc_capacity}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display:value.comercial_data ? (value.comercial_data.label == "GCV" ? "inline-flex" :"none"): "none"}}>
                                      <div className="width_of_data">GVW</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.gcv_data ? value.gcv_data:"" }</span>
                                      </div> */}


                                  </div>
{/* *******************************************************************   2nd Section********************************************************************************* */}
                                  <div className="sec_data" style={{display:value.type_of_motor ? (value.type_of_motor.section == "2_section" ? "block" : "none"):"none"}}>
                                  {/* <div className="sec_data" style={{display:value.sub_class_of_vehicle.section == "2_section" ? "block" : "none"}}> */}
                                  <div className="row">
                                  <div className="col-lg-12 col-md-12 col-sm-12" style={{paddingRight: "15px",marginBottom:"-15px",marginTop:"25px"}}>
                                      <div className="upladedddd">
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}> MIS-D Type </div>

                                      </div>
                                       <hr className="hr_newww" style={{marginTop:" 0px",marginBottom: "25px"}}/>
                                      </div>


                                      <div className="col-lg-12 col-md-12" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Type Of MIS-D</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.type_of_mis_d}</span>
                                      </div>
                                  </div>
                                </div>


{/* *******************************************************************   3nd Section********************************************************************************* */}
                                  <div className="sec_data" >
                                  <div className="row">
                                  <div className="col-lg-12 col-md-12 col-sm-12" style={{paddingRight: "15px",marginBottom:"-15px",marginTop:"25px"}}>
                                      <div className="upladedddd">
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}> Type Of Policy </div>

                                      </div>
                                       <hr className="hr_newww" style={{marginTop:" 0px",marginBottom: "25px"}}/>
                                      </div>


                                      {/* <div className="col-lg-6 col-md-12" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Type Of Policy</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.type_of_policy.label}</span>
                                      </div> */}


                                      <div className="col-lg-6 col-md-12" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Make</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.make}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Model</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.model}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">CC/GVW/PCC</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.cc_gvw_pcc}</span>
                                      </div>

                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">GVW Category</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.gvw_category == undefined ? "" : value.gvw_category}</span>
                                      </div>

                                      <div className="col-lg-6 col-md-12" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">NCB</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.ncb_type ? value.ncb_type.label:""}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Add On &apos; s</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.add_on_type}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Fuel Type</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.fuel_type ? value.fuel_type.label :""}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Insurer</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.insurer_array_new.label}</span>
                                      </div>

                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">OD Premium</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>&#x20b9; {value.od_amount}</span>
                                      </div>

                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Addon Premium</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>&#x20b9; {value.addon_amount}</span>
                                      </div>

                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">OD+Addon Premium</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>&#x20b9; {value.addon_premium}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Net Premium</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.net_premium}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Gross Premium</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.gross_premium}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Amount Receivable Rs.</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.amount_receivable}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">PO on</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.po_on_type ? value.po_on_type.label :""}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Agent or Telecalling</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.agent_or_tellcalling ? value.agent_or_tellcalling.label:""}</span>
                                      </div>

                                      <div className="col-lg-6 col-md-12" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Type of Payout</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.type_of_payout ? value.type_of_payout.label:""}</span>
                                      </div>


                                  </div>
                                </div>

  {/* *******************************************************************   4nd Section********************************************************************************* */}
                                <div className="four_data" style={{display:value.agent_or_tellcalling.section == "4_section" ? "block" : "none"}}>
                                  <div className="row">
                                  <div className="col-lg-12 col-md-12 col-sm-12" style={{paddingRight: "15px",marginBottom:"-15px",marginTop:"25px"}}>
                                      <div className="upladedddd">
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}>Telecaller Name </div>

                                      </div>
                                       <hr className="hr_newww" style={{marginTop:" 0px",marginBottom: "25px"}}/>
                                      </div>


                                      <div className="col-lg-12 col-md-12" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Telecaller Name</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.tele_caller_name ? value.tele_caller_name.label :""}</span>
                                      </div>
                                  </div>
                                </div>


  {/* *******************************************************************   5nd Section********************************************************************************* */}
                                <div className="five_data" style={{display:value.agent_or_tellcalling.section == "5_section" ? "block" : "none"}}>
                                  <div className="row">
                                  <div className="col-lg-12 col-md-12 col-sm-12" style={{paddingRight: "15px",marginBottom:"-15px",marginTop:"25px"}}>
                                      <div className="upladedddd">
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}>Agent/Dealer Name</div>

                                      </div>
                                       <hr className="hr_newww" style={{marginTop:" 0px",marginBottom: "25px"}}/>
                                      </div>


                                      <div className="col-lg-12 col-md-12" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Agent/Dealer Name</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.agent_dealer_name ? value.agent_dealer_name.label :""}</span>
                                      </div>
                                  </div>
                                </div>


  {/* *******************************************************************   6nd Section********************************************************************************* */}
                                <div className="six_data">
                                  <div className="row">
                                  <div className="col-lg-12 col-md-12 col-sm-12" style={{paddingRight: "15px",marginBottom:"-15px",marginTop:"25px"}}>
                                      <div className="upladedddd">
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}>PO Details </div>

                                      </div>
                                       <hr className="hr_newww" style={{marginTop:" 0px",marginBottom: "25px"}}/>
                                      </div>


                                      <div className="col-lg-6 col-md-12" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">PO %</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{Number(value.po_discount_in_percent).toFixed()}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">PO Amount</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>Rs. {value.po_discount_amount}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">PO Status</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.po_discount_status}</span>
                                      </div>
                                  </div>
                                </div>

{/* *******************************************************************   7nd Section********************************************************************************* */}
                            <div className="seven_data">
                                  <div className="row">
                                  <div className="col-lg-12 col-md-12 col-sm-12" style={{paddingRight: "15px",marginBottom:"-15px",marginTop:"25px"}}>
                                      <div className="upladedddd">
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}>Premium Details</div>

                                      </div>
                                       <hr className="hr_newww" style={{marginTop:" 0px",marginBottom: "25px"}}/>
                                      </div>


                                      <div className="col-lg-12 col-md-12" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Premium Payment of SC</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.mode_of_premium_payment.label}</span>
                                      </div>
                                  </div>
                                </div>
{/* *******************************************************************   8nd Section********************************************************************************* */}
                            <div className="eghit_data" style={{display:value.mode_of_premium_payment.section == "8_section" || value.mode_of_premium_received.label == "Cheque to SC" ? "block" : "none"}}>
                                  <div className="row">
                                  <div className="col-lg-12 col-md-12 col-sm-12" style={{paddingRight: "15px",marginBottom:"-15px",marginTop:"25px"}}>
                                      <div className="upladedddd">
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}>Cutomer Cheque Details</div>

                                      </div>
                                       <hr className="hr_newww" style={{marginTop:" 0px",marginBottom: "25px"}}/>
                                      </div>


                                      <div className="col-lg-6 col-md-12" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Physical Cheque received</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.physical_cheque_received}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Cheque No</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.cheque_no}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Cheque Date</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.new_cheque_date ? dateFormat(value.new_cheque_date.replace('Z', ""), "dd-mm-yyyy"):""}</span>
                                      {/* <span className="" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.cheque_date}</span> */}
                                      </div>


                                      <div className="col-lg-6 col-md-12" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Bank Name</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.bank_name}</span>
                                      </div>
                                  </div>
                                </div>
{/* *******************************************************************   9nd Section********************************************************************************* */}
                            <div className="nine_data" style={{display:value.cheque_array == "" || value.cheque_array == undefined ? "none" : "block"}}>
                                  <div className="row">
                                  <div className="col-lg-12 col-md-12 col-sm-12" style={{paddingRight: "15px",marginBottom:"-15px",marginTop:"25px"}}>
                                      <div className="upladedddd">
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}>Cheque to Insurance Company</div>

                                      </div>
                                       <hr className="hr_newww" style={{marginTop:" 0px",marginBottom: "25px"}}/>
                                      </div>

                                      <div className="col-lg-12 col-md-12 top_new_top" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Cheque Type</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.insurer_paid_type}</span>
                                      </div>


                                      {value.cheque_array ? value.cheque_array.map((value1,index1)=>{
                                          return(
                                            <>
                                             <div className="col-lg-6 col-md-12" style={{ display: "inline-flex"}}>
                                              <div className="width_of_data">Cheque No {index1+1}</div>:
                                              <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value1.cheque_object.label}</span>
                                              </div>


                                              <div className="col-lg-6 col-md-12" style={{ display: "inline-flex"}}>
                                              <div className="width_of_data">Amount</div>:
                                              <span className="" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>&#x20b9; {value1.policy_amount}</span>
                                              </div>
                                            </>
                                          )
                                        }):[]}



                                      {/* <div className="col-lg-6 col-md-12" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Cheque No 1</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.cheque_no_1}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Amount</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>Rs. {value.cheque_no_1_amount}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Cheque No 2</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.cheque_no_2}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Amount</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>Rs. {value.cheque_no_2_amount}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Cheque No 3</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.cheque_no_3}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Amount</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>Rs. {value.cheque_no_3_amount}</span>
                                      </div> */}

                                  </div>
                                </div>


{/* *******************************************************************   10nd Section********************************************************************************* */}
                            <div className="ten_data">
                                  <div className="row">
                                  <div className="col-lg-12 col-md-12 col-sm-12" style={{paddingRight: "15px",marginBottom:"-15px",marginTop:"25px"}}>
                                      <div className="upladedddd">
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}>Remarks </div>

                                      </div>
                                       <hr className="hr_newww" style={{marginTop:" 0px",marginBottom: "25px"}}/>
                                      </div>


                                      <div className="col-lg-12 col-md-12" style={{ display: "inline-flex",marginBottom: "35px"}}>
                                      <div className="width_of_data">Remarks</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.policy_remarks}</span>
                                      </div>
                                  </div>
                                </div>



                            <div className="eleventh_data" style={{display:value.pending_payment_details == undefined ?"none":"block"}}>
                                  <div className="row">
                                  <div className="col-lg-12 col-md-12 col-sm-12" style={{paddingRight: "15px",marginBottom:"-15px",marginTop:"25px"}}>
                                      <div className="upladedddd">
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}>Pending Payment Details</div>

                                      </div>
                                       <hr className="hr_newww" style={{marginTop:" 0px",marginBottom: "25px"}}/>
                                      </div>


                                      <div className="col-lg-6 col-md-6" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Date</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.pending_payment_details ? dateFormat(value.pending_payment_details.date.replace('Z', ""), "dd-mm-yyyy"):""}</span>
                                      </div>

                                      <div className="col-lg-6 col-md-6" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Mode of payment</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.pending_payment_details ? value.pending_payment_details.mode_of_payment.label:""}</span>
                                      </div>

                                      <div className="col-lg-6 col-md-6" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Amount</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>&#x20b9;{value.pending_payment_details ? value.pending_payment_details.amount :""}</span>
                                      </div>

                                      {/* <div className="col-lg-6 col-md-6" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Received From</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.pending_payment_details ? value.pending_payment_details.received_from :""}</span>
                                      </div>
                                      <div className="col-lg-6 col-md-6" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Received To</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.pending_payment_details ? value.pending_payment_details.received_to :""}</span>
                                      </div> */}

                                      <div className="col-lg-12 col-md-12" style={{display:value.pending_payment_details ? (value.pending_payment_details.mode_of_payment.label=="Cheque to SC" ? "block" :"none") : "none"}}>
                                      {/* <div className="row">

                                      <div className="col-lg-6 col-md-6" style={{ display: "inline-flex",marginBottom: "35px"}}>
                                      <div className="width_of_data">Cheque No</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.pending_payment_details ? value.pending_payment_details.cheque_payment_details[0].cheque_no:""}</span>
                                      </div>

                                      <div className="col-lg-6 col-md-6" style={{ display: "inline-flex",marginBottom: "35px"}}>
                                      <div className="width_of_data">Cheque Amount</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>&#x20b9;{value.pending_payment_details ? value.pending_payment_details.cheque_payment_details[0].cheque_amount_received:""}</span>
                                      </div>

                                      <div className="col-lg-6 col-md-6" style={{ display: "inline-flex",marginBottom: "35px"}}>
                                      <div className="width_of_data">Cheque Date</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.pending_payment_details ? dateFormat(value.pending_payment_details.cheque_payment_details[0].cheque_date.replace('Z', ""), "dd-mm-yyyy"):""}</span>

                                      </div>

                                      <div className="col-lg-6 col-md-6" style={{ display: "inline-flex",marginBottom: "35px"}}>
                                      <div className="width_of_data">Bank Name</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.pending_payment_details ? value.pending_payment_details.cheque_payment_details[0].bank_name:""}</span>
                                      </div>
                                      </div> */}

                                    {value.pending_payment_details ? value.pending_payment_details.cheque_payment_details.map((v,i)=>{
                                        //console.log("vvvvvvvvvvvvvvvvvvvvvvvv",v);
                                        return(
                                          <div className="row" key={i}>

                                          <div className="col-lg-6 col-md-6" style={{ display: "inline-flex"}}>
                                          <div className="width_of_data">Cheque No</div>:
                                          <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{v.cheque_no}</span>
                                          </div>

                                          <div className="col-lg-6 col-md-6" style={{ display: "inline-flex"}}>
                                          <div className="width_of_data">Cheque Amount</div>:
                                          <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>&#x20b9;{v.cheque_amount_received}</span>
                                          </div>

                                          <div className="col-lg-6 col-md-6" style={{ display: "inline-flex"}}>
                                          <div className="width_of_data">Cheque Date</div>:
                                          <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{dateFormat(v.cheque_date.replace('Z', ""), "dd-mm-yyyy")}</span>
                                          </div>

                                          <div className="col-lg-6 col-md-6" style={{ display: "inline-flex"}}>
                                          <div className="width_of_data">Bank Name</div>:
                                          <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{v.bank_name}</span>
                                          </div>
                                          </div>
                                        )
                                      }):""}


                                      </div>



                                      <div className="col-lg-6 col-md-12" style={{ display: "inline-flex",marginBottom: "35px"}}>
                                      <div className="width_of_data">Attachment</div>:
                                      <div className="attachment_data_array_122">
                                        {value.pending_payment_details ? value.pending_payment_details.image_path.map((value,index)=>{
                                            return(
                                                <div key={index} className="m_bottom_123">
                                                     <span style={{display:value1.file_type=="image" ? "block" :"none"}}>
                                                          <a rel="noreferrer" href={value1.image_name} target="_blank">
                                                          <img src={value1.image_name} aria-hidden="true" alt="pdf image" className="image_pdf"/></a>
                                                          </span>
                                                          <span style={{display:value1.file_type=="pdf" ? "block" :"none"}}>
                                                          <a rel="noreferrer" href={value1.image_name} target="_blank">
                                                          <img src={pdf_img} aria-hidden="true" alt="pdf image" className="image_pdf"/></a>
                                                          </span>
                                                          <span style={{display:value1.file_type=="text" ? "block" :"none"}}>
                                                          <a rel="noreferrer" href={value1.image_name} target="_blank">
                                                          <img src={excel_img} aria-hidden="true" alt="pdf image" className="image_pdf"/></a>
                                                          </span>
                                                          <span style={{display:value1.file_type != "text" && value1.file_type != "pdf" && value1.file_type != "image" ? "block" :"none"}}>
                                                          <a rel="noreferrer" href={value1.image_name} target="_blank">
                                                          <img src={other_img} aria-hidden="true" alt="pdf image" className="image_pdf"/></a>
                                                          </span>
                                                </div>
                                            )
                                        }):[]}
                                    </div>
                                      </div>


                                  </div>
                                </div>


                            <div className="twwlt_data" style={{display:value.pending_payout_details == undefined ?"none":"block"}}>
                                  <div className="row">
                                  <div className="col-lg-12 col-md-12 col-sm-12" style={{paddingRight: "15px",marginBottom:"-15px",marginTop:"25px"}}>
                                      <div className="upladedddd">
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}>Pending Payout Details</div>

                                      </div>
                                       <hr className="hr_newww" style={{marginTop:" 0px",marginBottom: "25px"}}/>
                                      </div>


                                      <div className="col-lg-6 col-md-6" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Date</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.pending_payout_details ? dateFormat(value.pending_payout_details.date.replace('Z', ""), "dd-mm-yyyy"):""}</span>
                                      </div>

                                      <div className="col-lg-6 col-md-6" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Mode of payment</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.pending_payout_details ? value.pending_payout_details.mode_of_payment.label:""}</span>
                                      </div>

                                      <div className="col-lg-6 col-md-6" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Amount</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>&#x20b9;{value.pending_payout_details ? value.pending_payout_details.amount :""}</span>
                                      </div>

                                      {/* <div className="col-lg-6 col-md-6" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Received From</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.pending_payout_details ? value.pending_payout_details.received_from :""}</span>
                                      </div>
                                      <div className="col-lg-6 col-md-6" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Received To</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.pending_payout_details ? value.pending_payout_details.received_to :""}</span>
                                      </div> */}

                                      <div className="col-lg-12 col-md-12" style={{display:value.pending_payout_details ? (value.pending_payout_details.mode_of_payment.label=="Cheque" ? "block" :"none") : "none"}}>

                                      {value.pending_payout_details ? value.pending_payout_details.cheque_payment_details.map((v,i)=>{
                                        //console.log("vvvvvvvvvvvvvvvvvvvvvvvv",v);
                                        return(
                                          <div className="row" key={i}>

                                          <div className="col-lg-6 col-md-6" style={{ display: "inline-flex"}}>
                                          <div className="width_of_data">Cheque No</div>:
                                          <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{v.cheque_no}</span>
                                          </div>

                                          <div className="col-lg-6 col-md-6" style={{ display: "inline-flex"}}>
                                          <div className="width_of_data">Cheque Amount</div>:
                                          <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>&#x20b9;{v.cheque_amount_received}</span>
                                          </div>

                                          <div className="col-lg-6 col-md-6" style={{ display: "inline-flex"}}>
                                          <div className="width_of_data">Cheque Date</div>:
                                          <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.pending_payout_details ? dateFormat(v.cheque_date.replace('Z', ""), "dd-mm-yyyy"):""}</span>
                                          </div>

                                          <div className="col-lg-6 col-md-6" style={{ display: "inline-flex"}}>
                                          <div className="width_of_data">Bank Name</div>:
                                          <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{v.bank_name}</span>
                                          </div>
                                          </div>
                                        )
                                      }):""}

                                      </div>


                                      <div className="col-lg-12 col-md-12" style={{ display: "inline-flex",marginBottom: "35px"}}>
                                      <div className="width_of_data">Attachment</div>:
                                      <span className="attachment_data_array_122">
                                        {value.pending_payout_details ? value.pending_payout_details.image_path.map((value1,index)=>{
                                          ////console.log("value1============",value1);
                                            return(
                                                <span key={index} className="m_bottom_123">
                                                     <span style={{display:value1.file_type =="image" ? "block" :"none"}}>
                                                          <a rel="noreferrer" href={value1.image_name} target="_blank">
                                                          <img src={value1.image_name} aria-hidden="true" alt="pdf image" className="image_pdf"/></a>
                                                          </span>
                                                          <span style={{display:value1.file_type=="pdf" ? "block" :"none"}}>
                                                          <a rel="noreferrer" href={value1.image_name} target="_blank">
                                                          <img src={pdf_img} aria-hidden="true" alt="pdf image" className="image_pdf"/></a>
                                                          </span>
                                                          <span style={{display:value1.file_type=="text" ? "block" :"none"}}>
                                                          <a rel="noreferrer" href={value1.image_name} target="_blank">
                                                          <img src={excel_img} aria-hidden="true" alt="pdf image" className="image_pdf"/></a>
                                                          </span>
                                                          <span style={{display:value1.file_type != "text" && value1.file_type != "pdf" && value1.file_type != "image" ? "block" :"none"}}>
                                                          <a rel="noreferrer" href={value1.image_name} target="_blank">
                                                          <img src={other_img} aria-hidden="true" alt="pdf image" className="image_pdf"/></a>
                                                          </span>
                                                </span>
                                            )
                                        }):""}
                                    </span>


                                      </div>


                                  </div>
                                </div>
                              </div>
                              )
                            })}
                       </div>
                   </div>
                </Collapse>
             </div>
             )
           })}
       </div>

{/* *************************************** Show the data of Forms From here ************************************************************************************************** */}
                            <div className="show_deatisl_of_formss  test_collapse" style={{display:this.state.for_show_btn!="" && this.state.show_edit_logs=="none" ? "block" : "none"}}>

                            {/* <div className="policy_sourced_by"  style={{ display: "inline-flex"}}>

                            <div className="width_of_data_new">Policy Sorced By </div>:
                            <span className="" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{this.state.sm_name}</span>


                            </div> */}

                            <div className="row policy_sourced_by">
                              <div className="col-lg-6 col-md-12" style={{display:"inline-flex"}}>
                              <div className="width_of_data_new">Policy Issued By </div>:
                              <span className="" style={{ marginLeft: "5px" ,textTransform: "capitalize"}}>{this.state.policy_issued_by}</span>
                              </div>
                              <div className="col-lg-6 col-md-12 show_timerr">
                              <span style={{marginRight:"13px",color:"red"}}>Form Filling Time : {this.state.form_filling_time}</span>

                              </div>
                             </div>


                            {this.state.section_details_new.map((value,index)=>{
                              return(
                                <div key={index}>

                                  <div className="row">
                                  <div className="col-lg-12 col-md-12 col-sm-12" style={{paddingRight: "15px",marginBottom:"-15px"}}>
                                      <div className="upladedddd">
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}> Daily Sales Report </div>

                                      </div>
                                       <hr className="hr_newww" style={{marginTop:" 0px",marginBottom: "25px"}}/>
                                      </div>


                                    <div className="col-lg-6 col-md-12" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Policy Number</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "uppercase"}}>{value.policy_number}</span>
                                      </div>


                                    <div className="col-lg-6 col-md-12" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">RTO Cluster</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "uppercase"}}>{value.rto_cluster ? value.rto_cluster.label : value.rto_cluster }</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Vehicle Number</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "uppercase"}}>{value.vehicle_number}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">RTO Location</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.rto_location}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Policy Start Date</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{dateFormat(value.new_start_date.replace('Z', ""), "dd-mm-yyyy")}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Policy End Date</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{dateFormat(value.new_end_date.replace('Z', ""), "dd-mm-yyyy")}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Issue Date</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{dateFormat(value.new_end_date.replace('Z', ""), "dd-mm-yyyy")}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Customer Name</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.customer_name}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Fleet or Non Fleet</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.fleet_type}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Contact Number</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.contact_no}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Motor/Non Motor</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.motor_non_motor ? value.motor_non_motor.label:""}</span>
                                      </div>

                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display:value.motor_non_motor ? (value.motor_non_motor.label == "Motor" ? "inline-flex" :"none"): "none"}}>
                                      <div className="width_of_data">Motor Type</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.type_of_motor ? value.type_of_motor.label:""}</span>
                                      </div>

                                      {/* PPrivate */}
                                      <div className="col-lg-6 col-md-12 top_new_top" style={{display:value.type_of_motor ? (value.type_of_motor.label == "Private car" ? "inline-flex" :"none"): "none"}}>
                                      <div className="width_of_data">Type Of Policy</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.private_car_data ? value.private_car_data.label:""}</span>
                                      </div>


                                      {/* Two Wheleer */}
                                      <div className="col-lg-6 col-md-12 top_new_top" style={{display:value.type_of_motor ? (value.type_of_motor.label == "Two Wheeler" ? "inline-flex" :"none"): "none"}}>
                                      <div className="width_of_data">Type Of Policy</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.two_wheeler ? value.two_wheeler.label:""}</span>
                                      </div>


                                      {/* Mis D */}
                                      <div className="col-lg-6 col-md-12 top_new_top" style={{display:value.type_of_motor ? (value.type_of_motor.label == "MISC D" ? "inline-flex" :"none"): "none"}}>
                                      <div className="width_of_data">MISC D</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.miscd_data ? value.miscd_data.label:""}</span>
                                      </div>




                                      {/* Commericalll */}
                                      <div className="col-lg-6 col-md-12 top_new_top" style={{display:value.type_of_motor ? (value.type_of_motor.label == "Commercial" ? "inline-flex" :"none"): "none"}}>
                                      <div className="width_of_data">Commercial</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.comercial_data ? value.comercial_data.label:""}</span>
                                      </div>

                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display:value.comercial_data ? (value.comercial_data.label == "PCV" ? "inline-flex" :"none"): "none"}}>
                                      <div className="width_of_data">PCV Type</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.pvc_type ? value.pvc_type.label:""}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display:value.type_of_motor ? (value.type_of_motor.label == "Commercial" || value.type_of_motor.label == "MISC D" ? "inline-flex" :"none"): "none"}}>
                                      <div className="width_of_data">Type Of Policy</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.liabilty_or_comprehensive ? value.liabilty_or_comprehensive.label:""}</span>
                                      </div>

                                      {/* <div className="col-lg-6 col-md-12 top_new_top" style={{ display:value.pvc_type ? (value.pvc_type.label == "School Bus" || value.pvc_type.label == "Staff bus" || value.pvc_type.label == "Route bus" || value.pvc_type.label == "Taxi" ? "inline-flex" :"none"): "none"}}>
                                      <div className="width_of_data">Seat Capacity</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.pvc_capacity}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display:value.comercial_data ? (value.comercial_data.label == "GCV" ? "inline-flex" :"none"): "none"}}>
                                      <div className="width_of_data">GVW</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.gcv_data ? value.gcv_data:"" }</span>
                                      </div> */}


                                      {/* <div className="col-lg-6 col-md-12 top_new_top" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Class Of Vehicle</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.class_of_vehicle.label}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Sub Class Of Vehicle</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.sub_class_of_vehicle.label}</span>
                                      </div> */}
                                  </div>
{/* *******************************************************************   2nd Section********************************************************************************* */}
                                  <div className="sec_data" style={{display:value.type_of_motor ? (value.type_of_motor.section == "2_section" ? "block" : "none"):"none"}}>
                                  {/* <div className="sec_data" style={{display:value.sub_class_of_vehicle.section == "2_section" ? "block" : "none"}}> */}
                                  <div className="row">
                                  <div className="col-lg-12 col-md-12 col-sm-12" style={{paddingRight: "15px",marginBottom:"-15px",marginTop:"25px"}}>
                                      <div className="upladedddd">
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}> MIS-D Type</div>

                                      </div>
                                       <hr className="hr_newww" style={{marginTop:" 0px",marginBottom: "25px"}}/>
                                      </div>


                                      <div className="col-lg-12 col-md-12" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Type Of MIS-D</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.type_of_mis_d}</span>
                                      </div>
                                  </div>
                                </div>


{/* *******************************************************************   3nd Section********************************************************************************* */}
                                  <div className="sec_data" >
                                  <div className="row">
                                  <div className="col-lg-12 col-md-12 col-sm-12" style={{paddingRight: "15px",marginBottom:"-15px",marginTop:"25px"}}>
                                      <div className="upladedddd">
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}> Type Of Policy </div>

                                      </div>
                                       <hr className="hr_newww" style={{marginTop:" 0px",marginBottom: "25px"}}/>
                                      </div>


                                       {/* <div className="col-lg-6 col-md-12" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Type Of Policy</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.type_of_policy.label}</span>
                                      </div> */}


                                      <div className="col-lg-6 col-md-12" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Make</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.make}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Model</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.model}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">CC/GVW/PCC</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.cc_gvw_pcc}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">GVW Category</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.gvw_category == undefined ? "" : value.gvw_category}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">NCB</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.ncb_type ? value.ncb_type.label:""}</span>
                                      </div>


                                       <div className="col-lg-6 col-md-12 top_new_top" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Add On &apos; s</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.add_on_type}</span>
                                      </div>


                                     <div className="col-lg-6 col-md-12 top_new_top" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Fuel Type</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.fuel_type ? value.fuel_type.label : ""}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Insurer</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.insurer_array_new ? value.insurer_array_new.label :""}</span>
                                      </div>


                                       <div className="col-lg-6 col-md-12 top_new_top" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">OD Premium</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>&#x20b9; {value.od_amount}</span>
                                      </div>
                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Addon Premium</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize",}}>&#x20b9; {value.addon_amount}</span>
                                      </div>
                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">OD+Addon Premium</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>&#x20b9; {value.addon_premium}</span>
                                      </div>


                                     <div className="col-lg-6 col-md-12 top_new_top" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Net Premium</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}> &#x20b9; {value.net_premium}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Gross Premium</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}> &#x20b9; {value.gross_premium}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Amount Receivable Rs.</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>&#x20b9; {value.amount_receivable}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">PO on</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.po_on_type ? value.po_on_type.label :"" }</span>
                                      </div>

                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Type of Payout</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.type_of_payout ? value.type_of_payout.label :""}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Agent or Telecalling</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.agent_or_tellcalling ? value.agent_or_tellcalling.label:""}</span>
                                      </div>



                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Customer Payment Status</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.payment_from_customer ? value.payment_from_customer.label :""}</span>
                                      </div>

                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Premium Received By Customer</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.mode_of_premium_received ? value.mode_of_premium_received.label : ""}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Attachment</div>:
                                      <div className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize",display:"flex",flexWrap:"wrap"}}>{value.customer_payment_attachment ? value.customer_payment_attachment.map((v,i)=>{
                                        return(
                                          <div key={i} className="m_bottom">
                                          <span style={{display: v.file_type=="pdf" ? "block" :"none"}}>
                                          <a rel="noreferrer" href={v.file_name} target="_blank">
                                          <img width="50" src={pdf_img} alt='' style={{ marginRight: "6px", height: "40px",marginBottom:"5px"}} />
                                          </a>
                                          </span>
                                          <span style={{display: v.file_type !="pdf" ? "block" :"none"}}>
                                          <a rel="noreferrer" href={v.file_name} target="_blank">
                                          <img width="50" src={v.file_name} alt='' style={{ marginRight: "6px", height: "40px",marginBottom:"5px"}} />
                                          </a>
                                         </span>
                                     </div>
                                        )
                                      }) : null}</div>
                                      </div>


                                  </div>
                                </div>

  {/* *******************************************************************   4nd Section********************************************************************************* */}
                                <div className="four_data" style={{display:value.agent_or_tellcalling.section == "4_section" ? "block" : "none"}}>
                                  <div className="row">
                                  <div className="col-lg-12 col-md-12 col-sm-12" style={{paddingRight: "15px",marginBottom:"-15px",marginTop:"25px"}}>
                                      <div className="upladedddd">
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}>Telecaller Name </div>

                                      </div>
                                       <hr className="hr_newww" style={{marginTop:" 0px",marginBottom: "25px"}}/>
                                      </div>


                                      <div className="col-lg-12 col-md-12" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Telecaller Name</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.tele_caller_name ? value.tele_caller_name.label :""}</span>
                                      </div>
                                  </div>
                                </div>


  {/* *******************************************************************   5nd Section********************************************************************************* */}
                                <div className="five_data" style={{display:value.agent_or_tellcalling.section == "5_section" ? "block" : "none"}}>
                                  <div className="row">
                                  <div className="col-lg-12 col-md-12 col-sm-12" style={{paddingRight: "15px",marginBottom:"-15px",marginTop:"25px"}}>
                                      <div className="upladedddd">
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}>Agent/Dealer Name</div>

                                      </div>
                                       <hr className="hr_newww" style={{marginTop:" 0px",marginBottom: "25px"}}/>
                                      </div>


                                      <div className="col-lg-12 col-md-12" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Agent/Dealer Name</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.agent_dealer_name.label}</span>
                                      </div>
                                  </div>
                                </div>


  {/* *******************************************************************   6nd Section********************************************************************************* */}
                                <div className="six_data">
                                  <div className="row">
                                  <div className="col-lg-12 col-md-12 col-sm-12" style={{paddingRight: "15px",marginBottom:"-15px",marginTop:"25px"}}>
                                      <div className="upladedddd">
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}>PO Details </div>

                                      </div>
                                       <hr className="hr_newww" style={{marginTop:" 0px",marginBottom: "25px"}}/>
                                      </div>


                                      <div className="col-lg-6 col-md-12" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">PO %</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{Number(value.po_discount_in_percent).toFixed()}%</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">PO Amount</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>&#x20b9; {value.po_discount_amount}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">PO Status</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.po_discount_status}</span>
                                      </div>
                                  </div>
                                </div>

{/* *******************************************************************   7nd Section********************************************************************************* */}
                            <div className="seven_data">
                                  <div className="row">
                                  <div className="col-lg-12 col-md-12 col-sm-12" style={{paddingRight: "15px",marginBottom:"-15px",marginTop:"25px"}}>
                                      <div className="upladedddd">
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}>Premium Details</div>

                                      </div>
                                       <hr className="hr_newww" style={{marginTop:" 0px",marginBottom: "25px"}}/>
                                      </div>


                                      <div className="col-lg-12 col-md-12" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Premium Payment by SC</div>:
                                      <span className="" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.mode_of_premium_payment.label}</span>
                                      </div>
                                  </div>
                                </div>
{/* *******************************************************************   8nd Section********************************************************************************* */}
                            <div className="eghit_data" style={{display:value.mode_of_premium_payment.section == "8_section"|| value.mode_of_premium_received.label == "Cheque to SC" ? "block" : "none"}}>
                                  <div className="row">
                                  <div className="col-lg-12 col-md-12 col-sm-12" style={{paddingRight: "15px",marginBottom:"-15px",marginTop:"25px"}}>
                                      <div className="upladedddd">
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}>Cutomer Cheque Details</div>

                                      </div>
                                       <hr className="hr_newww" style={{marginTop:" 0px",marginBottom: "25px"}}/>
                                      </div>


                                      <div className="col-lg-6 col-md-12" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Physical Cheque received</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.physical_cheque_received}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Cheque No</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.cheque_no}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Cheque Amount</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize",display:value.cheque_amount_received == "" || value.cheque_amount_received == undefined ? "none" : "block"}}>&#x20b9;{value.cheque_amount_received ? value.cheque_amount_received : ""}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Cheque Date</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.new_cheque_date ? dateFormat(value.new_cheque_date.replace('Z', ""), "dd-mm-yyyy"):""}</span>
                                      {/* <span className="" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.cheque_date}</span> */}
                                      </div>


                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Bank Name</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.bank_name}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Cheque Status</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.customer_cheque_status}</span>
                                      </div>

                                      <div className="col-lg-6 col-md-12" style={{ display: "inline-flex",marginBottom: "35px"}}>
                                      <div className="" style={{width:"150px"}}>Attachment</div>:
                                      <span className="attachment_data_array_122" style={{marginLeft:"10px"}}>
                                        {value.customer_cheque_attachments ? value.customer_cheque_attachments.map((value1,index)=>{
                                          // console.log("value1============",value1);
                                            return(
                                                <span key={index} className="m_bottom_123">
                                                     <span style={{display:value1.file_type =="image" ? "block" :"none"}}>
                                                          <a rel="noreferrer" href={value1.image_name} target="_blank">
                                                          <img src={value1.image_name} aria-hidden="true" alt="pdf image" className="image_pdf"/></a>
                                                          </span>
                                                          <span style={{display:value1.file_type=="pdf" ? "block" :"none"}}>
                                                          <a rel="noreferrer" href={value1.image_name} target="_blank">
                                                          <img src={pdf_img} aria-hidden="true" alt="pdf image" className="image_pdf"/></a>
                                                          </span>
                                                          <span style={{display:value1.file_type=="text" ? "block" :"none"}}>
                                                          <a rel="noreferrer" href={value1.image_name} target="_blank">
                                                          <img src={excel_img} aria-hidden="true" alt="pdf image" className="image_pdf"/></a>
                                                          </span>
                                                          <span style={{display:value1.file_type != "text" && value1.file_type != "pdf" && value1.file_type != "image" ? "block" :"none"}}>
                                                          <a rel="noreferrer" href={value1.image_name} target="_blank">
                                                          <img src={other_img} aria-hidden="true" alt="pdf image" className="image_pdf"/></a>
                                                          </span>
                                                </span>
                                            )
                                        }):""}
                                    </span>


                                      </div>





                                  </div>
                                </div>
{/* *******************************************************************   9nd Section********************************************************************************* */}
                            <div className="nine_data" style={{display:value.cheque_array === "" || value.cheque_array === undefined ? "none" : "block"}}>
                                  <div className="row">
                                  <div className="col-lg-12 col-md-12 col-sm-12" style={{paddingRight: "15px",marginBottom:"-15px",marginTop:"25px"}}>
                                      <div className="upladedddd">
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}>Cheque to Insurance Company</div>

                                      </div>
                                       <hr className="hr_newww" style={{marginTop:" 0px",marginBottom: "25px"}}/>
                                      </div>


                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Cheque Type</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.insurer_paid_type}</span>
                                      </div>
                                      <div className="col-lg-6 col-md-12 top_new_top" style={{ display: "inline-flex"}}>

                                      </div>

                                        {value.cheque_array ? value.cheque_array.map((value1,index1)=>{
                                          return(
                                            <>
                                             <div className="col-lg-6 col-md-12" style={{ display: "inline-flex"}}>
                                              <div className="width_of_data">Cheque No {index1+1}</div>:
                                              <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value1.cheque_object.label}</span>
                                              </div>


                                              <div className="col-lg-6 col-md-12" style={{ display: "inline-flex"}}>
                                              <div className="width_of_data">Amount</div>:
                                              <span className="" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>&#x20b9; {value1.policy_amount}</span>
                                              </div>
                                            </>
                                          )
                                        }):[]}




                                      {/* <div className="col-lg-6 col-md-12" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Cheque No 2</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.cheque_no_2}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Amount</div>:
                                      <span className="" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>Rs. {value.cheque_no_2_amount}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Cheque No 3</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.cheque_no_3}</span>
                                      </div>


                                      <div className="col-lg-6 col-md-12" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Amount</div>:
                                      <span className="" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>Rs. {value.cheque_no_3_amount}</span>
                                      </div> */}

                                  </div>
                                </div>


{/* *******************************************************************   10nd Section********************************************************************************* */}
                            <div className="ten_data">
                                  <div className="row">
                                  <div className="col-lg-12 col-md-12 col-sm-12" style={{paddingRight: "15px",marginBottom:"-15px",marginTop:"25px"}}>
                                      <div className="upladedddd">
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}>Remarks </div>

                                      </div>
                                       <hr className="hr_newww" style={{marginTop:" 0px",marginBottom: "25px"}}/>
                                      </div>


                                      <div className="col-lg-12 col-md-12" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Remarks</div>:
                                      <span className="" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.policy_remarks}</span>
                                      </div>
                                  </div>
                                </div>


                                <div className="eleventh_data" style={{display:value.pending_payment_details == undefined ?"none":"block"}}>
                                  <div className="row">
                                  <div className="col-lg-12 col-md-12 col-sm-12" style={{paddingRight: "15px",marginBottom:"-15px",marginTop:"25px"}}>
                                      <div className="upladedddd">
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}>Pending Payment Details</div>

                                      </div>
                                       <hr className="hr_newww" style={{marginTop:" 0px",marginBottom: "25px"}}/>
                                      </div>


                                      <div className="col-lg-6 col-md-6" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Date</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.pending_payment_details ? dateFormat(value.pending_payment_details.date.replace('Z', ""), "dd-mm-yyyy"):""}</span>
                                      </div>

                                      <div className="col-lg-6 col-md-6" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Mode of payment</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.pending_payment_details ? value.pending_payment_details.mode_of_payment.label:""}</span>
                                      </div>

                                      <div className="col-lg-6 col-md-6" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Amount</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>&#x20b9;{value.pending_payment_details ? value.pending_payment_details.amount :""}</span>
                                      </div>

                                      {/* <div className="col-lg-6 col-md-6" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Received From</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.pending_payment_details ? value.pending_payment_details.received_from :""}</span>
                                      </div>
                                      <div className="col-lg-6 col-md-6" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Received To</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.pending_payment_details ? value.pending_payment_details.received_to :""}</span>
                                      </div> */}

                                      <div className="col-lg-12 col-md-12" style={{display:value.pending_payment_details ? (value.pending_payment_details.mode_of_payment.label=="Cheque to SC" ? "block" :"none") : "none"}}>
                                      {/* <div className="row"> */}

                                      {/* <div className="col-lg-6 col-md-6" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Cheque No</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.pending_payment_details ? (value.pending_payment_details.cheque_payment_details != undefined ? value.pending_payment_details.cheque_payment_details[0].cheque_no:""):""}</span>
                                      </div> */}
{/*
                                      <div className="col-lg-6 col-md-6" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Cheque Amount</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>&#x20b9;{value.pending_payment_details ? value.pending_payment_details.cheque_payment_details[0].cheque_amount_received:""}</span>
                                      </div>

                                      <div className="col-lg-6 col-md-6" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Cheque Date</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.pending_payment_details ? dateFormat(value.pending_payment_details.cheque_payment_details[0].cheque_date.replace('Z', ""), "dd-mm-yyyy"):""}</span>
                                      </div>

                                      <div className="col-lg-6 col-md-6" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Bank Name</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.pending_payment_details ? value.pending_payment_details.cheque_payment_details[0].bank_name:""}</span>
                                      </div> */}


                                {value.pending_payment_details ? value.pending_payment_details.cheque_payment_details.map((v,i)=>{
                                        //console.log("vvvvvvvvvvvvvvvvvvvvvvvv",v);
                                        return(
                                          <div className="row" key={i} >

                                          <div className="col-lg-6 col-md-6" style={{ display: "inline-flex"}}>
                                          <div className="width_of_data">Cheque No</div>:
                                          <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{v.cheque_no}</span>
                                          </div>

                                          <div className="col-lg-6 col-md-6" style={{ display: "inline-flex"}}>
                                          <div className="width_of_data">Cheque Amount</div>:
                                          <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>&#x20b9;{v.cheque_amount_received}</span>
                                          </div>

                                          <div className="col-lg-6 col-md-6" style={{ display: "inline-flex"}}>
                                          <div className="width_of_data">Cheque Date</div>:
                                          <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{dateFormat(v.cheque_date.replace('Z', ""), "dd-mm-yyyy")}</span>
                                          </div>

                                          <div className="col-lg-6 col-md-6" style={{ display: "inline-flex"}}>
                                          <div className="width_of_data">Bank Name</div>:
                                          <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{v.bank_name}</span>
                                          </div>
                                          </div>
                                        )
                                      }):""}



                                      {/* </div> */}




                                      </div>



                                      <div className="col-lg-12 col-md-12" style={{ display: "inline-flex",marginBottom: "35px"}}>
                                      <div className="width_of_data">Attachment</div>:
                                      <span className="attachment_data_array_122">
                                        {value.pending_payment_details ? value.pending_payment_details.image_path.map((value1,index)=>{
                                          ////console.log("value1============",value1);
                                            return(
                                                <span key={index} className="m_bottom_123">
                                                     <span style={{display:value1.file_type =="image" ? "block" :"none"}}>
                                                          <a rel="noreferrer" href={value1.image_name} target="_blank">
                                                          <img src={value1.image_name} aria-hidden="true" alt="pdf image" className="image_pdf"/></a>
                                                          </span>
                                                          <span style={{display:value1.file_type=="pdf" ? "block" :"none"}}>
                                                          <a rel="noreferrer" href={value1.image_name} target="_blank">
                                                          <img src={pdf_img} aria-hidden="true" alt="pdf image" className="image_pdf"/></a>
                                                          </span>
                                                          <span style={{display:value1.file_type=="text" ? "block" :"none"}}>
                                                          <a rel="noreferrer" href={value1.image_name} target="_blank">
                                                          <img src={excel_img} aria-hidden="true" alt="pdf image" className="image_pdf"/></a>
                                                          </span>
                                                          <span style={{display:value1.file_type != "text" && value1.file_type != "pdf" && value1.file_type != "image" ? "block" :"none"}}>
                                                          <a rel="noreferrer" href={value1.image_name} target="_blank">
                                                          <img src={other_img} aria-hidden="true" alt="pdf image" className="image_pdf"/></a>
                                                          </span>
                                                </span>
                                            )
                                        }):""}
                                    </span>


                                      </div>
                                  </div>
                                </div>



                                <div className="twwlt_data" style={{display:value.pending_payout_details == undefined ?"none":"block"}}>
                                  <div className="row">
                                  <div className="col-lg-12 col-md-12 col-sm-12" style={{paddingRight: "15px",marginBottom:"-15px",marginTop:"25px"}}>
                                      <div className="upladedddd">
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}>Pending Payout Details</div>

                                      </div>
                                       <hr className="hr_newww" style={{marginTop:" 0px",marginBottom: "25px"}}/>
                                      </div>


                                      <div className="col-lg-6 col-md-6" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Date</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.pending_payout_details ? dateFormat(value.pending_payout_details.date.replace('Z', ""), "dd-mm-yyyy"):""}</span>
                                      </div>

                                      <div className="col-lg-6 col-md-6" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Mode of payment</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.pending_payout_details ? value.pending_payout_details.mode_of_payment.label:""}</span>
                                      </div>

                                      <div className="col-lg-6 col-md-6" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Amount</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>&#x20b9;{value.pending_payout_details ? value.pending_payout_details.amount :""}</span>
                                      </div>

                                      {/* <div className="col-lg-6 col-md-6" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Received From</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.pending_payout_details ? value.pending_payout_details.received_from :""}</span>
                                      </div>
                                      <div className="col-lg-6 col-md-6" style={{ display: "inline-flex"}}>
                                      <div className="width_of_data">Received To</div>:
                                      <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.pending_payout_details ? value.pending_payout_details.received_to :""}</span>
                                      </div> */}

                                      <div className="col-lg-12 col-md-12" style={{display:value.pending_payout_details ? (value.pending_payout_details.mode_of_payment.label=="Cheque" ? "block" :"none") : "none"}}>

                                      {value.pending_payout_details ? value.pending_payout_details.cheque_payment_details.map((v,i)=>{
                                        //console.log("vvvvvvvvvvvvvvvvvvvvvvvv",v);
                                        return(
                                          <div className="row" key={i}>

                                           <div className="col-lg-6 col-md-6" style={{ display: "inline-flex"}}>
                                          <div className="width_of_data">Cheque No</div>:
                                          <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{v.cheque_no}</span>
                                          </div>

                                          <div className="col-lg-6 col-md-6" style={{ display: "inline-flex"}}>
                                          <div className="width_of_data">Cheque Amount</div>:
                                          <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>&#x20b9;{v.cheque_amount_received}</span>
                                          </div>

                                          <div className="col-lg-6 col-md-6" style={{ display: "inline-flex"}}>
                                          <div className="width_of_data">Cheque Date</div>:
                                          <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{dateFormat(v.cheque_date.replace('Z', ""), "dd-mm-yyyy")}</span>
                                          </div>

                                          <div className="col-lg-6 col-md-6" style={{ display: "inline-flex"}}>
                                          <div className="width_of_data">Bank Name</div>:
                                          <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{v.bank_name}</span>
                                          </div>
                                          </div>
                                        )
                                      }):""}

                                      </div>


                                      <div className="col-lg-6 col-md-12" style={{ display: "inline-flex",marginBottom: "35px"}}>
                                      <div className="width_of_data">Attachment</div>:
                                      <span className="attachment_data_array_122">
                                        {value.pending_payout_details ? value.pending_payout_details.image_path.map((value1,index)=>{
                                          ////console.log("value1============",value1);
                                            return(
                                                <span key={index} className="m_bottom_123">
                                                     <span style={{display:value1.file_type =="image" ? "block" :"none"}}>
                                                          <a rel="noreferrer" href={value1.image_name} target="_blank">
                                                          <img src={value1.image_name} aria-hidden="true" alt="pdf image" className="image_pdf"/></a>
                                                          </span>
                                                          <span style={{display:value1.file_type=="pdf" ? "block" :"none"}}>
                                                          <a rel="noreferrer" href={value1.image_name} target="_blank">
                                                          <img src={pdf_img} aria-hidden="true" alt="pdf image" className="image_pdf"/></a>
                                                          </span>
                                                          <span style={{display:value1.file_type=="text" ? "block" :"none"}}>
                                                          <a rel="noreferrer" href={value1.image_name} target="_blank">
                                                          <img src={excel_img} aria-hidden="true" alt="pdf image" className="image_pdf"/></a>
                                                          </span>
                                                          <span style={{display:value1.file_type != "text" && value1.file_type != "pdf" && value1.file_type != "image" ? "block" :"none"}}>
                                                          <a rel="noreferrer" href={value1.image_name} target="_blank">
                                                          <img src={other_img} aria-hidden="true" alt="pdf image" className="image_pdf"/></a>
                                                          </span>
                                                </span>
                                            )
                                        }):""}
                                    </span>


                                      </div>


                                  </div>
                                </div>




                            </div>
                              )
                            })}
                      </div>



   {/** ************************ Forms Start From    Daily Sales Report    ************************************************************************************/  }
              <div className="forms_satrttt kkkkkkkkkkkkk" style={{display:this.state.for_show_btn=="" && this.state.show_edit_logs!="block" ? "block" : "none"}}>

              {/* <div className="policy_sourced_by"  style={{ display: "inline-flex"}}>
                <div className="hhhh_newwww">
                            <div className="width_of_data_new">Policy Sorced By (SM)</div>:
                            <span className="" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{this.state.sm_name}</span>

                            <span>{this.state.minute < 10 ? "0"+this.state.minute : this.state.minute} : {this.state.second < 10 ? "0"+this.state.second : this.state.second}</span>
                            <Button color="primary" className="button_enableee" onClick={()=>{
                              this.setState({
                                enable_formsss:"yes"
                              })
                              this.please_startTimer()
                            }}>Start Filling</Button>
                            </div>
                            </div> */}

                            <div className="row policy_sourced_by">
                              <div className="col-lg-8 col-md-12" style={{display:"inline-flex"}}>
                              <div className="width_of_data_new">Policy Issued By </div>:
                              <span className="" style={{ marginLeft: "5px" ,textTransform: "capitalize"}}>{this.state.policy_issued_by}</span>
                              </div>
                              <div className="col-lg-4 col-md-12 show_timerr">
                              <span style={{marginRight:"13px",display:this.state.enable_formsss=="yes" ? "block" :"none",color:"red",fontSize:"17px"}}>{this.state.minute < 10 ? "0"+this.state.minute : this.state.minute} : {this.state.second < 10 ? "0"+this.state.second : this.state.second}</span>
                                <Button color="primary" style={{whiteSpace:"nowrap"}} className="button_enableee" onClick={()=>{
                                  this.setState({
                                    enable_formsss:"yes"
                                  })
                                  this.please_startTimer()
                                }}>Start Filling</Button>
                              </div>
                             </div>

                            <div className={this.state.enable_formsss=="no" ? "plz_disable":""}>

                             <div className="fiest_section">
                                   <div className="row">

                                   <div className="col-lg-12 col-md-12 col-sm-12" style={{paddingRight: "15px"}}>
                                        <div className="upladedddd">
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}> Daily Sales Report </div>
                                      </div>
                                      <hr className="hr_newww" style={{marginTop:" 0px",marginBottom: "25px"}}/>
                                    </div>


                                   <div className="col-lg-4 col-md-6">
                                   <Label className="ballllllll" for="policyNumber" required>Policy Number<span className="start_mark">*</span></Label>
                                   <Input className={this.state.borderNew && this.state.policy_number == "" ?  "form-control is-invalid" : "form-control"}  type="text" name="policy_no" id="policyNumber" placeholder="Policy Number"
                                   value={this.state.policy_number}
                                   onChange={(e) => {
                                    this.setState({
                                      policy_number:e.target.value,
                                      error_message_forms:"none"
                                    })
                                   }} />
                                   </div>

                                   <div className="col-lg-4 col-md-6">
                                   <Label className="ballllllll" for="Fleet">RTO Cluster<span className="start_mark">*</span></Label>

                                   <Select
                                        value = {this.state.rto_cluster}
                                        onChange={(e) => {
                                            //////console.log(e, "Val.....")
                                            this.setState({
                                              rto_cluster: e,
                                            });
                                        }}
                                        placeholder="Select RTO Cluster"
                                        // className="contact_sort"
                                        className={this.state.borderNew && this.state.rto_cluster == "" ?  "is_not_valid" : "contact_sort"}
                                        options={ rto_cluster_array }
                                        styles={ customStyles }
                                    />

                                      {/* <Input className={this.state.borderNew && this.state.rto_cluster == "" ?  "form-control is-invalid" : "form-control"} type="text" name="Vehicle_no" id="VehicleNumber" placeholder="RTO Cluster"
                                      value={this.state.rto_cluster}
                                      onChange={(e) => {
                                        this.setState({
                                          rto_cluster:e.target.value,
                                          error_message_forms:"none"
                                        })
                                      }}  /> */}

                                   </div>

                                   <div className="col-lg-4 col-md-6 for_top_mobile_ne">
                                   <Label className="ballllllll" for="VehicleNumber">Vehicle Number<span className="start_mark">*</span></Label>
                                   <Input className={this.state.borderNew && this.state.vehicle_number == "" ?  "form-control is-invalid" : "form-control"} type="text" name="Vehicle_no" id="VehicleNumber" placeholder="Vehicle Number" style={{textTransform: "uppercase"}}
                                   value={this.state.vehicle_number}
                                   onChange={(e) => {
                                    this.setState({
                                      vehicle_number:e.target.value,
                                      error_message_forms:"none"
                                    })
                                   }}  />
                                   </div>

                                   <div className="col-lg-4 col-md-6 mar_toop for_mobile_newww for_top_mobile_ne">
                                   <Label className="ballllllll" for="rtoNo">RTO Location<span className="start_mark">*</span></Label>
                                   <Input className={this.state.borderNew && this.state.rto_location == "" ?  "form-control is-invalid" : "form-control"} type="text" name="policy_no" id="rtoNo" placeholder="RTO Location"
                                   value={this.state.rto_location}
                                   onChange={(e) => {
                                    this.setState({
                                      rto_location:e.target.value,
                                      error_message_forms:"none"
                                    })
                                   }}  />
                                   </div>

                                   <div className="col-lg-4 col-md-6 mar_toop policy_dateee">
                                   <Label className="ballllllll" for="PolicyDate">Policy Start Date<span className="start_mark">*</span></Label>
                                   {/* <DatePicker
                                       selected={this.state.start_date}
                                       onChange={(val) => {
                                           this.setState({
                                               start_date: val,
                                           });
                                       }}
                                       placeholder="Select date"
                                       dateFormat="dd-MM-yyyy"
                                       className="rui-datetimepicker form-control "
                                   /> */}
                                   <DatePicker
                                       selected={this.state.new_start_date}
                                       onChange={(val) => {
                                           this.setState({
                                               new_start_date: val,
                                               error_message_forms:"none"
                                           });
                                       }}
                                       placeholder="Select date"
                                       dateFormat="dd-MM-yyyy"
                                       className="rui-datetimepicker form-control "
                                   />
                                   </div>

                                   <div className="col-lg-4 col-md-6 mar_toop policy_end_dateee">
                                   <Label className="ballllllll" for="enddate">Policy End Date<span className="start_mark">*</span></Label>
                                   <DatePicker
                                       selected={this.state.new_end_date}
                                       onChange={(val) => {
                                           this.setState({
                                               new_end_date: val,
                                               error_message_forms:"none"
                                           });
                                       }}
                                       placeholder="Select date"
                                       dateFormat="dd-MM-yyyy"
                                       className="rui-datetimepicker form-control "
                                   />
                                   </div>


                                   <div className="col-lg-4 col-md-6 mar_toop isssueddd_dateee">
                                   <Label className="ballllllll" for="isuuedate">Issue Date<span className="start_mark">*</span></Label>
                                   <DatePicker
                                       selected={this.state.issue_date}
                                       onChange={(val) => {
                                         //console.log("val****************",val);
                                         //console.log("val****************",new Date(val));
                                           this.setState({
                                            issue_date: new Date(val),
                                            error_message_forms:"none"
                                           });
                                       }}
                                       placeholder="Select date"
                                       dateFormat="dd-MM-yyyy"
                                       className="rui-datetimepicker form-control "
                                   />
                                   </div>

                                   <div className="col-lg-4 col-md-6 mar_toop">
                                   <Label className="ballllllll" for="customerName">Customer Name<span className="start_mark">*</span></Label>
                                   <Input className={this.state.borderNew && this.state.customer_name == "" ?  "form-control is-invalid" : "form-control"} type="text" name="policy_no" id="customerName" placeholder="Customer Name"
                                   value={this.state.customer_name}
                                   onChange={(e) => {
                                    this.setState({
                                      customer_name:e.target.value,
                                      error_message_forms:"none"
                                    })
                                   }}  />
                                   </div>

                                   <div className="col-lg-4 col-md-6 mar_toop">
                                   <Label className="ballllllll" for="Fleet">Fleet or Non Fleet<span className="start_mark">*</span></Label>

                                   <Select
                                        value = {this.state.fleet_type}
                                        onChange={(e) => {
                                            //////console.log(e, "Val.....")
                                            this.setState({
                                              fleet_type: e,
                                            });
                                        }}
                                        placeholder="Select..."
                                        // className="contact_sort"
                                        className={this.state.borderNew && (this.state.fleet_type == "" || this.state.fleet_type == undefined ) ?  "is_not_valid" : "contact_sort"}
                                        options={ fleet_array }
                                        styles={ customStyles }
                                    />



                                   {/* <div className="fleett">
                                   <CustomInput type="radio" checked={this.state.fleet_type === "fleet" ? true : false} id="formRadio1" name="formRadio1" label="Fleet" onClick={(e) => {
                                     this.setState({
                                       fleet_type:"fleet"
                                     })
                                    }} />
                                   <CustomInput type="radio" checked={this.state.fleet_type == "non_fleet" ? true : false} id="formRadio2" name="formRadio1" label="Non Fleet"
                                   onClick={(e) => {
                                     this.setState({
                                       fleet_type:"non_fleet"
                                     })
                                    }}/>
                                   </div> */}
                                   </div>


                                   <div className="col-lg-4 col-md-6 mar_toop">
                                   <Label className="ballllllll" for="contactNo">Contact Number</Label>
                                   <Input type="number" name="policy_no" id="contactNo" placeholder="Contact Number"
                                   value={this.state.contact_no}
                                   onChange={(e) => {
                                    this.setState({
                                      contact_no:e.target.value,
                                      error_message_forms:"none"
                                    })
                                   }}  />
                                   </div>


                                   <div className="col-lg-4 col-md-6 mar_toop">
                                   <Label className="ballllllll" for="VehicleType">Select Vehicle Type<span className="start_mark">*</span></Label>
                                   <Select
                                        value = {this.state.motor_type}
                                        onChange={(e) => {
                                            //////console.log(e, "Val.....")
                                            this.setState({
                                                motor_type: e,
                                                motor_type_data: e.label,
                                                section_type:e.section,
                                                error_message_forms:"none"
                                            });
                                        }}
                                        className={this.state.borderNew && this.state.motor_type == "" ?  "is_not_valid" : "contact_sort"}
                                        placeholder="Select..."
                                        options={ motor_type_array }
                                        styles={ customStyles }
                                    />
                                    </div>
                                    <div className="col-lg-4 col-md-6 mar_toop" style={{display:this.state.motor_type_data == "Motor" ? "block" :"none"}}>
                                   <Label className="ballllllll" for="Motortype">Sub Motor Type<span className="start_mark">*</span></Label>

                                    <Select
                                            value = {this.state.type_of_motor}
                                            onChange={(e) => {
                                                ////console.log(e, "Val.....")
                                                this.setState({
                                                    type_of_motor: e,
                                                    type_of_motor_data: e.label,
                                                    comercial_label:"",
                                                    pvc_capacity:"",
                                                    section_type:e.section,
                                                    error_message_forms:"none",
                                                    new_for_liabilty_or_comprehensive:"",
                                                    liabilty_or_comprehensive:"",
                                                });
                                            }}
                                            placeholder="Select..."
                                            className={this.state.borderNew && this.state.type_of_motor == "" ?  "is_not_valid" : "contact_sort"}
                                            options={ motor_array }
                                            styles={ customStyles }
                                        />
                                      </div>
                                    <div className="col-lg-4 col-md-6 mar_toop" style={{display:this.state.type_of_motor_data == "Private car" ? "block" :"none"}}>
                                   <Label className="ballllllll" for="privateCar">Type Of Policy<span className="start_mark">*</span></Label>

                                    <Select
                                            value = {this.state.private_car_data}
                                            onChange={(e) => {
                                                ////console.log(e, "Val.....")
                                                this.setState({
                                                    private_car_data: e,
                                                    section_type:e.section,
                                                    comercial_label:"",
                                                    pvc_capacity:"",
                                                    error_message_forms:"none"
                                                });
                                            }}
                                            placeholder="Select..."
                                            className={this.state.borderNew && this.state.private_car_data == "" ?  "is_not_valid" : "contact_sort"}
                                            options={ private_car }
                                            styles={ customStyles }
                                        />
                                      </div>
                                    <div className="col-lg-4 col-md-6 mar_toop" style={{display:this.state.type_of_motor_data == "Two Wheeler" ? "block" :"none"}}>
                                   <Label className="ballllllll" for="twoWheeler">Type Of Policyr<span className="start_mark">*</span></Label>

                                    <Select
                                            value = {this.state.two_wheeler}
                                            onChange={(e) => {
                                                ////console.log(e, "Val.....")
                                                this.setState({
                                                  two_wheeler: e,
                                                    section_type:e.section,
                                                    comercial_label:"",
                                                    pvc_capacity:"",
                                                    error_message_forms:"none"
                                                });
                                            }}
                                            placeholder="Select..."
                                            className={this.state.borderNew && this.state.two_wheeler == "" ?  "is_not_valid" : "contact_sort"}
                                            options={ two_wheeler }
                                            styles={ customStyles }
                                        />
                                      </div>
                                    <div className="col-lg-4 col-md-6 mar_toop" style={{display:this.state.type_of_motor_data == "Commercial" ? "block" :"none"}}>
                                   <Label className="ballllllll" for="commercal">Select Commercial<span className="start_mark">*</span></Label>

                                    <Select
                                            value = {this.state.comercial_data}
                                            onChange={(e) => {
                                                ////console.log(e, "Val.....")
                                                this.setState({
                                                    comercial_data: e,
                                                    comercial_label: e.label,
                                                    section_type:e.section,
                                                    pvc_capacity:"",
                                                    error_message_forms:"none",
                                                    new_for_liabilty_or_comprehensive:"Commercial",
                                                    liabilty_or_comprehensive:"",
                                                });
                                            }}
                                            placeholder="Select..."
                                            className={this.state.borderNew && this.state.comercial_data == "" ?  "is_not_valid" : "contact_sort"}
                                            options={ commercial_data }
                                            styles={ customStyles }
                                        />
                                      </div>
                                    <div className="col-lg-4 col-md-6 mar_toop" style={{display:this.state.type_of_motor_data == "MISC D" ? "block" :"none"}}>
                                   <Label className="ballllllll" for="misdd">Select MISC D<span className="start_mark">*</span></Label>

                                    <Select
                                            value = {this.state.miscd_data}
                                            onChange={(e) => {
                                                ////console.log(e, "Val.....")
                                                this.setState({
                                                    miscd_data: e,
                                                    section_type:e.section,
                                                    error_message_forms:"none",
                                                    liabilty_or_comprehensive:"",
                                                    new_for_liabilty_or_comprehensive:"Miscd"
                                                });
                                            }}
                                            placeholder="Select..."
                                            className={this.state.borderNew && this.state.miscd_data == "" ?  "is_not_valid" : "contact_sort"}
                                            options={ misd_data }
                                            styles={ customStyles }
                                        />
                                      </div>


                                    <div className="col-lg-4 col-md-6 mar_toop" style={{display:this.state.comercial_label == "PCV" ? "block" :"none"}}>
                                   <Label className="ballllllll" for="pcvtype">PCV Type<span className="start_mark">*</span></Label>

                                    <Select
                                            value = {this.state.pvc_type}
                                            onChange={(e) => {
                                                ////console.log(e, "Val.....")
                                                this.setState({
                                                    pvc_type: e,
                                                    section_type:e.section,
                                                    pvc_capacity:e.capacity,
                                                    error_message_forms:"none"
                                                });
                                            }}
                                            placeholder="Select..."
                                            className={this.state.borderNew && this.state.pvc_type == "" ?  "is_not_valid" : "contact_sort"}
                                            options={ pvc_type }
                                            styles={ customStyles }
                                        />
                                      </div>


                                    <div className="col-lg-4 col-md-6 mar_toop" style={{display:this.state.new_for_liabilty_or_comprehensive == "Miscd" || this.state.new_for_liabilty_or_comprehensive == "Commercial"   ? "block" :"none"}}>
                                   <Label className="ballllllll" for="pcvtype">Type Of Policy<span className="start_mark">*</span></Label>

                                    <Select
                                            value = {this.state.liabilty_or_comprehensive}
                                            onChange={(e) => {
                                                ////console.log(e, "Val.....")
                                                this.setState({
                                                    liabilty_or_comprehensive: e,
                                                    error_message_forms:"none"
                                                });
                                            }}
                                            placeholder="Select..."
                                            className={this.state.borderNew && this.state.liabilty_or_comprehensive == "" ?  "is_not_valid" : "contact_sort"}
                                            options={ array_liabilty_or_comprehensive }
                                            styles={ customStyles }
                                        />
                                      </div>

                                      {/* <div className="col-lg-4 col-md-6 mar_toop" style={{display:this.state.comercial_label == "GCV" ?"block" :"none"}}>
                                        <Label className="ballllllll" for="gvw">GVW<span className="start_mark">*</span></Label>
                                        <Input type="text" name="policy_no" id="gvw" placeholder="Short Answer"
                                        value={this.state.gcv_data}
                                        onChange={(e) => {
                                          this.setState({
                                            gcv_data:e.target.value,
                                            cc_gvw_pcc:e.target.value,
                                            error_message_forms:"none"
                                          })
                                        }}  />
                                      </div>

                                      <div className="col-lg-4 col-md-6 mar_toop" style={{display:this.state.pvc_capacity=="1" ?"block" :"none"}}>
                                        <Label className="ballllllll" for="pcvCap">Seat Capacity<span className="start_mark">*</span></Label>
                                        <Input type="number" name="policy_no" id="pcvCap" placeholder="Short Answer"
                                        value={this.state.pvc_capacity_new}
                                        onChange={(e) => {
                                          this.setState({
                                            pvc_capacity_new:e.target.value,
                                            error_message_forms:"none"
                                          })
                                        }}  />
                                      </div> */}


                                   {/* <div className="col-lg-4 col-md-6 mar_toop">
                                   <Label className="ballllllll" for="emailInput1">Class Of Vehicle<span className="start_mark">*</span></Label>
                                   <Select
                                        value = {this.state.class_of_vehicle}
                                        onChange={(e) => {
                                            this.setState({
                                                class_of_vehicle: e,
                                                error_message_forms:"none"
                                            });
                                        }}
                                        placeholder="Select..."
                                        className="contact_sort"
                                        options={ class_of_vehicle }
                                        styles={ customStyles }
                                    />
                                   </div> */}


                                   {/* <div className="col-lg-4 col-md-6 mar_toop">
                                   <Label className="ballllllll" for="emailInput1">Sub Class Of Vehicle<span className="start_mark">*</span></Label>
                                   <Select
                                        value = {this.state.sub_class_of_vehicle}
                                        onChange={(e) => {
                                            //////console.log(e, "Val.....")
                                            this.setState({
                                                sub_class_of_vehicle: e,
                                                section_type:e.section,
                                                error_message_forms:"none"
                                            });
                                        }}
                                        className="contact_sort"
                                        placeholder="Select..."
                                        options={ sub_class_of_vehicle }
                                        styles={ customStyles }
                                    />
                                   </div> */}


                                   {/* <div className="col-lg-4 col-md-6 mar_toop">
                                   <Label className="ballllllll" for="emailInput1">Select Motor Type<span className="start_mark">*</span></Label>
                                   <Select
                                        value = {this.state.motor_type}
                                        onChange={(e) => {
                                            //////console.log(e, "Val.....")
                                            this.setState({
                                                motor_type: e,
                                                motor_type_data: e.label,
                                                error_message_forms:"none"
                                            });
                                        }}
                                        className="contact_sort"
                                        placeholder="Select..."
                                        options={ motor_type_array }
                                        styles={ customStyles }
                                    />
                                   </div> */}



                                   </div>
                                   </div>
 {/* ***********************************************   MIS-D Type    *********************************************************************** */}
                              <div className="second_section" style={{display:this.state.section_type == "2_section" ? "block" : "none"}}>
                                   <div className="row">
                                   <div className="col-lg-12 col-md-12 col-sm-12" style={{paddingRight: "15px",marginTop:"25px"}}>
                                        <div className="upladedddd">
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}> MIS-D Type </div>
                                      </div>
                                      <hr className="hr_newww" style={{marginTop:" 0px",marginBottom: "25px"}}/>
                                    </div>

                                   <div className="col-lg-4 col-md-6">
                                   <Label className="ballllllll" for="typeofMis">Type Of MIS-D<span className="start_mark">*</span></Label>
                                   <Input type="text" name="policy_no" id="typeofMis" placeholder="Type Of MIS-D"
                                   value={this.state.type_of_mis_d}
                                   onChange={(e) => {
                                    this.setState({
                                      type_of_mis_d:e.target.value,
                                      error_message_forms:"none"
                                    })
                                   }} />
                                   </div>

                                   </div>
                                   </div>


 {/* *******************************************  Type Of Policy   *********************************************************************** */}

                               <div className="third_section" style={{display:this.state.section_type == "3_section" ||  this.state.section_type == "2_section" || this.state.motor_section_show == "3_section"? "block" : "none"}}>
                                   <div className="row">
                                   <div className="col-lg-12 col-md-12 col-sm-12" style={{paddingRight: "15px",marginTop:"25px"}}>
                                        <div className="upladedddd">
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}> Type Of Policy </div>
                                      </div>
                                      <hr className="hr_newww" style={{marginTop:" 0px",marginBottom: "25px"}}/>
                                    </div>
                                   {/* <div className="col-lg-4 col-md-6">
                                     <Label className="ballllllll" for="emailInput1">Type Of Policy<span className="start_mark">*</span></Label>
                                     <Select
                                            value = {this.state.type_of_policy}
                                            onChange={(e) => {
                                                //////console.log(e, "Val.....")
                                                this.setState({
                                                    type_of_policy: e,
                                                    error_message_forms:"none"
                                                });
                                            }}
                                            placeholder="Select..."
                                            className="contact_sort"
                                            options={ type_of_policy }
                                            styles={ customStyles }
                                        /> */}
                                     {/* <div style={{display:this.state.motor_type_data=="Motor" ? "block" :"none"}}>
                                      <Select
                                            value = {this.state.type_of_policy}
                                            onChange={(e) => {
                                                ////console.log(e, "Val.....")
                                                this.setState({
                                                    type_of_policy: e,
                                                    error_message_forms:"none"
                                                });
                                            }}
                                            placeholder="Select..."
                                            className="contact_sort"
                                            options={ motor_array }
                                            styles={ customStyles }
                                        />
                                     </div>
                                     <div style={{display:this.state.motor_type_data=="Non Motor" ? "block" :"none"}}>
                                      <Select
                                            value = {this.state.type_of_policy}
                                            onChange={(e) => {
                                                ////console.log(e, "Val.....")
                                                this.setState({
                                                    type_of_policy: e,
                                                    error_message_forms:"none"
                                                });
                                            }}
                                            placeholder="Select..."
                                            className="contact_sort"
                                            options={ non_motor_array }
                                            styles={ customStyles }
                                        />
                                     </div> */}

                                   {/* </div> */}

                                   <div className="col-lg-4 col-md-6 for_top_mobile_ne">
                                   <Label className="ballllllll" for="make">Make<span className="start_mark">*</span></Label>
                                   <Input className={this.state.borderNew && this.state.make == "" ?  "form-control is-invalid" : "form-control"} type="text" name="Vehicle_no" id="make" placeholder="Make"
                                   value={this.state.make}
                                   onChange={(e) => {
                                    this.setState({
                                      make:e.target.value,
                                      error_message_forms:"none"
                                    })
                                   }} />
                                   </div>

                                   <div className="col-lg-4 col-md-6 for_top_mobile_ne">
                                   <Label className="ballllllll" for="model">Model<span className="start_mark">*</span></Label>
                                   <Input className={this.state.borderNew && this.state.model == "" ?  "form-control is-invalid" : "form-control"} type="text" name="policy_no" id="model" placeholder="Model"
                                   value={this.state.model}
                                   onChange={(e) => {
                                    this.setState({
                                      model:e.target.value,
                                      error_message_forms:"none"
                                    })
                                   }} />
                                   </div>


                                   <div className="col-lg-4 col-md-6">
                                   <Label className="ballllllll" for="cc">CC/GVW/PCC<span className="start_mark">*</span></Label>
                                   <Input className={this.state.borderNew && this.state.cc_gvw_pcc == "" ?  "form-control is-invalid" : "form-control"} type="text" name="policy_no" id="cc" placeholder="CC/GVW/PCC"
                                   value={this.state.cc_gvw_pcc}
                                   onChange={(e) => {
                                    this.setState({
                                      cc_gvw_pcc:e.target.value,
                                      error_message_forms:"none"
                                    })
                                   }} />
                                   </div>

                                   <div className="col-lg-4 col-md-6 mar_toop">
                                   <Label className="ballllllll" for="cc">GVW Category<span className="start_mark">*</span></Label>
                                   <Input className={this.state.borderNew && this.state.gvw_category == "" ?  "form-control is-invalid" : "form-control"} type="text" name="policy_no" id="cc" placeholder="GVW Category"
                                   value={this.state.gvw_category}
                                   onChange={(e) => {
                                    this.setState({
                                      gvw_category:e.target.value,
                                      error_message_forms:"none"
                                    })
                                   }} />
                                   </div>

                                   <div className="col-lg-4 col-md-6 mar_toop">
                                   <Label className="ballllllll" for="ncb">NCB<span className="start_mark">*</span></Label>
                                   {/* <Input type="text" name="policy_no" id="emailInput1" placeholder="NCB"
                                   value={this.state.ncb_type}
                                   onChange={(e) => {
                                    this.setState({
                                      ncb_type:e.target.value,
                                      error_message_forms:"none"
                                    })
                                   }}  /> */}
                                      <Select
                                        value = {this.state.ncb_type}
                                        onChange={(e) => {
                                            //////console.log(e, "Val.....")
                                            this.setState({
                                              ncb_type: e,
                                              error_message_forms:"none"
                                            });
                                        }}
                                        placeholder="Select..."
                                        className={this.state.borderNew && this.state.ncb_type == "" ?  "is_not_valid" : "contact_sort"}
                                        options={ ncb_type }
                                        styles={ customStyles }
                                    />
                                   </div>


                                   <div className="col-lg-4 col-md-6 mar_toop">
                                   <Label className="ballllllll" for="addon">Add On &apos; s<span className="start_mark">*</span></Label>
                                   <Select
                                        value = {this.state.add_on_type}
                                        onChange={(e) => {
                                            //////console.log(e, "Val.....")
                                            this.setState({
                                              add_on_type: e,
                                              error_message_forms:"none",
                                              net_premium_new:"",
                                              od_premium_new:"",
                                            });
                                            this.adds_on_type(e)
                                        }}
                                        placeholder="Select..."
                                        className={this.state.borderNew && this.state.add_on_type == "" ?  "is_not_valid" : "contact_sort"}
                                        options={ add_on_array }
                                        styles={ customStyles }
                                    />
                                   </div>

                                   <div className="col-lg-4 col-md-6 mar_toop">
                                   <Label className="ballllllll" for="fuletuype">Fuel Type<span className="start_mark">*</span></Label>
                                   <Select
                                        value = {this.state.fuel_type}
                                        onChange={(e) => {
                                            //////console.log(e, "Val.....")
                                            this.setState({
                                                fuel_type: e,
                                                error_message_forms:"none"
                                            });
                                        }}
                                        placeholder="Select..."
                                        className={this.state.borderNew && this.state.fuel_type == "" ?  "is_not_valid" : "contact_sort"}
                                        options={ fuel_type }
                                        styles={ customStyles }
                                    />
                                   </div>


                                   <div className="col-lg-4 col-md-6 mar_toop">
                                   <Label className="ballllllll" for="insurer">Insurer<span className="start_mark">*</span></Label>
                                   <Select
                                        value = {this.state.insurer_array_new}
                                        onChange={(e) => {
                                            //////console.log(e, "Val.....")
                                            this.setState({
                                                insurer_array_new: e,
                                                insurer_array_typeee: e.insurer_type
                                            });
                                            this.fetch_cheque_for_policy(e.value)
                                        }}
                                        placeholder="Select..."
                                        className={this.state.borderNew && this.state.insurer_array_new == "" ?  "is_not_valid" : "contact_sort"}
                                        options={ insurer_array }
                                        styles={ customStyles }
                                    />
                                   </div>

                                   <div className="col-lg-4 col-md-6 mar_toop">
                                   <Label className="ballllllll" for="od_amount">OD</Label>
                                   <Input type="number"  name="od_no" id="od1" placeholder="OD"
                                   value={this.state.od_amount}
                                   onChange={(e) => {
                                    this.setState({
                                      od_amount:e.target.value,
                                      error_message_forms:"none"
                                    })
                                    setTimeout(() => {
                                      this.od_plus_addons(this.state.od_amount,this.state.addon_amount)
                                    }, 800)
                                   }}  />
                                   </div>

                                   <div className="col-lg-4 col-md-6 mar_toop">
                                   <Label className="ballllllll" for="addon_new">Addon</Label>
                                   <Input type="number"  name="policy_no" id="addon_new" placeholder="Addons"
                                   value={this.state.addon_amount}
                                   onChange={(e) => {
                                    this.setState({
                                      addon_amount:e.target.value,
                                      error_message_forms:"none"
                                    })
                                    setTimeout(() => {
                                      this.od_plus_addons(this.state.od_amount,this.state.addon_amount)
                                    }, 800)
                                   }}  />
                                   </div>

                                   <div className="col-lg-4 col-md-6 mar_toop">
                                   <Label className="ballllllll" for="add_pre">OD+Addon Premium</Label>
                                   <Input  type="text" name="policy_no" id="add_pre" placeholder="OD+Addon Premium"
                                   value={this.state.addon_premium}
                                   onChange={(e) => {
                                    this.setState({
                                      addon_premium:e.target.value,
                                      error_message_forms:"none"
                                    })
                                    setTimeout(() => {
                                      this.amount_calculation(this.state.po_discount_in_percent)
                                    }, 800)
                                   }}  />
                                   </div>
                                   <div className="col-lg-4 col-md-6 mar_toop">
                                   <Label className="ballllllll" for="netPre">Net Premium<span className="start_mark">*</span></Label>
                                   <Input className={this.state.borderNew && this.state.net_premium == "" ?  "form-control is-invalid" : "form-control"} type="number"  name="policy_no" id="netPre" placeholder="Net Premium"
                                   value={this.state.net_premium}
                                   onChange={(e) => {
                                    this.setState({
                                      net_premium:e.target.value,
                                      error_message_forms:"none"
                                    })
                                    setTimeout(() => {
                                      this.amount_calculation(this.state.po_discount_in_percent)
                                      // this.new_total_amount_cal(this.state.net_premium)
                                    }, 800)
                                   }}  />
                                   </div>
                                   <div className="col-lg-4 col-md-6 mar_toop">
                                   <Label className="ballllllll" for="Grosspre">Gross Premium<span className="start_mark">*</span></Label>
                                   <Input className={this.state.borderNew && this.state.gross_premium == "" ?  "form-control is-invalid" : "form-control"} type="number" name="policy_no" id="Grosspre" placeholder="Gross Premium"
                                   value={this.state.gross_premium}
                                   onChange={(e) => {
                                    this.setState({
                                      gross_premium:e.target.value,
                                      policy_amount:e.target.value,
                                      policy_blanace_amount:e.target.value,
                                      error_message_forms:"none"
                                    })
                                    setTimeout(() => {
                                      this.amount_calculation(this.state.po_discount_in_percent)
                                    }, 800)
                                   }}  />
                                   </div>
                                   <div className="col-lg-4 col-md-6 mar_toop">
                                   <Label className="ballllllll" for="amountrec">Amount Receivable Rs.</Label>
                                   <Input  type="number" name="policy_no" id="amountrec" disabled placeholder="Amount Receivable Rs"
                                   value={this.state.amount_receivable}
                                   onChange={(e) => {
                                    this.setState({
                                      amount_receivable:e.target.value,
                                      error_message_forms:"none"
                                    })
                                   }} />
                                   </div>
                                   <div className="col-lg-4 col-md-6 mar_toop">
                                   <Label className="ballllllll" for="po_On">PO on<span className="start_mark">*</span></Label>
                                   {/* <Input type="text" name="policy_no" id="emailInput1" disabled placeholder="PO ON"
                                      value={this.state.po_on_type}
                                      onChange={(e) => {
                                        this.setState({
                                          po_on_type:e.target.value,
                                          error_message_forms:"none"
                                        })
                                      }} /> */}
                                   <Select
                                        value = {this.state.po_on_type}
                                        onChange={(e) => {
                                            //////console.log(e, "Val.....")
                                            this.setState({
                                              po_on_type: e,
                                              error_message_forms:"none"
                                            });
                                            setTimeout(() => {
                                              this.amount_calculation(this.state.po_discount_in_percent)
                                            }, 800)
                                        }}
                                        placeholder="Select..."
                                        className={this.state.borderNew && this.state.po_on_type == "" ?  "is_not_valid" : "contact_sort"}
                                        options={ po_on_array }
                                        styles={ customStyles }
                                    />

                                   {/* <div className="fleett">
                                   <CustomInput type="radio" checked={this.state.po_on_type === "od_premium"} id="formRadio555" name="formRadio_po_on_type" label="OD Premium"
                                   onClick={(e) => {
                                     this.setState({
                                       po_on_type:"od_premium"
                                     })
                                     setTimeout(() => {
                                      this.amount_calculation(this.state.po_discount_in_percent)
                                    }, 800)
                                    }}/>
                                   <CustomInput type="radio" checked={this.state.po_on_type === "net_premium"} id="formRadio699" name="formRadio_po_on_type" label="Net Premium"
                                   onClick={(e) => {
                                     this.setState({
                                       po_on_type:"net_premium"
                                     })
                                     setTimeout(() => {
                                      this.amount_calculation(this.state.po_discount_in_percent)
                                    }, 800)
                                    }}/>
                                   </div> */}
                                   </div>

                                   <div className="col-lg-4 col-md-6 mar_toop">
                                   <Label className="ballllllll" for="typeOfPay">Type of Payout<span className="start_mark">*</span></Label>
                                   <Select
                                        value = {this.state.type_of_payout}
                                        onChange={(e) => {
                                            //////console.log(e, "Val.....")
                                            this.setState({
                                                type_of_payout: e,
                                                type_of_payout_label: e.label,
                                                mode_of_premium_received:"",
                                                error_message_forms:"none",
                                                cheque_to_sc:"",
                                                insurer_paid_type:"",
                                                section_type_new:"",
                                                mode_of_premium_label:"",
                                                policy_array:[],
                                                // section_type:""
                                            });
                                            setTimeout(() => {
                                              this.amount_calculation(this.state.po_discount_in_percent)
                                            }, 800)
                                        }}
                                        placeholder="Select..."
                                        className={this.state.borderNew && this.state.type_of_payout == "" ?  "is_not_valid" : "contact_sort"}
                                        options={ type_of_payout }
                                        styles={ customStyles }
                                    />
                                   </div>


                                   <div className="col-lg-4 col-md-6 mar_toop">
                                   <Label className="ballllllll" for="agent">Agent or Telecalling<span className="start_mark">*</span></Label>
                                   <Select
                                        value = {this.state.agent_or_tellcalling}
                                        onChange={(e) => {
                                            //////console.log(e, "Val.....")
                                            this.setState({
                                              agent_or_tellcalling: e,
                                              agent_delete_section:e.section,
                                              agent_or_tellcalling_label:e.label,
                                              error_message_forms:"none"
                                            });
                                        }}
                                        placeholder="Select..."
                                        className={this.state.borderNew && this.state.agent_or_tellcalling == "" ?  "is_not_valid" : "contact_sort"}
                                        options={agent_or_tellcalling }
                                        styles={ customStyles }
                                    />
                                   </div>


                                   <div className="col-lg-4 col-md-4 mar_toop">
                                   <Label className="ballllllll" for="emailInput1">Customer Payment Status</Label>
                                   <Select
                                        value = {this.state.payment_from_customer}
                                        onChange={(e) => {
                                            this.setState({
                                                payment_from_customer: e,
                                            });
                                        }}
                                        placeholder="Select..."
                                        className="contact_sort"
                                        options={ customer_recevied_payemnt }
                                        styles={ customStyles }
                                    />
                                   </div>


                                   <div className="col-lg-4 col-md-6 mar_toop">
                                   <Label className="ballllllll" for="premiun_received" style={{whiteSpace:"nowrap"}}>Premium Received By Customer<span className="start_mark">*</span></Label>
                                   <div style={{display:this.state.type_of_payout_label == "Cut Pay" ? "block" :"none"}}>
                                   <Select
                                        value = {this.state.mode_of_premium_received}
                                        onChange={(e) => {
                                            //console.log(e, "Val.....")
                                            this.setState({
                                              mode_of_premium_received: e,
                                              cheque_to_sc: e.label,
                                              error_message_forms:"none",
                                              mode_of_premium_label:"",
                                              policy_array:[],
                                            });
                                            this.select_sec_seven(e)
                                        }}
                                        placeholder="Select..."
                                        className={this.state.borderNew && this.state.mode_of_premium_received == "" ?  "is_not_valid" : "contact_sort"}
                                        options={mode_of_premium_received   }
                                        styles={ customStyles }
                                    />
                                   </div>
                                   <div style={{display:this.state.type_of_payout_label == "Cut Pay" ? "none" :"block"}}>
                                   <Select
                                        value = {this.state.mode_of_premium_received}
                                        onChange={(e) => {
                                            //////console.log(e, "Val.....")
                                            this.setState({
                                              mode_of_premium_received: e,
                                              cheque_to_sc: e.label,
                                              error_message_forms:"none",
                                              mode_of_premium_label:"",
                                              policy_array:[],
                                            });
                                            this.select_sec_seven(e)
                                        }}
                                        placeholder="Select..."
                                        className={this.state.borderNew && this.state.mode_of_premium_received == "" ?  "is_not_valid" : "contact_sort"}
                                        options={for_payout_mode_of_premium_received}
                                        styles={ customStyles }
                                    />
                                   </div>



                                   </div>


                                <div className="col-lg-5 col-md-5 col-sm-12 mar_toop" style={{display:this.state.cheque_to_sc == "Pending" ? "none" :"block"}}>
                                <Label className="ballllllll">Customer Payment Attachment</Label>
                                {/* <div>
                                <input id="inputGroupFile01" type="file"  className="no_input_file"  multiple onChange={this.handleChangeFile_new} style={{display:"none"}} />
                                         <label className="lord_lable" htmlFor="inputGroupFile01">
                                          <div className="file_name"></div>
                                          <div className="choose align-self-center">Choose file</div>
                                         </label>

                                </div> */}
                                <div className="attachment_data_array_customer">
                                        {this.state.customer_payment_array ? this.state.customer_payment_array.map((value,index)=>{
                                            return(
                                                <div key={index} className="m_bottom" style={{width:"50px",marginRight:"8px"}}>
                                                     {/* <button type="button" className="btn btn-danger btn-uniform btn-sm mnt-10 mnb-10 p-0 delte_image_acc" onClick={()=>{
                                                          this.delete_building_map_image_temp(value)
                                                         }}
                                                            style={{ display: "grid" }}
                                                        >
                                                            <Icon name="x" />
                                                        </button> */}


                                                    <span style={{display: value.file_type=="pdf" ? "block" :"none"}}>
                                                    <a rel="noreferrer" href={value.file_name} target="_blank">
                                                     <img width="50" src={pdf_img} alt='' style={{ marginRight: "6px", height: "40px",marginBottom:"5px"}} /></a>
                                                    </span>
                                                    <span style={{display: value.file_type !="pdf" ? "block" :"none"}}>
                                                    <a rel="noreferrer" href={value.file_name} target="_blank">
                                                     <img width="50" src={value.file_name} alt='' style={{ marginRight: "6px", height: "40px",marginBottom:"5px"}} /></a>
                                                    </span>
                                                    <p className="img_name marquee" style={{textAlign:"center"}}><span>{value.show_name}</span></p>
                                                </div>
                                            )
                                        }):[]}
                                        {/* {this.state.document_data ? this.state.document_data.map((value,index)=>{
                                            return(
                                                <div key={index} className="m_bottom">
                                                     <button type="button" className="btn btn-danger btn-uniform btn-sm mnt-10 mnb-10 p-0 delte_image_acc" onClick={()=>{
                                                          this.delete_building_map_image_temp(value)
                                                         }}
                                                            style={{ display: "grid" }}
                                                        >
                                                            <Icon name="x" />
                                                        </button>


                                                    <span style={{display: value.document_type=="pdf" ? "block" :"none"}}>
                                                     <img width="50" src={pdf_img} alt='' style={{ marginRight: "6px", height: "40px",marginBottom:"5px"}} />
                                                    </span>
                                                    <span style={{display: value.document_type !="pdf" ? "block" :"none"}}>
                                                     <img width="50" src={value.document_image_new} alt='' style={{ marginRight: "6px", height: "40px",marginBottom:"5px"}} />
                                                    </span>
                                                </div>
                                            )
                                        }):[]} */}
                                    </div>
                                </div>





                                   </div>
                                   </div>




 {/* *********************************************** Telecaller Name  *********************************************************************** */}

                              <div className="fouth_section" style={{display:this.state.agent_delete_section=="4_section" && (this.state.section_agent_telli_type == "3_section" || this.state.section_agent_telli_type == "2_section" || this.state.section_type == "3_section" || this.state.section_type == "2_section" )? "block":"none"}}>
                              {/* <div className="fouth_section" style={{display:this.state.agent_delete_section=="4_section" && this.state.section_type == "3_section" || this.state.section_type == "2_section" ? "block":"none"}}> */}
                              <div className="row">
                              <div className="col-lg-12 col-md-12 col-sm-12" style={{paddingRight: "15px",marginTop:"25px"}}>
                                        <div className="upladedddd">
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}> Telecaller Name </div>
                                      </div>
                                      <hr className="hr_newww" style={{marginTop:" 0px",marginBottom: "25px"}}/>
                                    </div>
                                   <div className="col-lg-4 col-md-6">
                                   <Label className="ballllllll" for="telecar">Telecaller Name<span className="start_mark">*</span></Label>
                                   <Select
                                        isOptionDisabled={(option) =>  'option.disabled'}
                                        value = {this.state.tele_caller_name}
                                        onChange={(e) => {
                                            //////console.log(e, "Val.....")
                                            this.setState({
                                                tele_caller_name: e
                                            });
                                        }}
                                        placeholder="Select..."
                                        className={this.state.borderNew && this.state.tele_caller_name == "" ?  "is_not_valid" : "contact_sort"}
                                        options={ tellicar_name }
                                        styles={ customStyles }
                                    />
                                   </div>
                                   </div>
                              </div>
 {/* *********************************************** Agent/Dealer Name *********************************************************************** */}

                              <div className="fifth_section" style={{display:this.state.agent_delete_section=="5_section" && (this.state.section_type == "3_section" ||  this.state.section_type == "2_section" || this.state.section_agent_telli_type == "3_section" ||  this.state.section_agent_telli_type == "2_section") ? "block":"none"}}>
                              <div className="row">
                              <div className="col-lg-12 col-md-12 col-sm-12" style={{paddingRight: "15px",marginTop:"25px"}}>
                                        <div className="upladedddd">
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}>Agent/Dealer Name</div>
                                      </div>
                                      <hr className="hr_newww" style={{marginTop:" 0px",marginBottom: "25px"}}/>
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                   <Label className="ballllllll" for="agentname">Agent/Dealer Name</Label>
                                   <Select

                                        value = {this.state.agent_dealer_name}
                                        onChange={(e) => {
                                            //////console.log(e, "Val.....")
                                            this.setState({
                                                agent_dealer_name: e
                                            });
                                        }}
                                        placeholder="Select..."
                                        className="contact_sort"
                                        options={ agent_array }
                                        styles={ customStyles }
                                    />
                                   </div>
                                   </div>
                              </div>
 {/* *********************************************** PO Details  *********************************************************************** */}

                              <div className="sixth_section">
                              <div className="row">
                              <div className="col-lg-12 col-md-12 col-sm-12" style={{paddingRight: "15px",marginTop:"25px"}}>
                                        <div className="upladedddd">
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}> PO Details </div>
                                      </div>
                                      <hr className="hr_newww" style={{marginTop:" 0px",marginBottom: "25px"}}/>
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                   <Label className="ballllllll" for="poDid">PO %<span className="start_mark">*</span></Label>
                                   <Input disabled className={this.state.borderNew && this.state.po_discount_in_percent == "" ?  "form-control is-invalid" : "form-control"} type="text" name="Vehicle_no" id="poDid" placeholder="PO %"
                                   value={Number(this.state.po_discount_in_percent).toFixed()}
                                   onChange={(e) => {
                                    this.setState({
                                      po_discount_in_percent:e.target.value,
                                      error_message_forms:"none"
                                    })

                                    setTimeout(() => {
                                      this.amount_calculation(this.state.po_discount_in_percent)
                                    }, 800)
                                   }} />
                                   </div>

                                   <div className="col-lg-4 col-md-6 for_top_mobile_ne">
                                   <Label className="ballllllll" for="poamountdis">PO Amount<span className="start_mark">*</span></Label>
                                   <Input disabled className={this.state.borderNew && this.state.po_discount_amount == "" ?  "form-control is-invalid" : "form-control"} type="number" name="policy_no" id="poamountdis"  placeholder="PO Amount"
                                   value={this.state.po_discount_amount}
                                   onChange={(e) => {
                                    this.setState({
                                      po_discount_amount:e.target.value
                                    })
                                    setTimeout(() => {
                                      this.amount_calculation(this.state.po_discount_in_percent)
                                    }, 800)
                                   }} />
                                   </div>
                                   <div className="col-lg-4 col-md-6 for_top_mobile_ne">
                                   <Label className="ballllllll" for="status_po">PO Status<span className="start_mark">*</span></Label>
                                   <Select
                                        value = {this.state.po_discount_status}
                                        onChange={(e) => {
                                            //////console.log(e, "Val.....")
                                            this.setState({
                                              po_discount_status: e,
                                              error_message_forms:"none"
                                            });
                                        }}
                                        placeholder="Select..."
                                        className={this.state.borderNew && this.state.po_discount_status == "" ?  "is_not_valid" : "contact_sort"}
                                        options={ policy_discount_status_array }
                                        styles={ customStyles }
                                    />
                                   {/* <div className="fleett">
                                   <CustomInput type="radio" checked={this.state.po_discount_status === "paid"} id="formRadio81" name="formRadio_status1" label="Paid"
                                   onClick={(e) => {
                                     this.setState({
                                       po_discount_status:"paid"
                                     })
                                    }}/>
                                   <CustomInput type="radio" checked={this.state.po_discount_status === "pending"} id="formRadio91" name="formRadio_status1" label="Pending"
                                   onClick={(e) => {
                                     this.setState({
                                       po_discount_status:"pending"
                                     })
                                    }} />
                                   <CustomInput type="radio" checked={this.state.po_discount_status === "nil"} id="formRadio101" name="formRadio_status1" label="Nil"
                                   onClick={(e) => {
                                     this.setState({
                                       po_discount_status:"nil"
                                     })
                                    }} />
                                   </div> */}
                                   </div>
                                   </div>
                              </div>
 {/* *********************************************** Premium Details *********************************************************************** */}

                              <div className="seventh_section" style={{display:this.state.cheque_to_sc == "Pending" || this.state.cheque_to_sc == "Cash" || this.state.cheque_to_sc == "Cheque to SC"|| this.state.cheque_to_sc == "Online to SC" ? "block" :"none"}}>
                              <div className="row">
                              <div className="col-lg-12 col-md-12 col-sm-12" style={{paddingRight: "15px",marginTop:"25px"}}>
                                        <div className="upladedddd">
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}>Premium Details</div>
                                      </div>
                                      <hr className="hr_newww" style={{marginTop:" 0px",marginBottom: "25px"}}/>
                                    </div>
                                    <div className="col-lg-6 col-md-12">
                                   <Label className="ballllllll" for="modeof">Mode of Premium Payment by SC<span className="start_mark">*</span></Label>
                                   <Select
                                     isOptionDisabled={(option) => this.state.disabled_true==true ? 'option.disabled' : '' }
                                        value = {this.state.mode_of_premium_payment}
                                        onChange={(e) => {
                                            //console.log(e, "Val.....")
                                            this.setState({
                                                mode_of_premium_payment: e,
                                                section_type_new:e.section,
                                                mode_of_premium_label:e.label,
                                                insurer_paid_type:"",
                                                error_message_forms:"none"
                                            });
                                        }}
                                        placeholder="Select..."
                                        className={this.state.borderNew && this.state.mode_of_premium_payment == "" ?  "is_not_valid" : "contact_sort"}
                                        options={ mode_of_premium_payment }
                                        styles={ customStyles }
                                    />
                                   </div>
                                   </div>
                              </div>



 {/* *********************************************** Cutomer Cheque Details *********************************************************************** */}

                              <div className="eghit_section" style={{display:this.state.section_type_new == "8_section" || this.state.cheque_to_sc == "Cheque to SC" ? "block" : "none"}}>
                              <div className="row">
                              <div className="col-lg-12 col-md-12 col-sm-12" style={{paddingRight: "15px",marginTop:"25px"}}>
                                        <div className="upladedddd">
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}>Cutomer Cheque Details</div>
                                      </div>
                                      <hr className="hr_newww" style={{marginTop:" 0px",marginBottom: "25px"}}/>
                                    </div>
                                    <div className="col-lg-4 col-md-6 ">
                                   <Label className="ballllllll" for="cheque_rece">Physical Cheque received<span className="start_mark">*</span></Label>
                                   <Select
                                        value = {this.state.physical_cheque_received}
                                        onChange={(e) => {
                                            //////console.log(e, "Val.....")
                                            this.setState({
                                              physical_cheque_received: e,
                                            });
                                        }}
                                        placeholder="Select..."
                                        className={this.state.borderNew && this.state.physical_cheque_received == "" ?  "is_not_valid" : "contact_sort"}
                                        options={ physical_array_cheque }
                                        styles={ customStyles }
                                    />
                                   {/* <div className="fleett_222">
                                   <CustomInput type="radio" checked={this.state.physical_cheque_received === "yes"} id="formRadio12" name="formRadio" label="Yes"
                                   onClick={(e) => {
                                     this.setState({
                                       physical_cheque_received:"yes"
                                     })
                                    }}  />
                                   <div style={{marginLeft: "30px"}}>
                                   <CustomInput type="radio" checked={this.state.physical_cheque_received === "no"} id="formRadio13" name="formRadio" label="No"
                                   onClick={(e) => {
                                     this.setState({
                                       physical_cheque_received:"no"
                                     })
                                    }} /></div>
                                   </div> */}
                                   </div>

                                   <div className="col-lg-4 col-md-6 for_top_mobile_ne">
                                   <Label className="ballllllll" for="cheque_no">Cheque No<span className="start_mark">*</span></Label>
                                   <Input className={this.state.borderNew && this.state.cheque_no == "" ?  "form-control is-invalid" : "form-control"} type="text" name="policy_no" id="cheque_no" placeholder="Cheque No"
                                   value={this.state.cheque_no}
                                   onChange={(e) => {
                                    this.setState({
                                      cheque_no:e.target.value
                                    })
                                   }}  />
                                   </div>


                                   <div className="col-lg-4 col-md-6 for_top_mobile_ne">
                                   <Label className="ballllllll" for="cheAmou">Cheque Amount<span className="start_mark">*</span></Label>
                                   <div style={{display:this.state.mode_of_premium_label=="Customer Cheque + Float" ?"block" :"none"}}>
                                   <Input className={this.state.borderNew && this.state.cheque_amount_received == "" ?  "form-control is-invalid" : "form-control"} disabled={this.state.setdisss == true ? 'disabled' : ''} type="number" name="policy_no" id="cheAmou" placeholder="Cheque Amount"
                                   value={this.state.cheque_amount_received}
                                   onChange={(e) => {
                                    this.setState({
                                      cheque_amount_received:e.target.value
                                    })
                                    this.cheque_amount_received_data(e.target.value)
                                   }}  />
                                   </div>
                                   <div  style={{display:this.state.mode_of_premium_label=="Customer Cheque + Float" ?"none" :"block"}}>
                                   <Input className={this.state.borderNew && this.state.cheque_amount_received == "" ?  "form-control is-invalid" : "form-control"} disabled={this.state.setdisss == true ? 'disabled' : ''} type="number" name="policy_no" id="cheAmou" placeholder="Cheque Amount"
                                   value={this.state.cheque_amount_received}
                                   onChange={(e) => {
                                    this.setState({
                                      cheque_amount_received:e.target.value
                                    })
                                    this.new_cheque_data(e.target.value)
                                   }}  />
                                   </div>


                                   <p style={{display:this.state.setError=="block" ? "block" : "none",color:"#f597a2",fontSize:"80%",marginTop:"3px",marginBottom:"0px"}}>Cheque Amount should not be greater than Gross Premium</p>
                                   </div>


                                   <div className="col-lg-4 col-md-6 mar_toop policy_dateee">
                                   <Label className="ballllllll" for="cheDate">Cheque Date<span className="start_mark">*</span></Label>
                                   <DatePicker
                                       selected={this.state.new_cheque_date}
                                       onChange={(val) => {
                                           this.setState({
                                            new_cheque_date: val,
                                           });
                                       }}
                                       placeholder="Select date"
                                       dateFormat="dd-MM-yyyy"
                                       className="rui-datetimepicker form-control "
                                   />
                                   </div>

                                   <div className="col-lg-4 col-md-6 mar_toop">
                                   <Label className="ballllllll" for="bankName">Bank Name<span className="start_mark">*</span></Label>
                                   <Input className={this.state.borderNew && this.state.bank_name == "" ?  "form-control is-invalid" : "form-control"} type="text" name="policy_no" id="bankName" placeholder="Bank Name"
                                   value={this.state.bank_name}
                                   onChange={(e) => {
                                    this.setState({
                                      bank_name:e.target.value
                                    })
                                   }} />
                                   </div>
                                   </div>
                              </div>

   {/* *********************************************** Cheque to Insurance Company *********************************************************************** */}

                            <div className="ninth_section" style={{display:this.state.mode_of_premium_label =="SC Cheque" || this.state.mode_of_premium_label =="Customer Cheque + Float" ? "block":"none"}}>
                            {/* <div className="ninth_section" style={{display:(this.state.mode_of_premium_label =="SC Cheque" || this.state.mode_of_premium_label =="Customer Cheque + Float" || this.state.motor_section_show == "3_section") && (this.state.section_type == "3_section" || this.state.section_type == "2_section")? "block":"none"}}>*/}
                            {/* <div className="ninth_section" style={{display:this.state.insurer_paid_type == "Pre-Paid" && (this.state.mode_of_premium_label =="SC Cheque" || this.state.mode_of_premium_label =="Customer Cheque + Float" ) && (this.state.section_type == "3_section" || this.state.section_type == "2_section")? "block":"none"}}> */}
                            {/* <div className="ninth_section" style={{display:this.state.insurer_array_new ? (this.state.insurer_array_new.insurer_type == "pre_paid" ? "block" : "none"):"none"}}> */}
                              <div className="row">
                              <div className="col-lg-12 col-md-12 col-sm-12" style={{paddingRight: "15px",marginTop:"25px"}}>
                                        <div className="upladedddd">
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}>Cheque to Insurance Company</div>
                                      </div>
                                      <hr className="hr_newww" style={{marginTop:" 0px",marginBottom: "25px"}}/>
                                    </div>
                                    </div>


                                    <div className="row" style={{paddingTop: "10px",paddingBottom:"20px"}}>
                                     {this.state.insurer_array_typeee ? this.state.insurer_array_typeee.map((value,index)=>{
                                       return(
                                        <div className="col-lg-4" style={{whiteSpace:"nowrap"}} key={index}>
                                      <CustomInput type="radio" chec id={"formRadio" + index} checked={this.state.insurer_paid_type === value.label}  name="formRadio1" label={value.label} onClick={(e) => {
                                          this.setState({
                                            insurer_paid_type:value.label
                                          })
                                          }} />
                                        </div>
                                       )
                                     }):[]}

                                   </div>


                                    <div style={{display:this.state.insurer_paid_type == "Day End Receipting" || this.state.insurer_paid_type == "Post-Paid" ? "none" : "block"}} >
                                    <div className="row" >
                                    {this.state.policy_array ? this.state.policy_array.map((value,index)=>{
                                       return(
                                         <>
                                        <div className="col-lg-6 col-md-6 col-sm-12 for_top_mobile_ne">
                                        <Label className="ballllllll" for="cheNoNew">Cheque No {index + 1}</Label>
                                        <Select
                                          value = {value.cheque_object}
                                          placeholder="Select..."
                                          className="contact_sort"
                                          options={ cheque_array_new }
                                          styles={ customStyles }
                                          style={{marginBottom:"16px"}}
                                          isOptionDisabled={(option) => 'option.disabled'  }
                                  />
                                        </div>


                                        <div className="col-lg-6 col-md-6 for_top_mobile_ne">
                                            <Label className="ballllllll" for="amount_new">Amount</Label>
                                            <div className="inpu_delete">
                                            <Input type="number" name="policy_no" id="amount_new" placeholder="Amount" style={{marginBottom:"16px"}}
                                            value={value.policy_amount}  disabled/>


                                            {/* <div className="delete-tn_chwe" style={{visibility:this.state.delete_button_show==true ? "visible" :"hidden"}}>
                                            <Button className="delete_data_now" color="warning" disabled={this.state.policy_dock_control == "false" ? 'disabled' : ''}
                                            style={{ marginRight: "20px",color:"#fff"}}
                                            onClick={() => {
                                             this.delete_cheque_array(value)
                                            }}>Delete Cheque</Button>
                                            </div> */}
                                            </div>

                                   </div>

                                   {/* <div className="col-lg-12 col-md-12 for_top_mobile_ne" style={{display:this.state.cheque_id_new==value.cheque_id && this.state.change_check=="block" ? "block" :"none"}}>
                                              <p>Because of insufficient cheque balance please select Another cheque and Delete this Cheque</p>
                                            </div> */}







                                    </>
                                       )
                                      }):[]}
                                    <div className="col-lg-6 col-md-6 for_top_mobile_ne" style={{display:this.state.policy_blanace_amount==0 || this.state.insurer_paid_type !="Pre-Paid"  ? "none" :"block"}}>
                                      <div >
                                      {/* <div style={{display:this.state.delete_button_show==true ? "block" :"none"}}> */}
                                   <Label className="ballllllll" for="che_jjjj">Cheque No<span className="start_mark">*</span></Label>

                                   <Select
                                        value = {this.state.cheque_no_1}
                                        onChange={(e) => {
                                            //////console.log(e, "Val.....")
                                            this.setState({
                                              cheque_no_1: e,
                                              AlertDeleteSingle:true,
                                              cheque_id:e.value,
                                              new_cheque_no:e.label,
                                              balance_amount:e.balance_amount
                                            });
                                            // this.select_cheque_for_policy(e.value)
                                        }}
                                        placeholder="Select..."
                                        className={this.state.borderNew && this.state.cheque_no_1 == "" ?  "is_not_valid" : "contact_sort"}
                                        options={ cheque_array_new }
                                        styles={ customStyles }
                                        style={{marginBottom:"16px"}}
                                    />
                                   </div>
                                   </div>


                                   <div className="col-lg-6 col-md-6 for_top_mobile_ne" style={{display:this.state.policy_blanace_amount==0 || this.state.insurer_paid_type !="Pre-Paid"? "none" :"block"}}>
                                   <div >
                                   {/* <div style={{display:this.state.delete_button_show==true ? "block" :"none"}}> */}
                                   <Label className="ballllllll" for="amountt_dd">Amount<span className="start_mark">*</span></Label>
                                   <Input type="number" name="policy_no" id="amountt_dd" placeholder="Amount" style={{marginBottom:"16px"}}
                                   value={this.state.cheque_no_1_amount}
                                   onChange={(e) => {
                                    this.setState({
                                      cheque_no_1_amount:e.target.value
                                    })
                                   }}  />
                                   </div>
                                   </div>

                                   {/* <div className="col-lg-4 col-md-6 ">
                                   <Label className="ballllllll" for="emailInput1">Cheque No 2</Label>

                                     <Select
                                        value = {this.state.cheque_no_2}
                                        onChange={(e) => {
                                            //////console.log(e, "Val.....")
                                            this.setState({
                                              cheque_no_2: e,
                                              AlertDeleteSingle:true,
                                              cheque_id:e.value,
                                              new_cheque_no:e.label,
                                              balance_amount:e.balance_amount
                                            });
                                            // this.select_cheque_for_policy(e.value)
                                        }}
                                        placeholder="Select..."
                                        className="contact_sort"
                                        options={ cheque_array_new }
                                        styles={ customStyles }
                                    />
                                   </div>


                                   <div className="col-lg-4 col-md-6 mar_toop" >
                                   <Label className="ballllllll" for="emailInput1">Amount</Label>
                                   <Input type="text" name="policy_no" id="emailInput1" placeholder=""
                                   value={this.state.cheque_no_2_amount}
                                   onChange={(e) => {
                                    this.setState({
                                      cheque_no_2_amount:e.target.value
                                    })
                                   }}  />
                                   </div>

                                   <div className="col-lg-4 col-md-6 mar_toop" >
                                   <Label className="ballllllll" for="emailInput1">Cheque No 3</Label>

                                    <Select
                                        value = {this.state.cheque_no_3}
                                        onChange={(e) => {
                                            //////console.log(e, "Val.....")
                                            this.setState({
                                              cheque_no_3: e,
                                              AlertDeleteSingle:true,
                                              cheque_id:e.value,
                                              new_cheque_no:e.label,
                                              balance_amount:e.balance_amount
                                            });
                                            // this.select_cheque_for_policy(e.value)
                                        }}
                                        placeholder="Select..."
                                        className="contact_sort"
                                        options={ cheque_array_new }
                                        styles={ customStyles }
                                    />
                                   </div> */}


                                   {/* <div className="col-lg-4 col-md-6 mar_toop" >
                                   <Label className="ballllllll" for="emailInput1">Amount</Label>
                                   <Input type="text" name="policy_no" id="emailInput1" placeholder=""
                                   value={this.state.cheque_no_3_amount}
                                   onChange={(e) => {
                                    this.setState({
                                      cheque_no_3_amount:e.target.value
                                    })
                                   }}   />
                                   </div> */}



                                   <div className="col-lg-12 col-md-12 mar_toop" style={{display:this.state.remaining_message=="" ? "none" : "block"}}>
                                  <div style={{textAlign:"center" ,color:"red"}}>{this.state.remaining_message}</div>
                                   </div>
                                   </div>
                                   </div>
                              </div>


   {/* *********************************************** Remarks  *********************************************************************** */}

                            <div className="thent_section">
                              <div className="row">
                              <div className="col-lg-12 col-md-12 col-sm-12" style={{paddingRight: "15px",marginTop:"25px"}}>
                                        <div className="upladedddd">
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}>Remarks </div>
                                      </div>
                                      <hr className="hr_newww" style={{marginTop:" 0px",marginBottom: "25px"}}/>
                                    </div>
                                    <div className="col-lg-12 col-md-12 ">
                                   <Label className="ballllllll" for="remarksss_neww">Remarks</Label>
                                   <Input type="textarea" name="policy_no" id="remarksss_neww" placeholder="Remarks"
                                   value={this.state.policy_remarks}
                                   onChange={(e) => {
                                    this.setState({
                                      policy_remarks:e.target.value
                                    })
                                   }} />
                                   </div>
                                   </div>
                              </div>
 {/* ***********************************************  *********************************************************************** */}
                          </div>
                          </div>


                          {/*save form*/}
                          <div className="save_formsss" style={{display:this.state.for_show_btn=="" ? "inline-flex" : "none"}}>
                            <h3 className="error_data" style={{display:this.state.error_message_forms=="block" ? "block" :"none"}}>Please Fill All the Feilds</h3>
                             <Button disabled={this.state.opeartion_dock_control == "false" || this.state.enable_formsss=="no" ? 'disabled' : ''} color="warning" style={{texttransform: "capitalize" ,color:"#fff",display:this.state.for_show_btn=="" ? "block" : "none"}}
                              onClick={() => {
                              // this.setState({
                              // spinner_1: 'block'
                              // })
                              setTimeout(() => {
                              // this.fetch_single_cheque()
                              this.validation_forms()
                              }, 100)
                            }}>Save</Button>
                          </div>
                          {/**/}






                           </div>
                           </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
                      <Modal
                        isOpen={ this.state.modalOpen }
                        toggle={ this.toggle }
                        className={ this.props.className,"modal-dialog-centered model_width_data " }
                        fade

                    >
                        <div className="modal-header">
                            <h5 className="modal-title h2">Update Forms</h5>
                            <Button className="close" color="" onClick={ this.toggle }>
                                <Icon name="x" />
                            </Button>
                        </div>
                        <ModalBody style={{height: my_height-130}} className="mycalendar">
                          <div>
                            {/* ******************* one**************** */}
                            <div className="policy_sourced_by"  style={{ display: "inline-flex"}}>
                            <div className="width_of_data_new">Policy Issued By </div>:
                            <span className="" style={{ marginLeft: "5px" ,textTransform: "capitalize"}}>{this.state.policy_issued_by}</span>
                            </div>
                            <div className="fiest_section">
                                   <div className="row">

                                   <div className="col-lg-12 col-md-12 col-sm-12" style={{paddingRight: "15px"}}>
                                        <div className="upladedddd">
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}> Daily Sales Report </div>
                                      </div>
                                      <hr className="hr_newww" style={{marginTop:" 0px",marginBottom: "25px"}}/>
                                    </div>


                                   <div className="col-lg-4 col-md-6">
                                   <Label className="ballllllll" for="emailInput1">Policy Number<span className="start_mark">*</span></Label>
                                   <Input type="text" name="policy_no" id="emailInput1" placeholder="Policy Number"
                                   value={this.state.policy_number}
                                   onChange={(e) => {
                                    this.setState({
                                      policy_number:e.target.value
                                    })
                                   }} />
                                   </div>

                                   <div className="col-lg-4 col-md-6">
                                   <Label className="ballllllll" for="Fleet">RTO Cluster<span className="start_mark">*</span></Label>
                                   <Select
                                        value = {this.state.rto_cluster}
                                        onChange={(e) => {
                                            //////console.log(e, "Val.....")
                                            this.setState({
                                              rto_cluster: e,
                                            });
                                        }}
                                        placeholder="Select RTO Cluster"
                                        // className="contact_sort"
                                        className={this.state.borderNew && this.state.rto_cluster == "" ?  "is_not_valid" : "contact_sort"}
                                        options={ rto_cluster_array }
                                        styles={ customStyles }
                                    />
                                      {/* <Input className={this.state.borderNew && this.state.rto_cluster == "" ?  "form-control is-invalid" : "form-control"} type="text" name="RTOClusterrr" id="RTOClusterrr" placeholder="RTO Cluster"
                                      value={this.state.rto_cluster}
                                      onChange={(e) => {
                                        this.setState({
                                          rto_cluster:e.target.value,
                                          error_message_forms:"none"
                                        })
                                      }}  /> */}

                                   </div>

                                   <div className="col-lg-4 col-md-6 for_top_mobile_ne">
                                   <Label className="ballllllll" for="emailInput1 ">Vehicle Number<span className="start_mark">*</span></Label>
                                   <Input type="text" name="Vehicle_no" id="emailInput1" placeholder="Vehicle Number" style={{textTransform: "uppercase"}}
                                   value={this.state.vehicle_number}
                                   onChange={(e) => {
                                    this.setState({
                                      vehicle_number:e.target.value
                                    })
                                   }}  />
                                   </div>

                                   <div className="col-lg-4 col-md-6 for_top_mobile_ne mar_toop">
                                   <Label className="ballllllll" for="emailInput1">RTO Location<span className="start_mark">*</span></Label>
                                   <Input type="text" name="policy_no" id="emailInput1" placeholder="RTO Location"
                                   value={this.state.rto_location}
                                   onChange={(e) => {
                                    this.setState({
                                      rto_location:e.target.value
                                    })
                                   }}  />
                                   </div>

                                   <div className="col-lg-4 col-md-6 mar_toop">
                                   <Label className="ballllllll" for="emailInput1">Policy Start Date<span className="start_mark">*</span></Label>
                                   <DatePicker
                                       selected={this.state.new_start_date}
                                       onChange={(val) => {
                                           this.setState({
                                            new_start_date: val,
                                           });
                                       }}
                                       placeholder="Select date"
                                       dateFormat="dd-MM-yyyy"
                                       className="rui-datetimepicker form-control "
                                   />
                                   </div>

                                   <div className="col-lg-4 col-md-6 mar_toop">
                                   <Label className="ballllllll" for="emailInput1">Policy End Date<span className="start_mark">*</span></Label>
                                   <DatePicker
                                       selected={this.state.new_end_date}
                                       onChange={(val) => {
                                           this.setState({
                                            new_end_date: val,
                                           });
                                       }}
                                       placeholder="Select date"
                                       dateFormat="dd-MM-yyyy"
                                       className="rui-datetimepicker form-control "
                                   />
                                   </div>

                                   <div className="col-lg-4 col-md-6 mar_toop">
                                   <Label className="ballllllll" for="emailInput1">Issue Date<span className="start_mark">*</span></Label>
                                   <DatePicker
                                       selected={this.state.issue_date}
                                       onChange={(val) => {
                                           this.setState({
                                            issue_date: val,
                                           });
                                       }}
                                       placeholder="Select date"
                                       dateFormat="dd-MM-yyyy"
                                       className="rui-datetimepicker form-control "
                                   />
                                   </div>

                                   <div className="col-lg-4 col-md-6 mar_toop">
                                   <Label className="ballllllll" for="emailInput1">Customer Name<span className="start_mark">*</span></Label>
                                   <Input type="text" name="policy_no" id="emailInput1" placeholder="Customer Name"
                                   value={this.state.customer_name}
                                   onChange={(e) => {
                                    this.setState({
                                      customer_name:e.target.value
                                    })
                                   }}  />
                                   </div>

                                   <div className="col-lg-4 col-md-6 mar_toop">
                                   <Label className="ballllllll" for="emailInput1">Fleet or Non Fleet<span className="start_mark">*</span></Label>
                                   {/* <div className="fleett">
                                   <CustomInput type="radio" checked={this.state.fleet_type === "fleet" ? true : false} id="formRadio1" name="formRadio1" label="Fleet" onClick={(e) => {
                                     this.setState({
                                       fleet_type:"fleet"
                                     })
                                    }} />
                                   <CustomInput type="radio" checked={this.state.fleet_type == "non_fleet" ? true : false} id="formRadio2" name="formRadio1" label="Non Fleet"
                                   onClick={(e) => {
                                     this.setState({
                                       fleet_type:"non_fleet"
                                     })
                                    }}/>
                                   </div> */}
                                    <Select
                                        value = {this.state.fleet_type}
                                        onChange={(e) => {
                                            //////console.log(e, "Val.....")
                                            this.setState({
                                              fleet_type: e,
                                            });
                                        }}
                                        placeholder="Select..."
                                        className="contact_sort"
                                        options={ fleet_array }
                                        styles={ customStyles }
                                    />
                                   </div>


                                   <div className="col-lg-4 col-md-6 mar_toop">
                                   <Label className="ballllllll" for="emailInput1">Contact Number</Label>
                                   <Input type="number" name="policy_no" id="emailInput1" placeholder="Contact Number"
                                   value={this.state.contact_no}
                                   onChange={(e) => {
                                    this.setState({
                                      contact_no:e.target.value
                                    })
                                   }}  />
                                   </div>

                                   <div className="col-lg-4 col-md-6 mar_toop">
                                   <Label className="ballllllll" for="emailInput1">Select Vehicle Type<span className="start_mark">*</span></Label>
                                   <Select
                                        value = {this.state.motor_type}
                                        onChange={(e) => {
                                            //////console.log(e, "Val.....")
                                            this.setState({
                                                motor_type: e,
                                                motor_type_data_edit: e.label,
                                                section_type:e.section,
                                                error_message_forms:"none"
                                            });
                                        }}
                                        className="contact_sort"
                                        placeholder="Select..."
                                        options={ motor_type_array }
                                        styles={ customStyles }
                                    />
                                    </div>
                                    <div className="col-lg-4 col-md-6 mar_toop" style={{display:this.state.motor_type_data_edit == "Motor" ? "block" :"none"}}>
                                   <Label className="ballllllll" for="emailInput1">Select Motor Type<span className="start_mark">*</span></Label>

                                    <Select
                                            value = {this.state.type_of_motor}
                                            onChange={(e) => {
                                                ////console.log(e, "Val.....")
                                                this.setState({
                                                    type_of_motor: e,
                                                    type_of_motor_data_edit: e.label,
                                                    comercial_label_edit:"",
                                                    pvc_capacity_edit:"",
                                                    section_type_for_edit:e.section,
                                                    error_message_forms:"none",
                                                    new_for_liabilty_or_comprehensive:"",
                                                    liabilty_or_comprehensive:"",
                                                });
                                            }}
                                            placeholder="Select..."
                                            className="contact_sort"
                                            options={ motor_array }
                                            styles={ customStyles }
                                        />
                                      </div>
                                    <div className="col-lg-4 col-md-6 mar_toop" style={{display:this.state.type_of_motor_data_edit == "Private car" && this.state.motor_type_data_edit == "Motor" ? "block" :"none"}}>
                                   <Label className="ballllllll" for="emailInput1">Type Of Policy<span className="start_mark">*</span></Label>

                                    <Select
                                            value = {this.state.private_car_data}
                                            onChange={(e) => {
                                                ////console.log(e, "Val.....")
                                                this.setState({
                                                    private_car_data: e,
                                                    section_type_for_edit:e.section,
                                                    comercial_label_edit:"",
                                                    pvc_capacity_edit:"",
                                                    error_message_forms:"none"
                                                });
                                            }}
                                            placeholder="Select..."
                                            className="contact_sort"
                                            options={ private_car }
                                            styles={ customStyles }
                                        />
                                      </div>
                                    <div className="col-lg-4 col-md-6 mar_toop" style={{display:this.state.type_of_motor_data_edit == "Two Wheeler" && this.state.motor_type_data_edit == "Motor" ? "block" :"none"}}>
                                   <Label className="ballllllll" for="emailInput1">Type Of Policy<span className="start_mark">*</span></Label>

                                    <Select
                                            value = {this.state.two_wheeler}
                                            onChange={(e) => {
                                                ////console.log(e, "Val.....")
                                                this.setState({
                                                  two_wheeler: e,
                                                    section_type_for_edit:e.section,
                                                    comercial_label_edit:"",
                                                    pvc_capacity_edit:"",
                                                    error_message_forms:"none"
                                                });
                                            }}
                                            placeholder="Select..."
                                            className="contact_sort"
                                            options={ two_wheeler }
                                            styles={ customStyles }
                                        />
                                      </div>
                                    <div className="col-lg-4 col-md-6 mar_toop" style={{display:this.state.type_of_motor_data_edit == "Commercial" && this.state.motor_type_data_edit == "Motor" ? "block" :"none"}}>
                                   <Label className="ballllllll" for="emailInput1">Select Commercial<span className="start_mark">*</span></Label>

                                    <Select
                                            value = {this.state.comercial_data}
                                            onChange={(e) => {
                                                ////console.log(e, "Val.....")
                                                this.setState({
                                                    comercial_data: e,
                                                    comercial_label_edit: e.label,
                                                    section_type_for_edit:e.section,
                                                    pvc_capacity_edit:"",
                                                    error_message_forms:"none",
                                                    new_for_liabilty_or_comprehensive:"Commercial",
                                                    liabilty_or_comprehensive:"",
                                                });
                                            }}
                                            placeholder="Select..."
                                            className="contact_sort"
                                            options={ commercial_data }
                                            styles={ customStyles }
                                        />
                                      </div>
                                    <div className="col-lg-4 col-md-6 mar_toop" style={{display:this.state.type_of_motor_data_edit == "MISC D" && this.state.motor_type_data_edit == "Motor" ? "block" :"none"}}>
                                   <Label className="ballllllll" for="emailInput1">Select MISC D<span className="start_mark">*</span></Label>

                                    <Select
                                            value = {this.state.miscd_data}
                                            onChange={(e) => {
                                                ////console.log(e, "Val.....")
                                                this.setState({
                                                    miscd_data: e,
                                                    section_type_for_edit:e.section,
                                                    error_message_forms:"none",
                                                    liabilty_or_comprehensive:"",
                                                    new_for_liabilty_or_comprehensive:"Miscd"
                                                });
                                            }}
                                            placeholder="Select..."
                                            className="contact_sort"
                                            options={ misd_data }
                                            styles={ customStyles }
                                        />
                                      </div>


                                    <div className="col-lg-4 col-md-6 mar_toop" style={{display:this.state.comercial_label_edit == "PCV" && this.state.motor_type_data_edit == "Motor" ? "block" :"none"}}>
                                   <Label className="ballllllll" for="emailInput1">PCV Type<span className="start_mark">*</span></Label>

                                    <Select
                                            value = {this.state.pvc_type}
                                            onChange={(e) => {
                                                ////console.log(e, "Val.....")
                                                this.setState({
                                                    pvc_type: e,
                                                    section_type_for_edit:e.section,
                                                    pvc_capacity_edit:e.capacity,
                                                    error_message_forms:"none"
                                                });
                                            }}
                                            placeholder="Select..."
                                            className="contact_sort"
                                            options={ pvc_type }
                                            styles={ customStyles }
                                        />
                                      </div>
                                      <div className="col-lg-4 col-md-6 mar_toop" style={{display:this.state.new_for_liabilty_or_comprehensive == "Miscd" || this.state.new_for_liabilty_or_comprehensive == "Commercial"   ? "block" :"none"}}>
                                      <Label className="ballllllll" for="pcvtype">Type Of Policy<span className="start_mark">*</span></Label>

                                        <Select
                                                value = {this.state.liabilty_or_comprehensive}
                                                onChange={(e) => {
                                                    ////console.log(e, "Val.....")
                                                    this.setState({
                                                        liabilty_or_comprehensive: e,
                                                        error_message_forms:"none"
                                                    });
                                                }}
                                                placeholder="Select..."
                                                className={this.state.borderNew && this.state.liabilty_or_comprehensive == "" ?  "is_not_valid" : "contact_sort"}
                                                options={ array_liabilty_or_comprehensive }
                                                styles={ customStyles }
                                            />
                                          </div>

                                      {/* <div className="col-lg-4 col-md-6 mar_toop" style={{display:this.state.comercial_label_edit == "GCV" && this.state.motor_type_data_edit == "Motor" ?"block" :"none"}}>
                                        <Label className="ballllllll" for="emailInput1">GVW</Label>
                                        <Input type="text" name="policy_no" id="emailInput1" placeholder="Short Answer"
                                        value={this.state.gcv_data}
                                        onChange={(e) => {
                                          this.setState({
                                            gcv_data:e.target.value,
                                            error_message_forms:"none"
                                          })
                                        }}  />
                                      </div>

                                      <div className="col-lg-4 col-md-6 mar_toop" style={{display:this.state.pvc_capacity_edit=="1" && this.state.motor_type_data_edit == "Motor" ?"block" :"none"}}>
                                        <Label className="ballllllll" for="emailInput1">Seat Capacity</Label>
                                        <Input type="number" name="policy_no" id="emailInput1" placeholder="Short Answer"
                                        value={this.state.pvc_capacity_new}
                                        onChange={(e) => {
                                          this.setState({
                                            pvc_capacity_new:e.target.value,
                                            error_message_forms:"none"
                                          })
                                        }}  />
                                      </div> */}

                                   {/* <div className="col-lg-4 col-md-6 mar_toop">
                                   <Label className="ballllllll" for="emailInput1">Class Of Vehicle<span className="start_mark">*</span></Label>
                                   <Select
                                        value = {this.state.class_of_vehicle}
                                        onChange={(e) => {
                                            //////console.log(e, "Val.....")
                                            this.setState({
                                                class_of_vehicle: e,
                                            });
                                        }}
                                        placeholder="Select..."
                                        className="contact_sort"
                                        options={ class_of_vehicle }
                                        styles={ customStyles }
                                    />
                                   </div>


                                   <div className="col-lg-4 col-md-6 mar_toop">
                                   <Label className="ballllllll" for="emailInput1">Sub Class Of Vehicle<span className="start_mark">*</span></Label>
                                   <Select
                                        value = {this.state.sub_class_of_vehicle}
                                        onChange={(e) => {
                                            //////console.log(e, "Val.....")
                                            this.setState({
                                                sub_class_of_vehicle: e,
                                                section_type_for_edit:e.section
                                            });
                                        }}
                                        className="contact_sort"
                                        placeholder="Select..."
                                        options={ sub_class_of_vehicle }
                                        styles={ customStyles }
                                    />
                                   </div> */}



                                   </div>
                                   </div>

    {/* ***********************************************   MIS-D Type    *********************************************************************** */}
                <div className="second_section" style={{display:this.state.section_type_for_edit == "2_section" ? "block" : "none"}}>
                                   <div className="row">
                                   <div className="col-lg-12 col-md-12 col-sm-12" style={{paddingRight: "15px",marginTop:"25px"}}>
                                        <div className="upladedddd">
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}> MIS-D Type </div>
                                      </div>
                                      <hr className="hr_newww" style={{marginTop:" 0px",marginBottom: "25px"}}/>
                                    </div>

                                   <div className="col-lg-4 col-md-6">
                                   <Label className="ballllllll" for="emailInput1">Type Of MIS-D<span className="start_mark">*</span></Label>
                                   <Input type="text" name="policy_no" id="emailInput1" placeholder="Type Of MIS-D"
                                   value={this.state.type_of_mis_d}
                                   onChange={(e) => {
                                    this.setState({
                                      type_of_mis_d:e.target.value
                                    })
                                   }} />
                                   </div>

                                   </div>
                                   </div>


 {/* *******************************************  Type Of Policy   *********************************************************************** */}

                               <div className="third_section" >
                               {/* <div className="third_section" style={{display:this.state.section_type_for_edit == "3_section" || this.state.section_type_for_edit == "2_section" ? "block" : "none"}}> */}
                                   <div className="row">
                                   <div className="col-lg-12 col-md-12 col-sm-12" style={{paddingRight: "15px",marginTop:"25px"}}>
                                        <div className="upladedddd">
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}> Type Of Policy </div>
                                      </div>
                                      <hr className="hr_newww" style={{marginTop:" 0px",marginBottom: "25px"}}/>
                                    </div>
                                   {/* <div className="col-lg-4 col-md-6">
                                   <Label className="ballllllll" for="emailInput1">Type Of Policy<span className="start_mark">*</span></Label>
                                   <Select
                                        value = {this.state.type_of_policy}
                                        onChange={(e) => {
                                            //////console.log(e, "Val.....")
                                            this.setState({
                                                type_of_policy: e
                                            });
                                        }}
                                        placeholder="Select..."
                                        className="contact_sort"
                                        options={ type_of_policy }
                                        styles={ customStyles }
                                    />
                                   </div> */}

                                   <div className="col-lg-4 col-md-6 for_top_mobile_ne">
                                   <Label className="ballllllll" for="emailInput1">Make <span className="start_mark">*</span></Label>
                                   <Input type="text" name="Vehicle_no" id="emailInput1" placeholder="Make"
                                   value={this.state.make}
                                   onChange={(e) => {
                                    this.setState({
                                      make:e.target.value
                                    })
                                   }} />
                                   </div>

                                   <div className="col-lg-4 col-md-6 for_top_mobile_ne">
                                   <Label className="ballllllll" for="emailInput1">Model <span className="start_mark">*</span></Label>
                                   <Input type="text" name="policy_no" id="emailInput1" placeholder="Model"
                                   value={this.state.model}
                                   onChange={(e) => {
                                    this.setState({
                                      model:e.target.value
                                    })
                                   }} />
                                   </div>


                                   <div className="col-lg-4 col-md-6 ">
                                   <Label className="ballllllll" for="emailInput1">CC/GVW/PCC <span className="start_mark">*</span></Label>
                                   <Input type="text" name="policy_no" id="emailInput1" placeholder="CC/GVW/PCC"
                                   value={this.state.cc_gvw_pcc}
                                   onChange={(e) => {
                                    this.setState({
                                      cc_gvw_pcc:e.target.value
                                    })
                                   }} />
                                   </div>

                                   <div className="col-lg-4 col-md-6 mar_toop">
                                   <Label className="ballllllll" for="cc">GVW Category<span className="start_mark">*</span></Label>
                                   <Input className={this.state.borderNew && this.state.gvw_category == "" ?  "form-control is-invalid" : "form-control"} type="text" name="policy_no" id="cc" placeholder="GVW Category"
                                   value={this.state.gvw_category}
                                   onChange={(e) => {
                                    this.setState({
                                      gvw_category:e.target.value,
                                      error_message_forms:"none"
                                    })
                                   }} />
                                   </div>

                                   <div className="col-lg-4 col-md-6 mar_toop">
                                   <Label className="ballllllll" for="emailInput1">NCB <span className="start_mark">*</span></Label>
                                   {/* <Input type="text" name="policy_no" id="emailInput1" placeholder=""
                                   value={this.state.ncb_type}
                                   onChange={(e) => {
                                    this.setState({
                                      ncb_type:e.target.value
                                    })
                                   }}  /> */}

                                    <Select
                                        value = {this.state.ncb_type}
                                        onChange={(e) => {
                                            //////console.log(e, "Val.....")
                                            this.setState({
                                              ncb_type: e,
                                              error_message_forms:"none"
                                            });
                                        }}
                                        placeholder="Select..."
                                        className="contact_sort"
                                        options={ ncb_type }
                                        styles={ customStyles }
                                    />
                                   </div>


                                   <div className="col-lg-4 col-md-6 mar_toop">
                                   <Label className="ballllllll" for="emailInput1">Add On &apos; s <span className="start_mark">*</span></Label>
                                   {/* <div className="fleett_222">
                                   <CustomInput type="radio" checked={this.state.add_on_type === "yes"} id="formRadio3" name="formRadio_add_on" label="Yes" onClick={(e) => {
                                     this.setState({
                                       add_on_type:"yes"
                                     })
                                    }}/>
                                   <div style={{marginLeft: "30px"}}>
                                   <CustomInput type="radio" checked={this.state.add_on_type === "no"} id="formRadio4" name="formRadio_add_on" label="No" onClick={(e) => {
                                     this.setState({
                                       add_on_type:"no"
                                     })
                                    }}/></div>
                                   </div> */}

                                    <Select
                                        value = {this.state.add_on_type}
                                        onChange={(e) => {
                                            //////console.log(e, "Val.....")
                                            this.setState({
                                              add_on_type: e,
                                              error_message_forms:"none"
                                            });
                                        }}
                                        placeholder="Select..."
                                        className="contact_sort"
                                        options={ add_on_array }
                                        styles={ customStyles }
                                    />
                                   </div>

                                   <div className="col-lg-4 col-md-6 mar_toop">
                                   <Label className="ballllllll" for="emailInput1">Fuel Type <span className="start_mark">*</span></Label>
                                   <Select
                                        value = {this.state.fuel_type}
                                        onChange={(e) => {
                                            //////console.log(e, "Val.....")
                                            this.setState({
                                                fuel_type: e
                                            });
                                        }}
                                        placeholder="Select..."
                                        className="contact_sort"
                                        options={ fuel_type }
                                        styles={ customStyles }
                                    />
                                   </div>


                                   <div className="col-lg-4 col-md-6 mar_toop">
                                   <Label className="ballllllll" for="emailInput1">Insurer <span className="start_mark">*</span></Label>
                                   <Select
                                        value = {this.state.insurer_array_new}
                                        onChange={(e) => {
                                            //////console.log(e, "Val.....")
                                            this.setState({
                                                insurer_array_new: e,
                                                insurer_array_typeee: e.insurer_type
                                            });
                                        }}
                                        placeholder="Select..."
                                        className="contact_sort"
                                        options={ insurer_array }
                                        styles={ customStyles }
                                    />
                                   </div>
                                   <div className="col-lg-4 col-md-6 mar_toop">
                                   <Label className="ballllllll" for="od_amount">OD</Label>
                                   <Input type="text" disabled={this.state.od_premium_new == "disable" ? 'disabled' :''} name="od_no" id="od1" placeholder="OD"
                                   value={this.state.od_amount}
                                   onChange={(e) => {
                                    this.setState({
                                      od_amount:e.target.value,
                                      error_message_forms:"none"
                                    })
                                    setTimeout(() => {
                                      this.od_plus_addons(this.state.od_amount,this.state.addon_amount)
                                    }, 800)
                                   }}  />
                                   </div>

                                   <div className="col-lg-4 col-md-6 mar_toop">
                                   <Label className="ballllllll" for="emailInput1">Addon</Label>
                                   <Input type="number" disabled={this.state.od_premium_new == "disable" ? 'disabled' :''} name="policy_no" id="emailInput1" placeholder="Addon"
                                   value={this.state.addon_amount}
                                   onChange={(e) => {
                                    this.setState({
                                      addon_amount:e.target.value,
                                      error_message_forms:"none"
                                    })
                                    setTimeout(() => {
                                      this.od_plus_addons(this.state.od_amount,this.state.addon_amount)
                                    }, 800)
                                   }}  />
                                   </div>
                                   <div className="col-lg-4 col-md-6 mar_toop">
                                   <Label className="ballllllll" for="emailInput1">OD+Addon Premium</Label>
                                   <Input type="text" name="policy_no" id="emailInput1" placeholder="OD+Addon Premium"
                                   value={this.state.addon_premium}
                                   onChange={(e) => {
                                    this.setState({
                                      addon_premium:e.target.value
                                    })
                                    setTimeout(() => {
                                      this.amount_calculation(this.state.po_discount_in_percent)
                                    }, 800)
                                   }}  />
                                   </div>
                                   <div className="col-lg-4 col-md-6 mar_toop">
                                   <Label className="ballllllll" for="emailInput1">Net Premium<span className="start_mark">*</span></Label>
                                   <Input type="text" name="policy_no" id="emailInput1" placeholder="Net Premium"
                                   value={this.state.net_premium}
                                   onChange={(e) => {
                                    this.setState({
                                      net_premium:e.target.value
                                    })
                                    setTimeout(() => {
                                      this.amount_calculation(this.state.po_discount_in_percent)
                                    }, 800)
                                   }}  />
                                   </div>
                                   <div className="col-lg-4 col-md-6 mar_toop">
                                   <Label className="ballllllll" for="emailInput1">Gross Premium<span className="start_mark">*</span></Label>
                                   <Input type="text" name="policy_no" id="emailInput1" placeholder="Gross Premium"
                                   value={this.state.gross_premium}
                                   onChange={(e) => {
                                    this.setState({
                                      gross_premium:e.target.value
                                    })
                                    setTimeout(() => {
                                      this.amount_calculation(this.state.po_discount_in_percent)
                                    }, 800)
                                   }}  />
                                   </div>
                                   <div className="col-lg-4 col-md-6 mar_toop">
                                   <Label className="ballllllll" for="emailInput1">Amount Receivable Rs.</Label>
                                   <Input type="text" name="policy_no" id="emailInput1" placeholder="Amount Receivable Rs"
                                   value={this.state.amount_receivable}
                                   onChange={(e) => {
                                    this.setState({
                                      amount_receivable:e.target.value
                                    })

                                   }} />
                                   </div>
                                   <div className="col-lg-4 col-md-6 mar_toop">
                                   <Label className="ballllllll" for="emailInput1">PO on<span className="start_mark">*</span></Label>
                                   {/* <div className="fleett">
                                   <CustomInput type="radio" checked={this.state.po_on_type === "od_premium"} id="formRadio555" name="formRadio_po_on_type" label="OD Premium"
                                   onClick={(e) => {
                                     this.setState({
                                       po_on_type:"od_premium"
                                     })
                                     setTimeout(() => {
                                      this.amount_calculation(this.state.po_discount_in_percent)
                                    }, 800)
                                    }}/>
                                   <CustomInput type="radio" checked={this.state.po_on_type === "net_premium"} id="formRadio699" name="formRadio_po_on_type" label="Net Premium"
                                   onClick={(e) => {
                                     this.setState({
                                       po_on_type:"net_premium"
                                     })
                                     setTimeout(() => {
                                      this.amount_calculation(this.state.po_discount_in_percent)
                                    }, 800)
                                    }}/>
                                   </div> */}


                                        <Select
                                        value = {this.state.po_on_type}
                                        onChange={(e) => {
                                            //////console.log(e, "Val.....")
                                            this.setState({
                                              po_on_type: e,
                                              error_message_forms:"none"
                                            });
                                            setTimeout(() => {
                                              this.amount_calculation(this.state.po_discount_in_percent)
                                            }, 800)
                                        }}
                                        placeholder="Select..."
                                        className="contact_sort"
                                        options={ po_on_array }
                                        styles={ customStyles }
                                    />

                                    {/* <Input type="text" name="policy_no" id="emailInput1"  placeholder=""
                                      value={this.state.po_on_type}
                                      onChange={(e) => {
                                        this.setState({
                                          po_on_type:e.target.value,
                                          error_message_forms:"none"
                                        })
                                      }} /> */}


                                   </div>

                                   <div className="col-lg-4 col-md-6 mar_toop">
                                   <Label className="ballllllll" for="emailInput1">Type of Payout<span className="start_mark">*</span></Label>
                                   <Select
                                        value = {this.state.type_of_payout}
                                        onChange={(e) => {
                                            //////console.log(e, "Val.....")
                                            this.setState({
                                                type_of_payout: e,
                                                type_of_payout_label: e.label,
                                                mode_of_premium_received:"",
                                                error_message_forms:"none",
                                                cheque_to_sc:"",
                                                section_type_new:"",
                                                mode_of_premium_label:"",
                                            });
                                            setTimeout(() => {
                                              this.amount_calculation(this.state.po_discount_in_percent)
                                            }, 800)
                                        }}
                                        placeholder="Select..."
                                        className="contact_sort"
                                        options={ type_of_payout }
                                        styles={ customStyles }
                                    />
                                   </div>

                                   <div className="col-lg-4 col-md-6 mar_toop">
                                   <Label className="ballllllll" for="emailInput1">Agent or Telecalling<span className="start_mark">*</span></Label>
                                   <Select
                                        value = {this.state.agent_or_tellcalling}
                                        onChange={(e) => {
                                            //////console.log(e, "Val.....")
                                            this.setState({
                                              agent_or_tellcalling: e,
                                              agent_delete_section:e.section
                                            });
                                        }}
                                        placeholder="Select..."
                                        className="contact_sort"
                                        options={agent_or_tellcalling }
                                        styles={ customStyles }
                                    />
                                   </div>

                                   <div className="col-lg-4 col-md-4 mar_toop">
                                   <Label className="ballllllll" for="emailInput1">Customer Payment Status</Label>
                                   <Select
                                        value = {this.state.payment_from_customer}
                                        onChange={(e) => {
                                            this.setState({
                                                payment_from_customer: e,
                                            });
                                        }}
                                        placeholder="Select..."
                                        className="contact_sort"
                                        options={ customer_recevied_payemnt }
                                        styles={ customStyles }
                                    />
                                   </div>


                                   <div className="col-lg-4 col-md-6 mar_toop">
                                   <Label className="ballllllll" for="emailInput1">Mode of Premium Received<span className="start_mark">*</span></Label>
                                   <div style={{display:this.state.type_of_payout_label == "Cut Pay" ? "block" :"none"}}>
                                   <Select
                                        value = {this.state.mode_of_premium_received}
                                        onChange={(e) => {
                                            //console.log(e, "Val.....")
                                            this.setState({
                                              mode_of_premium_received: e,
                                              cheque_to_sc: e.label,
                                              error_message_forms:"none",
                                              mode_of_premium_label:"",
                                              policy_array:[],
                                            });
                                            this.select_sec_seven(e)
                                        }}
                                        placeholder="Select..."
                                        className={this.state.borderNew && this.state.mode_of_premium_received == "" ?  "is_not_valid" : "contact_sort"}
                                        options={mode_of_premium_received   }
                                        styles={ customStyles }
                                    />
                                   </div>
                                   <div style={{display:this.state.type_of_payout_label == "Cut Pay" ? "none" :"block"}}>
                                   <Select
                                        value = {this.state.mode_of_premium_received}
                                        onChange={(e) => {
                                            //////console.log(e, "Val.....")
                                            this.setState({
                                              mode_of_premium_received: e,
                                              cheque_to_sc: e.label,
                                              error_message_forms:"none",
                                              mode_of_premium_label:"",
                                              policy_array:[],
                                            });
                                            this.select_sec_seven(e)
                                        }}
                                        placeholder="Select..."
                                        className={this.state.borderNew && this.state.mode_of_premium_received == "" ?  "is_not_valid" : "contact_sort"}
                                        options={for_payout_mode_of_premium_received}
                                        styles={ customStyles }
                                    />
                                   </div>
                                   </div>


                               <div className="col-lg-4 col-md-4 col-sm-12 mar_toop" style={{display:this.state.cheque_to_sc == "Pending" ? "none" :"grid"}}>
                                <Label className="ballllllll">Attachment</Label>
                                {/* <div>
                                <input id="inputGroupFile01" disabled type="file"  className="no_input_file"  multiple onChange={this.handleChangeFile_new} style={{display:"none"}} />
                                         <label className="lord_lable" htmlFor="inputGroupFile01">
                                          <div className="file_name"></div>
                                          <div className="choose align-self-center">Choose file</div>
                                         </label>

                                </div> */}
                                <div className="attachment_data_array_che_qqq">
                                        {this.state.document_data_data ? this.state.document_data_data.map((v,i)=>{
                                            return(
                                              <div key={i} className="m_bottom">
                                              <span style={{display: v.file_type=="pdf" ? "block" :"none"}}>
                                              <a rel="noreferrer" href={v.file_name} target="_blank">
                                              <img width="50" src={pdf_img} alt='' style={{ marginRight: "6px", height: "40px",marginBottom:"5px"}} />
                                              </a>
                                              </span>
                                              <span style={{display: v.file_type !="pdf" ? "block" :"none"}}>
                                              <a rel="noreferrer" href={v.file_name} target="_blank">
                                              <img width="50" src={v.file_name} alt='' style={{ marginRight: "6px", height: "40px",marginBottom:"5px"}} />
                                              </a>
                                             </span>
                                         </div>
                                            )
                                        }):[]}
                                    </div>
                                </div>




                                   </div>
                                   </div>




 {/* *********************************************** Telecaller Name  *********************************************************************** */}

                              <div className="fouth_section" style={{display:this.state.agent_delete_section=="4_section" && this.state.section_type_for_edit == "3_section" ? "block":"none"}}>
                              <div className="row">
                              <div className="col-lg-12 col-md-12 col-sm-12" style={{paddingRight: "15px",marginTop:"25px"}}>
                                        <div className="upladedddd">
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}> Telecaller Name </div>
                                      </div>
                                      <hr className="hr_newww" style={{marginTop:" 0px",marginBottom: "25px"}}/>
                                    </div>
                                   <div className="col-lg-4 col-md-6">
                                   <Label className="ballllllll" for="emailInput1">Telecaller Name<span className="start_mark">*</span></Label>
                                   <Select
                                       isOptionDisabled={(option) =>  'option.disabled'}
                                        value = {this.state.tele_caller_name}
                                        onChange={(e) => {
                                            //////console.log(e, "Val.....")
                                            this.setState({
                                                tele_caller_name: e
                                            });
                                        }}
                                        className="contact_sort"
                                        placeholder="Select..."
                                        options={ tellicar_name }
                                        styles={ customStyles }
                                    />
                                   </div>
                                   </div>
                              </div>
 {/* *********************************************** Agent/Dealer Name *********************************************************************** */}

                              <div className="fifth_section" style={{display:(this.state.agent_delete_section=="5_section" || this.state.agent_name_section == "5_section" ) ||  this.state.section_type_for_edit == "3_section" ? "block":"none"}}>
                              <div className="row">
                              <div className="col-lg-12 col-md-12 col-sm-12" style={{paddingRight: "15px",marginTop:"25px"}}>
                                        <div className="upladedddd">
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}>Agent/Dealer Name</div>
                                      </div>
                                      <hr className="hr_newww" style={{marginTop:" 0px",marginBottom: "25px"}}/>
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                   <Label className="ballllllll" for="emailInput1">Agent/Dealer Name</Label>
                                   <Select

                                        value = {this.state.agent_dealer_name}
                                        onChange={(e) => {
                                            //////console.log(e, "Val.....")
                                            this.setState({
                                                agent_dealer_name: e
                                            });
                                        }}
                                        placeholder="Select..."
                                        options={ agent_array }
                                        styles={ customStyles }
                                        className="contact_sort"
                                    />
                                   {/* <Input type="text" name="Vehicle_no" id="emailInput1" placeholder=""
                                        value={this.state.agent_dealer_name}
                                        onChange={(e) => {
                                          this.setState({
                                            agent_dealer_name:e.target.value
                                          })
                                        }} /> */}
                                   {/* <Select
                                        value = {this.state.agent_dealer_name}
                                        onChange={(e) => {
                                            //////console.log(e, "Val.....")
                                            this.setState({
                                                agent_dealer_name: e
                                            });
                                        }}
                                        placeholder="Select..."
                                        options={ sub_class_of_vehicle }
                                        styles={ customStyles }
                                    /> */}
                                   </div>
                                   </div>
                              </div>
 {/* *********************************************** PO Details  *********************************************************************** */}

                              <div className="sixth_section">
                              <div className="row">
                              <div className="col-lg-12 col-md-12 col-sm-12" style={{paddingRight: "15px",marginTop:"25px"}}>
                                        <div className="upladedddd">
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}> PO Details </div>
                                      </div>
                                      <hr className="hr_newww" style={{marginTop:" 0px",marginBottom: "25px"}}/>
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                   <Label className="ballllllll" for="emailInput1">PO %<span className="start_mark">*</span></Label>
                                   <Input disabled type="text" name="Vehicle_no" id="emailInput1" placeholder="PO %"
                                   value={Number(this.state.po_discount_in_percent).toFixed()}
                                   onChange={(e) => {
                                    this.setState({
                                      po_discount_in_percent:e.target.value
                                    })
                                    setTimeout(() => {
                                      this.amount_calculation(this.state.po_discount_in_percent)
                                    }, 800)
                                   }} />
                                   </div>

                                   <div className="col-lg-4 col-md-6 for_top_mobile_ne">
                                   <Label className="ballllllll" for="emailInput1">PO Amount<span className="start_mark">*</span></Label>
                                   <Input disabled type="text" name="policy_no" id="emailInput1" placeholder="PO Amount"
                                   value={this.state.po_discount_amount}
                                   onChange={(e) => {
                                    this.setState({
                                      po_discount_amount:e.target.value
                                    })
                                    setTimeout(() => {
                                      this.amount_calculation(this.state.po_discount_in_percent)
                                    }, 800)
                                   }} />
                                   </div>
                                   <div className="col-lg-4 col-md-6 for_top_mobile_ne">
                                   <Label className="ballllllll" for="emailInput1">PO Status<span className="start_mark">*</span></Label>
                                   {/* <div className="fleett">
                                   <CustomInput type="radio" checked={this.state.po_discount_status === "paid"} id="formRadio8" name="formRadio_status" label="Paid"
                                   onClick={(e) => {
                                     this.setState({
                                       po_discount_status:"paid"
                                     })
                                    }}/>
                                   <CustomInput type="radio" checked={this.state.po_discount_status === "pending"} id="formRadio9" name="formRadio_status" label="Pending"
                                   onClick={(e) => {
                                     this.setState({
                                       po_discount_status:"pending"
                                     })
                                    }} />
                                   <CustomInput type="radio" checked={this.state.po_discount_status === "nil"} id="formRadio10" name="formRadio_status" label="Nil"
                                   onClick={(e) => {
                                     this.setState({
                                       po_discount_status:"nil"
                                     })
                                    }} />
                                   </div> */}

                                    <Select
                                        value = {this.state.po_discount_status}
                                        onChange={(e) => {
                                            //////console.log(e, "Val.....")
                                            this.setState({
                                              po_discount_status: e,
                                              error_message_forms:"none"
                                            });
                                        }}
                                        placeholder="Select..."
                                        className="contact_sort"
                                        options={ policy_discount_status_array }
                                        styles={ customStyles }
                                    />


                                   </div>
                                   </div>
                              </div>
 {/* *********************************************** Premium Details *********************************************************************** */}

                              <div className="seventh_section" style={{display:this.state.cheque_to_sc == "Pending" || this.state.cheque_to_sc == "Cash" || this.state.cheque_to_sc == "Cheque to SC"|| this.state.cheque_to_sc == "Online to SC" ? "block" :"none"}}>
                              <div className="row">
                              <div className="col-lg-12 col-md-12 col-sm-12" style={{paddingRight: "15px",marginTop:"25px"}}>
                                        <div className="upladedddd">
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}>Premium Details</div>
                                      </div>
                                      <hr className="hr_newww" style={{marginTop:" 0px",marginBottom: "25px"}}/>
                                    </div>
                                    <div className="col-lg-6 col-md-12">
                                   <Label className="ballllllll" for="emailInput1">Mode of Premium Payment of SC</Label>
                                   <Select
                                   isOptionDisabled={(option) => this.state.disabled_true==true ? 'option.disabled' : '' }
                                        value = {this.state.mode_of_premium_payment}
                                        onChange={(e) => {
                                            //////console.log(e, "Val.....")
                                            this.setState({
                                                mode_of_premium_payment: e,
                                                section_type_new_new:e.section
                                            });
                                        }}
                                        placeholder="Select..."
                                        className="contact_sort"
                                        options={ mode_of_premium_payment }
                                        styles={ customStyles }
                                    />
                                   </div>
                                   </div>
                              </div>



 {/* *********************************************** Cutomer Cheque Details *********************************************************************** */}

                              <div className="eghit_section" style={{display:this.state.section_type_new_new == "8_section" || this.state.cheque_to_sc == "Cheque to SC" ? "block" : "none"}}>
                              <div className="row">
                              <div className="col-lg-12 col-md-12 col-sm-12" style={{paddingRight: "15px",marginTop:"25px"}}>
                                        <div className="upladedddd">
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}>Cutomer Cheque Details</div>
                                      </div>
                                      <hr className="hr_newww" style={{marginTop:" 0px",marginBottom: "25px"}}/>
                                    </div>
                                    <div className="col-lg-4 col-md-6 ">
                                   <Label className="ballllllll" for="emailInput1">Physical Cheque received <span className="start_mark">*</span></Label>
                                   {/* <div className="fleett_222">
                                   <CustomInput type="radio" checked={this.state.physical_cheque_received === "yes"} id="formRadio12" name="formRadio" label="Yes"
                                   onClick={(e) => {
                                     this.setState({
                                       physical_cheque_received:"yes"
                                     })
                                    }}  />
                                   <div style={{marginLeft: "30px"}}>
                                   <CustomInput type="radio" checked={this.state.physical_cheque_received === "no"} id="formRadio13" name="formRadio" label="No"
                                   onClick={(e) => {
                                     this.setState({
                                       physical_cheque_received:"no"
                                     })
                                    }} /></div>
                                   </div> */}
                                   <Select
                                        value = {this.state.physical_cheque_received}
                                        onChange={(e) => {
                                            //////console.log(e, "Val.....")
                                            this.setState({
                                              physical_cheque_received: e,
                                            });
                                        }}
                                        placeholder="Select..."
                                        className="contact_sort"
                                        options={ physical_array_cheque }
                                        styles={ customStyles }
                                    />
                                   </div>

                                   <div className="col-lg-4 col-md-6 for_top_mobile_ne">
                                   <Label className="ballllllll" for="emailInput1">Cheque No <span className="start_mark">*</span></Label>
                                   <Input type="text" name="policy_no" id="emailInput1" placeholder="Cheque No"
                                   value={this.state.cheque_no}
                                   onChange={(e) => {
                                    this.setState({
                                      cheque_no:e.target.value
                                    })
                                   }}  />
                                   </div>

                                   <div className="col-lg-4 col-md-6 for_top_mobile_ne">
                                   <Label className="ballllllll" for="emailInput1">Cheque Amount<span className="start_mark">*</span></Label>
                                   <Input disabled type="number" name="policy_no" id="emailInput1" placeholder="Cheque Amount"
                                   value={this.state.cheque_amount_received}
                                   onChange={(e) => {
                                    this.setState({
                                      cheque_amount_received:e.target.value
                                    })
                                    this.cheque_amount_received_data(e.target.value)
                                   }}  />

                                   <p style={{display:this.state.setError=="block" ? "block" : "none",color:"#f597a2",fontSize:"80%",marginTop:"3px",marginBottom:"0px"}}>Cheque Amount should not be greater than Policy Amount</p>
                                   </div>


                                   <div className="col-lg-4 col-md-6 for_top_mobile_ne mar_toop">
                                   <Label className="ballllllll" for="emailInput1">Cheque Date <span className="start_mark">*</span></Label>
                                   <DatePicker
                                       selected={this.state.new_cheque_date}
                                       onChange={(val) => {
                                           this.setState({
                                               new_cheque_date: val,
                                           });
                                       }}
                                       placeholder="Select date"
                                       dateFormat="dd-MM-yyyy"
                                       className="rui-datetimepicker form-control "
                                   />
                                   </div>

                                   <div className="col-lg-4 col-md-6 mar_toop for_top_mobile_ne">
                                   <Label className="ballllllll" for="emailInput1">Bank Name <span className="start_mark">*</span></Label>
                                   <Input type="text" name="policy_no" id="emailInput1" placeholder="Bank Name"
                                   value={this.state.bank_name}
                                   onChange={(e) => {
                                    this.setState({
                                      bank_name:e.target.value
                                    })
                                   }} />
                                   </div>
                                   </div>
                              </div>

   {/* *********************************************** Cheque to Insurance Company *********************************************************************** */}

                            <div className="ninth_section  llllllllllllll" style={{display:this.state.policy_array_new=="" || this.state.policy_array_new==undefined ? "none" :"block"}}>
                              <div className="row">
                              <div className="col-lg-12 col-md-12 col-sm-12" style={{paddingRight: "15px",marginTop:"25px"}}>
                                        <div className="upladedddd">
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}>Cheque to Insurance Company</div>
                                      </div>
                                      <hr className="hr_newww" style={{marginTop:" 0px",marginBottom: "25px"}}/>
                                    </div>

                                    <div className="row" style={{paddingTop: "10px",paddingBottom:"20px",width:"100%",paddingLeft: "15px"}}>
                                     {this.state.insurer_array_typeee ? this.state.insurer_array_typeee.map((value,index)=>{
                                       return(
                                        <div className="col-lg-4" style={{whiteSpace:"nowrap"}} key={index}>
                                      <CustomInput type="radio" chec id={"formRadio" + index} checked={this.state.insurer_paid_type === value.label}  name="formRadio1" label={value.label} onClick={(e) => {
                                          this.setState({
                                            insurer_paid_type:value.label
                                          })
                                          }} />
                                        </div>
                                       )
                                     }):[]}

                                   </div>
                                   <div style={{display:this.state.insurer_paid_type == "Day End Receipting" || this.state.insurer_paid_type == "Post-Paid" ? "none" : "block",width:"100%",paddingLeft: "15px"}} >
                                    <div className="row" >
                                    {this.state.policy_array_new ? this.state.policy_array_new.map((value,index)=>{
                                       return(
                                         <>
                                        <div className="col-lg-4 col-md-4 col-sm-12 for_top_mobile_ne">
                                        <Label className="ballllllll" for="emailInput1">Cheque No {index + 1}</Label>
                                        <Select
                                          value = {value.cheque_object}
                                          placeholder="Select..."
                                          className="contact_sort"
                                          options={ cheque_array_new }
                                          styles={ customStyles }
                                          style={{marginBottom:"16px"}}
                                          isOptionDisabled={(option) => 'option.disabled'  }
                                  />
                                        </div>
                                        <div className="col-lg-4 col-md-6 for_top_mobile_ne">
                                            <Label className="ballllllll" for="emailInput1">Amount</Label>
                                            <Input type="text" name="policy_no" id="emailInput1" placeholder="Amount" style={{marginBottom:"16px"}}
                                            value={value.policy_amount}  disabled/>
                                   </div>
                                    </>
                                       )
                                      }):[]}
                                   </div>
                                   </div>
                                   </div>
                              </div>


   {/* *********************************************** Remarks  *********************************************************************** */}

                            <div className="thent_section">
                              <div className="row">
                              <div className="col-lg-12 col-md-12 col-sm-12" style={{paddingRight: "15px",marginTop:"25px"}}>
                                        <div className="upladedddd">
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}>Remarks </div>
                                      </div>
                                      <hr className="hr_newww" style={{marginTop:" 0px",marginBottom: "25px"}}/>
                                    </div>
                                    <div className="col-lg-12 col-md-12 ">
                                   <Label className="ballllllll" for="emailInput1">Remarks</Label>
                                   <Input type="textarea" name="policy_no" id="emailInput1" placeholder="Remarks"
                                   value={this.state.policy_remarks}
                                   onChange={(e) => {
                                    this.setState({
                                      policy_remarks:e.target.value
                                    })
                                   }} />
                                   </div>
                                   </div>
                              </div>








                          </div>
                       </ModalBody>
                        <ModalFooter style={{paddingBottom:"10px",paddingTop:"15px"}}>
                            <Button color="secondary" onClick={ this.toggle }>Close</Button>
                            { ' ' }
                            <Button disabled={this.state.opeartion_dock_control == "false" ? 'disabled' : ''} color="warning" style={{color:"#fff"}} onClick={() => {
                                              this.update_section_details()
                                          }}>Update</Button>
                        </ModalFooter>
                    </Modal>


                    <Modal
                    style={{ width: '400px', height: 'auto', justifyContent: 'center', textAlign: 'center', alignItem: 'center', marginTop: '200px' }}
                    isOpen={this.state.AlertDeleteSingle}
                    toggle={this.AlertDeleteSingle}
                    className={this.props.className, "del_model"}
                    fade
                >
                    <ModalBody style={{padding:"20px"}}>
                        <div style={{ width: '100%', height: '20px' }}>
                            <Button className="close" style={{ float: 'right' }} color="" onClick={this.AlertDeleteSingle}>
                                <Icon name="x" />
                            </Button>
                        </div>
                        <div style={{ width: '100%', height: '70px' }}>
                          <h3 style={{marginBottom:"10px"}}>Cheque No :{" "} {this.state.new_cheque_no}</h3>
                          <p style={{marginBottom:"10px"}}>Are you sure you want to Add this Cheque No ?</p>

                        </div>
                        <div style={{ height: '45px', width: '100%' }}>

                            <Button color="warning" disabled={this.state.policy_dock_control == "false" ? 'disabled' : ''}
                                style={{ marginRight: "20px",color:"#fff"}}
                                onClick={() => {
                                    this.cheque_switch_function()

                                }}
                            >yes</Button>
                            {'             '}
                            <Button color="secondary"  onClick={this.AlertDeleteSingle}>no</Button>
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
