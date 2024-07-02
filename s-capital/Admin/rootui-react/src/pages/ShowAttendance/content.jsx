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
 import MarkdownEditor from '../../components/easy-mde';
 import PageTitle from '../../components/page-title';
 import {
    Badge,Button, Collapse, ListGroup, ListGroupItem,Spinner,Table,ButtonGroup,Input, Modal, ModalBody,Tooltip,UncontrolledTooltip, ModalFooter,Label,CustomInput
  } from 'reactstrap';
  import {
    addToast as actionAddToast,
  } from '../../actions';
  import Cookies from 'js-cookie';
  import Icon from '../../components/icon';
//   import DatePicker from 'react-datepicker';
  import DatePicker from '../../components/date-time-picker';
  import dateFormat from 'dateformat';

// import 'react-datepicker/dist/react-datepicker.css';
  
 
 /**
  * Component
  */

  const device_width =   window.innerWidth;
  var height =   window.innerHeight;
  console.log("emp_screen.height", height);
  const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
  console.log("emp_nav_height",nav_height);
  var my_height = height - nav_height;
  var gk = (my_height/2)-100;
  console.log("emp_gk",gk);
  if(device_width < 600){
    var gk = (my_height/2) - 50;
  }



 class Content extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading:"block",
            no_data_message:"none",
            over_all_pending_payments:"",
            monthly_salary_array:[],
            TrueAmountPaid:false,
            all_pending_payments:false,
            amount_paid_button:"Amount Paid",
            hide_add_payment:"show",
            button_submit:false,
            payroll_control : Cookies.get('payroll_control'),
            ShowAttendanceModel:false,
            ShowAttendanceModelFalse:false,
            show_date_for_attendance:new Date(),
            month_array:new Array(30).fill({}),
            all_months:[],
            present_count:0,
            absent_count:0,
            halfday_count:0,
            paid_leave_count:0,
            unmarked_count:0,
            // staff_name:attendance_single_emp[0].emp_name
        }      
    }

        componentDidMount() {
        console.log("PageNotFound");
        var attendance_single_emp = JSON.parse(Cookies.get('ShowAttendanceCookies'));
        console.log("attendance_single_emp****************",attendance_single_emp);
        this.setState({
            staff_name:attendance_single_emp[0].emp_name,
            emp_id:attendance_single_emp[0].emp_id
        })
        this.show_attendance_admin_panel(this.state.show_date_for_attendance,attendance_single_emp[0].emp_id)
        }

            show_attendance_admin_panel=(month,emp_id)=>{
                
                const { settings } = this.props;
                const today = new Date(month);
                 const yyyy = today.getFullYear();
                 let mm = today.getMonth() + 1; // Months start at 0!
                 let dd = today.getDate();
                 if (dd < 10) dd = '0' + dd;
                 if (mm < 10) mm = '0' + mm;
                 var formattedToday_start = yyyy;
                 var my_date  =formattedToday_start
                 this.setState({
                     export_date:my_date
                 })
         
                var params = {
                 year:formattedToday_start,
                 emp_id : emp_id
                 }
                console.log("params muster",params);
                 const res = fetch(settings.api_url + "api/payroll/show_attendance_admin_panel", {
                     method: 'POST',
                     body: JSON.stringify(params),
                     headers: {
                         "Content-type": "application/json; charset=UTF-8",
                     }
                 }).then((response) => response.json())
                     .then(json => {
                         console.log("Fetch Show Attendance ***************", json)
                         var data = json;
                         if (data.status == true) {
                            var attendance_muster_roll_array = data.data[0].all_months
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
                                 attendance_muster_roll_array:data.data,
                                 present_count:data.data[0].present_count,
                                 absent_count:data.data[0].absent_count,
                                 halfday_count:data.data[0].halfday_count,
                                 paid_leave_count:data.data[0].paid_leave_count,
                                 unmarked_count:data.data[0].unmarked_count,
                                 all_months:data.data[0].all_months,
                                 isLoading:"none",
                                 no_data_message:"none",
                             });
                         }
                         else {
                             this.setState({
                                all_months:[],
                                isLoading:"none",
                                 no_data_message:"block",
                             });
                         }
                     })
            }

            backtopayroll=()=>{
                // Cookies.remove("ShowAttendanceCookies")
                location.hash = "/payroll"
            }



     render() {
       

         return (
             <Fragment>
                  <PageTitle className="payroll_new">
                      <div className="row">
                         <div className="col-lg-8 col-md-8 col-sm-12" style={{display:"inline-flex"}}>
                             <h1 className="heading_top">{this.state.staff_name} Attendance</h1>
                             <div>
                             <Button color="info" style={{padding:"9px 10px"}} onClick={()=>{this.backtopayroll()}} className="back_to_pay"><Icon name="arrow-left" style={{strokeWidth : "2"}} /></Button>
                             </div>
                         </div>
                         <div className="col-lg-4 col-md-4 col-sm-12" style={{textAlign:"end"}}>
                        <div style={{display:"inline-flex", width:"100%",justifyContent:"flex-end"}}>
                            <DatePicker
                                selected={this.state.show_date_for_attendance}
                                onChange={(val) => {
                                    this.setState({
                                        show_date_for_attendance: val,
                                        isLoading:"block`"
                                    });
                                    //console.log(val);
                                    this.show_attendance_admin_panel(val,this.state.emp_id)
                                }}
                                dateFormat="yyyy"
                                showYearPicker
                                className="rui-datetimepicker form-control w-auto_12 search_1 "
                                calendarClassName="tren-pembayaran__wrapper__datepicker"
                                placeholder="Select Month"
                            />
                           
                         </div>
                         </div>

                      </div>
                  </PageTitle>


                  <div className="test_collapse ">
                  <Spinner color="warning" className="spinner_css_12345666" style={{marginTop:gk,display: this.state.isLoading}}/>
                  <div className="test_collapse" style={{display: this.state.isLoading=="none" ? "flex" :"none"}}>
                     <h3 style={{ display: this.state.no_data_message, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:gk}}>No Data Found</h3>
                        <div className="" style={{display: this.state.no_data_message=="none" ? "block" :"none", width:"100%"}}>
                            <div className="mycalendar test_collapse padd_ing_new " style={{height:my_height-57}}>
                            <div className="form rui-sign-form rui-sign-form-cloud" style={{marginTop:"25px"}}>
                            <div className="">
                                    <div className="row show_in_line" style={{paddingLeft:"15px"}}>
                                    <div className="col-lg-2 col-md-2">
                                        <div className="heading_top_newww"><Label className="label_attendance">Present</Label></div>
                                        <div className="heading_bottom">{this.state.present_count}</div>
                                        {/* <div className="heading_bottom">{this.state.present_staff}</div> */}
                                    </div>
                                    <div className="line_attendance_summery"></div>
                                    <div className="col-lg-2 col-md-2">
                                        <div className="heading_top_newww"><Label className="label_attendance">Absent</Label></div>
                                        <div className="heading_bottom">{this.state.absent_count}</div>
                                    </div>
                                    <div className="line_attendance_summery"></div>
                                    <div className="col-lg-2 col-md-2">
                                        <div className="heading_top_newww"><Label className="label_attendance">Half Day</Label></div>
                                        <div className="heading_bottom">{this.state.halfday_count}</div>
                                    </div>
                                    <div className="line_attendance_summery"></div>
                                    <div className="col-lg-2 col-md-2">
                                        <div className="heading_top_newww"><Label className="label_attendance">Overtime</Label></div>
                                        <div className="heading_bottom">0</div>
                                    </div>
                                    <div className="line_attendance_summery"></div>
                                    <div className="col-lg-2 col-md-2">
                                        <div className="heading_top_newww"><Label className="label_attendance">Paid Leave</Label></div>
                                        <div className="heading_bottom">{this.state.paid_leave_count}</div>
                                    </div>
                                    <div className="line_attendance_summery"></div>
                                    <div className="col-lg-2 col-md-2">
                                        <div className="heading_top_newww"><Label className="label_attendance">Unpaid leave</Label></div>
                                        <div className="heading_bottom">0</div>
                                    </div>
                                </div>

                                <div className="muster_data_show" style={{marginTop:"30px"}}>
                                    {this.state.all_months.map((val,ind)=>{
                                        return(
                                   <div key={ind}>
                                       <h4 className="current_mpnth">{dateFormat(new Date(val.start_date), "mmmm yyyy")}</h4>
                                        <div className="table-responsive-lg scroll_1 test_collapse">
                                         <Table  bordered>
                                            <thead>
                                                 <tr>
                                                    <th scope="col" className="MUSTER_ROLL_TABLE DAYS_BACK" >
                                                         <div> DAYS</div>
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
                                                                            <th scope="col" className="MUSTER_ROLL_TABLE" style={{backgroundColor :value.backgroundColor,color : value.color }} key={index}>
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
                                        )
                                    })}
                                    
                               </div>
                            </div>
                            </div>

                            </div>
                        </div>
                  </div>
                  </div>


                      {/* *********************** Engegment Model ****************************************** */}
                      <Modal
                         isOpen={ this.state.ShowAttendanceModel }
                         toggle={ this.ShowAttendanceModel }
                         className={ this.props.className,"show_attenedance_model modal-dialog-centered" }
                         fade
                     >
                         <div className="modal-header">
                             <h5 className="modal-title h2">Attendance Chart</h5>
                             <Button className="close" color="" onClick={ this.ShowAttendanceModelFalse }>
                                 <Icon name="x" />
                             </Button>
                         </div>
                         <ModalBody>
                            <div className="form rui-sign-form rui-sign-form-cloud">
                            <div className="">
                                     <div className="row" style={{marginBottom:"25px"}}>
                                       <div className="col-lg-8 col-md-8">
                                        <h3>{this.state.staff_name}</h3>
                                       </div>
                                       <div className="col-lg-4 col-md-4" style={{textAlign:"end"}}>
                                       <DatePicker
                                            selected={this.state.show_date_for_attendance}
                                            onChange={(val) => {
                                                this.setState({
                                                    show_date_for_attendance: val,
                                                });
                                                //console.log(val);
                                                this.show_attendance_admin_panel(val)
                                            }}
                                            dateFormat="MM-yyyy"
                                            showMonthYearPicker
                                            className="rui-datetimepicker form-control w-auto_12 search_1 "
                                            calendarClassName="tren-pembayaran__wrapper__datepicker"
                                            placeholder="Select Month"
                                        />

                                       </div>
                                     </div>
                                    <div className="row show_in_line">
                                    <div className="col-lg-2 col-md-2">
                                        <div className="heading_top_newww"><Label>Present</Label></div>
                                        <div className="heading_bottom">{this.state.present_staff}</div>
                                    </div>
                                    <div className="line_attendance_summery"></div>
                                    <div className="col-lg-2 col-md-2">
                                        <div className="heading_top_newww"><Label>Absent</Label></div>
                                        <div className="heading_bottom">{this.state.absent_staff}</div>
                                    </div>
                                    <div className="line_attendance_summery"></div>
                                    <div className="col-lg-2 col-md-2">
                                        <div className="heading_top_newww"><Label>Half Day</Label></div>
                                        <div className="heading_bottom">{this.state.halfday_staff}</div>
                                    </div>
                                    <div className="line_attendance_summery"></div>
                                    <div className="col-lg-2 col-md-2">
                                        <div className="heading_top_newww"><Label>Overtime</Label></div>
                                        <div className="heading_bottom">{this.state.halfday_staff}</div>
                                    </div>
                                    <div className="line_attendance_summery"></div>
                                    <div className="col-lg-2 col-md-2">
                                        <div className="heading_top_newww"><Label>Paid Leave</Label></div>
                                        <div className="heading_bottom">{this.state.leave_staff}</div>
                                    </div>
                                    <div className="line_attendance_summery"></div>
                                    <div className="col-lg-2 col-md-2">
                                        <div className="heading_top_newww"><Label>Uppaid leave</Label></div>
                                        <div className="heading_bottom">{this.state.sick_leave_staff}</div>
                                    </div>
                                </div>

                                <div className="muster_data_show">
                                    <div className="table-responsive-lg scroll_1 test_collapse">
                                         <Table  bordered>
                                            <thead>
                                                 <tr>
                                                    <th scope="col" className="MUSTER_ROLL_TABLE DAYS_BACK" >
                                                         <div> DAYS</div>
                                                     </th>
                                                    {this.state.month_array.map((_,index)=>{
                                                                        return(
                                                                            <th scope="col" className="MUSTER_ROLL_TABLE" style={{backgroundColor :"#2fc787",color : "#fff" }} key={index}>
                                                                            <div className="date_muster">
                                                                                <p>S</p>
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
                                                                    {this.state.month_array.map((_,index)=>{
                                                                        return(
                                                                            <th scope="col" className="MUSTER_ROLL_TABLE" style={{backgroundColor :"#2fc787",color : "#fff" }} key={index}>
                                                                            <div className="date_muster">
                                                                                <p>1</p>
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
                                                                    {this.state.month_array.map((_,index)=>{
                                                                        return(
                                                                            <th scope="col" className="MUSTER_ROLL_TABLE" style={{backgroundColor :"#2fc787",color : "#fff" }} key={index}>
                                                                            <div className="date_muster">
                                                                                <p>P</p>
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
                                                                    {this.state.month_array.map((_,index)=>{
                                                                        return(
                                                                            <th scope="col" className="MUSTER_ROLL_TABLE" style={{backgroundColor :"#2fc787",color : "#fff"}} key={index}>
                                                                            <div className="date_muster">
                                                                                <p>08:30</p>
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
                            </div>
                         </ModalBody>
                         <ModalFooter>
                             <Button color="secondary" style={{textTransform:"capitalize"}} onClick={ this.ShowAttendanceModelFalse }>Close</Button>
                             { ' ' }
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
 ), { addToast: actionAddToast } )( Content );
 