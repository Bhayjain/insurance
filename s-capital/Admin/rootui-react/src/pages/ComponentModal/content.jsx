/**
 * External Dependencies
 */
 import React, { Component, Fragment } from 'react';
 import { connect } from 'react-redux';
 import { Row, Col } from 'reactstrap';

 /**
  * Internal Dependencies
  */

  import './style.scss';
 import Snippet from '../../components/snippet';
 import Icon from '../../components/icon';
 import PageTitle from '../../components/page-title';
 import { Button, Modal, ModalBody, ModalFooter,CustomInput,Label,Spinner,ButtonGroup,Table } from 'reactstrap';
 import dateFormat from 'dateformat';
 import { RangeDatePicker } from 'react-google-flight-datepicker';
 import 'react-google-flight-datepicker/dist/main.css';
 import Cookies from 'js-cookie';
 import DatePicker from '../../components/date-time-picker';

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
 /**
  * Component
  */
 class Content extends Component {
     constructor( props ) {
         super( props );

         this.state = {
             modalOpen: false,
             current_page:1,
             sm_array: [],
             direct_array: [],
             telecaller_array: [],
             no_data:"none",
             isLoading:"block",
             total_pages:"",
             total:"",
             startDate_new:new Date(),
             startDate:"",
             endDate:"",
             total_net_premium:"",
             total_payout_amount:"",
             cal_start_date:"",
             cal_end_date:"",
             total_policy:"",
             reporting_control:Cookies.get('reporting_control'),
         };
         setTimeout(() => {
            this.fetch_all_daily_sales_report()
            }, 0)
         
     }



     fetch_all_daily_sales_report = (startDate)=>  {
         if (startDate == "" || startDate == undefined ) {
             //console.log("startDate",startDate);
         }
         else{

             const today = new Date(startDate);
             const yyyy = today.getFullYear();
             let mm = today.getMonth() + 1; // Months start at 0!
             let dd = today.getDate();
             if (dd < 10) dd = '0' + dd;
             if (mm < 10) mm = '0' + mm;
             const formattedToday_start = yyyy + '-' + mm + '-' + "01";
             const formattedToday_end = yyyy + '-' + mm + '-' + "31";
             //console.log("formattedToday",formattedToday_start);
             //console.log("formattedToday_end",formattedToday_end);

             var my_date = [formattedToday_start,formattedToday_end]

             this.setState({
                date_range_for_export:my_date
             })
         }

         var params={
             date_range:my_date
         }
         //console.log("Reporttt",params);
         const { settings } = this.props;
          const res = fetch(settings.api_url + "fetch_employeewise_monthly_business_report", {
              method: 'POST',
              body: JSON.stringify(params),
              headers: {
                  "Content-type": "application/json; charset=UTF-8",
              }
          }).then((response) => response.json())
              .then(json => {
                  console.log("fetch Employeeee Wise Report ****", json)
                  var data = json;
                  if (data.status == true) {
                    var sm_no_of_policy_new = 0;
                    var sm_net_premium_new = 0;
                    var sm_gross_premium_new = 0;
                    var sm_po_amount_new = 0;
                    var sm_sc_po_amount = 0;
                    var sm_profit_amount = 0;
                    var sm_monthly_salary = 0;
                    var sm_net_profit_amount = 0;
                    for (var i = 0; i < data.sm_array.length; i++) {
                        if (data.sm_array[i].name=="Grand Total") {
                            var my_name =data.sm_array[i].name
                            sm_no_of_policy_new = Number(data.sm_array[i].no_of_policy);
                            sm_net_premium_new = Number(data.sm_array[i].net_premium);
                            sm_gross_premium_new = Number(data.sm_array[i].gross_premium);
                            sm_po_amount_new = Number(data.sm_array[i].po_amount);
                            sm_sc_po_amount = Number(data.sm_array[i].sc_po_amount);
                            sm_profit_amount = Number(data.sm_array[i].profit_amount);
                            sm_monthly_salary = Number(data.sm_array[i].monthly_salary);
                            sm_net_profit_amount = Number(data.sm_array[i].net_profit_amount);
                        }
                    }

                    //  FOR DIRECT Data
                    var direct_no_of_policy_new = 0;
                    var direct_net_premium_new = 0;
                    var direct_gross_premium_new = 0;
                    var direct_po_amount_new = 0;
                    var direct_sc_po_amount = 0;
                    var direct_profit_amount = 0;
                    var direct_monthly_salary = 0;
                    var direct_net_profit_amount = 0;
                    for (var i = 0; i < data.direct_array.length; i++) {
                        if (data.direct_array[i].name=="Grand Total") {
                            direct_no_of_policy_new = Number(data.direct_array[i].no_of_policy);
                            direct_net_premium_new = Number(data.direct_array[i].net_premium);
                            direct_gross_premium_new = Number(data.direct_array[i].gross_premium);
                            direct_po_amount_new = Number(data.direct_array[i].po_amount);
                            direct_sc_po_amount = Number(data.direct_array[i].sc_po_amount);
                            direct_profit_amount = Number(data.direct_array[i].profit_amount);
                            direct_monthly_salary = Number(data.direct_array[i].monthly_salary);
                            direct_net_profit_amount = Number(data.direct_array[i].net_profit_amount);
                        }
                    }


                    //  FOR DIRECT Data
                    var telecaller_no_of_policy_new = 0;
                    var telecaller_net_premium_new = 0;
                    var telecaller_gross_premium_new = 0;
                    var telecaller_po_amount_new = 0;
                    var telecaller_sc_po_amount = 0;
                    var telecaller_profit_amount = 0;
                    var telecaller_monthly_salary = 0;
                    var telecaller_net_profit_amount = 0;
                    for (var i = 0; i < data.telecaller_array.length; i++) {
                        if (data.telecaller_array[i].name=="Grand Total") {
                            telecaller_no_of_policy_new = Number(data.telecaller_array[i].no_of_policy);
                            telecaller_net_premium_new = Number(data.telecaller_array[i].net_premium);
                            telecaller_gross_premium_new = Number(data.telecaller_array[i].gross_premium);
                            telecaller_po_amount_new = Number(data.telecaller_array[i].po_amount);
                            telecaller_sc_po_amount = Number(data.telecaller_array[i].sc_po_amount);
                            telecaller_profit_amount = Number(data.telecaller_array[i].profit_amount);
                            telecaller_monthly_salary = Number(data.telecaller_array[i].monthly_salary);
                            telecaller_net_profit_amount = Number(data.telecaller_array[i].net_profit_amount);
                        }
                    }
                    console.log("sm_monthly_salary",sm_monthly_salary);
                    console.log("direct_monthly_salary",direct_monthly_salary);
                    console.log("telecaller_monthly_salary",telecaller_monthly_salary);
                    console.log("total_salaryy",sm_monthly_salary + direct_monthly_salary + telecaller_monthly_salary);
                    console.log("my_name***********",my_name.split(" ")[1]);


                    var grand_total_net_policy_no = sm_no_of_policy_new + direct_no_of_policy_new + telecaller_no_of_policy_new
                    var grand_total_net_premium = sm_net_premium_new + direct_net_premium_new + telecaller_net_premium_new
                    var grand_total_gross_premium = sm_gross_premium_new + direct_gross_premium_new + telecaller_gross_premium_new
                    var grand_total_po_amount = sm_po_amount_new + direct_po_amount_new + telecaller_po_amount_new
                    var grand_total_sc_po_amount = sm_sc_po_amount + direct_sc_po_amount + telecaller_sc_po_amount
                    var grand_total_profit_amount = sm_profit_amount + direct_profit_amount + telecaller_profit_amount
                    var grand_total_monthly_salary = sm_monthly_salary + direct_monthly_salary + telecaller_monthly_salary
                    var grand_total_net_profit_amount = sm_net_profit_amount + direct_net_profit_amount + telecaller_net_profit_amount
                    console.log("grand_total_net_policy_no",grand_total_net_policy_no);


                      this.setState({
                          sm_array: data.sm_array,
                          direct_array: data.direct_array,
                          telecaller_array: data.telecaller_array,
                          no_data:"none",
                          isLoading:"none",
                          grand_total_net_policy_no:grand_total_net_policy_no,
                          grand_total_net_premium:grand_total_net_premium,
                          grand_total_gross_premium:grand_total_gross_premium,
                          grand_total_po_amount:grand_total_po_amount,
                          grand_total_sc_po_amount:grand_total_sc_po_amount,
                          grand_total_profit_amount:grand_total_profit_amount,
                          grand_total_monthly_salary:grand_total_monthly_salary,
                          grand_total_net_profit_amount:grand_total_net_profit_amount,
                      });
                  }
                  else {
                      this.setState({
                          sm_array: [],
                          direct_array: [],
                          telecaller_array: [],
                          no_data:"block",
                          isLoading:"none",
                          grand_total_net_policy_no:"",
                          grand_total_net_premium:"",
                          grand_total_gross_premium:"",
                          grand_total_po_amount:"",
                          grand_total_sc_po_amount:"",
                          grand_total_profit_amount:"",
                          grand_total_monthly_salary:"",
                          grand_total_net_profit_amount:"",

                      });
                  }

                  this.setState({
                    cal_start_date:data.show_date.start_date,
                    cal_end_date:data.show_date.end_date,
                 })

              })
      }
     daily_sales_report = ()=>  {
         const { settings } = this.props;
         //console.log("this.state.date_range_for_export",this.state.date_range_for_export);
         var params={
            date_range:this.state.date_range_for_export
        }

        console.log("Export Params",params);
          const res = fetch(settings.api_url + "export_employeewise_monthly_business_report", {
              method: 'POST',
              body: JSON.stringify(params),
              headers: {
                  "Content-type": "application/json; charset=UTF-8",
              }
          }).then((response) => response.json())
              .then(json => {
                  console.log("fetch Export Employeee Wiseeee ****", json)
                  var data = json;
                  if (data.status == true) {

                      window.open(data.path, "_blank");
                  }
                  else {
                    //console.log("kkkkk");
                  }
              })
      }


     export_seperate_employeewise_monthly_business_report = (emp_type)=>  {
         const { settings } = this.props;
         //console.log("this.state.date_range_for_export",this.state.date_range_for_export);
         if (this.state.date_range_for_export == undefined || this.state.date_range_for_export == "") {
            var params={
                emp_type:emp_type
            } 
         }else{
            var params={
                date_range:this.state.date_range_for_export,
                emp_type:emp_type
            }
         }
        

        console.log("Export Params",params);
          const res = fetch(settings.api_url + "export_seperate_employeewise_monthly_business_report", {
              method: 'POST',
              body: JSON.stringify(params),
              headers: {
                  "Content-type": "application/json; charset=UTF-8",
              }
          }).then((response) => response.json())
              .then(json => {
                  console.log("fetch Export Sep Wiseeee ****", json)
                  var data = json;
                  if (data.status == true) {

                      window.open(data.path, "_blank");
                  }
                  else {
                    //console.log("kkkkk");
                  }
              })
      }

     render() {
         console.log("this.state.cal_start_date",this.state.cal_start_date);
         return (
             <Fragment>
                <PageTitle className="daily_heading">
                 <div className="row">
                  <div className="col-lg-8 col-md-12" style={{display:"inline-flex", width:"100%"}}>
                      <h1 style={{marginTop: "0px"}}>Employee Wise Report<span className="time_datae" style={{display: this.state.isLoading =="none" ? "initial" :"none"}}> ({this.state.cal_start_date.split("-")[2] + "-" + this.state.cal_start_date.split("-")[1] + "-" +this.state.cal_start_date.split("-")[0] } to {this.state.cal_end_date.split("-")[2] + "-" + this.state.cal_end_date.split("-")[1] + "-" +this.state.cal_end_date.split("-")[0]})</span></h1>
                      {/* <Button style={{color:"#fff",marginLeft: "auto"}} onClick={ this.daily_sales_report }>Export</Button> */}
                 </div>
                  <div className="col-lg-4 col-md-12 top_view" style={{display:"inline-flex", width:"100%"}}>
                      <div className="date_pickerrr">

                                  <DatePicker
                                       selected={this.state.startDate_new}
                                       onChange={(val) => {
                                           this.setState({
                                            startDate_new: val,
                                           });
                                           this.fetch_all_daily_sales_report(val,this.state.current_page)
                                       }}

                                       placeholder="Select date"
                                       showMonthYearPicker
                                       dateFormat="MM-yyyy"
                                       className="rui-datetimepicker form-control "
                                   />



                          {/* <DatePicker
                            style={{ textAlign: "-webkit-center" }}
                            selected={this.state.date_new}
                            onChange={(val) => {
                                this.setState({
                                    date_new: val,
                                });
                                //console.log(val);
                                this.emp_performance_graph(this.state.emp_id,val)
                            }}
                            dateFormat="MM-yyyy"
                            showMonthYearPicker
                            className="rui-datetimepicker form-control w-auto_12 search_1 "
                            calendarClassName="tren-pembayaran__wrapper__datepicker"
                            placeholder="Select Month"
                        /> */}

                         {/* <RangeDatePicker
                                     name="daterange"
                                     startDate={this.state.startDate}
                                     endDate={this.state.endDate}
                                     onChange={(startDate, endDate) => {
                                         this.setState({
                                         startDate: startDate,
                                         endDate: endDate,
                                         daterang: [new Date(startDate).toISOString(), new Date(endDate).toISOString()]
                                         })
                                         this.fetch_all_daily_sales_report(startDate,endDate,this.state.current_page)
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
                                     /> */}
                             <Button disabled={this.state.reporting_control == "false" ? 'disabled' : ''} style={{color:"#fff",marginLeft: "12px"}} onClick={ this.daily_sales_report }>Export</Button>
                      </div>
                 </div>
                </div>
              </PageTitle>

              <Spinner color="warning" className="lead_spinner" style={{marginTop: gk, display: this.state.isLoading }} />
              <div className="table_start test_collapse" style={{display: this.state.isLoading =="none" ? "block" :"none"}}>
              <h3 style={{ display: this.state.no_data, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:gk}}>No Data Found</h3>
              {/* <div style={{display: this.state.no_data=="none" ? "block" :"none"}}> */}
              <div className="mycalendar" style={{display: this.state.no_data=="none" ? "block" :"none",height:my_height - 70}}>
              <div style={{display:this.state.sm_array=="" || this.state.sm_array==undefined ? "none" : "block"}}>
                  <div className="export_bnewww">
                  <h3 className="sm_wise_report">SM Employee Wise Report</h3>
                  <Button disabled={this.state.reporting_control == "false" ? 'disabled' : ''} style={{color:"#fff"}} onClick={()=> this.export_seperate_employeewise_monthly_business_report("SM") }>Export</Button>
                  </div>
                 <div className="table-responsive-lg scroll_1 test_collapse">
                 <Table striped>
                         <thead>
                             <tr>
                                 <th scope="col" className="table_head_new">SM Names</th>
                                 <th scope="col" className="table_head_new" style={{textAlign:"end"}}>No Of Policy</th>
                                 <th scope="col" className="table_head_new" style={{textAlign:"end"}}>Net Premium</th>
                                 <th scope="col" className="table_head_new" style={{textAlign:"end"}}>Gross Premium</th>
                                 <th scope="col" className="table_head_new" style={{textAlign:"end"}}>PO Amount</th>
                                 <th scope="col" className="table_head_new" style={{textAlign:"end"}}>SC PO Amount</th>
                                 <th scope="col" className="table_head_new" style={{textAlign:"end"}}>Profit</th>
                                 <th scope="col" className="table_head_new" style={{textAlign:"end"}}>Salary</th>
                                 <th scope="col" className="table_head_new" style={{textAlign:"end"}}>Net Profit</th>
                             </tr>
                         </thead>
                         <tbody>
                             {this.state.sm_array.map((value,index)=>{

                                 return(
                                     <tr key={index}>
                                     <th scope="row" className={value.name=="Grand Total" ? "table_sub_head total_new width_td" : "table_sub_head width_td"}>{value.name=="Grand Total" ? value.name.split(" ")[1]:value.name}</th>
                                     <td  className={value.name=="Grand Total" ? "table_sub_head total_new width_td" : "table_sub_head width_td"} style={{textAlign:"end"}}>{value.no_of_policy}</td>
                                     <td  className={value.name=="Grand Total" ? "table_sub_head total_new width_td" : "table_sub_head width_td"} style={{textAlign:"end"}}>&#x20b9; {value.net_premium}</td>
                                     <td  className={value.name=="Grand Total" ? "table_sub_head total_new width_td" : "table_sub_head width_td"} style={{textAlign:"end"}}>&#x20b9; {value.gross_premium}</td>
                                     <td  className={value.name=="Grand Total" ? "table_sub_head total_new width_td" : "table_sub_head width_td"} style={{textAlign:"end"}}>&#x20b9; {value.po_amount}</td>
                                     <td  className={value.name=="Grand Total" ? "table_sub_head total_new width_td" : "table_sub_head width_td"} style={{textAlign:"end"}}>&#x20b9; {value.sc_po_amount}</td>
                                     <td  className={value.name=="Grand Total" ? "table_sub_head total_new width_td" : "table_sub_head width_td"} style={{textAlign:"end"}}>&#x20b9; {value.profit_amount}</td>
                                     <td  className={value.name=="Grand Total" ? "table_sub_head total_new width_td" : "table_sub_head width_td"} style={{textAlign:"end"}}>&#x20b9; {value.monthly_salary}</td>
                                     <td  className={value.name=="Grand Total" ? "table_sub_head total_new width_td" : "table_sub_head width_td"} style={{textAlign:"end"}}>&#x20b9; {value.net_profit_amount}</td>
                                 </tr>
                                 )
                             })}
                         </tbody>
                     </Table>
                     </div>
                 </div>


              <div className="direct_wise_new" style={{display:this.state.direct_array=="" || this.state.direct_array==undefined ? "none" : "block"}}>
                  <div className="export_bnewww">
                  <h3 className="sm_wise_report">Direct Employee Wise Report</h3>
                  <Button disabled={this.state.reporting_control == "false" ? 'disabled' : ''} style={{color:"#fff"}} onClick={()=> this.export_seperate_employeewise_monthly_business_report("Direct")}>Export</Button>
                  </div>
                 <div className="table-responsive-lg scroll_1 test_collapse">
                 <Table striped>
                         <thead>
                             <tr>
                                 <th scope="col" className="table_head_new">Direct Names</th>
                                 <th scope="col" className="table_head_new" style={{textAlign:"end"}}>No Of Policy</th>
                                 <th scope="col" className="table_head_new" style={{textAlign:"end"}}>Net Premium</th>
                                 <th scope="col" className="table_head_new" style={{textAlign:"end"}}>Gross Premium</th>
                                 <th scope="col" className="table_head_new" style={{textAlign:"end"}}>PO Amount</th>
                                 <th scope="col" className="table_head_new" style={{textAlign:"end"}}>SC PO Amount</th>
                                 <th scope="col" className="table_head_new" style={{textAlign:"end"}}>Profit</th>
                                 <th scope="col" className="table_head_new" style={{textAlign:"end"}}>Salary</th>
                                 <th scope="col" className="table_head_new" style={{textAlign:"end"}}>Net Profit</th>
                             </tr>
                         </thead>
                         <tbody>
                             {this.state.direct_array.map((value,index)=>{

                                 return(
                                     <tr key={index}>
                                     <th scope="row" className={value.name=="Grand Total" ? "table_sub_head total_new width_td" : "table_sub_head width_td"}>{value.name=="Grand Total" ? value.name.split(" ")[1]:value.name}</th>
                                     <td  className={value.name=="Grand Total" ? "table_sub_head total_new width_td" : "table_sub_head width_td"} style={{textAlign:"end"}}>{value.no_of_policy}</td>
                                     <td  className={value.name=="Grand Total" ? "table_sub_head total_new width_td" : "table_sub_head width_td"} style={{textAlign:"end"}}>&#x20b9; {value.net_premium}</td>
                                     <td  className={value.name=="Grand Total" ? "table_sub_head total_new width_td" : "table_sub_head width_td"} style={{textAlign:"end"}}>&#x20b9; {value.gross_premium}</td>
                                     <td  className={value.name=="Grand Total" ? "table_sub_head total_new width_td" : "table_sub_head width_td"} style={{textAlign:"end"}}>&#x20b9; {value.po_amount}</td>
                                     <td  className={value.name=="Grand Total" ? "table_sub_head total_new width_td" : "table_sub_head width_td"} style={{textAlign:"end"}}>&#x20b9; {value.sc_po_amount}</td>
                                     <td  className={value.name=="Grand Total" ? "table_sub_head total_new width_td" : "table_sub_head width_td"} style={{textAlign:"end"}}>&#x20b9; {value.profit_amount}</td>
                                     <td  className={value.name=="Grand Total" ? "table_sub_head total_new width_td" : "table_sub_head width_td"} style={{textAlign:"end"}}>&#x20b9; {value.monthly_salary}</td>
                                     <td  className={value.name=="Grand Total" ? "table_sub_head total_new width_td" : "table_sub_head width_td"} style={{textAlign:"end"}}>&#x20b9; {value.net_profit_amount}</td>
                                 </tr>
                                 )
                             })}
                         </tbody>
                     </Table>
                     </div>
                 </div>


              <div style={{display:this.state.telecaller_array=="" || this.state.telecaller_array==undefined ? "none" : "block"}}>
                  <div className="export_bnewww">
                  <h3 className="sm_wise_report">Telecaller Employee Wise Report</h3>
                  <Button disabled={this.state.reporting_control == "false" ? 'disabled' : ''} style={{color:"#fff"}} onClick={()=> this.export_seperate_employeewise_monthly_business_report("Telecaller")}>Export</Button>
                  </div>
                 <div className="table-responsive-lg scroll_1 test_collapse">
                 <Table striped>
                         <thead>
                             <tr>
                                 <th scope="col" className="table_head_new">Telecaller Names</th>
                                 <th scope="col" className="table_head_new" style={{textAlign:"end"}}>No Of Policy</th>
                                 <th scope="col" className="table_head_new" style={{textAlign:"end"}}>Net Premium</th>
                                 <th scope="col" className="table_head_new" style={{textAlign:"end"}}>Gross Premium</th>
                                 <th scope="col" className="table_head_new" style={{textAlign:"end"}}>PO Amount</th>
                                 <th scope="col" className="table_head_new" style={{textAlign:"end"}}>SC PO Amount</th>
                                 <th scope="col" className="table_head_new" style={{textAlign:"end"}}>Profit</th>
                                 <th scope="col" className="table_head_new" style={{textAlign:"end"}}>Salary</th>
                                 <th scope="col" className="table_head_new" style={{textAlign:"end"}}>Net Profit</th>
                             </tr>
                         </thead>
                         <tbody>
                             {this.state.telecaller_array.map((value,index)=>{
                                 return(
                                     <tr key={index}>
                                     <th scope="row" className={value.name=="Grand Total" ? "table_sub_head total_new width_td" : "table_sub_head width_td"}>{value.name=="Grand Total" ? value.name.split(" ")[1]:value.name}</th>
                                     <td  className={value.name=="Grand Total" ? "table_sub_head total_new width_td" : "table_sub_head width_td"} style={{textAlign:"end"}}>{value.no_of_policy}</td>
                                     <td  className={value.name=="Grand Total" ? "table_sub_head total_new width_td" : "table_sub_head width_td"} style={{textAlign:"end"}}>&#x20b9; {value.net_premium}</td>
                                     <td  className={value.name=="Grand Total" ? "table_sub_head total_new width_td" : "table_sub_head width_td"} style={{textAlign:"end"}}>&#x20b9; {value.gross_premium}</td>
                                     <td  className={value.name=="Grand Total" ? "table_sub_head total_new width_td" : "table_sub_head width_td"} style={{textAlign:"end"}}>&#x20b9; {value.po_amount}</td>
                                     <td  className={value.name=="Grand Total" ? "table_sub_head total_new width_td" : "table_sub_head width_td"} style={{textAlign:"end"}}>&#x20b9; {value.sc_po_amount}</td>
                                     <td  className={value.name=="Grand Total" ? "table_sub_head total_new width_td" : "table_sub_head width_td"} style={{textAlign:"end"}}>&#x20b9; {value.profit_amount}</td>
                                     <td  className={value.name=="Grand Total" ? "table_sub_head total_new width_td" : "table_sub_head width_td"} style={{textAlign:"end"}}>&#x20b9; {value.monthly_salary}</td>
                                     <td  className={value.name=="Grand Total" ? "table_sub_head total_new width_td" : "table_sub_head width_td"} style={{textAlign:"end"}}>&#x20b9; {value.net_profit_amount}</td>
                                 </tr>
                                 )
                             })}
{/* 
                                    <tr >
                                     <th scope="row" className="table_sub_head total_new">Grand Total</th>
                                     <td className="table_sub_head total_new" style={{textAlign:"end"}}> {this.state.grand_total_net_policy_no}</td>
                                     <td className="table_sub_head total_new" style={{textAlign:"end"}}>&#x20b9; {this.state.grand_total_net_premium}</td>
                                     <td className="table_sub_head total_new" style={{textAlign:"end"}}>&#x20b9; {this.state.grand_total_gross_premium}</td>
                                     <td className="table_sub_head total_new" style={{textAlign:"end"}}>&#x20b9; {this.state.grand_total_po_amount}</td>
                                     <td className="table_sub_head total_new" style={{textAlign:"end"}}>&#x20b9; {this.state.grand_total_sc_po_amount}</td>
                                     <td className="table_sub_head total_new" style={{textAlign:"end"}}>&#x20b9; {this.state.grand_total_profit_amount}</td>
                                     <td className="table_sub_head total_new" style={{textAlign:"end"}}>&#x20b9; {this.state.grand_total_monthly_salary}</td>
                                     <td className="table_sub_head total_new" style={{textAlign:"end"}}>&#x20b9; {this.state.grand_total_net_profit_amount}</td>
                                 </tr> */}

                         </tbody>
                     </Table>
                     </div>
                 </div>

              <div style={{marginTop:"25px"}}>
                 <div className="table-responsive-lg scroll_1 test_collapse">
                 <Table striped>
                         {/* <thead>
                             <tr>
                                 <th scope="col" className="table_head_new">Telecaller Names</th>
                                 <th scope="col" className="table_head_new" style={{textAlign:"end"}}>No Of Policy</th>
                                 <th scope="col" className="table_head_new" style={{textAlign:"end"}}>Net Premium</th>
                                 <th scope="col" className="table_head_new" style={{textAlign:"end"}}>Gross Premium</th>
                                 <th scope="col" className="table_head_new" style={{textAlign:"end"}}>PO Amount</th>
                                 <th scope="col" className="table_head_new" style={{textAlign:"end"}}>SC PO Amount</th>
                                 <th scope="col" className="table_head_new" style={{textAlign:"end"}}>Profit</th>
                                 <th scope="col" className="table_head_new" style={{textAlign:"end"}}>Salary</th>
                                 <th scope="col" className="table_head_new" style={{textAlign:"end"}}>Net Profit</th>
                             </tr>
                         </thead> */}
                         <tbody>
                             {/* {this.state.telecaller_array.map((value,index)=>{
                                 return(
                                     <tr key={index}>
                                     <th scope="row" className={value.name=="Grand Total" ? "table_sub_head total_new" : "table_sub_head"}>{value.name=="Grand Total" ? value.name.split(" ")[1]:value.name}</th>
                                     <td  className={value.name=="Grand Total" ? "table_sub_head total_new" : "table_sub_head"} style={{textAlign:"end"}}>{value.no_of_policy}</td>
                                     <td  className={value.name=="Grand Total" ? "table_sub_head total_new" : "table_sub_head"} style={{textAlign:"end"}}>&#x20b9; {value.net_premium}</td>
                                     <td  className={value.name=="Grand Total" ? "table_sub_head total_new" : "table_sub_head"} style={{textAlign:"end"}}>&#x20b9; {value.gross_premium}</td>
                                     <td  className={value.name=="Grand Total" ? "table_sub_head total_new" : "table_sub_head"} style={{textAlign:"end"}}>&#x20b9; {value.po_amount}</td>
                                     <td  className={value.name=="Grand Total" ? "table_sub_head total_new" : "table_sub_head"} style={{textAlign:"end"}}>&#x20b9; {value.sc_po_amount}</td>
                                     <td  className={value.name=="Grand Total" ? "table_sub_head total_new" : "table_sub_head"} style={{textAlign:"end"}}>&#x20b9; {value.profit_amount}</td>
                                     <td  className={value.name=="Grand Total" ? "table_sub_head total_new" : "table_sub_head"} style={{textAlign:"end"}}>&#x20b9; {value.monthly_salary}</td>
                                     <td  className={value.name=="Grand Total" ? "table_sub_head total_new" : "table_sub_head"} style={{textAlign:"end"}}>&#x20b9; {value.net_profit_amount}</td>
                                 </tr>
                                 )
                             })} */}

                                    <tr >
                                     <th scope="row" className="table_sub_head total_new width_td">Grand Total</th>
                                     <td className="table_sub_head total_new width_td" style={{textAlign:"end"}}> {this.state.grand_total_net_policy_no}</td>
                                     <td className="table_sub_head total_new width_td" style={{textAlign:"end"}}>&#x20b9; {this.state.grand_total_net_premium}</td>
                                     <td className="table_sub_head total_new width_td" style={{textAlign:"end"}}>&#x20b9; {this.state.grand_total_gross_premium}</td>
                                     <td className="table_sub_head total_new width_td" style={{textAlign:"end"}}>&#x20b9; {this.state.grand_total_po_amount}</td>
                                     <td className="table_sub_head total_new width_td" style={{textAlign:"end"}}>&#x20b9; {this.state.grand_total_sc_po_amount}</td>
                                     <td className="table_sub_head total_new width_td" style={{textAlign:"end"}}>&#x20b9; {this.state.grand_total_profit_amount}</td>
                                     <td className="table_sub_head total_new width_td" style={{textAlign:"end"}}>&#x20b9; {this.state.grand_total_monthly_salary}</td>
                                     <td className="table_sub_head total_new width_td" style={{textAlign:"end"}}>&#x20b9; {this.state.grand_total_net_profit_amount}</td>
                                 </tr>

                         </tbody>
                     </Table>
                     </div>
                 </div>
             </div>
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
