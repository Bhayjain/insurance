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
 import { Table, Modal, ModalBody, ModalFooter, Button, Label,Spinner,CustomInput,Input,ButtonGroup,Collapse} from 'reactstrap';
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
import cv from '../../images/cv.png'
import resume from '../../images/resume.png'
import dateFormat from 'dateformat';
import Dropzone from '../../components/dropzone';
import { isValidEmail } from '../../utils';

import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import TextEditor from '../../components/text-editor';

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

 const admin_data = JSON.parse(Cookies.get('admin_data'));

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
             upload_doc_delete: false,
             activeTab2: '',
             ShowImage: false,
             modalOpen: false,
             modalOpenMoveToEmployee: false,
             uploadmodal:false,
             generate_loading: false,
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
             prospect_id:'',
             mobile_number_error:'',
             isLoading:"block",
             role_array: [],
             single_pending_array: [],
             role_type:"",
             admin_control:Cookies.get('recuritement_control'),
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
             heading_for_engagement :"Add Interview",
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
            recruitment_type:"ongoing",
            email_id_emp:"",
            emailError:"",
            document_data_resume_img:[],
            resume_img :"",
            resume_img_string :"",
            resume_img_extension :"",
            resume_img_name :"",
            emp_address :"",
            sourced_from :"",
            interview_date_and_time:new Date(),
            manager_typeahead:[],
            selectedOptions:[],
            interview_detail:[],
            buttonNameInterview:"",
            add_review_for_interview:"",
            interview_review:"",
            admin_value : admin_data[0]._id,
            admin_label : admin_data[0].name,
            review_array:[],
            button_review : "Add Review",
            AlertDeleteReview : false,
            offerTab:"",
            generate_error:"",
            intervew_section : "none",
            employee_mang_control : Cookies.get("employee_mang_contro"),


            the_document: '',
            upload_doc_name: '',
            uploadDocumentArray:[{
                documentName:"",
                uploadFileName:"",
              }],
              activeAccordion:0,
              document_array : []
         };
         this.AlertDelete = this.AlertDelete.bind( this );
         this.upload_doc_delete = this.upload_doc_delete.bind( this );
         this.toggle = this.toggle.bind( this );
         this.toggleMoveToEmployee = this.toggleMoveToEmployee.bind( this );
         this.add_prospect = this.add_prospect.bind( this );
         this.update_prospect = this.update_prospect.bind( this );
         this.switch_function = this.switch_function.bind( this );
         this.checkNumber = this.checkNumber.bind(this);
         this.checkEmail = this.checkEmail.bind(this);
         this.ShowImage = this.ShowImage.bind(this);
         this.uploadmodal = this.uploadmodal.bind( this );

         this.Engagementsmodal = this.Engagementsmodal.bind(this);
         this.UploadDocumentModel = this.UploadDocumentModel.bind(this);
         this.toggleTab = this.toggleTab.bind( this );
         this.AlertDeletePropasal = this.AlertDeletePropasal.bind( this );
         this.AlertDeleteEngegament = this.AlertDeleteEngegament.bind( this );
         this.AlertDeleteReview = this.AlertDeleteReview.bind( this );
         this.handleChangeNote = this.handleChangeNote.bind( this );




         this.fetch_prospect();
         this.fetch_admin_role();
         this.fetch_designation();
         this.fetch_all_salary_structure();
         this.fetch_all_letter_template();
     }

     checkEmail() {
        const {
            email_id_emp,
        } = this.state;

        const isValid = email_id_emp && isValidEmail( email_id_emp );

        this.setState( {
            emailError: isValid ? '' : 'Invalid email format',
        } );

        return isValid;
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

    AlertDeleteReview() {
        this.setState( ( prevState ) => ( {
            AlertDeleteReview: ! prevState.AlertDeleteReview,
        } ) );
    }
    upload_doc_delete() {
        this.setState( ( prevState ) => ( {
            upload_doc_delete: ! prevState.upload_doc_delete,
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
             loading:false
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
             heading:'Add Prospect',
             button: 'Save',
             designation_type:"",
             email_id_emp:"",
             emailError:"",
             profile_picture_name:"",
             profile_picture_extension:"",
             profile_picture_string:"",
             resume_img :"",
             resume_img_string :"",
             resume_img_extension :"",
             resume_img_name :"",
             emp_address :"",
             sourced_from :"",
             loading:false
         } ) );
     }

     uploadmodal() {spinner_1:"none",
         this.setState((prevState) => ({
             uploadmodal: !prevState.uploadmodal,
                   the_document:"",
                   upload_doc_name:""

         }));
     }


     toggleMoveToEmployee() {
         ////console.log("kkkkkkkkkkkkkkkkkkk");
         this.setState( ( prevState ) => ( {
             modalOpenMoveToEmployee: ! prevState.modalOpenMoveToEmployee,
             loading:false

         } ) );
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
                        admin_data = json;
                        this.setState({ designation_array:admin_data["data"],isLoading:"none"});
                    })
                    .then(() => {
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
    switch_function(){

      if(this.state.button == "Save"){
        this.add_prospect();
        ////////console.log("worng call");
      }
      else{
        this.update_prospect();
      }

    }


     fetch_prospect= (search_name,pageNumber)=>  {
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
             emp_name:search_name,
             status : this.state.recruitment_type
         }
         console.log("params",params);
             var admin_data = null;
                 const res = fetch(settings.api_url + "api/offer_letter/fetch_prospect", {
                     method: 'POST',
                     body: JSON.stringify(params),
                     headers: {
                         "Content-type": "application/json; charset=UTF-8",
                     }
                 }).then((response) => response.json())
                     .then(json => {
                         console.log("Fetch Prospect Data @@@@@@@@@@@@@@@@@",json)
                         admin_data = json;

                         if (admin_data.status==true) {
                             this.setState({ admin_array:admin_data["data"],isLoading:"none",total_pages_emp: admin_data.total_pages,
                             total_emp:admin_data.total,no_data_message:"none"});
                             if (device_width < 820) {

                                }
                                else{

                                 this.fetch_single_prospect(admin_data.data[0]._id)
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
                     })
       }


       fetch_single_prospect = (prospect_id)=>  {
        const { settings } = this.props;
        var params={
            prospect_id:prospect_id
       }
       console.log("Single Params",params);
         const res = fetch(settings.api_url + "api/offer_letter/fetch_single_prospect", {
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
                   if (device_width < 820) {
                       var ipad_emp_list = "none";
                      }
                      else{
                      var ipad_emp_list = "block"
                      }

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
                       interview_detail:data.data[0].interview_detail,
                       single_status:data.data[0].status,
                       document_array:data.data[0].document_array,
                       admin_array:admin_array,
                       prospect_id:data.data[0]._id,
                       ipad_width:"block",
                       ipad_emp_list:ipad_emp_list,
                       pending_spinner:"none",
                     })

                     this.show_button(data.data[0]._id)

                     var interview_detail = data.data[0].interview_detail
                     if (interview_detail.length == 0) {
                         this.setState({
                             intervew_section : "none"
                         })
                     }else{
                        this.setState({
                            intervew_section : "block"
                        })
                         this.fetch_single_interview_deatils(data.data[0].interview_detail[interview_detail.length-1])
                     }


                 }
                 else {
                   this.setState({
                       single_pending_array:[],
                       document_array:[],
                       pending_spinner:"none",
                     })
                 }
             })
     }


       show_button = (prospect_id)=>  {
        const { settings } = this.props;
        var params={
            prospect_id:prospect_id
       }
       console.log("Single Params",params);
         const res = fetch(settings.api_url + "api/offer_letter/show_button", {
             method: 'POST',
             body: JSON.stringify(params),
             headers: {
                 "Content-type": "application/json; charset=UTF-8",
             }
         }).then((response) => response.json())
             .then(json => {
                 console.log("Show Button ****", json)
                 var data = json;
                 if (data.status == true) {
                     this.setState({
                       buttonNameInterview:data.button,
                     })
                 }
                 else {

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
      add_prospect(){

         const {
             addToast,
             settings
         } = this.props;


             if(this.state.name == "" || this.state.name == undefined || this.state.mobile_no == "" || this.state.mobile_no == undefined || this.state.designation_type == "" || this.state.designation_type == undefined
             || this.state.emp_address == undefined || this.state.emp_address == undefined || this.state.email_id_emp == undefined || this.state.sourced_from == undefined || this.state.sourced_from == undefined || this.state.email_id_emp == undefined
             ){
                this.setState({
                    error_meesage:"Please Fill all the field",
                    borderNew:true
                })
             }
             else{

                this.setState({
                    loading : true
                })

                var params = {
                    name : this.state.name,
                    mobile_no: this.state.mobile_no,
                    designation:this.state.designation_type,
                    profile_picture_name:this.state.profile_picture_name,
                    profile_picture_extension:this.state.profile_picture_extension,
                    profile_picture_string:this.state.profile_picture_string,
                    resume_name : this.state.resume_img_name,
                    resume_extension : this.state.resume_img_extension,
                    resume_string : this.state.resume_img_string,
                    source_from : this.state.sourced_from,
                    email_id : this.state.email_id_emp,
                    address : this.state.emp_address
                 }
                 console.log("add prospect params*****************", params);
                 var admin_data = null;
                 const res = fetch(settings.api_url + "api/offer_letter/add_prospect", {
                     method: 'POST',
                     body: JSON.stringify(params),
                     headers: {
                         "Content-type": "application/json; charset=UTF-8",
                     }
                 }).then((response) => response.json())
                     .then(json => {
                         console.log("Add Prospects Response****************",json);
                         admin_data = json;
                         this.setState({ add_admin_array:admin_data["data"] });

                         if(admin_data.status==true){
                           addToast({
                               title: 'Add Prospect',
                               content: admin_data.message,
                               time: new Date(),
                               duration: 1000,
                           });
                           this.setState( ( prevState ) => ( {
                                modalOpen: ! prevState.modalOpen,
                                name : '',
                                mobile_no: '',
                                email:'',
                                designation_type:"",
                                error_meesage:"",
                                borderNew:false,
                                heading:'Add Prospect',
                                button: 'Save',
                                designation_type:"",
                                email_id_emp:"",
                                emailError:"",
                                profile_picture_name:"",
                                profile_picture_extension:"",
                                profile_picture_string:"",
                                resume_img :"",
                                resume_img_string :"",
                                resume_img_extension :"",
                                resume_img_name :"",
                                emp_address :"",
                                sourced_from :"",
                                loading:false
                         } ) );
                         this.fetch_prospect();
                         }
                         else{
                             this.setState({
                             modalOpen:true,
                             error_meesage:admin_data.message,
                             loading : false
                             })
                         }

                     })

             }
       }

       delete_prospect(prospect_id){
                 const {
                     addToast,
                     settings
                 } = this.props;
                 this.setState({
                    loading : true
                 })
               var params = {
                 prospect_id:prospect_id
               }
               ////////console.log(params,"params");
               var delete_data;
               ////////console.log("delete admin", params);
                   const res = fetch(settings.api_url + "api/offer_letter/delete_prospect", {
                       method: 'POST',
                       body: JSON.stringify(params),
                       headers: {
                           "Content-type": "application/json; charset=UTF-8",
                       }
                   }).then((response) => response.json())
                       .then(json => {
                           console.log("Delete Prospect",json)
                           delete_data = json;
                           this.setState({ delete:delete_data["status"] });
                           this.setState({
                            loading : false
                           })
                           if(delete_data["status"]==true){
                             addToast({
                                 title: 'Delete',
                                 content: delete_data["message"],
                                 time: new Date(),
                                 duration: 1000,
                             });
                             this.setState({
                                 AlertDelete:false
                             }),
                             this.fetch_prospect();
                           }else{
                             addToast({
                                 title: 'Delete',
                                 content: delete_data["message"],
                                 time: new Date(),
                                 duration: 1000,
                             });
                             this.setState({
                                 AlertDelete:false
                             }),
                             this.fetch_prospect();

                           }


                       })

             }

       for_edit(x){
           console.log("xxxxxx",x);
         this.setState({
           button:"Update",
           heading:"Update Prospect",
           name : x.name,
           mobile_no: x.mobile_no,
           email_id_emp:x.email_id,
           prospect_id: x._id,
           designation_type:x.designation,
           emp_address:x.address,
           sourced_from:x.source_from,
           profile_image:x.profile_picture,
           profile_picture_name:x.profile_picture.split("profile_picture/")[1],
           already_uploaded_profile_picture:x.profile_picture.split("profile_picture/")[1],
           profile_picture_extension:"",
           resume_img_name:x.resume.split("prospect/")[1],
           already_uploaded_resume:x.resume.split("prospect/")[1],
           resume_img_extension:"",
         })
       }




       update_prospect(){
         const { addToast,settings } = this.props;

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
         if (this.state.resume_img_extension == "" || this.state.resume_img_extension == undefined) {
             var already_uploaded_resume = this.state.already_uploaded_resume
             var resume_img_name = undefined
             var resume_img_extension = undefined
             var resume_img_string = undefined
         }else{
              var resume_img_name = this.state.resume_img_name
              var resume_img_extension = this.state.resume_img_extension
              var resume_img_string = this.state.resume_img_string
              var already_uploaded_resume =undefined
         }


         if(this.state.name == "" || this.state.name == undefined || this.state.mobile_no == "" || this.state.mobile_no == undefined || this.state.designation_type == "" || this.state.designation_type == undefined
             || this.state.emp_address == undefined || this.state.emp_address == undefined || this.state.email_id_emp == undefined || this.state.sourced_from == undefined || this.state.sourced_from == undefined || this.state.email_id_emp == undefined
             ){
                this.setState({
                    error_meesage:"Please Fill all the field",
                    borderNew:true
                })
             }
         else{

            this.setState({
                loading : true
            })
            var params = {
                prospect_id:this.state.prospect_id,
                name : this.state.name,
                mobile_no: this.state.mobile_no,
                designation:this.state.designation_type,
                resume_name : resume_img_name,
                resume_extension : resume_img_extension,
                resume_string : resume_img_string,
                already_uploaded_resume : already_uploaded_resume,
                source_from : this.state.sourced_from,
                email_id : this.state.email_id_emp,
                address : this.state.emp_address,
                profile_picture_name:profile_picture_name,
                profile_picture_extension:profile_picture_extension,
                profile_picture_string:profile_picture_string,
                already_uploaded_profile_picture:already_uploaded_profile_picture,

              }
              console.log("edit===========", params);
             var edit_admin_data = null;
             const res = fetch(settings.api_url + "api/offer_letter/update_prospect", {
                 method: 'POST',
                 body: JSON.stringify(params),
                 headers: {
                     "Content-type": "application/json; charset=UTF-8",
                 }
             }).then((response) => response.json())
                 .then(json => {
                     edit_admin_data = json;
                     console.log("Edit Prospects Response****************",json);

                     this.setState({ edit_admin_array:edit_admin_data["data"] });

                     this.setState({
                        loading : false
                     })

                     if(edit_admin_data.status== true)
                     {
                         addToast({
                             title: 'Update Prospect',
                             content: edit_admin_data["message"],
                             time: new Date(),
                             duration: 2000,
                         });
                         this.fetch_single_prospect(this.state.prospect_id)
                         this.setState( ( prevState ) => ( {
                                modalOpen: ! prevState.modalOpen,
                                name : '',
                                mobile_no: '',
                                email:'',
                                designation_type:"",
                                error_meesage:"",
                                borderNew:false,
                                heading:'Add Prospect',
                                button: 'Save',
                                designation_type:"",
                                email_id_emp:"",
                                emailError:"",
                                profile_picture_name:"",
                                profile_picture_extension:"",
                                profile_picture_string:"",
                                resume_img :"",
                                resume_img_string :"",
                                resume_img_extension :"",
                                resume_img_name :"",
                                emp_address :"",
                                sourced_from :"",
                         } ) );

                     }
                     else{
                        this.setState({
                            modalOpen:true,
                            error_meesage:edit_admin_data.message
                            })
                         addToast({
                             title: 'Update Admin',
                             content: edit_admin_data["message"],
                             time: new Date(),
                             duration: 2000,
                         });
                     }

                 })
         }

       }

// handleUploadDocument = (e) => {
//   console.log("upload_doc_index###########",this.state.upload_doc_index);
//   var file = e.target.files[0];
//   console.log("fleeee", file);

//   if (file) {
//     var reader = new FileReader();

//     reader.onloadend = () => {
//       this.setState({
//         upload_doc_name:file
//         // You can also store the file content or perform additional logic here
//       });
//     };

//     reader.readAsDataURL(file);
//   }

//   this.add_documents_file(file)
// }


handleUploadDocument = (index) => (e) => {
    console.log("upload_doc_index###########", index);

    var file = e.target.files[0];
    console.log("fleeee", file);

    if (file) {
      var reader = new FileReader();

      reader.onloadend = () => {
        this.setState({
          upload_doc_name: file
          // You can also store the file content or perform additional logic here
        });

        this.add_documents_file(file, index); // Pass the correct index
      };

      reader.readAsDataURL(file);
    }
  }

add_documents_file=(file,index)=>{
    console.log("file,index",file,index);

    var upload_doc =this.state.uploadDocumentArray
    upload_doc[index].uploadFileName = file
    this.setState({
        uploadDocumentArray:upload_doc
    })

}
add_documents=(value,index)=>{
  var upload_doc =this.state.uploadDocumentArray
  upload_doc[index].documentName = value
  this.setState({
    uploadDocumentArray:upload_doc
  })
}


       handleClickPlusButton = () => {
         var documentName = this.state.the_document;
         var uploadFileName = this.state.upload_doc_name;

         // Create an object with the collected data
         var dataObject = {
           documentName : "",
           uploadFileName : "",
         };

         // Create a copy of the existing dataArray and push the new dataObject
         var newDataArray = [...this.state.uploadDocumentArray, dataObject];

         // Update the state with the new array
         this.setState({
              uploadDocumentArray: newDataArray,
            }, () => {
              console.log('Updated uploadDocumentArray:', this.state.uploadDocumentArray);
            });


         console.log('Document Name:', documentName);
         console.log('Upload File Name:', uploadFileName);

         // Perform additional logic or send data to the server
       }

       delete_fields_salary(t) {
        var uploadDocumentArray = this.state.uploadDocumentArray.filter(n => n !== t);
        this.setState({
            uploadDocumentArray: uploadDocumentArray,
        })
        console.log(uploadDocumentArray,"Delete_________");
    }

       upload_recuritement_document=()=>{
        var documents_array=[]
        var uploadDocumentArray = this.state.uploadDocumentArray
        for (let i = 0; i < uploadDocumentArray.length; i++) {
            documents_array.push({name : uploadDocumentArray[i].documentName})
        }
        console.log("documents_array",documents_array);
          this.setState({
            loading : true
        })
        const { settings, addToast } = this.props;
        var files = this.state.icon_aminities
        console.log("files",files);
        var fd = new FormData();

        uploadDocumentArray.map((val)=>{
            fd.append(val.documentName,val.uploadFileName);
        })

          fd.append('documents',JSON.stringify(documents_array));
          fd.append('prospect_id', this.state.prospect_id);

          console.log(...fd, "Add Outdoor")
          const res = fetch(settings.api_url + "api/offer_letter/upload_document_prospect", {
          method: 'POST',
          body: fd
      })
          .then((response) => response.json())
          .then(json => {
            console.log("Upload Doc Response**************************************", {response: json })
            var data = json;
            if (data.status == true) {
                this.setState({
                    uploadDocumentArray:[{
                        documentName:"",
                        uploadFileName:"",
                      }],
                    uploadmodal :  false,
                    loading :  false,
                })
              addToast({
                title: 'Book your Insurance',
                content:  data["message"],
                duration: 1000,
              });
              this.fetch_single_prospect(this.state.prospect_id)
            }
            else {
                this.setState({
                    uploadDocumentArray:[{
                        documentName:"",
                        uploadFileName:"",
                      }],
                    uploadmodal :  false,
                    loading :  false,
                })
              addToast({
                title: 'Book your Insurance',
                content: data["message"],
                duration: 1000,
              });
            }
          })

       }


       delete_document_prospect=(image_id)=>{
        const { addToast,settings } = this.props;
        this.setState({
            loading : true
        })
        var params ={
            prospect_id:this.state.prospect_id,
            image_id:image_id,
        }
        console.log("params Delete Doc",params);
        const res = fetch(settings.api_url + "api/offer_letter/delete_document_prospect", {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                console.log("Delete Doc ***************", json)
                var data = json;
                this.setState({
                    loading : false
                })
                if (data.status == true) {
                    this.setState({
                        upload_doc_delete:false
                    });
                    addToast({
                        title: 'Book Your Insurance',
                        content: data["message"],
                        time: new Date(),
                        duration: 2000,
                    });

                    this.fetch_single_prospect(this.state.prospect_id)
                }
                else {
                    this.setState({
                        upload_doc_delete:false
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
              }
           }

           handleUploadResume = async (event) => {
            //console.log("KKKKKKKKKKKKKKKKKKKKKKkk",event.target.files)
            var my_file =event.target.files

            if (event.target.files && event.target.files.length > 0) {
                const newImagesPromises = []
                for (let i = 0; i < event.target.files.length; i++) {
                  newImagesPromises.push(this.fileToDataUri_flat_Resume(event.target.files[i]))
                }
                const newImages = await Promise.all(newImagesPromises)
                //console.log("newImages",newImages);
                // setImages([...images, ...newImages])
                this.setState({
                  document_data_resume_img: newImages,
                  attachment_data:my_file,
                  resume_img:newImages[0].resume_img,
                  resume_img_string:newImages[0].resume_img_string,
                  resume_img_extension:newImages[0].resume_img_extension,
                  resume_img_name:newImages[0].resume_img_name,
                })

                setTimeout(() => { console.log("this is the first message", this.state.document_data_resume_img) }, 1000);
              }
           }



           fileToDataUri_flat_Resume = (image) => {
               console.log(image);
            return new Promise((res) => {
              const reader = new FileReader();
              const { type, name, size } = image;
              reader.addEventListener('load', () => {
                res({
                  resume_img: reader.result,
                  resume_img_string: reader.result.split(';base64,')[1],
                  resume_img_extension: reader.result.split(';')[0].split('/')[1],
                  resume_img_name:image.name
                })
              });
              reader.readAsDataURL(image);
            })
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

                                        var nre_time = new_date_1 + " " + time_new


                    return nre_time;
                  }

              fetch_single_interview_deatils=(value)=>{
                  console.log("value",value);
                  var interview_date = this.formatDate(value.interview_date)
                  console.log("interview_date",interview_date);

                  if (value.documents == undefined) {

                  }else{
                    var document_date = this.formatDate(value.documents[0].date_time)
                    var document_name = value.documents[0].document_name
                  }

                  if(value.details_added != undefined && value.details_added != ""){
                    var details_added = value.details_added
                  }else{
                    var details_added = ''
                  }

                  this.setState({
                    engagement_spinner:"none",
                    status_update: value.status_update,
                    activeTab2: value._id,
                    offerTab: value.type,
                    interview_id: value._id,
                    offer_id: value._id,
                    interview_date:interview_date,
                    interview_message:value.message,
                    interview_status:value.status,
                    offer_status:value.status,
                    details_added:details_added,
                    interviewer:value.interviewer ? value.interviewer.label : "",
                    date_of_assigning :value.assiging_date ?  new Date(value.assiging_date) : new Date(),
                    engagement_type:value.letter_template,
                    salary_emp:value.salary_amount,
                    salary_structure_obj:value.salary_structure,
                    document_url:value.document_url,
                    document_date:document_date,
                    document_name : document_name
                  })

                  this.fetch_remark(value._id)
              }


              fetch_remark= (interview_id)=>  {
                const { settings } = this.props;
                  var params = {
                    interview_id:interview_id,
                }
                console.log("params",params);
                    var admin_data = null;
                        const res = fetch(settings.api_url + "api/offer_letter/fetch_remark", {
                            method: 'POST',
                            body: JSON.stringify(params),
                            headers: {
                                "Content-type": "application/json; charset=UTF-8",
                            }
                        }).then((response) => response.json())
                            .then(json => {
                                console.log("Fetch Review @@@@@@@@@@@@@@@@@",json)
                                admin_data = json;

                                if (admin_data.status==true) {
                                    var review_data = admin_data["data"]
                                    for (let i = 0; i < review_data.length; i++) {
                                        var date_time = review_data[i].added_date
                                        var new_date_time = this.formatDate(date_time);
                                        review_data[i].added_date_new = new_date_time
                                    }
                                    this.setState({
                                         review_array:review_data
                                        });

                                }else{
                                    this.setState({
                                        review_array:[],
                                        });
                                }
                            })
              }




          Engagementsmodal() {
            this.setState( ( prevState ) => ( {
                   Engagementsmodal: ! prevState.Engagementsmodal,
                   interview_date_and_time:new Date(),
                   heading_for_engagement :"Add Interview",
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
              this.add_interview();
            }
            else{
              this.edit_engagement();
            }

          }

          add_interview=()=>{
            const { addToast,settings } = this.props;

            if (this.state.selectedOptions == "" || this.state.selectedOptions == undefined ) {
                this.setState({
                    error_meesage_eng:"Please fill all the fields",
                    borderNew:true
                })
            }else{

                this.setState({
                    loading : true
                })

                var params ={
                    prospect_id:this.state.prospect_id,
                    interviewer:this.state.selectedOptions[0],
                    interview_date:this.state.interview_date_and_time.toISOString(),
                    hitted_from:this.state.recruitment_type
                }
                console.log("params add_interview",params);
                const res = fetch(settings.api_url + "api/offer_letter/add_interview", {
                    method: 'POST',
                    body: JSON.stringify(params),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    }
                }).then((response) => response.json())
                    .then(json => {
                        console.log("Add Interview ***************", json)
                        var data = json;
                        this.setState({
                            loading : false
                        })
                        if (data.status == true) {
                            this.setState({
                                manager_typeahead:[],
                                selectedOptions:[],
                                date_of_assigning:new Date(),
                                heading_for_engagement :"Add Interview",
                                button_for_engagement : "Save",
                                Engagementsmodal:false
                            });
                            addToast({
                                title: 'Book Your Insurance',
                                content: data["message"],
                                time: new Date(),
                                duration: 2000,
                            });

                            if(this.state.recruitment_type == 'rejected'){

                              this.fetch_prospect()
                            }else{

                              this.fetch_single_prospect(this.state.prospect_id)
                            }

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







          handleChangeNote(html) {

            this.setState({
                add_review_for_interview: html,
            })
        }


        add_remark=()=>{
            const { addToast,settings } = this.props;
            console.log("nnn");
            if (this.state.add_review_for_interview == "" || this.state.add_review_for_interview == undefined ) {
                this.setState({
                    error_meesage_eng:"Please fill all the fields",
                    borderNew:true
                })
            }else{

                var added_by ={
                    value : this.state.admin_value,
                    label : this.state.admin_label,
                }

                this.setState({
                    loading : true
                })

                var params ={
                    interview_id:this.state.interview_id,
                    added_by:added_by,
                    remark:this.state.add_review_for_interview
                }
                console.log("params add_remark",params);
                const res = fetch(settings.api_url + "api/offer_letter/add_remark", {
                    method: 'POST',
                    body: JSON.stringify(params),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    }
                }).then((response) => response.json())
                    .then(json => {
                        console.log("Add Review ***************", json)
                        var data = json;
                        if (data.status == true) {
                            this.setState({
                                add_review_for_interview:"",
                                button_review : "Add Review",
                                loading : false
                            });
                            addToast({
                                title: 'Book Your Insurance',
                                content: data["message"],
                                time: new Date(),
                                duration: 2000,
                            });

                            this.fetch_single_prospect(this.state.prospect_id)
                        }
                        else {
                            this.setState({
                                loading : false
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

          review_edit=(val)=>{
                this.setState({
                    remark_id : val._id,
                    add_review_for_interview : val.remark,
                    button_review : "Update Review"
                })
          }

          switch_functionality_for_review =()=>{
              if (this.state.button_review == "Add Review") {
                  this.add_remark()
              }else{
                  this.update_remark()
              }
          }


          update_remark=()=>{
            const { addToast,settings } = this.props;
            console.log("nnn");
            if (this.state.add_review_for_interview == "" || this.state.add_review_for_interview == undefined ) {
                this.setState({
                    error_meesage_eng:"Please fill all the fields",
                    borderNew:true
                })
            }else{
                this.setState({
                    loading : true
                })
                var params ={
                    remark_id:this.state.remark_id,
                    remark:this.state.add_review_for_interview
                }
                console.log("params update_remark",params);
                const res = fetch(settings.api_url + "api/offer_letter/update_remark", {
                    method: 'POST',
                    body: JSON.stringify(params),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    }
                }).then((response) => response.json())
                    .then(json => {
                        console.log("Update Review ***************", json)
                        var data = json;
                        this.setState({
                            loading : false
                        })
                        if (data.status == true) {
                            this.setState({
                                add_review_for_interview:"",
                                button_review : "Add Review"
                            });
                            addToast({
                                title: 'Book Your Insurance',
                                content: data["message"],
                                time: new Date(),
                                duration: 2000,
                            });

                            this.fetch_single_prospect(this.state.prospect_id)
                        }
                        else {
                            this.setState({

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


          delete_remark=(remark_id)=>{
            const { addToast,settings } = this.props;
            this.setState({
                loading : true
            })
            var params ={
                remark_id:remark_id,
            }
            console.log("params Delete egagement",params);
            const res = fetch(settings.api_url + "api/offer_letter/delete_remark", {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }).then((response) => response.json())
                .then(json => {
                    console.log("Delete Remark ***************", json)
                    var data = json;
                    this.setState({
                        loading : false
                    })
                    if (data.status == true) {
                        this.setState({
                            AlertDeleteReview:false
                        });
                        addToast({
                            title: 'Book Your Insurance',
                            content: data["message"],
                            time: new Date(),
                            duration: 2000,
                        });

                        this.fetch_single_prospect(this.state.prospect_id)
                    }
                    else {
                        this.setState({
                            AlertDeleteReview:false
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



          for_edit_engegament=(value)=>{
              console.log(value);
            this.setState({
                interview_id:value._id,
                prospect_id:value.prospect_id,
                engagement_type:value.type,
                designation_type:value.designation,
                role_type:value.role,
                date_of_assigning:new Date(value.assiging_date),
                borderNew:false,
                salary_emp:value.salary_amount,
                salary_structure_obj:value.salary_structure,
                error_meesage_eng:"",
                heading_for_engagement :"Edit Interview",
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
                this.setState({
                    loading : true
                })
                var date = new Date(this.state.date_of_assigning);
                // ////////console.log("date",date);
                var dd = String(date.getDate()).padStart(2, '0');
                var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!;
                var yyyy = date.getFullYear();

                var date_of_assigning = yyyy + "-" + mm + "-" + dd
                console.log(date_of_assigning);


            var params ={
                interview_id:this.state.interview_id,
                prospect_id:this.state.prospect_id,
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
                    this.setState({
                        loading : false
                    })
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
                            heading_for_engagement :"Add Interview",
                            button_for_engagement : "Save",
                            Engagementsmodal:false
                        });
                        addToast({
                            title: 'Book Your Insurance',
                            content: data["message"],
                            time: new Date(),
                            duration: 2000,
                        });

                        this.fetch_single_prospect(this.state.prospect_id)
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
                interview_id:this.state.interview_id,
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

                        this.fetch_single_prospect(this.state.prospect_id)
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
                interview_id:this.state.interview_id,
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

                        this.fetch_single_prospect(this.state.prospect_id)
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
                interview_id:this.state.interview_id,
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

                        this.fetch_single_prospect(this.state.prospect_id)
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

          handleSelection = (selectedOptions) => {
            console.log("selectedOptions**************************",selectedOptions);
          this.setState({ selectedOptions });
        };
          fetch_manager_typeahead= (value) =>{
            const {
                addToast,settings
            } = this.props;
            var params={
                manager_name:value
            }
              const res = fetch(settings.api_url + "fetch_manager_typeahead", {
                  method: 'POST',
                  body: JSON.stringify(params),
                  headers: {
                      "Content-type": "application/json; charset=UTF-8",
                  }
              }).then((response) => response.json())
                  .then(json => {
                      console.log("Employee Response **************************************", { response: json })
                      var data = json;
                      if (data.status == true) {
                        var lenth_of_type = data.data
                        var lenth_of_type = data.data;
                        var employee_Object = lenth_of_type.map(item => {
                            var kkk ={
                                value:item._id,
                                label:item.name
                            }
                            return (kkk)
                        });
                        this.setState({
                            manager_typeahead: employee_Object,
                            employee_array_fro_id: data.data,
                        })

                      }
                      else {
                      }
                  })
          }



        //   Status Functionality

        switch_functionality_for_status =(status)=>{
            if (this.state.offerTab == "offer") {
                this.update_status_for_offer(status)
            }else{
                this.update_status_for_interview(status)
            }
        }

        update_status_for_offer=(interview_status)=>{
            const { addToast,settings } = this.props;

                var added_by ={
                    value : this.state.admin_value,
                    label : this.state.admin_label,
                }

                var params ={
                    prospect_id:this.state.prospect_id,
                    offer_id:this.state.offer_id,
                    status_by:added_by,
                    status:interview_status
                }
                console.log("params update_status_for_offer",params);
                const res = fetch(settings.api_url + "api/offer_letter/update_status_for_offer", {
                    method: 'POST',
                    body: JSON.stringify(params),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    }
                }).then((response) => response.json())
                    .then(json => {
                        console.log("Update Status Response ***************", json)
                        var data = json;
                        if (data.status == true) {
                            this.setState({
                                // add_review_for_interview:"",
                                // button_review : "Add Review"
                            });
                            addToast({
                                title: 'Book Your Insurance',
                                content: data["message"],
                                time: new Date(),
                                duration: 2000,
                            });

                            this.fetch_single_prospect(this.state.prospect_id)
                        }
                        else {
                            this.setState({

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

        update_status_for_interview=(interview_status)=>{
            const { addToast,settings } = this.props;

                var added_by ={
                    value : this.state.admin_value,
                    label : this.state.admin_label,
                }

                var params ={
                    prospect_id:this.state.prospect_id,
                    interview_id:this.state.interview_id,
                    status_by:added_by,
                    status:interview_status
                }
                console.log("params update_status_for_interview",params);
                const res = fetch(settings.api_url + "api/offer_letter/update_status_for_interview", {
                    method: 'POST',
                    body: JSON.stringify(params),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    }
                }).then((response) => response.json())
                    .then(json => {
                        console.log("Update Status Response ***************", json)
                        var data = json;
                        if (data.status == true) {
                            this.setState({
                                // add_review_for_interview:"",
                                // button_review : "Add Review"
                            });
                            addToast({
                                title: 'Book Your Insurance',
                                content: data["message"],
                                time: new Date(),
                                duration: 2000,
                            });

                            if(interview_status == 'rejected'){

                              this.fetch_prospect()
                            }else{

                              this.fetch_single_prospect(this.state.prospect_id)
                            }

                        }
                        else {
                            this.setState({

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


        //   Add Offer Button

          switch_functionality_for_forward=()=>{
            if (this.state.buttonNameInterview == "Add Interview") {
                this.setState({
                    Engagementsmodal:true,
                   })
            }else if (this.state.buttonNameInterview == "Add Offer") {
                this.add_offer()
            }else if (this.state.buttonNameInterview == "Add To Employee") {
                this.toggleMoveToEmployee()
                this.show_Data_for_move_to_emp()
            }
          }

          show_Data_for_move_to_emp=()=>{
              console.log("single_pending_array",this.state.single_pending_array);
              var data = this.state.single_pending_array
              this.setState({
                name : data[0].name,
                mobile_no: data[0].mobile_no,
                email_id_emp:data[0].email_id,
                template_name:data[0].salary_structure,
                emp_address:data[0].address,
                sourced_from:data[0].source_from,
                profile_image:data[0].profile_picture,
                profile_picture_name:data[0].profile_picture.split("profile_picture/")[1],
                already_uploaded_profile_picture:data[0].profile_picture.split("profile_picture/")[1],
                profile_picture_extension:"",
                 date_of_birth : ""
              })
          }

          convert_to_employee=()=>{
            const { addToast,settings } = this.props;


            if(this.state.name == "" || this.state.name == undefined || this.state.mobile_no == "" || this.state.mobile_no == undefined || this.state.password == "" || this.state.password == undefined  ){
                this.setState({
                    error_meesage:"Please Fill all the field",
                    borderNew:true
                })
             }
             else{

                this.setState({
                    loading : true
                })

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


                if (this.state.for_app_type_label== "Telecaller") {
                    var vehicle_type=this.state.vehicle_type
                }
                else{
                    var vehicle_type={}
                }


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


                if (this.state.date_of_birth == ""|| this.state.date_of_birth == undefined) {
                    var date_of_birth =""
                }else{
                    var date = new Date(this.state.date_of_birth);
                    // ////////console.log("date",date);
                    var dd = String(date.getDate()).padStart(2, '0');
                    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!;
                    var yyyy = date.getFullYear();

                    var date_of_birth = yyyy + "-" + mm + "-" + dd
                    console.log(date_of_birth);
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
                    var params ={
                        prospect_id:this.state.prospect_id,
                        name : this.state.name,
                        mobile_no : this.state.mobile_no,
                        personal_no : this.state.mobile_no,
                        alternate_no : this.state.alternate_mobile_no,
                        email_id : this.state.email_id_emp,
                        // alternate_email_id : this.state.alternate_email_id_emp,
                        mobile_no : this.state.mobile_no,
                        password : this.state.password,
                        address : this.state.emp_address,
                        source_from : this.state.sourced_from,
                        is_relationship_manager:this.state.add_relation,
                        relationship_manager:relationship_manager,
                        for_app:this.state.for_app_data,
                        for_app_type:for_app_type,
                        telecaller_type:vehicle_type,
                        suspend:this.state.suspend_unsuspen,
                        is_mis_dock_relationship_manager:this.state.add_mis_relation,
                        mis_dock_relationship_manager:relationship_manager_mis,
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
                        role : this.state.role_type,
                        pf_no : this.state.pf_no,
                        pf_uan : this.state.pf_uan,
                        esic_no : this.state.esic_no,
                        ifsc_code : this.state.ifsc_code,
                        branch : this.state.branch,
                        gendarType : this.state.gendarType,
                        date_of_birth : date_of_birth,

                    }
                    console.log("params convert_to_employee",params);
                    const res = fetch(settings.api_url + "api/offer_letter/convert_to_employee", {
                        method: 'POST',
                        body: JSON.stringify(params),
                        headers: {
                            "Content-type": "application/json; charset=UTF-8",
                        }
                    }).then((response) => response.json())
                        .then(json => {
                            console.log("Convert to Emp Response ***************", json)
                            var data = json;
                            if (data.status == true) {
                                this.setState({
                                    modalOpenMoveToEmployee:false,
                                    error_meesage :"",
                                    loading : false
                                });
                                addToast({
                                    title: 'Book Your Insurance',
                                    content: data["message"],
                                    time: new Date(),
                                    duration: 2000,
                                });

                                this.fetch_prospect()
                            }
                            else {
                                this.setState({
                                    modalOpenMoveToEmployee:true,
                                    loading : false,
                                    error_meesage:data.message
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



          add_offer=()=>{
            const { addToast,settings } = this.props;

                var added_by ={
                    value : this.state.admin_value,
                    label : this.state.admin_label,
                }

                var params ={
                    prospect_id:this.state.prospect_id,
                    interview_id:this.state.interview_id,
                    added_by:added_by,
                }
                console.log("params add_offer",params);
                const res = fetch(settings.api_url + "api/offer_letter/add_offer", {
                    method: 'POST',
                    body: JSON.stringify(params),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    }
                }).then((response) => response.json())
                    .then(json => {
                        console.log("Add Offer Response ***************", json)
                        var data = json;
                        if (data.status == true) {
                            this.setState({
                                // add_review_for_interview:"",
                                // button_review : "Add Review"
                            });
                            addToast({
                                title: 'Book Your Insurance',
                                content: data["message"],
                                time: new Date(),
                                duration: 2000,
                            });

                            this.fetch_single_prospect(this.state.prospect_id)
                        }
                        else {
                            this.setState({

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



          generate_offer=()=>{
            const { addToast,settings } = this.props;
            this.setState({
                generate_loading:true
            })

            if (this.state.engagement_type == "" || this.state.engagement_type == undefined || this.state.salary_emp == "" || this.state.salary_emp == undefined || this.state.salary_structure_obj == "" || this.state.salary_structure_obj == undefined || this.state.date_of_assigning == "" || this.state.date_of_assigning == undefined) {
                this.setState({
                    generate_loading:false,
                    generate_error :"Please Fill all the field",
                    borderNew:true
                })
            }else{
                var date = new Date(this.state.date_of_assigning);
                var dd = String(date.getDate()).padStart(2, '0');
                var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!;
                var yyyy = date.getFullYear();

                var date_of_joining = yyyy + "-" + mm + "-" + dd

                var params ={
                    prospect_id:this.state.prospect_id,
                    offer_id:this.state.offer_id,
                    letter_template:this.state.engagement_type,
                    salary_amount:Number(this.state.salary_emp),
                    salary_structure:this.state.salary_structure_obj,
                    assiging_date:date_of_joining,
                }
                console.log("params generate_offer",params);
                const res = fetch(settings.api_url + "api/offer_letter/generate_offer", {
                    method: 'POST',
                    body: JSON.stringify(params),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    }
                }).then((response) => response.json())
                    .then(json => {
                        console.log("Generate Offer Response ***************", json)
                        var data = json;
                        if (data.status == true) {
                            this.setState({
                                generate_error:"",
                                generate_loading : false
                            });
                            addToast({
                                title: 'Book Your Insurance',
                                content: data["message"],
                                time: new Date(),
                                duration: 2000,
                            });

                            this.fetch_single_prospect(this.state.prospect_id)
                        }
                        else {
                            this.setState({
                                generate_error:data["message"],
                                generate_loading : false
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


     render() {
        const {
            activeAccordion,
        } = this.state;

        // console.log(this.state.upload_doc_index);

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
                                 this.fetch_prospect(this.state.search_name,number)
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
                                 this.fetch_prospect(this.state.search_name,number + 1)
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
                   <h1 className="emplooo" style={{marginTop:"-1px"}}>Recruitment</h1>
                 </div>
                 <div className="col-lg-6 col-md-4 col-sm-12 my_padding" style={{display:"inline-flex",width:"100%",justifyContent:"flex-end"}}>
                     <div>
                     <input
                      type="text"
                      className="form-control employee_input_new"
                      aria-describedby="searchName"
                      placeholder="Search Prospect"
                      style={{width:"300px"}}
                      value={this.state.search_name}
                      onChange={(e) => {
                        this.setState({
                         search_name:e.target.value
                      })
                      this.fetch_prospect(e.target.value,this.state.current_page_emp)
                     }}   />
                     </div>
                   <div className="col-auto sideplaese sideplaese_111">
                       <button type="button"
                       disabled={this.state.admin_control =="false" ? 'disabled' : ''}
                       onClick={this.toggle}
                       className="btn btn-brand sss brand_btn" style={{backgroundColor:"#8bc240" ,borderColor:"#8bc240",textTransform:"capitalize"}}>
                           Add Prospect
                       </button>
                   </div>
                 </div>
               </div>
               </PageTitle>
             </div>
             <Spinner color="warning" className="spinner_css_12345" style={{marginTop:gk,display: this.state.isLoading}}/>

                 <div className="rui-filemanager-content" style={{display: this.state.isLoading=="none" ? "block" :"none"}}>


                     <div className="row ipad_virww">
                      <div className="col-lg-3 col-md-12 height_sales" style={{paddingRight:"0px",display: this.state.ipad_emp_list}}>

                      <div className="grup_btn_recuritment">
                                <ButtonGroup>
                                    <Button
                                    style={{backgroundColor:this.state.recruitment_type=="ongoing" ? "#4B8178" : "", color:this.state.recruitment_type=="ongoing" ? "#fff" : "",borderColor:this.state.recruitment_type=="ongoing" ? "#4B8178" : ""}}
                                    onClick={() => {
                                                    this.setState({
                                                    recruitment_type: 'ongoing',
                                                    spinner_1: 'block'
                                                    })
                                                    setTimeout(() => {
                                                        this.fetch_prospect(this.state.search_name ,this.state.current_page)
                                                        }, 0)
                                                }}>Ongoing Prospects</Button>
                                    <Button
                                    style={{backgroundColor:this.state.recruitment_type=="rejected" ? "#4B8178" : "", color:this.state.recruitment_type=="rejected" ? "#fff" : "",borderColor:this.state.recruitment_type=="rejected" ? "#4B8178" : ""}}
                                    onClick={() => {
                                                    this.setState({
                                                    recruitment_type: 'rejected',
                                                    spinner_1: 'block'
                                                    })
                                                    setTimeout(() => {
                                                        this.fetch_prospect(this.state.search_name ,this.state.current_page)
                                                        }, 0)
                                                }}>Rejected Prospects</Button>
                                </ButtonGroup>
                                </div>
                          <div className="" style={{display: this.state.no_data_message=="none" ? "block" :"none"}}>
                      <div className="mycalendar " style={{height:this.state.total_pages_emp==1 ? my_height-141 : my_height-174}}>
                                <Table striped>
                                <thead>
                                    <tr className="no_border">
                                        <th scope="col" style={{padding:"10px 10px"}} className="padding_12">Name</th>
                                        <th scope="col" style={{padding:"10px 10px",whiteSpace:"nowrap"}} className="padding_12">Mobile Number</th>
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
                                                pending_spinner: 'block',
                                                prospect_id : value._id
                                            })
                                                setTimeout(() => {
                                                this.fetch_single_prospect(value._id)
                                            }, 0)
                                        }}>

                                                <td  style={{verticalAlign:"middle",padding:"10px 10px",borderLeft:this.state.prospect_id == value._id ? "5px solid #8bc240" :""}}>
                                                    <div style={{display:"inline-flex"}}>
                                                        <div className="my_profile_img">
                                                            <img src={value.profile_picture == "" || value.profile_picture == undefined ? user_img : value.profile_picture} alt="Profile" width="30px" height="30px" />
                                                        </div>
                                                    <div className="line_new_height"> {value.name}</div>
                                                    </div>

                                            </td>
                                                <td  style={{verticalAlign:"middle",padding:"10px 10px"}}>{value.mobile_no}</td>
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
                               outline onClick={() => this.fetch_prospect(this.state.search_name,1)}>first</Button>


                               <Button color="warning" className="pagination_1"
                               style={{marginLeft:"5px",marginRight:"5px",backgroundColor: this.state.current_page_emp == 1 ? '#8bc240' : '',
                               color: this.state.current_page_op == 1 ? '#8bc240' : '#8bc240',display: this.state.current_page_emp == 1 ? "none" : "block"}} outline
                               onClick={() => {
                                   if (this.state.current_page_emp > 1) {
                                     this.fetch_prospect(this.state.search_name,this.state.current_page_emp - 1)
                                   } else {
                                     this.fetch_prospect(this.state.search_name,this.state.current_page_emp)
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
                                     this.fetch_prospect(this.state.search_name,this.state.current_page_emp + 1)
                                   } else {
                                       this.fetch_prospect(this.state.search_name,this.state.current_page_emp )
                                   }
                               }}
                               >next</Button>
                               <Button color="warning" className="pagination_1"
                               style={{marginLeft:"5px",marginRight:"3px"}}
                               outline onClick={() => this.fetch_prospect(this.state.search_name,this.state.total_pages_emp)}>last</Button>
                             </div>
                          </div>
                          </div>


                            <div className="col-lg-9 col-md-12 left_showw heading_opeartion mycalendar"  style={{display: device_width < 769 ? this.state.ipad_width : "block",paddingLeft:"9px",height:my_height-68}}>
                            <Spinner color="warning" className="agent_spinner agent_spinner_color" style={{ marginTop: gk, display: this.state.pending_spinner }} />
                              <h3 style={{ display: this.state.no_data_message, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:gk}}>No Data Found</h3>

                               <div className="" style={{display:this.state.pending_spinner=="none" ? "block" : "none"}}>
                               <div className="test_collapse pad_in_dar " style={{display: this.state.no_data_message=="none" ? "block" :"none"}}>
                                     {this.state.single_pending_array.map((value,index)=>{
                                    var x = value;
                                    let y =index;
                                         return(
                                             <div key={index}>
                                             <div className="box_data_employee">
                                                     <div className="client_name row" style={{marginTop:"5px"}}>
                                                         <div className="col-lg-7 col-md-7" style={{alignSelf:"center"}}>
                                                         <div className="showLineImages">
                                                            <h2 className="persoanl_details">{value.name}{value.employment_id == undefined ? "" : " -"}<span className="empIdNew" style={{display: value.employment_id == undefined  ? "none" : "inline-flex"}}>  {value.employment_id}</span></h2>
                                                         </div>
                                                         </div>
                                                   <div className="col-lg-5 col-md-5 data_newww" style={{textAlign:"end",paddingRight:"30px",marginTop:"10px"}}>

                                              <Button disabled={this.state.admin_control =="false" ? 'disabled' : ''}
                                                       className="btn delete_btoon"
                                                       color="primary"
                                                       style={{marginRight:'10px',padding: '5px 6px',justifyContent:'center',textAlign:'center',textTransform:"capitalize",whiteSpace:"nowrap"}}
                                                           onClick={()=>{
                                                            this.setState({
                                                                prospect_id:x._id
                                                            })
                                                               this.uploadmodal()
                                                               }} > Upload document </Button>





                                                            <Button disabled={this.state.admin_control =="false" ? 'disabled' : ''}
                                                                className="btn delete_btoon"
                                                                color="success"
                                                                style={{marginRight:'10px',padding: '5px 6px',justifyContent:'center',textAlign:'center',textTransform:"capitalize" }}
                                                                    onClick={(index, value) => {
                                                                        this.setState((prevState) => ({
                                                                            modalOpen: !prevState.modalOpen,
                                                                            coco: x,
                                                                        }))
                                                                        this.for_edit(x)
                                                                    }} > Update </Button>
                                                            <Button disabled={this.state.admin_control =="false" ? 'disabled' : ''}
                                                                className="btn "
                                                                color="danger"
                                                                style={{verticalAlign:"middle",padding: '5px 6px',justifyContent:'center',textAlign:'center',textTransform:"capitalize"}}
                                                                onClick={()=>{
                                                                    this.setState({
                                                                        AlertDelete:true,
                                                                        prospect_id:x._id
                                                                    })
                                                                }}
                                                            > Delete </Button>
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
                                                     <div className="col-lg-2 col-md-2 col-sm-12 mt-20">
                                                     <div className="profileImgeNewPro">
                                                                <img aria-hidden = "true" onClick={()=>{
                                                                    this.setState({
                                                                        ShowImage:true,
                                                                        show_profile_img : value.profile_picture
                                                                    })
                                                                     }} src={value.profile_picture == "" || value.profile_picture == undefined ? user_img : value.profile_picture} alt="Profile"  />
                                                            </div>
                                                     </div>
                                                     <div className="col-lg-1 col-md-1 col-sm-12">
                                                     </div>
                                                     <div className="col-lg-7 col-md-7 col-sm-12 mt-15">
                                                     <div className="row">
                                                            <div className="col-lg-6 col-md-6 col-sm-12 mt-0">
                                                                <div className="top_value">Mobile Number</div>
                                                                <div className="bottom_value">{value.mobile_no}</div>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-12 mt-0" style={{display:value.designation == "" ? "none" : "block"}}>
                                                                <div className="top_value">Designation</div>
                                                                <div className="bottom_value">{value.designation.label}</div>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-12 mt-15" style={{display:value.email_id == "" ? "none" : "block"}}>
                                                                <div className="top_value">Email ID</div>
                                                                <div className="bottom_value">{value.email_id}</div>
                                                            </div>

                                                            <div className="col-lg-6 col-md-6 col-sm-12 mt-15" style={{display:value.source_from == "" ? "none" : "block"}}>
                                                                <div className="top_value">Source from</div>
                                                                <div className="bottom_value">{value.source_from}</div>
                                                            </div>
                                                            <div className="col-lg-8 col-md-8 col-sm-12 mt-15" style={{display:value.address == "" ? "none" : "block"}}>
                                                                <div className="top_value">Address</div>
                                                                <div className="bottom_value">{value.address}</div>
                                                            </div>

                                                      </div>
                                                      </div>
                                                      <div className="col-lg-2 col-md-2 col-sm-12 mt-15 pr-30 pl-0" >
                                                          <div className="profileImgeNewPro">
                                                                <a rel="noreferrer" href={value.resume} target="_blank">
                                                                <img src={resume} aria-hidden="true" alt="resume" className=""/></a>
                                                            </div>
                                                     </div>
                                                 </div>

                                                <div className="UploadDocData">
                                                <div className="accordion-group">
                                                            { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
                                                            <a
                                                                href="#"
                                                                style={{fontSize:"18px"}}
                                                                className="collapse-link EmployeePersonalData"
                                                                onClick={ ( e ) => {
                                                                    e.preventDefault();
                                                                    this.setState( {
                                                                        activeAccordion: activeAccordion === 1 ? 0 : 1,
                                                                    } );
                                                                } }
                                                            >
                                                                <div className="showInlineNewPersonal">
                                                                     Uploaded Documents
                                                                    <div>
                                                                        <Icon name="chevron-down" style={{display : activeAccordion ===1 ? "none" : "block" }} />
                                                                        <Icon name="chevron-up" style={{display : activeAccordion ===1 ? "block" : "none" }} />
                                                                    </div>
                                                                </div>
                                                            </a>
                                                            <Collapse isOpen={ 1 === activeAccordion }>
                                                                <div className="collapse-content employeeCollapseData">
                                                                        <div className="doumentsShoww">
                                                                        <Table striped>
                                                                                <thead>
                                                                                    <tr className="no_border">
                                                                                        <th scope="col" style={{padding:"10px 10px"}} className="padding_12">Document Name</th>
                                                                                        <th scope="col" style={{padding:"10px 10px",whiteSpace:"nowrap"}} className="padding_12">Document</th>
                                                                                        <th scope="col" style={{padding:"10px 10px",whiteSpace:"nowrap"}} className="padding_12">Action</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                {
                                                                                    value.document_array.map((value1, index1) => {
                                                                                        return (
                                                                                            <tr key={index1} >
                                                                                                <td  style={{verticalAlign:"middle",padding:"10px 10px"}}>{value1.document_name}</td>
                                                                                                <td  style={{verticalAlign:"middle",padding:"10px 10px"}}>
                                                                                                <div>
                                                                                                        <span style={{display:value1.files_type=="image" ? "block" :"none"}}>
                                                                                                        <a rel="noreferrer" href={value1.show_url} target="_blank">
                                                                                                            <img src={value1.show_url} alt="img" className="image_pdf_doc" style={{borderRadius:"5px",height:"40px"}}/></a>
                                                                                                        </span>

                                                                                                          <span style={{display:value1.files_type=="application" || value1.files_type=="pdf" ? "block" :"none"}}>
                                                                                                           <a rel="noreferrer" href={value1.show_url} target="_blank">
                                                                                                           <img src={pdf_img} aria-hidden="true" alt="pdf image" className="image_pdf_doc" style={{height:"40px"}}/></a>
                                                                                                            </span>

                                                                                                        </div>
                                                                                                </td>
                                                                                                <td  style={{verticalAlign:"middle",padding:"10px 10px"}}><Button className="" style={{padding: '5px 6px',justifyContent:'center',textAlign:'center',textTransform:"capitalize",whiteSpace:"nowrap"}} color="danger" onClick={()=>{
                                                                                                    this.setState({
                                                                                                        document_img_id : value1.id,
                                                                                                        upload_doc_delete : true
                                                                                                    })
                                                                                                }}>Delete</Button></td>
                                                                                            </tr>
                                                                                        )
                                                                                        })
                                                                                        }
                                                                                </tbody>
                                                                                </Table>
                                                                       </div>
                                                                 </div>
                                                            </Collapse>
                                                        </div>

                                                </div>
                                             </div>



                                             <div className="box_data_employee">
                                                 <div className="row" style={{marginTop:"16px"}}>
                                                   <div className="col-lg-8 col-md-8">
                                                       <h2 className="" style={{marginTop:"0px",marginBottom:"13px"}}>Recruitment Details</h2>
                                                   </div>
                                                   <div className="col-lg-4 col-md-4" style={{textAlign:"end",paddingRight:"30px"}}>
                                                       <Button color="warning"  disabled={this.state.admin_control =="false" ? 'disabled' : ''} style={{textTransform:"capitalize",color:"#fff", display : this.state.buttonNameInterview == "" ? "none" : "inline-flex" }} onClick={()=>{
                                                           this.setState({
                                                            // Engagementsmodal:true,
                                                            prospect_id:value._id
                                                           })
                                                           this.switch_functionality_for_forward()
                                                       }}>{this.state.buttonNameInterview}</Button>
                                                   </div>
                                                 </div>

                                                 {/* <h3 style={{ display: this.state.no_data_for_engagement, padding: "15px",color:" #a4a3a3",width: "100%",marginTop:"14px"}}>No Data Found</h3> */}
                                                <div className="" style={{display : this.state.intervew_section }}>
                                                {/* <div className="" style={{display: this.state.no_data_for_engagement=="none" ? "block" :"none"}}> */}
                                                <Tabs pills className="interviewTab_tab scroll_1" >
                                                {this.state.interview_detail.map((val,index)=>{
                                                    return(
                                                        <>
                                                        <Tabs.NavItem
                                                            isActive={ this.state.activeTab2 === val._id }
                                                            onClick={ () => {
                                                                this.setState({
                                                                    interview_id: val._id,
                                                                    engagement_spinner:"block",
                                                                    indexOfEngemenet:index
                                                                })
                                                                this.toggleTab( 2, val._id )
                                                                this.fetch_single_interview_deatils(val)

                                                            } }
                                                        >
                                                            {val.tab_name}
                                                        </Tabs.NavItem>
                                                      </>

                                                    )
                                                })}
                                                 </Tabs>
                                                     <Tabs.Content activeTab={ this.state.activeTab2 }>
                                                     <Tabs.Pane tabId={this.state.interview_id}>
                                                         <div style={{height:this.state.engagement_spinner=="none" ? "" :"450px"}}>
                                                          <Spinner color="warning" className="agent_spinnerNew agent_spinner_color" style={{ marginTop: "55px", display: this.state.engagement_spinner }} />
                                                              <div className="test_collapse" style={{display:this.state.engagement_spinner=="none" ? "block" : "none"}}>
                                                                  <div className="firstSection">
                                                                  <div className="row">
                                                                      <div className="col-lg-9 col-md-9">
                                                                          <div className="row">
                                                                            <div className="col-lg-12">
                                                                                <p className="interMessage">{this.state.interview_message}</p>
                                                                                <p className="interviewDateTime">{this.state.interview_date}</p>


                                                                                <div className="col-lg-12">
                                                                                            {this.state.offerTab == "offer" ?
                                                                                                    <div style={{ display: this.state.details_added == false ? 'none': 'inline-flex' ,marginTop:"-8px"}}>
                                                                                                    <CustomInput disabled={this.state.status_update == false || this.state.single_status == 'rejected' || this.state.admin_control =="false" ? true :false} type="radio" id="formRadioOffer1" name="formRadio" label={this.state.offer_status == 'accepted' ? 'Accepted' :'Accept'}  checked={this.state.offer_status === "accepted"}
                                                                                                        invalid={this.state.borderNew  && this.state.offer_status == "" ? true :false}
                                                                                                        onClick={(e) =>
                                                                                                        {
                                                                                                            this.setState({
                                                                                                                offer_status: "accepted",error_meesage_eng:""
                                                                                                            });
                                                                                                            this.update_status_for_offer("accepted")
                                                                                                        }
                                                                                                    } />
                                                                                                    <div style={{ width: '48px' }} />
                                                                                                    <CustomInput disabled={this.state.status_update == false || this.state.single_status == 'rejected' || this.state.admin_control =="false" ? true :false} type="radio" id="formRadioOffer2" name="formRadio" label={this.state.offer_status == 'rejected' ? 'Rejected' :'Reject'}  checked={this.state.offer_status === "rejected"}
                                                                                                        invalid={this.state.borderNew  && this.state.offer_status == "" ? true :false}
                                                                                                        onClick={(e) =>
                                                                                                        {
                                                                                                            this.setState({
                                                                                                                offer_status: "rejected",error_meesage_eng:""
                                                                                                            });
                                                                                                            this.update_status_for_offer("rejected")
                                                                                                        }
                                                                                                    }/>
                                                                                                    </div>
                                                                                                :
                                                                                                <div style={{ display: 'inline-flex' ,marginTop:"-8px"}}>
                                                                                                        <CustomInput disabled={this.state.status_update == false || this.state.single_status == 'rejected' || this.state.admin_control =="false" ? true :false} type="radio" id="formRadio1" name="formRadio" label={this.state.interview_status == "selected" ? "Selected" :"Select"}  checked={this.state.interview_status === "selected"}
                                                                                                            invalid={this.state.borderNew  && this.state.interview_status == "" ? true :false}
                                                                                                            onClick={(e) =>
                                                                                                            {
                                                                                                                this.setState({
                                                                                                                    interview_status: "selected",error_meesage_eng:""
                                                                                                                });
                                                                                                                this.update_status_for_interview("selected")
                                                                                                            }
                                                                                                        } />
                                                                                                        <div style={{ width: '48px' }} />
                                                                                                        <CustomInput disabled={this.state.status_update == false || this.state.single_status == 'rejected' || this.state.admin_control =="false" ? true :false} type="radio" id="formRadio2" name="formRadio" label={this.state.interview_status == "rejected" ? "Rejected" :"Reject"}  checked={this.state.interview_status === "rejected"}
                                                                                                            invalid={this.state.borderNew  && this.state.interview_status == "" ? true :false}
                                                                                                            onClick={(e) =>
                                                                                                            {
                                                                                                                this.setState({
                                                                                                                    interview_status: "rejected",error_meesage_eng:""
                                                                                                                });
                                                                                                                this.update_status_for_interview("rejected")
                                                                                                            }
                                                                                                        }/>
                                                                                                        <div style={{ width: '48px' }} />
                                                                                                        <CustomInput disabled={this.state.status_update == false || this.state.single_status == 'rejected' || this.state.admin_control =="false" ? true :false} type="radio" id="formRadio3" name="formRadio" label="On-Hold"  checked={this.state.interview_status === "on_hold"}
                                                                                                            invalid={this.state.borderNew  && this.state.interview_status == "" ? true :false}
                                                                                                            onClick={(e) =>
                                                                                                            {
                                                                                                                this.setState({
                                                                                                                    interview_status: "on_hold",error_meesage_eng:""
                                                                                                                });
                                                                                                                this.update_status_for_interview("on_hold")
                                                                                                            }
                                                                                                        }/>
                                                                                                    </div>
                                                                                        }

                                                                                        </div>




                                                                                        {this.state.offerTab == "offer" ?
                                                                                                <div className="col-lg-12">
                                                                                                    <div className="row">
                                                                                                    <div className="col-lg-6 col-md-6 col-xs-12 mt-15">
                                                                                                            <Label className="offerLabel" for="phone">Date of Joining</Label>
                                                                                                            <div>
                                                                                                            <DatePicker
                                                                                                                value={this.state.date_of_assigning}
                                                                                                                disabled={this.state.status_update == false || this.state.single_status == 'rejected' ? true :false}
                                                                                                                selected={this.state.date_of_assigning}
                                                                                                                onChange={(val) => {
                                                                                                                this.setState({
                                                                                                                    date_of_assigning: val,generate_error:""
                                                                                                                });
                                                                                                                }}
                                                                                                                dateFormat="dd-MM-yyyy"
                                                                                                                className="rui-datetimepicker form-control d-flex new_widht"
                                                                                                            />
                                                                                                            </div>
                                                                                                    </div>
                                                                                                    <div className="col-lg-6 col-md-6 col-xs-12 mt-15" >
                                                                                                        <Label className="offerLabel" for="Type">Letter Template</Label>
                                                                                                        <Select
                                                                                                            value = {this.state.engagement_type}
                                                                                                            isDisabled={this.state.status_update == false || this.state.single_status == 'rejected' ? true :false}
                                                                                                            onChange={(e) => {
                                                                                                                this.setState({
                                                                                                                    engagement_type: e,generate_error:"",is_type_update:true
                                                                                                                });
                                                                                                            }}
                                                                                                            placeholder="Letter Template"
                                                                                                            options={ engagement_type }
                                                                                                            styles={ customStyles }
                                                                                                            className={this.state.borderNew && this.state.engagement_type == "" ?  "is_not_valid" : "contact_sort"}
                                                                                                            />
                                                                                                        </div>
                                                                                                    <div className="col-lg-6 col-md-6 col-xs-12 mt-15">
                                                                                                        <Label className="offerLabel" for="phone">Salary</Label>
                                                                                                        <Input
                                                                                                            type="number"
                                                                                                            className="form-control"
                                                                                                            disabled={this.state.status_update == false || this.state.single_status == 'rejected' ? true :false}
                                                                                                            aria-describedby="emailHelp"
                                                                                                            placeholder="Salary"
                                                                                                            invalid={this.state.borderNew  && this.state.salary_emp == "" ? true :false}
                                                                                                            value={this.state.salary_emp}
                                                                                                            onChange={(e) => {
                                                                                                            this.setState({
                                                                                                                salary_emp:e.target.value,generate_error:""
                                                                                                            })

                                                                                                            }}

                                                                                                        />

                                                                                                    </div>
                                                                                                    <div className="col-lg-6 col-md-6 col-xs-12 mt-15">
                                                                                                            <Label className="offerLabel" for="phone">Salary Structure</Label>
                                                                                                            <Select
                                                                                                            value={this.state.salary_structure_obj}
                                                                                                            isDisabled={this.state.status_update == false || this.state.single_status == 'rejected' ? true :false}
                                                                                                            options={tem_object}
                                                                                                            styles={customStyles}
                                                                                                            className={this.state.borderNew && this.state.salary_structure_obj == "" ?  "is_not_valid" : "contact_sort"}
                                                                                                            onChange={(e) => {
                                                                                                                this.setState({ salary_structure_obj: e,generate_error:""})
                                                                                                                }}
                                                                                                            />
                                                                                                    </div>
                                                                                                    <div className="col-lg-12 col-md-12 col-xs-12 mt-15 genertaeBtton">
                                                                                                        <div className="showGenerateInline">
                                                                                                            <p className="false_message_new_grne">{this.state.generate_error}</p>
                                                                                                        <Button disabled={this.state.generate_loading == true || this.state.single_status == 'rejected' || this.state.status_update == false || this.state.admin_control =="false" ? true :false} onClick={()=>{this.generate_offer()}}>Generate{this.state.generate_loading ? (
                                                                                                            <Spinner />
                                                                                                        ) : ''}</Button>
                                                                                                    </div>
                                                                                                    </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            :""
                                                                                            }







                                                                            </div>
                                                                          </div>
                                                                      </div>

                                                                      <div className="col-lg-3 col-md-3 paddingRight30New">
                                                                      {this.state.offerTab == "offer"  ?
                                                                      <a rel="noreferrer" href={this.state.document_url} target="_blank">
                                                                            <div className="showOfferTada" style={{height : this.state.document_url == "" || this.state.document_url == undefined ? "170px" :"",display:this.state.details_added == false ? "none" : "block"}}>
                                                                                <img src={pdf_img} aria-hidden="true" alt="documents" className=""/>
                                                                                    <p>{this.state.document_name}</p>
                                                                                    <p>{this.state.document_date}</p>
                                                                            </div></a> : ""}

                                                                      </div>

                                                                      <div className="col-lg-12 paddingRight80New">
                                                                                            {this.state.review_array.map((value,index)=>{
                                                                                                return(
                                                                                                <div className="fullContainerForMessge" key={index}>
                                                                                                <div style={{width:"100%"}}>
                                                                                                <div className="newwwwww">
                                                                                                <p className="interviewDateTime mb-0"><span>{value.added_by ? value.added_by.label :"" } </span>{' '}<span>{value.added_date_new}</span> </p>

                                                                                                    <div className="messageReview">
                                                                                                            <span dangerouslySetInnerHTML={{__html: value.remark}}></span>
                                                                                                            <span className="deleteIcond">
                                                                                                                <Icon name ="edit" onClick={()=>{this.review_edit(value)}} />
                                                                                                                <Icon name ="trash" onClick={()=>{
                                                                                                                    this.setState({
                                                                                                                        remark_id : value._id,
                                                                                                                        AlertDeleteReview : true
                                                                                                                    })
                                                                                                                }} />
                                                                                                            </span>
                                                                                                    </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                                </div>
                                                                                                )
                                                                                            })}
                                                                         </div>
                                                                        <div className="col-lg-12 whatyouText paddingRight30New">
                                                                              <TextEditor value={this.state.add_review_for_interview} onChange={this.handleChangeNote} />
                                                                                <div className="addReviewButtonDiv">
                                                                                    <Button color="warning" style={{color:"#fff"}} disabled={this.state.admin_control =="false" ? true : false} className="add_review" onClick={()=>{this.switch_functionality_for_review()}} >{this.state.button_review}</Button>
                                                                                </div>
                                                                        </div>
                                                                  </div>

                                                              </div>
                                                              {/* <div className="secondSection pr-20">
                                                                  {this.state.offerTab == "offer"  ?
                                                                  <div className="showOfferTada" style={{height : this.state.document_url == "" || this.state.document_url == undefined ? "170px" :"",display:this.state.details_added == false ? "none" : "block"}}>
                                                                   <a rel="noreferrer" href={this.state.document_url} target="_blank">
                                                                       <img src={pdf_img} aria-hidden="true" alt="documents" className=""/></a>
                                                                        <p>{this.state.document_name}</p>
                                                                        <p>{this.state.document_date}</p>
                                                                  </div> : ""}
                                                              </div> */}
                                                              </div>
                                                        </div>
                                                     </Tabs.Pane>

                                                   </Tabs.Content>
                                               </div>
                                             </div>
                                             </div>
                                         )
                                     })}




                   </div>
              </div>
              </div>
          </div>



                {/* ********************************* Move to emloyeee ***************************************** */}

                <Modal
                         isOpen={ this.state.modalOpenMoveToEmployee }
                         toggle={ this.toggleMoveToEmployee }
                         className={ this.props.className,"my_model modal-dialog-centered" }
                         fade
                     >
                         <div className="modal-header">
                             <h5 className="modal-title h2">Move To Employee</h5>
                             <Button className="close" color="" onClick={ this.toggle }>
                                 <Icon name="x" />
                             </Button>
                         </div>
                         <ModalBody>
                         <div className="form rui-sign-form rui-sign-form-cloud">
                             <div className="row vertical-gap sm-gap justify-content-flex-start">

                                 <div className="col-lg-4 col-md-4 col-xs-12 inputHeight">
                                     <p className="headingForEmp"> Personal Details</p>
                                     <div className="row">
                                     <div className="col-lg-12 col-md-12 col-xs-12 mt-15">
                                            <Label className="offerLabel" for="phone">Name<span className="start_mark">*</span></Label>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                aria-describedby="emailHelp"
                                                placeholder="Name"
                                                value={this.state.name}
                                                onChange={(e) => {
                                                this.setState({
                                                    name:e.target.value,
                                                    error_meesage :""
                                                })

                                                }}
                                                invalid={this.state.borderNew  && this.state.name == "" ? true :false}
                                            />
                                        </div>
                                     <div className="col-lg-12 col-md-12 col-xs-12 mt-15">
                                     <Label className="offerLabel" for="phone">Date of Birth</Label>
                                        <div>
                                        <DatePicker
                                            value={this.state.date_of_birth}
                                            selected={this.state.date_of_birth}
                                            onChange={(val) => {
                                            this.setState({
                                                date_of_birth: val,
                                                error_meesage : ""
                                            });
                                            }}
                                            dateFormat="dd-MM-yyyy"
                                            className="rui-datetimepicker form-control d-flex new_widht"
                                            placeholderText={'Select DOB'}
                                        />
                                        </div>
                                        </div>

                                        <div className="col-lg-12 col-md-12 col-xs-12 mt-15">
                                            <Label className="offerLabel" for="phone">Mobile Number<span className="start_mark">*</span></Label>
                                            <Input
                                                type="text"

                                                // className={classnames(' form-control', { 'is-invalid': this.state.mobile_number_error })}
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
                                        <div className="col-lg-12 col-md-12 col-xs-12 mt-15">
                                            <Label className="offerLabel" for="phone">Alternate Mobile Number</Label>
                                            <Input
                                                type="text"
                                                // className={classnames(' form-control', { 'is-invalid': this.state.mobile_number_error })}
                                                aria-describedby="mobilenumberHelp"
                                                placeholder="Alternate Mobile Number"
                                                value={this.state.alternate_mobile_no}
                                                onChange={(e) => {
                                                    this.setState({
                                                        alternate_mobile_no: e.target.value,
                                                        false_message:"none"
                                                     });
                                                }}
                                                onBlur={this.checkNumber}
                                                disabled={this.state.loading}
                                                id="mob"
                                                // invalid={this.state.borderNew  && this.state.alternate_mobile_no == "" ? true :false}
                                            />
                                        </div>

                                        <div className="col-lg-12 col-md-12 col-xs-12 mt-15">
                                            <Label className="offerLabel" for="phone">Password<span className="start_mark">*</span></Label>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                aria-describedby="emailHelp"
                                                placeholder="Password"
                                                invalid={this.state.borderNew  && this.state.password == "" ? true :false}
                                                value={this.state.password}
                                                onChange={(e) => {
                                                this.setState({
                                                    password:e.target.value,
                                                    error_meesage : ""
                                                })

                                                }}

                                            />

                                        </div>
                                        <div className="col-lg-12 col-md-12 mt-15">
                                                <Label className="offerLabel" for="phone">Email ID </Label>
                                                <Input
                                                    type="text"

                                                    className={classnames(' form-control', { 'is-invalid': this.state.emailError })}
                                                    aria-describedby="mobilenumberHelp"
                                                    placeholder="Email ID"
                                                    value={this.state.email_id_emp}
                                                    onChange={(e) => {
                                                        this.setState({
                                                            email_id_emp: e.target.value,
                                                            false_message:"none"
                                                        }, this.state.emailError ? this.checkEmail : () => { });
                                                    }}
                                                    onBlur={this.checkEmail}
                                                    disabled={this.state.loading}
                                                    id="mob"
                                                    // invalid={this.state.borderNew  && this.state.email_id_emp == "" ? true :false}
                                                />
                                                {this.state.emailError ? (
                                                    <div className="invalid-feedback">{this.state.emailError}</div>
                                                ) : ''}

                                        </div>
                                        {/* <div className="col-lg-12 col-md-12 mt-15">
                                                <Label className="offerLabel" for="phone">Alternate Email ID </Label>
                                                <Input
                                                    type="text"
                                                    className={classnames(' form-control', { 'is-invalid': this.state.emailError })}
                                                    aria-describedby="mobilenumberHelp"
                                                    placeholder="Email ID"
                                                    value={this.state.alternate_email_id_emp}
                                                    onChange={(e) => {
                                                        this.setState({
                                                            alternate_email_id_emp: e.target.value,
                                                            false_message:"none"
                                                         });
                                                    }}
                                                    disabled={this.state.loading}
                                                    id="mob"
                                                    // invalid={this.state.borderNew  && this.state.alternate_email_id_emp == "" ? true :false}
                                                />

                                        </div> */}
                                                <div className="col-lg-12 col-md-12 col-xs-12 mt-15">
                                                    <Label className="offerLabel"  for="phone">Address</Label>
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
                                                <div className="col-lg-12 col-md-12 col-xs-12 mt-15" >
                                                    <Label className="offerLabel"  for="phone">Upload Profile Picture</Label>
                                                    <div>
                                                        <input id="inputGroupFile01" type="file"  className="no_input_file" accept="image/*" onChange={this.handleChangeFile_Quotationn} style={{display:"none"}} />
                                                            <label className="lord_lable" htmlFor="inputGroupFile01">
                                                                <div className="file_name">{this.state.profile_picture_name}</div>
                                                            <div className="choose align-self-center">Choose file</div>
                                                        </label>
                                                        </div>
                                                    </div>
                                                <div className="col-lg-12 col-md-12 col-xs-12 mt-15">
                                                    <Label className="offerLabel"  for="phone">Gendar</Label>
                                                    <div style={{ display: 'inline-flex' ,marginTop:"-8px"}}>
                                                       <CustomInput type="radio" id="formRadiogendar1" name="formRadio1" label="Male"  checked={this.state.gendarType === "male"}
                                                        //    invalid={this.state.borderNew  && this.state.gendarType == "" ? true :false}
                                                           onClick={(e) =>
                                                           {
                                                               this.setState({
                                                                   gendarType: "male",error_meesage_eng:""
                                                               });
                                                           }
                                                       } />
                                                       <div style={{ width: '25px' }} />
                                                       <CustomInput type="radio" id="formRadiogendar2" name="formRadio1" label="Female"  checked={this.state.gendarType === "female"}
                                                        //    invalid={this.state.borderNew  && this.state.gendarType == "" ? true :false}
                                                           onClick={(e) =>
                                                           {
                                                              this.setState({
                                                                   gendarType: "female",error_meesage_eng:""
                                                              });
                                                          }
                                                      }/>
                                                       <div style={{ width: '25px' }} />
                                                       <CustomInput type="radio" id="formRadiogendar3" name="formRadio1" label="Other"  checked={this.state.gendarType === "other"}
                                                        //    invalid={this.state.borderNew  && this.state.gendarType == "" ? true :false}
                                                           onClick={(e) =>
                                                           {
                                                              this.setState({
                                                                   gendarType: "other",error_meesage_eng:""
                                                              });
                                                          }
                                                      }/>
                                                      </div>

                                                </div>
                                     </div>

                                </div>
                                 <div className="col-lg-3 col-md-4 col-xs-12 inputHeight">
                                     <p className="headingForEmp">Account Details</p>
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12 col-xs-12 mt-15">
                                                <Label className="offerLabel"  for="phone">Aadhar Number</Label>
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
                                            <div className="col-lg-12 col-md-12 col-xs-12 mt-15">
                                                <Label className="offerLabel"  for="phone">PAN Card Number</Label>
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
                                            <div className="col-lg-12 col-md-12 col-xs-12 mt-15">
                                                <Label className="offerLabel"  for="phone">UN Number</Label>
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
                                            <div className="col-lg-12 col-md-12 col-xs-12 mt-15">
                                                <Label className="offerLabel"  for="phone">PF No</Label>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    aria-describedby="emailHelp"
                                                    placeholder="PF No"
                                                    value={this.state.pf_no}
                                                    onChange={(e) => {
                                                    this.setState({
                                                        pf_no:e.target.value
                                                    })

                                                    }}

                                                />

                                            </div>
                                            <div className="col-lg-12 col-md-12 col-xs-12 mt-15">
                                                <Label className="offerLabel"  for="phone">PF UAN</Label>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    aria-describedby="emailHelp"
                                                    placeholder="PF UAN"
                                                    value={this.state.pf_uan}
                                                    onChange={(e) => {
                                                    this.setState({
                                                        pf_uan:e.target.value
                                                    })
                                                    }}
                                                />
                                            </div>

                                            <div className="col-lg-12 col-md-12 col-xs-12 mt-15">
                                                <Label className="offerLabel"  for="phone">ESIC No</Label>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    aria-describedby="emailHelp"
                                                    placeholder="ESIC No"
                                                    value={this.state.esic_no}
                                                    onChange={(e) => {
                                                    this.setState({
                                                        esic_no:e.target.value
                                                    })
                                                    }}
                                                />
                                            </div>

                                            <div className="col-lg-12 col-md-12 col-xs-12 mt-15">
                                                <Label className="offerLabel"  for="phone">Bank Account Number</Label>
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
                                            <div className="col-lg-12 col-md-12 col-xs-12 mt-15">
                                                <Label className="offerLabel"  for="phone">IFSC Code</Label>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    aria-describedby="emailHelp"
                                                    placeholder="IFSC Code"
                                                    value={this.state.ifsc_code}
                                                    onChange={(e) => {
                                                    this.setState({
                                                        ifsc_code:e.target.value
                                                    })

                                                    }}
                                                />
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-xs-12 mt-15">
                                                <Label className="offerLabel"  for="phone">Branch</Label>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Branch"
                                                    value={this.state.branch}
                                                    onChange={(e) => {
                                                    this.setState({
                                                        branch:e.target.value
                                                    })

                                                    }}
                                                />
                                            </div>
                                        </div>
                                </div>
                                 <div className="col-lg-5 col-md-4 col-xs-12 inputHeight">
                                    <p className="headingForEmp">Attendance Details</p>
                                    <div className="row">
                                    <div className="col-lg-12 col-md-12 col-xs-12 mt-15">
                                     <Label className="offerLabel"  for="phone">Sourced From</Label>
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
                                    <div className="col-lg-12 col-md-12 col-xs-12 mt-15">
                                     <Label className="offerLabel"  for="phone">Role</Label>
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

                                    <div className="col-lg-12 col-md-12 col-xs-12 mt-15">
                                            <Label className="offerLabel"  for="phone">Attendance Type<span className="start_mark">*</span></Label>
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



                                    <div className="col-lg-12 col-md-12 col-xs-12 mt-15" >
                                    <Label className="offerLabel"  for="phone">Select Relationship Manager For Operation Dock</Label>
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

                                    <div style={{pointerEvents:this.state.add_relation==true ? "all" : "none",width:"100%",marginLeft:"20px"}}>
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


                                    <div className="col-lg-12 col-md-12 col-xs-12 mt-15" >
                                    <Label className="offerLabel"  for="phone">Select Relationship Manager For MIS Dock</Label>
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

                                    <div style={{pointerEvents:this.state.add_mis_relation==true ? "all" : "none",width:"100%",marginLeft:"20px"}}>
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


                                    <div className="col-lg-12 col-md-12 col-xs-12 mt-15" >
                                    <Label className="offerLabel"  for="phone">Web Protal Permission</Label>
                                    <CustomInput type="checkbox" className="large_checkkkk" defaultChecked={this.state.web_portal_permission==true ? true : false} id="formCheckboxWeb"
                                    onClick={(e) => {
                                        this.setState({
                                            web_portal_permission: e.target.checked
                                        })
                                        }}
                                        />
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-xs-12 mt-15" >
                                    <Label className="offerLabel"  for="phone">Select For App</Label>
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

                                    <div style={{pointerEvents:this.state.for_app_data==true ? "all" : "none",width:"100%",marginLeft:"20px"}}>
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

                                    <div className="col-lg-12 col-md-12 col-xs-12 mt-15" style={{display:this.state.for_app_type_label=="Telecaller" ? "block" :"none"}}>
                                    <Label className="offerLabel"  for="phone">Vehicle Type</Label>
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


                                </div>
                                </div>
                                 <div className="col-lg-12 col-md-12" style={{display:this.state.error_meesage=="" ? "none" :"block"}}>
                                     <p className="false_message_new">{this.state.error_meesage}</p>
                                 </div>
                                 </div>
                             </div>
                         </ModalBody>
                         <ModalFooter>
                             <Button color="secondary" style={{textTransform:"capitalize"}} onClick={ this.toggleMoveToEmployee }>Close</Button>
                             { ' ' }
                             <Button color="brand" disabled={this.state.loading} style={{backgroundColor:"#8bc240" ,borderColor:"#8bc240",textTransform:"capitalize"}} onClick={ this.convert_to_employee}>Save{this.state.loading ? (
                                <Spinner />
                            ) : ''}</Button>
                         </ModalFooter>
                     </Modal>



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
                                            name:e.target.value,
                                            error_meesage:""
                                          })

                                         }}
                                         invalid={this.state.borderNew  && this.state.name == "" ? true :false}


                                     />

                                 </div>
                                 <div className="col-lg-6 col-md-6 col-xs-12">
                                     <Label for="phone">Mobile Number<span className="start_mark">*</span></Label>


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
                                     <Label for="phone">Email ID <span className="start_mark">*</span></Label>


                                     <Input
                                         type="text"

                                         className={classnames(' form-control', { 'is-invalid': this.state.emailError })}
                                         aria-describedby="emailHelp"
                                         placeholder="Email ID"
                                         value={this.state.email_id_emp}
                                         onChange={(e) => {
                                             this.setState({
                                                 email_id_emp: e.target.value,
                                                 false_message:"none"
                                             }, this.state.emailError ? this.checkEmail : () => { });
                                         }}
                                         onBlur={this.checkEmail}
                                         disabled={this.state.loading}
                                         id="mob"
                                         invalid={this.state.borderNew  && this.state.email_id_emp == "" ? true :false}
                                     />
                                     {this.state.emailError ? (
                                         <div className="invalid-feedback">{this.state.emailError}</div>
                                     ) : ''}

                                 </div>

                                 <div className="col-lg-6 col-md-6 col-xs-12">
                                     <Label for="phone">Address <span className="start_mark">*</span></Label>
                                     <Input
                                         type="text"
                                         className="form-control"
                                         placeholder="Address"
                                         value={this.state.emp_address}
                                         onChange={(e) => {
                                          this.setState({
                                            emp_address:e.target.value,
                                            error_meesage:""
                                          })

                                         }}
                                         invalid={this.state.borderNew  && this.state.emp_address == "" ? true :false}
                                     />
                                 </div>
                                 <div className="col-lg-6 col-md-6 col-xs-12">
                                     <Label for="phone">Sourced From <span className="start_mark">*</span></Label>
                                     <Input
                                         type="text"
                                         className="form-control"
                                         aria-describedby="emailHelp"
                                         placeholder="Sourced From"
                                         value={this.state.sourced_from}
                                         onChange={(e) => {
                                          this.setState({
                                            sourced_from:e.target.value,
                                            error_meesage:""
                                          })

                                         }}
                                         invalid={this.state.borderNew  && this.state.sourced_from == "" ? true :false}

                                     />
                                 </div>

                                 <div className="col-lg-6 col-md-6 col-xs-12">
                                  <Label for="phone">Designation<span className="start_mark">*</span></Label>
                                   <Select
                                         value = {this.state.designation_type}
                                         onChange={(e) => {
                                             ////////console.log(e, "Val.....")
                                             this.setState({
                                                 designation_type: e,error_meesage_eng:"",error_meesage:""
                                             });
                                         }}
                                         placeholder="Select Designation"
                                         options={ destination_array }
                                         styles={ customStyles }
                                         className={this.state.borderNew && this.state.designation_type == "" ?  "is_not_valid" : "contact_sort"}
                                     />

                                 </div>

                                 <div className="col-lg-6 col-md-6 col-xs-12" >
                                   <Label for="phone">Upload Profile Picture</Label>
                                   <div>
                                    <input id="inputGroupFile01" type="file"  className="no_input_file" accept="image/*" onChange={this.handleChangeFile_Quotationn} style={{display:"none"}} />
                                         <label className="lord_lable" htmlFor="inputGroupFile01">
                                            <div className="file_name">{this.state.profile_picture_name}</div>
                                          <div className="choose align-self-center">Upload Profile Picture</div>
                                      </label>
                                        {/* <div style={{display:this.state.profile_image == "" ?"none" : "block"}}>
                                        <img src={this.state.profile_image == "" ? "" : this.state.profile_image} alt ="Profile" width="55" height="55" />
                                       </div> */}
                                    </div>
                                </div>

                                 <div className="col-lg-6 col-md-6 col-xs-12" >
                                   <Label for="phone">Upload Resume</Label>
                                   <div>
                                    <input id="inputGroupFile0Resume" type="file"  className="no_input_file" accept="application/msword,text/plain, application/pdf, image/*" onChange={this.handleUploadResume} style={{display:"none"}} />
                                         <label className="lord_lable" htmlFor="inputGroupFile0Resume">
                                            <div className="file_name">{this.state.resume_img_name}</div>
                                          <div className="choose align-self-center">Upload Resume</div>
                                      </label>

                                    </div>
                                </div>





                                 <div className="col-lg-12 col-md-12" style={{display:this.state.error_meesage=="" ? "none" :"block"}}>
                                     <p className="false_message_new">{this.state.error_meesage}</p>
                                 </div>



                                 </div>
                             </div>
                         </ModalBody>
                         <ModalFooter>
                             <Button color="secondary" style={{textTransform:"capitalize"}} onClick={ this.toggle }>Close</Button>
                             { ' ' }
                             <Button color="brand" style={{backgroundColor:"#8bc240" ,borderColor:"#8bc240",textTransform:"capitalize"}} onClick={ this.switch_function} disabled={this.state.loading}>{this.state.button}{this.state.loading ? (
                                <Spinner />
                            ) : ''}</Button>
                         </ModalFooter>
                     </Modal>



                     {/* *********************** Engegment Model ****************************************** */}
                   <Modal
                         isOpen={ this.state.Engagementsmodal }
                         toggle={ this.Engagementsmodal }
                         className={ this.props.className,"my_model_interview modal-dialog-centered" }
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



                                 <div className="col-lg-6 col-md-6 col-xs-12 dateTimePickerNew">
                                         <Label for="phone">Date and Time<span className="start_mark">*</span></Label>
                                         <div>
                                         <DatePicker
                                             value={this.state.interview_date_and_time}
                                             selected={this.state.interview_date_and_time}
                                             onChange={(val) => {
                                             this.setState({
                                                 interview_date_and_time: val,error_meesage_eng:""
                                             });
                                             }}
                                             showTimeSelect
                                             placeholder="Select date and time"
                                             dateFormat="dd-MM-yyyy h:mm aa"
                                             className="rui-datetimepicker form-control w-auto"
                                         />
                                         </div>
                                 </div>

                                 <div className="col-lg-6 col-md-6 col-xs-12">
                                         <Label for="phone">Select Interviewer<span className="start_mark">*</span></Label>
                                         <div>
                                         <Typeahead
                                            id="basic-typeahead-single"
                                            onChange={this.handleSelection}
                                            onInputChange={this.fetch_manager_typeahead}
                                            options={this.state.manager_typeahead} // Replace [...] with your array of options
                                            selected={this.state.selectedOptions}
                                            placeholder="Select Interviewer"
                                            invalid={this.state.borderNew && this.state.selectedOptions == "" ? true :false}
                                            className={this.state.borderNew && this.state.selectedOptions == "" ?"manager_select_new" :""}
                                            />
                                         </div>
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
                             <Button color="brand" disabled={this.state.loading} style={{backgroundColor:"#8bc240" ,borderColor:"#8bc240",textTransform:"capitalize"}} onClick={ this.switch_function_for_engagement}>{this.state.button_for_engagement}{this.state.loading ? (
                                <Spinner />
                            ) : ''}</Button>
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


                             <Button color="secondary" style={{textTransform:"capitalize",marginRight: "20px"}} onClick={this.AlertDelete}>no</Button>
                             {'             '}
                             <Button color="warning" disabled={this.state.loading}
                                 style={{ textTransform:"capitalize",color:"#fff" }}
                                 onClick={() => {
                                     this.delete_prospect(this.state.prospect_id)

                                 }}
                             >yes{this.state.loading ? (
                                <Spinner />
                            ) : ''}</Button>

                         </div>

                     </ModalBody>
                 </Modal>




                 <Modal
                    style={{ width: '300px', height: 'auto', justifyContent: 'center', textAlign: 'center', alignItem: 'center', marginTop: '200px' }}
                    isOpen={this.state.AlertDeleteReview}
                    toggle={this.AlertDeleteReview}
                    className={this.props.className, "del_model"}
                    fade
                >
                    <ModalBody>
                        <div style={{ width: '100%', height: '20px' }}>
                            <Button className="close" style={{ float: 'right' }} color="" onClick={this.AlertDeleteReview}>
                                <Icon name="x" />
                            </Button>
                        </div>
                        <div style={{ width: '100%', height: '50px' }}>
                            <p >Are you sure you want to Delete ?</p>

                        </div>
                        <div style={{ height: '50px', width: '100%' }}>
                          <Button style={{ marginRight: "20px"}} color="secondary" onClick={this.AlertDeleteReview}>no</Button>

                            <Button color="warning" disabled={this.state.policy_dock_control == "false" || this.state.loading ? 'disabled' : ''}
                                style={{ color:"#fff"}}
                                onClick={() => {
                                    this.delete_remark(this.state.remark_id)

                                }}
                            >yes{this.state.loading ? (
                                <Spinner />
                            ) : ''}</Button>
                            {'             '}
                        </div>

                    </ModalBody>
                </Modal>


                <Modal
                   isOpen={this.state.uploadmodal}
                   toggle={this.uploadmodal}
                   className={ this.props.className,"my_model_interview modal-dialog-centered" }
                   fade

                   >

                        <div className="modal-header">
                             <h5 className="modal-title h2">Upload Documents</h5>
                             <Button className="close" color="" onClick={ this.uploadmodal }>
                                 <Icon name="x" />
                             </Button>
                         </div>

                   <ModalBody>
                   <div className="form rui-sign-form rui-sign-form-cloud">
                       {this.state.uploadDocumentArray.map((val,index)=>{
                           return(
                      <div className="row vertical-gap sm-gap justify-content-flex-start" key={index}>
                       <div className="col-lg-5 col-md-4 col-xs-12">
                       <Label className="labelforall" style={{display: index==0 ? "inline-block" : "none"}}>Document Name</Label>
                        <Input type="text"
                        className="form-control"
                        placeholder="Document Name"
                        value={val.documentName}
                        onChange={(e) => {
                            this.setState({ the_document: e.target.value })
                            this.add_documents(e.target.value,index)
                        }}
                             />   </div>

                       <div className="col-lg-7 col-md-4 col-xs-12" >
                         <Label style={{display: index == 0 ? "inline-block" : "none"}}>Upload Document</Label>
                         <div>
                         <div className="display_upload" aria-hidden="true" onClick={()=>{
                            this.setState({
                                upload_doc_index : index
                            })
                         }}>

                          <input id={"inputGroupFileDocumnets" + index} type="file"  className="no_input_file" accept="application/pdf, image/png, image/jpeg, image/*"   onChange={this.handleUploadDocument(index)} style={{display:"none"}} />
                               <label className="lord_lable the_loretable" htmlFor={"inputGroupFileDocumnets" + index}>
                                  <div className="file_name_documentsss">{val.uploadFileName.name}</div>
                                <div className="choose_doc align-self-center">Upload Document</div>
                            </label>
                        <div style={{display:"inline-flex"}}>
                          <button
                            type="button"
                            className="btn btn-brand margin_top_add btn-uniform  the_uni_btn"
                            style={{ background: "rgb(50, 191, 200)", borderColor: "rgb(50, 191, 200)" }}
                            onClick={()=>this.delete_fields_salary(val)}
                          >    <Icon name ="x"  />
                          </button>
                          <button
                            type="button"
                            className="btn btn-brand margin_top_add btn-uniform  the_uni_btn"
                            style={{ background: "rgb(50, 191, 200)", borderColor: "rgb(50, 191, 200)" }}
                            onClick={this.handleClickPlusButton}
                          >    <Icon name ="plus"  />
                          </button>
                         </div>
                       </div>
                      </div>

                      </div>
                  </div>
                           )
                       })}
                       </div>

                   </ModalBody>
                   <ModalFooter>
                             <Button color="secondary" style={{textTransform:"capitalize"}} onClick={ this.uploadmodal }>Close</Button>
                             { ' ' }
                             <Button color="brand" disabled={this.state.loading} style={{backgroundColor:"#8bc240" ,borderColor:"#8bc240",textTransform:"capitalize"}} onClick={ this.upload_recuritement_document}>Save{this.state.loading ? (
                                <Spinner />
                            ) : ''}</Button>
                         </ModalFooter>
               </Modal>


               <Modal
                     style={{ width: '500px', height: 'auto', justifyContent: 'center', textAlign: 'center', alignItem: 'center', marginTop: '200px' }}
                     isOpen={this.state.upload_doc_delete}
                     toggle={this.upload_doc_delete}
                     className={this.props.className, "del_model"}
                     fade
                 >
                     <ModalBody>
                         <div style={{ width: '100%', height: '20px' }}>
                             <Button className="close" style={{ float: 'right' }} color="" onClick={this.upload_doc_delete}>
                                 <Icon name="x" />
                             </Button>
                         </div>
                         <div style={{ width: '100%', height: '50px' }}>
                             <p >Are you sure you want to Delete ?</p>

                         </div>
                         <div style={{ height: '50px', width: '100%' }}>


                             <Button color="secondary" style={{textTransform:"capitalize",marginRight: "20px"}} onClick={this.upload_doc_delete}>no</Button>
                             {'             '}
                             <Button color="warning" disabled={this.state.loading}
                                 style={{ textTransform:"capitalize",color:"#fff" }}
                                 onClick={() => {
                                     this.delete_document_prospect(this.state.document_img_id)

                                 }}
                             >yes{this.state.loading ? (
                                <Spinner />
                            ) : ''}</Button>

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
