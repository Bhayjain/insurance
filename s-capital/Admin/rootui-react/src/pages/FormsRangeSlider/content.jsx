/**
 * External Dependencies
 */

 import "./style.scss";

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

/**
 * Internal Dependencies
 */
import Snippet from '../../components/snippet';
import Slider, { createSliderWithTooltip, Range } from '../../components/range-slider';
import PageTitle from '../../components/page-title';
import {
    addToast as actionAddToast,
  } from '../../actions';
  import Cookies from 'js-cookie';
  import DatePicker from '../../components/date-time-picker';
  import { Collapse, UncontrolledCollapse, Button, Card, CardBody, CardText,Table, Modal, ModalBody, ModalFooter, Label,Spinner,CustomInput,Input } from 'reactstrap';
  import Icon from '../../components/icon';
  import Lottie from 'react-lottie';
  import check_animation from '../../lottiesFiles/check_animation.json'
  import { Typeahead } from 'react-bootstrap-typeahead';
  import 'react-bootstrap-typeahead/css/Typeahead.css';
  import Select from 'react-select';
/**
 * Component
 */

 const device_width =   window.innerWidth;
 var height =   window.innerHeight;
 //console.log("emp_screen.height", height);
 const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
 //console.log("emp_nav_height",nav_height);
 var my_height = height - nav_height;
 var gk = (my_height/2)-100;
 //console.log("emp_gk",gk);
 if(device_width < 600){
   var gk = (my_height/2) - 50;
 }


class Content extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            muster_roll_date:new Date(),
            salary_sumbery_date:new Date(),
            allowance_date:new Date(),
            secondVal:new Date(),
            dashboard_payroll_control : Cookies.get('dashboard_payroll_control'),
            activeAccordion: 0,
            total_staff:0,
            present_staff:0,
            absent_staff:0,
            halfday_staff:0,
            leave_staff:0,
            upcoming_leave:0,
            not_marked:0,
            things_to_do_array:[],
            attendance_muster_roll_array:[],
            export_date:"",
            defaultOptions:{},
            isLoading:"block",

            loan_amount:0,
            received_loan:0,
            pending_loans:0,

            employee_typeahead:[],
            selectedOptions:[],
            Loansmodal:false,
            borderNew:false,
            dateToPaid:new Date(),
            amount_to_paid:"",
            typeOfHeading : "",
            typeOfButton:"",
            salary_summary_array:[],
            allowance_to_be_paid: 0,
            allowance_paid: 0,
            deduction_to_be_paid: 0,
            deduction_paid: 0,
            bonus_to_be_paid: 0,
            bonus_paid: 0,
            allowanceType:"",
            allowanceTypeLabel : "",
            titleTypeInput : "",
        };
        this.things_to_do()
        this.dashboard_salary_summary()
        this.dashboard_loan_summary()
        this.monthly_salary_calculation()
        this.fetch_extra_data_dashboard(this.state.allowance_date)
        this.dashboard_attendance_overview(this.state.secondVal)
        this.dashboard_master_roll_report(this.state.muster_roll_date)
        this.Loansmodal = this.Loansmodal.bind(this);
    }


    Loansmodal() {
        this.setState( ( prevState ) => ( {
               Loansmodal: ! prevState.Loansmodal,
               employee_typeahead:[],
               selectedOptions:[],
               error_meesage_loans:"",
               amount_to_paid:"",
               borderNew:false,
               dateToPaid:new Date(),
        } ) );
    }


    things_to_do=()=>{
        const { settings } = this.props;
        const res = fetch(settings.api_url + "api/payroll/things_to_do", {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                //console.log("Fetch Things To Do ***************", json)
                var data = json;
                if (data.status == true) {
                    const defaultOptions = {};
                    this.setState({
                       things_to_do_array:data.data,
                       defaultOptions:defaultOptions,
                    });
                }
                else {
                    const defaultOptions = {
                        loop: false,
                        autoplay: true,
                        animationData: check_animation,
                        rendererSettings: {
                          preserveAspectRatio: "xMidYMid slice"
                        }
                      };
                    this.setState({
                        things_to_do_array:[],
                        defaultOptions:defaultOptions
                    });
                }
            })
         }


    dashboard_salary_summary=()=>{
        const { settings } = this.props;
        const res = fetch(settings.api_url + "api/payroll/dashboard_salary_summary", {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                console.log("Fetch Salary Summary Response ***************", json)
                var data = json;
                if (data.status == true) {
                    this.setState({
                        salary_summary_array:data.data,
                    });
                }
                else {
                    this.setState({
                        salary_summary_array:[],
                    });
                }
            })
         }


         monthly_salary_calculation = ()=>  {
            const { settings } = this.props;
             const res = fetch(settings.api_url + "api/payroll/monthly_salary_calculation", {
                 method: 'POST',
                 headers: {
                     "Content-type": "application/json; charset=UTF-8",
                 }
             }).then((response) => response.json())
                 .then(json => {
                     console.log("Fetch Total Pending Dues In Salary Summary ***************", json)
                     var data = json;
                     if (data.status == true) {
                         this.setState({
                          over_all_pending_payments: data.overall_dues,
                         });
                     }
                     else {
                         this.setState({
                          over_all_pending_payments:"",
                         });
                     }
                 })
              }

    dashboard_loan_summary=()=>{
        const { settings } = this.props;
        const res = fetch(settings.api_url + "api/payroll/dashboard_loan_summary", {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                console.log("Fetch Loan Summary To Do ***************", json)
                var data = json;
                if (data.status == true) {
                    this.setState({
                        loan_amount:data.total_loan,
                        received_loan:data.paid_loan,
                        pending_loans:data.balance_loan,
                    });
                }
                else {
                    this.setState({
                        loan_amount:0,
                        received_loan:0,
                        pending_loans:0,
                    });
                }
            })
         }


    dashboard_attendance_overview=(secondVal)=>{
        const { settings } = this.props;
       const today = new Date(secondVal);
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        const formattedToday_start = yyyy + '-' + mm + '-' + dd;

       var params = {
        date:formattedToday_start
        }
       //console.log("params count",params);
        const res = fetch(settings.api_url + "api/payroll/dashboard_attendance_overview", {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                //console.log("Fetch Attendance Overview ***************", json)
                var data = json;
                if (data.status == true) {
                    this.setState({
                        total_staff:data.data.total_staff,
                        present_staff:data.data.present,
                        absent_staff:data.data.absent,
                        not_marked:data.data.not_marked,
                        halfday_staff:data.data.halfday,
                        leave_staff:data.data.leave,
                        upcoming_leave:data.data.upcoming_leave,
                    });
                }
                else {
                    this.setState({
                        total_staff:0,
                        present_staff:0,
                        absent_staff:0,
                        halfday_staff:0,
                        leave_staff:0,
                        upcoming_leave:0,
                        not_marked:0,
                    });
                }
            })
         }


//  Muster Roll Report

    dashboard_master_roll_report=(muster_roll_date)=>{
        const { settings } = this.props;
       const today = new Date(muster_roll_date);
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        var formattedToday_start = yyyy + '-' + mm ;
        var my_date  =formattedToday_start
        this.setState({
            export_date:my_date
        })

       var params = {
        sorting_date:formattedToday_start
        }
       //console.log("params muster",params);
        const res = fetch(settings.api_url + "api/payroll/dashboard_master_roll_report", {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                //console.log("Fetch Attendance Muster Roll ***************", json)
                var data = json;
                if (data.status == true) {
                    var attendance_muster_roll_array = data.data
                    for (let i = 0; i < attendance_muster_roll_array.length; i++) {
                        var month_array = attendance_muster_roll_array[i].month_array
                       for (let j = 0; j < month_array.length; j++) {
                          if (month_array[j].marked == "A") {
                            month_array[j].backgroundColor = "#ef5164"
                            month_array[j].color = "#fff"
                         }else if (month_array[j].marked == "HD") {
                            month_array[j].backgroundColor = "#fdbf21"
                            month_array[j].color = "#fff"
                         }else if (month_array[j].marked == "P") {
                            month_array[j].backgroundColor = "#2fc787"
                            month_array[j].color = "#fff"
                         }else if (month_array[j].marked == "H") {
                            month_array[j].backgroundColor = "#007bff"
                            month_array[j].color = "#fff"
                         }

                       }


                    }
                    this.setState({
                        attendance_muster_roll_array:data.data
                    });
                }
                else {
                    this.setState({
                        attendance_muster_roll_array:[]
                    });
                }
            })
         }



    export_dashboard_master_roll_report=(muster_roll_date)=>{
        const { settings } = this.props;
        const today = new Date(muster_roll_date);
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        var formattedToday_start = yyyy + '-' + mm ;
       var params = {
        sorting_date:formattedToday_start
        }
       //console.log("params export muster",params);
        const res = fetch(settings.api_url + "api/payroll/export_dashboard_master_roll_report", {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                //console.log("Export Attendance Muster Roll ***************", json)
                var data = json;
                if (data.status == true) {
                    window.open(data.path, "_blank");
                }
                else {

                }
            })
         }


         redirect_to_leaves=()=>{
             //console.log("leavesssssssss");
             location.hash = "/requested-leave"
         }


         redirect_to_dynamic_pages=(redirect)=>{
             console.log("leavesssssssss",redirect);

             if(redirect != undefined && redirect != "" ){
                 location.hash = redirect
             }
             // if (redirect == "attendance") {
             //      location.hash = "/attendance"
             // }else if (redirect == "leaves") {
             //    location.hash = "/requested-leave"
             // }else if (redirect == "payroll") {
             //    location.hash = "/payroll"
             // }
         }

         componentDidMount(){
            setTimeout(() => {
                this.setState({
                    isLoading:"none"
                })
              }, 600)
         }

         fetch_manager_typeahead= (value) =>{
            console.log("All Addd");
            const {
                addToast,settings
            } = this.props;
            var params={
                manager_name:value
            }
            console.log("kkkkkk",params);
              const res = fetch(settings.api_url + "fetch_manager_typeahead", {
                  method: 'POST',
                  body: JSON.stringify(params),
                  headers: {
                      "Content-type": "application/json; charset=UTF-8",
                  }
              }).then((response) => response.json())
                  .then(json => {
                      console.log("Manager Response **************************************", { response: json })
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
                        console.log("employee_Object", employee_Object);
                        this.setState({
                            employee_typeahead: employee_Object,
                            employee_array_fro_id: data.data,
                        })
                      }
                      else {
                      }
                  })
          }

          handleSelection = (selectedOptions) => {
            console.log("selectedOptions**************************",selectedOptions);
            this.setState({ selectedOptions });
          };


          switch_functionality_of_allowance=()=>{
            if (this.state.headingAllwoance == "Add Allowance") {
                this.add_allowance_data()
            }else if (this.state.headingAllwoance == "Add Bonus") {
               this.add_bonus()
            }else if (this.state.headingAllwoance == "Add Deduction") {
               this.add_deduction()
            }else{
                console.log("No Hit");
            }
        }

          add_allowance_data=()=>{
            const { addToast,settings } = this.props;

            this.setState({
                loading:true
            })

            if (this.state.selectedOptions == "" || this.state.selectedOptions == undefined || this.state.amount_to_paid == "" || this.state.amount_to_paid == undefined || this.state.dateToPaid == "" || this.state.dateToPaid == undefined ) {
                this.setState({
                    error_meesage_loans:"Please fill all the fields",
                    borderNew:true,
                    loading:false
                })
            }else{

                if (this.state.selectedOptions == "") {
                    var emp = ""
                }else{
                    var emp = this.state.selectedOptions[0].value
                }

                if (this.state.allowanceTypeLabel == "Others") {
                   var titleNew = this.state.titleTypeInput
                }else{
                    var titleNew = this.state.allowanceTypeLabel
                }

                var params ={
                    emp_id:emp,
                    amount:Number(this.state.amount_to_paid),
                    from:"admin_panel",
                    title : titleNew
                }
                console.log("params add allowance",params);
                const res = fetch(settings.api_url + "api/payroll/add_allowance", {
                    method: 'POST',
                    body: JSON.stringify(params),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    }
                }).then((response) => response.json())
                    .then(json => {
                        console.log("Add Allowance ***************", json)
                        var data = json;
                        if (data.status == true) {
                            this.setState({
                                Loansmodal:false,
                                loading:false,
                                selectedOptions:[],
                                amount_to_paid:""
                            });
                            addToast({
                                title: 'Book Your Insurance',
                                content: data["message"],
                                time: new Date(),
                                duration: 2000,
                            });

                            this.fetch_extra_data_dashboard(this.state.allowance_date)
                        }
                        else {
                            this.setState({
                                error_meesage_loans:data["message"],
                                Loansmodal:true,
                                loading:false,
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

          add_bonus=()=>{
            const { addToast,settings } = this.props;
            this.setState({
                loading:true
            })
            if (this.state.selectedOptions == "" || this.state.selectedOptions == undefined || this.state.amount_to_paid == "" || this.state.amount_to_paid == undefined || this.state.dateToPaid == "" || this.state.dateToPaid == undefined ) {
                this.setState({
                    error_meesage_loans:"Please fill all the fields",
                    borderNew:true,
                    loading:false,
                })
            }else{

                if (this.state.selectedOptions == "") {
                    var emp = ""
                }else{
                    var emp = this.state.selectedOptions[0].value
                }

                var params ={
                    emp_id:emp,
                    amount:Number(this.state.amount_to_paid),
                    from:"admin_panel",
                }
                console.log("params add allowance",params);
                const res = fetch(settings.api_url + "api/payroll/add_bonus", {
                    method: 'POST',
                    body: JSON.stringify(params),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    }
                }).then((response) => response.json())
                    .then(json => {
                        console.log("Add Bonus ***************", json)
                        var data = json;
                        if (data.status == true) {
                            this.setState({
                                Loansmodal:false,
                                selectedOptions:[],
                                amount_to_paid:"",
                                loading:false,
                            });
                            addToast({
                                title: 'Book Your Insurance',
                                content: data["message"],
                                time: new Date(),
                                duration: 2000,
                            });

                            this.fetch_extra_data_dashboard(this.state.allowance_date)
                        }
                        else {
                            this.setState({
                                error_meesage_loans:data["message"],
                                Loansmodal:true,
                                loading:false,
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
          add_deduction=()=>{
            const { addToast,settings } = this.props;
            this.setState({
                loading:true
            })
            if (this.state.selectedOptions == "" || this.state.selectedOptions == undefined || this.state.amount_to_paid == "" || this.state.amount_to_paid == undefined || this.state.dateToPaid == "" || this.state.dateToPaid == undefined ) {
                this.setState({
                    error_meesage_loans:"Please fill all the fields",
                    borderNew:true,
                    loading:false,
                })
            }else{

                if (this.state.selectedOptions == "") {
                    var emp = ""
                }else{
                    var emp = this.state.selectedOptions[0].value
                }

                var params ={
                    emp_id:emp,
                    amount:Number(this.state.amount_to_paid),
                    from:"admin_panel",
                }
                console.log("params add allowance",params);
                const res = fetch(settings.api_url + "api/payroll/add_deduction", {
                    method: 'POST',
                    body: JSON.stringify(params),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    }
                }).then((response) => response.json())
                    .then(json => {
                        console.log("Add Deduction ***************", json)
                        var data = json;
                        if (data.status == true) {
                            this.setState({
                                Loansmodal:false,
                                loading:false,
                                selectedOptions:[],
                                amount_to_paid:""
                            });
                            addToast({
                                title: 'Book Your Insurance',
                                content: data["message"],
                                time: new Date(),
                                duration: 2000,
                            });

                            this.fetch_extra_data_dashboard(this.state.allowance_date)
                        }
                        else {
                            this.setState({
                                error_meesage_loans:data["message"],
                                Loansmodal:true,
                                loading:false,
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


    fetch_extra_data_dashboard=(allowance_date)=>{
        const { settings } = this.props;
       const today = new Date(allowance_date);
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        var formattedToday_start = yyyy + '-' + mm ;
        var my_date  =formattedToday_start
        this.setState({
            export_date:my_date
        })

       var params = {
        date_sort:formattedToday_start
        }
       console.log("params muster",params);
        const res = fetch(settings.api_url + "api/payroll/fetch_extra_data_dashboard", {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                console.log("Fetch Allowance ***************", json)
                var data = json;
                if (data.status == true) {

                    this.setState({
                        allowance_to_be_paid : data.data[0].allowance_to_be_paid,
                        allowance_paid : data.data[0].allowance_paid,
                        deduction_to_be_paid : data.data[0].deduction_to_be_paid,
                        deduction_paid : data.data[0].deduction_paid,
                        bonus_to_be_paid : data.data[0].bonus_to_be_paid,
                        bonus_paid : data.data[0].bonus_paid,
                    });
                }
                else {
                    this.setState({
                        allowance_to_be_paid:0,
                        allowance_paid:0,
                        deduction_to_be_paid:0,
                        deduction_paid:0,
                        bonus_to_be_paid:0,
                        bonus_paid:0,
                    });
                }
            })
         }



    render() {

        const allowanceType = [
            { value: '1', label: 'Food' },
            { value: '2', label: 'Travel' },
            { value: '3', label: 'Others' },
        ]
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
        const {
            activeAccordion,
        } = this.state;

        //console.log("defaultOptions" ,Object.keys(this.state.defaultOptions).length);
        return (
            <Fragment>
                <PageTitle className="payroll_dashboard">
                    <h1>Dashboard</h1>
                </PageTitle>

                <Spinner color="warning" className="spinner_css_12345666" style={{marginTop:gk,display: this.state.isLoading}}/>
                <div className="show_dashboard heading_opeartion test_collapse" style={{display: this.state.isLoading == "none" ? "block" : "none"}}>
                  <div className="mycalendar test_collapse" style={{height:my_height-57}}>

{/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Attendance ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */}
                <div className="payments_section attendance_muster_roll test_collapse">
                    <div className="row test_collapse">
                      <div className="col-lg-9 col-md-8">
                          <h3 className="attendance_data">Attendance</h3>
                       </div>
                      <div className="col-lg-3 col-md-3 attendance_dash_calendar" style={{textAlign:"end"}}>
                      <DatePicker
                                selected={ this.state.secondVal }
                                onChange={ ( val ) => {
                                    this.setState( {
                                        secondVal: val,
                                    } );
                                    this.dashboard_attendance_overview(val)
                                } }
                                placeholder="Select date"
                                dateFormat="dd-MM-yyyy"
                                className="rui-datetimepicker form-control "
                            />
                       </div>
                        <div className="col-lg-4 col-md-12" >
                            <div className="staff_salary_box_atten mycalendar">
                            <p className="things_to_do">Things to do</p>
                              <div style={{display:Object.keys(this.state.defaultOptions).length == 0 ? "none" :"block"}}>
                                <Lottie
                                    options={this.state.defaultOptions}
                                    height={100}
                                    width={100}
                                    speed={0.5}

                                />
                               <p className="all_done">All Done</p>
                            </div>
                            <div>
                            <div className="row thing_to_row ">
                                {this.state.things_to_do_array.map((val,index)=>{
                                    return(
                                        <div className="col-lg-12 col-md-12" key={index}>
                                            <p className="upcommimg_thimg_to"><span className="position_relelative">{val.title}</span><span aria-hidden="true" onClick={()=>{this.redirect_to_dynamic_pages(val.redirect)}}> <Icon name="chevron-right" className="position_absoulate_thingg" /> </span></p>
                                        </div>
                                    )
                                })}

                                </div>
                            </div>

                            </div>
                       </div>
                        <div className="col-lg-8 col-md-12 ipad_view_on" style={{paddingLeft:"0px"}}>
                            <div className="staff_salary_box_atten" style={{marginTop:"10px"}}>
                                <div className="row">
                                    <div className="col-lg-12 col-md-6">
                                    <h4 className="overa_all_bal">Attendance Overview</h4>
                                    </div>
                                    </div>
                                    <div className="row show_in_line_attendance">
                                    <div className="col-lg-2 col-md-2">
                                        <div className="heading_top_newww">Present</div>
                                        <div className="heading_bottom">{this.state.present_staff}</div>
                                    </div>
                                    <div className="line_attendance"></div>
                                    <div className="col-lg-2 col-md-2">
                                        <div className="heading_top_newww">Absent</div>
                                        <div className="heading_bottom">{this.state.absent_staff}</div>
                                    </div>
                                    <div className="line_attendance"></div>
                                    <div className="col-lg-2 col-md-2">
                                        <div className="heading_top_newww">Not Marked</div>
                                        <div className="heading_bottom">{this.state.not_marked}</div>
                                    </div>
                                    <div className="line_attendance"></div>
                                    <div className="col-lg-2 col-md-2">
                                        <div className="heading_top_newww">Half Day</div>
                                        <div className="heading_bottom">{this.state.halfday_staff}</div>
                                    </div>
                                    <div className="line_attendance"></div>
                                    <div className="col-lg-2 col-md-2">
                                        <div className="heading_top_newww">On leave</div>
                                        <div className="heading_bottom">{this.state.leave_staff}</div>
                                    </div>
                                    {/* <div className="line_attendance"></div> */}
                                    {/* <div className="col-lg-2 col-md-2 upcomming_leaves_dashh">
                                        <div className="heading_top_newww">Upcoming leaves</div>
                                        <div className="heading_bottom">{this.state.upcoming_leave}</div>
                                    </div> */}
                                </div>
                                <div className="row upcomm_data">
                                    <div className="col-lg-5 col-md-6">
                                       <p className="upcommimg_leavess"><span className="position_relelative">Upcoming leaves in 7 days : {this.state.upcoming_leave}</span><span aria-hidden="true" onClick={()=>{this.redirect_to_leaves()}}> <Icon name="chevron-right" className="position_absoulate" /> </span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
{/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Payments ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */}
                <div className="payments_section attendance_muster_roll test_collapse">
                    <div className="row test_collapse">
                      <div className="col-lg-12 col-md-12">
                          <h3 className="attendance_data">Payments</h3>
                       </div>
                        <div className="col-lg-6 col-md-6" style={{paddingRight:"5px"}}>
                            <div className="staff_salary_box">
                                <div className="row">
                                    <div className="col-lg-8 col-md-8">
                                    <h4 className="overa_all_bal">Salary Summary</h4>
                                    </div>
                                    <div className="col-lg-12 col-md-12" style={{marginTop:"16px"}}>
                                        <Table striped>
                                            <tbody>
                                                <tr>
                                                    <th scope="row" className="salary_table">Pending Dues</th>
                                                    <td className="salary_table" style={{textAlign:"end"}}>&#x20b9;{this.state.over_all_pending_payments}</td>
                                                </tr>
                                                {this.state.salary_summary_array.map((value,index)=>{
                                                    return(
                                                <tr key={index}>
                                                    <th scope="row" className="salary_table">{value.name}</th>
                                                    <td className="salary_table" style={{textAlign:"end"}}>&#x20b9;{value.amount}</td>
                                                </tr>
                                                    )
                                                })}

                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 test_collapse" style={{paddingLeft:"5px"}}>
                            <div className="staff_salary_box">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12">
                                    <h4 className="overa_all_bal">Loan Summary</h4>
                                    </div>
                                    <div className="col-lg-12 col-md-12" style={{marginTop:"16px"}}>
                                        <Table striped>
                                            <tbody>
                                                <tr>
                                                    <th scope="row" className="salary_table">Loan Amount</th>
                                                    <td className="salary_table" style={{textAlign:"end"}}>&#x20b9;{this.state.loan_amount}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row" className="salary_table">Received</th>
                                                    <td className="salary_table" style={{textAlign:"end"}}>&#x20b9;{this.state.received_loan == null ? 0 : this.state.received_loan} </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row" className="salary_table">Pending Loan</th>
                                                    <td className="salary_table" style={{textAlign:"end"}}>&#x20b9;{this.state.pending_loans == null ? 0 : this.state.pending_loans}</td>
                                                </tr>
                                                <tr style={{height:"44px"}}>
                                                    <th scope="row" className="salary_table"></th>
                                                    <td className="salary_table" ></td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
{/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Allowance ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */}

                <div className="payments_section attendance_muster_roll test_collapse">
                    <div className="row test_collapse">
                      <div className="col-lg-12 col-md-12">
                          <h3 className="attendance_data">Allowance</h3>
                       </div>
                        <div className="col-lg-12 col-md-12">
                            <div className="staff_salary_box">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6">
                                    <h4 className="overa_all_bal">Allowance/Bonus/Incentives/Deduction</h4>
                                    </div>
                                    <div className="col-lg-6 col-md-6 salary_sum_date">
                                        <DatePicker
                                            selected={this.state.allowance_date}
                                            onChange={(val) => {
                                                this.setState({
                                                    allowance_date: val,
                                                });
                                                this.fetch_extra_data_dashboard(val)
                                                //console.log(val);
                                            }}
                                            dateFormat="MM-yyyy"
                                            showMonthYearPicker
                                            className="rui-datetimepicker form-control w-auto_12 search_1 "
                                            calendarClassName="tren-pembayaran__wrapper__datepicker"
                                            placeholder="Select Month"
                                        />
                                    </div>
                                    <div className="col-lg-12 col-md-12" style={{marginTop:"16px"}}>
                                        <Table striped>
                                            <thead>
                                                <tr>
                                                    <th scope="col" className="salary_table" style={{borderTop:"none"}}>Type</th>
                                                    <th scope="col" className="salary_table" style={{textAlign:"end",borderTop:"none"}}>To Be Paid</th>
                                                    <th scope="col" className="salary_table" style={{textAlign:"end",borderTop:"none"}}>Paid</th>
                                                    <th scope="col" className="salary_table" style={{textAlign:"end",borderTop:"none"}}><span style={{marginRight:"30px"}}>Action</span></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row" className="salary_table">Allowance</th>
                                                    <td className="salary_table" style={{textAlign:"end"}}>&#x20b9;{this.state.allowance_to_be_paid}</td>
                                                    <td className="salary_table" style={{textAlign:"end"}}>&#x20b9;{this.state.allowance_paid}</td>
                                                    <td className="salary_table" style={{textAlign:"end"}}>
                                                        <button disabled={this.state.dashboard_payroll_control == "false" ? true : false} style={{backgroundColor:"#4E4FEB",borderColor:"#4E4FEB",color:"#fff" , whiteSpace:"nowrap"}} className="btn sumbit_new btn_allow" onClick={()=>{
                                                            this.Loansmodal()
                                                            this.setState({
                                                                headingAllwoance:"Add Allowance"
                                                            })
                                                        }}>Add Allowance</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row" className="salary_table">Bonus/Incentives</th>
                                                    <td className="salary_table" style={{textAlign:"end"}}>&#x20b9;{this.state.bonus_to_be_paid}</td>
                                                    <td className="salary_table" style={{textAlign:"end"}}>&#x20b9;{this.state.bonus_paid}</td>
                                                    <td className="salary_table" style={{textAlign:"end"}}>
                                                    <button disabled={this.state.dashboard_payroll_control == "false" ? true : false} style={{backgroundColor:"#279EFF",borderColor:"#279EFF",color:"#fff", whiteSpace:"nowrap"}} className="btn sumbit_new btn_allow" onClick={()=>{
                                                            this.Loansmodal()
                                                            this.setState({
                                                                headingAllwoance:"Add Bonus/Incentives"
                                                            })
                                                        }}>Add Bonus</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row" className="salary_table">Deduction</th>
                                                    <td className="salary_table" style={{textAlign:"end"}}>&#x20b9;{this.state.deduction_to_be_paid}</td>
                                                    <td className="salary_table" style={{textAlign:"end"}}>&#x20b9;{this.state.deduction_paid}</td>
                                                    <td className="salary_table" style={{textAlign:"end"}}>
                                                    <button disabled={this.state.dashboard_payroll_control == "false" ? true : false} style={{backgroundColor:"#1D5D9B",borderColor:"#1D5D9B",color:"#fff", whiteSpace:"nowrap"}} className="btn sumbit_new btn_allow" onClick={()=>{
                                                            this.Loansmodal()
                                                            this.setState({
                                                                headingAllwoance:"Add Deduction"
                                                            })
                                                        }}>Add Deduction</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
{/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Attendance Muster Roll ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */}
                      <div className="attendance_muster_roll test_collapse">
                          <div className="row">
                              <div className="col-lg-8 col-md-8">
                                <h3 className="attendance_data">Attendance Muster Roll Reports</h3>
                             </div>
                          </div>
                          <div className="master_roll_box">
                              <div className="row">
                                 <div className="col-lg-6 col-md-6">
                                     <h4 className="overa_all_bal">Monthly Regular</h4>
                                 </div>
                                    <div className="col-lg-6 col-md-6 salary_sum_date">
                                        <DatePicker
                                            selected={this.state.muster_roll_date}
                                            onChange={(val) => {
                                                this.setState({
                                                    muster_roll_date: val,
                                                });
                                                //console.log(val);
                                                this.dashboard_master_roll_report(val)
                                            }}
                                            dateFormat="MM-yyyy"
                                            showMonthYearPicker
                                            className="rui-datetimepicker form-control w-auto_12 search_1 "
                                            calendarClassName="tren-pembayaran__wrapper__datepicker"
                                            placeholder="Select Month"
                                        />

                                        <Button className="export_muster_roll" disabled={this.state.dashboard_payroll_control == "false" ? true : false} onClick={()=>this.export_dashboard_master_roll_report(this.state.muster_roll_date)}>Export</Button>
                                    </div>
                              </div>

                              <div className="master_roll_acc" style={{marginTop:"16px"}}>
                                  <div className="accordion-group">
                                        { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
                                        <a

                                            className="collapse-link"
                                            style={{padding:"6px 20px"}}
                                        >
                                              <Table borderless className="borderlessNew">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" className="padd_ing_table width_name">Name</th>
                                                        <th scope="col" className="padd_ing_table present">Present</th>
                                                        <th scope="col" className="padd_ing_table absent">Absent</th>
                                                        <th scope="col" className="padd_ing_table half_day">Half day</th>
                                                        <th scope="col" className="padd_ing_table paid_leave">Paid Leave</th>
                                                        <th scope="col" className="padd_ing_table unmarked">Unmarked</th>
                                                        {/* <th scope="col" className="padd_ing_table overtime">Overtime</th>
                                                        <th scope="col" className="padd_ing_table fine">Fine</th> */}
                                                        <th scope="col" className="padd_ing_table total_attendace">Total Attendance</th>
                                                    </tr>
                                                </thead>
                                                </Table>
                                        </a>
                                        <Collapse isOpen={ 1 === activeAccordion }>
                                            <div className="collapse-content">
                                            </div>
                                        </Collapse>
                                    </div>

                                    {/* ^^^^^^^^^^^^^^^^^^ Muster Roll Report ^^^^^^^^^^^^^^^ */}
                                    {
                                        this.state.attendance_muster_roll_array.map((val,ind)=>{
                                            return(
                                        <div className="accordion-group" key={ind}>
                                        { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
                                        <a
                                            href="#"
                                            className="collapse-link"
                                            style={{padding:"6px 20px"}}
                                            onClick={ ( e ) => {
                                                e.preventDefault();
                                                this.setState( {
                                                    activeAccordion: activeAccordion === ind+2 ? 0 : ind+2,
                                                } );
                                            } }
                                        >

                                                <Table borderless className="borderlessNew">
                                                <tbody>
                                                    <tr>
                                                        <th scope="row" className="padd_ing_table width_name">
                                                            <div className="display_new">
                                                                <div className="show_icon_dash">
                                                                    <Icon className="dash_un_n_down" name="chevron-down" style={{display:activeAccordion === ind+2 ? "block" : "none"}} />
                                                                    <Icon className="dash_un_n_down" name="chevron-up" style={{display:activeAccordion !== ind+2 ? "block" : "none"}} />
                                                                </div>
                                                                <div>
                                                                 {val.emp_name}
                                                                </div>
                                                            </div>
                                                            </th>
                                                        <td className="padd_ing_table present">{val.present_count}</td>
                                                        <td className="padd_ing_table absent">{val.absent_count}</td>
                                                        <td className="padd_ing_table half_day">{val.halfday_count}</td>
                                                        <td className="padd_ing_table paid_leave">{val.paid_leave_count}</td>
                                                        <td className="padd_ing_table unmarked">{val.unmarked_count}</td>
                                                        {/* <td className="padd_ing_table overtime">-</td>
                                                        <td className="padd_ing_table fine">-</td> */}
                                                        <td className="padd_ing_table total_attendace">{val.present_count}</td>
                                                    </tr>
                                                 </tbody>
                                                </Table>
                                        </a>
                                        <Collapse isOpen={ ind+2 === activeAccordion }>
                                            <div className="collapse-content" style={{padding:"10px 0px 15px"}}>
                                                <div className="muster_data_show">
                                                    <div className="table-responsive-lg scroll_1 test_collapse">
                                                    <Table  bordered>
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col" className="MUSTER_ROLL_TABLE DAYS_BACK" >
                                                                        <div>
                                                                            DAYS
                                                                        </div>
                                                                    </th>
                                                                    {val.month_array.map((value,index)=>{
                                                                        return(
                                                                            <th scope="col" className="MUSTER_ROLL_TABLE" style={{backgroundColor :value.backgroundColor,color : value.color }} key={index}>
                                                                            <div className="date_muster">
                                                                                <p>{value.day}</p>
                                                                                {/* <p>{value.date}</p> */}
                                                                            </div>
                                                                        </th>
                                                                        )
                                                                    })}
                                                                </tr>
                                                                <tr>
                                                                    <th scope="col" className="MUSTER_ROLL_TABLE DAYS_BACK" >
                                                                        <div>
                                                                            {/* DATE */}
                                                                        </div>
                                                                    </th>
                                                                    {val.month_array.map((value,index)=>{
                                                                        return(
                                                                            <th scope="col" className="MUSTER_ROLL_TABLE" style={{backgroundColor :value.backgroundColor,color : value.color }} key={index}>
                                                                            <div className="date_muster">
                                                                                <p>{value.date}</p>
                                                                            </div>
                                                                        </th>
                                                                        )
                                                                    })}
                                                                </tr>
                                                                <tr>
                                                                    <th scope="col" className="MUSTER_ROLL_TABLE DAYS_BACK" >
                                                                        <div>

                                                                        </div>
                                                                    </th>
                                                                    {val.month_array.map((value,index)=>{
                                                                        return(
                                                                            <th scope="col" className="MUSTER_ROLL_TABLE" style={{backgroundColor :value.backgroundColor,color : value.color }} key={index}>
                                                                            <div className="date_muster">
                                                                                <p>{value.marked}</p>
                                                                            </div>
                                                                        </th>
                                                                        )
                                                                    })}
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <th scope="row" className="MUSTER_ROLL_TABLE DAYS_BACK">
                                                                        <div>
                                                                            WH
                                                                        </div>
                                                                    </th>
                                                                    {val.month_array.map((value,index)=>{
                                                                        return(
                                                                            <th scope="col" className="MUSTER_ROLL_TABLE" style={{backgroundColor :value.backgroundColor,color : value.color}} key={index}>
                                                                            <div className="date_muster">
                                                                                <p>{value.total_working_hour}</p>
                                                                            </div>
                                                                        </th>
                                                                        )
                                                                    })}
                                                                </tr>
                                                            </tbody>
                                                        </Table>
                                                    </div>
                                                </div>
                                            </div>
                                        </Collapse>
                                    </div>
                                            )
                                        })
                                    }
                             </div>
                          </div>
                      </div>
                  </div>
                </div>

                 {/* *********************** Engegment Model ****************************************** */}
                 <Modal
                         isOpen={ this.state.Loansmodal }
                         toggle={ this.Loansmodal }
                         className={ this.props.className,"allowance_model modal-dialog-centered" }
                         fade
                     >
                         <div className="modal-header">
                             <h5 className="modal-title h2">{this.state.headingAllwoance}</h5>
                             <Button className="close" color="" onClick={ this.Loansmodal }>
                                 <Icon name="x" />
                             </Button>
                         </div>
                         <ModalBody>
                         <div className="form rui-sign-form rui-sign-form-cloud">
                             <div className="row vertical-gap sm-gap justify-content-flex-start">

                               <div className="col-lg-6 col-md-6 "  style={{display : this.state.headingAllwoance == "Add Allowance" ? "block" : "none"}}>
                               <Label className="allowance_label" htmlFor="inputText">Title<span className="start_mark_new">*</span></Label>
                               <Select
                                        value = {this.state.allowanceType}
                                        onChange={(e) => {
                                            this.setState({
                                                allowanceType: e,
                                                allowanceTypeLabel: e.label,
                                                error_meesage_loans:""
                                            });
                                        }}
                                        placeholder="Select..."
                                        className={this.state.borderNew && this.state.allowanceType == "" ?  "is_not_valid" : "contact_sort"}
                                        options={ allowanceType }
                                        styles={ customStyles }
                                    />
                               </div>
                               <div className="col-lg-6 col-md-6 " style={{display: this.state.allowanceTypeLabel == "Others" && this.state.headingAllwoance == "Add Allowance" ? "block" : "none"}}>
                               <Label className="allowance_label" htmlFor="inputText">Other Title<span className="start_mark_new">*</span></Label>
                               <Input value={this.state.titleTypeInput}
                                    invalid={this.state.borderNew && this.state.titleTypeInput == "" ? true :false}
                                        type="text"
                                        placeholder="Other Title"
                                        onChange={(e) => {
                                            this.setState({
                                            titleTypeInput:e.target.value,
                                            error_meesage_loans:""
                                            })
                                         }} />
                               </div>

                               <div className="col-lg-6 col-md-6 ">
                               <Label className="allowance_label" htmlFor="inputText">Employee<span className="start_mark_new">*</span></Label>
                                <Typeahead
                                    id="basic-typeahead-multiple"
                                    onChange={this.handleSelection}
                                    onInputChange={this.fetch_manager_typeahead}
                                    options={this.state.employee_typeahead} // Replace [...] with your array of options
                                    selected={this.state.selectedOptions}
                                    placeholder="Select Employee"
                                    invalid={this.state.borderNew && this.state.selectedOptions == "" ? true :false}
                                    className={this.state.borderNew && this.state.selectedOptions == "" ?"manager_select_new" :""}
                                    />
                               </div>

                               <div className="col-lg-6 col-md-6 ">
                               <Label className="allowance_label" htmlFor="inputText">Amount<span className="start_mark_new">*</span></Label>
                                    <Input value={this.state.amount_to_paid}
                                    invalid={this.state.borderNew && this.state.amount_to_paid == "" ? true :false}
                                        type="number"
                                        placeholder="Amount"
                                        onChange={(e) => {
                                            this.setState({
                                            amount_to_paid:e.target.value,
                                            error_meesage_loans:""
                                            })
                                         }} />
                               </div>
                                 <div className="col-lg-12 col-md-12" style={{display:this.state.error_meesage_loans=="" ? "none" :"block"}}>
                                     <p className="false_message_new">{this.state.error_meesage_loans}</p>
                                 </div>


                                 </div>
                             </div>
                         </ModalBody>
                         <ModalFooter>
                             <Button color="secondary" style={{textTransform:"capitalize"}} onClick={ this.Loansmodal }>Close</Button>
                             { ' ' }
                             <Button color="brand" style={{backgroundColor:"#8bc240" ,borderColor:"#8bc240",textTransform:"capitalize"}} disabled={this.state.dashboard_payroll_control == "false" ? true : false} onClick={ this.switch_functionality_of_allowance}>Save{this.state.loading ?  (
                      <Spinner />
                    ):"" }</Button>
                         </ModalFooter>
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
