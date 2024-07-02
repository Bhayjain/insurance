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
 import { Table, Modal, ModalBody, ModalFooter, Button, Label,Spinner,CustomInput,Input} from 'reactstrap';
 import { isValidmobile_number } from '../../utils';
 import PageTitle from '../../components/page-title';
 import Select from 'react-select';
 import Cookies from 'js-cookie';
 import { io } from "socket.io-client"
 import DatePicker from "../../components/date-time-picker";
 import * as XLSX from "xlsx";
 import user_img from '../../images/usernight.png'
import Tabs from '../../components/tabs';
import pdf_img from '../../images/pdf.png'
import dateFormat from 'dateformat';
import Dropzone from '../../components/dropzone';
 
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
             activeTab2: '',
             ShowImage: false,
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
             letter_template_array: [],
             salary_type:"",
             salary_type_label:"",
             date_of_appointment:"",
             template_name:"",
             salary_structure_obj:"",
             selfie_attendance:false,
             location_attendance:false,
             manual_attendance:false,
             profile_image:"",
             profile_picture_string:"",
             profile_picture_extension:"",
             profile_picture_name:"",
             emp_address:"",
             sourced_from:"",
             error_meesage:"",
             borderNew:false,
             Engagementsmodal:false,
             engagement_type:"",
             designation_type:"",
             role_type:"",
             date_of_assigning:new Date(),
             borderNew:false,
             salary_emp:"",
             salary_structure_obj:"",
             error_meesage_eng:"",
             heading_for_engagement :"Add Engagement",
             button_for_engagement : "Save",
             no_data_for_engagement:"none",
             user_engagement_array: [],

             single_engagement_data:"",
             engagement_type_show:"",
             engagement_designation_show:"",
             engagement_role_show:"",
             engagement_assiging_date_show:"",
             engagement_salary_amount_show:"",
             engagement_salary_structure_show:"",
             engagement_documents_show:[],
             document_array_new:[],
             UploadDocumentModel:false,
            AlertDeletePropasal: false,
            AlertDeleteEngegament: false,

            aadhar_number:"",
            pan_card_number:"",
            un_number:"",
            bank_account_number:"",

         };
         this.AlertDelete = this.AlertDelete.bind( this );
         this.toggle = this.toggle.bind( this );
         this.add_Admin = this.add_Admin.bind( this );
         this.edit_Admin = this.edit_Admin.bind( this );
         this.switch_function = this.switch_function.bind( this );
         this.checkNumber = this.checkNumber.bind(this);
         this.ShowImage = this.ShowImage.bind(this);
         this.Engagementsmodal = this.Engagementsmodal.bind(this);
         this.UploadDocumentModel = this.UploadDocumentModel.bind(this);
         this.toggleTab = this.toggleTab.bind( this );
         this.AlertDeletePropasal = this.AlertDeletePropasal.bind( this );
         this.AlertDeleteEngegament = this.AlertDeleteEngegament.bind( this );
 
 
         this.fetch_Admin();
         this.fetch_admin_role();
         this.fetch_designation();
         this.fetch_all_salary_structure();
         this.fetch_all_letter_template();
     }

     toggleTab( num, name ) {
        this.setState( {
            [ `activeTab${ num }` ]: name,
        } );
    }


    AlertDeletePropasal() {
        this.setState( ( prevState ) => ( {
            AlertDeletePropasal: ! prevState.AlertDeletePropasal,
        } ) );
    }


    AlertDeleteEngegament() {
        this.setState( ( prevState ) => ( {
            AlertDeleteEngegament: ! prevState.AlertDeleteEngegament,
        } ) );
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
     
     ShowImage() {
         this.setState( ( prevState ) => ( {
             ShowImage: ! prevState.ShowImage,
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
             for_app_data:false,
             add_salary:"",
             vehicle_type:"",
             date_of_appointment:"",
             salary_type:"",
             salary_type_label:"",
             template_name:"",
             selfie_attendance:false,
             location_attendance:false,
             manual_attendance:false,

             profile_image:"",
             profile_picture_string:"",
             profile_picture_extension:"",
             profile_picture_name:"",
             emp_address:"",
             sourced_from:"",
             error_meesage:"",
             borderNew:false,
             web_portal_permission:false,
             add_mis_relation:false,
             aadhar_number:"",
            pan_card_number:"",
            un_number:"",
            bank_account_number:"",
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
                         console.log("Fetch Employee",json)
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
         if (this.state.date_of_appointment == ""|| this.state.date_of_appointment == undefined) {
             var date_of_appointment =""
         }else{
             var date = new Date(this.state.date_of_appointment);
             // ////////console.log("date",date);
             var dd = String(date.getDate()).padStart(2, '0');
             var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!;
             var yyyy = date.getFullYear();
 
             var date_of_appointment = yyyy + "-" + mm + "-" + dd
             console.log(date_of_appointment);
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
             var relationship_manager_mis=""
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
         
         var punch_data =[{
            selfie_attendance:this.state.selfie_attendance,
            location_attendance:this.state.location_attendance,
            manual_attendance:this.state.manual_attendance,
         }]
         var params = {
            name : this.state.name,
            mobile_no: this.state.mobile_no,
            password:this.state.password,
            // designation:this.state.designation_type,
            is_relationship_manager:this.state.add_relation,
            relationship_manager:relationship_manager,
            for_app:this.state.for_app_data,
            for_app_type:for_app_type,
            telecaller_type:vehicle_type,
            is_mis_dock_relationship_manager:this.state.add_mis_relation,
            mis_dock_relationship_manager:relationship_manager_mis,
            punch_type:punch_data,
            source_from:this.state.sourced_from,
            for_admin_panel:this.state.web_portal_permission,
            profile_picture_name:this.state.profile_picture_name,
            profile_picture_extension:this.state.profile_picture_extension,
            profile_picture_string:this.state.profile_picture_string,
            address:this.state.emp_address,
            aadhar_number:this.state.aadhar_number,
            pan_number:this.state.pan_card_number,
            un_number:this.state.un_number,
            bank_account_number:this.state.bank_account_number,
         }
           console.log("add_Employee*****************", params);
             if(params.name == "" || params.name == undefined || params. mobile_no == "" || params. mobile_no == undefined || params.password == "" || params.password == undefined  ){
                this.setState({
                    error_meesage:"Please Fill all the field",
                    borderNew:true
                })
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
                         console.log("Add Employee Response****************",json);
                         admin_data = json;
                         this.setState({ add_admin_array:admin_data["data"] });
                        
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
                             error_meesage:"",
                             borderNew:false,
                             aadhar_number:"",
                                pan_card_number:"",
                                un_number:"",
                                bank_account_number:"",
                         } ) );
                         this.fetch_Admin();
                         }
                         else{
                             this.setState({
                                 modalOpen:true,
                                 error_meesage:admin_data.message
                             })
                         }
 
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
           console.log("xxxxxx",x);
           if (x.for_app_type=="" || x.for_app_type==null) {
             var for_app_type = ""
           }
           else{
               var for_app_type= x.for_app_type.label
           }
 
 
           if (x.date_of_appointment=="" || x.date_of_appointment==null || x.date_of_appointment == undefined) {
             var date_of_appointment = ""
           }
           else{
               var date_of_appointment= new Date(x.date_of_appointment)
           }

           if (x.punch_type == undefined) {
            var selfie_attendance = false
            var location_attendance = false
            var manual_attendance = false
           }else{
            var selfie_attendance = x.punch_type[0].selfie_attendance
            var location_attendance = x.punch_type[0].location_attendance
            var manual_attendance = x.punch_type[0].manual_attendance
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
           date_of_appointment:date_of_appointment,
           salary_type:x.salary_type,
           salary_type_label:x.salary_type ? x.salary_type.salary_type : "",
           template_name:x.salary_structure,
           selfie_attendance:selfie_attendance,
           location_attendance:location_attendance,
           manual_attendance:manual_attendance,
           emp_address:x.address,
           sourced_from:x.source_from,
           profile_image:x.profile_picture,
           profile_picture_name:x.profile_picture.split("profile_picture/")[1],
           already_uploaded_profile_picture:x.profile_picture.split("profile_picture/")[1],
           profile_picture_extension:"",
           web_portal_permission:x.for_admin_panel,
           aadhar_number:x.aadhar_number,
           pan_card_number:x.pan_number,
           un_number:x.un_number,
           bank_account_number:x.bank_account_number,
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
 
 
         if (this.state.date_of_appointment == ""|| this.state.date_of_appointment == undefined) {
             var date_of_appointment =""
         }else{
             var date = new Date(this.state.date_of_appointment);
             // ////////console.log("date",date);
             var dd = String(date.getDate()).padStart(2, '0');
             var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!;
             var yyyy = date.getFullYear();
 
             var date_of_appointment = yyyy + "-" + mm + "-" + dd
             console.log(date_of_appointment);
         }

         var punch_data =[{
            selfie_attendance:this.state.selfie_attendance,
            location_attendance:this.state.location_attendance,
            manual_attendance:this.state.manual_attendance,
         }]
         console.log(this.state.profile_picture_extension);
         if (this.state.profile_picture_extension == "" || this.state.profile_picture_extension == undefined) {
             var already_uploaded_profile_picture = this.state.already_uploaded_profile_picture
             var profile_picture_name = undefined
             var profile_picture_extension = undefined
             var profile_picture_string = undefined
         }else{
              var profile_picture_name = this.state.profile_picture_name
              var profile_picture_extension = this.state.profile_picture_extension
              var profile_picture_string = this.state.profile_picture_string
              var already_uploaded_profile_picture =undefined
         }
 
         var params = {
           user_id:this.state.id,
           name:this.state.name,
           mobile_no:this.state.mobile_no,
           password:this.state.password,
        //    role:this.state.role_type,
        //    designation:this.state.designation_type,
           is_relationship_manager:this.state.add_relation,
           relationship_manager:relationship_manager,
           for_app:this.state.for_app_data,
           for_app_type:for_app_type,
        //    monthly_salary:salary,
           telecaller_type:vehicle_type,
           suspend:this.state.suspend_unsuspen,
           is_mis_dock_relationship_manager:this.state.add_mis_relation,
           mis_dock_relationship_manager:relationship_manager_mis,
        //    salary_type:this.state.salary_type,
        //    structure_id:this.state.template_name ? this.state.template_name.value:"",
        //    date_of_appointment:date_of_appointment,
           punch_type:punch_data,
           source_from:this.state.sourced_from,
           for_admin_panel:this.state.web_portal_permission,
           profile_picture_name:profile_picture_name,
           profile_picture_extension:profile_picture_extension,
           profile_picture_string:profile_picture_string,
           address:this.state.emp_address,
           already_uploaded_profile_picture:already_uploaded_profile_picture,

            aadhar_number:this.state.aadhar_number,
            pan_number:this.state.pan_card_number,
            un_number:this.state.un_number,
            bank_account_number:this.state.bank_account_number,
         }
         console.log("edit===========", params);
         if(params.name == "" || params.name == undefined || params. mobile_no == "" || params. mobile_no == undefined || params.password == "" || params.password == undefined ){
            this.setState({
                error_meesage:"Please Fill all the field",
                borderNew:true
            })
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
                         this.fetch_single_admin(this.state.id)
                         this.setState( ( prevState ) => ( {
                             modalOpen: ! prevState.modalOpen,
                             heading:'Add Employee',
                             name : '',
                             mobile_no: '',
                             email:'',
                             password:'',
                             button: 'Save',
                             designation_type:"",
                             error_meesage:"",
                             borderNew:false,
                             aadhar_number:"",
                             pan_card_number:"",
                             un_number:"",
                             bank_account_number:"",
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

                       admin_array

                       var admin_array = this.state.admin_array

                       for (let pk = 0; pk < admin_array.length; pk++) {
                        if(admin_array[pk]._id == data.data[0]._id){
                         admin_array[pk].name = data.data[0].name
                         admin_array[pk].mobile_no = data.data[0].mobile_no
                         admin_array[pk].profile_picture = data.data[0].profile_picture
                        }

                       }
                      this.setState({
                        single_pending_array:data.data,
                        admin_array:admin_array,
                        user_id:data.data[0]._id,
                        ipad_width:"block",
                        ipad_emp_list:ipad_emp_list,
                        pending_spinner:"none",
                      })

                      this.fetch_user_engagement(data.data[0]._id)
 
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


     fetch_all_letter_template = ()=>  {
         const { settings } = this.props;
          const res = fetch(settings.api_url + "api/payroll/fetch_all_letter_template", {
              method: 'POST',
              headers: {
                  "Content-type": "application/json; charset=UTF-8",
              }
          }).then((response) => response.json())
              .then(json => {
                  console.log("Fetch Letter Template ***************", json)
                  var data = json;
                  if (data.status == true) {
 
                      this.setState({
                       letter_template_array: data.data,
                      });
                  }
                  else {
                      this.setState({
                       letter_template_array: [],
                      });
                  }
              })
           }
           

           handleChangeFile_Quotationn = async (event) => {
            //console.log("KKKKKKKKKKKKKKKKKKKKKKkk",event.target.files)
            var my_file =event.target.files
    
            if (event.target.files && event.target.files.length > 0) {
                const newImagesPromises = []
                for (let i = 0; i < event.target.files.length; i++) {
                  newImagesPromises.push(this.fileToDataUri_flat(event.target.files[i]))
                }
                const newImages = await Promise.all(newImagesPromises)
                //console.log("newImages",newImages);
                // setImages([...images, ...newImages])
                this.setState({
                  document_data: newImages,
                  attachment_data:my_file,
                  profile_image:newImages[0].profile_image,
                  profile_picture_string:newImages[0].profile_picture_string,
                  profile_picture_extension:newImages[0].profile_picture_extension,
                  profile_picture_name:newImages[0].profile_picture_name,
                })
          
          
                setTimeout(() => { console.log("this is the first message", this.state.document_data) }, 1000);
                // setTimeout(() => { console.log("this is the attachment_data************", this.state.attachment_data) }, 1000);
              }
    
    
            
           }

           fileToDataUri_flat = (image) => {
               console.log(image);
            return new Promise((res) => {
              const reader = new FileReader();
              const { type, name, size } = image;
              reader.addEventListener('load', () => {
                res({
                  profile_image: reader.result,
                  profile_picture_string: reader.result.split(';base64,')[1],
                  profile_picture_extension: reader.result.split(';')[0].split('/')[1],
                  profile_picture_name:image.name
                })
              });
              reader.readAsDataURL(image);
            })
          }



           UploadDocumentDataNew = async (event) => {
            console.log("KKKKKKKKKKKKKKKKKKKKKKkk",event)
            // console.log("KKKKKKKKKKKKKKKKKKKKKKkk",event.target.files)
            var my_file =event
    
            const newImagesPromises = []
            if (e.target.files && e.target.files.length > 0) {
                for (let i = 0; i < e.target.files.length; i++) {
                  newImagesPromises.push(this.fileToDataUri_flat12(e.target.files[i]))
                }
                const newImages = await Promise.all(newImagesPromises)
                //console.log("newImages",newImages);
                // setImages([...images, ...newImages])
                this.setState({
                    document_array_new: newImages,
                })
                
                this.upload_document_engagement(newImages)
          
                setTimeout(() => { console.log("document_array_new", this.state.document_array_new) }, 1000);
                // setTimeout(() => { console.log("this is the attachment_data************", this.state.attachment_data) }, 1000);
              }
    
    
            
           }

           fileToDataUrl = (image) => {
            return new Promise(   
              (res) => {
                const reader = new FileReader();
                const { type, name, size } = image;  
              reader.addEventListener('load', () => {
                res({
                 documents_base64: reader.result,
                  documents_string: reader.result.split(';base64,')[1],
                  file_type: image.type.split("/")[0],
                  document_name:image.name,
                  document_image_type:image.type.split("/")[0]
                })
              });
              reader.readAsDataURL(image);
            })
            
        }
    
        uploadImage = async (e) => {
            let file = e.target.files[0]
            console.log("FILE",file)
            const image_name = file.name
            console.log("image_name",image_name)
            const image_type = file.type.split("/")[1]
            console.log("image_type",image_type)
            const newImg = []
            if (e.target.files && e.target.files.length > 0) {
              
              for (let i = 0; i < e.target.files.length; i++) {
                newImg.push(this.fileToDataUrl(e.target.files[i]))
              }
              const newImages = await Promise.all(newImg);
              console.log(newImages)
    
    
                this.setState({
                    document_array_new: newImages,
                })
                this.upload_document_engagement(newImages)
            }
        }

           fileToDataUri_flat12 = (image) => {
               console.log(image);
            return new Promise((res) => {
              const reader = new FileReader();
              const { type, name, size } = image;
              reader.addEventListener('load', () => {
                res({
                  documents_base64: reader.result,
                  documents_string: reader.result.split(';base64,')[1],
                  file_type: image.type.split("/")[0],
                  document_name:image.name,
                  document_image_type:image.type.split("/")[0]
                })
              });
              reader.readAsDataURL(image);
            })
          }


          fetch_user_engagement = (user_id)=>  {
            const { settings } = this.props;
            var params ={
                user_id:user_id,
            }
            console.log("params Fetch Engagement",params);
             const res = fetch(settings.api_url + "fetch_user_engagement", {
                 method: 'POST',
                 body: JSON.stringify(params),
                 headers: {
                     "Content-type": "application/json; charset=UTF-8",
                 }
             }).then((response) => response.json())
                 .then(json => {
                     console.log("Fetch User Engagement ***************", json)
                     var data = json;
                     if (data.status == true) {
                         this.setState({
                          user_engagement_array: data.data,
                          activeTab2: data.data[0]._id,
                          no_data_for_engagement:"none"
                         });
                         this.fetch_single_user_engagement( data.data[0])
                     }
                     else {
                         this.setState({
                          user_engagement_array: [],
                          no_data_for_engagement:"block"
                         });
                     }
                 })
              }

              fetch_single_user_engagement=(value)=>{
                  console.log("value",value);
                  this.setState({
                    engagement_spinner:"none",
                    activeTab2: value._id,
                    engagement_id: value._id,
                    single_engagement_data:value,
                    engagement_type_show:value.type,
                    engagement_designation_show:value.designation,
                    engagement_role_show:value.role,
                    engagement_assiging_date_show:value.assiging_date,
                    engagement_salary_amount_show:value.salary_amount,
                    engagement_salary_structure_show:value.salary_structure,
                    engagement_documents_show:value.documents,
                  })
              }
           
              

          Engagementsmodal() {
            this.setState( ( prevState ) => ( {
                   Engagementsmodal: ! prevState.Engagementsmodal,
                   engagement_type:"",
                   designation_type:"",
                   role_type:"",
                   date_of_assigning:new Date(),
                   borderNew:false,
                   salary_emp:"",
                   salary_structure_obj:"",
                   error_meesage_eng:"",
                   heading_for_engagement :"Add Engagement",
                   button_for_engagement : "Save"
            } ) );
        }


          UploadDocumentModel() {
            this.setState( ( prevState ) => ( {
                   UploadDocumentModel: ! prevState.UploadDocumentModel,
                   document_array_new:[],
            } ) );
        }

          switch_function_for_engagement=()=>{
 
            if(this.state.button_for_engagement == "Save"){
              this.add_engagement();
            }
            else{
              this.edit_engagement();
            }
       
          }

          add_engagement=()=>{
            const { addToast,settings } = this.props;

            if (this.state.engagement_type == "" || this.state.engagement_type == undefined || this.state.designation_type == "" || this.state.designation_type == undefined || this.state.role_type == "" || this.state.role_type == undefined || this.state.date_of_assigning == "" || this.state.date_of_assigning == undefined || this.state.salary_emp == "" || this.state.salary_emp == undefined || this.state.salary_structure_obj == "" || this.state.salary_structure_obj == undefined) {
                this.setState({
                    error_meesage_eng:"Please fill all the fields",
                    borderNew:true
                })
            }else{

                    var date = new Date(this.state.date_of_assigning);
                    // ////////console.log("date",date);
                    var dd = String(date.getDate()).padStart(2, '0');
                    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!;
                    var yyyy = date.getFullYear();
        
                    var date_of_assigning = yyyy + "-" + mm + "-" + dd
                    console.log(date_of_assigning);


                var params ={
                    user_id:this.state.user_id,
                    type:this.state.engagement_type,
                    designation:this.state.designation_type,
                    role:this.state.role_type,
                    assiging_date:date_of_assigning,
                    salary_amount:Number(this.state.salary_emp),
                    salary_structure:this.state.salary_structure_obj,
                }
                console.log("params add_engagement",params);
                const res = fetch(settings.api_url + "add_engagement", {
                    method: 'POST',
                    body: JSON.stringify(params),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    }
                }).then((response) => response.json())
                    .then(json => {
                        console.log("Add Engagement ***************", json)
                        var data = json;
                        if (data.status == true) {
                            this.setState({
                                engagement_type:"",
                                designation_type:"",
                                role_type:"",
                                date_of_assigning:new Date(),
                                borderNew:false,
                                salary_emp:"",
                                salary_structure_obj:"",
                                error_meesage_eng:"",
                                heading_for_engagement :"Add Engagement",
                                button_for_engagement : "Save",
                                Engagementsmodal:false
                            });
                            addToast({
                                title: 'Book Your Insurance',
                                content: data["message"],
                                time: new Date(),
                                duration: 2000,
                            });

                            this.fetch_single_admin(this.state.user_id)
                        }
                        else {
                            this.setState({
                                error_meesage_eng:data["message"],
                                Engagementsmodal:true
                            });
                            addToast({
                                title: 'Book Your Insurance',
                                content: data["message"],
                                time: new Date(),
                                duration: 2000,
                            });
                        }
                    })
            }
          }

          for_edit_engegament=(value)=>{
              console.log(value);
            this.setState({
                engagement_id:value._id,
                user_id:value.user_id,
                engagement_type:value.type,
                designation_type:value.designation,
                role_type:value.role,
                date_of_assigning:new Date(value.assiging_date),
                borderNew:false,
                salary_emp:value.salary_amount,
                salary_structure_obj:value.salary_structure,
                error_meesage_eng:"",
                heading_for_engagement :"Edit Engagement",
                button_for_engagement : "Update",
                Engagementsmodal:true,
                is_type_update:false
            })
          }
          
          
          edit_engagement=()=>{
            const { addToast,settings } = this.props;

            if (this.state.engagement_type == "" || this.state.engagement_type == undefined || this.state.designation_type == "" || this.state.designation_type == undefined || this.state.role_type == "" || this.state.role_type == undefined || this.state.date_of_assigning == "" || this.state.date_of_assigning == undefined || this.state.salary_emp == "" || this.state.salary_emp == undefined || this.state.salary_structure_obj == "" || this.state.salary_structure_obj == undefined) {
                this.setState({
                    error_meesage_eng:"Please fill all the fields",
                    borderNew:true
                })
            }else{
                var date = new Date(this.state.date_of_assigning);
                // ////////console.log("date",date);
                var dd = String(date.getDate()).padStart(2, '0');
                var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!;
                var yyyy = date.getFullYear();
    
                var date_of_assigning = yyyy + "-" + mm + "-" + dd
                console.log(date_of_assigning);


            var params ={
                engagement_id:this.state.engagement_id,
                user_id:this.state.user_id,
                type:this.state.engagement_type,
                designation:this.state.designation_type,
                role:this.state.role_type,
                assiging_date:date_of_assigning,
                salary_amount:Number(this.state.salary_emp),
                salary_structure:this.state.salary_structure_obj,
                is_type_update:this.state.is_type_update,
            }
            console.log("params rdit_engagement",params);
            const res = fetch(settings.api_url + "update_engagement", {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }).then((response) => response.json())
                .then(json => {
                    console.log("Update Engagement ***************", json)
                    var data = json;
                    if (data.status == true) {
                        this.setState({
                            engagement_type:"",
                            designation_type:"",
                            role_type:"",
                            date_of_assigning:new Date(),
                            borderNew:false,
                            salary_emp:"",
                            salary_structure_obj:"",
                            error_meesage_eng:"",
                            heading_for_engagement :"Add Engagement",
                            button_for_engagement : "Save",
                            Engagementsmodal:false
                        });
                        addToast({
                            title: 'Book Your Insurance',
                            content: data["message"],
                            time: new Date(),
                            duration: 2000,
                        });

                        this.fetch_single_admin(this.state.user_id)
                    }
                    else {
                        this.setState({
                            error_meesage_eng:data["message"],
                            Engagementsmodal:true
                        });
                        addToast({
                            title: 'Book Your Insurance',
                            content: data["message"],
                            time: new Date(),
                            duration: 2000,
                        });
                    }
                })
            }
          }


          upload_document_engagement=(document_array_new)=>{
            const { addToast,settings } = this.props;

             var data_new = document_array_new
              for (let i = 0; i < data_new.length; i++) {
                  delete data_new[i].documents_base64
                  delete data_new[i].document_image_type
              }
              console.log(data_new);
            var params ={
                engagement_id:this.state.engagement_id,
                documents:data_new,
            }
            console.log("params Upload",params);
            const res = fetch(settings.api_url + "upload_document_engagement", {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }).then((response) => response.json())
                .then(json => {
                    console.log("Update Engagement ***************", json)
                    var data = json;
                    if (data.status == true) {
                        addToast({
                            title: 'Book Your Insurance',
                            content: data["message"],
                            time: new Date(),
                            duration: 2000,
                        });

                        this.fetch_single_admin(this.state.user_id)
                    }
                    else {
                        addToast({
                            title: 'Book Your Insurance',
                            content: data["message"],
                            time: new Date(),
                            duration: 2000,
                        });
                    }
                })
          }

          delete_engagement=()=>{
            const { addToast,settings } = this.props;
            var params ={
                engagement_id:this.state.engagement_id,
            }
            console.log("params Delete egagement",params);
            const res = fetch(settings.api_url + "delete_engagement", {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }).then((response) => response.json())
                .then(json => {
                    console.log("Delete Engagement ***************", json)
                    var data = json;
                    if (data.status == true) {
                        this.setState({
                            AlertDeleteEngegament:false
                        });
                        addToast({
                            title: 'Book Your Insurance',
                            content: data["message"],
                            time: new Date(),
                            duration: 2000,
                        });

                        this.fetch_single_admin(this.state.user_id)
                    }
                    else {
                        this.setState({
                            AlertDeleteEngegament:false
                        });
                        addToast({
                            title: 'Book Your Insurance',
                            content: data["message"],
                            time: new Date(),
                            duration: 2000,
                        });
                    }
                })
          }

          delete_document_engagement=(document_id)=>{
            const { addToast,settings } = this.props;
            var params ={
                engagement_id:this.state.engagement_id,
                document_id:document_id,
            }
            console.log("params Delete",params);
            const res = fetch(settings.api_url + "delete_document_engagement", {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }).then((response) => response.json())
                .then(json => {
                    console.log("Delete Uploaded Documents ***************", json)
                    var data = json;
                    if (data.status == true) {
                        this.setState({
                            AlertDeletePropasal:false
                        });
                        addToast({
                            title: 'Book Your Insurance',
                            content: data["message"],
                            time: new Date(),
                            duration: 2000,
                        });

                        this.fetch_single_admin(this.state.user_id)
                        // this.fetch_single_user_engagement(this.state.user_engagement_array[this.state.indexOfEngemenet])
                    }
                    else {
                        this.setState({
                            AlertDeletePropasal:false
                        });
                        addToast({
                            title: 'Book Your Insurance',
                            content: data["message"],
                            time: new Date(),
                            duration: 2000,
                        });
                    }
                })
          }

          upload_quotation_dock=(files)=>{
            console.log(files);
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
         var engagement_type = this.state.letter_template_array.map(item => {
             return {
                 value: item._id,
                 label: item.letter_name
             }
         })
 
 
         var for_app = [
             {value:"1",label:"SM"},
             {value:"2",label:"Telecaller"},
             {value:"3",label:"Direct"},
         ]
        //  var engagement_type = [
        //      {value:"1",label:"Joining"},
        //      {value:"2",label:"Probation"},
        //      {value:"3",label:"Appointment"},
        //      {value:"4",label:"Increment"},
        //  ]
 
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
             {value : "1", label: 'Hourly', salary_type : "Salary per Hour"},
             {value : "2", label: 'Daily', salary_type : "Salary per Day"},
             {value : "3", label: 'Monthly', salary_type : "Salary per Month"},
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
 
                                    <td  style={{verticalAlign:"middle",padding:"10px 16px",borderLeft:this.state.user_id == value._id ? "5px solid #8bc240" :""}}>
                                        <div style={{display:"inline-flex"}}>
                                             <div className="my_profile_img">
                                                 <img src={value.profile_picture == "" || value.profile_picture == undefined ? user_img : value.profile_picture} alt="Profile" width="30px" height="30px" />
                                            </div>
                                           <div className="line_new_height"> {value.name}</div>
                                        </div>
                                        
                                   </td>
                                    <td  style={{verticalAlign:"middle",padding:"10px 16px"}}>{value.mobile_no}</td>
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



                            <div className="col-lg-9 col-md-12 left_showw heading_opeartion"  style={{display: device_width < 769 ? this.state.ipad_width : "block",paddingLeft:"9px"}}>
                            <Spinner color="warning" className="agent_spinner agent_spinner_color" style={{ marginTop: gk, display: this.state.pending_spinner }} />
                            <div className="test_collapse pad_in_dar mycalendar" style={{display:this.state.pending_spinner=="none" ? "block" : "none",height:my_height-67}}>
                
                            {this.state.single_pending_array.map((value,index)=>{
                                    var x = value;
                                    let y =index;
                                         return(
                                             <div key={index}>
                                             <div className="box_data_employee">
                                                     <div className="client_name row" style={{marginTop:"5px"}}>
                                                         <div className="col-lg-8 col-md-8">
                                                         <div className="showLineImages">
                                                           <div className="my_profile_img_big">
                                                                <img aria-hidden = "true" onClick={()=>{
                                                                    this.setState({
                                                                        ShowImage:true,
                                                                        show_profile_img : value.profile_picture
                                                                    })
                                                                     }} src={value.profile_picture == "" || value.profile_picture == undefined ? user_img : value.profile_picture} alt="Profile"  />
                                                            </div>
                                                            <h2 className="persoanl_details">{value.name}{value.employment_id == undefined ? "" : " -"}<span className="empIdNew" style={{display: value.employment_id == undefined  ? "none" : "inline-flex"}}>  {value.employment_id}</span></h2>
                                                         </div>
                                                         </div>
                                                            {/* <div className="col-lg-8 col-md-8">
                                                                <h3> <div className="top_value">Employee Name</div>
                                                                <div className="bottom_value">{value.name}</div></h3>
                                                            </div> */}
                                                            <div className="col-lg-4 col-md-4 data_newww" style={{textAlign:"end",paddingRight:"30px",marginTop:"10px"}}>
                                                             <div className="toogle_new_12">
                                                             <div style={{marginRight:"-8px"}}>
                                                              <CustomInput type="switch" id={"formSwitch1" + index} name={"formSwitch1" + index}  checked={value.suspend==true ? true : false}  disabled/>
                                                             </div>
                                                                <p className="emp_sus_or_not">{value.suspend==true ? "Suspended" :"Unsuspended"}</p>
                                                            </div>
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
                                                     <div className="col-lg-6 col-md-6 col-sm-12 mt-15">
                                                        <div className="top_value">Mobile Number</div>
                                                        <div className="bottom_value">{value.mobile_no}</div>
                                                        {/* <div className="width_of_data_new_1_llll ">Mobile Number</div>: */}
                                                         {/* <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.mobile_no}</span> */}
                                                      </div>
                                                     <div className="col-lg-6 col-md-6 col-sm-12 mt-15" style={{display:value.address == "" ? "none" : "block"}}>
                                                        <div className="top_value">Address</div>
                                                        <div className="bottom_value">{value.address}</div>
                                                      </div>
                                                     <div className="col-lg-6 col-md-6 col-sm-12 mt-15" style={{display:value.source_from == "" ? "none" : "block"}}>
                                                        <div className="top_value">Source from</div>
                                                        <div className="bottom_value">{value.source_from}</div>
                                                      </div>
                                                     <div className="col-lg-6 col-md-6 col-sm-12 mt-15" style={{display:value.aadhar_number == "" || value.aadhar_number == undefined ? "none" : "block"}}>
                                                        <div className="top_value">Aadhar Number</div>
                                                        <div className="bottom_value">{value.aadhar_number}</div>
                                                      </div>
                                                     <div className="col-lg-6 col-md-6 col-sm-12 mt-15" style={{display:value.pan_number == "" || value.pan_number == undefined ? "none" : "block"}}>
                                                        <div className="top_value">PAN Number</div>
                                                        <div className="bottom_value">{value.pan_number}</div>
                                                      </div>
                                                     <div className="col-lg-6 col-md-6 col-sm-12 mt-15" style={{display:value.un_number == "" || value.un_number == undefined ? "none" : "block"}}>
                                                        <div className="top_value">UN Number</div>
                                                        <div className="bottom_value">{value.un_number}</div>
                                                      </div>
                                                     <div className="col-lg-6 col-md-6 col-sm-12 mt-15" style={{display:value.bank_account_number == "" || value.bank_account_number == undefined ? "none" : "block"}}>
                                                        <div className="top_value">Bank Account Number</div>
                                                        <div className="bottom_value">{value.bank_account_number}</div>
                                                      </div>
                                                     
                                                    
 
                                                      {/* <div className="col-lg-6 col-md-6 col-sm-12 mt-15">
                                                        <div className="top_value">Date of Appointment</div>
                                                        <div className="bottom_value" >{value.date_of_appointment ?  value.date_of_appointment.split("-")[2] + "-" + value.date_of_appointment.split("-")[1] + "-" + value.date_of_appointment.split("-")[0] :""}</div>
                                                      </div> */}
 
 
                                                     <div className="col-lg-6 col-md-6 col-sm-12 mt-15">
                                                        <div className="top_value">Attendance Type</div>
                                                        <div className="bottom_value" >{value.punch_type ?  value.punch_type.map((val,ind)=>{
                                                            return(
                                                                <div key={ind}>
                                                                    <span style={{display:val.selfie_attendance == true ? "inline-flex" : "none"}}>Selfie</span><span style={{display:val.location_attendance == true && val.selfie_attendance == true ? "inline-flex" : "none",letterSpacing:"10px"}}>, </span>
                                                                    <span style={{display:val.location_attendance == true ? "inline-flex" : "none"}}> Location</span><span style={{display:val.manual_attendance == true && val.location_attendance == true ? "inline-flex" : "none",letterSpacing:"10px"}}>, </span>
                                                                    <span style={{display:val.manual_attendance == true ? "inline-flex" : "none"}}> Manual</span>
                                                                </div>
                                                            )
                                                        }) :""}</div>
                                                      </div>
 
                                                     <div className="col-lg-6 col-md-6 col-sm-12 mt-15" style={{display:value.is_relationship_manager == false || value.is_relationship_manager == null ? "none" : "block"}}>
                                                        <div className="top_value">Relationship Manager For Operation Dock</div>
                                                        <div className="bottom_value">{value.relationship_manager ? value.relationship_manager.label :""}</div>
 
                                                        {/* <div className="width_of_data_new_1_llll">Relationship Manager For Operation Dock</div>:
                                                         <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.relationship_manager ? value.relationship_manager.label :""}  </span> */}
                                                      </div>
                                                     <div className="col-lg-6 col-md-6 col-sm-12 mt-15" style={{display:value.is_mis_dock_relationship_manager == false || value.is_mis_dock_relationship_manager == null ? "none" : "block"}}>
                                                        <div className="top_value">Relationship Manager For MIS Dock</div>
                                                        <div className="bottom_value">{value.mis_dock_relationship_manager ? value.mis_dock_relationship_manager.label :""}</div>
                                                        {/* <div className="width_of_data_new_1_llll">Relationship Manager For MIS Dock</div>:
                                                         <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.mis_dock_relationship_manager ? value.mis_dock_relationship_manager.label :""}  </span> */}
                                                      </div>
                                                 
                                                  
                                                    
                                                      {/* <div className="col-lg-4 col-md-4 col-sm-12 profilrImage">
                                                        <div className="top_value">Profile Picture</div>
                                                        <div className="bottom_value" style={{marginTop:"6px",cursor:"pointer"}} aria-hidden = "true" onClick={()=>{
                                                            this.setState({
                                                                ShowImage:true,
                                                                show_profile_img : value.profile_picture
                                                            })
                                                        }}>
                                                            <img className="image_size" src={value.profile_picture == "" || value.profile_picture == undefined ? user_img : value.profile_picture} alt="Profile"  />
                                                        </div>
                                                      </div> */}
                                                 </div>
                                             </div>



                                             <div className="box_data_employee">
                                                 <div className="row" style={{marginTop:"16px"}}>
                                                   <div className="col-lg-8 col-md-8">
                                                       <h2 className="" style={{marginTop:"0px",marginBottom:"13px"}}>Engagements Details</h2>
                                                   </div>
                                                   <div className="col-lg-4 col-md-4" style={{textAlign:"end",paddingRight:"30px"}}>
                                                       <Button color="primary" style={{textTransform:"capitalize"}} onClick={()=>{
                                                           this.setState({
                                                            Engagementsmodal:true,
                                                            user_id:value._id
                                                           })
                                                       }}>Add Engagement</Button>
                                                   </div>
                                                 </div>

                                                 <h3 style={{ display: this.state.no_data_for_engagement, padding: "15px",color:" #a4a3a3",width: "100%",marginTop:"14px"}}>No Data Found</h3>
                                                <div className="" style={{display: this.state.no_data_for_engagement=="none" ? "block" :"none"}}>
                                                <Tabs pills className="engagement_tab scroll_1" >
                                                {this.state.user_engagement_array.map((val,index)=>{
                                                    return(
                                                        <>
                                                        <Tabs.NavItem
                                                            isActive={ this.state.activeTab2 === val._id }
                                                            onClick={ () => {
                                                                this.setState({
                                                                    engagement_id: val._id,
                                                                    engagement_spinner:"block",
                                                                    indexOfEngemenet:index
                                                                })
                                                                this.toggleTab( 2, val._id )
                                                                setTimeout(() => {
                                                                    this.fetch_single_user_engagement(val)
                                                                }, 600)
                                                            } }
                                                        >
                                                            {val.type.label}
                                                        </Tabs.NavItem>
                                                      </>
                                                   
                                                    )
                                                })}
                                                 </Tabs>
                                                     <Tabs.Content activeTab={ this.state.activeTab2 }>
                                                     <Tabs.Pane tabId={this.state.engagement_id}>
                                                         <div style={{height:this.state.engagement_spinner=="none" ? "" :"450px"}}>
                                                          <Spinner color="warning" className="agent_spinnerNew agent_spinner_color" style={{ marginTop: "55px", display: this.state.engagement_spinner }} />
                                                              <div className="test_collapse" style={{display:this.state.engagement_spinner=="none" ? "block" : "none"}}>
                                                              <div className="row borderBottomNew">
                                                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                                                        <div className="top_value">Type</div>
                                                                        <div className="bottom_value">{this.state.engagement_type_show ? this.state.engagement_type_show.label : ""}</div>
                                                                    </div>
                                                                    <div className="col-lg-6 col-md-6 col-sm-12" style={{textAlign:"end",paddingRight:"30px"}}>
                                                                    <Button
                                                                            disabled={this.state.admin_control =="false" ? 'disabled' : ''}
                                                                            className="btn delete_btoon"
                                                                            color="success"
                                                                            style={{marginRight:'10px',padding: '6px 6px',justifyContent:'center',textAlign:'center',textTransform:"capitalize" }}
                                                                                onClick={() => {
                                                                                    this.for_edit_engegament(this.state.single_engagement_data)
                                                                                }}> Update</Button>
                                                                     <Button
                                                                        disabled={this.state.admin_control =="false" ? 'disabled' : ''}
                                                                            className="btn "
                                                                            color="danger"
                                                                            style={{marginRight:'10px',verticalAlign:"middle",padding: '6px 6px',justifyContent:'center',textAlign:'center',textTransform:"capitalize"}}
                                                                            onClick={()=>{
                                                                                this.setState({
                                                                                    AlertDeleteEngegament:true,
                                                                                })
                                                                            }}
                                                                        > Delete</Button>
                                                                     {/* <Button
                                                                        disabled={this.state.admin_control =="false" ? 'disabled' : ''}
                                                                            className="btn "
                                                                            color="info"
                                                                            style={{verticalAlign:"middle",padding: '6px 6px',justifyContent:'center',textAlign:'center',textTransform:"capitalize"}}
                                                                            onClick={()=>{
                                                                                this.setState({
                                                                                    UploadDocumentModel:true,
                                                                                })
                                                                            }}
                                                                        > Upload Document</Button> */}
                                                                     </div>
                                                                    <div className="col-lg-6 col-md-6 col-sm-12 mt-15">
                                                                        <div className="top_value">Designation</div>
                                                                        <div className="bottom_value">{this.state.engagement_designation_show ? this.state.engagement_designation_show.label : ""}</div>
                                                                    </div>
                                                                    <div className="col-lg-6 col-md-6 col-sm-12 mt-15">
                                                                        <div className="top_value">Role</div>
                                                                        <div className="bottom_value">{this.state.engagement_role_show ? this.state.engagement_role_show.label : ""}</div>
                                                                    </div>
                                                                    <div className="col-lg-6 col-md-6 col-sm-12 mt-15">
                                                                        <div className="top_value">Assiging Date</div>
                                                                        <div className="bottom_value">{this.state.engagement_assiging_date_show ? this.state.engagement_assiging_date_show.split("-")[2] + "-" + this.state.engagement_assiging_date_show.split("-")[1] + "-" + this.state.engagement_assiging_date_show.split("-")[0] : ""}</div>
                                                                    </div>
                                                                    <div className="col-lg-6 col-md-6 col-sm-12 mt-15">
                                                                        <div className="top_value">Salary Amount</div>
                                                                        <div className="bottom_value">&#x20b9;{this.state.engagement_salary_amount_show }</div>
                                                                    </div>
                                                                    <div className="col-lg-6 col-md-6 col-sm-12 mt-15">
                                                                        <div className="top_value">Salary Structure</div>
                                                                        <div className="bottom_value">{this.state.engagement_salary_structure_show ? this.state.engagement_salary_structure_show.label : ""}</div>
                                                                    </div>
                                                                    {/* <div className="col-lg-6 col-md-12 col-sm-12 mt-15">
                                                                        <div className="top_value">Documents</div>
                                                                        <div className="bottom_value">
                                                                            <div className="row" style={{marginTop:"10px"}}>
                                                                                {this.state.engagement_documents_show ? this.state.engagement_documents_show.map((v1,i)=>{
                                                                                    return(
                                                                                        <div className="col-lg-3 col-md-4 col-sm-4 small_devicess" style={{textAlign:"center"}} key={i}>
                                                                                     <div>
                                                                                       <div style={{display:v1.editable == false ? "none" : "block"}}>
                                                                                            <button type="button" disabled={this.state.admin_control == "false" ? 'disabled' : ''} className="btn btn-danger btn-uniform btn-sm mnt-10 mnb-10 p-0 delte_image"
                                                                                                onClick={()=>{
                                                                                                    this.setState({
                                                                                                    AlertDeletePropasal:true,
                                                                                                    document_id:v1.id,
                                                                                                    })
                                                                                                }}style={{ display: "grid" }}>
                                                                                                    <Icon name="x" />
                                                                                                </button>
                                                                                        </div>
                                                                                        <span style={{display:v1.file_type=="image" ? "block" :"none"}}>
                                                                                        <a rel="noreferrer" href={v1.show_url} target="_blank">
                                                                                          <img src={v1.show_url} alt="img" className="image_pdf" style={{borderRadius:"5px",height:"60px"}}/></a>
                                                                                        </span>
                                          
                                                                                        <span style={{display:v1.file_type=="pdf" ? "block" :"none"}}>
                                                                                         <a rel="noreferrer" href={v1.show_url} target="_blank">
                                                                                         <img src={pdf_img} aria-hidden="true" alt="pdf image" className="image_pdf" style={{height:"60px"}}/></a>
                                                                                        </span>

                                                                                        <p className="img_name marquee"><span>{v1.document_name}</span></p>
                                                                                         <div className="pdf_timee ">{v1.date_time ? (dateFormat(new Date(v1.date_time.replace("Z", "")), "dd-mm-yyyy")):""}</div>
                                            
                                                                                        </div>
                                                                                        </div>
                                                                                    )
                                                                                }) : ""}
                                                                           </div>
                                                                        </div>
                                                                    </div> */}
                                                              </div>

                                                              <div className="row" style={{marginTop:"25px"}}>
                                                                    <div className="col-lg-8 col-md-8" style={{display:"inline-flex"}}>
                                                                        <h2 className="" style={{marginTop:"4px",marginBottom:"13px"}}>Upload Document</h2>
                                                                        <div className="drop_zone_new_emp" style={{pointerEvents : this.state.policy_dock_control == "false" ? "none" :"", width:"240px",marginLeft:"10px"}}>
                                                                        {/* <Dropzone
                                                                            className="hhhhttttttttttttttt"
                                                                            maxFiles={5} // Set the maximum allowed files to 5
                                                                            filesLimit={5} // Optional, just to be explicit
                                                                            onChange={(files) => {
                                                                                this.UploadDocumentDataNew(files);
                                                                            }}
                                                                            /> */}
                                                                            <input id="inputGroupFile02" type="file"  className="no_input_file" onChange={this.uploadImage} multiple style={{display:"none"}} />
                                                                              <label className="lord_lable" htmlFor="inputGroupFile02">
                                                                                        <div className="file_name"></div>
                                                                                    <div className="choose align-self-center">Choose file</div>
                                                                              </label>
                                                                            </div>
                                                                    </div>
                                                                    </div>

                                                                    <div className="uploaded_imhg" style={{marginTop:"10px"}}>
                                                                                {this.state.engagement_documents_show ? this.state.engagement_documents_show.map((v1,i)=>{
                                                                                    return(
                                                                                        <div className="side_img_new" key={i}>
                                                                                     <div>
                                                                                       <div style={{display:v1.editable == false ? "none" : "block"}}>
                                                                                            <button type="button" disabled={this.state.admin_control == "false" ? 'disabled' : ''} className="btn btn-danger btn-uniform btn-sm mnt-10 mnb-10 p-0 delte_image"
                                                                                                onClick={()=>{
                                                                                                    this.setState({
                                                                                                    AlertDeletePropasal:true,
                                                                                                    document_id:v1.id,
                                                                                                    })
                                                                                                }}style={{ display: "grid" }}>
                                                                                                    <Icon name="x" />
                                                                                                </button>
                                                                                        </div>
                                                                                        <span style={{display:v1.file_type=="image" ? "block" :"none"}}>
                                                                                        <a rel="noreferrer" href={v1.show_url} target="_blank">
                                                                                          <img src={v1.show_url} alt="img" className="image_pdf" style={{borderRadius:"5px",height:"60px"}}/></a>
                                                                                        </span>
                                          
                                                                                        <span style={{display:v1.file_type=="pdf" || v1.file_type=="application" || v1.file_type!="image" ? "block" :"none"}}>
                                                                                         <a rel="noreferrer" href={v1.show_url} target="_blank">
                                                                                         <img src={pdf_img} aria-hidden="true" alt="pdf image" className="image_pdf" style={{height:"60px"}}/></a>
                                                                                        </span>

                                                                                        <p className="img_name marquee"><span>{v1.document_name}</span></p>
                                                                                         <div className="pdf_timee ">{v1.date_time ? (dateFormat(new Date(v1.date_time.replace("Z", "")), "dd-mm-yyyy")):""}</div>
                                            
                                                                                        </div>
                                                                                        </div>
                                                                                    )
                                                                                }) : ""}
                                                                           </div>

                                                              </div>
                                                        </div>
                                                     </Tabs.Pane>
                                                   
                                                   </Tabs.Content>
                                                {/* {this.state.user_engagement_array.map((val,index)=>{
                                                    return(
                                                        <div key={index}>
                                                        <Tabs pills className="engagement_tab" >
                                                        <Tabs.NavItem
                                                            isActive={ this.state.activeTab2 === 'home'+index }
                                                            onClick={ () => this.toggleTab( 2, 'home'+index ) }
                                                        >
                                                            {val.type.label}
                                                        </Tabs.NavItem>
                                                      
                                                    </Tabs>
                                                     <Tabs.Content activeTab={ this.state.activeTab2 }>
                                                     <Tabs.Pane tabId={"home"+index}>
                                                         Behold life divided man subdue, after. Form winged creeping. Was divide of without evening give, was. Open had fruitful. Were lesser greater heaven also fly first for together is appear days. Gathered bearing midst green every fly behold fish you&apos;re.
                                                     </Tabs.Pane>
                                                   
                                                   </Tabs.Content>
                                                   </div>
                                                    )
                                                })} */}
                                               
                                             
                                               
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
                <Modal
                        isOpen={ this.state.ShowImage }
                        toggle={ this.ShowImage }
                        className={ this.props.className,"modal-dialog-centered" }
                        fade
                    >
                        <div className="modal-header">
                            <h5 className="modal-title h2">Profile Picture</h5>
                            <Button className="close" color="" onClick={ this.ShowImage }>
                                <Icon name="x" />
                            </Button>
                        </div>
                        <ModalBody>
                             <div className="rwo" style={{textAlign:"center"}}>
                               <img style={{width:"400px"}} src={this.state.show_profile_img == ""|| this.state.show_profile_img == undefined ? user_img : this.state.show_profile_img}  alt="profile"/>
                             </div>
                         </ModalBody>
                           
                         <ModalFooter>
                            <Button color="secondary" onClick={ this.ShowImage }>Close</Button>
                        </ModalFooter>
                    </Modal> 
 
 
 
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
                                     <Label for="phone">Name<span className="start_mark">*</span></Label>
                                     <Input
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
                                         invalid={this.state.borderNew  && this.state.name == "" ? true :false}
 
 
                                     />
 
                                 </div>
                                 <div className="col-lg-6 col-md-6 col-xs-12">
                                     <Label for="phone">Mobile Number<span className="start_mark">*</span></Label>
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
 
                                     <Input
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
                                         invalid={this.state.borderNew  && this.state.mobile_no == "" ? true :false}
                                     />
                                     {this.state.mobile_number_error ? (
                                         <div className="invalid-feedback">{this.state.mobile_number_error}</div>
                                     ) : ''}
 
                                 </div>
                                 <div className="col-lg-6 col-md-6 col-xs-12">
                                     <Label for="phone">Password<span className="start_mark">*</span></Label>
                                     <Input
                                         type="text"
                                         className="form-control"
                                         aria-describedby="emailHelp"
                                         placeholder="Password"
                                         invalid={this.state.borderNew  && this.state.password == "" ? true :false}
                                         value={this.state.password}
                                         onChange={(e) => {
                                          this.setState({
                                            password:e.target.value
                                          })
 
                                         }}
 
                                     />
 
                                 </div>
                                 <div className="col-lg-6 col-md-6 col-xs-12">
                                     <Label for="phone">Address</Label>
                                     <Input
                                         type="text"
                                         className="form-control"
                                         aria-describedby="emailHelp"
                                         placeholder="Address"
                                         value={this.state.emp_address}
                                         onChange={(e) => {
                                          this.setState({
                                            emp_address:e.target.value
                                          })
 
                                         }}
 
                                     />
 
                                 </div>
                                 <div className="col-lg-6 col-md-6 col-xs-12">
                                     <Label for="phone">Sourced From</Label>
                                     <Input
                                         type="text"
                                         className="form-control"
                                         aria-describedby="emailHelp"
                                         placeholder="Sourced From"
                                         value={this.state.sourced_from}
                                         onChange={(e) => {
                                          this.setState({
                                            sourced_from:e.target.value
                                          })
 
                                         }}
 
                                     />
 
                                 </div>
                                 <div className="col-lg-6 col-md-6 col-xs-12">
                                     <Label for="phone">Aadhar Number</Label>
                                     <Input
                                         type="text"
                                         className="form-control"
                                         aria-describedby="emailHelp"
                                         placeholder="Aadhar Number"
                                         value={this.state.aadhar_number}
                                         onChange={(e) => {
                                          this.setState({
                                            aadhar_number:e.target.value
                                          })
 
                                         }}
 
                                     />
                                 </div>
                                 <div className="col-lg-6 col-md-6 col-xs-12">
                                     <Label for="phone">PAN Card Number</Label>
                                     <Input
                                         type="text"
                                         className="form-control"
                                         aria-describedby="emailHelp"
                                         placeholder="PAN Card Number"
                                         value={this.state.pan_card_number}
                                         onChange={(e) => {
                                          this.setState({
                                            pan_card_number:e.target.value
                                          })
 
                                         }}
 
                                     />
 
                                 </div>
                                 <div className="col-lg-6 col-md-6 col-xs-12">
                                     <Label for="phone">UN Number</Label>
                                     <Input
                                         type="text"
                                         className="form-control"
                                         aria-describedby="emailHelp"
                                         placeholder="UN Number"
                                         value={this.state.un_number}
                                         onChange={(e) => {
                                          this.setState({
                                            un_number:e.target.value
                                          })
 
                                         }}
 
                                     />
 
                                 </div>
                                 <div className="col-lg-6 col-md-6 col-xs-12">
                                     <Label for="phone">Bank Account Number</Label>
                                     <Input
                                         type="text"
                                         className="form-control"
                                         aria-describedby="emailHelp"
                                         placeholder="Bank Account Number"
                                         value={this.state.bank_account_number}
                                         onChange={(e) => {
                                          this.setState({
                                            bank_account_number:e.target.value
                                          })
 
                                         }}
 
                                     />
 
                                 </div>
                                
                                 {/* <div className="col-lg-6 col-md-6 col-xs-12">
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
 
                                 </div> */}
                                 {/* <div className="col-lg-6 col-md-6 col-xs-12">
                              <Label for="phone">Designation<span className="start_mark">*</span></Label>
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
                                         className={this.state.borderNew && this.state.designation_type == "" ?  "is_not_valid" : "contact_sort"}
                               />
 
                                 </div> */}
                                
                                 {/* <div className="col-lg-6 col-md-6 col-xs-12">
                                         <Label for="phone">Date of Appointment</Label>
                                         <div>
                                         <DatePicker
                                             value={this.state.date_of_appointment}
                                             selected={this.state.date_of_appointment}
                                             onChange={(val) => {
                                             this.setState({
                                                 date_of_appointment: val
                                             });
                                             }}
                                             dateFormat="dd-MM-yyyy"
                                             className="rui-datetimepicker form-control d-flex new_widht"
                                         />
                                         </div>
                                 </div> */}
                                 {/* <div className="col-lg-6 col-md-6 col-xs-12">
                                         <Label for="phone">Salary Type</Label>
                                         <Select
                                         value={this.state.salary_type}
                                         options={obj_delivered}
                                         styles={customStyles}
                                         className="contact_sort"
                                         onChange={(e) => {
                                             console.log(e);
                                             this.setState({ 
                                                 salary_type: e,
                                                 salary_type_label:e.salary_type
                                                })
                                             }}
                                         />
                                 </div>  
                                 <div className="col-lg-6 col-md-6 col-xs-12" style={{display:this.state.salary_type_label == ""  ? "none" : "block"}}>
                                         <Label for="phone">{this.state.salary_type_label}</Label>
                                         <input
                                         type="number"
                                         className="form-control"
                                         aria-describedby="emailHelp"
                                         placeholder={"Add" + " " +this.state.salary_type_label}
                                         value={this.state.add_salary}
                                         onChange={(e) => {
                                          this.setState({
                                            add_salary:e.target.value
                                          })
                                          this.onChange(e.target.value)
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
                                 </div> */}
                                 <div className="col-lg-6 col-md-6 col-xs-12">
                                         <Label for="phone">Attendance Type<span className="start_mark">*</span></Label>
                                        <div style={{display:"inline-flex",width:"100%"}}>
                                        <div style={{width:"80px"}}>
                                        <CustomInput type="checkbox"  className="" label="Selfie" defaultChecked={this.state.selfie_attendance==true ? true : false} id="formCheckboxSelfi"
                                            onClick={(e) => {
                                                this.setState({
                                                    selfie_attendance: e.target.checked
                                                })
                                                }}
                                      />
                                        </div>
                                        <div style={{width:"100px"}}>
                                        <CustomInput type="checkbox" className="" label="Location" defaultChecked={this.state.location_attendance==true ? true : false} id="formCheckboxLocation"
                                            onClick={(e) => {
                                                this.setState({
                                                    location_attendance: e.target.checked
                                                })
                                                }}
                                      />
                                        </div>
                                        <div>
                                        <CustomInput type="checkbox" className="" label="Manual" defaultChecked={this.state.manual_attendance==true ? true : false} id="formCheckboxManual"
                                            onClick={(e) => {
                                                this.setState({
                                                    manual_attendance: e.target.checked
                                                })
                                                }}
                                      />
                                        </div>
                                        </div>
                                 </div>
                                
 
 
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
                                   <Label for="phone">Web Protal Permission</Label>
                                   <CustomInput type="checkbox" className="large_checkkkk" defaultChecked={this.state.web_portal_permission==true ? true : false} id="formCheckboxWeb"
                                   onClick={(e) => {
                                     this.setState({
                                         web_portal_permission: e.target.checked
                                     })
                                     }}
                                      />
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

                                 <div className="col-lg-6 col-md-6 col-xs-12" >
                                   <Label for="phone">Upload Picture</Label>
                                   <div>
                                    <input id="inputGroupFile01" type="file"  className="no_input_file" accept="image/*" onChange={this.handleChangeFile_Quotationn} style={{display:"none"}} />
                                         <label className="lord_lable" htmlFor="inputGroupFile01">
                                            <div className="file_name">{this.state.profile_picture_name}</div>
                                          <div className="choose align-self-center">Choose file</div>
                                      </label>
                                        <div style={{display:this.state.profile_image == "" ?"none" : "block"}}>
                                        <img src={this.state.profile_image == "" ? "" : this.state.profile_image} alt ="Profile" width="55" height="55" /> 
                                       </div>
                                    </div>
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
                                 <div className="col-lg-12 col-md-12" style={{display:this.state.error_meesage=="" ? "none" :"block"}}>
                                     <p className="false_message_new">{this.state.error_meesage}</p>
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



                     {/* *********************** Engegment Model ****************************************** */}
                   <Modal
                         isOpen={ this.state.Engagementsmodal }
                         toggle={ this.Engagementsmodal }
                         className={ this.props.className,"my_model modal-dialog-centered" }
                         fade
                     >
                         <div className="modal-header">
                             <h5 className="modal-title h2">{this.state.heading_for_engagement}</h5>
                             <Button className="close" color="" onClick={ this.Engagementsmodal }>
                                 <Icon name="x" />
                             </Button>
                         </div>
                         <ModalBody>
                         <div className="form rui-sign-form rui-sign-form-cloud">
                             <div className="row vertical-gap sm-gap justify-content-flex-start">
                                 <div className="col-lg-6 col-md-6 col-xs-12" >
                                 <Label for="Type">Type<span className="start_mark">*</span></Label>
                                 <Select
                                    value = {this.state.engagement_type}
                                    onChange={(e) => {
                                        this.setState({
                                            engagement_type: e,error_meesage_eng:"",is_type_update:true
                                        });
                                    }}
                                    placeholder="Select Relation"
                                    options={ engagement_type }
                                    styles={ customStyles }
                                    className={this.state.borderNew && this.state.engagement_type == "" ?  "is_not_valid" : "contact_sort"}
                                    />
                                 </div>
                                 <div className="col-lg-6 col-md-6 col-xs-12">
                                  <Label for="phone">Designation<span className="start_mark">*</span></Label>
                                   <Select
                                         value = {this.state.designation_type}
                                         onChange={(e) => {
                                             ////////console.log(e, "Val.....")
                                             this.setState({
                                                 designation_type: e,error_meesage_eng:""
                                             });
                                         }}
                                         placeholder="Select Designation"
                                         options={ destination_array }
                                         styles={ customStyles }
                                         className={this.state.borderNew && this.state.designation_type == "" ?  "is_not_valid" : "contact_sort"}
                                     />
 
                                 </div>
                              <div className="col-lg-6 col-md-6 col-xs-12">
                                  <Label for="phone">Role<span className="start_mark">*</span></Label>
                                   <Select
                                         value = {this.state.role_type}
                                         onChange={(e) => {
                                             this.setState({
                                                 role_type: e,error_meesage_eng:""
                                             });
                                         }}
                                         placeholder="Select Role"
                                         options={ role_array }
                                         styles={ customStyles }
                                         className={this.state.borderNew && this.state.role_type == "" ?  "is_not_valid" : "contact_sort"}
                                      />
 
                                 </div> 
                                 <div className="col-lg-6 col-md-6 col-xs-12">
                                         <Label for="phone">Date of Assigning<span className="start_mark">*</span></Label>
                                         <div>
                                         <DatePicker
                                             value={this.state.date_of_assigning}
                                             selected={this.state.date_of_assigning}
                                             onChange={(val) => {
                                             this.setState({
                                                 date_of_assigning: val,error_meesage_eng:""
                                             });
                                             }}
                                             dateFormat="dd-MM-yyyy"
                                             className="rui-datetimepicker form-control d-flex new_widht"
                                         />
                                         </div>
                                 </div>
                                 <div className="col-lg-6 col-md-6 col-xs-12">
                                     <Label for="phone">Salary<span className="start_mark">*</span></Label>
                                     <Input
                                         type="number"
                                         className="form-control"
                                         aria-describedby="emailHelp"
                                         placeholder="Salary"
                                         invalid={this.state.borderNew  && this.state.salary_emp == "" ? true :false}
                                         value={this.state.salary_emp}
                                         onChange={(e) => {
                                          this.setState({
                                            salary_emp:e.target.value,error_meesage_eng:""
                                          })
 
                                         }}
 
                                     />
 
                                 </div>
                                 <div className="col-lg-6 col-md-6 col-xs-12">
                                         <Label for="phone">Salary Structure<span className="start_mark">*</span></Label>
                                         <Select
                                         value={this.state.salary_structure_obj}
                                         options={tem_object}
                                         styles={customStyles}
                                         className={this.state.borderNew && this.state.salary_structure_obj == "" ?  "is_not_valid" : "contact_sort"}
                                         onChange={(e) => {
                                             this.setState({ salary_structure_obj: e,error_meesage_eng:""})
                                             }}
                                         />
                                 </div>
                                 
 
 
                                 <div className="col-lg-12 col-md-12" style={{display:this.state.error_meesage_eng=="" ? "none" :"block"}}>
                                     <p className="false_message_new">{this.state.error_meesage_eng}</p>
                                 </div>
 
 
                                 </div>
                             </div>
                         </ModalBody>
                         <ModalFooter>
                             <Button color="secondary" style={{textTransform:"capitalize"}} onClick={ this.Engagementsmodal }>Close</Button>
                             { ' ' }
                             <Button color="brand" style={{backgroundColor:"#8bc240" ,borderColor:"#8bc240",textTransform:"capitalize"}} onClick={ this.switch_function_for_engagement}>{this.state.button_for_engagement}</Button>
                         </ModalFooter>
                     </Modal>



                     {/* *********************** Upload Document Model ****************************************** */}
                   <Modal
                         isOpen={ this.state.UploadDocumentModel }
                         toggle={ this.UploadDocumentModel }
                         className={ this.props.className," modal-dialog-centered" }
                         fade
                     >
                         <div className="modal-header">
                             <h5 className="modal-title h2">Upload Document</h5>
                             <Button className="close" color="" onClick={ this.UploadDocumentModel }>
                                 <Icon name="x" />
                             </Button>
                         </div>
                         <ModalBody>
                         <div className="form rui-sign-form rui-sign-form-cloud">
                             <div className="row vertical-gap sm-gap justify-content-flex-start">
                             <div className="col-lg-8 col-md-8 col-xs-12" >
                                   <Label for="phone">Upload Document</Label>
                                   <div>
                                    <input id="inputGroupFile02" type="file"  className="no_input_file" onChange={this.uploadImage} multiple style={{display:"none"}} />
                                         <label className="lord_lable" htmlFor="inputGroupFile02">
                                            <div className="file_name"></div>
                                          <div className="choose align-self-center">Choose file</div>
                                      </label>
                                        <div style={{display:this.state.document_array_new == "" ?"none" : "inline-flex",width:"100%",flexWrap : "wrap"}}>
                                            {this.state.document_array_new.map((val,ind)=>{
                                                return(
                                                    <div key={ind} style={{marginBottom:"10px",marginRight:"10px"}}>
                                                         <span style={{display:val.document_image_type=="image" ? "block" :"none"}}>
                                                            <img src={val.documents_base64} alt="img" className="image_pdf" style={{borderRadius:"5px",height:"60px"}}/>
                                                        </span>
                                                         <span style={{display:val.document_image_type=="application" ? "block" :"none"}}>
                                                            <img src={pdf_img} alt="img" className="image_pdf" style={{borderRadius:"5px",height:"60px"}}/>
                                                        </span>
                                                    </div>
                                                )
                                            })}
                                        {/* <img src={this.state.profile_image == "" ? "" : this.state.profile_image} alt ="Profile" width="55" height="55" />  */}
                                       </div>
                                    </div>
                                </div>
                                
                                 <div className="col-lg-12 col-md-12" style={{display:this.state.error_meesage_eng=="" ? "none" :"block"}}>
                                     <p className="false_message_new">{this.state.error_meesage_eng}</p>
                                 </div>
 
 
                                 </div>
                             </div>
                         </ModalBody>
                         <ModalFooter>
                             <Button color="secondary" style={{textTransform:"capitalize"}} onClick={ this.UploadDocumentModel }>Close</Button>
                             { ' ' }
                             <Button color="brand" style={{backgroundColor:"#8bc240" ,borderColor:"#8bc240",textTransform:"capitalize"}} onClick={ this.upload_document_engagement}>Save</Button>
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
                                    this.delete_document_engagement(this.state.document_id)

                                }}
                            >yes</Button>
                            {'             '}
                        </div>

                    </ModalBody>
                </Modal>


                 <Modal
                    style={{ width: '300px', height: 'auto', justifyContent: 'center', textAlign: 'center', alignItem: 'center', marginTop: '200px' }}
                    isOpen={this.state.AlertDeleteEngegament}
                    toggle={this.AlertDeleteEngegament}
                    className={this.props.className, "del_model"}
                    fade
                >
                    <ModalBody>
                        <div style={{ width: '100%', height: '20px' }}>
                            <Button className="close" style={{ float: 'right' }} color="" onClick={this.AlertDeleteEngegament}>
                                <Icon name="x" />
                            </Button>
                        </div>
                        <div style={{ width: '100%', height: '50px' }}>
                            <p >Are you sure you want to Delete ?</p>

                        </div>
                        <div style={{ height: '50px', width: '100%' }}>
                          <Button style={{ marginRight: "20px"}} color="secondary" onClick={this.AlertDeleteEngegament}>no</Button>

                            <Button color="warning" disabled={this.state.policy_dock_control == "false" ? 'disabled' : ''}
                                style={{ color:"#fff"}}
                                onClick={() => {
                                    this.delete_engagement()

                                }}
                            >yes</Button>
                            {'             '}
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
 