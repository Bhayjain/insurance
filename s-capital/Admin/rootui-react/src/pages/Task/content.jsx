/**
 * External Dependencies
 */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PageTitle from '../../components/page-title';
import './style.scss'

/**
 * Internal Dependencies
 */
import Icon from '../../components/icon';
import Snippet from '../../components/snippet';
import TextEditor from '../../components/text-editor';
import { Button, Modal, ModalBody, ModalFooter,Label,CustomInput,Table,Spinner } from 'reactstrap';
import dateFormat from 'dateformat';
import Tabs from '../../components/tabs';

import { RangeDatePicker } from 'react-google-flight-datepicker';
import 'react-google-flight-datepicker/dist/main.css';

/**
 * Component
 */

 const device_width =   window.innerWidth;
 var height =   window.innerHeight;
//  //console.log("emp_screen.height", height);
 const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
//  //console.log("emp_nav_height",nav_height);
 var my_height = height - nav_height;
 var gk = (my_height/2)-100;
//  //console.log("emp_gk",gk);
 if(device_width < 600){
   var gk = (my_height/2) - 50;
 }



class Content extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            employee_array:[],
            isLoading:"block",
            spinner_1: 'none',
            ipad_width:"none",
            ipad_width11:"none",
            no_data_mess:"none",
            ipad_emp_list:"block",
            ipad_emp_list11:"block",
            time_tracker: [],
            op_time_tracker: [],
            activeTab2: 'home',
            current_page_emp:1,
            total_pages_emp:"",
            total_emp:"",


            current_page:1,
            total_pages:"",
            total:"",


            current_page_op:1,
            total_pages_op:"",
            total_op:"",
            search_user:"",
            no_emp:"none"
        }
        this.fetch_employeee()
        this.toggleTab = this.toggleTab.bind( this );
    }

    toggleTab( num, name ) {
        this.setState( {
            [ `activeTab${ num }` ]: name,
        } );

        if (name == "profile") {
            this.setState({
                spinner_1: 'block',
                no_emp: 'none',
                search_user:""
              })
              this.fetch_employeee()
              setTimeout(() => {
                this.fetch_operation_timing_tracker(this.state.emp_id,this.state.startDate_op,this.state.endDate_op,this.state.current_page_op)
              }, 0)
            }
            // this.fetch_operation_timing_tracker(this.state.emp_id,this.state.startDate_op,this.state.endDate_op,this.state.current_page_op)
        else{
            this.setState({
                spinner_1: 'block',
                no_emp: 'none',
                search_user:""
              })
              this.fetch_employeee()
              setTimeout(() => {
                this.fetch_mis_timing_tracker(this.state.emp_id,this.state.startDate,this.state.endDate,this.state.current_page)
              }, 0)
            // this.fetch_mis_timing_tracker(this.state.emp_id,this.state.startDate,this.state.endDate,this.state.current_page)
        }
    }

    fetch_employeee = (search_sm,pageNumber)=>  {
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


          if (search_sm=="" || search_sm == undefined ) {
            var my_sm_search= undefined
          }
          else{
            var my_sm_search= search_sm

            this.setState({
                search_user:my_sm_search,

            })
          }


            var params = {
              page_no:page_no,
              emp_name:my_sm_search
          }
          console.log("parmssssss",params);
         const res = fetch(settings.api_url + "fetch_admin", {
             method: 'POST',
             body: JSON.stringify(params),
             headers: {
                 "Content-type": "application/json; charset=UTF-8",
             }
         }).then((response) => response.json())
             .then(json => {
                 console.log("fetch Employee *******************======", json)
                 var data = json;
                 if (data.status == true) {
                     this.setState({
                         employee_array: data.data,
                         emp_id: data.data[0]._id,
                         isLoading:"none",
                         total_pages_emp: data.total_pages,
                         total_emp:data.total,
                         no_emp:"none"
                     });
                     if (device_width < 820) {

                       }
                       else{
                        this.fetch_mis_timing_tracker(data.data[0]._id,this.state.startDate,this.state.endDate,this.state.current_page)
                        this.fetch_operation_timing_tracker(data.data[0]._id,this.state.startDate_op,this.state.endDate_op,this.state.current_page_op)
                        // this.get_single_policy_dock(data.data.data[0]._id)
                       }
                 }
                 else {
                     this.setState({
                         employee_array: [],
                         isLoading:"none",
                         total_pages_emp: 1,
                         total_emp:"",
                         no_emp:"block"
                     });
                 }
             })
     }



     fetch_mis_timing_tracker = (employee_id,startDate,endDate,pageNumber) => {

         const { addToast,settings } = this.props;
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
            ////console.log("formattedToday",formattedToday_start);


            const today_end = new Date(endDate);
            const yyyy_end = today_end.getFullYear();
            let mm_end = today_end.getMonth() + 1; // Months start at 0!
            let dd_end = today_end.getDate();
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

        var params = {
            employee_id:employee_id,
            date_range:my_date,
            page_no:page_no
        }
        console.log("single_data_of_employeee", params);
       const res = fetch(settings.api_url + "fetch_mis_timing_tracker", {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      }).then((response) => response.json())
        .then(json => {
          console.log("fetch_mis_timing_tracker **************************************", json)
          var data = json;

          if (data.status == true) {
            if (device_width < 820) {
              var ipad_emp_list = "none";
             }
             else{
             var ipad_emp_list = "block"

             }

             var form_filling_start_time_new = data.data;


                    for (let i = 0; i < form_filling_start_time_new.length; i++) {

                        var date = form_filling_start_time_new[i].form_filling_start_time;
                        var end_time = form_filling_start_time_new[i].form_filling_end_time;

                        var new_date = this.formatDate(date);
                        var end_date = this.formatDate(end_time);
                        console.log("new_date",new_date);
                        form_filling_start_time_new[i].start_filling_time = new_date
                        form_filling_start_time_new[i].end_filling_time = end_date
                    }

            this.setState({
              time_tracker: form_filling_start_time_new,
              emp_id:employee_id,
              spinner_1: 'none',
              ipad_width11:"block",
              ipad_emp_list11:ipad_emp_list,
              no_data_mess:"none",
              total_pages: data.total_pages,
              total:data.total,
              });
            }
          else {

            if (device_width < 820) {
              var ipad_emp_list = "none";
             }
             else{
             var ipad_emp_list = "block"

             }

            this.setState({
              time_tracker: [],
              emp_id: employee_id,
              spinner_1: 'none',
              no_data_mess:"block",
              total_pages: 1,
              total:"",
              ipad_width11:"block",
              ipad_emp_list11:ipad_emp_list,
             });
          }
        })
    }



     fetch_operation_timing_tracker = (employee_id,startDate,endDate,pageNumber) => {

         const { addToast,settings } = this.props;
        if (pageNumber == '' || pageNumber == undefined) {
            this.setState({
                current_page_op: 1
            })
            var page_no = 1
        } else {
            this.setState({
              current_page_op: pageNumber
            })
            var page_no = pageNumber
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
            ////console.log("formattedToday",formattedToday_start);


            const today_end = new Date(endDate);
            const yyyy_end = today_end.getFullYear();
            let mm_end = today_end.getMonth() + 1; // Months start at 0!
            let dd_end = today_end.getDate();
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

        var params = {
            employee_id:employee_id,
            date_range:my_date,
            page_no:page_no
        }
        console.log("single_data_of_employeee", params);
       const res = fetch(settings.api_url + "fetch_operation_timing_tracker", {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      }).then((response) => response.json())
        .then(json => {
          console.log("fetch_operation_timing_tracker **************************************", json)
          var data = json;

          if (data.status == true) {
            if (device_width < 820) {
              var ipad_emp_list = "none";
             }
             else{
             var ipad_emp_list = "block"

             }

             var opration_data = data.data;


                    for (let i = 0; i < opration_data.length; i++) {

                        if (opration_data[i].policy_added_date == "") {
                            var new_date = ""
                        }else{
                            // var date = opration_data[i].policy_added_date;
                            var new_date = this.formatDate(opration_data[i].policy_added_date);
                        }
                        if (opration_data[i].policy_issue_date == "") {
                            var end_date = ""
                        }else{
                            // var end_time = opration_data[i].policy_issue_date;
                            var end_date = this.formatDate(opration_data[i].policy_issue_date);
                        }

                                opration_data[i].start_filling_time = new_date
                                opration_data[i].end_filling_time = end_date
                            }

                            this.setState({
                            op_time_tracker: opration_data,
                            emp_id:employee_id,
                            spinner_1: 'none',
                            ipad_width:"block",
                            ipad_emp_list:ipad_emp_list,
                            no_data_mess:"none",
                            total_pages_op: data.total_pages,
                            total_op:data.total,
                            });
                            }
                        else {

                          if (device_width < 820) {
                            var ipad_emp_list = "none";
                           }
                           else{
                           var ipad_emp_list = "block"

                           }

                            this.setState({
                            time_tracker: [],
                            emp_id: employee_id,
                            spinner_1: 'none',
                            no_data_mess:"block",
                            total_pages_op: 1,
                            total_op:"",
                            ipad_width:"block",
                            ipad_emp_list:ipad_emp_list,
                            });
                        }
                        })
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

                                    var nre_time = new_date_1+" "+  time_new


                return nre_time;
              }


    render() {

        const { settings } = this.props;
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
                                // this.get_policy_dock(this.state.startDate,this.state.endDate,this.state.search_user,number)
                                this.fetch_mis_timing_tracker(this.state.emp_id,this.state.startDate,this.state.endDate,number)
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
                                // this.get_policy_dock(this.state.startDate,this.state.endDate,this.state.search_user,number + 1)
                                this.fetch_mis_timing_tracker(this.state.emp_id,this.state.startDate,this.state.endDate,number + 1)
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



        const pageNumbers_op = [];
        if (this.state.total_op !== null) {
            for (let i = 1; i <= Math.ceil(this.state.total_pages_op / 1); i++) {
                pageNumbers_op.push(i);
            }


            var renderPageNumbers_op = pageNumbers_op.map(number => {
                let classes = this.state.current_page_op === number ? '' : '';

                return (
                    <div key={number} style={{
                        display: 'inline-flex'
                    }}>
                        {/* <span style={{display:this.state.current_page === 1 ? 'none' : 'block'}}> */}

                        <Button color="warning" outline
                        style={{
                            backgroundColor: this.state.current_page_op === number ? '#8bc240' : 'white', color: this.state.current_page_op === number ? 'white' : '#8bc240',marginRight:"5px",
                            display: this.state.current_page_op === number ? "block" : 'none'}}
                            className={classes,"pagination_1"}
                            onClick={() => {
                                this.fetch_operation_timing_tracker(this.state.emp_id,this.state.startDate_op,this.state.endDate_op,number)
                                    , this.setState({
                                        current_page_op: number,
                                        spinner_1: 'block'
                                    })
                            }}

                        >{number}</Button>
                        <Button color="warning" outline
                        style={{
                            display: this.state.current_page_op === number ? this.state.current_page_op === this.state.total_pages_op ? "none" : "block" : 'none',
                            backgroundColor: this.state.current_page_op === number ? '' : '#8bc240', color: this.state.current_page_op === number ? '#8bc240' : 'white' }}
                            className={classes,"pagination_1"}
                            onClick={() => {
                                this.fetch_operation_timing_tracker(this.state.emp_id,this.state.startDate_op,this.state.endDate_op,number + 1)
                                if (this.state.current_page_op === this.state.total_pages_op) {
                                    this.setState({
                                        current_page_op: number
                                    })
                                } else {
                                    this.setState({
                                        current_page_op: number + 1,
                                        spinner_1: 'block'
                                    })
                                }

                            }}

                        >{number + 1}</Button>

                    </div>
                );
            });
        }



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
                                this.fetch_employeee(this.state.search_user,number)
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
                                this.fetch_employeee(this.state.search_user,number + 1)
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


        return (
            <Fragment>
               <PageTitle className = "time_heading">
                   <div className="row">
                       <div className="col-lg-6">
                          <h1 className="time_tracker_heading">Time Tracker</h1>
                      </div>
                       <div className="col-lg-6">
                      <div style={{display:  this.state.activeTab2 === 'home' ? "inline-flex" : "none",width:"100%"}}>
                      <div>
                     <input
                       style={{marginTop:"1px",marginRight:"12px",width:"230px"}}
                       type="text"
                       className="form-control serach_smmm_22"
                       aria-describedby="emailHelp"
                       placeholder="Search by Name"
                       value={this.state.search_user}
                       onChange={(e) => {
                        this.setState({
                          search_user:e.target.value
                        })
                        this.fetch_employeee(e.target.value,this.state.current_page_emp)
                       }}
                  />
                     </div>
                       <div className="date_rangeee_pii  date_rangeee_timee timeeetrackinggg" style={{width:"100%"}}>
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
                                // this.get_policy_dock(startDate,endDate,this.state.search_user,this.state.current_page)
                                this.fetch_mis_timing_tracker(this.state.emp_id,this.state.startDate,this.state.endDate,this.state.current_page)
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

                      <div style={{display:  this.state.activeTab2 === 'profile' ? "inline-flex" : "none",width:"100%"}}>
                      <div>
                          <input
                            style={{marginTop:"1px",marginRight:"12px",width:"230px"}}
                            type="text"
                            className="form-control serach_smmm_22"
                            aria-describedby="emailHelp"
                            placeholder="Search by Name"
                            value={this.state.search_user}
                            onChange={(e) => {
                              this.setState({
                                search_user:e.target.value
                              })
                              this.fetch_employeee(e.target.value,this.state.current_page_emp)
                            }}
                        />
                     </div>

                       <div className="date_rangeee_pii" style={{width:"100%"}}>
                         <RangeDatePicker
                            name="daterange"
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            onChange={(startDate, endDate) => {
                                this.setState({
                                startDate_op: startDate,
                                endDate_op: endDate,
                                daterang: [new Date(startDate).toISOString(), new Date(endDate).toISOString()]
                                })
                                // this.get_policy_dock(startDate,endDate,this.state.search_user,this.state.current_page)
                                this.fetch_operation_timing_tracker(this.state.emp_id,this.state.startDate_op,this.state.endDate_op,this.state.current_page_op)
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
                   </div>
                   </div>
               </PageTitle>
                <Spinner color="warning" className="spinner_css_12345" style={{marginTop:gk,display: this.state.isLoading}}/>
                <div style={{display: this.state.isLoading == "none" ? "block" : "none"}}>

                <Tabs pills className="timeeee">
                        <Tabs.NavItem
                            isActive={ this.state.activeTab2 === 'home' }
                            onClick={ () => this.toggleTab( 2, 'home' ) }
                            className="mis_ddd"
                        >
                            MIS Time
                        </Tabs.NavItem>
                        <Tabs.NavItem
                            isActive={ this.state.activeTab2 === 'profile' }
                            onClick={ () => this.toggleTab( 2, 'profile' ) }
                            className="opppeee"
                        >
                            Operation Time
                        </Tabs.NavItem>
                    </Tabs>
                    <Tabs.Content activeTab={ this.state.activeTab2 }>
                        <Tabs.Pane tabId="home">

                  <h3 style={{ display: this.state.no_emp, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:gk}}>No Data Found</h3>
                   <div className="" style={{display:this.state.no_emp == "none" ? "block" :"none"}}>
                   <div className="row">
                        <div className="col-lg-3 col-md-12 height_13" style={{paddingRight:"0px",display: this.state.ipad_emp_list11}}>
                        <div className=" mycalendar" style={{height:this.state.total_pages_emp==1 ? my_height-110 : my_height-163}}>
                            <Table striped className="purchase_table">
                            <thead>
                              <tr>
                                <th scope="col" className="purchase_heading" style={{ border: "none", whiteSpace: "nowrap",padding:"10px 25px" }}>Employee Name</th>
                               </tr>
                            </thead>
                            <tbody>
                              {
                                this.state.employee_array.map((value12, index12) => {
                                  return (
                                    <tr style={{ cursor: 'pointer' }} key={index12} onClick={() => {
                                      this.setState({
                                        spinner_1: 'block'
                                      })
                                      setTimeout(() => {
                                        this.fetch_mis_timing_tracker(value12._id,this.state.startDate,this.state.endDate,this.state.current_page)
                                      }, 0)
                                    }}
                                    >
                                      <td className="strip_paded" style={{ borderLeft: value12._id == this.state.emp_id ? "5px solid  #8bc240" : " 0px", verticalAlign: "middle",padding:"10px 25px" }} >{value12.name}</td>
                                     </tr>
                                  )
                                })
                              }

                            </tbody>
                          </Table>
                           </div>

                           {/* ********************************* Pagination ***************************************** */}

                       <div style={{display:this.state.total_pages_emp==1?"none":'inline-flex',width:"100%",marginTop:"10px",marginBottom:"20px",padding: "1px 8px"}}>
                              <Button color="warning" className="pagination_1"
                              style={{ marginLeft:"auto",marginRight:"5px"}}
                              outline onClick={() => this.fetch_employeee(this.state.search_user,1)}>first</Button>


                              <Button color="warning" className="pagination_1"
                              style={{marginLeft:"5px",marginRight:"5px",backgroundColor: this.state.current_page_emp == 1 ? '#8bc240' : '',
                              color: this.state.current_page_op == 1 ? '#8bc240' : '#8bc240',display: this.state.current_page_emp == 1 ? "none" : "block"}} outline
                              onClick={() => {
                                  if (this.state.current_page_emp > 1) {
                                    this.fetch_employeee(this.state.search_user,this.state.current_page_emp - 1)
                                  } else {
                                    this.fetch_employeee(this.state.search_user,this.state.current_page_emp)
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
                                    this.fetch_employeee(this.state.search_user,this.state.current_page_emp + 1)
                                  } else {
                                      this.fetch_employeee(this.state.search_user,this.state.current_page_emp )
                                  }
                              }}
                              >next</Button>
                              <Button color="warning" className="pagination_1"
                              style={{marginLeft:"5px",marginRight:"3px"}}
                              outline onClick={() => this.fetch_employeee(this.state.search_user,this.state.total_pages_emp)}>last</Button>
                            </div>


                        </div>

                        <div className="col-lg-9 col-md-12 col-sm-12 admin_ledttt" style={{display: device_width < 769 ? this.state.ipad_width11 : "block",paddingLeft: "0px"}}>
                        <Spinner color="warning" className="employee_spinner_1" style={{ marginTop: gk, display: this.state.spinner_1 }} />
                        <div style={{display:this.state.spinner_1=="none" ? "block":"none"}}>
                          <div className="back_btn">
                          <Button className="" style={{ marginLeft: "5px",  backgroundColor: '#007bff', borderColor: '#007bff',textTransform:"capitalize", display: device_width < 769 ? "inline-flex" : "none"}}
                                                    onClick={() => {
                                                    this.setState({
                                                        ipad_emp_list11:"block",
                                                         ipad_width11:"none"
                                                     })
                                                     }}>Back</Button>
                          </div>
                        <h3 style={{ display: this.state.no_data_mess, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:gk}}>No Data Found</h3>
                        <div style={{display: this.state.no_data_mess=="none" ? "block" :"none"}}>
                        <div className="mycalendar" style={{height:my_height-181}}>
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th scope="col" className="padd_policy_in">Policy Number</th>
                                            <th scope="col" className="padd_policy_in">Customer Name</th>
                                            <th scope="col" className="padd_policy_in" style={{textAlign:"end"}}>Gross Premium</th>
                                            <th scope="col" className="padd_policy_in" style={{textAlign:"center"}}>Calculated Form Filling Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.time_tracker.map((value,indx)=>{
                                        return(
                                            <tr key = {indx}>
                                            <th className="padd_policy_td" scope="row">{value.policy_number}</th>
                                            <td className="padd_policy_td">{value.customer_name}</td>
                                            <td className="padd_policy_td" style={{textAlign:"end"}}>&#x20b9;{value.gross_premium}</td>
                                            <td className="padd_policy_td" style={{textAlign:"center"}}>
                                            <div className="tooltip_poo">
                                                <div>{value.calculated_form_filling_time}</div>
                                                <span className="tooltiptext">
                                                    <span>Start Time :{" "}{value.start_filling_time} </span>
                                                    <span>End Time :{" "} {value.end_filling_time}</span>
                                                </span>

                                             </div>
                                            </td>
                                        </tr>
                                        )
                                    })}
                                    </tbody>
                                </Table>
                           </div>
                      </div>

                       {/* ********************************* Pagination ***************************************** */}

                       <div style={{display:this.state.total_pages==1?"none":'inline-flex',width:"100%",marginTop:"10px",marginBottom:"20px",padding: "1px 8px"}}>
                              <Button color="warning" className="pagination_1"
                              style={{ marginLeft:"auto",marginRight:"5px"}}
                            //   outline onClick={() => this.get_policy_dock(this.state.startDate,this.state.endDate,this.state.search_user,1)}>first</Button>
                              outline onClick={() => this.this.fetch_mis_timing_tracker(this.state.emp_id,this.state.startDate,this.state.endDate,1)}>first</Button>


                              <Button color="warning" className="pagination_1"
                              style={{marginLeft:"5px",marginRight:"5px",backgroundColor: this.state.current_page == 1 ? '#8bc240' : '',
                              color: this.state.current_page == 1 ? 'white' : '#8bc240',display: this.state.current_page == 1 ? "none" : "block"}} outline
                              onClick={() => {
                                  if (this.state.current_page > 1) {
                                    // this.get_policy_dock(this.state.startDate,this.state.endDate,this.state.search_user,this.state.current_page - 1)
                                    this.fetch_mis_timing_tracker(this.state.emp_id,this.state.startDate,this.state.endDate,this.state.current_page - 1)
                                  } else {
                                    // this.get_policy_dock(this.state.startDate,this.state.endDate,this.state.search_user,this.state.current_page)
                                    this.fetch_mis_timing_tracker(this.state.emp_id,this.state.startDate,this.state.endDate,this.state.current_page)
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
                                    //   this.get_policy_dock(this.state.startDate,this.state.endDate,this.state.search_user,this.state.current_page + 1)
                                    this.fetch_mis_timing_tracker(this.state.emp_id,this.state.startDate,this.state.endDate,this.state.current_page + 1)
                                  } else {
                                    //   this.get_policy_dock(this.state.startDate,this.state.endDate,this.state.search_user,this.state.current_page)
                                      this.fetch_mis_timing_tracker(this.state.emp_id,this.state.startDate,this.state.endDate,this.state.current_page )
                                  }
                              }}
                              >next</Button>
                              <Button color="warning" className="pagination_1"
                              style={{marginLeft:"5px",marginRight:"3px"}}
                            //   outline onClick={() => this.get_policy_dock(this.state.startDate,this.state.endDate,this.state.search_user,this.state.total_pages)}>last</Button>
                              outline onClick={() => this.fetch_mis_timing_tracker(this.state.emp_id,this.state.startDate,this.state.endDate,this.state.total_pages)}>last</Button>
                            </div>


                      </div>
                    </div>
                   </div>
                   </div>


                          </Tabs.Pane>
                        <Tabs.Pane tabId="profile">
                        <h3 style={{ display: this.state.no_emp, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:gk}}>No Data Found</h3>
                   <div className="" style={{display:this.state.no_emp == "none" ? "block" :"none"}}>

                       <div className="row">
                        <div className="col-lg-3 col-md-12 height_13" style={{paddingRight:"0px"}}>
                        <div className="height_13 mycalendar" style={{height:this.state.total_pages_emp==1 ? my_height-110 : my_height-163,display: this.state.ipad_emp_list}}>
                            <Table striped className="purchase_table">
                            <thead>
                              <tr>
                                <th scope="col" className="purchase_heading" style={{ border: "none", whiteSpace: "nowrap",padding:"10px 25px" }}>Employee Name</th>
                               </tr>
                            </thead>
                            <tbody>
                              {
                                this.state.employee_array.map((value12, index12) => {
                                  return (
                                    <tr style={{ cursor: 'pointer' }} key={index12} onClick={() => {
                                      this.setState({
                                        spinner_1: 'block'
                                      })
                                      setTimeout(() => {
                                        this.fetch_operation_timing_tracker(value12._id,this.state.startDate_op,this.state.endDate_op,this.state.current_page_op)
                                      }, 0)
                                    }}
                                    >
                                      <td className="strip_paded" style={{ borderLeft: value12._id == this.state.emp_id ? "5px solid  #007bff" : " 0px", verticalAlign: "middle",padding:"10px 25px" }} >{value12.name}</td>
                                     </tr>
                                  )
                                })
                              }

                            </tbody>
                          </Table>
                           </div>

                           <div style={{display:this.state.total_pages_emp==1?"none":'inline-flex',width:"100%",marginTop:"10px",marginBottom:"20px",padding: "1px 8px"}}>
                              <Button color="warning" className="pagination_1"
                              style={{ marginLeft:"auto",marginRight:"5px"}}
                              outline onClick={() => this.fetch_employeee(this.state.search_user,1)}>first</Button>


                              <Button color="warning" className="pagination_1"
                              style={{marginLeft:"5px",marginRight:"5px",backgroundColor: this.state.current_page_emp == 1 ? '#8bc240' : '',
                              color: this.state.current_page_op == 1 ? '#8bc240' : '#8bc240',display: this.state.current_page_emp == 1 ? "none" : "block"}} outline
                              onClick={() => {
                                  if (this.state.current_page_emp > 1) {
                                    this.fetch_employeee(this.state.search_user,this.state.current_page_emp - 1)
                                  } else {
                                    this.fetch_employeee(this.state.search_user,this.state.current_page_emp)
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
                                    this.fetch_employeee(this.state.search_user,this.state.current_page_emp + 1)
                                  } else {
                                      this.fetch_employeee(this.this.state.search_user,this.state.current_page_emp )
                                  }
                              }}
                              >next</Button>
                              <Button color="warning" className="pagination_1"
                              style={{marginLeft:"5px",marginRight:"3px"}}
                              outline onClick={() => this.fetch_employeee(this.state.search_user,this.state.total_pages_emp)}>last</Button>
                            </div>
                        </div>

                        <div className="col-lg-9 col-md-12 col-sm-12 admin_ledttt" style={{display: device_width < 769 ? this.state.ipad_width : "block",paddingLeft: "0px"}}>
                        <Spinner color="warning" className="employee_spinner_1" style={{ marginTop: gk, display: this.state.spinner_1 }} />
                        <div style={{display:this.state.spinner_1=="none" ? "block":"none"}}>
                        <div className="back_btn">
                          <Button className="" style={{ marginLeft: "5px",  backgroundColor: '#007bff', borderColor: '#007bff',textTransform:"capitalize", display: device_width < 769 ? "inline-flex" : "none",paddingTop:" 5px"}}
                                                    onClick={() => {
                                                    this.setState({
                                                        ipad_emp_list:"block",
                                                        ipad_width:"none"
                                                     })
                                                     }}>Back</Button>
                          </div>
                        <h3 style={{ display: this.state.no_data_mess, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:gk}}>No Data Found</h3>
                        <div style={{display: this.state.no_data_mess=="none" ? "block" :"none"}}>
                        <div className="mycalendar" style={{height:my_height-181}}>
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th scope="col" className="padd_policy_in">Policy Number</th>
                                            <th scope="col" className="padd_policy_in">Customer Name</th>
                                            <th scope="col" className="padd_policy_in" style={{textAlign:"end"}}>Gross Premium</th>
                                            <th scope="col" className="padd_policy_in" style={{textAlign:"center"}}>Calculated Form Submit Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.op_time_tracker.map((value,indx)=>{
                                        return(
                                            <tr key = {indx}>
                                            <th className="padd_policy_td" scope="row">{value.policy_number}</th>
                                            <td className="padd_policy_td">{value.customer_name}</td>
                                            <td className="padd_policy_td" style={{textAlign:"end"}}>&#x20b9;{value.gross_premium}</td>
                                            <td className="padd_policy_td" style={{textAlign:"center"}}>
                                            <div className="tooltip_poo">
                                                <div>{value.calculated_form_submit_time}</div>
                                                <span className="tooltiptext">
                                                    <span>Start Time :{" "}{value.start_filling_time} </span>
                                                    <span>End Time :{" "} {value.end_filling_time}</span>
                                                </span>

                                             </div>
                                            </td>
                                        </tr>
                                        )
                                    })}
                                    </tbody>
                                </Table>
                                </div>



                       {/* ********************************* Pagination ***************************************** */}

                       <div style={{display:this.state.total_pages_op==1?"none":'inline-flex',width:"100%",marginTop:"10px",marginBottom:"20px",padding: "1px 8px"}}>
                              <Button color="warning" className="pagination_1"
                              style={{ marginLeft:"auto",marginRight:"5px"}}
                              outline onClick={() => this.fetch_operation_timing_tracker(this.state.emp_id,this.state.startDate_op,this.state.endDate_op,1)}>first</Button>


                              <Button color="warning" className="pagination_1"
                              style={{marginLeft:"5px",marginRight:"5px",backgroundColor: this.state.current_page_op == 1 ? '#8bc240' : '',
                              color: this.state.current_page_op == 1 ? 'white' : '#8bc240',display: this.state.current_page_op == 1 ? "none" : "block"}} outline
                              onClick={() => {
                                  if (this.state.current_page_op > 1) {
                                    this.fetch_operation_timing_tracker(this.state.emp_id,this.state.startDate_op,this.state.endDate_op,this.state.current_page_op - 1)
                                  } else {
                                    this.fetch_operation_timing_tracker(this.state.emp_id,this.state.startDate_op,this.state.endDate_op,this.state.current_page_op)
                                  }
                              }}
                              >Previous</Button>
                                {renderPageNumbers_op}

                              <Button color="warning" className="pagination_1"
                              style={{marginLeft:"5px",backgroundColor: this.state.current_page_op == this.state.total_pages_op ? '#8bc240' : '',
                              display: this.state.current_page_op == this.state.total_pages_op ? "none" : "block",
                              color: this.state.current_page_op == this.state.total_pages_op ? 'white' : '#8bc240'}} outline
                              onClick={() => {
                                  if (this.state.current_page_op < this.state.total_pages_op) {
                                    this.fetch_operation_timing_tracker(this.state.emp_id,this.state.startDate_op,this.state.endDate_op,this.state.current_page_op + 1)
                                  } else {
                                      this.fetch_operation_timing_tracker(this.state.emp_id,this.state.startDate_op,this.state.endDate_op,this.state.current_page_op )
                                  }
                              }}
                              >next</Button>
                              <Button color="warning" className="pagination_1"
                              style={{marginLeft:"5px",marginRight:"3px"}}
                              outline onClick={() => this.fetch_operation_timing_tracker(this.state.emp_id,this.state.startDate_op,this.state.endDate_op,this.state.total_pages_op)}>last</Button>
                            </div>


                      </div>
                      </div>
                    </div>
                   </div>
                   </div>


                           </Tabs.Pane>
                    </Tabs.Content>


               </div>
            </Fragment>
        );
    }
}

export default connect( ( { settings } ) => (
    {
        settings,
    }
) )( Content );
