/**
 * External Dependencies
 */
 import './style.scss';
 import React, { Component, Fragment } from 'react';
 import { connect } from 'react-redux';
 import ReactFlot from 'react-flot';
 import 'flot/source/jquery.flot.pie.js';
 import PageTitle from '../../components/page-title';
 import PageContent from '../../components/page-content';
 import { Button, Card, CardBody, CardText, Table, Modal, ModalBody, ModalFooter, Label, Spinner, ButtonGroup, CustomInput, CardTitle, Badge, CardSubtitle,Collapse,Input,Offcanvas } from 'reactstrap';
 import Icon from '../../components/icon';
 import Select from 'react-select';
 import { addToast as actionAddToast } from '../../actions';
 import Cookies from 'js-cookie';
 import Dropdown from '../../components/bs-dropdown';
 import { io } from "socket.io-client"
 import { Link } from 'react-router-dom';
 import thum_up_green from '../../images/IMG_20230110_113026.jpg'
import down_img from '../../images/DOWN.PNG'
import thums_down_red from '../../images/IMG_20230110_113532.jpg'
import UP_IMG from '../../images/UP.PNG'
import DatePicker from '../../components/date-time-picker';
import socket from '../Socket';

 const sayali =   window.innerWidth;
 var height =   window.innerHeight;
//  console.log(" screen.height", height);
 const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
//  console.log("nav_height",nav_height);
 var my_height = height - nav_height;
 var dev_height = my_height  ;
 var gk = (my_height/2);
 var pp = my_height - gk
 var centre =(sayali/2);
//  console.log("centre",centre);
//  console.log("my_height",my_height);
 if(height < 600){
 dev_height="auto"
 }

//  // var api_url = "http://192.168.29.31:4090/"
// // var api_url = "http://173.249.5.10:3005/"
// var api_url = "https://api.bookyourinsurance.com:4092/"
// // var api_url = "https://demoapi.bookyourinsurance.com:4050/"


// var socket = io(api_url, {transport : ['WebSocket']});
// console.log("socket**",socket);
const admin_data = JSON.parse(Cookies.get('admin_data'));
// console.log("admin_data",admin_data);


 /**
  * Internal Dependencies
  */
 import Snippet from '../../components/snippet';

 /**
  * Component
  */
 class Content extends Component {
     constructor(props) {
         super(props);
         this.state = {

             modalOpen_delete: false,
             user_role:admin_data[0].role.label,
             lead_data_array:[],
             modalOpen_for_details: false,
             message_erroe:"",
             full_name_visitor:"",
             mobile_no_visitor:"",
             location_visitor:"",
             visitor_gender:"",
             email_visitor:"",
             lead_single_data_array:[],
             isLoading:"block",
             modalOpen_for_single:false,
             sub_visitor_result:[],
             activeAccordion: 1,
             start_call:"Start Call",
             minute: 0,
             second: 0,
             show_timer: null,
             main_visitor_id:"",
             date_time_for_call:new Date(),
             date_time_for_end_call:new Date(),
             message_array:[],
             modalOpen_sms: false,
             modalOpen_for_appoinment: false,
             modalOpen_for_task: false,
             firstVal: new Date(),
             remark_for_appoinment:"",
             date_time_for_task:new Date(),
             remark_for_task:"",
             remark_for_task_new:"",

             date_time_for_message:new Date(),
             message_for_user:"",
             new_time_date:new Date(),
             new_message_visitor:"",
             show_canvas:false,
             sales_management_control:Cookies.get('sales_management_control'),
         }

         this.toggle_delete = this.toggle_delete.bind(this);
         this.toggle_for_details = this.toggle_for_details.bind( this );
         this.toggle_single_one = this.toggle_single_one.bind( this );
         this.swtich_time_function = this.swtich_time_function.bind( this );
         this.toggle_sms = this.toggle_sms.bind( this );
         this.toggle_for_appoinment = this.toggle_for_appoinment.bind( this );
         this.toggle_for_task = this.toggle_for_task.bind( this );
         this.show_canvas = this.show_canvas.bind( this );

     }
     componentDidMount(){

             this.get_all_leads();
          }


     //////////////////////******************************Delete Toggle **********************************/////////////////////////
     toggle_delete() {
         this.setState((prevState) => ({
             modalOpen_delete: !prevState.modalOpen_delete,
         }));
     }
     show_canvas() {
         this.setState((prevState) => ({
             show_canvas: !prevState.show_canvas,
         }));
        //  console.log("kkkkk");
     }

     toggle_for_details() {
      this.setState( ( prevState ) => ( {
          modalOpen_for_details: ! prevState.modalOpen_for_details,
          message_erroe:"",
      } ) );
  }

  toggle_single_one() {
    this.setState( ( prevState ) => ( {
        modalOpen_for_single: ! prevState.modalOpen_for_single,
          } ) );
      }


      toggle_sms() {
        this.setState( ( prevState ) => ( {
            modalOpen_sms: ! prevState.modalOpen_sms,
        } ) );
      }
      toggle_for_appoinment() {
        this.setState( ( prevState ) => ( {
            modalOpen_for_appoinment: ! prevState.modalOpen_for_appoinment,
            remark_for_appoinment:"",
            message_erroe:"",
            firstVal:new Date()
        } ) );
      }
toggle_for_task() {
  this.setState( ( prevState ) => ( {
      modalOpen_for_task: ! prevState.modalOpen_for_task,
      message_erroe:"",
      date_time_for_task:new Date(),
      remark_for_task:""
  } ) );
}

     get_all_leads(pageNumber){

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


      const usercookies = Cookies.get('usercookies');
      var conv_param = {
          page_no:page_no,
          user_id:usercookies,
          user_role:this.state.user_role,

        }
        //   console.log("conv_param",conv_param);
          socket.emit('get_all_leads', conv_param);
          socket.on('get_all_leads_response', (data)=>{


                // console.log('inside get_all_leads_response =============',data);
                if(data.data.status==true){
                    this.setState({
                        lead_data_array : data.data.data,
                        no_data_message:"none",
                        isLoading:"none",
                    })
                    this.get_single_lead(data.data.data[0]._id)
                }
                else{
                    this.setState({
                      lead_data_array:[],
                      no_data_message:"block",
                      isLoading:"none",

                    })
                }

          })
    }


    get_single_lead(lead_id){
      var conv_param = {
        lead_id:lead_id,
         }
    //    console.log("conv_param_single_visitor",conv_param);

          socket.emit('get_single_lead', conv_param);
          socket.on('get_single_lead_response', (data)=>{


                // console.log('inside get_single_lead_response =============',data);

                if(data.data.status==true){
                  var visitor_data_array_suu_visitor = data.data.data[0].sub_visitor_result;
                  for (let i = 0; i < visitor_data_array_suu_visitor.length; i++) {

                      var date = new Date(visitor_data_array_suu_visitor[i].registration_date);

                      var new_date = this.formatDate(date);
                      visitor_data_array_suu_visitor[i].registration_date_new = new_date
                  }


                  if (data.data.data[0].visitor_appointment_data.length==0) {
                    var visitor_appointment_data =[]
                }
                else{
                    var visitor_appointment_data =data.data.data[0].visitor_appointment_data
                    // console.log("visitor_appointment_data",visitor_appointment_data);
                    for (let i = 0; i < visitor_appointment_data.length; i++) {

                        var date_time_new = new Date(visitor_appointment_data[i].date_time);

                        var new_date_message = this.formatDate(date_time_new);
                        visitor_appointment_data[i].date_time_new = new_date_message

                    }
                    // console.log("visitor_appointment_data",visitor_appointment_data[0].remark);
                    var appoinment_remark =visitor_appointment_data[0].remark
                    var new_time_new = visitor_appointment_data[0].date_time_new
                    var s_111 = new_time_new.split(/(?<=^\S+)\s/)
                    // console.log("s_111",s_111);
                    var date_of_app=s_111[0]
                    var time_of_app=s_111[1]
                    var new_222 = new Date(visitor_appointment_data[0].date_time);
                    function getMonthShortName(monthNo) {
                        const date = new Date();
                        date.setMonth(monthNo - 1);

                        return date.toLocaleString('en-US', { month: 'short' });
                      }

                    //   console.log("new__________",new_222);
                      let day = new_222.getDate();
                    //   console.log(day); // 23

                      let month_no = new_222.getMonth();
                    //   console.log(month_no + 1); // 8

                      var month = getMonthShortName(month_no+1)

                      let year = new_222.getFullYear();
                    //   console.log(year); // 2022

                      var converted_date  = day +" "+ month + " " + year
                    //   console.log("converted_date",converted_date);
                }





                if (data.data.data[0].visitor_task_data.length==0) {
                    var visitor_task_data =[]
                }
                else{
                    var visitor_task_data =data.data.data[0].visitor_task_data
                    // console.log("visitor_task_data",visitor_task_data);
                    for (let i = 0; i < visitor_task_data.length; i++) {

                        var date_time_new = new Date(visitor_task_data[i].date_time);

                        var new_date_message = this.formatDate(date_time_new);
                        visitor_task_data[i].date_time_new = new_date_message

                    }
                    // console.log("visitor_task_data",visitor_task_data[0].remark);
                    var remark_for_task= visitor_task_data[0].remark
                    var new_time_new = visitor_task_data[0].date_time_new
                    var s_111 = new_time_new.split(/(?<=^\S+)\s/)
                    // console.log("s_111",s_111);
                    var date_of_app=s_111[0]
                    var time_of_task=s_111[1]
                    var new_222 = new Date(visitor_task_data[0].date_time);
                    function getMonthShortName(monthNo) {
                        const date = new Date();
                        date.setMonth(monthNo - 1);

                        return date.toLocaleString('en-US', { month: 'short' });
                      }

                    //   console.log("new__________",new_222);
                      let day = new_222.getDate();
                    //   console.log(day); // 23

                      let month_no = new_222.getMonth();
                    //   console.log(month_no + 1); // 8

                      var month = getMonthShortName(month_no+1)

                      let year = new_222.getFullYear();
                    //   console.log(year); // 2022

                      var converted_date_for_task  = day +" "+ month + " " + year
                    //   console.log("converted_date*****************",converted_date_for_task);


                }

                if (data.data.data[0].visitor_comment_data.length==0) {
                  var new_message_array =[]
              }
              else{
                  var new_message_array =data.data.data[0].visitor_comment_data
                //   console.log("new_message_array",new_message_array);
                  for (let i = 0; i < new_message_array.length; i++) {

                      var date_message = new Date(new_message_array[i].time);

                      var new_date_message = this.formatDate(date_message);
                      new_message_array[i].time_new_meesage = new_date_message

                  }
              }




                    this.setState({
                        lead_single_data_array : data.data.data,
                        full_name_visitor:data.data.data[0].insurance_details[0].full_name,
                        email_visitor:data.data.data[0].insurance_details[0].email,
                        mobile_no_visitor:data.data.data[0].insurance_details[0].mobile_no,
                        location_visitor:data.data.data[0].current_location,
                        visitor_gender:data.data.data[0].gender,
                        lead_id:data.data.data[0]._id,
                        main_visitor_id:data.data.data[0].main_visitor_id,
                        sub_visitor_result : visitor_data_array_suu_visitor,
                        visitor_appointment_data:visitor_appointment_data,
                        appoinment_remark:appoinment_remark,
                        date_of_app:converted_date,
                        time_of_app:time_of_app,
                        visitor_task_data:visitor_task_data,
                        remark_for_task_new:remark_for_task,
                        date_of_task:converted_date_for_task,
                        time_of_task:time_of_task,
                        message_array:new_message_array,

                    })
                }
                else{
                    this.setState({
                      lead_single_data_array:[],
                    })
                }

          })
    }

    formatDate(date) {
      console.log("date",new Date(date));
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

               console.log(dt+'-' + month + '-'+year);
               var new_date_1 = dt+'-' + month + '-'+year

               var today = date;
               let options_1 = {
                   hour: "2-digit", minute: "2-digit"
               };

               console.log("lllllllllllllllllllllllllllll",today.toLocaleTimeString("en-us", options_1));
                                  var time_new =today.toLocaleTimeString("en-us", options_1)
                                  console.log("mt______________________________________________*********************",time_new);
                                  console.log("mt______________________________________________",new_date_1);

                                  var nre_time = new_date_1+ " " +  time_new


              return nre_time;
            }


    update_detail_lead=()=> {
      const usercookies = Cookies.get('usercookies');
      const {
          addToast,settings
      } = this.props;
      var params = {
          lead_id:this.state.lead_id,
          full_name:this.state.full_name_visitor,
          mobile_no:this.state.mobile_no_visitor,
          current_location:this.state.location_visitor,
          gender:this.state.visitor_gender,
          email:this.state.email_visitor
      }
    //   console.log("Add Deatilssss", params);
      if (params.full_name=="" || params.full_name==undefined || params.email=="" || params.email==undefined || params.mobile_no=="" || params.mobile_no==undefined || params.current_location=="" || params.current_location==undefined || params.gender=="" || params.gender==undefined) {
          this.setState({
              message_erroe:"Please Fill All the Feilds"
          })
      }
      else{
          const res = fetch(settings.api_url + "update_detail_lead", {
              method: 'POST',
              body: JSON.stringify(params),
              headers: {
                  "Content-type": "application/json; charset=UTF-8",
              }
          }).then((response) => response.json())
              .then(json => {
                //   console.log("update_detail_lead Response **************************************", { params: params, response: json })
                  var data = json;
                  if (data.status == true) {
                      this.setState({
                          modalOpen_for_details:false,
                          message_erroe:"",
                          full_name_visitor:"",
                          mobile_no_visitor:"",
                          location_visitor:"",
                          visitor_gender:"",
                      })
                      this.get_all_leads()
                      addToast({
                          title: 'Add my policy',
                          content: data["message"],
                          time: new Date(),
                          duration: 2000,
                      });
                  }
                  else {
                      addToast({
                          title: 'Add my policy',
                          content: data["message"],
                          time: new Date(),
                          duration: 2000,
                      });
                      this.setState({
                          message_erroe:"",
                          full_name_visitor:"",
                          mobile_no_visitor:"",
                          location_visitor:"",
                          visitor_gender:"",
                      })
                    //   console.log("something wrong");
                  }
              })
      }



  }

     /////////////////////////////*******************************////////////////////////////////
        search_archive=(search, category, source, occupation,pageNumber)=>{
          if (pageNumber == '' || pageNumber == undefined) {
              this.setState({
                  current_page1: 1
              })
              var page = 1
          } else {
              this.setState({
                  current_page1: pageNumber
              })
              var page = pageNumber
          }

          var project_id =   Cookies.get( 'Dreamland_selected_project_cookie' );
          if (search == "" && category == "" && source=="" && occupation=="") {
            var params ={
                     page_no:page,
                     project_id:project_id
               }
        }else if (search !== "" && category == "" && source=="" && occupation=="") {  ///1
          var params ={
                   search_by:search,
                   page_no:page,
                   project_id:project_id

             }
            //  console.log("Search__",params);
        }else if (search == "" && category !== "" && source=="" && occupation=="") { ////2
          var params ={
                   sort_by_category:category.value,
                   page_no:page,
                   project_id:project_id

             }
            //  console.log("sort_by_category",params);
        }else if (search == "" && category == "" && source !=="" && occupation=="") { ///3
          var params ={
                   sort_by_source:source.value,
                   page_no:page,
                   project_id:project_id

             }
            //  console.log("sort_by_source",params);
        }
        else if (search == "" && category == "" && source=="" && occupation !=="") { ////4
          var params ={
                   sort_by_occupation:occupation.label,
                   page_no:page,
                   project_id:project_id

             }
            //  console.log("sort_by_occupation",params);
        }else if (search !== "" && category !== "" && source=="" && occupation=="") { /////5
          var params ={
                   search_by:search,
                   sort_by_category:category.value,
                   page_no:page,
                   project_id:project_id

             }
            //  console.log("search_category",params);
        }
        else if (search !== "" && category == "" && source !=="" && occupation=="") { ////6
          var params ={
                   search_by:search,
                   sort_by_source:source.value,
                   page_no:page,
                   project_id:project_id

             }
            //  console.log("search_source",params);
        }
        else if (search !== "" && category == "" && source =="" && occupation !=="") { ///7
          var params ={
                   search_by:search,
                   sort_by_occupation:occupation.label,
                   page_no:page,
                   project_id:project_id

             }
            //  console.log("search_occupation",params);
        }
        else if (search !== "" && category !== "" && source =="" && occupation !=="") { ///8
          var params ={
                   search_by:search,
                   sort_by_category:category.value,
                   sort_by_occupation:occupation.label,
                   page_no:page,
                   project_id:project_id

             }
            //  console.log("search_occupation_category",params);
        }
        else if (search !== "" && category !== "" && source !=="" && occupation =="") { ////9
          var params ={
                   search_by:search,
                   sort_by_category:category.value,
                   sort_by_source:source.value,
                   page_no:page,
                   project_id:project_id

             }
            //  console.log("search_source_categor",params);
        }else if (search == "" && category !== "" && source !=="" && occupation =="") { ///10
          var params ={
                   sort_by_category:category.value,
                   sort_by_source:source.value,
                   page_no:page,
                   project_id:project_id

             }
            //  console.log("_source_categor",params);
        }
        else if (search == "" && category !== "" && source !=="" && occupation !=="") { ////11
          var params ={
                   sort_by_category:category.value,
                   sort_by_source:source.value,
                   sort_by_occupation:occupation.label,
                   page_no:page,
                   project_id:project_id

             }
            //  console.log("_source_categor",params);
        }
        else if (search == "" && category !== "" && source !=="" && occupation =="") { ////12
          var params ={
                   sort_by_category:category.value,
                   sort_by_source:source.value,
                   page_no:page,
                   project_id:project_id

             }
            //  console.log("_source_categor",params);
        }
        else if (search == "" && category == "" && source !=="" && occupation !=="") { ////13
          var params ={

                   sort_by_source:source.value,
                   sort_by_occupation:occupation.label,
                   page_no:page,
                   project_id:project_id

             }
            //  console.log("_source_occupatuion",params);
        }
        else if (search == "" && category !== "" && source =="" && occupation !=="") { ////14
          var params ={
                   sort_by_category:category.value,
                   sort_by_occupation:occupation.label,
                   page_no:page,
                   project_id:project_id

             }
            //  console.log("_cate_occupatuion",params);
        }
        else if (search == "" && category == "" && source !=="" && occupation !=="") { ////15
          var params ={
                   search_by:search,
                   sort_by_source:source.value,
                   sort_by_occupation:occupation.label,
                   page_no:page,
                   project_id:project_id

             }
            //  console.log("_source_occupatuion_search",params);
        }
        else {
          var params ={
                   search_by:search,
                   sort_by_category:category.value,
                   sort_by_source:source.value,
                   sort_by_occupation:occupation.label,
                   page_no:page,
                   project_id:project_id

             }
            //  console.log("last_but_not_list",params);
        }

        const { settings } = this.props;
        const res = fetch(settings.api_url + "fetch_lead", {
          method: 'POST',
          body: JSON.stringify(params),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          }
        }).then((response) => response.json())
          .then(json => {
            // console.log("Search ",{params: params,response: json})
            var data = json;
            if (data.status == true) {
            //   console.log("Searchhhh___data", data);
              this.setState({
                lead_array: data.data,
                total1: data.total,
                total_pages1:data.total_pages,
                no_data:"none",
              })
            }
            else {

                this.setState({
                  lead_array:[],
                  no_data: "block"
                });
              }
          })
      }

     //////////////////*************************** Delete ************************88//////////////////////////////////////

     delete_lead(lead_id) {
         const {
             addToast
         } = this.props;

         const { settings } = this.props;
         var params = {
             lead_id: lead_id,
         }
        //  console.log("lead delete", params);
         const res = fetch(settings.api_url + "delete_lead", {
             method: 'POST',
             body: JSON.stringify(params),
             headers: {
                 "Content-type": "application/json; charset=UTF-8",
             }
         }).then((response) => response.json())
             .then(json => {
                //  console.log("Delete Lead **************************************", { params: params, response: json })
                 var data = json;
                 if (data.status == true) {
                     addToast({
                         title: 'Dream Land',
                         content: data["message"],
                         time: new Date(),
                         duration: 1000,
                     });

                     this.setState((prevState) => ({
                         modalOpen_delete: false,
                     }));
                     this.get_all_leads();
                 }
                 else {
                     addToast({
                         title: 'Dream Land',
                         content: data["message"],
                         time: new Date(),
                         duration: 1000,
                     });
                    //  console.log("wrong");
                 }
             })
     }







     ////////////////////////***********************************Fetch Project *************************///////////////////////////

     fetch_project() {
         const { settings } = this.props;
         const res = fetch(settings.api_url + "fetch_project", {
             method: 'POST',
             headers: {
                 "Content-type": "application/json; charset=UTF-8",
             }
         }).then((response) => response.json())
             .then(json => {
                //  console.log("fetch_project **************************************", json)
                 var data = json;
                 if (data.status == true) {
                     this.setState({
                         project_array: data.data,
                     });
                 }
                 else {
                     this.setState({
                         project_array: [],
                     });
                    //  console.log("fetch_project wrong");
                 }
             })
     }


     openNav() {
    //   console.log("kkkkkkkkkkkk", sayali);
      if (sayali < 600) {
          document.getElementById("mySidenav").style.width = "100%";

      }
      else {
          document.getElementById("mySidenav").style.width = "945px";
      }
      // document.getElementById("mySidenav").style.width = "375px";
      document.getElementById("mySidenav").style.boxShadow = "rgb(177, 174, 174) 10px 0px 12px 12px";
  }


  like_dislike_lead(lead_id,like_dislike) {
    // console.log("online_visitors_id",lead_id);
    // console.log("like_dislike",like_dislike);
    const {
        addToast,settings
    } = this.props;

    var params = {
      lead_id:lead_id,
      like:like_dislike,
    }
    // console.log("Is_like_OR_Dislike", params);
        const res = fetch(settings.api_url + "like_dislike_lead", {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                // console.log("Is_like_OR_Dislike Response **************************************", { params: params, response: json })
                var data = json;
                if (data.status == true) {
                    addToast({
                        title: 'Add my policy',
                        content: "User Attended Sucessfully",
                        time: new Date(),
                        duration: 2000,
                    });
                    setTimeout(() => {
                        this.get_single_lead(this.state.lead_id)
                    }, 600)
                }
                else {
                    addToast({
                        title: 'Add my policy',
                        content: data["message"],
                        time: new Date(),
                        duration: 1000,
                    });
                    // console.log("something wrong");
                }
            })


}
visitors_button_functionality(online_visitors_id,button_type) {
//   console.log("online_visitors_id",online_visitors_id);
//   console.log("button_type",button_type);
//   console.log("selected_type",this.state.selected_btn_data);
  const {
      addToast,settings
  } = this.props;

  var params = {
    lead_id:online_visitors_id,
    button_type:button_type,
    selected_type:this.state.selected_btn_data
  }
//   console.log("Lead Button", params);
      const res = fetch(settings.api_url + "lead_button_functionality", {
          method: 'POST',
          body: JSON.stringify(params),
          headers: {
              "Content-type": "application/json; charset=UTF-8",
          }
      }).then((response) => response.json())
          .then(json => {
            //   console.log("lead_button_functionality Response **************************************", { params: params, response: json })
              var data = json;
              if (data.status == true) {
                  this.setState({
                  })
                  addToast({
                      title: 'Add my policy',
                      content: "User Attended Sucessfully",
                      time: new Date(),
                      duration: 2000,
                  });
                  this.get_single_lead(this.state.lead_id)
              }
              else {
                  this.setState({
                  })
                  addToast({
                      title: 'Add my policy',
                      content: data["message"],
                      time: new Date(),
                      duration: 1000,
                  });
                //   console.log("something wrong");
              }
          })


}


          swtich_time_function(){
            if (this.state.start_call=="Start Call") {
              this.please_startTimer()
            }
            else{
                this.please_stopTimer()
            }
          }

          please_startTimer() {
            var fgfgf = setInterval(() => {

              var sec = this.state.second+1

              if(sec >= 60){
                var min = this.state.minute+1
                this.setState({minute:min,second:0})
              }else{
                this.setState({second:sec})

              }

            },1000)

            this.setState({
                show_timer:fgfgf,
                start_call:"End Call"
            })
            this.start_call_records()

            return ()=> clearInterval(this.state.show_timer);
          }

          please_stopTimer(){

            clearInterval(this.state.show_timer)
            this.setState({minute:0,second:0, show_timer:null,start_call:"Start Call"})
            this.end_call_records()
          }


          start_call_records=()=> {
            const usercookies = Cookies.get('usercookies');

            const {
                addToast,settings
            } = this.props;
            var params = {
                main_visitor_id:this.state.main_visitor_id,
                user_id:usercookies,
                start_time:new Date(this.state.date_time_for_call).toISOString(),
            }
            // console.log("Start Calll", params);
                const res = fetch(settings.api_url + "start_call_lead", {
                    method: 'POST',
                    body: JSON.stringify(params),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    }
                }).then((response) => response.json())
                    .then(json => {
                        // console.log("start_call_lead Response **************************************", { params: params, response: json })
                        this.get_single_lead(this.state.lead_id)
                    })
          }


          end_call_records=()=> {
            const usercookies = Cookies.get('usercookies');

            const {
                addToast,settings
            } = this.props;
            var params = {
                main_visitor_id:this.state.main_visitor_id,
                user_id:usercookies,
                end_time:new Date(this.state.date_time_for_end_call).toISOString(),
            }
            // console.log("End Calll", params);
                const res = fetch(settings.api_url + "end_call_lead", {
                    method: 'POST',
                    body: JSON.stringify(params),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    }
                }).then((response) => response.json())
                    .then(json => {
                        // console.log("end_call_lead Response **************************************", { params: params, response: json })
                        this.get_single_lead(this.state.lead_id)
                    })
          }
          add_appointment_visitor=()=> {
            const usercookies = Cookies.get('usercookies');
            const {
                addToast,settings
            } = this.props;
            // console.log("this.state.firstVal",this.state.firstVal);
            var assign_time = new Date(this.state.firstVal).toISOString()
            // console.log(assign_time, "ooooooooooooooooooooooooooooooooooo");
            var params = {
                main_visitor_id:this.state.main_visitor_id,
                user_id:usercookies,
                date_time:assign_time,
                remark:this.state.remark_for_appoinment
            }
            // console.log("Add Appointment", params);
            if (params.remark=="" || params.remark==undefined) {
                this.setState({
                    message_erroe:"Please Fill All the Feilds"
                })
            }
            else{
                const res = fetch(settings.api_url + "add_appointment_lead", {
                    method: 'POST',
                    body: JSON.stringify(params),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    }
                }).then((response) => response.json())
                    .then(json => {
                        // console.log("add_appointment_lead Response **************************************", { params: params, response: json })
                        var data = json;
                        if (data.status == true) {
                            this.setState({
                                modalOpen_for_appoinment:false,
                                remark_for_appoinment:"",
                                message_erroe:"",
                                firstVal:new Date()
                            })
                            addToast({
                                title: 'Add my policy',
                                content: data["message"],
                                time: new Date(),
                                duration: 2000,
                            });
                            this.get_single_lead(this.state.lead_id)
                        }
                        else {
                            addToast({
                                title: 'Add my policy',
                                content: data["message"],
                                time: new Date(),
                                duration: 2000,
                            });
                            this.setState({
                                remark_for_appoinment:"",
                                message_erroe:""
                            })
                            // console.log("something wrong");
                        }
                    })
            }
        }


        add_task_visitor=()=> {
            const usercookies = Cookies.get('usercookies');
            const {
                addToast,settings
            } = this.props;
            // console.log("this.state.timeeeee",this.state.date_time_for_task);
            var assign_time = new Date(this.state.date_time_for_task).toISOString()
            // console.log(assign_time, "ooooooooooooooooooooooooooooooooooo");
            var params = {
                main_visitor_id:this.state.main_visitor_id,
                user_id:usercookies,
                date_time:assign_time,
                remark:this.state.remark_for_task
            }
            // console.log("Add Taskkkk", params);
            if (params.remark=="" || params.remark==undefined) {
                this.setState({
                    message_erroe:"Please Fill All the Feilds"
                })
            }
            else{
                const res = fetch(settings.api_url + "add_task_lead", {
                    method: 'POST',
                    body: JSON.stringify(params),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    }
                }).then((response) => response.json())
                    .then(json => {
                        // console.log("add_task_lead Response **************************************", { params: params, response: json })
                        var data = json;
                        if (data.status == true) {
                            this.setState({
                                modalOpen_for_task:false,
                                message_erroe:"",
                                date_time_for_task:new Date(),
                                remark_for_task:""
                            })
                            addToast({
                                title: 'Add my policy',
                                content: data["message"],
                                time: new Date(),
                                duration: 2000,
                            });
                            this.get_single_lead(this.state.lead_id)
                        }
                        else {
                            addToast({
                                title: 'Add my policy',
                                content: data["message"],
                                time: new Date(),
                                duration: 2000,
                            });
                            this.setState({
                                message_erroe:"",
                                date_time_for_task:new Date(),
                                remark_for_task:""
                            })
                            // console.log("something wrong");
                        }
                    })
            }



        }


        add_sms_visitor=()=> {
          const usercookies = Cookies.get('usercookies');

          const {
              addToast,settings
          } = this.props;
          var params = {
              main_visitor_id:this.state.main_visitor_id,
              user_id:usercookies,
              date_time:new Date(this.state.date_time_for_message).toISOString(),
              message:this.state.message_for_user
          }
        //   console.log("Add Deatilssss", params);
          if (params.message=="" || params.message==undefined) {
              this.setState({
                  message_erroe:"Please Fill All the Feilds"
              })
          }
          else{
              const res = fetch(settings.api_url + "add_sms_lead", {
                  method: 'POST',
                  body: JSON.stringify(params),
                  headers: {
                      "Content-type": "application/json; charset=UTF-8",
                  }
              }).then((response) => response.json())
                  .then(json => {
                    //   console.log("add_sms_lead Response **************************************", { params: params, response: json })
                      var data = json;
                      if (data.status == true) {
                          this.setState({
                              modalOpen_sms:false,
                              message_erroe:"",
                              date_time_for_message:new Date(),
                              message_for_user:"",
                          })
                          addToast({
                              title: 'Add my policy',
                              content: data["message"],
                              time: new Date(),
                              duration: 2000,
                          });
                          this.get_single_lead(this.state.lead_id)
                      }
                      else {
                          addToast({
                              title: 'Add my policy',
                              content: data["message"],
                              time: new Date(),
                              duration: 2000,
                          });
                          this.setState({
                              message_erroe:"",
                              date_time_for_message:new Date(),
                              message_for_user:"",
                          })
                        //   console.log("something wrong");
                      }
                  })
          }



      }

      message_count=(message)=>{
        this.setState({
            text_count:message.length
        })
    }

    add_comment_visitor() {
      const usercookies = Cookies.get('usercookies');
      var date_time = new Date(this.state.new_time_date).toISOString()
    //   console.log(date_time, "ooooooooooooooooooooooooooooooooooo");
      const {
          addToast,settings
      } = this.props;

      var params = {
          main_visitor_id:this.state.main_visitor_id,
          user_id:usercookies,
          time:date_time,
          message:this.state.new_message_visitor
      }
    //   console.log("Add Cooment", params);
          const res = fetch(settings.api_url + "add_comment_lead", {
              method: 'POST',
              body: JSON.stringify(params),
              headers: {
                  "Content-type": "application/json; charset=UTF-8",
              }
          }).then((response) => response.json())
              .then(json => {
                //   console.log("add_comment_lead Response **************************************", { params: params, response: json })
                  var data = json;
                  if (data.status == true) {
                      this.setState({
                          new_message_visitor:""
                      })
                      this.get_single_lead(this.state.lead_id)
                  }
                  else {
                      this.setState({
                          new_message_visitor:""
                      })
                    //   console.log("something wrong");
                  }
              })


  }





     render() {

      const {
        isCollapsed,
    } = this.state;
    const {
        activeAccordion,
    } = this.state;



         const occupation = [
             { value: '1', label: 'Govt Employee' },
             { value: '2', label: 'Private Employee' },
             { value: '3', label: 'Business Man' },
         ];
         const type = [
             { value: '1', label: '1BHK' },
             { value: '2', label: '2BHK' },
             { value: '3', label: '3BHK' },
         ];
         const colorOptions = [
             { value: 'blue', label: 'Blue' },
             { value: 'ocean', label: 'Ocean' },
             { value: 'red', label: 'Red' },
             { value: 'yellow', label: 'Yellow' },
             { value: 'purple', label: 'Purple' },
             { value: 'orange', label: 'Orange' },
             { value: 'green', label: 'Green' },
         ];

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
         return (
             <Fragment>
               {/* <PageTitle className="lead_heading_new">
               <h1 style={{ marginTop: "-5px", whiteSpace: "nowrap",marginBottom: "-5px" }}>Lead Management</h1>
              </PageTitle> */}
              <div className="row topppp_111" >
                  <div className="col-lg-6 col-md-6">
                  <h1 className="laedd_dta_1" style={{ marginTop: "4px", whiteSpace: "nowrap",marginBottom: "7px",marginLeft:"15px" }}>Lead Management</h1>
                  </div>
              </div>

             <div>
               <Spinner color="warning" className="lead_spinner_lead" style={{marginTop: gk-63, display: this.state.isLoading }} />
              <div style={{display:this.state.isLoading=="none" ? "block" :"none"}}>
              <div className="task_list2" id="mySidenav" style={{ height: my_height}}>
                   kkkkk
              </div>
                 {/* <PageTitle className="lead_heading">
                     <div className="row lead_row" style={{ display: "inline-flex",width:"100%"}}>


                                 <div className="col-lg-3 col-md-12 col-sm-12 cate_12">
                                     <h1 style={{ marginTop: "0px", whiteSpace: "nowrap" }}>Lead Management</h1>
                                 </div>
                                 <div className="col-lg-2 col-md-3 col-sm-12 mob1 mob12 pad1">
                                     <input
                                         value={this.state.search_by}
                                         type="text"
                                         className={'form-control text_transform input_1234'}
                                         aria-describedby="mobilenumberHelp"
                                         placeholder="Search by Lead Name"
                                         onChange = {(e) =>
                                            this.setState({ search_by:e.target.value},
                                           this.search_archive(e.target.value,this.state.sort_by_category,this.state.sort_by_source,this.state.sort_by_occupation,this.state.current_page1))}
                                     />
                                 </div>
                                 <div className="col-lg-2 col-md-3 col-sm-12  mob1 mob12 pad1" style={{whiteSpace:"nowrap"}}>
                                     <Select
                                         value = {this.state.sort_by_category}
                                         onChange = {(e) =>
                                            this.setState({ sort_by_category:e},
                                           this.search_archive(this.state.search_by,e,this.state.sort_by_source,this.state.sort_by_occupation,this.state.current_page1))}
                                         placeholder="Select Lead Category.."
                                         options={category_array}
                                         styles={customStyles}
                                         className="contact_sort"
                                     />
                                 </div>


                                 <div className="col-lg-2 col-md-3 col-sm-12 mob1 mob12 pad1" style={{whiteSpace:"nowrap"}}>
                                     <Select
                                         value = {this.state.sort_by_source}
                                         onChange = {(e) =>
                                            this.setState({ sort_by_source:e},
                                           this.search_archive(this.state.search_by,this.state.sort_by_category,e,this.state.sort_by_occupation,this.state.current_page1))}
                                         placeholder="Select Lead Source.."
                                         options={source_array}
                                         styles={customStyles}
                                         className="contact_sort"
                                     />
                                 </div>
                                 <div className="col-lg-2 col-md-3 col-sm-12 mob1 mob12 pad1" style={{whiteSpace:"nowrap"}}>
                                     <Select
                                         value={this.state.sort_by_occupation}
                                         className="contact_sort select_item"
                                         styles={customStyles}
                                         options={occupation}
                                         placeholder="Sort By Occupation"
                                         onChange = {(e) =>
                                            this.setState({ sort_by_occupation:e},
                                           this.search_archive(this.state.search_by,this.state.sort_by_category,this.state.sort_by_source,e,this.state.current_page1))}
                                     />
                                 </div>
                                 <div className="col-lg-1 col-md-12 col-sm-12 button_add pad1">
                                     <Button disabled={this.state.sales_control == "false" ? 'disabled' : ''}  id="addVendor" style={{ marginLeft: "auto", whiteSpace: "nowrap", backgroundColor: 'rgb(50, 191, 200)', borderColor: 'rgb(50, 191, 200)', textTransform: "capitalize" }} color="brand" onClick={this.toggle}>Add Lead</Button>
                                 </div>

                     </div>
                 </PageTitle> */}


{/* <div >

<div className="text-center">


    <button type="button" className="btn btn-demo" data-toggle="modal" data-target="#myModal2">
        Right Sidebar Modal
    </button>
</div>

<div className="modal right fade" id="myModal2" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel2">
    <div className="modal-dialog" role="document">
        <div className="modal-content">

            <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel2">Right Sidebar</h4>
            </div>

            <div className="modal-body">
                <p>fmbgfmbodfk
                </p>
            </div>

        </div>
    </div>
</div>

</div> */}



{/* <button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
		Launch demo modal
	</button>

	<div className="modal fade  come-from-modal right" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
		<div className="modal-dialog" role="document">
			<div className="modal-content">
				<div className="modal-header">
					<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 className="modal-title" id="myModalLabel">Modal title</h4>
				</div>
				<div className="modal-body">
					...
				</div>
				<div className="modal-footer">
					<button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
					<button type="button" className="btn btn-primary">Save changes</button>
				</div>
			</div>
		</div>
	</div> */}










             <h3 style={{ display: this.state.no_data_message, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:gk-63}}>No Data Found</h3>
             <div className="mycalendar_123" style={{height:(my_height-84),overflowX:"hidden",overflowY:"scroll",justifyContent:"flex-start",display:this.state.no_data_message=="none" ? "block" :"none"}}>

                 <div className="row card_padding" style={{justifyContent:"flex-start"}}>
                 {this.state.lead_data_array.map((value,index)=>{
                   return(
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 babbbyyy_1222" key={index}>
                                     <Card className="contact_card" style={{ marginBottom: "10px", borderRadius: "10px", boxShadow: "6px 8px 16px -3px #e0d9d9", marginBottom: "30px" }} >
                                         <CardBody style={{ display: "inline-flex", width: "100%", padding: "13px 5px",height: "125px" }}>
                                             <div style={{ display: "inline", marginLeft: "10px",width:"-webkit-fill-available" }}>
                                                 <CardTitle style={{ height: "27px", overflow: "hidden", cursor: "pointer", textTransform: "capitalize", color: "#25242B", fontWeight: "500"}} className="h3 marquee_1"  onClick={() => {
                                                                this.setState({
                                                                    modalOpen_for_single: true,
                                                                    lead_id: value._id
                                                                })
                                                                this.get_single_lead(value._id)
                                                            }}><span>{value.insurance_details ? value.insurance_details[0].full_name :""}</span></CardTitle>
                                                 <CardSubtitle id="" style={{ height: "21px", overflow: "hidden", marginTop: "-22px", marginBottom: "-4px", color: "#91939F", fontSize: "13px", fontWeight: "500",textTransform: "capitalize"}} className="h5 text-muted marquee"><span>{value.mobile_no}</span></CardSubtitle>
                                                 <CardText className="mb-15 text-muted marquee_2" style={{ height: "23px", overflow: "hidden", color: "#91939F", fontSize: "11px", fontWeight: "500",textTransform: "capitalize"}}><span>{value.current_location}</span></CardText>
                                                 <CardText style={{ padding: "0px 30px", marginTop: "-48px", padding: "25px 1px", height: "122px" }}>
                                                     <div style={{ display: "grid" }}>
                                                         <div style={{ marginTop: "15px", display: "inline-flex",width:"100%"}}>

                                                             <Icon className="icon_coclor_222" name="mail" style={{ color: "#bcbec0" }} />
                                                             <span className="text-muted" style={{ height: "27px", overflow: "hidden", marginTop: "-6px", marginLeft: "7px" }}>{value.insurance_details ? value.insurance_details[0].email :""}</span>
                                                             <div style={{marginLeft: "auto"}}>
                                                             <img src={value.insurance_image} alt="insurance_img" className={value.insurance_type=="car_insurance" ? "insurance_img_lead": "insurance_img_for_acc_lead"}/>
                                                             </div>
                                                         </div>

                                                     </div>
                                                 </CardText>
                                             </div>

                                             <Dropdown
                                                 style={{ float: 'right', marginBottom: "auto",pointerEvents:this.state.sales_management_control =="false" ? "none" : "" }}
                                                 tag="div"
                                                 className="btn-group ml-20 shift_right"
                                                 direction="left"
                                                 openOnHover
                                                 showTriangle

                                             >
                                                 <Dropdown.Toggle tag="a" href="#" className="dropdown-item" style={{ marginTop: "10px" }}>
                                                     <Icon name="more-vertical" className="card_icon" />
                                                 </Dropdown.Toggle>
                                                 <Dropdown.Menu tag="ul" className="nav toggl_2" modifiers={{ offset: { offset: '-20' } }} >
                                                     <li className="rrr" type="button">
                                                         <div className="sssssss nav-link">

                                                             <button className="tttt"
                                                              disabled={this.state.sales_control == "false" ? 'disabled' : ''}
                                                              onClick={() => {
                                                                this.setState({
                                                                    modalOpen_for_details: true,
                                                                    main_visitor_id: value.main_visitor_id
                                                                })
                                                                this.get_single_lead(value.main_visitor_id)
                                                            }}
                                                             ><Icon name="edit" style={{marginLeft:"-34px"}}/><span style={{marginLeft:"25px"}}>Edit</span></button>
                                                         </div>
                                                     </li>
                                                     <li className="rrr" type="button">
                                                         < div className="sssssss nav-link">

                                                             <button className="tttt" disabled={this.state.sales_control == "false" ? 'disabled' : ''}
                                                              onClick={() => {
                                                                 this.toggle_delete();
                                                                 this.setState({
                                                                     modalOpen_delete: true,
                                                                     lead_id: value._id
                                                                 })
                                                             }}><Icon name="trash" style={{marginLeft:"-21px"}}/><span style={{marginLeft:"25px"}}>Delete</span></button>
                                                         </div>
                                                     </li>
                                                 </Dropdown.Menu>
                                             </Dropdown>
                                         </CardBody>
                                        {/* <CardBody style={{textAlign:"center", padding:"15px 15px", marginTop:"-84px"}}>
                                        <div style={{height:"75px", display:"flex"}} className="mybadge_div icon_input">
                                        <p className="align-self-center align-middle div_align-middle" style={{marginTop:"auto", marginBottom:"auto", marginLeft:"auto", marginRight:"auto"}} >

                                                   <Badge className="mybadge"  style={{ textTransform: "capitalize", color:"#687CFE",cursor: "auto", background:"#f1f2f7"}} >cbfgfhfh</Badge>
                                              </p>
                                            </div>
                                        </CardBody>
                                         <CardBody style={{ textAlign: "center", padding: "15px 15px", marginTop: "-26px" }}>
                                             <div style={{ height: "45px", display: "flex" }} className="mybadge_div">
                                                 <p className="align-self-center align-middle div_align-middle" style={{ marginTop: "auto", marginBottom: "auto", marginLeft: "auto", marginRight: "auto" }} >
                                                     <Badge className="mybadge" >vnvnghj</Badge>
                                                     <Badge className="mybadge" >hhhhhh</Badge>
                                                 </p>
                                             </div>
                                         </CardBody> */}
                                     </Card>
                                 </div>
                   )
                 })}

                     </div>

                 </div>
                 <Modal
                        isOpen={ this.state.modalOpen_for_single }
                        toggle={ this.toggle_single_one }
                        className={ this.props.className,"data_model right my_color" }
                        fade
                        right
                        style={{height:height-75}}
                    >
                        <div className="modal-header">
                            <h5 className="modal-title h2">{this.state.full_name_visitor}</h5>
                            <Button className="close" color="" onClick={ this.toggle_single_one }>
                                <Icon name="x" />
                            </Button>
                        </div>
                        <ModalBody>
                          <div className="row ">
                            <div className="col-lg-4 col-md-4 mycalendar" style={{height:dev_height-118}}>
                            {this.state.sub_visitor_result.map((value,index)=> {
                                     return(
                                    <div className="accordion-group" key={index}>
                                        { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
                                        <a
                                            href="#"
                                            className=""
                                            onClick={ ( e ) => {
                                                e.preventDefault();
                                                this.setState( {
                                                    activeAccordion: activeAccordion === index+1 ? 0 : index+1,
                                                } );
                                            } }
                                        >
                                             <div className="row accordian_new test_collapse">
                                             <div className="col-lg-6 col-md-6">
                                                 <div className="name_type_small" style={{height:value.insurance_details ? (value.insurance_details[0].full_name=="" || value.insurance_details[0].full_name==null ? "25px":""):""}}>
                                                 <span>{value.insurance_details ? value.insurance_details[0].full_name :""} </span></div>
                                                 <div className="time_new my_time_new" style={{color: "#000"}}>{value.registration_date_new}</div>
                                                 <div className="address_data_small" >
                                                     <Icon name="map-pin" className="map_data"/><span style={{color: "#000"}}>Nagpur, Maharashtra</span></div>
                                                 <div></div>
                                            </div>
                                             <div className="col-lg-6 col-md-6 text_align" style={{paddingLeft: "0px"}}>
                                                 <div className="phone_new"><Icon name="phone-call" className="phone_call"/>
                                                 <span className="mobile_no_type_small">{value.mobile_no}</span></div>
                                                 <div><img src={value.insurance_image} alt="insurance_img" className={value.insurance_type=="car_insurance" ? "insurance_img_for_acc": "insurance_img_twoo_acc"}/></div>
                                            </div>
                                         </div>
                                        </a>
                                        <Collapse isOpen={ index+1 === activeAccordion }>
                                        <div className="test_collapse">
                                            <Card className="my_card_top">

                                            <CardBody>
                                            <hr style={{marginTop: "7px"}}/>
                                                <CardText>

                                                <div className="hole_data test_collapse" >
                                                 <div className="row" style={{display:value.insurance_type=="car_insurance" ? "flex" : "none"}}>
                                                <div className="col-lg-6 col-md-6">
                                                    <span className="car_detais">Car Number</span>
                                                </div>
                                                <div className="col-lg-6 col-md-6 my_side">
                                                <span className="car_detais" style={{textTransform: "uppercase"}}>{value.insurance_details ? value.insurance_details[0].car_no :""}</span>
                                                </div>
                                                <div className="col-lg-6 col-md-6">
                                                <span className="car_detais">Car Brand</span>
                                                </div>
                                                <div className="col-lg-6 col-md-6 my_side">
                                                <span className="car_detais">{value.insurance_details ? value.insurance_details[0].car_brand :""}</span>
                                                </div>
                                                <div className="col-lg-6 col-md-6">
                                                <span className="car_detais">Fuel Type</span>
                                                </div>
                                                <div className="col-lg-6 col-md-6 my_side">
                                                <span className="car_detais">{value.insurance_details ? value.insurance_details[0].fuel_type :""}</span>
                                                </div>
                                                <div className="col-lg-6 col-md-6">
                                                <span className="car_detais">Reg Year</span>
                                                </div>
                                                <div className="col-lg-6 col-md-6 my_side">
                                                <span className="car_detais">{value.insurance_details ? value.insurance_details[0].car_registration_date :""}</span>
                                                </div>
                                                <div className="col-lg-6 col-md-6">
                                                <span className="car_detais">NCB</span>
                                                </div>
                                                <div className="col-lg-6 col-md-6 my_side">
                                                <span className="car_detais">{value.insurance_details ? value.insurance_details[0].previous_no_claim_bonus :""}</span>
                                                </div>
                                                <div className="col-lg-6 col-md-6">
                                                <span className="car_detais">Claim</span>
                                                </div>
                                                <div className="col-lg-6 col-md-6 my_side">
                                                <span className="car_detais">{value.insurance_details ? value.insurance_details[0].claim_in_previous_policy :""}</span>
                                                </div>
                                                <div className="col-lg-6 col-md-6">
                                                <span className="car_detais">Gender</span>

                                                </div>

                                                <div className="col-lg-6 col-md-6 my_side">
                                                <span className="car_detais" style={{textTransform:"capitalize"}}>{value.gender }</span>
                                                </div>
                                                <div className="col-lg-6 col-md-6" style={{marginTop:"20px"}}>
                                                <span className="car_detais">Visitor Id</span>
                                                </div>

                                                <div className="col-lg-6 col-md-6 my_side" style={{marginTop:"20px"}}>
                                                <span className="car_detais">{value.sales_id}</span>
                                                </div>
                                                <div className="col-lg-6 col-md-6">
                                                <span className="car_detais">Lead Id</span>
                                                </div>

                                                <div className="col-lg-6 col-md-6 my_side" >
                                                <span className="car_detais">{value.lead_id}</span>
                                                </div>

                                             </div>



                                             {/* *************** Bike Details *********************************************** */}

                                             <div className="row" style={{display:value.insurance_type=="two_wheeler_insurance" ? "flex" : "none"}}>
                                                <div className="col-lg-6 col-md-6">
                                                    <span className="car_detais">Bike Number</span>
                                                </div>
                                                <div className="col-lg-6 col-md-6 my_side">
                                                <span className="car_detais" style={{textTransform: "uppercase"}}>{value.insurance_details ? value.insurance_details[0].bike_no :""}</span>
                                                </div>
                                                <div className="col-lg-6 col-md-6">
                                                <span className="car_detais">Bike Brand</span>
                                                </div>
                                                <div className="col-lg-6 col-md-6 my_side">
                                                <span className="car_detais">{value.insurance_details ? value.insurance_details[0].bike_brand :""}</span>
                                                </div>
                                                <div className="col-lg-6 col-md-6">
                                                <span className="car_detais">Reg Year</span>
                                                </div>
                                                <div className="col-lg-6 col-md-6 my_side">
                                                <span className="car_detais">{value.insurance_details ? value.insurance_details[0].bike_registration_date :""}</span>
                                                </div>
                                                <div className="col-lg-6 col-md-6">
                                                <span className="car_detais">NCB</span>
                                                </div>
                                                <div className="col-lg-6 col-md-6 my_side">
                                                <span className="car_detais">{value.insurance_details ? value.insurance_details[0].previous_no_claim_bonus :""}</span>
                                                </div>
                                                <div className="col-lg-6 col-md-6">
                                                <span className="car_detais">Claim</span>
                                                </div>
                                                <div className="col-lg-6 col-md-6 my_side">
                                                <span className="car_detais">{value.insurance_details ? value.insurance_details[0].claim_in_previous_policy :""}</span>
                                                </div>
                                                <div className="col-lg-6 col-md-6">
                                                <span className="car_detais">Gender</span>

                                                </div>

                                                <div className="col-lg-6 col-md-6 my_side">
                                                <span className="car_detais" style={{textTransform:"capitalize"}}>{value.gender }</span>
                                                </div>
                                                <div className="col-lg-6 col-md-6" style={{marginTop:"20px"}}>
                                                <span className="car_detais">Visitor Id</span>
                                                </div>

                                                <div className="col-lg-6 col-md-6 my_side" style={{marginTop:"20px"}}>
                                                <span className="car_detais">{value.sales_id}</span>
                                                </div>
                                                <div className="col-lg-6 col-md-6">
                                                <span className="car_detais">Lead Id</span>
                                                </div>

                                                <div className="col-lg-6 col-md-6 my_side" >
                                                <span className="car_detais">{value.lead_id}</span>
                                                </div>

                                             </div>


                                         </div>
{/* *************************************************************************************************************************************************** */}

                                                    <div className="thums_up_down">
                                                        <div className="thums_down_new">
                                                              {
                                                                value.like==='' ? <p style={{pointerEvents:this.state.sales_management_control =="false" ? "none" : ""}}><img src={down_img} aria-hidden="true" alt="thum down" onClick={() => {
                                                                    this.setState({
                                                                    like_dislike: false,
                                                                    })
                                                                    setTimeout(() => {
                                                                        this.like_dislike_lead(value._id,false)
                                                                        }, 100)

                                                                      }}/>
                                                                  <img src={UP_IMG} alt="kk" aria-hidden="true"   onClick={() => {
                                                                    this.setState({
                                                                    like_dislike: true,
                                                                    })
                                                                    setTimeout(() => {
                                                                        this.like_dislike_lead(value._id,true)
                                                                        }, 100)
                                                                }}/></p>
                                                                : <p></p>
                                                            }
                                                            {
                                                                value.like=== true ? <p style={{pointerEvents:this.state.sales_management_control =="false" ? "none" : ""}}><img aria-hidden="true" src={down_img} alt="thum down"   onClick={() => {
                                                                    this.setState({
                                                                    like_dislike: true,
                                                                    })
                                                                    setTimeout(() => {
                                                                        this.like_dislike_lead(value._id,true)
                                                                        }, 100)
                                                                }}/>
                                                                <img src={thum_up_green} alt="kk"/></p>
                                                                : <p></p>
                                                            }
                                                            {
                                                                value.like=== false ? <p style={{pointerEvents:this.state.sales_management_control =="false" ? "none" : ""}}><img src={thums_down_red} alt="thum down"/>
                                                                <img aria-hidden="true" src={UP_IMG} alt="kk"    onClick={() => {
                                                                        this.setState({
                                                                        like_dislike: true,
                                                                        })
                                                                        setTimeout(() => {
                                                                            this.like_dislike_lead(value._id,true)
                                                                            }, 100)
                                                                    }}/></p>
                                                                : <p></p>
                                                            }
                                                        {/* <img src={down_img} alt="thum down" style={{display:value.like == "" || value.like == true ? "block" :"none"}}/>
                                                        <img src={thums_down_red} alt="kk" style={{display:value.like == false ?  "block" :"none"}}/> */}
                                                        </div>
                                                        <div className="thums_up_new" aria-hidden="true"
                                                        onClick={() => {
                                                            this.setState({
                                                            like_dislike: true,
                                                            isLoading:"block"
                                                            })
                                                            setTimeout(() => {
                                                                this.like_dislike_lead(value._id,true)
                                                                }, 600)
                                                        }}>
                                                        {/* <img src={UP_IMG} alt="thum up" style={{display:value.like == "" || value.like == false ?  "block" :"none"}}/>
                                                        <img src={thum_up_green} alt="kk" style={{display:value.my_img_like=="true"  ? "block" :"none"}}/> */}

                                                        </div>
                                                    </div>
 {/* ********************************************************************************************************************************************************************* */}
                                                <div className="btn_user" style={{marginTop: "10px"}}>
                                                <Button disabled={this.state.sales_management_control =="false" ? 'disabled' : ''} color="warning" outline
                                                style={{backgroundColor : value.just_looking==true ? "#8bc240" : "" ,color : value.just_looking==true ? "#fff" :"" ,borderColor:value.just_looking==true ? "#8bc240" :""}}
                                                        onClick={() => {
                                                            this.setState({
                                                                selected_btn_data: !value.just_looking,
                                                                visitor_button_type: "just_looking",
                                                            })
                                                            setTimeout(() => {
                                                                this.visitors_button_functionality(value._id,"just_looking")
                                                                }, 100)

                                                        }}>Just looking</Button>
                                                <Button disabled={this.state.sales_management_control =="false" ? 'disabled' : ''} color="warning" outline
                                                style={{backgroundColor : value.found_other==true ? "#8bc240" : "" ,color : value.found_other==true ? "#fff" :"" ,borderColor:value.found_other==true ? "#8bc240" :""}}
                                                onClick={() => {
                                                            this.setState({
                                                                selected_btn_data: !value.found_other,
                                                                visitor_button_type: "found_other",
                                                            })
                                                            setTimeout(() => {
                                                                this.visitors_button_functionality(value._id,"found_other")
                                                                }, 100)

                                                        }}>Found cheaper insurance somewhere else</Button>
                                                <Button disabled={this.state.sales_management_control =="false" ? 'disabled' : ''} color="danger" outline
                                                style={{backgroundColor : value.do_not_disturb==true ? "#dc3545" : "" ,color : value.do_not_disturb==true ? "#fff" :"" ,borderColor:value.do_not_disturb==true ? "#dc3545" :""}}
                                                onClick={() => {
                                                            this.setState({
                                                                selected_btn_data: !value.do_not_disturb,
                                                                visitor_button_type: "do_not_disturb",
                                                            })
                                                            setTimeout(() => {
                                                                this.visitors_button_functionality(value._id,"do_not_disturb")
                                                                }, 100)

                                                        }}>Do Not Distrub</Button>
                                                </div>

                                                </CardText>
                                            </CardBody>
                                            </Card>
                                        </div>
                                        </Collapse>
                                    </div>
                                       )
                                    })}
                           </div>
                            <div className="col-lg-8 col-md-8">


                            <div className="row row_flex my_class_1" style={{marginTop:"10px"}}>

                                <div className="column_a" style={{background:this.state.start_call=="Start Call" ? "#4B8178":"#b00217"}}>
                                <div className="row row_flex">
                                <div className="my_mobileeee" style={{textAlign:"center", display:"grid", width:"150px"}}>
                                <span className="time_start_lead">{this.state.minute < 10 ? "0"+this.state.minute : this.state.minute} : {this.state.second < 10 ? "0"+this.state.second : this.state.second}</span>
                                <span className="minutss displayyy">Minutes</span>
                                </div>

                                <div className="" aria-hidden="true" style={{textAlign:"inherit", display:"grid", width:"75px",cursor:"pointer",pointerEvents:this.state.sales_management_control =="false" ? "none" : ""}} onClick={this.swtich_time_function}>
                                <Icon aria-hidden="true"  className="icon_coclor" name="phone-call" />
                                {/* <span className="calllll">Start Call</span> */}
                                <div className="calllll displayyy">{this.state.start_call}</div>
                                </div>
                                </div>
                                </div>

                                <div className=" column_b" aria-hidden="true" style={{cursor:"pointer",pointerEvents:this.state.sales_management_control =="false" ? "none" : ""}} onClick={ this.toggle_sms } >
                                <Icon className="msg_icon" name="message-circle" />
                                {/* <span className="send_sms">Send SMS</span> */}
                                <div className="send_sms displayyy">Send SMS</div>
                                </div>

                                <div className=" column_c" aria-hidden="true" style={{textAlign:"center",cursor:"pointer",pointerEvents:this.state.sales_management_control =="false" ? "none" : ""}} onClick={ this.toggle_for_appoinment }>
                                <Icon className="calendarr" name="calendar" />
                                <div className="add_app add_new displayyy">Add</div>
                                <div className="add_app displayyy">Appointment</div>
                                </div>

                                <div className="column_g" aria-hidden="true" style={{textAlign:"center",cursor:"pointer",pointerEvents:this.state.sales_management_control =="false" ? "none" : ""}} onClick={ this.toggle_for_task }>
                                <Icon className="edittt" name="edit" />
                                <div className="add_taskkk displayyy">Add Task</div>
                                </div>



                                <div className="column_f_lead" aria-hidden="true" style={{textAlign:"center",cursor:"pointer",pointerEvents:this.state.sales_management_control =="false" ? "none" : ""}}  onClick={() => {
                                                                this.setState({
                                                                    modalOpen_for_details: true,
                                                                })
                                                                this.get_single_lead(this.state.main_visitor_id)
                                                            }}>
                                <Icon className="alerttt" name="alert-circle" />
                                <div className="detailsss displayyy">Edit Details</div>
                                {/* <span className="detailsss">Add Details</span> */}
                                </div>

                                </div>


                                <div style={{display: this.state.visitor_task_data == "" && this.state.visitor_appointment_data == "" ? "none":"block"}}>
                                             <div className="row">
                                             <div className="col-lg-6 col-md-6" style={{paddingRight: "10px",display:this.state.visitor_appointment_data == "" ? "none":"block"}}>
                                             <div className="row accordian_new_for_task my_height_1">
                                                <div className="col-lg-7 col-md-7" style={{paddingRight: "5px"}}>
                                                    <div className="name_type_small">
                                                    <span>Active Appointments</span></div>
                                                    <div className="my_pppp">{this.state.appoinment_remark}</div>
                                                </div>
                                                <div className="col-lg-5 col-md-5" style={{paddingLeft: "0px",textAlign:"end"}}>
                                                    <div style={{display: "grid"}}><span className="date_of_app">{this.state.date_of_app}</span><span className="time_of_app">{this.state.time_of_app}</span></div>
                                                </div>
                                             </div>
                                             </div>
                                             <div className="col-lg-6 col-md-6" style={{display:this.state.visitor_task_data == "" ? "none":"block",paddingLeft:"0px"}}>
                                             <div className="row accordian_new_for_task my_height_1">
                                                <div className="col-lg-7 col-md-7" style={{paddingRight: "5px"}}>
                                                    <div className="name_type_small">
                                                    <span>Active Task - Follow Up</span></div>
                                                    <div className="my_pppp">{this.state.remark_for_task_new}</div>
                                                </div>
                                                <div className="col-lg-5 col-md-5" style={{paddingLeft: "0px",textAlign:"end"}}>
                                                    <div style={{display: "grid"}}><span className="date_of_app">{this.state.date_of_task}</span><span className="time_of_app">{this.state.time_of_task}</span></div>
                                                </div>
                                             </div>
                                             </div>
                                             </div>
                                        </div>


                                        <div className="meesage_div mycalendar_message" style={{height:this.state.visitor_task_data == "" && this.state.visitor_appointment_data == ""  ? (my_height-289) : (my_height-394)}}>
                                                {this.state.message_array.map((value,index)=>{
                                                    console.log("index",this.state.message_array.length-1==index);
                                                    return(
                                                        <div key={index}>
                                                            <div style={{display:value.type=="message" ? "block":"none",float:"right"}} className="overclass_user_new ">
                                                            <div style={{display:value.type=="message" ? "block":"none"}} className="new_message_1 ">
                                                            <h5 dangerouslySetInnerHTML={{ __html: value.message}}></h5>
                                                            </div>
                                                            <div style={{ float:  'right' , width: "100%", display:value.type=="message" ? "block":"none" }} className="mesage_timimg test_collapse">
                                                                    <span style={{ float: 'right'  }} className="test_collapse">
                                                                        <span>{value.time_new_meesage}</span>
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <div style={{display:value.type=="badge" ? "inline-flex":"none",marginTop:this.state.message_array.length-1 ==index ? "20px" :""}} className="new_message_bage">
                                                            <Icon name="phone-call" className="phone_call_message"/>
                                                            <h6 dangerouslySetInnerHTML={{ __html: value.message}}></h6>
                                                            </div>
                                                            <div style={{display:value.type=="sms_badge" ? "inline-flex":"none",marginTop:this.state.message_array.length-1 ==index ? "20px" :""}} className="new_message_bage">
                                                            <Icon name="message-circle" className="medssage_message"/>
                                                            <h6 dangerouslySetInnerHTML={{ __html: value.message}}></h6>
                                                            </div>
                                                        </div>
                                                    )
                                                })}

                                            </div>
                                            <div className="my_input_new">
                                            <Input type="email" name="email" id="emailInput1" placeholder="Add Comments..." className="meesage_div_input" value={this.state.new_message_visitor} onChange={(e) => {
                                            this.setState({
                                                new_message_visitor: e.target.value
                                            })
                                        }}/>
                                            <Button disabled={this.state.sales_management_control =="false" ? 'disabled' : ''} color="success" onClick={() => {
                                                                this.add_comment_visitor()

                                                        }}>Send</Button>
                                            </div>




















                           </div>

                          </div>
                        </ModalBody>
                    </Modal>

                        {/* *****************************  ADD APPOINTMENT MODEL ********************************************************************************* */}
                <Modal
                        isOpen={ this.state.modalOpen_for_appoinment }
                        toggle={ this.toggle_for_appoinment }
                        className={ this.props.className,"modal-dialog-centered"}
                        fade
                    >
                        <div className="modal-header">
                            <h5 className="modal-title h2">Add Appoinment</h5>
                            <Button className="close" color="" onClick={ this.toggle_for_appoinment }>
                                <Icon name="x" />
                            </Button>
                        </div>
                        <ModalBody style={{paddingBottom: "2px"}}>
                            <div className="row">
                                    <div className="col-lg-6 col-md-6 my_date_pii">
                                    <Label className=""> Select Date Time</Label>
                                    <DatePicker
                                        selected={this.state.firstVal}
                                        onChange={(val) => {
                                            this.setState({
                                                firstVal: val,
                                            });
                                        }}
                                        showTimeSelect
                                        placeholder="Select Date and Time"
                                        dateFormat="dd-MM-yyyy h:mm aa"
                                        className="rui-datetimepicker form-control  mydate"
                                    />
                                    </div>
                                    <div className="col-lg-12 col-md-12" style={{marginTop:"20px"}}>
                                    <Label for="phone">Remark</Label>
                                    <textarea
                                        type="text"
                                        className="form-control abcd"
                                        aria-describedby="emailHelp"
                                        placeholder="Remark"
                                        value={this.state.remark_for_appoinment}
                                        onChange={(e) => {
                                            this.setState({
                                                remark_for_appoinment: e.target.value
                                            })

                                        }}
                                    />
                                    </div>
                                    <div className="col-lg-12 col-md-12" style={{marginTop:"20px",textAlign:"center"}} >
                                        <span style={{color:"red"}}>{this.state. message_erroe}</span>
                                    </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={ this.toggle_for_appoinment }>Close</Button>
                            { ' ' }
                            <Button color="warning" onClick={ this.add_appointment_visitor } style={{color:"#fff"}}>Save</Button>
                        </ModalFooter>
                    </Modal>



                 <Modal
                        isOpen={ this.state.modalOpen_for_details }
                        toggle={ this.toggle_for_details }
                        className={ this.props.className,"modal-dialog-centered " }
                        fade
                        style={{maxWidth:"600px"}}
                    >
                        <div className="modal-header">
                            <h5 className="modal-title h2">Edit Details</h5>
                            <Button className="close" color="" onClick={ this.toggle_for_details }>
                                <Icon name="x" />
                            </Button>
                        </div>
                        <ModalBody style={{paddingBottom: "2px"}}>
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                            <Label for="phone">Full Name</Label>
                            <input type="text" className="form-control ff" placeholder="Full Name" value={this.state.full_name_visitor}
                             onChange={(e) => {
                             this.setState({
                              full_name_visitor: e.target.value,
                              });
                             }}/>
                            </div>
                            <div className="col-lg-6 col-md-6">
                            <Label for="phone">Mobile No</Label>
                            <input type="Number" className="form-control ff" placeholder="Mobile No" value={this.state.mobile_no_visitor}
                             onChange={(e) => {
                             this.setState({
                              mobile_no_visitor: e.target.value,
                              });
                             }}/>
                            </div>
                            <div className="col-lg-6 col-md-6" style={{marginTop: "15px"}}>
                            <Label for="phone">Email</Label>
                            <input type="text" className="form-control ff" placeholder="Email" value={this.state.email_visitor}
                             onChange={(e) => {
                             this.setState({
                              email_visitor: e.target.value,
                              });
                             }}/>
                            </div>
                            <div className="col-lg-6 col-md-6" style={{marginTop: "15px"}}>
                            <Label for="phone"> Location</Label>
                            <input type="text" className="form-control ff" placeholder="Location" value={this.state.location_visitor}
                             onChange={(e) => {
                             this.setState({
                              location_visitor: e.target.value,
                              });
                             }}/>
                            </div>
                            <div className="col-lg-4 col-md-4" style={{marginTop: "15px"}}>
                            <Label for="phone">Gender</Label>
                            <div className="input_radio">
                            <CustomInput type="radio" id="formRadio6" name="formRadio" label="Male" checked={this.state.visitor_gender == "male" ? true : false} onClick={() => { this.setState({ visitor_gender: "male" }) }} />
                            <CustomInput type="radio" id="formRadio9" name="formRadio" label="Female" checked={this.state.visitor_gender == "female" ? true : false} onClick={() => { this.setState({ visitor_gender: "female" }) }} />
                            </div>
                            </div>
                            <div className="col-lg-12 col-md-12" style={{marginTop:"20px",textAlign:"center"}} >
                            <span style={{color:"red"}}>{this.state. message_erroe}</span>
                             </div>

                        </div>
                         </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={ this.toggle_for_details }>Close</Button>
                            { ' ' }
                            <Button color="warning" style={{color:"#fff"}} onClick={ this.update_detail_lead }>Save</Button>
                        </ModalFooter>
                    </Modal>


                 <Modal
                     style={{ width: '347px', maxHeight: '37%', justifyContent: 'center', textAlign: 'center', alignItem: 'center', marginTop: '200px' }}
                     isOpen={this.state.modalOpen_delete}
                     toggle={this.toggle_delete}
                     className={this.props.className}
                     fade
                 >
                     <ModalBody>
                         <div style={{ width: '100%', height: '20px' }}>
                             <Button className="close" color="" onClick={this.toggle_delete}>
                                 <Icon name="x" />
                             </Button>
                         </div>
                         <div style={{ width: '100%', height: '50px' }}>
                             <h5 >Are you sure you want to Delete ?</h5>
                         </div>
                         <div style={{ height: '50px', width: '100%' }}>
                             <Button color="secondary" onClick={this.toggle_delete}>Close</Button>
                             {' '}
                             <Button color="warning" style={{color:"#fff"}}
                                 onClick={() => { this.delete_lead(this.state.lead_id) }}>Yes</Button>
                         </div>
                     </ModalBody>
                 </Modal>


                 {/* *****************************  ADD TASK MODEL ********************************************************************************* */}
                <Modal
                        isOpen={ this.state.modalOpen_for_task }
                        toggle={ this.toggle_for_task }
                        className={ this.props.className,"modal-dialog-centered" }
                        fade
                    >
                         <div className="modal-header">
                            <h5 className="modal-title h2">Add Task</h5>
                            <Button className="close" color="" onClick={ this.toggle_for_task }>
                                <Icon name="x" />
                            </Button>
                        </div>
                        <ModalBody style={{paddingBottom: "2px"}}>
                            <div className="row">
                                    <div className="col-lg-6 col-md-6 my_date_pii">
                                    <Label className=""> Select Date Time</Label>
                                    <DatePicker
                                        selected={this.state.date_time_for_task}
                                        onChange={(val) => {
                                            this.setState({
                                                date_time_for_task: val,
                                            });
                                        }}
                                        showTimeSelect
                                        placeholder="Select Date and Time"
                                        dateFormat="dd-MM-yyyy h:mm aa"
                                        className="rui-datetimepicker form-control  mydate"
                                    />
                                    </div>
                                    <div className="col-lg-12 col-md-12" style={{marginTop:"20px"}}>
                                    <Label for="phone">Remark</Label>
                                    <textarea
                                        type="text"
                                        className="form-control abcd"
                                        aria-describedby="emailHelp"
                                        placeholder="Remark"
                                        value={this.state.remark_for_task}
                                        onChange={(e) => {
                                            this.setState({
                                                remark_for_task: e.target.value
                                            })

                                        }}
                                    />
                                    </div>
                                    <div className="col-lg-12 col-md-12" style={{marginTop:"20px",textAlign:"center"}} >
                                        <span style={{color:"red"}}>{this.state. message_erroe}</span>
                                    </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={ this.toggle_for_task }>Close</Button>
                            { ' ' }
                            <Button color="warning" onClick={ this.add_task_visitor } style={{color:"#fff"}}>Save</Button>
                        </ModalFooter>
                    </Modal>



                    {/* *****************************  SEND SMS MODEL ********************************************************************************* */}
                <Modal
                        isOpen={ this.state.modalOpen_sms }
                        toggle={ this.toggle_sms }
                        className={ this.props.className,"modal-dialog-centered" }
                        fade
                        style={{maxWidth:"600px"}}
                    >
                        <div className="modal-header">
                            <h5 className="modal-title h2">Send Message</h5>
                            <Button className="close" color="" onClick={ this.toggle_sms }>
                                <Icon name="x" />
                            </Button>
                        </div>
                        <ModalBody style={{paddingBottom: "2px"}}>
                        <div className="row">
                                    <div className="col-lg-6 col-md-6 my_date_pii">
                                    <Label className=""> Select Date Time</Label>
                                    <DatePicker
                                        selected={this.state.date_time_for_message}
                                        onChange={(val) => {
                                            this.setState({
                                                date_time_for_message: val,
                                            });
                                        }}
                                        showTimeSelect
                                        placeholder="Select Date and Time"
                                        dateFormat="dd-MM-yyyy h:mm aa"
                                        className="rui-datetimepicker form-control  mydate"
                                    />
                                    </div>
                                    <div className="col-lg-12 col-md-12" style={{marginTop:"20px"}}>
                                    <Label for="phone" className="message_count"><p>Message</p><p>{this.state.text_count}/165</p></Label>
                                    <textarea
                                        type="text"
                                        className="form-control abcd"
                                        aria-describedby="emailHelp"
                                        placeholder="Message"
                                        name="text"
                                        value={this.state.message_for_user}
                                        maxLength={165}
                                        onChange={(e) => {
                                            this.setState({
                                                message_for_user: e.target.value
                                            })
                                            this.message_count(e.target.value)
                                        }}
                                        onFocus={this.handleChange}
                                    />
                                    </div>
                                    <div className="col-lg-12 col-md-12" style={{marginTop:"20px",textAlign:"center"}} >
                                        <span style={{color:"red"}}>{this.state. message_erroe}</span>
                                    </div>
                            </div>
                      </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={ this.toggle_sms }>Close</Button>
                            { ' ' }
                            <Button color="warning" style={{color:"#fff"}} onClick={ this.add_sms_visitor }>Save</Button>
                        </ModalFooter>
                    </Modal>


                    {/* <Button variant="primary" onClick={handleShow}>
                        Launch
                    </Button>

                    <Offcanvas show={show} onHide={handleClose}>
                        <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                        Some text as placeholder. In real life you can have the elements you
                        have chosen. Like, text, images, lists, etc.
                        </Offcanvas.Body>
                    </Offcanvas> */}

{/* <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Toggle right offcanvas</button>

<div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
  <div className="offcanvas-header">
    <h5 id="offcanvasRightLabel">Offcanvas right</h5>
    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body">
    ...
  </div>
</div> */}







                 </div>
                 </div>



             </Fragment>
         );
     }
 }

 export default connect(({ settings }) => (
     {
         settings,
     }
 ), { addToast: actionAddToast })(Content);
