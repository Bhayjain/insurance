
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Badge, Button } from 'reactstrap';
import PageTitle from '../../components/page-title';
import './style.scss';
import Select from 'react-select';
import { Modal, ModalFooter, ModalHeader, ModalBody,Label, Spinner,Table,Progress} from "reactstrap";
import Snippet from '../../components/snippet';
import {  CustomInput, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input ,ButtonGroup ,Collapse} from 'reactstrap';
import {
    addToast as actionAddToast,
} from '../../actions';
import Cookies from 'js-cookie';
import Icon from '../../components/icon';

import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Tabs from '../../components/tabs';


import { RangeDatePicker } from 'react-google-flight-datepicker';
 import 'react-google-flight-datepicker/dist/main.css';
 import DatePicker from '../../components/date-time-picker';
 import dateFormat from 'dateformat';



import { Line, Bar, Pie,Doughnut} from 'react-chartjs-2';
import { val, value } from 'dom7';

// var Typeahead = require('react-bootstrap-typeahead'); // CommonJS

const device_width =   window.innerWidth;
var height =   window.innerHeight;
////console.log("agent_screen.height", height);
const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
////console.log("admin_nav_height",nav_height);
var my_height = height - nav_height;
var gk = (my_height/2)-100;
////console.log("admin_gk",gk);
if(device_width < 600){
  var gk = (my_height/2) - 50;
}
class CustomTooltip extends React.Component {
    render() {
      const { active, payload } = this.props;

      if (active && payload && payload.length) {
        const { name, value } = payload[0];

        return (
          <div className="custom-tooltip">
            <p>{`${name}: ${value}`}</p>
          </div>
        );
      }

      return null;
    }
  }
class Content extends Component {
  constructor(props) {
       super(props);
       this.state = {
        modalOpen: false,
        modalOpenTelecaller: false,
        model_for_graph: false,
        campaigne_array:[],
        options: [],             // Array to store available options
        selectedOptions: [],     // Array to store selected options
        inputValue: '',          // Input field value
        showOptions: false,
        priority_array:[],
        manager_typeahead:[],
        telecaller_typeahead:[],
        selectedOptionsType:[],
        array_of_excel:[],
        contact_distribution:"",
        set_priorities:"",
        cam_type:"",
        name:"",
        add_contacts:[],
        borderNew:false,
        camaign_error:"",
        compaign_details_array:new Array(10).fill({}),
        isLoading:true,
        no_data:"none",
        search_by_name:"",
        search_by_type:"",
        activeTab4: 'show_status_contacts',
        tag_array:[],
        startDate:"",
        endDate:"",

        compaign_task_array:[],
        isLoadingForTask:true,
        spinner_1:"none",
        no_data_for_task:"none",


        compaign_Call_array:[],
        isLoadingForCall:true,
        no_data_for_Call:"none",

        compaign_lead_array: [],
        isLoadingForlead:true,
        no_data_for_lead:"none",
        AlertDelete2: false,

        array_of_single_campaign:"",
        isLoadingForSingle:true,



        // total_contact:0,
        // open_contact:0,
        // inprocess_contact:0,
        // closed_contact:0,

        // total_ongoing:0,
        // called_ongoing:0,
        // follow_up_ongoing:0,
        // others_ongoing:0,


        // total_closed:0,
        // converted_closed:0,
        // lost_closed:0,

        hoveredLegendItem: null,
        showTooltip:false,
        telecaller_stats_array:[],


        compaign_data_logs_array: [],
        isLoadingFordata_logs:true,
        no_data_for_data_logs:"none",


        ipad_width:"none",
        ipad_emp_list:"block",
        show_nav_titile:false,
        campaign_name:"",


        show_inside_back:false,
        active_tab_new:"",
        status_array:[],
        no_status_for_cam:"none",
        all_conacts_array:[],
        ongoing_new:"",
        in_process_new:"",
        closed_new:"",

        campaign_control:Cookies.get('campaign_control'),

        isLoadingStatus:true,
        isLoadingcontcts:true,

        compaign_task_today_array:[],
        compaign_task_overdue_array:[],
        compaign_task_upcoming_array:[],

        telecallerDetails:[],
        telecaller_array_new:[],
        telecaller_start_date:[],
        telecaller_lead:[],
        telecaller_lost:[],
        telecaller_connected:[],
        telecaller_not_connected:[],
        telecallerDateDay:undefined,
        telecallerDateYear:undefined,


        lead_data:[],
        lost_data:[],
        connected_data:[],
        not_connected_data:[],
        activeAccordion:0,
        current_page:1,
        is_last:false,
        data_spinner: 'none',
        call_type: [{
          value:"connected",
          label:"Connected",
        },
        {
          value:"not_connected",
          label:"Not Connected",
        },{
          value:"all",
          label:"All",
        }],
        call_type_selected:"",
        loading:false,

       }

    //    setTimeout(() => {



    //     }, 0)

        this.fetch_compaign_details();
        this.fetch_campaigne_type();
        this.fetch_campaign_status()
        this.fetch_contacts_for_all()
    //    this.fetch_manager_typeahead()
       this.toggle = this.toggle.bind( this );
       this.model_for_graph = this.model_for_graph.bind( this );
       this.AlertDelete2 = this.AlertDelete2.bind( this );
       this.toggleTab = this.toggleTab.bind( this );
       this.toggleTelecaller = this.toggleTelecaller.bind( this );
    }

    // componentWillUnmount(){
    //     this.fetch_compaign_details();
    //   }
     toggleTab( num, name ) {
        this.setState( {
            [ `activeTab${ num }` ]: name,
            // spinner_1:"block",
            search_by_telicller:"",
            startDate:"",
            endDate:"",
            tag_task:"",
            campaigne_type:"",
            lead_name:"",
            show_inside_back:true,
            active_tab_new:name,
        } );

        if (name == "profile") {
            this.fetch_campaign_tasks(this.state.campaign_id)
        }else if (name == "contact") {
            this.fetch_campaign_call_logs(this.state.campaign_id)
        }else  if (name == "home"){
            this.fetch_campaign_leads(this.state.campaign_id)
        } else  if (name == "insights"){
            console.log("insights");
            this.setState({
                show_inside_back:false,
            })
            this.fetch_contacts_stats(this.state.campaign_id)
            this.fetch_ongoing_stats(this.state.campaign_id)
            this.fetch_closed_stats(this.state.campaign_id)
            this.fetch_telecaller_stats(this.state.campaign_id)
            // this.fetch_data_logs(this.state.campaign_id)
        }else  if (name == "show_status_contacts"){
            console.log("show_status_contacts");
            this.fetch_compaign_details()

        }
        else{
            this.fetch_single_campaign_detail(this.state.campaign_id)
        }


    }
    model_for_graph() {
        this.setState( ( prevState ) => ( {
            model_for_graph: ! prevState.model_for_graph,
        } ) );
    }
    toggleTelecaller() {
        this.setState( ( prevState ) => ( {
            modalOpenTelecaller: ! prevState.modalOpenTelecaller,
        } ) );
    }
    toggle() {
        this.setState( ( prevState ) => ( {
            modalOpen: ! prevState.modalOpen,
            camaign_error:"",
            name:"",
            cam_type:"",
            selectedOptions:"",
            selectedOptionsType:"",
            add_contacts:"",
            set_priorities:"",
            contact_distribution:"",
            borderNew:false
        } ) );


        this.fetch_priority()

       this.fetch_excel_data()
       this.fetch_tag()
    }

    AlertDelete2() {
        this.setState( ( prevState ) => ( {
            AlertDelete2: ! prevState.AlertDelete2,
        } ) );
    }

    fetch_tag = ()=>  {
        const { settings } = this.props;
         const res = fetch(settings.api_url + "api/telecaller_app/fetch_tag", {
             method: 'POST',
             headers: {
                 "Content-type": "application/json; charset=UTF-8",
             }
         }).then((response) => response.json())
             .then(json => {
                 //console.log("Fetch_TaGs ***************", json)
                 var data = json;
                 if (data.status == true) {
                     this.setState({
                      tag_array: data.data,
                     });
                 }
                 else {
                     this.setState({
                      tag_array: [],
                     });
                 }
             })
          }

    fetch_campaigne_type = ()=>  {
        const { settings } = this.props;
         const res = fetch(settings.api_url + "api/telecaller_app/fetch_campaigne_type", {
             method: 'POST',
             headers: {
                 "Content-type": "application/json; charset=UTF-8",
             }
         }).then((response) => response.json())
             .then(json => {
                //  //console.log("Fetch_Campaign ***************", json)
                 var data = json;
                 if (data.status == true) {
                     this.setState({
                      campaigne_array: data.data,
                     });
                 }
                 else {
                     this.setState({
                      campaigne_array: [],
                     });
                 }
             })
          }

          fetch_excel_data () {
            const { settings, addToast, } = this.props;
            const res = fetch(settings.api_url + "fetch_excel_data", {
              method: 'POST',
             //  body: JSON.stringify(params),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              }
            }).then((response) => response.json())
              .then(json => {
                // //console.log("Fetch Excel Response**************************************", { json })
                var data = json;
                if (data.status == true) {
                 this.setState({
                   array_of_excel:data.data,
                 })
                }
                else {
                 this.setState({
                   array_of_excel:[],
                 })
                }
              })
          }

          fetch_manager_typeahead= (value) =>{
            //console.log("All Addd");
            const {
                addToast,settings
            } = this.props;
            var params={
                manager_name:value
            }
            //console.log("kkkkkk",params);
              const res = fetch(settings.api_url + "fetch_manager_typeahead", {
                  method: 'POST',
                  body: JSON.stringify(params),
                  headers: {
                      "Content-type": "application/json; charset=UTF-8",
                  }
              }).then((response) => response.json())
                  .then(json => {
                      //console.log("Manager Response **************************************", { response: json })
                      var data = json;
                      if (data.status == true) {
                        var lenth_of_type = data.data
                        // for (let i = 0; i < lenth_of_type.length; i++) {
                        //     var new_12={
                        //         value:lenth_of_type[i]._id,
                        //         label:lenth_of_type[i].name,
                        //     }

                        //     manager_typeahead.push(new_12)
                        // }

                        var lenth_of_type = data.data;
                        var employee_Object = lenth_of_type.map(item => {
                            var kkk ={
                                value:item._id,
                                label:item.name
                            }
                            return (kkk)
                        });
                        //console.log("employee_Object", employee_Object);
                        this.setState({
                            manager_typeahead: employee_Object,
                            employee_array_fro_id: data.data,
                        })

                        // this.setState({
                        //     manager_typeahead:manager_typeahead
                        // })



                      }
                      else {
                      }
                  })
          }


          fetch_telecaller_typeahead= (value) =>{
            //console.log("All Addd");
            const {
                addToast,settings
            } = this.props;
            var params={
                telecaller_name:value
            }
            //console.log("kkkkkk",params);
              const res = fetch(settings.api_url + "fetch_telecaller_typeahead", {
                  method: 'POST',
                  body: JSON.stringify(params),
                  headers: {
                      "Content-type": "application/json; charset=UTF-8",
                  }
              }).then((response) => response.json())
                  .then(json => {
                      //console.log("User data Response **************************************", { response: json })
                      var data = json;
                      if (data.status == true) {
                        var lenth_of_type = data.data;
                        var employee_Object = lenth_of_type.map(item => {
                            var kkk ={
                                value:item._id,
                                label:item.agent_name
                            }
                            return (kkk)
                        });
                        //console.log("employee_Object", employee_Object);
                        this.setState({
                            telecaller_typeahead: employee_Object,
                            // employee_array_fro_id: data.data,
                        })

                      }
                      else {
                      }
                  })
          }


          fetch_priority = ()=>  {
            const { settings } = this.props;
             const res = fetch(settings.api_url + "api/telecaller_app/fetch_priority", {
                 method: 'POST',
                 headers: {
                     "Content-type": "application/json; charset=UTF-8",
                 }
             }).then((response) => response.json())
                 .then(json => {
                    //  //console.log("Fetch Priority ***************", json)
                     var data = json;
                     if (data.status == true) {
                         this.setState({
                          priority_array: data.data,
                         });
                     }
                     else {
                         this.setState({
                          priority_array: [],
                         });
                     }
                 })
              }

          fetch_compaign_details = (search_by_name,search_by_type)=>  {
              console.log("FatchCam");

            if (search_by_name == "" || search_by_name == undefined) {
                var search_by_name = undefined
            }else{
                var search_by_name = search_by_name
            }

            if (search_by_type == "" || search_by_type == undefined) {
                var search_by_type = undefined
            }else{
                var search_by_type = search_by_type.value
            }

            var params ={
                search_by_name:search_by_name,
                search_by_type:search_by_type
            }
            console.log("Search Cam by Name and User",params);
            const { settings } = this.props;
             const res = fetch(settings.api_url + "api/telecaller_app/fetch_compaign_details", {
                 method: 'POST',
                 body: JSON.stringify(params),
                 headers: {
                     "Content-type": "application/json; charset=UTF-8",
                 }
             }).then((response) => response.json())
                 .then(json => {
                     console.log("Fetch Camaign Deatils ***************", json)
                     var data = json;
                     if (data.status == true) {
                         this.setState({
                          compaign_details_array: data.data,
                          campaign_id: "",
                          campaign_name: "Campaigns",
                          isLoading:false,
                          no_data:"none",
                          spinner_1:"none",
                          show_nav_titile:false,
                          activeTab4:"show_status_contacts",
                          active_tab_new:"",
                          show_inside_back:false,
                         });
                         if (device_width < 820) {
                           }
                           else{
                            // this.fetch_single_campaign_detail(data.data[0].campaign_id)
                           }



                     }
                     else {
                         this.setState({
                          compaign_details_array: [],
                          isLoading:false,
                          no_data:"block",
                          spinner_1:"none",
                          show_nav_titile:false,
                          activeTab4:"show_status_contacts",
                          active_tab_new:"",
                          show_inside_back:false,
                         });
                     }

                 })
              }



        fetch_single_campaign_detail = (campaign_id)=>  {

            var params ={
                campaign_id:campaign_id,
            }
            console.log("Search Cam Deatilsssss",params);
            const { settings } = this.props;
             const res = fetch(settings.api_url + "api/telecaller_app/fetch_single_campaign_detail", {
                 method: 'POST',
                 body: JSON.stringify(params),
                 headers: {
                     "Content-type": "application/json; charset=UTF-8",
                 }
             }).then((response) => response.json())
                 .then(json => {
                     console.log("Fetch Singhle @@@@@@@@@@@@@@@@@@@@@@@@***************", json)
                     var data = json;
                     if (data.status == true) {

                        if (device_width < 820) {
                            var ipad_emp_list = "none";
                           }
                           else{
                           var ipad_emp_list = "block"
                           }

                         this.setState({
                          array_of_single_campaign: data.data[0],
                          telecaller_array_new: data.data[0].users,
                          telecaller_id: data.data[0].users[0].value,
                          telecallerName: data.data[0].users[0].label,
                          campaign_id: data.data[0]._id,
                          isLoadingForSingle:false,
                          spinner_1:"none",
                          ipad_width:"block",
                          ipad_emp_list:ipad_emp_list,
                         });

                         //console.log(" data.data[0]", data.data[0]);

                           if (this.state.activeTab4 == "profile") {
                            this.fetch_campaign_tasks(data.data[0]._id)
                           }else if (this.state.activeTab4 == "contact") {
                            this.fetch_campaign_call_logs(data.data[0]._id)
                           }else if (this.state.activeTab4 == "home"){
                            this.fetch_campaign_leads(data.data[0]._id)
                           }
                           else if (this.state.activeTab4 == "insights"){
                               console.log("insights**************");
                            this.fetch_contacts_stats(data.data[0]._id)
                            this.fetch_ongoing_stats(data.data[0]._id)
                            this.fetch_closed_stats(data.data[0]._id)
                            this.fetch_telecaller_stats(data.data[0]._id)
                            // this.fetch_data_logs(data.data[0]._id)
                           }
                           this.telecaller_daily_stats_report(undefined,undefined,data.data[0].users[0].value)
                     }
                     else {
                         this.setState({
                          compaign_task_array: [],
                          isLoadingForSingle:false,
                          spinner_1:"none",
                         });
                     }
                 })
              }



        telecaller_daily_stats_report = (yearPicker,DatePicker,telecaller_id)=>  {
            console.log("yearPicker",yearPicker);
            console.log("DatePicker",DatePicker);

            if (yearPicker == "" || yearPicker == undefined) {
                var sorting_date  =undefined
            }else{
                const today = new Date(yearPicker);
                const yyyy = today.getFullYear();
                let mm = today.getMonth() + 1; // Months start at 0!
                let dd = today.getDate();
                if (dd < 10) dd = '0' + dd;
                if (mm < 10) mm = '0' + mm;
                var formattedToday_start = yyyy + '-' + mm ;
                var sorting_date  = formattedToday_start

            }
            if (DatePicker == "" || DatePicker == undefined) {
                var date  =undefined
            }else{
                const today = new Date(DatePicker);
                const yyyy = today.getFullYear();
                let mm = today.getMonth() + 1; // Months start at 0!
                let dd = today.getDate();
                if (dd < 10) dd = '0' + dd;
                if (mm < 10) mm = '0' + mm;
                var date = yyyy + '-' + mm + '-' + dd;

            }


            var params ={
                campaign_id:this.state.campaign_id,
                telecaller_id:telecaller_id,
                sorting_date:sorting_date,
                date:date,
            }
            console.log("Telecaller Stats",params);
            const { settings } = this.props;
             const res = fetch(settings.api_url + "api/telecaller_app/telecaller_daily_stats_report", {
                 method: 'POST',
                 body: JSON.stringify(params),
                 headers: {
                     "Content-type": "application/json; charset=UTF-8",
                 }
             }).then((response) => response.json())
                 .then(json => {
                     console.log("Telecaller Sates @@@@@@@@@@@@@@@@@@@@@@@@***************", json)
                     var data = json;
                     if (data.status == true) {
                        var startDate =[]
                        var telecaller_lead =[]
                        var telecaller_lost =[]
                        var telecaller_connected =[]
                        var telecaller_not_connected =[]
                        var telecallerDetails = data.data
                            for (let i = 0; i < telecallerDetails.length; i++) {

                                if (yearPicker == undefined) {

                                    var statDateNew = telecallerDetails[i].new_start_date + " "+"-" + " "+ telecallerDetails[i].new_end_date  ;
                                }else{
                                    var statDateNew = telecallerDetails[i].new_start_date  ;

                                }
                                var leadDateNew = telecallerDetails[i].lead;
                                var lostDateNew = telecallerDetails[i].lost;
                                var connectedDateNew = telecallerDetails[i].connected;
                                var notConnectedDateNew = telecallerDetails[i].not_connected;
                                // console.log("statDateNew",statDateNew);
                                startDate.push(statDateNew)
                                telecaller_lead.push(leadDateNew)
                                telecaller_lost.push(lostDateNew)
                                telecaller_connected.push(connectedDateNew)
                                telecaller_not_connected.push(notConnectedDateNew)
                            }
                            // console.log("startDate",startDate);
                        this.setState({
                            telecallerDetails :telecallerDetails,
                            telecaller_start_date :startDate,
                            telecaller_lead : telecaller_lead,
                            telecaller_lost : telecaller_lost,
                            telecaller_connected : telecaller_connected,
                            telecaller_not_connected : telecaller_not_connected,
                        })
                     }
                     else {

                     }
                 })
              }





              fetch_contacts_stats = (campaign_id)=>  {

                var params ={
                    campaign_id:campaign_id,
                }
                console.log("contacts_stat params",params);
                const { settings } = this.props;
                 const res = fetch(settings.api_url + "api/telecaller_app/fetch_contacts_stats", {
                     method: 'POST',
                     body: JSON.stringify(params),
                     headers: {
                         "Content-type": "application/json; charset=UTF-8",
                     }
                 }).then((response) => response.json())
                     .then(json => {
                         console.log("Fetch Contact Stats %%%%%%%%%%%%%%***************", json)
                         var data = json;
                         if (data.status == true) {
                             this.setState({
                                total_contact:data.data.total,
                                open_contact:data.data.open,
                                inprocess_contact:data.data.in_process,
                                closed_contact:data.data.closed,
                                spinner_1:"none",
                                no_data_for_conatct_stats:"none"
                             });
                         }
                         else {
                             this.setState({
                                total_contact:0,
                                open_contact:0,
                                inprocess_contact:0,
                                closed_contact:0,
                                no_data_for_conatct_stats:"block",
                                spinner_1:"none",
                             });
                         }
                     })
                  }



              fetch_ongoing_stats = (campaign_id)=>  {
                var params ={
                    campaign_id:campaign_id,
                }
                //console.log("onging_stat $$ params",params);
                const { settings } = this.props;
                 const res = fetch(settings.api_url + "api/telecaller_app/fetch_ongoing_stats", {
                     method: 'POST',
                     body: JSON.stringify(params),
                     headers: {
                         "Content-type": "application/json; charset=UTF-8",
                     }
                 }).then((response) => response.json())
                     .then(json => {
                         //console.log("Fetch Ongoing Stats %%%%%%%%%%%%%%***************", json)
                         var data = json;
                         if (data.status == true) {
                             this.setState({
                                total_ongoing:data.data.total,
                                called_ongoing:data.data.called,
                                follow_up_ongoing:data.data.follow_up,
                                others_ongoing:data.data.others,
                                spinner_1:"none",
                                no_data_for_conatct_stats:"none"
                             });
                         }
                         else {
                             this.setState({
                                total_ongoing:0,
                                called_ongoing:0,
                                follow_up_ongoing:0,
                                others_ongoing:0,
                                no_data_for_conatct_stats:"block",
                                spinner_1:"none",
                             });
                         }
                     })
                  }



              fetch_closed_stats = (campaign_id)=>  {
                var params ={
                    campaign_id:campaign_id,
                }
                //console.log("Clase $$ params",params);
                const { settings } = this.props;
                 const res = fetch(settings.api_url + "api/telecaller_app/fetch_closed_stats", {
                     method: 'POST',
                     body: JSON.stringify(params),
                     headers: {
                         "Content-type": "application/json; charset=UTF-8",
                     }
                 }).then((response) => response.json())
                     .then(json => {
                         //console.log("Fetch Close Stats %%%%%%%%%%%%%%***************", json)
                         var data = json;
                         if (data.status == true) {
                             this.setState({
                                total_closed:data.data.total,
                                converted_closed:data.data.converted,
                                lost_closed:data.data.lost,
                                spinner_1:"none",
                                no_data_for_conatct_stats:"none"
                             });
                         }
                         else {
                             this.setState({
                                total_closed:0,
                                converted_closed:0,
                                lost_closed:0,
                                no_data_for_conatct_stats:"block",
                                spinner_1:"none",
                             });
                         }
                     })
                  }



              fetch_telecaller_stats = (campaign_id)=>  {
                var params ={
                    campaign_id:campaign_id,
                }
                //console.log("Telecaller Stat $$ params",params);
                const { settings } = this.props;
                 const res = fetch(settings.api_url + "api/telecaller_app/fetch_telecaller_stats", {
                     method: 'POST',
                     body: JSON.stringify(params),
                     headers: {
                         "Content-type": "application/json; charset=UTF-8",
                     }
                 }).then((response) => response.json())
                     .then(json => {
                         //console.log("Fetch Telecaller Stats %%%%%%%%%%%%%%***************", json)
                         var data = json;
                         if (data.status == true) {
                             this.setState({
                                telecaller_stats_array:data.data,
                                spinner_1:"none",
                                no_data_for_conatct_stats:"none"
                             });
                         }
                         else {
                             this.setState({
                                telecaller_stats_array:[],
                                no_data_for_conatct_stats:"block",
                                spinner_1:"none",
                             });
                         }
                     })
                  }





          fetch_campaign_tasks = (campaign_id,search_by_telicller,startDate,endDate,tag)=>  {

            if (search_by_telicller == "" || search_by_telicller == undefined) {
                var search_by_telicller = undefined
            }else{
                var search_by_telicller = search_by_telicller[0].value
            }
            if (tag == "" || tag == undefined) {
                var tag = undefined
            }else{
                var tag = tag.value
            }
            if (startDate == "" || startDate == undefined || endDate == "" || endDate == undefined) {

            }
            else{

                const today = new Date(startDate);
                const yyyy = today.getFullYear();
                let mm = today.getMonth() + 1; // Months start at 0!
                let dd = today.getDate();
                if (dd < 10) dd = '0' + dd;
                if (mm < 10) mm = '0' + mm;
                const formattedToday_start = yyyy + '-' + mm + '-' + dd;
                ////console.log("formattedToday",formattedToday_start);


                const today_end = new Date(endDate);
                const yyyy_end = today_end.getFullYear();
                let mm_end = today_end.getMonth() + 1; // Months start at 0!
                let dd_end = today_end.getDate();
                    ////console.log("datttttttttttttttt",dd_end);
                    ////console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",new Date(endDate).getDate());
                    if (dd_end < 10) {
                      var my_date ='0' + dd_end
                    }
                    else{
                      var my_date = dd_end
                    }
                    ////console.log("my_date",my_date);
                if (dd_end < 10) dd_end = '0' + dd_end;
                if (mm_end < 10) mm_end = '0' + mm_end;

                const formattedToday_end = yyyy_end + '-' + mm_end + '-' + my_date;
                ////console.log("formattedToday**************",formattedToday_end);
                var my_date = [formattedToday_start,formattedToday_end]
            }

            var params ={
                campaign_id:campaign_id,
                telecaller_id:search_by_telicller,
                date_range:my_date,
                tags:tag
            }
            //console.log("Search Cam Task",params);
            const { settings } = this.props;
             const res = fetch(settings.api_url + "api/telecaller_app/fetch_campaign_tasks", {
                 method: 'POST',
                 body: JSON.stringify(params),
                 headers: {
                     "Content-type": "application/json; charset=UTF-8",
                 }
             }).then((response) => response.json())
                 .then(json => {
                     console.log("Fetch Camaign Task ***************", json)
                     var data = json;
                     if (data.status == true) {
                         this.setState({
                          compaign_task_array: data.data,
                          compaign_task_today_array: data.data[0].today,
                          compaign_task_overdue_array: data.data[1].overdue,
                          compaign_task_upcoming_array: data.data[2].upcoming,
                          isLoadingForTask:false,
                          spinner_1:"none",
                          no_data_for_task:"none"
                         });
                     }
                     else {
                         this.setState({
                          compaign_task_array: [],
                          compaign_task_today_array: [],
                          compaign_task_overdue_array: [],
                          compaign_task_upcoming_array: [],
                          isLoadingForTask:false,
                          no_data_for_task:"block",
                          spinner_1:"none",
                         });
                     }
                 })
              }



          fetch_campaign_call_logs = (campaign_id,search_by_telicller,startDate,endDate,pageNumber, call_type_selected)=>  {
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
            if (search_by_telicller == "" || search_by_telicller == undefined) {
                var search_by_telicller = undefined
            }else{
                var search_by_telicller = search_by_telicller[0].value
            }

            if (startDate == "" || startDate == undefined || endDate == "" || endDate == undefined) {

            }
            else{
                const today = new Date(startDate);
                const yyyy = today.getFullYear();
                let mm = today.getMonth() + 1; // Months start at 0!
                let dd = today.getDate();
                if (dd < 10) dd = '0' + dd;
                if (mm < 10) mm = '0' + mm;
                const formattedToday_start = yyyy + '-' + mm + '-' + dd;
                ////console.log("formattedToday",formattedToday_start);

                const today_end = new Date(endDate);
                const yyyy_end = today_end.getFullYear();
                let mm_end = today_end.getMonth() + 1; // Months start at 0!
                let dd_end = today_end.getDate();
                    ////console.log("datttttttttttttttt",dd_end);
                    ////console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",new Date(endDate).getDate());
                    if (dd_end < 10) {
                      var my_date ='0' + dd_end
                    }
                    else{
                      var my_date = dd_end
                    }
                    ////console.log("my_date",my_date);
                if (dd_end < 10) dd_end = '0' + dd_end;
                if (mm_end < 10) mm_end = '0' + mm_end;

                const formattedToday_end = yyyy_end + '-' + mm_end + '-' + my_date;
                ////console.log("formattedToday**************",formattedToday_end);
                var my_date = [formattedToday_start,formattedToday_end]
            }

            if(call_type_selected == undefined || call_type_selected == '' || call_type_selected == null){
              var send_call_type = undefined
            }else {
              if(call_type_selected.value == 'all'){
                var send_call_type = undefined
              }else {
                var send_call_type = call_type_selected.value
              }
            }

            var params ={
                campaign_id:campaign_id,
                telecaller_id:search_by_telicller,
                date_range:my_date,
                call_type:send_call_type,
                page_no:page_no,
            }
            console.log("Search Cam Call Logs", params);
            const { settings } = this.props;
             const res = fetch(settings.api_url + "api/telecaller_app/fetch_campaign_call_logs", {
                 method: 'POST',
                 body: JSON.stringify(params),
                 headers: {
                     "Content-type": "application/json; charset=UTF-8",
                 }
             }).then((response) => response.json())
                 .then(json => {
                     console.log("Fetch Camaign Call Logs ***************", json)
                     var data = json;
                     if (data.status == true) {

                       var compaign_Call_array = data.data
                       for (let j = 0; j < compaign_Call_array.length; j++) {
                        var date = compaign_Call_array[j].start_time;
                        var new_date = this.formatDate(date);
                        //// //console.log("new_date=======================",new_date);
                        compaign_Call_array[j].start_time_new = new_date
                     }


                         this.setState({
                          compaign_Call_array: compaign_Call_array,
                          isLoadingForCall:false,
                          spinner_1:"none",
                          no_data_for_Call:"none",
                          is_last:data.is_last,
                          data_spinner:"none",
                         });
                     }
                     else {
                         this.setState({
                          compaign_Call_array: [],
                          isLoadingForCall:false,
                          no_data_for_Call:"block",
                          spinner_1:"none",
                          data_spinner:"none",
                         });
                     }
                 })
              }



          fetch_campaign_leads = (campaign_id,search_by_telicller,tag_task,campaigne_type,lead_name)=>  {
              this.setState({
                  spinner_1:"none"
              })

            if (search_by_telicller == "" || search_by_telicller == undefined) {
                var search_by_telicller = undefined
            }else{
                var search_by_telicller = search_by_telicller[0].value
            }
            if (tag_task == "" || tag_task == undefined) {
                var tag_task = undefined
            }else{
                var tag_task = tag_task.value
            }
            if (campaigne_type == "" || campaigne_type == undefined) {
                var campaigne_type = undefined
            }else{
                var campaigne_type = campaigne_type.value
            }
            if (lead_name == "" || lead_name == undefined) {
                var lead_name = undefined
            }else{
                var lead_name = lead_name.value
            }

            var params ={
                campaign_id:campaign_id,
                telecaller_id:search_by_telicller,
                tags:tag_task,
                // type:campaigne_type,
                search_by:this.state.lead_name
            }
            //console.log("Search Lead Stage",params);
            const { settings } = this.props;
             const res = fetch(settings.api_url + "api/telecaller_app/fetch_campaign_leads", {
                 method: 'POST',
                 body: JSON.stringify(params),
                 headers: {
                     "Content-type": "application/json; charset=UTF-8",
                 }
             }).then((response) => response.json())
                 .then(json => {
                     //console.log("Fetch campaign Leadsss ***************", json)
                     var data = json;
                     if (data.status == true) {
                         this.setState({
                          compaign_lead_array: data.data,
                          isLoadingForlead:false,
                          spinner_1:"none",
                          no_data_for_lead:"none"
                         });
                     }
                     else {
                         this.setState({
                          compaign_lead_array: [],
                          isLoadingForlead:false,
                          no_data_for_lead:"block",
                          spinner_1:"none",
                         });
                     }
                 })
              }



          fetch_data_logs = (campaign_id)=>  {
              this.setState({
                  spinner_1:"none"
              })

            var params ={
                campaign_id:campaign_id,
            }
            //console.log("Data Logs New",params);
            const { settings } = this.props;
             const res = fetch(settings.api_url + "api/telecaller_app/fetch_data_logs", {
                 method: 'POST',
                 body: JSON.stringify(params),
                 headers: {
                     "Content-type": "application/json; charset=UTF-8",
                 }
             }).then((response) => response.json())
                 .then(json => {
                     console.log("Fetch Data Logs Neww ***************", json)
                     var data = json;
                     if (data.status == true) {
                         this.setState({
                          compaign_data_logs_array: data.data,
                          isLoadingFordata_logs:false,
                          spinner_1:"none",
                          no_data_for_data_logs:"none"
                         });
                     }
                     else {
                         this.setState({
                          compaign_data_logs_array: [],
                          isLoadingFordata_logs:false,
                          no_data_for_data_logs:"block",
                          spinner_1:"none",
                         });
                     }
                 })
              }



          add_campaign_details() {
            //console.log("All Addd");
            const {addToast,settings} = this.props;
            //console.log("name",this.state.name);

            if (this.state.name == "" || this.state.name == undefined || this.state.cam_type == "" || this.state.cam_type == undefined ||
            this.state.selectedOptions == "" || this.state.selectedOptions == undefined || this.state.selectedOptionsType == "" || this.state.selectedOptionsType == undefined ||
            this.state.add_contacts == "" || this.state.add_contacts == undefined ||  this.state.set_priorities == "" || this.state.set_priorities == undefined ||
            this.state.contact_distribution == "" || this.state.contact_distribution == undefined
            ) {//console.log("name",this.state.name);
                //console.log("llll");
              this.setState({
                  camaign_error:"Please Fill All the Feilds",
                  borderNew:true,
                  loading:true
              })
            }else{

                var add_contact = this.state.add_contacts
                var add_contact_array = add_contact.map(item => {
                    return (item.value)
                });

                //console.log("add_contact_array",add_contact_array);
                var params = {
                    name:this.state.name,
                    type:this.state.cam_type,
                    manager:this.state.selectedOptions,
                    users:this.state.selectedOptionsType,
                    add_contact:add_contact_array,
                    set_priority:this.state.set_priorities,
                    contact_distribution:this.state.contact_distribution,
                }
                //console.log("Add params************",params);
                  const res = fetch(settings.api_url + "api/telecaller_app/add_campaign_details", {
                      method: 'POST',
                      body: JSON.stringify(params),
                      headers: {
                          "Content-type": "application/json; charset=UTF-8",
                      }
                  }).then((response) => response.json())
                      .then(json => {
                          //console.log("Add add_campaign_details **************************************", { params: params, response: json })
                          var data = json;
                          if (data.status == true) {
                            this.setState({
                                modalOpen:false,
                                camaign_error:"",
                                name:"",
                                cam_type:"",
                                selectedOptions:"",
                                selectedOptionsType:"",
                                add_contacts:"",
                                set_priorities:"",
                                contact_distribution:"",
                                button_for_priority:"Save",
                                loading:false,

                            })
                              addToast({
                                  title: 'Book Your Insurance',
                                  content: data["message"],
                                  time: new Date(),
                                  duration: 1000,
                              });
                                this.fetch_compaign_details()
                          }
                          else {
                            this.setState({
                             camaign_error:data["message"]
                            })
                              addToast({
                                  title: 'Book Your Insurance',
                                  content: data["message"],
                                  time: new Date(),
                                  duration: 1000,
                              });
                          }
                      })
                    //  }
            }
      }



      delete_campaign(campaign_id) {

            const {addToast,settings} = this.props;
                var params = {
                    campaign_id:campaign_id,
                }
                //console.log("Delete params************",params);
                  const res = fetch(settings.api_url + "api/telecaller_app/delete_campaign", {
                      method: 'POST',
                      body: JSON.stringify(params),
                      headers: {
                          "Content-type": "application/json; charset=UTF-8",
                      }
                  }).then((response) => response.json())
                      .then(json => {
                          //console.log("Delete_campaign_details **************************************", { params: params, response: json })
                          var data = json;
                          if (data.status == true) {
                            this.setState({
                                AlertDelete2:false,
                            })
                              addToast({
                                  title: 'Book Your Insurance',
                                  content: data["message"],
                                  time: new Date(),
                                  duration: 1000,
                              });
                                this.fetch_compaign_details()
                          }
                          else {
                            this.setState({
                                AlertDelete2:false
                            })
                              addToast({
                                  title: 'Book Your Insurance',
                                  content: data["message"],
                                  time: new Date(),
                                  duration: 1000,
                              });
                          }
                      })
                 }




              handleSelection = (selectedOptions) => {
                  //console.log("selectedOptions**************************",selectedOptions);
                this.setState({ selectedOptions });
              };
              handleSelectionType = (selectedOptionsType) => {
                  //console.log("selectedOptions**************************",selectedOptionsType);
                this.setState({ selectedOptionsType });
              };

              handleSelectionTaskkkk = (search_by_telicller) => {
                  //console.log("selectedOptions**************************",search_by_telicller);
                this.setState({ search_by_telicller });
                if (this.state.activeTab4 == "profile") {
                    this.fetch_campaign_tasks(this.state.campaign_id,search_by_telicller,this.state.startDate,this.state.endDate,this.state.tag_task)
                }else if (this.state.activeTab4 == "contact") {
                    this.fetch_campaign_call_logs(this.state.campaign_id,search_by_telicller,this.state.startDate,this.state.endDate, this.state.current_page, this.state.call_type_selected)
                }else if (this.state.activeTab4 == "home") {
                    this.fetch_campaign_leads(this.state.campaign_id,search_by_telicller,this.state.tag_task,this.state.campaigne_type,this.state.lead_name)

                }

              };

              handleInputChange = (input) => {
                  //console.log("input*************",input);
                // this.setState({ inputQuery: input });
                // Fetch/filter options based on the input query and update the options state
                // Example: Fetch options from an API or filter from a pre-existing list
                // const filteredOptions = [...]; // Replace [...] with your filtered options
                // this.setState({ options: filteredOptions });
              };


              handleLegendMouseEnter = (event, legendItem) => {
                  if (legendItem.text == "Others") {
                    //   //console.log("legendItem((((((((((((",legendItem);
                      this.setState({
                          showTooltip:true
                      })
                  }
                    this.setState({
                    hoveredLegendItem: legendItem,
                    });
              };

              handleLegendMouseLeave = (event, legendItem) => {
                //console.log("khushbuuuuu",legendItem);
                if (legendItem.text == "Others") {
                    // //console.log("legendItem((((((((((((",legendItem);
                    this.setState({
                        showTooltip:false
                    })
                }
                this.setState({
                  hoveredLegendItem: null,
                });
              };


              update_campaign_status = (campaign_id,pause)=>  {
              var params ={
                  campaign_id:campaign_id,
                  pause:pause,
              }
              //console.log("Cam_ satatusssssss",params);
              const { settings,addToast } = this.props;
               const res = fetch(settings.api_url + "api/telecaller_app/update_campaign_status", {
                   method: 'POST',
                   body: JSON.stringify(params),
                   headers: {
                       "Content-type": "application/json; charset=UTF-8",
                   }
               }).then((response) => response.json())
                   .then(json => {
                       //console.log("Campaign Status ***************", json)
                       var data = json;
                       if (data.status == true) {
                        addToast({
                            title: 'Book Your Insurance',
                            content: data["message"],
                            time: new Date(),
                            duration: 1000,
                        });
                        this.fetch_single_campaign_detail(this.state.campaign_id)
                       }
                       else {
                        addToast({
                            title: 'Book Your Insurance',
                            content: data["message"],
                            time: new Date(),
                            duration: 1000,
                        });
                       }
                   })
                }



              fetch_contacts_for_all = ()=>  {
              const { settings,addToast } = this.props;
               const res = fetch(settings.api_url + "api/telecaller_app/fetch_contacts_for_all", {
                   method: 'POST',
                //    body: JSON.stringify(params),
                   headers: {
                       "Content-type": "application/json; charset=UTF-8",
                   }
               }).then((response) => response.json())
                   .then(json => {
                       console.log("All Contact Campaign ***************", json)
                       var data = json;
                       if (data.status == true) {
                           //console.log("all_conacts_array",[data.data.used,data.data.unused]);
                       this.setState({
                           all_conacts_array:[data.data.used,data.data.unused],
                           total_total_contact:data.data.total,
                           used_contact:data.data.used,
                           unused_contact:data.data.unused,
                           isLoadingcontcts:false,
                       })
                       }
                       else {
                        this.setState({
                            all_conacts_array:[],
                            isLoadingcontcts:false,
                            used_contact:0,
                            unused_contact:0,
                        })
                       }
                   })
                }


              fetch_campaign_status = ()=>  {
              const { settings,addToast } = this.props;
               const res = fetch(settings.api_url + "api/telecaller_app/fetch_campaign_status", {
                   method: 'POST',
                //    body: JSON.stringify(params),
                   headers: {
                       "Content-type": "application/json; charset=UTF-8",
                   }
               }).then((response) => response.json())
                   .then(json => {
                       //console.log("All Status Campaign ***************", json)
                       var data = json;
                       if (data.status == true) {
                           //console.log([data.data.ongoing,data.in_process,data.closed]);
                       this.setState({
                        status_array:[data.data.ongoing,data.data.in_process,data.data.closed],
                        isLoadingStatus:false,
                        no_status_for_cam:"none",
                        ongoing_new : data.data.ongoing,
                        in_process_new : data.data.in_process,
                        closed_new : data.data.closed,
                       })
                       }
                       else {
                        this.setState({
                        status_array:[],
                        isLoadingStatus:false,
                        no_status_for_cam:"block",
                        ongoing_new:0,
                        in_process_new:0,
                        closed_new:0,
                        })
                       }
                   })
                }


                redirect_to_archive=()=>{
                    //console.log("archive-campaign");
                    location.hash = "/archive-campaign"
                }


                formatDate(date) {
                 // //// //console.log("date",new Date(date));
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

                         //  //// //console.log(dt+'-' + month + '-'+year);
                          var new_date_1 = dt+'-' + month + '-'+year

                          var today = date;
                          let options_1 = {
                              hour: "2-digit", minute: "2-digit"
                          };

                         //  // //console.log("lllllllllllllllllllllllllllll",today.toLocaleTimeString("en-us", options_1));
                                             var time_new =today.toLocaleTimeString("en-us", options_1)
                                             // // //console.log("mt______________________________________________*********************",time_new);
                                             // // //console.log("mt______________________________________________",new_date_1);

                                             var nre_time = time_new


                         return nre_time;
                       }


                       // Chart options, including the onClick event


                handleBarClick = (event, elements) => {
                    console.log(event);
                    console.log(elements);
                    var telecallerDetails = this.state.telecallerDetails
                    if (elements.length > 0) {
                      var clickedIndex = elements[0]._index;
                      var clickedLabel = elements[0]._view.label;
                      console.log("Bar clicked at Label:" ,clickedLabel);
                      console.log(`Bar clicked at index: ${clickedIndex}`);

                      // Your custom logic here
                      var start_date = telecallerDetails[clickedIndex].start_date
                      var end_date = telecallerDetails[clickedIndex].end_date
                      console.log(start_date,"start_date");
                      console.log(end_date,"end_date");
                      this.toggleTelecaller()
                      this.telecaller_stats_details([start_date,end_date])
                    }

                  };



                  telecaller_stats_details = (time_interval)=>  {

                    if (this.state.telecallerDateYear == "" || this.state.telecallerDateYear == undefined) {
                        var sorting_date  =undefined
                    }else{
                        const today = new Date(this.state.telecallerDateYear);
                        const yyyy = today.getFullYear();
                        let mm = today.getMonth() + 1; // Months start at 0!
                        let dd = today.getDate();
                        if (dd < 10) dd = '0' + dd;
                        if (mm < 10) mm = '0' + mm;
                        var formattedToday_start = yyyy + '-' + mm ;
                        var sorting_date  = formattedToday_start
                        var date  =undefined
                    }
                    if (this.state.telecallerDateDay == "" || this.state.telecallerDateDay == undefined) {
                        var date  =undefined
                    }else{
                        const today = new Date(this.state.telecallerDateDay);
                        const yyyy = today.getFullYear();
                        let mm = today.getMonth() + 1; // Months start at 0!
                        let dd = today.getDate();
                        if (dd < 10) dd = '0' + dd;
                        if (mm < 10) mm = '0' + mm;
                        var date = yyyy + '-' + mm + '-' + dd;
                        var sorting_date  =undefined
                    }


                    var params ={
                        campaign_id:this.state.campaign_id,
                        telecaller_id:this.state.telecaller_id,
                        sorting_date:sorting_date,
                        date:date,
                        time_interval : time_interval
                    }
                    console.log("Telecaller Stats Details",params);
                    const { settings } = this.props;
                     const res = fetch(settings.api_url + "api/telecaller_app/telecaller_stats_details", {
                         method: 'POST',
                         body: JSON.stringify(params),
                         headers: {
                             "Content-type": "application/json; charset=UTF-8",
                         }
                     }).then((response) => response.json())
                         .then(json => {
                             console.log("Telecaller Sates Deatils @@@@@@@@@@@@@@@@@@@@@@@@***************", json)
                             var data = json;
                             if (data.status == true) {
                                this.setState({
                                    lead_data :data.data[0].lead_data,
                                    lost_data :data.data[0].lost_data,
                                    connected_data :data.data[0].connected_data,
                                    not_connected_data :data.data[0].not_connected_data,
                                })
                             }
                             else {
                                this.setState({
                                    lead_data:[],
                                    lost_data:[],
                                    connected_data:[],
                                    not_connected_data:[],
                                })
                             }
                         })
                      }



                      handleScroll = () => {
                        // console.log("kkkkkkkkkkkkkkkkkkkkk");



                      const scrollContainer = document.getElementById('scrollContainer');
                      console.log("scrollContainer",scrollContainer);
                      // console.log(" scrollContainer.scrollHeight", scrollContainer.scrollHeight);
                      // console.log("scrollContainer.scrollTop",scrollContainer.scrollTop);
                      const scrollOffset = scrollContainer.scrollHeight - scrollContainer.scrollTop;
                      // console.log("scrollOffset",scrollOffset);
                      const containerHeight = scrollContainer.clientHeight;
                      // console.log("containerHeight",containerHeight);

                      var compaign_Call_array = this.state.compaign_Call_array
                      var compaign_Call_array_lenth = compaign_Call_array.length
                    //   console.log("compaign_Call_array_lenth",compaign_Call_array_lenth);

                      var current_page =this.state.current_page
                      var page_no = current_page + 1

                      if (scrollOffset <= containerHeight + 20 && compaign_Call_array_lenth >= 20 && this.state.is_last == false) { // 20 is the threshold for triggering the fetch

                        //   console.log("@@@@@@@@@@@@@@@@@@@@@@@");
                          this.setState({
                              data_spinner:"block",
                              current_page:page_no
                          })
                          setTimeout(()=>{
                            this.setState({
                              data_spinner: 'none'
                            })

                            this.fetch_campaign_call_logs(this.state.campaign_id,this.state.search_by_telicller,this.state.startDate,this.state.endDate, this.state.current_page, this.state.call_type_selected)
                            },0)
                      }
                    };

    render() {




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
            menuPortal: provided => ({ ...provided, zIndex: 5 }),
            option: ( css, state ) => {
                // ////console.log("cs============",css);
                let bgc = '';
                let color = '';

                if ( state.isSelected ) {
                    bgc = '#8bc240';
                    color = '#fff';
                } else if ( state.isFocused ) {
                    bgc = 'rgba(114, 94, 195, 0.2)';
                }

                return {
                    ...css,
                    backgroundColor: bgc,
                    color:color
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

        var campaigne_array = this.state.campaigne_array.map(item => {
          return {
              value: item._id,
              label: item.campaigne_type_name,
          }
      });
        var priority_array = this.state.priority_array.map(item => {
          return {
              value: item._id,
              label: item.priority_name,
          }
      });


        var array_of_excel = this.state.array_of_excel.map(item => {
          return {
              value: item._id,
              label: item.excel_name,
          }
      });


        var tag_array = this.state.tag_array.map(item => {
          return {
              value: item._id,
              label: item.tag_name,
          }
      });


        const {settings
        } = this.props;



        var status_cam = {
            labels: ["Ongoing","In Process","Closed"],
              datasets: [
                  {
                      label:'Count',
                      data: this.state.status_array,
                      backgroundColor: [
                          '#2fc787','#fdbf21','#ef5164','#F24C3D','#5499C7 ','#1ABC9C ','#F1C40F','#BA4A00','#AF33FF','#5233FF','#80FF33',
                          '#33F6FF','#3383FF','#FF0036','#770000','#64025D','#27729A','#128035','#0000cc','#cc6600','#D307E7','#4F33FF'

                      ],
                      borderColor: [
                          '#2fc787','#fdbf21','#ef5164','#F24C3D','#5499C7 ','#1ABC9C ','#F1C40F','#BA4A00','#AF33FF','#5233FF','#80FF33',
                          '#33F6FF','#3383FF','#FF0036','#770000','#64025D','#27729A','#128035','#0000cc','#cc6600','#D307E7','#4F33FF'
                      ],
                      borderWidth: 0,
                  },
              ],
          }


        var contact_cam = {
            labels: ["Used","Unused"],
              datasets: [
                  {
                      label:'Count',
                      data: [this.state.used_contact,this.state.unused_contact],
                    //   data: this.state.all_conacts_array,
                      backgroundColor: [
                          '#1B9C85 ','#D71313'
                        ],
                      borderColor: [
                          '#1B9C85 ','#D71313'
                        ],
                      borderWidth: 0,
                  },
              ],
          }


          var status_option = {
            responsive: true,
            yAlign:"bottom",
            legend: {
          display: true,
          position: "right",

        },
        legendDistance: {
           padding: 100
         },
              tooltips: {
                  // enabled: false,

              },
          }
        var payment_data = {
            labels: ["Open","In Process","Closed"],
              datasets: [
                  {
                      label:'Count',
                      data: [this.state.open_contact,this.state.inprocess_contact,this.state.closed_contact],
                      backgroundColor: [
                          '#F2BE22','#F29727','#F24C3D','#5499C7 ','#1ABC9C ','#F1C40F','#BA4A00','#AF33FF','#5233FF','#80FF33',
                          '#33F6FF','#3383FF','#FF0036','#770000','#64025D','#27729A','#128035','#0000cc','#cc6600','#D307E7','#4F33FF'

                      ],
                      borderColor: [
                          '#F2BE22','#F29727','#F24C3D','#5499C7 ','#1ABC9C ','#F1C40F','#BA4A00','#AF33FF','#5233FF','#80FF33',
                          '#33F6FF','#3383FF','#FF0036','#770000','#64025D','#27729A','#128035','#0000cc','#cc6600','#D307E7','#4F33FF'
                      ],
                      borderWidth: 0,
                  },
              ],
          }


          var options_payment = {
            responsive: true,
            yAlign:"bottom",
            legend: {
          display: true,
          position: "right",

        },
        legendDistance: {
           padding: 100
         },
              tooltips: {
                  // enabled: false,

              },
          }


        var onging_calss = {
            labels: ["Called","Follow up","Others"],
              datasets: [
                  {
                      label:'Count',
                      data: [this.state.called_ongoing,this.state.follow_up_ongoing,this.state.others_ongoing],
                      backgroundColor: [
                          '#3383FF','#FF0036','#770000','#64025D','#27729A','#128035','#0000cc','#cc6600','#D307E7','#4F33FF'

                      ],
                      borderColor: [
                          '#3383FF','#FF0036','#770000','#64025D','#27729A','#128035','#0000cc','#cc6600','#D307E7','#4F33FF'
                      ],
                      borderWidth: 0,
                  },
              ],
          }


          var options_onging_calss = {
            responsive: true,
            yAlign:"bottom",
            legend: {
          display: true,
          position: "right",
          onHover: this.handleLegendMouseEnter,
          onLeave: this.handleLegendMouseLeave,
        },
        legendDistance: {
           padding: 100
         },
              tooltips: {
                  // enabled: false,

              },
          }


          var closed_data = {
            labels: ["Converted","Lost"],
              datasets: [
                  {
                      label:'Count',
                      data: [this.state.converted_closed,this.state.lost_closed],
                      backgroundColor: [

                          '#0A4D68','#F45050','#770000','#64025D','#27729A','#128035','#0000cc','#cc6600','#D307E7','#4F33FF'

                      ],
                      borderColor: [

                          '#0A4D68','#F45050','#770000','#64025D','#27729A','#128035','#0000cc','#cc6600','#D307E7','#4F33FF'
                      ],
                      borderWidth: 0,
                  },
              ],
          }

          var options_closed = {
            responsive: true,
            yAlign:"bottom",
            legend: {
          display: true,
          position: "right"
        },
        legendDistance: {
           padding: 100
         },
              tooltips: {
                  // enabled: false,

              },
          }



          const data_bar_quality = {
            labels: this.state.telecaller_start_date,
            datasets: [
              {
                label: 'Lead',
                backgroundColor: '#053B50',
                borderColor: '#053B50',
                borderWidth: 1,
                data: this.state.telecaller_lead,
                stack: 'Stack 0',
              },
              {
                label: 'Lost',
                backgroundColor: '#176B87',
                borderColor: '#176B87',
                borderWidth: 1,
                data: this.state.telecaller_lost,
                stack: 'Stack 0',
              },
              {
                label: 'Connected',
                backgroundColor: '#64CCC5',
                borderColor: '#64CCC5',
                borderWidth: 1,
                data: this.state.telecaller_connected,
                stack: 'Stack 0',
              },
              {
                label: 'Not Connected',
                backgroundColor: '#EEEEEE',
                borderColor: '#EEEEEE',
                borderWidth: 1,
                data: this.state.telecaller_not_connected,
                stack: 'Stack 0',
              },
            ],
            };

            var optionsTelecaller = {
                onClick: this.handleBarClick,
                plugins: {
                    title: {
                      display: true,
                      text: 'Chart.js Bar Chart - Stacked'
                    },
                  },
                  responsive: true,
                  interaction: {
                    intersect: false,
                  },
                  scales: {
                    xAxes: [{
                      stacked: true,
                      gridLines: {
                        display: true,
                        drawBorder: true,
                        drawTicks: false,
                        drawOnChartArea: false, // Draw the x-axis grid line outsid
                      },
                      ticks: {
                        callback: function(value, index, values) {
                            if (typeof value === 'string') {
                                const parts = value.split(" - ");
                                if (parts.length === 2) {

                                    return [
                                            parts[0],
                                            parts[1]
                                          ];   // Display both parts on separate lines
                                }
                              }
                              return value;
                        },
                        // lineHeight: 1.5,
                        display: true, // Hide y-axis ticks
                        padding: 10,
                      },
                    }],
                    yAxes: [{
                      stacked: true,
                      gridLines: {
                        display: true,
                        drawBorder: true,
                        drawTicks: false,
                        drawOnChartArea: false, // Draw the y-axis grid line inside the chart area
                      },
                      ticks: {
                        beginAtZero: true, // Ensure y-axis starts at zero
                        display: true, // Hide y-axis ticks
                        padding: 10,
                      },
                    //   type: 'linear',
                    }],
                  },
                }


                const {
                    activeAccordion,
                } = this.state;




        return (
            <Fragment>
                 <PageTitle className = "cam_haeding">
                    <div className="row">
                        <div className={this.state.ipad_emp_list == "block" ? "col-lg-6 col-md-12 col-sm-12" :"col-lg-6 col-md-12 col-sm-12"}  style={{paddingLeft:"9px"}}>
                        <div style={{display:"inline-flex",width:"100%"}}>
                            <div style={{display:this.state.show_nav_titile == true ? "block" :"none"}}>
                                <div className="tooltip_poo_back_1" aria-hidden="true" style={{display: device_width > 768 ? "block" : "none"}} onClick={ () => {
                                    this.toggleTab( 4, 'show_status_contacts' )
                                    this.fetch_contacts_for_all()
                                    this.fetch_campaign_status()
                                     }}>
                                <Icon name="arrow-left-circle" className="left_arrow_new" />
                                <span className="tooltiptext_backk_1">Show all graph</span>
                               </div>
                            </div>
                            <h1 style={{marginTop:"-1px",width :this.state.campaign_name.length > 14 ? "285px" : "",textTransform:"capitalize"}} className={this.state.campaign_name.length > 14 ? "marquee" : ""} >
                                <span style={{whiteSpace:"nowrap"}}>{this.state.isLoadingForSingle ? "Campaigns" : this.state.campaign_name }</span>
                                </h1>
                            <div style={{display:this.state.activeTab4 == "details" || this.state.activeTab4 == "home" ||this.state.activeTab4 == "profile" ||this.state.activeTab4 == "contact" ? "none" :"inline-flex" }}>
                            <div>
                                <input
                                    style={{marginLeft:"16px"}}
                                    type="text"
                                    className="form-control serach_smmm_22"
                                    aria-describedby="emailHelp"
                                    placeholder="Search by Name"
                                    value={this.state.search_by_name}
                                    onChange={(e) => {
                                        this.setState({
                                        search_by_name:e.target.value,
                                        })
                                        this.fetch_compaign_details(e.target.value,this.state.search_by_type)
                                    }}
                                />
                            </div>
                            <div className="select_option" style={{width:"204px",marginLeft:"30px"}}>
                                <Select
                                  value = {this.state.search_by_type}
                                    onChange={(e) => {
                                     this.setState({
                                          search_by_type: e,
                                     });
                                     this.fetch_compaign_details(this.state.search_by_name,e)
                                  }}
                                  className="contact_sort"
                                  options={ campaigne_array }
                                  styles={ customStyles }
                                  menuPosition={'fixed'}
                                  placeholder="Select Type"
                            />
                            </div>
                       </div>

                       {/*  for lead sorting  */}

                             <div className="test_collapse lead_sorting" style={{display:this.state.active_tab_new == "home"  ? "inline-flex" :"none" }}>
                                <div className="leadinging_type">
                                <Typeahead
                                    id="basic-typeahead"
                                    onChange={this.handleSelectionTaskkkk}
                                    onInputChange={this.fetch_telecaller_typeahead}
                                    options={this.state.telecaller_typeahead} // Replace [...] with your array of options
                                    selected={this.state.search_by_telicller}
                                    placeholder="Search Telecaller"
                                    />
                                </div>
                                <div className="leadinging_type" >
                                <Select
                                    value = {this.state.tag_task}
                                    onChange={(e) => {
                                        this.setState({
                                            tag_task: e,
                                        });
                                        this.fetch_campaign_leads(this.state.campaign_id,this.state.search_by_telicller,e)
                                            // this.fetch_compaign_details(this.state.search_by_name,e)
                                    }}
                                    className="contact_sort"
                                    options={ tag_array }
                                    styles={ customStyles }
                                    menuPosition={'fixed'}
                                    placeholder="Select Tag"
                                />
                                </div>
                                {/*<div className="leadinging_type">
                                <Select
                                    value = {this.state.campaigne_type}
                                        onChange={(e) => {
                                        this.setState({
                                            campaigne_type: e,
                                        });
                                        this.fetch_campaign_leads(this.state.campaign_id,this.state.search_by_telicller,this.state.tag_task,e)
                                        // this.fetch_compaign_details(this.state.search_by_name,e)
                                    }}
                                    className="contact_sort"
                                    options={ campaigne_array }
                                    styles={ customStyles }
                                    menuPosition={'fixed'}
                                    placeholder="Search Type"
                                />
                                </div>*/}
                                <div className="leadinging_type">
                                <Input value={this.state.lead_name}
                                 type="search"
                                 styles={ customStyles }
                                 placeholder="Search by lead name/Vehicle Number"
                                onChange={(e) => {
                                    this.setState({
                                      lead_name:e.target.value
                                    })
                                    this.fetch_campaign_leads(this.state.campaign_id,this.state.search_by_telicller,this.state.tag_task,e.target.value)
                            }} />
                                </div>
                        </div>


                       {/*  for taskkk sorting  */}

                             <div className="test_collapse lead_sorting" style={{display:this.state.active_tab_new == "profile"  ? "inline-flex" :"none" }}>
                                <div className="leadinging_type">
                                <Typeahead
                                 id="basic-typeahead"
                                 onChange={this.handleSelectionTaskkkk}
                                 onInputChange={this.fetch_telecaller_typeahead}
                                 options={this.state.telecaller_typeahead} // Replace [...] with your array of options
                                 selected={this.state.search_by_telicller}
                                 placeholder="Search Telecaller"
                                 />
                                </div>
                                <div className="leadinging_type" >
                                <div className="date_pickerrr">
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
                                      this.fetch_campaign_tasks(this.state.campaign_id,this.state.search_by_telicller,startDate,endDate,this.state.tag_task)
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
                                <div className="leadinging_type">
                                <Select
                                 value = {this.state.tag_task}
                                     onChange={(e) => {
                                     this.setState({
                                         tag_task: e,
                                     });
                                     this.fetch_campaign_tasks(this.state.campaign_id,this.state.search_by_telicller,this.state.startDate,this.state.endDate,e)
                                     // this.fetch_compaign_details(this.state.search_by_name,e)
                                 }}
                                 className="contact_sort"
                                 options={ tag_array }
                                 styles={ customStyles }
                                 menuPosition={'fixed'}
                                 placeholder="Select Tag"
                            />
                                </div>
                        </div>

                         {/*  for taskkk sorting  */}

                         <div className="test_collapse lead_sorting" style={{display:this.state.active_tab_new == "contact"  ? "inline-flex" :"none" }}>
                                <div className="leadinging_type">
                                <Typeahead
                                id="basic-typeahead"
                                onChange={this.handleSelectionTaskkkk}
                                onInputChange={this.fetch_telecaller_typeahead}
                                options={this.state.telecaller_typeahead} // Replace [...] with your array of options
                                selected={this.state.search_by_telicller}
                                placeholder="Search Telecaller"
                                                  />
                                </div>
                                <div className="leadinging_type" >
                                <div className="date_pickerrr">
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
                                    this.fetch_campaign_call_logs(this.state.campaign_id,this.state.search_by_telicller,startDate,endDate,this.state.current_page, this.state.call_type_selected)
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

                                <div className="select_option" style={{width:"-webkit-fill-available"}}>
                                   <Select
                                         value = {this.state.call_type_selected}
                                         onChange={(e) => {
                                             //////console.log(e, "Val.....")
                                             this.setState({
                                                 call_type_selected: e
                                             });
                                             this.fetch_campaign_call_logs(this.state.campaign_id,this.state.search_by_telicller,this.state.startDate,this.state.endDate,this.state.current_page,e)

                                         }}
                                         className= 'contact_sort'
                                         options={ this.state.call_type }
                                         styles={ customStyles }
                                        //  menuPosition={'fixed'}
                                         placeholder="Call Type"
                             />
                          </div>
                        </div>


                     </div>
                 </div>

                        <div className={this.state.ipad_emp_list == "block" ? "col-lg-6 col-md-12 col-sm-12 add_capp_newww":"col-lg-6 col-md-12 col-sm-12 mar_top_cam" }  style={{textAlign:"end",textTransform: "capitalize"}}>
                            <div className="all_inline_new">
                            <div className="width_of_delete tooge_new_tool" style={{display:this.state.show_nav_titile == true ? "block" :"none",marginTop:"2px",marginRight:"-9px"}}>
                            <CustomInput checked={this.state.array_of_single_campaign.pause == true ? true : false} type="switch" id="formSwitch1" name="formSwitch1"
                                onClick={(e)=>{
                                    this.setState({
                                        pause_toggle:e.target.checked
                                    })
                                    this.update_campaign_status(this.state.campaign_id,e.target.checked)
                                }}
                            />
                              <p className="pauseStatus">{this.state.array_of_single_campaign.status == "pause" ? "Paused" :"Ongoing"}</p>
                              <span className="toggle_tool_tip">Toogle pause</span>
                            </div>

                            <div className="width_of_delete insights_back_tool" style={{display:this.state.show_inside_back == true ? "block" :"none"}}>
                            <Button  color="info" style={{padding:"7px 11px",textTransform:"capitalize",height:"34px",marginLeft:"auto"}} onClick={ () => this.toggleTab( 4, 'insights' ) } ><Icon name="arrow-left-circle" /></Button>
                             <span className="show_inghtsss">Back to Insights</span>
                            </div>
                            <div className="tab_for_new_data" style={{display:this.state.show_nav_titile == true ? "block" :"none"}}>
                            <Tabs pills sliding className="tab_all">
                                        <Tabs.NavItem
                                            isActive={ this.state.activeTab4 === 'details' }
                                            onClick={ () => this.toggleTab( 4, 'details' ) }
                                            className="details_app"
                                        >
                                            Details
                                        </Tabs.NavItem>
                                        <Tabs.NavItem
                                            isActive={ this.state.activeTab4 === 'home' }
                                            onClick={ () => this.toggleTab( 4, 'home' ) }
                                            className="leadss"
                                        >
                                            Leads
                                        </Tabs.NavItem>
                                        <Tabs.NavItem
                                            isActive={ this.state.activeTab4 === 'profile' }
                                            onClick={ () => this.toggleTab( 4, 'profile' ) }
                                            className="task"
                                        >
                                            Tasks
                                        </Tabs.NavItem>
                                        <Tabs.NavItem
                                            isActive={ this.state.activeTab4 === 'contact' }
                                            onClick={ () => this.toggleTab( 4, 'contact' ) }
                                            className="call_logss"
                                        >
                                            Call Logs
                                        </Tabs.NavItem>
                                        {/* <Tabs.NavItem
                                            isActive={ this.state.activeTab4 === 'insights' }
                                            onClick={ () => this.toggleTab( 4, 'insights' ) }
                                            className="insights"
                                        >
                                            Insights
                                        </Tabs.NavItem> */}
                                    </Tabs>
                            </div>
                        <Button color="warning" disabled={this.state.campaign_control == "false" ? 'disabled' : ''} style={{color:"#fff",textTransform:"capitalize",whiteSpace:"nowrap",padding:"9px 9px",height: "34px",paddingTop:"8px"}} onClick={this.toggle}>Add Campaign</Button>
                        <div className="width_of_delete tool_tip_delete" style={{display:this.state.show_nav_titile == true ? "block" :"none"}}>
                            <Button  disabled={this.state.campaign_control == "false" ? 'disabled' : ''} color="danger" style={{padding:"7px 11px",textTransform:"capitalize",height:"34px",marginLeft:"auto"}} onClick={()=>{
                                this.setState({
                                    AlertDelete2: true,
                                    campaign_id:this.state.campaign_id
                                })
                             }} ><Icon name="archive" /></Button>
                             <span className="delete_camp_tool">Move Campaign to archive</span>
                            </div>
                        <Button color="secondary" style={{color:"#fff",textTransform:"capitalize",whiteSpace:"nowrap",padding:"9px 9px",height: "34px",paddingTop:"8px",marginLeft:"8px",backgroundColor:"#0B666A",borderColor:"#0B666A",display:this.state.show_nav_titile == false ? "inline-flex" :"none"}} onClick={()=>{this.redirect_to_archive()}}>Archive Campaign</Button>
                        <div style={{display: device_width < 769 ? this.state.ipad_width : "block"}}>
                        <Button color="info" className="backk_btnnn" style={{ textTransform:"capitalize", display: device_width < 769 ? "block" : "none",marginLeft:"7px",padding:"8px 9px 9px",height:"34px"}}
                                    onClick={() => {
                                    this.setState({
                                        ipad_emp_list:"block",
                                        ipad_width:"none",
                                        active_tab_new:"",
                                        show_inside_back:false,
                                        show_nav_titile:false,
                                    })
                                    }}>Back</Button>

                        </div>
                        <Button color="brand" className="backk_btnnn" style={{ textTransform:"capitalize", display: device_width < 769 ? "block" : "none",marginLeft:"7px",whiteSpace:"nowrap",padding:"8px 9px 9px",height:"34px"}}
                                    onClick={() => {
                                    this.setState({
                                      model_for_graph:true
                                    })
                                  }}>Show all graph</Button>
                        </div>
                    </div>
                    </div>
              </PageTitle>


                  <div className="Campaign_data_start test_collapse">

                      {/* <div className="row">
                          <div className="col-lg-3 col-md-12">
                          </div>
                          <div className="col-lg-9 col-md-12">
                          </div>
                     </div> */}
                <h3 style={{ display: this.state.no_data, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:(gk)}}>No Data Found</h3>

                   <div className="" style={{display:this.state.no_data == "none" ? "block" : "none"}}>
                   <div className="row">
                   <div className="col-lg-4 col-md-12 height_sales mycalendar heading_opeartion lefting_data" style={{paddingLeft:"26px",height:my_height-75,display: this.state.ipad_emp_list,paddingRight:"0px"}}>
                   <div className="table-responsive-lg scroll_1 test_collapse box_data_cam mycalendar" style={{height:my_height-94}} >
                    <Table striped>
                        <thead>
                            <tr>
                                <th scope="col" className="camp_table" style={{borderTop:"none"}}>Campaign Name</th>
                                <th scope="col" className="camp_table" style={{borderTop:"none"}}>Priority</th>
                                {/* <th scope="col" className="camp_table" style={{borderTop:"none"}}>Type</th> */}
                                <th scope="col" className="camp_table" style={{borderTop:"none"}}>Manager</th>
                            </tr>
                        </thead>
                        {this.state.isLoading ?
                            <tbody>
                                    {this.state.compaign_details_array.map((_, index)=>{
                                        return(
                                     <tr key={index}>
                                            <th className="camp_table" scope="row">
                                                <Skeleton height={22} />
                                            </th>
                                            <th className="camp_table" scope="row">
                                                <Skeleton height={22} />
                                            </th>
                                            {/* <th className="camp_table" scope="row">
                                                <Skeleton height={22} />
                                            </th> */}
                                            <th className="camp_table" scope="row">
                                                <Skeleton height={22} />
                                            </th>
                                      </tr>
                                        )
                                    })}

                                </tbody>
                        :
                                    <tbody>
                                    {this.state.compaign_details_array.map((value,index)=>{
                                        return(
                                        <tr key={index} aria-hidden="true" style={{cursor:"pointer"}}
                                            onClick={() => {
                                                this.setState({
                                                spinner_1: 'block',
                                                campaign_id:value.campaign_id,
                                                campaign_name:value.name,
                                                show_nav_titile:true,
                                                show_inside_back:false,
                                                activeTab4:"insights",
                                                active_tab_new:"",
                                                telecallerDateDay:"",
                                                telecallerDateYear:"",
                                                })
                                                this.fetch_single_campaign_detail(value.campaign_id)
                                             }}
                                        >
                                        <th className="camp_table" scope="row" style={{borderLeft:value.campaign_id == this.state.campaign_id ? "7px solid #8bc240":""}}>{value.name}</th>
                                        <th className="camp_table" scope="row" >{value.priority.label}</th>
                                        {/* <th className="camp_table" scope="row" >{value.type.label}</th> */}
                                        <th className="camp_table" scope="row" >
                                        {value.manager ? value.manager.map((v,i)=>{
                                             return(
                                             <div key={i} style={{display:"list-item"}}>
                                                    <span>{v.label}</span>
                                                </div>
                                             )
                                        }):""}
                                        </th>
                                    </tr>
                                        )
                                    })}

                                </tbody>
                                 }
                            </Table>
                           </div>
                         </div>
                          <div className="col-lg-8 col-md-12 heading_opeartion"  style={{display: device_width < 769 ? this.state.ipad_width : "block",paddingRight:"0px",paddingLeft:"12px"}}>
                         <Spinner color="warning" className="employee_spinner_1" style={{ marginTop: gk, display: this.state.spinner_1 }} />
                                {/* <div className=" test_collapse" > */}
                         <div className=" test_collapse" style={{display: this.state.spinner_1=="none" ? "block":"none"}}>
                          <div className="row">
                          <div className="col-lg-12 col-md-12 i_pad_data" style={{paddingLeft:"0px"}}>

                              <div>
                                    <Tabs.Content activeTab={ this.state.activeTab4 }>
                                    <Tabs.Pane tabId="show_status_contacts">
                                    <div className="heading_opeartion padding_newww" style={{padding:"1px"}}>
                                       <div className=" mycalendar" style={{height:my_height-91,padding:"10px 5px"}}>

                                    <div className="hole_border_1 new_height_for_in">
                                         <div className="show_status_data_new" style={{marginTop:"4px"}}>
                                               <h3> Contacts Insights</h3>
                                          </div>
                                          <div className={this.state.isLoadingcontcts == true ? "row": "row fixedUINew"}>
                                             <div className="col-lg-7 col-md-7">
                                                    {this.state.isLoadingcontcts ?
                                                        <div className="chartContainer_1">
                                                        <Skeleton circle width={170} height={170} />
                                                    </div>
                                                    :
                                                    <div>
                                                    {/* <h3 style={{ display:this.state.used_contact == 0 && this.state.unused_contact == 0   ? "block" : "none", padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:"100px"}}>No Data Found</h3> */}
                                                    <div className="chartContainer_1" >
                                                        <Pie
                                                            style={{width:"250px",height:"250px"}}
                                                            height={250} width={250}
                                                            data={contact_cam}
                                                            options={status_option}
                                                        />
                                                        </div>
                                                        </div>
                                                        }
                                             </div>
                                             <div className="col-lg-5 col-md-5 alignSelfInline">
                                                 <div className="" style={{display:"grid"}}>
                                                 <div className="dataNew"  style={{display:"inline-flex"}}>
                                                   <div style={{width:"110px"}}>Total Contacts</div>:
                                                   <span style={{marginLeft:"10px",color:"#FF8400",fontWeight: "500"}}>{this.state.total_total_contact}</span>
                                                  </div>
                                                   <div className="dataNew"  style={{display:"inline-flex"}}>
                                                   <div style={{width:"110px"}}>Used Contact</div>:
                                                   <span style={{marginLeft:"10px",color:"#1B9C85",fontWeight: "500"}}>{this.state.all_conacts_array[0]}</span>
                                                  </div>
                                                   <div className="dataNew"  style={{display:"inline-flex"}}>
                                                   <div style={{width:"110px"}}>Unused Contact</div>:
                                                   <span style={{marginLeft:"10px",color:"#D71313",fontWeight: "500"}}>{this.state.all_conacts_array[1]}</span>
                                                  </div>
                                                 </div>
                                             </div>
                                          </div>

                                            </div>
                                            {/* <hr className="hr_newww" style={{marginTop:" 10px"}}/> */}
                                            <div className="hole_border_1 new_height_for_in" style={{marginTop:" 10px"}}>
                                         <div className="show_status_data_new" style={{marginTop:"4px"}}>
                                               <h3> Status Insights</h3>
                                          </div>
                                          <div className={this.state.isLoadingStatus == true ? "row": "row fixedUINew"}>
                                             <div className="col-lg-7 col-md-7">
                                             {this.state.isLoadingStatus ?
                                                    <div className="chartContainer_1">
                                                    <Skeleton circle width={170} height={170} />
                                                </div>
                                                :
                                                <div>
                                                {/* <h3 style={{ display: (this.state.ongoing_new == 0 && this.state.in_process_new == 0 && this.state.closed_new == 0 ) || this.state.no_status_for_cam == "block" ? "block" : "none", padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:"100px"}}>No Data Found</h3> */}

                                                <div className="chartContainer_1" >
                                                    <Pie
                                                        style={{width:"250px",height:"250px"}}
                                                        height={250} width={250}
                                                        data={status_cam}
                                                        options={status_option}
                                                    />
                                                 </div>
                                                </div>
                                                    }
                                            </div>

                                            <div className="col-lg-5 col-md-5 alignSelfInline">
                                                 <div className="" style={{display:"grid"}}>
                                                 <div className="dataNew"  style={{display:"inline-flex"}}>
                                                   <div style={{width:"70px"}}>Ongoing</div>:
                                                   <span style={{marginLeft:"10px",color:"#2fc787",fontWeight: "500"}}>{this.state.status_array[0]}</span>
                                                  </div>
                                                   <div className="dataNew"  style={{display:"inline-flex"}}>
                                                   <div style={{width:"70px"}}>In Process</div>:
                                                   <span style={{marginLeft:"10px",color:"#fdbf21",fontWeight: "500"}}>{this.state.status_array[1]}</span>
                                                  </div>
                                                   <div className="dataNew"  style={{display:"inline-flex"}}>
                                                   <div style={{width:"70px"}}>Closed</div>:
                                                   <span style={{marginLeft:"10px",color:"#ef5164",fontWeight: "500"}}>{this.state.status_array[2]}</span>
                                                  </div>
                                                </div>
                                           </div>
                                           </div>



                                            </div>

                                        </div>
                                     </div>
                                     </Tabs.Pane>
                                    <Tabs.Pane tabId="details">

                                        <div className="heading_opeartion padding_newww" style={{padding:"1px"}}>
                                                <div className="box_data_cam mycalendar" style={{height:my_height-91}}>
                                                    <div className="row margin_top_new_neee test_collapse">
                                                         <div className="col-lg-12 col-md-12" style={{display:"inline-flex",width:"100%",justifyContent:"space-between"}}>
                                                            <h3>{this.state.isLoadingForSingle ? <Skeleton width={203} height={22} /> : this.state.array_of_single_campaign.name}</h3>

                                                         </div>

                                                    </div>
                                                    <div className="row margin_top_new_neee test_collapse">
                                                       <div className="col-lg-6 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                                            <div className="for_pro_width width_data_cam">Priority</div>:
                                                            {this.state.isLoadingForSingle ?
                                                            <span style={{ marginLeft: "10px" }}><Skeleton height={22} width={100} /></span>
                                                             :
                                                             <span style={{ marginLeft: "10px" }}>{this.state.array_of_single_campaign.set_priority ? this.state.array_of_single_campaign.set_priority.label:""}</span>
                                                             }
                                                       </div>
                                                        <div className="col-lg-6 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                                            <div className="for_pro_width width_data_cam_1">Type</div>:
                                                            {this.state.isLoadingForSingle ?
                                                            <span style={{ marginLeft: "10px" }}><Skeleton height={22} width={100} /></span>
                                                             :
                                                             <span style={{ marginLeft: "10px" }}>{this.state.array_of_single_campaign.type ? this.state.array_of_single_campaign.type.label:""}</span>
                                                             }
                                                        </div>
                                                        <div className="col-lg-6 col-md-12 col-sm-12 mar_top_new" style={{ display: "inline-flex"}}>
                                                            <div className="for_pro_width width_data_cam">Contact Distribution</div>:
                                                            {this.state.isLoadingForSingle ?
                                                            <span style={{ marginLeft: "10px" }}><Skeleton height={22} width={100} /></span>
                                                             :
                                                             <span style={{ marginLeft: "10px" }}>{this.state.array_of_single_campaign.contact_distribution == "divide_equally" ? "Divide Equally":"One by One"}</span>
                                                             }

                                                        </div>
                                                        <div className="col-lg-6 col-md-12 col-sm-12 mar_top_new" style={{ display: "inline-flex"}}>
                                                            <div className="for_pro_width width_data_cam_1">Status</div>:
                                                            {this.state.isLoadingForSingle ?
                                                            <span style={{ marginLeft: "10px" }}><Skeleton height={22} width={100} /></span>
                                                             :
                                                             <span style={{ marginLeft: "10px" ,textTransform:"capitalize"}}>{this.state.array_of_single_campaign.status}</span>
                                                             }

                                                        </div>
                                                        <div className="col-lg-6 col-md-12 col-sm-12 mar_top_new" style={{ display: "inline-flex"}}>
                                                            <div className="for_pro_width width_data_cam">Manager</div>:
                                                            {this.state.isLoadingForSingle ?
                                                            <span style={{ marginLeft: "10px" }}><Skeleton height={22} width={100} /></span>
                                                             :
                                                             <span style={{ marginLeft: "26px" }}>
                                                             {this.state.array_of_single_campaign.manager ? this.state.array_of_single_campaign.manager.map((v,i)=>{
                                                                     return(
                                                                     <div key={i} style={{display:"list-item"}}>
                                                                         <span>{v.label}</span>
                                                                     </div>
                                                                     )
                                                                 }):""}</span>
                                                             }

                                                        </div>
                                                        <div className="col-lg-6 col-md-12 col-sm-12 mar_top_new" style={{ display: "inline-flex"}}>
                                                            <div className="for_pro_width width_data_cam_1">Telecaller</div>:
                                                            {this.state.isLoadingForSingle ?
                                                            <span style={{ marginLeft: "10px" }}><Skeleton height={22} width={100} /></span>
                                                             :
                                                             <span style={{ marginLeft: "26px" }}>
                                                             {this.state.array_of_single_campaign.users ? this.state.array_of_single_campaign.users.map((v,i)=>{
                                                                     return(
                                                                     <div key={i} style={{display:"list-item"}}>
                                                                         <span>{v.label}</span>
                                                                     </div>
                                                                     )
                                                                 }):""}</span>
                                                             }

                                                        </div>


                                                    </div>
                                                </div>
                                        </div>
                                    </Tabs.Pane>
                                        <Tabs.Pane tabId="home">
                                        <Spinner color="warning" className="employee_spinner_1" style={{ marginTop: gk, display: this.state.spinner_1 }} />
                                         <div className="heading_opeartion test_collapse padding_newww" style={{display: this.state.isLoadingForSingle==false ? "block":"none",padding:"1px"}}>
                                          <div className="box_data_cam mycalendar" style={{height:my_height-91}}>
                                           <div className="test_collapse " style={{display: this.state.spinner_1=="none" ? "block":"none"}}>
                                              <h3 style={{ display: this.state.no_data_for_lead, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:(gk-50)}}>No Data Found</h3>
                                                <div className="" style={{display:this.state.no_data_for_lead == "none" ? "block" : "none"}}>
                                                  <div className="table-responsive-lg scroll_1 test_collapse">
                                                    <Table striped>
                                                                    <thead>
                                                                        <tr>
                                                                            <th scope="col" className="camp_table" style={{borderTop:"none"}}>Name</th>
                                                                            <th scope="col" className="camp_table" style={{borderTop:"none"}}>Contact No</th>
                                                                            <th scope="col" className="camp_table" style={{borderTop:"none"}}>City</th>
                                                                            <th scope="col" className="camp_table" style={{borderTop:"none"}}>Vehicle No</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    {this.state.compaign_lead_array.map((value,index)=>{
                                                                        return(
                                                                        <tr key={index} >
                                                                        <th className="camp_table" scope="row">{value.name}</th>
                                                                        <td className="camp_table" style={{whiteSpace:"nowrap"}}>{value.contact_no}</td>
                                                                        <td className="camp_table">{value.rto_location}</td>
                                                                        <td className="camp_table">{value.vehicle_no}</td>
                                                                    </tr>
                                                                        )
                                                                    })}

                                                                </tbody>
                                                            </Table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                         </div>
                                        </Tabs.Pane>
                                        <Tabs.Pane tabId="profile">
                                        <Spinner color="warning" className="employee_spinner_1" style={{ marginTop: gk, display: this.state.spinner_1 }} />
                                        <div className="heading_opeartion test_collapse padding_newww" style={{display: this.state.isLoadingForSingle==false || this.state.spinner_1=="none" ? "block":"none",padding:"1px"}}>
                                          <div className="box_data_cam mycalendar" style={{height:my_height-91}}>
                                             <div className="test_collapse" style={{marginTop:"16px",display: this.state.isLoadingForSingle==false ? "block":"none"}}>
                                                <h3 style={{ display: this.state.no_data_for_task =="block" || (this.state.compaign_task_today_array == "" && this.state.compaign_task_overdue_array == "" && this.state.compaign_task_upcoming_array == "") ? "block" :"none", padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:(gk-50)}}>No Data Found</h3>
                                                  <div className="" style={{display:this.state.no_data_for_task == "block" || (this.state.compaign_task_today_array == "" && this.state.compaign_task_overdue_array == "" && this.state.compaign_task_upcoming_array == "") ? "none" : "block"}}>
                                                      <h3 className="task_haeding_new" style={{color:"#2fc787"}}>Today</h3>
                                                        <h3 style={{ display:this.state.compaign_task_today_array == "" ? "block" :"none", padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%"}}>No Data Found</h3>
                                                           <div style={{display:this.state.compaign_task_today_array == "" || this.state.compaign_task_today_array == undefined ? "none" : "block"}}>
                                                              <div className="table-responsive-lg scroll_1 test_collapse " style={{marginBottom:"20px"}} >
                                                                <Table striped>
                                                                     <thead>
                                                                        <tr>
                                                                            <th scope="col" className="camp_table" style={{borderTop:"none"}}>Contact Name</th>
                                                                            <th scope="col" className="camp_table" style={{borderTop:"none"}}>Task Title</th>
                                                                            <th scope="col" className="camp_table" style={{borderTop:"none"}}>Follow Up Date</th>
                                                                            <th scope="col" className="camp_table" style={{borderTop:"none"}}>Telecaller Name</th>
                                                                            <th scope="col" className="camp_table" style={{borderTop:"none"}}>Tag</th>
                                                                            <th scope="col" className="camp_table" style={{borderTop:"none"}}>Remark</th>
                                                                            <th scope="col" className="camp_table" style={{borderTop:"none"}}>Status</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    {this.state.compaign_task_today_array.map((value,index)=>{
                                                                        return(
                                                                        <tr key={index} >
                                                                        <th className="camp_table" scope="row">{value.contact_name}</th>
                                                                        <th className="camp_table" scope="row">{value.task_title}</th>
                                                                        <td className="camp_table" style={{whiteSpace:"nowrap"}}>{value.follow_up_date_new.split("-")[2] + "-" + value.follow_up_date_new.split("-")[1] + "-" + value.follow_up_date_new.split("-")[0]}</td>
                                                                        {/* <td className="camp_table" style={{whiteSpace:"nowrap"}}>{dateFormat(new Date(value.follow_up_date.replace("Z", "")), "dd-mm-yyyy")}</td> */}
                                                                        <td className="camp_table">{value.telecaller_name}</td>
                                                                        <td className="camp_table">{value.tags.label ? value.tags.label :""}</td>
                                                                        <td className="camp_table">{value.remark}</td>
                                                                        <td className="camp_table" >{value.status == undefined ? "Incomplete" : value.status}</td>
                                                                    </tr>
                                                                        )
                                                                    })}

                                                                </tbody>
                                                            </Table>
                                                        </div>
                                                    </div>

                                                      <h3 className="task_haeding_new" style={{color:"#ef5164"}}>OverDue</h3>
                                                      <h3 style={{ display:this.state.compaign_task_overdue_array == "" ? "block" :"none", padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%"}}>No Data Found</h3>
                                                       <div style={{display:this.state.compaign_task_overdue_array == "" || this.state.compaign_task_overdue_array == undefined ? "none" : "block"}}>
                                                        <div className="table-responsive-lg scroll_1 test_collapse " style={{marginBottom:"20px"}} >
                                                         <Table striped>
                                                                    <thead>
                                                                        <tr>
                                                                            <th scope="col" className="camp_table" style={{borderTop:"none"}}>Contact Name</th>
                                                                            <th scope="col" className="camp_table" style={{borderTop:"none"}}>Task Title</th>
                                                                            <th scope="col" className="camp_table" style={{borderTop:"none"}}>Follow Up Date</th>
                                                                            <th scope="col" className="camp_table" style={{borderTop:"none"}}>Telecaller Name</th>
                                                                            <th scope="col" className="camp_table" style={{borderTop:"none"}}>Tag</th>
                                                                            <th scope="col" className="camp_table" style={{borderTop:"none"}}>Remark</th>
                                                                            <th scope="col" className="camp_table" style={{borderTop:"none"}}>Status</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    {this.state.compaign_task_overdue_array.map((value,index)=>{
                                                                        return(
                                                                        <tr key={index} >
                                                                        <th className="camp_table" scope="row">{value.contact_name}</th>
                                                                        <th className="camp_table" scope="row">{value.task_title}</th>
                                                                        {/* <td className="camp_table" style={{whiteSpace:"nowrap"}}>{dateFormat(new Date(value.follow_up_date.replace("T", "")), "dd-mm-yyyy")}</td> */}
                                                                        <td className="camp_table" style={{whiteSpace:"nowrap"}}>{value.follow_up_date_new.split("-")[2] + "-" + value.follow_up_date_new.split("-")[1] + "-" + value.follow_up_date_new.split("-")[0]}</td>
                                                                        <td className="camp_table">{value.telecaller_name}</td>
                                                                        <td className="camp_table">{value.tags.label ? value.tags.label : ""}</td>
                                                                        <td className="camp_table">{value.remark}</td>
                                                                        <td className="camp_table" >{value.status == undefined ? "Incomplete" : value.status}</td>
                                                                    </tr>
                                                                        )
                                                                    })}

                                                                </tbody>
                                                            </Table>
                                                        </div>
                                                    </div>

                                                      <h3 className="task_haeding_new" style={{color:"#007bff"}}>Upcoming</h3>
                                                      <h3 style={{ display:this.state.compaign_task_upcoming_array == "" ? "block" :"none", padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%"}}>No Data Found</h3>
                                                      <div style={{display:this.state.compaign_task_upcoming_array == "" || this.state.compaign_task_upcoming_array == undefined ? "none" : "block"}}>
                                                      <div className="table-responsive-lg scroll_1 test_collapse " style={{marginBottom:"20px"}} >
                                                       <Table striped>
                                                                    <thead>
                                                                        <tr>
                                                                            <th scope="col" className="camp_table" style={{borderTop:"none"}}>Contact Name</th>
                                                                            <th scope="col" className="camp_table" style={{borderTop:"none"}}>Task Title</th>
                                                                            <th scope="col" className="camp_table" style={{borderTop:"none"}}>Follow Up Date</th>
                                                                            <th scope="col" className="camp_table" style={{borderTop:"none"}}>Telecaller Name</th>
                                                                            <th scope="col" className="camp_table" style={{borderTop:"none"}}>Tag</th>
                                                                            <th scope="col" className="camp_table" style={{borderTop:"none"}}>Remark</th>
                                                                            <th scope="col" className="camp_table" style={{borderTop:"none"}}>Status</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    {this.state.compaign_task_upcoming_array.map((value,index)=>{
                                                                        return(
                                                                        <tr key={index} >
                                                                        <th className="camp_table" scope="row">{value.contact_name}</th>
                                                                        <th className="camp_table" scope="row">{value.task_title}</th>
                                                                        {/* <td className="camp_table" style={{whiteSpace:"nowrap"}}>{dateFormat(new Date(value.follow_up_date.replace("Z", "")), "dd-mm-yyyy")}</td> */}
                                                                        <td className="camp_table" style={{whiteSpace:"nowrap"}}>{value.follow_up_date_new.split("-")[2] + "-" + value.follow_up_date_new.split("-")[1] + "-" + value.follow_up_date_new.split("-")[0]}</td>
                                                                        <td className="camp_table">{value.telecaller_name}</td>
                                                                        <td className="camp_table">{value.tags.label ? value.tags.label : ""}</td>
                                                                        <td className="camp_table">{value.remark}</td>
                                                                        <td className="camp_table" >{value.status == undefined ? "Incomplete" : value.status}</td>
                                                                    </tr>
                                                                        )
                                                                    })}

                                                                </tbody>
                                                            </Table>
                                                        </div>
                                                    </div>
                                                    </div>
                                                 </div>
                                              </div>
                                         </div>
                                        </Tabs.Pane>
                                        <Tabs.Pane tabId="contact">
                                        <Spinner color="warning" className="employee_spinner_1" style={{ marginTop: gk, display: this.state.spinner_1 }} />

                                          <div className=" test_collapse heading_opeartion" style={{display: this.state.isLoadingForSingle==false ? "block":"none",paddingLeft:"6px",paddingRight:"26px"}}>

                                          {/* <div className="row test_collapse border_padd">
                                              <div className="col-lg-6 col-md-6" style={{paddingRight:"2px"}}>
                                              <Typeahead
                                                  id="basic-typeahead"
                                                  onChange={this.handleSelectionTaskkkk}
                                                  onInputChange={this.fetch_telecaller_typeahead}
                                                  options={this.state.telecaller_typeahead} // Replace [...] with your array of options
                                                  selected={this.state.search_by_telicller}
                                                  placeholder="Search Telecaller"
                                                  />
                                              </div>

                                              <div className="col-lg-6 col-md-6" style={{paddingRight:"2px",paddingLeft:"2px"}}>
                                              <div className="date_pickerrr">
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
                                                                  this.fetch_campaign_call_logs(this.state.campaign_id,this.state.search_by_telicller,startDate,endDate)
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

                                          </div> */}
                                          <div id="scrollContainer" aria-hidden="true" onScroll={this.handleScroll} className="box_data_cam mycalendar" style={{height:my_height-89}}>
                                         <h3 style={{ display: this.state.no_data_for_Call, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:(gk-50)}}>No Data Found</h3>
                                              <div className=""  style={{display:this.state.no_data_for_Call == "none" ? "block" : "none"}}>

                                              <div className="table-responsive-lg scroll_1 test_collapse " >
                                                  <Table striped>
                                                                  <thead>
                                                                      <tr>
                                                                          <th scope="col" className="camp_table" style={{borderTop:"none"}}>Contact Name</th>
                                                                          <th scope="col" className="camp_table" style={{borderTop:"none"}}>Call Type</th>
                                                                          <th scope="col" className="camp_table" style={{borderTop:"none"}}>Telecaller Name</th>
                                                                          <th scope="col" className="camp_table" style={{borderTop:"none"}}>Start Date and Time</th>
                                                                          <th scope="col" className="camp_table" style={{borderTop:"none"}}>Remark</th>
                                                                          <th scope="col" className="camp_table" style={{borderTop:"none"}}>Not Connected Reason</th>
                                                                      </tr>
                                                                  </thead>
                                                                  <tbody>
                                                                  {this.state.compaign_Call_array.map((value,index)=>{
                                                                      return(
                                                                      <tr key={index} >
                                                                      <th className="camp_table" scope="row">{value.contact_name}</th>
                                                                      <th className="camp_table" scope="row">{value.call_type == "not_connected" ? "Not Connected" : "Connected"}</th>
                                                                      <th className="camp_table" scope="row">{value.telecaller_name}</th>
                                                                      <td className="camp_table" style={{whiteSpace:"nowrap"}}>
                                                                      <div>{value.start_time == "" || value.start_time == null ? "" : dateFormat(new Date(value.start_time.replace("Z", "")), "dd-mm-yyyy")}</div>
                                                                      <div className="time_data_new">{value.start_time == "" ? "" : value.start_time_new}</div>
                                                                      </td>
                                                                      <th className="camp_table" scope="row">{value.remark}</th>
                                                                      <th className="camp_table" scope="row">{value.not_connected_reason}</th>
                                                                  </tr>
                                                                      )
                                                                  })}

                                                              </tbody>
                                                          </Table>
                                                      </div>
                                                      <Spinner color="warning" className="data_indicatorr" style={{  display: this.state.data_spinner }} />

                                              </div>
                                              </div>
                                       </div>
                                        </Tabs.Pane>

                                        <Tabs.Pane tabId="insights">

                                        <div className="heading_opeartion padding_newww" style={{padding:"9px"}}>
                                                <div className=" mycalendar" style={{height:my_height-107,padding:"3px 10px"}}>
                                                    <div className="row">
                                                        <div className="col-lg-6">

                                                        <div className="hole_border_1 new_height_for_in">
                                                    <div className="show_status_data_new" style={{marginTop:"4px"}}>
                                                       <h3>Contact Stats Insights</h3>
                                                       {/* <div style={{display:"grid"}}> */}

                                                     {/* </div> */}
                                                    </div>

                                                    <h3 style={{ display: this.state.open_contact == 0 && this.state.inprocess_contact == 0 && this.state.closed_contact == 0 ? "block" : "none", padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:"80px",height:"57px"}}>No Data Found</h3>
                                                    <div style={{display :this.state.open_contact == 0 && this.state.inprocess_contact == 0 && this.state.closed_contact == 0 ? "none" : "block" }}>
                                                    <div className={this.state.isLoadingStatus == true ? "row": "row fixedUINew"}>
                                                       <div className="col-lg-12 col-md-12">
                                                        <div className="chartContainer_1" style={{display: this.state.open_contact == 0 && this.state.inprocess_contact == 0 && this.state.closed_contact == 0 ? "none" : "block"}}>
                                                            <Pie
                                                                style={{width:"250px",height:"250px"}}
                                                                height={250} width={250}
                                                                data={payment_data}
                                                                options={options_payment}
                                                            />
                                                        </div>
                                                      </div>
                                                      <div className="col-lg-12 col-md-12 alignSelfInline showDataNew122">
                                                         <div className="" >
                                                         <div className="dataNew"  style={{display:"inline-flex"}}>
                                                            <div style={{width:"40px"}}>Total</div>:
                                                            <span style={{marginLeft:"10px",color:"#22A699",fontWeight: "500"}}>{this.state.total_contact}</span>
                                                            </div>
                                                            <div className="dataNew"  style={{display:"inline-flex"}}>
                                                            <div style={{width:"40px"}}>Open</div>:
                                                            <span style={{marginLeft:"10px",color:"#F2BE22",fontWeight: "500"}}>{this.state.open_contact}</span>
                                                            </div>
                                                            <div className="dataNew"  style={{display:"inline-flex"}}>
                                                            <div style={{width:"72px"}}>In Process</div>:
                                                            <span style={{marginLeft:"10px",color:"#F29727",fontWeight: "500"}}>{this.state.inprocess_contact}</span>
                                                            </div>
                                                            <div className="dataNew"  style={{display:"inline-flex"}}>
                                                            <div style={{width:"54px"}}>Closed</div>:
                                                            <span style={{marginLeft:"10px",color:"#F24C3D",fontWeight: "500"}}>{this.state.closed_contact}</span>
                                                            </div>
                                                         </div>
                                                      </div>
                                                     </div>
                                                    </div>

                                                      </div>

                                                        </div>
                                                        <div className="col-lg-6">


                                                  <div className="hole_border_1 new_height_for_in">
                                                    <div className="show_status_data_new" style={{marginTop:"4px"}}>
                                                       <h3>Ongoing Stats Insights</h3>
                                                    </div>

                                                    <h3 style={{ display: this.state.called_ongoing == 0 && this.state.follow_up_ongoing == 0 && this.state.others_ongoing == 0 ? "block" : "none", padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:"80px"}}>No Data Found</h3>
                                                      <div style={{display :this.state.called_ongoing == 0 && this.state.follow_up_ongoing == 0 && this.state.others_ongoing == 0 ? "none" : "block" }}>
                                                        <div className={"row fixedUINew"}>
                                                         <div className="col-lg-12 col-md-12">
                                                         <div className="chartContainer_1" style={{display: this.state.called_ongoing == 0 && this.state.follow_up_ongoing == 0 && this.state.others_ongoing == 0 ? "none" : "block"}}>
                                                            <Pie
                                                                style={{width:"250px",height:"250px"}}
                                                                height={250} width={250}
                                                                data={onging_calss}
                                                                options={options_onging_calss}
                                                            />
                                                        </div>
                                                            {/* <div style={{width:"50%"}}>
                                                            </div>
                                                           <div className="show_tooltip_new" >
                                                            <div className={this.state.showTooltip == true ? "tooltiptext"  : ""} style={{visibility:this.state.showTooltip == true ? "visible"  : "hidden"}}>
                                                                <span>Not Connected, Incorrect / Invalid number /
                                                                        Number not in use / does not exists / out of service.</span>
                                                                </div>
                                                            </div> */}
                                                         </div>
                                                         <div className="col-lg-12 col-md-12 alignSelfInline showDataNew122">
                                                             <div >
                                                                    <div className="dataNew" style={{display:"inline-flex"}}>
                                                                        <div style={{width:"50px"}}>Total</div>:
                                                                        <span style={{marginLeft:"10px",color:"#33F6FF",fontWeight: "500"}}>{this.state.total_ongoing}</span>
                                                                    </div>
                                                                    <div className="dataNew"  style={{display:"inline-flex"}}>
                                                                        <div style={{width:"50px"}}>Called</div>:
                                                                        <span style={{marginLeft:"10px",color:"#3383FF",fontWeight: "500"}}>{this.state.called_ongoing}</span>
                                                                    </div>
                                                                    <div className="dataNew"  style={{display:"inline-flex"}}>
                                                                        <div style={{width:"70px"}}>Follow up</div>:
                                                                        <span style={{marginLeft:"10px",color:"#FF0036",fontWeight: "500"}}>{this.state.follow_up_ongoing}</span>
                                                                    </div>
                                                                    <div className="dataNew"  style={{display:"inline-flex"}}>
                                                                        <div style={{width:"50px"}}>Others</div>:
                                                                        <span style={{marginLeft:"10px",color:"#770000",fontWeight: "500"}}>{this.state.others_ongoing}</span>
                                                                    </div>
                                                             </div>
                                                         </div>
                                                     </div>
                                                     </div>


                                                      </div>

                                                        </div>


                                                      {/* <hr className="hr_newww" style={{marginTop:" 10px"}}/> */}



                                                      {/* <hr className="hr_newww" style={{marginTop:" 10px"}}/> */}

                                                      <div className="col-lg-6">

                                                    <div className="hole_border_1 new_height_for_in" style={{marginTop:" 10px"}}>

                                                    <div className="show_status_data_new" style={{marginTop:"4px"}}>
                                                       <h3>Closed Stats Insights</h3>
                                                     </div>


                                                     <h3 style={{ display: this.state.converted_closed == 0 && this.state.lost_closed == 0 ? "block" : "none", padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:"80px"}}>No Data Found</h3>

                                                     <div style={{display :this.state.converted_closed == 0 && this.state.lost_closed == 0  ? "none" : "block" }}>
                                                        <div className={"row fixedUINew"}>
                                                            <div className="col-lg-12 col-md-12">
                                                            <div className="chartContainer_1" style={{display: this.state.converted_closed == 0 && this.state.lost_closed == 0  ? "none" : "block"}}>
                                                                    <Pie
                                                                        style={{width:"250px",height:"250px"}}
                                                                        height={250} width={250}
                                                                        data={closed_data}
                                                                        options={options_closed}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12 col-md-12 alignSelfInline showDataNew122">
                                                                <div className="" >
                                                                <div className="dataNew"  style={{display:"inline-flex"}}>
                                                                    <div style={{width:"43px"}}>Total</div>:
                                                                    <span style={{marginLeft:"10px",color:"#5F264A",fontWeight: "500"}}>{this.state.total_closed}</span>
                                                                    </div>
                                                                    <div className="dataNew"  style={{display:"inline-flex"}}>
                                                                    <div style={{width:"75px"}}>Converted</div>:
                                                                    <span style={{marginLeft:"10px",color:"#0A4D68",fontWeight: "500"}}>{this.state.converted_closed}</span>
                                                                    </div>
                                                                    <div className="dataNew"  style={{display:"inline-flex"}}>
                                                                    <div style={{width:"34px"}}>Lost</div>:
                                                                    <span style={{marginLeft:"10px",color:"#F45050",fontWeight: "500"}}>{this.state.lost_closed}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                     </div>
                                                     </div>
                                                     </div>
                                             </div>
                                                  {/* <hr className="hr_newww" style={{marginTop:" 10px"}}/> */}
                                                    <div className="hole_border_1" style={{marginTop:" 10px"}}>
                                                    <div style={{marginTop:"4px"}}>
                                                    <div className="row marBottomNre">
                                                        <div className="col-lg-6">
                                                            <h3>Telecaller Stats Insights</h3>
                                                        </div>
                                                        <div className="col-lg-6 showInlineNew">
                                                            <div className="yearPickerTele">
                                                            <DatePicker
                                                                    selected={this.state.telecallerDateYear}
                                                                    onChange={(val) => {
                                                                        this.setState({
                                                                            telecallerDateYear: val,
                                                                            telecallerDateDay:undefined
                                                                        });
                                                                        this.telecaller_daily_stats_report(val,undefined, this.state.telecaller_id)
                                                                        //console.log(val);
                                                                    }}
                                                                    dateFormat="MM-yyyy"
                                                                    showMonthYearPicker
                                                                    className="rui-datetimepicker form-control w-auto_12 search_1 "
                                                                    calendarClassName="tren-pembayaran__wrapper__datepicker"
                                                                    placeholder="Select Month"
                                                                    placeholderText={'Select Month'}

                                                                />
                                                                </div>
                                                            <div className="DatePickerTele">
                                                            <DatePicker
                                                                    selected={ this.state.telecallerDateDay }
                                                                    onChange={ ( val ) => {
                                                                        this.setState( {
                                                                            telecallerDateDay: val,
                                                                            telecallerDateYear:undefined
                                                                        } );
                                                                        this.telecaller_daily_stats_report(undefined,val,this.state.telecaller_id)
                                                                    } }
                                                                    placeholder="Select Date"
                                                                    dateFormat="dd-MM-yyyy"
                                                                    className="rui-datetimepicker form-control "
                                                                    placeholderText={'Select Date'}
                                                                />
                                                            </div>
                                                       </div>
                                                    </div>
                                                    </div>

                                                    <div className="showTelecallerList">
                                                    <div className="grupNewTelecaler scroll_1">
                                                        <ButtonGroup className="telecallerBtnGrup">
                                                            {this.state.telecaller_array_new.map((val,index)=>{
                                                                return(
                                                                    <Button key={index} color="primary" outline style={{backgroundColor:this.state.telecaller_id==val.value ? "#007bff" : "", color:this.state.telecaller_id==val.value ? "#fff" : "",borderColor:this.state.telecaller_id==val.value ? "#007bff" : ""}}
                                                                    onClick={() => {
                                                                                    this.setState({
                                                                                        telecaller_id:val.value,
                                                                                        telecallerName:val.label,
                                                                                        // telecallerDateDay:"",
                                                                                        // telecallerDateYear:"",
                                                                                    })
                                                                                    this.telecaller_daily_stats_report(this.state.telecallerDateYear,this.state.telecallerDateDay,val.value)
                                                                                }}
                                                                                >{val.label}</Button>
                                                                )
                                                            })}

                                                        </ButtonGroup>
                                                        </div>
                                                    </div>

                                                    <Bar data={data_bar_quality} options={optionsTelecaller} />

                                                </div>
                                                </div>
                                         </div>
                                        </Tabs.Pane>
                                    </Tabs.Content>
                             </div>

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
                        className={ this.props.className,"modal-dialog-centered  modalCam" }
                        fade
                    >
                        <div className="modal-header">
                            <h5 className="modal-title h2">Add Campaign</h5>
                            <Button className="close" color="" onClick={ this.toggle }>
                                <Icon name="x" />
                            </Button>
                        </div>
                        <ModalBody style={{paddingBottom:"2px"}}>
                           <div className="row">
                               <div className="col-lg-6 col-md-6 top_spacee">
                               <Label className="llllllll_label" htmlFor="inputText">Name<span className="start_mark_new">*</span></Label>
                                    <Input invalid={this.state.borderNew && this.state.name == "" ? true :false} value={this.state.name} placeholder="Name"
                                      className="text_tttttt"
                                     type="text"
                                     onChange={(e)=>{
                                      this.setState({
                                        name:e.target.value,
                                        camaign_error:""
                                      })
                                    }}
                                    />
                               </div>
                               <div className="col-lg-6 col-md-6 top_spacee select_option">
                               <Label className="llllllll_label" htmlFor="inputText">Campaign Type<span className="start_mark_new">*</span></Label>
                                  <Select
                                        value = {this.state.cam_type}
                                        onChange={(e) => {
                                            //////console.log(e, "Val.....")
                                            this.setState({
                                                cam_type: e,
                                                camaign_error:""
                                            });
                                        }}
                                        className={this.state.borderNew && this.state.cam_type == "" ?  "is_not_valid" : "contact_sort"}
                                        options={ campaigne_array }
                                        styles={ customStyles }
                                        menuPosition={'fixed'}
                                        invalid={this.state.borderNew && this.state.cam_type == "" ? true :false}
                                        placeholder="Campaign Type"
                            />
                               </div>


                               <div className={"col-lg-6 col-md-6  top_spacee typeahead_label"}>
                               <Label className="llllllll_label" htmlFor="inputText">Manager<span className="start_mark_new">*</span></Label>

                                <Typeahead
                                    id="basic-typeahead-multiple"
                                    multiple
                                    onChange={this.handleSelection}
                                    onInputChange={this.fetch_manager_typeahead}
                                    options={this.state.manager_typeahead} // Replace [...] with your array of options
                                    selected={this.state.selectedOptions}
                                    placeholder="Select Manager"
                                    invalid={this.state.borderNew && this.state.selectedOptions == "" ? true :false}
                                    className={this.state.borderNew && this.state.selectedOptions == "" ?"manager_select_new" :""}
                                    />

                               </div>
                               <div className={"col-lg-6 col-md-6 top_spacee typeahead_label"}>
                               <Label className="llllllll_label" htmlFor="inputText">Telecaller<span className="start_mark_new">*</span></Label>
                                <Typeahead
                                    id="basic-typeahead-multiple"
                                    multiple
                                    onChange={this.handleSelectionType}
                                    onInputChange={this.fetch_telecaller_typeahead}
                                    options={this.state.telecaller_typeahead} // Replace [...] with your array of options
                                    selected={this.state.selectedOptionsType}
                                    placeholder="Select Telecaller"
                                    className={this.state.borderNew && this.state.selectedOptionsType == "" ?"manager_select_new" :""}

                                    />


                               </div>


                               <div className="col-lg-6 col-md-6 top_spacee select_option">
                               <Label className="llllllll_label" htmlFor="inputText">Add Contacts<span className="start_mark_new">*</span></Label>
                                 <Select
                                    isMulti
                                    options={array_of_excel}
                                    value={this.state.add_contacts}
                                    onChange={(e)=>{
                                        this.setState({
                                            add_contacts:e,
                                            camaign_error:""
                                        })
                                    }}
                                    styles={customStyles} // Apply the custom styles
                                    placeholder="Add Contacts"
                                    className={this.state.borderNew && this.state.add_contacts == "" ?  "is_not_valid" : "contact_sort"}
                                />
                               </div>


                               <div className="col-lg-6 col-md-6 top_spacee select_option" >
                               <Label className="llllllll_label" htmlFor="inputText">Priorities<span className="start_mark_new">*</span></Label>
                                  <Select
                                        value = {this.state.set_priorities}
                                        onChange={(e) => {
                                            //////console.log(e, "Val.....")
                                            this.setState({
                                                set_priorities: e,
                                                camaign_error:""
                                            });
                                        }}
                                        className={this.state.borderNew && this.state.set_priorities == "" ?  "is_not_valid" : "contact_sort"}
                                        options={ priority_array }
                                        styles={ customStyles }
                                        menuPosition={'fixed'}
                                        placeholder="Priorities"
                                        invalid={this.state.borderNew && this.state.set_priorities == "" ? true :false}
                            />


                               </div>
                               <div className="col-lg-6 col-md-6 top_spacee" >
                               <Label className="llllllll_label" htmlFor="inputText">Contacts Distribution<span className="start_mark_new">*</span></Label>
                               <div style={{display:"inline-flex",width:"100%"}}>
                               <CustomInput type="radio" invalid={this.state.borderNew && this.state.contact_distribution == "" ? true :false} id="formRadio1" name="formRadio" label="One by one" onClick={()=>{this.setState({contact_distribution:"one_by_one"})}} />
                               <div style={{marginLeft:"22px"}}>
                               <CustomInput type="radio" invalid={this.state.borderNew && this.state.contact_distribution == "" ? true :false} id="formRadio2" name="formRadio" label="Divide equally" onClick={()=>{this.setState({contact_distribution:"divide_equally"})}}/></div>
                               </div>
                              </div>
                               <div className="col-lg-12 col-md-12" >
                               <p style={{color:"red",marginBottom:"0px",marginTop:"10px",textAlign:"center"}}>{this.state.camaign_error}</p>
                              </div>
                           </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={ this.toggle }>Close</Button>
                            { ' ' }
                            <Button  disabled={this.state.campaign_control == "false" ? 'disabled' : '' || this.state.loading} color="warning" style={{color:"#fff"}} onClick={()=> this.add_campaign_details() }>Save  {this.state.loading ?  (
                                 <Spinner />
                               ):"" }</Button>
                        </ModalFooter>
                    </Modal>


                    {/* Telecaller Model */}
              <Modal
                        isOpen={ this.state.modalOpenTelecaller }
                        toggle={ this.toggleTelecaller }
                        className={ this.props.className,"modal-dialog-centered  modelTelecaller" }
                        fade
                    >
                        <div className="modal-header">
                            <h5 className="modal-title h2">{this.state.telecallerName} Stats Details</h5>
                            <Button className="close" color="" onClick={ this.toggleTelecaller }>
                                <Icon name="x" />
                            </Button>
                        </div>
                        <ModalBody>
                        <div className="allStatsOfTelecaller">
                            <div className="leadStats">

                                <div className="accordion-group">
                                    { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
                                   <a
                                       href="#"
                                       style={{fontSize:"18px"}}
                                       className="collapse-link telcallerLink"
                                       onClick={ ( e ) => {
                                           e.preventDefault();
                                           this.setState( {
                                               activeAccordion: activeAccordion === 1 ? 0 : 1,
                                           } );
                                       } }
                                   >
                                       <div className="headingEditTelecaller">
                                          Lead
                                           <div className="telecallerIcon">
                                               <Icon name="chevron-down" style={{display : activeAccordion ===1 ? "none" : "block" }} />
                                               <Icon name="chevron-up" style={{display : activeAccordion ===1 ? "block" : "none" }} />
                                           </div>
                                       </div>
                                   </a>
                                   <Collapse isOpen={ 1 === activeAccordion }>
                                      <div className="collapse-content new-coll-accordian">
                                      <h4 style={{ display: this.state.lead_data == "" ? "block" : "none", padding: "4px",color:" #a4a3a3",width: "100%"}}>No Data Found</h4>
                                          <div className="" style={{display: this.state.lead_data == "" ? "none" : "block"}}>
                                                  <div className="table-responsive-lg scroll_1 test_collapse " >
                                                      <Table striped>
                                                          <thead>
                                                              <tr>
                                                              <th scope="col" className="camp_table" style={{borderTop:"none"}}>Contact Name</th>
                                                              <th scope="col" className="camp_table" style={{borderTop:"none"}}>Time</th>
                                                              </tr>
                                                              </thead>
                                                              <tbody>
                                                                  {this.state.lead_data.map((value,index)=>{
                                                                  return(
                                                                  <tr key={index} >
                                                                  <th className="camp_table" scope="row">{value.contact_name}</th>
                                                                  <td className="camp_table" style={{whiteSpace:"nowrap"}}>{value.lead_time}</td>
                                                                  </tr>
                                                                  )
                                                              })}

                                                                    </tbody>
                                                            </Table>
                                                      </div>
                                              </div>
                                          </div>
                                   </Collapse>
                                  </div>








                             {/* <h3 className="headingTelecaller">Lead</h3> */}

                                </div>
                                <div className="lostStats">
                                {/* <h3 className="headingTelecaller">Lost</h3> */}



                                      <div className="accordion-group">
                                    { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
                                   <a
                                       href="#"
                                       style={{fontSize:"18px"}}
                                       className="collapse-link telcallerLink"
                                       onClick={ ( e ) => {
                                           e.preventDefault();
                                           this.setState( {
                                               activeAccordion: activeAccordion === 2 ? 0 : 2,
                                           } );
                                       } }
                                   >
                                       <div className="headingEditTelecaller">
                                          Lost
                                           <div className="telecallerIcon">
                                               <Icon name="chevron-down" style={{display : activeAccordion === 2 ? "none" : "block" }} />
                                               <Icon name="chevron-up" style={{display : activeAccordion === 2 ? "block" : "none" }} />
                                           </div>
                                       </div>
                                   </a>
                                   <Collapse isOpen={ 2 === activeAccordion }>
                                      <div className="collapse-content new-coll-accordian">
                                      <h4 style={{ display: this.state.lost_data == "" ? "block" : "none", padding: "4px",color:" #a4a3a3",width: "100%"}}>No Data Found</h4>
                                          <div className="" style={{display: this.state.lost_data == "" ? "none" : "block"}}>
                                                <div className="table-responsive-lg scroll_1 test_collapse " >
                                                    <Table striped>
                                                           <thead>
                                                              <tr>
                                                              <th scope="col" className="camp_table" style={{borderTop:"none"}}>Contact Name</th>
                                                              <th scope="col" className="camp_table" style={{borderTop:"none"}}>Time</th>
                                                             </tr>
                                                              </thead>
                                                               <tbody>
                                                                 {this.state.lost_data.map((value,index)=>{
                                                                 return(
                                                                   <tr key={index} >
                                                                   <th className="camp_table" scope="row">{value.contact_name}</th>
                                                                   <td className="camp_table" style={{whiteSpace:"nowrap"}}>{value.lost_time}</td>
                                                                  </tr>
                                                                   )
                                                               })}

                                                           </tbody>
                                                   </Table>
                                            </div>
                                      </div>
                                          </div>
                                   </Collapse>
                                  </div>
                                </div>
                                <div className="ConnectedStats">
                                {/* <h3 className="headingTelecaller">Connected</h3> */}




                                      <div className="accordion-group">
                                    { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
                                   <a
                                       href="#"
                                       style={{fontSize:"18px"}}
                                       className="collapse-link telcallerLink"
                                       onClick={ ( e ) => {
                                           e.preventDefault();
                                           this.setState( {
                                               activeAccordion: activeAccordion === 3 ? 0 : 3,
                                           } );
                                       } }
                                   >
                                       <div className="headingEditTelecaller">
                                       Connected
                                           <div className="telecallerIcon">
                                               <Icon name="chevron-down" style={{display : activeAccordion ===3 ? "none" : "block" }} />
                                               <Icon name="chevron-up" style={{display : activeAccordion ===3 ? "block" : "none" }} />
                                           </div>
                                       </div>
                                   </a>
                                   <Collapse isOpen={ 3 === activeAccordion }>
                                      <div className="collapse-content new-coll-accordian">
                                      <h4 style={{ display: this.state.connected_data == "" ? "block" : "none", padding: "4px",color:" #a4a3a3",width: "100%"}}>No Data Found</h4>
                                          <div className="" style={{display: this.state.connected_data == "" ? "none" : "block"}}>
                                                <div className="table-responsive-lg scroll_1 test_collapse " >
                                                    <Table striped>
                                                           <thead>
                                                              <tr>
                                                              <th scope="col" className="camp_table" style={{borderTop:"none"}}>Contact Name</th>
                                                              <th scope="col" className="camp_table" style={{borderTop:"none"}}>Start Called Time</th>
                                                              <th scope="col" className="camp_table" style={{borderTop:"none"}}>Total Called Time</th>
                                                             </tr>
                                                              </thead>
                                                               <tbody>
                                                                 {this.state.connected_data.map((value,index)=>{
                                                                 return(
                                                                   <tr key={index} >
                                                                   <th className="camp_table" scope="row">{value.contact_name}</th>
                                                                   <td className="camp_table" style={{whiteSpace:"nowrap"}}>{value.start_time}</td>
                                                                   <td className="camp_table" style={{whiteSpace:"nowrap"}}>{value.total_call_time}</td>
                                                                  </tr>
                                                                   )
                                                               })}

                                                           </tbody>
                                                   </Table>
                                            </div>
                                      </div>
                                          </div>
                                   </Collapse>
                                  </div>
                                </div>
                                <div className="noConnectedStats">
                                {/* <h3 className="headingTelecaller">Not Connected</h3> */}




                                      <div className="accordion-group">
                                    { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
                                   <a
                                       href="#"
                                       style={{fontSize:"18px"}}
                                       className="collapse-link telcallerLink"
                                       onClick={ ( e ) => {
                                           e.preventDefault();
                                           this.setState( {
                                               activeAccordion: activeAccordion === 4 ? 0 : 4,
                                           } );
                                       } }
                                   >
                                       <div className="headingEditTelecaller">
                                       Not Connected
                                           <div className="telecallerIcon">
                                               <Icon name="chevron-down" style={{display : activeAccordion ===4 ? "none" : "block" }} />
                                               <Icon name="chevron-up" style={{display : activeAccordion ===4 ? "block" : "none" }} />
                                           </div>
                                       </div>
                                   </a>
                                   <Collapse isOpen={ 4 === activeAccordion }>
                                      <div className="collapse-content new-coll-accordian">
                                      <h4 style={{ display: this.state.not_connected_data == "" ? "block" : "none", padding: "4px",color:" #a4a3a3",width: "100%"}}>No Data Found</h4>
                                          <div className="" style={{display: this.state.not_connected_data == "" ? "none" : "block"}}>
                                                <div className="table-responsive-lg scroll_1 test_collapse " >
                                                    <Table striped>
                                                         <thead>
                                                              <tr>
                                                              <th scope="col" className="camp_table" style={{borderTop:"none"}}>Contact Name</th>
                                                              <th scope="col" className="camp_table" style={{borderTop:"none"}}>Start Called Time</th>
                                                              <th scope="col" className="camp_table" style={{borderTop:"none"}}>Not Connected Reason</th>
                                                             </tr>
                                                              </thead>
                                                               <tbody>
                                                                 {this.state.not_connected_data.map((value,index)=>{
                                                                 return(
                                                                   <tr key={index} >
                                                                   <th className="camp_table" scope="row">{value.contact_name}</th>
                                                                   <td className="camp_table" style={{whiteSpace:"nowrap"}}>{value.start_time}</td>
                                                                   <td className="camp_table" style={{whiteSpace:"nowrap"}}>{value.not_connected_reason}</td>
                                                                  </tr>
                                                                   )
                                                               })}

                                                           </tbody>
                                                   </Table>
                                              </div>
                                           </div>
                                          </div>
                                   </Collapse>
                                  </div>
                                </div>
                           </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={ this.toggleTelecaller }>Close</Button>
                            { ' ' }
                            {/* <Button  disabled={this.state.campaign_control == "false" ? 'disabled' : ''} color="warning" style={{color:"#fff"}} onClick={()=> this.add_campaign_details() }>Save</Button> */}
                        </ModalFooter>
                    </Modal>






              <Modal
                        isOpen={ this.state.model_for_graph }
                        toggle={ this.model_for_graph }
                        className={ this.props.className,"modal-dialog-centered  modalCam_122" }
                        fade
                    >
                        <div className="modal-header">
                            <h5 className="modal-title h2">Show All Graph</h5>
                            <Button className="close" color="" onClick={ this.toggle }>
                                <Icon name="x" />
                            </Button>
                        </div>
                        <ModalBody style={{paddingBottom:"2px"}}>
                        <div className="heading_opeartion padding_newww" style={{padding:"1px"}}>
                           <div className="box_data_cam mycalendar" style={{height:my_height-91,padding:"15px 20px"}}>



                                <div className="hole_border_1 new_height_for_in">
                             <div className="show_status_data_new" style={{marginTop:"4px"}}>
                                   <h3> Contacts Insights</h3>
                                   {/* <div style={{display:"grid"}}> */}
                                       <div className="dataNew"  style={{display:"inline-flex"}}>
                                       <div style={{width:"110px"}}>Total Contacts</div>:
                                       <span style={{marginLeft:"10px",color:"#FF8400",fontWeight: "500"}}>{this.state.total_total_contact}</span>
                                      </div>
                                       <div className="dataNew"  style={{display:"inline-flex"}}>
                                       <div style={{width:"110px"}}>Used Contact</div>:
                                       <span style={{marginLeft:"10px",color:"#1B9C85",fontWeight: "500"}}>{this.state.all_conacts_array[0]}</span>
                                      </div>
                                       <div className="dataNew"  style={{display:"inline-flex"}}>
                                       <div style={{width:"110px"}}>Unused Contact</div>:
                                       <span style={{marginLeft:"10px",color:"#D71313",fontWeight: "500"}}>{this.state.all_conacts_array[1]}</span>
                                      </div>
                                  {/* </div> */}
                              </div>
                                  {this.state.isLoadingcontcts ?
                                        <div className="chartContainer_1">
                                        <Skeleton circle width={250} height={250} />
                                    </div>
                                    :
                                    <div>
                                    <h3 style={{ display:this.state.used_contact == 0 && this.state.unused_contact == 0   ? "block" : "none", padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:"100px"}}>No Data Found</h3>
                                    <div className="chartContainer_1" style={{marginTop:"-41px",display:this.state.used_contact == 0 && this.state.unused_contact == 0   ? "none" : "block"}}>
                                        <Pie
                                            style={{width:"250px",height:"250px"}}
                                            height={250} width={250}
                                            data={contact_cam}
                                            options={status_option}
                                        />
                                        </div>
                                        </div>
                                        }
                                </div>
                                {/* <hr className="hr_newww" style={{marginTop:" 10px"}}/> */}
                                <div className="hole_border_1 new_height_for_in" style={{marginTop:" 10px"}}>
                             <div className="show_status_data_new" style={{marginTop:"4px"}}>
                                   <h3> Status Insights</h3>
                                   {/* <div style={{display:"grid"}}> */}
                                       <div className="dataNew"  style={{display:"inline-flex"}}>
                                       <div style={{width:"70px"}}>Ongoing</div>:
                                       <span style={{marginLeft:"10px",color:"#2fc787",fontWeight: "500"}}>{this.state.status_array[0]}</span>
                                      </div>
                                       <div className="dataNew"  style={{display:"inline-flex"}}>
                                       <div style={{width:"70px"}}>In Process</div>:
                                       <span style={{marginLeft:"10px",color:"#fdbf21",fontWeight: "500"}}>{this.state.status_array[1]}</span>
                                      </div>
                                       <div className="dataNew"  style={{display:"inline-flex"}}>
                                       <div style={{width:"70px"}}>Closed</div>:
                                       <span style={{marginLeft:"10px",color:"#ef5164",fontWeight: "500"}}>{this.state.status_array[2]}</span>
                                      </div>
                                  {/* </div> */}
                              </div>

                                    {this.state.isLoadingStatus ?
                                        <div className="chartContainer_1">
                                        <Skeleton circle width={250} height={250} />
                                    </div>
                                    :
                                    <div>
                                    <h3 style={{ display: (this.state.ongoing_new == 0 && this.state.in_process_new == 0 && this.state.closed_new == 0 ) || this.state.no_status_for_cam == "block" ? "block" : "none", padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:"100px"}}>No Data Found</h3>

                                    <div className="chartContainer_1" style={{marginTop:"-41px",display: (this.state.ongoing_new == 0 && this.state.in_process_new == 0 && this.state.closed_new == 0 ) || this.state.no_status_for_cam == "block" ? "none" : "block"}}>
                                        <Pie
                                            style={{width:"250px",height:"250px"}}
                                            height={250} width={250}
                                            data={status_cam}
                                            options={status_option}
                                        />
                                        </div>
                                        </div>
                                        }


                                </div>

                            </div>
                         </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={ this.model_for_graph }>Close</Button>
                            { ' ' }
                            </ModalFooter>
                    </Modal>


                    <Modal
                                style={{ width: '400px', maxHeight: '37%', justifyContent: 'center', textAlign: 'center', alignItem: 'center', marginTop: '200px' }}
                                isOpen={this.state.AlertDelete2}
                                toggle={this.AlertDelete2}
                                className={this.props.className, "jakeee"}
                                fade
                            >
                                <ModalBody>
                                    <div style={{ width: '100%', height: '20px' }}>
                                        <Button className="close" style={{ float: 'right' }} color="" onClick={this.AlertDelete2}>
                                            <Icon name="x" />
                                        </Button>
                                    </div>
                                    <div style={{ width: '100%', height: '50px' }}>
                                        <p>Are you sure you want to Delete !!</p>

                                    </div>
                                    <div style={{ height: '50px', width: '100%' }}>
                                    <Button color="secondary"  style={{marginRight: "20px"}} onClick={this.AlertDelete2}>no</Button>

                                        {'             '}
                                        <Button  disabled={this.state.campaign_control == "false" ? 'disabled' : ''} color="warning"
                                            style={{color:"#fff" }}
                                            onClick={() => {
                                                this.delete_campaign(this.state.campaign_id)
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
