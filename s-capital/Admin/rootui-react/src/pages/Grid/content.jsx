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
  Badge,Button, Collapse, ListGroup, ListGroupItem,Spinner,Table,ButtonGroup,Input, Modal, ModalBody,Tooltip,UncontrolledTooltip, ModalFooter,Label,CustomInput
} from 'reactstrap';
import { format } from 'date-fns';
import pdf_img from '../../images/pdf.png'
import excel_img from '../../images/txt-file.png'
import other_img from '../../images/google-docs.png'
import Dropzone from '../../components/dropzone';
import dateFormat from 'dateformat';
import Select from 'react-select';
import {
  addToast as actionAddToast,
} from '../../actions';

import Lottie from 'react-lottie';
import animationData from '../../lottiesFiles/dot_notificarion.json'

import socket from '../Socket';

import debounce from 'lodash/debounce';



/**
 * Internal Dependencies
 */
import Snippet from '../../components/snippet';

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
//console.log("admin_data===========",admin_data);


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
            user_id:admin_data[0]._id,
            user_name:admin_data[0].name,
            policy_dock_data_array:[],
            no_data_message:"none",
            isLoading:"block",
            spinner_1:"none",
            opration_single_data_array:[],
            files:[],
            building_map_array: [],
            file_array:[],
            file_array_new:[],
            uploaded_policy:[],
            uploaded_cheques:[],
            uploaded_quotation_data:[],
            sm_id:"",
            conversation_array:[],
            color_code:"",
            ipad_width:"none",
            ipad_emp_list:"block",
            visitor_type:"pending",
            search_user:"",
            current_page:1,
            total:"",
            AlertDelete: false,
            AlertDeletePropasal: false,
            AlertDeleteSingle: false,
            AddCheque: false,
            Delete_Cheque: false,
            add_to_deviation_model: false,
            edit_deviation_model: false,
            hitted_new:true,
            send_buttonn:"Send",
            policy_dock_control:Cookies.get('policy_dock_control'),
            chart_box_open:"none",
            chat_button:"Open Chat",
            modalOpen_for_cheque: false,
            policy_amount:"",
            policy_blanace_amount:0,
            cheque_array: [],
            insurer_array:[],
            policy_array:[],
            insurer_array_typeee:[],
            no_cheques_avaible:"",
            customer_policy_amount:0,
            remaining_message:"",
            preview: '',
            file: null,
            my_file_type:"",
            insurer_new:"",
            error_message_new:"",
            deviation_status_new:undefined,
            conformation_for_deviation:false,
            proposal_array:[],
            total_pages:1,
            mode_of_payment:'',
            mode_of_payment_type_new:'',
            mode_of_payment_by_sc:'',
            type_of_payout_label:'',
            mode_of_premium_received:'',
            type_of_payout:'',
            cheque_request:false,
            request_button:"Request Cheque",
            multiple_file_array:[],
            users_cheque_requirement:[],
            single_cheque_requirement:[],
            single_cheque_conversation:[],
            cheque_requestmessage_data:"",
            document_data:[],
            borderNewClosed:false

            // single_status_data:""
        }


        this.fetch_all_insurer()
        this.new_message_cheque_requirement()
        this.AlertDelete = this.AlertDelete.bind( this );
        this.AlertDeletePropasal = this.AlertDeletePropasal.bind( this );
        this.AlertDeleteSingle = this.AlertDeleteSingle.bind( this );
        this.AddCheque = this.AddCheque.bind( this );
        this.Delete_Cheque = this.Delete_Cheque.bind( this );
        this.add_to_deviation_model = this.add_to_deviation_model.bind( this );
        this.edit_deviation_model = this.edit_deviation_model.bind( this );
        this.toggle_for_cheque = this.toggle_for_cheque.bind( this );

    }


    fetch_all_insurer = ()=>  {
    // fetch_all_insurer = (tab_close)=>  {
      // var params = {
      //   tab_close:tab_close,
      // }
      const { settings } = this.props;
       const res = fetch(settings.api_url + "fetch_all_insurer", {
           method: 'POST',
          //  body: JSON.stringify(params),
           headers: {
               "Content-type": "application/json; charset=UTF-8",
           }
       }).then((response) => response.json())
           .then(json => {
               ////console.log("fetch Inurer ****", json)
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
    toggle_for_cheque() {
      this.setState( ( prevState ) => ( {
          modalOpen_for_cheque: ! prevState.modalOpen_for_cheque,
          gross_amount_new:"",
          policy_amount:"",
          policy_blanace_amount:"",
          insurer_array_new:"",
          insurer_array_typeee:"",
          insurer_new:"",
          conformation_for_deviation:this.state.conformation_for_deviation,
          policy_array:[],
          error_message_new:"",
          mode_of_payment_by_sc:"",
          payment_from_customer:"",
          physical_cheque_received:"",
          mode_of_payment_by_sc_label:"",
          borderNewClosed:false,
      } ) );
  }

    AlertDelete() {
      this.setState( ( prevState ) => ( {
          AlertDelete: ! prevState.AlertDelete,
      } ) );
  }
    AlertDeletePropasal() {
      this.setState( ( prevState ) => ( {
          AlertDeletePropasal: ! prevState.AlertDeletePropasal,
      } ) );
  }
    AlertDeleteSingle() {
      this.setState( ( prevState ) => ( {
          AlertDeleteSingle: ! prevState.AlertDeleteSingle,
      } ) );
  }
    AddCheque() {
      this.setState( ( prevState ) => ( {
          AddCheque: ! prevState.AddCheque,
      } ) );
  }

    Delete_Cheque() {
      this.setState( ( prevState ) => ( {
          Delete_Cheque: ! prevState.Delete_Cheque,
      } ) );
  }
  add_to_deviation_model() {
      this.setState( ( prevState ) => ( {
          add_to_deviation_model: ! prevState.add_to_deviation_model,
      } ) );
  }
  edit_deviation_model() {
      this.setState( ( prevState ) => ( {
          edit_deviation_model: ! prevState.edit_deviation_model,
      } ) );
  }

   add_policy_for_deviation = (policy_dock_id)=>  {
      const { settings,addToast } = this.props;
      var params = {
        policy_dock_id:policy_dock_id,
      }
      ////console.log("Params Dtaa",params);
       const res = fetch(settings.api_url + "add_policy_for_deviation", {
           method: 'POST',
           body: JSON.stringify(params),
           headers: {
               "Content-type": "application/json; charset=UTF-8",
           }
       }).then((response) => response.json())
           .then(json => {
               ////console.log("Addd deviation ****", json)
               var data = json;
               if (data.status == true) {
                   this.setState({
                       add_to_deviation_model:false,
                   });
                                addToast({
                                    title: 'Ask my Policy',
                                    content: data["message"],
                                    duration: 1000,
                                  });

                                  //console.log("deviation======================");
                                  var doc_param = {key:"deviation",xyz:"hhhh",policy_dock_id:this.state.policy_dock_id,user_id:this.state.user_id}
                                  socket.emit('policy_dock_deviation', doc_param);


                                  this.get_policy_dock()
                                  this.get_single_policy_dock(this.state.policy_dock_id,"deviation")
               }
               else {
                   this.setState({
                      add_to_deviation_model:false,
                   });
                   addToast({
                    title: 'Ask my Policy',
                    content: data["message"],
                    duration: 1000,
                  });
               }
           })
   }


   update_policy_percentage = (policy_dock_id)=>  {
      const { settings,addToast } = this.props;
      var params = {
        policy_dock_id:policy_dock_id,
        policy_percent:this.state.new_policy_percent,
        payout_type:this.state.type_of_payout,
        payment_mode:this.state.mode_of_premium_received,
        preferred_company:this.state.preferred_company,
      }
      console.log("Params Dtaa",params);
       const res = fetch(settings.api_url + "update_policy_percentage", {
           method: 'POST',
           body: JSON.stringify(params),
           headers: {
               "Content-type": "application/json; charset=UTF-8",
           }
       }).then((response) => response.json())
           .then(json => {
               ////console.log("Edit deviation ****", json)
               var data = json;
               if (data.status == true) {
                   this.setState({
                       edit_deviation_model:false,
                   });
                                addToast({
                                    title: 'Ask my Policy',
                                    content: data["message"],
                                    duration: 1000,
                                  });
                                  this.get_single_policy_dock(this.state.policy_dock_id)
                                  // this.get_policy_dock()
               }
               else {
                   this.setState({
                      edit_deviation_model:false,
                   });
                   addToast({
                    title: 'Ask my Policy',
                    content: data["message"],
                    duration: 1000,
                  });
               }
           })
   }




   fetch_cheque_for_policy = (company_id)=>  {

    console.log("company_id",company_id);
      const { settings } = this.props;
      var params = {
        company_id:company_id,
      }
      console.log("Params Dtaa",params);
       const res = fetch(settings.api_url + "fetch_cheque_for_policy", {
           method: 'POST',
           body: JSON.stringify(params),
           headers: {
               "Content-type": "application/json; charset=UTF-8",
           }
       }).then((response) => response.json())
           .then(json => {
             console.log("fetch Cheque ****", json)
               var data = json;
               if (data.status == true) {
                   this.setState({
                       cheque_array: data.data,
                       no_cheques_avaible:"none",
                   });
               }
               else {
                   this.setState({
                       cheque_array: [],
                       no_cheques_avaible:"block",
                   });
               }
           })
   }
   llllll=()=>{
     console.log("kkkkkkkkkkk");
   }

    componentDidMount(){


      // document.getElementById('showFilePanel').addEventListener('click', function(event) {
      //   var notificationContainer = document.querySelector('.notification-container');
      //   if (notificationContainer.classList.contains('dismiss')) {
      //     notificationContainer.classList.remove('dismiss');
      //     notificationContainer.classList.add('selected');
      //     notificationContainer.style.display = 'block';
      //   }
      //   event.preventDefault();
      // });

      // document.getElementById('closeFilePanel').addEventListener('click', function(event) {
      //   var notificationContainer = document.querySelector('.notification-container');
      //   if (notificationContainer.classList.contains('selected')) {
      //     notificationContainer.classList.remove('selected');
      //     notificationContainer.classList.add('dismiss');
      //   }
      //   event.preventDefault();
      // });



      // window.addEventListener('beforeunload', this.handleBeforeUnload);
      // document.addEventListener('paste', this.handlePasteEvent);

        socket.on("connect", () => {
              if (socket.connected==true) {
                  this.update_socket_id_admin(socket.id)
              }
              else{
                  // ////////console.log("wronggg");
              }
             })
             setTimeout(() => {
              this.get_policy_dock();
              }, 0)


              //  socket.on('fetch_all_users_cheque_requirement_response', (data) => {
              //   //  this.new_message_cheque_requirement()
              //   })
               socket.on('account_cheque_requirement_message_response', (data) => {
                 this.new_message_cheque_requirement()
                })
               socket.on('add_policy_dock_new_response', (data) => {
                 this.get_policy_dock("",undefined,this.state.startDate,this.state.endDate,this.state.search_user,this.state.current_page)
                })
               socket.on('contact_convert_to_lead_or_lost_response', (data) => {
                 this.get_policy_dock("",undefined,this.state.startDate,this.state.endDate,this.state.search_user,this.state.current_page)
                })
               socket.on('add_policy_dock_conversation_response', (data) => {

                 //////console.log("add_policy_dock_conversation @@@@@@@@@@@",data);
                 this.get_single_policy_dock(this.state.policy_dock_id,undefined)
                })



               socket.on('select_quotation_for_policy_response', (data) => {

                 //console.log("select_quotation_for_policy_response @@@@@@@@@@@",data);

                //  this.get_policy_dock(this.state.policy_dock_id);
                //  this.get_single_policy_dock(this.state.policy_dock_id)
                 this.get_single_policy_dock(data.data.policy_dock_id)
                })
               socket.on('select_proposal_for_policy_response', (data) => {

                 //////console.log("add_policy_dock_conversation @@@@@@@@@@@",data);

                //  this.get_policy_dock(this.state.policy_dock_id);
                 this.get_single_policy_dock(data.data.policy_dock_id)
                })

               socket.on('confirmation_for_proposal_response', (data) => {

                 //////console.log("add_policy_dock_conversation @@@@@@@@@@@",data);

                //  this.get_policy_dock(this.state.policy_dock_id);
                 this.get_single_policy_dock(data.data.policy_dock_id)
                })

               socket.on('make_policy_app_response', (data) => {

                 //console.log("make_policy_app_response======= @@@@@@@@@@@",data);

                //  this.get_policy_dock(this.state.policy_dock_id);
                 this.get_single_policy_dock(data.data.policy_dock_id)
                })

                socket.on('confirmation_for_quotation_response', (data) => {

                  ////console.log("confirmation_for_quotation_response @@@@@@@@@@@",data);

                  // this.get_policy_dock(this.state.policy_dock_id);
                  this.get_single_policy_dock(data.data.policy_dock_id)
                 })


                socket.on('double_confirmation_for_proposal_response', (data) => {

                  ////console.log("confirmation_for_quotation_response @@@@@@@@@@@",data);

                  // this.get_policy_dock(this.state.policy_dock_id);
                  this.get_single_policy_dock(data.data.policy_dock_id)
                 })


                // socket.on('update_policy_dock_response', (data) => {

                //   ////console.log("update_policy_dock_response @@@@@@@@@@@",data);
                //   this.get_single_policy_dock(this.state.policy_dock_id)
                //  })



              //  socket.on('double_confirmation_for_quotation_response', (data) => {

              //    ////console.log("double_confirmation_for_quotation_response @@@@@@@@@@@",data);
              //   //  this.get_policy_dock(this.state.policy_dock_id);
              //    this.get_single_policy_dock(data.data.policy_dock_id)
              //   })





               socket.on('upload_document_conv_dock_response', (data) => {

                 //////console.log("upload_document_conv_dock_response @@@@@@@@@@@",data);
                //  this.get_policy_dock(this.state.policy_dock_id);
                 this.get_single_policy_dock(this.state.policy_dock_id)
                })


              //  socket.on('policy_dock_document_response_app', (data) => {
              //    //////console.log("policy_dock_document_response @@@@@@@@@@@",data);
              //    this.get_policy_dock(this.state.policy_dock_id);
              //   //  this.get_single_policy_dock(this.state.policy_dock_id)
              //   })



            }







            handlePasteEvent = (event) => {

              // ////console.log("Event**************",event);
              const clipboardItems = event.clipboardData.items;
              const items = [].slice.call(clipboardItems).filter((item) => {
                // Filter the image items only
                return /^image\//.test(item.type);
              });

              ////console.log("item",item);


              if (items.length === 0) {
                return;
              }

              const item = items[0];

              if (this.state.my_file_type=="quoattaion") {
                var my_num = this.state.file_array_new
              if (my_num==undefined) {
                var file_new = 1
              }
              else{
                var file_new = my_num.length + 1
              }
              }
              else if (this.state.my_file_type=="upload_proposal") {
                var my_num = this.state.proposal_array
                if (my_num==undefined) {
                  var file_new = 1
                }
                else{
                  var file_new = my_num.length + 1
                }
              }
              else{
                var my_num = this.state.uploaded_policy
                if (my_num==undefined) {
                  var file_new = 1
                }
                else{
                  var file_new = my_num.length + 1
                }
              }


              const blob = item.getAsFile();
              const preview = URL.createObjectURL(blob);
              const file = new File([blob], 'Screenshoot' + file_new +'.jpeg', {
                type: 'image/jpeg',
                lastModified: new Date().getTime()
              });

              ////console.log("file+++=============",file);
              // this.setState({ preview, file });


              if (this.state.my_file_type=="quoattaion") {
                this.upload_quotation_dock([file])
              }
              else if (this.state.my_file_type=="upload_proposal"){
                this.upload_proposal_dock([file])
              }
              else{
                this.upload_policy_dock([file])
              }
            };






    get_policy_dock(selected_policy_dock_id,single_status_data,startDate,endDate,search_sm,pageNumber){
        //////console.log("startDate",startDate);
        //console.log("single_status_data@@@@@@@@@@@@@@@@@@@@@@@@@222",single_status_data);





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
      //////console.log("my_date",my_date);
          const usercookies = Cookies.get('usercookies');
          var conv_param = {
            page_no:page_no,
            oe_id:usercookies,
            user_role:this.state.user_role,
            sm_name:my_sm_search,
            policy_status:this.state.visitor_type,
            sort_by_date:my_date
         }
         //console.log("conv_param",conv_param);

            socket.emit('get_policy_dock', conv_param);
            socket.on('get_policy_dock_response', (data)=>{


                console.log('inside get_policy_dock_response =============',data);

                  if(data.data.status==true){

                    // if(selected_policy_dock_id == undefined || selected_policy_dock_id == ''){
                    //   var policy_d_id =  data.data.data[0]._id
                    // }else{
                    //   var policy_d_id =  selected_policy_dock_id
                    // }
                      this.setState({
                          policy_dock_data_array : data.data.data,
                          // policy_dock_id : policy_d_id,
                          policy_dock_id : data.data.data[0]._id,
                          no_data_message:"none",
                          isLoading:"none",
                          spinner_1:"none",
                          total_pages: data.data.total_pages,
                          total:data.data.total,
                          cheque_request:false,
            request_button:"Request Cheque",
                      })
                      if (device_width < 820) {
                        // ////////console.log("display lisit none");

                       }
                       else{
                        this.get_single_policy_dock(data.data.data[0]._id)
                        // if(data.data.data[0]){
                        //   //console.log("****************777777777777777777777777************************");

                        // }

                        // this.get_single_policy_dock(this.state.policy_dock_id)
                       }

                  }
                  else{
                      this.setState({
                        policy_dock_data_array:[],
                        no_data_message:"block",
                        isLoading:"none",
                        spinner_1:"none",
                        total_pages: 1,

                      })
                  }

            })
      }

      get_single_policy_dock(policy_dock_id,document_var){

        var conv_param = {
            policy_dock_id:policy_dock_id,
            added_from:"admin_panel"

           }

           var document = document_var
        //  ////////console.log("conv_param_single_visitor",conv_param);

            socket.emit('get_single_policy_dock', conv_param);
            socket.on('get_single_policy_dock_response', (data)=>{


                  console.log('inside get_single_policy_dock_response =============',data);

                  if(data.data.status==true){

                    //console.log("document*********",document);

                    if(document === "document"){
                      //console.log("document======================");
                      var doc_param = {key:"hitted",added_from:"admin_pannel",policy_dock_id:policy_dock_id,user_id:this.state.user_id}
                      socket.emit('policy_dock_document_admin', doc_param);
                    }

                    // else if(document === "deviation"){
                    //   //console.log("deviation======================");
                    //   var doc_param = {key:"deviation",xyz:"hhhh",policy_dock_id:policy_dock_id,}
                    //   socket.emit('policy_dock_deviation', doc_param);
                    // }
                    // else if(document === "quotation_new_data"){

                    //   //console.log("khushboooooooooooooooooooooooo======================");
                    //   var doc_param = {key:"quotation",xyz:"hhhh",policy_dock_id:policy_dock_id,user_id:this.state.user_id}
                    //   socket.emit('policy_dock_quotation', doc_param);

                    // }
                    // else if(document === "proposal"){

                    //   //console.log("proposal======================");
                    //   var doc_param = {key:"proposal",xyz:"jjj",policy_dock_id:policy_dock_id,}
                    //   socket.emit('policy_dock_proposal', doc_param);

                    // }else if(document === "policy"){

                    //   //console.log("policy======================");
                    //   var doc_param = {key:"policy",policy_dock_id:policy_dock_id,   }
                    //   socket.emit('policy_dock_policy', doc_param);

                    // }
                    // else{
                    //   //console.log("OUT##########Side");
                    // }



                    if (device_width < 820) {
                        var ipad_emp_list = "none";
                        //////console.log("display lisit", ipad_emp_list);
                       }
                       else{
                       var ipad_emp_list = "block"
                       //////console.log("display lisit",ipad_emp_list);

                       }
                       if (data.data.data[0].conversation.length) {

                       }

                       //////console.log("data.data.data[0].sm_id*************************",data.data.data[0].name.length);
                        ////console.log("deviation_status_new",data.data.deviation_status);
                        if ( data.data.data[0].proposal_pdf == undefined) {
                          var policy_datat = ""
                        }
                        else{
                          var policy_datat = data.data.data[0].proposal_pdf
                          var proposal_make_policy = false
                          for (let i = 0; i < policy_datat.length; i++) {
                            if (policy_datat[i].make_policy==true) {
                              proposal_make_policy = true
                            }

                          }
                        }

                        if ( data.data.data[0].quotation_pdf == undefined) {
                          var quotation_datat =  ""
                        }
                        else{

                          var quotation_datat = data.data.data[0].quotation_pdf
                          var quotation_make_policy = false
                          for (let i = 0; i < quotation_datat.length; i++) {
                            if (quotation_datat[i].make_policy==true) {
                              quotation_make_policy = true
                            }

                          }
                        }


                        ////console.log("quotation_make_policy==============================",quotation_make_policy);

                        if ( data.data.data[0].deviation_status == undefined) {
                          var conformation_for_deviation = false
                        }else{
                          var conformation_for_deviation = true
                        }
                        var var_policy_dock_data_array = this.state.policy_dock_data_array

                        for (let pk = 0; pk < var_policy_dock_data_array.length; pk++) {
                         if(var_policy_dock_data_array[pk]._id == data.data.data[0]._id){
                          var_policy_dock_data_array[pk].status = data.data.data[0].status
                          var_policy_dock_data_array[pk].show_status_color = data.data.data[0].show_status_color
                          var_policy_dock_data_array[pk].new_message_available = data.data.data[0].new_message_available
                         }

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


                    // console.log("DateFormate&&&&&&&&&&&&&",dateFormat(new Date(data.data.data[0].insurance_from.replace("Z", "")), "dd-mm-yyyy"));
                    // console.log("SampleDate",new Date("10/10/2023").toISOString());
                    // console.log("SampleDate",new Date("2018-11-10T11:22:33+00:00").toISOString());


                    if (data.data.data[0].insurance_from == "" || data.data.data[0].insurance_from == undefined || data.data.data[0].insurance_from == null) {
                      
                    }else{
                      let dateNew = data.data.data[0].insurance_from;
                      console.log("dateNew", dateNew);
                      
                      let dateParsed= new Date(dateNew);
  
                      console.log(dateParsed);
                      
                      // Check if the constructed date is valid
                      if (!isNaN(dateParsed) && dateParsed.toString() !== 'Invalid Date') {
                        let dateFormat = this.identifyDateFormat(dateNew);
                      
                        if (dateFormat === 'ISO') {
                          console.log("Isoooo");
  
                          var splitDate = dateNew.split("T")[0]
  
                          var insurance_from_formate = splitDate.split("-").reverse().join("-");
                          console.log("Formatted date:", insurance_from_formate);
  
  
                        } else if (dateFormat === 'UTC') {
                          console.log("UTCCCC");
  
                          var insurance_from_formate = dateParsed.toLocaleDateString('en-GB', { timeZone: 'UTC' });
                          console.log("Formatted date:", insurance_from_formate);
  
  
                        } else if (dateFormat === 'dd-mm-yyyy') {
                          var insurance_from_formate = dateFormat;
                          console.log("Formatted date:", insurance_from_formate);
  
                        } else {
                          var insurance_from_formate = dateNew;
                        }
                      } else {
                        var insurance_from_formate = dateNew;
                      }
                    }




                    if (data.data.data[0].insurance_upto == "" || data.data.data[0].insurance_upto == undefined || data.data.data[0].insurance_upto == null) {
                      
                    }else{
                      let dateNew = data.data.data[0].insurance_upto;
                      console.log("dateNew", dateNew);
                      
                      let dateParsed= new Date(dateNew);
  
                      console.log(dateParsed);
                      
                      // Check if the constructed date is valid
                      if (!isNaN(dateParsed) && dateParsed.toString() !== 'Invalid Date') {
                        let dateFormat = this.identifyDateFormat(dateNew);
                      
                        if (dateFormat === 'ISO') {
                          console.log("Isoooo");
  
                          var splitDate = dateNew.split("T")[0]
  
                          var insurance_upto_formate = splitDate.split("-").reverse().join("-");
                          console.log("Formatted date:", insurance_upto_formate);
  
  
                        } else if (dateFormat === 'UTC') {
                          console.log("UTCCCC");
  
                          var insurance_upto_formate = dateParsed.toLocaleDateString('en-GB', { timeZone: 'UTC' });
                          console.log("Formatted date:", insurance_upto_formate);
  
  
                        } else if (dateFormat === 'dd-mm-yyyy') {
                          var insurance_upto_formate = dateFormat;
                          console.log("Formatted date:", insurance_upto_formate);
  
                        } else {
                          var insurance_upto_formate = dateNew;
                        }
                      } else {
                        var insurance_upto_formate = dateNew;
                      }
                    }


                    if (data.data.data[0].reg_date == "" || data.data.data[0].reg_date == undefined || data.data.data[0].reg_date == null) {
                      
                    }else{
                      let dateNew = data.data.data[0].reg_date;
                      console.log("dateNew", dateNew);
                      
                      let dateParsed= new Date(dateNew);
  
                      console.log(dateParsed);
                      
                      // Check if the constructed date is valid
                      if (!isNaN(dateParsed) && dateParsed.toString() !== 'Invalid Date') {
                        let dateFormat = this.identifyDateFormat(dateNew);
                      
                        if (dateFormat === 'ISO') {
                          console.log("Isoooo");
  
                          var splitDate = dateNew.split("T")[0]
  
                          var reg_date_formate = splitDate.split("-").reverse().join("-");
                          console.log("Formatted date:", reg_date_formate);
  
  
                        } else if (dateFormat === 'UTC') {
                          console.log("UTCCCC");
  
                          var reg_date_formate = dateParsed.toLocaleDateString('en-GB', { timeZone: 'UTC' });
                          console.log("Formatted date:", reg_date_formate);
  
  
                        } else if (dateFormat === 'dd-mm-yyyy') {
                          var reg_date_formate = dateFormat;
                          console.log("Formatted date:", reg_date_formate);
  
                        } else {
                          var reg_date_formate = dateNew;
                        }
                      } else {
                        var reg_date_formate = dateNew;
                      }
                    }
                    


                      this.setState({
                        policy_dock_data_array : var_policy_dock_data_array,
                          opration_single_data_array : opration_single_data_array,
                          // opration_single_data_array : data.data.data,
                          deviation_status_new : data.data.data[0].deviation_status,
                          conformation_for_deviation : conformation_for_deviation,
                          policy_dock_id :data.data.data[0]._id,
                          sm_id :data.data.data[0].sm_id,
                          policy_status :data.data.data[0].policy_status,
                          policy_amount :data.data.data[0].policy_amount,
                          new_policy_percent :data.data.data[0].assist_percent,
                          // new_policy_percent :data.data.data[0].policy_percent,
                          policy_blanace_amount :data.data.data[0].policy_amount,
                          customer_policy_amount :data.data.data[0].policy_amount,
                          file_array_new :data.data.data[0].quotation_pdf,
                          proposal_array :data.data.data[0].proposal_pdf,
                          uploaded_policy :data.data.data[0].policy_pdf,
                          uploaded_cheques :data.data.data[0].cheque_pdf,
                          conversation_array :data.data.data[0].conversation,
                          policy_uploaded :data.data.data[0].policy_uploaded,
                          quotation_uploaded :data.data.data[0].quotation_uploaded,
                          proposal_uploaded :data.data.data[0].proposal_uploaded,
                          color_code :data.data.data[0].color_code,
                          spinner_1:"none",
                          ipad_width:"block",
                          ipad_emp_list:ipad_emp_list,
                          proposal_make_policy:proposal_make_policy,
                          quotation_make_policy:quotation_make_policy,
                          mode_of_payment:data.data.data[0].payment_mode,
                          mode_of_payout_type_new:data.data.data[0].payout_type,
                          mode_of_payout_type_label:data.data.data[0].payout_type ? data.data.data[0].payout_type.label:"",
                          type_of_payout:data.data.data[0].payout_type,
                          type_of_payout_label:data.data.data[0].payout_type ? data.data.data[0].payout_type.label:"",
                          mode_of_premium_received:data.data.data[0].payment_mode,
                          preferred_company:data.data.data[0].preferred_company,
                          cheque_request:false,
                          request_button:"Request Cheque",
                          insurance_from_formate:insurance_from_formate,
                          reg_date_formate:reg_date_formate,
                          insurance_upto_formate:insurance_upto_formate,

                      })

                      socket.off('get_single_policy_dock_response')
                  }
                  else{
                      this.setState({
                        visitor_single_data_array:[],
                        spinner_1:"none",
                        policy_uploaded:""
                      })
                  }

            })
            socket.off('get_single_policy_dock_response', () => {})

      }


       identifyDateFormat=(dateString) =>{
        // Check if the date string matches ISO format
        if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(dateString)) {
          return 'ISO';
        }
        
        // Check if the date string matches UTC format
        if (/^[a-zA-Z]{3}, \d{2} [a-zA-Z]{3} \d{4} \d{2}:\d{2}:\d{2} GMT[+-]\d{4} \([a-zA-Z]+\)$/.test(dateString)) {
          return 'UTC';
        }
      
        // Check if the date string matches "dd-mm-yyyy" format
        if (/^\d{2}-\d{2}-\d{4}$/.test(dateString)) {
          return 'dd-mm-yyyy';
        }
      
        // If none of the above formats match, return null
        return null;
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



      read_admin_message(policy_dock_id){
        var conv_param = {
            policy_dock_id:policy_dock_id,
            added_from:"admin_panel"
           }


            socket.emit('read_admin_message', conv_param);
            socket.on('read_admin_message_response', (data)=>{


                  //console.log('inside read_admin_message_response =============',data);

                  if(data.data.status==true){


                        var var_policy_dock_data_array = this.state.policy_dock_data_array

                        for (let pk = 0; pk < var_policy_dock_data_array.length; pk++) {
                         if(var_policy_dock_data_array[pk]._id == data.data.data[0]._id){
                          var_policy_dock_data_array[pk].new_message_available = data.data.data[0].new_message_available
                         }

                        }

                      this.setState({
                        policy_dock_data_array : var_policy_dock_data_array,
                      })
                  }
                  else{
                    //console.log("wrongggg");
                  }
            })
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
      //////console.log("llllllllllllllllllll&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&",image);
        return new Promise((res) => {
          const reader = new FileReader();
          const { type, name, size } = image;
          reader.addEventListener('load', () => {
            res({
              // base64: reader.result,
              image_name: reader.result.split(',')[1],
              image_type: reader.result.split(';')[0].split('/')[1],
              extension_type: reader.result.split(':')[1].split(';')[0],

              // type:file_type,
              // name: name,

              // size: size,
            })
          });
          reader.readAsDataURL(image);
        })
      }

      uploadImage(e) {

        // get the files
        let files = e.target.files;

        // Process each file
        var allFiles = [];
        var interval_i = 600;
        for (var i = 0; i < files.length; i++) {
          // setTimeout( function (i){

          var file = files[i];

          //////console.log("file88888888888888888888888",file);

          // Make new FileReader
          var reader = new FileReader();

          // Convert the file to base64 text
          reader.readAsDataURL(file);

          // on reader load somthing...
          reader.onload = () => {

            // Make a fileInfo Object
            var fileInfo = {
              image_name: reader.result.split(',')[1],
              image_type: file.type.split('/')[1],
              extension_type: file.type,
              // size: Math.round(file.size / 1000) + ' kB',
              // base64: reader.result,
              // file: file,
            };
            // let fileInfo = {
            //   name: file.name,
            //   type: file.type,
            //   size: Math.round(file.size / 1000) + ' kB',
            //   base64: reader.result,
            //   file: file,
            // };

              //////console.log("fileInfo==============",fileInfo);
            // Push it to the state
            allFiles.push(fileInfo);

            // If all files have been proceed
            if(allFiles.length == files.length){

              //////console.log("TTTTTTTTTTTTTTTTT");
              // Apply Callback function
              // if(this.props.multiple) this.props.onDone(allFiles);
              // else this.props.onDone(allFiles[0]);
            }

          } // reader.onload
        // }, interval_i * i, i);

        } // for

        //////console.log("allFiles====================",allFiles);

        // this.upload_document_conv_dock(allFiles)

      }
      // uploadImage = async (e) => {
      //   //////console.log("#############################",e);
      //   if (e.target.files && e.target.files.length > 0) {
      //     const newImagesPromises = []
      //     for (let i = 0; i < e.target.files.length; i++) {
      //       newImagesPromises.push(this.fileToDataUri(e.target.files[i]))
      //     }

      //     //////console.log("newImagesPromises*********************",newImagesPromises);

      //     const newImages = await Promise.all(newImagesPromises)
      //     // setImages([...images, ...newImages])
      //     //////console.log("newImages*********************",newImages);

      //     this.setState({
      //       building_map_array: newImages,
      //       show_new_added_images: newImages,
      //     })


      //     // setTimeout(() => {//////console.log("this is the first message", this.state.building_map_array) }, 1000);
      //     // setTimeout(() => {//////console.log("this is newImages", newImages) }, 1000);
      //     this.upload_document_conv_dock(this.state.building_map_array)
      //   }
      // }
      // upload_document_conv_dock(attachment){

      //   //////console.log("attachment",attachment);
      //   const { settings, addToast } = this.props;
      //   const usercookies = Cookies.get('usercookies');
      //    var date = new Date();
      //     var dd = String(date.getDate()).padStart(2, '0');
      //     var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
      //     var months=toMonthName(mm)
      //     var yyyy = date.getFullYear();
      //     var hours = date.getHours();
      //     const time = new Date().toLocaleString([], { hour: 'numeric', minute: 'numeric' });
      //     var am_pm = (hours >= 12) ? "PM" : "AM";
      //     if(hours >= 12){
      //         hours -=12;
      //     }
      //     var my_new_date = dd + ' ' + months + ' ' + yyyy + ' ' + time +" "+ am_pm;
      //     // var new_attachment = JSON.stringify(attachment)
      //     var new_attachment =attachment
      //     // //////console.log("new_attachment",new_attachment);
      //    var conversation_array =this.state.conversation_array
      //    var statis_array = [{key:"vdvd",value:"rsgrs"}]
      //   var conv_param = {
      //       policy_dock_id:this.state.policy_dock_id,
      //       date_time:my_new_date,
      //       message:"",
      //       message_from:"oe_to_sm",
      //       from_id:usercookies,
      //       to_id: this.state.sm_id,
      //       message_id:conversation_array.length + 1,
      //       attachment:new_attachment,
      //       // statis_array:statis_array,
      //      }
      //      //////console.log("conv_param***********",conv_param);
      //       socket.emit('upload_document_conv_dock', conv_param);
      //       // socket.emit('upload_document_conv_dock', conv_param);
      //       socket.on('upload_document_conv_dock_response', (data)=>{


      //             //////console.log('inside upload_document_conv_dock_response =============',data);

      //             if(data.data.status==true){
      //               addToast({
      //                 title: 'Ask my Policy',
      //                 content: data["message"],
      //                 duration: 1000,
      //               });
      //               this.get_single_policy_dock(this.state.policy_dock_id)
      //             }
      //             else{
      //               addToast({
      //                 title: 'Ask my Policy',
      //                 content: data["message"],
      //                 duration: 1000,
      //               });
      //             }

      //       })
      // }
      make_policy_new=(value2,index1)=>{
        const { settings, addToast, } = this.props;
        const usercookies = Cookies.get('usercookies');
        var date = new Date();
        // ////////console.log("date",date);
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        var months=toMonthName(mm)
        // ////////console.log("my_date",months);
        var yyyy = date.getFullYear();
        var hours = date.getHours();
        const time = new Date().toLocaleString([], { hour: 'numeric', minute: 'numeric' });
        // ////////console.log("timetime",time);
        var am_pm = (hours >= 12) ? "PM" : "AM";
        if(hours >= 12){
            hours -=12;
        }
        var my_new_date = dd + ' ' + months + ' ' + yyyy + ' ' + time +" "+ am_pm;
        // ////////console.log("my_new_date",my_new_date);

       var conversation_array =this.state.conversation_array
       if(conversation_array.length == 0){
         var conv_length = 1
       }else{
         var conv_length = conversation_array[0].message_id+1
       }




        var image_name_new =value2.image_name.split('pdf/')
        var quotation_new_array  = this.state.file_array_new;
        ////console.log("quotation_new_array**************",this.state.file_array_new)
        ////console.log("value2**************",value2)
        ////console.log("index1**************",index1)
        for (var i = 0; i < quotation_new_array.length; i++) {
          var image_type= quotation_new_array[i].image_name.split('pdf/');
               quotation_new_array[i].image_name=image_type[1]
          if (i == index1) {
          // if (quotation_new_array[i] == index1) {
            ////console.log("khushboooo&&&&&&&&&&&&&&",i);
            quotation_new_array[i].make_policy=true

          }


        }
        ////console.log("voluntary_insurer_discount",quotation_new_array)
        ////console.log("image_type",image_type)
        ////console.log("image_name_new",image_name_new)

        var selected_quotation = image_name_new[1]


        var conv_param = {
          policy_dock_id:this.state.policy_dock_id,
          from_id:usercookies,
          to_id:this.state.sm_id,
          date_time:my_new_date,
          message_id:conv_length,
          message_from:"oe_to_sm",
          uploaded_quotation:quotation_new_array,
          selected_quotation:selected_quotation
         }
         ////console.log("conv_param",conv_param);

          socket.emit('make_policy_for_quotation', conv_param);
          socket.on('make_policy_for_quotation_response', (data)=>{


                ////console.log('inside make_policy_for_quotation_response =============',data);

                if (data.data.status == true) {
                  addToast({
                    title: 'Ask my Policy',
                    content: data["message"],
                    duration: 1000,
                  });
                  this.get_single_policy_dock(this.state.policy_dock_id)
                }

                else{
                  addToast({
                    title: 'Ask my Policy',
                    content: data["message"],
                    duration: 1000,
                  });
                }


          })




      }

    delete_building_map_image = (value2) => {
         ////console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh", value2);
         ////console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh", this.state.file_array_new);
        var kkk = this.state.file_array_new.filter(n => n !== value2);
        // var kkk = this.state.file_array.filter(n => n !== value2);
        this.setState({
          file_array_new: kkk,
        })
        ////console.log(kkk,"kkkkkkkkkkkkkkkkkkkkkk");

        for (let index = 0; index < kkk.length; index++) {
         var image_type= kkk[index].image_name.split('pdf/');
          kkk[index].image_name=image_type[1]
          ////////console.log("element",element);
        }
        //////console.log("element*******************",kkk);
        const { settings, addToast, } = this.props;
        var params = {
          policy_dock_id: this.state.policy_dock_id,
          quotation_pdf: kkk
        }

        // ////////console.log("delete_Quotation", params);
        const res = fetch(settings.api_url + "delete_quotation_dock", {
          method: 'POST',
          body: JSON.stringify(params),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          }
        }).then((response) => response.json())
          .then(json => {
            //////console.log("Delete Qutation Response**************************************", { params: params, response: json })
            var data = json;
            if (data.status == true) {

              this.setState({
                AlertDelete:false
              })
              addToast({
                title: 'Ask my Policy',
                content: data["message"],
                duration: 1000,
              });
              this.get_single_policy_dock(this.state.policy_dock_id,"document")
            }
            else {
              this.setState({
                AlertDelete:false
              })
              // ////////console.log("something wrong");
            }
          })

      }

    delete_propsal_images = (value2) => {
        var kkk = this.state.proposal_array.filter(n => n !== value2);

        this.setState({
          proposal_array: kkk,
        })

        for (let index = 0; index < kkk.length; index++) {
         var image_type= kkk[index].image_name.split('pdf/');
          kkk[index].image_name=image_type[1]

        }

        const { settings, addToast, } = this.props;
        var params = {
          policy_dock_id: this.state.policy_dock_id,
          proposal_pdf: kkk
        }

        // ////console.log("params=====",params);

        const res = fetch(settings.api_url + "delete_proposal_dock", {
          method: 'POST',
          body: JSON.stringify(params),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          }
        }).then((response) => response.json())
          .then(json => {
            // ////console.log("Delete Proposal Response**************************************", { params: params, response: json })
            var data = json;
            if (data.status == true) {

              this.setState({
                AlertDeletePropasal:false
              })
              addToast({
                title: 'Ask my Policy',
                content: data["message"],
                duration: 1000,
              });
              this.get_single_policy_dock(this.state.policy_dock_id,"document")
            }
            else {
              this.setState({
                AlertDelete:false
              })
            }
          })

      }

      handleDrop = (files) => {
        // Handle file upload
        ////console.log("lllllllllllllll");
      }

      handlePaste = (event) => {
        const clipboardData = event.clipboardData || window.clipboardData;
        const items = clipboardData.items;

        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          if (item.kind === 'file' && item.type.match(/^image\//i)) {
            const blob = item.getAsFile();
            // Convert blob to a format that can be uploaded to the server
            this.handleDrop([blob]);
          }
        }
      }


      handleChangeFile_Quotationn = (event) => {

        //////console.log("##################################");
      ////console.log(event.target.files)
        var my_policy =event.target.files
        this.setState({
          file_array :my_policy
        })

        // setTimeout(() => { ////////console.log("this is the first message", this.state.file_array) }, 1000);
        // ////////console.log("uploaded_policy",my_policy);
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
            // }, () => ////////console.log(this.state.files));
        //   }
        // }

        this.upload_quotation_dock(my_policy)
      }



      upload_quotation_dock = (files) => {


        const { settings, addToast } = this.props;
        var fd = new FormData();

        if ( files.length >= 10) {
          alert('Please Select at time only 10 files');
        } else {
          for (let i = 0; i < files.length; i++) {


            // formData.append(`files`, files[i])
            // fd.append(`files`,files[i]);
            fd.append('file',files[i]);
         }
          //   fd.append('file', JSON.stringify(files));

          fd.append('policy_dock_id', this.state.policy_dock_id);
          fd.append('added_from_user', this.state.user_id);


      // headers: {'Content-Type': undefined}
      console.log(...fd, "uplarde_quotation")
      const res = fetch(settings.api_url + "upload_quotation_dock", {
          method: 'POST',
          body: fd
      })
          .then((response) => response.json())
          .then(json => {
            ////console.log("Upload Quotationn Response**************************************", {response: json })
            var data = json;
            if (data.status == true) {
              addToast({
                title: 'Ask my Policy',
                content: data["message"],
                duration: 1000,
              });

              // this.setState({
              //   file_array:[]
              // })
              // this.get_policy_dock(this.state.policy_dock_id)
              // this.get_single_policy_dock(this.state.policy_dock_id,"quotation")

              for (let k = 0; k < files.length; k++) {

                if(k == files.length-1){

                  // if(document === "quotation_new_data"){

                    //console.log("khushboooooooooooooooooooooooo======================");
                    var doc_param = {key:"quotation",xyz:"hhhh",policy_dock_id:this.state.policy_dock_id,user_id:this.state.user_id}
                    socket.emit('policy_dock_quotation', doc_param);




                  //console.log("in uploaddddddddddddd quotationnnnnnnnnnnnnn");
                  // this.get_policy_dock(this.state.policy_dock_id)


                  this.get_single_policy_dock(this.state.policy_dock_id)

                }

              }
            }
            else {
              // ////////console.log("something wrong");
              addToast({
                title: 'Ask my Policy',
                content: data["message"],
                duration: 1000,
              });
            }


          })
        }

    }


      upload_proposal_dock = (files) => {
        ////console.log("propsal DOCKKKKK");
        const { settings, addToast } = this.props;
        var fd = new FormData();
        if ( files.length >= 10) {
          alert('Please Select at time only 10 files');
        } else {
      for (let i = 0; i < files.length; i++) {
          fd.append('file',files[i]);
      }
        fd.append('policy_dock_id', this.state.policy_dock_id);
        fd.append('added_from_user', this.state.user_id);


        //console.log(...fd, "Upload Propsal")
        const res = fetch(settings.api_url + "upload_proposal_dock", {
            method: 'POST',
            body: fd
        })
            .then((response) => response.json())
            .then(json => {
              ////console.log("Upload Propsal Response**************************************", {response: json })
              var data = json;
              if (data.status == true) {
                addToast({
                  title: 'Ask my Policy',
                  content: data["message"],
                  duration: 1000,
                });

                // this.get_single_policy_dock(this.state.policy_dock_id,"document")
                // this.get_single_policy_dock(this.state.policy_dock_id,"document")


                // this.get_policy_dock(this.state.policy_dock_id)
                // this.get_single_policy_dock(this.state.policy_dock_id,"proposal")


                for (let k = 0; k < files.length; k++) {

                  if(k == files.length-1){

                    //console.log("proposal======================");
                    var doc_param = {key:"proposal",xyz:"jjj",policy_dock_id:this.state.policy_dock_id,user_id:this.state.user_id}
                    socket.emit('policy_dock_proposal', doc_param);


                    //console.log("in uploaddddddddddddd proposalllllllllllllllllll");
                    // this.get_policy_dock(this.state.policy_dock_id)
                    this.get_single_policy_dock(this.state.policy_dock_id,"proposal")

                  }

                }
              }
              else {
                addToast({
                  title: 'Ask my Policy',
                  content: data["message"],
                  duration: 1000,
                });
              }


            })
          }
    }



      handleChangeFile = (event) => {

        //////console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        //////console.log(event.target.files)
        var my_policy =event.target.files
        this.setState({
            uploaded_policy :my_policy
        })

        // setTimeout(() => { ////////console.log("this is the first message", this.state.uploaded_policy) }, 1000);
        // ////////console.log("uploaded_policy",my_policy);
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
            // }, () => ////////console.log(this.state.files));
        //   }
        // }

        this.upload_policy_dock(my_policy)
      }


      // upload_policy_dock = (event) => {
      upload_policy_dock = (files) => {

        ////console.log("Polcuuuu DOCKKKKK");

      ////console.log("@@@@@@@@@ inside upload_policy_dock @@@@@@@@@");
      // var files =event.target.files
        const { settings, addToast } = this.props;
        var fd = new FormData();
        // ////////console.log("files************************", files);
        if ( files.length >= 10) {
          alert('Please Select at time only 10 files');
        } else {
         for (let i = 0; i < files.length; i++) {
          fd.append('file',files[i]);
           }
         fd.append('policy_dock_id', this.state.policy_dock_id);
         fd.append('added_from_user', this.state.user_id);

        //console.log(...fd, "uplarde_policyyy")
        const res = fetch(settings.api_url + "upload_policy_dock", {
            method: 'POST',
            body: fd
        })
            .then((response) => response.json())
            .then(json => {
              ////console.log("Upload Policy Response**************************************", {response: json })
              var data = json;
              if (data.status == true) {
                addToast({
                  title: 'Ask my Policy',
                  content: data["message"],
                  duration: 1000,
                });
                // this.get_policy_dock(this.state.policy_dock_id)
                // this.get_single_policy_dock(this.state.policy_dock_id,"policy")

                for (let k = 0; k < files.length; k++) {

                  if(k == files.length-1){

                    //console.log("policy======================");
                      var doc_param = {key:"policy",policy_dock_id:this.state.policy_dock_id,user_id:this.state.user_id}
                      socket.emit('policy_dock_policy', doc_param);


                    //console.log("in uploaddddddddddddd policyyyyyyyyyyyyyyyyyyy");
                    // this.get_policy_dock(this.state.policy_dock_id)
                    this.get_single_policy_dock(this.state.policy_dock_id,"policy")

                  }

                }
              }
              else {
                // ////////console.log("something wrong");
                addToast({
                  title: 'Ask my Policy',
                  content: data["message"],
                  duration: 1000,
                });
              }


            })
          }
    }


    //   upload_cheque_dock = (files) => {

    //   ////console.log("upload_cheque_dock @@@@@@@@@");
    //   // var files =event.target.files
    //     const { settings, addToast } = this.props;
    //     var fd = new FormData();
    //     ////console.log("files************************", files);

    //      for (let i = 0; i < files.length; i++) {
    //       fd.append('file',files[i]);
    //        }
    //      fd.append('policy_dock_id', this.state.policy_dock_id);
    //     ////console.log(...fd, "Upload Cheque")
    //     const res = fetch(settings.api_url + "upload_cheque_dock", {
    //         method: 'POST',
    //         body: fd
    //     })
    //         .then((response) => response.json())
    //         .then(json => {
    //           ////console.log("Upload Cheque Response**************************************", {response: json })
    //           var data = json;
    //           if (data.status == true) {
    //             addToast({
    //               title: 'Ask my Policy',
    //               content: data["message"],
    //               duration: 1000,
    //             });
    //             // this.get_single_policy_dock(this.state.policy_dock_id,"document")
    //           }
    //           else {
    //             // ////////console.log("something wrong");
    //             addToast({
    //               title: 'Ask my Policy',
    //               content: data["message"],
    //               duration: 1000,
    //             });
    //           }


    //         })
    // }



    // delete_policy_dock = (value2) => {
    //   var kkk = this.state.uploaded_policy.filter(n => n !== value2);
    //   this.setState({
    //     uploaded_policy: kkk,
    //   })

    //   for (let index = 0; index < kkk.length; index++) {
    //    var image_type= kkk[index].image_name.split('pdf/');
    //     kkk[index].image_name=image_type[1]
    //   }
    //   // ////////console.log("element",kkk);
    //   const { settings, addToast, } = this.props;
    //   var params = {
    //     policy_dock_id: this.state.policy_dock_id,
    //     policy_pdf: kkk
    //   }

    //   //////console.log("delete_Policy", params);
    //   const res = fetch(settings.api_url + "delete_policy_dock", {
    //     method: 'POST',
    //     body: JSON.stringify(params),
    //     headers: {
    //       "Content-type": "application/json; charset=UTF-8",
    //     }
    //   }).then((response) => response.json())
    //     .then(json => {
    //       //////console.log("Delete Policy Response**************************************", { params: params, response: json })
    //       var data = json;
    //       if (data.status == true) {

    //         this.setState({
    //           AlertDeleteSingle:false
    //         })
    //         addToast({
    //           title: 'Ask my Policy',
    //           content: data["message"],
    //           duration: 1000,
    //         });
    //         this.get_single_policy_dock(this.state.policy_dock_id,"document")
    //       }
    //       else {
    //         this.setState({
    //           AlertDeleteSingle:false
    //         })
    //         addToast({
    //           title: 'Ask my Policy',
    //           content: data["message"],
    //           duration: 1000,
    //         });
    //       }
    //     })

    // }




    // delete_cheque_dock = (value2) => {
    //   var kkk = this.state.uploaded_cheques.filter(n => n !== value2);
    //   this.setState({
    //     uploaded_cheques: kkk,
    //   })

    //   for (let index = 0; index < kkk.length; index++) {
    //    var image_type= kkk[index].image_name.split('pdf/');
    //     kkk[index].image_name=image_type[1]
    //   }
    //   // ////////console.log("element",kkk);
    //   const { settings, addToast, } = this.props;
    //   var params = {
    //     policy_dock_id: this.state.policy_dock_id,
    //     cheque_pdf: kkk
    //   }

    //  ////console.log("delete_Policy", params);
    //   const res = fetch(settings.api_url + "delete_cheque_dock", {
    //     method: 'POST',
    //     body: JSON.stringify(params),
    //     headers: {
    //       "Content-type": "application/json; charset=UTF-8",
    //     }
    //   }).then((response) => response.json())
    //     .then(json => {
    //      ////console.log("Delete Chequess Response**************************************", { params: params, response: json })
    //       var data = json;
    //       if (data.status == true) {

    //         this.setState({
    //           Delete_Cheque:false
    //         })
    //         addToast({
    //           title: 'Ask my Policy',
    //           content: data["message"],
    //           duration: 1000,
    //         });
    //         this.get_single_policy_dock(this.state.policy_dock_id,"document")
    //       }
    //       else {
    //         this.setState({
    //           Delete_Cheque:false
    //         })
    //         addToast({
    //           title: 'Ask my Policy',
    //           content: data["message"],
    //           duration: 1000,
    //         });
    //       }
    //     })

    // }


    add_policy_dock_conversation=()=>{
      const {
          addToast
      } = this.props;
         const usercookies = Cookies.get('usercookies');
         var date = new Date();
          // ////////console.log("date",date);
          var dd = String(date.getDate()).padStart(2, '0');
          var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
          var months=toMonthName(mm)
          // ////////console.log("my_date",months);
          var yyyy = date.getFullYear();
          var hours = date.getHours();
          const time = new Date().toLocaleString([], { hour: 'numeric', minute: 'numeric' });
          // ////////console.log("timetime",time);
          var am_pm = (hours >= 12) ? "PM" : "AM";
          if(hours >= 12){
              hours -=12;
          }
          var my_new_date = dd + ' ' + months + ' ' + yyyy + ' ' + time +" "+ am_pm;
          // ////////console.log("my_new_date",my_new_date);

         var conversation_array =this.state.conversation_array
         if(conversation_array.length == 0){
           var conv_length = 1
         }else{
           var conv_length = conversation_array[0].message_id+1
         }
        //  ////////console.log("conversation_array",conversation_array);
      var conv_param = {
          policy_dock_id:this.state.policy_dock_id,
          message:this.state.message_data,
          from_id:usercookies,
          to_id:this.state.sm_id,
          date_time:my_new_date,
          message_id:conv_length,
          // message_id:conversation_array.length + 1,
          message_from:"oe_to_sm",
          // message_from:"sm_to_oe",
       }
      //console.log("add_conv_param",conv_param);

       if (conv_param.message=="" || conv_param.message==undefined ) {
           this.setState({
               message_error : "block"
           })
          //  ////////console.log("blank input");

       }
       else{
         if (this.state.hitted_new==true) {
          socket.emit('add_policy_dock_conversation', conv_param);
          socket.on('add_policy_dock_conversation_response', (data)=>{
                // ////////console.log('inside add_policy_dock_conversation_response =============',data);

                if(data.data.status==true){
                  this.setState({
                    send_buttonn:"Send",
                    message_data:""
                  })
                    this.setState({
                        message_data : "",
                        message_error : "none",
                        hitted_new :false
                    })
                    this.get_single_policy_dock(this.state.policy_dock_id)
                }
                else{
                    // ////////console.log("nooooooo");
                }

          })
         }
         else{
           //////console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
         }
          // socket.emit('add_policy_dock_conversation', conv_param);
          // socket.on('add_policy_dock_conversation_response', (data)=>{
          //       // ////////console.log('inside add_policy_dock_conversation_response =============',data);

          //       if(data.data.status==true){
          //           this.setState({
          //               message_data : "",
          //               message_error : "none"
          //           })
          //           this.get_single_policy_dock(this.state.policy_dock_id)
          //       }
          //       else{
          //           // ////////console.log("nooooooo");
          //       }

          // })
       }


    }


    componentWillUnmount() {
      // this.socket.disconnect()
      socket.off('get_policy_dock_response');
      socket.off('get_single_policy_dock_response');
      socket.off('add_policy_dock_new_response');
      socket.off('add_policy_dock_conversation_response');
      socket.off('select_quotation_for_policy_response');
      socket.off('select_proposal_for_policy_response');
      socket.off('confirmation_for_proposal_response');
      socket.off('make_policy_app_response');
      socket.off('confirmation_for_quotation_response');
      socket.off('update_policy_dock_response');
      // socket.off('double_confirmation_for_quotation_response');
      socket.off('upload_document_conv_dock_response');
      document.removeEventListener('paste', this.handlePasteEvent);



      // window.removeEventListener('beforeunload', this.handleBeforeUnload);

    }

    // handleBeforeUnload = () => {
    //   this.fetch_all_insurer("Tab_Close")
    //   // event.preventDefault(); // Cancel the default event behavior
    //   // event.returnValue = ''; // Chrome requires a non-empty string to show the dialog

    //   // // Show the popup or perform any action you want here
    //   // const message = 'Are you sure you want to leave?';
    //   // alert(message)
    //   // return message;

    // };





    multiple_files_uploaded=(event)=>{
      // ////////console.log("llllllllllll");
      // ////////console.log(event.target.files)
      this.upload_document_conv_dock(event.target.files)
    }

    upload_document_conv_dock = (files) => {
      const { settings, addToast } = this.props;

      const usercookies = Cookies.get('usercookies');
         var date = new Date();
          // ////////console.log("date",date);
          var dd = String(date.getDate()).padStart(2, '0');
          var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
          var months=toMonthName(mm)
          // ////////console.log("my_date",months);
          var yyyy = date.getFullYear();
          var hours = date.getHours();
          const time = new Date().toLocaleString([], { hour: 'numeric', minute: 'numeric' });
          // ////////console.log("timetime",time);
          var am_pm = (hours >= 12) ? "PM" : "AM";
          if(hours >= 12){
              hours -=12;
          }
          var my_new_date = dd + ' ' + months + ' ' + yyyy + ' ' + time +" "+ am_pm;
          // ////////console.log("my_new_date",my_new_date);

        //  var conversation_array =this.state.conversation_array

         var conversation_array =this.state.conversation_array
         if(conversation_array.length == 0){
           var conv_length = 1
         }else{
           var conv_length = conversation_array[0].message_id+1
         }
        //  ////////console.log("conversation_array",conversation_array);




      var fd = new FormData();
      console.log("files************************", files);

       for (let i = 0; i < files.length; i++) {
        fd.append('file',files[i]);
         }


       fd.append('policy_dock_id', this.state.policy_dock_id);
       fd.append('message', "");
       fd.append('from_id', usercookies);
       fd.append('to_id', this.state.sm_id);
       fd.append('date_time', my_new_date);
       fd.append('message_id',conv_length);
       fd.append('message_from',"oe_to_sm");
      // console.log(...fd, "uplarde_filesss_policyyyyyyyyyyyyyyyyy")
      const res = fetch(settings.api_url + "upload_document_conv_dock", {
          method: 'POST',
          body: fd
      })
          .then((response) => response.json())
          .then(json => {
            // ////////console.log("Upload Message Files Response**************************************", {response: json })
            var data = json;
            if (data.status == true) {
              addToast({
                title: 'Ask my Policy',
                content: data["message"],
                duration: 1000,
              });
              this.get_single_policy_dock(this.state.policy_dock_id,"document")
            }
            else {
              // ////////console.log("something wrong");
              addToast({
                title: 'Ask my Policy',
                content: data["message"],
                duration: 1000,
              });
            }


          })
  }


  update_policy_dock_status(policy_status) {
    const {
        addToast,settings
    } = this.props;

    var params = {
      policy_dock_id:this.state.policy_dock_id,
      policy_status:policy_status,
      // cheque_array:this.state.policy_array,
      // selected_insurer:this.state.insurer_array_new,
      // gross_amount:Number(this.state.gross_amount_new)
    }
    ////console.log("params************",params);
        const res = fetch(settings.api_url + "update_policy_dock_status", {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                //////console.log("Move to Cancel or Close **************************************", { params: params, response: json })
                var data = json;
                if (data.status == true) {
                  this.setState({
                    modalOpen_for_cheque:false
                  })
                    addToast({
                        title: 'Add my policy',
                        content: data["message"],
                        time: new Date(),
                        duration: 1000,
                    });
                      this.get_policy_dock()
                    //  this.get_single_policy_dock(this.state.policy_dock_id)
                }
                else {
                  this.setState({
                    modalOpen_for_cheque:false
                  })
                    addToast({
                        title: 'Add my policy',
                        content: data["message"],
                        time: new Date(),
                        duration: 1000,
                    });
                }
            })
          }


      fileToDataUri_flat = (image) => {
        console.log("imageeeeeeeeee",image);
        return new Promise((res) => {
          const reader = new FileReader();
          const { type, name, size } = image;
          reader.addEventListener('load', () => {
            res({
              document_image_new: reader.result,
              image_name: reader.result.split('base64,')[1],
              document_type: reader.result.split(';')[0].split('/')[1],
              file_name:image.name,
              extension_type:image.type,
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


  validation_for_closed_policy = ()=>{
    if (this.state.gross_amount_new == "" || this.state.gross_amount_new == undefined ||
        this.state.payment_from_customer == "" || this.state.payment_from_customer == undefined
         ) {
          this.setState({
            error_message_new:"Please fill all the feilds",
            borderNewClosed:true
          })
    }else if (this.state.mode_of_payout_type_label == "Cut Pay") {
      if (this.state.mode_of_payment_by_sc == "" || this.state.mode_of_payment_by_sc == undefined) {
        this.setState({
          error_message_new:"Please Select Mode of Payment by SC",
          borderNewClosed:true
        })
      }else{
        this.setState({
          error_message_new:"",
          borderNewClosed:false
        })
        this.update_policy_dock_status_for_close("closed")
      }
    }else if (this.state.mode_of_payment_by_sc_label == "SC Cheque" || this.state.mode_of_payment_by_sc_label == "Customer Cheque + Float" ) {
      console.log("SCCCCCC");
      if (this.state.insurer_array_new == "" || this.state.insurer_array_new == undefined) {
        console.log("Insurere newwww");
        this.setState({
          error_message_new:"Please Select Insurer",
          borderNewClosed:true
        })
      }
      else{
        this.setState({
          error_message_new:"",
          borderNewClosed:false
        })
        this.update_policy_dock_status_for_close("closed")
      }
    }else{
      console.log("Last Elseeee");
      this.setState({
        borderNewClosed:false
      })
      this.update_policy_dock_status_for_close("closed")
    }
  }


  update_policy_dock_status_for_close(policy_status) {
    const {
        addToast,settings
    } = this.props;


    if (this.state.document_data.length == 0) {
      var document=[]
    }else{
      var document=this.state.document_data
      let res = document.forEach(
        ({image_name,extension_type,file_name}, idx, arr) => arr[idx] = ({image_name,extension_type,file_name})
    );
    //console.log(document);
    }

    var paid_by={
      value:this.state.user_id,
      label:this.state.user_name
  }
    var params = {
      policy_dock_id:this.state.policy_dock_id,
      policy_status:policy_status,
      gross_premium:Number(this.state.gross_amount_new),
      payment_from_customer:this.state.payment_from_customer,
      mode_of_premium_payment:this.state.mode_of_payment_by_sc,
      policy_issued_by:paid_by,
      cheque_array:this.state.policy_array,
      selected_insurer:this.state.insurer_array_new,
      insurer_paid_type:this.state.insurer_new,
      physical_cheque_received:this.state.physical_cheque_received,
      customer_payment_attachment:document
    }
    console.log("params************",params);

    // if (params.gross_premium == "" || params.gross_premium == undefined || params.payment_from_customer == "" || params.payment_from_customer == undefined) {
    //   this.setState({
    //     error_message_new:"Please fill all the feilds"
    //   })
    // }
    // else{
      ////console.log("khushboo");
      const res = fetch(settings.api_url + "update_policy_dock_status", {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    }).then((response) => response.json())
        .then(json => {
            //////console.log("Move to Cancel or Close **************************************", { params: params, response: json })
            var data = json;
            if (data.status == true) {


              var doc_param = {key:"issue",policy_dock_id:this.state.policy_dock_id,user_id:this.state.user_id}
              socket.emit('policy_dock_issue', doc_param);


              this.setState({
                modalOpen_for_cheque:false,
                error_message_new:"",
                mode_of_payment_by_sc:"",
                gross_amount_new:"",
                payment_from_customer:"",
                borderNewClosed:false
              })
                addToast({
                    title: 'Add my policy',
                    content: data["message"],
                    time: new Date(),
                    duration: 1000,
                });

                this.get_policy_dock()

                // this.get_single_policy_dock(this.state.policy_dock_id,"issuse")
            }
            else {
              this.setState({
                modalOpen_for_cheque:false,
                error_message_new:data["message"]
              })
                addToast({
                    title: 'Add my policy',
                    content: data["message"],
                    time: new Date(),
                    duration: 1000,
                });
            }
        })
    // }


}



// delete_attachment_file_dock = (value2,index) => {
//   //////console.log("value2@@@@@@@@@", value2);
//   //////console.log("index#########", index);
//   var kkk = value2.image_array.filter(n => n !== index);
//   //////console.log("kkk************",kkk);

//   for (let index = 0; index < kkk.length; index++) {
//    var image_type= kkk[index].file_name.split('pdf/');
//     kkk[index].file_name=image_type[1]
//   }
//   //////console.log("element***************",kkk);
//   const { settings, addToast, } = this.props;
//   var params = {
//     policy_dock_id: this.state.policy_dock_id,
//     message_id: value2.message_id,
//     image_array: kkk
//   }

//   //////console.log("remove_attachment_document_policy", params);
//   const res = fetch(settings.api_url + "remove_attachment_document_policy", {
//     method: 'POST',
//     body: JSON.stringify(params),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//     }
//   }).then((response) => response.json())
//     .then(json => {
//       //////console.log("Delete Attachment Response**************************************", { params: params, response: json })
//       var data = json;
//       if (data.status == true) {
//         this.setState({
//           AlertDelete:false
//         })
//         addToast({
//           title: 'Ask my Policy',
//           content: data["message"],
//           duration: 1000,
//         });
//         this.get_single_policy_dock(this.state.policy_dock_id,"document")
//       }
//       else {
//         this.setState({
//           AlertDelete:false
//         })
//         addToast({
//           title: 'Ask my Policy',
//           content: data["message"],
//           duration: 1000,
//         });
//       }
//     })

// }


for_edit_message(x) {
  //////console.log("xx***",x);
  this.setState({
    send_buttonn:"Edit",
    message_data:x.message,
    message_id_new:x.message_id,
  })
}
switch_function=()=>{
  if (this.state.send_buttonn=="Send") {
    this.add_policy_dock_conversation()
  }
  else{
      this.update_single_message_policy()
  }
}
// update_single_message_policy() {
//   const {
//       addToast,settings
//   } = this.props;

//   var params = {
//     policy_dock_id:this.state.policy_dock_id,
//     message_id:this.state.message_id_new,
//     message:this.state.message_data,
//   }
//   //////console.log("params_edit_messsss",params);

//   if (params.message=="" || params.message==undefined) {

//   }
//   else{
//     const res = fetch(settings.api_url + "update_single_message_policy", {
//       method: 'POST',
//       body: JSON.stringify(params),
//       headers: {
//           "Content-type": "application/json; charset=UTF-8",
//       }
//   }).then((response) => response.json())
//       .then(json => {
//           //////console.log("Update Message **************************************", { params: params, response: json })
//           var data = json;
//           if (data.status == true) {
//             this.setState({
//               send_buttonn:"Send",
//               message_data:""
//             })
//               addToast({
//                   title: 'Add my policy',
//                   content: data["message"],
//                   time: new Date(),
//                   duration: 1000,
//               });
//               this.get_single_policy_dock(this.state.policy_dock_id,"document")
//               // this.get_single_policy_dock(this.state.policy_dock_id)
//           }
//           else {
//               addToast({
//                   title: 'Add my policy',
//                   content: data["message"],
//                   time: new Date(),
//                   duration: 1000,
//               });
//           }
//       })
//   }


// }

// delete_single_message_policy(message_id) {
//   const {
//       addToast,settings
//   } = this.props;

//   var params = {
//     policy_dock_id:this.state.policy_dock_id,
//     message_id:message_id,
//   }
//   //////console.log("Delete Message",params);


//     const res = fetch(settings.api_url + "remove_single_message_policy", {
//       method: 'POST',
//       body: JSON.stringify(params),
//       headers: {
//           "Content-type": "application/json; charset=UTF-8",
//       }
//   }).then((response) => response.json())
//       .then(json => {
//           //////console.log("Delete Message **************************************", { params: params, response: json })
//           var data = json;
//           if (data.status == true) {
//             this.setState({
//               AlertDeleteSingle:false
//             })
//               addToast({
//                   title: 'Add my policy',
//                   content: data["message"],
//                   time: new Date(),
//                   duration: 1000,
//               });
//               this.get_single_policy_dock(this.state.policy_dock_id,"document")
//           }
//           else {
//             this.setState({
//               AlertDeleteSingle:false
//             })
//               addToast({
//                   title: 'Add my policy',
//                   content: data["message"],
//                   time: new Date(),
//                   duration: 1000,
//               });
//           }
//       })



// }

close_chat_data=()=>{
  if (this.state.chart_box_open=="none") {
    this.setState({
      chart_box_open:"block",
      chat_button:"Close Chat"
    })
  }else{
    this.setState({
      chart_box_open:"none",
      chat_button:"Open Chat"
    })
  }
}

show_amount_function=()=>{
  ////console.log("balance_amount",this.state.balance_amount);
  ////console.log("policy_amount",this.state.policy_amount);
  ////console.log("policy_blanace_amount",this.state.policy_blanace_amount);
  ////console.log("cheque_no_1",this.state.cheque_no_1);
  ////console.log("gross_amount_new",this.state.gross_amount_new);

  if (this.state.balance_amount > this.state.policy_amount && this.state.policy_amount==this.state.policy_blanace_amount) {
   var new_balance_amount = 0
   var balance_amount=this.state.policy_amount
   var my_new_array={cheque_id:this.state.cheque_id,policy_amount:balance_amount,cheque_object:this.state.cheque_no_1}
     ////console.log("my_new_array*************",my_new_array);
     var cheque_array = this.state.policy_array
     cheque_array.push(my_new_array)
     ////console.log("cheque_array************************",cheque_array);

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
     AddCheque:false,
     policy_array:cheque_array,
     remaining_message:message,

    })
   ////console.log("khu**********************************");
  }else if (this.state.balance_amount < this.state.policy_amount) {
    var new_balance_amount = Number(this.state.policy_blanace_amount)-Number(this.state.balance_amount)
    ////console.log("new_balance_amount*************",new_balance_amount);

    var my_new_array={cheque_id:this.state.cheque_id,policy_amount:this.state.balance_amount,cheque_object:this.state.cheque_no_1}
    ////console.log("my_new_array*************",my_new_array);
    var cheque_array = this.state.policy_array
    cheque_array.push(my_new_array)
    ////console.log("cheque_array************************",cheque_array);

    if (new_balance_amount==0) {
     var message=""
     }
     else{
       var message="Please select another cheque for remaining amount Rs. " + new_balance_amount
     }


    this.setState({
     policy_blanace_amount:new_balance_amount,
     AddCheque:false,
     policy_array:cheque_array,
     cheque_no_1_amount:"",
     cheque_no_1:"",
     remaining_message:message,

    })
    ////console.log("CBA < PA ******************");
  }else if (this.state.balance_amount > this.state.policy_amount && this.state.policy_amount !==this.state.policy_blanace_amount) {
   var new_balance_amount = 0
   var balance_amount = 0

   var my_new_array={cheque_id:this.state.cheque_id,policy_amount:this.state.policy_blanace_amount,cheque_object:this.state.cheque_no_1}
   ////console.log("my_new_array*************",my_new_array);
   var cheque_array = this.state.policy_array
   cheque_array.push(my_new_array)
   ////console.log("cheque_array************************",cheque_array);


   if (new_balance_amount==0) {
     var message=""
     }
     else{
       var message="Please select another cheque for remaining amount Rs. " + new_balance_amount
     }


   this.setState({
     policy_blanace_amount:new_balance_amount,
     AddCheque:false,
     policy_array:cheque_array,
     cheque_no_1_amount:"",
     cheque_no_1:"",
     remaining_message:message,
    })
    ////console.log("PA !===BA");
  }
}


switch_function_for_cheque_request=()=>{
  if (this.state.request_button == "Request Cheque") {
    this.openNav()
    this.new_message_cheque_requirement()
  }else{
    this.closeNav()
  }
}

openNav(event) {
      console.log("Opennn");
      this.setState({
        cheque_request:true,
        request_button:"Back"
      })

      // document.getElementById("mySidenavNew").style.display = "block";

      var notificationContainer = document.querySelector('.notification-container');
      if (notificationContainer.classList.contains('dismiss')) {
        notificationContainer.classList.remove('dismiss');
        notificationContainer.classList.add('selected');
        notificationContainer.style.display = 'block';
      }
      // event.preventDefault();


      this.fetch_single_cheque_requirement()
      }

closeNav() {
      this.setState({
        cheque_request:false,
        request_button:"Request Cheque"
      })
      //  document.getElementById("mySidenavNew").style.display = "none";

      var notificationContainer = document.querySelector('.notification-container');
      if (notificationContainer.classList.contains('selected')) {
        notificationContainer.classList.remove('selected');
        notificationContainer.classList.add('dismiss');
      }
      }


   // *********************** fetch User ****************

fetch_single_cheque_requirement=()=>{
  console.log("OOOo");
  const usercookies = Cookies.get('usercookies');

  var params = {
    oe_id:usercookies
  }
  console.log("params***************",params);
      socket.emit('fetch_single_cheque_requirement',params);
       socket.on('fetch_single_cheque_requirement_response', (data)=>{
        console.log('inside fetch_single_cheque_requirement =============',data);
        if(data.data.status==true){
          this.setState({
              single_cheque_requirement:data.data.data,
              single_cheque_conversation:data.data.data[0].conversation,
            })
            // socket.emit('fetch_all_users_cheque_requirement');


        }
        else{
          this.setState({
              single_cheque_requirement:[],
              single_cheque_conversation:[],
            })
        }
  })
}

new_message_cheque_requirement=()=>{
  const usercookies = Cookies.get('usercookies');

  var params = {
      oe_id:usercookies,
      hitted_from:'operation',
  }
  console.log("params***************",params);
      socket.emit('new_message_cheque_requirement',params);
       socket.on('new_message_cheque_requirement_response', (data)=>{
        console.log('inside new_message_cheque_requirement =============',data);
        this.setState({
          new_mess_chq:data.data.status
         })
  })
}


//  ******************* Conversation *****************
cheque_requirement_message=()=>{
  const {
      addToast
  } = this.props;
     const usercookies = Cookies.get('usercookies');
     var date = new Date();
      // ////////console.log("date",date);
      var dd = String(date.getDate()).padStart(2, '0');
      var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
      var months=toMonthName(mm)
      // ////////console.log("my_date",months);
      var yyyy = date.getFullYear();
      var hours = date.getHours();
      const time = new Date().toLocaleString([], { hour: 'numeric', minute: 'numeric' });
      // ////////console.log("timetime",time);
      var am_pm = (hours >= 12) ? "PM" : "AM";
      if(hours >= 12){
          hours -=12;
      }
      var my_new_date = dd + ' ' + months + ' ' + yyyy + ' ' + time +" "+ am_pm;

      var conv_param = {
          message:this.state.cheque_requestmessage_data,
          from_id:usercookies,
          date_time:my_new_date,
          message_from:"oe_to_account",
      }
      if (conv_param.message == "" || conv_param.message == undefined) {

      }else{
        console.log("Cheque_re",conv_param);
            socket.emit('cheque_requirement_message', conv_param);
            socket.on('cheque_requirement_message_response', (data)=>{
              console.log('inside cheque_requirement_message =============',data);

              if(data.data.status==true){
                this.setState({
                  cheque_requestmessage_data:""
                  })
                  this.fetch_single_cheque_requirement()
                  socket.on('fetch_all_users_cheque_requirement_response', (data) => {
                    //  this.new_message_cheque_requirement()
                    })
              }
              else{
              }
        })
      }


}


fileToDataUri_che = (image) => {
  console.log("imageeeeeeeeeeee",image);
return new Promise((res) => {
  const reader = new FileReader();
  const { type, name, size } = image;
  reader.addEventListener('load', () => {
    res({
      // base64: reader.result,
      // type: reader.result.split(';')[0].split('/')[1],
      image_name: reader.result.split(';base64,')[1],
      extension_type: image.type,
      file_name: image.name,
      // type:file_type,
      // name: name,

      // size: size,
    })
  });
  reader.readAsDataURL(image);
})
}

uploadImage_che = async (e) => {
if (e.target.files && e.target.files.length > 0) {
  const newImagesPromises = []
  for (let i = 0; i < e.target.files.length; i++) {
    newImagesPromises.push(this.fileToDataUri_che(e.target.files[i]))
  }
  const newImages = await Promise.all(newImagesPromises)
  // setImages([...images, ...newImages])

  this.setState({
    multiple_file_array: newImages
  })
   setTimeout(() => {console.log("this is the first message", this.state.multiple_file_array) }, 1000);
  this.cheque_requirement_attachment(newImages)
}
}


cheque_requirement_attachment=(newImages)=>{
const {
    addToast
} = this.props;
   const usercookies = Cookies.get('usercookies');
   var date = new Date();
    // ////////console.log("date",date);
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var months=toMonthName(mm)
    // ////////console.log("my_date",months);
    var yyyy = date.getFullYear();
    var hours = date.getHours();
    const time = new Date().toLocaleString([], { hour: 'numeric', minute: 'numeric' });
    // ////////console.log("timetime",time);
    var am_pm = (hours >= 12) ? "PM" : "AM";
    if(hours >= 12){
        hours -=12;
    }
    var my_new_date = dd + ' ' + months + ' ' + yyyy + ' ' + time +" "+ am_pm;

    var conv_param = {
        message_image:newImages,
        from_id:usercookies,
        date_time:my_new_date,
        message_from:"oe_to_account",
    }

    console.log("Cheque_Attachment",conv_param);
    socket.emit('cheque_requirement_attachment', conv_param);
    socket.on('cheque_requirement_attachment_response', (data)=>{
      console.log('inside cheque_requirement_attachment =============',data);

      if(data.data.status==true){
        this.setState({
          multiple_file_array:[]
          })
         this.fetch_single_cheque_requirement()
      }
      else{
        this.setState({
          multiple_file_array:[]
          })
      }

})
}



    render() {

      const customStyles = {
        control: ( css, state ) => {
            return {
                ...css,
                borderColor: state.isFocused ? 'rgba(114, 94, 195, 0.6)' : '#eaecf0',
                '&:hover': {
                    borderColor: state.isFocused ? 'rgba(114, 94, 195, 0.6)' : '#eaecf0',
                },
                boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(114, 94, 195, 0.2)' : '',
            };
        },
        option: ( css, state ) => {
            let bgc = '';

            if ( state.isSelected ) {
                bgc = '#725ec3';
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
                backgroundColor: '#eeeeef',
            };
        },
    };
      var cheque_array_new = this.state.cheque_array.map(item => {
        return {
            value: item._id,
            label: item.cheque_no,
            balance_amount:item.balance_amount
        }
    });

    var insurer_array = this.state.insurer_array.map(item => {
      return {
          value: item._id,
          label: item.insurer_name,
          insurer_type: item.insurer_type
      }
  });


  var customer_recevied_payemnt = [
    {value:"1" ,label:"Paid"},
    {value:"2" ,label:"Pending"},
  ]

  const mode_of_pay_by_sc = [
    { value: '1', label: 'SC Cheque',section:'9_section' },
    { value: '4', label: 'Link Payment By SC',section:'10_section' },
    { value: '5', label: 'Customer Cheque + Float',section:'8_section' },
];

const physical_array_cheque = [
  { value: '1', label: 'Yes'},
  { value: '2', label: 'No'},
];
    const type_of_payout = [
      { value: '1', label: 'Cut Pay' },
      { value: '2', label: 'Payout' },
      { value: '4', label: 'Nil' }
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
                          className={classes,"pagination_1"}
                          onClick={() => {
                              this.get_policy_dock("","",this.state.startDate,this.state.endDate,this.state.search_user,number)
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
                          className={classes,"pagination_1"}
                          onClick={() => {
                              this.get_policy_dock("","",this.state.startDate,this.state.endDate,this.state.search_user,number + 1)
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

      const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };

        return (
            <Fragment>
                <PageTitle className="page_opeartion">
                <div className="row policy_row_data">
                 <div className="col-lg-3 col-md-4 oprrrr">
                     <h1>Operation Dock</h1>
                     {/* <h1>Policy Dock</h1> */}
                </div>
                 <div className="col-lg-5 col-md-8 inlr_data">
                   <div style={{display: this.state.ipad_emp_list}}><input
                  //  <div style={{display: device_width < 769 ? this.state.ipad_width : "block"}}><input
                       type="text"
                      //  delay={2000}
                       className="form-control serach_smmm_22"
                       aria-describedby="emailHelp"
                       placeholder="Search SM"
                       value={this.state.search_user}
                       onChange={(e) => {
                         this.setState({
                           search_user:e.target.value
                         })


                        clearTimeout(this.timer);
                        this.timer = setTimeout(() => {
                          this.get_policy_dock("","",this.state.startDate,this.state.endDate,this.state.search_user ,this.state.current_page)

                        }, 1000);


                       }}
                  /></div>

                 <div className="date_rangeee_pii" style={{width:"47%",display:this.state.cheque_request==true ? "none": this.state.ipad_emp_list}}>
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
                                this.get_policy_dock("","",startDate,endDate,this.state.search_user,this.state.current_page)
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
                  <div className="col-lg-4 col-md-12 for_ipd_mobile" style={{textAlign:"end", display:  this.state.isLoading == "none" ? "block" :"none"}}>
                  <div style={{display: this.state.no_data_message=="none"  ? "block" : "none"}}>
                  <div style={{display: device_width < 769 ? this.state.ipad_width : "inline-flex"}}>
                  <Button  disabled={this.state.policy_dock_control == "false" ? 'disabled' : ''} color="brand" className="cancel_close" style={{display: this.state.policy_status == "closed" || this.state.policy_status == "cancelled" ?  "none":"inline-flex",marginRight:"10px",backgroundColor:"#590b88",border:"#590b88",paddingRight:this.state.new_mess_chq == true  ? "5px":""}} onClick={() => this.switch_function_for_cheque_request()}>{this.state.request_button}
                  <span className="" style={{display: this.state.new_mess_chq == true ? "inline-flex" :"none"}}>
                  <Lottie
                    options={defaultOptions}
                    height={18}
                    width={32}
                />

                    </span></Button>
                  <Button disabled={this.state.policy_dock_control == "false" ? 'disabled' : ''} color="info" className="cancel_close" style={{display:this.state.policy_status == "cancelled" ? "inline-flex" : "none"}} onClick={() => this.update_policy_dock_status("revoke")}>Revoke</Button>
                  <div style={{display:this.state.policy_status == "closed" || this.state.policy_status == "cancelled" ?"none" : "inline-flex"}}>
                  <Button disabled={this.state.policy_dock_control == "false" ? 'disabled' : ''} color="danger" className="cancel_close" style={{display:this.state.policy_uploaded==false || this.state.quotation_uploaded==null || this.state.quotation_uploaded==false || this.state.policy_uploaded==null || this.state.proposal_uploaded==false || this.state.proposal_uploaded==null || this.state.deviation_status_new =="disapprove" ? "inline-flex" : "none"}} onClick={() => this.update_policy_dock_status("cancelled")}>Cancel</Button>
                  <div style={{display: this.state.deviation_status_new =="disapprove" ? "none" :"block"}}>
                  <Button disabled={this.state.policy_dock_control == "false" ? 'disabled' : ''} color="primary" className="cancel_close" style={{display: this.state.policy_uploaded == true && this.state.quotation_uploaded == true && this.state.proposal_uploaded == true  ?  "inline-flex" : "none"}} onClick={this.toggle_for_cheque}>Issue</Button>
                  </div>
                     <div className="" style={{display: device_width < 769 ? this.state.ipad_width : "block"}}>
                                  <Button color="info" className="backk_btnnn" style={{ textTransform:"capitalize", display: device_width < 769 ? "inline-flex" : "none"}}
                                    onClick={() => {
                                    this.setState({
                                        ipad_emp_list:"block",
                                        ipad_width:"none"
                                    })
                                    }}>Back</Button>

                                    <Button className="chat_button" color="warning" style={{color:"#fff"}}  onClick={() => {

                                    this.close_chat_data()
                                    }}>{this.state.chat_button}</Button>
                                   </div>
                              </div>
                          </div>
                          </div>
                      </div>
                   </div>
                </PageTitle>
{/* ******************************************** UI PART ******************************************* */}
            <Spinner color="warning" className="spinner_css_12345666" style={{marginTop:gk,display: this.state.isLoading}}/>
                <div className="row marrginnn_new" style={{display: this.state.isLoading=="none" ? "flex" :"none"}}>
                    <div className="col-lg-3 col-md-12 col-sm-12 heading_opeartion height_sales" style={{paddingRight:"0px",display: this.state.ipad_emp_list}}>

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
                                                        this.get_policy_dock("","",this.state.startDate,this.state.endDate,this.state.search_user ,this.state.current_page)
                                                        }, 0)
                                                }}>Pending</Button>
                                    <Button
                                    style={{backgroundColor:this.state.visitor_type=="closed" ? "#4B8178" : "", color:this.state.visitor_type=="closed" ? "#fff" : "",borderColor:this.state.visitor_type=="closed" ? "#4B8178" : ""}}
                                    onClick={() => {
                                                    this.setState({
                                                    visitor_type: 'closed',
                                                    spinner_1: 'block'
                                                    })
                                                    setTimeout(() => {
                                                        this.get_policy_dock("","",this.state.startDate,this.state.endDate,this.state.search_user ,this.state.current_page)
                                                        }, 0)
                                                }}>Issued</Button>
                                    <Button
                                    style={{backgroundColor:this.state.visitor_type=="cancelled" ? "#4B8178" : "", color:this.state.visitor_type=="cancelled" ? "#fff" : "",borderColor:this.state.visitor_type=="cancelled" ? "#4B8178" : ""}}

                                    onClick={() => {
                                                    this.setState({
                                                    visitor_type: 'cancelled',
                                                    spinner_1: 'block'
                                                    })
                                                    setTimeout(() => {
                                                        this.get_policy_dock("","",this.state.startDate,this.state.endDate,this.state.search_user ,this.state.current_page)
                                                        }, 0)
                                                }}>Cancelled </Button>
                                </ButtonGroup>
                                </div>


                        <div className="heading_opeartion mycalendar" style={{height:this.state.total_pages==1 ? my_height-109 : my_height-169}}>
                        <div className="new_border_box_opearrrr">
                                    {this.state.policy_dock_data_array.map((value,index)=>{
                                      // console.log("sm_nameeeeeeeeeeeeeeeee",value.sm_name);
                                        return(
                                            <div aria-hidden="true" className="row test_collapse"  key={index}
                                            style={{border:value._id == this.state.policy_dock_id ? " 2px solid #8bc240" : "",cursor:"pointer"}}
                                            onClick={() => {
                                               this.setState({
                                               spinner_1: 'block'
                                               })
                                               setTimeout(() => {
                                               this.get_single_policy_dock(value._id)
                                               this.read_admin_message(value._id)
                                               }, 0)
                                           }}
                                       >
                                          <div className="col-lg-6 col-md-6 sm_namee">
                                            <div style={{display:"inline-flex"}}>
                                            <p style={{width:"100px",marginBottom:"0px"}} className= {value.sm_name ? (value.sm_name.length >=10 ? "name_type marquee" :"name_type"):""} ><span>{value.sm_name}</span></p>
                                            <div className="" style={{display: value.new_message_available == true ? "inline-flex" :"none",marginTop:"-4px",height:"25px",marginBottom:"-2px"}}>
                                            <Lottie
                                              options={defaultOptions}
                                              height={26}
                                              width={28}
                                              style={{marginTop:"-1px"}}
                                          />
                                              </div>
                                           </div>
                                            {/* <div className="name_type" style={{marginBottom:value.new_message_available == true ? "-5px":""}}>
                                            <span>{value.sm_name}{" "}
                                            <span className="" style={{display: value.new_message_available == true ? "inline-flex" :"none"}}>
                                            <Lottie
                                              options={defaultOptions}
                                              height={25}
                                              width={32}
                                          />
                                              </span></span>
                                          </div> */}

                                           <div style={{display:"flex" , width:"100%",}}>
                                            <div className="time_new">{value.added_date.split("-")[2] + "-" + value.added_date.split("-")[1] + "-" +value.added_date.split("-")[0] }</div>
                                            <div style={{marginTop:"-5px",marginLeft:"6px",display:value.oe_id == this.state.user_id &&  value.assign_to_other == true    ? "block" :"none" }}>
                                                <div className="tooltip_poo">
                                                  <Icon name="help-circle" className="help_center"/>
                                                    <span className="tooltiptext">
                                                        <span>{value.assined_message}</span>
                                                    </span>
                                                </div>
                                           </div>
                                            <div style={{marginTop:"-5px",marginLeft:"6px",display:value.oe_id != this.state.user_id &&  value.assign_to_other == true    ? "block" :"none" }}>
                                            <div className="tooltip_poo">
                                               <Icon name="help-circle" className="help_center"/>
                                                <span className="tooltiptext">
                                                    <span>{value.admin_assined_message}</span>
                                                </span>
                                             </div>
                                         </div>
                                         </div>


                                       </div>
                                        <div className="col-lg-6 col-md-6 text_align sm_namee">
                                        <p className= {value.name ? (value.name.length >=15 ? "mobile_no_type_oppp marquee" :"mobile_no_type_oppp"):"no_providedd"} style={{color:value.name ? (value.name == " " ? "#d5d5d5" :""):""}}  ><span>{value.name ? (value.name != "" ? value.name :"Not Provided") : "Not Provided"}</span></p>
                                        <p className="statusss" style={{color:value.show_status_color }} ><span>{value.status ? value.status :""}</span></p>

                                       </div>
                                        <div className="col-lg-12 col-md-12  sm_namee">
                                        {/* <p className="badge_data">
                                        <Badge color="success" pill style={{display:value.deviation_status=="approve" ? "inline-block" :"none",padding: "5px 6px"}}>Deviation - Approved</Badge>
                                        <Badge color="danger" pill style={{display:value.deviation_status=="disapprove" ? "inline-block" :"none",padding: "5px 6px"}}>Deviation - Disapproved</Badge>
                                        <Badge color="info" pill style={{display:value.details_edited==true ? "inline-block" :"none",padding: "5px 6px"}}>Details Edited</Badge>
                                        <Badge color="brand" pill style={{display:value.policy_confirmation==true ? "inline-block" :"none",padding: "5px 6px"}}>Quotation Confirmed</Badge>
                                        </p> */}

                                       </div>
                                    </div>
                                        )
                                    })}


                                    </div>
                        </div>

                        {/* ********************************* Pagination ***************************************** */}

                        <div style={{display:this.state.total_pages==1?"none":'inline-flex',width:"100%",marginTop:"10px",marginBottom:"20px",padding: "1px 8px"}}>
                              <Button color="warning" className="pagination_1"
                              style={{ marginLeft:"auto",marginRight:"5px"}}
                              outline onClick={() => this.get_policy_dock("","",this.state.startDate,this.state.endDate,this.state.search_user,1)}>first</Button>


                              <Button color="warning" className="pagination_1"
                              style={{marginLeft:"5px",marginRight:"5px",backgroundColor: this.state.current_page == 1 ? '#8bc240' : '',
                              color: this.state.current_page == 1 ? 'white' : '#8bc240',display: this.state.current_page == 1 ? "none" : "block"}} outline
                              onClick={() => {
                                  if (this.state.current_page > 1) {
                                    this.get_policy_dock("","",this.state.startDate,this.state.endDate,this.state.search_user,this.state.current_page - 1)
                                  } else {
                                    this.get_policy_dock("","",this.state.startDate,this.state.endDate,this.state.search_user,this.state.current_page)
                                  }
                              }}
                              >Previous</Button>
                                {/*{renderPageNumbers}*/}
                                {renderPageNumbers}

                              <Button color="warning" className="pagination_1"
                              style={{marginLeft:"5px",backgroundColor: this.state.current_page == this.state.total_pages ? '#8bc240' : '',
                              display: this.state.current_page == this.state.total_pages ? "none" : "block",
                              color: this.state.current_page == this.state.total_pages ? 'white' : '#8bc240'}} outline
                              onClick={() => {
                                  if (this.state.current_page < this.state.total_pages) {
                                      this.get_policy_dock("","",this.state.startDate,this.state.endDate,this.state.search_user,this.state.current_page + 1)
                                  } else {
                                      this.get_policy_dock("","",this.state.startDate,this.state.endDate,this.state.search_user,this.state.current_page)
                                  }
                              }}
                              >next</Button>
                              <Button color="warning" className="pagination_1"
                              style={{marginLeft:"5px",marginRight:"3px"}}
                              outline onClick={() => this.get_policy_dock("","",this.state.startDate,this.state.endDate,this.state.search_user,this.state.total_pages)}>last</Button>
                            </div>











                    </div>
                    <div className="col-lg-9 col-md-12 col-sm-12 heading_opeartion test_collapse ttt_1" style={{display: device_width < 769 ? this.state.ipad_width : "block"}}>
                    <Spinner color="warning" className="employee_spinner_1" style={{ marginTop: gk, display: this.state.spinner_1 }} />
                    <div style={{display: this.state.spinner_1=="none" ? "block":"none"}}>
                    <h3 style={{ display: this.state.no_data_message, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:gk}}>No Data Found</h3>
                        <div style={{display: this.state.no_data_message=="none" ? "block" :"none"}}>

                        <div className="row test_collapse inside_rowww">
                           <div className="col-lg-5 col-md-5 test_collapse">
                           {/* <input  type="file" name="file" accept=".pdf" onChange={this.handleChangeFile} ref={(input) => { file = input; }} multiple /> */}
                           <div >
                            {this.state.opration_single_data_array.map((value,index)=>{
                                return(
                                    <div className="show_deatilsss" key={index}>

                                    <div className="row my_startt mycalendar" style={{paddingTop:"11px",height:my_height-57,display:device_width <=600 ? (this.state.chart_box_open=="block" ? "none" :"block"):"" }}>
                                    {/* <div className="col-lg-6 col-md-6 col-sm-12" style={{ display: "inline-flex",fontWeight: "600",fontSize:"15px" }}>
                                      <div className="mobile desi" style={{ width: "55px", whiteSpace: "nowrap" }}>RTO No</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.rto_no}</span>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12" style={{ display: "inline-flex",fontWeight: "600",fontSize:"15px" }}>
                                      <div className="mobile desi" style={{ width: "82px", whiteSpace: "nowrap" }}>Invoice No</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.invoice}</span>
                                    </div> */}
{/* *************************************************** PERSOANL DETAILS *********************************************************************************************** */}
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{marginTop:"-13px"}}>
                                      <div className="move_to_deviation">
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}>Details</div>
                                      <div style={{display: value.policy_status == "closed" || value.policy_status == "cancelled" ? "none" :"block"}}>
                                      <div style={{display: value.deviation_status != "disapprove"  ? "block" :"none"}}>
                                      {/* <div style={{display:value.deviation_status== undefined  && value.deviation_status != "disapprove" && value.deviation_status != "approve"  ? "block" :"none"}}> */}
                                      <Button className="add_to_deviation" onClick={()=>{
                                                           this.setState({
                                                            add_to_deviation_model:true,
                                                            policy_dock_id:value._id
                                                           })
                                                        }}>Add to Deviation</Button>
                                                        </div>

                                      <div style={{display:value.deviation_status== "disapprove"  ? "block" :"none"}}>
                                      <Button color="primary" style={{color:"#fff"}} className="add_to_deviation111" onClick={()=>{
                                                           this.setState({
                                                            edit_deviation_model:true,
                                                            policy_dock_id:value._id
                                                           })
                                                        }}>Edit Details</Button>
                                                        </div>
                                      </div>
                                      </div>
                                      <hr className="hr_newww" style={{marginTop:" 0px"}}/>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">Policy type</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.policy_type == "roll_over" ? "Roll over" :value.policy_type}</span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">Policy No</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.policy_no}</span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">Chassis No</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.chassis_no}</span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">Moter/Non motor</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.motor_non_motor ? value.motor_non_motor.label:""}</span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display:value.motor_non_motor.label=="Motor" ? "inline-flex" :"none"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">Motor type</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.motor_type ? value.motor_type.label:""}</span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display:value.motor_non_motor.label=="Motor" ? "inline-flex" :"none"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">Sub Motor type</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.sub_motor_type ? value.sub_motor_type.label :""}</span>
                                    </div>
{/*
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display:value.motor_type ? (value.motor_type.label=="Commercial" ? "inline-flex" :"none"):"none"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">PVC Type</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.sub_motor_type ? value.sub_motor_type.label : ""}</span>
                                    </div> */}

                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display:value.sub_motor_type ? (value.sub_motor_type.label=="GCV" ? "inline-flex" :"none"):"none"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">GVW</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.gvw }</span>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display:value.sub_motor_type ? (value.sub_motor_type.label=="PCV" ? "inline-flex" :"none"):"none"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">PCV Type</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.pvc_type ? value.pvc_type.label : ""}</span>
                                    </div>


                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: value.pvc_capacity == "" ? "none" :"inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">Seat Capacity</div>:
                                      <span style={{ marginLeft: "10px" }}><span style={{display:value.pvc_capacity=="" ? "none" :"block"}}>{value.pvc_capacity}</span></span>
                                    </div>


                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: value.motor_type ? (value.motor_type.label == "Commercial" || value.motor_type.label == "MISC D" ? "inline-flex" :"none"):"none"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">Type of Policy</div>:
                                      <span style={{ marginLeft: "10px" }}><span >{value.commerial_miscd_type ?value.commerial_miscd_type.label : "" }</span></span>
                                    </div>


                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">Claim Status</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.claim}</span>
                                    </div>




                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">Preferred Company</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.preferred_company }</span>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display:value.claim=="No" ?"inline-flex" :"none"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">Last Year NCB</div>:
                                      <span style={{ marginLeft: "10px", display:value.last_year_ncb ? value.last_year_ncb .label : "" }}>{value.last_year_ncb ? value.last_year_ncb.label:""}%</span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">Previous Type</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.comprehensive_or_tp}</span>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">Vehicle Number</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.vehicle_no}</span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">Vehicle Class</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.vehicle_class}</span>
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
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">Varient</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.variant}</span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">Engine No</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.engine_no}</span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">CC</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.cc}</span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">Sale/IDV/Invoice Amount</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.sale_idv_invoice_amount == "" || value.sale_idv_invoice_amount == undefined ? "" : (<span>&#x20b9;{value.sale_idv_invoice_amount}</span>)}</span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">Reg Date</div>:
                                      <span style={{ marginLeft: "10px" }}>{this.state.reg_date_formate ? this.state.reg_date_formate:""}</span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">Fuel Type</div>:
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
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">Insurance Type</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.insurance_type}</span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">Previous Insurance Company</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.previous_insurance_company}</span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">Insurance From</div>:
                                      <span style={{ marginLeft: "10px" }}>{this.state.insurance_from_formate ? this.state.insurance_from_formate :""}</span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">Insurance Upto</div>:
                                      <span style={{ marginLeft: "10px" }}>{this.state.insurance_upto_formate ? this.state.insurance_upto_formate :""}</span>
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
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">Address</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.address}</span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">RTO Location</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.rto_location}</span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">Owner Driver</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.owner_driver}</span>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">Addons</div>:
                                      <ul style={{ marginLeft: "10px",paddingLeft: "18px" }}>{value.addons ? value.addons.map((v,i)=>{
                                        return(
                                          <li key ={i}>{v.addons ? v.addons.label: ""}</li>
                                        )
                                      })
                                       : ""}</ul>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display:value.remark_description == undefined || value.remark_description == null ? "none" : "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width width_data">Remark</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.remark_description}</span>
                                    </div>



                                    {/* <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width" style={{ width: "156px" }}>Policy type</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.policy_type}</span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width" style={{ width: "156px" }}>Moter/ Non motor</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.motor_non_motor}</span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display:value.motor_non_motor=="motor" ? "inline-flex" :"none"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width" style={{ width: "156px" }}>Motor type</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.motor_type ? value.motor_type.label:""}</span>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display:value.motor_non_motor=="motor" ? "inline-flex" :"none"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width" style={{ width: "156px" }}>Sub Motor type</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.sub_motor_type ? value.sub_motor_type.label :""}</span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width" style={{ width: "156px" }}>Claim Status</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.claim}</span>
                                    </div>



                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display:value.claim=="no" ?"inline-flex" :"none"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width" style={{ width: "156px" }}>Last Year NCB</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.last_year_ncb}</span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width" style={{ width: "156px" }}>Comprehensive or Tp</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.comprehensive_or_tp}</span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width" style={{ width: "156px" }}>Preferred Company</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.preferred_company}</span>
                                    </div> */}


                                    {/* <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width" style={{ width: "156px" }}>Customer Name</div>:
                                      <span className={value.name ==" " ? "":"reamr_remark_new_nameee"} style={{ marginLeft: "10px" }}>{value.name}</span>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width" style={{ width: "156px" }}>Mobile No</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.phone_no}</span>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width" style={{ width: "156px" }}>Email</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.email_id}</span>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width" style={{ width: "156px" }}>RTO No</div>:
                                      <span style={{ marginLeft: "10px" }}>{value.rto_no}</span>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width" style={{ width: "156px" }}>Invoice (New vehicle) </div>:
                                      <span style={{ marginLeft: "10px" }}>{value.invoice}</span>
                                    </div> */}




{/* *************************************************** Payment DETAILS *********************************************************************************************** */}

                                    {/* <div className="col-lg-12 col-md-12 col-sm-12" style={{marginTop:"20px"}}>
                                      <div className="mobile desi" style={{whiteSpace: "nowrap" }}>Payment Details</div>
                                      <hr style={{marginTop:" 0px"}}/>
                                    </div> */}

                                    {/* <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width" style={{ width: "156px" }}>Policy Amount</div>:
                                      <span style={{ marginLeft: "10px", display:value.policy_amount == "" ? "none" : "block"}}>&#x20b9;{value.policy_amount}</span>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width" style={{ width: "156px" }}>Policy Percentage</div>:
                                      <span className="" style={{ marginLeft: "6px" , display:value.policy_percent == "" ? "none" : "block"}}>{value.policy_percent} %</span>
                                    </div>


                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width" style={{ width: "156px" }}>Payment Type</div>:
                                      <span style={{ marginLeft: "10px" ,textTransform: "capitalize" }}>{value.payment_type.label}</span>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width" style={{ width: "156px" }}>Payment Mode</div>:
                                      <span className="" style={{ marginLeft: "10px",textTransform: "capitalize" }}>{value.payment_mode.label}</span>
                                    </div>



                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width" style={{ width: "156px" }}>Claim</div>:
                                      <span className="" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.claim}</span>
                                    </div>


                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width" style={{ width: "156px" }}>Requested IDV</div>:
                                      <span className="" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.req_idv}</span>
                                    </div>


                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width" style={{ width: "156px" }}>Tax Permit</div>:
                                      <span className="" style={{ marginLeft: "10px",textTransform: "capitalize" }}>{value.taxi_permit}</span>
                                    </div>


                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width" style={{ width: "156px" }}>Bus Type</div>:
                                      <span className="" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.type_of_bus != "" ? (value.type_of_bus == "route_bus" ? "Route Bus" : "School Bus") : ""}</span>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width" style={{ width: "156px" }}>Requested NCB</div>:
                                      <span className="" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.rq_ncb}</span>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width" style={{ width: "156px" }}>Suggested Insurer Comp </div>:
                                      <span className="" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.suggest_insurer_comp}</span>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width" style={{ width: "156px" }}>Policy Type</div>:
                                      <span className="" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.policy_type}</span>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width" style={{ width: "156px" }}>Req. Addon Cover </div>:
                                      <span className="" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.req_addon_cover}</span>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width" style={{ width: "156px" }}>Suggested Premium</div>:
                                      <span className="" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.suggested_premium}</span>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width" style={{ width: "156px" }}>Sourced by</div>:
                                      <span className="" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.sourced_by_detail.label}</span>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                      <div className="mobile desi widthh_i_padd for_pro_width" style={{ width: "156px" }}>Remark</div>:
                                      <span className="reamr_remark_new" style={{ marginLeft: "10px" }}>{value.remark}</span>
                                    </div> */}

{/* ***************************************************  Attachment ****************************************************************************************** */}


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
                                                <span className="pdff_data" style={{display:v1.file_type != "text" && v1.file_type != "application" && v1.file_type != "image" ? "block" :"none"}}>
                                                <a rel="noreferrer" href={v1.file_name} target="_blank">
                                                <img src={other_img} aria-hidden="true" alt="pdf image" className="my_uploded_imgg"/></a>
                                             </span>
                                              </div>
                                          )
                                        }):""}
                                            </div>
                                       </div>
                                    </div>


 {/* ***************************************************  Previous Year Policy Atteachment ****************************************************************************************** */}


                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{marginTop:"23px",display:value.pyp_image =="" || value.pyp_image == undefined ? "none" :"block"}}>
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}>Previous Year Policy</div>
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
                                                <span className="pdff_data" style={{display:v1.file_type != "text" && v1.file_type != "application" && v1.file_type != "image" ? "block" :"none"}}>
                                                <a rel="noreferrer" href={v1.file_name} target="_blank">
                                                <img src={other_img} aria-hidden="true" alt="pdf image" className="my_uploded_imgg"/></a>
                                             </span>
                                              </div>
                                          )
                                        }):""}
                                            </div>
                                       </div>
                                    </div>



 {/* ***************************************************  PAN CARD Atteachment ****************************************************************************************** */}


                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{marginTop:"23px",display:value.pan_card_image =="" || value.pan_card_image == undefined ? "none" :"block"}}>
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

                                                <span className="pdff_data" style={{display:v1.file_type != "text" && v1.file_type != "application" && v1.file_type != "image" ? "block" :"none"}}>
                                                <a rel="noreferrer" href={v1.file_name} target="_blank">
                                                <img src={other_img} aria-hidden="true" alt="pdf image" className="my_uploded_imgg"/></a>
                                             </span>
                                              </div>
                                          )
                                        }):""}
                                            </div>
                                       </div>
                                    </div>



 {/* ***************************************************  Addhar Crad Atteachment ****************************************************************************************** */}


                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{marginTop:"23px",display:value.aadhar_card_image =="" || value.aadhar_card_image == undefined ? "none" :"block"}}>
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}>Aadhar Card/Voter ID/ DL</div>
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

                                             <span className="pdff_data" style={{display:v1.file_type != "text" && v1.file_type != "application" && v1.file_type != "image" ? "block" :"none"}}>
                                                <a rel="noreferrer" href={v1.file_name} target="_blank">
                                                <img src={other_img} aria-hidden="true" alt="pdf image" className="my_uploded_imgg"/></a>
                                             </span>
                                              </div>
                                          )
                                        }):""}
                                            </div>
                                       </div>
                                    </div>





                                    {/* <h1>vbgvbgvbgvgbgbggcg</h1>

<Dropzone onDrop={this.handleDrop}>
{({getRootProps, getInputProps}) => (
<div {...getRootProps()}>
  <input {...getInputProps()} onPaste={this.handlePaste} />
  <p>Drop files here or click to upload</p>
</div>
)}
</Dropzone> */}


    {/* *************************************************** UPoaddeeee Cheque  *********************************************************************************************** */}
                         <div className="col-lg-12 col-md-12 col-sm-12" style={{marginTop:"25px",paddingRight: "15px",display:value.others_image =="" || value.others_image == undefined ? "none" :"block"}}>
                             <div className="upladedddd">
                                 <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}>Others</div>

                                     {/* <div>
                                         <Dropzone className="hhhhttttttttttttttt"  onChange={(files) => {
                                           this.setState({
                                             uploaded_cheques: files
                                            })
                                            setTimeout(() => this.upload_cheque_dock(files), 600);
                                            }} />
                                      </div> */}
                                      </div>
                                      <hr className="hr_newww" style={{marginTop:" 0px",marginBottom: "25px"}}/>
                          </div>

                          <div className="col-lg-12 col-md-12 col-sm-12">
                               <div className="row">
                                        { value.others_image ? value.others_image.map((value1,index1)=>{
                                                return(
                                            <div className="col-lg-3 col-md-4 col-sm-4 small_devicess" style={{textAlign:"center"}} key={index1}>
                                        <div>
                                       {/* <button type="button" disabled={this.state.policy_dock_control == "false" ? 'disabled' : ''} className="btn btn-danger btn-uniform btn-sm mnt-10 mnb-10 p-0 delte_image" onClick={()=>{
                                                           this.setState({
                                                            Delete_Cheque:true,
                                                            cheque_pdf:value1,
                                                           })
                                                        }}
                                            style={{ display: this.state.uploaded_cheques == [] || value.policy_status!="pending" ? "none" : "grid" }}
                                        >
                                               <Icon name="x" />
                                        </button> */}
                                            <span style={{display:value1.file_type=="image" ? "block" :"none"}}>
                                            <a rel="noreferrer" href={value1.file_name} target="_blank">
                                            <img src={value1.file_name} aria-hidden="true" alt="pdf image" className="image_pdf"/></a>
                                            </span>
                                            <span style={{display:value1.file_type=="pdf" ? "block" :"none"}}>
                                            <a rel="noreferrer" href={value1.file_name} target="_blank">
                                            <img src={pdf_img} aria-hidden="true" alt="pdf image" className="image_pdf"/></a>
                                            </span>
                                            <span style={{display:value1.file_type=="text" ? "block" :"none"}}>
                                            <a rel="noreferrer" href={value1.file_name} target="_blank">
                                            <img src={excel_img} aria-hidden="true" alt="pdf image" className="image_pdf"/></a>
                                            </span>
                                            <span style={{display:value1.file_type != "text" && value1.file_type != "pdf" && value1.file_type != "image" ? "block" :"none"}}>
                                            <a rel="noreferrer" href={value1.file_name} target="_blank">
                                            <img src={other_img} aria-hidden="true" alt="pdf image" className="image_pdf"/></a>
                                            </span>

                                            {/* <p className="img_name marquee"><span>{value1.show_name}</span></p>
                                            <div className="pdf_timee">{value1.date_time ? (dateFormat(new Date(value1.date_time.replace("Z", "")), "dd-mm-yyyy")):""}</div>
                                            <div className="pdf_timee_timeeee top_data">{value1.date_time ? (dateFormat(new Date(value1.date_time.replace("Z", "")), "hh:MM TT")):""}</div> */}
                                            </div>
                                            </div>
                                                )
                                            }):null
                                        }
                                    </div>
                            </div>




{/* *************************************************** UPoaddeeee QUOATATIPN  *********************************************************************************************** */}
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{marginTop:"25px",paddingRight: "15px"}}>
                                        <div className="upladedddd">
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}>Upload<span style={{display:value.policy_status == "closed" || value.policy_status == "cancelled" ? "inline" :"none"}}>ed</span> Quotation</div>

                                      {/* <div className="inputt_plocyyy" style={{width:"100%" ,display:value.policy_status == 'pending' ? 'block' : 'none'}}>
                                        <input id="inputGroupFile01" type="file"  className="no_input_file" disabled={this.state.policy_dock_control == "false" ? 'disabled' : ''} onChange={this.handleChangeFile_Quotationn} multiple style={{display:"none"}} />
                                         <label className="lord_111" htmlFor="inputGroupFile01">
                                          <Icon name="upload-cloud" className="upadee_filesss"/>
                                         </label>
                                        </div> */}





                                      <form onSubmit={this.upload_quotation_dock}>
                                      {/* <input id="inputGroupFile01" type="file" className="no_input_file" onChange={this.uploadImage} multiple style={{display:"none"}}/> */}
                                      {/* <label for="file"><Icon name="upload" className="upadee_filesss"/></label> */}

                                      {/* <label className="lord_lable image_lable" style={{marginLeft: "auto"}} htmlFor="inputGroupFile01">
                                            <div className="file_name"></div>
                                            <Icon name="upload" className="upadee_filesss"/>
                                        </label> */}
                                        </form>

                                        {/* <Icon name="upload-cloud" className="upadee_filesss"/> */}
                                        {/* <kbd className="key">Ctrl</kbd> +{' '}
            <kbd className="key">V</kbd> in this window.
            <input id="file_input" type="text" accept="image/*" onChange={(e)=>{
              this.setState({
                my_file_type:"quoattaion"
              })
            }}

            onFocus={(e)=>{
              this.setState({
                my_file_type:"quoattaion"
              })
            }}/> */}

                                        <div className="my_input_paste_data" style={{display:value.policy_status == "closed" || value.policy_status == "cancelled" ? "none" :"flex"}}>
                                              <Input onPaste={this.handlePasteEvent} type="text" disabled={this.state.policy_dock_control == "false" ? 'disabled' : ''} name="file"  placeholder="Paste image" className="meesage_div_paste"  onChange={(e) => {
                                              this.setState({
                                                my_file_type:"quoattaion"
                                              })
                                              }}
                                              onFocus={(e)=>{
                                                this.setState({
                                                  my_file_type:"quoattaion"
                                                })
                                              }}/>
                                           <div className="drop_zone_new" style={{pointerEvents : this.state.policy_dock_control == "false" ? "none" :""}}>
                                           <Dropzone

                                              className="hhhhttttttttttttttt"
                                              maxFiles={5} // Set the maximum allowed files to 5
                                              filesLimit={5} // Optional, just to be explicit
                                              // uploadMultiple={true}
                                              // parallelUploads={2}
                                              // maxFiles={5} // Limit the maximum number of selected files to 2
                                              onChange={(files) => {
                                                this.setState({
                                                  uploaded_quotation_data: files
                                                });

                                                // Trigger the upload process immediately after files are selected
                                                this.upload_quotation_dock(files);
                                              }}
                                            />
                                            </div>
                                          </div>




                             {/* <div>
                            <Dropzone className="hhhhttttttttttttttt"  onChange={(files) => {
                                       this.setState({
                                           file_array: files
                                      })
                                      // ////////console.log(files);
                                       setTimeout(() => this.upload_quotation_dock(files), 600);

                                   }} />
                                   </div> */}

{/* <label className="lord_lable image_lable" style={{marginLeft: "auto"}} htmlFor="inputGroupFile01">
                                            <div className="file_name"></div>
                                            <Icon name="upload" className="upadee_filesss"/>
                                        </label> */}

{/*
                                      <Icon name="upload" className="upadee_filesss" onClick={() => {
                                               this.uploadImage()
                                           }} multiple/> */}
                                      </div>
                                      <hr className="hr_newww" style={{marginTop:" 0px",marginBottom: "25px"}}/>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                      <div className="row">
                                        {
                                           value.quotation_pdf ? value.quotation_pdf.map((value1,index1)=>{
                                                return(
                                            <div className="col-lg-3 col-md-4 col-sm-4 small_devicess" style={{textAlign:"center"}} key={index1}>
                                              <div>
                                              <div style={{display:this.state.quotation_make_policy == true ? "none" : "block"}}>
                                              <button type="button" disabled={this.state.policy_dock_control == "false" ? 'disabled' : ''} className="btn btn-danger btn-uniform btn-sm mnt-10 mnb-10 p-0 delte_image"
                                                  onClick={()=>{
                                                    this.setState({
                                                      AlertDelete:true,
                                                      quotation_pdf:value1,
                                                    })
                                                }} style={{ display: this.state.file_array_new == [] ||  value.policy_status!="pending" ? "none" : "grid" }}>
                                                      <Icon name="x" />
                                                </button>
                                        </div>
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



                                            <p className="img_name marquee"><span>{value1.show_name}</span></p>
                                            <div className="pdf_timee ">{value1.date_time ? (dateFormat(new Date(value1.date_time.replace("Z", "")), "dd-mm-yyyy")):""}</div>
                                            <div className="pdf_timee_timeeee">{value1.date_time_new}</div>
                                            {/* <div className="make_policyy_div"><Button outline color="primary" style={{backgroundColor:value1.make_policy==true ? "#007bff" : "",borderColor:value1.make_policy==true ? "#007bff" : "",color:value1.make_policy==true ? "#FFF" : ""}} className="make_policyy" onClick={()=>{
                                            this.setState({
                                              quotation_pdf:value1,
                                             })
                                             this.make_policy_new(value1,index1)
                                              }}>Make Policy</Button></div> */}
                                            </div>
                                                )
                                            }):null
                                        }
                                        </div>

                                    </div>







{/* *************************************************** Upload Praposal *********************************************************************************************** */}
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{marginTop:"25px",paddingRight: "15px",display:value.policy_confirmation== true  ? "block" : "none"}}>
                                        <div className="upladedddd">
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}>Upload<span style={{display:value.policy_status == "closed"|| value.policy_status == "cancelled" ? "inline" :"none"}}>ed</span>  Proposal</div>
                                        <div className="my_input_paste_data" style={{display:value.policy_status == "closed" || value.policy_status == "cancelled" ? "none" :"flex"}}>
                                              <Input onPaste={this.handlePasteEvent} disabled={this.state.policy_dock_control == "false" ? 'disabled' : ''} type="text" name="email"  placeholder="Paste image" className="meesage_div_paste"  onChange={(e) => {
                                              this.setState({
                                                my_file_type:"upload_proposal"
                                              })
                                              }}
                                              onFocus={(e)=>{
                                                this.setState({
                                                  my_file_type:"upload_proposal"
                                                })
                                              }}/>
                                           <div className="drop_zone_new" style={{pointerEvents : this.state.policy_dock_control == "false" ? "none" :""}}>
                                           <Dropzone className="hhhhttttttttttttttt"  onChange={(files) => {
                                           this.setState({
                                             uploaded_cheques: files
                                            })
                                            setTimeout(() => this.upload_proposal_dock(files), 0);
                                            }} />
                                            </div>
                                          </div>
                                      </div>
                                      <hr className="hr_newww" style={{marginTop:" 0px",marginBottom: "25px"}}/>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{display:value.quotation_uploaded == false ? "none" : "block"}}>
                                      <div className="row">
                                        {
                                           value.proposal_pdf ? value.proposal_pdf.map((value1,index1)=>{

                                                return(
                                            <div className="col-lg-3 col-md-4 col-sm-4 small_devicess" style={{textAlign:"center"}} key={index1}>
                                              <div>
                                                <div style={{display:this.state.proposal_make_policy == true ? "none" : "block"}}>
                                              <button type="button" disabled={this.state.policy_dock_control == "false" ? 'disabled' : ''} className="btn btn-danger btn-uniform btn-sm mnt-10 mnb-10 p-0 delte_image"
                                                  onClick={()=>{
                                                    this.setState({
                                                      AlertDeletePropasal:true,
                                                      proposal_pdf:value1,
                                                    })
                                                }}style={{ display: this.state.policy_array == [] ||  value.policy_status!="pending" ? "none" : "grid" }}>
                                                      <Icon name="x" />
                                                </button>
                                        </div>
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



                                            <p className="img_name marquee"><span>{value1.show_name}</span></p>
                                            <div className="pdf_timee ">{dateFormat(new Date(value1.date_time.replace("Z", "")), "dd-mm-yyyy")}</div>
                                            <div className="pdf_timee_timeeee">{value1.date_time_new}</div>

                                            </div>
                                                )
                                            }):null
                                        }
                                        </div>

                                    </div>



                                    {/* *************************************************** UPoaddeeee QUOATATIPN  *********************************************************************************************** */}
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{marginTop:"25px",paddingRight: "15px",display:value.proposal_confirmation== true  ? "block" : "none"}}>
                                    {/* <div className="col-lg-12 col-md-12 col-sm-12" style={{marginTop:"25px",paddingRight: "15px",display:value.details_edited== true && value.policy_confirmation== true ? "block" : "none"}}> */}
                                        <div className="upladedddd">
                                      <div className="mobile desi uplodddddd_poliii" style={{whiteSpace: "nowrap" }}>Upload<span style={{display:value.policy_status == "closed"|| value.policy_status == "cancelled" ? "inline" :"none"}}>ed</span> Policy</div>
                                        {/* <div className="inputt_plocyyy" style={{width:"100%",display:value.policy_status == 'pending' ? 'block' : 'none'}}>
                                        <input id="inputGroupFile012" type="file"  className="no_input_file" onChange={this.upload_policy_dock} multiple style={{display:"none"}} disabled={this.state.policy_dock_control == "false" ? 'disabled' : ''}/>
                                         <label className="lord_111" htmlFor="inputGroupFile012">
                                          <Icon name="upload-cloud" className="upadee_filesss"/>
                                         </label>
                                        </div> */}


                                          <div className="my_input_paste_data" style={{display:value.policy_status == "closed"|| value.policy_status == "cancelled" ? "none" :"flex"}}>
                                              <Input onPaste={this.handlePasteEvent} disabled={this.state.policy_dock_control == "false" ? 'disabled' : ''} type="text" name="email"  placeholder="Paste image" className="meesage_div_paste"  onChange={(e) => {
                                              this.setState({
                                                my_file_type:"policy_file_data"
                                              })
                                              }}
                                              onFocus={(e)=>{
                                                this.setState({
                                                  my_file_type:"policy_file_data"
                                                })
                                              }}/>
                                           <div className="drop_zone_new" style={{pointerEvents : this.state.policy_dock_control == "false" ? "none" :""}}>
                                           <Dropzone className="hhhhttttttttttttttt"  onChange={(files) => {
                                           this.setState({
                                             uploaded_cheques: files
                                            })
                                            setTimeout(() => this.upload_policy_dock(files), 0);
                                            }} />
                                            </div>
                                          </div>




                                                      {/* <div>
                                                      <Dropzone className="hhhhttttttttttttttt"  onChange={(files) => {
                                                            this.setState({
                                                              uploaded_policy: files
                                                            })
                                                            // ////////console.log(files);
                                                            setTimeout(() => this.upload_policy_dock(files), 600);

                                                        }} />
                                                        </div> */}


                                      </div>
                                      <hr className="hr_newww" style={{marginTop:" 0px",marginBottom: "25px"}}/>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                      <div className="row">
                                        {
                                           value.policy_pdf ? value.policy_pdf.map((value1,index1)=>{
                                                return(
                                            <div className="col-lg-3 col-md-4 col-sm-4 small_devicess" style={{textAlign:"center"}} key={index1}>
                                        <div>
                                       {/* <button type="button" disabled={this.state.policy_dock_control == "false" ? 'disabled' : ''} className="btn btn-danger btn-uniform btn-sm mnt-10 mnb-10 p-0 delte_image" onClick={()=>{
                                                           this.setState({
                                                            AlertDeleteSingle:true,
                                                            policy_pdf:value1,
                                                           })
                                                        }}
                                            style={{ display: this.state.uploaded_policy == [] || value.policy_status!="pending" ? "none" : "grid" }}
                                        >
                                               <Icon name="x" />
                                        </button> */}

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



                                            <p className="img_name marquee"><span>{value1.show_name}</span></p>
                                            <div className="pdf_timee">{dateFormat(new Date(value1.date_time.replace("Z", "")), "dd-mm-yyyy")}</div>
                                            <div className="pdf_timee_timeeee top_data">{value1.date_time_new}</div>
                                            </div>
                                            </div>
                                                )
                                            }):null
                                        }
                                    </div>
                                    </div>
                                    </div>


                                   </div>
                                )
                            })}
                          </div>
                           </div>




                           <div className="col-lg-7 col-md-7 test_collapse babbbyy" style={{paddingRight:this.state.cheque_request==true ? "15px":"25px",paddingLeft:this.state.cheque_request==true ? "0px":"15px",display:device_width <=600 ? (this.state.chart_box_open=="block" ? "block" :"none"):"",background: this.state.cheque_request==true ? "#fff":""}}>

                           {/* <div className="wrapper">
                              <img id="slide" src="" alt="" />
                          </div> */}


                          {/* Chat for Cheque Requriment */}


                          <div className="notification-container dismiss">

                          <div >
                                  <div className="row top_data_new">
                                  <div className="col-lg-6 col-md-6">
                                    <h3 className="requesr_ch">Requested Cheques</h3>
                                  </div>
                                  <div className="col-lg-6 col-md-6 pad_right_36">
                                    <Icon name="x" className="closebtn_new"  onClick={()=>this.closeNav()} />
                                  </div>
                                  {/* <div className="col-lg-12 col-md-12">

                                  <hr/>
                                  </div> */}
                                  </div>

                            <div>
                               <div className="meesage_div_newchee mycalendar_message" style={{height:my_height-125,marginTop:"10px",paddingRight:"20px"}}>

                              {this.state.single_cheque_conversation.map((value, index) => {

                              return (
                                  <div style={{ width: "100%" }} key={index}>
                                      <div className={value.message_from == "oe_to_account" ? 'overclass_user overclass_user_neww' : 'overclass_admin'} style={{ float: value.message_from == "oe_to_account" ? "right" : "left",paddingLeft: "13px" }}>
                                      <div style={{display:value.message_type=="message" ? "block" :"none"}}>
                                          <div className={value.message_from == "oe_to_account" ? 'grey_msg_new_dock' : 'purple_msg'}>
                                          {/* <div className={value.message_from == "oe_to_account" ? 'grey_msg_new_dock' : 'purple_msg'} style={{background:value.message_from == "oe_to_account" ? '#f8f9fa' : this.state.color_code}}> */}
                                              <span dangerouslySetInnerHTML={{ __html: value.message}}></span>
                                          </div>
                                       </div>




                                      <div style={{display:value.message_type=="attachment" ? "block" :"none"}}>
                                        {value.image_array ?   value.image_array.map((v1,i1)=>{
                                          return(
                                            <div className={value.message_from == "oe_to_account" ? 'grey_msg_imgg' : 'purple_msg_imgg'} key={i1}>
                                              <span className="pdff_data" style={{display:v1.file_type=="image" ? "block" :"none"}}>

                                              <a rel="noreferrer" href={v1.file_name} target="_blank">
                                                <img src={v1.file_name} alt="img" className="my_uploded_imgg"/></a>
                                              </span>

                                              <span className="pdff_data" style={{display:v1.file_type=="application" ? "block" :"none"}}>

                                              <a rel="noreferrer" href={v1.file_name} target="_blank">
                                               <img src={pdf_img} aria-hidden="true" alt="pdf image" className="my_uploded_imgg"/></a>
                                                </span>

                                              <span className="pdff_data" style={{display:v1.file_type=="text" ? "block" :"none"}}>

                                              <a rel="noreferrer" href={v1.file_name} target="_blank">
                                               <img src={excel_img} aria-hidden="true" alt="pdf image" className="my_uploded_imgg"/></a>
                                                </span>


                                              <span className="pdff_data" style={{display:v1.file_type != "text" && v1.file_type != "application" && v1.file_type != "image" ? "block" :"none"}}>

                                              <a rel="noreferrer" href={v1.file_name} target="_blank">
                                               <img src={other_img} aria-hidden="true" alt="pdf image" className="my_uploded_imgg"/></a>
                                                </span>

                                              </div>
                                          )
                                        }):""}

                                       </div>

                                       <div  className="message_tpe_new">
                                        <div style={{ float: value.message_from == "oe_to_account" ? 'right' : 'left', width: "100%" }} className="ggg">
                                              <span style={{ float: value.message_from == "oe_to_account" ? 'right' : 'left', fontSize: "10px", color: "#ababab" }}>
                                                  <span>{value.date_time}</span>
                                              </span>
                                          </div>
                                       </div>


                                      </div>
                                  </div>
                              )
                              })

                              }

                              <br />

                              </div>
                              <div className="my_input_new">
                              <Input type="text" name="message" id="text23" placeholder="Write Message..." className="meesage_div_input_neww" value={this.state.cheque_requestmessage_data} onChange={(e) => {
                              this.setState({
                                cheque_requestmessage_data: e.target.value
                              })
                         }}/>
                           <input type="file" disabled={this.state.policy_dock_control == "false" ? 'disabled' : ''} id="fileInput" multiple onChange={this.uploadImage_che} style={{display:"none"}}/>
                           {/* <input type="file" id="fileInput" multiple={this.props.multiple} onChange={this.uploadImage} style={{display:"none"}}/> */}
                           <label className="lord_111" htmlFor="fileInput">
                           <Icon name="paperclip" className="papercliss"/>
                                         </label>
                               <Button color="warning"
                               disabled={this.state.policy_dock_control == "false" ? 'disabled' : ''}
                                onClick={() => {
                                  this.cheque_requirement_message()
                              }}>Send</Button>
                              </div>
                           </div>

                            </div>


                          </div>

                           {/* <div style={{display:this.state.cheque_request==true ? "block" :"none"}}>
                           <div id="mySidenavNew" className= {this.state.cheque_request==true ? "selected" :"dismiss" } >
                                  <div className="row top_data_new">
                                  <div className="col-lg-6 col-md-6">
                                    <h3 className="requesr_ch">Requested Cheques</h3>
                                  </div>
                                  <div className="col-lg-6 col-md-6 pad_right_36">
                                    <Icon name="x" className="closebtn_new" onClick={()=>this.closeNav()} />
                                  </div>
                                  </div>

                            <div>
                               <div className="meesage_div_newchee mycalendar_message" style={{height:my_height-125,marginTop:"10px"}}>

                              {this.state.single_cheque_conversation.map((value, index) => {

                              return (
                                  <div style={{ width: "100%" }} key={index}>
                                      <div className={value.message_from == "oe_to_account" ? 'overclass_user overclass_user_neww' : 'overclass_admin'} style={{ float: value.message_from == "oe_to_account" ? "right" : "left",paddingLeft: "13px" }}>
                                      <div style={{display:value.message_type=="message" ? "block" :"none"}}>
                                          <div className={value.message_from == "oe_to_account" ? 'grey_msg_new_dock' : 'purple_msg'}>
                                              <span dangerouslySetInnerHTML={{ __html: value.message}}></span>
                                          </div>
                                       </div>




                                      <div style={{display:value.message_type=="attachment" ? "block" :"none"}}>
                                        {value.image_array ?   value.image_array.map((v1,i1)=>{
                                          return(
                                            <div className={value.message_from == "oe_to_account" ? 'grey_msg_imgg' : 'purple_msg_imgg'} key={i1}>
                                              <span className="pdff_data" style={{display:v1.file_type=="image" ? "block" :"none"}}>

                                              <a rel="noreferrer" href={v1.file_name} target="_blank">
                                                <img src={v1.file_name} alt="img" className="my_uploded_imgg"/></a>
                                              </span>

                                              <span className="pdff_data" style={{display:v1.file_type=="application" ? "block" :"none"}}>

                                              <a rel="noreferrer" href={v1.file_name} target="_blank">
                                               <img src={pdf_img} aria-hidden="true" alt="pdf image" className="my_uploded_imgg"/></a>
                                                </span>

                                              <span className="pdff_data" style={{display:v1.file_type=="text" ? "block" :"none"}}>

                                              <a rel="noreferrer" href={v1.file_name} target="_blank">
                                               <img src={excel_img} aria-hidden="true" alt="pdf image" className="my_uploded_imgg"/></a>
                                                </span>


                                              <span className="pdff_data" style={{display:v1.file_type != "text" && v1.file_type != "application" && v1.file_type != "image" ? "block" :"none"}}>

                                              <a rel="noreferrer" href={v1.file_name} target="_blank">
                                               <img src={other_img} aria-hidden="true" alt="pdf image" className="my_uploded_imgg"/></a>
                                                </span>

                                              </div>
                                          )
                                        }):""}

                                       </div>

                                       <div  className="message_tpe_new">
                                        <div style={{ float: value.message_from == "oe_to_account" ? 'right' : 'left', width: "100%" }} className="ggg">
                                              <span style={{ float: value.message_from == "oe_to_account" ? 'right' : 'left', fontSize: "10px", color: "#ababab" }}>
                                                  <span>{value.date_time}</span>
                                              </span>
                                          </div>
                                       </div>


                                      </div>
                                  </div>
                              )
                              })

                              }

                              <br />

                              </div>
                              <div className="my_input_newNew">
                              <Input type="text" name="message" id="text1" placeholder="Write Message..." className="meesage_div_input_neww" value={this.state.cheque_requestmessage_data} onChange={(e) => {
                              this.setState({
                                cheque_requestmessage_data: e.target.value
                              })
                         }}/>
                           <input type="file" disabled={this.state.policy_dock_control == "false" ? 'disabled' : ''} id="fileInput" multiple onChange={this.uploadImage_che} style={{display:"none"}}/>
                           <label className="lord_111" htmlFor="fileInput">
                           <Icon name="paperclip" className="paperclissNew"/>
                                         </label>
                               <Button color="warning"
                               disabled={this.state.policy_dock_control == "false" ? 'disabled' : ''}
                                onClick={() => {
                                  this.cheque_requirement_message()
                              }}>Send</Button>
                              </div>
                           </div>

                            </div>
                            </div> */}


                            <div style={{display:this.state.cheque_request == true ? "none" : "block"}}>
                               <div className="meesage_div_new mycalendar_message" style={{height:my_height-146,marginTop:"10px"}}>

                              {this.state.conversation_array.map((value, index) => {

                              return (
                                  <div style={{ width: "100%" }} key={index}>
                                      <div className={value.message_from == "oe_to_sm" ? 'overclass_user overclass_user_neww' : 'overclass_admin'} style={{ float: value.message_from == "oe_to_sm" ? "right" : "left",paddingLeft: "13px" }}>
                                      <div style={{display:value.message_type=="message" ? "block" :"none"}}>
                                          <div className={value.message_from == "oe_to_sm" ? 'grey_msg_new_dock' : 'purple_msg'} style={{background:value.message_from == "oe_to_sm" ? '#f8f9fa' : this.state.color_code}}>
                                              <span dangerouslySetInnerHTML={{ __html: value.message}}></span>
                                                  {/*<span className="tooltiptext" style={{ left: '-50px',display:value.message_from == "oe_to_sm" ? "inline-flex" : "none"}}>
                                                        <Icon name="edit" className="edit h_edit_delete" onClick={() => { this.for_edit_message(value) }} />
                                                        <Icon name="trash" className="trash h_edit_delete" onClick={()=>{
                                                           this.setState({
                                                            AlertDeleteSingle:true,
                                                            message_id_new:value.message_id,
                                                           })
                                                        }} />
                                                    </span>*/}
                                              </div>
                                       </div>
                                      <div className="" style={{display:value.message_type=="confirmation" ? "block" :"none"}}>
                                          <div className={value.message_from == "oe_to_sm" ? 'grey_msg_new_dock new_bottom box' : 'purple_msg box'} style={{background:value.message_from == "oe_to_sm" ? '#f8f9fa' : this.state.color_code}}>
                                              <span dangerouslySetInnerHTML={{ __html: value.message}}></span>


                                              </div>
                                              {/* <div className="overlay yes_badge_new1111111111">
                                                <p>ggggggggggggggggggg</p>


                                       </div> */}
                                       </div>
                                      <div className="" style={{display:value.message_type=="make_policy" ? "block" :"none"}}>
                                          <div className={value.message_from == "oe_to_sm" ? 'grey_msg_new_dock new_bottom box' : 'purple_msg box'} style={{background:value.message_from == "oe_to_sm" ? '#f8f9fa' : this.state.color_code}}>
                                              <span dangerouslySetInnerHTML={{ __html: value.message}}></span>
                                          </div>
                                       </div>
                                      <div className="" style={{display:value.message_type=="proposal_confirmation" ? "block" :"none"}}>
                                          <div className={value.message_from == "oe_to_sm" ? 'grey_msg_new_dock new_bottom box' : 'purple_msg box'} style={{background:value.message_from == "oe_to_sm" ? '#f8f9fa' : this.state.color_code}}>
                                              <span dangerouslySetInnerHTML={{ __html: value.message}}></span>
                                          </div>
                                       </div>


                                       {/* <div className="bade_dta" style={{display:value.confirmation_type=="" ? "none" :"block"}}>
                                              <Badge color="warning" style={{display:value.confirmation_type=="yes" ? "block" :"none",color:"#fff"}}>Yes</Badge>
                                              <Badge color="danger" style={{color:"#fff",display:value.confirmation_type=="no" ? "block" :"none"}}>No</Badge>
                                             </div> */}


                                       {/* <div style={{display:value.message_from=="badge" ? "inline-flex":"none"}} className="new_message_bage">
                                            <Icon name="bell" className="phone_call_message"/>
                                            <h6 dangerouslySetInnerHTML={{ __html: value.message}}></h6>
                                        </div> */}

                                      <div style={{display:value.message_type=="file" ? "block" :"none"}}>
                                        {value.image_array ?   value.image_array.map((v1,i1)=>{
                                          return(
                                            <div className={value.message_from == "oe_to_sm" ? 'grey_msg_imgg' : 'purple_msg_imgg'} key={i1}>
                                              <span className="pdff_data" style={{display:v1.file_type=="image" ? "block" :"none"}}>
                                              {/*<button type="button" className="btn btn-danger btn-uniform btn-sm mnt-10 mnb-10 p-0 delte_image my_delete_new"
                                              style={{display:value.message_from == "oe_to_sm" ? "grid" : "none"}}
                                               onClick={()=>{
                                                this.setState({
                                                    AlertDelete:true,
                                                    policy_dock_data:value,
                                                    policy_dock_index:v1
                                                })
                                            }}>
                                               <Icon name="x" />
                                              </button>*/}
                                              <a rel="noreferrer" href={v1.file_name} target="_blank">
                                                <img src={v1.file_name} alt="img" className="my_uploded_imgg"/></a>
                                              </span>

                                              <span className="pdff_data" style={{display:v1.file_type=="pdf" ? "block" :"none"}}>
                                              {/*<button type="button" className="btn btn-danger btn-uniform btn-sm mnt-10 mnb-10 p-0 delte_image my_delete_new"
                                               style={{display:value.message_from == "oe_to_sm" ? "grid" : "none"}}
                                               onClick={()=>{
                                                this.setState({
                                                  AlertDelete:true,
                                                  policy_dock_data:value,
                                                  policy_dock_index:v1
                                                })
                                                }}>
                                               <Icon name="x" />
                                              </button>*/}
                                              <a rel="noreferrer" href={v1.file_name} target="_blank">
                                               <img src={pdf_img} aria-hidden="true" alt="pdf image" className="my_uploded_imgg"/></a>
                                                </span>

                                              <span className="pdff_data" style={{display:v1.file_type=="text" ? "block" :"none"}}>

                                              <a rel="noreferrer" href={v1.file_name} target="_blank">
                                               <img src={excel_img} aria-hidden="true" alt="pdf image" className="my_uploded_imgg"/></a>
                                                </span>


                                              <span className="pdff_data" style={{display:v1.file_type != "text" && v1.file_type != "pdf" && v1.file_type != "image" ? "block" :"none"}}>

                                              <a rel="noreferrer" href={v1.file_name} target="_blank">
                                               <img src={other_img} aria-hidden="true" alt="pdf image" className="my_uploded_imgg"/></a>
                                                </span>

                                              </div>
                                          )
                                        }):""}

                                       </div>
                                       <div className="bade_dta" style={{display:value.message_type=="confirmation" ? "block" :"none"}}>
                                       <div style={{ float: value.message_from == "oe_to_sm" ? 'right' : 'left', width: "100%" }} className="ggg">
                                          <div className="bade_dta" style={{display:value.confirmation_type=="" ? "none" :"block"}}>
                                          {/* <Badge className="yes_badge" color="warning" style={{color:"#fff",display:value.confirmation_type=="yes" ? "inline-block" :"none",visibility: "hidden"}}>Yes</Badge> */}
                                          <Badge className="yes_badge_new" color="warning" style={{color:"#fff",display:value.confirmation_type=="yes" ? "inline-block" :"none"}}>Yes</Badge>
                                          <Badge className="yes_badge_new_danger" color="danger" style={{color:"#fff",display:value.confirmation_type=="no" ? "inline-block" :"none"}}>No</Badge>
                                          <Badge className="propoasall_badgess"  style={{color:"#fff",display:value.confirmation_type=="approve" ? "inline-block" :"none",background:"#2fc787"}}>Approve</Badge>
                                          <Badge className="propoasall_badgess"  style={{color:"#fff",display:value.confirmation_type=="cancel" ? "inline-block" :"none",background:"#dc3545"}}>Cancel</Badge>
                                          <Badge className="propoasall_badgess"  style={{color:"#fff",display:value.confirmation_type=="correction" ? "inline-block" :"none",background:"#ff9a00"}}>Correction</Badge>
                                          </div>
                                          </div>
                                          </div>


                                       <div className="bade_dta" style={{display:value.message_type=="make_policy" ? "block" :"none"}}>
                                       <div style={{ float: value.message_from == "oe_to_sm" ? 'right' : 'left', width: "100%" }} className="ggg">
                                          <div className="bade_dta" style={{display:value.confirmation_type=="" ? "none" :"block"}}>
                                          {/* <Badge className="yes_badge" color="warning" style={{color:"#fff",display:value.confirmation_type=="yes" ? "inline-block" :"none",visibility: "hidden"}}>Yes</Badge> */}
                                          <Badge className="yes_badge_new" color="warning" style={{color:"#fff",display:value.confirmation_type==true ? "inline-block" :"none"}}>Make Policy</Badge>
                                          </div>
                                        </div>
                                       </div>


                                       <div className="bade_dta" style={{display:value.message_type=="proposal_confirmation" ? "block" :"none"}}>
                                       <div style={{ float: value.message_from == "oe_to_sm" ? 'right' : 'left', width: "100%" }} className="ggg">
                                          <div className="bade_dta" style={{display:value.confirmation_type=="" ? "none" :"block"}}>
                                          {/* <Badge className="yes_badge" color="warning" style={{color:"#fff",display:value.confirmation_type=="yes" ? "inline-block" :"none",visibility: "hidden"}}>Yes</Badge> */}
                                          <Badge className="yes_badge_new" color="warning" style={{color:"#fff",display:value.confirmation_type=="yes" ? "inline-block" :"none"}}>Yes</Badge>
                                          </div>
                                        </div>
                                       </div>



                                        <div style={{display:value.message_type=="badge"?"none" :"block" }} className="message_tpe_new">
                                        <div style={{ float: value.message_from == "oe_to_sm" ? 'right' : 'left', width: "100%" }} className="ggg">
                                              <span style={{ float: value.message_from == "oe_to_sm" ? 'right' : 'left', fontSize: "10px", color: "#ababab" }}>
                                                  <span>{value.date_time}</span>
                                              </span>
                                          </div>
                                          </div>
                                      </div>


                                      <div style={{display:value.message_type=="badge" ? "inline-flex":"none"}} className="new_message_bage message_tpe_new">
                                            <Icon name="alert-triangle" className="phone_call_message_nre_policy"/>
                                            <h6 dangerouslySetInnerHTML={{ __html: value.message}}></h6>
                                        </div>
                                  </div>
                              )
                              })

                              }

                              <br />

                              </div>
                              <div className="my_input_new">
                              <Input type="text" name="message" id="text123" placeholder="Write Message..." className="meesage_div_input_neww" value={this.state.message_data} onChange={(e) => {
                              this.setState({
                                message_data: e.target.value
                              })
                         }}/>
                           <input type="file" disabled={this.state.policy_dock_control == "false" ? 'disabled' : ''} id="fileInputPolicy" multiple onChange={this.multiple_files_uploaded} style={{display:"none"}}/>
                           {/* <input type="file" id="fileInput" multiple={this.props.multiple} onChange={this.uploadImage} style={{display:"none"}}/> */}
                           <label className="lord_111" htmlFor="fileInputPolicy">
                           <Icon name="paperclip" className="papercliss"/>
                                         </label>

                               {/* <Button color="warning"
                               onClick={() => {
                                 this.setState({
                                   hitted_new:true
                                 })
                                this.add_policy_dock_conversation

                            }}>Send</Button> */}
                               <Button color="warning"
                               disabled={this.state.policy_dock_control == "false" ? 'disabled' : ''}
                                onClick={() => {
                                  this.setState({
                                    hitted_new:true
                                  })
                                  this.add_policy_dock_conversation()

                              }}>{this.state.send_buttonn}</Button>
                              </div>
                           </div>
                           </div>



                        </div>
                    </div>
                    </div>
                </div>
            </div>





            {/* <div className="notification-container dismiss">
            </div> */}

            {/* <span  id="showFilePanel">Open</span>
            <span   id="closeFilePanel">Close</span> */}

            <Modal
                    style={{ width: '300px', height: 'auto', justifyContent: 'center', textAlign: 'center', alignItem: 'center', marginTop: '200px' }}
                    isOpen={this.state.AlertDelete}
                    toggle={this.AlertDelete}
                    className={this.props.className, "del_model"}
                    fade
                >
                    <ModalBody>
                        <div style={{ width: '100%', height: '20px' }}>
                            <Button className="close" style={{ float: 'right' }} color="" onClick={this.AlertDelete}>
                                <Icon name="x" />
                            </Button>
                        </div>
                        <div style={{ width: '100%', height: '50px' }}>
                            <p >Are you sure you want to Delete ?</p>

                        </div>
                        <div style={{ height: '50px', width: '100%' }}>
                          <Button style={{ marginRight: "20px"}} color="secondary" onClick={this.AlertDelete}>no</Button>

                            <Button color="warning" disabled={this.state.policy_dock_control == "false" ? 'disabled' : ''}
                                style={{ color:"#fff"}}
                                onClick={() => {
                                    this.delete_building_map_image(this.state.quotation_pdf)

                                }}
                            >yes</Button>
                            {'             '}
                        </div>

                    </ModalBody>
                </Modal>



            <Modal
                    style={{ width: '300px', height: 'auto', justifyContent: 'center', textAlign: 'center', alignItem: 'center', marginTop: '200px' }}
                    isOpen={this.state.AlertDeletePropasal}
                    toggle={this.AlertDeletePropasal}
                    className={this.props.className, "del_model"}
                    fade
                >
                    <ModalBody>
                        <div style={{ width: '100%', height: '20px' }}>
                            <Button className="close" style={{ float: 'right' }} color="" onClick={this.AlertDeletePropasal}>
                                <Icon name="x" />
                            </Button>
                        </div>
                        <div style={{ width: '100%', height: '50px' }}>
                            <p >Are you sure you want to Delete ?</p>

                        </div>
                        <div style={{ height: '50px', width: '100%' }}>
                          <Button style={{ marginRight: "20px"}} color="secondary" onClick={this.AlertDeletePropasal}>no</Button>

                            <Button color="warning" disabled={this.state.policy_dock_control == "false" ? 'disabled' : ''}
                                style={{ color:"#fff"}}
                                onClick={() => {
                                    this.delete_propsal_images(this.state.proposal_pdf)

                                }}
                            >yes</Button>
                            {'             '}
                        </div>

                    </ModalBody>
                </Modal>
            <Modal
                    style={{ width: '300px', height: 'auto', justifyContent: 'center', textAlign: 'center', alignItem: 'center', marginTop: '200px' }}
                    isOpen={this.state.AlertDeleteSingle}
                    toggle={this.AlertDeleteSingle}
                    className={this.props.className, "del_model"}
                    fade
                >
                    <ModalBody>
                        <div style={{ width: '100%', height: '20px' }}>
                            <Button className="close" style={{ float: 'right' }} color="" onClick={this.AlertDeleteSingle}>
                                <Icon name="x" />
                            </Button>
                        </div>
                        <div style={{ width: '100%', height: '50px' }}>
                            <p >Are you sure you want to Delete ?</p>

                        </div>
                        <div style={{ height: '50px', width: '100%' }}>

                          <Button style={{ marginRight: "20px"}} color="secondary"  onClick={this.AlertDeleteSingle}>no</Button>
                            <Button color="warning" disabled={this.state.policy_dock_control == "false" ? 'disabled' : ''}
                                style={{ color:"#fff"}}
                                onClick={() => {
                                    this.delete_policy_dock(this.state.policy_pdf)

                                }}
                            >yes</Button>
                            {'             '}
                        </div>

                    </ModalBody>
                </Modal>


            <Modal
                    style={{ width: '300px', height: 'auto', justifyContent: 'center', textAlign: 'center', alignItem: 'center', marginTop: '200px' }}
                    isOpen={this.state.Delete_Cheque}
                    toggle={this.Delete_Cheque}
                    className={this.props.className, "del_model"}
                    fade
                >
                    <ModalBody>
                        <div style={{ width: '100%', height: '20px' }}>
                            <Button className="close" style={{ float: 'right' }} color="" onClick={this.Delete_Cheque}>
                                <Icon name="x" />
                            </Button>
                        </div>
                        <div style={{ width: '100%', height: '50px' }}>
                            <p >Are you sure you want to Delete ?</p>

                        </div>
                        <div style={{ height: '50px', width: '100%' }}>

                          <Button style={{ marginRight: "20px"}} color="secondary"  onClick={this.Delete_Cheque}>no</Button>
                            <Button color="warning" disabled={this.state.policy_dock_control == "false" ? 'disabled' : ''}
                                style={{ color:"#fff"}}
                                onClick={() => {
                                    this.delete_cheque_dock(this.state.cheque_pdf)

                                }}
                            >yes</Button>
                            {'             '}
                        </div>

                    </ModalBody>
                </Modal>



            <Modal
                    style={{ width: '370px', height: 'auto', justifyContent: 'center', textAlign: 'center', alignItem: 'center', marginTop: '200px' }}
                    isOpen={this.state.add_to_deviation_model}
                    toggle={this.add_to_deviation_model}
                    className={this.props.className, "del_model"}
                    fade
                >
                    <ModalBody>
                        <div style={{ width: '100%', height: '20px' }}>
                            <Button className="close" style={{ float: 'right' }} color="" onClick={this.add_to_deviation_model}>
                                <Icon name="x" />
                            </Button>
                        </div>
                        <div style={{ width: '100%', height: '70px' }}>
                            <p >Are you sure you want to Add this Policy To Deviation ?</p>

                        </div>
                        <div style={{ height: '35px', width: '100%' }}>
                            <Button color="secondary" style={{marginRight: "20px"}}  onClick={this.add_to_deviation_model}>no</Button>
                            {' '} {' '}
                            <Button color="warning" disabled={this.state.policy_dock_control == "false" ? 'disabled' : ''}
                                style={{ color:"#fff"}}
                                onClick={() => {
                                    this.add_policy_for_deviation(this.state.policy_dock_id)

                                }}
                            >yes</Button>

                        </div>

                    </ModalBody>
                </Modal>

                <Modal
                        isOpen={ this.state.edit_deviation_model }
                        toggle={ this.edit_deviation_model }
                        className={ this.props.className,"modal-dialog-centered" }
                        fade
                    >
                        <div className="modal-header">
                            <h5 className="modal-title h2">Edit Details</h5>
                            <Button className="close" color="" onClick={ this.edit_deviation_model }>
                                <Icon name="x" />
                            </Button>
                        </div>
                        <ModalBody>
                          <div className="row">
                                <div className="col-lg-6 col-md-6">
                                <Label className="ballllllll" for="emailInput1">Policy Percentage</Label>
                                            <Input type="number" name="policy_no" id="emailInput1" placeholder="Policy Percentage" style={{marginBottom:"16px"}}  onChange={(e) => {
                                                this.setState({
                                                  new_policy_percent:e.target.value
                                                })
                                              }}
                                            value={this.state.new_policy_percent} />
                                </div>
                                <div className="col-lg-6 col-md-6">
                                <Label className="ballllllll" for="prefered">Prefered Company</Label>
                                            <Input type="text" name="prefered_com" id="prefered" placeholder="Prefered Company" style={{marginBottom:"16px"}}  onChange={(e) => {
                                                this.setState({
                                                  preferred_company:e.target.value
                                                })
                                              }}
                                            value={this.state.preferred_company} />
                                </div>
                                <div className="col-lg-6 col-md-6 mar_toop">
                                   <Label className="ballllllll" for="emailInput1">Type of Payout</Label>
                                   <Select
                                        value = {this.state.type_of_payout}
                                        onChange={(e) => {
                                            this.setState({
                                                type_of_payout: e,
                                                type_of_payout_label: e.label,
                                                mode_of_premium_received:""
                                            });
                                        }}
                                        placeholder="Select..."
                                        className="contact_sort"
                                        options={ type_of_payout }
                                        styles={ customStyles }
                                    />
                                   </div>

                                <div className="col-lg-6 col-md-6" style={{display:this.state.type_of_payout_label == "" ? "none" :"block"}}>
                                <Label className="ballllllll" for="emailInput1">Premium Received By Customer</Label>
                                <div style={{display:this.state.type_of_payout_label == "Cut Pay" ? "block" :"none"}}>
                                   <Select
                                        value = {this.state.mode_of_premium_received}
                                        onChange={(e) => {
                                            //console.log(e, "Val.....")
                                            this.setState({
                                              mode_of_premium_received: e,
                                            });
                                        }}
                                        placeholder="Select..."
                                        className={this.state.borderNew && this.state.mode_of_premium_received == "" ?  "is_not_valid" : "contact_sort"}
                                        options={mode_of_premium_received   }
                                        styles={ customStyles }
                                    />
                                   </div>
                                   <div style={{display:this.state.type_of_payout_label == "Payout" ? "block" :"none"}}>
                                   <Select
                                        value = {this.state.mode_of_premium_received}
                                        onChange={(e) => {
                                            this.setState({
                                              mode_of_premium_received: e,
                                            });
                                        }}
                                        placeholder="Select..."
                                        className="contact_sort"
                                        options={for_payout_mode_of_premium_received}
                                        styles={ customStyles }
                                    />
                                   </div>
                                </div>
                          </div>
                           </ModalBody>
                        <ModalFooter>
                            <Button style={{ marginRight: "20px"}} color="secondary" onClick={ this.edit_deviation_model }>Close</Button>
                            { ' ' }
                            <Button color="warning" disabled={this.state.policy_dock_control == "false" ? 'disabled' : ''}
                                style={{color:"#fff"}}
                                onClick={() => {
                                    this.update_policy_percentage(this.state.policy_dock_id)

                                }}
                            >yes</Button>
                        </ModalFooter>
                    </Modal>

            {/* <Modal
                    style={{ width: '430px', height: 'auto', justifyContent: 'center', textAlign: 'center', alignItem: 'center', marginTop: '200px' }}
                    isOpen={this.state.edit_deviation_model}
                    toggle={this.edit_deviation_model}
                    className={this.props.className, "del_model"}
                    fade
                >
                    <ModalBody>
                        <div style={{ width: '100%', height: '20px' }}>
                            <Button className="close" style={{ float: 'right' }} color="" onClick={this.edit_deviation_model}>
                                <Icon name="x" />
                            </Button>
                        </div>
                        <div style={{ width: '100%', height: '50px' }}>


                        </div>
                        <div style={{ height: '50px', width: '100%' }}>
                            <Button color="secondary"  onClick={this.edit_deviation_model}>no</Button>
                            {'             '}
                            <Button color="warning" disabled={this.state.policy_dock_control == "false" ? 'disabled' : ''}
                                style={{ marginRight: "20px",color:"#fff"}}
                                onClick={() => {
                                    this.update_policy_percentage(this.state.policy_dock_id)

                                }}
                            >yes</Button>

                        </div>

                    </ModalBody>
                </Modal> */}


{/* ************************************ Add Chequess ********************************************************* */}
                         <Modal
                            isOpen={ this.state.modalOpen_for_cheque }
                            toggle={ this.toggle_for_cheque }
                            className={ this.props.className,"modal-dialog-centered issed_policyyy" }
                            fade
                        >
                            <div className="modal-header">
                                <h5 className="modal-title h2">Issue Policy</h5>
                                <Button className="close" color="" onClick={ this.toggle }>
                                    <Icon name="x" />
                                </Button>
                            </div>
                            <ModalBody>
                                {/* <h3 style={{marginBottom:"8px"}}>Policy Amount : &#x20b9; {this.state.policy_amount} </h3> */}



                                  <div className="row">
                                  <div className="col-lg-6 col-md-6">
                                    <Label className="ballllllll" for="emailInput1">Gross Premium<span className="start_mark">*</span></Label>
                                    <Input className={this.state.borderNewClosed && this.state.gross_amount_new == "" ?  "form-control is-invalid" : "form-control"} type="number" name="gross_amount" id="gross_amiunt" placeholder="Gross Premium" value={this.state.gross_amount_new}
                                     onChange={(e) => {
                                      this.setState({
                                        gross_amount_new: e.target.value,
                                        policy_amount: Number(e.target.value),
                                        policy_blanace_amount: Number(e.target.value),
                                        error_message_new:""
                                      });
                                      }}/>
                                   </div>
                                   <div className="col-lg-6 col-md-6">
                                   <Label className="ballllllll" for="emailInput1">Customer Payment Status<span className="start_mark">*</span></Label>
                                   <Select
                                        value = {this.state.payment_from_customer}
                                        onChange={(e) => {
                                            this.setState({
                                                payment_from_customer: e,
                                                error_message_new:""
                                            });
                                        }}
                                        placeholder="Select..."
                                        className={this.state.borderNewClosed && this.state.payment_from_customer == "" ?  "is_not_valid" : "contact_sort"}
                                        // className="contact_sort"
                                        options={ customer_recevied_payemnt }
                                        styles={ customStyles }
                                    />
                                   </div>







                                   <div className="col-lg-6 col-md-6" style={{marginTop:"20px"}}>
                                    <Label className="ballllllll" for="emailInput1">Premium Received By Customer<span className="start_mark">*</span></Label>
                                    <Input disabled type="text" name="mode_of_pay" id="mode_of_pa" placeholder="Mode of Payment" value={this.state.mode_of_payment ? this.state.mode_of_payment.label :""}/>
                                   </div>



                                   <div className="col-lg-6 col-md-6" style={{display:this.state.mode_of_payout_type_new ? (this.state.mode_of_payout_type_new.label == "Cut Pay" ? "block" : "none"):"none",marginTop:"20px"}}>
                                   <Label className="ballllllll" for="emailInput1">Mode of Premium Payment by SC<span className="start_mark">*</span></Label>
                                   <Select
                                        value = {this.state.mode_of_payment_by_sc}
                                        onChange={(e) => {
                                            console.log(e, "Val.....")
                                            this.setState({
                                              mode_of_payment_by_sc: e,
                                              mode_of_payment_by_sc_label: e.label,
                                              error_message_new:""
                                            });
                                        }}
                                        placeholder="Select..."
                                        className={this.state.borderNewClosed && this.state.mode_of_payment_by_sc == "" ?  "is_not_valid" : "contact_sort"}
                                        options={ mode_of_pay_by_sc }
                                        styles={ customStyles }
                                    />
                                   </div>
                                   <div className="col-lg-6 col-md-6 " style={{marginTop:"20px",display:this.state.mode_of_payment ? (this.state.mode_of_payment.label == "Cheque to SC" ? "block" : "none") :""}}>
                                   <Label className="ballllllll" for="cheque_rece">Physical Cheque received<span className="start_mark">*</span></Label>
                                   <Select
                                        value = {this.state.physical_cheque_received}
                                        onChange={(e) => {
                                            //////console.log(e, "Val.....")
                                            this.setState({
                                              physical_cheque_received: e,
                                              error_message_new:""
                                            });
                                        }}
                                        placeholder="Select..."
                                        className={this.state.borderNewClosed && (this.state.physical_cheque_received == "" || this.state.physical_cheque_received == undefined) ?  "is_not_valid" : "contact_sort"}
                                        options={ physical_array_cheque }
                                        styles={ customStyles }
                                    />
                                   </div>


                                   <div className="col-lg-6 col-md-6 col-sm-12 " style={{marginTop:"20px"}}>
                                <Label className="">Attachment</Label>
                                <div>
                                <input id="inputGroupFile01" type="file"  className="no_input_file"  multiple onChange={this.handleChangeFile_new} style={{display:"none"}} />
                                         <label className="lord_lable" htmlFor="inputGroupFile01">
                                          {/* <Icon name="upload-cloud" className="upadee_filesss"/> */}
                                          <div className="file_name"></div>
                                          <div className="choose align-self-center">Choose file</div>
                                         </label>

                                </div>
                                <div className="attachment_data_array">
                                        {this.state.document_data ? this.state.document_data.map((value,index)=>{
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
                                        }):[]}
                                    </div>
                                </div>


                                   <div className="col-lg-6 col-md-6 mar_toop" style={{marginTop:this.state.mode_of_payment ? (this.state.mode_of_payment.label == "Cheque to SC" ? "0px" : "20px") :"",display:this.state.mode_of_payment_by_sc_label == "SC Cheque" || this.state.mode_of_payment_by_sc_label == "Customer Cheque + Float" ? "block" : "none"}}>
                                   <Label className="ballllllll" for="insurer">Insurer<span className="start_mark">*</span></Label>
                                   <Select
                                        value = {this.state.insurer_array_new}
                                        onChange={(e) => {
                                            //////console.log(e, "Val.....")
                                            this.setState({
                                                insurer_array_new: e,
                                                insurer_array_typeee: e.insurer_type,
                                                error_message_new:""
                                            });
                                            this.fetch_cheque_for_policy(e.value)
                                        }}
                                        placeholder="Select..."
                                        className={this.state.borderNewClosed && this.state.insurer_array_new == "" ?  "is_not_valid" : "contact_sort"}
                                        options={ insurer_array }
                                        styles={ customStyles }
                                    />
                                   </div>

                                   {/* <div className="col-lg-12 col-md-12 mar_toop" style={{display:this.state.no_cheques_avaible == "block" ? "block" : "none"}}>
                                     <p style={{color:"#f597a2",fontSize:"12px",marginTop:"20px",marginBottom:"-18px"}}>No Cheque Available for the Insurer</p>
                                   </div> */}
                                   </div>

                                  <div className="row" style={{paddingTop: "20px"}}>
                                     {this.state.insurer_array_typeee ? this.state.insurer_array_typeee.map((value,index)=>{
                                       return(
                                        <div className="col-lg-4" style={{whiteSpace:"nowrap"}} key={index}>
                                      <CustomInput type="radio" id={"formRadio" + index} name="formRadio1" label={value.label} onClick={(e) => {
                                          this.setState({
                                            insurer_new:value.label
                                          })
                                          }} />
                                        </div>
                                       )
                                     }):[]}



                                   </div>


                              <div style={{display:this.state.insurer_new == "Pre-Paid" ? "block" : "none"}}>
                                  <h4 className="add_cheque_data">Add Cheque For Policy</h4>
                                  <div className="row">
                                    {this.state.policy_array ? this.state.policy_array.map((value,index)=>{
                                       return(
                                         <>
                                        <div className="col-lg-6 col-md-6 col-sm-12 for_top_mobile_ne">
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
                                        <div className="col-lg-6 col-md-6">
                                            <Label className="ballllllll" for="emailInput1">Amount</Label>
                                            <Input type="number" name="policy_no" id="emailInput1" placeholder="Short answer text" style={{marginBottom:"16px"}}
                                            value={value.policy_amount}  disabled/>
                                   </div>
                                    </>
                                       )
                                      }):[]}
                                    <div className="col-lg-6 col-md-6" style={{display:this.state.policy_blanace_amount==0 ? "none" :"block"}}>
                                   <Label className="ballllllll" for="emailInput1">Cheque No<span className="start_mark">*</span> </Label>

                                   <Select
                                        value = {this.state.cheque_no_1}
                                        onChange={(e) => {
                                            ////console.log(e, "Val.....")
                                            this.setState({
                                              cheque_no_1: e,
                                              AddCheque:true,
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
                                        style={{marginBottom:"16px"}}
                                    />
                                   </div>


                                   <div className="col-lg-6 col-md-6 for_top_mobile_ne" style={{display:this.state.policy_blanace_amount==0 ? "none" :"block"}}>
                                   <Label className="ballllllll" for="emailInput1">Amount<span className="start_mark">*</span></Label>
                                   <Input type="number" name="policy_no" id="emailInput1" placeholder="Short answer text" style={{marginBottom:"16px"}}
                                   value={this.state.cheque_no_1_amount}
                                   onChange={(e) => {
                                    this.setState({
                                      cheque_no_1_amount:e.target.value
                                    })
                                   }}  />
                                   </div>
                                   <div className="col-lg-12 col-md-12 mar_toop" style={{display:this.state.remaining_message=="" ? "none" : "block"}}>
                                  <div style={{textAlign:"center" ,color:"red"}}>{this.state.remaining_message}</div>
                                   </div>



                                   </div>
                                </div>






                                <div className="col-lg-12 col-md-12 messahe_for_deviaaa" style={{display:this.state.deviation_status_new==undefined  ? "block" : "none"}}>
                                  <div style={{display: "inline-flex"}}>
                                  <div className="Issued_plocyyyy">
                                  <CustomInput type="checkbox" id="formCheckbox2"  onChange={(e) => {
                                    this.setState({
                                      conformation_for_deviation:e.target.checked
                                    })
                                   }}/>
                                  </div>
                                    <div style={{marginTop:"4px"}}>
                                  <p className="polivyyyyyyyy">Payout Percent for this Policy is {this.state.new_policy_percent} %. Are you sure want to issue the policy with same criteria?</p>

                                  </div>
                                  {/* <div className="Issued_plocyyyy">
                                  <CustomInput type="checkbox" id="formCheckbox2" label="Yes"  onChange={(e) => {
                                    this.setState({
                                      conformation_for_deviation:e.target.checked
                                    })
                                   }}/>
                                  </div> */}
                                  </div>
                                   </div>

                                   <div className="error_message_new" style={{display:this.state.error_message_new=="" ? "none" : "block"}}>
                                      <p className="false_new_data">{this.state.error_message_new}</p>
                                   </div>


                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="secondary" onClick={ this.toggle_for_cheque }>Close</Button>
                                        { ' ' }
                                        <Button disabled={this.state.remaining_message!="" || this.state.conformation_for_deviation == false ? 'disabled':''} color="warning" style={{color:"#fff"}} onClick={() => this.validation_for_closed_policy()}>Yes</Button>
                                    </ModalFooter>
                                </Modal>



                        <Modal
                          style={{ width: '400px', height: 'auto', justifyContent: 'center', textAlign: 'center', alignItem: 'center', marginTop: '200px' }}
                          isOpen={this.state.AddCheque}
                          toggle={this.AddCheque}
                          className={this.props.className, "del_model"}
                          fade
                      >
                    <ModalBody style={{padding:"20px"}}>
                        <div style={{ width: '100%', height: '20px' }}>
                            <Button className="close" style={{ float: 'right' }} color="" onClick={this.AddCheque}>
                                <Icon name="x" />
                            </Button>
                        </div>
                        <div style={{ width: '100%', height: '70px' }}>
                          <h3 style={{marginBottom:"10px"}}>Cheque No :{" "} {this.state.new_cheque_no}</h3>
                          <p style={{marginBottom:"10px"}}>Are you sure you want to Add this Cheque No ?</p>

                        </div>
                        <div style={{ height: '45px', width: '100%' }}>


                            {'             '}
                            <Button style={{ marginRight: "20px"}} color="secondary"  onClick={this.AddCheque}>no</Button>
                            <Button color="warning" disabled={this.state.policy_dock_control == "false" ? 'disabled' : ''}
                                style={{color:"#fff"}}
                                onClick={() => {
                                    this.show_amount_function()

                                }}
                            >yes</Button>
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
