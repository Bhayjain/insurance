/**
 * Styles
 */
 import './style.scss';

 /**
  * External Dependencies
  */
 import React, { Component, Fragment } from 'react';
 import { connect } from 'react-redux';
 import { Link } from 'react-router-dom';
 import {
     addToast as actionAddToast,
 } from '../../actions';
 import classnames from 'classnames/dedupe';
 
 /**
  * Internal Dependencies
  */
 import Icon from '../../components/icon';
 import DataTables from '../../components/data-tables';
 import { Table, Modal, ModalBody, ModalFooter, Button, Label,Spinner,CustomInput} from 'reactstrap';
 import { isValidmobile_number } from '../../utils';
 import PageTitle from '../../components/page-title';
 import Select from 'react-select';
 import Cookies from 'js-cookie';
 import { io } from "socket.io-client"
 import DatePicker from "../../components/date-time-picker";
 import * as XLSX from "xlsx";
 
 /**
  * Component
  */
 //   var api_url = "http://192.168.29.31:4090/"
 // var api_url = "http://173.249.5.10:3005/"
 
 // var socket = io(api_url, {transport : ['WebSocket']});
 // ////////console.log("socket",socket);
 
 const device_width =   window.innerWidth;
 var height =   window.innerHeight;
 ////////console.log("admin_screen.height", height);
 const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
 ////////console.log("admin_nav_height",nav_height);
 var my_height = height - nav_height;
 var gk = (my_height/2)-100;
 ////////console.log("admin_gk",gk);
 if(device_width < 600){
   var gk = (my_height/2) - 50;
 }
 
 
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
             AlertDelete: false,
             modalOpen: false,
             heading:'Add  Employee',
             button: 'Save',
             email:'',
             name:'',
             mobile_no:'',
             password:'',
             admin_array:[],
             id:'',
             edit_admin_array:[],
             add_admin_array:[],
             issd:'',
             mobile_number_error:'',
             isLoading:"block",
             role_array: [],
             single_pending_array: [],
             role_type:"",
             admin_control:Cookies.get('admin_management_control'),
             designation_array:[],
             designation_type:"",
             add_relation:false,
             relation_array:[],
             relation_type:"",
             add_salary:"",
             add_eroor:"",
             vehicle_type:"",
             false_message:"none",
             current_page_emp:1,
             total_pages_emp:"",
             total_emp:"",
             pending_spinner:"none",
             ipad_width:"none",
             ipad_emp_list:"block",
             no_data_message:"none",
             items: [],
             salary_array_new: [],
             // salary_type:"",
             // date_of_joining:"",
             // template_name:""
 
         };
         this.AlertDelete = this.AlertDelete.bind( this );
         this.toggle = this.toggle.bind( this );
         this.add_Admin = this.add_Admin.bind( this );
         this.edit_Admin = this.edit_Admin.bind( this );
         this.switch_function = this.switch_function.bind( this );
         this.checkNumber = this.checkNumber.bind(this);
 
 
         this.fetch_Admin();
         this.fetch_admin_role();
         this.fetch_designation();
         this.fetch_all_salary_structure();
     }
 
     checkNumber() {
         const {
             mobile_no,
         } = this.state;
 
         const isValid = mobile_no && isValidmobile_number(mobile_no);
 
         this.setState({
             mobile_number_error: isValid ? '' : 'Invalid mobile number',
         });
 
         return isValid;
     }
 
     AlertDelete() {
         this.setState( ( prevState ) => ( {
             AlertDelete: ! prevState.AlertDelete,
         } ) );
     }
     toggle() {
         ////console.log("kkkkkkkkkkkkkkkkkkk");
         this.setState( ( prevState ) => ( {
             modalOpen: ! prevState.modalOpen,
             name : '',
             mobile_no: '',
             email:'',
             password:'',
             heading:'Add Employee',
             button: 'Save',
             designation_type:"",
             add_relation:false,
             relation_array:[],
             relation_type:"",
             role_type:"",
             vehicle_type:"",
 
             for_app_type_label:"",
             for_app_type:"",
             relation_mis_type:"",
             for_app_data:false,
             add_mis_relation:false,
             add_salary:"",
             vehicle_type:"",
             // date_of_joining:"",
             // salary_type:"",
             // template_name:"",
         } ) );
     }
     // for_edit(x){
     //   this.setState({
     //
     //   })
     // }
    switch_function(){
 
      if(this.state.button == "Save"){
        this.add_Admin();
        ////////console.log("worng call");
      }
      else{
        this.edit_Admin();
      }
 
    }
 
     fetch_Admin= (search_name,pageNumber)=>  {
         const { settings } = this.props;
         if (pageNumber == '' || pageNumber == undefined) {
             this.setState({
                 current_page_emp: 1
             })
             var page_no = 1
         } else {
             this.setState({
                 current_page_emp: pageNumber
             })
             var page_no = pageNumber
         }
         if (search_name == "" || search_name == undefined) {
             var search_name = undefined
         }else{
             var search_name = search_name
         }
           var params = {
             page_no:page_no,
             emp_name:search_name
         }
         ////console.log("empp",params);
             var admin_data = null;
                 const res = fetch(settings.api_url + "fetch_admin", {
                     method: 'POST',
                     body: JSON.stringify(params),
                     headers: {
                         "Content-type": "application/json; charset=UTF-8",
                     }
                 }).then((response) => response.json())
                     .then(json => {
                         ////console.log("Fetch Employee",json)
                         admin_data = json;
 
                         if (admin_data.status==true) {
                             this.setState({ admin_array:admin_data["data"],isLoading:"none",total_pages_emp: admin_data.total_pages,
                             total_emp:admin_data.total,no_data_message:"none"});
                             if (device_width < 769) {
                                 // //////////console.log("display lisit none");
 
                                }
                                else{
 
                                 this.fetch_single_admin(admin_data.data[0]._id)
                                }
                         }else{
                             this.setState({
                                 admin_array:[],
                                 isLoading:"none",
                                 total_pages_emp: admin_data.total_pages,
                                 total_emp:admin_data.total,
                                 no_data_message:"block"
                                 });
                         }
 
 
 
 
                         ////////console.log("admin_array", this.state.admin_array);
                         ////////console.log(" admin_data status", admin_data.status);
                     })
                     .then(() => {
                         // this.setState({ admin_array:json["data"] });
                         // ////////console.log("city_array", this.state.city_array);
                         // ////////console.log(" city_data status", city_data.status);
                     })
 
 
 
                     // var conv_param = {
                     //                     "conversation_id":"637b44be07d28644bf9c86b8",
                     //                     "to_id":"63731fff6df59d1dd7efa2a6",
                     //                     "from_id":"637b449960a156a206a1fe1c",
                     //                     "message":"I am hving one error.",
                     //                     "type":"support",
                     //                     "date_time":"21 November 2022 13:12PM",
                     //                     "message_id":9,
                     //                     "message_from":"user_to_admin"
                     //                   }
                     //
                     // socket.emit('add_conversation', conv_param);
                     //
                     //
                     // socket.on('add_conversation_response', (data)=>{
                     //
                     //
                     //       ////////console.log('inside add_conversation_response =============',data);
                     //
                     // })
 
 
       }
     fetch_designation() {
         const { settings } = this.props;
             var admin_data = null;
                 const res = fetch(settings.api_url + "fetch_designation", {
                     method: 'POST',
                     headers: {
                         "Content-type": "application/json; charset=UTF-8",
                     }
                 }).then((response) => response.json())
                     .then(json => {
                         // ////////console.log(json)
                         admin_data = json;
                         this.setState({ designation_array:admin_data["data"],isLoading:"none"});
                         ////////console.log("designation_array", this.state.designation_array);
                         ////////console.log(" admin_data status", admin_data.status);
                     })
                     .then(() => {
                         // this.setState({ admin_array:json["data"] });
                         // ////////console.log("city_array", this.state.city_array);
                         // ////////console.log(" city_data status", city_data.status);
                     })
 
       }
 
 
       fetch_admin_role () {
         const { settings } = this.props;
         const res = fetch(settings.api_url + "fetch_admin_role", {
           method: 'POST',
           headers: {
             "Content-type": "application/json; charset=UTF-8",
           }
         }).then((response) => response.json())
           .then(json => {
             ////////console.log("fetch_admin_role **************************************", json)
             var data = json;
             if (data.status == true) {
               this.setState({
                 role_array: data.data,
                });
             }
             else {
               this.setState({
                 role_array: [],
 
               });
               ////////console.log("fetch_emp wrong");
             }
           })
       }
       onChange(value){
         const re = /^[0-9\b]+$/;
         if (value === '' || re.test(value)) {
             //////console.log("Trueeee");
            this.setState({
                value: value,
                add_eroor :""
             })
         }else{
             //////console.log("falseeeeeeeeeeeee");
             this.setState({
                 add_eroor :"Plaese Enter only Number"
             })
 
         }
      }
       add_Admin(){
 
         const {
             addToast,
             settings
         } = this.props;
         if (this.state.date_of_joining == ""|| this.state.date_of_joining == undefined) {
             var date_of_joining =""
         }else{
             var date = new Date(this.state.date_of_joining);
             // ////////console.log("date",date);
             var dd = String(date.getDate()).padStart(2, '0');
             var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!;
             var yyyy = date.getFullYear();
 
             var date_of_joining = yyyy + "-" + mm + "-" + dd
             console.log(date_of_joining);
         }
 
         if (this.state.add_relation==true) {
             var relationship_manager=this.state.relation_type
         }
         else{
             var relationship_manager={}
         }
         if (this.state.add_mis_relation==true) {
             var relationship_manager_mis=this.state.relation_mis_type
         }
         else{
             var relationship_manager_mis={}
         }
 
 
         if (this.state.for_app_data==true) {
             var for_app_type=this.state.for_app_type
         }
         else{
             var for_app_type={}
         }
 
         if (this.state.for_app_type_label== "Telecaller") {
             var vehicle_type=this.state.vehicle_type
         }
         else{
             var vehicle_type={}
         }
 
         var params = {
            name : this.state.name,
            mobile_no: this.state.mobile_no,
            password:this.state.password,
            role:this.state.role_type,
            designation:this.state.designation_type,
            is_relationship_manager:this.state.add_relation,
            relationship_manager:relationship_manager,
            for_app:this.state.for_app_data,
            for_app_type:for_app_type,
            monthly_salary:Number(this.state.add_salary),
            telecaller_type:vehicle_type,
            is_mis_dock_relationship_manager:this.state.add_mis_relation,
            mis_dock_relationship_manager:relationship_manager_mis,
         //    salary_type:this.state.salary_type,
         //    structure_id:this.state.template_name ? this.state.template_name.value:"",
         //    date_of_joining:date_of_joining,
         }
           console.log("add_Employee*****************", params);
 
         if (params.for_app == "" || params.for_app==undefined) {
             if(params.name == "" || params.name == undefined || params. mobile_no == "" || params. mobile_no == undefined || params.password == "" || params.password == undefined || params.role == "" || params.role == undefined ){
             // if(params.name == "" || params.name == undefined || params. mobile_no == "" || params. mobile_no == undefined || params.password == "" || params.password == undefined || params.role == "" || params.role == undefined || params.salary_type == "" || params.salary_type == undefined || params.structure_id == "" || params.structure_id == undefined || params.date_of_joining == "" || params.date_of_joining == undefined  ){
                 alert("please fill all the fields")
             }
             else{
                 ////console.log("kkkkkkkkkk");
                 var admin_data = null;
                 const res = fetch(settings.api_url + "add_admin", {
                     method: 'POST',
                     body: JSON.stringify(params),
                     headers: {
                         "Content-type": "application/json; charset=UTF-8",
                     }
                 }).then((response) => response.json())
                     .then(json => {
                         admin_data = json;
                         this.setState({ add_admin_array:admin_data["data"] });
                         this.fetch_Admin();
                         if(admin_data.status==true){
                           addToast({
                               title: 'Add Employee',
                               content: admin_data.message,
                               time: new Date(),
                               duration: 1000,
                           });
                           this.setState( ( prevState ) => ( {
                             modalOpen: ! prevState.modalOpen,
                             name : '',
                             mobile_no: '',
                             email:'',
                             password:'',
                             designation_type:"",
                             false_message:"none"
                         } ) );
 
                         }
                         else{
                             this.setState({
                                 modalOpen:true,
                                 false_message:admin_data.message
                             })
                         }
 
                     })
 
             }
 
         }
        else if(params.name == "" || params.name == undefined || params. mobile_no == "" || params. mobile_no == undefined || params.password == "" || params.password == undefined ){
             alert("please fill all the fields")
         }
         else{
             ////console.log("kkkkkkkkkk");
             var admin_data = null;
             const res = fetch(settings.api_url + "add_admin", {
                 method: 'POST',
                 body: JSON.stringify(params),
                 headers: {
                     "Content-type": "application/json; charset=UTF-8",
                 }
             }).then((response) => response.json())
                 .then(json => {
                     ////console.log("json==============",json);
                     admin_data = json;
                     this.setState({ add_admin_array:admin_data["data"] });
                     this.fetch_Admin();
                     if(admin_data.status==true){
                       addToast({
                           title: 'Add Employee',
                           content: admin_data.message,
                           time: new Date(),
                           duration: 1000,
                       });
 
                     }
                     this.setState( ( prevState ) => ( {
                         modalOpen: ! prevState.modalOpen,
                         name : '',
                         mobile_no: '',
                         email:'',
                         password:'',
                         designation_type:""
                     } ) );
                 })
 
         }
 
 
       }
 
             delete_admin(id){
                 const {
                     addToast,
                     settings
                 } = this.props;
               var params = {
                 user_id:id
               }
               ////////console.log(params,"params");
               var delete_data;
               ////////console.log("delete admin", params);
                   const res = fetch(settings.api_url + "delete_admin", {
                       method: 'POST',
                       body: JSON.stringify(params),
                       headers: {
                           "Content-type": "application/json; charset=UTF-8",
                       }
                   }).then((response) => response.json())
                       .then(json => {
                           // ////////console.log(json)
                           delete_data = json;
                           this.setState({ delete:delete_data["status"] });
                           if(delete_data["status"]==true){
                             addToast({
                                 title: 'Delete Admin',
                                 content: delete_data["message"],
                                 time: new Date(),
                                 duration: 1000,
                             });
                             this.setState({
                                 AlertDelete:false
                             }),
                             this.fetch_Admin();
                           }else{
                             addToast({
                                 title: 'Delete Admin',
                                 content: delete_data["message"],
                                 time: new Date(),
                                 duration: 1000,
                             });
                             this.setState({
                                 AlertDelete:false
                             }),
                             this.fetch_Admin();
 
                           }
 
 
                       })
 
             }
 
       for_edit(x){
           ////console.log("xxxxxx",x);
           if (x.for_app_type=="" || x.for_app_type==null) {
             var for_app_type = ""
           }
           else{
               var for_app_type= x.for_app_type.label
           }
         this.setState({
           button:"Update",
           heading:"Update Admin",
           name : x.name,
           mobile_no: x.mobile_no,
           email:x.email,
           password:x.password,
           id: x._id,
           role_type:x.role,
           designation_type:x.designation,
           add_relation:x.is_relationship_manager,
           relation_type:x.relationship_manager,
           for_app_data:x.for_app,
           for_app_type:x.for_app_type,
           add_salary:x.monthly_salary,
           vehicle_type:x.telecaller_type,
           for_app_type_label:for_app_type,
           add_mis_relation:x.is_mis_dock_relationship_manager,
           relation_mis_type:x.mis_dock_relationship_manager,
           suspend_unsuspen:x.suspend,
         //   date_of_joining:new Date(x.date_of_joining),
         //   salary_type:x.salary_type,
         //   template_name:x.salary_structure,
         })
       }
       edit_Admin(){
         const { addToast,settings } = this.props;
         if (this.state.add_relation==true) {
             var relationship_manager=this.state.relation_type
         }
         else{
             var relationship_manager={}
         }
         if (this.state.for_app_data==true) {
             var for_app_type=this.state.for_app_type
         }
         else{
             var for_app_type={}
         }
         // if (this.state.for_app_type.label== "Telecaller") {
         //     var vehicle_type=this.state.vehicle_type
         // }
         // else{
         //     var vehicle_type={}
         // }
 
         if (this.state.for_app_type_label== "Telecaller") {
             var vehicle_type=this.state.vehicle_type
         }
         else{
             var vehicle_type={}
         }
 
         ////console.log("suspend_unsuspen===========",this.state.suspend_unsuspen);
 
         if (this.state.add_salary == "") {
             var salary = ""
         }else{
             var salary  =Number(this.state.add_salary)
         }
         if (this.state.add_mis_relation==true) {
             var relationship_manager_mis=this.state.relation_mis_type
         }
         else{
             var relationship_manager_mis={}
         }
 
 
         if (this.state.date_of_joining == ""|| this.state.date_of_joining == undefined) {
             var date_of_joining =""
         }else{
             var date = new Date(this.state.date_of_joining);
             // ////////console.log("date",date);
             var dd = String(date.getDate()).padStart(2, '0');
             var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!;
             var yyyy = date.getFullYear();
 
             var date_of_joining = yyyy + "-" + mm + "-" + dd
             console.log(date_of_joining);
         }
 
         var params = {
           user_id:this.state.id,
           name:this.state.name,
           mobile_no:this.state.mobile_no,
           password:this.state.password,
           role:this.state.role_type,
           designation:this.state.designation_type,
           is_relationship_manager:this.state.add_relation,
           relationship_manager:relationship_manager,
           for_app:this.state.for_app_data,
           for_app_type:for_app_type,
           monthly_salary:salary,
           telecaller_type:vehicle_type,
           suspend:this.state.suspend_unsuspen,
           is_mis_dock_relationship_manager:this.state.add_mis_relation,
           mis_dock_relationship_manager:relationship_manager_mis,
         //   salary_type:this.state.salary_type,
         //   structure_id:this.state.template_name ? this.state.template_name.value:"",
         //   date_of_joining:date_of_joining,
         }
         ////console.log("edit===========", params);
         if (params.for_app == "" || params.for_app==undefined) {
         if(params.name == "" || params.name == undefined || params. mobile_no == "" || params. mobile_no == undefined || params.password == "" || params.password == undefined ){
             alert("please fill all the fields")
         }
         else{
             var edit_admin_data = null;
             const res = fetch(settings.api_url + "update_admin", {
                 method: 'POST',
                 body: JSON.stringify(params),
                 headers: {
                     "Content-type": "application/json; charset=UTF-8",
                 }
             }).then((response) => response.json())
                 .then(json => {
                     // ////////console.log(json)
                     edit_admin_data = json;
                     this.setState({ edit_admin_array:edit_admin_data["data"] });
                     // ////////console.log("edit_admin_array", this.state.edit_admin_array);
                     ////////console.log(" edit_admin_data status", edit_admin_data.status);
                     if(edit_admin_data.status== true)
                     {
                         addToast({
                             title: 'Update Employee',
                             content: edit_admin_data["message"],
                             time: new Date(),
                             duration: 2000,
                         });
                         this.fetch_Admin();
                         this.setState( ( prevState ) => ( {
                             modalOpen: ! prevState.modalOpen,
                             heading:'Add Employee',
                             name : '',
                             mobile_no: '',
                             email:'',
                             password:'',
                             button: 'Save',
                             designation_type:""
                         } ) );
 
                     }
                     else{
 
                         addToast({
                             title: 'Update Admin',
                             content: edit_admin_data["message"],
                             time: new Date(),
                             duration: 2000,
                         });
                     }
 
                 })
                 .then(() => {
                     // this.setState({ admin_array:json["data"] });
                     // ////////console.log("city_array", this.state.city_array);
                     // ////////console.log(" city_data status", city_data.status);
                 })
         }
         }
         else if(params.name == "" || params.name == undefined || params. mobile_no == "" || params. mobile_no == undefined || params.password == "" || params.password == undefined ){
             alert("please fill all the fields")
         }
         else{
             var edit_admin_data = null;
             const res = fetch(settings.api_url + "update_admin", {
                 method: 'POST',
                 body: JSON.stringify(params),
                 headers: {
                     "Content-type": "application/json; charset=UTF-8",
                 }
             }).then((response) => response.json())
                 .then(json => {
                     // ////////console.log(json)
                     edit_admin_data = json;
                     this.setState({ edit_admin_array:edit_admin_data["data"] });
                     // ////////console.log("edit_admin_array", this.state.edit_admin_array);
                     ////////console.log(" edit_admin_data status", edit_admin_data.status);
                     if(edit_admin_data.status== true)
                     {
                         addToast({
                             title: 'Update Employee',
                             content: edit_admin_data["message"],
                             time: new Date(),
                             duration: 2000,
                         });
                         this.fetch_Admin();
                         this.setState( ( prevState ) => ( {
                             modalOpen: ! prevState.modalOpen,
                             heading:'Add Employee',
                             name : '',
                             mobile_no: '',
                             email:'',
                             password:'',
                             button: 'Save',
                             designation_type:""
                         } ) );
 
                     }
                     else{
 
                         addToast({
                             title: 'Update Admin',
                             content: edit_admin_data["message"],
                             time: new Date(),
                             duration: 2000,
                         });
                     }
 
                 })
                 .then(() => {
                     // this.setState({ admin_array:json["data"] });
                     // ////////console.log("city_array", this.state.city_array);
                     // ////////console.log(" city_data status", city_data.status);
                 })
         }
 
       }
       reletion_manager=(e)=>{
           ////////console.log("eeeeeeee",e);
       }
 
       fetch_relation_manager_dropdown () {
         const {settings
         } = this.props;
         const res = fetch(settings.api_url +"fetch_relation_manager_dropdown", {
             method: 'POST',
             headers: {
                 "Content-type": "application/json; charset=UTF-8",
             }
         })
             .then((response) => response.json())
             .then(json => {
                 ////////console.log("relation_array***************************", json);
                 var data = json;
                 if (data.status == true) {
                     this.setState({
                         relation_array: data.data,
                     })
                 }
                 else {
                     this.setState({
                         relation_array: [],
                     })
                 }
             });
     }
 
 
     fetch_single_admin = (user_id)=>  {
         const { settings } = this.props;
         var params={
             user_id:user_id
        }
 
        ////console.log("Single Params",params);
          const res = fetch(settings.api_url + "fetch_single_admin", {
              method: 'POST',
              body: JSON.stringify(params),
              headers: {
                  "Content-type": "application/json; charset=UTF-8",
              }
          }).then((response) => response.json())
              .then(json => {
                  console.log("fetch Single Data ****", json)
                  var data = json;
                  if (data.status == true) {
                    if (device_width < 769) {
                        var ipad_emp_list = "none";
                       }
                       else{
                       var ipad_emp_list = "block"
                       }
                      this.setState({
                        single_pending_array:data.data,
                        user_id:data.data[0]._id,
                        ipad_width:"block",
                        ipad_emp_list:ipad_emp_list,
                        pending_spinner:"none",
                      })
 
                  }
                  else {
                    //////console.log("WRONG************");
                    this.setState({
                        single_pending_array:[],
                        pending_spinner:"none",
                      })
                  }
              })
      }
 
 
     //  handleFileUpload = (event) => {
     //     const file = event.target.files[0];
     //     const reader = new FileReader();
 
     //     reader.onload = (e) => {
     //       const data = new Uint8Array(e.target.result);
     //       const workbook = XLSX.read(data, { type: 'array' });
     //       const sheetName = workbook.SheetNames[0]; // Assuming only one sheet in the Excel file
     //       console.log("sheetName",sheetName);
     //       const worksheet = workbook.Sheets[sheetName];
     //       console.log("worksheet",worksheet);
     //       const label = worksheet['A1'].v;
 
     //       console.log("Labelllllllllllllllllllllllllllllllllllll",label); // Display the label of the table
     //     };
 
     //     reader.readAsArrayBuffer(file);
     //   };
 
 
     // handleFileUpload = (event) => {
     //     const file = event.target.files[0];
     //     const reader = new FileReader();
 
     //     reader.onload = (e) => {
     //       const data = new Uint8Array(e.target.result);
     //       const workbook = XLSX.read(data, { type: 'array' });
     //       const sheetName = workbook.SheetNames[0]; // Assuming only one sheet in the Excel file
     //       const worksheet = workbook.Sheets[sheetName];
     //       const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
 
     //       console.log("jjjjjjjjjjjjjjjjjjjj",jsonData); // Display the data in array format
     //     };
 
     //     reader.readAsArrayBuffer(file);
     //   };
 
 
     handleFileUpload = (event) => {
         const file = event.target.files[0];
         const reader = new FileReader();
 
         reader.onload = (e) => {
           const data = new Uint8Array(e.target.result);
           const workbook = XLSX.read(data, { type: 'array' });
           const sheetName = workbook.SheetNames[0]; // Assuming only one sheet in the Excel file
           const worksheet = workbook.Sheets[sheetName];
           const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
 
           const headers = jsonData[0];
           const rows = jsonData.slice(1);
 
           const tableData = rows.map((row) => {
             const rowData = {};
             headers.forEach((header, index) => {
               rowData[header] = row[index];
             });
             return rowData;
           });
 
           console.log(tableData); // Display the table data as an array of objects
         };
 
         reader.readAsArrayBuffer(file);
       };
 
 
 
     // handleFileUpload = (event) => {
     //     const file = event.target.files[0];
     //     const reader = new FileReader();
 
     //     reader.onload = (e) => {
     //       const data = new Uint8Array(e.target.result);
     //       const workbook = XLSX.read(data, { type: 'array' });
     //       const sheetName = workbook.SheetNames[0]; // Assuming only one sheet in the Excel file
     //       const worksheet = workbook.Sheets[sheetName];
     //       const headers = [];
 
     //       const range = XLSX.utils.decode_range(worksheet['!ref']);
     //       const C = range.s.c; // Start Column
     //       const R = range.s.r; // Start Row
 
     //       for (let col = C; col <= range.e.c; col++) {
     //         const cellAddress = XLSX.utils.encode_cell({ r: R, c: col });
     //         const cell = worksheet[cellAddress];
     //         headers.push(cell.v);
     //       }
 
     //       console.log(headers); // Display the column headings
     //     };
 
     //     reader.readAsArrayBuffer(file);
     //   };
 
 
     fetch_all_salary_structure = ()=>  {
         const { settings } = this.props;
          const res = fetch(settings.api_url + "api/payroll/fetch_all_salary_structure", {
              method: 'POST',
              headers: {
                  "Content-type": "application/json; charset=UTF-8",
              }
          }).then((response) => response.json())
              .then(json => {
                  console.log("Fetch Salary ***************", json)
                  var data = json;
                  if (data.status == true) {
 
                      this.setState({
                       salary_array_new: data.data,
                      });
                  }
                  else {
                      this.setState({
                       salary_array_new: [],
                      });
                  }
              })
           }
 
     render() {
 
         const pageNumbers_emp = [];
         if (this.state.total_emp !== null) {
             for (let i = 1; i <= Math.ceil(this.state.total_pages_emp / 1); i++) {
                 pageNumbers_emp.push(i);
             }
 
 
             var renderPageNumbers_emp = pageNumbers_emp.map(number => {
                 let classes = this.state.current_page_emp === number ? '' : '';
 
                 return (
                     <div key={number} style={{
                         display: 'inline-flex'
                     }}>
                         {/* <span style={{display:this.state.current_page === 1 ? 'none' : 'block'}}> */}
 
                         <Button color="warning" outline
                         style={{
                             backgroundColor: this.state.current_page_emp === number ? '#8bc240' : 'white', color: this.state.current_page_emp === number ? 'white' : '#8bc240',marginRight:"5px",
                             display: this.state.current_page_emp === number ? "block" : 'none'}}
                             className={classes,"pagination_1"}
                             onClick={() => {
                                 this.fetch_Admin(this.state.search_name,number)
                                     , this.setState({
                                         current_page_emp: number,
                                         spinner_1: 'block'
                                     })
                             }}
 
                         >{number}</Button>
                         <Button color="warning" outline
                         style={{
                             display: this.state.current_page_emp === number ? this.state.current_page_emp === this.state.total_pages_emp ? "none" : "block" : 'none',
                             backgroundColor: this.state.current_page_emp === number ? '' : '#8bc240', color: this.state.current_page_emp === number ? '#8bc240' : 'white' }}
                             className={classes,"pagination_1"}
                             onClick={() => {
                                 this.fetch_Admin(this.state.search_name,number + 1)
                                 if (this.state.current_page_emp === this.state.total_pages_emp) {
                                     this.setState({
                                         current_page_emp: number
                                     })
                                 } else {
                                     this.setState({
                                         current_page_emp: number + 1,
                                         spinner_1: 'block'
                                     })
                                 }
 
                             }}
 
                         >{number + 1}</Button>
 
                     </div>
                 );
             });
         }
 
 
         var relation_array = this.state.relation_array.map(item => {
             return {
                 value: item.emp_id,
                 label: item.emp_data
             }
         })
 
         var tem_object = this.state.salary_array_new.map(item => {
             return {
                 value: item._id,
                 label: item.template_name
             }
         })
 
 
         var for_app = [
             {value:"1",label:"SM"},
             {value:"2",label:"Telecaller"},
             {value:"3",label:"Direct"},
         ]
 
         var vehicle_type_array = [
             {value:"1",label:"Commercial Vehicle"},
             {value:"2",label:"Private Vehicle"},
         ]
         const { settings } = this.props;
         const customStyles = {
             control: (css, state) => {
                 return {
                     ...css,
                     borderColor: state.isFocused ? 'rgba(114, 94, 195, 0.6)' : '#eaecf0',
                     '&:hover': {
                         borderColor: state.isFocused ? 'rgba(114, 94, 195, 0.6)' : '#eaecf0',
                     },
                     boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(114, 94, 195, 0.2)' : '',
                 };
             },
             option: (css, state) => {
                 let bgc = '';
 
                 if (state.isSelected) {
                     bgc = '#725ec3';
                 } else if (state.isFocused) {
                     bgc = 'rgba(114, 94, 195, 0.2)';
                 }
 
                 return {
                     ...css,
                     backgroundColor: bgc,
                 };
             },
             multiValueLabel: (css) => {
                 return {
                     ...css,
                     color: '#545b61',
                     backgroundColor: '#eeeeef',
                 };
             },
         }
 
         const obj_delivered = [
             {value : "1", label: 'Hourly'},
             {value : "2", label: 'Daily'},
             {value : "3", label: 'Monthly'},
         ]
 
         var role_array = this.state.role_array.map(item => {
             return {
                 value: item._id,
                 label: item.role_name
             }
         });
         var destination_array = this.state.designation_array.map(item => {
             return {
                 value: item._id,
                 label: item.designation
             }
         });
 
 
         return (
             <Fragment>
             <div className="">
             <PageTitle className="title_123">
               <div className="row">
                 <div className="col-lg-6 col-md-8 col-sm-12 my_padding">
                   <h1 className="emplooo" style={{marginTop:"-1px"}}>Employee Management</h1>
                 </div>
                 <div className="col-lg-6 col-md-4 col-sm-12 my_padding" style={{display:"inline-flex",width:"100%",justifyContent:"flex-end"}}>
                     <div>
                     <input
                      type="text"
                      className="form-control employee_input_new"
                      aria-describedby="searchName"
                      placeholder="Search by Employee Name"
                      style={{width:"300px"}}
                      value={this.state.search_name}
                      onChange={(e) => {
                        this.setState({
                         search_name:e.target.value
                      })
                      this.fetch_Admin(e.target.value,this.state.current_page_emp)
                     }}   />
                     </div>
                   <div className="col-auto sideplaese sideplaese_111">
                       <button type="button"
                       disabled={this.state.admin_control =="false" ? 'disabled' : ''}
                     //       onClick={() => {
                     //           this.setState((prevState) => ({
                     //               modalOpen: !prevState.modalOpen,
                     //       })
                     //     )}
                     //   }
                       onClick={this.toggle}
                       className="btn btn-brand sss brand_btn" style={{backgroundColor:"#8bc240" ,borderColor:"#8bc240",textTransform:"capitalize"}}>
                           Add Employee
                       </button>
                   </div>
                 </div>
               </div>
               </PageTitle>
             </div>
             <Spinner color="warning" className="spinner_css_12345" style={{marginTop:gk,display: this.state.isLoading}}/>
 
                 <div className="rui-filemanager-content" style={{display: this.state.isLoading=="none" ? "block" :"none"}}>
                 <h3 style={{ display: this.state.no_data_message, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:gk}}>No Data Found</h3>
 
                     <div className="" style={{display: this.state.no_data_message=="none" ? "block" :"none"}}>
                     <div className="row ipad_virww">
                      <div className="col-lg-3 col-md-12 height_sales" style={{paddingRight:"0px",display: this.state.ipad_emp_list}}>
                      <div className="mycalendar " style={{height:this.state.total_pages_emp==1 ? my_height-67 : my_height-107}}>
                         <Table striped>
                       <thead>
                           <tr className="no_border">
                               <th scope="col" style={{padding:"10px 25px"}} className="padding_12">Name</th>
                               <th scope="col" style={{padding:"10px 25px",whiteSpace:"nowrap"}} className="padding_12">Mobile Number</th>
                           </tr>
                       </thead>
                     <tbody>
                       {
                          this.state.admin_array.map((value, index) => {
                              var x = value;
                              let y =index;
                              return (
                                <tr style={{cursor:"pointer"}}  key={index} onClick={() => {
                                 this.setState({
                                     pending_spinner: 'block'
                                 })
                                      setTimeout(() => {
                                       this.fetch_single_admin(value._id)
                                   }, 0)
                               }}>
 
                                    <td  style={{verticalAlign:"middle",padding:"5px 25px",borderLeft:this.state.user_id == value._id ? "5px solid #8bc240" :""}}>{value.name}</td>
                                    <td  style={{verticalAlign:"middle",padding:"5px 25px"}}>{value.mobile_no}</td>
                                </tr>
                              )
                            })
                            }
                       </tbody>
                      </Table>
                  </div>
 
                  <div style={{display:this.state.total_pages_emp==1?"none":'inline-flex',width:"100%",marginTop:"2px",marginBottom:"-1px",padding: "1px 8px"}}>
                               <Button color="warning" className="pagination_1"
                               style={{ marginLeft:"auto",marginRight:"5px"}}
                               outline onClick={() => this.fetch_Admin(this.state.search_name,1)}>first</Button>
 
 
                               <Button color="warning" className="pagination_1"
                               style={{marginLeft:"5px",marginRight:"5px",backgroundColor: this.state.current_page_emp == 1 ? '#8bc240' : '',
                               color: this.state.current_page_op == 1 ? '#8bc240' : '#8bc240',display: this.state.current_page_emp == 1 ? "none" : "block"}} outline
                               onClick={() => {
                                   if (this.state.current_page_emp > 1) {
                                     this.fetch_Admin(this.state.search_name,this.state.current_page_emp - 1)
                                   } else {
                                     this.fetch_Admin(this.state.search_name,this.state.current_page_emp)
                                   }
                               }}
                               >Previous</Button>
                                 {renderPageNumbers_emp}
 
                               <Button color="warning" className="pagination_1"
                               style={{marginLeft:"5px",backgroundColor: this.state.current_page_emp == this.state.total_pages_emp ? '#8bc240' : '',
                               display: this.state.current_page_emp == this.state.total_pages_emp ? "none" : "block",
                               color: this.state.current_page_emp == this.state.total_pages_emp ? 'white' : '#8bc240'}} outline
                               onClick={() => {
                                   if (this.state.current_page_emp < this.state.total_pages_emp) {
                                     this.fetch_Admin(this.state.search_name,this.state.current_page_emp + 1)
                                   } else {
                                       this.fetch_Admin(this.state.search_name,this.state.current_page_emp )
                                   }
                               }}
                               >next</Button>
                               <Button color="warning" className="pagination_1"
                               style={{marginLeft:"5px",marginRight:"3px"}}
                               outline onClick={() => this.fetch_Admin(this.state.search_name,this.state.total_pages_emp)}>last</Button>
                             </div>
             </div>
             <div className="col-lg-9 col-md-12 left_showw"  style={{display: device_width < 769 ? this.state.ipad_width : "block"}}>
             <Spinner color="warning" className="agent_spinner agent_spinner_color" style={{ marginTop: gk, display: this.state.pending_spinner }} />
              <div className="test_collapse pad_in_dar" style={{display:this.state.pending_spinner=="none" ? "block" : "none"}}>
 
              {this.state.single_pending_array.map((value,index)=>{
                      var x = value;
                      let y =index;
                                         return(
                                             <div key={index}>
                                                     <div className="client_name row" style={{marginTop:"22px"}}>
                                                      <div className="col-lg-8 col-md-8">
                                                     {/* <h3>Employee Name : {value.name}</h3> */}
                                                    <h3> <div className="top_value">Employee Name</div>
                                                        <div className="bottom_value">{value.name}</div></h3>
                                                     </div>
                                                     <div className="col-lg-4 col-md-4 data_newww" style={{textAlign:"end",paddingRight:"60px"}}>
                                                     <CustomInput type="switch" id={"formSwitch1" + index} name={"formSwitch1" + index}  checked={value.suspend==true ? true : false}  disabled/>
                                                     <Button
                                                         disabled={this.state.admin_control =="false" ? 'disabled' : ''}
                                                         className="btn delete_btoon"
                                                         color="success"
                                                         style={{marginRight:'10px',padding: '5px 6px',justifyContent:'center',textAlign:'center',textTransform:"capitalize" }}
                                                             onClick={(index, value) => {
                                                                 //////////console.log("value", value);
                                                                 this.setState((prevState) => ({
                                                                     modalOpen: !prevState.modalOpen,
                                                                     coco: x,
                                                                 }))
                                                                 this.for_edit(x)
                                                                     ////////console.log("value", x);
                                                             }}
                                                     >
                                                     Update
                                                     </Button>
                                                     <Button
                                                     disabled={this.state.admin_control =="false" ? 'disabled' : ''}
                                                         className="btn "
                                                         color="danger"
                                                         style={{verticalAlign:"middle",padding: '5px 6px',justifyContent:'center',textAlign:'center',textTransform:"capitalize"}}
                                                         onClick={()=>{
                                                             this.setState({
                                                                 AlertDelete:true,
                                                                 issd:x._id
                                                             })
                                                         }}
                                                     >
                                                     Delete
                                                     </Button>
                                     <Button className="" style={{ marginLeft: "5px",  backgroundColor: '#007bff', borderColor: '#007bff',textTransform:"capitalize", display: device_width < 769 ? "inline-flex" : "none",paddingTop:" 5px"}}
                                                     onClick={() => {
                                                     this.setState({
                                                         ipad_emp_list:"block",
                                                          ipad_width:"none"
                                                      })
                                                      }}>Back</Button>
                                     </div>
                                                 </div>
                                                 <div className="row">
                                                     <div className="col-lg-6 col-md-12 col-sm-12">
                                                        <div className="top_value">Mobile Number</div>
                                                        <div className="bottom_value">{value.mobile_no}</div>
                                                        {/* <div className="width_of_data_new_1_llll ">Mobile Number</div>: */}
                                                         {/* <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.mobile_no}</span> */}
                                                      </div>
                                                     <div className="col-lg-6 col-md-12 col-sm-12 ">
                                                        <div className="top_value">Role</div>
                                                        <div className="bottom_value">{value.role ? value.role.label :""}</div>
                                                        {/* <div className="width_of_data_new_1_llll ">Role</div>:
                                                         <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.role ? value.role.label :""}</span> */}
                                                      </div>
                                                      <div className="col-lg-6 col-md-12 col-sm-12 mt-15">
                                                         <div className="top_value">Designation</div>
                                                         <div className="bottom_value">{value.designation ? value.designation.label :""}</div>
 
                                                        {/* <div className="width_of_data_new_1_llll ">Designation</div>:
                                                         <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.designation ? value.designation.label :""}</span> */}
                                                      </div>
 
                                                      {/* <div className="col-lg-6 col-md-12 col-sm-12 mt-15">
                                                        <div className="top_value">Date of Joining</div>
                                                        <div className="bottom_value" >{value.date_of_joining ?  value.date_of_joining.split("-")[2] + "-" + value.date_of_joining.split("-")[1] + "-" + value.date_of_joining.split("-")[0] :""}</div>
                                                      </div> */}
 
 
                                                     <div className="col-lg-6 col-md-12 col-sm-12 mt-15">
                                                        <div className="top_value">Salary</div>
                                                        <div className="bottom_value" style={{display:value.monthly_salary == "" || value.monthly_salary ==undefined ? "none" :"block"}}>&#x20b9;{value.monthly_salary ?  value.monthly_salary :""}</div>
                                                      </div>
 
                                                     {/* <div className="col-lg-6 col-md-12 col-sm-12 mt-15">
                                                        <div className="top_value">Salary Type</div>
                                                        <div className="bottom_value" >{value.salary_type ?  value.salary_type.label :""}</div>
                                                      </div>
 
                                                     <div className="col-lg-6 col-md-12 col-sm-12 mt-15">
                                                        <div className="top_value">Template Name</div>
                                                        <div className="bottom_value" >{value.salary_structure ?  value.salary_structure.label :""}</div>
                                                      </div> */}
 
 
 
                                                     <div className="col-lg-6 col-md-12 col-sm-12 mt-15">
                                                        <div className="top_value">Relationship Manager For Operation Dock</div>
                                                        <div className="bottom_value">{value.relationship_manager ? value.relationship_manager.label :""}</div>
 
                                                        {/* <div className="width_of_data_new_1_llll">Relationship Manager For Operation Dock</div>:
                                                         <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.relationship_manager ? value.relationship_manager.label :""}  </span> */}
                                                      </div>
                                                     <div className="col-lg-6 col-md-12 col-sm-12 mt-15">
                                                        <div className="top_value">Relationship Manager For MIS Dock</div>
                                                        <div className="bottom_value">{value.mis_dock_relationship_manager ? value.mis_dock_relationship_manager.label :""}</div>
                                                        {/* <div className="width_of_data_new_1_llll">Relationship Manager For MIS Dock</div>:
                                                         <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.mis_dock_relationship_manager ? value.mis_dock_relationship_manager.label :""}  </span> */}
                                                      </div>
                                                 </div>
                                             </div>
                                         )
                                     })}
 
 
 
              </div>
              </div>
          </div>
                     {/* <Table striped>
                       <thead>
                           <tr className="no_border">
                               <th scope="col" style={{padding:"10px 25px"}} className="padding_12">Name</th>
                               <th scope="col" style={{padding:"10px 25px"}} className="padding_12">Mobile Number</th>
                               <th scope="col" style={{padding:"10px 25px"}} className="padding_12">Role</th>
                               <th scope="col" style={{padding:"10px 25px"}} className="padding_12">Salary</th>
                               <th scope="col" style={{padding:"10px 25px"}} className="padding_12">Designation</th>
                               <th scope="col" style={{padding:"10px 25px"}} className="padding_12">Relationship Manager</th>
                               <th scope="col" style={{padding:"10px 25px"}} className="padding_12">Suspend/Unsuspend</th>
                               <th scope="col" style={{textAlign:"center",padding:"10px 25px" }}>Action</th>
                           </tr>
                       </thead>
                     <tbody>
                       {
                          this.state.admin_array.map((value, index) => {
                              var x = value;
                              let y =index;
                              return (
                                <tr  key={index}>
 
                                    <td  style={{verticalAlign:"middle",padding:"5px 25px"}}>{value.name}</td>
                                    <td  style={{verticalAlign:"middle",padding:"5px 25px"}}>{value.mobile_no}</td>
                                    <td  style={{verticalAlign:"middle",padding:"5px 25px"}}>{value.role ? value.role.label :""}</td>
                                    <td  style={{verticalAlign:"middle",padding:"5px 25px"}}>
                                        <span style={{display:value.monthly_salary == "" || value.monthly_salary ==undefined ? "none" :"block"}}>
                                        &#x20b9; {value.monthly_salary ?  value.monthly_salary :""}
                                        </span></td>
                                    <td  style={{verticalAlign:"middle",padding:"5px 25px"}}>{value.designation ? value.designation.label :""}</td>
                                    <td  style={{verticalAlign:"middle",padding:"5px 25px"}}>{value.relationship_manager ? value.relationship_manager.label :""} </td>
                                    <td  style={{verticalAlign:"middle",padding:"5px 25px"}}>
                                    <CustomInput type="switch" id={"formSwitch1" + index} name={"formSwitch1" + index}  checked={value.suspend==true ? true : false}  disabled/>
                                    </td>
 
                                    <td className="btn_edit_delete stipped_inner_padding">
                                    <Button
                                        disabled={this.state.admin_control =="false" ? 'disabled' : ''}
                                        className="btn-hover-outline delete_btoon"
                                        color="success"
                                        style={{marginRight:'10px',padding: '5px 6px',width:'50px',justifyContent:'center',textAlign:'center' }}
                                            onClick={(index, value) => {
                                              ////////console.log("value", value);
                                                this.setState((prevState) => ({
                                                    modalOpen: !prevState.modalOpen,
                                                    coco: x,
                                                }))
                                                this.for_edit(x)
                                                  ////////console.log("value", x);
                                            }}
                                    >
                                    Edit
                                    </Button>
                                    <Button
                                    disabled={this.state.admin_control =="false" ? 'disabled' : ''}
                                        className="btn-hover-outline "
                                        color="danger"
                                        style={{verticalAlign:"middle",padding: '5px 6px',width:'50px',justifyContent:'center',textAlign:'center'}}
                                        onClick={()=>{
                                            this.setState({
                                                AlertDelete:true,
                                                issd:x._id
                                            })
                                        }}
                                     //    onClick={() => {
                                     //        this.delete_admin(x._id)
 
                                     //    }}
                                    >
                                    Delete
                                    </Button>
 
 
 
                                    </td>
                                </tr>
                              )
                            })
                            }
                       </tbody>
                   </Table> */}
             </div>
 
 
                {/* ********************************* Pagination ***************************************** */}
 
 
 
 
             </div>
                   <Modal
                         isOpen={ this.state.modalOpen }
                         toggle={ this.toggle }
                         className={ this.props.className,"my_model modal-dialog-centered" }
                         fade
                     >
                         <div className="modal-header">
                             <h5 className="modal-title h2">{this.state.heading}</h5>
                             <Button className="close" color="" onClick={ this.toggle }>
                                 <Icon name="x" />
                             </Button>
                         </div>
                         <ModalBody>
                         <div className="form rui-sign-form rui-sign-form-cloud">
                             <div className="row vertical-gap sm-gap justify-content-flex-start">
 
                                 <div className="col-lg-6 col-md-6 col-xs-12">
                                     <Label for="phone">Name</Label>
                                     <input
                                         type="text"
                                         className="form-control"
                                         aria-describedby="emailHelp"
                                         placeholder="Name"
                                         value={this.state.name}
                                         onChange={(e) => {
                                          this.setState({
                                            name:e.target.value
                                          })
 
                                         }}
 
 
                                     />
 
                                 </div>
                                 <div className="col-lg-6 col-md-6 col-xs-12">
                                     <Label for="phone">Mobile Number</Label>
                                     {/*<input
                                         type="tel"
                                         className="form-control"
                                         aria-describedby="emailHelp"
                                         placeholder="Mobile Number "
                                         value={this.state.mobile_no}
                                         onChange={(e) => {
                                          this.setState({
                                            mobile_no:e.target.value
                                          })
 
                                         }}
 
                                     />*/}
 
                                     <input
                                         type="text"
 
                                         className={classnames(' form-control', { 'is-invalid': this.state.mobile_number_error })}
                                         aria-describedby="mobilenumberHelp"
                                         placeholder="Mobile Number"
                                         value={this.state.mobile_no.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')}
                                         onChange={(e) => {
                                             this.setState({
                                                 mobile_no: e.target.value,
                                                 false_message:"none"
                                             }, this.state.mobile_number_error ? this.checkNumber : () => { });
                                         }}
                                         onBlur={this.checkNumber}
                                         disabled={this.state.loading}
                                         id="mob"
                                     />
                                     {this.state.mobile_number_error ? (
                                         <div className="invalid-feedback">{this.state.mobile_number_error}</div>
                                     ) : ''}
 
                                 </div>
                                 <div className="col-lg-6 col-md-6 col-xs-12">
                                     <Label for="phone">Password</Label>
                                     <input
                                         type="address"
                                         className="form-control"
                                         aria-describedby="emailHelp"
                                         placeholder="Password"
                                         value={this.state.password}
                                         onChange={(e) => {
                                          this.setState({
                                            password:e.target.value
                                          })
 
                                         }}
 
                                     />
 
                                 </div>
                                 <div className="col-lg-6 col-md-6 col-xs-12">
                              <Label for="phone">Role</Label>
                                   <Select
                                         value = {this.state.role_type}
                                         onChange={(e) => {
                                             ////////console.log(e, "Val.....")
                                             this.setState({
                                                 role_type: e
                                             });
                                         }}
                                         placeholder="Select Role"
                                         options={ role_array }
                                         styles={ customStyles }
                                         className="contact_sort"
                               />
 
                                 </div>
                                 <div className="col-lg-6 col-md-6 col-xs-12">
                              <Label for="phone">Designation</Label>
                                   <Select
                                         value = {this.state.designation_type}
                                         onChange={(e) => {
                                             ////////console.log(e, "Val.....")
                                             this.setState({
                                                 designation_type: e
                                             });
                                         }}
                                         placeholder="Select Designation"
                                         options={ destination_array }
                                         styles={ customStyles }
                                         className="contact_sort"
                               />
 
                                 </div>
 
 
                                 <div className="col-lg-6 col-md-6 col-xs-12">
                                         <Label for="phone">Salary</Label>
                                         <input
                                         type="number"
                                         className="form-control"
                                         aria-describedby="emailHelp"
                                         placeholder="Add Salary"
                                         value={this.state.add_salary}
                                         onChange={(e) => {
                                          this.setState({
                                            add_salary:e.target.value
                                          })
                                          this.onChange(e.target.value)
                                         }}
 
                                     />
                                     {/* {this.state.add_eroor && <p style={{color:'#f597a2',marginBottom:"0px",marginTop:"1px",fontSize: "80%"}}>{this.state.add_eroor}</p>} */}
                                 </div>
                                 {/* <div className="col-lg-6 col-md-6 col-xs-12">
                                         <Label for="phone">Salary Type</Label>
                                         <Select
                                         value={this.state.salary_type}
                                         options={obj_delivered}
                                         styles={customStyles}
                                         className="contact_sort"
                                         onChange={(e) => {
                                             this.setState({ salary_type: e})
                                             }}
                                         />
                                 </div> */}
                                 {/* <div className="col-lg-6 col-md-6 col-xs-12">
                                         <Label for="phone">Tempalate Name</Label>
                                         <Select
                                         value={this.state.template_name}
                                         options={tem_object}
                                         styles={customStyles}
                                         className="contact_sort"
                                         onChange={(e) => {
                                             this.setState({ template_name: e})
                                             }}
                                         />
                                 </div>
                                 <div className="col-lg-6 col-md-6 col-xs-12">
                                         <Label for="phone">Date of Joining</Label>
                                         <div>
                                         <DatePicker
                                             value={this.state.date_of_joining}
                                             selected={this.state.date_of_joining}
                                             onChange={(val) => {
                                             this.setState({
                                                 date_of_joining: val
                                             });
                                             }}
                                             dateFormat="dd-MM-yyyy"
                                             className="rui-datetimepicker form-control d-flex new_widht"
                                         />
                                         </div>
                                 </div> */}
 
 
                                 <div className="col-lg-6 col-md-6 col-xs-12" >
                                 <Label for="phone">Select Relationship Manager For Operation Dock</Label>
                                 <div style={{display:"inline-flex" , width:"100%"}}>
                                 <div>
                                  <CustomInput type="checkbox" className="large_checkkkk" defaultChecked={this.state.add_relation==true ? true : false} id="formCheckbox1"
                                   onClick={(e) => {
                                     this.setState({
                                         add_relation: e.target.checked
                                     })
                                     this.reletion_manager(e.target.checked)
                                     this.fetch_relation_manager_dropdown()
                                     }}
                                      />
 
                                  </div>
 
                                  <div style={{display:this.state.add_relation==true ? "block" : "none",width:"100%",marginLeft:"20px"}}>
                                      <Select
                                              value = {this.state.relation_type}
                                              onChange={(e) => {
                                                  ////////console.log(e, "Val.....")
                                                  this.setState({
                                                      relation_type: e
                                                  });
                                              }}
                                              placeholder="Select Relation"
                                              options={ relation_array }
                                              styles={ customStyles }
                                              className="contact_sort"
                                    />
                                      </div>
 
 
                                    </div>
                                 </div>
 
 
                                 <div className="col-lg-6 col-md-6 col-xs-12" >
                                 <Label for="phone">Select Relationship Manager For MIS Dock</Label>
                                 <div style={{display:"inline-flex" , width:"100%"}}>
                                 <div>
                                  <CustomInput type="checkbox" className="large_checkkkk" defaultChecked={this.state.add_mis_relation==true ? true : false} id="formCheckbox56"
                                   onClick={(e) => {
                                     this.setState({
                                         add_mis_relation: e.target.checked
                                     })
                                     this.fetch_relation_manager_dropdown()
                                     }}
                                      />
 
                                  </div>
 
                                  <div style={{display:this.state.add_mis_relation==true ? "block" : "none",width:"100%",marginLeft:"20px"}}>
                                      <Select
                                              value = {this.state.relation_mis_type}
                                              onChange={(e) => {
                                                  ////////console.log(e, "Val.....")
                                                  this.setState({
                                                      relation_mis_type: e
                                                  });
                                              }}
                                              placeholder="Select Relation"
                                              options={ relation_array }
                                              styles={ customStyles }
                                              className="contact_sort"
                                    />
                                      </div>
 
 
                                    </div>
                                 </div>
 
 
                                 <div className="col-lg-6 col-md-6 col-xs-12" >
                                 <Label for="phone">Select For App</Label>
                                 <div style={{display:"inline-flex" , width:"100%"}}>
                                 <div>
                                  <CustomInput type="checkbox" className="large_checkkkk" defaultChecked={this.state.for_app_data==true ? true : false} id="formCheckbox12"
                                   onClick={(e) => {
                                     this.setState({
                                         for_app_data: e.target.checked
                                     })
                                     }}
                                      />
 
                                  </div>
 
                                  <div style={{display:this.state.for_app_data==true ? "block" : "none",width:"100%",marginLeft:"20px"}}>
                                      <Select
                                              value = {this.state.for_app_type}
                                              onChange={(e) => {
                                                  ////////console.log(e, "Val.....")
                                                  this.setState({
                                                      for_app_type: e,
                                                      for_app_type_label:e.label
                                                  });
                                              }}
                                              placeholder="Select For App"
                                              options={ for_app }
                                              styles={ customStyles }
                                              className="contact_sort"
                                    />
                                      </div>
 
 
                             </div>
                                 </div>
 
                                 <div className="col-lg-6 col-md-6 col-xs-12" style={{display:this.state.for_app_type_label=="Telecaller" ? "block" :"none"}}>
                                  <Label for="phone">Vehicle Type</Label>
                                          <Select
                                             value = {this.state.vehicle_type}
                                             onChange={(e) => {
                                                 ////////console.log(e, "Val.....")
                                                 this.setState({
                                                     vehicle_type: e
                                                 });
                                             }}
                                             placeholder="Select Vehicle"
                                             options={ vehicle_type_array }
                                             styles={ customStyles }
                                             className="contact_sort"
                                            />
 
                                 </div>
 
 
                                 <div className="col-lg-6 col-md-6 col-xs-12 suspended" style={{display:this.state.heading=="Add Employee" ? "none" :"inline-flex"}}>
                                  <Label for="phone">Suspend/Unsuspend</Label>
                                  <CustomInput type="switch" id="formSwitch1" name="formSwitch1"  defaultChecked={this.state.suspend_unsuspen==true ? true : false}  onClick={(e) => {
                                     this.setState({
                                         suspend_unsuspen: e.target.checked
                                     })
                                     }}/>
 
                                 </div>
 
 
 
                                 {/* <div>
                                     <input type="file" onChange={this.handleFileUpload} />
                                 </div> */}
                                 <div className="col-lg-12 col-md-12" style={{display:this.state.false_message=="none" ? "none" :"block"}}>
                                     <p className="false_message_new">{this.state.false_message}</p>
                                 </div>
 
                                  {/* <div className="col-lg-6 col-md-6 col-xs-12">
                                  <div style={{display:this.state.add_relation==true ? "block" : "none",}}>
                                  <Label for="phone">Relationship Manager</Label>
                                      <Select
                                              value = {this.state.relation_type}
                                              onChange={(e) => {
                                                  ////////console.log(e, "Val.....")
                                                  this.setState({
                                                      relation_type: e
                                                  });
                                              }}
                                              placeholder="Select Relation"
                                              options={ relation_array }
                                              styles={ customStyles }
                                    />
                                      </div>
                                 </div> */}
 
 
                                 </div>
                             </div>
                         </ModalBody>
                         <ModalFooter>
                             <Button color="secondary" style={{textTransform:"capitalize"}} onClick={ this.toggle }>Close</Button>
                             { ' ' }
                             <Button color="brand" style={{backgroundColor:"#8bc240" ,borderColor:"#8bc240",textTransform:"capitalize"}} onClick={ this.switch_function}>{this.state.button}</Button>
                         </ModalFooter>
                     </Modal>
                 <Modal
                     style={{ width: '500px', height: 'auto', justifyContent: 'center', textAlign: 'center', alignItem: 'center', marginTop: '200px' }}
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
 
                             <Button color="brand no_btn"
                                 style={{ marginRight: "20px",textTransform:"capitalize" }}
                                 onClick={() => {
                                     this.delete_admin(this.state.issd)
 
                                 }}
                             >yes</Button>
                             {'             '}
                             <Button color="secondary" style={{textTransform:"capitalize"}} onClick={this.AlertDelete}>no</Button>
                         </div>
 
                     </ModalBody>
                 </Modal>
             </Fragment>
         );
     }
 }
 
 
 export default connect(({ settings }) => (
     {
         settings,
     }
 ), { addToast: actionAddToast })(Content);
 