/**
 * External Dependencies
 */
 import './style.scss';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
    Row, Col,
    Card, CardImg, CardHeader, CardBody, CardText,
    CardTitle, CardSubtitle, CardLink, CardFooter,
    Button, Collapse, ListGroup, ListGroupItem,Spinner,Table,ButtonGroup,Input, Modal, ModalBody, ModalFooter,Label,CustomInput
} from 'reactstrap';
import {  UncontrolledCollapse } from 'reactstrap';
import PageTitle from '../../components/page-title';
import axios from 'axios'
/**
 * Internal Dependencies
 */
import Snippet from '../../components/snippet';
import Icon from '../../components/icon';
import Tabs from '../../components/tabs';
import { io } from "socket.io-client"
import Cookies from 'js-cookie';
import {
    addToast as actionAddToast,
} from '../../actions';
import dateFormat from 'dateformat';

import thum_up_green from '../../images/IMG_20230110_113026.jpg'
import down_img from '../../images/DOWN.PNG'
import thums_down_red from '../../images/IMG_20230110_113532.jpg'
import UP_IMG from '../../images/UP.PNG'
import DatePicker from '../../components/date-time-picker';
import el from 'date-fns/esm/locale/el/index.js';
import socket from '../Socket';

// import Cookies from 'js-cookie';
/**
 * Component
 */

 const device_width =   window.innerWidth;
 var height =   window.innerHeight;
//  console.log("admin_screen.height", height);
 const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
//  console.log("admin_nav_height",nav_height);
 var my_height = height - nav_height;
 var gk = (my_height/2)-100;
//  console.log("admin_gk",gk);
 if(device_width < 600){
   var gk = (my_height/2) - 50;
 }

//  // var api_url = "http://192.168.29.31:4090/"
// // var api_url = "http://173.249.5.10:3005/"
// var api_url = "https://api.bookyourinsurance.com:4092/"
// // var api_url = "https://demoapi.bookyourinsurance.com:4050/"



// var socket = io(api_url, {transport : ['WebSocket']});
// console.log("socket",socket);
const admin_data = JSON.parse(Cookies.get('admin_data'));
// console.log("admin_data",admin_data);
class Content extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            isCollapsed: true,
            activeTab2: 'home',
            visitor_data_array : [],
            no_data_message:"none",
            isLoading:"block",
            isLoading_for_lead:"block",
            total_pages:"",
            total:"",
            spinner_1:"none",
            user_role:admin_data[0].role.label,
            user_id:admin_data[0]._id,
            visitor_single_data_array:[],
            visitor_type:"online",
            total_length_of_visitor:"",
            sub_visitor_result:[],
            activeAccordion: 1,
            selected_btn_data:false,
            message_array:[],
            new_time_date:new Date(),
            new_message_visitor:"",
            start_time:'',
            mirror_screen_url:"",
            modalOpen_sms: false,
            modalOpen_for_appoinment: false,
            modalOpen_for_task: false,
            modalOpen_for_lead: false,
            modalOpen_for_details: false,
            firstVal: new Date(),
            remark_for_appoinment:"",
            message_erroe:"",
            visitor_appointment_data:[],
            appoinment_remark:"",
            time_new_meesage:"",
            date_time_for_task:new Date(),
            remark_for_task:"",
            remark_for_task_new:"",
            date_of_task:"",
            time_of_task:"",
            visitor_task_data:[],
            full_name_visitor:"",
            mobile_no_visitor:"",
            email_visitor:"",
            location_visitor:"",
            visitor_gender:"",
            date_time_for_message:new Date(),
            message_for_user:"",
            text_count:0,
            set_second:0,
            set_minute:0,
            start_call:"Start Call",
            end_call:"End Call",
            minute: 0,
            second: 0,
            show_timer: null,
            date_time_for_call:new Date(),
            date_time_for_end_call:new Date(),
            ipad_width:"none",
            ipad_emp_list:"block",
            sales_management_control:Cookies.get('sales_management_control'),

            // like_dislike:""
        };

        this.collapse = this.collapse.bind( this );
        this.toggleTab = this.toggleTab.bind( this );
        this.toggle_sms = this.toggle_sms.bind( this );
        this.toggle_for_appoinment = this.toggle_for_appoinment.bind( this );
        this.toggle_for_task = this.toggle_for_task.bind( this );
        this.toggle_for_lead = this.toggle_for_lead.bind( this );
        this.toggle_for_details = this.toggle_for_details.bind( this );
        this.please_startTimer = this.please_startTimer.bind( this );
        this.please_stopTimer = this.please_stopTimer.bind( this );
        this.swtich_time_function = this.swtich_time_function.bind( this );
    }

    componentDidMount(){

    //   console.log("inside didmount*****************");

      socket.on("connect", () => {
            // console.log("Socketttt_____________",socket);
            // console.log("Socketttt_____________",socket.connected);
            // console.log("Socketttt_____________",socket.id);
            if (socket.connected==true) {
                this.update_socket_id_admin(socket.id)
            }
            else{
                // console.log("wronggg");
            }
           })

        socket.on('add_online_visitor_response', (data) => {

        //   console.log("inside sooooooccccccckkkkkket");
            this.get_online_visitors();
              })

             this.get_online_visitors();
             this.my_api_id();
             this.getGeoInfo()
          }

          update_socket_id_admin = (socket_id) => {
           const usercookies = Cookies.get('usercookies');
           var params = {
               user_id:usercookies,
               socket_id:socket_id
           }
        //    console.log("update_socket_id_admin_params", params);
           const res = fetch(api_url + "update_socket_id_admin", {
           method: 'POST',
           body: JSON.stringify(params),
           headers: {
             "Content-type": "application/json; charset=UTF-8",
           }
         }).then((response) => response.json())
           .then(json => {
            //  console.log('inside update_socket_id_admin_response =============',json)
           })
       }

          getGeoInfo = () => {
            axios.get('https://ipapi.co/json/').then((response) => {
                let data = response.data;
                // console.log("NEW IP ++++++++++++++",data);
                // this.setState({
                //     countryName: data.country_name,
                //     countryCode: data.country_calling_code
                // });
            }).catch((error) => {
                // console.log(error);
            });
        };
          my_api_id(){
            //   console.log("IPADDDDDDDDDDDD");
            //   const response = await fetch('https://geolocation-db.com/json/');
            //     const data = await response.json();
            //     console.log("IP_DATA++++++++++++++++++++",data);
                // this.setState({ ip: data.IPv4 })
                // alert(this.state.ip)
            fetch("https://geolocation-db.com/json/")
            // fetch("https://api.ipdata.co")
            .then(response => {
              return response.json();
             }, "jsonp**************************************")
            .then(res => {
            //   console.log("IP_ADDDDDRESSSSSSS",res)

            })
            .catch(err => console.log(err))
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
      toggle_for_lead() {
            this.setState( ( prevState ) => ( {
                modalOpen_for_lead: ! prevState.modalOpen_for_lead,
                message_erroe:"",
            } ) );
        }
      toggle_for_details() {
            this.setState( ( prevState ) => ( {
                modalOpen_for_details: ! prevState.modalOpen_for_details,
                message_erroe:"",
            } ) );
        }


    get_online_visitors(pageNumber){

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

      if (this.state.user_role=="Super Admin") {
        var conv_param = {
            page_no:page_no,
            user_role:this.state.user_role,
            type:this.state.visitor_type

    }
    // console.log("SUPER ADMIN");
      }
      else{
        const usercookies = Cookies.get('usercookies');
        var conv_param = {
            page_no:page_no,
            user_id:usercookies,
            user_role:this.state.user_role,
            type:this.state.visitor_type

    }
      }



         console.log("conv_param",conv_param);

            socket.emit('get_online_visitors', conv_param);
            socket.on('get_online_visitors_response', (data)=>{


                //   console.log('inside get_online_visitors_response =============',data);



                    // var date_str = new Date(data.data.data[0].start_time),
                    // options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'},
                    // formatted = (new Date(date_str)).toLocaleDateString('en-US', options),
                    // date_parts = formatted.substring(0, formatted.indexOf(",")).split(" ").reverse().join(" ");

                    //     var formatted_date = date_parts + formatted.substr(formatted.indexOf(",") + 1);

                    //     console.log(date_parts,"P*****************************");
                    //     console.log(formatted_date,"PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP");
                    //     console.log(options,"PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP");







                        //    var date = new Date(data.data.data[0].registration_date);

                        //     console.log("nre_time+++++++++++++++++++***********",this.formatDate(date));




                        //     var new_date = this.formatDate(data.data.data[0].registration_date);
                        //     console.log("new_datenew_date",new_date);

                  if(data.data.status==true){
                    var visitor_data_array = data.data.data;
                    for (let i = 0; i < visitor_data_array.length; i++) {
                        // const element = array[i];
                        // console.log("visitor_data_array++++++++++++",visitor_data_array[i]);

                        var date = new Date(visitor_data_array[i].registration_date);

                        // console.log("nre_time+++++++++++++++++++***********",this.formatDate(date));

                        var new_date = this.formatDate(date);
                        visitor_data_array[i].registration_date_new = new_date

                    }


                      this.setState({
                          visitor_data_array : visitor_data_array,
                        //   visitor_data_array : data.data.data,
                          no_data_message:"none",
                          isLoading:"none",
                          total_pages:data.data.total_pages,
                          total:data.data.total,
                          total_length_of_online_count:data.data.online_count,
                          total_length_of_attended_count:data.data.attended_count,
                          total_length_of_booked_count:data.data.booked_count,
                          spinner_1:"none"
                      })
                      if (device_width < 769) {
                        // console.log("display lisit none");

                       }
                       else{
                        this.get_single_online_visitors(data.data.data[0].main_visitor_id)
                       }

                  }
                  else{
                      this.setState({
                        visitor_data_array:[],
                        no_data_message:"block",
                        isLoading:"none",
                        total_length_of_online_count:data.data.online_count,
                        total_length_of_attended_count:data.data.attended_count,
                        total_length_of_booked_count:data.data.booked_count,
                        spinner_1:"none"

                      })
                  }

            })
      }




    mirror_screen=(mirror_screen_url)=>{
        const {
            addToast,settings
        } = this.props;
        // console.log("Mirror_Screen",mirror_screen_url);
        if (mirror_screen_url=="" || mirror_screen_url==undefined) {
            addToast({
                title: 'Add my policy',
                content: "Link does not generated",
                time: new Date(),
                duration: 5000,
            });
        }
        else{
            // console.log("kkk");
            window.open(mirror_screen_url, '_blank');
        }
    }


       formatDate(date) {
// console.log("date",new Date(date));
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

        //  console.log(dt+'-' + month + '-'+year);
         var new_date_1 = dt+'-' + month + '-'+year

         var today = date;
         let options_1 = {
             hour: "2-digit", minute: "2-digit"
         };

        //  console.log("lllllllllllllllllllllllllllll",today.toLocaleTimeString("en-us", options_1));
                            var time_new =today.toLocaleTimeString("en-us", options_1)
                            // console.log("mt______________________________________________*********************",time_new);
                            // console.log("mt______________________________________________",new_date_1);

                            var nre_time = new_date_1+ " " +  time_new


        return nre_time;
      }
      get_single_online_visitors(online_visitors_id){
        var conv_param = {
            online_visitors_id:online_visitors_id,

           }
        //  console.log("conv_param_single_visitor",conv_param);

            socket.emit('get_single_online_visitors', conv_param);
            socket.on('get_single_online_visitors_response', (data)=>{


                //   console.log('inside get_single_online_visitors_response =============',data);

                  if(data.data.status==true){

                    if (device_width < 769) {
                        var ipad_emp_list = "none";
                        // console.log("display lisit none", ipad_emp_list);
                       }
                       else{
                       var ipad_emp_list = "block"
                    //    console.log("display lisit");

                       }



                    var visitor_data_array_suu_visitor = data.data.data[0].sub_visitor_result;
                    for (let i = 0; i < visitor_data_array_suu_visitor.length; i++) {

                        var date = new Date(visitor_data_array_suu_visitor[i].registration_date);

                        var new_date = this.formatDate(date);
                        visitor_data_array_suu_visitor[i].registration_date_new = new_date

                        // if (visitor_data_array_suu_visitor[i].like =="") {
                        //     console.log("yesss");
                        //     visitor_data_array_suu_visitor[i].my_img_like="blank"
                        //  }
                        //  if (visitor_data_array_suu_visitor[i].like ==true) {
                        //      console.log("true");
                        //      visitor_data_array_suu_visitor[i].my_img_like="true"
                        //  }
                        //  if (visitor_data_array_suu_visitor[i].like ==false) {
                        //      console.log("false");
                        //      // var my_img_like="false"
                        //      visitor_data_array_suu_visitor[i].my_img_like="false"
                        //  }


                    }


                    // console.log("visitor_data_array_suu_visitor ++++++++++++++",visitor_data_array_suu_visitor);

                    if (data.data.data[0].type=="attended") {
                        var like_data =data.data.data[0].like
                    }
                    else{
                        var like_data =undefined
                    }
                    if (data.data.data[0].visitor_comment_data.length==0) {
                        var new_message_array =[]
                    }
                    else{
                        var new_message_array =data.data.data[0].visitor_comment_data
                        // console.log("new_message_array",new_message_array);
                        for (let i = 0; i < new_message_array.length; i++) {

                            var date_message = new Date(new_message_array[i].time);

                            var new_date_message = this.formatDate(date_message);
                            new_message_array[i].time_new_meesage = new_date_message

                        }
                    }

                    if (data.data.data[0].mirror_screen_url==undefined || data.data.data[0].mirror_screen_url==" ") {
                        var mirror_screen_url=""
                        // console.log("mirror_screen_url",mirror_screen_url);
                    }
                    else{
                        var mirror_screen_url=data.data.data[0].mirror_screen_url
                        // console.log("mirror_screen_url",mirror_screen_url);
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







                    // console.log("sub_visitor_result",visitor_data_array_suu_visitor);
                    // console.log("visitor_appointment_data",visitor_appointment_data);
                    // console.log("visitor_task_data",visitor_task_data);
                      this.setState({
                          visitor_single_data_array : data.data.data,
                          sub_visitor_result : visitor_data_array_suu_visitor,
                          online_visitors_id_new:data.data.data[0]._id,
                          online_visitors_id:data.data.data[0].main_visitor_id,
                          message_array:new_message_array,
                          like_dislike:like_data,
                          visitor_type:data.data.data[0].type,
                          spinner_1:"none",
                          mirror_screen_url:mirror_screen_url,
                          visitor_appointment_data:visitor_appointment_data,
                          appoinment_remark:appoinment_remark,
                          date_of_app:converted_date,
                          time_of_app:time_of_app,
                          visitor_task_data:visitor_task_data,
                          remark_for_task_new:remark_for_task,
                          date_of_task:converted_date_for_task,
                          time_of_task:time_of_task,
                          full_name_visitor:data.data.data[0].insurance_details[0].full_name,
                          mobile_no_visitor:data.data.data[0].insurance_details[0].mobile_no,
                          email_visitor:data.data.data[0].insurance_details[0].email,
                          location_visitor:data.data.data[0].current_location,
                          visitor_gender:data.data.data[0].gender,

                          ipad_width:"block",
                           ipad_emp_list:ipad_emp_list

                      })
                    //   console.log("likeeeeeeeeee",data.data.data[0].like);
                  }
                  else{
                      this.setState({
                        visitor_single_data_array:[],
                        sub_visitor_result:[],
                        spinner_1:"none"
                      })
                  }

            })
      }
      mark_done_call(online_visitors_id){
        const {addToast} = this.props;
        var conv_param = {
            online_visitors_id:online_visitors_id,
         }
         console.log("mark_done_call params",conv_param);

            socket.emit('mark_done_call', conv_param);
            socket.on('mark_done_call_response', (data)=>{


                  console.log('inside mark_done_call_response =============',data);

                  if(data.data.status==true){
                    addToast({
                        title: 'Add my policy',
                        content: data.data["message"],
                        time: new Date(),
                        duration: 1000,
                    });
                      this.get_single_online_visitors(this.state.online_visitors_id)
                  }
                  else{
                    addToast({
                        title: 'Add my policy',
                        content: data.data["message"],
                        time: new Date(),
                        duration: 1000,
                    });
                  }

            })
      }


      get_all_leads(){
        const {addToast} = this.props;
        const usercookies = Cookies.get('usercookies');
        var conv_param = {
            user_id:usercookies,
            user_role:this.state.user_role,
            page_no:1
         }
         console.log("mark_done_call params",conv_param);

            socket.emit('get_all_leads', conv_param);
            socket.on('get_all_leads_response', (data)=>{
                  console.log('inside get_all_leads_response =============',data);
                  if(data.data.status==true){
                      this.setState({
                        isLoading_for_lead:"none"
                      })
                    // addToast({
                    //     title: 'Add my policy',
                    //     content: data.data["message"],
                    //     time: new Date(),
                    //     duration: 1000,
                    // });
                    //   this.get_single_online_visitors(this.state.online_visitors_id)
                  }
                  else{
                    this.setState({
                        isLoading_for_lead:"none"
                      })
                    // addToast({
                    //     title: 'Add my policy',
                    //     content: data.data["message"],
                    //     time: new Date(),
                    //     duration: 1000,
                    // });
                  }

            })
      }

      move_visitor_to_lead(online_visitors_id) {
        const {
            addToast,settings
        } = this.props;

        var params = {
          online_visitors_id:online_visitors_id,
        }
        console.log("Move To Lead Params", params);
            const res = fetch(settings.api_url + "move_visitor_to_lead", {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }).then((response) => response.json())
                .then(json => {
                    console.log("Move TO Lead Response **************************************", { params: params, response: json })
                    var data = json;
                    if (data.status == true) {
                        addToast({
                            title: 'Add my policy',
                            content: data["message"],
                            time: new Date(),
                            duration: 1000,
                        });
                        this.setState({
                            isLoading: 'block'
                           })
                             setTimeout(() => {
                              this.get_online_visitors()
                          }, 600)
                    }
                    else {
                        addToast({
                            title: 'Add my policy',
                            content: data["message"],
                            time: new Date(),
                            duration: 1000,
                        });
                        console.log("something wrong");
                    }
                })


    }


    visitors_button_functionality(online_visitors_id,button_type) {
        console.log("online_visitors_id",online_visitors_id);
        console.log("button_type",button_type);
        console.log("selected_type",this.state.selected_btn_data);
        const {
            addToast,settings
        } = this.props;

        var params = {
          online_visitors_id:online_visitors_id,
          button_type:button_type,
          selected_type:this.state.selected_btn_data
        }
        console.log("Visitor Button", params);
            const res = fetch(settings.api_url + "visitors_button_functionality", {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }).then((response) => response.json())
                .then(json => {
                    console.log("visitors_button_functionality Response **************************************", { params: params, response: json })
                    var data = json;
                    if (data.status == true) {
                        this.setState({
                            // selected_btn_data:false
                        })
                        addToast({
                            title: 'Add my policy',
                            content: "User Attended Sucessfully",
                            time: new Date(),
                            duration: 2000,
                        });
                        this.get_single_online_visitors(this.state.online_visitors_id)
                    }
                    else {
                        this.setState({
                            // selected_btn_data:false
                        })
                        addToast({
                            title: 'Add my policy',
                            content: data["message"],
                            time: new Date(),
                            duration: 1000,
                        });
                        console.log("something wrong");
                    }
                })


    }

    is_user_like_dislike(online_visitors_id,like_dislike) {
        console.log("online_visitors_id",online_visitors_id);
        console.log("like_dislike",like_dislike);
        const {
            addToast,settings
        } = this.props;

        var params = {
          online_visitors_id:online_visitors_id,
          like:like_dislike,
        }
        console.log("Is_like_OR_Dislike", params);
            const res = fetch(settings.api_url + "is_user_like_dislike", {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }).then((response) => response.json())
                .then(json => {
                    console.log("Is_like_OR_Dislike Response **************************************", { params: params, response: json })
                    var data = json;
                    if (data.status == true) {
                        addToast({
                            title: 'Add my policy',
                            content: "User Attended Sucessfully",
                            time: new Date(),
                            duration: 2000,
                        });
                        setTimeout(() => {
                            this.get_online_visitors()
                        }, 600)
                    }
                    else {
                        addToast({
                            title: 'Add my policy',
                            content: data["message"],
                            time: new Date(),
                            duration: 1000,
                        });
                        console.log("something wrong");
                    }
                })


    }
    add_comment_visitor() {
        const usercookies = Cookies.get('usercookies');
        var date_time = new Date(this.state.new_time_date).toISOString()
        console.log(date_time, "ooooooooooooooooooooooooooooooooooo");
        const {
            addToast,settings
        } = this.props;

        var params = {
            main_visitor_id:this.state.online_visitors_id,
            user_id:usercookies,
            time:date_time,
            message:this.state.new_message_visitor
        }
        if (params.message=="" || params.message==undefined) {
            console.log("wrong");
        }
        else{
            console.log("Add Cooment", params);
            const res = fetch(settings.api_url + "add_comment_visitor", {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }).then((response) => response.json())
                .then(json => {
                    console.log("ADD_comment_visitor Response **************************************", { params: params, response: json })
                    var data = json;
                    if (data.status == true) {
                        this.setState({
                            new_message_visitor:""
                        })
                        setTimeout(() => {
                            this.get_single_online_visitors(this.state.online_visitors_id)
                        }, 600)
                    }
                    else {
                        this.setState({
                            new_message_visitor:""
                        })
                        console.log("something wrong");
                    }
                })
        }



    }
    add_appointment_visitor=()=> {
        const usercookies = Cookies.get('usercookies');
        const {
            addToast,settings
        } = this.props;
        console.log("this.state.firstVal",this.state.firstVal);
        var assign_time = new Date(this.state.firstVal).toISOString()
        console.log(assign_time, "ooooooooooooooooooooooooooooooooooo");
        var params = {
            main_visitor_id:this.state.online_visitors_id,
            user_id:usercookies,
            date_time:assign_time,
            remark:this.state.remark_for_appoinment
        }
        console.log("Add Appointment", params);
        if (params.remark=="" || params.remark==undefined) {
            this.setState({
                message_erroe:"Please Fill All the Feilds"
            })
        }
        else{
            const res = fetch(settings.api_url + "add_appointment_visitor", {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }).then((response) => response.json())
                .then(json => {
                    console.log("add_appointment_visitor Response **************************************", { params: params, response: json })
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
                        setTimeout(() => {
                            this.get_single_online_visitors(this.state.online_visitors_id)
                        }, 600)
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
                        console.log("something wrong");
                    }
                })
        }



    }
    add_task_visitor=()=> {
        const usercookies = Cookies.get('usercookies');
        const {
            addToast,settings
        } = this.props;
        console.log("this.state.timeeeee",this.state.date_time_for_task);
        var assign_time = new Date(this.state.date_time_for_task).toISOString()
        console.log(assign_time, "ooooooooooooooooooooooooooooooooooo");
        var params = {
            main_visitor_id:this.state.online_visitors_id,
            user_id:usercookies,
            date_time:assign_time,
            remark:this.state.remark_for_task
        }
        console.log("Add Taskkkk", params);
        if (params.remark=="" || params.remark==undefined) {
            this.setState({
                message_erroe:"Please Fill All the Feilds"
            })
        }
        else{
            const res = fetch(settings.api_url + "add_task_visitor", {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }).then((response) => response.json())
                .then(json => {
                    console.log("add_task_visitor Response **************************************", { params: params, response: json })
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
                        setTimeout(() => {
                            this.get_single_online_visitors(this.state.online_visitors_id)
                        }, 600)
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
                        console.log("something wrong");
                    }
                })
        }



    }



    move_visitor_to_lead=()=> {
        const usercookies = Cookies.get('usercookies');
        const {
            addToast,settings
        } = this.props;
        var params = {
            main_visitor_id:this.state.online_visitors_id,
            full_name:this.state.full_name_visitor,
            mobile_no:this.state.mobile_no_visitor,
            current_location:this.state.location_visitor,
            gender:this.state.visitor_gender,
            email:this.state.email_visitor
        }
        console.log("Move To Lead", params);
        if (params.full_name=="" || params.full_name==undefined || params.email=="" || params.email==undefined || params.mobile_no=="" || params.mobile_no==undefined || params.current_location=="" || params.current_location==undefined || params.gender=="" || params.gender==undefined) {
            this.setState({
                message_erroe:"Please Fill All the Feilds"
            })
        }
        else{
            const res = fetch(settings.api_url + "move_visitor_to_lead", {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }).then((response) => response.json())
                .then(json => {
                    console.log("move_visitor_to_lead Response **************************************", { params: params, response: json })
                    var data = json;
                    if (data.status == true) {
                        this.setState({
                            modalOpen_for_lead:false,
                            message_erroe:"",
                            full_name_visitor:"",
                            mobile_no_visitor:"",
                            location_visitor:"",
                            visitor_gender:"",
                        })
                        addToast({
                            title: 'Add my policy',
                            content: data["message"],
                            time: new Date(),
                            duration: 2000,
                        });
                        setTimeout(() => {
                            this.get_online_visitors()
                        }, 600)
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
                        console.log("something wrong");
                    }
                })
        }



    }
    add_details_visitor=()=> {
        const usercookies = Cookies.get('usercookies');
        const {
            addToast,settings
        } = this.props;
        var params = {
            main_visitor_id:this.state.online_visitors_id,
            full_name:this.state.full_name_visitor,
            mobile_no:this.state.mobile_no_visitor,
            current_location:this.state.location_visitor,
            gender:this.state.visitor_gender,
            email:this.state.email_visitor
        }
        console.log("Add Deatilssss", params);
        if (params.full_name=="" || params.full_name==undefined || params.mobile_no=="" || params.mobile_no==undefined || params.current_location=="" || params.current_location==undefined || params.gender=="" || params.gender==undefined) {
            this.setState({
                message_erroe:"Please Fill All the Feilds"
            })
        }
        else{
            const res = fetch(settings.api_url + "add_details_visitor", {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }).then((response) => response.json())
                .then(json => {
                    console.log("add_details_visitor Response **************************************", { params: params, response: json })
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
                        addToast({
                            title: 'Add my policy',
                            content: data["message"],
                            time: new Date(),
                            duration: 2000,
                        });
                        this.get_single_online_visitors(this.state.online_visitors_id)
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
                        console.log("something wrong");
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
            main_visitor_id:this.state.online_visitors_id,
            user_id:usercookies,
            date_time:new Date(this.state.date_time_for_message).toISOString(),
            message:this.state.message_for_user
        }
        console.log("Add Deatilssss", params);
        if (params.message=="" || params.message==undefined) {
            this.setState({
                message_erroe:"Please Fill All the Feilds"
            })
        }
        else{
            const res = fetch(settings.api_url + "add_sms_visitor", {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }).then((response) => response.json())
                .then(json => {
                    console.log("add_sms_visitor Response **************************************", { params: params, response: json })
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
                        this.get_single_online_visitors(this.state.online_visitors_id)
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
                        console.log("something wrong");
                    }
                })
        }



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
            main_visitor_id:this.state.online_visitors_id,
            user_id:usercookies,
            start_time:new Date(this.state.date_time_for_call).toISOString(),
        }
        console.log("Start Calll", params);
            const res = fetch(settings.api_url + "start_call_records", {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }).then((response) => response.json())
                .then(json => {
                    console.log("start_call_records Response **************************************", { params: params, response: json })
                    this.get_single_online_visitors(this.state.online_visitors_id)
                })
    }


    end_call_records=()=> {
        const usercookies = Cookies.get('usercookies');

        const {
            addToast,settings
        } = this.props;
        var params = {
            main_visitor_id:this.state.online_visitors_id,
            user_id:usercookies,
            end_time:new Date(this.state.date_time_for_end_call).toISOString(),
        }
        console.log("End Calll", params);
            const res = fetch(settings.api_url + "end_call_records", {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }).then((response) => response.json())
                .then(json => {
                    console.log("end_call_records Response **************************************", { params: params, response: json })
                    this.get_single_online_visitors(this.state.online_visitors_id)
                })
    }


    message_count=(message)=>{
        this.setState({
            text_count:message.length
        })
    }

    collapse() {
        this.setState( {
            isCollapsed: ! this.state.isCollapsed,
        } );
    }
    toggleTab( num, name ) {
        this.setState( {
            [ `activeTab${ num }` ]: name,
        } );
        if (name=="profile") {

            this.setState({
                isLoading_for_lead:"block"
              })
                 setTimeout(() => {
                  this.get_all_leads()
              }, 600)
        }
        else{
            this.setState({
                isLoading: 'block'
               })
                 setTimeout(() => {
                  this.get_online_visitors()
              }, 600)
        }
    }

    render() {
        const {
            isCollapsed,
        } = this.state;
        const {
            activeAccordion,
        } = this.state;

        return (
            <Fragment>
                {/* <PageTitle className="Sales_title">
                    <h1 style={{marginBottom:"0px",marginTop:"-2px"}}>Sales</h1>
                </PageTitle> */}
                <div>
                {/* <Tabs pills className="slaes_pill">
                        <Tabs.NavItem
                            isActive={ this.state.activeTab2 === 'home' }
                            onClick={ () => this.toggleTab( 2, 'home' ) }
                        >
                            Online Visitor
                        </Tabs.NavItem>
                        <Tabs.NavItem
                            isActive={ this.state.activeTab2 === 'profile' }
                            onClick={ () => this.toggleTab( 2, 'profile' ) }
                        >
                            Lead
                        </Tabs.NavItem>
                    </Tabs> */}
                    <Tabs.Content activeTab={ this.state.activeTab2 }>
                        <Tabs.Pane tabId="home">
                         <Spinner color="warning" className="lead_spinner" style={{marginTop: gk, display: this.state.isLoading }} />

                            <div style={{display:this.state.isLoading=="none" ? "block":"none"}}>
                                {/* <div style={{display:this.state.no_data_message=="none" ? "block":"none"}}> */}
                                <div className="row test_collapse ipad_row">
                                <div className="col-lg-3 col-md-12 col-sm-12 " style={{paddingRight: "8px"}}>
                                <div className="my_color height_sales" style={{display: this.state.ipad_emp_list}}>
                                    {/* *************** Button Grup **************** */}
                                <div className="grup_btn">
                                <ButtonGroup>
                                    <Button
                                    style={{backgroundColor:this.state.visitor_type=="online" ? "#4B8178" : "", color:this.state.visitor_type=="online" ? "#fff" : "",borderColor:this.state.visitor_type=="online" ? "#4B8178" : ""}}
                                    onClick={() => {
                                                    this.setState({
                                                    visitor_type: 'online',
                                                    spinner_1: 'block'
                                                    })
                                                    setTimeout(() => {
                                                        this.get_online_visitors("online")
                                                        }, 600)
                                                }}>Online ({this.state.total_length_of_online_count})</Button>
                                    <Button
                                    style={{backgroundColor:this.state.visitor_type=="attended" ? "#4B8178" : "", color:this.state.visitor_type=="attended" ? "#fff" : "",borderColor:this.state.visitor_type=="attended" ? "#4B8178" : ""}}
                                    onClick={() => {
                                                    this.setState({
                                                    visitor_type: 'attended',
                                                    spinner_1: 'block'
                                                    })
                                                    setTimeout(() => {
                                                        this.get_online_visitors("attended")
                                                        }, 600)
                                                }}>Attended ({this.state.total_length_of_attended_count}) </Button>
                                    <Button
                                    style={{backgroundColor:this.state.visitor_type=="booked" ? "#4B8178" : "", color:this.state.visitor_type=="booked" ? "#fff" : "",borderColor:this.state.visitor_type=="booked" ? "#4B8178" : ""}}

                                    onClick={() => {
                                                    this.setState({
                                                    visitor_type: 'booked',
                                                    spinner_1: 'block'
                                                    })
                                                    setTimeout(() => {
                                                        this.get_online_visitors("booked")
                                                        }, 600)
                                                    console.log("visitor_type",this.state.visitor_type);
                                                }}>Booked ({this.state.total_length_of_booked_count}) </Button>
                                </ButtonGroup>
                                </div>
                                <div>
                                 <div className=" mycalendar" style={{height:my_height-52}}>
                                     {/* ***************** Border Box For Insurance *********************** */}

                                     <div className="new_border_box">
                                         {this.state.visitor_data_array.map((value,index)=>{
                                             return(
                                            <div aria-hidden="true" className="row test_collapse" key={index}
                                                 style={{border:value._id == this.state.online_visitors_id ? " 2px solid #8bc240" : "2px solid #e6ecf0",cursor:"pointer"}}
                                                 onClick={() => {
                                                    this.setState({
                                                    spinner_1: 'block'
                                                    })
                                                    setTimeout(() => {
                                                    this.get_single_online_visitors(value.main_visitor_id)
                                                    }, 600)
                                                    console.log("lllllllllllllll");
                                                }}
                                            >
                                             <div className="col-lg-6 col-md-6">
                                                 <div className="name_type" style={{height:value.insurance_details[0].full_name=="" || value.insurance_details[0].full_name==null? "18px":""}}>
                                                 <span>{value.insurance_details ? value.insurance_details[0].full_name :""} </span>
                                                 <span style={{display:value.insurance_details ? (value.insurance_details[0].full_name==null ? "block":"none"):""}}>{value.insurance_details ? value.insurance_details[0].mobile_no :""} </span>

                                                 </div>
                                                 <div className="time_new">{value.registration_date_new}</div>
                                                 <div className="address_data"><Icon name="map-pin" className="map_data"/><span>{value.current_location}</span></div>
                                                 {/* <div>{dateFormat(new Date(value.start_time.replace("Z", "")), "dd-mm-yyyy  hh:M TT")}</div> */}
                                                 <div></div>
                                            </div>
                                             <div className="col-lg-6 col-md-6 text_align">
                                                 <div className="phone_new"><Icon name="phone-call" className="phone_call"/>
                                                 <span className="mobile_no_type">{value.mobile_no}</span></div>
                                                 <div><img src={value.insurance_image} alt="insurance_img" className={value.insurance_type=="car_insurance" ? "insurance_img": "insurance_img_twoo"}/></div>
                                            </div>
                                         </div>
                                             )
                                         })}

                                    </div>
                                    </div>
                            </div>
                            </div>
                     </div>
                         {/* <h3 style={{ display: this.state.no_data_message, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%"}}>No Data Found</h3> */}

                                <div className="col-lg-9 col-md-12 col-sm-12 test_collapse my_color left_height padd_left" style={{paddingLeft:"0px",display: device_width < 769 ? this.state.ipad_width : "block"}}>
                                <Spinner color="warning" className="employee_spinner_1" style={{ marginTop: gk, display: this.state.spinner_1 }} />
                                 {/* <h3 style={{ display: this.state.no_data_message, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:gk}}>No Data Found</h3> */}
                                <div style={{display: this.state.spinner_1=="none" ? "block":"none"}}>
                                <h3 style={{ display: this.state.no_data_message, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:gk}}>No Data Found</h3>
                                <div className=" test_collapse" style={{height:height-70,display: this.state.no_data_message=="none" ? "block" :"none"}}>

                                  <div className="back_btn">
                                  <Button className="backk_2" style={{ marginLeft: "5px", height: 'min-content', backgroundColor: '#007bff', borderColor: '#007bff',textTransform:"capitalize", display: device_width < 769 ? "inline-flex" : "none"}}
                                    onClick={() => {
                                    this.setState({
                                        ipad_emp_list:"block",
                                        ipad_width:"none"
                                    })
                                    }}>Back <Icon name="arrow-left" className="back_icon"/></Button>
                                    {/* <Icon name="arrow-left" className=""/> */}
                                    </div>



                                    <div className="row my_top_back">
                                        <div className="col-lg-4 col-md-4 my_pad_bbb mycalendar padd_right_1" style={{paddingRight: "0px",height:height-70}}>
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
                                                                        this.is_user_like_dislike(value._id,false)
                                                                        }, 100)

                                                                      }}/>
                                                                  <img src={UP_IMG} alt="kk" aria-hidden="true"   onClick={() => {
                                                                    this.setState({
                                                                    like_dislike: true,
                                                                    })
                                                                    setTimeout(() => {
                                                                        this.is_user_like_dislike(value._id,true)
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
                                                                        this.is_user_like_dislike(value._id,true)
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
                                                                            this.is_user_like_dislike(value._id,true)
                                                                            }, 100)
                                                                    }}/></p>
                                                                : <p></p>
                                                            }
                                                        {/* <img src={down_img} alt="thum down" style={{display:value.like == "" || value.like == true ? "block" :"none"}}/>
                                                        <img src={thums_down_red} alt="kk" style={{display:value.like == false ?  "block" :"none"}}/> */}
                                                        </div>
                                                        <div className="thums_up_new" aria-hidden="true" style={{pointerEvents:this.state.sales_management_control =="false" ? "none" : ""}}
                                                        onClick={() => {
                                                            this.setState({
                                                            like_dislike: true,
                                                            isLoading:"block"
                                                            })
                                                            setTimeout(() => {
                                                                this.is_user_like_dislike(value._id,true)
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




 {/*}///////////////////////////////////////////////////////////////////Sneha  UI////////////////////////////////////////////////////////////////////////////////////////  */}



                                        <div className="col-lg-8 col-md-8 my_style_pad" style={{paddingLeft: "10px",paddingRight: "25px"}}>

                                         <div className="row row_flex my_class_1" style={{marginTop:"10px"}}>

                                        <div className="column_a" style={{background:this.state.start_call=="Start Call" ? "#4B8178":"#b00217"}}>
                                        <div className="row row_flex">
                                        <div className="my_class_2_phone" style={{textAlign:"center", display:"grid", width:"130px"}}>
                                        <span className="time_start">{this.state.minute < 10 ? "0"+this.state.minute : this.state.minute} : {this.state.second < 10 ? "0"+this.state.second : this.state.second}</span>
                                        <span className="minutss displayyy">Minutes</span>
                                        </div>

                                         <div className="my_phone_cl" aria-hidden="true"  style={{textAlign:"inherit", display:"grid", width:"75px",cursor:"pointer",pointerEvents:this.state.sales_management_control =="false" ? "none" : ""}} onClick={this.swtich_time_function}>
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

                                       <div className="column_d" aria-hidden="true" style={{textAlign:"center",cursor:"pointer",pointerEvents:this.state.sales_management_control =="false" ? "none" : ""}} onClick={ this.toggle_for_lead }>
                                        <Icon className="filterrr" name="filter" />
                                        <div className="add_lead displayyy">Add to Lead</div>
                                        {/* <span className="add_lead">Add to Lead</span> */}
                                       </div>

                                       <div className="column_e" aria-hidden="true" style={{textAlign:"center",cursor:"pointer",pointerEvents:this.state.sales_management_control =="false" ? "none" : ""}}  onClick={() => {
                                                    this.mirror_screen(this.state.mirror_screen_url)
                                                }}>
                                        <Icon className="monitorr" name="monitor" />
                                        <div className="mirrorr displayyy">Mirror Screen</div>
                                        {/* <span className="mirrorr">Mirror Screen</span> */}
                                       </div>

                                      <div className="column_f" aria-hidden="true" style={{textAlign:"center",cursor:"pointer",pointerEvents:this.state.sales_management_control =="false" ? "none" : ""}} onClick={ this.toggle_for_details }>
                                        <Icon className="alerttt" name="alert-circle" />
                                        <div className="detailsss displayyy">Add Details</div>
                                        {/* <span className="detailsss">Add Details</span> */}
                                      </div>

                                      </div>


 {/*}///////////////////////////////////////////////////////////////////Sneha  UI////////////////////////////////////////////////////////////////////////////////////////  */}
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

                                            <div className="meesage_div mycalendar_message" style={{height:this.state.visitor_task_data == "" && this.state.visitor_appointment_data == ""  ? (my_height-187) : (my_height-278)}}>
                                                {this.state.message_array.map((value,index)=>{
                                                    // console.log("index",this.state.message_array.length-1==index);
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
                                            {/* <div className="custom-search">
                                            <input type="text" className="custom-search-input" placeholder="Enter your email"/>
                                            <button className="custom-search-botton" type="submit">Subscribe</button>
                                            </div> */}
                                        </div>
                                    </div>

                                </div>
                                </div>
                                 </div>
                                </div>
                                {/* </div> */}
                            </div>
                        </Tabs.Pane>
                        <Tabs.Pane tabId="profile">
                        <Spinner color="warning" className="lead_spinner" style={{marginTop: gk, display: this.state.isLoading_for_lead }} />
                        </Tabs.Pane>
                    </Tabs.Content>
                </div>

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

                    {/* ********************************** END ******************************************* */}

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
{/* ********************************** END ******************************************* */}



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

                    {/* ********************************** END ******************************************* */}




{/* *****************************  Add LEAD MODEL ********************************************************************************* */}
                <Modal
                        isOpen={ this.state.modalOpen_for_lead }
                        toggle={ this.toggle_for_lead }
                        className={ this.props.className,"modal-dialog-centered" }
                        fade
                        style={{maxWidth:"600px"}}
                    >
                        <div className="modal-header">
                            <h5 className="modal-title h2">Add To Lead</h5>
                            <Button className="close" color="" onClick={ this.toggle_for_lead }>
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
                            <CustomInput type="radio" id="formRadio1" name="formRadio" label="Male" checked={this.state.visitor_gender == "male" ? true : false} onClick={() => { this.setState({ visitor_gender: "male" }) }} />
                            <CustomInput type="radio" id="formRadio2" name="formRadio" label="Female" checked={this.state.visitor_gender == "female" ? true : false} onClick={() => { this.setState({ visitor_gender: "female" }) }} />
                            </div>
                            </div>
                            <div className="col-lg-12 col-md-12" style={{marginTop:"20px",textAlign:"center"}} >
                            <span style={{color:"red"}}>{this.state. message_erroe}</span>
                             </div>

                        </div>
                         </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={ this.toggle_for_lead }>Close</Button>
                            { ' ' }
                            <Button color="warning" style={{color:"#fff"}} onClick={ this.move_visitor_to_lead }>Save</Button>
                        </ModalFooter>
                    </Modal>

                    {/* ********************************** END ******************************************* */}
{/* *****************************  SEND SMS MODEL ********************************************************************************* */}
                <Modal
                        isOpen={ this.state.modalOpen_for_details }
                        toggle={ this.toggle_for_details }
                        className={ this.props.className,"modal-dialog-centered" }
                        fade
                        style={{maxWidth:"600px"}}
                    >
                        <div className="modal-header">
                            <h5 className="modal-title h2">Add Details</h5>
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
                            <Button color="warning" style={{color:"#fff"}} onClick={ this.add_details_visitor }>Save</Button>
                        </ModalFooter>
                    </Modal>
 {/* ********************************** END ******************************************* */}







            </Fragment>
        );
    }
}

export default connect( ( { settings } ) => (
    {
        settings,
    }
) , { addToast: actionAddToast })( Content );
