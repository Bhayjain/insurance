/**
 * External Dependencies
 */

 import './style.scss';
 import React, { Component, Fragment } from 'react';
 import { connect } from 'react-redux';
 import {Input, Button, Modal, ModalBody, ModalFooter,CustomInput,Label,Spinner,ButtonGroup,Table } from 'reactstrap';
 import PageTitle from '../../components/page-title';
 import DatePicker from '../../components/date-time-picker';
 import Select from 'react-select';
 import {
    addToast as actionAddToast,
} from '../../actions';
 /**
  * Internal Dependencies
  */
 import Snippet from '../../components/snippet';
 import Icon from '../../components/icon';
 import dateFormat from 'dateformat';
 import Cookies from 'js-cookie';
//  import { io } from "socket.io-client";
 import pdf_img from '../../images/pdf.png'
import excel_img from '../../images/txt-file.png'
import other_img from '../../images/google-docs.png'

import Lottie from 'react-lottie';
import animationData from '../../lottiesFiles/dot_notificarion.json'
import socket from '../Socket';

 /**
  * Component
  */

  const device_width =   window.innerWidth;
 var height =   window.innerHeight;
//  ////console.log("admin_screen.height", height);
 const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
//  ////console.log("admin_nav_height",nav_height);
 var my_height = height - nav_height;
 var gk = (my_height/2)-100;
//  ////console.log("admin_gk",gk);
 if(device_width < 600){
   var gk = (my_height/2) - 50;
 }

// // var api_url = "http://192.168.29.31:4090/"
// // var api_url = "http://173.249.5.10:3005/"
// var api_url = "https://api.bookyourinsurance.com:4092/"
// // var api_url = "https://demoapi.bookyourinsurance.com:4050/"


// var socket = io(api_url, {transport : ['WebSocket']});
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

 class Content extends Component {
     constructor( props ) {
         super( props );

         this.state = {
             modalOpen: false,
             heading_chaque:"Add Cheque",
             button_cheque:"Save",
             insurer_type:"",
             secondVal:new Date(),
             insurer_array: [],
             erroe_message:"",
             cheque_array:[],
             no_data_message:"none",
             isLoading:"block",
             cheque_spinner:"none",
             cheque_type:"Pre-Paid",
             cheque_array_single:[],
             ipad_width:"none",
             ipad_emp_list:"block",
             ipad_width_chat:"none",
             ipad_emp_list_chat:"block",
             policy_for_checque:[],
             total_policy_amount:0,
             cheque_amount:0,
             policy_array:[],
             AlertDeleteSingle: false,
             checked_policy: false,
             post_amount: "",
             accounting_control:Cookies.get('accounting_control'),
             tab_button:"Requested Cheques",
             cheque_request:false,
             multiple_file_array:[],
            users_cheque_requirement:[],
            single_cheque_requirement:[],
            cheque_requestmessage_data:"",
            loading:false,
         };
        //  this.fetch_all_insurer()
         this.fetch_all_cheque()
        //  this.new_message_cheque_requirement()
         this.toggle = this.toggle.bind( this );
         this.add_cheque = this.add_cheque.bind( this );
         this.AlertDeleteSingle = this.AlertDeleteSingle.bind( this );
     }

     toggle() {
         this.setState( ( prevState ) => ( {
             modalOpen: ! prevState.modalOpen,
             heading_chaque:"Add Cheque",
             button_cheque:"Save",
             insurer_type:"",
             secondVal:new Date(),
             company_name:"",
             cheque_no:"",
             cheque_amount:"",
             heading_chaque:"Add Cheque",
             button_cheque:"Save",
             erroe_message:"",
             policy_for_checque:[],

         } ) );
     }
     radioHandler = (insurer_type) => {
        //  ////console.log("insurer_type",insurer_type);
        this.setState({
             insurer_type:insurer_type,
             cheque_no:"",
             cheque_amount:"",
             company_name:"",
             erroe_message:""
         });

        this.fetch_type_wise_insurer(insurer_type)
    }

    AlertDeleteSingle(data) {
        // ////console.log("Data",data);
        this.setState( ( prevState ) => ( {
            AlertDeleteSingle: ! prevState.AlertDeleteSingle,
            insurer_type:data.cheque_type,
            cheque_id:data._id,
        } ) );
    }

    fetch_type_wise_insurer = (insurer_type)=>  {
        var params = {
            insurer_type:insurer_type,
        }
        console.log("params",params);
        const { settings } = this.props;
         const res = fetch(settings.api_url + "fetch_type_wise_insurer", {
             method: 'POST',
             body: JSON.stringify(params),
             headers: {
                 "Content-type": "application/json; charset=UTF-8",
             }
         }).then((response) => response.json())
             .then(json => {
                 console.log("fetch Inurer ****======", json)
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



    // fetch_all_insurer = ()=>  {
    //     const { settings } = this.props;
    //      const res = fetch(settings.api_url + "fetch_all_insurer", {
    //          method: 'POST',
    //          headers: {
    //              "Content-type": "application/json; charset=UTF-8",
    //          }
    //      }).then((response) => response.json())
    //          .then(json => {
    //             //  ////console.log("fetch Inurer ****", json)
    //              var data = json;
    //              if (data.status == true) {
    //                  this.setState({
    //                      insurer_array: data.data,
    //                  });
    //              }
    //              else {
    //                  this.setState({
    //                      insurer_array: [],

    //                  });
    //              }
    //          })
    //  }


    fetch_all_cheque = ()=>  {
        const { settings } = this.props;
        var params = {
            cheque_type:this.state.cheque_type,
        }
        console.log("Params Dtaa",params);
         const res = fetch(settings.api_url + "fetch_all_cheque", {
             method: 'POST',
             body: JSON.stringify(params),
             headers: {
                 "Content-type": "application/json; charset=UTF-8",
             }
         }).then((response) => response.json())
             .then(json => {
                //console.log("fetch Cheque ****", json)
                 var data = json;
                 if (data.status == true) {
                     this.setState({
                         cheque_array: data.data,
                         no_data_message:"none",
                         isLoading:"none",
                         cheque_spinner:"none"
                     });
                     if (device_width < 820) {
                        //////console.log("display lisit none");
                       }
                       else{
                        this.fetch_single_cheque(data.data[0]._id)
                       }
                 }
                 else {
                     this.setState({
                         cheque_array: [],
                         no_data_message:"block",
                         cheque_spinner:"none",
                         isLoading:"none"
                     });
                 }
             })
     }


  fetch_single_cheque = (cheque_id) => {
    const {settings } = this.props;
      const params = {
        cheque_id: cheque_id
      }
    //   ////console.log("params",params);
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
            console.log("fetch Single Cheque ****", json)
              if (data.status == true) {
                if (device_width < 820) {
                 var ipad_emp_list = "none";
                }
                else{
                var ipad_emp_list = "block"
                }
                  this.setState({
                      cheque_array_single: data.data,
                      cheque_id: data.data[0]._id,
                      cheque_spinner: 'none',
                      ipad_width:"block",
                      ipad_emp_list:ipad_emp_list,
                      tab_button:"Requested Cheques",
                      cheque_request:false
                  })
              }
              else {
                  this.setState({
                      cheque_array_single: [],
                      cheque_spinner: 'none',
                      tab_button:"Requested Cheques",
                     cheque_request:false
                  })
              }
          });
  }

     add_cheque() {
        const {
            addToast,settings
        } = this.props;

        if (this.state.insurer_type=="Pre-Paid") {
            var params = {
                cheque_type:this.state.insurer_type,
                company_id:this.state.company_name.value,
                date:this.state.secondVal.toISOString(),
                cheque_no:this.state.cheque_no,
                amount:Number(this.state.cheque_amount),
              }
        }
        else if (this.state.insurer_type=="Post-Paid") {
            var post_paid_policy = this.state.post_paid_policy

            if (post_paid_policy=="" || post_paid_policy == undefined) {
                var post_paid_policy_new =[]
            }
            else{

                var post_paid_policy_new = [{customer_name:post_paid_policy.customer_name,policy_number:post_paid_policy.policy_number,policy_id:post_paid_policy.value,policy_amount:post_paid_policy.gross_premium}]
                // var post_paid_policy_new = [{customer_name:post_paid_policy.customer_name,policy_number:post_paid_policy.policy_number,policy_id:post_paid_policy.value,gross_premium:post_paid_policy.gross_premium}]
            }

            var params = {
                cheque_type:this.state.insurer_type,
                company_id:this.state.company_name.value,
                date:this.state.secondVal.toISOString(),
                cheque_no:this.state.cheque_no,
                amount:Number(this.state.cheque_amount),
                policy_array:post_paid_policy_new
              }
        }
        else{
            var params = {
                cheque_type:this.state.insurer_type,
                company_id:this.state.company_name.value,
                date:this.state.secondVal.toISOString(),
                cheque_no:this.state.cheque_no,
                amount:Number(this.state.cheque_amount),
                policy_array:this.state.policy_array
              }
        }


        console.log("Add Cheque Params=============", params);
        if (params.cheque_type == "" || params.cheque_type == undefined || params.company_id == "" || params.company_id == undefined || params.cheque_no == "" || params.cheque_no == undefined) {
            this.setState({
                erroe_message:"Please Fill All the Feilds"
            })
        }
        else {
            const res = fetch(settings.api_url + "add_cheque", {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }).then((response) => response.json())
                .then(json => {
                    //console.log("Add Cheque **************************************", { params: params, response: json })
                    var data = json;
                    if (data.status == true) {
                        addToast({
                            title: 'Add my policy',
                            content: data["message"],
                            time: new Date(),
                            duration: 1000,
                        });
                        this.setState({
                          modalOpen:false,
                          insurer_type:"",
                          secondVal:new Date(),
                          company_name:"",
                          erroe_message:"",
                          cheque_no:"",
                          cheque_amount:"",
                          heading_chaque:"Add Cheque",
                          button_cheque:"Save"
                        });
                        this.fetch_all_cheque();
                    }
                    else {
                        this.setState({
                            modalOpen:true,
                            erroe_message:data["message"],
                            // insurer_type:"",
                            // secondVal:new Date(),
                            // company_name:"",
                            // cheque_no:"",
                            // cheque_amount:"",
                            // heading_chaque:"Add Cheque",
                            // button_cheque:"Save"
                          });
                        addToast({
                            title: 'Add my policy',
                            content: data["message"],
                            time: new Date(),
                            duration: 1000,
                        });
                    }
                })
        }

    }

    edit_cheque=(value)=>{
        // ////console.log("value******",value);
        var company_name={
            value:value.insurer_details[0]._id,
            label:value.insurer_details[0].insurer_name,
            insurer_type:value.insurer_details[0].insurer_type,
        }
        // ////console.log("company_name",company_name);
        this.setState({
            modalOpen:true,
            insurer_type:value.cheque_type,
            cheque_id:value._id,
            secondVal:new Date(value.date),
            company_name:company_name,
            cheque_no:value.cheque_no,
            cheque_amount:value.amount,
            heading_chaque:"Update Cheque",
            button_cheque:"Update",
            erroe_message:""
        })
    }

    switch_fuunction=()=>{
        if (this.state.button_cheque=="Save") {
            console.log("adddd");
            this.add_cheque()
        }else{
            console.log("llllllllllllll");
            this.update_cheque()
        }
    }

    update_cheque() {
      this.setState({
        loading:true
      })
        const {
            addToast,settings
        } = this.props;

            var params = {
                cheque_type:this.state.insurer_type,
                cheque_id:this.state.cheque_id,
                company_id:this.state.company_name.value,
                date:this.state.secondVal.toISOString(),
                cheque_no:this.state.cheque_no,
                amount:Number(this.state.cheque_amount),
              }



        console.log("Update Cheque Params", params);

        // else {
            const res = fetch(settings.api_url + "update_cheque", {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }).then((response) => response.json())
                .then(json => {
                    console.log("Add Cheque **************************************", { params: params, response: json })
                    var data = json;
                    if (data.status == true) {
                        addToast({
                            title: 'Add my policy',
                            content: data["message"],
                            time: new Date(),
                            duration: 1000,
                            loading:false,
                        });
                        this.setState({
                          modalOpen:false,
                          insurer_type:"",
                          secondVal:new Date(),
                          company_name:"",
                          cheque_no:"",
                          erroe_message:"",
                          cheque_amount:"",
                          heading_chaque:"Add Cheque",
                          button_cheque:"Save"
                        });
                        this.fetch_single_cheque(this.state.cheque_id);
                    }
                    else {
                        console.log("elseeeeeeeeeeeeee");
                        this.setState({
                            modalOpen:true,
                            erroe_message:data["message"],

                          });
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


    delete_cheque() {
        const {
            addToast,settings
        } = this.props;

            var params = {
                cheque_type:this.state.insurer_type,
                cheque_id:this.state.cheque_id,
              }
        console.log("Delete Cheque Params", params);
            const res = fetch(settings.api_url + "delete_cheque", {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }).then((response) => response.json())
                .then(json => {
                    // ////console.log("Delete Cheque **************************************", { params: params, response: json })
                    var data = json;
                    if (data.status == true) {
                        addToast({
                            title: 'Add my policy',
                            content: data["message"],
                            time: new Date(),
                            duration: 1000,
                        });
                        this.setState({
                            AlertDeleteSingle:false,
                        });
                        this.fetch_all_cheque();
                    }
                    else {
                        this.setState({
                           AlertDeleteSingle:false,
                          });
                        addToast({
                            title: 'Add my policy',
                            content: data["message"],
                            time: new Date(),
                            duration: 1000,
                        });
                    }
                })

    }

    fetch_policy_for_cheque=(company_id,insurer_paid_type)=>{
        const {
            addToast,settings
        } = this.props;

        var params = {
          company_id:company_id,
          insurer_paid_type:insurer_paid_type
        }
        console.log("Fetch Cheque for policy Params", params);


            const res = fetch(settings.api_url + "fetch_policy_for_cheque", {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }).then((response) => response.json())
                .then(json => {
                   console.log("Fetch for policy Cheque **************************************", { params: params, response: json })
                    var data = json;
                    if (data.status == true) {

                    //     for(var i=0; i < data.data.length; i++){

                    //         var num = policy_amount[i] + policy_amount[i]
                    // }​

                    var policy_length =data.data
                    // ////console.log("policy_length",policy_length);

                    var sum = 0;

                    for(var i=0; i < policy_length.length; i++){
                        var element = Number(policy_length[i].section_details[0].gross_premium)
                        sum += parseInt(element);
                    }
                    //console.log("num**********",sum);
                        this.setState({
                            policy_for_checque:data.data,
                            erroe_message:"",
                            total_amount_of_cheque:sum
                        })
                    }
                    else {
                        this.setState({
                            policy_for_checque:[],
                            erroe_message:"No Policy Available For this Insurer"
                        })
                    }
                })

    }

    toggleCheckbox=(e,value,index)=>{
        // ////console.log("e.target.checked",e.target.checked);
        //console.log("value========",value);
        // ////console.log("index",index);
        var policy_amount_new=0
        var my_array=[]
        if (e.target.checked==true) {
             policy_amount_new = +value.section_details[0].gross_premium
            //  policy_amount_new = +value.policy_amount
             //console.log("policy_amount_new====",policy_amount_new);
             //console.log("total_policy_amount====",this.state.total_policy_amount);
                var total_amount = this.state.total_policy_amount+policy_amount_new
                //console.log("total_amount========",total_amount);
                var my_new_array={customer_name:value.name,policy_number:value.section_details[0].policy_number, policy_id: value._id, policy_amount: Number(value.section_details[0].gross_premium)}
                //console.log("my_new_array*************",my_new_array);
                var tttt = this.state.policy_array
                tttt.push(my_new_array)
                // ////console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT",tttt);
                // ////console.log("nee***********",nee);
                // ////console.log("nee***********",nee);
             this.setState({
                total_policy_amount: total_amount,
                cheque_amount: total_amount,
                total_amount_of_cheque: total_amount,
                policy_array: tttt
             })
            // setTimeout(() => { ////console.log("this is the first message", this.state.policy_array) }, 1000);

        }else{
            policy_amount_new = +value.section_details[0].gross_premium
            // policy_amount_new = +value.policy_amount
            // ////console.log("policy_amount_new",policy_amount_new);
               var total_amount = this.state.total_policy_amount-policy_amount_new
            //    ////console.log("total_amount",total_amount);

               var my_new_array={customer_name:value.name,policy_number:value.section_details[0].policy_number, policy_id: value._id, policy_amount: Number(value.section_details[0].gross_premium)}
            //    ////console.log("my_new_array*************",my_new_array);
            //    var tttt = this.state.policy_array
            //    tttt.splice(tttt.indexOf(my_new_array))
            //    ////console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT",tttt);

            //    selectedValuesArr.splice(selectedValuesArr.indexOf(event.target.value), 1);

            this.delete_cheque_new(my_new_array)

            this.setState({
               total_policy_amount: total_amount,
               cheque_amount: total_amount,
               total_amount_of_cheque: total_amount,
            //    policy_array: tttt
            })
        }
        // setTimeout(() => { ////console.log("this is the first message", this.state.policy_array) }, 1000);

    }
    delete_cheque_new=(value)=>{
        //console.log("VALUE",value);

        var name = value.policy_id
        var policy_array = this.state.policy_array
         //console.log("policy_array*****************************=============",policy_array);
            var array = policy_array
            for(var i=0; i<policy_array.length; i++){
            if(policy_array[i].policy_id == name ){
                //console.log("iiiiiii",i,1);
                policy_array.splice(i, 1)
             //console.log(policy_array,"kkkkkkkkkkkkkkkkkkkkkkkkk");
            }
            else{
             //console.log("ESLSEEEEEEEEEEEEEee");
            }

            }
            this.setState({
                policy_array:policy_array
            })
   }

   swich_tab=()=>{
       if (this.state.tab_button == "Requested Cheques") {
           this.setState({
               cheque_request : true,
               tab_button:"Back"
           })
           this.fetch_all_users_cheque_requirement()
           this.new_message_cheque_requirement()
       }else{
        this.setState({
            cheque_request : false,
            tab_button:"Requested Cheques"
        })
        this.new_message_cheque_requirement()
        this.fetch_single_cheque_requirement(this.state.cheque_req_id)
       }
   }

   componentDidMount(){
    socket.on('cheque_requirement_message_response', (data) => {
        this.new_message_cheque_requirement()
        // this.fetch_single_cheque_requirement()
       })
    socket.on('cheque_requirement_attachment_response', (data) => {
        this.new_message_cheque_requirement()
        // this.fetch_single_cheque_requirement()
       })
   }


   fetch_all_users_cheque_requirement=()=>{
    console.log("OOOo");
        socket.emit('fetch_all_users_cheque_requirement');
         socket.on('fetch_all_users_cheque_requirement_response', (data)=>{
        //   console.log('inside fetch_all_users_cheque_requirement =============',data);
          if(data.data.status==true){
            this.setState({
                users_cheque_requirement:data.data.data,
                cheque_req_id:data.data.data[0]._id,
              })

              if (device_width < 820) {
                //////console.log("display lisit none");
               }
               else{
                this.fetch_single_cheque_requirement(data.data.data[0]._id)
               }


          }
          else{
            this.setState({
                users_cheque_requirement:[],
              })
          }
    })
  }

  fetch_single_cheque_requirement=(cheque_requirement_id,search)=>{
    // console.log("OOOo");
    if (search == undefined || search == "") {
        var search_new = undefined
    }else{
        var search_new = search
    }
    var params = {
        cheque_requirement_id:cheque_requirement_id,
        search:search_new
    }
    console.log("cheque_requirement_id Pramssss",params);
        socket.emit('fetch_single_cheque_requirement',params);
         socket.on('fetch_single_cheque_requirement_response', (data)=>{
         console.log('inside fetch_single_cheque_requirement =============$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$',data);
          if(data.data.status==true){

            if (device_width < 820) {
                var ipad_emp_list = "none";
               }
               else{
               var ipad_emp_list = "block"
               }

            var users_cheque_requirement = this.state.users_cheque_requirement

            for (let pk = 0; pk < users_cheque_requirement.length; pk++) {
                if(users_cheque_requirement[pk]._id == data.data.data[0]._id){
                 users_cheque_requirement[pk].new_message =false
                //  users_cheque_requirement[pk].new_message = data.data.data[0].new_message
                }
               }
            //    console.log("users_cheque_requirement*****************",users_cheque_requirement);

            if (search == "" || search == undefined) {
                // //console.log("message_array_12333",this.state.message_array_12333);
                var message_array_new = data.data.data[0].conversation;
                for (let i = 0; i < message_array_new.length; i++) {
                    message_array_new[i].show_message_data= message_array_new[i].message
                }
                this.setState({
                    single_cheque_requirement:message_array_new

                })
            }else{
                var message_array_new = data.data.data[0].conversation;
                for (let i = 0; i < message_array_new.length; i++) {
                    if(message_array_new[i].message_from == 'account_to_oe' || message_array_new[i].message_from == 'oe_to_account'){
                        if (message_array_new[i].search_result == true) {
                            console.log("search_______________*************",search);
                            const element = message_array_new[i].message;
                            console.log("element_______________*************",element);

                            let res = element;
                            const req = search;
                            if (req) {
                              const normReq = req
                                .toLowerCase()
                                .replace(/\s+/g, " ")
                                .trim()
                                .split(" ")
                                .sort((a, b) => b.length - a.length);
                              res = res.replace(
                                new RegExp(`(${normReq.join("|")})`, "gi"),
                                match => "<strong class= 'highlighted'>" + match + "</strong>"
                              );
                            }
                            message_array_new[i].show_message_data= res
                            // //console.log("reddddddd",res);
                            this.setState({
                                message_array_12333:res,
                            })
                        }

                    }

                    // //console.log("message_array_12333",this.state.message_array_12333);
                }
                // //console.log("message_array_new",message_array_new);
                this.setState({
                    single_cheque_requirement:message_array_new,
                    color_1:"black"
                })
            }


            this.setState({

                users_cheque_requirement:users_cheque_requirement,
                cheque_req_id:data.data.data[0]._id,
                to_id:data.data.data[0].from_id,
                cheque_spinner:"none",
                ipad_width_chat:"block",
                ipad_emp_list_chat:ipad_emp_list,
              })
            //   this.new_message_cheque_requirement()
            this.read_account_message(cheque_requirement_id)
          }
          else{
            this.setState({
                single_cheque_requirement:[],
                cheque_spinner:"none"
              })
          }
    })
  }


  read_account_message=(cheque_requirement_id)=>{
      var params= {
          cheque_requirement_id:cheque_requirement_id
        }
        // console.log("read_account_message&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&((((((((((((((((((((((((((((((",params);
        socket.emit('read_account_message',params);
  }

  fileToDataUri = (image) => {
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
      newImagesPromises.push(this.fileToDataUri(e.target.files[i]))
    }
    const newImages = await Promise.all(newImagesPromises)
    // setImages([...images, ...newImages])

    this.setState({
      multiple_file_array: newImages
    })
     setTimeout(() => {console.log("this is the first message", this.state.multiple_file_array) }, 1000);
    // this.cheque_requirement_attachment(newImages)
    this.account_cheque_requirement_message()
  }
}

  account_cheque_requirement_message=()=>{
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

        if (this.state.multiple_file_array == "" || this.state.multiple_file_array == undefined) {
          var message_data = this.state.cheque_requestmessage_data
          var message_image =  ""
        }else{
            var message_data = ""
            var message_image =  this.state.multiple_file_array
        }
        var conv_param = {
            message:message_data,
            from_id:usercookies,
            date_time:my_new_date,
            message_image:message_image,
            message_from:"account_to_oe",
            to_id:this.state.to_id,
        }

        console.log("Cheque_re",conv_param);

        socket.emit('account_cheque_requirement_message', conv_param);
        socket.on('account_cheque_requirement_message_response', (data)=>{
          console.log('inside account_cheque_requirement_message =============',data);

          if(data.data.status==true){
            this.setState({
              cheque_requestmessage_data:"",
              multiple_file_array:[],
              })
          this.fetch_single_cheque_requirement(this.state.cheque_req_id)
          }
          else{
            this.setState({
                cheque_requestmessage_data:"",
                multiple_file_array:[],
                })
          }
    })
  }


  new_message_cheque_requirement=()=>{

    var params = {
        hitted_from:'account',
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

     render() {
        var insurer_array = this.state.insurer_array.map(item => {
            return {
                value: item._id,
                label: item.insurer_name,
                insurer_type: item.insurer_type
            }
        });


        var post_policy = this.state.policy_for_checque.map(item => {
            return {
                value: item._id,
                label: item.name+ " " + "-" +" " + item.section_details[0].policy_number + " " + "-" +" " + new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR'
                  }).format(item.section_details[0].gross_premium),
                  customer_name:item.name,
                  policy_number:item.section_details[0].policy_number,
                  gross_premium:item.section_details[0].gross_premium,
            }
        });

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


              <PageTitle className="chech_heading">
                <div className="row marr_rihjh">
                 <div className="col-lg-7 col-md-6" style={{display:"inline-flex"}}>
                 <h1>Cheques</h1>
                 <Button color="" style={{color:"#fff",backgroundColor:"#590b88",border:"#590b88",textTransform: "capitalize",marginLeft:"16px",paddingRight:this.state.new_mess_chq == true && this.state.tab_button == "Requested Cheques"  ? "5px":""}} onClick={()=>this.swich_tab() }>{this.state.tab_button}
                 <span className="" style={{display:this.state.new_mess_chq == true && this.state.tab_button == "Requested Cheques" ? "inline-flex" :"none"}}>
                 <Lottie
                    options={defaultOptions}
                    height={18}
                    width={32}
                />
                  </span>
                     </Button>
                 </div>
                 <div className="col-lg-5 col-md-6 margin_left">
                                         <input
                                        type="text"
                                        style={{marginRight:"12px",display:this.state.tab_button == "Requested Cheques" ? "none" :"block"}}
                                        className="form-control my_search_message support_2 meassge_dta_1"
                                        aria-describedby="emailHelp"
                                        placeholder="Search Messages"
                                        value={this.state.search_message}
                                        onChange={(e) => {
                                         this.setState({
                                            search_message:e.target.value
                                         })
                                         this.fetch_single_cheque_requirement(this.state.cheque_req_id,e.target.value)
                                        //  this.searchFilter_1(e.target.value)

                                        }}
                                    />



                     <Button color="warning" disabled={this.state.accounting_control == "false" ? 'disabled' : ''} style={{color:"#fff",textTransform: "capitalize",whiteSpace:"nowrap"}} onClick={ this.toggle }> Add Cheque</Button>
                     <div className="" style={{display: device_width < 769 ? this.state.ipad_width : "block"}}>
                                  <Button color="info" className="backk_btnnn" style={{marginLeft:"10px", textTransform:"capitalize", display: device_width < 769 ? "inline-flex" : "none"}}
                                    onClick={() => {
                                    this.setState({
                                        ipad_emp_list:"block",
                                        ipad_width:"none"
                                    })
                                    }}>Back</Button>
                                    </div>
                     <div className="" style={{display: device_width < 769 ? this.state.ipad_width_chat : "block"}}>
                                  <Button color="info" className="backk_btnnn" style={{marginLeft:"10px", textTransform:"capitalize", display: device_width < 769 ? "inline-flex" : "none"}}
                                    onClick={() => {
                                    this.setState({
                                        ipad_emp_list_chat:"block",
                                        ipad_width_chat:"none"
                                    })
                                    }}>Out</Button>
                                    </div>
                </div>

                </div>
             </PageTitle>

 <div className="all_cheque_data test_collapse" style={{display:this.state.cheque_request == true ? "none" :"block"}}>
     <Spinner color="warning" className="lead_spinner" style={{marginTop: gk, display: this.state.isLoading }} />
      <div style={{display:this.state.isLoading=="none" ? "block":"none"}}>
         <div className="row marr_rihjh test_collapse">
             <div className="col-lg-4 col-md-12 height_sales" style={{paddingRight:"0px",display: this.state.ipad_emp_list}}>
                <div>
                    <div className="grup_btn_neww">
                                <ButtonGroup>
                                    <Button
                                    className="pre_paid_btn"
                                    style={{backgroundColor:this.state.cheque_type=="Pre-Paid" ? "#4B8178" : "", color:this.state.cheque_type=="Pre-Paid" ? "#fff" : "",borderColor:this.state.cheque_type=="Pre-Paid" ? "#4B8178" : "",fontSize: "12px"}}
                                    onClick={() => {
                                                    this.setState({
                                                    cheque_type: 'Pre-Paid',
                                                    cheque_spinner: 'block'
                                                    })
                                                    setTimeout(() => {
                                                        this.fetch_all_cheque()
                                                        }, 0)
                                                }}>Pre-Paid</Button>
                                    <Button
                                    className="post_paid_btn"
                                    style={{backgroundColor:this.state.cheque_type=="Post-Paid" ? "#fdbf21" : "", color:this.state.cheque_type=="Post-Paid" ? "#fff" : "",borderColor:this.state.cheque_type=="Post-Paid" ? "#fdbf21" : "",fontSize: "12px"}}
                                    onClick={() => {
                                                    this.setState({
                                                    cheque_type: 'Post-Paid',
                                                    cheque_spinner: 'block'
                                                    })
                                                    setTimeout(() => {
                                                        this.fetch_all_cheque()
                                                        }, 0)
                                                }}>Post-Paid</Button>
                                    <Button
                                    className="day_paid_btn"
                                    style={{backgroundColor:this.state.cheque_type=="Day End Receipting" ? "#007bff" : "", color:this.state.cheque_type=="Day End Receipting" ? "#fff" : "",borderColor:this.state.cheque_type=="Day End Receipting" ? "#007bff" : "",fontSize: "12px"}}
                                    onClick={() => {
                                                    this.setState({
                                                    cheque_type: 'Day End Receipting',
                                                    cheque_spinner: 'block'
                                                    })
                                                    setTimeout(() => {
                                                        this.fetch_all_cheque()
                                                        }, 0)
                                                }}>Day End Receipting</Button>
                                </ButtonGroup>
                         </div>

                                <div className="fiest_div mycalendar test_collapse" style={{height:my_height-119}}>
                                <div className="table-responsive-lg" style={{display: this.state.no_data_message=="none" ? "block" :"none"}}>
                                    <table className="table table-striped tablellll test_collapse">
                                                <thead>
                                                    <tr className="trrr">
                                                        <th className="heading" scope="col" style={{padding:"10px 25px"}}>Cheque No</th>
                                                        <th className="heading" scope="col" style={{padding:"10px 25px"}}>Date</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {this.state.cheque_array.map((v, i) => {
                                                return (
                                                    <tr style={{ cursor: 'pointer' }} key={i} onClick={() => {
                                                        this.setState({
                                                            cheque_spinner: 'block'
                                                        })
                                                            setTimeout(() => {
                                                            this.fetch_single_cheque(v._id)
                                                        }, 0)
                                                    }}>


                                                        <td className="vertical_midd" style={{borderLeft:this.state.cheque_id == v._id ? "8px solid #4B8178" :"",padding:"5px 25px",display:v.cheque_type=="Pre-Paid" ? "table-cell" :"none"}}>{v.cheque_no}</td>
                                                        <td className="vertical_midd" style={{borderLeft:this.state.cheque_id == v._id ? "8px solid #8bc240" :"",padding:"5px 25px",display:v.cheque_type=="Post-Paid" ? "table-cell" :"none"}}>{v.cheque_no}</td>
                                                        <td className="vertical_midd" style={{borderLeft:this.state.cheque_id == v._id ? "8px solid rgb(0, 123, 255)" :"",padding:"5px 25px",display:v.cheque_type=="Day End Receipting" ? "table-cell" :"none"}}>{v.cheque_no}</td>
                                                        <td className="vertical_midd" style={{padding:"5px 25px"}}>{dateFormat(new Date(v.date.replace("Z", "")), "dd-mm-yyyy") }</td>
                                                    </tr>
                                                )
                                            })}
                                    </tbody>
                                </table>
                                </div>
                          </div>
                    </div>
               </div>

             <div className="col-lg-8 col-md-12 test_collapse"  style={{display: device_width < 769 ? this.state.ipad_width : "block"}}>
             <Spinner color="warning" className="agent_spinner" style={{ marginTop: gk, display: this.state.cheque_spinner }} />
             <div style={{display:this.state.cheque_spinner=="none" ? "block":"none"}}>
             <h3 style={{ display: this.state.no_data_message, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:gk}}>No Data Found</h3>
                <div className="no_data_start test_collapse" style={{display: this.state.no_data_message=="none" ? "block" :"none"}}>
                    {this.state.cheque_array_single.map((value,index)=>{
                        return(
                            <div key={index} className="padding_class">
                                    <div className="chequeeeee_data">
                                    <h3>Cheque No:{" "}{value.cheque_no} </h3>
                                    <Button color="success" disabled={this.state.accounting_control == "false" ? 'disabled' : ''} style={{display:value.cheque_type=="Post-Paid" ||value.cheque_type == "Day End Receipting" || value.used_amount !=0 ? "none":"inline-flex",textTransform: "capitalize"}} onClick={() => { this.edit_cheque(value) }}>Update</Button>
                                    {/* <Button color="danger" disabled={this.state.accounting_control == "false" ? 'disabled' : ''} style={{display:value.cheque_type=="Pre-Paid" ? "none":"inline-flex",textTransform: "capitalize"}} onClick={() => { this.AlertDeleteSingle(value) }}>Delete</Button> */}
                                    </div>
                                <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-12" style={{ display: "inline-flex" }}>
                                    <div className="mobile desi" style={{ width: "130px", whiteSpace: "nowrap" }}>Company Name</div>:
                                    <span style={{ marginLeft: "11px" }}>{value.insurer_details[0].insurer_name}</span>
                                </div>

                                <div className="col-lg-6 col-md-6 col-sm-12" style={{ display: "inline-flex" }}>
                                    <div className="mobile desi use_amountt" style={{ width: value.cheque_type=="Post-Paid"? "45px": "100px", whiteSpace: "nowrap" }}>Date</div>:
                                    <span className="for_new_data" style={{ marginLeft: "11px",whiteSpace:"nowrap" }}>{dateFormat(new Date(value.date.replace("Z", "")), "dd-mm-yyyy") }</span>
                                </div>


                                <div className="col-lg-6 col-md-6 col-sm-12" style={{ display: "inline-flex" }}>
                                    <div className="mobile desi amount_widthh" style={{ width: "130px", whiteSpace: "nowrap" }}>Amount</div>:
                                    <span style={{ marginLeft: "11px" }}>&#x20b9; {value.amount }</span>
                                </div>


                                <div className="col-lg-6 col-md-6 col-sm-12 " style={{ display:value.cheque_type=="Post-Paid"|| value.cheque_type=="Day End Receipting" ? "none": "inline-flex"}}>
                                    <div className="mobile desi use_amountt" style={{ width: "100px", whiteSpace: "nowrap" }}>Used Amount</div>:
                                    <span style={{ marginLeft: "11px" }}>&#x20b9; {value.used_amount }</span>
                                </div>

                                <div className="col-lg-6 col-md-6 col-sm-12" style={{ display:value.cheque_type=="Post-Paid" || value.cheque_type=="Day End Receipting" ? "none": "inline-flex" }}>
                                    <div className="mobile desi" style={{ width: "130px", whiteSpace: "nowrap" }}>Balanced Amount</div>:
                                    <span style={{ marginLeft: "11px" }}>&#x20b9; {value.balance_amount }</span>
                                </div>

                                <div className="col-lg-12 col-md-12 col-sm-12" style={{ display:(value.cheque_type=="Post-Paid" || value.cheque_type=="Day End Receipting") && value.policy_array !=undefined ? "block": "none",marginTop:"40px" }}>
                                    <h3 className="policy_for_ch" style={{marginBottom:"10px"}}>Policies for the Cheque</h3>

                                    <div className="table-responsive-lg">
                                    <Table bordered>
                                    <thead>
                                        <tr>
                                            <th scope="col" style={{padding:"10px 25px",verticalAlign: "middle"}}>Customer Name</th>
                                            <th scope="col" style={{padding:"10px 25px",verticalAlign: "middle"}}>Policy Number</th>
                                            <th scope="col" style={{padding:"10px 25px",verticalAlign: "middle",textAlign:"end"}}>Policy Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {value.policy_array ? value.policy_array.map((v,i)=>{
                                            return(
                                                <tr key={index}>
                                                <td style={{padding:"5px 25px",verticalAlign: "middle"}}>{v.customer_name} </td>
                                                <td style={{padding:"5px 25px",verticalAlign: "middle"}}>{v.policy_number}</td>
                                                <td style={{padding:"5px 25px",verticalAlign: "middle",textAlign:"end"}}>&#x20b9;{v.policy_amount}</td>
                                            </tr>
                                                    )
                                                }):null}

                                     </tbody>
                                 </Table>
                                </div>

                                    {/* {value.policy_array ? value.policy_array.map((v,i)=>{
                                        return(
                                            <div key={i}>

                                            </div>
                                        )
                                    }):null} */}
                                </div>

                                </div>

                            </div>
                        )
                    })}
                </div>
             </div>
             </div>
         </div>
      </div>
 </div>



 <div className="all_cheque_data test_collapse" style={{display:this.state.cheque_request == true ? "block" :"none"}}>
     <Spinner color="warning" className="lead_spinner" style={{marginTop: gk, display: this.state.isLoading }} />
      <div style={{display:this.state.isLoading=="none" ? "block":"none"}}>
         <div className="row marr_rihjh test_collapse">
             <div className="col-lg-3 col-md-12 height_sales" style={{paddingRight:"0px",display: this.state.ipad_emp_list_chat}}>
                <div>
                                <div className="fiest_div mycalendar test_collapse" style={{height:my_height-119}}>
                                <div className="table-responsive-lg" style={{display: this.state.no_data_message=="none" ? "block" :"none"}}>
                                    <table className="table table-striped tablellll test_collapse">
                                                <thead>
                                                    <tr className="trrr">
                                                        <th className="heading" scope="col" style={{padding:"10px 25px"}}>Operation Executive</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {this.state.users_cheque_requirement.map((v, i) => {
                                                return (
                                                    <tr style={{ cursor: 'pointer' }} key={i} onClick={() => {
                                                        this.setState({
                                                            cheque_spinner: 'block'
                                                        })
                                                            setTimeout(() => {
                                                            this.fetch_single_cheque_requirement(v._id)
                                                        }, 0)
                                                    }}>


                                                        <td className="vertical_midd" style={{borderLeft:this.state.cheque_req_id == v._id ? "8px solid #8bc240" :"",padding:"5px 25px"}}>{v.from_name}
                                                         <span className="" style={{display:v.new_message == true  ? "inline-flex" :"none"}}>
                                                            <Lottie
                                                                options={defaultOptions}
                                                                height={25}
                                                                width={32}
                                                            />
                                                            </span>
                                                      </td>
                                                </tr>
                                                )
                                            })}
                                    </tbody>
                                </table>
                                </div>

                                </div>



                </div>
             </div>

             <div className="col-lg-9 col-md-12 test_collapse"  style={{display: device_width < 769 ? this.state.ipad_width_chat : "block",paddingRight:"28px"}}>
             <Spinner color="warning" className="agent_spinner" style={{ marginTop: gk, display: this.state.cheque_spinner }} />
             <div style={{display:this.state.cheque_spinner=="none" ? "block":"none"}}>
             <div className="meesage_div_new mycalendar_message" style={{height:my_height-159,marginTop:"10px"}}>

                    {this.state.single_cheque_requirement.map((value, index) => {

                    return (
                        <div style={{ width: "100%" }} key={index}>
                            <div className={value.message_from == "account_to_oe" ? 'overclass_user overclass_user_neww' : 'overclass_admin'} style={{ float: value.message_from == "account_to_oe" ? "right" : "left",paddingLeft: "13px" }}>
                            <div style={{display:value.message_type=="message" ? "block" :"none"}}>
                                <div className={value.message_from == "account_to_oe" ? 'grey_msg_new_dock' : 'purple_msg'}>
                                {/* <div className={value.message_from == "account_to_oe" ? 'grey_msg_new_dock' : 'purple_msg'} style={{background:value.message_from == "account_to_oe" ? '#f8f9fa' : this.state.color_code}}> */}
                                    <span dangerouslySetInnerHTML={{ __html: value.show_message_data}}></span>
                                </div>
                            </div>




                            <div style={{display:value.message_type=="attachment" ? "block" :"none"}}>
                            {value.image_array ?   value.image_array.map((v1,i1)=>{
                                return(
                                <div className={value.message_from == "account_to_oe" ? 'grey_msg_imgg' : 'purple_msg_imgg'} key={i1}>
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
                            <div style={{ float: value.message_from == "account_to_oe" ? 'right' : 'left', width: "100%" }} className="ggg">
                                    <span style={{ float: value.message_from == "account_to_oe" ? 'right' : 'left', fontSize: "10px", color: "#ababab" }}>
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
                    {/* <input type="file" id="fileInput" multiple={this.props.multiple} onChange={this.uploadImage} style={{display:"none"}}/> */}
                    <label className="lord_111" htmlFor="fileInput">
                    <Icon name="paperclip" className="paperclissNew1"/>
                            </label>
                    <Button color="warning" className="send_button_new"
                    disabled={this.state.policy_dock_control == "false" ? 'disabled' : ''}
                    onClick={() => {
                        this.account_cheque_requirement_message()
                    }}>Send</Button>
                    </div>
             </div>
             </div>
         </div>
      </div>
 </div>

                   <Modal
                        isOpen={ this.state.modalOpen }
                        toggle={ this.toggle }
                        className={ this.props.className,"modal-dialog-centered  cheque_model" }
                        fade
                     >
                        <div className="modal-header">
                            <h5 className="modal-title h2">{this.state.heading_chaque}</h5>
                            <Button className="close" color="" onClick={ this.toggle }>
                                <Icon name="x" />
                            </Button>
                        </div>
                        <ModalBody>
                        <div className="row">
                        <div className="col-lg-9 col-md-9 col-sm-12" style={{display:this.state.heading_chaque=="Update Cheque" ?"none" :"block"}}>
                               <Label className="upload_file_1">Cheque Type</Label>
                               <div className="innnnn_type">
                               <CustomInput type="radio" id="formRadio1" name="formRadio" label="Post-Paid" defaultChecked={this.state.insurer_type === "Post-Paid"} onClick={(e) => this.radioHandler("Post-Paid")} />
                               <CustomInput type="radio" id="formRadio2" name="formRadio" label="Pre-Paid" defaultChecked={this.state.insurer_type === "Pre-Paid"} onClick={(e) => this.radioHandler("Pre-Paid")} />
                               <CustomInput type="radio" id="formRadio3" name="formRadio" label="Day End Receipting" defaultChecked={this.state.insurer_type === "Day End Receipting"} onClick={(e) => this.radioHandler("Day End Receipting")} />
                               {/* <CustomInput type="radio" id="formRadio3" name="formRadio" label="Day End Receipting" defaultChecked={this.state.insurer_type === "Day End Receipting"} onClick={(e) => this.radioHandler("Day End Receipting")} /> */}
                                </div>
                         </div>
                         </div>

                    {/* Pre-Paid */}
                    <div style={{display:this.state.insurer_type === "Pre-Paid" ? "block" :"none"}}>
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12 top_diff" style={{display:"grid"}}>
                        <Label className="upload_file_1">Date</Label>
                                <DatePicker
                                selected={ this.state.secondVal }
                                onChange={ ( val ) => {
                                    this.setState( {
                                        secondVal: val,
                                    } );
                                } }
                                placeholder="Select date"
                                dateFormat="dd-MM-yyyy"
                                className="rui-datetimepicker form-control w-auto"
                            />
                         </div>

                         <div className="col-lg-6 col-md-6 col-sm-12 top_diff">
                                   <Label className="upload_file_1">Company Name </Label>
                                  <Select
                                        isOptionDisabled={(option) => this.state.heading_chaque=="Update Cheque" ? 'option.disabled' : '' }
                                        value = {this.state.company_name}
                                        onChange={(e) => {
                                            // ////console.log(e, "Val.....")
                                            this.setState({
                                                company_name: e
                                            });
                                        }}
                                        placeholder="Select..."
                                        className="contact_sort"
                                        options={ insurer_array }
                                        styles={ customStyles }
                                    />
                               </div>


                        <div className="col-lg-6 col-md-6 col-sm-12 top_diff">
                                   <Label className="upload_file_1">Cheque No</Label>
                                   <input type="text"
                                        className="form-control"
                                        placeholder="Cheque No"
                                        value={this.state.cheque_no}
                                        onChange={(e) => {
                                            this.setState({
                                                cheque_no: e.target.value,
                                            });
                                        }}
                                    />

                               </div>


                        <div className="col-lg-6 col-md-6 col-sm-12 top_diff">
                                   <Label className="upload_file_1">Amount</Label>
                                   <input type="number"
                                        className="form-control"
                                        placeholder="Amount"
                                        value={this.state.cheque_amount}
                                        onChange={(e) => {
                                            this.setState({
                                                cheque_amount: e.target.value,
                                            });
                                        }}
                                    />

                               </div>

                               <div className="col-lg-12 col-md-12 col-sm-12 top_diff" style={{display:this.state.erroe_message !="" ? "block" :"none"}}>
                                    <p className="no_data_no">{this.state.erroe_message} </p>
                                </div>


                            </div>
                       </div>

                     {/* Post-Paid */}

                    <div style={{display:this.state.insurer_type === "Post-Paid" ? "block" :"none"}}>
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12 top_diff" style={{display:"grid"}}>
                        <Label className="upload_file_1">Date</Label>
                                <DatePicker
                                selected={ this.state.secondVal }
                                onChange={ ( val ) => {
                                    this.setState( {
                                        secondVal: val,
                                    } );
                                } }
                                placeholder="Select date"
                                dateFormat="dd-MM-yyyy"
                                className="rui-datetimepicker form-control w-auto"
                            />
                         </div>

                         <div className="col-lg-6 col-md-6 col-sm-12 top_diff">
                                   <Label className="upload_file_1">Company Name</Label>
                                  <Select
                                       isOptionDisabled={(option) => this.state.heading_chaque=="Update Cheque" ? 'option.disabled' : '' }
                                        value = {this.state.company_name}
                                        onChange={(e) => {
                                            // ////console.log(e, "Val.....")
                                            this.setState({
                                                company_name: e
                                            });
                                            this.fetch_policy_for_cheque(e.value,"Post-Paid")
                                        }}
                                        placeholder="Select..."
                                        className="contact_sort"
                                        options={ insurer_array }
                                        styles={ customStyles }
                                    />
                          </div>


                         <div className="col-lg-6 col-md-6 col-sm-12 top_diff">
                                   <Label className="upload_file_1">Select Policy</Label>
                                  <Select
                                       isOptionDisabled={(option) => this.state.heading_chaque=="Update Cheque" ? 'option.disabled' : '' }
                                        value = {this.state.post_paid_policy}
                                        onChange={(e) => {
                                            // ////console.log(e, "Val.....")
                                            this.setState({
                                                post_paid_policy: e,
                                                cheque_amount:e.gross_premium
                                            });
                                            // this.fetch_policy_for_cheque(e.value)
                                        }}
                                        placeholder="Select..."
                                        className="contact_sort"
                                        options={ post_policy }
                                        styles={ customStyles }
                                    />
                          </div>
                         {/* <div className="col-lg-12 col-md-12 col-sm-12 top_diff" style={{display:this.state.policy_for_checque == "" ? "none" :"block"}}>

                             <div className="table-responsive-lg">
                                    <Table bordered>
                                    <thead>
                                        <tr>
                                            <th scope="col" style={{padding:"10px 25px",verticalAlign: "middle"}}>Customer Name</th>
                                            <th scope="col" style={{padding:"10px 25px",verticalAlign: "middle"}}>Policy Number</th>
                                            <th scope="col" style={{padding:"10px 25px",verticalAlign: "middle",textAlign:"end"}}>Gross Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.policy_for_checque.map((value,index)=>{
                                            return(
                                                <tr key={index}>
                                                <td style={{padding:"5px 25px",verticalAlign: "middle"}}>
                                                    <div className="input_data" style={{display:"inline-flex"}}>
                                                    <CustomInput type="checkbox" id={"formCheckbox1" + index}
                                                    onChange={(e) => {
                                                        this.setState({
                                                            checked_policy:e.target.checked
                                                        })
                                                        this.toggleCheckbox(e,value,index)}}
                                                    /> <span>{value.name}</span>
                                                    </div>
                                                    </td>
                                                <td style={{padding:"5px 25px",verticalAlign: "middle"}}>{value.section_details[0].policy_number}</td>
                                                <td style={{padding:"5px 25px",verticalAlign: "middle",textAlign:"end"}}>&#x20b9;{Number(value.section_details[0].gross_premium)}</td>
                                            </tr>
                                                    )
                                                })}
                                                <tr>
                                                    <td colSpan="2" style={{padding:"5px 25px",verticalAlign: "middle"}}>Total</td>
                                                    <td style={{padding:"5px 25px",verticalAlign: "middle",textAlign:"end"}}>&#x20b9; {this.state.total_amount_of_cheque}</td>
                                                </tr>

                                    </tbody>
                                </Table>

                               </div>
                          </div> */}


                        <div className="col-lg-6 col-md-6 col-sm-12 top_diff">
                                   <Label className="upload_file_1">Cheque No</Label>
                                   <input type="text"
                                        className="form-control"
                                        placeholder="Cheque No"
                                        value={this.state.cheque_no}
                                        onChange={(e) => {
                                            this.setState({
                                                cheque_no: e.target.value,
                                            });
                                        }}
                                    />

                               </div>


                        <div className="col-lg-6 col-md-6 col-sm-12 top_diff">
                                   <Label className="upload_file_1">Amount</Label>
                                   <input type="number"
                                        className="form-control"
                                        placeholder="Amount"
                                        value={this.state.cheque_amount}
                                        onChange={(e) => {
                                            this.setState({
                                                cheque_amount: e.target.value,
                                            });
                                        }}
                                    />

                               </div>
                               <div className="col-lg-12 col-md-12 col-sm-12 top_diff" style={{display:this.state.erroe_message !="" ? "block" :"none"}}>
                                    <p className="no_data_no">{this.state.erroe_message} </p>
                                </div>
                        {/* <div className="col-lg-12 col-md-12 col-sm-12 top_diff" style={{display:this.state.erroe_message=="block" ? "block" :"none"}}>
                         <p className="no_data_no">No Policy Available For this Insurer </p>
                       </div> */}
                            </div>
                       </div>

                    {/* Day End Receipting */}

                    <div style={{display:this.state.insurer_type === "Day End Receipting" ? "block" :"none"}}>
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12 top_diff" style={{display:"grid"}}>
                        <Label className="upload_file_1">Date</Label>
                                <DatePicker
                                selected={ this.state.secondVal }
                                onChange={ ( val ) => {
                                    this.setState( {
                                        secondVal: val,
                                    } );
                                } }
                                placeholder="Select date"
                                dateFormat="dd-MM-yyyy"
                                className="rui-datetimepicker form-control w-auto"
                            />
                         </div>

                         <div className="col-lg-6 col-md-6 col-sm-12 top_diff">
                                   <Label className="upload_file_1">Company Name</Label>
                                  <Select
                                       isOptionDisabled={(option) => this.state.heading_chaque=="Update Cheque" ? 'option.disabled' : '' }
                                        value = {this.state.company_name}
                                        onChange={(e) => {
                                            // ////console.log(e, "Val.....")
                                            this.setState({
                                                company_name: e
                                            });
                                            this.fetch_policy_for_cheque(e.value,"Day End Receipting")
                                        }}
                                        placeholder="Select..."
                                        className="contact_sort"
                                        options={ insurer_array }
                                        styles={ customStyles }
                                    />
                          </div>
                         <div className="col-lg-12 col-md-12 col-sm-12 top_diff" style={{display:this.state.policy_for_checque == "" ? "none" :"block"}}>

                             <div className="table-responsive-lg">
                                    <Table bordered>
                                    <thead>
                                        <tr>
                                            <th scope="col" style={{padding:"10px 25px",verticalAlign: "middle"}}>Customer Name</th>
                                            <th scope="col" style={{padding:"10px 25px",verticalAlign: "middle"}}>Policy Number</th>
                                            <th scope="col" style={{padding:"10px 25px",verticalAlign: "middle",textAlign:"end"}}>Gross Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.policy_for_checque.map((value,index)=>{
                                            return(
                                                <tr key={index}>
                                                <td style={{padding:"5px 25px",verticalAlign: "middle"}}>
                                                    <div className="input_data" style={{display:"inline-flex"}}>
                                                    <CustomInput type="checkbox" id={"formCheckbox1" + index}
                                                    onChange={(e) => {
                                                        this.setState({
                                                            checked_policy:e.target.checked
                                                        })
                                                        this.toggleCheckbox(e,value,index)}}
                                                    /> <span>{value.name}</span>
                                                    </div>
                                                    </td>
                                                <td style={{padding:"5px 25px",verticalAlign: "middle"}}>{value.section_details[0].policy_number}</td>
                                                <td style={{padding:"5px 25px",verticalAlign: "middle",textAlign:"end"}}>&#x20b9;{Number(value.section_details[0].gross_premium)}</td>
                                                {/* <td style={{padding:"5px 25px",verticalAlign: "middle",textAlign:"end"}}>&#x20b9;{value.policy_amount}</td> */}
                                            </tr>
                                                    )
                                                })}
                                                <tr>
                                                    <td colSpan="2" style={{padding:"5px 25px",verticalAlign: "middle"}}>Total</td>
                                                    <td style={{padding:"5px 25px",verticalAlign: "middle",textAlign:"end"}}>&#x20b9; {this.state.total_amount_of_cheque}</td>
                                                </tr>

                                    </tbody>
                                </Table>

                               </div>
                          </div>


                        <div className="col-lg-6 col-md-6 col-sm-12 top_diff">
                                   <Label className="upload_file_1">Cheque No</Label>
                                   <input type="text"
                                        className="form-control"
                                        placeholder="Cheque No"
                                        value={this.state.cheque_no}
                                        onChange={(e) => {
                                            this.setState({
                                                cheque_no: e.target.value,
                                            });
                                        }}
                                    />

                               </div>


                        <div className="col-lg-6 col-md-6 col-sm-12 top_diff">
                                   <Label className="upload_file_1">Amount</Label>
                                   <input type="number"
                                        className="form-control"
                                        placeholder="Amount"
                                        value={this.state.cheque_amount}
                                        onChange={(e) => {
                                            this.setState({
                                                cheque_amount: e.target.value,
                                            });
                                        }}
                                    />

                               </div>

                        <div className="col-lg-12 col-md-12 col-sm-12 top_diff" style={{display:this.state.erroe_message !="" ? "block" :"none"}}>
                         <p className="no_data_no">{this.state.erroe_message} </p>
                       </div>
                            </div>
                       </div>
                       </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={ this.toggle }>Close</Button>
                            { ' ' }
                            <Button color="warning" disabled={(this.state.insurer_type === "Day End Receipting" ? (this.state.checked_policy == false ? 'disabled': ''):'') || this.state.erroe_message !=""   ? 'disabled' : '' || this.state.loading} style={{color:"#fff"}} onClick={ this.switch_fuunction }>{this.state.button_cheque} {this.state.loading ?  (
                                 <Spinner />
                               ):"" }</Button>
                        </ModalFooter>
                    </Modal>


                    <Modal
                    style={{ width: '350px', height: 'auto', justifyContent: 'center', textAlign: 'center', alignItem: 'center', marginTop: '200px' }}
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
                        <div style={{ width: '100%', height: '50px' }}>
                          <p style={{marginBottom:"10px"}}>Are you sure you want to Delete ?</p>

                        </div>
                        <div style={{ height: '50px', width: '100%' }}>

                            <Button color="secondary"
                                style={{ marginRight: "20px",color:"#fff"}} onClick={this.AlertDeleteSingle}
                            >no</Button>
                            {'             '}
                            {/* <Button color="secondary"  onClick={this.AlertDeleteSingle}>no</Button> */}
                            <Button color="warning" disabled={this.state.policy_dock_control == "false" ? 'disabled' : ''} style={{color:"#fff"}} onClick={() => {
                                    this.delete_cheque()

                                }}>yes</Button>
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
